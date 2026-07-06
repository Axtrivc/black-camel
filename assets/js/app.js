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

  currentList.forEach((e,idx)=>{
    const card = document.createElement("div");
    card.className = `event-card cat-${e.cat}`;
    card.style.animationDelay = (idx * 0.05) + "s";
    let dots = "";
    for(let i=0;i<5;i++){
      dots += `<span class="dot ${i<e.severity?'on':''}"></span>`;
    }
    card.innerHTML = `
      <div class="card-img">
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
}

function renderModal(){
  const e = currentList[modalIdx];
  if(!e) return;
  let dots = "";
  for(let i=0;i<5;i++){
    dots += `<span class="dot ${i<e.severity?'on':''}"></span>`;
  }
  const detailHtml = e.detail.map(p=>`<p>${p}</p>`).join("");
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
  // 渲染维度 tabs
  tabs.innerHTML=pkData.map((d,i)=>`<button class="pk-tab ${i===0?'active':''}" data-idx="${i}">${d.label}</button>`).join("");
  function render(){
    const d=pkData[curIdx];
    // 渲染两侧：loser 方（黑点更重/被讽刺方）打上 loser 类高亮
    sides.innerHTML=`
      <div class="pk-side cr7 ${d.loser==='cr7'?'loser':''}">
        <div class="pk-name">C 罗</div>
        <div class="pk-subname">CRISTIANO · CA7</div>
        <div class="pk-val">${d.cr7.val}</div>
        <div class="pk-note">${d.cr7.note}</div>
      </div>
      <div class="pk-side messi ${d.loser==='messi'?'loser':''}">
        <div class="pk-name">梅西</div>
        <div class="pk-subname">MESSI</div>
        <div class="pk-val">${d.messi.val}</div>
        <div class="pk-note">${d.messi.note}</div>
      </div>`;
    tip.innerHTML=`<strong>${d.tip}</strong>`;
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

/* ========== 初始渲染 ========== */
renderCards();
})();
