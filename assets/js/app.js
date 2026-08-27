/*
 * app.js — CA7 黑历史档案馆 渲染与交互逻辑（增强版）
 * 依赖 data.js 提供的全局: events, catConfig, timelineData, quotes
 *
 * 续编增强（2026-07-03）：
 *   - 移除对内联 onclick/onerror 的全局函数依赖（svgFallback/closeModal 改内部调用）
 *   - 全站共享单个 IntersectionObserver（修原每卡片 new 一个的性能问题）
 *   - 搜索加防抖 + 可搜 detail/location
 *   - 模态框支持 ←/→ 翻页浏览当前筛选结果
 *   - filter 计数 / 条形图占比 / hero 数字 由 events 实时聚合（加内容自动同步）
 *   - 引用轮播加手动控制（◀▶/暂停）
 *   - 移动端汉堡菜单 + 返回顶部按钮
 */
(function () {
"use strict";
// 标记 JS 可用：把 <html class="no-js"> 换成 js，供 CSS 兜底（无 JS 时卡片直接可见）
document.documentElement.classList.remove("no-js");
document.documentElement.classList.add("js");

/* ============================================================
 * i18n 三语核心机制（EN / ES / ZH）
 * - currentLang: 'en' | 'es' | 'zh'，默认 'en'，localStorage('ca7-lang') 记忆
 * - LANGS: 支持语言枚举与循环顺序
 * - tt(obj, field): 按 currentLang 读取 obj.{fieldEn|fieldEs|field}，逐级降级到 en→zh
 * - setLanguage(lang): 写入缓存 + 改 <html lang> + 应用静态 i18n + 派发 'ca7:lang-change'
 * - applyStaticI18n(): 遍历 [data-i18n] 节点，innerHTML 渲染（白名单防 XSS）
 * - 有状态模块监听 'ca7:lang-change' 时仅更新文本，不重置状态
 * ============================================================ */
const LANGS = ["en", "es", "zh"];
const LANG_HTML = { en: "en", es: "es", zh: "zh-CN" };
const LANG_LABEL = { en: "EN", es: "ES", zh: "中" };
function normalizeLang(l){
  if(l === "es" || l === "en" || l === "zh") return l;
  return "en";
}
let currentLang = (function(){
  try { return normalizeLang(localStorage.getItem("ca7-lang")); } catch(e) { return "en"; }
})();
// 三语降级读取：es → fieldEs（无则 fieldEn → field）；en → fieldEn（无则 field）；zh → field
function tt(obj, field){
  if(!obj) return "";
  if(currentLang === "es"){
    const es = obj[field+"Es"];
    if(es !== undefined && es !== "") return es;
    // es 缺失时降级到 en，再降级到 zh 原字段
    const en = obj[field+"En"];
    return (en !== undefined && en !== "") ? en : obj[field];
  }
  if(currentLang === "en"){
    const en = obj[field+"En"];
    return (en !== undefined && en !== "") ? en : obj[field];
  }
  // zh
  const zh = obj[field];
  if(zh !== undefined && zh !== "") return zh;
  // zh 原字段缺失时降级 en
  const en = obj[field+"En"];
  return (en !== undefined && en !== "") ? en : "";
}
// 字典读取辅助（带 key 默认值）；currentLang 无对应字典时降级 en
function t(key, fallback){
  const dict = (typeof i18nDict !== "undefined") ? (i18nDict[currentLang] || i18nDict.en) : null;
  if(dict && dict[key] !== undefined) return dict[key];
  return fallback !== undefined ? fallback : key;
}

/* 安全 HTML 白名单：只允许 <strong> <em> <br> <span class="..."> 这几个标签
   其余一律转义。字典文案由开发者维护，但仍防注入。 */
function sanitizeI18nHtml(s){
  if(typeof s !== "string") return "";
  // 白名单：允许的标签 + 允许的属性（style/class）。其余一律转义。
  // 策略：用 token 化的方式遍历，遇到 < ... > 判断是否为合法白名单标签。
  const ALLOWED_TAGS = ["strong","em","b","i","br","span"];
  const ALLOWED_ATTRS = ["style","class"];   // 仅这两个属性
  // 安全属性值：style/class 只允许字母、数字、: ; . # ( ) - 空格 等 CSS 安全字符，禁止 url()/expression()/javascript:
  const SAFE_ATTR_VAL = /^([a-zA-Z0-9\s:;.\-#(),%'"]+)$/;

  // 整体转义所有 & < >，保证 baseline 安全
  let esc = s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");

  // 把已转义的标签 token 还原（若在白名单内）
  // 匹配 &lt;tag attr...&gt; 或 &lt;/tag&gt; 或 &lt;br/&gt;
  esc = esc.replace(/&lt;(\/?)([a-zA-Z][a-zA-Z0-9]*)((?:\s+[a-zA-Z-]+=&quot;[^&]*&quot;|\s+[a-zA-Z-]+="[^"]*")*)\s*(\/?)&gt;/g,
    (full, slash, tag, attrs, selfclose)=>{
      tag = tag.toLowerCase();
      if(ALLOWED_TAGS.indexOf(tag) === -1) return full;   // 非白名单标签：保持转义
      // 解析属性，只保留白名单属性且值安全
      let safeAttrs = "";
      if(attrs){
        const attrRe = /\s+([a-zA-Z-]+)=(&quot;([^&]*)&quot;|"([^"]*)")/g;
        let am;
        while((am = attrRe.exec(attrs)) !== null){
          const attrName = am[1].toLowerCase();
          const attrVal = am[3] !== undefined ? am[3] : am[5];   // 取两种引号格式之一
          if(ALLOWED_ATTRS.indexOf(attrName) !== -1 && SAFE_ATTR_VAL.test(attrVal)){
            safeAttrs += ` ${attrName}="${attrVal}"`;
          }
        }
      }
      // 重建标签（保留原引号风格）
      const lt = "<", gt = ">";
      if(slash) return lt+"/"+tag+gt;             // 闭合标签不带属性
      return lt+tag+safeAttrs+(selfclose?"/":"")+gt;
    }
  );
  return esc;
}

function applyStaticI18n(){
  const dict = (typeof i18nDict !== "undefined") ? (i18nDict[currentLang] || i18nDict.en) : null;
  if(!dict) return;
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const key = el.getAttribute("data-i18n");
    const v = dict[key];
    if(v === undefined) return;
    // INPUT/TEXTAREA: 走 placeholder
    if(el.tagName === "INPUT" || el.tagName === "TEXTAREA"){
      if(el.type === "text" || el.type === "search" || el.tagName === "TEXTAREA"){
        el.placeholder = v;
      }
      return;
    }
    // OPTION: 纯文本
    if(el.tagName === "OPTION"){ el.textContent = v; return; }
    // 含 HTML 标签则 innerHTML（白名单已清洗），否则 textContent
    if(/[<>]/.test(v)){
      el.innerHTML = sanitizeI18nHtml(v);
    } else {
      el.textContent = v;
    }
  });
}

/* 三语切换按钮：点击展开下拉菜单，点击选项切换语言。
   仍兼容旧"循环切换"——按钮主区点击在 EN→ES→ZH→EN 间循环。 */
function buildLangMenu(){
  return LANGS.map(l =>
    `<button type="button" class="lang-option${l===currentLang?" active":""}" data-lang="${l}">${LANG_LABEL[l]}</button>`
  ).join("");
}
function updateLangBtn(){
  const btn = document.getElementById("langToggleBtn");
  if(!btn) return;
  const lbl = btn.querySelector(".lang-label");
  if(lbl){
    lbl.innerHTML = '<span class="lang-globe">🌐</span>' + LANG_LABEL[currentLang];
  }
  // 高亮当前项
  btn.querySelectorAll(".lang-option").forEach(o=>{
    o.classList.toggle("active", o.dataset.lang === currentLang);
  });
}
function closeLangMenu(){
  const btn = document.getElementById("langToggleBtn");
  if(btn) btn.classList.remove("open");
}
function toggleLangMenu(open){
  const btn = document.getElementById("langToggleBtn");
  if(!btn) return;
  if(open === undefined) btn.classList.toggle("open");
  else btn.classList.toggle("open", open);
  if(btn.classList.contains("open")) updateLangBtn();
}

function setLanguage(lang){
  currentLang = normalizeLang(lang);
  try { localStorage.setItem("ca7-lang", currentLang); } catch(e){}
  document.documentElement.lang = LANG_HTML[currentLang];
  applyStaticI18n();
  updateLangBtn();
  closeLangMenu();
  // 派发事件：各闭包模块自治重渲染（有状态模块仅更新文本）
  document.dispatchEvent(new CustomEvent("ca7:lang-change", { detail:{ lang: currentLang } }));
}

// 暴露给 app.js 内其他模块引用（同 IIFE 作用域，直接用即可，无需 window）。
// 但 data.js 中无 i18n 逻辑；extra-data.js 同。仅 app.js 内闭包使用 tt/t。

/* ========== SVG 占位图 (图片加载失败时) ========== */
function svgFallback(text){
  return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250'%3E%3Crect width='400' height='250' fill='%2318181c'/%3E%3Crect width='400' height='250' fill='url(%23g)' opacity='0.1'/%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%23dc143c'/%3E%3Cstop offset='1' stop-color='%238b0a1e'/%3E%3C/linearGradient%3E%3C/defs%3E%3Ctext x='50%25' y='50%25' font-family='monospace' font-size='14' fill='%237a7a82' text-anchor='middle' dy='.3em'%3E"+encodeURIComponent(text)+"%3C/text%3E%3C/svg%3E";
}
// 卡片/模态图统一兜底：用事件委托处理 onerror，避免内联属性
function handleImgError(img, catLabel){
  if(img.dataset.fallback) return;     // 只兜底一次
  img.dataset.fallback = "1";
  img.src = svgFallback(catLabel);
}

/* ========== WebP 双源图：<picture> + JPG 兜底 ==========
 * 输入原 jpg/png 路径 + 属性对象，输出 <picture><source webp><img jpg></picture>
 * 浏览器支持 webp 则走 webp（更小更快），否则自动退回 jpg。
 * picture 内的 img 仍是普通 img，原有 onerror 事件委托、loading=lazy、
 * data-* 属性全部保留生效，无需改下游逻辑。
 */
function pic(src, attrs){
  if(!src) return "";
  const webp = src.replace(/\.(jpe?g|png)$/i, ".webp");
  const attrStr = attrs ? Object.entries(attrs).map(([k,v])=>` ${k}="${v}"`).join("") : "";
  return `<picture><source type="image/webp" srcset="${webp}"><img src="${src}"${attrStr}></picture>`;
}

/* ========== 共享 IntersectionObserver ========== */
// 全站淡入用同一个 observer，避免每个卡片 new 一个
const revealObserver = new IntersectionObserver((entries)=>{
  entries.forEach(en=>{
    if(en.isIntersecting){
      en.target.classList.add("visible");
      revealObserver.unobserve(en.target);
    }
  });
},{threshold:0.1});

/* ========== 筛选状态 ========== */
const grid = document.getElementById("cardsGrid");
let currentFilter = "all";
let currentSeverity = 0;
let searchQuery = "";
let currentSort = "featured"; // 排序：featured（头条优先，默认）/ oldest / newest
let currentList = [];        // 当前筛选后的列表（供模态翻页用）

/* ========== 搜索匹配工具 ==========
 * 设计目标：
 *  1) 大小写不敏感：统一 toLowerCase。
 *  2) 重音不敏感：NFD 分解后剔除组合用记号，使 "agua" 能命中 "Água"。
 *  3) 字段全量覆盖：英文(EN)模式下检索 titleEn / summaryEn / detailEn /
 *     locationEn / tags / quote.textEn / quote.authorEn；中文(ZH)模式下检索
 *     title / summary / detail / location / tags / quote.text / quote.author。
 *  4) 多关键词分词：按空白拆分 tokens，要求每个 token 都命中（AND），
 *     例如 "coke bottle" 仅在事件同时包含两者时才命中。
 */
function normalizeText(s){
  if(s == null) return "";
  return String(s)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/* 将一个事件的待搜索字段汇总成一段归一化后的「拼接文本」并缓存到事件对象上，
 * 避免每次输入都重新字符串化所有字段。语言切换时缓存自动失效。
 * 三语分别拼接对应字段：en→titleEn/summaryEn/detailEn/locationEn/tags/quote；
 *                 es→titleEs/summaryEs/detailEs/locationEs/tags(无西语沿用中文)/quote；
 *                 zh→title/summary/detail/location/tags/quote。 */
function getSearchBlob(e, lang){
  const cacheKey = "__searchBlob_" + lang;
  if(e[cacheKey]) return e[cacheKey];
  let text;
  if(lang === "en"){
    const detailEn = Array.isArray(e.detailEn) ? e.detailEn.join(" ") : (e.detailEn || "");
    const tags = Array.isArray(e.tags) ? e.tags.join(" ") : (e.tags || "");
    const quote = e.quote || {};
    text = [
      e.titleEn, e.summaryEn, detailEn, e.locationEn, tags,
      quote.textEn, quote.authorEn
    ].join(" ");
  }else if(lang === "es"){
    const detailEs = Array.isArray(e.detailEs) ? e.detailEs.join(" ") : (e.detailEs || "");
    // tags 暂无西语版本，沿用中文 tags（保证仍可按标签命中）
    const tags = Array.isArray(e.tags) ? e.tags.join(" ") : (e.tags || "");
    const quote = e.quote || {};
    text = [
      e.titleEs, e.summaryEs, detailEs, e.locationEs, tags,
      quote.textEs, quote.authorEs
    ].join(" ");
  }else{
    const detail = Array.isArray(e.detail) ? e.detail.join(" ") : (e.detail || "");
    const tags = Array.isArray(e.tags) ? e.tags.join(" ") : (e.tags || "");
    const quote = e.quote || {};
    text = [
      e.title, e.summary, detail, e.location, tags,
      quote.text, quote.author
    ].join(" ");
  }
  // 同时把另一种语言的标题也并入，这样中文界面搜英文专名也能命中，反之亦然
  const altTitle = (lang === "en") ? (e.title || "") : (e.titleEn || "");
  text += " " + altTitle;
  text = normalizeText(text);
  e[cacheKey] = text;
  return text;
}

/* 判断单个事件是否匹配当前搜索词（已归一化、按空白分词、AND 逻辑） */
function eventMatchesQuery(e, query, lang){
  if(!query) return true;
  const blob = getSearchBlob(e, lang);
  const tokens = query.split(/\s+/).filter(Boolean);
  if(tokens.length === 0) return true;
  // 每个 token 都必须命中
  for(let i = 0; i < tokens.length; i++){
    if(!blob.includes(tokens[i])) return false;
  }
  return true;
}

/* ========== 渲染卡片 ========== */
// 卡片分类角标配色：背景用分类色但大幅加深（贴近实色），
// 文字统一用对应浅色调——压在照片上仍保持可读。
// （旧做法 color+"33" 是 20% 透明底配深色文字，亮图上几乎看不清）
const CAT_CHIP_BG = {
  persona:  "rgba(74,35,90,.88)",
  violence: "rgba(139,10,30,.88)",
  offpitch: "rgba(185,119,14,.88)",
  club:     "rgba(110,44,0,.88)",
  national: "rgba(20,90,50,.88)"
};
const CAT_CHIP_TEXT = {
  persona:  "#e8daef",
  violence: "#fadbd8",
  offpitch: "#fef9e7",
  club:     "#fae5d3",
  national: "#d5f5e3"
};
function catChipBg(cat){
  return CAT_CHIP_BG[cat] || (catConfig[cat] ? catConfig[cat].color : "#4a235a");
}

function renderCards(){
  grid.innerHTML = "";
  currentList = events.filter(e=>{
    if(currentFilter !== "all" && e.cat !== currentFilter) return false;
    if(currentSeverity > 0 && e.severity < currentSeverity) return false;
    if(searchQuery){
      // searchQuery 已在输入监听器中归一化（小写 + 去重音）
      if(!eventMatchesQuery(e, searchQuery, currentLang)) return false;
    }
    return true;
  });

  document.getElementById("resultCount").textContent = `${t("resultCount.prefix","显示")} ${currentList.length} ${t("resultCount.suffix","条记录")}`;

  // 排序：默认「头条优先」（severity 5 且标记「头条」最前，其次 severity 降序、id 降序）；
  //       时间正序 / 时间倒序 按 dateIso 排序（缺失 dateIso 视为最旧）。
  const maxId = Math.max(...events.map(e=>e.id));
  currentList.sort((a,b)=>{
    if(currentSort === "oldest" || currentSort === "newest"){
      const da = a.dateIso || "0000-01-01";
      const db = b.dateIso || "0000-01-01";
      // 时间相同时回退到 id 作稳定次序
      if(da !== db) return currentSort === "oldest" ? da.localeCompare(db) : db.localeCompare(da);
      return currentSort === "oldest" ? (a.id - b.id) : (b.id - a.id);
    }
    // featured（默认）
    const aTop = a.tags && a.tags.includes("头条") ? 1 : 0;
    const bTop = b.tags && b.tags.includes("头条") ? 1 : 0;
    if(aTop !== bTop) return bTop - aTop;
    if(b.severity !== a.severity) return b.severity - a.severity;
    return b.id - a.id;
  });

  currentList.forEach((e,idx)=>{
    // 卡片用真实 <a href>（slug 由构建脚本生成），让爬虫与键盘可直达子页，无 JS 也可导航
    const slug = slugForEvent(e.id);
    const card = document.createElement("a");
    if(slug) card.href = "incident/" + slug + "/";
    card.className = `event-card cat-${e.cat}`;
    if(e.tags && e.tags.includes("头条")) card.classList.add("card-pinned");
    // stagger 错峰入场：按行内 index 延迟，封顶 8 张避免长列表末位等太久
    card.style.setProperty("--stagger", Math.min(idx % 8, 6) * 0.07 + "s");
    let dots = "";
    for(let i=0;i<5;i++){
      dots += `<span class="dot ${i<e.severity?'on':''}"></span>`;
    }
    const catLabel = catConfig[e.cat] ? tt(catConfig[e.cat],"label") : (e.catLabel||"");
    const pinnedBadge = (e.tags && e.tags.includes("头条")) ? `<span class="card-badge-breaking">${t("card.badgeBreaking","🔥 头条")}</span>` : "";
    const newBadge = (e.id === maxId && !(e.tags && e.tags.includes("头条"))) ? `<span class="card-badge-new">${t("card.badgeNew","NEW")}</span>` : "";
    card.innerHTML = `
      <div class="card-img">
        ${pinnedBadge}${newBadge}
        <span class="card-cat" style="background:${catChipBg(e.cat)};color:${CAT_CHIP_TEXT[e.cat]||'#f5f5f7'}">${catLabel}</span>
        <div class="card-severity">${dots}</div>
        ${pic(e.img||'',{alt:tt(e,"title"),loading:"lazy",decoding:"async","data-cat-label":catLabel})}
      </div>
      <div class="card-body">
        <div class="card-date">${tt(e,"date")}</div>
        <div class="card-title">${tt(e,"title")}</div>
        <div class="card-summary">${tt(e,"summary")}</div>
        <div class="card-footer">
          <div class="card-tags">${tagsFor(e).slice(0,3).map(tk=>`<span class="card-tag">${tk}</span>`).join("")}</div>
          <div class="card-read">${t("card.read","查看卷宗 →")}</div>
        </div>
      </div>
    `;
    grid.appendChild(card);
    revealObserver.observe(card);
  });

  if(currentList.length === 0){
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text-dim);font-family:var(--mono)">${t("card.empty","未找到匹配记录")}</div>`;
  }
}

/* 图片错误兜底：事件委托（取代原内联 onerror） */
grid.addEventListener("error",(e)=>{
  const img = e.target;
  if(img.tagName === "IMG" && img.closest(".card-img")){
    handleImgError(img, img.dataset.catLabel || "档案图");
  }
},true);

/* ========== 事件详情：跳转独立子页面（SEO 重构后取代原 Modal） ==========
 * 原先打开弹窗展示事件详情；现在改为跳转到 /incident/<slug>/ 独立页。
 * slug 映射由构建脚本生成（assets/js/incident-slugs.js → window.__INCIDENT_SLUGS__）。
 * 提供 slugForEvent(id) 与 goToIncident(id) 两个工具，供卡片 / BREAKING /
 * 盲盒 / 地图 / 人设卡 等所有入口复用，统一导航行为。
 */
// 按当前语言读取事件标签数组：es→tagsEs，en→tagsEn，zh→tags（缺失降级到 zh）
function tagsFor(e){
  if(currentLang === "es" && e.tagsEs && e.tagsEs.length) return e.tagsEs;
  if(currentLang === "en" && e.tagsEn && e.tagsEn.length) return e.tagsEn;
  return e.tags || [];
}
function slugForEvent(id){
  const map = window.__INCIDENT_SLUGS__ || {};
  return map[id] || map[String(id)] || null;
}
// 跳转到事件独立页（id 优先；idx 兜底用于 currentList 上下文）
function goToIncident(id){
  const slug = slugForEvent(id);
  if(!slug){
    console.warn("[goToIncident] 未找到 id="+id+" 的 slug（请重新运行 npm run build:seo）");
    return;
  }
  if(window.__badge) window.__badge("read", 1);
  location.href = "incident/" + slug + "/";
}
// 兼容旧调用：openModalByIdx(idx) → 跳转该 idx 对应的事件
function openModalByIdx(idx){
  const e = currentList[idx];
  if(!e) return;
  goToIncident(e.id);
}

/* ========== 筛选交互 ========== */
document.querySelectorAll(".filter-chip").forEach(chip=>{
  chip.addEventListener("click",()=>{
    document.querySelectorAll(".filter-chip").forEach(c=>c.classList.remove("active"));
    chip.classList.add("active");
    currentFilter = chip.dataset.cat;
    renderCards();
  });
});

document.getElementById("severitySelect").addEventListener("change",(e)=>{
  currentSeverity = parseInt(e.target.value);
  renderCards();
});

document.getElementById("sortSelect").addEventListener("change",(e)=>{
  currentSort = e.target.value;
  renderCards();
});

/* 搜索：防抖 200ms，结果区不在视口时自动滚动。
 * 输入归一化（小写 + 去重音）以支持大小写/重音不敏感匹配，
 * 例如输入 "agua" 也能命中 "Água"。 */
const searchInput = document.getElementById("searchInput");
let searchTimer = null;
searchInput.addEventListener("input",(e)=>{
  clearTimeout(searchTimer);
  const val = normalizeText(e.target.value).trim();
  searchTimer = setTimeout(()=>{
    searchQuery = val;
    renderCards();
    // 有查询词且档案库不在视口内时，平滑滚动到结果区
    if(val){
      const archive = document.getElementById("archive");
      if(archive){
        const rect = archive.getBoundingClientRect();
        if(rect.top < 0 || rect.top > window.innerHeight){
          archive.scrollIntoView({behavior:"smooth", block:"start"});
        }
      }
    }
  },200);
});

/* ========== 时间线渲染（封装以便语言切换重渲染） ========== */
const tlContainer = document.getElementById("timelineTrack");
function initTimeline(){
  if(!tlContainer || typeof timelineData === "undefined") return;
  tlContainer.innerHTML = "";
  timelineData.forEach(item=>{
    const div = document.createElement("div");
    div.className = "tl-item";
    div.innerHTML = `
      <div class="tl-year">${item.year}</div>
      <div class="tl-title">${tt(item,"title")}</div>
      <div class="tl-desc">${tt(item,"desc")}</div>
    `;
    tlContainer.appendChild(div);
    revealObserver.observe(div);
  });
}
initTimeline();
document.addEventListener("ca7:lang-change", initTimeline);
// 语言切换：重渲染档案库卡片（title/summary/date/catLabel 跟随语言）
document.addEventListener("ca7:lang-change", renderCards);

/* ========== 数字计数动画 + 单位本地化 ==========
 * data-suffix 存的是"中文单位 key"（万/亿），按 currentLang 映射英文表达。
 * 中文：1880万 / 40亿
 * 英文：18.8M（1880万欧元 = €18.8M）/ 4B（40亿美元 = $4B）
 * 用 OVERRIDE 表对特定 target 值给出英文规范写法，其余按 M/B 通用规则。
 */
const SUFFIX_I18N = { "万":{en:"M",es:"M",zh:"万"}, "亿":{en:"B",es:"B",zh:"亿"} };
// 特定数值的英文/西语规范写法（target → 显示字符串）。优先级最高。ES 复用 EN 的 M/B 写法。
const OVERRIDE_EN = {
  "1880": "18.8M",   // 1880万欧元 → €18.8M
  "40":   "4B"       // 40亿美元 → $4B
};
function localizedStatText(el){
  const target = parseInt(el.dataset.target);
  const rawSuffix = el.dataset.suffix || "";
  const lang = (typeof currentLang !== "undefined") ? currentLang : "en";
  if((lang === "en" || lang === "es") && OVERRIDE_EN[String(target)]) return OVERRIDE_EN[String(target)];
  if((lang === "en" || lang === "es") && SUFFIX_I18N[rawSuffix]){
    // 通用回退：万→M，亿→B（数值不变，如 12万→12M，仅作兜底）
    return target + SUFFIX_I18N[rawSuffix][lang];
  }
  return target + (rawSuffix || "");
}
function animateNumber(el){
  const target = parseInt(el.dataset.target);
  const rawSuffix = el.dataset.suffix || "";
  const lang = (typeof currentLang !== "undefined") ? currentLang : "en";
  // EN/ES 模式 + 有 override：直接显示目标字符串，不做计数动画（避免中间态混乱）
  if((lang === "en" || lang === "es") && OVERRIDE_EN[String(target)]){
    el.textContent = OVERRIDE_EN[String(target)];
    return;
  }
  const suffix = ((lang === "en" || lang === "es") && SUFFIX_I18N[rawSuffix]) ? SUFFIX_I18N[rawSuffix][lang] : rawSuffix;
  const duration = 1800;
  const start = performance.now();
  function update(now){
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    el.textContent = current + suffix;
    if(progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}
const numObserver = new IntersectionObserver((entries)=>{
  entries.forEach(en=>{
    if(en.isIntersecting){
      animateNumber(en.target);
      numObserver.unobserve(en.target);
    }
  });
},{threshold:0.5});
document.querySelectorAll(".hstat-num").forEach(el=>numObserver.observe(el));
// 语言切换后，已渲染的统计数字单位也要刷新（万→M / 亿→B / 1880→18.8M）
document.addEventListener("ca7:lang-change",()=>{
  document.querySelectorAll(".hstat-num").forEach(el=>{
    if(isNaN(parseInt(el.dataset.target))) return;
    el.textContent = localizedStatText(el);
  });
});

/* ========== 数据条形图动画 ========== */
const barObserver = new IntersectionObserver((entries)=>{
  entries.forEach(en=>{
    if(en.isIntersecting){
      const fill = en.target.querySelector(".bar-fill");
      if(fill) fill.style.width = fill.dataset.w;
      barObserver.unobserve(en.target);
    }
  });
},{threshold:0.3});
document.querySelectorAll(".bar-row").forEach(row=>barObserver.observe(row));

/* ========== 引用轮播（含手动控制） ========== */
let quoteIdx = 0;
let quotePlaying = true;
const quoteTextEl = document.getElementById("quoteText");
const quoteAuthorEl = document.getElementById("quoteAuthor");

function showQuote(idx){
  quoteIdx = (idx + quotes.length) % quotes.length;
  quoteTextEl.style.opacity = "0";
  quoteAuthorEl.style.opacity = "0";
  setTimeout(()=>{
    quoteTextEl.textContent = '"' + tt(quotes[quoteIdx],"text") + '"';
    quoteAuthorEl.textContent = "— " + tt(quotes[quoteIdx],"author");
    quoteTextEl.style.transition = "opacity .5s";
    quoteAuthorEl.style.transition = "opacity .5s";
    quoteTextEl.style.opacity = "1";
    quoteAuthorEl.style.opacity = "1";
  },300);
}
let quoteTimer = setInterval(()=>{
  if(quotePlaying) showQuote(quoteIdx + 1);
},5000);
function resetQuoteTimer(){
  clearInterval(quoteTimer);
  quoteTimer = setInterval(()=>{
    if(quotePlaying) showQuote(quoteIdx + 1);
  },5000);
}
document.getElementById("quotePrev").addEventListener("click",()=>{showQuote(quoteIdx-1);resetQuoteTimer();});
document.getElementById("quoteNext").addEventListener("click",()=>{showQuote(quoteIdx+1);resetQuoteTimer();});
// 立即渲染第一条，避免首个 5s 间隔内语录区空白
showQuote(0);

/* ========== Hero 轮播（37张嬷照，随机洗牌循环）========== */
const MO_COUNT = 37;   // assets/images/hero-mo/mo-01.jpg ~ mo-37.jpg（原图，含水印）
const heroGallery = document.getElementById("heroGallery");
const heroCounter = document.getElementById("heroCounter");

// Fisher-Yates 随机洗牌
function shuffle(arr){
  for(let i=arr.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]]=[arr[j],arr[i]];
  }
  return arr;
}

// 生成随机播放顺序
const moOrder = shuffle(Array.from({length:MO_COUNT},(_,i)=>i+1));
const heroSlides = [];
moOrder.forEach((n,idx)=>{
  const slide=document.createElement("div");
  slide.className="hero-slide"+(idx===0?" active":"");
  slide.innerHTML=pic(`assets/images/hero-mo/mo-${String(n).padStart(2,"0")}.jpg`,{alt:`CR7 嬷照 ${n}`,loading:idx<3?"eager":"lazy",decoding:"async"});
  heroGallery.appendChild(slide);
  heroSlides.push(slide);
});

let heroSlideIdx = 0;
function showHeroSlide(idx){
  heroSlides.forEach((s,i)=>s.classList.toggle("active",i===idx));
  heroSlideIdx = idx;
  if(heroCounter) heroCounter.textContent=`${idx+1} / ${MO_COUNT}`;
}
let heroTimer = setInterval(()=>{
  showHeroSlide((heroSlideIdx+1)%heroSlides.length);
},3500);
function resetHeroTimer(){
  clearInterval(heroTimer);
  heroTimer = setInterval(()=>{
    showHeroSlide((heroSlideIdx+1)%heroSlides.length);
  },3500);
}
// 点击轮播区手动切换下一张
heroGallery.addEventListener("click",()=>{showHeroSlide((heroSlideIdx+1)%heroSlides.length);resetHeroTimer();});

/* ========== Hero CTA 平滑滚动（替代原内联 onclick） ========== */
document.querySelectorAll("[data-scroll]").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const target = document.querySelector(btn.dataset.scroll);
    if(target) target.scrollIntoView({behavior:"smooth"});
  });
});

