/**
 * backfill-es.js — 把 ES_I18N_DICT + es-content.js 中的西语翻译回填到
 *   assets/js/data.js 与 assets/js/extra-data.js
 *
 * 设计：
 *   - data.js / extra-data.js 用顶层 const 声明（非 ES module），vm 沙箱执行。
 *   - 本脚本不重写整个文件，而是做"精确字符串替换"：
 *       1) i18nDict：在 `  "zh": {` 前插入 `  "es": {...},`（保留 en/zh 原文不动）
 *       2) 各数据对象的 *Es 字段：在指定锚点后插入 `*Es: "..."` 行
 *   - 翻译源来自 es-i18n-dict.js（UI 词条）+ es-content.js（事件/金句/绰号/时间线/分类 等）。
 *
 * 运行： node scripts/backfill-es.js
 *   幂等：重复运行会先清除已存在的 es 块/Es 字段再写入（基于标记）。
 */
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DATA_JS = path.join(ROOT, "assets/js/data.js");
const EXTRA_JS = path.join(ROOT, "assets/js/extra-data.js");

const ES_I18N_DICT = require("./es-i18n-dict.js");
const ES_CONTENT = require("./es-content.js");
// 锚点源（英文原文）：从 i18n_export.json 取 events/timeline/quotes/nicknames 的 *_En 值
const EXPORT = (() => {
  const candidates = [
    path.join(ROOT, "i18n_export.json"),
    "./i18n_export.json",
    "../i18n_export.json"
  ];
  for (const p of candidates) {
    try { return require(p); } catch (e) {}
  }
  console.warn("[backfill-es] ⚠ 未找到 i18n_export.json，_En 锚点将缺失，内容注入会跳过");
  return null;
})();

/* 用 EXPORT 为 timeline/quotes/nicknames 补 _descEn/_textEn/_nameEn 等锚点（按索引对应） */
function enrichAnchors() {
  if (!EXPORT) return;
  // timeline: 按 _titleEn 匹配补 _descEn
  if (Array.isArray(ES_CONTENT.timeline) && EXPORT.timeline) {
    ES_CONTENT.timeline.forEach((t) => {
      const src = EXPORT.timeline.find((x) => x.titleEn === t._titleEn);
      if (src) t._descEn = src.descEn;
    });
  }
  // nicknames: 按 _nameEn 补 _periodEn / _descEn（此处注入只需 _nameEn，无需额外）
  // events: 按 id 补 _titleEn / _authorEn / 各 _En 字段
  if (Array.isArray(ES_CONTENT.events) && EXPORT.events) {
    ES_CONTENT.events.forEach((e) => {
      const src = EXPORT.events.find((x) => x.id === e.id);
      if (src) {
        e._titleEn = e._titleEn || src.titleEn;
        e._summaryEn = e._summaryEn || src.summaryEn;
        e._dateEn = e._dateEn || src.dateEn;
        e._locationEn = e._locationEn || src.locationEn;
        e._authorEn = (src.quote && src.quote.authorEn) || "";
        e._textEn = (src.quote && src.quote.textEn) || "";
      }
    });
  }
  // quotes: 按 _textEn 补 _authorEn（注入只需 _textEn）
  // extra-data 锚点在 es-content 里手填或下面补
}
enrichAnchors();

/* ---------- 工具：把 JS 值序列化为 data.js 风格的代码片段 ---------- */
// 字符串 → 双引号包裹、转义；数组/对象 → 2 空格缩进 JSON-ish（key 用双引号）
function serialize(val, indent) {
  const pad = " ".repeat(indent);
  const padInner = " ".repeat(indent + 2);
  if (val === null || val === undefined) return "null";
  if (typeof val === "string") return JSON.stringify(val);
  if (typeof val === "number" || typeof val === "boolean") return String(val);
  if (Array.isArray(val)) {
    if (val.length === 0) return "[]";
    const items = val.map((v) => padInner + serialize(v, indent + 2));
    return "[\n" + items.join(",\n") + "\n" + pad + "]";
  }
  if (typeof val === "object") {
    const keys = Object.keys(val);
    if (keys.length === 0) return "{}";
    const items = keys.map(
      (k) => padInner + JSON.stringify(k) + ": " + serialize(val[k], indent + 2)
    );
    return "{\n" + items.join(",\n") + "\n" + pad + "}";
  }
  return String(val);
}

