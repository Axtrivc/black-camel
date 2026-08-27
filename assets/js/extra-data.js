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
  id: "redcard",
  label: "生涯红牌数",
  labelEn: "Career red cards",
  sub: "谁更暴力？",
  subEn: "Who's more violent?",
  cr7: {
    val: 14,
    note: "曼联4 + 皇马6 + 尤文1 + 利雅得胜利1 + 葡萄牙1 + 其他未确认1",
    noteEn: "Man Utd 4 + Real Madrid 6 + Juve 1 + Al Nassr 1 + Portugal 1 + other 1",
    noteEs: "Man Utd 4 + Real Madrid 6 + Juve 1 + Al Nassr 1 + Portugal 1 + otras 1"
    },
  messi: {
    val: 3,
    note: "含2005首秀43秒红牌",
    noteEn: "Including the 43-second red on his 2005 debut",
    noteEs: "Incluida la roja a los 43 segundos en su debut de 2005"
    },
  loser: "cr7",
  tip: "14 : 3，C罗的红牌是梅西的近 5 倍",
  tipEn: "14 : 3 — Cristiano has nearly 5x Messi's red cards",
  labelEs: "Rojas en la carrera",
  subEs: "¿Quién es más violento?",
  tipEs: "14 : 3 — Cristiano tiene casi 5 veces las rojas de Messi"
  },
{
  id: "wc",
  label: "世界杯淘汰赛进球",
  labelEn: "World Cup knockout goals",
  sub: "六届世界杯的真实答卷",
  subEn: "The real report card across six World Cups",
  cr7: {
    val: 1,
    note: "六届世界杯淘汰赛 9 场仅 1 球（2026 破零后被西班牙补时绝杀淘汰）",
    noteEn: "1 goal in 9 knockout games across six World Cups (broke the duck in 2026, then knocked out by Spain's stoppage winner)",
    noteEs: "1 gol en 9 partidos de eliminatoria en seis Mundiales (rompió la sequía en 2026 y luego España lo eliminó con un gol en el descuento)"
    },
  messi: {
    val: 8,
    note: "2022 决赛封王，多届淘汰赛建功",
    noteEn: "Crowned in the 2022 final; decisive across multiple knockout runs",
    noteEs: "Coronado en la final de 2022; decisivo en varias eliminatorias"
    },
  loser: "cr7",
  tip: "9 场淘汰赛仅 1 球 vs 梅西 2022 夺冠",
  tipEn: "1 goal in 9 knockout games vs Messi's 2022 title",
  labelEs: "Goles en eliminatorias del Mundial",
  subEs: "El boletín real en seis Mundiales",
  tipEs: "1 gol en 9 eliminatorias vs el título de Messi en 2022"
  },
{
  id: "penalty",
  label: "生涯点球进球数",
  labelEn: "Career penalty goals",
  sub: "点球依赖度",
  subEn: "Penalty dependency",
  cr7: {
    val: 175,
    note: "主罚 208 次，占生涯进球近 1/6",
    noteEn: "Took 208, ~1/6 of his career goals",
    noteEs: "Lanzó 208, ~1/6 de sus goles en la carrera"
    },
  messi: {
    val: 109,
    note: "主罚约 140 次",
    noteEn: "Took around 140",
    noteEs: "Lanzó unos 140"
    },
  loser: "cr7",
  tip: "比梅西多踢进 66 个点球",
  tipEn: "66 more penalties scored than Messi",
  labelEs: "Goles de penalti en la carrera",
  subEs: "Dependencia del penalti",
  tipEs: "66 penales más marcados que Messi"
  },
{
  id: "firsttitle",
  label: "新东家首冠耗时(天)",
  labelEn: "Days to first title at new club",
  sub: "沙特 vs 迈阿密",
  subEn: "Saudi vs Miami",
  cr7: {
    val: 1460,
    note: "利雅得胜利 ≈ 4 年才拿联赛冠军",
    noteEn: "Al Nassr — ~4 years to win the league",
    noteEs: "Al Nassr — ~4 años para ganar la liga"
    },
  messi: {
    val: 30,
    note: "迈阿密国际 ≈ 1 个月即夺联赛杯",
    noteEn: "Inter Miami — ~1 month to win Leagues Cup",
    noteEs: "Inter Miami — ~1 mes para ganar la Leagues Cup"
    },
  loser: "cr7",
  tip: "1460 天 vs 30 天，慢了 48 倍",
  tipEn: "1460 days vs 30 days — 48x slower",
  labelEs: "Días hasta el primer título en el nuevo club",
  subEs: "Arabia vs Miami",
  tipEs: "1460 días vs 30 días — 48 veces más lento"
  },
{
  id: "ballondor",
  label: "金球奖次数",
  labelEn: "Ballon d'Or wins",
  sub: "个人最高荣誉",
  subEn: "The top individual honour",
  cr7: {
    val: 5,
    note: "2008/2013/2014/2016/2017",
    noteEn: "2008/2013/2014/2016/2017",
    noteEs: "2008/2013/2014/2016/2017"
    },
  messi: {
    val: 8,
    note: "2009-2023 共 8 座",
    noteEn: "8 in total, 2009–2023",
    noteEs: "8 en total, 2009–2023"
    },
  loser: "cr7",
  tip: "5 : 8，金球数落后3 座",
  tipEn: "5 : 8 — three Ballon d'Ors behind",
  labelEs: "Balones de Oro",
  subEs: "El gran contador",
  tipEs: "5 : 8 — tres Balones de Oro por detrás"
  },
{
  id: "freekick",
  label: "近年任意球荒(天)",
  labelEn: "Recent free-kick drought (days)",
  sub: "招牌技能的保质期",
  subEn: "Shelf life of the signature skill",
  cr7: {
    val: 600,
    note: "联赛 59 次尝试零进球",
    noteEn: "0 goals from 59 league attempts",
    noteEs: "0 goles en 59 intentos en liga"
    },
  messi: {
    val: 50,
    note: "2022 世界杯对尼日利亚任意球中柱",
    noteEn: "Hit the post with a free kick vs Nigeria at the 2022 World Cup",
    noteEs: "Paló al palo con una falta contra Nigeria en el Mundial 2022"
    },
  loser: "cr7",
  tip: "600 天 0 球 vs 梅西仍能造威胁",
  tipEn: "600 days, 0 goals vs Messi still creating danger",
  labelEs: "Sequía reciente de falta (días)",
  subEs: "El mito del cañonero",
  tipEs: "600 días, 0 goles vs Messi sigue generando peligro"
  },
{
  id: "weakteam",
  label: "国家队刷弱旅进球",
  labelEn: "National-team goals vs minnows",
  sub: "含金量试金石",
  subEn: "The quality litmus test",
  cr7: {
    val: 25,
    note: "卢森堡 11 + 立陶宛 7 + 瑞典 7",
    noteEn: "Luxembourg 11 + Lithuania 7 + Sweden 7",
    noteEs: "Luxemburgo 11 + Lituania 7 + Suecia 7"
    },
  messi: {
    val: 10,
    note: "主要对手为南美强队",
    noteEn: "Main opponents are strong South American sides",
    noteEs: "Los rivales principales son selecciones sudamericanas fuertes"
    },
  loser: "cr7",
  tip: "单是对卢森堡就刷了 11 个",
  tipEn: "11 goals against Luxembourg alone",
  labelEs: "Goles con la selección contra equipos pequeños",
  subEs: "Inflar stats",
  tipEs: "11 goles solo contra Luxemburgo"
  },
{
  id: "diving",
  label: "\"跳水\"名场面",
  labelEn: "\"Diving\" highlights",
  sub: "假摔黑历史",
  subEn: "Simulation dark history",
  cr7: {
    val: 99,
    note: "2006世界杯假摔、英媒封「跳水王」，绰号「水罗」",
    noteEn: "2006 World Cup dive; English media dubbed him \"Diver\" / \"Penaldo\"",
    noteEs: "Piscina en el Mundial 2006; la prensa inglesa lo bautizó «Diver» / «Penaldo»"
    },
  messi: {
    val: 12,
    note: "偶有倒地争议，但从未形成绰号",
    noteEn: "Occasional fall controversy, but never earned a nickname",
    noteEs: "Alguna caída controvertida, pero nunca se ganó un apodo por ello"
    },
  loser: "cr7",
  tip: "「水罗」vs 梅西无此梗",
  tipEn: "\"Penaldo\" vs Messi — no such meme",
  labelEs: "Momentos «piscineros»",
  subEs: "El arte de tirarse",
  tipEs: "«Penaldo» vs Messi — ahí no hay meme"
  }
];

/* ========== 点球含金量检测仪数据 ==========
 * 每个 item 是一项"注水"指标，含金量越低讽刺越重
 */
