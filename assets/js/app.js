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
let currentList = [];        // 当前筛选后的列表（供模态翻页用）

/* ========== 渲染卡片 ========== */
function renderCards(){
  grid.innerHTML = "";
  currentList = events.filter(e=>{
    if(currentFilter !== "all" && e.cat !== currentFilter) return false;
    if(currentSeverity > 0 && e.severity < currentSeverity) return false;
    if(searchQuery){
      const q = searchQuery;
      const inDetail = e.detail && e.detail.some(p=>p.toLowerCase().includes(q));
      if(!(
        e.title.toLowerCase().includes(q) ||
        e.summary.toLowerCase().includes(q) ||
        (e.location && e.location.toLowerCase().includes(q)) ||
        (e.tags && e.tags.some(t=>t.toLowerCase().includes(q))) ||
        inDetail
      )) return false;
    }
    return true;
  });

  document.getElementById("resultCount").textContent = `显示 ${currentList.length} 条记录`;

  // 排序：头条/置顶（severity 5 且标记「头条」）最前，其次按 severity 降序、id 降序
  const maxId = Math.max(...events.map(e=>e.id));
  currentList.sort((a,b)=>{
    const aTop = a.tags && a.tags.includes("头条") ? 1 : 0;
    const bTop = b.tags && b.tags.includes("头条") ? 1 : 0;
    if(aTop !== bTop) return bTop - aTop;
    if(b.severity !== a.severity) return b.severity - a.severity;
    return b.id - a.id;
  });

  currentList.forEach((e,idx)=>{
    const card = document.createElement("div");
    card.className = `event-card cat-${e.cat}`;
    if(e.tags && e.tags.includes("头条")) card.classList.add("card-pinned");
    // stagger 错峰入场：按行内 index 延迟，封顶 8 张避免长列表末位等太久
    card.style.setProperty("--stagger", Math.min(idx % 8, 6) * 0.07 + "s");
    let dots = "";
    for(let i=0;i<5;i++){
      dots += `<span class="dot ${i<e.severity?'on':''}"></span>`;
    }
    const pinnedBadge = (e.tags && e.tags.includes("头条")) ? `<span class="card-badge-breaking">🔥 头条</span>` : "";
    const newBadge = (e.id === maxId && !(e.tags && e.tags.includes("头条"))) ? `<span class="card-badge-new">NEW</span>` : "";
    card.innerHTML = `
      <div class="card-img">
        ${pinnedBadge}${newBadge}
        <span class="card-cat" style="background:${catConfig[e.cat] ? catConfig[e.cat].color : '#4a235a'}33;color:${catConfig[e.cat] ? catConfig[e.cat].color : '#4a235a'}">${e.catLabel}</span>
        <div class="card-severity">${dots}</div>
        ${pic(e.img||'',{alt:e.title,loading:"lazy",decoding:"async","data-cat-label":e.catLabel})}
      </div>
      <div class="card-body">
        <div class="card-date">${e.date}</div>
        <div class="card-title">${e.title}</div>
        <div class="card-summary">${e.summary}</div>
        <div class="card-footer">
          <div class="card-tags">${e.tags.slice(0,3).map(t=>`<span class="card-tag">${t}</span>`).join("")}</div>
          <div class="card-read">查看卷宗 →</div>
        </div>
      </div>
    `;
    card.addEventListener("click",()=>openModalByIdx(idx));
    grid.appendChild(card);
    revealObserver.observe(card);
  });

  if(currentList.length === 0){
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text-dim);font-family:var(--mono)">未找到匹配记录</div>`;
  }
}

/* 图片错误兜底：事件委托（取代原内联 onerror） */
grid.addEventListener("error",(e)=>{
  const img = e.target;
  if(img.tagName === "IMG" && img.closest(".card-img")){
    handleImgError(img, img.dataset.catLabel || "档案图");
  }
},true);

/* ========== 模态框（含翻页） ========== */
const overlay = document.getElementById("modalOverlay");
const modalContent = document.getElementById("modalContent");
const modalCounter = document.getElementById("modalCounter");
let modalIdx = 0;   // 当前在 currentList 中的索引

function openModalByIdx(idx){
  modalIdx = idx;
  renderModal();
  overlay.classList.add("show");
  document.body.style.overflow = "hidden";
  document.querySelector(".modal").scrollTop = 0;
  if(window.__badge) window.__badge("read", 1);
}

