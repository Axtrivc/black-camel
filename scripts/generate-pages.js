/**
 * generate-pages.js — 为每个「黑料事件」预生成独立 SEO 子页面
 *
 * 产物：
 *   1) incident/<slug>/index.html        × N  （每事件一个独立可被爬虫直读的 HTML）
 *   2) incident/index.json                    （id → slug/title 映射，供首页/调试）
 *   3) assets/js/incident-slugs.js            （id → slug 查询表，供 app.js 跳转）
 *   4) sitemap.xml                             （首页 + N 事件页）
 *
 * 运行：  node scripts/generate-pages.js     或   npm run build:seo
 *
 * 设计要点：
 *  - 纯 Node 内置模块（fs/path/vm/url），无运行时依赖。
 *  - 用 vm 沙箱执行 data.js 取出 events / catConfig，不污染、不 require。
 *  - slug 优先取事件自带 slug 字段（未来扩展），否则由 titleEn 生成，并去重。
 *  - 子页面复用站点 style.css 的 .modal-* / .event-card 等已有类，零样式成本。
 *  - 默认 EN 内容写进静态 HTML（爬虫无需 JS 即可读到独立 title / description / OG），
 *    再由 incident-page.js 提供运行时中英切换。
 */
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { URL } = require("url");

// -------------------- 配置 --------------------
const ROOT = path.resolve(__dirname, "..");
const SITE_ORIGIN = "https://ca7.axtrivc.com";
const DATA_JS = path.join(ROOT, "assets/js/data.js");
const OUT_DIR = path.join(ROOT, "incident");
const SLUGS_JS = path.join(ROOT, "assets/js/incident-slugs.js");
const SITEMAP = path.join(ROOT, "sitemap.xml");
const INDEX_JSON = path.join(OUT_DIR, "index.json");

// -------------------- 数据加载（vm 沙箱） --------------------
// data.js 用顶层 `const events = [...]` 声明，vm 直接执行时这些 const 是词法绑定，
// 不会挂到 sandbox 对象上。因此把源码包进一个 IIFE，并在末尾追加赋值语句，
// 把需要的变量显式写入 sandbox，再从 sandbox 读出。
function loadData() {
  const src = fs.readFileSync(DATA_JS, "utf8");
  const wrapped =
    "(function(){\n" +
    src +
    "\n;this.__exports = { events, catConfig, i18nDict };\n}).call(globalThis);";
  const sandbox = { window: {}, self: {}, localStorage: { getItem: () => null } };
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(wrapped, sandbox, { filename: "data.js" });
  const exp = sandbox.__exports || {};
  if (!Array.isArray(exp.events) || exp.events.length === 0) {
    throw new Error("未能从 data.js 读出 events 数组");
  }
  if (!exp.catConfig) exp.catConfig = {};
  return { events: exp.events, catConfig: exp.catConfig };
}

