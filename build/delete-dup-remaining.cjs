/* delete-dup-remaining.cjs — 删除剩余4个重复事件 id:26,32,44,63 */
const fs = require("fs");
const path = require("path");
const DATA = path.resolve(__dirname, "..", "assets", "js", "data.js");
const DELETE_IDS = [26, 32, 44, 63];

let lines = fs.readFileSync(DATA, "utf8").split(/\r?\n/);
let removed = 0;

for (const targetId of DELETE_IDS) {
  // 找 id:targetId 所在行
  let idLineIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (new RegExp("^\\s*id:" + targetId + ",").test(lines[i])) { idLineIdx = i; break; }
  }
  if (idLineIdx < 0) { console.log(`✗ id:${targetId} 未找到`); continue; }

  // 向上找该对象的开始 { (在同缩进的 { )
  let startIdx = idLineIdx;
  for (let i = idLineIdx; i >= Math.max(0, idLineIdx - 5); i--) {
    if (/^\s{2}\{$/.test(lines[i])) { startIdx = i; break; }
  }
  // 向下找该对象的结束 }, (2空格缩进的 },)
  let endIdx = idLineIdx;
  for (let i = idLineIdx + 1; i < lines.length; i++) {
    if (/^\s{2}\},?\s*$/.test(lines[i])) { endIdx = i; break; }
  }

  console.log(`✓ 删除 id:${targetId} (行 ${startIdx + 1}-${endIdx + 1})`);
  lines.splice(startIdx, endIdx - startIdx + 1);
  removed++;
}

fs.writeFileSync(DATA, lines.join("\r\n"));
console.log(`\n共删除 ${removed} 个`);