function renderModal(){
  const e = currentList[modalIdx];
  if(!e) return;
  let dots = "";
  for(let i=0;i<5;i++){
    dots += `<span class="dot ${i<e.severity?'on':''}"></span>`;
  }
  // detail 渲染：若段落本身已是块级标签（<p>/<figure>/<div> 等）则原样输出，否则包一层 <p>
  const blockTag=/^\s*<(p|figure|div|blockquote|h[1-6]|ul|ol|table)\b/i;
  const detailHtml = e.detail.map(p=> blockTag.test(p) ? p : `<p>${p}</p>`).join("");
  let quoteHtml = "";
  if(e.quote){
    quoteHtml = `<div class="modal-quote">"${e.quote.text}"<cite>— ${e.quote.author}</cite></div>`;
  }
  modalContent.innerHTML = `
    <div class="modal-hero">
      <span class="modal-cat-badge" style="background:${catConfig[e.cat] ? catConfig[e.cat].color : '#4a235a'};color:#fff">${e.catLabel}</span>
      ${pic(e.img||'',{alt:e.title,decoding:"async","data-cat-label":e.catLabel})}
    </div>
    <div class="modal-body">
      <div class="modal-date">${e.date}</div>
      <div class="modal-title">${e.title}</div>
      <div class="modal-meta">
        <div class="modal-meta-item"><span class="label">地点</span><span class="val">${e.location}</span></div>
        <div class="modal-meta-item"><span class="label">分类</span><span class="val">${e.catLabel}</span></div>
        <div class="modal-meta-item"><span class="label">严重程度</span><span class="val modal-severity-bar">${dots}</span></div>
      </div>
      <div class="modal-detail">${detailHtml}</div>
      ${quoteHtml}
      <div class="modal-tags">${e.tags.map(t=>`<span class="modal-tag">${t}</span>`).join("")}</div>
    </div>
  `;
  modalCounter.textContent = `${modalIdx+1} / ${currentList.length}`;
}

// 模态图兜底：事件委托
modalContent.addEventListener("error",(e)=>{
  const img = e.target;
  if(img.tagName === "IMG"){
    handleImgError(img, img.dataset.catLabel || "档案图");
  }
},true);

function closeModal(){
  overlay.classList.remove("show");
  document.body.style.overflow = "";
}
function modalNext(){
  if(currentList.length === 0) return;
  modalIdx = (modalIdx + 1) % currentList.length;
  renderModal();
  document.querySelector(".modal").scrollTop = 0;
}
function modalPrev(){
  if(currentList.length === 0) return;
  modalIdx = (modalIdx - 1 + currentList.length) % currentList.length;
  renderModal();
  document.querySelector(".modal").scrollTop = 0;
}

document.getElementById("modalClose").addEventListener("click",closeModal);
document.getElementById("modalNext").addEventListener("click",modalNext);
document.getElementById("modalPrev").addEventListener("click",modalPrev);
overlay.addEventListener("click",(e)=>{
  if(e.target === overlay) closeModal();
});
document.addEventListener("keydown",(e)=>{
  if(!overlay.classList.contains("show")) return;
  if(e.key === "Escape") closeModal();
  else if(e.key === "ArrowRight") modalNext();
  else if(e.key === "ArrowLeft") modalPrev();
});

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

