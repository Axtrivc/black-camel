/*
 * download-retry.cjs — 重试 429 失败的下载，带 3 秒间隔避免限流
 */
const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const OUTDIR = path.join(ROOT, "assets", "images", "events");
const PROXY = { host: "127.0.0.1", port: 10808 };

const RETRY = [
  ["ev-34", "Manchester United v Arsenal, 2 December 2021 (12).jpg"],
  ["ev-36", "Manchester United v Brentford, 2 May 2022 (15).jpg"],
  ["ev-38", "Al Jazira Club v Real Madrid CF, 13 December 2017 - 11.jpg"],
  ["ev-40", "Cristiano Ronaldo Real Madrid.jpg"],
  ["ev-41", "Cristiano Ronaldo in the 2022 World Cup.jpg"],
  ["ev-44", "Cristiano Ronaldo Portugal 2018.jpg"],
  ["ev-45", "Cristiano Ronaldo 2018.jpg"],
  ["ev-47", "Cristiano Ronaldo Iran vs Portugal.jpg"],
];

function downloadViaConnect(url) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const tunnel = http.request({
      host: PROXY.host, port: PROXY.port,
      method: "CONNECT", path: u.host + ":443", timeout: 20000,
    });
    tunnel.on("connect", (res, socket) => {
      if (res.statusCode !== 200) return reject(new Error("CONNECT " + res.statusCode));
      const req = https.request({ host: u.host, path: u.pathname + u.search,
        socket, agent: false,
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
        timeout: 30000,
      }, (r) => {
        if (r.statusCode === 301 || r.statusCode === 302) return resolve(downloadViaConnect(r.headers.location));
        if (r.statusCode !== 200) return reject(new Error("status " + r.statusCode));
        const chunks = [];
        r.on("data", c => chunks.push(c));
        r.on("end", () => resolve(Buffer.concat(chunks)));
      });
      req.on("error", reject);
      req.on("timeout", () => req.destroy(new Error("timeout")));
      req.end();
    });
    tunnel.on("error", reject);
    tunnel.on("timeout", () => tunnel.destroy(new Error("tunnel timeout")));
    tunnel.end();
  });
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  let ok = 0, fail = 0;
  for (const [name, file] of RETRY) {
    const url = "https://commons.wikimedia.org/wiki/Special:FilePath/" + encodeURIComponent(file) + "?width=520";
    const out = path.join(OUTDIR, name + ".jpg");
    let done = false;
    // 最多重试3次，每次间隔递增
    for (let attempt = 1; attempt <= 3 && !done; attempt++) {
      try {
        const buf = await downloadViaConnect(url);
        if (buf[0] !== 0xff || buf[1] !== 0xd8) throw new Error("非JPEG");
        fs.writeFileSync(out, buf);
        console.log(`✓ ${name}.jpg  ${(buf.length/1024).toFixed(0)}KB  (第${attempt}次)`);
        ok++; done = true;
      } catch (e) {
        if (attempt < 3) { console.log(`… ${name} 第${attempt}次失败(${e.message})，等4秒重试`); await sleep(4000); }
        else { console.log(`✗ ${name}.jpg  ${e.message}`); fail++; }
      }
    }
    await sleep(3000); // 每张之间隔3秒防限流
  }
  console.log(`\n重试完成: ${ok} 成功, ${fail} 失败`);
  const total = fs.readdirSync(OUTDIR).filter(f => f.endsWith(".jpg")).length;
  console.log("events 目录图片总数:", total);
})();