const penaltyData = {
items: [
  {
    label: "生涯点球进球",
    labelEn: "Career penalty goals",
    value: "175",
    valueEn: "175",
    unit: "个",
    unitEn: "goals",
    note: "占生涯进球近 1/6，主罚 208 次",
    noteEn: "~1/6 of career goals; took 208",
    score: 18,
    labelEs: "Goles de penalti en la carrera",
    valueEs: "175",
    unitEs: "goles",
    noteEs: "~1/6 de sus goles en la carrera; lanzó 208"
    },
  {
    label: "国家队刷弱旅",
    labelEn: "Minnow-padding for country",
    value: "卢森堡 11 球",
    valueEn: "11 vs Luxembourg",
    unit: "",
    unitEn: "",
    note: "立陶宛/瑞典各 7，含大四喜",
    noteEn: "Lithuania/Sweden 7 each, including a four-goal haul",
    score: 22,
    labelEs: "Inflar stats contra minnows con la selección",
    valueEs: "11 vs Luxemburgo",
    unitEs: "",
    noteEs: "Lituania/Suecia 7 cada uno, incluido un póker"
    },
  {
    label: "沙特征服速度",
    labelEn: "Saudi conquest speed",
    value: "4 年 1 冠",
    valueEn: "4 yrs, 1 title",
    unit: "",
    unitEn: "",
    note: "对比梅西迈阿密 1 个月即夺冠",
    noteEn: "Compare Messi winning with Miami in 1 month",
    score: 15,
    labelEs: "Velocidad de conquista saudí",
    valueEs: "4 años, 1 título",
    unitEs: "",
    noteEs: "Compará a Messi ganando con Miami en 1 mes"
    },
  {
    label: "任意球荒",
    labelEn: "Free-kick drought",
    value: "600 天",
    valueEn: "600 days",
    unit: "0 球",
    unitEn: "0 goals",
    note: "联赛 59 次尝试零进球",
    noteEn: "0 from 59 league attempts",
    score: 20,
    labelEs: "Sequía de faltas",
    valueEs: "600 días",
    unitEs: "0 goles",
    noteEs: "0 en 59 intentos en liga"
    },
  {
    label: "世界杯淘汰赛",
    labelEn: "World Cup knockouts",
    value: "9场1球",
    valueEn: "9 games, 1 goal",
    unit: "",
    unitEn: "",
    note: "六届世界杯淘汰赛仅 1 球，2026 破零后被西班牙补时绝杀淘汰",
    noteEn: "1 goal in 9 knockout games across six World Cups; broke the duck in 2026 then was knocked out by Spain's stoppage winner",
    score: 14,
    labelEs: "Eliminatorias del Mundial",
    valueEs: "9 partidos, 1 gol",
    unitEs: "",
    noteEs: "1 gol en 9 partidos de eliminatoria en seis Mundiales; rompió la sequía en 2026 y luego España lo eliminó con un gol en el descuento"
    },
  {
    label: "欧冠淘汰赛隐身",
    labelEn: "Champions League invisibility",
    value: "近 5 年",
    valueEn: "Past 5 years",
    unit: "",
    unitEn: "",
    note: "多次关键战 0 射正或被换下",
    noteEn: "Multiple key games with 0 shots on target or subbed off",
    score: 25,
    labelEs: "Invisibilidad en Champions",
    valueEs: "Últimos 5 años",
    unitEs: "",
    noteEs: "Varios partidos clave con 0 disparos a puerta o siendo sustituido"
    },
  {
    label: "社交媒体含水量",
    labelEn: "Social-media water content",
    value: "24.3%",
    valueEn: "24.3%",
    unit: "假粉",
    unitEn: "fake followers",
    note: "6亿粉中约 5020 万~1 亿假粉",
    noteEn: "Of 600M followers, ~50–100M are fake",
    score: 25,
    labelEs: "Contenido «agua» en redes sociales",
    valueEs: "24,3%",
    unitEs: "seguidores falsos",
    noteEs: "De 600 M de seguidores, ~50–100 M son falsos"
    },
  {
    label: "单赛季射门垄断",
    labelEn: "Single-season shot monopoly",
    value: "135 次",
    valueEn: "135 shots",
    unit: "",
    unitEn: "",
    note: "贝尔 50 + 本泽马 60 = 不及他一人",
    noteEn: "Bale 50 + Benzema 60 = still less than him alone",
    score: 20,
    labelEs: "Monopolio de disparos en una temporada",
    valueEs: "135 disparos",
    unitEs: "",
    noteEs: "Bale 50 + Benzema 60 = todavía menos que él solo"
    },
  {
    label: "沙特点球占比",
    labelEn: "Saudi penalty share",
    value: "35 球含点",
    valueEn: "35 incl. pens",
    unit: "",
    unitEn: "",
    note: "2023/24 赛季大量来自点球",
    noteEn: "A large chunk of 2023/24 goals came from penalties",
    score: 18,
    labelEs: "Porcentaje de penales saudíes",
    valueEs: "35 incl. penales",
    unitEs: "",
    noteEs: "Una gran parte de los goles de 2023/24 vinieron de penales"
    }
  ],
totalScore: 16,
totalLabel: "综合含金量",
totalLabelEn: "Overall Purity",
totalLabelEs: "Pureza Total"
};

/* ========== 罪恶账本烧钱榜 ==========
 * 金额从大到小，单位统一处理
 */
const moneyLedger = [
{
  amount: "40 亿",
  currency: "$",
  desc: "可口可乐市值蒸发",
  descEn: "Coca-Cola market-cap wipeout",
  detail: "2020欧洲杯移走两瓶可乐，股价 56.10 → 55.22",
  detailEn: "Euro 2020 — moved two Coke bottles, stock 56.10 → 55.22",
  cat: "场外",
  catEn: "Off-pitch",
  descEs: "Esfumado de la capitalización de Coca-Cola",
  detailEs: "Euro 2020 — apartó dos botellas de Coke, acción 56,10 → 55,22",
  catEs: "Fuera del campo"
  },
{
  amount: "10 亿",
  currency: "$",
  desc: "生涯总收入",
  descEn: "Career total earnings",
  detail: "史上首位团队运动破 10 亿美元的足球运动员",
  detailEn: "First team-sport footballer to surpass $1 billion in career earnings",
  cat: "金钱",
  catEn: "Money",
  descEs: "Ingresos totales de la carrera",
  detailEs: "Primer futbolista de un deporte de equipo en superar los 1.000 millones de dólares en ingresos de carrera",
  catEs: "Dinero"
  },
{
  amount: "2 亿",
  currency: "€",
  desc: "利雅得胜利年薪",
  descEn: "Al Nassr yearly salary",
  detail: "远走沙特，被讽\"去沙漠养老\"",
  detailEn: "Fled to Saudi, mocked as \"going to the desert to retire\"",
  cat: "金钱",
  catEn: "Money",
  descEs: "Sueldo anual del Al Nassr",
  detailEs: "Huyó a Arabia, ridiculizado como «se va al desierto a jubilarse»",
  catEs: "Dinero"
  },
{
  amount: "1880 万",
  currency: "€",
  desc: "西班牙逃税罚款",
  descEn: "Spanish tax-fraud fine",
  detail: "税款+利息+罚金（对比梅西仅 410 万）",
  detailEn: "Tax + interest + penalty (vs just €4.1M for Messi)",
  cat: "法律",
  catEn: "Legal",
  descEs: "Multa por fraude fiscal en España",
  detailEs: "Impuesto + intereses + multa (vs solo 4,1 M€ para Messi)",
  catEs: "Legal"
  },
{
  amount: "1 亿",
  currency: "€",
  desc: "转会尤文图斯身价",
  descEn: "Juventus transfer fee",
  detail: "33 岁天价转会",
  detailEn: "A blockbuster transfer at age 33",
  cat: "金钱",
  catEn: "Money",
  descEs: "Fichaje por la Juventus",
  detailEs: "Un traspaso bomba a los 33 años",
  catEs: "Dinero"
  },
{
  amount: "37.5 万",
  currency: "$",
  desc: "拉斯维加斯封口费",
  descEn: "Las Vegas hush money",
  detail: "2009 年事件，事后封口",
  detailEn: "2009 incident, paid afterwards to keep silent",
  cat: "法律",
  catEn: "Legal",
  descEs: "Dinero para callar en Las Vegas",
  detailEs: "Incidente de 2009, pagado después para mantener el silencio",
  catEs: "Legal"
  },
{
  amount: "1400 万",
  currency: "€",
  desc: "范尼被贱卖皇马",
  descEn: "Van Nistelrooy sold off cheap",
  detail: "因训练场冲突被低价处理",
  detailEn: "Offloaded cheaply after a training-ground clash",
  cat: "冲突",
  catEn: "Conflict",
  descEs: "Van Nistelrooy vendido barato",
  detailEs: "Traspasado a bajo precio tras una bronca en el entrenamiento",
  catEs: "Conflicto"
  },
{
  amount: "6.4 万",
  currency: "€",
  desc: "摔掉的队长袖标拍卖价",
  descEn: "Tossed armband auction price",
  detail: "救 SMA 婴儿，因祸得福",
  detailEn: "Funded treatment for a baby with SMA — a silver lining",
  cat: "冲突",
  catEn: "Conflict",
  descEs: "Precio de subasta del brazalete tirado",
  detailEs: "Financió el tratamiento de un bebé con AME — una nota positiva",
  catEs: "Conflicto"
  },
{
  amount: "5 万",
  currency: "£",
  desc: "摔手机足总罚款",
  descEn: "FA fine for smashing a phone",
  detail: "+ 2 场禁赛",
  detailEn: "+ 2-match ban",
  cat: "冲突",
  catEn: "Conflict",
  descEs: "Multa de la FA por romper un móvil",
  detailEs: "+ 2 partidos de sanción",
  catEs: "Conflicto"
  }
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
{
  top: "我的父姓是 Aveiro",
  topEn: "My surname is Aveiro",
  bottom: "但我偏要叫 Ronaldo",
  bottomEn: "But I insist on Ronaldo",
  topEs: "Mi apellido es Aveiro",
  bottomEs: "Pero yo insisto en Ronaldo"
  },
{
  top: "点球进了！",
  topEn: "Penalty scored!",
  bottom: "siuuuuuuu",
  bottomEn: "siuuuuuuu",
  topEs: "¡Penal anotado!",
  bottomEs: "siuuuuuuu"
  },
{
  top: "世界杯淘汰赛 9 场才 1 球",
  topEn: "1 goal in 9 World Cup knockouts",
  bottom: "但我是历史第一第二第三",
  bottomEn: "But I'm the 1st, 2nd & 3rd best ever",
  topEs: "1 gol en 9 eliminatorias del Mundial",
  bottomEs: "Pero soy el 1.º, 2.º y 3.º mejor"
  },
{
  top: "4 年才拿 1 个沙特冠",
  topEn: "4 years for 1 Saudi title",
  bottom: "沙漠骆驼不是白叫的",
  bottomEn: "They don't call me Desert Camel for nothing",
  topEs: "4 años para 1 título saudí",
  bottomEs: "El Camello del Desierto no es por gusto"
  },
{
  top: "梅西拿了世界杯",
  topEn: "Messi won the World Cup",
  bottom: "Factos! Factos! Factos!",
  bottomEn: "Factos! Factos! Factos!",
  topEs: "Messi ganó el Mundial",
  bottomEs: "¡Factos! ¡Factos! ¡Factos!"
  },
{
  top: "我又摔了袖标/手机/麦克风",
  topEn: "I tossed an armband/phone/mic again",
  bottom: "这次是裁判的错",
  bottomEn: "This time it's the ref's fault",
  topEs: "Volví a tirar un brazalete/móvil/micrófono",
  bottomEs: "Esta vez culpa del árbitro"
  },
{
  top: "14 张红牌",
  topEn: "14 red cards",
  bottom: "那都是对方挑衅",
  bottomEn: "They all provoked me",
  topEs: "14 tarjetas rojas",
  bottomEs: "Todos me provocaron"
  },
{
  top: "6 亿粉丝 24% 是假的",
  topEn: "24% of my 600M fans are fake",
  bottom: "但点赞是真的",
  bottomEn: "But the likes are real",
  topEs: "El 24% de mis 600 M de fans son falsos",
  bottomEs: "Pero los likes son reales"
  },
{
  top: "教练不让我首发",
  topEn: "The coach won't start me",
  bottom: "我炮轰曼联然后去沙特",
  bottomEn: "So I blast United and head to Saudi",
  topEs: "El entrenador no me alinea",
  bottomEs: "Así que destrozo al United y me voy a Arabia"
  },
{
  top: "任意球 600 天没进",
  topEn: "0 free-kick goals in 600 days",
  bottom: "我念咒了但没用",
  bottomEn: "I chanted but it didn't work",
  topEs: "0 goles de falta en 600 días",
  bottomEs: "Recé un conjuro pero no funcionó"
  },
{
  top: "卢森堡我进了 11 个",
  topEn: "I scored 11 against Luxembourg",
  bottom: "我是国家队历史射手王",
  bottomEn: "I'm the all-time national top scorer",
  topEs: "Le metí 11 a Luxemburgo",
  bottomEs: "Soy el máximo goleador histórico de la selección"
  },
{
  top: "你们不尊重我",
  topEn: "You don't respect me",
  bottom: "所以我摔袖标离场",
  bottomEn: "So I toss my armband and leave",
  topEs: "No me respetáis",
  bottomEs: "Así que tiro el brazalete y me voy"
  }
];

/* ========== 罗黑程度测试题库 ==========
 * 25 题单选大题库，每次随机抽取并打乱题序/选项，保证每局体验不同。
 * 紧扣本馆数据：红牌/世界杯/点球/跳水/金球/逃税/可口可乐/摔手机/袖标/
 * 眨眼门/利雅得/卢森堡/任意球/迷你罗/自设奖项/背弃祖姓 等。
 * a = 正确选项 index（0 起），fb = 作答后的解释反馈。
 */
