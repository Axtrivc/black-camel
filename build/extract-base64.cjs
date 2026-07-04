/*
 * extract-base64.cjs — 一次性 base64 图片提取脚本
 *
 * 读取原始单文件 ronaldo-dark-history.html，把内联的 base64 图片提取为独立 .jpg
 * 文件，并将 HTML 中的引用替换为相对路径。同时删除死代码 GALLERY_DATA 常量。
 *
 * 产物：
 *   assets/images/events/ev-NN.jpg   —— events 数组里 id 1-29 的事件配图
 *   assets/images/hero/hero-N.jpg    —— Hero 轮播 6 张
 *   assets/images/nick/nick-N.jpg    —— 绰号卡片 7 张
 *
 * 用法： node build/extract-base64.cjs
 * 纯 Node 标准库，零依赖。
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "ronaldo-dark-history.html");
const IMG_EVENTS = path.join(ROOT, "assets", "images", "events");
const IMG_HERO = path.join(ROOT, "assets", "images", "hero");
const IMG_NICK = path.join(ROOT, "assets", "images", "nick");

for (const d of [IMG_EVENTS, IMG_HERO, IMG_NICK]) fs.mkdirSync(d, { recursive: true });

let html = fs.readFileSync(SRC, "utf8");
const stats = { events: 0, hero: 0, nick: 0, galleryDeleted: false };

/* ------------------------------------------------------------------ *
 * 1. 删除死代码 GALLERY_DATA（第 1330 行附近，单行 const，全文件零引用）
 * ------------------------------------------------------------------ */
// 形如: const GALLERY_DATA = {...};\r\n   —— 整行删除
const galleryRe = /^[ \t]*const GALLERY_DATA = \{[\s\S]*?\};[ \t]*\r?\n/m;
if (galleryRe.test(html)) {
  html = html.replace(galleryRe, "");
  stats.galleryDeleted = true;
}

/* ------------------------------------------------------------------ *
 * 2. 提取 events 数组里的 img base64
 *    每个事件对象形如 { id:1, ... img:"data:image/jpeg;base64,XXX", ... }
 *    按 id 命名 ev-{id补零2位}.jpg
 * ------------------------------------------------------------------ */
// 匹配 "id:数字" 到同对象内 "img:\"data:...\"" 的成对关系
// 用惰性匹配确保不跨对象
const eventImgRe = /id:(\d+)[\s\S]*?img:"(data:image\/jpeg;base64,[A-Za-z0-9+/=]+)"/g;
html = html.replace(eventImgRe, (m, idStr, b64) => {
  const id = parseInt(idStr, 10);
  const name = `ev-${String(id).padStart(2, "0")}.jpg`;
  const out = path.join(IMG_EVENTS, name);
  fs.writeFileSync(out, Buffer.from(b64.split(",")[1], "base64"));
  stats.events++;
  // 用回传的 id 重建 "id:N" 前缀，并把 img 替换为路径
  return m.replace(/img:"data:image\/jpeg;base64,[A-Za-z0-9+/=]+"/, `img:"assets/images/events/${name}"`);
});

/* ------------------------------------------------------------------ *
 * 3. 提取 HTML body 内联 <img src="data:..."> —— hero(6) + nick(7)
 *    按 DOM 出现顺序：前 6 个为 hero，之后为 nick
 * ------------------------------------------------------------------ */
let inlineCounter = { hero: 0, nick: 0 };
let inlineTotal = 0;
const inlineImgRe = /<img([^>]*?)src="(data:image\/jpeg;base64,[A-Za-z0-9+/=]+)"/g;
html = html.replace(inlineImgRe, (m, attrs, b64) => {
  inlineTotal++;
  let bucket, dir, prefix, name;
  // Hero 区在 nickname 区之前出现。前 6 张归 hero，其余归 nick。
  if (inlineCounter.hero < 6) {
    bucket = "hero";
    inlineCounter.hero++;
    dir = IMG_HERO;
    name = `hero-${inlineCounter.hero}.jpg`;
  } else {
    bucket = "nick";
    inlineCounter.nick++;
    dir = IMG_NICK;
    name = `nick-${inlineCounter.nick}.jpg`;
  }
  fs.writeFileSync(path.join(dir, name), Buffer.from(b64.split(",")[1], "base64"));
  stats[bucket]++;
  return `<img${attrs}src="assets/images/${bucket}/${name}"`;
});

/* ------------------------------------------------------------------ *
 * 4. 写回 HTML（覆盖原文件）
 * ------------------------------------------------------------------ */
fs.writeFileSync(SRC, html);

/* ------------------------------------------------------------------ *
 * 5. 校验与报告
 * ------------------------------------------------------------------ */
const remaining = (html.match(/data:image\/jpeg;base64,/g) || []).length;
console.log("=== 提取完成 ===");
console.log("GALLERY_DATA 删除:", stats.galleryDeleted);
console.log("事件图 (events):", stats.events, "→ assets/images/events/ev-01..jpg");
console.log("Hero 图:", stats.hero, "→ assets/images/hero/hero-1..jpg");
console.log("绰号图:", stats.nick, "→ assets/images/nick/nick-1..jpg");
console.log("HTML 内联 <img> 处理总数:", inlineTotal);
console.log("HTML 残留 base64 数量:", remaining, remaining === 0 ? "✓ OK" : "✗ 仍有残留!");

// 校验每个生成的 jpg 文件头是否为 FFD8（JPEG SOI）
const checkJpg = (dir, files) => {
  let bad = 0;
  for (const fn of files) {
    const buf = fs.readFileSync(path.join(dir, fn));
    if (!(buf[0] === 0xff && buf[1] === 0xd8)) {
      console.log("  ✗ 非 JPEG 文件头:", fn);
      bad++;
    }
  }
  return bad;
};
const evFiles = fs.readdirSync(IMG_EVENTS).filter(f => f.endsWith(".jpg"));
const heroFiles = fs.readdirSync(IMG_HERO).filter(f => f.endsWith(".jpg"));
const nickFiles = fs.readdirSync(IMG_NICK).filter(f => f.endsWith(".jpg"));
const badE = checkJpg(IMG_EVENTS, evFiles);
const badH = checkJpg(IMG_HERO, heroFiles);
const badN = checkJpg(IMG_NICK, nickFiles);
console.log("JPEG 文件头校验:", (badE + badH + badN) === 0 ? "✓ 全部通过" : `✗ ${badE + badH + badN} 个异常`);
console.log("  events:", evFiles.length, "hero:", heroFiles.length, "nick:", nickFiles.length);
