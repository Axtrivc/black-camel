/*
 * fetch-wiki.cjs — 从维基百科抓取 C罗/梅西 最新数据，更新 extra-data.js
 *
 * 数据源：
 *   - Action API (wikitext)：生涯各俱乐部进球(goals1-N)、国家队进球
 *   - REST summary：金球数（从 extract 正则解析 "five/eight Ballon d'Or"）
 *
 * 由 GitHub Actions 定时调用（每天 06:00 UTC）。也支持本地手动：node scripts/fetch-wiki.cjs
 * 本地运行如需代理：HTTPS_PROXY=http://127.0.0.1:10808 node scripts/fetch-wiki.cjs
 */
"use strict";
const https=require('https');
const fs=require('fs');
const path=require('path');

// 代理支持（本地用，CI 不需要）
let proxy=process.env.HTTPS_PROXY||process.env.https_proxy||'';
const HttpsProxyAgent=proxy?require('./_proxy-agent.cjs'):null;

function fetch(url){
  return new Promise((resolve,reject)=>{
    const opts={headers:{'User-Agent':'CA7-ArchiveBot/1.0 (https://github.com/Axtrivc/black-camel; educational fan site)'}};
    if(proxy&&HttpsProxyAgent) opts.agent=new HttpsProxyAgent(proxy);
    https.get(url,opts,res=>{
      let d='';res.on('data',c=>d+=c);res.on('end',()=>resolve(d));
    }).on('error',reject);
  });
}

// 英文数字 → 阿拉伯数字
const wordNum={zero:0,one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10,eleven:11,twelve:12};
function wordToNum(w){return wordNum[w.toLowerCase()]!==undefined?wordNum[w.toLowerCase()]:null;}

async function getWikitext(page){
  const url=`https://en.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(page)}&prop=wikitext&format=json`;
  const raw=await fetch(url);
  const j=JSON.parse(raw);
  return j.parse.wikitext['*'];
}

async function getSummary(page){
  const url=`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(page)}`;
  const raw=await fetch(url);
  return JSON.parse(raw).extract||'';
}

// 从 wikitext 提取：生涯俱乐部进球总数 + 国家队进球
function parseStats(wikitext){
  const goalsMatches=wikitext.match(/\|\s*goals\d+\s*=\s*\d+/gi)||[];
  const clubGoals=goalsMatches.reduce((s,m)=>s+parseInt(m.match(/\d+$/)[0]),0);
  const natMatch=wikitext.match(/international goals scored by [^|]+\|(\d+)/i);
  const natGoals=natMatch?parseInt(natMatch[1]):null;
  const capsMatch=wikitext.match(/international caps earned by [^|]+\|(\d+)/i);
  const natCaps=capsMatch?parseInt(capsMatch[1]):null;
  return {clubGoals,natGoals,natCaps,totalGoals:(natGoals!==null)?clubGoals+natGoals:clubGoals};
}

// 从 summary extract 提取金球数（支持单复数 Ballon(s) d'Or）
function parseBallonDor(extract){
  const m=extract.match(/(five|six|seven|eight|nine|ten|four|three|two|one|\d+)\s+Ballons?\s*d['\s.]?Or/i);
  if(m){const w=wordToNum(m[1]);if(w!==null)return w;const n=parseInt(m[1]);if(!isNaN(n))return n;}
  return null;
}

// 从 extract 提取欧洲金靴数
function parseGoldenShoe(extract){
  const m=extract.match(/(five|six|seven|eight|nine|ten|four|three|two|one|\d+)\s+European Golden Shoe/i);
  if(m){const w=wordToNum(m[1]);if(w!==null)return w;const n=parseInt(m[1]);if(!isNaN(n))return n;}
  return null;
}

async function fetchPlayer(page,name){
  const [wt,sum]=await Promise.all([getWikitext(page),getSummary(page)]);
  const stats=parseStats(wt);
  const ballon=parseBallonDor(sum);
  const shoe=parseGoldenShoe(sum);
  console.log(`[${name}] 俱乐部${stats.clubGoals} 国家队${stats.natGoals} 生涯${stats.totalGoals} 金球${ballon} 金靴${shoe}`);
  return {name,...stats,ballon,shoe};
}

// 更新 extra-data.js 里的梅罗 PK 数据
function updateExtraData(cr7,messi){
  const p=path.join(__dirname,'..','assets','js','extra-data.js');
  let src=fs.readFileSync(p,'utf8');
  let changed=[];

  // 生涯总进球（PK 没这个维度，但点球检测有"生涯点球"——保持不变）
  // 这里更新 PK 里可由维基驱动的维度：金球
  const replace=(re,newStr,label)=>{
    if(re.test(src)){src=src.replace(re,newStr);changed.push(label);}
  };

  // 金球奖维度：cr7.val 和 messi.val
  if(cr7.ballon&&messi.ballon){
    replace(/(id:"ballondor"[\s\S]*?cr7:\{val:)\d+/,'$1'+cr7.ballon,'C罗金球');
    replace(/(id:"ballondor"[\s\S]*?messi:\{val:)\d+/,'$1'+messi.ballon,'梅西金球');
    // tip 同步
    replace(/(id:"ballondor"[\s\S]*?tip:")5 : 8[^"]*"/,'$1'+cr7.ballon+' : '+messi.ballon+'，金球数落后'+(messi.ballon-cr7.ballon)+' 座"','金球tip');
  }

  // 写一个数据快照注释（顶部），记录抓取时间和原始数字
  const ts=new Date().toISOString().slice(0,10);
  const snap=`/* AUTO-UPDATE ${ts}: CR7 生涯${cr7.totalGoals}(俱乐部${cr7.clubGoals}+国家队${cr7.natGoals}) 金球${cr7.ballon} 金靴${cr7.shoe} | Messi 生涯${messi.totalGoals}(俱乐部${messi.clubGoals}+国家队${messi.natGoals}) 金球${messi.ballon} */`;
  // 在文件第一个 /* 后插入（若已有则替换）
  if(/AUTO-UPDATE \d{4}-\d{2}-\d{2}/.test(src)){
    src=src.replace(/\/\* AUTO-UPDATE[\s\S]*?\*\//,snap);
  }else{
    src=snap+'\n'+src;
  }

  fs.writeFileSync(p,src,'utf8');
  return changed;
}

(async()=>{
  try{
    console.log('开始抓取维基百科...');
    const [cr7,messi]=await Promise.all([
      fetchPlayer('Cristiano_Ronaldo','C罗'),
      fetchPlayer('Lionel_Messi','梅西')
    ]);
    console.log('---');
    const changed=updateExtraData(cr7,messi);
    console.log('更新字段:',changed.length?changed:'无变化（数字未变）');
    // 输出汇总供 CI 日志查看
    const summary={fetchedAt:new Date().toISOString(),cr7,messi,changed};
    fs.writeFileSync(path.join(__dirname,'last-fetch.json'),JSON.stringify(summary,null,2));
    console.log('✓ 完成。快照: scripts/last-fetch.json');
  }catch(e){
    console.error('抓取失败:',e.message);
    process.exit(1);
  }
})();
