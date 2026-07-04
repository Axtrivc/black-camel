/*
 * apply-details.cjs — 读取 detail JSON，替换 data.js 里对应事件的 detail 字段
 * 用法: node build/apply-details.cjs <json文件>
 * 通过 vm 沙箱执行 data.js 提取当前结构，找到每个 id 的 detail 行范围，替换。
 */
const fs = require("fs");
const path = require("path");

const jsonFile = process.argv[2] || path.join(__dirname, "apply-details-batch1.json");
const DATA = path.resolve(__dirname, "..", "assets", "js", "data.js");

const updates = JSON.parse(fs.readFileSync(jsonFile, "utf8"));
let src = fs.readFileSync(DATA, "utf8");
let lines = src.split(/\r?\n/);

// 找每个 id 对应的 detail:[ ... ] 行范围
function findDetailRange(id) {
  let idLine = -1, detailStart = -1, detailEnd = -1;
  for (let i = 0; i < lines.length; i++) {
    if (new RegExp("^\\s*id:" + id + ",").test(lines[i])) { idLine = i; }
    if (idLine >= 0 && detailStart < 0 && /^\s*detail:\[/.test(lines[i])) {
      detailStart = i;
    }
    if (detailStart >= 0 && detailEnd < 0 && /^\s*\],\s*$/.test(lines[i])) {
      detailEnd = i;
      break;
    }
  }
  return { idLine, detailStart, detailEnd };
}

let applied = 0;
for (const upd of updates) {
  const { detailStart, detailEnd } = findDetailRange(upd.id);
  if (detailStart < 0 || detailEnd < 0) {
    console.warn(`⚠ id:${upd.id} 未找到 detail 范围，跳过`);
    continue;
  }
  // 构造新的 detail 行（保持缩进 4 空格 + 字符串数组）
  const indent = "      ";
  const newLines = ["    detail:["];
  for (const para of upd.detail) {
    // 转义：JSON 字符串里已是普通文本，写入 JS 需用双引号包裹，内部双引号转义
    const escaped = para.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    newLines.push(indent + '"' + escaped + '",');
  }
  // 最后一个元素去尾逗号
  if (newLines.length > 1) newLines[newLines.length - 1] = newLines[newLines.length - 1].slice(0, -1);
  newLines.push("    ],");

  // 替换 detailStart..detailEnd (含)
  lines.splice(detailStart, detailEnd - detailStart + 1, ...newLines);
  applied++;
  console.log(`✓ id:${upd.id} detail 已替换 (${newLines.length-2}段)`);
}

fs.writeFileSync(DATA, lines.join("\r\n"));
console.log(`\n完成: ${applied}/${updates.length} 个事件 detail 已更新`);
