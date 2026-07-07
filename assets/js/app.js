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
        <img src="${e.img||''}" alt="${e.title}" loading="lazy" data-cat-label="${e.catLabel}">
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
      <img src="${e.img||''}" alt="${e.title}" data-cat-label="${e.catLabel}">
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
  slide.innerHTML=`<img src="assets/images/hero-mo/mo-${String(n).padStart(2,"0")}.jpg" alt="CR7 嬷照 ${n}" loading="${idx<3?'eager':'lazy'}">`;
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

/* ========== 🚨 BREAKING 头条：点击展开第 63 号卷宗 ========== */
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
  // 缩略图
  thumbs.innerHTML=memePhotos.map((p,i)=>`<div class="meme-thumb ${i===0?'active':''}" data-src="${p}" style="background-image:url('${p}')"></div>`).join("");
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
  img.onload=draw; img.src=curPhoto;
  thumbs.addEventListener("click",e=>{
    const t=e.target.closest(".meme-thumb"); if(!t) return;
    curPhoto=t.dataset.src;
    thumbs.querySelectorAll(".meme-thumb").forEach(x=>x.classList.toggle("active",x===t));
    img=new Image(); img.onload=draw; img.src=curPhoto;
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
     都汇入此处。素材优先级：cr7 真人视频 (assets/videos/siu.mp4) > 图片 > 原创矢量。 */
  function playSIU(){
    window.__siuCelebration();
  }
  // 探测视频是否可用（启动时异步）
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
    // 素材优先级：视频 > 图片 > 矢量。无「SIU!」文字，纯画面。
    let figureHtml;
    if(siuVideoOk){
      // cr7 真人 SIU 视频：放一遍后随覆盖层一起渐变消失（不影响阅读）
      figureHtml=`<div class="siu-figure siu-figure-video" aria-hidden="true">
        <video src="assets/videos/siu.mp4" autoplay muted playsinline preload="auto"></video>
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
      // 兜底：视频可能不触发 ended（某些浏览器自动循环），2.5s 后强制淡出
      setTimeout(fadeOut,2500);
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

/* ========== 争议世界地图 ========== */
(function worldmapModule(){
  const svg=document.getElementById("worldmapSvg");
  const tip=document.getElementById("worldmapTip");
  const wrap=document.getElementById("worldmap");
  if(!svg) return;

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
    // 提取关键词逐个匹配
    const keys=Object.keys(regions);
    for(const k of keys){
      if(loc.indexOf(k)>=0) return regions[k];
    }
    return null;
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

  Object.values(buckets).forEach(b=>{
    // 取该点最严重的事件代表颜色
    const topSev=b.items.reduce((m,e)=>Math.max(m,e.severity||2),2);
    const color=sevColor[topSev]||sevColor[2];
    const r=4+Math.min(b.items.length,5); // 点大小随数量

    const g=document.createElementNS(ns,"g");
    g.setAttribute("class","worldmap-pinned");
    g.setAttribute("transform",`translate(${b.x},${b.y})`);

    const halo=document.createElementNS(ns,"circle");
    halo.setAttribute("class","halo");halo.setAttribute("r",r);
    halo.setAttribute("fill",color);
    g.appendChild(halo);

    const dot=document.createElementNS(ns,"circle");
    dot.setAttribute("class","dot");dot.setAttribute("r",r);
    dot.setAttribute("fill",color);dot.setAttribute("color",color);
    g.appendChild(dot);

    // 标注数量（>1时）
    if(b.items.length>1){
      const t=document.createElementNS(ns,"text");
      t.setAttribute("text-anchor","middle");
      t.setAttribute("y",r+12);
      t.setAttribute("fill","#7a7a82");
      t.setAttribute("font-size","9");
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
      // 点击展开该地事件列表中的第一条
      const ev=b.items[0];
      let list=currentList.length?currentList:events;
      let idx=list.findIndex(e=>e.id===ev.id);
      if(idx<0){ list=events; idx=list.findIndex(e=>e.id===ev.id); }
      if(idx>=0) openModalByIdx(idx);
    });

    svg.appendChild(g);
  });

  function moveTip(e){
    const rect=wrap.getBoundingClientRect();
    tip.style.left=(e.clientX-rect.left)+"px";
    tip.style.top=(e.clientY-rect.top)+"px";
  }
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
    {id:"ottoman",   icon:"OTTOMAN", name:"首席档案官", desc:"集齐以上八枚", test:st=>st._unlocked>=8},
  ];

  const state={read:0,quizDone:false,quizPct:0,blindbox:false,mapClick:false,personaEnd:false,_unlocked:0};
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
  probeSequential(imgCandidates).then(u=>{ if(u){ imgUrl=u; window.__siuImg=u; } });

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