/* ========== 移动端汉堡菜单 ========== */
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click",()=>{
  navToggle.classList.toggle("open");
  navLinks.classList.toggle("open");
});
// 点击导航链接后自动收起
navLinks.querySelectorAll("a").forEach(a=>{
  a.addEventListener("click",()=>{
    navToggle.classList.remove("open");
    navLinks.classList.remove("open");
  });
});

/* ========== 返回顶部按钮 ========== */
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll",()=>{
  if(window.scrollY > 600) backToTop.classList.add("show");
  else backToTop.classList.remove("show");
});
backToTop.addEventListener("click",()=>{
  window.scrollTo({top:0,behavior:"smooth"});
});

/* ========== 顶部跑马灯 + BREAKING 头条：从 i18nDict 渲染 ========== */
function renderTicker(){
  const track = document.getElementById("tickerTrack");
  if(!track) return;
  const items = t("ticker.items", []);
  if(!Array.isArray(items) || items.length === 0) return;
  // 复制一份实现无缝循环
  const html = items.map(s=>`<span>${s}</span>`).join("") + items.map(s=>`<span>${s}</span>`).join("");
  track.innerHTML = html;
}
function renderBreaking(){
  const el = document.getElementById("breakingTicker");
  if(!el) return;
  const items = t("breaking.items", []);
  if(!Array.isArray(items) || items.length === 0) return;
  // 两份内容，配合 translateX(-50%) 无缝循环。
  // 结构必须是 ticker(裁剪窗) > track(滚动体)：动画若直接作用在
  // overflow:hidden 的元素上，裁剪窗口会跟着位移，文字会滑出容器
  // 压到左侧「BREAKING」标签上（绘制顺序也在静态元素之上）。
  const one = items.map(s=>`<span class="breaking-item">${s}</span><span class="breaking-sep">◆</span>`).join("");
  el.innerHTML = `<span class="breaking-track">${one}${one.replace(/class="breaking-item"/g,'class="breaking-item" aria-hidden="true"').replace(/class="breaking-sep"/g,'class="breaking-sep" aria-hidden="true"')}</span>`;
}
renderTicker();
renderBreaking();

