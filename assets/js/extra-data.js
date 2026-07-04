/*
 * extra-data.js — CA7 黑历史档案馆 创意模块数据层
 * 依赖：无（纯数据）。被 app.js 顺序加载后使用。
 * 提供：pkData, penaltyData, moneyLedger, memePresets, memePhotos
 */
"use strict";

/* ========== 梅罗 PK 大战数据 ==========
 * 每个维度：左=C罗，右=梅西。winner 指定谁"赢"（这里 C罗的黑点更高=讽刺他）
 * 大部分维度里 C罗 数据是"黑历史更重"的一方
 */
const pkData = [
  {
    id:"redcard",
    label:"生涯红牌数",
    sub:"谁更暴力？",
    cr7:{val:14,note:"曼联4 + 皇马6 + 尤文1 + 利雅得胜利1 + 国家队2"},
    messi:{val:3,note:"含2005首秀43秒红牌"},
    winner:"cr7",  // 红牌多=黑点高
    tip:"14 : 3，C 罗「赢」了 11 张"
  },
  {
    id:"wc",
    label:"世界杯淘汰赛进球",
    sub:"五届世界杯的真实答卷",
    cr7:{val:0,note:"8 场淘汰赛 0 球 0 助（2026 前）"},
    messi:{val:8,note:"2022 决赛封王，多届淘汰赛建功"},
    winner:"messi",  // 这里进球少=黑点高
    tip:"8 场 0 球 vs 2022 夺冠"
  },
  {
    id:"penalty",
    label:"生涯点球进球数",
    sub:"点球依赖度",
    cr7:{val:175,note:"主罚 208 次，命中率约 84%"},
    messi:{val:109,note:"主罚约 140 次"},
    winner:"cr7",
    tip:"175 个点球，占比生涯进球近 1/6"
  },
  {
    id:"firsttitle",
    label:"新东家首冠耗时",
    sub:"沙特 vs 迈阿密",
    cr7:{val:1460,note:"利雅得胜利 ≈ 4 年才拿到联赛冠军"},
    messi:{val:30,note:"迈阿密国际 ≈ 1 个月即夺联赛杯"},
    winner:"cr7",
    tip:"1460 天 vs 30 天"
  },
  {
    id:"ballondor",
    label:"金球奖次数",
    sub:"个人最高荣誉",
    cr7:{val:5,note:"2008/2013/2014/2016/2017"},
    messi:{val:8,note:"2009/2010/2011/2012/2015/2019/2021/2023"},
    winner:"cr7",
    tip:"5 : 8，差了 3 座"
  },
  {
    id:"diving",
    label:"\"跳水\"名场面",
    sub:"假摔黑历史",
    cr7:{val:99,note:"2006世界杯假摔、英媒封\"跳水王\"，绰号\"水罗\""},
    messi:{val:12,note:"偶有倒地争议，但从未形成绰号"},
    winner:"cr7",
    tip:"水罗 vs 无此梗"
  }
];

/* ========== 点球含金量检测仪数据 ==========
 * 每个 item 是一项"注水"指标，含金量越低讽刺越重
 */
const penaltyData = {
  items:[
    {label:"生涯点球进球",value:"175",unit:"个",note:"占生涯进球近 1/6",score:18},
    {label:"国家队刷弱旅",value:"卢森堡 11 球",unit:"",note:"立陶宛/瑞典各 7，含大四喜",score:22},
    {label:"沙特征服速度",value:"4 年 1 冠",unit:"",note:"对比梅西迈阿密 1 个月",score:15},
    {label:"任意球荒",value:"600 天",unit:"0 球",note:"联赛 59 次尝试零进球",score:20},
    {label:"世界杯淘汰赛",value:"0 球 0 助",unit:"/8场",note:"五届世界杯 8 场淘汰赛",score:8},
    {label:"社交媒体含水量",value:"24.3%",unit:"假粉",note:"6亿粉中约 5020 万~1 亿假粉",score:25}
  ],
  // 总含金量百分比（讽刺值：越低越"水"）
  totalScore:18,
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
 * memePhotos: 从 hero-mo 37 张里挑讽刺性强的做底图
 * memePresets: 预设讽刺金句（上下两行，meme 经典格式）
 */
const memePhotos = [
  "assets/images/hero-mo/mo-03.jpg",
  "assets/images/hero-mo/mo-07.jpg",
  "assets/images/hero-mo/mo-12.jpg",
  "assets/images/hero-mo/mo-15.jpg",
  "assets/images/hero-mo/mo-18.jpg",
  "assets/images/hero-mo/mo-22.jpg",
  "assets/images/hero-mo/mo-25.jpg",
  "assets/images/hero-mo/mo-29.jpg",
  "assets/images/hero-mo/mo-33.jpg"
];

const memePresets = [
  {top:"我的父姓是 Aveiro",bottom:"但我偏要叫 Ronaldo"},
  {top:"点球进了！",bottom:"siuuuuuuu"},
  {top:"世界杯淘汰赛 0 球",bottom:"但我是历史第一第二第三"},
  {top:"4 年才拿 1 个沙特冠",bottom:"沙漠骆驼不是白叫的"},
  {top:"梅西拿了世界杯",bottom:"Factos! Factos! Factos!"},
  {top:"我又摔了袖标/手机/麦克风",bottom:"这次是裁判的错"},
  {top:"14 张红牌",bottom:"那都是对方挑衅"},
  {top:"6 亿粉丝 24% 是假的",bottom:"但点赞是真的"}
];
