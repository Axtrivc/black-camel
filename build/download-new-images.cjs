/*
 * download-new-images.cjs — 通过系统代理(127.0.0.1:10808)批量下载维基图片
 *
 * 补足图池缺口，使63个事件各配一张不重复的图。命名 ev-30.jpg 起。
 * 用 Special:FilePath?width=520 直接拿 520px 缩略图，免压缩。
 */
const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const OUTDIR = path.join(ROOT, "assets", "images", "events");
const PROXY = { host: "127.0.0.1", port: 10808 };

// ev-30 ~ ev-48: 对应维基文件名（按事件需求精选球队/年份）
const FILES = [
  ["ev-30", "CR7 (JUV-LOK).jpg"],                                            // 尤文
  ["ev-31", "2019-20 Serie A - Torino v Juventus - Cristiano Ronaldo (cropped).jpg"], // 尤文
  ["ev-32", "Atlético de Madrid v Juventus, 10 August 2019 (13).jpg"],      // 尤文
  ["ev-33", "Manchester United v Arsenal, 2 December 2021 (06).jpg"],       // 曼联二进宫
  ["ev-34", "Manchester United v Arsenal, 2 December 2021 (12).jpg"],       // 曼联二进宫
  ["ev-35", "Cr7 Manchester United v Brighton & Hove Albion, 7 August 2022 (32) (cropped).jpg"], // 曼联2022
  ["ev-36", "Manchester United v Brentford, 2 May 2022 (15).jpg"],          // 曼联2022
  ["ev-37", "Al Jazira Club v Real Madrid CF, 13 December 2017 - 04.jpg"],  // 皇马2017
  ["ev-38", "Al Jazira Club v Real Madrid CF, 13 December 2017 - 11.jpg"],  // 皇马2017
  ["ev-39", "Cristiano Ronaldo after 2018 UEFA Champions League Final.jpg"], // 皇马2018欧冠
  ["ev-40", "Cristiano Ronaldo Real Madrid.jpg"],                           // 皇马
  ["ev-41", "Cristiano Ronaldo in the 2022 World Cup.jpg"],                // 葡2022世界杯
  ["ev-42", "Portugal v Uruguay WC 2022.jpg"],                              // 葡2022世界杯
  ["ev-43", "New Zealand-Portugal (12).jpg"],                               // 葡2017联合会杯
  ["ev-44", "Cristiano Ronaldo Portugal 2018.jpg"],                         // 葡2018
  ["ev-45", "Cristiano Ronaldo 2018.jpg"],                                  // 2018通用
  ["ev-46", "Cristiano Ronaldo Portugal.jpg"],                              // 葡
  ["ev-47", "Cristiano Ronaldo Iran vs Portugal.jpg"],                      // 葡2018世界杯
  ["ev-48", "Cristiano Ronaldo (JUV-LOK).jpg"],                             // 尤文
];

function download(url) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, {
      method: "GET",
      agent: new https.Agent({ host: PROXY.host, port: PROXY.port,
        headers: { Host: new URL(url).host } }),
      // 通过 http 代理做 CONNECT
      path: url,
      headers: { "User-Agent": "Mozilla/5.0 (compatible; image-fetch/1.0)" },
      timeout: 30000,
    }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return resolve(download(res.headers.location)); // 跟随重定向
      }
      if (res.statusCode !== 200) return reject(new Error("status " + res.statusCode));
      const chunks = [];
      res.on("data", c => chunks.push(c));
      res.on("end", () => resolve(Buffer.concat(chunks)));
    });
    req.on("error", reject);
    req.on("timeout", () => req.destroy(new Error("timeout")));
    req.end();
  });
}

// 用 http CONNECT 隧道走代理（更可靠）
function downloadViaConnect(url) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const tunnel = http.request({
      host: PROXY.host, port: PROXY.port,
      method: "CONNECT", path: u.host + ":443",
      timeout: 20000,
    });
    tunnel.on("connect", (res, socket) => {
      if (res.statusCode !== 200) return reject(new Error("CONNECT " + res.statusCode));
      const req = https.request({ host: u.host, path: u.pathname + u.search,
        socket, agent: false,
        headers: { "User-Agent": "Mozilla/5.0 (compatible; image-fetch/1.0)" },
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

(async () => {
  let ok = 0, fail = 0;
  for (const [name, file] of FILES) {
    const url = "https://commons.wikimedia.org/wiki/Special:FilePath/" + encodeURIComponent(file) + "?width=520";
    const out = path.join(OUTDIR, name + ".jpg");
    try {
      const buf = await downloadViaConnect(url);
      if (buf[0] !== 0xff || buf[1] !== 0xd8) throw new Error("非JPEG 头=" + buf[0].toString(16) + buf[1].toString(16));
      fs.writeFileSync(out, buf);
      console.log(`✓ ${name}.jpg  ${(buf.length/1024).toFixed(0)}KB  ${file.slice(0,40)}`);
      ok++;
    } catch (e) {
      console.log(`✗ ${name}.jpg  ${e.message}  ${file.slice(0,40)}`);
      fail++;
    }
  }
  console.log(`\n完成: ${ok} 成功, ${fail} 失败`);
  // 列出 events 目录最终图片数
  const total = fs.readdirSync(OUTDIR).filter(f => f.endsWith(".jpg")).length;
  console.log("events 目录图片总数:", total);
})();
