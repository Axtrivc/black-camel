/*
 * download-report-images.cjs — 下载报道页配图（版权图，用户授权使用）
 * 来源：BBC/Guardian/Reuters/Sky Sports/Marca 等媒体报道首图
 */
const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");

const DST = path.resolve(__dirname, "..", "assets", "images", "report");
fs.mkdirSync(DST, { recursive: true });

const PROXY = { host: "127.0.0.1", port: 10808 };

// id → [输出名, 图片URL]
const ITEMS = [
  ["r-01.jpg", "https://ichef.bbci.co.uk/news/1024/branded_news/8033/production/_105291823_hi051817234.jpg"],
  ["r-02.jpg", "https://ichef.bbci.co.uk/news/1024/branded_news/5308/production/_125365212_gettyimages-1241130017.jpg"],
  ["r-11.jpg", "https://i2-prod.mirror.co.uk/sport/football/article26678931.ece/ALTERNATES/s1200/2_Screenshot-2022-04-10-112654.jpg"],
  ["r-12.jpg", "https://i.guim.co.uk/img/media/622a07431db2536435ffd2df706430ada0e54c07/55_0_512_307/512.jpg?width=800&quality=85&auto=format&fit=crop&s=a17df8b3356be4f34d8e759e373dbe1b"],
  ["r-16.jpg", "https://www.reuters.com/resizer/IyWQhoVT-cTGFFk77L6vdIUPlkc=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/SVWJU667F5JZXMXZIID4KZCCFE.jpg"],
  ["r-17.jpg", "https://prod-media.beinsports.com/image/Cristiano%20Ronaldo%2C%20premio%20en%20Dub%C3%A1i.1080.jpeg"],
  ["r-19.jpg", "https://e0.365dm.com/22/11/768x432/skysports-cristiano-ronaldo_5966124.jpg?20221114123425"],
  ["r-33.jpg", "https://assets.goal.com/images/v3/getty-2230757400/crop/MM5DENZQGA5DCNJRHE5G433XMU5DAORRGQYQ====/GettyImages-2230757400.jpg"],
  ["r-36.jpg", "https://ichef.bbci.co.uk/ace/branded_sport/1200/cpsprodpb/61f9/live/e3510710-5557-11f1-b427-e5f9d829c03e.jpg"],
  ["r-37.jpg", "https://phantom-marca.unidadeditorial.es/d42bb3518aaa1a254037ca03905e16a3/resize/1200/f/jpg/assets/multimedia/imagenes/2021/10/24/16350978346923.jpg"],
  ["r-46.jpg", "https://e0.365dm.com/22/12/768x432/skysports-cristiano-ronaldo_5988757.jpg?20221207094050"],
  ["r-52.jpg", "https://ichef.bbci.co.uk/ace/branded_sport/1200/cpsprodpb/172C5/production/_102071949_ronaldo_celebs_getty.jpg"],
  ["r-56.jpg", "https://prod-media.beinsports.com/image/Wayne%20Rooney%20y%20Cristiano%20Ronaldo.1080.png"],
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

const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  let ok = 0, fail = 0;
  for (const [out, url] of ITEMS) {
    const outPath = path.join(DST, out);
    try {
      const b = await dl(url);
      // 接受 jpg(ffd8)/png(89504e47)/webp(52494646)
      const head = b.slice(0, 4).toString("hex");
      if (!/^ffd8|89504e47|52494646/.test(head)) throw new Error("非图片 头=" + head);
      fs.writeFileSync(outPath, b);
      console.log(`✓ ${out} ${(b.length/1024).toFixed(0)}KB ${head}`);
      ok++;
    } catch (e) {
      console.log(`✗ ${out} ${e.message.slice(0, 60)}`);
      fail++;
    }
    await sleep(1500);
  }
  console.log(`\n完成: ${ok} 成功, ${fail} 失败`);
})();
