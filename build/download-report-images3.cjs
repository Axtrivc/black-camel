/* download-report-images3.cjs — 第三批报道页配图，下载后去重 */
const https = require("https"), http = require("http"), fs = require("fs"), path = require("path");
const DST = path.resolve(__dirname, "..", "assets", "images", "report");
const PROXY = { host: "127.0.0.1", port: 10808 };

// id → [输出名, URL]（已剔除明显重复URL，重复的只保留一个，另一个标记skip）
const ITEMS = [
  ["r-10.jpg", "https://e0.365dm.com/25/11/768x432/skysports-cristiano-ronaldo_7081551.jpg?20251113214513"],
  ["r-23.jpg", "https://a1.espncdn.com/combiner/i?img=%2Fphoto%2F2026%2F0603%2Fr1667633_1296x729_16%2D9.jpg"],
  ["r-24.jpg", "https://media.zenfs.com/en/the_independent_us_sports_articles_270/6498d454b6f25981500569aa37d3c168"],
  ["r-25.jpg", "https://phantom-marca.com/6fb9cc160c462ef82d897fc457503494/crop/0x0/1978x1318/resize/1320/f/jpg/assets/multimedia/imagenes/2025/11/04/17622764588122.png"],
  ["r-27.jpg", "https://images.augustman.com/wp-content/uploads/sites/3/2025/08/25135259/snapins-ai_3567773642882331222-1.jpg"],
  ["r-28.jpg", "https://images.immediate.co.uk/production/volatile/sites/28/2019/02/did-cristiano-ronaldo-pay-a-surrogate-to-have-his-son_13538-8b9a850.jpg?resize=635%2C332"],
  ["r-29.jpg", "https://assets.goal.com/images/v3/bltff69860dc9c0bd96/Cristiano%20Ronaldo%20Portugal%202025%20(2).jpg"],
  ["r-31.jpg", "https://images.augustman.com/wp-content/uploads/sites/3/2025/08/25135226/ipiccy_image-2025-08-25T110516.087.jpg"],
  ["r-32.jpg", "https://images.augustman.com/wp-content/uploads/sites/3/2025/08/25140010/AFP__20131215__DV1595753__v3__HighRes-1.jpg"],
  ["r-35.jpg", "https://storage.googleapis.com/sporf/2021/09/7f57ca8d-gettyimages-1339696970-cropped-scaled.jpg"],
  ["r-39.jpg", "https://phantom.estaticos-marca.com/d809dc25da7a71d9666f6dad8ea851b5/crop/0x0/1978x1318/resize/1200/f/webp/assets/multimedia/imagenes/2025/11/04/17622764588122.png"],
  ["r-40.jpg", "https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2024%2F0317%2F451f9db3j00sahqix0040d000wi01c0m.jpg&thumbnail=660x2147483647&quality=80&type=jpg"],
  ["r-42.jpg", "https://i.insider.com/606199c58f71c3001853ab9d?width=1200&format=jpeg"],
  ["r-50.jpg", "https://images.shobserver.com/img/2026/06/25/l_CB20260625001505285007.jpg"],
  ["r-55.jpg", "https://images.shobserver.com/img/2026/06/25/l_CB20260625001640623094.jpg"],
  ["r-63.jpg", "https://a2.espncdn.com/combiner/i?img=%2Fphoto%2F2022%2F1002%2Fr1069930_2_1296x729_16%2D9.jpg"],
  ["r-04.jpg", "https://phantom-marca.unidadeditorial.es/f7162a42bbd9c8262c78a060de50c03b/resize/1200/f/jpg/assets/multimedia/imagenes/2021/10/25/16351442595235.jpg"],
  ["r-09.jpg", "https://static0.givemesportimages.com/wordpress/wp-content/uploads/2024/04/cristiano-ronaldo-red-cards.jpg?w=1200&h=675&fit=crop"],
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
    if (fs.existsSync(path.join(DST, out))) { console.log(`- ${out} 已存在跳过`); continue; }
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