// -------------------- 工具函数 --------------------
/** 由 titleEn 生成 URL-safe slug */
function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")      // 去标点/非英文数字
    .trim()
    .replace(/[\s_]+/g, "-")       // 空格/下划线 → 连字符
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/** HTML 属性 / 文本转义（防注入；正文中的 <strong> 等需另行处理） */
function escAttr(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
function escText(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** meta description：去掉 HTML 标签 + 截断到 ~160 字符 */
function metaDescription(summaryEn) {
  const plain = String(summaryEn || "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (plain.length <= 160) return plain;
  return plain.slice(0, 157).replace(/\s+\S*$/, "") + "…";
}

/** <picture> WebP+JPG 双源（与 app.js 的 pic() 等价） */
function picMarkup(imgPath, alt, absDepth) {
  // absDepth: 从子页面回到根的相对前缀，如 "../../"
  if (!imgPath) return "";
  const rel = imgPath; // 已是 assets/images/... 形式
  const webp = rel.replace(/\.(jpe?g|png)$/i, ".webp");
  return `<picture><source type="image/webp" srcset="${escAttr(absDepth + webp)}"><img src="${escAttr(absDepth + rel)}" alt="${escAttr(alt)}" decoding="async"></picture>`;
}

/** 严重度圆点（与 renderModal 一致） */
function severityDots(severity) {
  let out = "";
  for (let i = 0; i < 5; i++) {
    out += `<span class="dot ${i < severity ? "on" : ""}"></span>`;
  }
  return out;
}

/** detail 段落渲染：块级标签直接用，否则包 <p>（与 renderModal 一致） */
function renderDetail(detailArr) {
  if (!Array.isArray(detailArr) || detailArr.length === 0) return "";
  const blockTag = /^\s*<(p|figure|div|blockquote|h[1-6]|ul|ol|table)\b/i;
  return detailArr.map((p) => (blockTag.test(p) ? p : `<p>${p}</p>`)).join("");
}

/** 清洗一段 HTML 文本里可被 innerHTML 的部分（轻量；正文 detail 由维护者把关，这里仅做最小化处理） */
function safeInline(html) {
  // 仅移除 <script>/<style> 等危险标签，其余保留（detail 文案由开发者维护，含 <strong>/<em>）
  return String(html || "").replace(/<\s*(script|style|iframe|object|embed)\b[^>]*>[\s\S]*?<\s*\/\1\s*>/gi, "");
}

/** 确保目录存在 */
function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

/** 写文件（文本） */
function writeFile(file, content) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, content, "utf8");
}

// -------------------- 子页面 HTML 生成 --------------------
function buildIncidentHtml(ev, prev, next, catConfig) {
  const slug = ev._slug;
  const absDepth = "../../"; // incident/<slug>/index.html → 根
  const thisUrl = `${SITE_ORIGIN}/incident/${slug}/`;

  const titleEn = ev.titleEn || ev.title || `Incident #${ev.id}`;
  const titleZh = ev.title || ev.titleEn || `事件 #${ev.id}`;
  const summaryEn = ev.summaryEn || ev.summary || "";
  const summaryZh = ev.summary || ev.summaryEn || "";
  const desc = metaDescription(summaryEn);

  // og:image 用绝对 URL
  const ogImage = ev.img ? `${SITE_ORIGIN}/${ev.img}` : `${SITE_ORIGIN}/favicon.jpg`;

  const catConf = catConfig[ev.cat] || {};
  const catColor = catConf.color || "#4a235a";
  const catLabelEn = catConf.labelEn || ev.catLabel || ev.cat || "";
  const catLabelZh = catConf.label || ev.catLabel || ev.cat || "";

  // 日期：用于 <time> 与 JSON-LD
  const dateTextEn = ev.dateEn || ev.date || "";
  const dateTextZh = ev.date || ev.dateEn || "";
  const locEn = ev.locationEn || ev.location || "";
  const locZh = ev.location || ev.locationEn || "";

  // 正文（EN 写进静态 HTML 利于 SEO；ZH 作为 data-* 属性携带，运行时由 incident-page.js 替换）
  const detailEn = ev.detailEn && ev.detailEn.length ? ev.detailEn : ev.detail || [];
  const detailZh = ev.detail || ev.detailEn || [];

  // JSON-LD 结构化数据（NewsArticle）
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: titleEn,
    description: desc,
    image: [ogImage],
    datePublished: dateTextEn || undefined,
    author: { "@type": "Organization", name: "Axtrivc" },
    publisher: { "@type": "Organization", name: "The Aveiro Files" },
    mainEntityOfPage: { "@type": "WebPage", "@id": thisUrl },
    articleSection: catLabelEn,
  };

  // 上一/下一内链（slug 与标题，中英均备）
  const prevUrl = prev ? `${absDepth}incident/${prev._slug}/` : null;
  const nextUrl = next ? `${absDepth}incident/${next._slug}/` : null;
  const prevTitleEn = prev ? (prev.titleEn || prev.title) : null;
  const nextTitleEn = next ? (next.titleEn || next.title) : null;
  const prevTitleZh = prev ? (prev.title || prev.titleEn) : null;
  const nextTitleZh = next ? (next.title || next.titleEn) : null;

  // 标签（保持中文；与首页一致）
  const tagsHtml = (ev.tags || [])
    .map((tk) => `<span class="modal-tag">${escText(tk)}</span>`)
    .join("");

  // 引言
  const quote = ev.quote || {};
  const quoteEnText = quote.textEn || quote.text || "";
  const quoteZhText = quote.text || quote.textEn || "";
  const quoteEnAuthor = quote.authorEn || quote.author || "";
  const quoteZhAuthor = quote.author || quote.authorEn || "";

  // 正文 HTML（EN 默认静态渲染）
  const detailHtmlEn = safeInline(renderDetail(detailEn));
  const detailHtmlZh = safeInline(renderDetail(detailZh));

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escText(titleEn)} | The Aveiro Files</title>
<link rel="stylesheet" href="${escAttr(absDepth + "assets/css/style.css")}">

<!-- Favicon (Google-compliant, absolute URLs) -->
<link rel="icon" type="image/png" sizes="32x32" href="/assets/img/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="48x48" href="/assets/img/favicon-48x48.png">
<link rel="icon" type="image/png" sizes="192x192" href="/assets/img/favicon-192x192.png">
<link rel="shortcut icon" href="/favicon.ico">
<link rel="apple-touch-icon" sizes="180x180" href="/assets/img/apple-touch-icon.png">

<link rel="canonical" href="${escAttr(thisUrl)}">

