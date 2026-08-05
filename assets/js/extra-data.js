/* 数据快照 2026-07: CR7 金球5 金靴4 | Messi 金球8 · 生涯进球数据持续更新，以 events/timeline 为准 */
/*
 * extra-data.js — CA7 黑历史档案馆 创意模块数据层
 * 依赖：无（纯数据）。被 app.js 顺序加载后使用。
 * 提供：pkData, penaltyData, moneyLedger, memePresets, memePhotos
 */
"use strict";

/* ========== 梅罗 PK 大战数据 ==========
 * 这是一个讽刺 C罗的黑历史网站。
 * 字段 loser：表示该维度下"黑点更重 / 被讽刺"的一方（绝大部分是 cr7）。
 * 数据驱动：哪一方数值代表"更差/更黑"，就把该方标为 loser。
 * tip 的措辞统一为讽刺口吻。
 */
const pkData = [
  {
    id:"redcard",
    label:"生涯红牌数", labelEn:"Career red cards",
    sub:"谁更暴力？", subEn:"Who's more violent?",
    cr7:{val:14,note:"曼联4 + 皇马6 + 尤文1 + 利雅得胜利1 + 葡萄牙1 + 其他未确认1",noteEn:"Man Utd 4 + Real Madrid 6 + Juve 1 + Al Nassr 1 + Portugal 1 + other 1"},
    messi:{val:3,note:"含2005首秀43秒红牌",noteEn:"Including the 43-second red on his 2005 debut"},
    loser:"cr7",
    tip:"14 : 3，C罗的红牌是梅西的近 5 倍", tipEn:"14 : 3 — Cristiano has nearly 5x Messi's red cards"
  },
  {
    id:"wc",
    label:"世界杯淘汰赛进球", labelEn:"World Cup knockout goals",
    sub:"六届世界杯的真实答卷", subEn:"The real report card across six World Cups",
    cr7:{val:1,note:"六届世界杯淘汰赛 9 场仅 1 球（2026 破零后被西班牙补时绝杀淘汰）",noteEn:"1 goal in 9 knockout games across six World Cups (broke the duck in 2026, then knocked out by Spain's stoppage winner)"},
    messi:{val:8,note:"2022 决赛封王，多届淘汰赛建功",noteEn:"Crowned in the 2022 final; decisive across multiple knockout runs"},
    loser:"cr7",
    tip:"9 场淘汰赛仅 1 球 vs 梅西 2022 夺冠", tipEn:"1 goal in 9 knockout games vs Messi's 2022 title"
  },
  {
    id:"penalty",
    label:"生涯点球进球数", labelEn:"Career penalty goals",
    sub:"点球依赖度", subEn:"Penalty dependency",
    cr7:{val:175,note:"主罚 208 次，占生涯进球近 1/6",noteEn:"Took 208, ~1/6 of his career goals"},
    messi:{val:109,note:"主罚约 140 次",noteEn:"Took around 140"},
    loser:"cr7",
    tip:"比梅西多踢进 66 个点球", tipEn:"66 more penalties scored than Messi"
  },
  {
    id:"firsttitle",
    label:"新东家首冠耗时(天)", labelEn:"Days to first title at new club",
    sub:"沙特 vs 迈阿密", subEn:"Saudi vs Miami",
    cr7:{val:1460,note:"利雅得胜利 ≈ 4 年才拿联赛冠军",noteEn:"Al Nassr — ~4 years to win the league"},
    messi:{val:30,note:"迈阿密国际 ≈ 1 个月即夺联赛杯",noteEn:"Inter Miami — ~1 month to win Leagues Cup"},
    loser:"cr7",
    tip:"1460 天 vs 30 天，慢了 48 倍", tipEn:"1460 days vs 30 days — 48x slower"
  },
  {
    id:"ballondor",
    label:"金球奖次数", labelEn:"Ballon d'Or wins",
    sub:"个人最高荣誉", subEn:"The top individual honour",
    cr7:{val:5,note:"2008/2013/2014/2016/2017",noteEn:"2008/2013/2014/2016/2017"},
    messi:{val:8,note:"2009-2023 共 8 座",noteEn:"8 in total, 2009–2023"},
    loser:"cr7",
    tip:"5 : 8，金球数落后3 座", tipEn:"5 : 8 — three Ballon d'Ors behind"
  },
  {
    id:"freekick",
    label:"近年任意球荒(天)", labelEn:"Recent free-kick drought (days)",
    sub:"招牌技能的保质期", subEn:"Shelf life of the signature skill",
    cr7:{val:600,note:"联赛 59 次尝试零进球",noteEn:"0 goals from 59 league attempts"},
    messi:{val:50,note:"2022 世界杯对尼日利亚任意球中柱",noteEn:"Hit the post with a free kick vs Nigeria at the 2022 World Cup"},
    loser:"cr7",
    tip:"600 天 0 球 vs 梅西仍能造威胁", tipEn:"600 days, 0 goals vs Messi still creating danger"
  },
  {
    id:"weakteam",
    label:"国家队刷弱旅进球", labelEn:"National-team goals vs minnows",
    sub:"含金量试金石", subEn:"The quality litmus test",
    cr7:{val:25,note:"卢森堡 11 + 立陶宛 7 + 瑞典 7",noteEn:"Luxembourg 11 + Lithuania 7 + Sweden 7"},
    messi:{val:10,note:"主要对手为南美强队",noteEn:"Main opponents are strong South American sides"},
    loser:"cr7",
    tip:"单是对卢森堡就刷了 11 个", tipEn:"11 goals against Luxembourg alone"
  },
  {
    id:"diving",
    label:"\"跳水\"名场面", labelEn:"\"Diving\" highlights",
    sub:"假摔黑历史", subEn:"Simulation dark history",
    cr7:{val:99,note:"2006世界杯假摔、英媒封「跳水王」，绰号「水罗」",noteEn:"2006 World Cup dive; English media dubbed him \"Diver\" / \"Penaldo\""},
    messi:{val:12,note:"偶有倒地争议，但从未形成绰号",noteEn:"Occasional fall controversy, but never earned a nickname"},
    loser:"cr7",
    tip:"「水罗」vs 梅西无此梗", tipEn:"\"Penaldo\" vs Messi — no such meme"
  }
];

/* ========== 点球含金量检测仪数据 ==========
 * 每个 item 是一项"注水"指标，含金量越低讽刺越重
 */
