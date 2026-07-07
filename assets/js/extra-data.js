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
    sub:"六届世界杯的真实答卷",
    cr7:{val:1,note:"六届世界杯淘汰赛 9 场仅 1 球（2026 破零后被西班牙补时绝杀淘汰）"},
    messi:{val:8,note:"2022 决赛封王，多届淘汰赛建功"},
    loser:"cr7",
    tip:"9 场淘汰赛仅 1 球 vs 梅西 2022 夺冠"
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
    {label:"世界杯淘汰赛",value:"9场1球",unit:"",note:"六届世界杯淘汰赛仅 1 球，2026 破零后被西班牙补时绝杀淘汰",score:14},
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

/* ========== 罗黑程度测试题库 ==========
 * 25 题单选大题库，每次随机抽取并打乱题序/选项，保证每局体验不同。
 * 紧扣本馆数据：红牌/世界杯/点球/跳水/金球/逃税/可口可乐/摔手机/袖标/
 * 眨眼门/利雅得/卢森堡/任意球/迷你罗/自设奖项/背弃祖姓 等。
 * a = 正确选项 index（0 起），fb = 作答后的解释反馈。
 */
const quizData = [
  {
    q:"C罗生涯红牌总数大约是多少张？",
    opts:["3 张","8 张","14 张","20 张"],
    a:2,
    fb:"正确是 14 张。曼联 4 + 皇马 6 + 尤文 1 + 利雅得胜利 1 + 葡萄牙 1 + 其他 1，是梅西（3 张）的近 5 倍。"
  },
  {
    q:"截至 2026，C罗在世界杯淘汰赛进了几个球？",
    opts:["0 个","1 个","3 个","8 个"],
    a:1,
    fb:"正确是 1 个。六届世界杯淘汰赛 9 场仅 1 球——2026 1/16 决赛才破零，紧接着 1/8 决赛就被西班牙补时绝杀淘汰。对比梅西同舞台建功并 2022 夺冠。"
  },
  {
    q:"C罗生涯点球进球数约为？",
    opts:["约 50 个","约 109 个","约 175 个","约 250 个"],
    a:2,
    fb:"正确约 175 个（主罚 208 次），占生涯进球近 1/6。梅西约 109 个，比他少 66 个点球。"
  },
  {
    q:"英媒给C罗起的讽刺绰号「跳水王」，源自他什么习惯？",
    opts:["频繁假摔索要犯规","赛后跳进泳池庆祝","训练时跳水放松","跳水运动员出身"],
    a:0,
    fb:"源自他频繁假摔。2006 世界杯「跳水」名场面后，被英媒封为「跳水王」，中文圈也衍生绰号「水罗」。"
  },
  {
    q:"C罗加盟利雅得胜利后，等多久才拿到首个联赛冠军？",
    opts:["约 1 个月","约半年","约 1 年","约 4 年"],
    a:3,
    fb:"正确约 1460 天（≈4 年）。对比梅西加盟迈阿密国际约 30 天即夺联赛杯，慢了约 48 倍。"
  },
  {
    q:"C罗在国家队大量进球，单是对阵卢森堡就刷了几个？",
    opts:["3 个","7 个","11 个","20 个"],
    a:2,
    fb:"正确 11 个。对阵卢森堡 11 + 立陶宛 7 + 瑞典 7，弱旅刷分是含金量争议的核心。"
  },
  {
    q:"C罗近年联赛任意球「进球荒」大约持续了多久？",
    opts:["约 50 天","约 200 天","约 600 天","从未进过任意球"],
    a:2,
    fb:"正确约 600 天 0 球，期间联赛 59 次尝试零进球。曾经的招牌技能严重保质。"
  },
  {
    q:"金球奖数量，C罗 vs 梅西是？",
    opts:["8 : 5","5 : 8","5 : 5","7 : 6"],
    a:1,
    fb:"正确 5 : 8。C罗 5 座（2008/13/14/16/17），梅西 8 座，落后 3 座最高个人荣誉。"
  },
  {
    q:"2017年C罗被西班牙法院认定的逃税金额与罚款约为？",
    opts:["约 200 万 / 罚款 50 万","约 1470 万 / 罚款 1880 万","约 5000 万 / 罚款 1 亿","从未逃税"],
    a:1,
    fb:"正确约逃税 1470 万欧元，认罪后罚款 1880 万 + 23 个月缓刑。 offshore 影子公司藏肖像权收入。"
  },
  {
    q:"2006世界杯「眨眼门」事件，C罗坑哭了哪位俱乐部队友？",
    opts:["鲁尼","吉格斯","斯科尔斯","费迪南德"],
    a:0,
    fb:"正确是鲁尼。鲁尼踩卡瓦略被罚下后，C罗对替补席眨眼示意「搞定了」，赛后英媒哗然，回英超被骂到差点离队。"
  },
  {
    q:"2021欧洲杯发布会，C罗移走可口可乐致其市值大约蒸发了多少？",
    opts:["约 4000 万美元","约 4 亿美元","约 40 亿美元","没影响"],
    a:2,
    fb:"正确约 40 亿美元。一句「喝水，不要可乐」让可口可乐单日股价跳水 1.6%，市值蒸发约 40 亿。"
  },
  {
    q:"C罗在古迪逊公园摔碎的小球迷手机，那个小球迷是什么情况？",
    opts:["成年职业球迷","自闭症小球迷","客队球迷","对方球员家属"],
    a:1,
    fb:"正确是自闭症小球迷。赛后 C 罗输球恼怒，下楼时把 14 岁自闭症男孩的手机打落，遭足总禁赛 + 罚款。"
  },
  {
    q:"C罗两次摔队长袖标，发生在哪个赛事？",
    opts:["2022 世界杯预选赛","2021 欧洲杯","2018 世界杯","2016 欧洲杯"],
    a:1,
    fb:"正确是 2021 欧洲杯。对阵塞尔维亚被吹掉绝杀球后摔袖标；对德国惨败后又一次摔掉——袖标后来被拍卖 6.4 万欧。"
  },
  {
    q:"2016欧洲杯决赛C罗「躺冠」是怎么回事？",
    opts:["全场最佳carry夺冠","25分钟伤退，在场边指挥被营销成灵魂领袖","替补登场绝杀","没进大名单"],
    a:1,
    fb:"正确是 25 分钟伤退。在场边当「拉扯教练」，夺冠后被葡萄牙官方营销成第一功臣，但决赛实际贡献有限。"
  },
  {
    q:"C罗背弃祖姓 Aveiro，改名只用 Ronaldo，主要争议是？",
    opts:["纪念父亲","蹭「罗纳尔多」前辈热度 + 掩盖父姓","宗教原因","经纪人要求"],
    a:1,
    fb:"正确是蹭热度 + 掩盖父姓。他姓 Aveiro，却只推 Ronaldo（注册 CR7 品牌），被批「忘本」。"
  },
  {
    q:"迷你罗（Cristiano Jr.）的生母身份，C罗方面的官方说法是？",
    opts:["公开的母亲是某模特","付封口费保密，疑似代孕","母亲已去世","母亲是亲戚"],
    a:1,
    fb:"正确是付封口费保密。疑似代孕，签保密协议，生母身份至今成谜，被媒体称作「足坛最大谜团之一」。"
  },
  {
    q:"C罗自设的「环球足球奖」（Globe Soccer Awards）最大争议是？",
    opts:["公平公正","自费办奖经常颁给自己","只颁队友","国际足联认证"],
    a:1,
    fb:"正确是自费办奖颁自己。自己投资、自己出席、自己领奖，被讽为「自嗨奖」「花钱买奖杯」。"
  },
  {
    q:"2013金球奖为何被里贝里痛批「偷」？",
    opts:["投票完全透明","投票截止日突然延期，正好赶上 C罗世预赛附加赛帽子戏法","里贝里主动退出","评委集体改票"],
    a:1,
    fb:"正确是延期。原定 11 月公布，国际足联突然宣布延期至 2014 年 1 月，时机恰好让 C罗附加赛表演进入视野，里贝里从此耿耿于怀。"
  },
  {
    q:"C罗在尤文图斯/曼联二期，对俱乐部造成的「衰退」常被概括为？",
    opts:["战术核心carry","废队友废教练，球队围绕他战绩下滑","带飞全队夺冠","培养年轻人"],
    a:1,
    fb:"正确是废队友废教练。尤文围绕他重建战术连丢欧冠；回归曼联后炮轰俱乐部 + 主帅，更衣室分裂。"
  },
  {
    q:"皮尔斯·摩根专访事件，C罗炮轰曼联的具体内容是？",
    opts:["称赞俱乐部专业","炮轰俱乐部设施、主帅滕哈格、感到被「背叛」","宣布永久留队","只是私下聊天"],
    a:1,
    fb:"正确是炮轰俱乐部 + 主帅 + 感到被「背叛」。专访播出后曼联直接解约，他随即远走沙特。"
  },
  {
    q:"2022世界杯C罗被替补，与哪位主帅「十年恩怨」决裂？",
    opts:["穆里尼奥","桑托斯","奎罗斯","斯科拉里"],
    a:1,
    fb:"正确是桑托斯。淘汰赛连续两场把他放替补，葡萄牙出局，赛后 C罗与桑托斯彻底决裂。"
  },
  {
    q:"C罗生涯总收入（薪金+商业）大约是多少？",
    opts:["约 1 亿","约 5 亿","约 10 亿","约 30 亿"],
    a:2,
    fb:"正确约 10 亿美元。足坛史上首位生涯总收入破 10 亿的球员，但其中利雅得年薪就高达 2 亿/年。"
  },
  {
    q:"2009拉斯维加斯酒店事件，C罗最终以多少封口费和解？",
    opts:["约 5 万","约 37.5 万","约 500 万","无罪未和解"],
    a:1,
    fb:"正确约 37.5 万美元。2009 年事件后签保密协议和解，2018 年又被翻出重审，2023 年才彻底结案。"
  },
  {
    q:"C罗对球迷做「不雅动作 + 围巾塞裤裆」，发生在哪个联赛？",
    opts:["英超","西甲","意甲","沙特联赛"],
    a:3,
    fb:"正确是沙特联赛。2024 年在沙特赛场多次做出不雅动作回应球迷起哄，外加「刀削面」庆祝等怪异行为。"
  },
  {
    q:"「吕七优人」这个梗，与C罗有什么关系？",
    opts:["他的中文译名","日本网友的恶搞昵称","他的粤语名","赞助商代号"],
    a:1,
    fb:"正确是日本网友恶搞昵称。源自日式谐音恶搞，是 C罗全球「恶名文化」的一部分，中文圈也有「阿伟罗」等变体。"
  }
];
