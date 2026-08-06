/**
 * backfill-extra-es.js — 用 ES 翻译重写 assets/js/extra-data.js
 *
 * 策略（稳健、不依赖脆弱锚点）：
 *   1) 用 vm 沙箱执行原 extra-data.js，取出 pkData/penaltyData/moneyLedger/
 *      memePresets/quizData/truthOrFake/casinoBets 数据结构。
 *   2) 合并 es-content.js 提供的 ES 翻译（按对应字段的 _En 锚点匹配条目）。
 *   3) 重新序列化为 extra-data.js 的既有风格（key:"value"，2 空格缩进）。
 *   4) 保留文件头部注释与各 section 的分隔注释。
 *
 * 运行： node scripts/backfill-extra-es.js
 */
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const EXTRA_JS = path.join(ROOT, "assets/js/extra-data.js");
const ES = require("./es-content.js");

/* ---------- 序列化（extra-data 风格：key 不带引号，字符串用双引号）---------- */
function ser(val, indent) {
  const pad = "  ".repeat(indent);
  if (val === null || val === undefined) return "null";
  if (typeof val === "string") return JSON.stringify(val);
  if (typeof val === "number" || typeof val === "boolean") return String(val);
  if (Array.isArray(val)) {
    if (val.length === 0) return "[]";
    return "[\n" + val.map((v) => pad + ser(v, indent + 1)).join(",\n") + "\n" + "  ".repeat(indent) + "]";
  }
  if (typeof val === "object") {
    const keys = Object.keys(val);
    if (keys.length === 0) return "{}";
    return "{\n" + keys.map((k) => pad + safeKey(k) + ": " + ser(val[k], indent + 1)).join(",\n") + "\n" + "  ".repeat(indent) + "}";
  }
  return String(val);
}
function safeKey(k) {
  return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) ? k : JSON.stringify(k);
}

/* ---------- 加载原 extra-data.js ---------- */
function loadExtra() {
  const src = fs.readFileSync(EXTRA_JS, "utf8");
  const wrapped =
    "(function(){\n" +
    src +
    "\n;this.__e={pkData,penaltyData,moneyLedger,memePresets,quizData,truthOrFake,casinoBets};}).call(globalThis);";
  const sb = { window: {}, self: {}, localStorage: { getItem: () => null } };
  sb.globalThis = sb;
  vm.createContext(sb);
  vm.runInContext(wrapped, sb, { filename: "extra-data.js" });
  return sb.__e;
}

/* ---------- 合并 ES 翻译 ---------- */
function mergeEs(data) {
  // pkData: 按 labelEn 匹配
  (ES.pkData || []).forEach((p) => {
    const item = data.pkData.find((x) => x.labelEn === p._labelEn);
    if (!item) return;
    item.labelEs = p.labelEs;
    item.subEs = p.subEs;
    if (item.cr7) item.cr7.noteEs = p.cr7NoteEs;
    if (item.messi) item.messi.noteEs = p.messiNoteEs;
    item.tipEs = p.tipEs;
  });
  // penaltyData.items: 按 labelEn 匹配
  (ES.penaltyItems || []).forEach((p) => {
    const item = data.penaltyData.items.find((x) => x.labelEn === p._labelEn);
    if (!item) return;
    item.labelEs = p.labelEs;
    item.valueEs = p.valueEs;
    item.unitEs = p.unitEs;
    item.noteEs = p.noteEs;
  });
  if (ES.penaltyTotalLabel) data.penaltyData.totalLabelEs = ES.penaltyTotalLabel;
  // moneyLedger: 按 descEn 匹配
  (ES.moneyLedger || []).forEach((m) => {
    const item = data.moneyLedger.find((x) => x.descEn === m._descEn);
    if (!item) return;
    item.descEs = m.descEs;
    item.detailEs = m.detailEs;
    item.catEs = m.catEs;
  });
  // memePresets: 按 topEn 匹配
  (ES.memePresets || []).forEach((p) => {
    const item = data.memePresets.find((x) => x.topEn === p._topEn);
    if (!item) return;
    item.topEs = p.topEs;
    item.bottomEs = p.bottomEs;
  });
  // quizData: 按 qEn 匹配；opts.vEs 按 vEn 顺序
  (ES.quizData || []).forEach((q) => {
    const item = data.quizData.find((x) => x.qEn === q._qEn);
    if (!item) return;
    item.qEs = q.qEs;
    item.fbEs = q.fbEs;
    if (Array.isArray(item.opts)) {
      item.opts.forEach((o, i) => {
        if (typeof o === "object" && o !== null) o.vEs = q.optsVEs[i];
      });
    }
  });
  // truthOrFake: 按 textEn 匹配
  (ES.truthOrFake || []).forEach((t) => {
    const item = data.truthOrFake.find((x) => x.textEn === t._textEn);
    if (!item) return;
    item.textEs = t.textEs;
    item.sourceEs = t.sourceEs;
    item.revealEs = t.revealEs;
  });
  // casinoBets: 按 qEn 匹配
  (ES.casinoBets || []).forEach((c) => {
    const item = data.casinoBets.find((x) => x.qEn === c._qEn);
    if (!item) return;
    item.qEs = c.qEs;
    item.aEs = c.aEs;
    item.bEs = c.bEs;
    item.revealEs = c.revealEs;
  });
  return data;
}