const quizData = [
{
  q: "C罗生涯红牌总数大约是多少张？",
  qEn: "Roughly how many red cards has Cristiano Ronaldo collected in his career?",
  opts: [
    {
      v: "3 张",
      vEn: "3",
      vEs: "3"
      },
    {
      v: "8 张",
      vEn: "8",
      vEs: "8"
      },
    {
      v: "14 张",
      vEn: "14",
      vEs: "14"
      },
    {
      v: "20 张",
      vEn: "20",
      vEs: "20"
      }
    ],
  a: 2,
  fb: "正确是 14 张。曼联 4 + 皇马 6 + 尤文 1 + 利雅得胜利 1 + 葡萄牙 1 + 其他 1，是梅西（3 张）的近 5 倍。",
  fbEn: "Correct: 14. Man Utd 4 + Real Madrid 6 + Juve 1 + Al Nassr 1 + Portugal 1 + other 1 — nearly 5x Messi's 3.",
  qEs: "¿Cuántas tarjetas rojas ha visto Cristiano Ronaldo a lo largo de su carrera, aproximadamente?",
  fbEs: "Correcto: 14. Man Utd 4 + Real Madrid 6 + Juve 1 + Al Nassr 1 + Portugal 1 + otras 1 — casi 5 veces las 3 de Messi."
  },
{
  q: "截至 2026，C罗在世界杯淘汰赛进了几个球？",
  qEn: "As of 2026, how many goals has Cristiano scored in World Cup knockout matches?",
  opts: [
    {
      v: "0 个",
      vEn: "0",
      vEs: "0"
      },
    {
      v: "1 个",
      vEn: "1",
      vEs: "1"
      },
    {
      v: "3 个",
      vEn: "3",
      vEs: "3"
      },
    {
      v: "8 个",
      vEn: "8",
      vEs: "8"
      }
    ],
  a: 1,
  fb: "正确是 1 个。六届世界杯淘汰赛 9 场仅 1 球——2026 1/16 决赛才破零，紧接着 1/8 决赛就被西班牙补时绝杀淘汰。对比梅西同舞台建功并 2022 夺冠。",
  fbEn: "Correct: 1. One goal in 9 knockout games across six World Cups — he finally broke the duck in the 2026 Round of 16, then was knocked out by Spain's stoppage winner in the Round of 16. Compare Messi, who delivered on the same stage and won the 2022 title.",
  qEs: "A fecha de 2026, ¿cuántos goles ha marcado Cristiano en partidos eliminatorios del Mundial?",
  fbEs: "Correcto: 1. Un gol en 9 partidos de eliminatoria en seis Mundiales — por fin rompió la sequía en 16avos de 2026, y en octavos España lo eliminó con un gol en el descuento. Compará con Messi, que brilló en la misma fase y ganó el título de 2022."
  },
{
  q: "C罗生涯点球进球数约为？",
  qEn: "Roughly how many penalties has Cristiano scored in his career?",
  opts: [
    {
      v: "约 50 个",
      vEn: "About 50",
      vEs: "Uns 50"
      },
    {
      v: "约 109 个",
      vEn: "About 109",
      vEs: "Uns 109"
      },
    {
      v: "约 175 个",
      vEn: "About 175",
      vEs: "Uns 175"
      },
    {
      v: "约 250 个",
      vEn: "About 250",
      vEs: "Uns 250"
      }
    ],
  a: 2,
  fb: "正确约 175 个（主罚 208 次），占生涯进球近 1/6。梅西约 109 个，比他少 66 个点球。",
  fbEn: "Correct: about 175 (from 208 taken) — nearly 1/6 of his career goals. Messi has around 109, that's 66 fewer penalties.",
  qEs: "¿Cuántos penales ha marcado Cristiano en su carrera, aproximadamente?",
  fbEs: "Correcto: unos 175 (de 208 lanzados) — casi 1/6 de sus goles en la carrera. Messi tiene unos 109, eso son 66 penales menos."
  },
{
  q: "英媒给C罗起的讽刺绰号「跳水王」，源自他什么习惯？",
  qEn: "The English press dubbed Cristiano \"Diver\" — what habit inspired it?",
  opts: [
    {
      v: "频繁假摔索要犯规",
      vEn: "Constantly diving to win fouls",
      vEs: "Simulaba constantemente buscando faltas"
      },
    {
      v: "赛后跳进泳池庆祝",
      vEn: "Leaping into the pool to celebrate",
      vEs: "Saltaba a la piscina a celebrar después del partido"
      },
    {
      v: "训练时跳水放松",
      vEn: "Diving into the pool after training",
      vEs: "Se tiraba en los entrenamientos para relajarse"
      },
    {
      v: "跳水运动员出身",
      vEn: "He used to be a platform diver",
      vEs: "Era buceador antes de ser futbolista"
      }
    ],
  a: 0,
  fb: "源自他频繁假摔。2006 世界杯「跳水」名场面后，被英媒封为「跳水王」，中文圈也衍生绰号「水罗」。",
  fbEn: "From his constant diving. After the infamous \"dive\" at the 2006 World Cup, the English media crowned him \"Diver\" — the Chinese sphere went with the nickname \"Water-lo\".",
  qEs: "La prensa inglesa bautizó a Cristiano como «Diver» (simulador) — ¿qué costumbre lo inspiró?",
  fbEs: "Por sus simulaciones constantes. Tras la piscina contra Francia en el Mundial 2006, la prensa inglesa lo llamó «Diver»; el apodo «Penaldo» nació de ahí."
  },
{
  q: "C罗加盟利雅得胜利后，等多久才拿到首个联赛冠军？",
  qEn: "After joining Al Nassr, how long did Cristiano wait for his first league title?",
  opts: [
    {
      v: "约 1 个月",
      vEn: "About 1 month",
      vEs: "Uns 1 mes"
      },
    {
      v: "约半年",
      vEn: "About half a year",
      vEs: "Uns medio año"
      },
    {
      v: "约 1 年",
      vEn: "About 1 year",
      vEs: "Uns 1 año"
      },
    {
      v: "约 4 年",
      vEn: "About 4 years",
      vEs: "Uns 4 años"
      }
    ],
  a: 3,
  fb: "正确约 1460 天（≈4 年）。对比梅西加盟迈阿密国际约 30 天即夺联赛杯，慢了约 48 倍。",
  fbEn: "Correct: about 1460 days (≈4 years). Compare Messi, who won the Leagues Cup with Inter Miami in around 30 days — Cristiano was ~48x slower.",
  qEs: "Tras fichar por el Al Nassr, ¿cuánto tardó Cristiano en ganar su primer título de liga?",
  fbEs: "Correcto: unos 1460 días (≈4 años). Compará con Messi, que ganó con el Inter Miami en ~1 mes: 48 veces más rápido."
  },
{
  q: "C罗在国家队大量进球，单是对阵卢森堡就刷了几个？",
  qEn: "Cristiano pads his national-team tally heavily — how many has he scored against Luxembourg alone?",
  opts: [
    {
      v: "3 个",
      vEn: "3",
      vEs: "3"
      },
    {
      v: "7 个",
      vEn: "7",
      vEs: "7"
      },
    {
      v: "11 个",
      vEn: "11",
      vEs: "11"
      },
    {
      v: "20 个",
      vEn: "20",
      vEs: "20"
      }
    ],
  a: 2,
  fb: "正确 11 个。对阵卢森堡 11 + 立陶宛 7 + 瑞典 7，弱旅刷分是含金量争议的核心。",
  fbEn: "Correct: 11. Luxembourg 11 + Lithuania 7 + Sweden 7 — stat-padding against minnows is the heart of the \"quality\" debate.",
  qEs: "Cristiano infla mucho sus cifras con la selección — ¿cuántos goles le metió solo a Luxemburgo?",
  fbEs: "Correcto: 11. Luxemburgo 11 + Lituania 7 + Suecia 7. Una parte importante de sus goles con Portugal son contra equipos pequeños."
  },
{
  q: "C罗近年联赛任意球「进球荒」大约持续了多久？",
  qEn: "Roughly how long did Cristiano's league free-kick goal drought last?",
  opts: [
    {
      v: "约 50 天",
      vEn: "About 50 days",
      vEs: "Uns 50 días"
      },
    {
      v: "约 200 天",
      vEn: "About 200 days",
      vEs: "Uns 200 días"
      },
    {
      v: "约 600 天",
      vEn: "About 600 days",
      vEs: "Uns 600 días"
      },
    {
      v: "从未进过任意球",
      vEn: "He's never scored one",
      vEs: "Nunca marcó una falta"
      }
    ],
  a: 2,
  fb: "正确约 600 天 0 球，期间联赛 59 次尝试零进球。曾经的招牌技能严重保质。",
  fbEn: "Correct: about 600 days and 0 goals, with 0 from 59 league attempts. The signature skill went seriously past its sell-by date.",
  qEs: "¿Cuánto duró, aproximadamente, la sequía goleadora de Cristiano en faltas de liga?",
  fbEs: "Correcto: unos 600 días y 0 goles, con 0 en 59 intentos en liga. Su mito de «cañonero de faltas» no se sostiene con los datos recientes."
  },
{
  q: "金球奖数量，C罗 vs 梅西是？",
  qEn: "Ballon d'Or count — Cristiano vs Messi?",
  opts: [
    {
      v: "8 : 5",
      vEn: "8 : 5",
      vEs: "8 : 5"
      },
    {
      v: "5 : 8",
      vEn: "5 : 8",
      vEs: "5 : 8"
      },
    {
      v: "5 : 5",
      vEn: "5 : 5",
      vEs: "5 : 5"
      },
    {
      v: "7 : 6",
      vEn: "7 : 6",
      vEs: "7 : 6"
      }
    ],
  a: 1,
  fb: "正确 5 : 8。C罗 5 座（2008/13/14/16/17），梅西 8 座，落后 3 座最高个人荣誉。",
  fbEn: "Correct: 5 : 8. Cristiano has 5 (2008/13/14/16/17), Messi has 8 — three behind on the top individual honour.",
  qEs: "Conteo de Balones de Oro — ¿Cristiano vs Messi?",
  fbEs: "Correcto: 5 : 8. Cristiano tiene 5 (2008/13/14/16/17); Messi tiene 8. Tres Balones de Oro por detrás."
  },
{
  q: "2017年C罗被西班牙法院认定的逃税金额与罚款约为？",
  qEn: "In 2017 the Spanish court ruled on Cristiano's tax fraud — what were the evaded amount and fine roughly?",
  opts: [
    {
      v: "约 200 万 / 罚款 50 万",
      vEn: "~€2M / €500k fine",
      vEs: "Uns 2 M / multa 500 mil"
      },
    {
      v: "约 1470 万 / 罚款 1880 万",
      vEn: "~€14.7M / €18.8M fine",
      vEs: "Uns 14,7 M / multa 18,8 M"
      },
    {
      v: "约 5000 万 / 罚款 1 亿",
      vEn: "~€50M / €100M fine",
      vEs: "Uns 50 M / multa 100 M"
      },
    {
      v: "从未逃税",
      vEn: "Never evaded tax",
      vEs: "Nunca defraudó"
      }
    ],
  a: 1,
  fb: "正确约逃税 1470 万欧元，认罪后罚款 1880 万 + 23 个月缓刑。 offshore 影子公司藏肖像权收入。",
  fbEn: "Correct: ~€14.7M evaded; after pleading guilty, an €18.8M fine + 23-month suspended sentence. Image rights were hidden via offshore shell companies.",
  qEs: "En 2017 el tribunal español dictaminó sobre el fraude fiscal de Cristiano — ¿cuál era, aproximadamente, la cantidad defraudada y la multa?",
  fbEs: "Correcto: ~14,7 M€ defraudados; tras declararse culpable, una multa de ~18,8 M€. 3,6 veces lo que defraudó Messi."
  },
{
  q: "2006世界杯「眨眼门」事件，C罗坑哭了哪位俱乐部队友？",
  qEn: "In the 2006 World Cup \"wink-gate\", which club teammate did Cristiano get sent off?",
  opts: [
    {
      v: "鲁尼",
      vEn: "Wayne Rooney",
      vEs: "Rooney"
      },
    {
      v: "吉格斯",
      vEn: "Ryan Giggs",
      vEs: "Giggs"
      },
    {
      v: "斯科尔斯",
      vEn: "Paul Scholes",
      vEs: "Scholes"
      },
    {
      v: "费迪南德",
      vEn: "Rio Ferdinand",
      vEs: "Ferdinand"
      }
    ],
  a: 0,
  fb: "正确是鲁尼。鲁尼踩卡瓦略被罚下后，C罗对替补席眨眼示意「搞定了」，赛后英媒哗然，回英超被骂到差点离队。",
  fbEn: "Correct: Wayne Rooney. After Rooney was sent off for stomping on Carvalho, Cristiano winked at the bench as if to say \"done\". The English press erupted, and he was nearly hounded out of the Premier League on his return.",
  qEs: "En el «guiñogate» del Mundial 2006, ¿a qué compañero de club hicieron expulsar por la presión de Cristiano?",
  fbEs: "Correcto: Wayne Rooney. Tras la expulsión de Rooney por pisotón a Carvalho, las cámaras cazaron a Cristiano guiñando el ojo al banquillo. Enemigo público n.º 1 en Inglaterra."
  },
{
  q: "2021欧洲杯发布会，C罗移走可口可乐致其市值大约蒸发了多少？",
  qEn: "At the Euro 2021 press conference, Cristiano moved the Coke bottles — about how much market cap evaporated?",
  opts: [
    {
      v: "约 4000 万美元",
      vEn: "~$40M",
      vEs: "Uns 40 M de dólares"
      },
    {
      v: "约 4 亿美元",
      vEn: "~$400M",
      vEs: "Uns 400 M de dólares"
      },
    {
      v: "约 40 亿美元",
      vEn: "~$4B",
      vEs: "Uns 4.000 M de dólares"
      },
    {
      v: "没影响",
      vEn: "No impact",
      vEs: "Nada"
      }
    ],
  a: 2,
  fb: "正确约 40 亿美元。一句「喝水，不要可乐」让可口可乐单日股价跳水 1.6%，市值蒸发约 40 亿。",
  fbEn: "Correct: ~$4B. One line — \"Drink water, not Coke\" — sent Coca-Cola's stock down 1.6% in a day, wiping out roughly $4B in market cap.",
  qEs: "En la rueda de prensa de la Euro 2021, Cristiano apartó las botellas de Coke — ¿cuánto se esfumó de la capitalización aproximadamente?",
  fbEs: "Correcto: ~4.000 M$ (~4 mil millones). Una frase — «bebe agua, no Coke» — y la acción de Coca-Cola se desplomó."
  },
{
  q: "C罗在古迪逊公园摔碎的小球迷手机，那个小球迷是什么情况？",
  qEn: "The phone Cristiano smashed at Goodison Park belonged to a young fan — what was the situation?",
  opts: [
    {
      v: "成年职业球迷",
      vEn: "An adult pro fan",
      vEs: "Aficionado adulto profesional"
      },
    {
      v: "自闭症小球迷",
      vEn: "An autistic boy",
      vEs: "Aficionado autista"
      },
    {
      v: "客队球迷",
      vEn: "An away fan",
      vEs: "Aficionado del equipo visitante"
      },
    {
      v: "对方球员家属",
      vEn: "A relative of an opposition player",
      vEs: "Familiar de un jugador rival"
      }
    ],
  a: 1,
  fb: "正确是自闭症小球迷。赛后 C 罗输球恼怒，下楼时把 14 岁自闭症男孩的手机打落，遭足总禁赛 + 罚款。",
  fbEn: "Correct: an autistic boy. Furious after the loss, Cristiano slapped the phone out of the 14-year-old's hand on his way down the tunnel — the FA hit him with a ban and a fine.",
  qEs: "El móvil que Cristiano rompió en Goodison Park era de un joven aficionado — ¿cuál era la situación?",
  fbEs: "Correcto: un niño autista. Furioso tras la derrota, Cristiano le golpeó el móvil de la mano. La FA lo multó con 50.000 £ y 2 partidos."
  },
{
  q: "C罗第一次摔队长袖标（对塞尔维亚绝杀被误判无效后），发生在哪个赛事？",
  qEn: "Where did Cristiano first throw down his captain's armband (after the wrongly disallowed winner vs Serbia)?",
  opts: [
    {
      v: "2022 世界杯预选赛",
      vEn: "2022 World Cup qualifiers",
      vEs: "Clasificatorio del Mundial 2022"
      },
    {
      v: "2021 欧洲杯",
      vEn: "Euro 2021",
      vEs: "Eurocopa 2021"
      },
    {
      v: "2018 世界杯",
      vEn: "2018 World Cup",
      vEs: "Mundial 2018"
      },
    {
      v: "2016 欧洲杯",
      vEn: "Euro 2016",
      vEs: "Eurocopa 2016"
      }
    ],
  a: 0,
  fb: "正确是 2022 世界杯预选赛（2021 年 3 月进行）。对塞尔维亚的补时绝杀被误判无效后，C罗下场时怒摔袖标——这枚袖标后来被拍卖 6.4 万欧元用于慈善；同年 6 月欧洲杯出局后他又摔了一次。",
  fbEn: "Correct: the 2022 World Cup qualifiers (played March 2021). After his stoppage-time winner vs Serbia was wrongly ruled out, Cristiano flung the armband on his way off — it later sold at auction for €64k for charity; he threw it again after Portugal's Euro exit that June.",
  qEs: "¿Dónde tiró Cristiano el brazalete de capitán por primera vez (tras el gol mal anulado ante Serbia)?",
  fbEs: "Correcto: la clasificación para el Mundial 2022 (disputada en marzo de 2021). Tras anularle erróneamente un gol en el descuento ante Serbia, lanzó el brazalete al salir (se subastó por 64.000 €); volvió a tirarlo tras la eliminación en la Eurocopa."
  },
{
  q: "2016欧洲杯决赛C罗「躺冠」是怎么回事？",
  qEn: "What's the story behind Cristiano's \"carried to a title\" in the Euro 2016 final?",
  opts: [
    {
      v: "全场最佳carry夺冠",
      vEn: "Player of the match, carried the team",
      vEs: "Mejor jugador del partido que llevó al título"
      },
    {
      v: "25分钟伤退，在场边指挥被营销成灵魂领袖",
      vEn: "Off injured in 25 min, barking from the touchline, marketed as the spiritual leader",
      vEs: "Se lesionó en el minuto 25 y desde la banda lo vendieron como líder espiritual"
      },
    {
      v: "替补登场绝杀",
      vEn: "Came off the bench and scored the winner",
      vEs: "Entró desde el banquillo y marcó el gol ganador"
      },
    {
      v: "没进大名单",
      vEn: "Wasn't even in the squad",
      vEs: "No entró en la convocatoria"
      }
    ],
  a: 1,
  fb: "正确是 25 分钟伤退。在场边当「拉扯教练」，夺冠后被葡萄牙官方营销成第一功臣，但决赛实际贡献有限。",
  fbEn: "Correct: he went off injured in the 25th minute. He played \"coach on the sideline\", and Portuguese PR turned him into the man of the hour — but his actual contribution in the final was limited.",
  qEs: "¿Cuál es la historia detrás del «llevado al título» de Cristiano en la final de la Eurocopa 2016?",
  fbEs: "Correcto: se lesionó en el minuto 25. Desde la banda jugó de «entrenador»; el suplente Éder marcó el gol ganador en la prórroga."
  },
{
  q: "C罗背弃祖姓 Aveiro，改名只用 Ronaldo，主要争议是？",
  qEn: "Cristiano ditched his surname Aveiro and goes only by Ronaldo — what's the main controversy?",
  opts: [
    {
      v: "纪念父亲",
      vEn: "To honour his father",
      vEs: "En memoria de su padre"
      },
    {
      v: "蹭「罗纳尔多」前辈热度 + 掩盖父姓",
      vEn: "Coattailing the \"Ronaldo\" legend + hiding his real surname",
      vEs: "Subirse a la fama de «Ronaldo» (el brasileño) y ocultar el apellido paterno"
      },
    {
      v: "宗教原因",
      vEn: "For religious reasons",
      vEs: "Razones religiosas"
      },
    {
      v: "经纪人要求",
      vEn: "The agent demanded it",
      vEs: "Por exigencia de su representante"
      }
    ],
  a: 1,
  fb: "正确是蹭热度 + 掩盖父姓。他姓 Aveiro，却只推 Ronaldo（注册 CR7 品牌），被批「忘本」。",
  fbEn: "Correct: coattailing + hiding the surname. He's an Aveiro, but only pushes \"Ronaldo\" (registered as the CR7 brand) — criticised as forgetting his roots.",
  qEs: "Cristiano tiró su apellido Aveiro y se hace llamar solo Ronaldo — ¿cuál es la principal polémica?",
  fbEs: "Correcto: subirse a la fama + ocultar el apellido. Es Cristiano dos Santos Aveiro; «Ronaldo» es solo un segundo nombre."
  },
{
  q: "迷你罗（Cristiano Jr.）的生母身份，C罗方面的官方说法是？",
  qEn: "What's Cristiano's camp's official line on the mother of Cristiano Jr.?",
  opts: [
    {
      v: "公开的母亲是某模特",
      vEn: "The mother is a known model",
      vEs: "La madre pública es una modelo"
      },
    {
      v: "付封口费保密，疑似代孕",
      vEn: "Hush money + NDA, suspected surrogate",
      vEs: "Pagó para mantener el silencio, posible gestación subrogada"
      },
    {
      v: "母亲已去世",
      vEn: "The mother has passed away",
      vEs: "La madre ha muerto"
      },
    {
      v: "母亲是亲戚",
      vEn: "A relative",
      vEs: "La madre es una pariente"
      }
    ],
  a: 1,
  fb: "正确是付封口费保密。疑似代孕，签保密协议，生母身份至今成谜，被媒体称作「足坛最大谜团之一」。",
  fbEn: "Correct: paid to keep silent. A suspected surrogacy, an NDA, and a mother whose identity is still a mystery — the media calls it \"one of football's biggest riddles\".",
  qEs: "¿Cuál es la versión oficial del entorno de Cristiano sobre la madre de Cristiano Jr.?",
  fbEs: "Correcto: pagó para mantener el silencio. Posible gestación subrogada; la madre biológica es confidencial."
  },
{
  q: "C罗自设的「环球足球奖」（Globe Soccer Awards）最大争议是？",
  qEn: "What's the biggest controversy around Cristiano's own \"Globe Soccer Awards\"?",
  opts: [
    {
      v: "公平公正",
      vEn: "Fair and transparent",
      vEs: "Justos y transparentes"
      },
    {
      v: "自费办奖经常颁给自己",
      vEn: "Self-funded, hands trophies to himself",
      vEs: "Se autofinancia el premio y se lo da a sí mismo a menudo"
      },
    {
      v: "只颁队友",
      vEn: "Only ever given to teammates",
      vEs: "Solo premia a compañeros"
      },
    {
      v: "国际足联认证",
      vEn: "FIFA-certified",
      vEs: "Certificado por la FIFA"
      }
    ],
  a: 1,
  fb: "正确是自费办奖颁自己。自己投资、自己出席、自己领奖，被讽为「自嗨奖」「花钱买奖杯」。",
  fbEn: "Correct: self-funded, self-awarded. He invests, shows up, and wins — mocked as a \"vanity award\" and \"trophy you buy for yourself\".",
  qEs: "¿Cuál es la mayor polémica en torno a los propios «Globe Soccer Awards» de Cristiano?",
  fbEs: "Correcto: se autofinancia y se autopremia. Invierte, organiza y se lleva el premio a Mejor Jugano casi cada año."
  },
{
  q: "2013金球奖为何被里贝里痛批「偷」？",
  qEn: "Why did Ribéry slam the 2013 Ballon d'Or as \"stolen\"?",
  opts: [
    {
      v: "投票完全透明",
      vEn: "Voting was fully transparent",
      vEs: "La votación fue totalmente transparente"
      },
    {
      v: "投票截止日突然延期，正好赶上 C罗世预赛附加赛帽子戏法",
      vEn: "Voting deadline was suddenly extended, right after Cristiano's play-off hat-trick",
      vEs: "El plazo de votación se prorrogó de golpe, justo con el hat-trick de Cristiano en el playoff mundialista"
      },
    {
      v: "里贝里主动退出",
      vEn: "Ribéry withdrew himself",
      vEs: "Ribéry se retiró voluntariamente"
      },
    {
      v: "评委集体改票",
      vEn: "Voters switched en masse",
      vEs: "El jurado cambió de voto en masa"
      }
    ],
  a: 1,
  fb: "正确是延期。原定 11 月公布，国际足联突然宣布延期至 2014 年 1 月，时机恰好让 C罗附加赛表演进入视野，里贝里从此耿耿于怀。",
  fbEn: "Correct: the deadline was extended. Originally set for November, FIFA abruptly pushed it to January 2014 — conveniently letting Cristiano's play-off show enter voters' minds. Ribéry never got over it.",
  qEs: "¿Por qué Ribéry tildó el Balón de Oro 2013 de «robado»?",
  fbEs: "Correcto: se prorrogó el plazo. Originalmente fijada en noviembre, la FIFA la amplió justo cuando Cristiano se dio un hat-trick ante Suecia."
  },
{
  q: "C罗在尤文图斯/曼联二期，对俱乐部造成的「衰退」常被概括为？",
  qEn: "The \"decline\" Cristiano caused at Juventus / Man Utd II is often summed up as?",
  opts: [
    {
      v: "战术核心carry",
      vEn: "The tactical centerpiece",
      vEs: "Eje táctico que llevó al equipo"
      },
    {
      v: "废队友废教练，球队围绕他战绩下滑",
      vEn: "Ruining teammates and coaches, team built around him slides",
      vEs: "Rompe compañeros y entrenadores, el equipo baja cuando gira en torno a él"
      },
    {
      v: "带飞全队夺冠",
      vEn: "Carried the team to titles",
      vEs: "Llevó a todos a ganar títulos"
      },
    {
      v: "培养年轻人",
      vEn: "Developing young players",
      vEs: "Desarrolló a los jóvenes"
      }
    ],
  a: 1,
  fb: "正确是废队友废教练。尤文围绕他重建战术连丢欧冠；回归曼联后炮轰俱乐部 + 主帅，更衣室分裂。",
  fbEn: "Correct: ruining teammates and coaches. Juve rebuilt the tactic around him and kept missing out on the Champions League; back at United he blasted the club and the manager, splitting the dressing room.",
  qEs: "El «declive» que Cristiano provocó en la Juventus / el United II se resume a menudo como…",
  fbEs: "Correcto: arruinar a compañeros y entrenadores. La Juve rompió su racha de la Serie A; el United entró en caos."
  },
{
  q: "皮尔斯·摩根专访事件，C罗炮轰曼联的具体内容是？",
  qEn: "In the Piers Morgan interview, what exactly did Cristiano blast United over?",
  opts: [
    {
      v: "称赞俱乐部专业",
      vEn: "Praising the club's professionalism",
      vEs: "Elogió el profesionalismo del club"
      },
    {
      v: "炮轰俱乐部设施、主帅滕哈格、感到被「背叛」",
      vEn: "Blasting the facilities, manager Ten Hag, feeling \"betrayed\"",
      vEs: "Destrozó las instalaciones, al entrenador ten Hag y dijo sentirse «traicionado»"
      },
    {
      v: "宣布永久留队",
      vEn: "Announcing he'd stay for life",
      vEs: "Anunció que se quedaba para siempre"
      },
    {
      v: "只是私下聊天",
      vEn: "Just a private chat",
      vEs: "Solo fue una charla privada"
      }
    ],
  a: 1,
  fb: "正确是炮轰俱乐部 + 主帅 + 感到被「背叛」。专访播出后曼联直接解约，他随即远走沙特。",
  fbEn: "Correct: blasted the club + manager + felt \"betrayed\". Once the interview aired, United terminated his contract, and he promptly left for Saudi.",
  qEs: "En la entrevista con Piers Morgan, ¿sobre qué atacó exactamente Cristiano al United?",
  fbEs: "Correcto: destrozó al club + al entrenador + se sintió «traicionado». El United le rescindió el contrato; se fue al Al Nassr."
  },
{
  q: "2022世界杯C罗被替补，与哪位主帅「十年恩怨」决裂？",
  qEn: "Cristiano was benched at the 2022 World Cup — and \"ten years of grievance\" ruptured with which manager?",
  opts: [
    {
      v: "穆里尼奥",
      vEn: "José Mourinho",
      vEs: "Mourinho"
      },
    {
      v: "桑托斯",
      vEn: "Fernando Santos",
      vEs: "Santos"
      },
    {
      v: "奎罗斯",
      vEn: "Carlos Queiroz",
      vEs: "Queiroz"
      },
    {
      v: "斯科拉里",
      vEn: "Luiz Felipe Scolari",
      vEs: "Scolari"
      }
    ],
  a: 1,
  fb: "正确是桑托斯。淘汰赛连续两场把他放替补，葡萄牙出局，赛后 C罗与桑托斯彻底决裂。",
  fbEn: "Correct: Fernando Santos. Santos benched him for two straight knockout games, Portugal went out, and after the tournament the two completely fell out.",
  qEs: "Cristiano fue suplente en el Mundial 2022 — y «diez años de tirria» estallaron con qué seleccionador?",
  fbEs: "Correcto: Fernando Santos. Santos lo dejó en el banquillo en octavos y cuartos; tras la eliminación Cristiano rompió con él."
  },
{
  q: "C罗生涯总收入（薪金+商业）大约是多少？",
  qEn: "Cristiano's career earnings (salary + commercial) total roughly?",
  opts: [
    {
      v: "约 1 亿",
      vEn: "~$100M",
      vEs: "Uns 100 millones"
      },
    {
      v: "约 5 亿",
      vEn: "~$500M",
      vEs: "Uns 500 millones"
      },
    {
      v: "约 10 亿",
      vEn: "~$1B",
      vEs: "Uns 1.000 millones"
      },
    {
      v: "约 30 亿",
      vEn: "~$3B",
      vEs: "Uns 3.000 millones"
      }
    ],
  a: 2,
  fb: "正确约 10 亿美元。足坛史上首位生涯总收入破 10 亿的球员，但其中利雅得年薪就高达 2 亿/年。",
  fbEn: "Correct: ~$1 billion. The first footballer in history to surpass $1B in career earnings — and his Al Nassr salary alone is rumoured at €200M a year.",
  qEs: "Los ingresos totales de Cristiano (sueldo + comerciales) suman, aproximadamente…",
  fbEs: "Correcto: ~1.000 millones de dólares (~1 billón). El primer futbolista en superar los 1.000 millones en ingresos de carrera."
  },
{
  q: "2009拉斯维加斯酒店事件，C罗最终以多少封口费和解？",
  qEn: "The 2009 Las Vegas hotel incident — how much hush money did Cristiano eventually settle for?",
  opts: [
    {
      v: "约 5 万",
      vEn: "~$50k",
      vEs: "Uns 50 mil"
      },
    {
      v: "约 37.5 万",
      vEn: "~$375k",
      vEs: "Uns 375 mil"
      },
    {
      v: "约 500 万",
      vEn: "~$5M",
      vEs: "Uns 5 millones"
      },
    {
      v: "无罪未和解",
      vEn: "Cleared, no settlement",
      vEs: "Inocente, sin acuerdo"
      }
    ],
  a: 1,
  fb: "正确约 37.5 万美元。2009 年事件后签保密协议和解，2018 年又被翻出重审，2023 年才彻底结案。",
  fbEn: "Correct: ~$375,000. Settled with an NDA in 2009, the case was revived in 2018 and only fully closed in 2023.",
  qEs: "El incidente del hotel de Las Vegas de 2009 — ¿con cuánto dinero para callar llegó finalmente Cristiano al acuerdo?",
  fbEs: "Correcto: ~375.000 dólares. Acordó con un NDA en 2009; el caso se reabrió en 2018 y se cerró en 2023."
  },
{
  q: "C罗对球迷做「不雅动作 + 围巾塞裤裆」，发生在哪个联赛？",
  qEn: "Cristiano made a lewd gesture and stuffed a scarf down his pants at fans — in which league?",
  opts: [
    {
      v: "英超",
      vEn: "Premier League",
      vEs: "Premier League"
      },
    {
      v: "西甲",
      vEn: "La Liga",
      vEs: "LaLiga"
      },
    {
      v: "意甲",
      vEn: "Serie A",
      vEs: "Serie A"
      },
    {
      v: "沙特联赛",
      vEn: "Saudi Pro League",
      vEs: "Saudi Pro League"
      }
    ],
  a: 3,
  fb: "正确是沙特联赛。2024 年在沙特赛场多次做出不雅动作回应球迷起哄，外加「刀削面」庆祝等怪异行为。",
  fbEn: "Correct: the Saudi Pro League. In 2024 he repeatedly fired back at fans with lewd gestures, plus the odd \"knife-shaving noodles\" celebration.",
  qEs: "Cristiano hizo un gesto obsceno y se metió una bufanda en el pantalón ante los aficionados — ¿en qué liga?",
  fbEs: "Correcto: la Saudi Pro League. En 2024 respondió a los cánticos de «Messi» con un gesto obsceno y metiéndose una bufanda rival en el pantalón."
  },
{
  q: "「吕七优人」这个梗，与C罗有什么关系？",
  qEn: "What's the link between the meme \"Roku-yuu-jin\" and Cristiano?",
  opts: [
    {
      v: "他的中文译名",
      vEn: "His Chinese transliteration",
      vEs: "Su nombre traducido al chino"
      },
    {
      v: "日本网友的恶搞昵称",
      vEn: "A Japanese internet parody nickname",
      vEs: "Un apodo parodia japonés"
      },
    {
      v: "他的粤语名",
      vEn: "His Cantonese name",
      vEs: "Su nombre en cantonés"
      },
    {
      v: "赞助商代号",
      vEn: "A sponsor code",
      vEs: "Su código de patrocinador"
      }
    ],
  a: 1,
  fb: "正确是日本网友恶搞昵称。源自日式谐音恶搞，是 C罗全球「恶名文化」的一部分，中文圈也有「阿伟罗」等变体。",
  fbEn: "Correct: a Japanese parody nickname. It grew out of Japanese phonetic wordplay, part of Cristiano's global \"infamy culture\" — the Chinese sphere has variants like \"A-wei-lo\".",
  qEs: "¿Cuál es la relación entre el meme «Roku-yuu-jin» y Cristiano?",
  fbEs: "Correcto: un apodo parodia japonés. Surgió de su viaje a Japón; los internautas chinos lo transcribieron a un kanji estilo japonés que se leyó como burla."
  }
];