/* ---------- 1) 注入 i18nDict.es ----------
 * 在 data.js 中 `  "zh": {` 之前插入 `  "es": {...},`。
 * 幂等：若已存在 `  "es": {`（由本脚本写入），先删除从该行到对应 `  },\n  "zh":` 之前的内容。
 */
function injectI18nEs(src) {
  // i18nDict 的 en/zh 键顶格（0 缩进）： "en": { ... },\n"zh": { ... }
  // es 块用同样的 0 缩进风格，插入到 "zh": { 之前。
  const esLines = [];
  esLines.push('"es": {');
  const keys = Object.keys(ES_I18N_DICT);
  keys.forEach((k, i) => {
    esLines.push("  " + JSON.stringify(k) + ": " + serialize(ES_I18N_DICT[k], 2) + (i < keys.length - 1 ? "," : ""));
  });
  esLines.push("},");
  const esText = esLines.join("\n") + "\n";

  // 幂等：先移除已存在的 es 块（从 '"es": {' 顶格到 '"zh": {' 之前）
  let out = src;
  const esStart = out.indexOf('\n"es": {');
  if (esStart !== -1) {
    const zhIdx = out.indexOf('\n"zh": {', esStart);
    if (zhIdx !== -1) {
      out = out.slice(0, esStart) + "\n" + out.slice(zhIdx + 1);
    }
  }
  // 在 '"zh": {' 前插入 esText
  const zhMarker = '\n"zh": {';
  const zhIdx2 = out.indexOf(zhMarker);
  if (zhIdx2 === -1) throw new Error("找不到 i18nDict de \"zh\": { 锚点");
  out = out.slice(0, zhIdx2 + 1) + esText + out.slice(zhIdx2 + 1);
  return out;
}

/* ---------- 2) 注入事件 *Es 字段 ----------
 * 对每个 event，在 `titleEn: "..."` 行后插入 `titleEs/summaryEs/dateEs/locationEs/detailEs`；
 * quote 在 `quote:{...}` 块内注入 textEs/authorEs。
 * 用 _slug 定位事件块（更稳），但 data.js 事件无 slug；改用 id + titleEn 双重锚点。
 *
 * 策略：对每个事件，取其 titleEn 文本作为锚点行，在该行后注入 Es 字段行。
 * detailEs 是数组，需多行注入。
 */
