/*
 * remap-event-images.cjs — 63事件→事件相关图，智能去重分配
 * 每个事件给「按相关性排序的候选图列表」，脚本贪心分配（优先级高的先选，已占用的跳过）。
 * 保证每张图独占。图源：维基CC场景图 + 维基现场图截图 + 保留的旧人物图。
 */
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
const DATA = path.join(ROOT, "assets", "js", "data.js");
const S = "assets/images/scenes/";
const E = "assets/images/events/";
const G = "assets/images/gallery/";

// 每个事件：候选图优先级（最相关在前）。脚本按顺序取第一个未被占用的。
const CANDIDATES = {
  // === 法律/财务 → 法院/地标/酒店 ===
  1:  [S+"scene-court.jpg"],                          // 逃税案→马德里法院
  2:  [S+"scene-vegas.jpg", S+"scene-vegasstrip.jpg"],// 强奸案→Palms酒店/拉斯维加斯
  58: [S+"scene-vegasstrip.jpg", S+"scene-court.jpg"],// 肖像权逃税→同属法律
  11: [S+"scene-goodison.jpg"],                       // 摔手机→古迪逊公园
  // === 场外失态 → 相关物/球场 ===
  12: [S+"scene-armband.jpg", E+"ev-43.jpg"],         // 扔麦克风→袖标(队长媒体)
  13: [S+"scene-armband.jpg"],                        // 摔袖标→队长袖标
  14: [S+"scene-nassrstadium.jpg", E+"ev-14.jpg"],    // 不雅动作(沙特)→利雅得球场
  15: [S+"scene-penalty.jpg", E+"ev-26.jpg"],         // 小动作→点球
  // === 暴力/红牌 ===
  3:  [E+"ev-03.jpg"],                                // 西超杯推裁判→皇马雨天(同期)
  4:  [E+"ev-double-red.jpg", E+"ev-33.jpg"],         // 双红会三连踢→2021双红会现场
  5:  [E+"ev-08.jpg"],                                // 拳击克雷霍维亚克→皇马
  6:  [E+"ev-15.jpg"],                                // 肘击阿尔维斯→皇马
  7:  [S+"scene-juvestadium.jpg", E+"ev-30.jpg"],     // 飞踹克拉尼奥(尤文)→安联都灵
  8:  [E+"ev-16.jpg"],                                // 掌掴奥谢→葡红
  9:  [E+"ev-02.jpg"],                                // 14红牌总账→皇马欧冠
  10: [E+"ev-29.jpg"],                                // 2025首红→葡白
  37: [E+"ev-34.jpg", E+"ev-double-red.jpg"],         // 罗三脚→曼联2021(同场)
  51: [E+"ev-40.jpg"],                                // 竖中指→皇马2018
  // === 国家队赛事 → 现场图 ===
  22: [E+"ev-2016final.jpg"],                         // 2016欧洲杯决赛→决赛现场
  23: [E+"ev-23.jpg"],                                // 世界杯0球→葡红2019
  24: [E+"ev-05.jpg"],                                // 营销注水→葡2015肖像
  46: [E+"ev-wc2022.jpg"],                            // 2022世界杯→2022世界杯现场
  47: [E+"ev-09.jpg"],                                // 2026世界杯→葡白2022
  52: [E+"ev-wc2018.jpg"],                            // 2018世界杯帽子→2018世界杯现场
  56: [S+"scene-wc2006lineup.jpg", E+"ev-45.jpg"],    // 眨眼门→2006葡英阵容
  60: [E+"ev-ballon2014.jpg"],                        // 2014带伤→2014金球(同年)
  // === 颁奖/活动 ===
  16: [S+"scene-coke.jpg"],                           // 可口可乐→可乐瓶
  17: [S+"scene-globesoccer.jpg"],                    // 环球足球奖→奖项
  18: [G+"ballon.jpg"],                               // 2013金球→金球颁奖
  19: [E+"ev-39.jpg"],                                // 摩根采访→西装肖像
  // === 转会/俱乐部 → 球场 ===
  20: [S+"scene-oldtrafford.jpg"],                    // 夏窗转会→老特拉福德
  21: [S+"scene-juvestadium.jpg", S+"scene-bernabeu.jpg", E+"ev-48.jpg"], // 废队友尤文→安联/尤文
  33: [S+"scene-bernabeu.jpg"],                       // 夏窗被拒→伯纳乌
  36: [S+"scene-sauditrophy.jpg"],                    // 沙漠骆驼夺冠→沙特联赛奖杯
  45: [S+"scene-carrington.jpg"],                     // 范尼冲突→卡灵顿训练基地
  53: [E+"ev-32.jpg"],                                // 尤文孤立→尤文
  57: [E+"ev-31.jpg", E+"ev-48.jpg"],                 // 第一次离队→尤文
  59: [S+"scene-ucltrophy.jpg"],                      // 欧冠十六郎→欧冠奖杯
  61: [E+"ev-25.jpg"],                                // 球衣号码→皇马颁奖7号
  62: [S+"scene-nassrstadium.jpg", E+"ev-28.jpg"],    // 沙特点球→利雅得
  63: [E+"ev-35.jpg"],                                // 重回曼联→曼联2022
  // === 人设/概念 ===
  25: [S+"scene-aveiro.jpg"],                         // 背弃祖姓→Aveiro姓氏地
  26: [S+"scene-ronaldoBRA.jpg"],                     // 蹭大罗→巴西大罗
  27: [E+"ev-12.jpg"],                                // 12女友→便装
  28: [E+"ev-44.jpg"],                                // 迷你罗→葡白
  29: [E+"ev-27.jpg"],                                // 抢点球→皇马
  30: [E+"ev-30.jpg", E+"ev-36.jpg"],                 // 水罗→尤文/曼联早期
  31: [E+"ev-33.jpg", E+"ev-36.jpg"],                 // 花罗→曼联2021(注:花罗是早期,但ev早期图已用)
  32: [E+"ev-46.jpg"],                                // 12女友名单→葡白
  34: [S+"scene-bilibili.jpg"],                       // 鸡你太美→B站
  35: [S+"scene-instagram.jpg"],                      // CR7商业→IG(品牌)
  38: [E+"ev-10.jpg"],                                // 刀削面(沙特)→利雅得训练
  39: [E+"ev-11.jpg"],                                // 摩根2025→葡白
  40: [S+"scene-xlogo.jpg"],                          // 吕七优人→X/社媒
  41: [E+"ev-37.jpg"],                                // 点球念咒→皇马2017
  42: [E+"ev-38.jpg"],                                // 找裁判→皇马2018
  43: [S+"scene-messi.jpg"],                          // 梅罗对立→梅西
  44: [E+"ev-19.jpg"],                                // 5娃3妈→葡白
  48: [E+"ev-20.jpg"],                                // 推球迷→利雅得
  49: [E+"ev-21.jpg"],                                // 自律→葡红
  50: [E+"ev-17.jpg"],                                // 慈善→皇马颁奖
  54: [S+"scene-xlogo.jpg", E+"ev-06.jpg"],           // 社媒买粉→X/社媒
  55: [E+"ev-01.jpg"],                                // 结晶粉丝→葡2019红
};

