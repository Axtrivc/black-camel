/*
 * delete-duplicate-events.cjs — 删除7个高度重复的事件
 * 删除的id: 26,32,33,37,44,58,63
 * 原因：与保留项完全同一事件或主题完全重叠
 */
const fs = require("fs");
const path = require("path");
const DATA = path.resolve(__dirname, "..", "assets", "js", "data.js");

const DELETE_IDS = [26, 32, 33, 37, 44, 58, 63];
const DELETE_REASONS = {
  26: "蹭大罗热度(与25背弃祖姓重叠)",
  32: "12女友名单(与27风流情史重复)",
  33: "夏窗被拒(与20转会闹剧完全同一事件)",
  37: "罗三脚(与4双红会三连踢完全同一事件)",
  44: "5娃3妈(与27/28重复)",
  58: "肖像权逃税2014(与1逃税案重复)",
  63: "重回曼联进球荒(与19/20重叠)",
};

let src = fs.readFileSync(DATA, "utf8");
const lines = src.split(/\r?\n/);

// 找每个事件对象的行范围（从 id:N, 到下一个 }, 或 events 数组结束 ]
const eventRanges = [];
let i = 0;
while (i < lines.length) {
  if (/^\s{2}\{$/.test(lines[i]) || /^\s{2}\{$/.test(lines[i])) {
    // 检查接下来几行是否有 id:N,
    for (let j = i + 1; j < Math.min(i + 4, lines.length); j++) {
      const m = lines[j].match(/^\s*id:(\d+),/);
      if (m) {
        const id = parseInt(m[1]);
        // 找该对象的结束 }（同级缩进的 }， ）
        for (let k = j + 1; k < lines.length; k++) {
          if (/^\s{2}\},?\s*$/.test(lines[k])) {
            eventRanges.push({ id, start: i, end: k });
            i = k + 1;
            break;
          }
        }
        break;
      }
    }
  }
  i++;
}

// 删除目标事件
let removed = 0;
const toRemove = []; // 行索引
for (const er of eventRanges) {
  if (DELETE_IDS.includes(er.id)) {
    for (let l = er.start; l <= er.end; l++) toRemove.push(l);
    removed++;
    console.log(`✓ 删除 id:${er.id} (${DELETE_REASONS[er.id]})`);
  }
}

// 从后往前删行
toRemove.sort((a, b) => b - a);
for (const idx of toRemove) {
  lines.splice(idx, 1);
}

fs.writeFileSync(DATA, lines.join("\r\n"));
console.log(`\n共删除 ${removed} 个事件，剩余 ${eventRanges.length - removed} 个`);