const penaltyData = {
  items:[
    {label:"生涯点球进球",labelEn:"Career penalty goals",value:"175",valueEn:"175",unit:"个",unitEn:"goals",note:"占生涯进球近 1/6，主罚 208 次",noteEn:"~1/6 of career goals; took 208",score:18},
    {label:"国家队刷弱旅",labelEn:"Minnow-padding for country",value:"卢森堡 11 球",valueEn:"11 vs Luxembourg",unit:"",unitEn:"",note:"立陶宛/瑞典各 7，含大四喜",noteEn:"Lithuania/Sweden 7 each, including a four-goal haul",score:22},
    {label:"沙特征服速度",labelEn:"Saudi conquest speed",value:"4 年 1 冠",valueEn:"4 yrs, 1 title",unit:"",unitEn:"",note:"对比梅西迈阿密 1 个月即夺冠",noteEn:"Compare Messi winning with Miami in 1 month",score:15},
    {label:"任意球荒",labelEn:"Free-kick drought",value:"600 天",valueEn:"600 days",unit:"0 球",unitEn:"0 goals",note:"联赛 59 次尝试零进球",noteEn:"0 from 59 league attempts",score:20},
    {label:"世界杯淘汰赛",labelEn:"World Cup knockouts",value:"9场1球",valueEn:"9 games, 1 goal",unit:"",unitEn:"",note:"六届世界杯淘汰赛仅 1 球，2026 破零后被西班牙补时绝杀淘汰",noteEn:"1 goal in 9 knockout games across six World Cups; broke the duck in 2026 then was knocked out by Spain's stoppage winner",score:14},
    {label:"欧冠淘汰赛隐身",labelEn:"Champions League invisibility",value:"近 5 年",valueEn:"Past 5 years",unit:"",unitEn:"",note:"多次关键战 0 射正或被换下",noteEn:"Multiple key games with 0 shots on target or subbed off",score:25},
    {label:"社交媒体含水量",labelEn:"Social-media water content",value:"24.3%",valueEn:"24.3%",unit:"假粉",unitEn:"fake followers",note:"6亿粉中约 5020 万~1 亿假粉",noteEn:"Of 600M followers, ~50–100M are fake",score:25},
    {label:"单赛季射门垄断",labelEn:"Single-season shot monopoly",value:"135 次",valueEn:"135 shots",unit:"",unitEn:"",note:"贝尔 50 + 本泽马 60 = 不及他一人",noteEn:"Bale 50 + Benzema 60 = still less than him alone",score:20},
    {label:"沙特点球占比",labelEn:"Saudi penalty share",value:"35 球含点",valueEn:"35 incl. pens",unit:"",unitEn:"",note:"2023/24 赛季大量来自点球",noteEn:"A large chunk of 2023/24 goals came from penalties",score:18}
  ],
  totalScore:16,  // 综合含金量评分（独立设定，非 items.score 聚合；items.score 为各项参考分，保留备用）
  totalLabel:"综合含金量", totalLabelEn:"Overall Purity"
};

/* ========== 罪恶账本烧钱榜 ==========
 * 金额从大到小，单位统一处理
 */
const moneyLedger = [
  {amount:"40 亿",currency:"$",desc:"可口可乐市值蒸发",descEn:"Coca-Cola market-cap wipeout",detail:"2020欧洲杯移走两瓶可乐，股价 56.10 → 55.22",detailEn:"Euro 2020 — moved two Coke bottles, stock 56.10 → 55.22",cat:"场外",catEn:"Off-pitch"},
  {amount:"10 亿",currency:"$",desc:"生涯总收入",descEn:"Career total earnings",detail:"史上首位团队运动破 10 亿美元的足球运动员",detailEn:"First team-sport footballer to surpass $1 billion in career earnings",cat:"金钱",catEn:"Money"},
  {amount:"2 亿",currency:"€",desc:"利雅得胜利年薪",descEn:"Al Nassr yearly salary",detail:"远走沙特，被讽\"去沙漠养老\"",detailEn:"Fled to Saudi, mocked as \"going to the desert to retire\"",cat:"金钱",catEn:"Money"},
  {amount:"1880 万",currency:"€",desc:"西班牙逃税罚款",descEn:"Spanish tax-fraud fine",detail:"税款+利息+罚金（对比梅西仅 410 万）",detailEn:"Tax + interest + penalty (vs just €4.1M for Messi)",cat:"法律",catEn:"Legal"},
  {amount:"1 亿",currency:"€",desc:"转会尤文图斯身价",descEn:"Juventus transfer fee",detail:"33 岁天价转会",detailEn:"A blockbuster transfer at age 33",cat:"金钱",catEn:"Money"},
  {amount:"37.5 万",currency:"$",desc:"拉斯维加斯封口费",descEn:"Las Vegas hush money",detail:"2009 年事件，事后封口",detailEn:"2009 incident, paid afterwards to keep silent",cat:"法律",catEn:"Legal"},
  {amount:"1400 万",currency:"€",desc:"范尼被贱卖皇马",descEn:"Van Nistelrooy sold off cheap",detail:"因训练场冲突被低价处理",detailEn:"Offloaded cheaply after a training-ground clash",cat:"冲突",catEn:"Conflict"},
  {amount:"6.4 万",currency:"€",desc:"摔掉的队长袖标拍卖价",descEn:"Tossed armband auction price",detail:"救 SMA 婴儿，因祸得福",detailEn:"Funded treatment for a baby with SMA — a silver lining",cat:"冲突",catEn:"Conflict"},
  {amount:"5 万",currency:"£",desc:"摔手机足总罚款",descEn:"FA fine for smashing a phone",detail:"+ 2 场禁赛",detailEn:"+ 2-match ban",cat:"冲突",catEn:"Conflict"}
];

/* ========== C罗表情生成器素材 ==========
 * memePhotos: 嬷照底图池 —— 从 hero-mo 全部 37 张 + 部分绰号/事件图，保证多样性
 * memePresets: 预设讽刺金句（上下两行，meme 经典格式）
 */
const memePhotos = [
  // hero-mo 全部 37 张嬷照
  "assets/images/hero-mo/mo-01.jpg","assets/images/hero-mo/mo-02.jpg","assets/images/hero-mo/mo-03.jpg",
  "assets/images/hero-mo/mo-04.jpg","assets/images/hero-mo/mo-05.jpg","assets/images/hero-mo/mo-06.jpg",
  "assets/images/hero-mo/mo-07.jpg","assets/images/hero-mo/mo-08.jpg","assets/images/hero-mo/mo-09.jpg",
  "assets/images/hero-mo/mo-10.jpg","assets/images/hero-mo/mo-11.jpg","assets/images/hero-mo/mo-12.jpg",
  "assets/images/hero-mo/mo-13.jpg","assets/images/hero-mo/mo-14.jpg","assets/images/hero-mo/mo-15.jpg",
  "assets/images/hero-mo/mo-16.jpg","assets/images/hero-mo/mo-17.jpg","assets/images/hero-mo/mo-18.jpg",
  "assets/images/hero-mo/mo-19.jpg","assets/images/hero-mo/mo-20.jpg","assets/images/hero-mo/mo-21.jpg",
  "assets/images/hero-mo/mo-22.jpg","assets/images/hero-mo/mo-23.jpg","assets/images/hero-mo/mo-24.jpg",
  "assets/images/hero-mo/mo-25.jpg","assets/images/hero-mo/mo-26.jpg","assets/images/hero-mo/mo-27.jpg",
  "assets/images/hero-mo/mo-28.jpg","assets/images/hero-mo/mo-29.jpg","assets/images/hero-mo/mo-30.jpg",
  "assets/images/hero-mo/mo-31.jpg","assets/images/hero-mo/mo-32.jpg","assets/images/hero-mo/mo-33.jpg",
  "assets/images/hero-mo/mo-34.jpg","assets/images/hero-mo/mo-35.jpg","assets/images/hero-mo/mo-36.jpg",
  "assets/images/hero-mo/mo-37.jpg",
  // 绰号图（更具表情包感）
  "assets/images/nick/nick-new-1.jpg","assets/images/nick/nick-new-2.jpg","assets/images/nick/nick-new-3.jpg",
  "assets/images/nick/nick-new-5.jpg","assets/images/nick/nick-new-7.jpg","assets/images/nick/nick-new-9.jpg",
  // 部分事件档案图（经典黑历史瞬间）
  "assets/images/report/r-18.jpg","assets/images/report/r-17.jpg","assets/images/report/r-29.jpg"
];