/* ========== 🚨 BREAKING 头条跑马灯：自适应时长 + 点击展开 ========== */
// 跑马灯滚动速度恒定（≈60px/秒），时长按内容实际宽度计算，
// 避免「宽屏滚太快、窄屏滚太慢」。内容在 HTML 里已复制一份，
// 取第一份宽度即可推算 -50% 循环所需时长。
(function breakingTickerSetup(){
  const ticker=document.getElementById("breakingTicker");
  if(!ticker) return;
  const setDur=()=>{
    // 第一份内容宽度 ≈ track 总宽 / 2（含末尾 gap）
    const track=ticker.querySelector(".breaking-track");
    const halfW=Math.max((track||ticker).scrollWidth/2, 200);
    const dur=Math.max(8, halfW/60);  // 60px/秒，下限 8s
    ticker.style.setProperty("--breaking-dur", dur.toFixed(1)+"s");
  };
  // 字体/图片就绪后再测一次，避免初始宽度偏差
  setDur();
  window.addEventListener("load",setDur);
  let rt; window.addEventListener("resize",()=>{clearTimeout(rt);rt=setTimeout(setDur,200);});
  // 语言切换后重填内容 + 重算时长
  document.addEventListener("ca7:lang-change",()=>{
    renderTicker();
    renderBreaking();
    setTimeout(setDur, 50);
  });
})();
// breaking CTA：href 指向头条事件子页（无 JS 也可直达）；启动时用最新 slug 覆盖，
// click 时先切「全部」筛选确保该事件在当前列表可见，再自然导航。
(function(){
  const cta = document.getElementById("breakingCta");
  if(!cta) return;
  const headSlug = slugForEvent(63);
  if(headSlug) cta.href = "incident/" + headSlug + "/";
  cta.addEventListener("click",(ev)=>{
    ev.preventDefault();
    // 切到「全部」筛选确保该事件在当前列表中
    document.querySelectorAll(".filter-chip").forEach(c=>c.classList.toggle("active",c.dataset.cat==="all"));
    currentFilter="all";
    renderCards();  // 内部会按置顶/严重程度排序 currentList
    // 导航到头条事件子页（slug 已在 href 上，复用 goToIncident 保证一致性）
    goToIncident(63);
  });
})();

/* ========== 统计数字自动计算（从 events 聚合） ========== */
// 1) filter chip 的计数
const catCounts = events.reduce((acc,e)=>{
  acc[e.cat] = (acc[e.cat]||0) + 1;
  return acc;
},{});
document.getElementById("count-all").textContent = events.length;
Object.keys(catCounts).forEach(cat=>{
  const el = document.getElementById("count-" + cat);
  if(el) el.textContent = catCounts[cat];
});

// 2) Hero 统计里「收录事件」「争议分类」由数据驱动（红牌/逃税/可乐/女友为固定事实，保留）
const hstats = document.querySelectorAll(".hstat-num");
hstats.forEach(el=>{
  const labelEl = el.parentElement.querySelector(".hstat-label");
  const key = labelEl ? labelEl.getAttribute("data-i18n") : "";
  if(key === "hero.statEvents") el.dataset.target = events.length;
  else if(key === "hero.statCats") el.dataset.target = Object.keys(catConfig).length;
});
// hero 印章「CASES ON FILE」数字也由数据驱动，避免硬编码与 events 脱节
const heroCaseCount = document.getElementById("heroCaseCount");
if(heroCaseCount) heroCaseCount.textContent = events.length;

// 3) 数据可视化：三张图全部由 dataVizData（在 data.js 定义）驱动渲染，支持双语 label
function initDataViz(){
  const wrap = document.getElementById("dataViz");
  if(!wrap || typeof dataVizData === "undefined") return;
  wrap.innerHTML = dataVizData.map(card=>{
    const rows = card.rows.map(r=>{
      const label = typeof r.labelKey === "string" ? t(r.labelKey, r.label) : (r.label||"");
      const val = tt(r,"val");
      return `<div class="bar-row"><div class="bar-label">${label}</div><div class="bar-track"><div class="bar-fill" data-w="${r.w}"></div><div class="bar-val">${val}</div></div></div>`;
    }).join("");
    return `<div class="viz-card"><div class="viz-title">${t(card.titleKey, card.title)}</div>${rows}</div>`;
  }).join("");
  // 重新挂观察者（新 DOM）
  wrap.querySelectorAll(".bar-row").forEach(row=>barObserver.observe(row));
}
initDataViz();
document.addEventListener("ca7:lang-change", initDataViz);

/* ========== 绰号进化史：从 nicknamesData 数据渲染（支持双语） ========== */
function initNicknames(){
  const grid = document.getElementById("nicknameGrid");
  if(!grid || typeof nicknamesData === "undefined") return;
  grid.innerHTML = nicknamesData.map(n=>{
    const num = String(n.num).padStart(2,"0");
    const name = tt(n,"name");
    const period = tt(n,"period");
    const desc = tt(n,"desc");
    return `<div class="nick-card">
      <div class="nick-card-img">
        <span class="nick-num">${num}</span>
        <picture><source type="image/webp" srcset="${n.imgWebp}"><img src="${n.img}" alt="${name}" loading="lazy" decoding="async"></picture>
      </div>
      <div class="nick-body">
        <div class="nick-name">${name}</div>
        <div class="nick-period">${period}</div>
        <div class="nick-desc">${desc}</div>
      </div>
    </div>`;
  }).join("");
}
initNicknames();
document.addEventListener("ca7:lang-change", initNicknames);

/* ============================================================
 * 创新模块逻辑（主题切换 / 梅罗PK / 检测仪 / 表情生成器 / 烧钱榜）
 * 依赖 extra-data.js: pkData, penaltyData, moneyLedger, memePhotos, memePresets
 * ============================================================ */

/* ========== 主题切换 ========== */
(function(){
  const root=document.documentElement;
  const switcher=document.getElementById("themeSwitcher");
  // 移动端：把主题切换器也放进汉堡菜单层
  const navLinks=document.getElementById("navLinks");
  function applyTheme(t){
    if(t==="xiaoxiaoluo") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme",t);
    try{localStorage.setItem("ca7-theme",t);}catch(e){}
  }
  // 读取记忆
  let saved="xiaoxiaoluo";
  try{saved=localStorage.getItem("ca7-theme")||"xiaoxiaoluo";}catch(e){}
  applyTheme(saved);
  function syncActive(t){
    switcher.querySelectorAll(".theme-btn").forEach(b=>b.classList.toggle("active",b.dataset.theme===t));
  }
  syncActive(saved);
  switcher.addEventListener("click",e=>{
    const btn=e.target.closest(".theme-btn");
    if(!btn) return;
    applyTheme(btn.dataset.theme);
    syncActive(btn.dataset.theme);
  });
  // 移动端：把主题切换器 + 语言切换器移进汉堡菜单展开层，避免导航栏挤压溢出
  const mq=window.matchMedia("(max-width:900px)");
  const navInner=document.querySelector(".nav-inner");
  const navToggle=document.getElementById("navToggle");
  const langSwitcher=document.querySelector(".lang-switcher");
  function relocateSwitcher(){
    if(mq.matches){
      // 窄屏：移进汉堡菜单层
      if(!navLinks.contains(switcher)) navLinks.appendChild(switcher);
      if(langSwitcher && !navLinks.contains(langSwitcher)) navLinks.appendChild(langSwitcher);
    }else{
      // 宽屏：放回 nav-inner（汉堡按钮之前）
      if(navInner && !navInner.contains(switcher) && navToggle){
        navInner.insertBefore(switcher,navToggle);
      }
      if(navInner && langSwitcher && !navInner.contains(langSwitcher) && navToggle){
        navInner.insertBefore(langSwitcher,navToggle);
      }
    }
  }
  relocateSwitcher();
  mq.addEventListener("change",relocateSwitcher);
})();

/* ========== 梅罗 PK 大战 ========== */
(function(){
  const sides=document.getElementById("pkSides");
  const tabs=document.getElementById("pkTabs");
  const tip=document.getElementById("pkTip");
  if(!sides||typeof pkData==="undefined") return;
  let curIdx=0;
  // 记住两侧当前显示值，切换维度时从当前值滚到新值（而非从 0 起跳，体验更连贯）
  let curCr7=0, curMessi=0;

  // 数字翻牌：cubic ease，~700ms；el._pkRaf 存 raf id，快速连点 tab 时取消上一次避免堆叠
  function animatePkVal(el,from,to){
    if(el._pkRaf) cancelAnimationFrame(el._pkRaf);
    const duration=700;
    const t0=performance.now();
    function tick(now){
      const p=Math.min((now-t0)/duration,1);
      const eased=1-Math.pow(1-p,3);
      el.textContent=Math.floor(from+(to-from)*eased);
      if(p<1) el._pkRaf=requestAnimationFrame(tick);
      else { el.textContent=to; el._pkRaf=null; }
    }
    el._pkRaf=requestAnimationFrame(tick);
  }

  // 渲染维度 tabs
  function renderTabs(){
    tabs.innerHTML=pkData.map((d,i)=>`<button class="pk-tab ${i===0?'active':''}" data-idx="${i}">${tt(d,"label")}</button>`).join("");
  }
  renderTabs();
  function render(){
    const d=pkData[curIdx];
    const fromCr7=curCr7, fromMessi=curMessi;
    // 渲染两侧：loser 方（黑点更重/被讽刺方）打上 loser 类高亮
    sides.innerHTML=`
      <div class="pk-side cr7 ${d.loser==='cr7'?'loser':''}">
        <div class="pk-name">${i18nDict[currentLang]["pk.cr7Name"]}</div>
        <div class="pk-subname">${i18nDict[currentLang]["pk.cr7Sub"]}</div>
        <div class="pk-val">${fromCr7}</div>
        <div class="pk-note">${tt(d.cr7,"note")}</div>
      </div>
      <div class="pk-side messi ${d.loser==='messi'?'loser':''}">
        <div class="pk-name">${i18nDict[currentLang]["pk.messiName"]}</div>
        <div class="pk-subname">${i18nDict[currentLang]["pk.messiSub"]}</div>
        <div class="pk-val">${fromMessi}</div>
        <div class="pk-note">${tt(d.messi,"note")}</div>
      </div>`;
    tip.innerHTML=`<strong>${tt(d,"tip")}</strong>`;
    // 翻牌：从当前显示值滚到新维度目标值
    const cr7El=sides.querySelector(".pk-side.cr7 .pk-val");
    const messiEl=sides.querySelector(".pk-side.messi .pk-val");
    // 触发弹性动画（强制 reflow 以便连续切换时 class 能重新触发）
    [cr7El,messiEl].forEach(el=>{
      el.classList.remove("counting");
      void el.offsetWidth;
      el.classList.add("counting");
      el.addEventListener("animationend",()=>el.classList.remove("counting"),{once:true});
    });
    animatePkVal(cr7El,fromCr7,d.cr7.val);
    animatePkVal(messiEl,fromMessi,d.messi.val);
    curCr7=d.cr7.val; curMessi=d.messi.val;
  }
  render();
  tabs.addEventListener("click",e=>{
    const tab=e.target.closest(".pk-tab");
    if(!tab) return;
    curIdx=parseInt(tab.dataset.idx);
    tabs.querySelectorAll(".pk-tab").forEach(x=>x.classList.toggle("active",x===tab));
    render();
  });
  // 语言切换：重渲染 tabs + 当前维度（数值保持当前显示值，不平移）
  document.addEventListener("ca7:lang-change",()=>{
    renderTabs();
    // 重新激活当前 idx 的 tab
    tabs.querySelectorAll(".pk-tab").forEach((x,i)=>x.classList.toggle("active",i===curIdx));
    render();
  });
})();

/* ========== 罗黑程度测试 ========== */
(function(){
  const quiz=document.getElementById("quiz");
  const body=document.getElementById("quizBody");
  const progressFill=document.getElementById("quizProgressFill");
  const progressText=document.getElementById("quizProgressText");
  const resultBox=document.getElementById("quizResult");
  if(!quiz||typeof quizData==="undefined") return;

  // 每局题数：从 25 题大题库里随机抽取，保证每局题目不同
  const QUIZ_LEN = Math.min(8, quizData.length);
  // Fisher-Yates 洗牌（不修改原数组）
  function shuffle(arr){
    const a=arr.slice();
    for(let i=a.length-1;i>0;i--){
      const j=Math.floor(Math.random()*(i+1));
      [a[i],a[j]]=[a[j],a[i]];
    }
    return a;
  }
  // 生成本局题目：shuffle 题序取前 N 题，每题选项也 shuffle 并重算正确答案 index
  function makeGame(){
    return shuffle(quizData).slice(0,QUIZ_LEN).map(item=>{
      const correctOpt=item.opts[item.a];
      const opts=shuffle(item.opts);
      // 复制全部字段（含 qEn/qEs/fbEn/fbEs），选项保留对象结构 {v,vEn,vEs}
      return { q:item.q, qEn:item.qEn, qEs:item.qEs, opts, a:opts.indexOf(correctOpt), fb:item.fb, fbEn:item.fbEn, fbEs:item.fbEs };
    });
  }

  let game=[], idx=0, score=0;

  function render(){
    const q=game[idx];
    const total=game.length;
    progressFill.style.width=((idx)/total*100)+"%";
    progressText.textContent=`${t("quiz.progress","第")} ${idx+1} / ${total}`;
    body.innerHTML=`
      <div class="quiz-q">${idx+1}. ${tt(q,"q")}</div>
      <div class="quiz-options">
        ${q.opts.map((o,i)=>{
          const txt = (typeof o === "string") ? o : tt(o,"v");
          return `
          <button class="quiz-option" data-i="${i}">
            <span class="quiz-opt-mark">${String.fromCharCode(65+i)}</span>
            <span>${txt}</span>
          </button>`;
        }).join("")}
      </div>
      <div class="quiz-fb" id="quizFb" hidden></div>
      <div class="quiz-nav">
        <span style="font-family:var(--mono);font-size:12px;color:var(--text-dim)">${t("quiz.feedback","答对得分，答错 0 分")}</span>
        <button class="quiz-next" id="quizNext" disabled>${t("quiz.next","下一题 →")}</button>
      </div>`;
    const next=body.querySelector("#quizNext");
    const fb=body.querySelector("#quizFb");
    body.querySelectorAll(".quiz-option").forEach(opt=>{
      opt.addEventListener("click",()=>{
        if(body.querySelector(".quiz-option.locked")) return; // 已锁定
        const choice=parseInt(opt.dataset.i);
        // 锁定全部，标对错
        body.querySelectorAll(".quiz-option").forEach((o,i)=>{
          o.classList.add("locked");
          if(i===q.a) o.classList.add("correct");
          else if(i===choice) o.classList.add("wrong");
        });
        const ok=choice===q.a;
        if(ok) score++;
        fb.hidden=false;
        fb.className="quiz-fb"+(ok?" correct-fb":"");
        const correctStr = ok ? t("tof.correct","✓ 答对了") : ("✗ "+t("quiz.feedback","答对得分，答错 0 分").split(",")[0]+" "+String.fromCharCode(65+q.a));
        fb.innerHTML=`<strong>${ok?t("tof.correct","✓ 答对了"):"✗ "+String.fromCharCode(65+q.a)}</strong><br>${tt(q,"fb")}`;
        next.disabled=false;
        next.textContent= idx===total-1?t("quiz.result","查看诊断结果 →"):t("quiz.next","下一题 →");
      });
    });
    next.addEventListener("click",()=>{
      if(idx<total-1){ idx++; render(); }
      else showResult();
    });
  }

  function showResult(){
    const total=game.length;
    progressFill.style.width="100%";
    progressText.textContent=`${t("quiz.diagnosis","诊断完成")} · ${score}/${total}`;
    body.hidden=true;
    const pct=score/total;
    let rank,verdict;
    if(pct===1){ rank=t("quiz.rankPerfect"); verdict=t("quiz.verdictPerfect"); }
    else if(pct>=0.75){ rank=t("quiz.rankHigh"); verdict=`${score}/${total}. ${t("quiz.verdictHigh")}`; }
    else if(pct>=0.5){ rank=t("quiz.rankMid"); verdict=`${score}/${total}. ${t("quiz.verdictMid")}`; }
    else{ rank=t("quiz.rankLow"); verdict=`${score}/${total}. ${t("quiz.verdictLow")}`; }
    document.getElementById("quizScore").textContent=score;
    document.getElementById("quizScoreMax").textContent="/"+total;
    document.getElementById("quizRank").textContent=rank;
    document.getElementById("quizVerdict").textContent=verdict;
    if(window.__badge) window.__badge("quiz", {score, total, pct});
    resultBox.hidden=false;
    resultBox.classList.add("show");
    // 分数滚动动画
    const scoreEl=document.getElementById("quizScore");
    let n=0; const t0=performance.now();
    (function tick(now){
      const p=Math.min((now-t0)/900,1);
      const eased=1-Math.pow(1-p,3);
      scoreEl.textContent=Math.floor(eased*score);
      if(p<1) requestAnimationFrame(tick);
      else scoreEl.textContent=score;
    })(performance.now());
  }
  // 语言切换：保留 idx/score/answer 状态，仅重渲染当前题面或结果页文案
  document.addEventListener("ca7:lang-change",()=>{
    if(!resultBox.hidden){
      // 已在结果页：更新 rank/verdict 文本
      const total=game.length, pct=score/total;
      let rank,verdict;
      if(pct===1){ rank=t("quiz.rankPerfect"); verdict=t("quiz.verdictPerfect"); }
      else if(pct>=0.75){ rank=t("quiz.rankHigh"); verdict=`${score}/${total}. ${t("quiz.verdictHigh")}`; }
      else if(pct>=0.5){ rank=t("quiz.rankMid"); verdict=`${score}/${total}. ${t("quiz.verdictMid")}`; }
      else{ rank=t("quiz.rankLow"); verdict=`${score}/${total}. ${t("quiz.verdictLow")}`; }
      document.getElementById("quizRank").textContent=rank;
      document.getElementById("quizVerdict").textContent=verdict;
    } else if(!body.hidden && game[idx]){
      // 答题中：仅重渲染当前题（保留 score/idx；已锁定状态会丢失，但题目内容更新）
      render();
    }
  });

  // 开始新一局：重新抽题 + 重置状态
  function startNewGame(){
    game=makeGame(); idx=0; score=0;
    resultBox.hidden=true; resultBox.classList.remove("show");
    body.hidden=false;
    render();
  }

  document.getElementById("quizRestart").addEventListener("click",startNewGame);

  // 首局启动
  startNewGame();
  // 进入视口加 scanning 扫描线氛围
  const qo=new IntersectionObserver((ents)=>{
    ents.forEach(en=>{ if(en.isIntersecting){ quiz.classList.add("scanning"); }});
  },{threshold:0.3});
  qo.observe(quiz);
})();