/* 搜索：防抖 200ms，结果区不在视口时自动滚动 */
const searchInput = document.getElementById("searchInput");
let searchTimer = null;
searchInput.addEventListener("input",(e)=>{
  clearTimeout(searchTimer);
  const val = e.target.value.toLowerCase().trim();
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

/* ========== 时间线渲染 ========== */
const tlContainer = document.getElementById("timelineTrack");
timelineData.forEach(item=>{
  const div = document.createElement("div");
  div.className = "tl-item";
  div.innerHTML = `
    <div class="tl-year">${item.year}</div>
    <div class="tl-title">${item.title}</div>
    <div class="tl-desc">${item.desc}</div>
  `;
  tlContainer.appendChild(div);
});
document.querySelectorAll(".tl-item").forEach(item=>revealObserver.observe(item));

/* ========== 数字计数动画 ========== */
function animateNumber(el){
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || "";
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
    quoteTextEl.textContent = '"' + quotes[quoteIdx].text + '"';
    quoteAuthorEl.textContent = "— " + quotes[quoteIdx].author;
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

/* ========== 🚨 BREAKING 头条跑马灯：自适应时长 + 点击展开 ========== */
// 跑马灯滚动速度恒定（≈60px/秒），时长按内容实际宽度计算，
// 避免「宽屏滚太快、窄屏滚太慢」。内容在 HTML 里已复制一份，
// 取第一份宽度即可推算 -50% 循环所需时长。
(function breakingTickerSetup(){
  const ticker=document.getElementById("breakingTicker");
  if(!ticker) return;
  const setDur=()=>{
    // 第一份内容宽度 ≈ scrollWidth / 2（含末尾 gap）
    const halfW=Math.max(ticker.scrollWidth/2, 200);
    const dur=Math.max(8, halfW/60);  // 60px/秒，下限 8s
    ticker.style.setProperty("--breaking-dur", dur.toFixed(1)+"s");
  };
  // 字体/图片就绪后再测一次，避免初始宽度偏差
  setDur();
  window.addEventListener("load",setDur);
  let rt; window.addEventListener("resize",()=>{clearTimeout(rt);rt=setTimeout(setDur,200);});
})();
document.getElementById("breakingCta")?.addEventListener("click",()=>{
  // 切到「全部」筛选确保该事件在当前列表中
  document.querySelectorAll(".filter-chip").forEach(c=>c.classList.toggle("active",c.dataset.cat==="all"));
  currentList=events;
  renderCards();  // 此后会按置顶/严重程度排序 currentList
  // 在排序后的 currentList 中定位 id:63
  const idx=currentList.findIndex(e=>e.id===63);
  if(idx>=0) openModalByIdx(idx);
});

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
  const label = el.parentElement.querySelector(".hstat-label").textContent.trim();
  if(label === "收录事件") el.dataset.target = events.length;
  else if(label === "争议分类") el.dataset.target = Object.keys(catConfig).length;
});

// 3) 「争议分类占比」条形图按 events 重新计算
const totalEvents = events.length;
document.querySelectorAll(".viz-card").forEach(card=>{
  const titleEl = card.querySelector(".viz-title");
  if(!titleEl || titleEl.textContent.indexOf("争议分类占比") === -1) return;
  // 重建：用 catConfig 的顺序 + catCounts 数据
  const rows = Object.keys(catConfig).map(cat=>{
    const cnt = catCounts[cat] || 0;
    const pct = totalEvents ? Math.round(cnt/totalEvents*100) : 0;
    return `<div class="bar-row"><div class="bar-label">${catConfig[cat].label}</div><div class="bar-track"><div class="bar-fill" data-w="${pct}%"></div><div class="bar-val">${cnt}</div></div></div>`;
  }).join("");
  card.innerHTML = `<div class="viz-title">争议分类占比</div>${rows}`;
  // 重新挂观察者（新 DOM）
  card.querySelectorAll(".bar-row").forEach(row=>barObserver.observe(row));
});

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
  // 移动端：把主题切换器移进汉堡菜单展开层，避免导航栏挤压溢出
  const mq=window.matchMedia("(max-width:900px)");
  const navInner=document.querySelector(".nav-inner");
  const navToggle=document.getElementById("navToggle");
  function relocateSwitcher(){
    if(mq.matches){
      // 窄屏：移进汉堡菜单层
      if(!navLinks.contains(switcher)) navLinks.appendChild(switcher);
    }else{
      // 宽屏：放回 nav-inner（汉堡按钮之前）
      if(navInner && !navInner.contains(switcher) && navToggle){
        navInner.insertBefore(switcher,navToggle);
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
  tabs.innerHTML=pkData.map((d,i)=>`<button class="pk-tab ${i===0?'active':''}" data-idx="${i}">${d.label}</button>`).join("");
  function render(){
    const d=pkData[curIdx];
    const fromCr7=curCr7, fromMessi=curMessi;
    // 渲染两侧：loser 方（黑点更重/被讽刺方）打上 loser 类高亮
    sides.innerHTML=`
      <div class="pk-side cr7 ${d.loser==='cr7'?'loser':''}">
        <div class="pk-name">C 罗</div>
        <div class="pk-subname">CRISTIANO · CA7</div>
        <div class="pk-val">${fromCr7}</div>
        <div class="pk-note">${d.cr7.note}</div>
      </div>
      <div class="pk-side messi ${d.loser==='messi'?'loser':''}">
        <div class="pk-name">梅西</div>
        <div class="pk-subname">MESSI</div>
        <div class="pk-val">${fromMessi}</div>
        <div class="pk-note">${d.messi.note}</div>
      </div>`;
    tip.innerHTML=`<strong>${d.tip}</strong>`;
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
    const t=e.target.closest(".pk-tab");
    if(!t) return;
    curIdx=parseInt(t.dataset.idx);
    tabs.querySelectorAll(".pk-tab").forEach(x=>x.classList.toggle("active",x===t));
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
      const correctText=item.opts[item.a];
      const opts=shuffle(item.opts);
      return { q:item.q, opts, a:opts.indexOf(correctText), fb:item.fb };
    });
  }

  let game=[], idx=0, score=0;

  function render(){
    const q=game[idx];
    const total=game.length;
    progressFill.style.width=((idx)/total*100)+"%";
    progressText.textContent=`第 ${idx+1} / ${total} 题`;
    body.innerHTML=`
      <div class="quiz-q">${idx+1}. ${q.q}</div>
      <div class="quiz-options">
        ${q.opts.map((o,i)=>`
          <button class="quiz-option" data-i="${i}">
            <span class="quiz-opt-mark">${String.fromCharCode(65+i)}</span>
            <span>${o}</span>
          </button>`).join("")}
      </div>
      <div class="quiz-fb" id="quizFb" hidden></div>
      <div class="quiz-nav">
        <span style="font-family:var(--mono);font-size:12px;color:var(--text-dim)">答对得分，答错 0 分</span>
        <button class="quiz-next" id="quizNext" disabled>下一题 →</button>
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
        fb.innerHTML=`<strong>${ok?"✓ 答对了":"✗ 正确答案："+String.fromCharCode(65+q.a)}</strong><br>${q.fb}`;
        next.disabled=false;
        next.textContent= idx===total-1?"查看诊断结果 →":"下一题 →";
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
    progressText.textContent=`诊断完成 · ${score}/${total}`;
    body.hidden=true;
    const pct=score/total;
    let rank,verdict;
    if(pct===1){ rank="骨灰级罗黑"; verdict="满分。你比本档案馆还了解他的黑历史，建议入职当馆长。每一题都精准命中——这不是巧合，这是仇恨的沉淀。"; }
    else if(pct>=0.75){ rank="资深罗黑"; verdict=`${score}/${total}。你对他的底细门儿清，朋友圈里的"罗黑"担当非你莫属。再补几条典故就能毕业了。`; }
    else if(pct>=0.5){ rank="黑粉见习"; verdict=`${score}/${total}。入了门，但还差点意思——建议把档案馆从前往后通读一遍，黑料储备会肉眼可见地充实。`; }
    else{ rank="吃瓜路人"; verdict=`${score}/${total}。看着热闹，其实啥也没记住。多翻几页档案，下次就能在球友面前有理有据地"黑"了。`; }
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
  const wrap=document.getElementById("tof");
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
    textEl.textContent=item.text;
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
    const verdict = item.truth ? '<b>✓ 真语录</b>' : '<b>✗ 假语录（我编的）</b>';
    revealEl.innerHTML=`${correct?'<b style="color:#3ddc84">答对了！</b>':'<b style="color:#ff1744">答错了！</b>'} ${verdict}<br>${item.reveal}<span class="src">出处：${item.source}</span>`;
    revealEl.hidden=false;
    nextBtn.hidden=false;
    nextBtn.textContent = (idx===ROUND_LEN-1)?'查看诊断结果 →':'下一题 →';
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
    if(pct===1){rank="人间清醒";verdict=`${score}/${ROUND_LEN} 满分。你比 C罗 还了解他自己——不，你比他还懂他的傲慢。每一句荒诞，你都精准识破。`;}
    else if(pct>=0.7){rank="反讽大师";verdict=`${score}/${ROUND_LEN}。你深谙「总裁体」的边界——真话和段子的区别，对你来说一眼可辨。`;}
    else if(pct>=0.4){rank="吃瓜群众";verdict=`${score}/${ROUND_LEN}。被忽悠得不轻——这就是 C罗话术的可怕之处：真话比段子还像段子。`;}
    else{rank="被Factos洗脑";verdict=`${score}/${ROUND_LEN}。你大概真的相信了「我是历史第一第二第三」。建议把档案馆从前往后通读一遍。`;}
    document.getElementById("tofFinalScore").textContent=score;
    document.getElementById("tofRank").textContent=rank;
    document.getElementById("tofVerdict").textContent=verdict;
    document.getElementById("tofStats").innerHTML=`真语录识破 ${realCorrect}/${realTotal} · 假语录识破 ${fakeCorrect}/${fakeTotal} · 最高连击 ${maxStreak}`;
    if(window.__badge) window.__badge("quiz",{score,total:ROUND_LEN,pct});  // 复用 quiz 成就触发
    // 分数滚动
    const fs=document.getElementById("tofFinalScore");
    let n=0;const t0=performance.now();
    (function tick(now){const p=Math.min((now-t0)/900,1);const eased=1-Math.pow(1-p,3);fs.textContent=Math.floor(eased*score);if(p<1)requestAnimationFrame(tick);else fs.textContent=score;})(performance.now());
  }

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
  // 渲染检测项
  grid.innerHTML=penaltyData.items.map(it=>`
    <div class="scan-item" data-score="${it.score}">
      <div class="scan-label">${it.label}</div>
      <div class="scan-value">${it.value}<span class="unit"> ${it.unit||''}</span></div>
      <div class="scan-note">${it.note}</div>
    </div>`).join("");
  const circumference=292; // 半圆弧长近似
  let scanned=false;
  function runScan(){
    if(scanned) return; scanned=true;
    scanner.classList.add("scanning");
    status.innerHTML='<span class="blink"></span>SCANNING... 检测中';
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
      status.innerHTML='<span class="blink"></span>检测完成 · 含金量严重不足';
      let v=""; if(score<20) v="严重注水，建议脱水后重测"; else if(score<40) v="含金量堪忧";
      else v="勉强及格"; verdict.textContent=v;
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
    gaugeNum.textContent="--"; verdict.textContent="等待检测...";
    setTimeout(runScan,200);
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
  // 预设
  presetsEl.innerHTML=memePresets.map((p,i)=>`<span class="meme-preset" data-i="${i}">${p.top.slice(0,8)}…</span>`).join("");
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
    top.value=p.top; bot.value=p.bottom; draw();
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
  // 默认填一句
  top.value="SIUUUUU"; bot.value="点球进了";
  draw();
})();

/* ========== 罪恶账本烧钱榜 ========== */
(function(){
  const ledger=document.getElementById("ledger");
  if(!ledger||typeof moneyLedger==="undefined") return;
  ledger.innerHTML=`
    <div class="ledger-head">
      <div class="ledger-title">罪恶账本</div>
      <div class="ledger-no">NO. CA7-2026-${moneyLedger.length}ENTRIES</div>
    </div>
    <div class="ledger-rows">
      ${moneyLedger.map((m,i)=>`
        <div class="ledger-row" data-i="${i}">
          <div class="ld-desc">
            <span class="ledger-cat">${m.cat}</span>${m.desc}
            <small>${m.detail}</small>
          </div>
          <div class="ld-amount">${m.amount}<span class="cur"> ${m.currency}</span></div>
        </div>`).join("")}
    </div>
    <div class="ledger-foot">
      <div class="ledger-total">TOTAL DISPUTED VALUE · <span class="n">不可估量</span></div>
    </div>`;
  // 逐行揭示
  const rows=ledger.querySelectorAll(".ledger-row");
  const lo=new IntersectionObserver((ents)=>{
    ents.forEach(en=>{
      if(en.isIntersecting){
        rows.forEach((r,i)=>setTimeout(()=>r.classList.add("show"),i*180));
        lo.unobserve(en.target);
      }
    });
  },{threshold:0.2});
  lo.observe(ledger);
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
  // 称号阶梯（封顶 7）
  const TITLES=[
    {n:1,name:"见习封印官",line:"第一枚封印已落下。"},
    {n:3,name:"档案守护者",line:"三枚红印，黑历史由你看管。"},
    {n:7,name:"首席档案官",line:"七印封顶 · SIU! 触发庆祝。"}
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
    countEl.textContent="封印 · "+count+" / "+MAX;
    // 5) 解锁称号
    let newIdx=titleIdx;
    TITLES.forEach((t,i)=>{ if(count>=t.n) newIdx=i; });
    if(newIdx>titleIdx){
      titleIdx=newIdx;
      const t=TITLES[newIdx];
      titleEl.hidden=false;
      titleEl.textContent="« "+t.name+" »";
      titleEl.style.animation="none"; void titleEl.offsetWidth;
      titleEl.style.animation="";
      hint.textContent=t.line;
    }
    // 6) 封顶触发 SIU
    if(count===MAX){
      siuUnlocked=true;
      hint.textContent="七印封顶 · 再点签名重放 SIU 庆祝";
      setTimeout(playSIU, 500);   // 等印章砸落动画收尾再庆祝
    } else if(count===1){
      hint.textContent="再点几下，集齐 7 印触发隐藏庆祝 →";
    }
  }

  stamp.addEventListener("click",stamp_seal);
  stamp.addEventListener("keydown",e=>{
    if(e.key==="Enter"||e.key===" "){ e.preventDefault(); stamp_seal(); }
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
    return s>=5?"极重":s===4?"严重":s===3?"较重":s===2?"一般":"轻微";
  }

  function render(ev){
    current=ev;
    els.no.textContent="№ "+String(ev.id).padStart(3,"0")+" / "+String(events.length).padStart(3,"0");
    els.cat.textContent=ev.catLabel;
    els.title.textContent=ev.title;
    els.date.textContent="📅 "+(ev.date||"—");
    els.loc.textContent="📍 "+(ev.location||"—");
    let bars="";
    for(let i=1;i<=5;i++){
      bars+=`<span class="sev-bar${i<=ev.severity?" on":""}"></span>`;
    }
    els.sev.innerHTML=`严重程度 ${bars} <span>${sevLabel(ev.severity)}</span>`;
    els.summary.textContent=ev.summary;
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
    x.fillText((current.catLabel||"").toUpperCase(),45,135);
    x.strokeStyle="#2a2a30";x.beginPath();x.moveTo(45,148);x.lineTo(W-45,148);x.stroke();
    // 标题（自动换行）
    x.fillStyle="#f0f0f4";x.font="900 30px Georgia,serif";
    wrapText(x,current.title,45,195,W-90,36);
    // 日期/地点
    x.fillStyle="#7a7a82";x.font="13px 'Courier New',monospace";
    x.fillText("📅 "+(current.date||"—"),45,290);
    x.fillText("📍 "+(current.location||"—"),45,312);
    // 严重程度条
    x.fillStyle="#7a7a82";x.font="11px 'Courier New',monospace";
    x.fillText("严重程度",45,345);
    for(let i=0;i<5;i++){
      x.fillStyle=i<current.severity?"#dc143c":"#2a2a30";
      x.fillRect(45+i*24,355,18,8);
    }
    x.fillStyle="#dc143c";
    x.fillText(sevLabel(current.severity),45,382);
    // 摘要
    x.fillStyle="#d6d6db";x.font="15px Georgia,serif";
    wrapText(x,current.summary,45,430,W-90,26);
    // 底部
    x.fillStyle="#7a7a82";x.font="10px 'Courier New',monospace";
    x.textAlign="center";
    x.fillText("THE AVEIRO FILES · 黑料盲盒 · 球迷文化创作，不代表任何官方立场",W/2,H-30);

    const a=document.createElement("a");
    a.download=`CA7-通缉令-${String(current.id).padStart(3,"0")}.png`;
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
})();

/* ========== 争议世界地图 2.0（时间轴 + 生涯轨迹 + 热度图） ========== */
(function worldmapModule(){
  const svg=document.getElementById("worldmapSvg");
  const tip=document.getElementById("worldmapTip");
  const wrap=document.getElementById("worldmap");
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
      tip.innerHTML=`<b>${ev.title}</b>`+
        (b.items.length>1?`<small>＋${b.items.length-1} 起同地事件</small><br>`:"")+
        `<small>${ev.date||""} · ${ev.location||""}</small><br>`+
        `${ev.summary.slice(0,60)}…`;
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
    {name:"里斯本竞技",x:455,y:208,from:2002,to:2003},
    {name:"曼联(一)",x:462,y:148,from:2003,to:2009},
    {name:"皇马",x:485,y:205,from:2009,to:2018},
    {name:"尤文图斯",x:518,y:188,from:2018,to:2021},
    {name:"曼联(二)",x:462,y:148,from:2021,to:2022},
    {name:"利雅得胜利",x:625,y:225,from:2023,to:2026},
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
      lb.textContent=c.name;
      trailLayer.appendChild(lb);
    });
  }
  renderTrail();

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
    readout.textContent=`显示：${a} – ${b} · ${shownCount} 个地点`;
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
    recEl.innerHTML=`<span style="color:#3ddc84">${wins}胜</span> <span style="color:#ff1744">${losses}负</span>`;
    resetBtn.hidden = balance<=0 ? false : true;
    board.innerHTML=casinoBets.map((b,i)=>{
      const st=states[i];
      let resultHtml="";
      if(st&&st.resolved){
        const cls = st.won?"win":"lose";
        const delta = st.won ? `+${st.payout}` : `-${st.stake}`;
        const yourPickText = st.pick==="a"?b.a:b.b;
        const verdictText = st.won ? "✓ 猜中" : "✗ 猜错";
        resultHtml=`<div class="casino-result ${cls}">你押：<b>${yourPickText}</b> · 开奖：<b>${st.outcomeText}</b>（${verdictText}）· ${delta} Factos<small>${b.reveal}</small></div>`;
      }
      return `<div class="casino-card ${st&&st.resolved?'resolved':''}">
        <div class="casino-q">${b.q}</div>
        ${st&&st.resolved ? '' : `
        <div class="casino-odds-row">
          <button class="casino-pick ${st&&st.pick==='a'?'selected':''}" data-i="${i}" data-pick="a">${b.a}<small>赔率 ${b.odds}×</small></button>
          <button class="casino-pick ${st&&st.pick==='b'?'selected':''}" data-i="${i}" data-pick="b">${b.b}<small>赔率 ${(1/(1-1/b.odds)).toFixed(2)}×</small></button>
        </div>
        <div class="casino-bet-row">
          <div class="casino-stake">
            下注:<input type="number" min="10" max="${balance}" value="${st?st.stake:50}" data-i="${i}">
            <span class="chip" data-i="${i}" data-amt="50">50</span>
            <span class="chip" data-i="${i}" data-amt="100">100</span>
            <span class="chip" data-i="${i}" data-amt="500">500</span>
            <span class="chip" data-i="${i}" data-amt="all">梭哈</span>
          </div>
          <button class="casino-place ${st&&st.pick?'':'disabled'}" data-i="${i}" ${st&&st.pick?'':'disabled'}>下注</button>
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
    if(!st||!st.pick){ flashHint("先选一个选项"); return; }
    if(st.resolved) return;
    const stake=Math.max(10,Math.min(balance, st.stake||50));
    if(stake>balance){ flashHint("余额不足"); return; }
    balance-=stake;
    // 开奖：按 hist 概率决定 a 是否「发生」
    const aHappened = Math.random() < bet.hist;
    const userPickIsA = (st.pick==="a");
    const won = (aHappened===userPickIsA);
    const odds = userPickIsA ? bet.odds : (1/(1-1/bet.odds));
    const payout = won ? Math.round(stake*odds) : 0;
    if(won){ balance+=payout; wins++; } else { losses++; }
    states[i]={resolved:true, won, stake, payout, outcomeText: aHappened?bet.a:bet.b, pick:st.pick};
    addHistory(bet.q, st.pick==="a"?bet.a:bet.b, won, payout, stake);
    save();
    render();
  }

  function flashHint(msg){
    const t=document.createElement("div");
    t.textContent=msg;
    t.style.cssText="position:fixed;left:50%;top:20%;transform:translateX(-50%);background:#ff1744;color:#fff;padding:10px 20px;border-radius:4px;font-family:var(--mono);font-size:13px;z-index:9999;animation:casinoFlash 1.6s forwards";
    document.body.appendChild(t);
    setTimeout(()=>t.remove(),1600);
  }
  // 注入一次性 flash 动画样式
  if(!document.getElementById("casinoFlashStyle")){
    const s=document.createElement("style");
    s.id="casinoFlashStyle";
    s.textContent="@keyframes casinoFlash{0%{opacity:0;transform:translate(-50%,-10px)}15%{opacity:1}85%{opacity:1}100%{opacity:0;transform:translate(-50%,-20px)}}";
    document.head.appendChild(s);
  }

  function addHistory(q,pickText,won,payout,stake){
    const empty=histEl.querySelector(".casino-history-empty");
    if(empty) empty.remove();
    const row=document.createElement("div");
    row.className="casino-history-row";
    const qshort=q.slice(0,16)+(q.length>16?"…":"");
    const res = won?`<span class="win">+${payout}</span>`:`<span class="lose">-${stake}</span>`;
    row.innerHTML=`<span>${qshort} 押「${pickText}」</span>${res}`;
    histEl.appendChild(row);
    histEl.scrollTop=histEl.scrollHeight;
  }

  // 事件委托
  board.addEventListener("click",e=>{
    const t=e.target.closest("[data-i]");
    if(!t) return;
    const i=+t.dataset.i;
    if(t.classList.contains("casino-pick")){ setPick(i,t.dataset.pick); render(); }
    else if(t.classList.contains("chip")){ setStake(i,t.dataset.amt); render(); }
    else if(t.classList.contains("casino-place")){ placeBet(i); }
  });
  board.addEventListener("input",e=>{
    if(e.target.matches("input[type=number]")){ setStake(+e.target.dataset.i, e.target.value); }
  });
  resetBtn.addEventListener("click",()=>{
    balance=1000; wins=0; losses=0; states.fill(null);
    histEl.innerHTML='<div class="casino-history-title">// 投注记录</div><div class="casino-history-empty">还没有投注。下注后这里会显示开奖流水。</div>';
    save(); render();
  });

  render();
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

  wrap.innerHTML=persona.map(ev=>{
    const yr=String(ev.date||"").match(/(\d{4})/);
    const year=yr?yr[1]:"—";
    return `<div class="persona-item" data-id="${ev.id}">
      <div class="persona-year">${year} · №${String(ev.id).padStart(3,"0")}</div>
      <div class="persona-card">
        <h4>${ev.title}</h4>
        <p>${ev.summary}</p>
        <span class="persona-tag">${ev.catLabel}</span>
      </div>
    </div>`;
  }).join("");

  // 点击展开
  wrap.querySelectorAll(".persona-card").forEach(card=>{
    card.addEventListener("click",()=>{
      const id=parseInt(card.parentElement.dataset.id,10);
      let list=currentList.length?currentList:events;
      let idx=list.findIndex(e=>e.id===id);
      if(idx<0){ list=events; idx=list.findIndex(e=>e.id===id); }
      if(idx>=0) openModalByIdx(idx);
    });
  });

  // 入场动画：滚入视口时加 .in
  const obs=new IntersectionObserver((ents)=>{
    ents.forEach(en=>{
      if(en.isIntersecting){ en.target.classList.add("in"); obs.unobserve(en.target); }
    });
  },{threshold:.15});
  wrap.querySelectorAll(".persona-item").forEach(el=>obs.observe(el));
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
  const PRESET_DANMU=[
    "六届世界杯，零座奖杯",
    "Factos! Factos! Factos!",
    "SIUUUUU（空荡的球场里）",
    "点球进了！含金量？",
    "我就是历史第一第二第三",
    "问心无愧.jpg",
    "沙特4年1冠，沙漠骆驼",
    "背弃祖姓，蹭大罗热度",
    "摔手机、摔袖标、摔麦克风",
    "The King leaves without his crown",
    "再见阿伟罗",
    "球玊=球王+一点（球）"
  ];
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
    PRESET_DANMU.forEach((t,i)=>{
      setTimeout(()=>launchDanmu(t,PRESET_COLORS[i%PRESET_COLORS.length]), i*700+400);
    });
  }
  seedPreset();
  // 循环：每 1.5s 从「预设+用户」池里随机再发一条，保持墙不空
  setInterval(()=>{
    if(document.hidden) return;
    const pool=[...PRESET_DANMU.map((t,i)=>({text:t,color:PRESET_COLORS[i%PRESET_COLORS.length]})), ...myDanmu];
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
  const PROMPTS=[
    "输球后，C 罗 第一件事是___",
    "C 罗 打开 ins，第一张照片必须是___",
    "梅西夺冠那天，C 罗 在___",
    "C 罗 说「问心无愧」，翻译成人话是___",
    "如果给 C 罗 的点球写个说明书，第一条是___",
    "C 罗 退役那天，他会先___",
    "沙特给了 C 罗 2亿，C 罗 给了沙特___",
    "C 罗 照镜子时，镜子里的人是___"
  ];
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
    curPromptIdx=Math.floor(Math.random()*PROMPTS.length);
    const p=PROMPTS[curPromptIdx];
    // 把 ___ 替换成可视的空位
    promptEl.innerHTML=p.replace("___",'<span class="blank">______</span>');
    renderJokes();
  }
  function renderJokes(){
    const key=curPromptIdx;
    const arr=(jokes[key]||[]).slice().sort((a,b)=>b.likes-a.likes).slice(0,12);
    if(arr.length===0){
      plList.innerHTML='<div class="punchline-empty">还没有人接这句。来当第一个。</div>';
      return;
    }
    plList.innerHTML=arr.map((j,i)=>{
      const id=j.t;
      const liked=likedSet.has(id);
      return `<div class="punchline-item">
        <span class="pl-prompt">${PROMPTS[key].replace("___","")}<span class="pl-fill">${escapeHtml(j.fill)}</span></span>
        <button class="pl-like ${liked?'liked':''}" data-id="${id}">👍 ${j.likes}</button>
      </div>`;
    }).join("");
  }
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
    {id:"firstlook", icon:"👁️", name:"初窥档案", desc:"打开第一份卷宗", test:st=>st.read>=1},
    {id:"voracious", icon:"📚", name:"档案老饕", desc:"阅读 10 份卷宗", test:st=>st.read>=10},
    {id:"completist", icon:"🗂️", name:"档案强迫症", desc:"阅读 25 份卷宗", test:st=>st.read>=25},
    {id:"quizzer",   icon:"🎯", name:"罗黑见习", desc:"完成罗黑测试", test:st=>st.quizDone},
    {id:"scholar",   icon:"🧠", name:"骨灰级罗黑", desc:"测试满分", test:st=>st.quizPct===1},
    {id:"gacha",     icon:"🎰", name:"盲盒开箱", desc:"抽取并下载通缉令", test:st=>st.blindbox},
    {id:"explorer",  icon:"🗺️", name:"环球追踪", desc:"查看争议地图任意标点", test:st=>st.mapClick},
    {id:"narrative", icon:"📖", name:"编年通读", desc:"浏览人设编年史到底", test:st=>st.personaEnd},
    {id:"roaster",   icon:"🔥", name:"罗黑开火", desc:"弹幕墙发弹幕或段子接龙投稿", test:st=>st.wall},
    {id:"ottoman",   icon:"OTTOMAN", name:"首席档案官", desc:"集齐以上九枚", test:st=>st._unlocked>=9},
  ];

  const state={read:0,quizDone:false,quizPct:0,blindbox:false,mapClick:false,personaEnd:false,wall:false,_unlocked:0};
  const unlocked=new Set();
  // 持久化
  try{
    const saved=JSON.parse(localStorage.getItem("ca7_badges")||"null");
    if(saved && Array.isArray(saved.unlocked)) saved.unlocked.forEach(id=>unlocked.add(id));
  }catch(e){}

  function render(){
    grid.innerHTML=defs.map(d=>{
      const on=unlocked.has(d.id);
      return `<div class="badge ${on?"unlocked":""}" data-id="${d.id}">
        <div class="badge-icon">${d.icon}</div>
        <div class="badge-name">${d.name}</div>
        <div class="badge-desc">${d.desc}</div>
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
    document.getElementById("badgeToastTitle").textContent="解锁 · "+def.name;
    document.getElementById("badgeToastDesc").textContent=def.desc;
    toast.classList.add("show");
    clearTimeout(showToast._t);
    showToast._t=setTimeout(()=>{
      toast.classList.remove("show");
      setTimeout(()=>toast.hidden=true,500);
    },3200);
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
      try{ localStorage.setItem("ca7_badges",JSON.stringify({unlocked:[...unlocked]})); }catch(e){}
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
  };

  // 监听地图点击（地图模块完成后挂载）
  document.addEventListener("click",e=>{
    if(e.target.closest(".worldmap-pinned")) window.__badge("map");
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
    if(window.__badge) window.__badge("siu");
  }

  fab.addEventListener("click",fire);
})();

/* ========== 初始渲染 ========== */
renderCards();
})();