const memePresets = [
  {top:"我的父姓是 Aveiro",topEn:"My surname is Aveiro",bottom:"但我偏要叫 Ronaldo",bottomEn:"But I insist on Ronaldo"},
  {top:"点球进了！",topEn:"Penalty scored!",bottom:"siuuuuuuu",bottomEn:"siuuuuuuu"},
  {top:"世界杯淘汰赛 8 场才 1 球",topEn:"1 goal in 8 World Cup knockouts",bottom:"但我是历史第一第二第三",bottomEn:"But I'm the 1st, 2nd & 3rd best ever"},
  {top:"4 年才拿 1 个沙特冠",topEn:"4 years for 1 Saudi title",bottom:"沙漠骆驼不是白叫的",bottomEn:"They don't call me Desert Camel for nothing"},
  {top:"梅西拿了世界杯",topEn:"Messi won the World Cup",bottom:"Factos! Factos! Factos!",bottomEn:"Factos! Factos! Factos!"},
  {top:"我又摔了袖标/手机/麦克风",topEn:"I tossed an armband/phone/mic again",bottom:"这次是裁判的错",bottomEn:"This time it's the ref's fault"},
  {top:"14 张红牌",topEn:"14 red cards",bottom:"那都是对方挑衅",bottomEn:"They all provoked me"},
  {top:"6 亿粉丝 24% 是假的",topEn:"24% of my 600M fans are fake",bottom:"但点赞是真的",bottomEn:"But the likes are real"},
  {top:"教练不让我首发",topEn:"The coach won't start me",bottom:"我炮轰曼联然后去沙特",bottomEn:"So I blast United and head to Saudi"},
  {top:"任意球 600 天没进",topEn:"0 free-kick goals in 600 days",bottom:"我念咒了但没用",bottomEn:"I chanted but it didn't work"},
  {top:"卢森堡我进了 11 个",topEn:"I scored 11 against Luxembourg",bottom:"我是国家队历史射手王",bottomEn:"I'm the all-time national top scorer"},
  {top:"你们不尊重我",topEn:"You don't respect me",bottom:"所以我摔袖标离场",bottomEn:"So I toss my armband and leave"}
];

/* ========== 罗黑程度测试题库 ==========
 * 25 题单选大题库，每次随机抽取并打乱题序/选项，保证每局体验不同。
 * 紧扣本馆数据：红牌/世界杯/点球/跳水/金球/逃税/可口可乐/摔手机/袖标/
 * 眨眼门/利雅得/卢森堡/任意球/迷你罗/自设奖项/背弃祖姓 等。
 * a = 正确选项 index（0 起），fb = 作答后的解释反馈。
 */
