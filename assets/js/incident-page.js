/**
 * incident-page.js — 事件子页面专用轻量脚本
 *
 * 仅负责：
 *   1) 读取语言偏好（localStorage('ca7-lang')，默认 'en'）
 *   2) 中英内容切换：标题 / 日期 / 地点 / 分类 / 正文 / 引言 / 面包屑当前项 / 上一·下一标题
 *   3) [data-i18n] 静态文案应用（nav.archive / modal.* / incident.* 等）
 *   4) 语言切换按钮绑定
 *
 * 依赖：本页 <script> 在 data.js 之后加载，因此 i18nDict / events 可用。
 * 不依赖首页 DOM（无 #cardsGrid / #modalOverlay 等），故在子页面安全运行。
 */
(function () {
  "use strict";

  /* ---------- 语言状态 ---------- */
  let currentLang = (function () {
    try {
      return localStorage.getItem("ca7-lang") || "en";
    } catch (e) {
      return "en";
    }
  })();

  function t(key, fallback) {
    const dict =
      typeof i18nDict !== "undefined" ? i18nDict[currentLang] || i18nDict.en : null;
    if (dict && dict[key] !== undefined) return dict[key];
    return fallback !== undefined ? fallback : key;
  }

  /** 白名单 HTML 清洗（与 app.js 同策略：仅允许 strong/em/b/i/br/span + style/class） */
  function sanitizeHtml(s) {
    if (typeof s !== "string") return "";
    const ALLOWED_TAGS = ["strong", "em", "b", "i", "br", "span"];
    const ALLOWED_ATTRS = ["style", "class"];
    const SAFE_ATTR_VAL = /^([a-zA-Z0-9\s:;.\-#(),%'"]+)$/;
    let esc = s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    esc = esc.replace(
      /&lt;(\/?)([a-zA-Z][a-zA-Z0-9]*)((?:\s+[a-zA-Z-]+=&quot;[^&]*&quot;|\s+[a-zA-Z-]+="[^"]*")*)\s*(\/?)&gt;/g,
      (full, slash, tag, attrs, selfclose) => {
        tag = tag.toLowerCase();
        if (ALLOWED_TAGS.indexOf(tag) === -1) return full;
        let safeAttrs = "";
        if (attrs) {
          const attrRe = /\s+([a-zA-Z-]+)=(&quot;([^&]*)&quot;|"([^"]*)")/g;
          let am;
          while ((am = attrRe.exec(attrs)) !== null) {
            const attrName = am[1].toLowerCase();
            const attrVal = am[3] !== undefined ? am[3] : am[5];
            if (ALLOWED_ATTRS.indexOf(attrName) !== -1 && SAFE_ATTR_VAL.test(attrVal)) {
              safeAttrs += ` ${attrName}="${attrVal}"`;
            }
          }
        }
        const lt = "<",
          gt = ">";
        if (slash) return lt + "/" + tag + gt;
        return lt + tag + safeAttrs + (selfclose ? "/" : "") + gt;
      }
    );
    return esc;
  }

  /** 读取元素 data-en / data-zh（纯文本） */
  function field(el, attrPrefix) {
    if (!el) return "";
    const en = el.getAttribute(attrPrefix + "-en");
    const zh = el.getAttribute(attrPrefix + "-zh");
    if (currentLang === "zh") return zh || en || "";
    return en || zh || "";
  }

  /* ---------- 内容渲染 ---------- */
  function renderDynamic() {
    // 标题（h1）
    const h1 = document.querySelector(".modal-title");
    if (h1) h1.textContent = field(h1, "data");

    // 日期
    const date = document.querySelector(".modal-date");
    if (date) date.textContent = field(date, "data");

    // 地点
    const loc = document.querySelector(".modal-meta-item:nth-child(1) .val");
    if (loc && loc.hasAttribute("data-en")) loc.textContent = field(loc, "data");

    // 分类
    const cat = document.querySelector(".modal-meta-item:nth-child(2) .val");
    if (cat && cat.hasAttribute("data-cat-en")) {
      const en = cat.getAttribute("data-cat-en");
      const zh = cat.getAttribute("data-cat-zh");
      cat.textContent = currentLang === "zh" ? zh || en || "" : en || zh || "";
    }

    // 分类徽章（hero）
    const badge = document.querySelector(".modal-cat-badge");
    if (badge && badge.hasAttribute("data-cat-en")) {
      const en = badge.getAttribute("data-cat-en");
      const zh = badge.getAttribute("data-cat-zh");
      badge.textContent = currentLang === "zh" ? zh || en || "" : en || zh || "";
    }

    // 正文（含 HTML，需清洗）
    const detail = document.querySelector(".modal-detail");
    if (detail) {
      const enHtml = detail.getAttribute("data-en-html");
      const zhHtml = detail.getAttribute("data-zh-html");
      // EN 无 detailEn 时回退中文并加"长文待译"提示（与首页 modal 行为一致）
      let html = currentLang === "zh" ? zhHtml : enHtml;
      if (!html) html = currentLang === "en" ? zhHtml : enHtml; // 互为回退
      if (currentLang === "en" && !enHtml) {
        html =
          (zhHtml || "") +
          `<p style="font-family:var(--mono);font-size:11px;color:var(--text-dim);border-top:1px dashed var(--border);padding-top:10px;margin-top:8px">${t(
            "modal.detailNotice",
            "Full translation coming soon."
          )}</p>`;
      }
      detail.innerHTML = sanitizeHtml(html || "");
    }

    // 引言
    const quote = document.querySelector(".modal-quote");
    if (quote) {
      const qt = quote.querySelector(".q-text");
      const qa = quote.querySelector(".q-author");
      const enText = quote.getAttribute("data-en-text");
      const zhText = quote.getAttribute("data-zh-text");
      const enAuthor = quote.getAttribute("data-en-author");
      const zhAuthor = quote.getAttribute("data-zh-author");
      if (qt) qt.textContent = currentLang === "zh" ? (zhText || enText || "") : (enText || zhText || "");
      if (qa) qa.textContent = currentLang === "zh" ? (zhAuthor || enAuthor || "") : (enAuthor || zhAuthor || "");
    }

    // 面包屑当前项
    const crumb = document.querySelector(".crumb-current");
    if (crumb) crumb.textContent = field(crumb, "data-crumb");

    // 上一/下一标题
    document.querySelectorAll(".ip-pager-title").forEach((el) => {
      el.textContent = field(el, "data");
    });

    // <title> 跟随语言（SEO 友好；EN 用规范格式）
    const inc = window.__INCIDENT__ || {};
    const titleEn = inc.titleEn || document.title;
    const titleZh = inc.titleZh || document.title;
    document.title =
      currentLang === "zh" ? `${titleZh} | The Aveiro Files` : `${titleEn} | The Aveiro Files`;
  }

  function applyStaticI18n() {
    const dict =
      typeof i18nDict !== "undefined" ? i18nDict[currentLang] || i18nDict.en : null;
    if (!dict) return;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const v = dict[key];
      if (v === undefined) return;
      if (/[<>]/.test(v)) el.innerHTML = sanitizeHtml(v);
      else el.textContent = v;
    });
  }

  function updateLangBtn() {
    const lbl = document.querySelector("#langToggleBtn .lang-label");
    if (!lbl) return;
    lbl.innerHTML =
      '<span class="lang-globe">🌐</span>' + (currentLang === "en" ? "EN / 中" : "中 / EN");
  }

  function setLanguage(lang) {
    currentLang = lang === "zh" ? "zh" : "en";
    try {
      localStorage.setItem("ca7-lang", currentLang);
    } catch (e) {}
    document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";
    applyStaticI18n();
    updateLangBtn();
    renderDynamic();
  }

  /* ---------- 启动 ---------- */
  document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";
  applyStaticI18n();
  updateLangBtn();
  renderDynamic();

  const btn = document.getElementById("langToggleBtn");
  if (btn) {
    btn.addEventListener("click", () => {
      setLanguage(currentLang === "en" ? "zh" : "en");
    });
  }
})();
