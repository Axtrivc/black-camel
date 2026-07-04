/* download-report-images2.cjs — 第二批报道页配图 */
const https = require("https"), http = require("http"), fs = require("fs"), path = require("path");
const DST = path.resolve(__dirname, "..", "assets", "images", "report");
const PROXY = { host: "127.0.0.1", port: 10808 };

const ITEMS = [
  ["r-03.jpg", "https://i2-prod.mirror.co.uk/incoming/article10984514.ece/ALTERNATES/n615/FC-Barcelona-v-Real-Madrid-Supercopa-de-Espana-1st-Leg.jpg"],
  ["r-05.jpg", "https://cdn.vox-cdn.com/thumbor/-GNqqcqkNAfbaGgSE-lnQgtyIMI=/945x329:2295x1229/1200x800/filters:focal(945x329:2295x1229)/cdn.vox-cdn.com/uploads/chorus_image/image/46258412/GettyImages-471974978.0.jpg"],
  ["r-06.jpg", "https://metro.co.uk/wp-content/uploads/2014/10/ronaldi-kick.jpg?quality=90&strip=all&w=536"],
  ["r-07.jpg", "https://assets.goal.com/images/v3/blt68547a7efca5e219/27f150522f91f0e627bbc424079b3ee6b90d110a.jpg?format=pjpg&quality=60&auto=webp&width=380"],
  ["r-08.jpg", "https://www.thesun.co.uk/wp-content/uploads/2025/11/1038454204.jpg?quality=90&strip=all&w=810"],
  ["r-13.jpg", "https://ichef.bbci.co.uk/ace/standard/1024/cpsprodpb/176B2/production/_117822959_gettyimages-1231985071.jpg"],
  ["r-14.jpg", "https://www.reuters.com/resizer/v2/QAHCGOBVYJPJNNFQJZXFFQYANI.jpg?auth=943c95183cc4f126147a8bd00bab27a3f63c36a96ddfa50f836be7dca70835ab&width=1200&quality=80"],
  ["r-18.jpg", "https://i.cbc.ca/1.2494868.1389640911!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_1180/ronaldo-cristiano.jpg"],
  ["r-20.jpg", "https://e0.365dm.com/22/07/1600x900/skysports-cristiano-ronaldo_5821439.jpg?20220702170731"],
  ["r-21.jpg", "https://e0.365dm.com/22/07/768x432/skysports-ronaldo-manchester-united_5821618.jpg?20220702193842"],
  ["r-25.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/CR7_museum_and_hotel_in_Funchal%2C_Madeira.JPG/640px-CR7_museum_and_hotel_in_Funchal%2C_Madeira.JPG"],
  ["r-35.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Cristiano_Ronaldo_in_2023.jpg/640px-Cristiano_Ronaldo_in_2023.jpg"],
  ["r-43.jpg", "https://ichef.bbci.co.uk/ace/standard/434/cpsprodpb/313d/live/068e8120-569e-11f1-9615-e14e530a4b81.jpg"],
  ["r-45.jpg", "https://assets.goal.com/images/v3/blt2a1748fed1f687c6/GettyImages-51661111.jpg"],
  ["r-60.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Cristiano_Ronaldo_0876.jpg/640px-Cristiano_Ronaldo_0876.jpg"],
];

function dl(url, redirects = 0) {
  return new Promise((res, rej) => {
    if (redirects > 5) return rej(new Error("too many redirects"));
    const u = new URL(url);
    const t = http.request({ host: PROXY.host, port: PROXY.port, method: "CONNECT", path: u.host + ":443", timeout: 20000 });
    t.on("connect", (r, s) => {
      if (r.statusCode !== 200) return rej(new Error("CONNECT " + r.statusCode));
      const q = https.request({ host: u.host, path: u.pathname + u.search, socket: s, agent: false,
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)", "Referer": u.origin },
        timeout: 30000 }, x => {
        if (x.statusCode === 301 || x.statusCode === 302) return res(dl(x.headers.location, redirects + 1));
        if (x.statusCode !== 200) return rej(new Error("status " + x.statusCode));
        const c = []; x.on("data", d => c.push(d)); x.on("end", () => res(Buffer.concat(c)));
      });
      q.on("error", rej); q.on("timeout", () => q.destroy(new Error("timeout"))); q.end();
    });
    t.on("error", rej); t.on("timeout", () => t.destroy(new Error("tunnel timeout"))); t.end();
  });
}

(async () => {
  let ok = 0, fail = 0;
  for (const [out, url] of ITEMS) {
    try {
      const b = await dl(url);
      const head = b.slice(0, 4).toString("hex");
      if (!/^ffd8|89504e47|52494646/.test(head)) throw new Error("非图片 头=" + head);
      fs.writeFileSync(path.join(DST, out), b);
      console.log(`✓ ${out} ${(b.length/1024).toFixed(0)}KB`);
      ok++;
    } catch (e) {
      console.log(`✗ ${out} ${e.message.slice(0, 60)}`);
      fail++;
    }
    await new Promise(r => setTimeout(r, 1500));
  }
  console.log(`\n完成: ${ok} 成功, ${fail} 失败`);
})();