// 贪心分配
const assigned = {};   // id → path
const usedPaths = new Set();
const failed = [];

// 按候选数少的优先分配（减少冲突）—— 先排序
const order = Object.keys(CANDIDATES).map(Number)
  .sort((a,b) => CANDIDATES[a].length - CANDIDATES[b].length);

for (const id of order) {
  const cands = CANDIDATES[id];
  let pick = null;
  for (const c of cands) {
    // 校验文件存在
    const full = path.join(ROOT, c);
    if (!fs.existsSync(full)) { continue; }  // 跳过不存在的
    if (!usedPaths.has(c)) { pick = c; break; }
  }
  if (pick) {
    assigned[id] = pick;
    usedPaths.add(pick);
  } else {
    failed.push(id);
  }
}

if (failed.length) {
  console.error("✗ 以下事件无可用图(候选都被占或文件不存在):", failed);
}

// 应用替换（按行替换，可靠）
let lines = fs.readFileSync(DATA, "utf8").split(/\r?\n/);
let changed = 0;
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/^(\s*)id:(\d+),/);
  if (m && assigned[m[2]]) {
    for (let j = i; j < i + 6 && j < lines.length; j++) {
      if (lines[j].match(/^\s*img:"/)) {
        lines[j] = lines[j].replace(/img:"[^"]*"/, `img:"${assigned[m[2]]}"`);
        changed++;
        break;
      }
    }
  }
}
fs.writeFileSync(DATA, lines.join("\r\n"));

console.log(`\n=== 完成 ===`);
console.log(`已分配 ${changed}/63 个事件（${failed.length} 个失败）`);
console.log(`使用图片 ${usedPaths.size} 张，全部独占`);
// 按类型统计
const sceneCount = [...usedPaths].filter(p=>p.includes("/scenes/")).length;
const eventCount = [...usedPaths].filter(p=>p.includes("/events/")).length;
const galleryCount = [...usedPaths].filter(p=>p.includes("/gallery/")).length;
console.log(`  场景图(地标/相关物): ${sceneCount} | 事件现场图: ${eventCount} | gallery保留: ${galleryCount}`);