const quizData = [
  {
    q:"C罗生涯红牌总数大约是多少张？", qEn:"Roughly how many red cards has Cristiano Ronaldo collected in his career?",
    opts:[
      {v:"3 张", vEn:"3"},
      {v:"8 张", vEn:"8"},
      {v:"14 张", vEn:"14"},
      {v:"20 张", vEn:"20"}
    ],
    a:2,
    fb:"正确是 14 张。曼联 4 + 皇马 6 + 尤文 1 + 利雅得胜利 1 + 葡萄牙 1 + 其他 1，是梅西（3 张）的近 5 倍。",
    fbEn:"Correct: 14. Man Utd 4 + Real Madrid 6 + Juve 1 + Al Nassr 1 + Portugal 1 + other 1 — nearly 5x Messi's 3."
  },
  {
    q:"截至 2026，C罗在世界杯淘汰赛进了几个球？", qEn:"As of 2026, how many goals has Cristiano scored in World Cup knockout matches?",
    opts:[
      {v:"0 个", vEn:"0"},
      {v:"1 个", vEn:"1"},
      {v:"3 个", vEn:"3"},
      {v:"8 个", vEn:"8"}
    ],
    a:1,
    fb:"正确是 1 个。六届世界杯淘汰赛 9 场仅 1 球——2026 1/16 决赛才破零，紧接着 1/8 决赛就被西班牙补时绝杀淘汰。对比梅西同舞台建功并 2022 夺冠。",
    fbEn:"Correct: 1. One goal in 9 knockout games across six World Cups — he finally broke the duck in the 2026 Round of 16, then was knocked out by Spain's stoppage winner in the Round of 16. Compare Messi, who delivered on the same stage and won the 2022 title."
  },
  {
    q:"C罗生涯点球进球数约为？", qEn:"Roughly how many penalties has Cristiano scored in his career?",
    opts:[
      {v:"约 50 个", vEn:"About 50"},
      {v:"约 109 个", vEn:"About 109"},
      {v:"约 175 个", vEn:"About 175"},
      {v:"约 250 个", vEn:"About 250"}
    ],
    a:2,
    fb:"正确约 175 个（主罚 208 次），占生涯进球近 1/6。梅西约 109 个，比他少 66 个点球。",
    fbEn:"Correct: about 175 (from 208 taken) — nearly 1/6 of his career goals. Messi has around 109, that's 66 fewer penalties."
  },
  {
    q:"英媒给C罗起的讽刺绰号「跳水王」，源自他什么习惯？", qEn:"The English press dubbed Cristiano \"Diver\" — what habit inspired it?",
    opts:[
      {v:"频繁假摔索要犯规", vEn:"Constantly diving to win fouls"},
      {v:"赛后跳进泳池庆祝", vEn:"Leaping into the pool to celebrate"},
      {v:"训练时跳水放松", vEn:"Diving into the pool after training"},
      {v:"跳水运动员出身", vEn:"He used to be a platform diver"}
    ],
    a:0,
    fb:"源自他频繁假摔。2006 世界杯「跳水」名场面后，被英媒封为「跳水王」，中文圈也衍生绰号「水罗」。",
    fbEn:"From his constant diving. After the infamous \"dive\" at the 2006 World Cup, the English media crowned him \"Diver\" — the Chinese sphere went with the nickname \"Water-lo\"."
  },
  {
    q:"C罗加盟利雅得胜利后，等多久才拿到首个联赛冠军？", qEn:"After joining Al Nassr, how long did Cristiano wait for his first league title?",
    opts:[
      {v:"约 1 个月", vEn:"About 1 month"},
      {v:"约半年", vEn:"About half a year"},
      {v:"约 1 年", vEn:"About 1 year"},
      {v:"约 4 年", vEn:"About 4 years"}
    ],
    a:3,
    fb:"正确约 1460 天（≈4 年）。对比梅西加盟迈阿密国际约 30 天即夺联赛杯，慢了约 48 倍。",
    fbEn:"Correct: about 1460 days (≈4 years). Compare Messi, who won the Leagues Cup with Inter Miami in around 30 days — Cristiano was ~48x slower."
  },
  {
    q:"C罗在国家队大量进球，单是对阵卢森堡就刷了几个？", qEn:"Cristiano pads his national-team tally heavily — how many has he scored against Luxembourg alone?",
    opts:[
      {v:"3 个", vEn:"3"},
      {v:"7 个", vEn:"7"},
      {v:"11 个", vEn:"11"},
      {v:"20 个", vEn:"20"}
    ],
    a:2,
    fb:"正确 11 个。对阵卢森堡 11 + 立陶宛 7 + 瑞典 7，弱旅刷分是含金量争议的核心。",
    fbEn:"Correct: 11. Luxembourg 11 + Lithuania 7 + Sweden 7 — stat-padding against minnows is the heart of the \"quality\" debate."
  },
  {
    q:"C罗近年联赛任意球「进球荒」大约持续了多久？", qEn:"Roughly how long did Cristiano's league free-kick goal drought last?",
    opts:[
      {v:"约 50 天", vEn:"About 50 days"},
      {v:"约 200 天", vEn:"About 200 days"},
      {v:"约 600 天", vEn:"About 600 days"},
      {v:"从未进过任意球", vEn:"He's never scored one"}
    ],
    a:2,
    fb:"正确约 600 天 0 球，期间联赛 59 次尝试零进球。曾经的招牌技能严重保质。",
    fbEn:"Correct: about 600 days and 0 goals, with 0 from 59 league attempts. The signature skill went seriously past its sell-by date."
  },
  {
    q:"金球奖数量，C罗 vs 梅西是？", qEn:"Ballon d'Or count — Cristiano vs Messi?",
    opts:[
      {v:"8 : 5", vEn:"8 : 5"},
      {v:"5 : 8", vEn:"5 : 8"},
      {v:"5 : 5", vEn:"5 : 5"},
      {v:"7 : 6", vEn:"7 : 6"}
    ],
    a:1,
    fb:"正确 5 : 8。C罗 5 座（2008/13/14/16/17），梅西 8 座，落后 3 座最高个人荣誉。",
    fbEn:"Correct: 5 : 8. Cristiano has 5 (2008/13/14/16/17), Messi has 8 — three behind on the top individual honour."
  },
  {
    q:"2017年C罗被西班牙法院认定的逃税金额与罚款约为？", qEn:"In 2017 the Spanish court ruled on Cristiano's tax fraud — what were the evaded amount and fine roughly?",
    opts:[
      {v:"约 200 万 / 罚款 50 万", vEn:"~€2M / €500k fine"},
      {v:"约 1470 万 / 罚款 1880 万", vEn:"~€14.7M / €18.8M fine"},
      {v:"约 5000 万 / 罚款 1 亿", vEn:"~€50M / €100M fine"},
      {v:"从未逃税", vEn:"Never evaded tax"}
    ],
    a:1,
    fb:"正确约逃税 1470 万欧元，认罪后罚款 1880 万 + 23 个月缓刑。 offshore 影子公司藏肖像权收入。",
    fbEn:"Correct: ~€14.7M evaded; after pleading guilty, an €18.8M fine + 23-month suspended sentence. Image rights were hidden via offshore shell companies."
  },
  {
    q:"2006世界杯「眨眼门」事件，C罗坑哭了哪位俱乐部队友？", qEn:"In the 2006 World Cup \"wink-gate\", which club teammate did Cristiano get sent off?",
    opts:[
      {v:"鲁尼", vEn:"Wayne Rooney"},
      {v:"吉格斯", vEn:"Ryan Giggs"},
      {v:"斯科尔斯", vEn:"Paul Scholes"},
      {v:"费迪南德", vEn:"Rio Ferdinand"}
    ],
    a:0,
    fb:"正确是鲁尼。鲁尼踩卡瓦略被罚下后，C罗对替补席眨眼示意「搞定了」，赛后英媒哗然，回英超被骂到差点离队。",
    fbEn:"Correct: Wayne Rooney. After Rooney was sent off for stomping on Carvalho, Cristiano winked at the bench as if to say \"done\". The English press erupted, and he was nearly hounded out of the Premier League on his return."
  },
  {
    q:"2021欧洲杯发布会，C罗移走可口可乐致其市值大约蒸发了多少？", qEn:"At the Euro 2021 press conference, Cristiano moved the Coke bottles — about how much market cap evaporated?",
    opts:[
      {v:"约 4000 万美元", vEn:"~$40M"},
      {v:"约 4 亿美元", vEn:"~$400M"},
      {v:"约 40 亿美元", vEn:"~$4B"},
      {v:"没影响", vEn:"No impact"}
    ],
    a:2,
    fb:"正确约 40 亿美元。一句「喝水，不要可乐」让可口可乐单日股价跳水 1.6%，市值蒸发约 40 亿。",
    fbEn:"Correct: ~$4B. One line — \"Drink water, not Coke\" — sent Coca-Cola's stock down 1.6% in a day, wiping out roughly $4B in market cap."
  },
  {
    q:"C罗在古迪逊公园摔碎的小球迷手机，那个小球迷是什么情况？", qEn:"The phone Cristiano smashed at Goodison Park belonged to a young fan — what was the situation?",
    opts:[
      {v:"成年职业球迷", vEn:"An adult pro fan"},
      {v:"自闭症小球迷", vEn:"An autistic boy"},
      {v:"客队球迷", vEn:"An away fan"},
      {v:"对方球员家属", vEn:"A relative of an opposition player"}
    ],
    a:1,
    fb:"正确是自闭症小球迷。赛后 C 罗输球恼怒，下楼时把 14 岁自闭症男孩的手机打落，遭足总禁赛 + 罚款。",
    fbEn:"Correct: an autistic boy. Furious after the loss, Cristiano slapped the phone out of the 14-year-old's hand on his way down the tunnel — the FA hit him with a ban and a fine."
  },
  {
    q:"C罗两次摔队长袖标，发生在哪个赛事？", qEn:"Cristiano threw his captain's armband twice — at which tournament?",
    opts:[
      {v:"2022 世界杯预选赛", vEn:"2022 World Cup qualifiers"},
      {v:"2021 欧洲杯", vEn:"Euro 2021"},
      {v:"2018 世界杯", vEn:"2018 World Cup"},
      {v:"2016 欧洲杯", vEn:"Euro 2016"}
    ],
    a:1,
    fb:"正确是 2021 欧洲杯。对阵塞尔维亚被吹掉绝杀球后摔袖标；对德国惨败后又一次摔掉——袖标后来被拍卖 6.4 万欧。",
    fbEn:"Correct: Euro 2021. He flung it after a late winner against Serbia was disallowed, then again after the thrashing by Germany. One of those armbands later sold at auction for €64k."
  },
  {
    q:"2016欧洲杯决赛C罗「躺冠」是怎么回事？", qEn:"What's the story behind Cristiano's \"carried to a title\" in the Euro 2016 final?",
    opts:[
      {v:"全场最佳carry夺冠", vEn:"Player of the match, carried the team"},
      {v:"25分钟伤退，在场边指挥被营销成灵魂领袖", vEn:"Off injured in 25 min, barking from the touchline, marketed as the spiritual leader"},
      {v:"替补登场绝杀", vEn:"Came off the bench and scored the winner"},
      {v:"没进大名单", vEn:"Wasn't even in the squad"}
    ],
    a:1,
    fb:"正确是 25 分钟伤退。在场边当「拉扯教练」，夺冠后被葡萄牙官方营销成第一功臣，但决赛实际贡献有限。",
    fbEn:"Correct: he went off injured in the 25th minute. He played \"coach on the sideline\", and Portuguese PR turned him into the man of the hour — but his actual contribution in the final was limited."
  },
  {
    q:"C罗背弃祖姓 Aveiro，改名只用 Ronaldo，主要争议是？", qEn:"Cristiano ditched his surname Aveiro and goes only by Ronaldo — what's the main controversy?",
    opts:[
      {v:"纪念父亲", vEn:"To honour his father"},
      {v:"蹭「罗纳尔多」前辈热度 + 掩盖父姓", vEn:"Coattailing the \"Ronaldo\" legend + hiding his real surname"},
      {v:"宗教原因", vEn:"For religious reasons"},
      {v:"经纪人要求", vEn:"The agent demanded it"}
    ],
    a:1,
    fb:"正确是蹭热度 + 掩盖父姓。他姓 Aveiro，却只推 Ronaldo（注册 CR7 品牌），被批「忘本」。",
    fbEn:"Correct: coattailing + hiding the surname. He's an Aveiro, but only pushes \"Ronaldo\" (registered as the CR7 brand) — criticised as forgetting his roots."
  },
  {
    q:"迷你罗（Cristiano Jr.）的生母身份，C罗方面的官方说法是？", qEn:"What's Cristiano's camp's official line on the mother of Cristiano Jr.?",
    opts:[
      {v:"公开的母亲是某模特", vEn:"The mother is a known model"},
      {v:"付封口费保密，疑似代孕", vEn:"Hush money + NDA, suspected surrogate"},
      {v:"母亲已去世", vEn:"The mother has passed away"},
      {v:"母亲是亲戚", vEn:"A relative"}
    ],
    a:1,
    fb:"正确是付封口费保密。疑似代孕，签保密协议，生母身份至今成谜，被媒体称作「足坛最大谜团之一」。",
    fbEn:"Correct: paid to keep silent. A suspected surrogacy, an NDA, and a mother whose identity is still a mystery — the media calls it \"one of football's biggest riddles\"."
  },
  {
    q:"C罗自设的「环球足球奖」（Globe Soccer Awards）最大争议是？", qEn:"What's the biggest controversy around Cristiano's own \"Globe Soccer Awards\"?",
    opts:[
      {v:"公平公正", vEn:"Fair and transparent"},
      {v:"自费办奖经常颁给自己", vEn:"Self-funded, hands trophies to himself"},
      {v:"只颁队友", vEn:"Only ever given to teammates"},
      {v:"国际足联认证", vEn:"FIFA-certified"}
    ],
    a:1,
    fb:"正确是自费办奖颁自己。自己投资、自己出席、自己领奖，被讽为「自嗨奖」「花钱买奖杯」。",
    fbEn:"Correct: self-funded, self-awarded. He invests, shows up, and wins — mocked as a \"vanity award\" and \"trophy you buy for yourself\"."
  },
  {
    q:"2013金球奖为何被里贝里痛批「偷」？", qEn:"Why did Ribéry slam the 2013 Ballon d'Or as \"stolen\"?",
    opts:[
      {v:"投票完全透明", vEn:"Voting was fully transparent"},
      {v:"投票截止日突然延期，正好赶上 C罗世预赛附加赛帽子戏法", vEn:"Voting deadline was suddenly extended, right after Cristiano's play-off hat-trick"},
      {v:"里贝里主动退出", vEn:"Ribéry withdrew himself"},
      {v:"评委集体改票", vEn:"Voters switched en masse"}
    ],
    a:1,
    fb:"正确是延期。原定 11 月公布，国际足联突然宣布延期至 2014 年 1 月，时机恰好让 C罗附加赛表演进入视野，里贝里从此耿耿于怀。",
    fbEn:"Correct: the deadline was extended. Originally set for November, FIFA abruptly pushed it to January 2014 — conveniently letting Cristiano's play-off show enter voters' minds. Ribéry never got over it."
  },
  {
    q:"C罗在尤文图斯/曼联二期，对俱乐部造成的「衰退」常被概括为？", qEn:"The \"decline\" Cristiano caused at Juventus / Man Utd II is often summed up as?",
    opts:[
      {v:"战术核心carry", vEn:"The tactical centerpiece"},
      {v:"废队友废教练，球队围绕他战绩下滑", vEn:"Ruining teammates and coaches, team built around him slides"},
      {v:"带飞全队夺冠", vEn:"Carried the team to titles"},
      {v:"培养年轻人", vEn:"Developing young players"}
    ],
    a:1,
    fb:"正确是废队友废教练。尤文围绕他重建战术连丢欧冠；回归曼联后炮轰俱乐部 + 主帅，更衣室分裂。",
    fbEn:"Correct: ruining teammates and coaches. Juve rebuilt the tactic around him and kept missing out on the Champions League; back at United he blasted the club and the manager, splitting the dressing room."
  },
  {
    q:"皮尔斯·摩根专访事件，C罗炮轰曼联的具体内容是？", qEn:"In the Piers Morgan interview, what exactly did Cristiano blast United over?",
    opts:[
      {v:"称赞俱乐部专业", vEn:"Praising the club's professionalism"},
      {v:"炮轰俱乐部设施、主帅滕哈格、感到被「背叛」", vEn:"Blasting the facilities, manager Ten Hag, feeling \"betrayed\""},
      {v:"宣布永久留队", vEn:"Announcing he'd stay for life"},
      {v:"只是私下聊天", vEn:"Just a private chat"}
    ],
    a:1,
    fb:"正确是炮轰俱乐部 + 主帅 + 感到被「背叛」。专访播出后曼联直接解约，他随即远走沙特。",
    fbEn:"Correct: blasted the club + manager + felt \"betrayed\". Once the interview aired, United terminated his contract, and he promptly left for Saudi."
  },
  {
    q:"2022世界杯C罗被替补，与哪位主帅「十年恩怨」决裂？", qEn:"Cristiano was benched at the 2022 World Cup — and \"ten years of grievance\" ruptured with which manager?",
    opts:[
      {v:"穆里尼奥", vEn:"José Mourinho"},
      {v:"桑托斯", vEn:"Fernando Santos"},
      {v:"奎罗斯", vEn:"Carlos Queiroz"},
      {v:"斯科拉里", vEn:"Luiz Felipe Scolari"}
    ],
    a:1,
    fb:"正确是桑托斯。淘汰赛连续两场把他放替补，葡萄牙出局，赛后 C罗与桑托斯彻底决裂。",
    fbEn:"Correct: Fernando Santos. Santos benched him for two straight knockout games, Portugal went out, and after the tournament the two completely fell out."
  },
  {
    q:"C罗生涯总收入（薪金+商业）大约是多少？", qEn:"Cristiano's career earnings (salary + commercial) total roughly?",
    opts:[
      {v:"约 1 亿", vEn:"~$100M"},
      {v:"约 5 亿", vEn:"~$500M"},
      {v:"约 10 亿", vEn:"~$1B"},
      {v:"约 30 亿", vEn:"~$3B"}
    ],
    a:2,
    fb:"正确约 10 亿美元。足坛史上首位生涯总收入破 10 亿的球员，但其中利雅得年薪就高达 2 亿/年。",
    fbEn:"Correct: ~$1 billion. The first footballer in history to surpass $1B in career earnings — and his Al Nassr salary alone is rumoured at €200M a year."
  },
  {
    q:"2009拉斯维加斯酒店事件，C罗最终以多少封口费和解？", qEn:"The 2009 Las Vegas hotel incident — how much hush money did Cristiano eventually settle for?",
    opts:[
      {v:"约 5 万", vEn:"~$50k"},
      {v:"约 37.5 万", vEn:"~$375k"},
      {v:"约 500 万", vEn:"~$5M"},
      {v:"无罪未和解", vEn:"Cleared, no settlement"}
    ],
    a:1,
    fb:"正确约 37.5 万美元。2009 年事件后签保密协议和解，2018 年又被翻出重审，2023 年才彻底结案。",
    fbEn:"Correct: ~$375,000. Settled with an NDA in 2009, the case was revived in 2018 and only fully closed in 2023."
  },
  {
    q:"C罗对球迷做「不雅动作 + 围巾塞裤裆」，发生在哪个联赛？", qEn:"Cristiano made a lewd gesture and stuffed a scarf down his pants at fans — in which league?",
    opts:[
      {v:"英超", vEn:"Premier League"},
      {v:"西甲", vEn:"La Liga"},
      {v:"意甲", vEn:"Serie A"},
      {v:"沙特联赛", vEn:"Saudi Pro League"}
    ],
    a:3,
    fb:"正确是沙特联赛。2024 年在沙特赛场多次做出不雅动作回应球迷起哄，外加「刀削面」庆祝等怪异行为。",
    fbEn:"Correct: the Saudi Pro League. In 2024 he repeatedly fired back at fans with lewd gestures, plus the odd \"knife-shaving noodles\" celebration."
  },
  {
    q:"「吕七优人」这个梗，与C罗有什么关系？", qEn:"What's the link between the meme \"Roku-yuu-jin\" and Cristiano?",
    opts:[
      {v:"他的中文译名", vEn:"His Chinese transliteration"},
      {v:"日本网友的恶搞昵称", vEn:"A Japanese internet parody nickname"},
      {v:"他的粤语名", vEn:"His Cantonese name"},
      {v:"赞助商代号", vEn:"A sponsor code"}
    ],
    a:1,
    fb:"正确是日本网友恶搞昵称。源自日式谐音恶搞，是 C罗全球「恶名文化」的一部分，中文圈也有「阿伟罗」等变体。",
    fbEn:"Correct: a Japanese parody nickname. It grew out of Japanese phonetic wordplay, part of Cristiano's global \"infamy culture\" — the Chinese sphere has variants like \"A-wei-lo\"."
  }
];

