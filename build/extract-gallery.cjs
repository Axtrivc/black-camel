/*
 * extract-gallery.cjs — 补充提取：恢复被 events 引用的 GALLERY_DATA 图片
 *
 * 背景：extract-base64.cjs 误把 GALLERY_DATA 当死代码删除，但实际有 26 个事件
 * 通过 img:GALLERY["key"] 引用其中 16 张图。本脚本从原始备份恢复这些图。
 *
 * 输入: docs/ronaldo-dark-history.original.html （4.5MB 原始备份，含完整 GALLERY_DATA）
 * 输出:
 *   assets/images/gallery/<key>.jpg   —— 16 张被引用的图
 *   并打印一张 key→路径 映射表，供后续替换 data.js 使用
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const ORIG = path.join(ROOT, "docs", "ronaldo-dark-history.original.html");
const DATA = path.join(ROOT, "assets", "js", "data.js");
const OUTDIR = path.join(ROOT, "assets", "images", "gallery");

fs.mkdirSync(OUTDIR, { recursive: true });

// 1. 找出 data.js 里实际引用的 GALLERY key
const dataJs = fs.readFileSync(DATA, "utf8");
const usedKeys = [...new Set((dataJs.match(/GALLERY\["([^"]+)"\]/g) || []).map(s => s.match(/"([^"]+)"/)[1]))];
console.log("data.js 引用的 GALLERY key:", usedKeys.length, "个");
console.log(usedKeys.join(", "));

// 2. 从原始 HTML 解析 GALLERY_DATA 对象（单行 const，JSON-like）
const origHtml = fs.readFileSync(ORIG, "utf8");
// 匹配整个 GALLERY_DATA = {...};
const galleryMatch = origHtml.match(/const GALLERY_DATA = (\{[\s\S]*?\});/);
if (!galleryMatch) {
  console.error("✗ 原始文件未找到 GALLERY_DATA");
  process.exit(1);
}
// GALLERY_DATA 是合法 JSON（键带引号、值是字符串），可直接 parse
let galleryObj;
try {
  galleryObj = JSON.parse(galleryMatch[1]);
} catch (e) {
  console.error("✗ GALLERY_DATA 解析失败:", e.message);
  process.exit(1);
}
console.log("原始 GALLERY_DATA 含 key 数:", Object.keys(galleryObj).length);

// 3. 为每个被引用的 key 提取 jpg
const map = {};
let extracted = 0, missing = 0;
for (const key of usedKeys) {
  const b64 = galleryObj[key];
  if (!b64 || !b64.startsWith("data:image/jpeg;base64,")) {
    console.warn("  ⚠ key 缺失或格式异常:", key);
    missing++;
    continue;
  }
  const outPath = path.join(OUTDIR, `${key}.jpg`);
  fs.writeFileSync(outPath, Buffer.from(b64.split(",")[1], "base64"));
  map[key] = `assets/images/gallery/${key}.jpg`;
  extracted++;
}
console.log(`提取 ${extracted} 张到 assets/images/gallery/，缺失 ${missing}`);

// 4. 在 data.js 中把 GALLERY["key"] 替换为路径字符串
let newData = dataJs;
for (const key of usedKeys) {
  if (!map[key]) continue;
  // GALLERY["key"] 或 GALLERY["key"] || GALLERY["fallback"] —— 保留 || 逻辑，但都换成路径
  // 先把所有 GALLERY["key"] 换成 "路径"
  const re = new RegExp('GALLERY\\["' + key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + '"\\]', "g");
  newData = newData.replace(re, `"${map[key]}"`);
}
fs.writeFileSync(DATA, newData);

// 5. 校验
const remaining = (newData.match(/GALLERY\[/g) || []).length;
console.log("替换后 data.js 残留 GALLERY[ 引用:", remaining, remaining === 0 ? "✓ OK" : "✗ 仍有残留");
console.log("\n=== 映射表 ===");
for (const k of usedKeys) if (map[k]) console.log(`  ${k} → ${map[k]}`);