/* ========== #7 黑料真假鉴别 ========== */
(function truthOrFakeModule(){
  // 内层 .tof 容器（scanning 类需加在带 overflow:hidden 的卡片上；外层 section 仅作锚点）
  const wrap=document.querySelector(".tof");
  if(!wrap||typeof truthOrFake==="undefined") return;
  const ROUND_LEN=10;   // 每局 10 题（题库 24 条随机抽取）
  const textEl=document.getElementById("tofText");
  const actionsEl=document.getElementById("tofActions");
  const revealEl=document.getElementById("tofReveal");
  const nextBtn=document.getElementById("tofNext");
  const cardEl=document.getElementById("tofCard");
  const roundEl=document.getElementById("tofRound");
  const scoreEl=document.getElementById("tofScore");
  const streakEl=document.getElementById("tofStreak");
  const resultBox=document.getElementById("tofResult");

  // Fisher-Yates 洗牌
  function shuffle(a){const b=a.slice();for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;}

  let game=[], idx=0, score=0, streak=0, maxStreak=0, realCorrect=0, realTotal=0, fakeCorrect=0, fakeTotal=0;

  function startGame(){
    game=shuffle(truthOrFake).slice(0,ROUND_LEN);
    idx=0; score=0; streak=0; maxStreak=0; realCorrect=0; realTotal=0; fakeCorrect=0; fakeTotal=0;
    resultBox.hidden=true;
    cardEl.parentElement.style.display="";
    cardEl.style.display="";
    showQuestion();
  }

  function showQuestion(){
    const item=game[idx];
    roundEl.textContent=idx+1;
    scoreEl.textContent=score;
    streakEl.textContent=streak;
    // 重置卡片状态
    cardEl.classList.remove("correct","wrong","flip-out");
    revealEl.hidden=true;
    nextBtn.hidden=true;
    [...actionsEl.children].forEach(b=>{b.disabled=false;b.classList.remove("picked-fake","picked-real");});
    textEl.textContent=tt(item,"text");
  }

  function answer(picked){
    const item=game[idx];
    const correct = (picked===item.truth);
    // 统计真假题数
    if(item.truth){realTotal++; if(correct)realCorrect++;}
    else{fakeTotal++; if(correct)fakeCorrect++;}
    // 锁定按钮
    [...actionsEl.children].forEach(b=>{
      b.disabled=true;
      if(b.dataset.ans===String(picked)) b.classList.add(picked===true?"picked-real":"picked-fake");
    });
    // 卡片高亮
    cardEl.classList.add(correct?"correct":"wrong");
    // 揭晓
    const verdict = item.truth ? t("tof.realVerdict") : t("tof.fakeVerdict");
    revealEl.innerHTML=`${correct?`<b style="color:#3ddc84">${t("tof.correct")}</b>`:`<b style="color:#ff1744">${t("tof.wrong")}</b>`} ${verdict}<br>${tt(item,"reveal")}<span class="src">${t("tof.source")}${tt(item,"source")}</span>`;
    revealEl.hidden=false;
    nextBtn.hidden=false;
    nextBtn.textContent = (idx===ROUND_LEN-1)?t("tof.result"):t("tof.next");
    // 计分 + 连击
    if(correct){score++; streak++; maxStreak=Math.max(maxStreak,streak);}
    else{streak=0;}
    scoreEl.textContent=score;
    streakEl.textContent=streak;
  }

  function showResult(){
    cardEl.parentElement.style.display="none";
    resultBox.hidden=false;
    resultBox.classList.add("show");
    const pct=score/ROUND_LEN;
    let rank,verdict;
    if(pct===1){rank=t("tof.rankPerfect");verdict=`${score}/${ROUND_LEN} ${t("tof.verdictPerfect","")}`;}
    else if(pct>=0.7){rank=t("tof.rankHigh");verdict=`${score}/${ROUND_LEN}. ${t("tof.verdictHigh","")}`;}
    else if(pct>=0.4){rank=t("tof.rankMid");verdict=`${score}/${ROUND_LEN}. ${t("tof.verdictMid","")}`;}
    else{rank=t("tof.rankLow");verdict=`${score}/${ROUND_LEN}. ${t("tof.verdictLow","")}`;}
    document.getElementById("tofFinalScore").textContent=score;
    document.getElementById("tofRank").textContent=rank;
    document.getElementById("tofVerdict").textContent=verdict;
    document.getElementById("tofStats").innerHTML=`${t("tof.realStat","Real")}${realCorrect}/${realTotal} · ${t("tof.fakeStat","Fake")}${fakeCorrect}/${fakeTotal} · ${t("tof.maxStreak","Max streak")}${maxStreak}`;
    if(window.__badge) window.__badge("quiz",{score,total:ROUND_LEN,pct});  // 复用 quiz 成就触发
    // 分数滚动
    const fs=document.getElementById("tofFinalScore");
    let n=0;const t0=performance.now();
    (function tick(now){const p=Math.min((now-t0)/900,1);const eased=1-Math.pow(1-p,3);fs.textContent=Math.floor(eased*score);if(p<1)requestAnimationFrame(tick);else fs.textContent=score;})(performance.now());
  }
  // 语言切换：保留 idx/score/streak，仅重渲染当前题文本或结果页
  document.addEventListener("ca7:lang-change",()=>{
    if(!resultBox.hidden){
      // 结果页：更新 rank/verdict/stats
      const pct=score/ROUND_LEN;
      let rank,verdict;
      if(pct===1){rank=t("tof.rankPerfect");verdict=`${score}/${ROUND_LEN} ${t("tof.verdictPerfect","")}`;}
      else if(pct>=0.7){rank=t("tof.rankHigh");verdict=`${score}/${ROUND_LEN}. ${t("tof.verdictHigh","")}`;}
      else if(pct>=0.4){rank=t("tof.rankMid");verdict=`${score}/${ROUND_LEN}. ${t("tof.verdictMid","")}`;}
      else{rank=t("tof.rankLow");verdict=`${score}/${ROUND_LEN}. ${t("tof.verdictLow","")}`;}
      document.getElementById("tofRank").textContent=rank;
      document.getElementById("tofVerdict").textContent=verdict;
    } else if(game[idx]){
      // 答题中：更新当前题文本（已锁定的 reveal 也重渲染）
      const item=game[idx];
      textEl.textContent=tt(item,"text");
      if(!revealEl.hidden){
        const verdict = item.truth ? t("tof.realVerdict") : t("tof.fakeVerdict");
        // 是否已答对/错不可知，简单保留 reveal 文本结构
        revealEl.innerHTML=`${verdict}<br>${tt(item,"reveal")}<span class="src">${t("tof.source")}${tt(item,"source")}</span>`;
      }
    }
  });

  // 事件绑定
  actionsEl.addEventListener("click",e=>{
    const b=e.target.closest(".tof-btn");
    if(!b||b.disabled) return;
    answer(b.dataset.ans==="true");
  });
  nextBtn.addEventListener("click",()=>{
    if(idx<ROUND_LEN-1){
      idx++;
      // 翻牌过渡
      cardEl.classList.add("flip-out");
      setTimeout(showQuestion,240);
    } else {
      showResult();
    }
  });
  document.getElementById("tofRestart").addEventListener("click",startGame);

  // 首局启动
  startGame();
  // 进入视口加扫描线氛围（复用 quiz 的 scanning 视觉）
  const obs=new IntersectionObserver((ents)=>{
    ents.forEach(en=>{ if(en.isIntersecting){ wrap.classList.add("scanning"); }});
  },{threshold:0.3});
  obs.observe(wrap);
})();

/* ========== 点球含金量检测仪 ========== */
(function(){
  const scanner=document.getElementById("scanner");
  const grid=document.getElementById("scanGrid");
  const gaugeFill=document.getElementById("gaugeFill");
  const gaugeNum=document.getElementById("gaugeNum");
  const verdict=document.getElementById("gaugeVerdict");
  const status=scanner?scanner.querySelector(".scanner-status"):null;
  if(!grid||typeof penaltyData==="undefined") return;
  // 渲染检测项（封装以便语言切换重渲染）
  function renderScanItems(){
    grid.innerHTML=penaltyData.items.map(it=>`
      <div class="scan-item" data-score="${it.score}">
        <div class="scan-label">${tt(it,"label")}</div>
        <div class="scan-value">${tt(it,"value")}<span class="unit"> ${tt(it,"unit")||''}</span></div>
        <div class="scan-note">${tt(it,"note")}</div>
      </div>`).join("");
  }
  renderScanItems();
  const circumference=292; // 半圆弧长近似
  let scanned=false;
  function runScan(){
    if(scanned) return; scanned=true;
    scanner.classList.add("scanning");
    status.innerHTML='<span class="blink"></span>'+t("scanner.statusScan");
    // 逐项高亮
    const items=grid.querySelectorAll(".scan-item");
    items.forEach((it,i)=>{
      setTimeout(()=>it.classList.add("detected"),i*350);
    });
    // 仪表盘
    setTimeout(()=>{
      const score=penaltyData.totalScore;
      const offset=circumference*(1-score/100);
      gaugeFill.style.strokeDashoffset=offset;
      // 数字动画
      let n=0; const target=score; const t0=performance.now();
      function tick(now){
        const p=Math.min((now-t0)/1500,1);
        n=Math.floor((1-Math.pow(1-p,3))*target);
        gaugeNum.textContent=n+"%";
        if(p<1) requestAnimationFrame(tick);
        else gaugeNum.textContent=target+"%";
      }
      requestAnimationFrame(tick);
      status.innerHTML='<span class="blink"></span>'+t("scanner.statusDone");
      let v=""; if(score<20) v=t("scanner.verdict.low"); else if(score<40) v=t("scanner.verdict.mid");
      else v=t("scanner.verdict.high"); verdict.textContent=v;
      setTimeout(()=>scanner.classList.remove("scanning"),3000);
    },items.length*350+400);
  }
  // 进入视口触发
  const so=new IntersectionObserver((ents)=>{
    ents.forEach(en=>{ if(en.isIntersecting){ runScan(); so.unobserve(en.target); }});
  },{threshold:0.3});
  so.observe(scanner);
  // 点击可重测
  scanner.addEventListener("click",()=>{
    scanned=false;
    grid.querySelectorAll(".scan-item").forEach(it=>it.classList.remove("detected"));
    gaugeFill.style.strokeDashoffset=circumference;
    gaugeNum.textContent="--"; verdict.textContent=t("scanner.verdict.wait");
    setTimeout(runScan,200);
  });
  // 语言切换：重渲染检测项文本（不重跑动画）；若已扫描完则更新 verdict/status 文案
  document.addEventListener("ca7:lang-change",()=>{
    renderScanItems();
    if(scanned){
      const score=penaltyData.totalScore;
      let v=""; if(score<20) v=t("scanner.verdict.low"); else if(score<40) v=t("scanner.verdict.mid");
      else v=t("scanner.verdict.high");
      verdict.textContent=v;
      status.innerHTML='<span class="blink"></span>'+t("scanner.statusDone");
    } else {
      status.innerHTML='<span class="blink"></span>'+t("scanner.statusReady");
    }
  });
})();

/* ========== C罗表情生成器 ========== */
(function(){
  const canvas=document.getElementById("memeCanvas");
  const thumbs=document.getElementById("memeThumbs");
  const top=document.getElementById("memeTop");
  const bot=document.getElementById("memeBottom");
  const presetsEl=document.getElementById("memePresets");
  const dl=document.getElementById("memeDownload");
  if(!canvas||typeof memePhotos==="undefined") return;
  const ctx=canvas.getContext("2d");
  let curPhoto=memePhotos[0];
  let img=new Image(); img.crossOrigin="anonymous";
  // 缩略图：用 webp（体积约为 jpg 一半），canvas 绘图同样支持 webp 解码
  const toWebp=p=>p.replace(/\.(jpe?g|png)$/i,".webp");
  // 缩略图懒加载：滚到表情生成器附近才批量生成，避免首屏全量预加载 45+ 张
  function buildThumbs(){
    if(thumbs.dataset.built) return;
    thumbs.dataset.built="1";
    thumbs.innerHTML=memePhotos.map((p,i)=>`<div class="meme-thumb ${i===0?'active':''}" data-src="${p}" data-webp="${toWebp(p)}" style="background-image:url('${toWebp(p)}')"></div>`).join("");
  }
  // 预设（读 tt 双语）
  function renderPresets(){
    presetsEl.innerHTML=memePresets.map((p,i)=>`<span class="meme-preset" data-i="${i}">${tt(p,"top").slice(0,8)}…</span>`).join("");
  }
  renderPresets();
  document.addEventListener("ca7:lang-change", renderPresets);
  function draw(){
    ctx.fillStyle="#000"; ctx.fillRect(0,0,canvas.width,canvas.height);
    // 居中绘制图片（cover）
    if(img.complete&&img.naturalWidth){
      const cw=canvas.width, ch=canvas.height;
      const ir=img.naturalWidth/img.naturalHeight;
      const cr=cw/ch;
      let sw=img.naturalWidth, sh=img.naturalHeight, sx=0, sy=0;
      if(ir>cr){ sw=img.naturalHeight*cr; sx=(img.naturalWidth-sw)/2; }
      else { sh=img.naturalWidth/cr; sy=(img.naturalHeight-sh)/2; }
      ctx.drawImage(img,sx,sy,sw,sh,0,0,cw,ch);
    }
    // 文字
    const drawText=(txt,baseY)=>{
      if(!txt) return;
      ctx.save();
      ctx.font="bold 44px Arial, 'Microsoft YaHei', sans-serif";
      ctx.textAlign="center";
      ctx.lineWidth=6; ctx.strokeStyle="#000"; ctx.fillStyle="#fff";
      ctx.textBaseline="top";
      // 自动换行
      const maxW=canvas.width-40;
      const lines=wrapText(ctx,txt,maxW);
      let y=baseY;
      lines.forEach(l=>{ ctx.strokeText(l,canvas.width/2,y); ctx.fillText(l,canvas.width/2,y); y+=50; });
      ctx.restore();
    };
    drawText(top.value.trim().toUpperCase(),24);
    // 底部从下往上排
    if(bot.value.trim()){
      ctx.save();
      ctx.font="bold 44px Arial, 'Microsoft YaHei', sans-serif";
      ctx.textAlign="center"; ctx.lineWidth=6; ctx.strokeStyle="#000"; ctx.fillStyle="#fff";
      const lines=wrapText(ctx,bot.value.trim().toUpperCase(),canvas.width-40);
      let y=canvas.height-24;
      for(let i=lines.length-1;i>=0;i--){ ctx.textBaseline="bottom"; ctx.strokeText(lines[i],canvas.width/2,y); ctx.fillText(lines[i],canvas.width/2,y); y-=50; }
      ctx.restore();
    }
  }
  function wrapText(ctx,txt,maxW){
    // 按字符断行（中英混排）
    const lines=[]; let line="";
    for(const ch of txt){
      const test=line+ch;
      if(ctx.measureText(test).width>maxW&&line){ lines.push(line); line=ch; }
      else line=test;
    }
    if(line) lines.push(line);
    return lines.slice(0,3);
  }
  // canvas 首图用 webp（canvas 原生支持解码 webp，体积更小）
  img.onload=draw; img.src=toWebp(curPhoto);
  // 表情生成器滚入视口时再构建缩略图（避免首屏预加载 45+ 张底图）
  const memeSection = canvas.closest("section") || canvas.parentElement;
  if("IntersectionObserver" in window && memeSection){
    const ob=new IntersectionObserver((es)=>{ es.forEach(en=>{ if(en.isIntersecting){ buildThumbs(); ob.disconnect(); } }); },{rootMargin:"200px"});
    ob.observe(memeSection);
  } else {
    buildThumbs();   // 无 IO 支持时直接构建
  }
  thumbs.addEventListener("click",e=>{
    const t=e.target.closest(".meme-thumb"); if(!t) return;
    curPhoto=t.dataset.src;
    thumbs.querySelectorAll(".meme-thumb").forEach(x=>x.classList.toggle("active",x===t));
    img=new Image(); img.onload=draw; img.src=t.dataset.webp || toWebp(curPhoto);
  });
  top.addEventListener("input",draw);
  bot.addEventListener("input",draw);
  presetsEl.addEventListener("click",e=>{
    const t=e.target.closest(".meme-preset"); if(!t) return;
    const p=memePresets[parseInt(t.dataset.i)];
    top.value=tt(p,"top"); bot.value=tt(p,"bottom"); draw();
  });
  dl.addEventListener("click",()=>{
    try{
      const a=document.createElement("a");
      a.download="ca7-meme.png";
      a.href=canvas.toDataURL("image/png");
      a.click();
    }catch(err){
      dl.textContent="下载失败(跨域)";
    }
  });
  // 默认填一句（读字典）
  top.value=t("meme.defaultTop"); bot.value=t("meme.defaultBottom");
  draw();
})();

