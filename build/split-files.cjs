/*
 * split-files.cjs — 把单文件 HTML 拆分为 style.css / data.js / app.js / index.html
 *
 * 输入: ronaldo-dark-history.html（已由 extract-base64.cjs 处理过）
 * 输出:
 *   assets/css/style.css  —— <style> 内容
 *   assets/js/data.js     —— events / catConfig / timelineData / quotes 四个数据常量
 *   assets/js/app.js      —— 其余渲染/交互 JS，封装为 IIFE
 *   index.html            —— 去掉 <style>/<script> 块，改为外部引用
 *
 * 用法: node build/split-files.cjs
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "ronaldo-dark-history.html");
const html = fs.readFileSync(SRC, "utf8");
const lines = html.split(/\r?\n/);

// 工具：按 1-based 行号区间取内容（含两端）
const slice = (a, b) => lines.slice(a - 1, b).join("\n");

/* ---------- 1. style.css : 第 8-987 行（<style> 与 </style> 之间）---------- */
const styleCss = slice(8, 987) + "\n";
fs.writeFileSync(path.join(ROOT, "assets", "css", "style.css"), styleCss);

/* ---------- 2. 提取 script 内容（1328-2544 之间，去掉标签行）---------- */
// <script> 在 1328，</script> 在 2544，内容为 1329-2543
const scriptContent = slice(1329, 2543);

/* ---------- 3. data.js : 抽出四个数据常量 ---------- *
 * 行号（提取后）:
 *   events       1330-2250 (const events = [ ... ];
 *   catConfig    2252-2258
 *   timelineData 2402-2424
 *   quotes       2489-2516
 * 这些常量在 scriptContent 里。我们用正则精确切出每个 const ... ; 块。
 */
const pullConst = (name) => {
  // 匹配 "const NAME = ...;" 到行末分号（数组/对象跨行，用 [\s\S]*? 惰性 + 非贪婪到 ";\n"）
  const re = new RegExp("(const " + name + " = [\\s\\S]*?\\n\\}\\;|const " + name + " = [\\s\\S]*?\\n\\];)");
  const m = scriptContent.match(re);
  if (!m) throw new Error("未找到常量: " + name);
  return m[0];
};

const dataBlocks = [
  "// ========== 事件数据 ==========",
  pullConst("events"),
  "",
  "// ========== 分类配置 ==========",
  pullConst("catConfig"),
  "",
  "// ========== 时间线数据 ==========",
  pullConst("timelineData"),
  "",
  "// ========== 语录数据 ==========",
  pullConst("quotes"),
  "",
];

const dataJs = `/*
 * data.js — CA7 黑历史档案馆 数据层
 * 由 build/split-files.cjs 从原始单文件提取，事件图片已外置为 assets/images/events/ev-NN.jpg
 * 续编（2026-07-03）新增事件/绰号/时间线/语录见文末标注。
 *
 * 用顶层 const 暴露全局变量（非 ES module），供 app.js 顺序加载后使用。
 */
` + dataBlocks.join("\n") + "\n";
fs.writeFileSync(path.join(ROOT, "assets", "js", "data.js"), dataJs);

/* ---------- 4. app.js : scriptContent 去掉四个数据常量，保留其余逻辑 ---------- */
let appJs = scriptContent;
// 逐个移除已迁入 data.js 的常量声明
for (const name of ["events", "catConfig", "timelineData", "quotes"]) {
  const re = new RegExp("const " + name + " = [\\s\\S]*?\\n(\\}\\;|\\];)\\n?");
  appJs = appJs.replace(re, "");
}
// 移除可能残留的分节注释标题（数据相关的）
appJs = appJs.replace(/\/\/ ========== 事件数据 ==========\n?/g, "");
appJs = appJs.replace(/\/\/ ========== 分类配置 ==========\n?/g, "");
appJs = appJs.replace(/\/\/ ========== 时间线数据 ==========\n?/g, "");
appJs = appJs.replace(/\/\/ ========== 语录数据 ==========\n?/g, "");

// 包裹 IIFE 避免污染全局（但 closeModal / svgFallback 原本被内联 onclick 调用，
// 重构后 index.html 已改为 addEventListener，故可安全封装；同时仍把 closeModal 挂到 window 兼容）
appJs = `/*
 * app.js — CA7 黑历史档案馆 渲染与交互逻辑
 * 依赖 data.js 提供的全局: events, catConfig, timelineData, quotes
 * 由 build/split-files.cjs 从原始单文件提取并封装。
 */
(function () {
"use strict";
` + appJs + `
})();
`;

// 校验：app.js 内不应再含 base64
if (/data:image\/[a-z]+;base64,/.test(appJs)) {
  console.warn("⚠ app.js 仍含 base64，请检查");
}
fs.writeFileSync(path.join(ROOT, "assets", "js", "app.js"), appJs);

/* ---------- 5. index.html : 用外部引用替换 <style>/<script> 块 ---------- */
let idx = html;

// 5a. 替换 <style>...</style> 为 <link>
idx = idx.replace(/<style>[\s\S]*?<\/style>/,
  '<link rel="stylesheet" href="assets/css/style.css">');

// 5b. 替换 <script>...</script> 为两个外部 script（data.js 必须先于 app.js）
idx = idx.replace(/<script>[\s\S]*?<\/script>/,
  '<script src="assets/js/data.js"><\/script>\n<script src="assets/js/app.js"><\/script>');

fs.writeFileSync(path.join(ROOT, "index.html"), idx);

/* ---------- 6. 报告 ---------- */
console.log("=== 拆分完成 ===");
console.log("assets/css/style.css :", styleCss.split("\n").length, "行");
console.log("assets/js/data.js    :", dataJs.split("\n").length, "行");
console.log("assets/js/app.js     :", appJs.split("\n").length, "行");
console.log("index.html           :", idx.split(/\r?\n/).length, "行");
console.log("");
console.log("data.js 含 events:", /const events = \[/.test(dataJs));
console.log("data.js 含 catConfig:", /const catConfig =/.test(dataJs));
console.log("data.js 含 timelineData:", /const timelineData =/.test(dataJs));
console.log("data.js 含 quotes:", /const quotes =/.test(dataJs));
console.log("app.js 残留 events 声明:", /const events = \[/.test(appJs), "(应为 false)");
console.log("index.html 含外部 CSS 引用:", /href="assets\/css\/style.css"/.test(idx));
console.log("index.html 含 data.js 引用:", /src="assets\/js\/data.js"/.test(idx));
console.log("index.html 含 app.js 引用:", /src="assets\/js\/app.js"/.test(idx));