<!-- SEO & 社交分享（本事件专属） -->
<meta name="description" content="${escAttr(desc)}">
<meta name="keywords" content="${escAttr(["CR7", "CA7", "Cristiano Ronaldo", catLabelEn, titleEn].filter(Boolean).join(", "))}">
<meta property="og:title" content="${escAttr(titleEn + " | The Aveiro Files")}">
<meta property="og:description" content="${escAttr(desc)}">
<meta property="og:type" content="article">
<meta property="og:url" content="${escAttr(thisUrl)}">
<meta property="og:image" content="${escAttr(ogImage)}">
<meta property="og:locale" content="en_US">
<meta property="og:locale:alternate" content="zh_CN">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escAttr(titleEn + " | The Aveiro Files")}">
<meta name="twitter:description" content="${escAttr(desc)}">
<meta name="twitter:image" content="${escAttr(ogImage)}">

<!-- 结构化数据 -->
<script type="application/ld+json">
${JSON.stringify(jsonLd, null, 2)}
</script>

<!-- 首屏内容（默认英文静态渲染，爬虫直接可读） -->
<link rel="prerender" href="${escAttr(thisUrl)}">
</head>
<body class="incident-page">

<!-- 顶部迷你导航条 -->
<header class="ip-topbar">
  <a class="ip-brand" href="${absDepth}">🏠 <span>CA7</span> · The Aveiro Files</a>
  <button class="ip-lang" id="langToggleBtn" type="button" aria-label="Switch language">
    <span class="lang-label">🌐 EN / 中</span>
  </button>
</header>

<!-- 面包屑 -->
<nav class="ip-breadcrumb" aria-label="Breadcrumb">
  <a href="${absDepth}">Home</a> <span class="sep">›</span>
  <a href="${absDepth}#archive" data-i18n="nav.archive">Archive</a> <span class="sep">›</span>
  <span class="crumb-current" data-crumb-en="${escAttr(titleEn)}" data-crumb-zh="${escAttr(titleZh)}">${escText(titleEn)}</span>
</nav>

<main class="ip-main">
  <article class="ip-article">
    <div class="modal-hero">
      <span class="modal-cat-badge" style="background:${escAttr(catColor)};color:#fff">${escText(catLabelEn)}</span>
      ${picMarkup(ev.img, titleEn, absDepth)}
    </div>

    <div class="modal-body">
      <div class="modal-date"
           data-en="${escAttr(dateTextEn)}"
           data-zh="${escAttr(dateTextZh)}">${escText(dateTextEn)}</div>

      <h1 class="modal-title"
          data-en="${escAttr(titleEn)}"
          data-zh="${escAttr(titleZh)}">${escText(titleEn)}</h1>

      <div class="modal-meta">
        <div class="modal-meta-item">
          <span class="label" data-i18n="modal.loc">Location</span>
          <span class="val" data-en="${escAttr(locEn)}" data-zh="${escAttr(locZh)}">${escText(locEn)}</span>
        </div>
        <div class="modal-meta-item">
          <span class="label" data-i18n="modal.cat">Category</span>
          <span class="val" data-cat-en="${escAttr(catLabelEn)}" data-cat-zh="${escAttr(catLabelZh)}">${escText(catLabelEn)}</span>
        </div>
        <div class="modal-meta-item">
          <span class="label" data-i18n="modal.sev">Severity</span>
          <span class="val modal-severity-bar">${severityDots(ev.severity || 3)}</span>
        </div>
      </div>

      <div class="modal-detail"
           data-en-html="${escAttr(detailHtmlEn)}"
           data-zh-html="${escAttr(detailHtmlZh)}">
        ${detailHtmlEn}
      </div>

      ${(quoteEnText || quoteZhText) ? `
      <div class="modal-quote"
           data-en-text="${escAttr(quoteEnText)}" data-en-author="${escAttr(quoteEnAuthor)}"
           data-zh-text="${escAttr(quoteZhText)}" data-zh-author="${escAttr(quoteZhAuthor)}">
        &ldquo;<span class="q-text">${safeInline(quoteEnText)}</span>&rdquo;<cite>— <span class="q-author">${escText(quoteEnAuthor)}</span></cite>
      </div>` : ""}

      <div class="modal-tags">${tagsHtml}</div>
    </div>
  </article>

  <!-- 上一个 / 下一个 内链 -->
  ${(prev || next) ? `
  <nav class="ip-pager" aria-label="Incident navigation">
    ${prev ? `
    <a class="ip-pager-link ip-prev" href="${escAttr(prevUrl)}" rel="prev">
      <span class="ip-pager-dir" data-i18n="incident.prev">← Previous incident</span>
      <span class="ip-pager-title" data-en="${escAttr(prevTitleEn)}" data-zh="${escAttr(prevTitleZh)}">${escText(prevTitleEn)}</span>
    </a>` : `<span class="ip-pager-link ip-prev ip-disabled"></span>`}
    ${next ? `
    <a class="ip-pager-link ip-next" href="${escAttr(nextUrl)}" rel="next">
      <span class="ip-pager-dir" data-i18n="incident.next">Next incident →</span>
      <span class="ip-pager-title" data-en="${escAttr(nextTitleEn)}" data-zh="${escAttr(nextTitleZh)}">${escText(nextTitleEn)}</span>
    </a>` : `<span class="ip-pager-link ip-next ip-disabled"></span>`}
  </nav>` : ""}

  <!-- 返回档案库 -->
  <div class="ip-back">
    <a href="${absDepth}#archive" data-i18n="incident.back">← Back to Archive</a>
  </div>