/* ========== 罪恶账本烧钱榜 ========== */
(function(){
  const ledger=document.getElementById("ledger");
  if(!ledger||typeof moneyLedger==="undefined") return;
  let revealed=false;
  function render(){
    ledger.innerHTML=`
      <div class="ledger-head">
        <div class="ledger-title">${t("ledger.headTitle")}</div>
        <div class="ledger-no">NO. CA7-2026-${moneyLedger.length}ENTRIES</div>
      </div>
      <div class="ledger-rows">
        ${moneyLedger.map((m,i)=>`
          <div class="ledger-row" data-i="${i}">
            <div class="ld-desc">
              <span class="ledger-cat">${tt(m,"cat")}</span>${tt(m,"desc")}
              <small>${tt(m,"detail")}</small>
            </div>
            <div class="ld-amount">${m.amount}<span class="cur"> ${m.currency}</span></div>
          </div>`).join("")}
      </div>
      <div class="ledger-foot">
        <div class="ledger-total">${t("ledger.total")}<span class="n">${t("ledger.totalVal")}</span></div>
      </div>`;
    // 逐行揭示（若已揭示过则立即全部 show）
    const rows=ledger.querySelectorAll(".ledger-row");
    rows.forEach((r,i)=>{
      if(revealed) r.classList.add("show");
    });
    if(!revealed){
      const lo=new IntersectionObserver((ents)=>{
        ents.forEach(en=>{
          if(en.isIntersecting){
            revealed=true;
            const rs=ledger.querySelectorAll(".ledger-row");
            rs.forEach((r,i)=>setTimeout(()=>r.classList.add("show"),i*180));
            lo.unobserve(en.target);
          }
        });
      },{threshold:0.2});
      lo.observe(ledger);
    }
  }
  render();
  document.addEventListener("ca7:lang-change", render);
})();