function escapeForRegex(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildEsFieldLine(field, value) {
  if (Array.isArray(value)) {
    // detailEs: 多行数组
    const inner = value.map((v) => "      " + JSON.stringify(v));
    return "    " + field + "Es: [\n" + inner.join(",\n") + "\n    ]";
  }
  return "    " + field + "Es: " + JSON.stringify(value);
}

function injectEventsEs(src) {
  let out = src;
  const evs = ES_CONTENT.events; // [{id, titleEs, summaryEs, dateEs, locationEs, detailEs:[...], quoteEs:{textEs,authorEs}}]
  evs.forEach((ev) => {
    // 锚点：该事件的 titleEn 行。titleEn 来自原 data.js，作为唯一定位。
    // 但为稳健，我们要求 ES_CONTENT 提供 titleEn（导出快照），用以构造锚点。
    const anchor = "titleEn:" + JSON.stringify(ev._titleEn) + ",";
    const idx = out.indexOf(anchor);
    if (idx === -1) {
      throw new Error("事件锚点未找到 (id=" + ev.id + "): " + anchor);
    }
    // 该行结尾（含逗号）后的换行位置
    const lineEnd = out.indexOf("\n", idx);
    if (lineEnd === -1) throw new Error("事件 titleEn 行无换行 (id=" + ev.id + ")");

    // 幂等：先删除该事件已存在的 Es 字段块（从 titleEs 到 locationEs/detailEs 闭合）
    // 简单做法：从 lineEnd 之后扫描，删除连续的 *Es: 行，直到遇到非 *Es 行
    let cursor = lineEnd + 1;
    const esFieldRe = /^[ \t]+(?:titleEs|summaryEs|dateEs|locationEs|detailEs): /;
    // detailEs 数组可能跨多行；先逐行删
    while (true) {
      const rest = out.slice(cursor);
      const m = rest.match(/^[ \t]+(\w+Es):/);
      if (!m) break;
      // 找到该字段结束：若是数组，结束于独立 '    ]' 行；否则本行结束
      const fieldLineEnd = out.indexOf("\n", cursor);
      const fieldLine = out.slice(cursor, fieldLineEnd);
      if (/detailEs:\s*\[/.test(fieldLine) && !/\]\s*,?\s*$/.test(fieldLine)) {
        // 多行数组：找到闭合 '    ]'
        const closeIdx = out.indexOf("\n    ]", cursor);
        if (closeIdx === -1) break;
        out = out.slice(0, cursor) + out.slice(closeIdx + "\n    ]".length + 1);
      } else {
        // 单行字段
        out = out.slice(0, cursor) + out.slice(fieldLineEnd + 1);
      }
    }

    // 重新定位锚点（删除可能改变偏移，但我们在删除前的 idx 之前没动，锚点不变；lineEnd 也不变）
    // 构造插入文本
    const lines = [];
    lines.push(buildEsFieldLine("title", ev.titleEs) + ",");
    lines.push(buildEsFieldLine("summary", ev.summaryEs) + ",");
    lines.push(buildEsFieldLine("date", ev.dateEs) + ",");
    lines.push(buildEsFieldLine("location", ev.locationEs) + ",");
    lines.push(buildEsFieldLine("detail", ev.detailEs) + ","); // 数组，带尾逗号（后面紧跟原 date: 等字段）
    const insertText = lines.join("\n") + "\n";
    // 重新计算锚点位置（前面删除在锚点之后，锚点偏移不变；但保险起见重新查找）
    const idx2 = out.indexOf(anchor);
    const lineEnd2 = out.indexOf("\n", idx2);
    out = out.slice(0, lineEnd2 + 1) + insertText + out.slice(lineEnd2 + 1);
  });

  // 注入 quoteEs：在每个事件的 quote 块内
  // quote 是单行对象：quote:{text:"..", textEn:"..", author:"..", authorEn:".."}
  // 故在 authorEn:"..."} 的 `}` 前插入 , textEs:"..", authorEs:".."
  evs.forEach((ev) => {
    if (!ev.quoteEs) return;
    const anchor = "authorEn:" + JSON.stringify(ev._authorEn) + "}";
    const idx = out.indexOf(anchor);
    if (idx === -1) return; // 可能无 quote；跳过
    // 幂等：若已注入 (, textEs:) 则先删 —— 移除从 authorEn 值结尾到 `}` 之间的注入块
    const valEnd = idx + anchor.length - 1; // 指向 `}` 位置
    const bracePos = idx + anchor.length - 1;
    const existing = out.slice(idx + ("authorEn:" + JSON.stringify(ev._authorEn)).length, bracePos);
    if (/textEs:/.test(existing)) {
      // 删除注入块（从 authorEn 值结尾到 bracePos）
      const valContentEnd = idx + ("authorEn:" + JSON.stringify(ev._authorEn)).length;
      out = out.slice(0, valContentEnd) + out.slice(bracePos);
    }
    // 重新定位锚点
    const idx2 = out.indexOf(anchor);
    if (idx2 === -1) return;
    const insert = ", textEs:" + JSON.stringify(ev.quoteEs.textEs) + ", authorEs:" + JSON.stringify(ev.quoteEs.authorEs);
    const bracePos2 = idx2 + anchor.length - 1;
    out = out.slice(0, bracePos2) + insert + out.slice(bracePos2);
  });

  return out;
}

/* ---------- 3) 注入 catConfig.labelEs ---------- */
function injectCatConfigEs(src) {
  let out = src;
  ES_CONTENT.categories.forEach((c) => {
    // 锚点：labelEn:"Persona",color:... 同一行
    const anchor = "labelEn:\"" + c.labelEn + "\"";
    const idx = out.indexOf(anchor);
    if (idx === -1) return;
    const lineEnd = out.indexOf("\n", idx);
    // 幂等删除已有 labelEs
    let cursor = lineEnd + 1;
    const m2 = out.slice(cursor).match(/^[ \t]+labelEs:/);
    if (m2) {
      const fe = out.indexOf("\n", cursor);
      out = out.slice(0, cursor) + out.slice(fe + 1);
    }
    // 在 labelEn 行插入 labelEs（同一行，逗号后）
    const idx2 = out.indexOf(anchor);
    out = out.slice(0, idx2 + anchor.length) + ',labelEs:"' + c.labelEs + '"' + out.slice(idx2 + anchor.length);
  });
  return out;
}

/* ---------- 4) 注入 timelineData *Es ---------- */
/* timelineData 条目是单行对象：{year:..,title:..,titleEn:..,desc:..,descEn:"..."}
 * 故在 descEn:"..."} 的 `}` 前插入 ,titleEs:..,descEs:.. */
function injectTimelineEs(src) {
  let out = src;

  ES_CONTENT.timeline.forEach((t) => {
    // 锚点：descEn 的值。但 descEn 文本可能不唯一；用 titleEn 锚点定位条目，
    // 再在该条目内找 descEn 值的结尾 `}`。
    const titleAnchor = "titleEn:" + JSON.stringify(t._titleEn) + ",";
    const tIdx = out.indexOf(titleAnchor);
    if (tIdx === -1) return;
    // 在该条目内查找 descEn 的值文本结尾。descEs 注入点 = descEn 值之后、`}` 之前。
    const descEnVal = t._descEn;
    const descEnMarker = "descEn:" + JSON.stringify(descEnVal);
    const dIdx = out.indexOf(descEnMarker, tIdx);
    if (dIdx === -1) return;
    // descEnMarker 结束位置
    const valEnd = dIdx + descEnMarker.length;
    // 紧跟应是 `}` （单行对象闭合）
    const afterVal = out.slice(valEnd);
    const closeBrace = afterVal.indexOf("}");
    if (closeBrace === -1 || closeBrace > 200) return; // 安全距离
    // 幂等：若已注入 (,titleEs:) 则先删
    const existing = out.slice(valEnd, valEnd + closeBrace);
    if (/titleEs:/.test(existing)) {
      // 移除从 valEnd 处的 `,titleEs:...,...,descEs:"..."` 到 closeBrace 前
      // 重新计算：从 valEnd 到 valEnd+closeBrace 是注入块，直接删
      out = out.slice(0, valEnd) + out.slice(valEnd + closeBrace);
      // 重新定位
      const tIdx2 = out.indexOf(titleAnchor);
      const dIdx2 = out.indexOf(descEnMarker, tIdx2);
      const valEnd2 = dIdx2 + descEnMarker.length;
      const insert = ",titleEs:" + JSON.stringify(t.titleEs) + ",descEs:" + JSON.stringify(t.descEs);
      out = out.slice(0, valEnd2) + insert + out.slice(valEnd2);
    } else {
      const insert = ",titleEs:" + JSON.stringify(t.titleEs) + ",descEs:" + JSON.stringify(t.descEs);
      out = out.slice(0, valEnd) + insert + out.slice(valEnd);
    }

  });

  return out;
}

/* ---------- 5) 注入 quotes *Es ----------
 * quotes 条目是单行对象：{text:.., author:.., textEn:.., authorEn:"..."}
 * 故在 authorEn:"..."} 的 `}` 前插入 , textEs:.., authorEs:.. */
function injectQuotesEs(src) {
  let out = src;
  ES_CONTENT.quotes.forEach((q) => {
    // 用 textEn 锚点定位条目，再找 authorEn 的闭合 `}`
    const textAnchor = "textEn:" + JSON.stringify(q._textEn) + ",";
    const tIdx = out.indexOf(textAnchor);
    if (tIdx === -1) return;
    // authorEn 值
    const authorEnMarker = "authorEn:" + JSON.stringify(q._authorEn);
    const aIdx = out.indexOf(authorEnMarker, tIdx);
    if (aIdx === -1) return;
    const valEnd = aIdx + authorEnMarker.length;
    // 紧跟应是 `}` （单行对象闭合）
    const afterVal = out.slice(valEnd);
    const closeBrace = afterVal.indexOf("}");
    if (closeBrace === -1 || closeBrace > 200) return;
    // 幂等：若已注入 (, textEs:) 则先删
    const existing = out.slice(valEnd, valEnd + closeBrace);
    if (/textEs:/.test(existing)) {
      out = out.slice(0, valEnd) + out.slice(valEnd + closeBrace);
    }
    // 重新定位
    const tIdx2 = out.indexOf(textAnchor);
    const aIdx2 = out.indexOf(authorEnMarker, tIdx2);
    if (aIdx2 === -1) return;
    const valEnd2 = aIdx2 + authorEnMarker.length;
    const insert = ", textEs:" + JSON.stringify(q.textEs) + ", authorEs:" + JSON.stringify(q.authorEs);
    out = out.slice(0, valEnd2) + insert + out.slice(valEnd2);
  });
  return out;
}

/* ---------- 6) 注入 nicknamesData *Es ---------- */
function injectNicknamesEs(src) {
  let out = src;
  ES_CONTENT.nicknames.forEach((n) => {
    // 锚点：nameEn:"..." 行
    const anchor = "nameEn:" + JSON.stringify(n._nameEn) + ",";
    const idx = out.indexOf(anchor);
    if (idx === -1) return;
    const lineEnd = out.indexOf("\n", idx);
    // 幂等删除已有 nameEs/periodEs/descEs
    let cursor = lineEnd + 1;
    while (true) {
      const m = out.slice(cursor).match(/^[ \t]+(nameEs|periodEs|descEs):/);
      if (!m) break;
      const fe = out.indexOf("\n", cursor);
      out = out.slice(0, cursor) + out.slice(fe + 1);
    }
    const insertText =
      "    nameEs: " + JSON.stringify(n.nameEs) + ",\n" +
      "    periodEs: " + JSON.stringify(n.periodEs) + ",\n" +
      "    descEs: " + JSON.stringify(n.descEs) + ",\n";
    const idx2 = out.indexOf(anchor);
    const lineEnd2 = out.indexOf("\n", idx2);
    out = out.slice(0, lineEnd2 + 1) + insertText + out.slice(lineEnd2 + 1);
  });
  return out;
}

/* ---------- 主流程 ---------- */
function main() {
  console.log("[backfill-es] 开始回填西语翻译…");

  // ---- data.js ----
  let dataSrc = fs.readFileSync(DATA_JS, "utf8");
  const origData = dataSrc;
  dataSrc = injectI18nEs(dataSrc);
  dataSrc = injectEventsEs(dataSrc);
  dataSrc = injectCatConfigEs(dataSrc);
  dataSrc = injectTimelineEs(dataSrc);
  dataSrc = injectQuotesEs(dataSrc);
  dataSrc = injectNicknamesEs(dataSrc);
  if (dataSrc !== origData) {
    fs.writeFileSync(DATA_JS, dataSrc, "utf8");
    console.log("[backfill-es] ✓ data.js 已更新");
  } else {
    console.log("[backfill-es] data.js 无变化");
  }

  // ---- extra-data.js ----
  if (fs.existsSync(EXTRA_JS)) {
    let extraSrc = fs.readFileSync(EXTRA_JS, "utf8");
    const origExtra = extraSrc;
    extraSrc = injectExtraEs(extraSrc);
    if (extraSrc !== origExtra) {
      fs.writeFileSync(EXTRA_JS, extraSrc, "utf8");
      console.log("[backfill-es] ✓ extra-data.js 已更新");
    } else {
      console.log("[backfill-es] extra-data.js 无变化");
    }
  }

  console.log("[backfill-es] 完成。");
}

/* ---------- extra-data.js 注入（pkData/penaltyData/moneyLedger/memePresets/quizData/truthOrFake/casinoBets）---------- */
function injectExtraEs(src) {
  let out = src;
  const C = ES_CONTENT;

  // pkData: labelEs/subEs/cr7.noteEs/messi.noteEs/tipEs
  (C.pkData || []).forEach((p) => {
    const anchor = "labelEn:" + JSON.stringify(p._labelEn) + ",";
    let idx = out.indexOf(anchor);
    if (idx === -1) return;
    // 幂等删除
    const lineEnd = out.indexOf("\n", idx);
    let cursor = lineEnd + 1;
    while (true) {
      const m = out.slice(cursor).match(/^[ \t]+(labelEs|subEs|tipEs):/);
      if (!m) break;
      const fe = out.indexOf("\n", cursor);
      out = out.slice(0, cursor) + out.slice(fe + 1);
    }
    const insert =
      "    labelEs: " + JSON.stringify(p.labelEs) + ",\n" +
      "    subEs: " + JSON.stringify(p.subEs) + ",\n";
    let idx2 = out.indexOf(anchor);
    let le = out.indexOf("\n", idx2);
    out = out.slice(0, le + 1) + insert + out.slice(le + 1);

    // cr7.noteEs / messi.noteEs
    ["cr7", "messi"].forEach((side) => {
      const noteAnchor = side + ":{val:" + (side === "cr7" ? p._cr7Val : p._messiVal) + ",note:";
      const ni = out.indexOf(noteAnchor);
      if (ni === -1) return;
      // 在该 side 对象内 noteEn 后插入 noteEs
      const noteEnAnchor = "noteEn:" + JSON.stringify(side === "cr7" ? p._cr7NoteEn : p._messiNoteEn) + "}";
      const ne = out.indexOf(noteEnAnchor, ni);
      if (ne === -1) return;
      // 幂等删
      let c = out.indexOf("\n", ne) + 1;
      const m = out.slice(c).match(/^[ \t]+noteEs:/);
      if (m) {
        const fe = out.indexOf("\n", c);
        out = out.slice(0, c) + out.slice(fe + 1);
      }
      const ne2 = out.indexOf(noteEnAnchor, ni);
      const le2 = out.indexOf("\n", ne2);
      const noteEsLine = "      noteEs: " + JSON.stringify(side === "cr7" ? p.cr7NoteEs : p.messiNoteEs) + "\n";
      out = out.slice(0, le2 + 1) + noteEsLine + out.slice(le2 + 1);
    });

    // tipEs：tipEn 行后
    const tipAnchor = "tipEn:" + JSON.stringify(p._tipEn) + ",";
    const ti = out.indexOf(tipAnchor);
    if (ti !== -1) {
      let c = out.indexOf("\n", ti) + 1;
      const m = out.slice(c).match(/^[ \t]+tipEs:/);
      if (m) {
        const fe = out.indexOf("\n", c);
        out = out.slice(0, c) + out.slice(fe + 1);
      }
      const ti2 = out.indexOf(tipAnchor);
      const le3 = out.indexOf("\n", ti2);
      const tipEsLine = "    tipEs: " + JSON.stringify(p.tipEs) + ",\n";
      out = out.slice(0, le3 + 1) + tipEsLine + out.slice(le3 + 1);
    }
  });

  // penaltyData.items: labelEs/valueEs/unitEs/noteEs + totalLabelEs
  (C.penaltyItems || []).forEach((it) => {
    const anchor = "labelEn:" + JSON.stringify(it._labelEn) + ",";
    const idx = out.indexOf(anchor);
    if (idx === -1) return;
    const lineEnd = out.indexOf("\n", idx);
    // 删已有
    let cursor = lineEnd + 1;
    while (true) {
      const m = out.slice(cursor).match(/^[ \t]+(labelEs|valueEs|unitEs|noteEs):/);
      if (!m) break;
      const fe = out.indexOf("\n", cursor);
      out = out.slice(0, cursor) + out.slice(fe + 1);
    }
    const insert =
      "      labelEs: " + JSON.stringify(it.labelEs) + ",\n" +
      "      valueEs: " + JSON.stringify(it.valueEs) + ",\n" +
      "      unitEs: " + JSON.stringify(it.unitEs) + ",\n" +
      "      noteEs: " + JSON.stringify(it.noteEs) + ",\n";
    const idx2 = out.indexOf(anchor);
    const le = out.indexOf("\n", idx2);
    out = out.slice(0, le + 1) + insert + out.slice(le + 1);
  });
  if (C.penaltyTotalLabel) {
    const anchor = "totalLabelEn:" + JSON.stringify(ES_CONTENT._penaltyTotalLabelEn);
    const idx = out.indexOf(anchor);
    if (idx !== -1) {
      let c = out.indexOf("\n", idx) + 1;
      const m = out.slice(c).match(/^[ \t]+totalLabelEs:/);
      if (m) { const fe = out.indexOf("\n", c); out = out.slice(0, c) + out.slice(fe + 1); }
      const idx2 = out.indexOf(anchor);
      const le = out.indexOf("\n", idx2);
      out = out.slice(0, le + 1) + "  totalLabelEs: " + JSON.stringify(C.penaltyTotalLabel) + ",\n" + out.slice(le + 1);
    }
  }

  // moneyLedger: descEs/detailEs/catEs
  (C.moneyLedger || []).forEach((m) => {
    const anchor = "descEn:" + JSON.stringify(m._descEn) + ",";
    const idx = out.indexOf(anchor);
    if (idx === -1) return;
    const lineEnd = out.indexOf("\n", idx);
    let cursor = lineEnd + 1;
    while (true) {
      const mm = out.slice(cursor).match(/^[ \t]+(descEs|detailEs|catEs):/);
      if (!mm) break;
      const fe = out.indexOf("\n", cursor);
      out = out.slice(0, cursor) + out.slice(fe + 1);
    }
    const insert =
      "    descEs: " + JSON.stringify(m.descEs) + ",\n" +
      "    detailEs: " + JSON.stringify(m.detailEs) + ",\n" +
      "    catEs: " + JSON.stringify(m.catEs) + ",\n";
    const idx2 = out.indexOf(anchor);
    const le = out.indexOf("\n", idx2);
    out = out.slice(0, le + 1) + insert + out.slice(le + 1);
  });

  // memePresets: topEs/bottomEs
  (C.memePresets || []).forEach((p) => {
    const anchor = "topEn:" + JSON.stringify(p._topEn) + ",";
    const idx = out.indexOf(anchor);
    if (idx === -1) return;
    const lineEnd = out.indexOf("\n", idx);
    let cursor = lineEnd + 1;
    while (true) {
      const m = out.slice(cursor).match(/^[ \t]+(topEs|bottomEs):/);
      if (!m) break;
      const fe = out.indexOf("\n", cursor);
      out = out.slice(0, cursor) + out.slice(fe + 1);
    }
    const insert =
      "    topEs: " + JSON.stringify(p.topEs) + ",\n" +
      "    bottomEs: " + JSON.stringify(p.bottomEs) + ",\n";
    const idx2 = out.indexOf(anchor);
    const le = out.indexOf("\n", idx2);
    out = out.slice(0, le + 1) + insert + out.slice(le + 1);
  });

  // quizData: qEs/opts.vEs/fbEs
  (C.quizData || []).forEach((q) => {
    const anchor = "qEn:" + JSON.stringify(q._qEn) + ",";
    const idx = out.indexOf(anchor);
    if (idx === -1) return;
    const lineEnd = out.indexOf("\n", idx);
    let cursor = lineEnd + 1;
    const m1 = out.slice(cursor).match(/^[ \t]+qEs:/);
    if (m1) { const fe = out.indexOf("\n", cursor); out = out.slice(0, cursor) + out.slice(fe + 1); }
    const insert = "    qEs: " + JSON.stringify(q.qEs) + ",\n";
    const idx2 = out.indexOf(anchor);
    const le = out.indexOf("\n", idx2);
    out = out.slice(0, le + 1) + insert + out.slice(le + 1);
    // opts vEs：按 _optsVEn 顺序匹配
    q._optsVEn.forEach((vEn, i) => {
      const vAnchor = "{v:\"" + vEn + "\"";
      const vi = out.indexOf(vAnchor, idx2);
      if (vi === -1) return;
      // 幂等删已有 vEs
      let c = out.indexOf("\n", vi) + 1;
      const m = out.slice(c).match(/^[ \t]+vEs:/);
      if (m) { const fe = out.indexOf("\n", c); out = out.slice(0, c) + out.slice(fe + 1); }
      const vi2 = out.indexOf(vAnchor, idx2);
      const le2 = out.indexOf("\n", vi2);
      out = out.slice(0, le2 + 1) + "        vEs: " + JSON.stringify(q.optsVEs[i]) + ",\n" + out.slice(le2 + 1);
    });
    // fbEs
    const fbAnchor = "fbEn:" + JSON.stringify(q._fbEn) + ",";
    const fi = out.indexOf(fbAnchor, idx2);
    if (fi !== -1) {
      let c = out.indexOf("\n", fi) + 1;
      const m = out.slice(c).match(/^[ \t]+fbEs:/);
      if (m) { const fe = out.indexOf("\n", c); out = out.slice(0, c) + out.slice(fe + 1); }
      const fi2 = out.indexOf(fbAnchor, idx2);
      const le3 = out.indexOf("\n", fi2);
      out = out.slice(0, le3 + 1) + "    fbEs: " + JSON.stringify(q.fbEs) + ",\n" + out.slice(le3 + 1);
    }
  });

  // truthOrFake: textEs/sourceEs/revealEs
  (C.truthOrFake || []).forEach((t) => {
    const anchor = "textEn:" + JSON.stringify(t._textEn) + ",";
    const idx = out.indexOf(anchor);
    if (idx === -1) return;
    const lineEnd = out.indexOf("\n", idx);
    let cursor = lineEnd + 1;
    while (true) {
      const m = out.slice(cursor).match(/^[ \t]+(textEs|sourceEs|revealEs):/);
      if (!m) break;
      const fe = out.indexOf("\n", cursor);
      out = out.slice(0, cursor) + out.slice(fe + 1);
    }
    const insert =
      "    textEs: " + JSON.stringify(t.textEs) + ",\n" +
      "    sourceEs: " + JSON.stringify(t.sourceEs) + ",\n" +
      "    revealEs: " + JSON.stringify(t.revealEs) + ",\n";
    const idx2 = out.indexOf(anchor);
    const le = out.indexOf("\n", idx2);
    out = out.slice(0, le + 1) + insert + out.slice(le + 1);
  });

  // casinoBets: qEs/aEs/bEs/revealEs
  (C.casinoBets || []).forEach((c) => {
    const anchor = "qEn:" + JSON.stringify(c._qEn) + ",";
    const idx = out.indexOf(anchor);
    if (idx === -1) return;
    const lineEnd = out.indexOf("\n", idx);
    let cursor = lineEnd + 1;
    while (true) {
      const m = out.slice(cursor).match(/^[ \t]+(qEs|aEs|bEs|revealEs):/);
      if (!m) break;
      const fe = out.indexOf("\n", cursor);
      out = out.slice(0, cursor) + out.slice(fe + 1);
    }
    const insert =
      "    qEs: " + JSON.stringify(c.qEs) + ",\n" +
      "    aEs: " + JSON.stringify(c.aEs) + ",\n" +
      "    bEs: " + JSON.stringify(c.bEs) + ",\n";
    const idx2 = out.indexOf(anchor);
    const le = out.indexOf("\n", idx2);
    out = out.slice(0, le + 1) + insert + out.slice(le + 1);
    // revealEs
    const rAnchor = "revealEn:" + JSON.stringify(c._revealEn) + ",";
    const ri = out.indexOf(rAnchor, idx2);
    if (ri !== -1) {
      let cc = out.indexOf("\n", ri) + 1;
      const m = out.slice(cc).match(/^[ \t]+revealEs:/);
      if (m) { const fe = out.indexOf("\n", cc); out = out.slice(0, cc) + out.slice(fe + 1); }
      const ri2 = out.indexOf(rAnchor, idx2);
      const le3 = out.indexOf("\n", ri2);
      out = out.slice(0, le3 + 1) + "    revealEs: " + JSON.stringify(c.revealEs) + ",\n" + out.slice(le3 + 1);
    }
  });

  return out;
}

main();
