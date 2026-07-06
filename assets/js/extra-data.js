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
    label:"生涯红牌数",
    sub:"谁更暴力？",
    cr7:{val:14,note:"曼联4 + 皇马6 + 尤文1 + 利雅得胜利1 + 葡萄牙1 + 其他未确认1"},
    messi:{val:3,note:"含2005首秀43秒红牌"},
    loser:"cr7",
    tip:"14 : 3，C罗的红牌是梅西的近 5 倍"
  },
  {
    id:"wc",
    label:"世界杯淘汰赛进球",
    sub:"五届世界杯的真实答卷",
    cr7:{val:1,note:"五届世界杯淘汰赛 8 场仅 1 球（2026 破零）"},
    messi:{val:8,note:"2022 决赛封王，多届淘汰赛建功"},
    loser:"cr7",
    tip:"8 场淘汰赛仅 1 球 vs 梅西 2022 夺冠"
  },
  {
    id:"penalty",
    label:"生涯点球进球数",
    sub:"点球依赖度",
    cr7:{val:175,note:"主罚 208 次，占生涯进球近 1/6"},
    messi:{val:109,note:"主罚约 140 次"},
    loser:"cr7",
    tip:"比梅西多踢进 66 个点球"
  },
  {
    id:"firsttitle",
    label:"新东家首冠耗时(天)",
    sub:"沙特 vs 迈阿密",
    cr7:{val:1460,note:"利雅得胜利 ≈ 4 年才拿联赛冠军"},
    messi:{val:30,note:"迈阿密国际 ≈ 1 个月即夺联赛杯"},
    loser:"cr7",
    tip:"1460 天 vs 30 天，慢了 48 倍"
  },
  {
    id:"ballondor",
    label:"金球奖次数",
    sub:"个人最高荣誉",
    cr7:{val:5,note:"2008/2013/2014/2016/2017"},
    messi:{val:8,note:"2009-2023 共 8 座"},
    loser:"cr7",
    tip:"5 : 8，金球数落后3 座"
  },
  {
    id:"freekick",
    label:"近年任意球荒(天)",
    sub:"招牌技能的保质期",
    cr7:{val:600,note:"联赛 59 次尝试零进球"},
    messi:{val:50,note:"2022 世界杯对尼日利亚任意球中柱"},
    loser:"cr7",
    tip:"600 天 0 球 vs 梅西仍能造威胁"
  },
  {
    id:"weakteam",
    label:"国家队刷弱旅进球",
    sub:"含金量试金石",
    cr7:{val:25,note:"卢森堡 11 + 立陶宛 7 + 瑞典 7"},
    messi:{val:10,note:"主要对手为南美强队"},
    loser:"cr7",
    tip:"单是对卢森堡就刷了 11 个"
  },
  {
    id:"diving",
    label:"\"跳水\"名场面",
    sub:"假摔黑历史",
    cr7:{val:99,note:"2006世界杯假摔、英媒封「跳水王」，绰号「水罗」"},
    messi:{val:12,note:"偶有倒地争议，但从未形成绰号"},
    loser:"cr7",
    tip:"「水罗」vs 梅西无此梗"
  }
];

/* ========== 点球含金量检测仪数据 ==========
 * 每个 item 是一项"注水"指标，含金量越低讽刺越重
 */
const penaltyData = {
  items:[
    {label:"生涯点球进球",value:"175",unit:"个",note:"占生涯进球近 1/6，主罚 208 次",score:18},
    {label:"国家队刷弱旅",value:"卢森堡 11 球",unit:"",note:"立陶宛/瑞典各 7，含大四喜",score:22},
    {label:"沙特征服速度",value:"4 年 1 冠",unit:"",note:"对比梅西迈阿密 1 个月即夺冠",score:15},
    {label:"任意球荒",value:"600 天",unit:"0 球",note:"联赛 59 次尝试零进球",score:20},
    {label:"世界杯淘汰赛",value:"8场1球",unit:"",note:"五届世界杯淘汰赛仅 1 球",score:12},
    {label:"欧冠淘汰赛隐身",value:"近 5 年",unit:"",note:"多次关键战 0 射正或被换下",score:25},
    {label:"社交媒体含水量",value:"24.3%",unit:"假粉",note:"6亿粉中约 5020 万~1 亿假粉",score:25},
    {label:"单赛季射门垄断",value:"135 次",unit:"",note:"贝尔 50 + 本泽马 60 = 不及他一人",score:20},
    {label:"沙特点球占比",value:"35 球含点",unit:"",note:"2023/24 赛季大量来自点球",score:18}
  ],
  totalScore:16,  // 综合含金量评分（独立设定，非 items.score 聚合；items.score 为各项参考分，保留备用）
  totalLabel:"综合含金量"
};

/* ========== 罪恶账本烧钱榜 ==========
 * 金额从大到小，单位统一处理
 */
const moneyLedger = [
  {amount:"40 亿",currency:"$",desc:"可口可乐市值蒸发",detail:"2020欧洲杯移走两瓶可乐，股价 56.10 → 55.22",cat:"场外"},
  {amount:"10 亿",currency:"$",desc:"生涯总收入",detail:"史上首位团队运动破 10 亿美元的足球运动员",cat:"金钱"},
  {amount:"2 亿",currency:"€",desc:"利雅得胜利年薪",detail:"远走沙特，被讽\"去沙漠养老\"",cat:"金钱"},
  {amount:"1880 万",currency:"€",desc:"西班牙逃税罚款",detail:"税款+利息+罚金（对比梅西仅 410 万）",cat:"法律"},
  {amount:"1 亿",currency:"€",desc:"转会尤文图斯身价",detail:"33 岁天价转会",cat:"金钱"},
  {amount:"37.5 万",currency:"$",desc:"拉斯维加斯封口费",detail:"2009 年事件，事后封口",cat:"法律"},
  {amount:"1400 万",currency:"€",desc:"范尼被贱卖皇马",detail:"因训练场冲突被低价处理",cat:"冲突"},
  {amount:"6.4 万",currency:"€",desc:"摔掉的队长袖标拍卖价",detail:"救 SMA 婴儿，因祸得福",cat:"冲突"},
  {amount:"5 万",currency:"£",desc:"摔手机足总罚款",detail:"+ 2 场禁赛",cat:"冲突"}
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
  {top:"我的父姓是 Aveiro",bottom:"但我偏要叫 Ronaldo"},
  {top:"点球进了！",bottom:"siuuuuuuu"},
  {top:"世界杯淘汰赛 8 场才 1 球",bottom:"但我是历史第一第二第三"},
  {top:"4 年才拿 1 个沙特冠",bottom:"沙漠骆驼不是白叫的"},
  {top:"梅西拿了世界杯",bottom:"Factos! Factos! Factos!"},
  {top:"我又摔了袖标/手机/麦克风",bottom:"这次是裁判的错"},
  {top:"14 张红牌",bottom:"那都是对方挑衅"},
  {top:"6 亿粉丝 24% 是假的",bottom:"但点赞是真的"},
  {top:"教练不让我首发",bottom:"我炮轰曼联然后去沙特"},
  {top:"任意球 600 天没进",bottom:"我念咒了但没用"},
  {top:"卢森堡我进了 11 个",bottom:"我是国家队历史射手王"},
  {top:"你们不尊重我",bottom:"所以我摔袖标离场"}
];
