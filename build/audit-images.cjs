/*
 * audit-images.cjs — 审计每个事件当前用的图片，输出映射表 + 图片池清单
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const dataJs = fs.readFileSync(path.join(ROOT, "assets", "js", "data.js"), "utf8");

// data.js 用顶层 const 暴露全局变量。把 "const events" 等替换为 "var events" 后 eval，
// 使其成为 runInContext 上下文的属性，即可从 sandbox 读取。
const sandbox = {};
vm.createContext(sandbox);
const rewritten = dataJs.replace(/\bconst (\w+) =/g, "var $1 =");
vm.runInContext(rewritten, sandbox);

const events = sandbox.events;
const catConfig = sandbox.catConfig;
const timelineData = sandbox.timelineData;
const quotes = sandbox.quotes;
console.log("事件总数:", events.length);
console.log("");

// 1. 事件 → 图片映射
console.log("=== 事件 → 图片映射（按 id）===");
events.forEach(e => {
  // img 可能是 "path/a" || "path/b" 形式，取实际路径
  let img = e.img || "(无)";
  img = img.split(/\s*\|\|\s*/)[0].replace(/"/g, "");
  const imgFile = img.split("/").pop();
  console.log(`${String(e.id).padStart(2,"0")}. [${e.catLabel}] ${e.title}`.padEnd(0));
  console.log(`     时期: ${e.date}`);
  console.log(`     图片: ${imgFile}`);
});

// 2. 图片池清单
console.log("");
console.log("=== 图片池清单 ===");
const dirs = {
  "events(独立图)": "assets/images/events",
  "gallery(通用图)": "assets/images/gallery",
  "hero": "assets/images/hero",
  "nick": "assets/images/nick",
};
for (const [label, dir] of Object.entries(dirs)) {
  const files = fs.readdirSync(path.join(ROOT, dir)).filter(f => f.endsWith(".jpg"));
  console.log(`${label} (${files.length}张): ${files.join(", ")}`);
}

// 3. 统计哪些事件用了通用 gallery 图（而非独立 events 图）
console.log("");
console.log("=== 用通用 gallery 图的事件（可能与事件不匹配的高风险项）===");
events.forEach(e => {
  if (e.img && e.img.includes("gallery/")) {
    console.log(`  id:${e.id} ${e.title}  →  ${e.img.split("/").pop()}`);
  }
});