/* ========== #7 黑料真假鉴别 — 真假语录题库 ==========
 * truth:true = 真语录（已核实出处）；truth:false = 拟写假语录（比真话还离谱但合理）。
 * 玩点：C罗的真话往往比段子还离谱，玩家猜「真/假」本身就是反讽体验。
 * source：真语录标注可查出处；假语录标 (拟)。
 * reveal：揭晓时的讽刺性点评。
 */
const truthOrFake = [
  // —— 真语录（已核实） ——
  {text:"我之所以被嘘，是因为我有钱、长得帅、还是个伟大的球员，人们就是嫉妒我。", textEn:"I get booed because I'm rich, handsome and a great player — people are just jealous of me.", truth:true, source:"C罗，约2007-08曼联时期采访（回应球迷嘘声）", sourceEn:"Cristiano, ~2007-08 Man Utd interview (responding to boos)", reveal:"真。这话不是段子，是他亲口说的。被嘘的理由在他看来永远只有一个——全世界都嫉妒他的完美。", revealEn:"True. Not a sketch — he really said it. In his eyes there's only ever one reason for the boos: the whole world is jealous of his perfection."},
  {text:"我是足球史上第一、第二、第三好的球员。", textEn:"I'm the first, second and third best player in football history.", truth:true, source:"C罗，约2008年采访（传记作者 Balagué 记录）", sourceEn:"Cristiano, ~2008 interview (recorded by biographer Balagué)", reveal:"真。前无古人的自评：直接把领奖台前三名全包了。后来这句被反复拿来和梅西的「我不在乎第几」做对比。", revealEn:"True. An all-time self-assessment: he swept the entire podium. It's been endlessly contrasted with Messi's \"I don't care where I rank\"."},
  {text:"喝水，不要喝可口可乐。", textEn:"Drink water, not Coca-Cola.", truth:true, source:"C罗，2021欧洲杯发布会（移走可乐瓶）", sourceEn:"Cristiano, Euro 2021 press conference (moving the Coke bottles)", reveal:"真。这一挪据说让可口可乐市值蒸发约40亿美元（虽有夸大成分，但叙事已成梗）。一句「喝水」干掉一家赞助商。", revealEn:"True. That one nudge allegedly wiped ~$4B off Coca-Cola's market cap (exaggerated, but the narrative stuck). One line of \"drink water\" took out a sponsor."},
  {text:"我感到被背叛了。曼联的人——教练、高层——他们背叛了我。", textEn:"I feel betrayed. The people at United — the coach, the hierarchy — they betrayed me.", truth:true, source:"C罗，2022年皮尔斯·摩根专访", sourceEn:"Cristiano, 2022 Piers Morgan interview", reveal:"真。这档专访直接导致他被曼联解约。在世界杯前夕炮轰东家，史无前例。", revealEn:"True. The interview directly got his United contract torn up. Blasting his employer on the eve of a World Cup — unprecedented."},
  {text:"Factos! Factos! Factos!", textEn:"Factos! Factos! Factos!", truth:true, source:"C罗，2021年金球奖输给梅西后深夜在梅西帖子下连发评论", sourceEn:"Cristiano, late-night comments under Messi's post after losing the 2021 Ballon d'Or", reveal:"真。「Factos（事实）」连发三遍，是真事。被全网做成 meme，成为他输不起的代名词。", revealEn:"True. \"Factos\" fired off three times in a row — it really happened. The whole internet turned it into a meme, shorthand for him being a sore loser."},
  {text:"你们之所以要查我，是因为我是C罗。", textEn:"You're only investigating me because I'm Cristiano Ronaldo.", truth:true, source:"C罗，2017年逃税案庭审", sourceEn:"Cristiano, 2017 tax-fraud trial hearing", reveal:"真。法庭上当庭把税务调查归因于「我是C罗」。把逃税说成被害，逻辑满分。", revealEn:"True. In court he blamed the tax investigation on \"being Cristiano\". Recasting tax fraud as victimhood — flawless logic."},
  {text:"世界杯不是我的梦想。", textEn:"The World Cup was never my dream.", truth:true, source:"C罗，2025年11月皮尔斯·摩根专访", sourceEn:"Cristiano, November 2025 Piers Morgan interview", reveal:"真。踢了六届世界杯0冠后，亲口说「世界杯不是我的梦想」——这嘴硬程度，宇宙级。", revealEn:"True. Six World Cups, zero titles, and he actually said it out loud — \"the World Cup was never my dream\". Cosmic-level cope."},
  {text:"在我之前，葡萄牙什么都没赢过。我帮葡萄牙拿了三座奖杯，欧洲杯不亚于世界杯。", textEn:"Before me, Portugal had won nothing. I brought Portugal three trophies; the Euros are no less than the World Cup.", truth:true, source:"C罗，2026世界杯出局后自辩", sourceEn:"Cristiano, self-justification after the 2026 World Cup exit", reveal:"真。一句话抹掉了尤西比奥、菲戈那一代葡萄牙前辈的贡献，还顺手把欧洲杯抬到世界杯级别。", revealEn:"True. One line wipes out the contributions of Eusébio, Figo and a whole generation of Portuguese greats — and conveniently lifts the Euros to World Cup status."},
  {text:"我1000%问心无愧，我顶着压力打进3球，表现不差。", textEn:"I'm 1000% with a clear conscience. I scored three under pressure, my performance wasn't bad.", truth:true, source:"C罗，2026世界杯1/8决赛前一天发布会", sourceEn:"Cristiano, press conference the day before the 2026 World Cup Round of 16", reveal:"真。赛前预埋「问心无愧」，赛后原话照搬。输了也要赢话术，剧本早已写好。", revealEn:"True. Pre-loaded \"clear conscience\" before the game, replayed verbatim after. Lose on the pitch, win the spin — the script was written long ago."},
  {text:"沙特给了我2亿，但我来这里是为了提升联赛水平。", textEn:"Saudi paid me €200M, but I came here to raise the level of the league.", truth:true, source:"C罗，2023年利雅得胜利亮相发布会", sourceEn:"Cristiano, Al Nassr unveiling press conference, 2023", reveal:"真。原话大意如此。把「为钱来沙漠」包装成「扶贫」，公关话术炉火纯青。", revealEn:"True. The gist of his actual words. Repackaging \"coming to the desert for money\" as \"charity work\" — PR craft at its finest."},
  {text:"我的庆祝动作 SIUUU 应该申请专利，全世界都在模仿我。", textEn:"My SIUUU celebration should be patented — the whole world is copying me.", truth:true, source:"C罗，多次采访提及SIU的商业化", sourceEn:"Cristiano, multiple interviews on monetising SIUUU", reveal:"真。他确实把庆祝动作注册成个人商标、商业化运营。连进球庆祝都是一门生意。", revealEn:"True. He really did trademark the celebration and run it as a business. Even goal celebrations are a line of business."},
  {text:"如果梅西当年和我一起吃饭，他现在会是个更好的人。", textEn:"If Messi had dined with me back then, he'd be a better man today.", truth:true, source:"C罗，2010年代早期采访（流传甚广）", sourceEn:"Cristiano, early-2010s interview (widely circulated)", reveal:"真。原话大意如此——把和梅西的较量，降维成「和我吃饭能提升人品」的傲慢。", revealEn:"True. The gist of what he said — reducing his rivalry with Messi into the arrogance that \"dining with me would improve your character\"."},
  // —— 假语录（拟写，刻意比真话还离谱） ——
  {text:"我每天照镜子都会被自己迷倒，这是我不结婚的原因。", textEn:"I fall in love with myself every time I look in the mirror — that's why I'm not married.", truth:false, source:"(拟)", sourceEn:"(made up)", reveal:"假。虽然听起来很像他会说的，但这条是编的。讽刺的是——你犹豫了吧？因为他真说过类似自恋程度的话。", revealEn:"False. Sounds exactly like him, but it's invented. The irony — you hesitated, didn't you? Because he really has said things this narcissistic."},
  {text:"迷你罗的足球天赋已经超过同龄的梅西，他将来必拿金球。", textEn:"Cristiano Jr.'s talent has already outstripped Messi at the same age — he'll win the Ballon d'Or for sure.", truth:false, source:"(拟)", sourceEn:"(made up)", reveal:"假。编的。但他确实把迷你罗带进利雅得青年队、全队为他摆拍SIU，所以这条的迷惑性极高。", revealEn:"False. Invented. But he really did bring Cristiano Jr. into Al Nassr's youth setup, with the whole squad posing for SIUUU photos — so this one is highly plausible."},
  {text:"我是被国际足联陷害的，他们不想让我拿第六座金球。", textEn:"I was framed by FIFA — they didn't want me to win my sixth Ballon d'Or.", truth:false, source:"(拟)", sourceEn:"(made up)", reveal:"假。编的。不过结合他「Factos」式控评的真实作风，这条几乎以假乱真。", revealEn:"False. Invented. But combine it with his real \"Factos\"-style narrative-policing, and it's almost indistinguishable from the truth."},
  {text:"沙特联赛的水平已经超过英超，这里的对抗更纯粹。", textEn:"The Saudi league has already surpassed the Premier League — the duels here are purer.", truth:false, source:"(拟)", sourceEn:"(made up)", reveal:"假。编的。但他确实为沙特刷数据辩护过，所以「沙特超英超」这种话，听着竟毫不违和。", revealEn:"False. Invented. But he really has defended his Saudi stat-padding, so \"Saudi > Premier League\" sounds entirely on-brand."},
  {text:"我每进一个点球，都要在日记本上记一笔，这是我对抗时间的方式。", textEn:"Every penalty I score goes in my diary — that's how I fight time.", truth:false, source:"(拟)", sourceEn:"(made up)", reveal:"假。编的。不过点球依赖症是真的，把点球当KPI记日记，讽刺拉满。", revealEn:"False. Invented. But the penalty dependency is real, so turning penalties into a diary KPI is peak satire."},
  {text:"如果让我重新选择，我还是会在世界杯淘汰赛上保持沉默。", textEn:"If I had to choose again, I'd still stay silent in World Cup knockouts.", truth:false, source:"(拟)", sourceEn:"(made up)", reveal:"假。编的。但六届世界杯淘汰赛仅一球、淘汰赛「隐身」是真的，所以这话竟有种宿命感。", revealEn:"False. Invented. But one goal across six World Cup knockouts — the \"invisible\" tag is real, so this line has a fateful ring to it."},
  {text:"我把头发梳成现在这样，是为了在进球后转身的瞬间最上镜。", textEn:"I style my hair this way so the moment I turn after scoring, I'm perfectly camera-ready.", truth:false, source:"(拟)", sourceEn:"(made up)", reveal:"假。编的。但他对发型的执念（每场比赛前精心打理）、进球后摆pose，是出了名的。", revealEn:"False. Invented. But his obsession with his hair (freshly groomed before every match) and post-goal posing is legendary."},
  {text:"球迷嘘我是因为他们买不起我的CR7内裤。", textEn:"Fans boo me because they can't afford my CR7 underwear.", truth:false, source:"(拟)", sourceEn:"(made up)", reveal:"假。编的。但结合他「被嘘是因为嫉妒我有钱」的真语录，这条几乎是他会说的。", revealEn:"False. Invented. But paired with his real \"they boo me because they're jealous of my money\" quote, this is almost word-for-word something he'd say."},
  {text:"我退役后会竞选葡萄牙总统，因为只有我能拯救这个国家。", textEn:"After I retire I'll run for president of Portugal, because only I can save this country.", truth:false, source:"(拟)", sourceEn:"(made up)", reveal:"假。编的。但他「我是历史第一第二第三」「葡萄牙是我带飞的」这种自我中心叙事，让这条毫不突兀。", revealEn:"False. Invented. But with his \"I'm the 1st, 2nd and 3rd best ever\" and \"I carried Portugal\" narratives, this fits without a seam."},
  {text:"我拒绝和任何不是金球奖得主的球员握手。", textEn:"I refuse to shake hands with any player who hasn't won a Ballon d'Or.", truth:false, source:"(拟)", sourceEn:"(made up)", reveal:"假。编的。不过他场上的傲慢、对队友的冷脸是真的，所以这条迷惑性拉满。", revealEn:"False. Invented. But his on-pitch arrogance and cold stares at teammates are real, so this is maximum bait."},
  {text:"我的肌肉是上帝按自己的样子捏的，其他人只是草稿。", textEn:"My muscles were sculpted by God in his own image — everyone else is just a draft.", truth:false, source:"(拟)", sourceEn:"(made up)", reveal:"假。编的。但他展示肌肉、半裸代言CR7内裤是常态，自恋到「上帝草稿论」毫不违和。", revealEn:"False. Invented. But flexing and half-naked CR7 underwear ads are his default, so narcissism up to a \"God's draft theory\" is seamless."},
  {text:"我摔手机是因为那个手机不是最新款，配不上我。", textEn:"I smashed that phone because it wasn't the latest model — it wasn't worthy of me.", truth:false, source:"(拟)", sourceEn:"(made up)", reveal:"假。编的。但他2022年真摔了自闭症小球迷的手机，理由再荒诞也盖不住那一下失控。", revealEn:"False. Invented. But he really did smash an autistic boy's phone in 2022 — no matter how absurd the excuse, that flash of loss of control is real."}
];