</main>

<script>
  // 把本事件的中英内容注入全局，供 incident-page.js 做语言切换
  window.__INCIDENT__ = {
    id: ${Number(ev.id) || 0},
    slug: ${JSON.stringify(slug)},
    titleEn: ${JSON.stringify(titleEn)},
    titleZh: ${JSON.stringify(titleZh)},
    hasZhDetail: ${detailZh && detailZh.length ? "true" : "false"}
  };
</script>
<script src="${absDepth}assets/js/data.js"></script>
<script src="${absDepth}assets/js/incident-page.js"></script>
</body>
</html>
`;
}

// -------------------- sitemap --------------------
function buildSitemap(events) {
  const urls = [];
  // 首页
  urls.push({
    loc: `${SITE_ORIGIN}/`,
    changefreq: "weekly",
    priority: "1.0",
  });
  // 各事件页
  events.forEach((ev) => {
    urls.push({
      loc: `${SITE_ORIGIN}/incident/${ev._slug}/`,
      changefreq: "monthly",
      priority: "0.8",
    });
  });

  const body = urls
    .map(
      (u) => `  <url>
    <loc>${escAttr(u.loc)}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

// -------------------- 主流程 --------------------
function main() {
  const t0 = Date.now();
  const { events, catConfig } = loadData();
  console.log(`[generate-pages] 载入 ${events.length} 个事件`);

  // 1) 计算 slug（事件自带 > titleEn 生成），去重
  const used = new Set();
  events.forEach((ev) => {
    let s = ev.slug ? slugify(ev.slug) : slugify(ev.titleEn || ev.title || `incident-${ev.id}`);
    if (!s) s = `incident-${ev.id}`;
    let base = s,
      n = 2;
    while (used.has(s)) s = `${base}-${n++}`;
    used.add(s);
    ev._slug = s;
  });

  // 2) 清理旧的 incident/ 目录（避免删事件后残留孤儿页）
  if (fs.existsSync(OUT_DIR)) {
    fs.rmSync(OUT_DIR, { recursive: true, force: true });
  }
  ensureDir(OUT_DIR);

  // 3) 逐个生成子页面
  events.forEach((ev, i) => {
    const prev = events[i - 1] || null; // 首条无 prev（保持顺序内链，不循环）
    const next = events[i + 1] || null; // 末条无 next
    const html = buildIncidentHtml(ev, prev, next, catConfig);
    const dir = path.join(OUT_DIR, ev._slug);
    writeFile(path.join(dir, "index.html"), html);
  });

  // 4) incident/index.json（id→slug/title 映射，便于排查/未来 SSR）
  const indexMap = events.map((ev) => ({
    id: ev.id,
    slug: ev._slug,
    titleEn: ev.titleEn || ev.title,
    titleZh: ev.title || ev.titleEn,
  }));
  writeFile(INDEX_JSON, JSON.stringify(indexMap, null, 2));

  // 5) incident-slugs.js（供首页 app.js 跳转查询 id→slug）
  const slugsObj = {};
  events.forEach((ev) => (slugsObj[ev.id] = ev._slug));
  writeFile(
    SLUGS_JS,
    `/* 自动生成 — 勿手改。运行 npm run build:seo 重新生成。 */
/* id → slug 查询表，供首页 app.js 跳转独立事件页使用。 */
window.__INCIDENT_SLUGS__ = ${JSON.stringify(slugsObj, null, 2)};
`
  );

  // 6) sitemap.xml
  writeFile(SITEMAP, buildSitemap(events));

  const kb = Math.round(
    indexMap.reduce((acc, e) => acc + fs.statSync(path.join(OUT_DIR, e.slug, "index.html")).size, 0) / 1024
  );
  console.log(
    `[generate-pages] ✓ 生成 ${events.length} 个子页面（约 ${kb} KB）+ sitemap（${events.length + 1} 条 URL）+ slugs.js`
  );
  console.log(`[generate-pages] 完成，耗时 ${Date.now() - t0}ms`);
}

try {
  main();
} catch (err) {
  console.error("[generate-pages] 失败：", err);
  process.exit(1);
}