/* ---------- 重新生成文件（保留头部注释 + section 注释）---------- */
function rebuild(data) {
  // memePhotos 不变；其它重新序列化。section 分隔注释用占位标记，序列化时插入。
  const sections = [
    { comment: "/* ========== 梅罗 PK 大战数据 ==========\n * 这是一个讽刺 C罗的黑历史网站。\n * 字段 loser：表示该维度下\"黑点更重 / 被讽刺\"的一方（绝大部分是 cr7）。\n * 数据驱动：哪一方数值代表\"更差/更黑\"，就把该方标为 loser。\n * tip 的措辞统一为讽刺口吻。\n */", name: "pkData", value: data.pkData },
    { comment: "/* ========== 点球含金量检测仪数据 ==========\n * 每个 item 是一项\"注水\"指标，含金量越低讽刺越重\n */", name: "penaltyData", value: data.penaltyData },
    { comment: "/* ========== 罪恶账本烧钱榜 ==========\n * 金额从大到小，单位统一处理\n */", name: "moneyLedger", value: data.moneyLedger },
    { comment: "/* ========== C罗表情生成器素材 ==========\n * memePhotos: 嬷照底图池 —— 从 hero-mo 全部 37 张 + 部分绰号/事件图，保证多样性\n * memePresets: 预设讽刺金句（上下两行，meme 经典格式）\n */", name: "memePresets", value: data.memePresets, noteMemePhotos: true },
    { comment: "/* ========== 罗黑程度测试题库 ==========\n * 25 题单选大题库，每次随机抽取并打乱题序/选项，保证每局体验不同。\n * 紧扣本馆数据：红牌/世界杯/点球/跳水/金球/逃税/可口可乐/摔手机/袖标/\n * 眨眼门/利雅得/卢森堡/任意球/迷你罗/自设奖项/背弃祖姓 等。\n * a = 正确选项 index（0 起），fb = 作答后的解释反馈。\n */", name: "quizData", value: data.quizData },
    { comment: "/* ========== 真假语录库（真：他真说过；假：馆方拟写，比真话还离谱）========== */", name: "truthOrFake", value: data.truthOrFake },
    { comment: "/* ========== #9 罗黑赌场 — 黑料命题下注 ==========\n * 玩家用虚拟「Factos 币」对「C罗 式行为是否发生」下注。\n * 注意：命题基于 C罗 历史行为的真实概率，开盘 = 按该概率随机模拟一次「他又会怎样」，\n *   不是预测某场具体未来比赛。\n * odds: 赔率倍数；hist: 该行为在 C罗 历史中真实发生的概率（0~1，决定开奖倾向）。\n * reveal: 开奖后弹出的黑料科普。\n */", name: "casinoBets", value: data.casinoBets },
  ];

  const header =
    '/* 数据快照 2026-07: CR7 金球5 金靴4 | Messi 金球8 · 生涯进球数据持续更新，以 events/timeline 为准 */\n' +
    "/*\n" +
    " * extra-data.js — CA7 黑历史档案馆 创意模块数据层\n" +
    " * 依赖：无（纯数据）。被 app.js 顺序加载后使用。\n" +
    " * 提供：pkData, penaltyData, moneyLedger, memePresets, memePhotos\n" +
    " */\n" +
    '"use strict";\n\n';

  let body = "";
  sections.forEach((s, i) => {
    body += s.comment + "\n";
    // memePhotos 原样保留（从源文件提取）
    if (s.noteMemePhotos) {
      body += extractMemePhotos() + "\n\n";
    }
    body += "const " + s.name + " = " + ser(s.value, 0) + ";\n";
    if (i < sections.length - 1) body += "\n";
  });

  return header + body + "\n";
}

// 从源文件提取 memePhotos 原文（图列表不变）
let _memePhotosText = null;
function extractMemePhotos() {
  if (_memePhotosText) return _memePhotosText;
  const src = fs.readFileSync(EXTRA_JS, "utf8");
  const m = src.match(/const memePhotos = \[[\s\S]*?\];/);
  _memePhotosText = m ? m[0] : "const memePhotos = [];";
  return _memePhotosText;
}

/* ---------- 主流程 ---------- */
function main() {
  console.log("[backfill-extra-es] 重写 extra-data.js 加入 ES 翻译…");
  const data = loadExtra();
  mergeEs(data);

  // 校验：合并后语法可解析（用同样 vm 方式）
  const out = rebuild(data);
  const testWrapped =
    "(function(){\n" +
    out +
    "\n;this.__test={pkData,penaltyData,moneyLedger,memePresets,quizData,truthOrFake,casinoBets};}).call(globalThis);";
  const sb = { window: {}, self: {}, localStorage: { getItem: () => null } };
  sb.globalThis = sb;
  vm.createContext(sb);
  try {
    vm.runInContext(testWrapped, sb, { filename: "extra-data.test.js" });
  } catch (e) {
    console.error("[backfill-extra-es] 生成的文件语法错误，未写入：", e.message);
    process.exit(1);
  }
  fs.writeFileSync(EXTRA_JS, out, "utf8");
  console.log("[backfill-extra-es] ✓ extra-data.js 已重写并校验通过");
}

main();