/* ========== 真假语录库（真：他真说过；假：馆方拟写，比真话还离谱）========== */
const truthOrFake = [
{
  text: "我之所以被嘘，是因为我有钱、长得帅、还是个伟大的球员，人们就是嫉妒我。",
  textEn: "I get booed because I'm rich, handsome and a great player — people are just jealous of me.",
  truth: true,
  source: "C罗，约2007-08曼联时期采访（回应球迷嘘声）",
  sourceEn: "Cristiano, ~2007-08 Man Utd interview (responding to boos)",
  reveal: "真。这话不是段子，是他亲口说的。被嘘的理由在他看来永远只有一个——全世界都嫉妒他的完美。",
  revealEn: "True. Not a sketch — he really said it. In his eyes there's only ever one reason for the boos: the whole world is jealous of his perfection.",
  textEs: "Me abuchean porque soy rico, guapo y un gran jugador — la gente simplemente me tiene envidia.",
  sourceEs: "Cristiano, entrevista en el United ~2007-08 (respondiendo a los abucheos)",
  revealEs: "Verdadero. No es un sketch — lo dijo de verdad. Para él solo hay una razón para los abucheos: el mundo entero le tiene envidia por su perfección."
  },
{
  text: "我是足球史上第一、第二、第三好的球员。",
  textEn: "I'm the first, second and third best player in football history.",
  truth: true,
  source: "C罗，约2008年采访（传记作者 Balagué 记录）",
  sourceEn: "Cristiano, ~2008 interview (recorded by biographer Balagué)",
  reveal: "真。前无古人的自评：直接把领奖台前三名全包了。后来这句被反复拿来和梅西的「我不在乎第几」做对比。",
  revealEn: "True. An all-time self-assessment: he swept the entire podium. It's been endlessly contrasted with Messi's \"I don't care where I rank\".",
  textEs: "Soy el primero, segundo y tercero mejor jugador de la historia del fútbol.",
  sourceEs: "Cristiano, entrevista ~2008 (registrada por el biógrafo Balagué)",
  revealEs: "Verdadero. Una autovoloración histórica: se llevó todo el podio. Se ha contrastado sin descanso con el «no me importa en qué puesto quede» de Messi."
  },
{
  text: "喝水，不要喝可口可乐。",
  textEn: "Drink water, not Coca-Cola.",
  truth: true,
  source: "C罗，2021欧洲杯发布会（移走可乐瓶）",
  sourceEn: "Cristiano, Euro 2021 press conference (moving the Coke bottles)",
  reveal: "真。这一挪据说让可口可乐市值蒸发约40亿美元（虽有夸大成分，但叙事已成梗）。一句「喝水」干掉一家赞助商。",
  revealEn: "True. That one nudge allegedly wiped ~$4B off Coca-Cola's market cap (exaggerated, but the narrative stuck). One line of \"drink water\" took out a sponsor.",
  textEs: "Bebe agua, no Coca-Cola.",
  sourceEs: "Cristiano, rueda de prensa de la Eurocopa 2021 (apartando las botellas de Coke)",
  revealEs: "Verdadero. Ese gesto supuestamente esfumó ~4.000 M$ de la capitalización de Coca-Cola (exagerado, pero la narrativa cuajó). Una frase de «bebe agua» se cargó a un patrocinador."
  },
{
  text: "我感到被背叛了。曼联的人——教练、高层——他们背叛了我。",
  textEn: "I feel betrayed. The people at United — the coach, the hierarchy — they betrayed me.",
  truth: true,
  source: "C罗，2022年皮尔斯·摩根专访",
  sourceEn: "Cristiano, 2022 Piers Morgan interview",
  reveal: "真。这档专访直接导致他被曼联解约。在世界杯前夕炮轰东家，史无前例。",
  revealEn: "True. The interview directly got his United contract torn up. Blasting his employer on the eve of a World Cup — unprecedented.",
  textEs: "Me siento traicionado. La gente del United —el entrenador, la directiva— me ha traicionado.",
  sourceEs: "Cristiano, entrevista con Piers Morgan de 2022",
  revealEs: "Verdadero. La entrevista le costó directamente la rescisión del contrato con el United. Destrozar a tu club la víspera de un Mundial — sin precedentes."
  },
{
  text: "Factos! Factos! Factos!",
  textEn: "Factos! Factos! Factos!",
  truth: true,
  source: "C罗，2021年金球奖输给梅西后深夜在梅西帖子下连发评论",
  sourceEn: "Cristiano, late-night comments under Messi's post after losing the 2021 Ballon d'Or",
  reveal: "真。「Factos（事实）」连发三遍，是真事。被全网做成 meme，成为他输不起的代名词。",
  revealEn: "True. \"Factos\" fired off three times in a row — it really happened. The whole internet turned it into a meme, shorthand for him being a sore loser.",
  textEs: "¡Factos! ¡Factos! ¡Factos!",
  sourceEs: "Cristiano, comentarios a altas horas de la noche bajo el post de Messi tras perder el Balón de Oro 2021",
  revealEs: "Verdadero. «Factos» lanzado tres veces seguidas — pasó de verdad. Internet entero lo convirtió en meme, sinónimo de su mal perdedor."
  },
{
  text: "你们之所以要查我，是因为我是C罗。",
  textEn: "You're only investigating me because I'm Cristiano Ronaldo.",
  truth: true,
  source: "C罗，2017年逃税案庭审",
  sourceEn: "Cristiano, 2017 tax-fraud trial hearing",
  reveal: "真。法庭上当庭把税务调查归因于「我是C罗」。把逃税说成被害，逻辑满分。",
  revealEn: "True. In court he blamed the tax investigation on \"being Cristiano\". Recasting tax fraud as victimhood — flawless logic.",
  textEs: "Solo me investigáis porque soy Cristiano Ronaldo.",
  sourceEs: "Cristiano, vista del juicio por fraude fiscal de 2017",
  revealEs: "Verdadero. En el juzgado achacó la investigación fiscal a «ser Cristiano». Convertir el fraude fiscal en victimismo — lógica impecable."
  },
{
  text: "世界杯不是我的梦想。",
  textEn: "The World Cup was never my dream.",
  truth: true,
  source: "C罗，2025年11月皮尔斯·摩根专访",
  sourceEn: "Cristiano, November 2025 Piers Morgan interview",
  reveal: "真。踢了六届世界杯0冠后，亲口说「世界杯不是我的梦想」——这嘴硬程度，宇宙级。",
  revealEn: "True. Six World Cups, zero titles, and he actually said it out loud — \"the World Cup was never my dream\". Cosmic-level cope.",
  textEs: "El Mundial nunca fue mi sueño.",
  sourceEs: "Cristiano, entrevista con Piers Morgan de noviembre de 2025",
  revealEs: "Verdadero. Seis Mundiales, cero títulos, y lo dijo en voz alta — «el Mundial nunca fue mi sueño». Nivel cósmico de reframe."
  },
{
  text: "在我之前，葡萄牙什么都没赢过。我帮葡萄牙拿了三座奖杯，欧洲杯不亚于世界杯。",
  textEn: "Before me, Portugal had won nothing. I brought Portugal three trophies; the Euros are no less than the World Cup.",
  truth: true,
  source: "C罗，2026世界杯出局后自辩",
  sourceEn: "Cristiano, self-justification after the 2026 World Cup exit",
  reveal: "真。一句话抹掉了尤西比奥、菲戈那一代葡萄牙前辈的贡献，还顺手把欧洲杯抬到世界杯级别。",
  revealEn: "True. One line wipes out the contributions of Eusébio, Figo and a whole generation of Portuguese greats — and conveniently lifts the Euros to World Cup status.",
  textEs: "Antes de mí, Portugal no había ganado nada. Le traje a Portugal tres trofeos; la Eurocopa no es menos que el Mundial.",
  sourceEs: "Cristiano, autojustificación tras la eliminación del Mundial 2026",
  revealEs: "Verdadero. Una frase borra de un plumazo la aportación de Eusébio, Figo y toda una generación de leyendas portuguesas — y sube la Eurocopa al nivel del Mundial por conveniencia."
  },
{
  text: "我1000%问心无愧，我顶着压力打进3球，表现不差。",
  textEn: "I'm 1000% with a clear conscience. I scored three under pressure, my performance wasn't bad.",
  truth: true,
  source: "C罗，2026世界杯1/8决赛前一天发布会",
  sourceEn: "Cristiano, press conference the day before the 2026 World Cup Round of 16",
  reveal: "真。赛前预埋「问心无愧」，赛后原话照搬。输了也要赢话术，剧本早已写好。",
  revealEn: "True. Pre-loaded \"clear conscience\" before the game, replayed verbatim after. Lose on the pitch, win the spin — the script was written long ago.",
  textEs: "Estoy 1000% con la conciencia tranquila. Marqué tres bajo presión, mi rendimiento no fue malo.",
  sourceEs: "Cristiano, rueda de prensa del día antes de los octavos del Mundial 2026",
  revealEs: "Verdadero. Precargó el «conciencia tranquila» antes del partido y lo repitió palabra por palabra después. Pierde en el campo, gana en la retórica — el guion estaba escrito desde hace tiempo."
  },
{
  text: "沙特给了我2亿，但我来这里是为了提升联赛水平。",
  textEn: "Saudi paid me €200M, but I came here to raise the level of the league.",
  truth: true,
  source: "C罗，2023年利雅得胜利亮相发布会",
  sourceEn: "Cristiano, Al Nassr unveiling press conference, 2023",
  reveal: "真。原话大意如此。把「为钱来沙漠」包装成「扶贫」，公关话术炉火纯青。",
  revealEn: "True. The gist of his actual words. Repackaging \"coming to the desert for money\" as \"charity work\" — PR craft at its finest.",
  textEs: "Arabia me pagó 200 M€, pero vine a subir el nivel de la liga.",
  sourceEs: "Cristiano, presentación con el Al Nassr, 2023",
  revealEs: "Verdadero. La esencia de sus palabras textuales. Reempaquetar «venir al desierto por dinero» como «obra de caridad» — arte del RP en estado puro."
  },
{
  text: "我的庆祝动作 SIUUU 应该申请专利，全世界都在模仿我。",
  textEn: "My SIUUU celebration should be patented — the whole world is copying me.",
  truth: true,
  source: "C罗，多次采访提及SIU的商业化",
  sourceEn: "Cristiano, multiple interviews on monetising SIUUU",
  reveal: "真。他确实把庆祝动作注册成个人商标、商业化运营。连进球庆祝都是一门生意。",
  revealEn: "True. He really did trademark the celebration and run it as a business. Even goal celebrations are a line of business.",
  textEs: "Mi celebración SIUUU debería patentarse — el mundo entero me está copiando.",
  sourceEs: "Cristiano, varias entrevistas sobre monetizar el SIUUU",
  revealEs: "Verdadero. De verdad registró la celebración como marca y la explotó como negocio. Hasta las celebraciones de gol son una línea de negocio."
  },
{
  text: "如果梅西当年和我一起吃饭，他现在会是个更好的人。",
  textEn: "If Messi had dined with me back then, he'd be a better man today.",
  truth: true,
  source: "C罗，2010年代早期采访（流传甚广）",
  sourceEn: "Cristiano, early-2010s interview (widely circulated)",
  reveal: "真。原话大意如此——把和梅西的较量，降维成「和我吃饭能提升人品」的傲慢。",
  revealEn: "True. The gist of what he said — reducing his rivalry with Messi into the arrogance that \"dining with me would improve your character\".",
  textEs: "Si Messi hubiera cenado conmigo en su día, hoy sería un hombre mejor.",
  sourceEs: "Cristiano, entrevista de principios de los 2010 (muy difundida)",
  revealEs: "Verdadero. La esencia de lo que dijo — reducir su rivalidad con Messi a la arrogancia de que «cenar conmigo mejoraría tu persona»."
  },
{
  text: "我每天照镜子都会被自己迷倒，这是我不结婚的原因。",
  textEn: "I fall in love with myself every time I look in the mirror — that's why I'm not married.",
  truth: false,
  source: "(拟)",
  sourceEn: "(made up)",
  reveal: "假。虽然听起来很像他会说的，但这条是编的。讽刺的是——你犹豫了吧？因为他真说过类似自恋程度的话。",
  revealEn: "False. Sounds exactly like him, but it's invented. The irony — you hesitated, didn't you? Because he really has said things this narcissistic.",
  textEs: "Me enamoro de mí mismo cada vez que me miro al espejo — por eso no estoy casado.",
  sourceEs: "(inventado)",
  revealEs: "Falso. Suena exacto a él, pero está inventado. La ironía — ¿dudaste, no? Porque sí ha dicho cosas con este nivel de narcisismo."
  },
{
  text: "迷你罗的足球天赋已经超过同龄的梅西，他将来必拿金球。",
  textEn: "Cristiano Jr.'s talent has already outstripped Messi at the same age — he'll win the Ballon d'Or for sure.",
  truth: false,
  source: "(拟)",
  sourceEn: "(made up)",
  reveal: "假。编的。但他确实把迷你罗带进利雅得青年队、全队为他摆拍SIU，所以这条的迷惑性极高。",
  revealEn: "False. Invented. But he really did bring Cristiano Jr. into Al Nassr's youth setup, with the whole squad posing for SIUUU photos — so this one is highly plausible.",
  textEs: "El talento de Cristiano Jr. ya ha superado al de Messi a la misma edad — seguro que ganará el Balón de Oro.",
  sourceEs: "(inventado)",
  revealEs: "Falso. Inventado. Pero de verdad llevó a Cristiano Jr. a la cantera del Al Nassr, con toda la plantilla posando para fotos del SIUUU — así que este es muy plausible."
  },
{
  text: "我是被国际足联陷害的，他们不想让我拿第六座金球。",
  textEn: "I was framed by FIFA — they didn't want me to win my sixth Ballon d'Or.",
  truth: false,
  source: "(拟)",
  sourceEn: "(made up)",
  reveal: "假。编的。不过结合他「Factos」式控评的真实作风，这条几乎以假乱真。",
  revealEn: "False. Invented. But combine it with his real \"Factos\"-style narrative-policing, and it's almost indistinguishable from the truth.",
  textEs: "La FIFA me tendió una trampa — no querían que ganara mi sexto Balón de Oro.",
  sourceEs: "(inventado)",
  revealEs: "Falso. Inventado. Pero combinado con su estilo real de controlar la narrativa tipo «Factos», es casi indistinguible de la verdad."
  },
{
  text: "沙特联赛的水平已经超过英超，这里的对抗更纯粹。",
  textEn: "The Saudi league has already surpassed the Premier League — the duels here are purer.",
  truth: false,
  source: "(拟)",
  sourceEn: "(made up)",
  reveal: "假。编的。但他确实为沙特刷数据辩护过，所以「沙特超英超」这种话，听着竟毫不违和。",
  revealEn: "False. Invented. But he really has defended his Saudi stat-padding, so \"Saudi > Premier League\" sounds entirely on-brand.",
  textEs: "La liga saudí ya ha superado a la Premier League — los duelos aquí son más puros.",
  sourceEs: "(inventado)",
  revealEs: "Falso. Inventado. Pero de verdad ha defendido su inflar stats saudí, así que «Arabia > Premier» suena totalmente de su marca."
  },
{
  text: "我每进一个点球，都要在日记本上记一笔，这是我对抗时间的方式。",
  textEn: "Every penalty I score goes in my diary — that's how I fight time.",
  truth: false,
  source: "(拟)",
  sourceEn: "(made up)",
  reveal: "假。编的。不过点球依赖症是真的，把点球当KPI记日记，讽刺拉满。",
  revealEn: "False. Invented. But the penalty dependency is real, so turning penalties into a diary KPI is peak satire.",
  textEs: "Cada penal que marco va a mi diario — así es como lucho contra el tiempo.",
  sourceEs: "(inventado)",
  revealEs: "Falso. Inventado. Pero la dependencia del penal es real, así que convertir los penales en un KPI de diario es sátira en estado puro."
  },
{
  text: "如果让我重新选择，我还是会在世界杯淘汰赛上保持沉默。",
  textEn: "If I had to choose again, I'd still stay silent in World Cup knockouts.",
  truth: false,
  source: "(拟)",
  sourceEn: "(made up)",
  reveal: "假。编的。但六届世界杯淘汰赛仅一球、淘汰赛「隐身」是真的，所以这话竟有种宿命感。",
  revealEn: "False. Invented. But one goal across six World Cup knockouts — the \"invisible\" tag is real, so this line has a fateful ring to it.",
  textEs: "Si tuviera que elegir de nuevo, seguiría desapareciendo en las eliminatorias del Mundial.",
  sourceEs: "(inventado)",
  revealEs: "Falso. Inventado. Pero un gol en eliminatoria del Mundial en seis ediciones — la etiqueta de «invisible» es real, así que la frase tiene un tono fatídico."
  },
{
  text: "我把头发梳成现在这样，是为了在进球后转身的瞬间最上镜。",
  textEn: "I style my hair this way so the moment I turn after scoring, I'm perfectly camera-ready.",
  truth: false,
  source: "(拟)",
  sourceEn: "(made up)",
  reveal: "假。编的。但他对发型的执念（每场比赛前精心打理）、进球后摆pose，是出了名的。",
  revealEn: "False. Invented. But his obsession with his hair (freshly groomed before every match) and post-goal posing is legendary.",
  textEs: "Me peino así para que en el momento de girarme tras marcar, salga perfecto para la cámara.",
  sourceEs: "(inventado)",
  revealEs: "Falso. Inventado. Pero su obsesión con el pelo (siempre recién arreglado antes de cada partido) y el posado tras el gol son legendarias."
  },
{
  text: "球迷嘘我是因为他们买不起我的CR7内裤。",
  textEn: "Fans boo me because they can't afford my CR7 underwear.",
  truth: false,
  source: "(拟)",
  sourceEn: "(made up)",
  reveal: "假。编的。但结合他「被嘘是因为嫉妒我有钱」的真语录，这条几乎是他会说的。",
  revealEn: "False. Invented. But paired with his real \"they boo me because they're jealous of my money\" quote, this is almost word-for-word something he'd say.",
  textEs: "Los aficionados me abuchean porque no pueden pagar mis calzoncillos CR7.",
  sourceEs: "(inventado)",
  revealEs: "Falso. Inventado. Pero combinado con su frase real de «me abuchean por envidia de mi dinero», es casi palabra por algo que él diría."
  },
{
  text: "我退役后会竞选葡萄牙总统，因为只有我能拯救这个国家。",
  textEn: "After I retire I'll run for president of Portugal, because only I can save this country.",
  truth: false,
  source: "(拟)",
  sourceEn: "(made up)",
  reveal: "假。编的。但他「我是历史第一第二第三」「葡萄牙是我带飞的」这种自我中心叙事，让这条毫不突兀。",
  revealEn: "False. Invented. But with his \"I'm the 1st, 2nd and 3rd best ever\" and \"I carried Portugal\" narratives, this fits without a seam.",
  textEs: "Tras retirarme me presentaré a presidente de Portugal, porque solo yo puedo salvar a este país.",
  sourceEs: "(inventado)",
  revealEs: "Falso. Inventado. Pero con sus narrativas de «soy el 1.º, 2.º y 3.º mejor» y «yo saqué a Portugal adelante», encaja sin costura."
  },
{
  text: "我拒绝和任何不是金球奖得主的球员握手。",
  textEn: "I refuse to shake hands with any player who hasn't won a Ballon d'Or.",
  truth: false,
  source: "(拟)",
  sourceEn: "(made up)",
  reveal: "假。编的。不过他场上的傲慢、对队友的冷脸是真的，所以这条迷惑性拉满。",
  revealEn: "False. Invented. But his on-pitch arrogance and cold stares at teammates are real, so this is maximum bait.",
  textEs: "Me niego a estrechar la mano de cualquier jugador que no haya ganado un Balón de Oro.",
  sourceEs: "(inventado)",
  revealEs: "Falso. Inventado. Pero su arrogancia sobre el césped y sus miradas frías a los compañeros son reales, así que esto es cebo máximo."
  },
{
  text: "我的肌肉是上帝按自己的样子捏的，其他人只是草稿。",
  textEn: "My muscles were sculpted by God in his own image — everyone else is just a draft.",
  truth: false,
  source: "(拟)",
  sourceEn: "(made up)",
  reveal: "假。编的。但他展示肌肉、半裸代言CR7内裤是常态，自恋到「上帝草稿论」毫不违和。",
  revealEn: "False. Invented. But flexing and half-naked CR7 underwear ads are his default, so narcissism up to a \"God's draft theory\" is seamless.",
  textEs: "Mis músculos fueron esculpidos por Dios a su imagen — los demás somos solo un borrador.",
  sourceEs: "(inventado)",
  revealEs: "Falso. Inventado. Pero lucir músculo y los anuncios en calzoncillos de CR7 son su default, así que un narcisismo hasta la «teoría del borrador divino» es continuo."
  },
{
  text: "我摔手机是因为那个手机不是最新款，配不上我。",
  textEn: "I smashed that phone because it wasn't the latest model — it wasn't worthy of me.",
  truth: false,
  source: "(拟)",
  sourceEn: "(made up)",
  reveal: "假。编的。但他2022年真摔了自闭症小球迷的手机，理由再荒诞也盖不住那一下失控。",
  revealEn: "False. Invented. But he really did smash an autistic boy's phone in 2022 — no matter how absurd the excuse, that flash of loss of control is real.",
  textEs: "Romper ese móvil porque no era el último modelo — no era digno de mí.",
  sourceEs: "(inventado)",
  revealEs: "Falso. Inventado. Pero de verdad rompió el móvil de un niño autista en 2022 — por muy absurda que sea la excusa, ese destello de pérdida de control fue real."
  }
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
  q: "抽一次 C罗 的「赛后行为卡」：他会不会摔袖标 / 摔东西？",
  qEn: "Draw a Cristiano \"post-match behaviour card\": will he throw an armband / smash something?",
  a: "会摔",
  aEn: "Yes, he'll throw it",
  b: "不会摔",
  bEn: "No, he won't",
  odds: 1.8,
  hist: 0.62,
  reveal: "C 罗职业生涯多次摔袖标（2021 世预赛两场连摔）、摔手机（2022）、扔麦克风（2016）。输球就摔东西，是他的招牌动作之一。",
  revealEn: "Cristiano has thrown armbands multiple times (twice in 2021 World Cup qualifiers alone), smashed a phone (2022), tossed a microphone (2016). Throwing things when he loses is one of his signature moves.",
  qEs: "Saca una «carta de comportamiento post-partido» de Cristiano: ¿tirará un brazalete / romperá algo?",
  aEs: "Sí, lo tirará",
  bEs: "No, no lo tirará",
  revealEs: "Cristiano ha tirado brazaliales varias veces (dos veces solo en el clasificatorio del Mundial 2021), ha roto un móvil (2022) y lanzado un micrófono (2016). Tirar cosas cuando pierde es uno de sus movimientos estrella."
  },
{
  q: "抽一次 C罗 的「赛后发言卡」：他会不会甩锅（怪教练/队友/裁判）？",
  qEn: "Draw a Cristiano \"post-match quote card\": will he deflect blame (onto the coach / teammates / ref)?",
  a: "会甩锅",
  aEn: "Yes, he'll deflect",
  b: "不会甩锅",
  bEn: "No, he won't",
  odds: 1.5,
  hist: 0.74,
  reveal: "从炮轰曼联到「世界杯不是我的梦想」再到「问心无愧」，C 罗输球后甩锅的概率高得离谱——金球输了怪规则，世界杯输了怪教练，联赛输了怪队友。",
  revealEn: "From blasting United to \"the World Cup was never my dream\" to \"clear conscience\" — Cristiano's deflection rate after a loss is absurd. Ballon d'Or loss? Blame the rules. World Cup loss? Blame the coach. League loss? Blame teammates.",
  qEs: "Saca una «carta de declaraciones post-partido» de Cristiano: ¿desviará la culpa (al entrenador / compañeros / árbitro)?",
  aEs: "Sí, la desviará",
  bEs: "No, no la desviará",
  revealEs: "Desde destrozar al United hasta «el Mundial nunca fue mi sueño» hasta «conciencia tranquila» — la tasa de desvío de culpa de Cristiano tras una derrota es absurda. ¿Balón de Oro perdido? Culpad a las reglas. ¿Mundial perdido? Al entrenador. ¿Liga perdida? A los compañeros."
  },
{
  q: "抽一次 C罗 的「点球卡」：他会不会站上 12 码主罚？",
  qEn: "Draw a Cristiano \"penalty card\": will he step up to take a spot-kick?",
  a: "会主罚",
  aEn: "Yes, he'll take it",
  b: "不会主罚",
  bEn: "No, he won't",
  odds: 1.2,
  hist: 0.91,
  reveal: "C 罗是足坛著名点球大户。在沙特 4 年累计主罚点球超 32 次，几乎垄断队内第一点球权。「点球依赖症」是他含金量争议的核心。",
  revealEn: "Cristiano is football's notorious penalty merchant. In 4 years in Saudi Arabia he's taken 32+ spot-kicks, almost monopolising the team's penalty duties. \"Penalty dependency\" is the core of his stat-purity debate.",
  qEs: "Saca una «carta de penal» de Cristiano: ¿se plantará para lanzar desde los 11 metros?",
  aEs: "Sí, lo lanzará",
  bEs: "No, no lo lanzará",
  revealEs: "Cristiano es el famoso mercader de penales del fútbol. En 4 años en Arabia ha lanzado 32+ penales, monopolizando casi por completo los lanzamientos del equipo. La «dependencia del penal» es el núcleo del debate sobre la pureza de sus stats."
  },
{
  q: "抽一次 C罗 的「大赛淘汰赛卡」：他会不会进球？",
  qEn: "Draw a Cristiano \"tournament knockout card\": will he score?",
  a: "会进球",
  aEn: "Yes, he'll score",
  b: "不会进球",
  bEn: "No, he won't",
  odds: 2.5,
  hist: 0.18,
  reveal: "六届世界杯、九场淘汰赛、仅一粒进球。淘汰赛隐身是 C 罗国家队生涯最硬的伤——下注「不进」的历史胜率高得吓人。",
  revealEn: "Six World Cups, nine knockout games, one goal. \"Vanishing in knockouts\" is the hardest hit on Cristiano's international career — historically, betting \"no goal\" has had a terrifyingly high win rate.",
  qEs: "Saca una «carta de eliminatoria de torneo» de Cristiano: ¿marcará?",
  aEs: "Sí, marcará",
  bEs: "No, no marcará",
  revealEs: "Seis Mundiales, nueve partidos eliminatorios, un gol. «Desaparecer en las eliminatorias» es el golpe más duro a la carrera internacional de Cristiano — históricamente, apostar a «no gol» ha tenido una tasa de acierto aterradora."
  },
{
  q: "抽一次 C罗 的「离场卡」：输球后他会不会径直走人、不谢球迷？",
  qEn: "Draw a Cristiano \"exit card\": after a loss, will he storm off down the tunnel without thanking the fans?",
  a: "会走人",
  aEn: "Yes, he'll storm off",
  b: "会谢场",
  bEn: "No, he'll applaud the fans",
  odds: 1.7,
  hist: 0.55,
  reveal: "2022 世界杯被摩洛哥淘汰后，C 罗 径直钻进球员通道，没谢场、没安慰队友。输球就走，是他对球迷「恩将仇报」的典型场面。",
  revealEn: "After being knocked out by Morocco at the 2022 World Cup, Cristiano disappeared straight down the tunnel — no thanks to the fans, no comforting teammates. Storming off after a loss is his classic \"biting the hand that feeds him\" moment.",
  qEs: "Saca una «carta de salida» de Cristiano: tras una derrota, ¿se marchará directo al túnel sin dar las gracias a la afición?",
  aEs: "Sí, se irá al túnel",
  bEs: "No, aplaudirá a la afición",
  revealEs: "Tras la eliminación contra Marruecos en el Mundial 2022, Cristiano desapareció directo por el túnel — sin agradecer a los aficionados, sin consolar a los compañeros. Marcharse tras una derrota es su momento clásico de «morder la mano que le da de comer»."
  },
{
  q: "抽一次 C罗 的「ins 动态卡」：会不会又是 P 图自拍 / 商业植入？",
  qEn: "Draw a Cristiano \"Instagram post card\": will it be another edited selfie / commercial plug?",
  a: "又是自拍",
  aEn: "Another selfie",
  b: "正常内容",
  bEn: "Normal content",
  odds: 1.3,
  hist: 0.83,
  reveal: "C 罗 的 ins 是全球粉丝最多的个人账号，但内容以精修自拍、商业植入为主。曾有媒体统计其近七成发文都带自我营销或广告属性。",
  revealEn: "Cristiano's Instagram is the most-followed personal account in the world, but it's mostly edited selfies and commercial plugs. One media count found around 70% of his posts were self-promotion or ads.",
  qEs: "Saca una «carta de post de Instagram» de Cristiano: ¿será otro selfie retocado / anuncio comercial?",
  aEs: "Otro selfie",
  bEs: "Contenido normal",
  revealEs: "El Instagram de Cristiano es la cuenta personal con más seguidores del mundo, pero es sobre todo selfies retocados y anuncios comerciales. Un recuento mediático concluyó que en torno al 70% de sus posts eran autopromoción o publicidad."
  },
{
  q: "抽一次 C罗 的「场上反应卡」：他会不会对裁判做出抗议手势？",
  qEn: "Draw a Cristiano \"on-pitch reaction card\": will he gesticulate at the referee?",
  a: "会抗议",
  aEn: "Yes, he'll protest",
  b: "不会抗议",
  bEn: "No, he won't",
  odds: 1.4,
  hist: 0.79,
  reveal: "「总裁找裁判」是中文圈给他的绰号之一。从抱怨越位、到摊手、到推搡裁判（2017 西超杯被禁 5 场），他几乎每场都在和裁判演戏。",
  revealEn: "\"Penaldo looking for the ref\" is one of his Chinese-sphere nicknames. From offsides complaints, to arm-flapping, to shoving the ref (a 5-match ban in the 2017 Spanish Super Cup) — every match is basically theatre with the referee.",
  qEs: "Saca una «carta de reacción sobre el césped» de Cristiano: ¿gesticulará al árbitro?",
  aEs: "Sí, protestará",
  bEs: "No, no protestará",
  revealEs: "«Penaldo buscando al árbitro» es uno de sus apodos en la órbita china. Desde quejas de fuera de juego, hasta palmadas con los brazos, hasta empujar al árbitro (5 partidos de sanción en la Supercopa de España de 2017) — cada partido es básicamente teatro con el colegiado."
  },
{
  q: "抽一次 C罗 的「东家关系卡」：合约期里他会不会和俱乐部闹翻？",
  qEn: "Draw a Cristiano \"employer relations card\": will he fall out with the club during his contract?",
  a: "会闹翻",
  aEn: "Yes, he'll fall out",
  b: "和平收场",
  bEn: "Amicable ending",
  odds: 2,
  hist: 0.5,
  reveal: "从皇马要加薪不成离队、到尤文后期不满、再到炮轰曼联被解约——C 罗 几乎每到一支球队都以不愉快收场。「过河拆桥」是标配操作。",
  revealEn: "From forcing his way out of Real Madrid over a raise, to souring on Juventus at the end, to blasting United into a contract tear-up — almost every club Cristiano joins ends on bad terms. \"Burning the bridge\" is standard operating procedure.",
  qEs: "Saca una «carta de relaciones con el club» de Cristiano: ¿se peleará con el club durante su contrato?",
  aEs: "Sí, se peleará",
  bEs: "Final amistoso",
  revealEs: "Desde forzar su salida del Real Madrid por una subida, hasta agriarse con la Juventus al final, hasta destrozar al United hasta la rescisión del contrato — casi todos los clubes a los que se une Cristiano acaban mal. «Quemar los puentes» es el procedimiento estándar."
  }
];

