/* download-report-images4.cjs — 第四批(最后23个事件) */
const https = require("https"), http = require("http"), fs = require("fs"), path = require("path");
const DST = path.resolve(__dirname, "..", "assets", "images", "report");
const PROXY = { host: "127.0.0.1", port: 10808 };

const ITEMS = [
  ["r-12.jpg", "https://e0.365dm.com/16/06/1600x900/cristiano-ronaldo-microphone-lake-ronaldo_3488524.jpg?20160622115419"],
  ["r-15.jpg", "https://prod-media.beinsports.com/image/1763071089416_ebd75cb7-b245-4313-8152-70dfbedc15c7.1080.JPG"],
  ["r-22.jpg", "https://a4.espncdn.com/combiner/i?img=%2Fphoto%2F2016%2F0710%2Fr101945_1296x729_16%2D9.jpg"],
  ["r-25.jpg", "https://people.com/thmb/rVai0XpROxf2C8AKH7c8VgAsTaY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(749x0:751x2)/cristiano-ronaldo-parents-052924-1-db7be7fd22754635b4cf0e8f6a28bf5e.jpg"],
  ["r-26.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Ronaldo_Lu%C3%ADs_Naz%C3%A1rio_de_Lima_2019_%283x4_cropped%29.jpg/640px-Ronaldo_Lu%C3%ADs_Naz%C3%A1rio_de_Lima_2019_%283x4_cropped%29.jpg"],
  ["r-30.jpg", "https://a4.espncdn.com/combiner/i?img=%2Fphoto%2F2014%2F1206%2Ffc_ron3_dj_1296x729.jpg"],
  ["r-34.jpg", "https://i2.hdslb.com/bfs/archive/517b1852-18a323d1610.jpeg@100w_100h_1c.png"],
  ["r-35.jpg", "https://www.hospitalitynet.org/og/image?id=a370d2f5-45ca-4b52-9959-53752ac03081&key=og-image"],
  ["r-38.jpg", "https://imgs.gamersky.com/upimg/new_preview/2026/05/23/origin_b_202605231006236452.jpg"],
  ["r-41.jpg", "https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/13D40/production/_90061218_epa_ronaldo.jpg"],
  ["r-44.jpg", "https://people.com/thmb/WaLRjfldHkGnMuUt2wwlaG-sxRw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(499x0:501x2)/Cristiano-Ronaldo-family-060226-a600f9b4562e492baac1e9fdf8b06567.jpg"],
  ["r-47.jpg", "https://gray-wctv-prod.gtv-cdn.com/resizer/v2/CFC6FOYS5NA2JF5BSKAETBD5IY.jpg?auth=22101eb6c0f5734f25170ce5ad691ede250ff2d0866776ee26d1c4009d727bbc&width=1200&height=600&smart=false&focal=1181%2C391"],
  ["r-49.jpg", "https://commetric.com/wp-content/uploads/2021/06/Ronaldo-and-Coca-Cola.jpg"],
  ["r-51.jpg", "https://imagesvc.timeincapp.com/v3/mm/image?url=https://cdn-s3.si.com/images/juventus-v-club-de-atletico-madrid-uefa-champions-league-round-of-16-second-leg-5c93a8d5dfd9d3ed2b000001.jpg&w=1200&h=628&c=sc&poi=face&q=85"],
  ["r-53.jpg", "https://i2-prod.mirror.co.uk/article24106436.ece/ALTERNATES/s1200/0_ACF-Fiorentina-v-FC-Juventus-Serie-A.jpg"],
  ["r-57.jpg", "https://i.guim.co.uk/img/static/sys-images/Football/Pix/pictures/2008/06/05/RonaldoAFPPatrickHertzog.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctYWdlLTIwMDgucG5n&enable=upscale&s=40b3c88932319cac039ea2eb7fc9798d"],
  ["r-58.jpg", "https://ichef.bbci.co.uk/news/1024/branded_news/8033/production/_105291823_hi051817234.jpg"],
  ["r-59.jpg", "https://i.guim.co.uk/img/static/sys-images/Sport/Pix/columnists/2010/2/17/1266398835029/Cristiano-Ronaldo-reacts--002.jpg?w=1200&h=630&q=55&auto=format&usm=12&fit=crop&crop=faces%2Centropy&bm=normal&ba=bottom%2Cleft&blend64=aHR0cHM6Ly91cGxvYWRzLmd1aW0uY28udWsvMjAxNi8wNS8yNS9vdmVybGF5LWxvZ28tMTIwMC05MF9vcHQucG5n&s=711d22c8e74820b086c5d6f78cea34dd"],
  ["r-60.jpg", "https://i.guim.co.uk/img/static/sys-images/Sport/Pix/pictures/2014/6/4/1401879664281/Cristiano-Ronaldo-014.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctYWdlLTIwMTQucG5n&enable=upscale&s=9a6215fa01433362226c99d3e4a16806"],
  ["r-61.jpg", "https://img.olympics.com/images/image/private/t_social_share_thumb/f_auto/primary/ymuxanpfq3zw0d2glyvm"],
  ["r-62.jpg", "https://media.worldsoccertalk.com/wp-content/uploads/sites/6/2025/10/27124414/cristiano-ronaldo-al-nassr-lionel-messi-inter-miami-2-1200x740.webp"],
  // id:48 换源(不用Goal同图) — 用BBC/CNN推球迷报道
  ["r-48.jpg", "https://e0.365dm.com/23/06/768x432/skysports-cristiano-ronaldo-football_6155200.jpg?20230615120000"],
  // id:54 换源(不用Sporf 403) — 用其他社媒报道
  ["r-54.jpg", "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=1200"],
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
