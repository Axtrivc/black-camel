/**
 * incident-page.js — 事件子页面专用轻量脚本
 *
 * 仅负责：
 *   1) 读取语言偏好（localStorage('ca7-lang')，默认 'en'）
 *   2) 中英内容切换：标题 / 日期 / 地点 / 分类 / 正文 / 引言 / 面包屑当前项 / 上一·下一标题
 *   3) [data-i18n] 静态文案应用（nav.archive / modal.* / incident.* 等）
 *   4) 语言切换按钮绑定
 *
 * 依赖：本页 <script> 在 i18n-dict.js 之后加载（i18nDict 可用），incident-page.js 不消费 events。
 * 不依赖首页 DOM（无 #cardsGrid / #modalOverlay 等），故在子页面安全运行。
 */
(function () {
  "use strict";

  /* ---------- 语言状态（三语 EN / ES / ZH）---------- */
  const LANGS = ["en", "es", "zh"];
  const LANG_HTML = { en: "en", es: "es", zh: "zh-CN" };
  const LANG_LABEL = { en: "EN", es: "ES", zh: "中" };
  function normalizeLang(l) {
    if (l === "es" || l === "en" || l === "zh") return l;
    return "en";
  }
  let currentLang = (function () {
    try {
      return normalizeLang(localStorage.getItem("ca7-lang"));
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

  /** 白名单 HTML 清洗（与 app.js 同策略：仅放行正文排版标签 + 安全属性）
   *  正文 detail 含 p/div/figure/picture/source/img/figcaption 等块级与媒体标签，
   *  属性含 src/srcset/alt/loading/decoding/type，单双引号风格皆有，需一并支持。 */
  function sanitizeHtml(s) {
    if (typeof s !== "string") return "";
    const ALLOWED_TAGS = [
      "strong", "em", "b", "i", "br", "span",
      "p", "div", "figure", "figcaption", "picture", "source", "img",
    ];
    const ALLOWED_ATTRS = ["style", "class", "src", "srcset", "alt", "loading", "decoding", "type"];
    const SAFE_URL = /^(assets\/|\.\.\/|https?:\/\/)/i;
    let esc = s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    esc = esc.replace(
      /&lt;(\/?)([a-zA-Z][a-zA-Z0-9]*)((?:\s+[a-zA-Z-]+=(?:&quot;[^&]*&quot;|"[^"]*"|'[^']*'))*)\s*(\/?)&gt;/g,
      (full, slash, tag, attrs, selfclose) => {
        tag = tag.toLowerCase();
        if (ALLOWED_TAGS.indexOf(tag) === -1) return full;
        let safeAttrs = "";
        if (attrs) {
          const attrRe = /\s+([a-zA-Z-]+)=(&quot;([^&]*)&quot;|"([^"]*)"|'([^']*)')/g;
          let am;
          while ((am = attrRe.exec(attrs)) !== null) {
            const attrName = am[1].toLowerCase();
            const attrVal = am[3] !== undefined ? am[3] : am[4] !== undefined ? am[4] : am[5];
            if (ALLOWED_ATTRS.indexOf(attrName) === -1) continue;
            if ((attrName === "src" || attrName === "srcset") && !SAFE_URL.test(attrVal.trim())) continue;
            if (attrName === "style" && /expression|javascript:|url\(/i.test(attrVal)) continue;
            safeAttrs += ` ${attrName}="${attrVal.replace(/"/g, "&quot;")}"`;
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

  /** 读取元素 data-en / data-es / data-zh（纯文本），按 currentLang 降级 */
  function field(el, attrPrefix) {
    if (!el) return "";
    const en = el.getAttribute(attrPrefix + "-en");
    const es = el.getAttribute(attrPrefix + "-es");
    const zh = el.getAttribute(attrPrefix + "-zh");
    if (currentLang === "es") return es || en || zh || "";
    if (currentLang === "zh") return zh || en || "";
    return en || es || zh || "";
  }
  /** 读取 cat 属性（data-cat-en / data-cat-es / data-cat-zh） */
  function catField(el) {
    if (!el) return "";
    const en = el.getAttribute("data-cat-en");
    const es = el.getAttribute("data-cat-es");
    const zh = el.getAttribute("data-cat-zh");
    if (currentLang === "es") return es || en || zh || "";
    if (currentLang === "zh") return zh || en || "";
    return en || es || zh || "";
  }

  /* ---------- 内容渲染 ---------- */
  function renderDynamic() {
    // 标题（h1）
    const h1 = document.querySelector(".modal-title");
    if (h1) h1.textContent = field(h1, "data");

    // 日期（保留 <time> 包裹：替换其内文本，而非整个 .modal-date）
    const date = document.querySelector(".modal-date");
    if (date) {
      const dateText = field(date, "data");
      const timeEl = date.querySelector("time");
      if (timeEl) timeEl.textContent = dateText;
      else date.textContent = dateText;
    }

    // 地点
    const loc = document.querySelector(".modal-meta-item:nth-child(1) .val");
    if (loc && loc.hasAttribute("data-en")) loc.textContent = field(loc, "data");

    // 分类
    const cat = document.querySelector(".modal-meta-item:nth-child(2) .val");
    if (cat && cat.hasAttribute("data-cat-en")) {
      cat.textContent = catField(cat);
    }

    // 分类徽章（hero）
    const badge = document.querySelector(".modal-cat-badge");
    if (badge && badge.hasAttribute("data-cat-en")) {
      badge.textContent = catField(badge);
    }

    // 正文（含 HTML，需清洗）
    const detail = document.querySelector(".modal-detail");
    if (detail) {
      const enHtml = detail.getAttribute("data-en-html");
      const esHtml = detail.getAttribute("data-es-html");
      const zhHtml = detail.getAttribute("data-zh-html");
      // 按当前语言取正文，缺失时降级 en→zh
      let html;
      if (currentLang === "es") html = esHtml || enHtml || zhHtml;
      else if (currentLang === "zh") html = zhHtml || enHtml;
      else html = enHtml || zhHtml;
      // ES/EN 缺失时加"长文待译"提示（与首页 modal 行为一致）
      if ((currentLang === "en" && !enHtml) || (currentLang === "es" && !esHtml)) {
        html =
          (html || "") +
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
      if (qt) qt.textContent = field(quote, "data-text");
      if (qa) qa.textContent = field(quote, "data-author");
    }

    // 面包屑当前项
    const crumb = document.querySelector(".crumb-current");
    if (crumb) crumb.textContent = field(crumb, "data-crumb");

    // 标签（每个 .modal-tag 带 data-en/es/zh）
    document.querySelectorAll(".modal-tag").forEach((el) => {
      if (el.hasAttribute("data-en")) el.textContent = field(el, "data");
    });

    // 上一/下一标题
    document.querySelectorAll(".ip-pager-title").forEach((el) => {
      el.textContent = field(el, "data");
    });

    // <title> 跟随语言（SEO 友好；EN 用规范格式）
    const inc = window.__INCIDENT__ || {};
    const titleByLang = {
      en: inc.titleEn || inc.titleZh || inc.titleEs || document.title,
      es: inc.titleEs || inc.titleEn || inc.titleZh || document.title,
      zh: inc.titleZh || inc.titleEn || document.title,
    };
    document.title = `${titleByLang[currentLang] || titleByLang.en} | The Aveiro Files`;
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
    const btn = document.getElementById("langToggleBtn");
    if (!btn) return;
    const lbl = btn.querySelector(".lang-label");
    if (lbl) lbl.innerHTML = '<span class="lang-globe">🌐</span>' + LANG_LABEL[currentLang];
    btn.querySelectorAll(".lang-option").forEach((o) => {
      o.classList.toggle("active", o.getAttribute("data-lang") === currentLang);
    });
  }
  function closeLangMenu() {
    const btn = document.getElementById("langToggleBtn");
    if (btn) btn.classList.remove("open");
  }
  function toggleLangMenu() {
    const btn = document.getElementById("langToggleBtn");
    if (btn) {
      btn.classList.toggle("open");
      btn.setAttribute("aria-expanded", btn.classList.contains("open"));
    }
  }

  function setLanguage(lang) {
    currentLang = normalizeLang(lang);
    try {
      localStorage.setItem("ca7-lang", currentLang);
    } catch (e) {}
    document.documentElement.lang = LANG_HTML[currentLang];
    applyStaticI18n();
    updateLangBtn();
    closeLangMenu();
    renderDynamic();
  }

  /* ---------- 启动 ---------- */
  document.documentElement.lang = LANG_HTML[currentLang];
  applyStaticI18n();
  updateLangBtn();
  renderDynamic();

  const btn = document.getElementById("langToggleBtn");
  if (btn) {
    btn.addEventListener("click", (e) => {
      const opt = e.target.closest(".lang-option");
      if (opt) {
        const lang = opt.getAttribute("data-lang");
        if (lang) setLanguage(lang);
        return;
      }
      toggleLangMenu();
    });
    // 菜单项是 <span tabindex="0">，Enter/Space 不会派发 click，需显式处理
    btn.addEventListener("keydown", (e) => {
      const opt = e.target.closest(".lang-option");
      if (!opt) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const lang = opt.getAttribute("data-lang");
        if (lang) setLanguage(lang);
        btn.focus();
      }
    });
    document.addEventListener("click", (e) => {
      if (!btn.contains(e.target)) closeLangMenu();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeLangMenu();
    });
  }
})();