/* ========== 鼠标涟漪/光晕氛围层 ========== */
(function(){
  const aura=document.getElementById("fxAura");
  if(!aura) return;
  // 仅桌面端 + 非「减少动效」启用
  const finePointer = window.matchMedia("(pointer:fine)").matches;
  const hoverable = window.matchMedia("(hover:hover)").matches;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
  if(!finePointer || !hoverable || reduceMotion) return;

  document.body.classList.add("fx-ready");
  let tx=window.innerWidth/2, ty=window.innerHeight/2;   // 目标坐标
  let cx=tx, cy=ty;                                       // 当前坐标（lerp 平滑）
  let lastMove=performance.now();
  let breathing=false;
  const BASE_OPACITY=.18;

  window.addEventListener("pointermove",e=>{
    tx=e.clientX; ty=e.clientY;
    lastMove=performance.now();
    breathing=false;
    aura.style.opacity=BASE_OPACITY;
  },{passive:true});

  // 点击/触摸：在落点生成扩散涟漪环
  window.addEventListener("pointerdown",e=>{
    const r=document.createElement("div");
    r.className="fx-ripple";
    r.style.left=e.clientX+"px";
    r.style.top=e.clientY+"px";
    document.body.appendChild(r);
    r.addEventListener("animationend",()=>r.remove(),{once:true});
  },{passive:true});

  // 离开窗口淡出
  document.addEventListener("mouseleave",()=>{ aura.style.opacity=0; });
  document.addEventListener("mouseenter",()=>{ aura.style.opacity=BASE_OPACITY; });

  // 主循环：lerp 跟随 + 静止呼吸
  function loop(now){
    // 指数平滑：每帧向目标靠近 ~18%
    cx+=(tx-cx)*0.18;
    cy+=(ty-cy)*0.18;
    aura.style.transform=`translate(${cx}px,${cy}px)`;
    // 静止超过 1.5s 进入呼吸态：opacity 做正弦起伏
    if(!breathing && now-lastMove>1500){ breathing=true; }
    if(breathing){
      const phase=(now-lastMove-1500)/1000;       // 秒
      aura.style.opacity=BASE_OPACITY + Math.sin(phase*1.6)*0.08;
    }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();

/* ========== 签名彩蛋（档案封印 + SIU）========== */
(function(){
  const seal=document.getElementById("footerSeal");
  const stamp=document.getElementById("sealStamp");
  const hint=document.getElementById("sealHint");
  const countEl=document.getElementById("sealCount");
  const titleEl=document.getElementById("sealTitle");
  const marks=document.getElementById("sealMarks");
  if(!seal||!stamp) return;

  const MAX=7;   // 封顶 7 印
  // 称号阶梯（封顶 7，双语）
  const TITLES=[
    {n:1,name:"见习封印官",nameEn:"Apprentice Sealer",line:"第一枚封印已落下。",lineEn:"The first seal has fallen."},
    {n:3,name:"档案守护者",nameEn:"Archive Guardian",line:"三枚红印，黑历史由你看管。",lineEn:"Three red seals — the dark history is yours to guard."},
    {n:7,name:"首席档案官",nameEn:"Chief Archivist",line:"七印封顶 · SIU! 触发庆祝。",lineEn:"Seven seals capped · SIU! Celebration triggered."}
  ];
  let count=0, titleIdx=-1, siuUnlocked=false, siuPlaying=false;

  /* —— SIU 全屏庆祝 ——
     统一入口 window.__siuCelebration()：所有 SIU 触发点（底部封印 / 右下悬浮按钮）
     都汇入此处。
     视频选择规则：第一次播放固定的原版 siu.mp4；之后每次从用户提供的短视频池里随机抽一个。
     音效始终是原版 SIU 音效（assets/siu.mp3）。 */
  // 用户提供的短视频池（首次播放后才启用随机）
  const SIU_CLIP_POOL=[
    "assets/videos/cristiano-ronaldo-siuu.mp4",
    "assets/videos/cristiano-ronaldo-ronaldo-angry.mp4",
    "assets/videos/cristiano-ronaldo-cristiano-ronaldo-meme.mp4",
    "assets/videos/ronaldo-al-nassr-ronaldo.mp4",
    "assets/videos/ronaldo-al-nassr-alnassr.mp4",
    "assets/videos/unsrscandidate-cristiano-ronaldo.mp4"
  ];
  let siuPlayCount=0;   // 第几次触发（0 = 首次，播原版 siu.mp4）
  function pickSiuVideo(){
    // 首次：固定原版 siu.mp4；之后：从池中随机抽（不与上次重复）
    if(siuPlayCount===0){ siuPlayCount++; return "assets/videos/siu.mp4"; }
    siuPlayCount++;
    if(SIU_CLIP_POOL.length===0) return "assets/videos/siu.mp4";
    if(SIU_CLIP_POOL.length===1) return SIU_CLIP_POOL[0];
    let pick;
    do { pick=SIU_CLIP_POOL[Math.floor(Math.random()*SIU_CLIP_POOL.length)]; }
    while(pick===window.__lastSiuClip);
    window.__lastSiuClip=pick;
    return pick;
  }
  function playSIU(){
    window.__siuCelebration();
  }
  // 探测原版视频是否可用（启动时异步，仅用于决定是否走视频分支）
  let siuVideoOk=false;
  (function probeVideo(){
    const x=new XMLHttpRequest();
    x.open("HEAD","assets/videos/siu.mp4",true);
    x.onload=()=>{ siuVideoOk = x.status>=200 && x.status<300; };
    x.send();
  })();
  window.__siuCelebration=function(){
    if(siuPlaying) return;
    siuPlaying=true;
    const ov=document.createElement("div");
    ov.className="siu-overlay";
    // 决定本次播哪个视频（首次=原版 siu.mp4，之后=池中随机）
    const videoSrc=pickSiuVideo();
    const videoAvailable = siuVideoOk || siuPlayCount>1;  // 首次靠探测结果；之后默认信任池内文件
    // 素材优先级：视频 > 图片 > 矢量。无「SIU!」文字，纯画面。
    let figureHtml;
    if(videoAvailable){
      figureHtml=`<div class="siu-figure siu-figure-video" aria-hidden="true">
        <video src="${videoSrc}" autoplay muted playsinline preload="auto"></video>
      </div>`;
    }else if(window.__siuImg){
      figureHtml=`<div class="siu-figure siu-figure-img" aria-hidden="true">
        <img src="${window.__siuImg}" alt="">
      </div>`;
    }else{
      figureHtml=`<div class="siu-figure" aria-hidden="true">
        <svg viewBox="0 0 120 160" width="120" height="160">
          <circle cx="60" cy="22" r="13" fill="#1a1a1a"/>
          <ellipse cx="60" cy="24" rx="3.5" ry="5" fill="#dc143c"/>
          <path d="M60 35 L60 92" stroke="#1a1a1a" stroke-width="9" stroke-linecap="round"/>
          <path d="M60 48 L22 30" stroke="#1a1a1a" stroke-width="7.5" stroke-linecap="round"/>
          <path d="M60 48 L98 30" stroke="#1a1a1a" stroke-width="7.5" stroke-linecap="round"/>
          <path d="M60 92 L30 150" stroke="#1a1a1a" stroke-width="9" stroke-linecap="round"/>
          <path d="M60 92 L90 150" stroke="#1a1a1a" stroke-width="9" stroke-linecap="round"/>
        </svg>
      </div>`;
    }
    ov.innerHTML=figureHtml;
    document.body.appendChild(ov);
    // 视频立即播放
    const v=ov.querySelector("video");
    // 开始淡出整个覆盖层（视频播完即渐变消失，不挡阅读）
    const fadeOut=()=>{
      if(ov.classList.contains("out")) return;
      ov.classList.add("out");
      ov.addEventListener("animationend",()=>{ ov.remove(); siuPlaying=false; },{once:true});
      // 兜底：淡出动画 0.5s 后强制移除
      setTimeout(()=>{ ov.remove(); siuPlaying=false; },600);
    };
    if(v){
      v.play().catch(()=>{});
      // 视频播完一遍即渐变消失
      v.addEventListener("ended",fadeOut,{once:true});
      // 兜底：视频可能不触发 ended（某些浏览器/格式），按视频实际时长 +0.5s 淡出；
      //   时长未知时退回 3.5s。短池里的视频 1.7~6.4s 不等，不能写死 2.5s 否则会切掉长视频。
      v.addEventListener("loadedmetadata",()=>{
        const dur=v.duration;
        if(isFinite(dur) && dur>0){ setTimeout(fadeOut, (dur+0.5)*1000); }
        else { setTimeout(fadeOut,3500); }
      },{once:true});
      // 终极兜底：元数据迟迟不加载，7s 后必淡出
      setTimeout(fadeOut,7000);
    }else{
      // 无视频（图片/矢量兜底）：3s 后淡出
      setTimeout(fadeOut,3000);
    }
    // 同步播放音效（与视频/画面配合；所有触发点统一发声）
    if(typeof window.__siuSound==="function") window.__siuSound();
    // 彩纸碎片
    const colors=["#dc143c","#e8b923","#fff","#ff1744","#3ddc84"];
    for(let i=0;i<40;i++){
      const c=document.createElement("div");
      c.className="siu-confetti";
      c.style.left=Math.random()*100+"vw";
      c.style.background=colors[i%colors.length];
      c.style.animationDuration=(1.2+Math.random()*1.2)+"s";
      c.style.animationDelay=(Math.random()*.3)+"s";
      c.style.transform="rotate("+Math.random()*360+"deg)";
      document.body.appendChild(c);
      c.addEventListener("animationend",()=>c.remove(),{once:true});
    }
    // 兜底：无论动画如何，6s 后强制解锁，避免卡死无法再次触发
    setTimeout(()=>{ siuPlaying=false; },6000);
  };

  function stamp_seal(){
    if(count>=MAX){
      // 已封顶：若解锁了 SIU，重放庆祝；否则无动作
      if(siuUnlocked) playSIU();
      return;
    }
    count++;
    // 1) 印章砸落
    const drop=document.createElement("div");
    drop.className="seal-drop";
    drop.textContent="封印\n#"+count;
    drop.style.whiteSpace="pre";
    seal.querySelector(".seal-stage").appendChild(drop);
    drop.addEventListener("animationend",()=>drop.remove(),{once:true});
    // 2) stage 震动
    stamp.classList.remove("shaking");
    void stamp.offsetWidth;
    stamp.classList.add("shaking");
    stamp.addEventListener("animationend",function ae(){
      stamp.removeEventListener("animationend",ae);
      stamp.classList.remove("shaking");
    });
    // 3) 永久墨迹印记（累积）
    const ink=document.createElement("span");
    ink.className="seal-inkmark";
    marks.appendChild(ink);
    // 4) 计数显示
    countEl.hidden=false;
    countEl.textContent=t("footer.sealCount","封印 · ")+count+" / "+MAX;
    // 5) 解锁称号
    let newIdx=titleIdx;
    TITLES.forEach((tt2,i)=>{ if(count>=tt2.n) newIdx=i; });
    if(newIdx>titleIdx){
      titleIdx=newIdx;
      const tt2=TITLES[newIdx];
      titleEl.hidden=false;
      titleEl.textContent="« "+tt(tt2,"name")+" »";
      titleEl.style.animation="none"; void titleEl.offsetWidth;
      titleEl.style.animation="";
      hint.textContent=tt(tt2,"line");
    }
    // 6) 封顶触发 SIU
    if(count===MAX){
      siuUnlocked=true;
      hint.textContent=t("footer.sealHint2");
      setTimeout(playSIU, 500);   // 等印章砸落动画收尾再庆祝
    } else if(count===1){
      hint.textContent=t("footer.sealHint3");
    }
  }

  stamp.addEventListener("click",stamp_seal);
  stamp.addEventListener("keydown",e=>{
    if(e.key==="Enter"||e.key===" "){ e.preventDefault(); stamp_seal(); }
  });
  // 语言切换：更新 hint/title/count 文本（保留 count/titleIdx/siuUnlocked 状态）
  document.addEventListener("ca7:lang-change",()=>{
    if(count>0){
      countEl.hidden=false;
      countEl.textContent=t("footer.sealCount","封印 · ")+count+" / "+MAX;
    }
    if(titleIdx>=0){
      const tt2=TITLES[titleIdx];
      titleEl.textContent="« "+tt(tt2,"name")+" »";
      hint.textContent=tt(tt2,"line");
    } else {
      hint.textContent=t("footer.sealHint");
    }
    if(count===MAX) hint.textContent=t("footer.sealHint2");
    else if(count>=1 && count<MAX) hint.textContent=t("footer.sealHint3");
  });
})();

/* ========== 黑料盲盒 / 今日通缉令 ========== */
(function blindboxModule(){
  const poster=document.getElementById("blindboxPoster");
  const els={
    no:document.getElementById("blindboxNo"),
    cat:document.getElementById("blindboxCat"),
    title:document.getElementById("blindboxTitle"),
    date:document.getElementById("blindboxDate"),
    loc:document.getElementById("blindboxLoc"),
    sev:document.getElementById("blindboxSev"),
    summary:document.getElementById("blindboxSummary"),
  };
  let current=null, lastId=null;

  function pick(){
    let pool=events;
    if(lastId!==null && events.length>1){
      pool=events.filter(e=>e.id!==lastId);
    }
    return pool[Math.floor(Math.random()*pool.length)];
  }

  function sevLabel(s){
    return t("sev."+Math.max(1,Math.min(5,s)), s>=5?"极重":s===4?"严重":s===3?"较重":s===2?"一般":"轻微");
  }

  function render(ev){
    current=ev;
    els.no.textContent="№ "+String(ev.id).padStart(3,"0")+" / "+String(events.length).padStart(3,"0");
    const catLabel = catConfig[ev.cat] ? tt(catConfig[ev.cat],"label") : (ev.catLabel||"");
    els.cat.textContent=catLabel;
    els.title.textContent=tt(ev,"title");
    els.date.textContent="📅 "+(tt(ev,"date")||"—");
    els.loc.textContent="📍 "+(tt(ev,"location")||"—");
    let bars="";
    for(let i=1;i<=5;i++){
      bars+=`<span class="sev-bar${i<=ev.severity?" on":""}"></span>`;
    }
    els.sev.innerHTML=`${t("blindbox.sev","严重程度")} ${bars} <span>${sevLabel(ev.severity)}</span>`;
    els.summary.textContent=tt(ev,"summary");
  }

  function shuffle(){
    poster.classList.remove("flip");
    void poster.offsetWidth;
    poster.classList.add("flip");
    render(pick());
    lastId=current.id;
  }

  function download(){
    if(!current) return;
    const c=document.createElement("canvas");
    const W=600,H=840;
    c.width=W;c.height=H;
    const x=c.getContext("2d");
    // 背景渐变
    const g=x.createLinearGradient(0,0,0,H);
    g.addColorStop(0,"#131316");g.addColorStop(1,"#0b0b0d");
    x.fillStyle=g;x.fillRect(0,0,W,H);
    // 边框
    x.strokeStyle="#dc143c";x.lineWidth=2;
    x.strokeRect(20,20,W-40,H-40);
    // CLASSIFIED 印章
    x.strokeStyle="#dc143c";x.lineWidth=2;
    x.strokeRect(W-150,40,110,28);
    x.fillStyle="#dc143c";x.font="600 14px 'Courier New',monospace";
    x.textAlign="center";
    x.fillText("CLASSIFIED",W-95,59);
    // 水印
    x.fillStyle="rgba(220,20,60,0.05)";x.font="900 200px Georgia,serif";
    x.textAlign="center";
    x.fillText("CA7",W/2,H-80);
    // 编号
    x.fillStyle="#dc143c";x.font="700 18px 'Courier New',monospace";
    x.textAlign="left";
    x.fillText("№ "+String(current.id).padStart(3,"0")+" / "+String(events.length).padStart(3,"0"),45,110);
    // 分类
    x.fillStyle="#7a7a82";x.font="12px 'Courier New',monospace";
    const dlCatLabel = catConfig[current.cat] ? tt(catConfig[current.cat],"label") : (current.catLabel||"");
    x.fillText(dlCatLabel.toUpperCase(),45,135);
    x.strokeStyle="#2a2a30";x.beginPath();x.moveTo(45,148);x.lineTo(W-45,148);x.stroke();
    // 标题（自动换行）
    x.fillStyle="#f0f0f4";x.font="900 30px Georgia,serif";
    wrapText(x,tt(current,"title"),45,195,W-90,36);
    // 日期/地点
    x.fillStyle="#7a7a82";x.font="13px 'Courier New',monospace";
    x.fillText("📅 "+(tt(current,"date")||"—"),45,290);
    x.fillText("📍 "+(tt(current,"location")||"—"),45,312);
    // 严重程度条
    x.fillStyle="#7a7a82";x.font="11px 'Courier New',monospace";
    x.fillText(t("blindbox.sev","严重程度"),45,345);
    for(let i=0;i<5;i++){
      x.fillStyle=i<current.severity?"#dc143c":"#2a2a30";
      x.fillRect(45+i*24,355,18,8);
    }
    x.fillStyle="#dc143c";
    x.fillText(sevLabel(current.severity),45,382);
    // 摘要
    x.fillStyle="#d6d6db";x.font="15px Georgia,serif";
    wrapText(x,tt(current,"summary"),45,430,W-90,26);
    // 底部
    x.fillStyle="#7a7a82";x.font="10px 'Courier New',monospace";
    x.textAlign="center";
    x.fillText("THE AVEIRO FILES · "+t("blindbox.title","黑料盲盒")+" · "+t("footer.shortDisclaimer","球迷文化创作，不代表任何官方立场"),W/2,H-30);

    const a=document.createElement("a");
    a.download=`CA7-wanted-${String(current.id).padStart(3,"0")}.png`;
    a.href=c.toDataURL("image/png");
    a.click();
    if(window.__badge) window.__badge("blindbox");
  }

  function wrapText(ctx,text,x,y,maxW,lh){
    const chars=text.split("");
    let line="",cy=y;
    for(const ch of chars){
      const test=line+ch;
      if(ctx.measureText(test).width>maxW && line){
        ctx.fillText(line,x,cy);line=ch;cy+=lh;
      } else line=test;
    }
    if(line) ctx.fillText(line,x,cy);
  }

  document.getElementById("blindboxShuffle").addEventListener("click",shuffle);
  document.getElementById("blindboxDownload").addEventListener("click",download);
  document.getElementById("blindboxOpen").addEventListener("click",()=>{
    if(!current) return;
    // 找到该事件在 currentList 中的位置（若被筛选则回退到全集）
    let list=currentList.length?currentList:events;
    let idx=list.findIndex(e=>e.id===current.id);
    if(idx<0){ list=events; idx=list.findIndex(e=>e.id===current.id); }
    if(idx>=0){ openModalByIdx(idx); }
  });

  shuffle();
  // 语言切换：重渲染当前盲盒（保留 current 不变）
  document.addEventListener("ca7:lang-change",()=>{
    if(current) render(current);
  });
})();

/* ========== 争议世界地图 2.0（时间轴 + 生涯轨迹 + 热度图） ========== */
(function worldmapModule(){
  const svg=document.getElementById("worldmapSvg");
  const tip=document.getElementById("worldmapTip");
  const wrap=document.querySelector(".worldmap");
  const pinsLayer=document.getElementById("wmPinsLayer");
  const trailLayer=document.getElementById("wmTrailLayer");
  const heatLayer=document.getElementById("wmHeatLayer");
  const readout=document.getElementById("wmReadout");
  if(!svg||!pinsLayer) return;

  // 地区 → 坐标（viewBox 1000x500 上的近似经纬度映射）
  const regions={
    "英国":[470,150],"曼联":[462,148],"老特拉福德":[462,148],
    "西班牙":[480,205],"马德里":[485,205],"诺坎普":[475,212],"巴塞罗那":[475,212],
    "意大利":[520,195],"都灵":[518,188],"尤文":[518,188],
    "葡萄牙":[455,205],"马德拉":[450,235],
    "法国":[478,180],"巴黎":[485,175],
    "德国":[505,160],
    "塞尔维亚":[535,190],"布达佩斯":[540,185],"匈牙利":[540,185],
    "美国":[230,210],"拉斯维加斯":[200,190],"加利福尼亚":[210,220],"加州":[210,220],
    "巴西":[340,350],"阿根廷":[330,400],
    "迪拜":[605,210],"阿联酋":[605,210],"沙特":[620,225],"利雅得":[625,225],
    "卡塔尔":[628,218],
    "南非":[545,410],
    "韩国":[810,185],"日本":[840,180],"中国":[780,180],
    "俄罗斯":[560,120],"莫斯科":[560,130],
    "希腊":[530,195],
    "爱尔兰":[445,145],
    "澳大利亚":[820,380],
  };

  function coord(loc){
    if(!loc) return null;
    const keys=Object.keys(regions);
    for(const k of keys){ if(loc.indexOf(k)>=0) return regions[k]; }
    return null;
  }
  // 从事件 date 字符串里抓年份（取第一个 4 位数）
  function yearOf(ev){
    const m=String(ev.date||"").match(/(\d{4})/);
    return m?parseInt(m[1],10):null;
  }

  // 聚合：每个坐标点合并多条事件
  const buckets={};
  events.forEach(ev=>{
    const c=coord(ev.location);
    if(!c) return;
    const key=c[0]+"_"+c[1];
    if(!buckets[key]) buckets[key]={x:c[0],y:c[1],items:[]};
    buckets[key].items.push(ev);
  });

  const sevColor={5:"#ff1744",4:"#dc143c",3:"#e8b923",2:"#7a7a82",1:"#7a7a82"};
  const ns="http://www.w3.org/2000/svg";

  /* —— 解缠：欧洲几个国家坐标几乎重合，做一次轻量「排斥」 —— */
  const VBW=1000, VBH=500;
  const pins=Object.values(buckets).map(b=>{
    const topSev=b.items.reduce((m,e)=>Math.max(m,e.severity||2),2);
    const r=4+Math.min(b.items.length,5);
    return { ox:b.x, oy:b.y, x:b.x, y:b.y, r:r+6, items:b.items, topSev, g:null };
  });
  const PAD=14;
  (function untangle(){
    for(let iter=0; iter<200; iter++){
      let moved=false;
      for(let i=0;i<pins.length;i++){
        for(let j=i+1;j<pins.length;j++){
          const a=pins[i], b=pins[j];
          let dx=b.x-a.x, dy=b.y-a.y;
          let d=Math.hypot(dx,dy);
          const minD=a.r+b.r;
          if(d>=minD) continue;
          if(d<0.01){ dx=Math.random()-0.5; dy=Math.random()-0.5; d=Math.hypot(dx,dy)||1; }
          const push=(minD-d)/2 + 0.5;
          const ux=dx/d, uy=dy/d;
          a.x-=ux*push; a.y-=uy*push;
          b.x+=ux*push; b.y+=uy*push;
          moved=true;
        }
      }
      pins.forEach(p=>{ p.x=Math.max(PAD, Math.min(VBW-PAD, p.x)); p.y=Math.max(PAD, Math.min(VBH-PAD, p.y)); });
      if(!moved) break;
    }
  })();

  /* —— 渲染标点（保存 g 引用，供时间轴筛选时显示/隐藏） —— */
  pins.forEach(b=>{
    const topSev=b.topSev;
    const color=sevColor[topSev]||sevColor[3];
    const r=4+Math.min(b.items.length,5);
    const g=document.createElementNS(ns,"g");
    g.setAttribute("class","worldmap-pinned");
    g.setAttribute("transform",`translate(${b.x},${b.y})`);

    const shifted=Math.hypot(b.x-b.ox, b.y-b.oy) > r+2;
    if(shifted){
      const line=document.createElementNS(ns,"line");
      line.setAttribute("class","worldmap-lead");
      line.setAttribute("x1",b.ox-b.x); line.setAttribute("y1",b.oy-b.y);
      line.setAttribute("x2",0); line.setAttribute("y2",0);
      const seed=document.createElementNS(ns,"circle");
      seed.setAttribute("class","worldmap-seed");
      seed.setAttribute("cx",b.ox-b.x); seed.setAttribute("cy",b.oy-b.y);
      seed.setAttribute("r",1.6);
      g.insertBefore(line, g.firstChild);
      g.insertBefore(seed, g.firstChild);
    }
    const halo=document.createElementNS(ns,"circle");
    halo.setAttribute("class","halo");halo.setAttribute("r",r);
    halo.setAttribute("fill",color);
    g.appendChild(halo);
    const dot=document.createElementNS(ns,"circle");
    dot.setAttribute("class","dot");dot.setAttribute("r",r);
    dot.setAttribute("fill",color);
    g.appendChild(dot);
    if(b.items.length>1){
      const t=document.createElementNS(ns,"text");
      t.setAttribute("text-anchor","middle");t.setAttribute("y",r+12);
      t.setAttribute("fill","#7a7a82");t.setAttribute("font-size","9");
      t.setAttribute("font-family","'Courier New',monospace");
      t.textContent=b.items.length;
      g.appendChild(t);
    }
    g.addEventListener("mouseenter",(e)=>{
      const ev=b.items[0];
      tip.hidden=false;
      tip.innerHTML=`<b>${tt(ev,"title")}</b>`+
        (b.items.length>1?`<small>＋${b.items.length-1} ${t("map.sameLoc","起同地事件")}</small><br>`:"")+
        `<small>${tt(ev,"date")||""} · ${tt(ev,"location")||""}</small><br>`+
        `${tt(ev,"summary").slice(0,60)}…`;
      moveTip(e);
    });
    g.addEventListener("mousemove",moveTip);
    g.addEventListener("mouseleave",()=>tip.hidden=true);
    g.addEventListener("click",()=>{
      const ev=b.items[0];
      let list=currentList.length?currentList:events;
      let idx=list.findIndex(e=>e.id===ev.id);
      if(idx<0){ list=events; idx=list.findIndex(e=>e.id===ev.id); }
      if(idx>=0) openModalByIdx(idx);
    });
    pinsLayer.appendChild(g);
    b.g=g;
  });

  /* —— #8-1 生涯轨迹：C罗效力过的球队按时间连线 —— */
  // 球队 → 坐标 + 效力年份区间（公开资料）
  const career=[
    {name:"里斯本竞技",nameEn:"Sporting CP",x:455,y:208,from:2002,to:2003},
    {name:"曼联(一)",nameEn:"Man United (1st)",x:462,y:148,from:2003,to:2009},
    {name:"皇马",nameEn:"Real Madrid",x:485,y:205,from:2009,to:2018},
    {name:"尤文图斯",nameEn:"Juventus",x:518,y:188,from:2018,to:2021},
    {name:"曼联(二)",nameEn:"Man United (2nd)",x:462,y:148,from:2021,to:2022},
    {name:"利雅得胜利",nameEn:"Al Nassr",x:625,y:225,from:2023,to:2026},
  ];
  function renderTrail(){
    trailLayer.innerHTML="";
    // 连线 path
    const d=career.map((c,i)=>(i===0?"M":"L")+c.x+" "+c.y).join(" ");
    const path=document.createElementNS(ns,"path");
    path.setAttribute("class","wm-trail-path");
    path.setAttribute("d",d);
    trailLayer.appendChild(path);
    // 每站标记 + 标签
    career.forEach(c=>{
      const mk=document.createElementNS(ns,"circle");
      mk.setAttribute("class","wm-club");
      mk.setAttribute("cx",c.x);mk.setAttribute("cy",c.y);mk.setAttribute("r",4);
      mk.setAttribute("data-from",c.from);mk.setAttribute("data-to",c.to);
      trailLayer.appendChild(mk);
      const lb=document.createElementNS(ns,"text");
      lb.setAttribute("class","wm-club-label");
      lb.setAttribute("x",c.x);lb.setAttribute("y",c.y-9);
      lb.textContent=tt(c,"name");
      trailLayer.appendChild(lb);
    });
  }
  renderTrail();
  document.addEventListener("ca7:lang-change",renderTrail);

  /* —— #8-2 热度图：每个 bucket 一个柔光大圆，半径随事件数/严重度 —— */
  function renderHeat(){
    heatLayer.innerHTML="";
    Object.values(buckets).forEach(b=>{
      const sevSum=b.items.reduce((s,e)=>s+(e.severity||2),0);
      const r=14+Math.min(sevSum,40);   // 热度半径
      const c=document.createElementNS(ns,"circle");
      c.setAttribute("cx",b.x);c.setAttribute("cy",b.y);c.setAttribute("r",r);
      c.setAttribute("class","wm-heat-blob");
      heatLayer.appendChild(c);
    });
  }
  renderHeat();

  /* —— #8-3 时间轴：双 range（起止年份）筛选标点 + 轨迹 + 热度 —— */
  const yrStart=document.getElementById("wmYearStart");
  const yrEnd=document.getElementById("wmYearEnd");
  const playBtn=document.getElementById("wmPlay");
  const ticks=document.getElementById("wmTicks");
  // 年份刻度
  for(let y=2003;y<=2026;y++){ const s=document.createElement("span"); ticks.appendChild(s); }

  let yearA=2003, yearB=2026;

  function applyFilter(){
    // 保证 A<=B
    let a=parseInt(yrStart.value), b=parseInt(yrEnd.value);
    if(a>b){ [a,b]=[b,a]; }
    yearA=a; yearB=b;
    // 标点：该 bucket 里有任意事件落在 [a,b] 区间则显示
    let shownCount=0;
    pins.forEach(p=>{
      const hit=p.items.some(ev=>{
        const y=yearOf(ev); return y!==null && y>=a && y<=b;
      });
      p.g.style.opacity = hit ? "" : "0.12";
      p.g.style.pointerEvents = hit ? "" : "none";
      if(hit) shownCount++;
    });
    // 轨迹：年份区间与效力期有交集的站点高亮，其余淡化
    trailLayer.querySelectorAll(".wm-club").forEach(mk=>{
      const f=+mk.dataset.from, t=+mk.dataset.to;
      const hit = (t>=a && f<=b);
      mk.style.opacity = hit ? "1" : "0.2";
    });
    const path=trailLayer.querySelector(".wm-trail-path");
    if(path) path.style.opacity = (b-a>=2) ? "1" : "0.3";
    // 热度：整体随区间收紧而加强（视觉聚焦）
    heatLayer.querySelectorAll(".wm-heat-blob").forEach(c=>{ c.style.opacity = (b-a<=6)?"0.25":"0.12"; });
    // 读数
    readout.textContent=`${t("map.readout")} ${a} – ${b} · ${shownCount} ${t("map.incidents","起")}`;
  }
  yrStart.addEventListener("input",applyFilter);
  yrEnd.addEventListener("input",applyFilter);
  applyFilter();

  /* —— 播放：从 2003 自动扫到 2026 —— */
  let playing=false, playRaf=null;
  function play(){
    if(playing){ stop(); return; }
    playing=true;
    playBtn.textContent="⏸";
    playBtn.classList.add("playing");
    let a=parseInt(yrStart.value), b=parseInt(yrEnd.value);
    // 若已到顶，从头开始
    if(b>=2026 && a>=2025){ a=2003; b=2003; }
    const step=()=>{
      if(b<2026){ b++; if(b>a+8) a=b-8; }   // 滚动一个 8 年窗口
      else { a++; if(a>=b){ stop(); return; } }
      yrStart.value=a; yrEnd.value=b;
      applyFilter();
      if(playing) playRaf=setTimeout(step,700);
    };
    step();
  }
  function stop(){
    playing=false;
    playBtn.textContent="▶";
    playBtn.classList.remove("playing");
    if(playRaf) clearTimeout(playRaf);
  }
  playBtn.addEventListener("click",play);

  /* —— 图层开关 —— */
  document.getElementById("wmTrail").addEventListener("change",e=>{
    trailLayer.style.display = e.target.checked ? "" : "none";
  });
  document.getElementById("wmHeat").addEventListener("change",e=>{
    heatLayer.hidden = !e.target.checked;
  });

  function moveTip(e){
    const rect=wrap.getBoundingClientRect();
    tip.style.left=(e.clientX-rect.left)+"px";
    tip.style.top=(e.clientY-rect.top)+"px";
  }
})();

/* ========== #9 罗黑赌场 ========== */
(function casinoModule(){
  const board=document.getElementById("casinoBoard");
  const balEl=document.getElementById("casinoBalance");
  const recEl=document.getElementById("casinoRecord");
  const histEl=document.getElementById("casinoHistory");
  const resetBtn=document.getElementById("casinoReset");
  if(!board||typeof casinoBets==="undefined") return;

  let balance=1000, wins=0, losses=0;
  // 持久化
  try{
    const saved=JSON.parse(localStorage.getItem("ca7_casino")||"null");
    if(saved){ balance=saved.balance; wins=saved.wins||0; losses=saved.losses||0; }
  }catch(e){}
  function save(){ try{localStorage.setItem("ca7_casino",JSON.stringify({balance,wins,losses}));}catch(e){} }

  const states=new Array(casinoBets.length).fill(null); // 每题的已下注/已开奖状态

  function render(){
    balEl.textContent=balance;
    recEl.innerHTML=`<span style="color:#3ddc84">${wins}${t("casino.win","胜")}</span> <span style="color:#ff1744">${losses}${t("casino.lose","负")}</span>`;
    resetBtn.hidden = balance<=0 ? false : true;
    board.innerHTML=casinoBets.map((b,i)=>{
      const st=states[i];
      let resultHtml="";
      if(st&&st.resolved){
        const cls = st.won?"win":"lose";
        const delta = st.won ? `+${st.payout}` : `-${st.stake}`;
        const yourPickText = st.pick==="a"?tt(b,"a"):tt(b,"b");
        const outcomeText = st.outcome==="a"?tt(b,"a"):tt(b,"b");
        const verdictText = st.won ? "✓ "+t("casino.correct","猜中") : "✗ "+t("casino.wrong","猜错");
        resultHtml=`<div class="casino-result ${cls}">${t("casino.youBet","你押")}：<b>${yourPickText}</b> · ${t("casino.draw","开奖")}：<b>${outcomeText}</b>（${verdictText}）· ${delta} Factos<small>${tt(b,"reveal")}</small></div>`;
      }
      return `<div class="casino-card ${st&&st.resolved?'resolved':''}">
        <div class="casino-q">${tt(b,"q")}</div>
        ${st&&st.resolved ? '' : `
        <div class="casino-odds-row">
          <button class="casino-pick ${st&&st.pick==='a'?'selected':''}" data-i="${i}" data-pick="a">${tt(b,"a")}<small>${t("casino.odds","赔率")} ${b.odds}×</small></button>
          <button class="casino-pick ${st&&st.pick==='b'?'selected':''}" data-i="${i}" data-pick="b">${tt(b,"b")}<small>${t("casino.odds","赔率")} ${(1/(1-1/b.odds)).toFixed(2)}×</small></button>
        </div>
        <div class="casino-bet-row">
          <div class="casino-stake">
            ${t("casino.stake","下注")}:<input type="number" min="10" max="${balance}" value="${st?st.stake:50}" data-i="${i}">
            <span class="chip" data-i="${i}" data-amt="50">50</span>
            <span class="chip" data-i="${i}" data-amt="100">100</span>
            <span class="chip" data-i="${i}" data-amt="500">500</span>
            <span class="chip" data-i="${i}" data-amt="all">${t("casino.allin","梭哈")}</span>
          </div>
          <button class="casino-place ${st&&st.pick?'':'disabled'}" data-i="${i}" ${st&&st.pick?'':'disabled'}>${t("casino.place","下注")}</button>
        </div>`}
        ${resultHtml}
      </div>`;
    }).join("");
  }

  function setPick(i,pick){
    if(states[i]&&states[i].resolved) return;
    states[i]=Object.assign(states[i]||{stake:50}, {pick});
  }
  function setStake(i,amt){
    if(states[i]&&states[i].resolved) return;
    if(!states[i]) states[i]={stake:50};
    states[i].stake = amt==="all" ? balance : Math.max(10,Math.min(balance,parseInt(amt)||10));
  }

  function placeBet(i){
    const bet=casinoBets[i];
    const st=states[i];
    if(!st||!st.pick){ flashHint(t("casino.flashPick")); return; }
    if(st.resolved) return;
    const stake=Math.max(10,Math.min(balance, st.stake||50));
    if(stake>balance){ flashHint(t("casino.flashBalance")); return; }
    balance-=stake;
    // 开奖：按 hist 概率决定 a 是否「发生」
    const aHappened = Math.random() < bet.hist;
    const userPickIsA = (st.pick==="a");
    const won = (aHappened===userPickIsA);
    const odds = userPickIsA ? bet.odds : (1/(1-1/bet.odds));
    const payout = won ? Math.round(stake*odds) : 0;
    if(won){ balance+=payout; wins++; } else { losses++; }
    states[i]={resolved:true, won, stake, payout, outcome: aHappened?"a":"b", pick:st.pick};
    addHistory(i, st.pick, won, payout, stake);
    save();
    render();
  }

  function flashHint(msg){
    const tip=document.createElement("div");
    tip.textContent=msg;
    tip.style.cssText="position:fixed;left:50%;top:20%;transform:translateX(-50%);background:#ff1744;color:#fff;padding:10px 20px;border-radius:4px;font-family:var(--mono);font-size:13px;z-index:9999;animation:casinoFlash 1.6s forwards";
    document.body.appendChild(tip);
    setTimeout(()=>tip.remove(),1600);
  }
  // 注入一次性 flash 动画样式
  if(!document.getElementById("casinoFlashStyle")){
    const s=document.createElement("style");
    s.id="casinoFlashStyle";
    s.textContent="@keyframes casinoFlash{0%{opacity:0;transform:translate(-50%,-10px)}15%{opacity:1}85%{opacity:1}100%{opacity:0;transform:translate(-50%,-20px)}}";
    document.head.appendChild(s);
  }

  function addHistory(betIndex,pick,won,payout,stake){
    const empty=histEl.querySelector(".casino-history-empty");
    if(empty) empty.remove();
    const bet=casinoBets[betIndex];
    const q=tt(bet,"q");
    const pickText = pick==="a"?tt(bet,"a"):tt(bet,"b");
    const row=document.createElement("div");
    row.className="casino-history-row";
    const qshort=q.slice(0,16)+(q.length>16?"…":"");
    const res = won?`<span class="win">+${payout}</span>`:`<span class="lose">-${stake}</span>`;
    row.innerHTML=`<span>${qshort} ${t("casino.youBet","你押")}「${pickText}」</span>${res}`;
    histEl.appendChild(row);
    histEl.scrollTop=histEl.scrollHeight;
  }

  // 事件委托
  board.addEventListener("click",e=>{
    const tgt=e.target.closest("[data-i]");
    if(!tgt) return;
    const i=+tgt.dataset.i;
    if(tgt.classList.contains("casino-pick")){ setPick(i,tgt.dataset.pick); render(); }
    else if(tgt.classList.contains("chip")){ setStake(i,tgt.dataset.amt); render(); }
    else if(tgt.classList.contains("casino-place")){ placeBet(i); }
  });
  board.addEventListener("input",e=>{
    if(e.target.matches("input[type=number]")){ setStake(+e.target.dataset.i, e.target.value); }
  });
  resetBtn.addEventListener("click",()=>{
    balance=1000; wins=0; losses=0; states.fill(null);
    histEl.innerHTML=`<div class="casino-history-title">${t("casino.history")}</div><div class="casino-history-empty">${t("casino.historyEmpty")}</div>`;
    save(); render();
  });

  render();
  // 语言切换：重渲染盘口（保留 states/balance/wins/losses 不变）
  document.addEventListener("ca7:lang-change", render);
})();

/* ========== 人设崩塌编年史 ========== */
(function personaModule(){
  const wrap=document.getElementById("personaScroll");
  if(!wrap) return;

  const persona=events
    .filter(e=>e.cat==="persona")
    .sort((a,b)=>extractYear(a)-extractYear(b));

  function extractYear(ev){
    const m=String(ev.date||"").match(/(\d{4})/);
    return m?parseInt(m[1],10):9999;
  }

  function initPersona(){
    wrap.innerHTML=persona.map(ev=>{
      const yr=String(ev.date||"").match(/(\d{4})/);
      const year=yr?yr[1]:"—";
      const catLabel = catConfig[ev.cat] ? tt(catConfig[ev.cat],"label") : (ev.catLabel||"");
      return `<div class="persona-item" data-id="${ev.id}">
        <div class="persona-year">${year} · №${String(ev.id).padStart(3,"0")}</div>
        <div class="persona-card">
          <h4>${tt(ev,"title")}</h4>
          <p>${tt(ev,"summary")}</p>
          <span class="persona-tag">${catLabel}</span>
        </div>
      </div>`;
    }).join("");
    // 重新挂点击 + 观察
    wrap.querySelectorAll(".persona-card").forEach(card=>{
      card.addEventListener("click",()=>{
        const id=parseInt(card.parentElement.dataset.id,10);
        let list=currentList.length?currentList:events;
        let idx=list.findIndex(e=>e.id===id);
        if(idx<0){ list=events; idx=list.findIndex(e=>e.id===id); }
        if(idx>=0) openModalByIdx(idx);
      });
    });
    wrap.querySelectorAll(".persona-item").forEach(item=>revealObserver.observe(item));
    // 入场动画：滚入视口时加 .in（重渲染后重挂）
    const obs=new IntersectionObserver((ents)=>{
      ents.forEach(en=>{
        if(en.isIntersecting){ en.target.classList.add("in"); obs.unobserve(en.target); }
      });
    },{threshold:.15});
    wrap.querySelectorAll(".persona-item").forEach(el=>obs.observe(el));
  }
  initPersona();
  document.addEventListener("ca7:lang-change", initPersona);

})();

/* ========== #10 罗黑弹幕墙 + 段子工厂 ========== */
(function roastWallModule(){
  const stage=document.getElementById("danmuStage");
  const input=document.getElementById("danmuInput");
  const colorSel=document.getElementById("danmuColor");
  const sendBtn=document.getElementById("danmuSend");
  const emptyHint=document.getElementById("danmuEmpty");
  const clearBtn=document.getElementById("danmuClear");
  const exportBtn=document.getElementById("danmuExport");
  if(!stage) return;

  // —— 内置预设弹幕（让墙一开始就有内容，氛围感）——
  // 预设弹幕从字典读取（双语）
  function getPresetDanmu(){
    const arr = t("wall.presetDanmu", null);
    return Array.isArray(arr) && arr.length ? arr : [
      "六届世界杯，零座奖杯","Factos! Factos! Factos!","SIUUUUU（空荡的球场里）",
      "点球进了！含金量？","我就是历史第一第二第三","问心无愧.jpg",
      "沙特4年1冠，沙漠骆驼","背弃祖姓，蹭大罗热度","摔手机、摔袖标、摔麦克风",
      "The King leaves without his crown","再见阿伟罗","球玊=球王+一点（球）"
    ];
  }
  const PRESET_COLORS=["#fff","#dc143c","#e8b923","#3ddc84"];

  // localStorage：我的弹幕 + 我的段子投稿 + 段子点赞
  let myDanmu=[];       // [{text,color,t}]
  try{ myDanmu=JSON.parse(localStorage.getItem("ca7_danmu")||"[]"); }catch(e){ myDanmu=[]; }
  function saveDanmu(){ try{localStorage.setItem("ca7_danmu",JSON.stringify(myDanmu));}catch(e){} }

  // 弹幕飞行：随机轨道（行高）、速度、颜色
  const TRACKS=6;
  const trackUsed=new Array(TRACKS).fill(0);  // 记录每轨道下一次可用时间
  function launchDanmu(text,color){
    if(emptyHint) emptyHint.style.display="none";
    const el=document.createElement("div");
    el.className="danmu-item";
    el.textContent=text;
    el.style.color=color||"#fff";
    // 选一条可用轨道（当前时间>=轨道释放时间）
    const now=Date.now();
    let track=0,best=Infinity;
    for(let i=0;i<TRACKS;i++){ if(trackUsed[i]<=now && trackUsed[i]<best){ best=trackUsed[i]; track=i; } }
    const topPct = 6 + track*(86/TRACKS);   // 6%~92% 分布
    el.style.top=topPct+"%";
    stage.appendChild(el);
    // 速度按文字长度：长一点稍慢
    const dur = 7 + Math.min(text.length*0.12, 5);   // 7~12s
    el.style.animationDuration=dur+"s";
    // 该轨道释放时间 = 当前 + 文字完全进入屏幕的时间（约 dur 的前 15%）
    trackUsed[track] = now + dur*150;
    el.addEventListener("animationend",()=>el.remove());
  }

  // 启动：先播预设弹幕（错峰），再播用户存的
  function seedPreset(){
    const presets=getPresetDanmu();
    presets.forEach((txt,i)=>{
      setTimeout(()=>launchDanmu(txt,PRESET_COLORS[i%PRESET_COLORS.length]), i*700+400);
    });
  }
  seedPreset();
  // 循环：每 1.5s 从「预设+用户」池里随机再发一条，保持墙不空
  setInterval(()=>{
    if(document.hidden) return;
    const presets=getPresetDanmu();
    const pool=[...presets.map((txt,i)=>({text:txt,color:PRESET_COLORS[i%PRESET_COLORS.length]})), ...myDanmu];
    const pick=pool[Math.floor(Math.random()*pool.length)];
    launchDanmu(pick.text,pick.color);
  },1500);

  // 发射按钮
  function sendMine(){
    const text=input.value.trim();
    if(!text){ input.focus(); return; }
    const color=colorSel.value;
    launchDanmu(text,color);
    myDanmu.unshift({text,color,t:Date.now()});
    if(myDanmu.length>50) myDanmu=myDanmu.slice(0,50);
    saveDanmu();
    input.value="";
    if(window.__badge) window.__badge("wall");
  }
  sendBtn.addEventListener("click",sendMine);
  input.addEventListener("keydown",e=>{ if(e.key==="Enter") sendMine(); });

  clearBtn.addEventListener("click",()=>{
    myDanmu=[]; saveDanmu();
    clearBtn.textContent="已清空";
    setTimeout(()=>clearBtn.textContent="清空我的弹幕",1500);
  });
  exportBtn.addEventListener("click",()=>{
    const all=myDanmu.map(d=>d.text).join("\n");
    if(!all){ exportBtn.textContent="无内容可导出"; setTimeout(()=>exportBtn.textContent="导出我的创作",1500); return; }
    const blob=new Blob([all],{type:"text/plain;charset=utf-8"});
    const a=document.createElement("a");
    a.href=URL.createObjectURL(blob);
    a.download="我的罗黑弹幕.txt";
    a.click();
    URL.revokeObjectURL(a.href);
  });

  /* —— 段子接龙工厂 —— */
  // 段子 prompt 从字典读取（双语）
  function getPrompts(){
    const arr = t("wall.jokePrompts", null);
    return Array.isArray(arr) && arr.length ? arr : [
      "输球后，C 罗 第一件事是___",
      "C 罗 打开 ins，第一张照片必须是___",
      "梅西夺冠那天，C 罗 在___",
      "C 罗 说「问心无愧」，翻译成人话是___",
      "如果给 C 罗 的点球写个说明书，第一条是___",
      "C 罗 退役那天，他会先___",
      "沙特给了 C 罗 2亿，C 罗 给了沙特___",
      "C 罗 照镜子时，镜子里的人是___"
    ];
  }
  const promptEl=document.getElementById("punchlinePrompt");
  const plInput=document.getElementById("punchlineInput");
  const plSubmit=document.getElementById("punchlineSubmit");
  const plList=document.getElementById("punchlineList");
  const plShuffle=document.getElementById("punchlineShuffle");
  let curPromptIdx=0;
  // 段子库：每条 {fill, likes, mine} —— 按 prompt 分组存
  let jokes={};
  try{ jokes=JSON.parse(localStorage.getItem("ca7_jokes")||"{}"); }catch(e){ jokes={}; }
  let likedSet=new Set();
  try{ likedSet=new Set(JSON.parse(localStorage.getItem("ca7_jokes_liked")||"[]")); }catch(e){}
  function saveJokes(){ try{localStorage.setItem("ca7_jokes",JSON.stringify(jokes));}catch(e){} }
  function saveLiked(){ try{localStorage.setItem("ca7_jokes_liked",JSON.stringify([...likedSet]));}catch(e){} }

  function showPrompt(){
    const PROMPTS=getPrompts();
    curPromptIdx=Math.floor(Math.random()*PROMPTS.length);
    const p=PROMPTS[curPromptIdx];
    // 把 ___ 替换成可视的空位
    promptEl.innerHTML=p.replace("___",'<span class="blank">______</span>');
    renderJokes();
  }
  function renderJokes(){
    const PROMPTS=getPrompts();
    const key=curPromptIdx;
    const arr=(jokes[key]||[]).slice().sort((a,b)=>b.likes-a.likes).slice(0,12);
    if(arr.length===0){
      plList.innerHTML=`<div class="punchline-empty">${t("wall.jokeEmpty")}</div>`;
      return;
    }
    plList.innerHTML=arr.map((j,i)=>{
      const id=j.t;
      const liked=likedSet.has(id);
      return `<div class="punchline-item">
        <span class="pl-prompt">${(PROMPTS[key]||"").replace("___","")}<span class="pl-fill">${escapeHtml(j.fill)}</span></span>
        <button class="pl-like ${liked?'liked':''}" data-id="${id}">👍 ${j.likes}</button>
      </div>`;
    }).join("");
  }
  // 语言切换：更新当前 prompt 文本 + 列表（保留 jokes/likedSet 数据）
  document.addEventListener("ca7:lang-change",()=>{
    const PROMPTS=getPrompts();
    if(curPromptIdx < PROMPTS.length){
      promptEl.innerHTML=PROMPTS[curPromptIdx].replace("___",'<span class="blank">______</span>');
    }
    renderJokes();
  });
  function escapeHtml(s){return s.replace(/[<>&"]/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]));}
  plShuffle.addEventListener("click",showPrompt);
  plSubmit.addEventListener("click",()=>{
    const fill=plInput.value.trim();
    if(!fill){ plInput.focus(); return; }
    const key=curPromptIdx;
    if(!jokes[key]) jokes[key]=[];
    const entry={fill, likes:0, mine:true, t:Date.now()+Math.random()};
    jokes[key].unshift(entry);
    saveJokes();
    plInput.value="";
    renderJokes();
    if(window.__badge) window.__badge("wall");
  });
  plInput.addEventListener("keydown",e=>{ if(e.key==="Enter") plSubmit.click(); });
  plList.addEventListener("click",e=>{
    const b=e.target.closest(".pl-like");
    if(!b) return;
    const id=parseFloat(b.dataset.id);
    const arr=jokes[curPromptIdx]||[];
    const j=arr.find(x=>x.t===id);
    if(!j) return;
    if(likedSet.has(id)){ likedSet.delete(id); j.likes=Math.max(0,j.likes-1); }
    else { likedSet.add(id); j.likes++; }
    saveJokes(); saveLiked(); renderJokes();
  });
  showPrompt();
})();

/* ========== 成就 / 徽章系统 ========== */
(function badgesModule(){
  const grid=document.getElementById("badgesGrid");
  const countEl=document.getElementById("badgesCount");
  const fillEl=document.getElementById("badgesFill");
  const toast=document.getElementById("badgeToast");
  if(!grid) return;

  const defs=[
    {id:"firstlook", icon:"👁️", name:"初窥档案", nameEn:"First Glance", desc:"打开第一份卷宗", descEn:"Open your first dossier", test:st=>st.read>=1},
    {id:"voracious", icon:"📚", name:"档案老饕", nameEn:"Archive Glutton", desc:"阅读 10 份卷宗", descEn:"Read 10 dossiers", test:st=>st.read>=10},
    {id:"completist", icon:"🗂️", name:"档案强迫症", nameEn:"Archive OCD", desc:"阅读 25 份卷宗", descEn:"Read 25 dossiers", test:st=>st.read>=25},
    {id:"quizzer",   icon:"🎯", name:"罗黑见习", nameEn:"Hater Apprentice", desc:"完成罗黑测试", descEn:"Finish the Hater Test", test:st=>st.quizDone},
    {id:"scholar",   icon:"🧠", name:"骨灰级罗黑", nameEn:"Hardcore Hater", desc:"测试满分", descEn:"Ace the Hater Test", test:st=>st.quizPct===1},
    {id:"gacha",     icon:"🎰", name:"盲盒开箱", nameEn:"Blind Box", desc:"抽取并下载通缉令", descEn:"Draw & download a wanted poster", test:st=>st.blindbox},
    {id:"explorer",  icon:"🗺️", name:"环球追踪", nameEn:"Global Tracker", desc:"查看争议地图任意标点", descEn:"Click any map pin", test:st=>st.mapClick},
    {id:"narrative", icon:"📖", name:"编年通读", nameEn:"Chronicle Reader", desc:"浏览人设编年史到底", descEn:"Scroll the Persona Chronicle to the end", test:st=>st.personaEnd},
    {id:"roaster",   icon:"🔥", name:"罗黑开火", nameEn:"Roaster", desc:"弹幕墙发弹幕或段子接龙投稿", descEn:"Fire danmu or submit a joke", test:st=>st.wall},
    {id:"ottoman",   icon:"OTTOMAN", name:"首席档案官", nameEn:"Chief Archivist", desc:"集齐以上九枚", descEn:"Unlock all nine above", test:st=>st._unlocked>=9},
  ];

  const state={read:0,quizDone:false,quizPct:0,blindbox:false,mapClick:false,personaEnd:false,wall:false,_unlocked:0};
  const unlocked=new Set();
  // 持久化（unlocked 集合 + read 累计阅读数）
  try{
    const saved=JSON.parse(localStorage.getItem("ca7_badges")||"null");
    if(saved && Array.isArray(saved.unlocked)) saved.unlocked.forEach(id=>unlocked.add(id));
    if(saved && typeof saved.read==="number" && saved.read>0) state.read=saved.read;
  }catch(e){}

  function render(){
    grid.innerHTML=defs.map(d=>{
      const on=unlocked.has(d.id);
      return `<div class="badge ${on?"unlocked":""}" data-id="${d.id}">
        <div class="badge-icon">${d.icon}</div>
        <div class="badge-name">${tt(d,"name")}</div>
        <div class="badge-desc">${tt(d,"desc")}</div>
      </div>`;
    }).join("");
    updateProgress();
  }

  function updateProgress(){
    const n=unlocked.size;
    countEl.textContent=`${n} / ${defs.length}`;
    fillEl.style.width=(n/defs.length*100)+"%";
    state._unlocked=n;
  }

  function showToast(def){
    toast.hidden=false;
    document.getElementById("badgeToastIcon").textContent=def.icon;
    document.getElementById("badgeToastTitle").textContent=t("badges.unlocked","解锁 · ")+tt(def,"name");
    document.getElementById("badgeToastDesc").textContent=tt(def,"desc");
    toast.classList.add("show");
    clearTimeout(showToast._t);
    showToast._t=setTimeout(()=>{
      toast.classList.remove("show");
      setTimeout(()=>toast.hidden=true,500);
    },3200);
  }

  function save(){
    try{ localStorage.setItem("ca7_badges",JSON.stringify({unlocked:[...unlocked],read:state.read})); }catch(e){}
  }

  function check(){
    let changed=false;
    defs.forEach(d=>{
      if(!unlocked.has(d.id) && d.test(state)){
        unlocked.add(d.id);
        changed=true;
        showToast(d);
      }
    });
    // ottoman 依赖当前已解锁数量，先同步 state._unlocked 再判
    state._unlocked=unlocked.size;
    const ott=defs.find(d=>d.id==="ottoman");
    if(ott && !unlocked.has("ottoman") && ott.test(state)){
      unlocked.add("ottoman");showToast(ott);changed=true;
    }
    updateProgress();
    if(changed){
      save();
      render();
    }
  }

  // 暴露触发器
  window.__badge=(type,payload)=>{
    if(type==="read"){ state.read+=payload; }
    else if(type==="quiz"){
      state.quizDone=true;
      state.quizPct=payload.pct;
    }
    else if(type==="blindbox"){ state.blindbox=true; }
    else if(type==="map"){ state.mapClick=true; }
    else if(type==="persona"){ state.personaEnd=true; }
    else if(type==="wall"){ state.wall=true; }
    check();
    // read 每次自增都落盘（未触发新解锁时 check() 不会写 localStorage）
    if(type==="read") save();
  };

  // 监听地图点击（地图模块完成后挂载）
  document.addEventListener("click",e=>{
    if(e.target.closest(".worldmap-pinned")) window.__badge("map");
    // 卡片是裸 <a>（不经过 goToIncident），导航前累计阅读数
    if(e.target.closest("a.event-card")) window.__badge("read",1);
  });

  // 人设编年史滚到底触发
  const ps=document.getElementById("personaScroll");
  if(ps){
    const obs=new IntersectionObserver((ents)=>{
      ents.forEach(en=>{
        if(en.isIntersecting && en.target===ps.lastElementChild){
          window.__badge("persona");
        }
      });
    },{threshold:.4});
    if(ps.lastElementChild) obs.observe(ps.lastElementChild);
  }

  // 滚动到页底也作为 personaEnd 兜底
  let scrollBottomFired=false;
  window.addEventListener("scroll",()=>{
    if(!scrollBottomFired && window.innerHeight+window.scrollY>=document.body.offsetHeight-200){
      scrollBottomFired=true;
      window.__badge("persona");
    }
  },{passive:true});

  render();
  // 初始化时如果已有解锁，重建 state 让链式成就正常
  check();
  // 语言切换：重渲染徽章（保留 unlocked/state 不变）
  document.addEventListener("ca7:lang-change", render);
})();

/* ========== 悬浮 SIU 音效按钮 ========== */
(function siuFabModule(){
  const fab=document.getElementById("siuFab");
  if(!fab) return;

  /* ============================================================
   * SIU 资源加载器
   * 优先使用用户自备的素材（放入 assets/ 即生效）：
   *   - 音效：assets/siu.mp3  （或 .wav / .ogg / .m4a）
   *   - 庆祝图：assets/images/siu.jpg  （或 .png / .webp）
   * 若文件不存在，自动回退到 WebAudio 合成音 + 原创矢量 SIU 姿势。
   * 注：原版录音/真人照片受版权保护，本站不内置，需用户自行合法取得后放入。
   * ============================================================ */
  // 候选文件名（按优先级，命中即停，减少 404 噪音）
  const audioCandidates=["assets/siu.mp3","assets/siu.ogg","assets/siu.wav","assets/siu.m4a","assets/audio/siu.mp3"];
  const imgCandidates=["assets/images/siu.jpg","assets/images/siu.png","assets/images/siu.webp","assets/images/siu-celebration.jpg"];
  let audioUrl=null, imgUrl=null;

  // 顺序探测：找到第一个存在的就停（避免并发刷 404）
  function probeSequential(paths){
    return paths.reduce((p,path)=>p.then(found=>found||new Promise(res=>{
      const x=new XMLHttpRequest();
      x.open("HEAD",path,true);
      x.onload=()=>res(x.status>=200&&x.status<300?path:null);
      x.onerror=()=>res(null);
      x.send();
    })),Promise.resolve(null));
  }

  probeSequential(audioCandidates).then(u=>{ if(u) audioUrl=u; });
  // 图片仅在「视频不可用」时才探测——否则直接被视频优先级覆盖，
  // 探了也是白探（4 张全缺时会刷出 4 条 404 控制台噪音）。
  probeSequential(["assets/videos/siu.mp4"]).then(v=>{
    if(v) return;   // 有视频，跳过图片探测
    return probeSequential(imgCandidates);
  }).then(u=>{ if(u){ imgUrl=u; window.__siuImg=u; } });

  // 懒加载的 <audio> 元素
  let audioEl=null;
  function getAudio(){
    if(!audioUrl) return null;
    if(!audioEl){
      audioEl=new Audio(audioUrl);
      audioEl.preload="auto";
    }
    return audioEl;
  }

  /* —— WebAudio 合成 SIU（兜底，更贴近真 SIU 的"Si—UUUU"）—— */
  let ctx=null;
  function ac(){
    if(!ctx){
      try{ ctx=new (window.AudioContext||window.webkitAudioContext)(); }catch(e){}
    }
    return ctx;
  }
  function synthSIU(){
    const a=ac();
    if(!a) return;
    if(a.state==="suspended") a.resume();
    const now=a.currentTime;
    // 双振荡器叠出更厚的人声感
    function voice(type,f0,f1,lfoRate,vol){
      const osc=a.createOscillator(),g=a.createGain();
      osc.type=type;
      osc.frequency.setValueAtTime(f0,now);
      osc.frequency.exponentialRampToValueAtTime(f1,now+0.18); // "Si" 上升
      osc.frequency.setValueAtTime(f1,now+0.18);
      // "UUUU" 颤音
      const lfo=a.createOscillator(),lg=a.createGain();
      lfo.frequency.value=lfoRate;lg.gain.value=f1*0.09;
      lfo.connect(lg).connect(osc.frequency);
      lfo.start(now+0.18);lfo.stop(now+1.3);
      // 共鸣峰（让"U"更像元音）
      const formant=a.createBiquadFilter();
      formant.type="bandpass";formant.frequency.value=700;formant.Q.value=2;
      g.gain.setValueAtTime(0.0001,now);
      g.gain.exponentialRampToValueAtTime(vol,now+0.06);
      g.gain.setValueAtTime(vol,now+1.0);
      g.gain.exponentialRampToValueAtTime(0.0001,now+1.4);
      osc.connect(formant).connect(g).connect(a.destination);
      osc.start(now);osc.stop(now+1.45);
    }
    voice("sawtooth",240,540,16,0.18);   // 主声
    voice("square",260,560,18,0.07);     // 叠加厚度
    // 高频气声点缀
    const buf=a.createBuffer(1,a.sampleRate*0.35,a.sampleRate);
    const d=buf.getChannelData(0);
    for(let i=0;i<d.length;i++) d[i]=(Math.random()*2-1)*Math.pow(1-i/d.length,2);
    const noise=a.createBufferSource();noise.buffer=buf;
    const ng=a.createGain();ng.gain.value=0.06;
    const hp=a.createBiquadFilter();hp.type="highpass";hp.frequency.value=4000;
    noise.connect(hp).connect(ng).connect(a.destination);
    noise.start(now+0.12);
  }

  function playSound(){
    const el=getAudio();
    if(el){
      try{ el.currentTime=0; el.play(); }catch(e){ synthSIU(); }
    } else {
      synthSIU();
    }
  }
  // 暴露全局：让封印等其他触发点也能播同一个音效
  window.__siuSound=playSound;

  /* —— 庆祝画面：视频优先（assets/videos/siu.mp4），其次图片，最后矢量 —— */
  function fire(){
    fab.classList.remove("playing");
    void fab.offsetWidth;
    fab.classList.add("playing");
    // 通过统一入口触发全屏庆祝（音效+画面统一在此处理，所有触发点走这里）
    if(typeof window.__siuCelebration==="function"){
      window.__siuCelebration();
    } else {
      playSound(); // 兜底：若庆祝函数未就绪，至少出声
    }
  }

  fab.addEventListener("click",fire);
})();

/* ========== 初始渲染 ========== */
renderCards();

/* ========== 语言切换按钮：事件绑定 + 首次初始化 ==========
   必须在所有模块 IIFE 之后执行：此时各模块的 'ca7:lang-change'
   监听器尚未注册（它们在各自 IIFE 内 addEventListener），但
   setLanguage 内部 dispatchEvent 是同步的，监听器在事件触发时
   才查找，所以顺序上只要按钮绑定先于用户点击即可。
   首次 setLanguage(currentLang) 会把 HTML 初始中文替换为默认 en。 */
(function langSwitcherInit(){
  const btn = document.getElementById("langToggleBtn");
  if(btn){
    // 主按钮：切换下拉菜单开合
    btn.addEventListener("click", (e)=>{
      // 点击的是下拉项 → 直接切换语言（由下方委托处理），此处不重复
      if(e.target.closest(".lang-option")) return;
      toggleLangMenu();
      btn.setAttribute("aria-expanded", btn.classList.contains("open"));
    });
    // 下拉项委托：选择语言
    btn.addEventListener("click", (e)=>{
      const opt = e.target.closest(".lang-option");
      if(!opt) return;
      const lang = opt.getAttribute("data-lang");
      if(lang) setLanguage(lang);
    });
    // 点击页面其它位置关闭下拉
    document.addEventListener("click", (e)=>{
      if(!btn.contains(e.target)) closeLangMenu();
    });
    // 键盘 Esc 关闭
    document.addEventListener("keydown", (e)=>{
      if(e.key === "Escape") closeLangMenu();
    });
  }
  // 首次应用语言（默认 en 会覆盖 HTML 中的中文初始文本）
  setLanguage(currentLang);
})();

})();