/* ========== #9 罗黑赌场 — 黑料命题下注 ==========
 * 玩家用虚拟「Factos 币」对「C罗 式行为是否发生」下注。
 * 注意：命题基于 C罗 历史行为的真实概率，开盘 = 按该概率随机模拟一次「他又会怎样」，
 *   不是预测某场具体未来比赛。
 * odds: 赔率倍数；hist: 该行为在 C罗 历史中真实发生的概率（0~1，决定开奖倾向）。
 * reveal: 开奖后弹出的黑料科普。
 */
const casinoBets = [
  {
    q:"抽一次 C罗 的「赛后行为卡」：他会不会摔袖标 / 摔东西？", qEn:"Draw a Cristiano \"post-match behaviour card\": will he throw an armband / smash something?",
    a:"会摔", aEn:"Yes, he'll throw it", b:"不会摔", bEn:"No, he won't", odds:1.8, hist:0.62,
    reveal:"C 罗职业生涯多次摔袖标（2021 世预赛两场连摔）、摔手机（2022）、扔麦克风（2016）。输球就摔东西，是他的招牌动作之一。",
    revealEn:"Cristiano has thrown armbands multiple times (twice in 2021 World Cup qualifiers alone), smashed a phone (2022), tossed a microphone (2016). Throwing things when he loses is one of his signature moves."
  },
  {
    q:"抽一次 C罗 的「赛后发言卡」：他会不会甩锅（怪教练/队友/裁判）？", qEn:"Draw a Cristiano \"post-match quote card\": will he deflect blame (onto the coach / teammates / ref)?",
    a:"会甩锅", aEn:"Yes, he'll deflect", b:"不会甩锅", bEn:"No, he won't", odds:1.5, hist:0.74,
    reveal:"从炮轰曼联到「世界杯不是我的梦想」再到「问心无愧」，C 罗输球后甩锅的概率高得离谱——金球输了怪规则，世界杯输了怪教练，联赛输了怪队友。",
    revealEn:"From blasting United to \"the World Cup was never my dream\" to \"clear conscience\" — Cristiano's deflection rate after a loss is absurd. Ballon d'Or loss? Blame the rules. World Cup loss? Blame the coach. League loss? Blame teammates."
  },
  {
    q:"抽一次 C罗 的「点球卡」：他会不会站上 12 码主罚？", qEn:"Draw a Cristiano \"penalty card\": will he step up to take a spot-kick?",
    a:"会主罚", aEn:"Yes, he'll take it", b:"不会主罚", bEn:"No, he won't", odds:1.2, hist:0.91,
    reveal:"C 罗是足坛著名点球大户。在沙特 4 年累计主罚点球超 32 次，几乎垄断队内第一点球权。「点球依赖症」是他含金量争议的核心。",
    revealEn:"Cristiano is football's notorious penalty merchant. In 4 years in Saudi Arabia he's taken 32+ spot-kicks, almost monopolising the team's penalty duties. \"Penalty dependency\" is the core of his stat-purity debate."
  },
  {
    q:"抽一次 C罗 的「大赛淘汰赛卡」：他会不会进球？", qEn:"Draw a Cristiano \"tournament knockout card\": will he score?",
    a:"会进球", aEn:"Yes, he'll score", b:"不会进球", bEn:"No, he won't", odds:2.5, hist:0.18,
    reveal:"六届世界杯、九场淘汰赛、仅一粒进球。淘汰赛隐身是 C 罗国家队生涯最硬的伤——下注「不进」的历史胜率高得吓人。",
    revealEn:"Six World Cups, nine knockout games, one goal. \"Vanishing in knockouts\" is the hardest hit on Cristiano's international career — historically, betting \"no goal\" has had a terrifyingly high win rate."
  },
  {
    q:"抽一次 C罗 的「离场卡」：输球后他会不会径直走人、不谢球迷？", qEn:"Draw a Cristiano \"exit card\": after a loss, will he storm off down the tunnel without thanking the fans?",
    a:"会走人", aEn:"Yes, he'll storm off", b:"会谢场", bEn:"No, he'll applaud the fans", odds:1.7, hist:0.55,
    reveal:"2022 世界杯被摩洛哥淘汰后，C 罗 径直钻进球员通道，没谢场、没安慰队友。输球就走，是他对球迷「恩将仇报」的典型场面。",
    revealEn:"After being knocked out by Morocco at the 2022 World Cup, Cristiano disappeared straight down the tunnel — no thanks to the fans, no comforting teammates. Storming off after a loss is his classic \"biting the hand that feeds him\" moment."
  },
  {
    q:"抽一次 C罗 的「ins 动态卡」：会不会又是 P 图自拍 / 商业植入？", qEn:"Draw a Cristiano \"Instagram post card\": will it be another edited selfie / commercial plug?",
    a:"又是自拍", aEn:"Another selfie", b:"正常内容", bEn:"Normal content", odds:1.3, hist:0.83,
    reveal:"C 罗 的 ins 是全球粉丝最多的个人账号，但内容以精修自拍、商业植入为主。曾有媒体统计其近七成发文都带自我营销或广告属性。",
    revealEn:"Cristiano's Instagram is the most-followed personal account in the world, but it's mostly edited selfies and commercial plugs. One media count found around 70% of his posts were self-promotion or ads."
  },
  {
    q:"抽一次 C罗 的「场上反应卡」：他会不会对裁判做出抗议手势？", qEn:"Draw a Cristiano \"on-pitch reaction card\": will he gesticulate at the referee?",
    a:"会抗议", aEn:"Yes, he'll protest", b:"不会抗议", bEn:"No, he won't", odds:1.4, hist:0.79,
    reveal:"「总裁找裁判」是中文圈给他的绰号之一。从抱怨越位、到摊手、到推搡裁判（2017 西超杯被禁 5 场），他几乎每场都在和裁判演戏。",
    revealEn:"\"Penaldo looking for the ref\" is one of his Chinese-sphere nicknames. From offsides complaints, to arm-flapping, to shoving the ref (a 5-match ban in the 2017 Spanish Super Cup) — every match is basically theatre with the referee."
  },
  {
    q:"抽一次 C罗 的「东家关系卡」：合约期里他会不会和俱乐部闹翻？", qEn:"Draw a Cristiano \"employer relations card\": will he fall out with the club during his contract?",
    a:"会闹翻", aEn:"Yes, he'll fall out", b:"和平收场", bEn:"Amicable ending", odds:2.0, hist:0.50,
    reveal:"从皇马要加薪不成离队、到尤文后期不满、再到炮轰曼联被解约——C 罗 几乎每到一支球队都以不愉快收场。「过河拆桥」是标配操作。",
    revealEn:"From forcing his way out of Real Madrid over a raise, to souring on Juventus at the end, to blasting United into a contract tear-up — almost every club Cristiano joins ends on bad terms. \"Burning the bridge\" is standard operating procedure."
  }
];



