/*
 * data.js — CA7 黑历史档案馆 数据层
 * 由 build/split-files.cjs 从原始单文件提取，事件图片已外置为 assets/images/report/r-NN.jpg
 * 续编（2026-07-03）新增事件/绰号/时间线/语录见文末标注。
 *
 * 用顶层 const 暴露全局变量（非 ES module），供 app.js 顺序加载后使用。
 */

/* i18nDict 已剥离到 assets/js/i18n-dict.js（子页与首页共享，需先于 app.js 加载）。 */

// ========== 事件数据 ==========
const events = [
  {
    id:1, cat:"club", catLabel:"俱乐部与法律", severity:5,
    dateIso:"2017-06-01",
    title:"西班牙逃税案",
    titleEn:"Spanish Tax Fraud Case",
    titleEs: "Caso de fraude fiscal en España",
    summaryEs: "Acusado de defraudar 14,8 M€ en impuestos (2011-2014) vía empresas pantalla offshore; acabó declarándose culpable y pactando 2 años de condena en suspenso más una multa de 18,8 M€.",
    dateEs: "Jun 2017 — Ene 2019",
    locationEs: "Madrid, España",
    detailEs: [
      "<strong>Origen del caso:</strong> Hacienda empezó a investigar a Cristiano a finales de 2015. En junio de 2017, la fiscalía de Madrid lo imputó formalmente, acusándolo de ocultar ingresos por derechos de imagen entre 2011 y 2014 a través de <em>empresas pantalla en las Islas Vírgenes Británicas</em>, evitando hasta <strong>14,75 millones de euros</strong> en impuestos.",
      "<strong>El método de evasión:</strong> El esquema venía de lejos: en su etapa de la Premier, Cristiano ya había montado vehículos similares. En 2010 registró una empresa pantalla en las Islas Vírgenes Británicas (BVI) y canalizó por ella la mayor parte de sus ingresos de imagen — baja tributación offshore frente a los altos tipos de España. Antes de 2006 era legal; la reforma fiscal española de 2006 obligó a los residentes extranjeros que vivieran en España más de cierto tiempo a tributar por esas rentas aunque las mantuviera una empresa en el extranjero.",
      "<strong>La postura desafiante de Cristiano:</strong> Al comparecer en julio de 2017, se mostró inflexible: «Todo lo que hice fue legal. Nunca oculté nada ni dejé de pagar impuestos. Mis asesores lo gestionan todo y confío en ellos al 100%». Incluso soltó la frase que se hizo famosa: «<em>La única razón por la que me investigáis es porque soy CR7</em>».",
      "<strong>Declaración de culpa y acuerdo:</strong> Ante la amenaza de hasta 15 años de cárcel, Cristiano eligió «pagar y salir del paso». En junio de 2018 cerró un acuerdo con Hacienda y el 22 de enero de 2019 se presentó en el juzgado de Madrid durante unos 15 minutos: <strong>se declaró culpable en audiencia pública</strong> y firmó el convenio.",
      "<strong>Sentencia definitiva:</strong> <em>2 años de prisión (en suspenso)</em>, más un total de casi <strong>19 millones de euros</strong> (impuesto + intereses + multas). Por la ley española, los primerizos no violentos con condenas inferiores a dos años no suelen pisar la cárcel. Para comparar: Messi en 2016 se llevó 21 meses en suspenso y 3,7 M€ de multa por defraudar 4,1 M€ — Cristiano evadió 3,6 veces lo que Messi.",
      "<strong>La red de empresas pantalla:</strong> No era la primera vez que las sociedades de imagen de Cristiano levantaban sospechas. La prensa destapó que su red de planificación fiscal se extendía por varias pantallas offshore — Tollin Associates (registrada en BVI), Multisports & Image en Irlanda y Talents Films en Reino Unido. Esa estructura de «empresa dentro de empresa» le costó a Hacienda años desentrañarla, y le valió la etiqueta de «<em>externalizar las obligaciones fiscales a los contables como un truco de magia</em>».",
      "<strong>Impacto:</strong> El caso se cuenta entre las claves de que Cristiano «huyera» de España a la Juventus en 2018 — Italia solo grava con 100.000 € al año las rentas extranjeras de los no residentes, mientras el tipo máximo español rozaba el 52%.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> Este caso se atiene a los documentos oficiales de acuerdo entre la Agencia Tributaria española y el tribunal de Madrid; Cristiano acabó declarándose culpable y aceptó una condena en suspenso y una multa, con cifras según las revelaciones oficiales. Este expediente solo recoge la cobertura mediática pública y los documentos legales, y no constituye una determinación adicional de los hechos.</div>"
    ],





    date:"2017年6月 — 2019年1月",
    dateEn:"Jun 2017 — Jan 2019",
    location:"西班牙马德里",
    locationEn:"Madrid, Spain",
    img:"assets/images/report/r-01.jpg",
    summary:"被控在2011-2014年间通过海外壳公司逃税1480万欧元，最终认罪达成和解：2年缓刑+1880万欧元罚款。",
    summaryEn:"Accused of evading €14.8M in taxes (2011-2014) through offshore shell companies; eventually pleaded guilty and settled for a 2-year suspended sentence plus an €18.8M fine.",
    detail:[
      "<strong>案件起源：</strong>西班牙税务部门早在2015年底就对C罗展开调查。2017年6月，马德里检察官正式提起诉讼，指控他在2011至2014年间通过<em>英属维尔京群岛壳公司</em>隐藏肖像权收入，逃避税款高达<strong>1475万欧元</strong>。",
      "<strong>逃税手法：</strong>早在效力英超时，C罗就成立过类似机构。2010年，他在英属维尔京群岛（BVI）注册了一家壳公司，把大部分肖像权收入装进这家海外低税率公司，以此绕开西班牙的高额税率。这套操作在2006年前是合法的；2006年，西班牙新税法堵上了口子：外国居民在西班牙居住满一定时间，即使肖像权所有者是海外公司，收入也要在西班牙缴税。",
      "<strong>C罗的强硬姿态：</strong>2017年7月出庭时，C罗在法庭上宣称：“我做的一切都是合法的。我从来没有隐瞒过任何事，也没有停止过缴纳我的税费。我的顾问管理这一切，我百分百相信他们。”他甚至当场抛出金句：“<em>你们之所以要查我，是因为我是C罗。</em>”",
      "<strong>认罪和解：</strong>面对最高15年监禁的威胁，强硬没能维持到最后，C罗选择“破财消灾”。2018年6月，他与税务部门达成和解；2019年1月22日，他亲赴马德里法庭，出庭约15分钟，<strong>当庭认罪</strong>，签署协议。",
      "<strong>最终判决：</strong><em>2年有期徒刑（缓刑）</em>，外加总额近<strong>1900万欧元</strong>（税款+利息+罚金）。根据西班牙法律，非暴力犯罪初犯且刑期不满2年者通常无需实际入狱。对比：梅西2016年因漏税410万欧元被判21个月缓刑+370万罚款——C罗逃税金额是梅西的3.6倍。",
      "<strong>壳公司网络反复被查：</strong>这并非C罗第一次因肖像权公司被盯上。媒体披露，他的避税网络横跨多家海外壳公司——英属维尔京群岛（BVI）注册的 Tollin Associates、爱尔兰的 Multisports & Image，以及英国的 Talents Films 公司。这套「公司套公司」的结构，让税务部门需要多年才能厘清资金流向，被批是「<em>把纳税义务外包给会计师的魔术</em>」。",
      "<strong>影响：</strong>此案被认为是C罗2018年“逃离”西班牙、转投尤文图斯的重要原因之一——意大利对外国人海外收入每年仅收10万欧元税金，西班牙这边税率高达52%。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>本案以西班牙税务部门与马德里法院的官方和解文书为准，C罗最终认罪并接受缓刑与罚款判决，相关金额以官方披露为准。本档案仅记录公开媒体报道与法律文书内容，不构成对任何事实的额外认定。</div>"
    ],
    detailEn:[
      "<strong>Case origin:</strong> Spain's tax authorities had Ronaldo in their sights as early as the end of 2015. In June 2017, Madrid prosecutors formally filed charges, accusing him of hiding image-rights income from 2011 to 2014 behind <em>British Virgin Islands shell companies</em> and evading as much as <strong>€14.75 million</strong> in taxes.",
      "<strong>The tax-evasion method:</strong> Ronaldo had set up similar vehicles as far back as his Premier League days. In 2010 he registered a shell company in the low-tax British Virgin Islands (BVI) and ran most of his image-rights income through it to avoid Spain's high rates. Before 2006, this was all legal; then a 2006 Spanish tax reform ruled that foreign residents who lived in Spain beyond a certain period owed Spanish tax on such income — even when it sat inside an overseas company.",
      "<strong>Ronaldo's defiance:</strong> Appearing in court in July 2017, he was unyielding, telling the tribunal: 'Everything I did was legal. I never concealed anything, and I never stopped paying my taxes. My advisors manage all of this, and I trust them 100%.' Then he dropped the now-famous line: '<em>The only reason you're investigating me is because I'm CR7.</em>'",
      "<strong>Guilty plea and settlement:</strong> Facing up to 15 years in prison, Ronaldo ultimately chose to 'pay his way out'. In June 2018 he reached a settlement with the tax authority, and on 22 January 2019 he turned up in person at the Madrid court for about 15 minutes, <strong>pleaded guilty in open court</strong> and signed the agreement.",
      "<strong>Final verdict:</strong> <em>2 years' imprisonment (suspended)</em>, plus a total of nearly <strong>€19 million</strong> (tax + interest + fines). Under Spanish law, first-time non-violent offenders with sentences under two years typically serve no actual jail time. For comparison: Messi in 2016 was given a 21-month suspended sentence and a €3.7M fine for €4.1M in tax evasion — Ronaldo evaded 3.6 times as much.",
      "<strong>Repeated scrutiny:</strong> This was not the first time Ronaldo's image-rights companies had drawn scrutiny. Media outlets revealed that his tax-avoidance network spanned multiple offshore shells — Tollin Associates (registered in the BVI), Multisports & Image in Ireland and Talents Films in the UK — a layered 'company-within-company' structure that took the tax authorities years to unravel, and was slammed as '<em>outsourcing tax obligations to accountants as a magic trick</em>'.",
      "<strong>Impact:</strong> The case is widely seen as a key reason Ronaldo 'fled' Spain for Juventus in 2018 — Italy levies only €100,000 a year on foreigners' overseas income, while Spain's top rate stood at 52%.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong> This case follows the official settlement documents of the Spanish tax authority and the Madrid court; Ronaldo ultimately pleaded guilty and accepted a suspended sentence and fine, with figures based on official disclosures. This file only records public media reporting and legal documents, and does not constitute any additional finding of fact.</div>"
    ],
    quote:{text:"我做正确的事，无论是球场内外。但在这里，他们想让我变成另一个人。", textEn:"I do the right thing, on and off the pitch. But here, they want to turn me into someone else.", author:"C罗，2017年庭审后声明", authorEn:"Cristiano Ronaldo, statement after the 2017 tax trial", textEs:"Hago lo correcto, dentro y fuera del campo. Pero aquí quieren convertirme en otra persona.", authorEs:"Cristiano Ronaldo, declaración tras el juicio fiscal de 2017"},
    tags:["逃税","西班牙","1480万欧元","缓刑","认罪"],
    tagsEn:["tax fraud","Spain","€14.8 million","suspended sentence","pleaded guilty"],
    tagsEs:["fraude fiscal","España","14,8 M€","condena en suspenso","se declaró culpable"]
  },
  {
    id:2, cat:"club", catLabel:"俱乐部与法律", severity:5,
    dateIso:"2009-06-01",
    title:"拉斯维加斯酒店事件",
    titleEn:"Las Vegas Hotel Incident",
    titleEs: "Incidente del hotel de Las Vegas",
    summaryEs: "Kathryn Mayorga acusó a Cristiano de agresión sexual en un hotel de Las Vegas en 2009; en 2010 pagó 375.000 $ para callar. El caso se reabrió en 2018, fue sobreseído a nivel federal en 2022 y desestimado en apelación en 2023.",
    dateEs: "Jun 2009 / Reabierto 2018 — Cerrado 2023",
    locationEs: "Las Vegas, EE. UU.",
    detailEs: [
      "<strong>El incidente de 2009:</strong> En junio de 2009, según la denuncia de Kathryn Mayorga, Cristiano la agredió sexualmente en una suite del hotel Palms Place de Las Vegas. Mayorga acudió a urgencias aquella misma noche; la policía abrió una investigación que se estancó.",
      "<strong>El acuerdo de confidencialidad:</strong> En 2010, Cristiano pagó 375.000 dólares a cambio de que Mayorga firmara un acuerdo de confidencialidad y retirara cualquier demanda. El asunto quedó enterrado durante casi una década.",
      "<strong>Der Spiegel lo saca a la luz (2017):</strong> En 2017 el semanario alemán Der Spiegel publicó el caso apoyándose en los documentos filtrados de los «Football Leaks», entre ellos un cuestionario donde supuestamente Cristiano reconocía que ella «dijo que no» en varias ocasiones. Sus abogados lo negaron y demandaron al medio.",
      "<strong>Reapertura del caso (2018):</strong> Mayorga presentó en 2018 una demanda civil para anular el acuerdo de confidencialidad; la policía de Las Vegas reabrió la investigación penal. Cristiano volvió a negar todo y cooperó con las autoridades.",
      "<strong>El «cuestionario» filtrado:</strong> Los documentos incluían respuestas atribuidas a Cristiano en las que, según la prensa, reconocía que «ella se negó» pero sostenía que después consintió. Sus abogados tacharon los textos de manipulados y de estar cubiertos por el acuerdo de confidencialidad.",
      "<strong>Sobreseimiento federal (2022):</strong> En junio de 2022 la fiscalía federal de EE. UU. archivó el caso penal por no poder probar los cargos más allá de toda duda razonable. La demanda civil, en cambio, siguió su curso.",
      "<strong>Desestimado en apelación (2023):</strong> En 2023 un tribunal de apelaciones confirmó la desestimación de la demanda civil de Mayorga, cerrando efectivamente el caso. Cristiano mantuvo siempre su inocencia.",
      "<strong>Reputación:</strong> Aunque el caso se cerró legalmente, el «dinero para callar» y los documentos filtrados dejaron una mancha imborrable en su imagen pública. Es uno de los episodios más oscuros de su carrera.",
      "<strong>El coste:</strong> 375.000 dólares para comprar el silencio, años de portadas y un caso que lo persiguió más de una década — una suma ridículamente baja comparada con el daño reputacional que generó.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> La demanda civil fue desestimada en 2022; Ronaldo nunca ha sido condenado penalmente y niega todas las acusaciones. Este expediente solo recoge la cobertura mediática pública y los documentos legales, y no constituye una determinación final de ningún hecho.</div>"
    ],





    date:"2009年6月 / 2018年重提 — 2023年终结",
    dateEn:"Jun 2009 / Revived 2018 — Resolved 2023",
    location:"美国拉斯维加斯",
    locationEn:"Las Vegas, USA",
    img:"assets/images/report/r-02.jpg",
    summary:"2009年拉斯维加斯酒店的那晚，2010年被保密协议封存：C罗向指控其性侵的Kathryn Mayorga支付37.5万美元封口费。2018年案件重见天日，全球哗然；2022年，民事诉讼被驳回。",
    summaryEn:"Kathryn Mayorga accused Ronaldo of sexual assault at a Las Vegas hotel in 2009; he paid $375,000 in hush money in 2010. The case resurfaced in 2018; the civil lawsuit was dismissed in 2022 — on procedure, not on the merits.",
    detail:[
      "<strong>案件起源：</strong>2009年6月13日，刚以创纪录身价转会皇家马德里的C罗，在美国拉斯维加斯棕榈树赌场酒店（Palms Place）的Rain夜店结识了时年25岁的美国女教师凯瑟琳·马约尔加（Kathryn Mayorga）。据马约尔加事后陈述，C罗在其顶层豪华套房内对她实施了性侵。事发后不久，她便前往拉斯维加斯警方报案，但当时警方未能锁定任何嫌疑人。",
      "<strong>封口协议：</strong>2010年，双方签订庭外和解与保密协议，C罗向马约尔加支付<em>37.5万美元</em>（约28.8万英镑）作为封口费，换取对方沉默。协议由C罗经纪人若热·门德斯及其律师团队主导，要求马约尔加不得公开此事、撤销法律追诉。马约尔加的律师称，当事人此后十年饱受抑郁折磨，甚至出现自杀倾向，心理医生确诊其患上<em>创伤后应激障碍（PTSD）</em>。",
      "<strong>媒体曝光：</strong>2017年4月14日，德国《明镜周刊》（Der Spiegel）率先披露此案，称2009年C罗在拉斯维加斯强奸一名美国女性并支付封口费。报道基于泄露的保密文件，包括C罗本人邮件与律师往来函件。C罗律师团队随即威胁起诉《明镜周刊》，并坚称双方关系属“自愿”。但爆料已令全球舆论哗然，主流媒体纷纷跟进。",
      "<strong>MeToo浪潮：</strong>受2017年席卷全球的#MeToo运动鼓舞，马约尔加于2018年9月通过《明镜周刊》<strong>公开身份</strong>，正式对C罗提起民事诉讼，要求推翻保密协议并索赔至少20万美元。2018年10月3日，其律师莱斯利·斯托瓦尔（Leslie Stovall）召开新闻发布会，披露案情细节。拉斯维加斯警方于同年10月2日宣布重启刑事调查，并将案件移交检方。",
      "<strong>C罗回应：</strong>2018年10月3日，C罗在Instagram发布视频声明，<em>“我坚决否认对我的指控。强奸是一种可恶的罪行，违背我所信仰的一切。”</em>他把相关报道斥为“假新闻”，并指责马约尔加“想借我的名声推广自己”。其赞助商耐克（Nike）与EA Sports均发表声明，称“密切关注事态”；尤文图斯俱乐部股价一度下跌近10%，但官方推特仍发文力挺C罗“伟大的职业精神”。",
      "<strong>案件结局：</strong>2022年6月，美国联邦法官珍妮弗·多尔西（Jennifer Dorsey）最终撤销了马约尔加的民事诉讼。裁决理由并非否认指控本身，而是认定原告律师斯托瓦尔使用了<strong>非法窃取的保密文件</strong>（Football Leaks泄露材料）作为核心证据，违反律师职业道德，构成“损害司法公正”。法官以“偏见驳回”结案，意味着马约尔加不得再就此起诉。",
      "<strong>舆论反响：</strong>案件被撤销引发巨大争议。女权团体与媒体批评司法系统更关注程序瑕疵而非实质正义，形同放任“富有被告凭借资源逃脱”。马约尔加律师团队称将考虑上诉，但2023年美国第十巡回上诉法院维持原判。拉斯维加斯检方则于2019年宣布因证据不足、时隔太久不予刑事起诉C罗。批评者指出，封口协议本身即是对受害者的二次伤害。",
      "<strong>横向对比：</strong>与众多卷入性侵丑闻的体坛巨星一样，C罗凭借<em>庞大法律团队与商业资本</em>成功规避了法律后果。此案与NFL球星本·罗斯利斯伯格、NBA巨星科比·布莱恩特的封口案如出一辙——金钱和解、保密协议、舆论反转，构成体育界典型的“花钱消灾”模式。区别在于，C罗始终维持着顶级商业代言，从未因此失去耐克等核心赞助。",
      "<strong>代价：</strong>37.5万美元的封口费、常年甩不掉的头条、外加一桩纠缠他十多年的案子——与所造成的声誉损失相比，这笔钱低得可笑。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>民事诉讼已于2022年被撤销，C罗从未被刑事定罪，对所有指控均予否认。本档案仅记录公开媒体报道与法律文书内容，不构成对任何事实的最终认定。</div>"
    ],
    detailEn:[
      "<strong>Case origin:</strong> On 13 June 2009, just after his record-breaking transfer to Real Madrid, Ronaldo met 25-year-old American schoolteacher Kathryn Mayorga at the Rain nightclub inside the Palms Place casino hotel in Las Vegas. According to her later account, he sexually assaulted her in his penthouse suite. She reported it to Las Vegas police shortly afterwards; at the time, no suspect could be identified.",
      "<strong>The hush-money agreement:</strong> In 2010 both parties signed an out-of-court settlement and non-disclosure agreement. Ronaldo paid Mayorga <em>$375,000</em> (about £288,000) in hush money in exchange for her silence. The deal was brokered by Ronaldo's agent Jorge Mendes and his legal team, and required Mayorga to keep the matter confidential and drop any legal action. A decade of depression followed, her lawyer said, with suicidal episodes and a psychologist's diagnosis of <em>post-traumatic stress disorder (PTSD)</em>.",
      "<strong>Media exposure:</strong> On 14 April 2017, Germany's Der Spiegel first broke the story: Ronaldo had raped an American woman in Las Vegas in 2009 and paid hush money. The report was built on leaked confidential documents, including Ronaldo's own emails and correspondence with his lawyers. His legal team immediately threatened to sue and insisted the encounter was 'consensual'. The revelation caused global uproar anyway, and mainstream media followed up in droves.",
      "<strong>The #MeToo wave:</strong> Emboldened by the global #MeToo movement in 2017, Mayorga <strong>went public</strong> via Der Spiegel in September 2018 and formally filed a civil lawsuit against Ronaldo, seeking to overturn the NDA and claim at least $200,000 in damages. On 2 October, Las Vegas police announced they were reopening the criminal investigation and forwarding the case to prosecutors; the next day, 3 October 2018, her lawyer Leslie Stovall held a press conference detailing the case.",
      "<strong>Ronaldo's response:</strong> On 3 October 2018, he posted a video statement on Instagram: <em>'I firmly deny the accusations against me. Rape is an abhorrent crime that goes against everything I believe in.'</em> He called the reports 'fake news' and accused Mayorga of 'trying to promote herself through my fame'. Nike and EA Sports both issued statements saying they were 'closely monitoring the situation'; Juventus's share price dropped nearly 10%, though the club's official Twitter account still found time to tout Ronaldo's 'great professionalism'.",
      "<strong>Case outcome:</strong> In June 2022, US federal judge Jennifer Dorsey dismissed Mayorga's civil lawsuit — not because the allegations had been disproved, but because the plaintiff's lawyer Stovall had used <strong>illegally obtained confidential documents</strong> (Football Leaks material) as core evidence: a violation of legal ethics and, in the judge's words, 'a breach of the administration of justice'. The dismissal came 'with prejudice', meaning Mayorga could not refile.",
      "<strong>Public backlash:</strong> The dismissal did not go down quietly. Women's rights groups and media outlets criticised a justice system more concerned with procedural flaws than substantive justice, allowing a 'wealthy defendant to escape through his resources'. Mayorga's legal team said it would consider an appeal, but in 2023 the US Tenth Circuit Court of Appeals upheld the ruling. Criminal charges had been off the table since 2019, when Las Vegas prosecutors cited insufficient evidence and the passage of time. To critics, the hush agreement itself was a second violation of the victim.",
      "<strong>Broader comparison:</strong> Like many sports stars embroiled in sexual-assault scandals, Ronaldo used <em>a vast legal team and commercial capital</em> to dodge legal consequences. The case mirrors those of NFL quarterback Ben Roethlisberger and NBA legend Kobe Bryant — cash settlement, NDA, media reversal — the sports world's textbook 'pay-your-way-out' pattern. The difference: he kept his top-tier endorsements throughout, never losing core sponsors such as Nike.",
      "<strong>The cost:</strong> $375,000 in hush money, years of headlines, a case that dogged him for over a decade — a sum laughably small against the damage it was bought to prevent.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong>The civil lawsuit was dismissed in 2022; Ronaldo has never been criminally convicted and denies all allegations. This file only records public media reporting and legal documents, and does not constitute a final finding of any fact.</div>"
    ],
    quote:{text:"我明确否认对我的指控。性侵是可憎的犯罪，我对任何人都怀有最大的尊重。", textEn:"I firmly deny the accusations against me. Rape is an abhorrent crime, and I have the utmost respect for everyone.", author:"C罗，2018年声明", authorEn:"Cristiano Ronaldo, 2018 statement", textEs:"Niego firmemente las acusaciones contra mí. La violación es un delito abyecto y tengo el mayor de los respetos por todo el mundo.", authorEs:"Cristiano Ronaldo, declaración de 2018"},
    tags:["性侵指控","37.5万美元","封口费","Football Leaks","案件驳回"],
    tagsEn:["sexual-assault allegation","$375K","hush money","Football Leaks","case dismissed"],
    tagsEs:["acusación de agresión sexual","375.000 dólares","dinero de silencio","Football Leaks","caso desestimado"]
  },
  {
    id:3, cat:"violence", catLabel:"场内暴力", severity:4,
    dateIso:"2017-08-13",
    title:"西超杯推搡裁判",
    titleEn:"Shoving the Ref in the Spanish Super Cup",
    titleEs: "Empuja al árbitro en la Supercopa de España",
    summaryEs: "Tras marcar como suplente en el Clásico, vio amarilla por simulación y fue expulsado con la segunda; después empujó al árbitro y se llevó 5 partidos de sanción.",
    dateEs: "13 ago 2017",
    locationEs: "Camp Nou, España",
    detailEs: [
      "<strong>El escenario:</strong> Supercopa de España 2017, Real Madrid–Barça en el Camp Nou. Cristiano saltó desde el banquillo en la segunda mitad y en pocos minutos marcó un golazo para poner el 1-2.",
      "<strong>La amarilla por simulación:</strong> En una jugada posterior dentro del área, Cristiano se tiró buscando penalti y el árbitro le sacó amarilla por simulación. Para muchos, un cachondeo, dado su historial.",
      "<strong>La segunda amarilla y la expulsión:</strong> Minutos después, al celebrar el gol, Cristiano se quitó la camiseta y la agitó; en una acción posterior vio la segunda amarilla —por simulación o por la celebración, según la versión— y, con ella, la expulsión.",
      "<strong>El empujón al árbitro:</strong> Ya de camino al vestuario, un Cristiano enfurecido empujó por la espalda al árbitro principal. Las cámaras lo captaron todo y la imagen dio la vuelta al mundo.",
      "<strong>La sanción:</strong> El Comité de Competición le cayó encima con 5 partidos de sanción: 4 por el empujón al árbitro (falta de respeto) y 1 por la expulsión. Cristiano lo llamó «injusto» y presentó recurso; desestimado.",
      "<strong>Consecuencias:</strong> Se perdió el partido de vuelta y el inicio de la temporada liguera. El empujón queda como uno de los momentos más sonrojantes de su carrera: un capitán empujando a un colegiado.",
      "<strong>Reacción:</strong> La prensa española lo machacó; Marca y AS lo titularon como una vergüenza. La imagen del empujón quedó como el retrato de su falta de autocontrol.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> Este expediente se elabora a partir del boletín oficial de sanciones de la Real Federación Española de Fútbol y de informaciones mediáticas públicas; las sanciones y los partidos de suspensión se atienen a los documentos oficiales.</div>"
    ],





    date:"2017年8月13日",
    dateEn:"Aug 13, 2017",
    location:"西班牙诺坎普球场",
    locationEn:"Camp Nou, Spain",
    img:"assets/images/report/r-03.jpg",
    summary:"国家德比替补登场破门，随即因假摔两黄变一红；被罚下的C罗从背后推搡主裁判，换来追加禁赛5场。",
    summaryEn:"After scoring as a sub in El Clásico, he was booked for diving and sent off on a second yellow, then shoved the referee from behind — banned an extra 5 matches.",
    detail:[
      "<strong>事件背景：</strong>2017年8月13日，西班牙超级杯首回合，皇家马德里做客诺坎普挑战巴塞罗那。此时的皇马刚刚拿下2016-17赛季西甲与欧冠双冠，国家德比火药味正浓。C罗此役替补登场，只用24分钟就凑齐了本赛季最具争议的一幕——进球、假摔、推裁判，三连击一步不落。",
      "<strong>戏剧3分钟：</strong>第78分钟，C罗禁区内晃过皮克，左脚抽射破门，皇马2-1反超。进球的余温还没散，仅1分钟后，他就与乌姆蒂蒂在禁区内接触后夸张倒地，主裁判里卡多·德布尔戈斯·本戈埃切亚认定假摔，出示<strong>第二张黄牌</strong>，两黄变一红将其罚下——C罗国家德比生涯罕见的直接红牌，就这么来了。",
      "<strong>推搡裁判：</strong>不满判罚的C罗，在被出示红牌后从背后<em>用力推搡了主裁判德布尔戈斯</em>，裁判踉跄前冲。这一下被明确写进赛后报告：“该球员在被罚下后，从背后推搡了我，力度足以让我身体失衡。”对比赛官员的直接肢体侵犯，还是从背后发的力——「抗议」这个词，装不下这个动作。",
      "<strong>追加处罚：</strong>2017年8月14日，西班牙足协竞赛委员会开出罚单：红牌本身停赛1场，推搡裁判<em>追加停赛4场</em>，合计禁赛<strong>5场</strong>。按足协规则，推搡裁判本可招致4至12场追加禁赛，5场已属相对适中。皇马随后上诉，8月21日被西班牙上诉委员会驳回，维持原判。",
      "<strong>各方评论：</strong>央视《朝闻天下》做专题报道，强调“对裁判的肢体接触无论轻重都应严惩”。知乎专栏的分析是：“C罗确有推搡动作，且让裁判明显感知……即便非恶意，也属违规行为。”皇马球迷嫌处罚过重，巴萨球迷嫌推裁判罚得还不够久。前裁判卢卡·马雷利等专家则普遍认为<strong>5场禁赛合理且必要</strong>。",
      "<strong>历史定位：</strong>这是C罗皇马生涯的第11张红牌（含各项赛事），也是最具争议的一张——推的是当值主裁，舞台还是国家德比。对照组常年摆在那里：梅西在巴萨21年，红牌仅少数几张；C罗的纪律问题，则又一次被摆上台面。此役皇马3-1取胜，并最终捧起西超杯，代价则写得很清楚——新赛季刚一开局，头号球星就高挂免战牌。",
      "<strong>反应：</strong>西班牙媒体对他穷追猛打；《马卡报》和《阿斯报》干脆以「耻辱」为题。推搡裁判的一幕，就此定格为他缺乏自控力的标志性画面。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>本档案依据西班牙足协官方处罚公告与公开媒体报道整理，相关判罚与禁赛场次均以官方文书为准。</div>"
    ],
    detailEn:[
      "<strong>Background:</strong> 13 August 2017, first leg of the Spanish Super Cup, Real Madrid away to Barcelona at Camp Nou. El Clásico was already at boiling point, with Madrid fresh from the 2016-17 La Liga and Champions League double; Ronaldo came off the bench and within 24 minutes produced the season's most controversial sequence — goal, dive, ref-shove. A treble that shocked football.",
      "<strong>The three minutes:</strong> In the 78th minute Ronaldo nutmegged Piqué and crashed a left-footed shot into the net — Real 2-1 up. Barely a minute later, after contact with Umtiti in the box he embellished the fall, and referee Ricardo de Burgos Bengoetxea ruled it a dive — a <strong>second yellow card</strong>, and off he went. A rare straight dismissal for Ronaldo in El Clásico.",
      "<strong>Shoving the referee:</strong> Furious at the call, the freshly dismissed Ronaldo <em>shoved referee De Burgos from behind</em> with enough force to send the official stumbling forward. The shove was logged in the referee's post-match report: 'After being sent off, the player pushed me from behind, hard enough to unbalance me.' A physical assault on a match official, from behind — well beyond ordinary protest.",
      "<strong>Additional sanction:</strong> On 14 August 2017 the Spanish FA's competition committee delivered its verdict: one match for the red card itself, <em>four more</em> for the shove — a <strong>five-match ban</strong> in total. Under FA rules shoving a referee can draw four to twelve additional matches, so five sat in the relatively moderate range. Real appealed; the Spanish appeals committee upheld the ruling on 21 August.",
      "<strong>Commentary:</strong> CCTV's 'Morning News' ran a special segment on the incident, stressing that 'physical contact with a referee, however slight, must be severely punished'. A Zhihu column argued: 'Ronaldo clearly shoved the referee and made him visibly feel it… even if not malicious, it's a foul.' Real fans found the punishment too harsh; Barcelona fans thought a shove on a referee deserved more. Former referee Luca Marelli and other experts broadly agreed the <strong>five-match ban was justified and necessary</strong>.",
      "<strong>Historical significance:</strong> The 11th red card of Ronaldo's Real Madrid career, all competitions counted, and the most controversial — not only for the shove, but for the stage it landed on: El Clásico. Messi picked up a handful of red cards across 21 years at Barcelona; by contrast, Ronaldo's discipline was under scrutiny once again. Madrid won the match 3-1 and lifted the Super Cup, then began the new season without their biggest star — the price of Ronaldo's impulsiveness.",
      "<strong>Reaction:</strong> The Spanish press hammered him; Marca and AS headlined it a disgrace. The shove became the defining image of his lack of self-control.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong>This file is compiled from the Spanish FA's official punishment notice and public media reports; relevant verdicts and ban matches follow official documents.</div>"
    ],
    tags:["推裁判","禁赛5场","西超杯","国家德比","假摔"],
    tagsEn:["shoved the ref","5-match ban","Spanish Super Cup","El Clásico","diving"],
    tagsEs:["empuja al árbitro","sanción de 5 partidos","Supercopa de España","Clásico","simulación"]
  },
  {
    id:4, cat:"violence", catLabel:"场内暴力", severity:4,
    dateIso:"2021-10-24",
    title:"双红会“三连踢”",
    titleEn:"'Three-Kick' in the Northwest Derby",
    titleEs: "El «tres-patadas» en el derbi del Norte",
    summaryEs: "En el 0-5 del United contra el Liverpool, Cristiano le dio tres patadas a Curtis Jones en el suelo en apenas 2 segundos: el «Ronaldo three-kick», un gesto violento que se hizo viral.",
    dateEs: "24 oct 2021",
    locationEs: "Old Trafford",
    detailEs: [
      "<strong>El partido:</strong> United–Liverpool del 24 de octubre de 2021, el derbi del Norte. El United encajó un humillante 0-5 en casa, una de las peores derrotas de su historia reciente.",
      "<strong>La acción:</strong> Con el resultado ya cocinado, Cristiano se enzarzó con Curtis Jones en el suelo y, en apenas 2 segundos, le propinó <strong>tres patadas seguidas</strong> al jugador caído. La repetición a cámara lenta no dejó lugar a dudas.",
      "<strong>«Ronaldo three-kick»:</strong> El momento se hizo viral en redes con el apodo «three-kick»: tres patadas, una, dos, tres, en nada de tiempo. Para muchos fans fue la prueba de su frustración y su costumbre de «perder los papeles» cuando va perdiendo.",
      "<strong>Sin expulsión:</strong> Sorprendentemente, el árbitro no mostró roja. Klopp, entrenador del Liverpool, dijo tras el partido: «Vi a Cristiano darle tres patadas con mis propios ojos y, aun así, el árbitro me dijo que no era roja».",
      "<strong>Reacción mediática:</strong> La prensa inglesa lo puso a caer: el ídolo regresado al United protagonizando semejante imagen en una goleada histórica. La secuencia de las tres patadas se convirtió en meme.",
      "<strong>El patrón:</strong> Para los críticos, este episodio refuerza el patrón de toda su carrera: cuando el equipo va perdiendo, Cristiano «se va de la cabeza» y recurre a la violencia. No es la primera —ni la última— vez que se le ve pegar.",
      "<strong>Contexto:</strong> El 0-5 fue el principio del fin de la etapa de Solskjær y, para Cristiano, una de las imágenes más bochornosas de su vuelta al United: humillado en el marcador y, encima, repartiendo patadas.",
      "<strong>Balance:</strong> Tres patadas en dos segundos, sin tarjeta roja y con el equipo goleado. Una imagen que resume al Cristiano de las grandes noches frustradas.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> El contenido de esta entrada se elabora a partir de informaciones públicas y es solo orientativo.</div>"
    ],





    date:"2021年10月24日",
    dateEn:"Oct 24, 2021",
    location:"老特拉福德球场",
    locationEn:"Old Trafford",
    img:"assets/images/report/r-04.jpg",
    summary:"曼联0-5惨败利物浦的比赛中，C罗对着倒地的柯蒂斯-琼斯2秒内连踢三脚（“罗三脚”），克洛普怒斥“我亲眼目睹C罗踢了三脚”，裁判却只给黄牌。",
    summaryEn:"During United's 0-5 humiliation by Liverpool, Ronaldo kicked the grounded Curtis Jones three times in 2 seconds ('Ronaldo three-kick'); Klopp fumed 'I saw him kick him three times', yet the ref only showed yellow.",
    detail:[
      "<strong>惨案背景：</strong>2021年10月24日，老特拉福德上演百年耻辱——曼联主场<strong>0比5惨败</strong>利物浦，这是红魔主场对阵死敌的最惨痛失利之一。凯塔、若塔先后破门，萨拉赫更是上演帽子戏法，半场尚未结束比分已是<strong>0比4</strong>，整座球场陷入死寂，主队球员的士气彻底崩塌。",
      "<strong>失控的巨星：</strong>上半场补时阶段，0比4的羞辱让C罗失去理智。面对利物浦年仅<strong>21岁</strong>的小将柯蒂斯·琼斯，倒地后的他<em>对准对手连续蹬踹</em>——动作凶狠、刻意，是泄愤，不是对抗。",
      "<strong>以大欺小：</strong>被踢的琼斯当时年仅<strong>21岁</strong>，而C罗已<strong>36岁</strong>，足足比对手大<strong>15岁</strong>。一个功成名就的老将对晚辈下此狠脚，球品与格局可见一斑。<em>输球又输人</em>，年龄差与辈分差让这场犯规更显难堪。",
      "<strong>量刑过轻：</strong>当值主裁安东尼·泰勒仅向C罗出示<strong>一张黄牌</strong>了事。慢镜头显示，C罗的蹬踹动作具备暴力犯规的全部要素——力量大、针对性明显、危及对方身体，按规则够得上直接红牌。天空体育裁判专家加拉格直言他<em>运气好</em>才没被罚下。",
      "<strong>受害者反应：</strong>21岁的琼斯赛后表现克制，没有渲染伤情，利物浦阵营与媒体却群情激愤。罗伯逊、范戴克当场围上来讨说法，场面一度失控。前裁判、评论员纷纷指出，<em>若换作普通球员早已被罚下</em>——C罗能全身而退，靠的正是那块名为“超级巨星”的免死金牌。",
      "<strong>一耻二辱：</strong>更让曼联球迷绝望的是，球队在场上被全面碾压，唯一能上头条的竟是当家球星的<strong>球场暴力</strong>。0比5已是奇耻大辱，C罗的连踢雪上加霜，让这场溃败从战术失败升级为<strong>形象灾难</strong>。网友调侃<em>被儿时偶像踢是种什么体验</em>。",
      "<strong>模式化失态：</strong>这并非C罗首次在逆境中以暴力宣泄情绪。从拍打小球迷手机到抢夺记者话筒，再到此次蹬踹琼斯，<strong>输不起就动手</strong>几乎成了他的行为定式。这场0比5惨败中的三连踢，也因此被反复列入C罗“黑历史”的经典案例。",
      "<strong>总评：</strong>两秒内三脚踢人，没有红牌，球队还大比分落败。这一幕浓缩了大场面夜晚受挫时的那个C罗。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>本文内容基于公开报道整理，仅供参考。</div>"
    ],
    detailEn:[
      "<strong>Humiliation backdrop:</strong> On 24 October 2021, Old Trafford witnessed a centennial disgrace — Manchester United were beaten <strong>0-5 at home</strong> by Liverpool, one of the Red Devils' heaviest ever defeats by their bitterest rivals. Keita, Jota and a Salah hat-trick had the score at <strong>0-4</strong> before half-time. The stadium fell silent, and with it went the home side's last pretence of competing.",
      "<strong>A star who lost control:</strong> In first-half stoppage time, with the score 0-4, the humiliation tipped Ronaldo over the edge. When Liverpool's <strong>21-year-old</strong> Curtis Jones went to ground, Ronaldo <em>kicked out at him three times</em> — forceful and deliberate, vindictive rather than anything you could call a physical contest.",
      "<strong>Bullying the young:</strong> Jones was just <strong>21</strong>; Ronaldo was <strong>36</strong> — a full <strong>15 years older</strong>. An established veteran hacking a player that far his junior said plenty about his temperament and class. <em>Losing the match, then losing his dignity</em> — and the age gap made the foul all the more embarrassing.",
      "<strong>Shockingly lenient:</strong> Referee Anthony Taylor produced only a <strong>single yellow card</strong>. The slow-motion replays left little doubt: stamps with every element of violent conduct — heavy force, clear intent, danger to the opponent — squarely a straight red under the rules. Sky Sports' referee expert Gallagher said he was <em>lucky</em> to escape a sending-off.",
      "<strong>The victim's reaction:</strong> The 21-year-old Jones was remarkably restrained after the match and did not play up his injuries; the Liverpool camp and the media were incensed on his behalf. Robertson, Van Dijk and others stormed in demanding an explanation, and the scene briefly threatened to spiral. Former referees and pundits pointed out that <em>any other player would already have been sent off</em>; Ronaldo's clean getaway came courtesy of the get-out-of-jail card marked 'superstar'.",
      "<strong>Double disgrace:</strong> What devastated United fans most was that, while the team was being taken apart on the pitch, the only headline their marquee star could muster was <strong>on-pitch violence</strong>. The 0-5 scoreline was humiliating enough; the three-kick sequence rubbed salt into it, turning a tactical defeat into an <strong>image disaster</strong>. Online, fans joked about <em>what it's like to be kicked by your childhood idol</em>.",
      "<strong>A pattern of meltdown:</strong> This was far from the first time Ronaldo answered adversity with violence. From slapping a young fan's phone to snatching a reporter's microphone, to kicking out at Jones here, <strong>'can't lose, so lash out'</strong> is almost his behavioural signature. The three-kick sequence in this 0-5 humiliation is a perennial entry in the 'Ronaldo dark-history' canon.",
      "<strong>Verdict:</strong> Three kicks in two seconds, no red card, and his team hammered — the definitive snapshot of Cristiano on a big night going wrong.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong>This entry is compiled from public reporting and is for reference only.</div>"
    ],
    tags:["三连踢","双红会","利物浦","0-5惨败","报复动作"],
    tagsEn:["triple kick","North West Derby","Liverpool","0-5 thrashing","retaliation"],
    tagsEs:["patada triple","derbi del Noroeste","Liverpool","5-0 escandaloso","venganza"]
  },
  {
    id:5, cat:"violence", catLabel:"场内暴力", severity:3,
    dateIso:"2015-01-01",
    title:"拳击克雷霍维亚克头部",
    titleEn:"Punch to Krychowiak's Head",
    titleEs: "Puñetazo a la cabeza de Krychowiak",
    summaryEs: "En el Real Madrid-Sevilla, Cristiano soltó en pleno juego un puñetazo a la cabeza del sevillista Grzegorz Krychowiak. Ni el árbitro ni el Comité lo sancionaron.",
    dateEs: "2015",
    locationEs: "España",
    detailEs: [
      "<strong>El partido:</strong> Real Madrid–Sevilla, Liga 2015. En pleno juego, Cristiano y el mediocampista sevillista Grzegorz Krychowiak se enzarzaron.",
      "<strong>El puñetazo:</strong> En plena carrera, Cristiano giró el brazo y le soltó un puñetazo en la cabeza a Krychowiak. Las cámaras lo cazaron en directo.",
      "<strong>Sin sanción en el acto:</strong> El árbitro no sancionó la acción en caliente. El Comité Disciplinario, tras ver el vídeo, tampoco: la famosa «laguna» de La Liga con las repeticiones le ahorró la sanción retroactiva.",
      "<strong>Reacción:</strong> La prensa deportiva se hizo eco; la sanción, nunca llegó. Uno de los muchos episodios violentos de Cristiano que quedaron impunes en España.",
      "<strong>El patrón violento:</strong> Suma y sigue: puñetazos, codazos, patadas, pisotones. Cristiano acumula 14 rojas en su carrera; muchas acciones violentas como esta ni siquiera llegaron a tarjeta.",
      "<strong>Krychowiak:</strong> El polaco no hizo gran ruido mediático, pero las imágenes son evidentes: un puñetazo clavado en la cabeza en plena carrera. Un clásico: Cristiano fuera de sí.",
      "<strong>Conclusión:</strong> Un puñetazo impune que retrata la permisividad del fútbol español con las estrellas — y la tendencia violenta del propio Cristiano.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> Este suceso se basa principalmente en informes de medios británicos y repeticiones del partido; el árbitro del campo y La Liga no tomaron medidas retroactivas. Este archivo solo recoge el debate público y no representa un veredicto factual definitivo.</div>"
    ],





    date:"2015年",
    dateEn:"2015",
    location:"西班牙",
    locationEn:"Spain",
    img:"assets/images/report/r-05.jpg",
    summary:"皇马客战塞维利亚，C罗在无球跑动中挥拳击打克雷霍维亚克头部——裁判未予任何处罚。",
    summaryEn:"During Real Madrid vs Sevilla, Ronaldo threw a punch in open play that struck opponent Grzegorz Krychowiak in the head. No card followed.",
    detail:[
      "<strong>比赛背景：</strong>2015年5月2日，西甲第35轮，皇家马德里客场挑战塞维利亚（皮斯胡安球场）。皇马当时落后榜首巴萨2分，争冠进入白热化。C罗此役上演帽子戏法，率队3-2险胜，保住夺冠希望。但赛后舆论的焦点不是他的三个进球，而是一段被镜头捕捉下来的<em>无球状态暴力动作</em>。",
      "<strong>挥拳击头：</strong>在毫无争球可能的跑动中，C罗<strong>挥拳击打塞维利亚中场格热戈日·克雷霍维亚克的后脑/背部</strong>。波兰国脚当时正背对C罗，毫无防备。这一明显超出竞技范畴的动作，被场边多机位摄像机完整记录——而当值主裁判未予任何处罚，既无黄牌，更无红牌。",
      "<strong>舆论哗然：</strong>赛后视频在社交媒体疯传。英国《每日镜报》把这记挥拳列入“C罗逃过处罚的争议时刻”专题，直言这是<em>“凭借名声免责”</em>的典型案例。许多球迷愤怒留言：“如果换个无名球员这么做，至少是红牌加禁赛。”塞维利亚方面同样不满裁判的视而不见，但西甲纪律委员会事后未追加处罚。",
      "<strong>模式化行为：</strong>《镜报》把拳击克雷霍维亚克、肘击阿尔维斯、飞踹门将等并列为C罗“纪律幸运儿”的代表作。分析指出，超级巨星的身份让C罗长期活在裁判的<strong>“名声保护伞”</strong>之下——挑衅性动作到了他这里，往往被默认为“情绪宣泄”而非暴力行为。同样的现象在梅西身上几乎找不到，这也是两人纪律记录差距悬殊的原因之一。",
      "<strong>对手态度：</strong>克雷霍维亚克本人在后续采访中并未大肆炒作此事，只向南非媒体坦言，得知C罗对阵塞维利亚的恐怖进球纪录后“非常愤怒”，话里话外，是明显的个人恩怨。作为波兰国脚与塞维利亚核心后腰，他素以强硬防守著称，但面对C罗的暗算，得到的只有裁判的沉默。",
      "<strong>横向对比：</strong>同类动作放在英超、德甲，往往直接红牌起步。C罗出拳力度更大、目标更明确（后脑），却全身而退——<strong>顶级球星在判罚尺度上的双重标准</strong>，再次得到印证。",
      "<strong>结论：</strong>一记未受惩罚的拳头，把西班牙足球对球星的宽容、以及C罗本人倾向暴力的做派，悉数摆上了台面。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>该事件主要依据英国媒体报道与赛后视频回放，当值裁判与西甲官方未对此做出追加处罚认定。本档案仅记录公开讨论，不代表最终事实判定。</div>"
    ],
    detailEn:[
      "<strong>Match background:</strong> On 2 May 2015, La Liga matchday 35, Real Madrid travelled to face Sevilla at the Sánchez Pizjuán. Madrid trailed leaders Barcelona by two points and the title race was white-hot. Ronaldo hit a hat-trick as Real edged a 3-2 thriller to keep their title hopes alive. Yet the post-match talking point was not his three goals but one moment of <em>off-the-ball violence</em> caught on camera.",
      "<strong>The punch:</strong> During the match, with no chance of contesting the ball, Ronaldo <strong>swung a punch into the back of Sevilla midfielder Grzegorz Krychowiak's head</strong>. The Polish international had his back to Ronaldo and never saw it coming. It was well outside the bounds of competition, caught by multiple touchline cameras — and the on-field referee still took no action. No yellow, let alone a red.",
      "<strong>Public outcry:</strong> After the match the clip went viral on social media. Britain's Daily Mirror added it to a feature on 'Ronaldo's controversial escapes from punishment', calling it a textbook case of <em>'immunity by reputation'</em>. Fans fumed: 'If an unknown player did this, it would be a red and a ban at minimum.' Sevilla, too, objected to the referee's blind eye — and the La Liga disciplinary committee still took no retrospective action.",
      "<strong>A pattern of behaviour:</strong> The Mirror filed the Krychowiak punch alongside elbows on Alves and a flying kick at a keeper — signature entries in Ronaldo's 'lucky discipline' collection. Analysts suggested that, as a global superstar, he long enjoyed the referee's <strong>'umbrella of reputation'</strong>: provocations dismissed as 'venting emotion' rather than violence. Messi was virtually never extended the same treatment — one key reason their disciplinary records diverge so sharply.",
      "<strong>Opponent's attitude:</strong> Krychowiak himself did not play up the incident in subsequent interviews, but told South African media he was 'very angry' after learning of Ronaldo's terrifying goal-scoring record against Sevilla — a hint of personal enmity that was hard to miss. A Polish international and Sevilla's holding midfield anchor, known for hard-nosed defending, he had no answer to Ronaldo's sucker punch except to swallow the referee's silence.",
      "<strong>Broad comparison:</strong> Comparable actions in the Premier League or Bundesliga typically start at a straight red. Ronaldo's punch was harder and more targeted — to the back of the head — yet he walked away unscathed. Further proof of <strong>the double standard in how elite stars are officiated</strong>.",
      "<strong>Conclusion:</strong> An unpunished punch that says everything about Spanish football's leniency with its stars — and about Cristiano's own violent tendencies.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong> This event is based mainly on British media reports and post-match video replays; the on-field referee and La Liga took no retrospective action. This archive only records public discussion and does not represent a final factual verdict.</div>"
    ],
    tags:["拳击","塞维利亚","无球暴力","克雷霍维亚克"],
    tagsEn:["punch","Sevilla","off-ball violence","Krychowiak"],
    tagsEs:["puñetazo","Sevilla","violencia sin balón","Krychowiak"]
  },
  {
    id:6, cat:"violence", catLabel:"场内暴力", severity:3,
    dateIso:"2010-01-01",
    title:"国家德比肘击阿尔维斯",
    titleEn:"Elbow to Dani Alves in El Clásico",
    titleEs: "Codazo a Dani Alves en el Clásico",
    summaryEs: "En pleno Clásico, Cristiano clavó un codazo en la cabeza al lateral derecho blaugrana Dani Alves y provocó una tangana entre ambos bandos.",
    dateEs: "Época Real Madrid",
    locationEs: "Clásico, España",
    detailEs: [
      "<strong>El escenario:</strong> Real Madrid–Barça, un Clásico de los gordos. Cristiano y el lateral brasileño Dani Alves se cruzaban una y otra vez por la banda derecha.",
      "<strong>El codazo:</strong> En una de esas, Cristiano levantó el codo y golpeó a Dani Alves en la cabeza. El brasileño cayó al suelo y se montó la tangana entre ambos equipos.",
      "<strong>Reacción del Camp Nou / Bernabéu:</strong> La afición rival pitó a Cristiano sin descanso; las imágenes del codazo se repitieron durante días en los programas deportivos.",
      "<strong>El historial de codazos:</strong> No fue un caso aislado: los codazos de Cristiano (a Alves, a otros rivales) son una constante de su carrera, una de sus marcas de la casa cada vez que se siente acorralado.",
      "<strong>Consecuencias:</strong> Según el partido y el árbitro, codazos así le costaron amarillas o directamente rojas. Aquí, como en tantas otras, la respuesta disciplinaria se quedó a medias.",
      "<strong>El «Clásico violento»:</strong> Para los culés, Cristiano quedó retratado como un jugador que, cuando no le salían las cosas, recurría a la violencia callejera: codazos, manotazos y pisotones.",
      "<strong>Balance:</strong> Un codazo en un Clásico, una tangana, y una imagen más para la colección de «momentos violentos de Cristiano».",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> El árbitro del campo consideró el contacto «accidental» y no tomó medidas. Este expediente sintetiza informaciones mediáticas y distintos puntos de vista; la naturaleza del codazo se interpreta de manera distinta según la postura.</div>"
    ],





    date:"皇家马德里时期",
    dateEn:"Real Madrid era",
    location:"西班牙国家德比",
    locationEn:"El Clásico, Spain",
    img:"assets/images/report/r-06.jpg",
    summary:"国家德比，C罗肘击巴萨右后卫阿尔维斯头部引发两队冲突，吃黄牌的却是挨肘的人。",
    summaryEn:"Ronaldo's elbow into Barcelona right-back Dani Alves's head sparked a brawl between both sides in El Clásico — and a yellow card for the victim.",
    detail:[
      "<strong>国家德比背景：</strong>2015年11月21日，西甲第12轮国家德比，皇家马德里主场0-4惨败巴塞罗那（伯纳乌球场）。这场一边倒的比赛前半段，C罗与巴萨右后卫丹尼·阿尔维斯多次发生肢体冲突，其中一次<em>肘击动作</em>成为全场最具争议的瞬间之一。两人是当时足坛最著名的对位宿敌，每次国家德比都火星四溅。",
      "<strong>肘击经过：</strong>上半场，阿尔维斯在C罗的跑动路线上<strong>卡位阻挡</strong>，巴西人张开双臂，封住C罗的冲刺路线。C罗高速奔跑中没有收力，直接用<em>右肘重重击打阿尔维斯头部</em>。阿尔维斯应声倒地，捂头痛苦翻滚。西班牙语媒体管这个动作叫“codazo”（肘击）——带攻击性的肘部撞击。",
      "<strong>判罚争议：</strong>主裁判大卫·费尔南德斯·博尔巴兰不仅没有处罚C罗，反而<strong>向受害者阿尔维斯出示黄牌</strong>，理由是“阻挡犯规”。在裁判的版本里，这记肘击属于“意外接触”，犯规的是被击中的阿尔维斯。巴萨阵营的震怒不难理解——是非在这份判罚里被当场颠倒。",
      "<strong>媒体反应：</strong>Bleacher Report的标题不留情面：“C罗肘击阿尔维斯头部”。足球记者格拉汉姆·亨特在推特上抨击：“这是非常糟糕的选择，C罗的肘击明显是红牌犯规。”巴萨球迷账号totalBarca的定性更直接：“故意肘击，本应红牌”。到了马德里《阿斯报》那里，剧本换了：“C罗只是跑动中撞到阿尔维斯”。",
      "<strong>裁判双标：</strong>此案与拳击克雷霍维亚克、飞踹克拉尼奥等事件一脉相承，共同构成了C罗<strong>“超级巨星裁判豁免权”</strong>的证据链。同一时期，巴萨球员因类似肘击动作多次被红牌罚下，而C罗的肘击却连黄牌都未吃。这种判罚的不对等，长期被西班牙媒体和球迷社群视为国家德比中“皇马受益”的典型例证。",
      "<strong>后续影响：</strong>这场比赛最终巴萨4-0大胜，C罗全场零进球零助攻，伯纳乌见证了他罕见的彻底失势之夜。肘击阿尔维斯事件虽未被追加处罚，但被《马卡报》读者投票评为当赛季国家德比“最该红牌却未判”的动作之一。",
      "<strong>总评：</strong>一记肘击、一场冲突、一帧画面，再配一张亮给受害者的黄牌——收入「C罗暴力瞬间」合集。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>当值裁判认定该接触为“意外”，未做出处罚。本档案综合媒体报道与多方观点整理，肘击性质在不同立场下存在解读差异。</div>"
    ],
    detailEn:[
      "<strong>El Clásico backdrop:</strong> On 21 November 2015, matchday 12 of La Liga, Real Madrid were thrashed 0-4 at home by Barcelona at the Bernabéu. Early in the rout, Ronaldo and Barcelona right-back Dani Alves clashed repeatedly, and one <em>elbow</em> became one of the night's most argued-over moments. The two were El Clásico's most storied direct duellers; every meeting carried a charge.",
      "<strong>The elbow:</strong> In the first half Alves took up a <strong>blocking position</strong> in Ronaldo's running lane, the Brazilian spreading his arms to choke off Ronaldo's sprint. Ronaldo, at full pace and refusing to pull back, drove his <em>right elbow hard into Alves's head</em>. Alves went down clutching his head in agony. The Spanish press dubbed the motion a 'codazo' (elbow strike) — an aggressive impact.",
      "<strong>Disciplinary controversy:</strong> Inexplicably, referee David Fernández Borbalán not only let Ronaldo off without punishment but <strong>showed the victim Alves a yellow card</strong> for a 'blocking foul'. The official had evidently read the elbow as 'accidental contact' and ruled Alves the offender. That logic enraged the Barcelona camp, who saw a referee turning right and wrong upside down.",
      "<strong>Media reaction:</strong> Bleacher Report's headline blared 'Ronaldo elbows Alves in the head'. Football journalist Graham Hunter tweeted: 'That's a really bad call, Ronaldo's elbow was a clear red.' Barcelona fan account totalBarca called it 'a deliberate elbow that should have been a red'. Madrid's Diario AS defended him: 'Ronaldo simply collided with Alves while running.' The two cities' media argued past each other.",
      "<strong>Referee double standards:</strong> This case, together with the punch on Krychowiak and the flying kick on Cragno, forms the case file for Ronaldo's <strong>'superstar referee immunity'</strong>. In the same period Barcelona players were repeatedly sent off for similar elbow gestures, yet Ronaldo's elbow drew not even a yellow. That disparity in officiating has long been cited by Spanish media and fan communities as a textbook example of 'Real Madrid benefiting' in El Clásico.",
      "<strong>Aftermath:</strong> Barça won 4-0; Ronaldo finished with zero goals and zero assists — a rare night of total defeat at the Bernabéu. The elbow on Alves drew no retrospective punishment; Marca readers voted it one of the season's 'most-should-have-been-red' El Clásico incidents.",
      "<strong>Verdict:</strong> An elbow in a Clásico, a flare-up, one more entry for the «Cristiano's violent moments» collection.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong>The on-field referee deemed the contact 'accidental' and took no action. This file synthesises media reporting and multiple viewpoints; the nature of the elbow is read differently across positions.</div>"
    ],
    tags:["肘击","国家德比","阿尔维斯","巴萨","头部攻击"],
    tagsEn:["elbow","El Clásico","Dani Alves","Barça","head attack"],
    tagsEs:["codazo","Clásico","Dani Alves","Barça","golpe con la cabeza"]
  },
  {
    id:7, cat:"violence", catLabel:"场内暴力", severity:4,
    dateIso:"2018-01-01",
    title:"飞踹门将克拉尼奥下巴",
    titleEn:"Flying Kick to Keeper Cragno's Jaw",
    titleEs: "Patada voladora a la mandíbula del portero Cragno",
    summaryEs: "En el Juventus-Cagliari, Cristiano entró volando a por el balón y le dio una patada en la mandíbula al portero Alessio Cragno, que acabó sangrando. Una entrada brutal que dejó imágenes escabrosas.",
    dateEs: "Época Juventus",
    locationEs: "Italia",
    detailEs: [
      "<strong>El partido:</strong> Juventus-Cagliari, Serie A. En una salida del portero del Cagliari, Alessio Cragno, Cristiano saltó en plancha a por el balón.",
      "<strong>La entrada:</strong> Con la plancha en alto, Cristiano golpeó a Cragno directamente en la mandíbula. El portero quedó en el suelo, sangrando y con cortes visibles.",
      "<strong>Imágenes escabrosas:</strong> Las fotos del momento, con la bota de Cristiano clavándose en la cara de Cragno y la sangre manando, dieron la vuelta a Italia.",
      "<strong>Sin roja:</strong> El árbitro no mostró la tarjeta roja. La prensa italiana cargó contra la actuación arbitral; la sanción, nunca llegó.",
      "<strong>El patrón:</strong> La plancha levantada es otra constante de Cristiano: a Cragno, a otros rivales. El factor «estrella» parece blindarlo de las rojas evidentes.",
      "<strong>Cragno:</strong> El portero, herido en la mandíbula, siguió jugando; las imágenes permanecen como una prueba más del estilo agresivo del portugués.",
      "<strong>Conclusión:</strong> Una patada voladora a la mandíbula de un portero, sangre por todas partes y, aun así, sin expulsión. La misma entrada en cualquier otro jugador: roja directa y varios partidos de sanción.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> Ni el árbitro del campo ni el VAR consideraron la acción como tarjeta roja. Las opiniones sobre la naturaleza de la jugada difieren entre el colectivo arbitral y los medios de comunicación; este expediente sintetiza diversos comentarios públicos.</div>"
    ],





    date:"尤文图斯时期",
    dateEn:"Juventus era",
    location:"意大利",
    locationEn:"Italy",
    img:"assets/images/report/r-07.jpg",
    summary:"尤文对阵卡利亚里，C罗抢点时飞踹门将克拉尼奥的下巴，鞋钉见血，他却只吃到黄牌。",
    summaryEn:"In Juventus vs Cagliari, Ronaldo flew in to contest the ball and kicked keeper Alessio Cragno in the jaw, drawing blood. The sanction: a yellow card.",
    detail:[
      "<strong>比赛背景：</strong>2021年3月14日，意甲第27轮，尤文图斯客场挑战卡利亚里（撒丁岛竞技场）。尤文刚在欧冠1/8决赛被波尔图淘汰，C罗因表现疲软饱受批评，急需一场爆发正名。最终尤文3-1取胜，C罗32分钟内上演帽子戏法——但真正在赛后掀起风暴的，是开场14分钟的那次<strong>飞踹门将</strong>。",
      "<strong>飞踹经过：</strong>第14分钟，C罗高速冲入禁区争抢高球，卡利亚里门将阿莱西奥·克拉尼奥勇敢出击将球击出。但C罗在<em>毫无收脚可能</em>的情况下，右脚鞋钉高高抬起，<strong>直接踹中克拉尼奥的面部和颈部</strong>。克拉尼奥当场倒地，下巴被鞋钉划出一道深深的伤口，血流不止，需要长时间场边治疗。",
      "<strong>判罚争议：</strong>主裁判詹保罗·卡尔瓦雷塞仅向C罗出示<strong>黄牌</strong>，VAR<em>竟然没有介入干预</em>。而IFAB《足球竞赛规则》第12.3条白纸黑字：“任何球员用一条或两条腿以过度力量扑向对手、危及对手安全的，即构成严重犯规，应判红牌。”对照条文，这几乎是教科书级的红牌动作；实际判罚，黄牌。",
      "<strong>专家炮轰：</strong>前意甲名哨卢卡·马雷利直言：“<em>罗纳尔多应该被红牌罚下。虽非故意，但这绝对是严重犯规，VAR不介入令人遗憾。</em>”卡利亚里主席托马索·朱利尼愤怒控诉：“C罗没被罚下让我最不满，因为这动作本可能改变比赛。它危及了我们门将的安全，规则书写得明明白白，应该红牌。”",
      "<strong>球迷怒火：</strong>社交媒体上骂声一片。有球迷讽刺：“<strong>除非你球衣背后印着‘罗纳尔多’，否则这动作十次有十次是红牌。</strong>”还有评论直指意甲裁判对超级巨星的系统性偏袒，认为“VAR只为保护豪门而存在”。这种“球星特权”的指控在意大利足坛引发广泛共鸣。",
      "<strong>讽刺结局：</strong>逃过红牌的C罗非但没有付出代价，反而在第25分钟制造点球（犯规的，正是被他踹得血流不止的克拉尼奥），亲自主罚命中；第32分钟再进一球，完成帽子戏法。进球后C罗做出<em>摸自己脖子</em>的庆祝动作，外界解读不一：有人认为他在回应批评，也有人认为他在暗示“我刚才只是碰到克拉尼奥的脖子”，挑衅意味浓厚。",
      "<strong>历史定位：</strong>飞踹克拉尼奥事件被英国《太阳报》列为“C罗生涯逃过红牌的恐怖铲断”榜首，与拳击克雷霍维亚克、肘击阿尔维斯并列，构成他球场暴力行为的完整图景。这一系列前科，让C罗的<strong>“金球光环保护论”</strong>在球迷圈根深蒂固。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>当值裁判与VAR均未认定该动作构成红牌。关于动作性质的判定在裁判界与媒体间存在分歧，本档案综合多方公开评论整理。</div>"
    ],
    detailEn:[
      "<strong>Match background:</strong> On 14 March 2021, Serie A matchday 27, Juventus travelled to face Cagliari at the Sardegna Arena. Juve had just been knocked out of the Champions League round of 16 by Porto, and Ronaldo, criticised for a limp performance, desperately needed a statement night. Juve won 3-1 and Ronaldo bagged a hat-trick inside 32 minutes — but the <strong>flying kick at the keeper</strong> in the 14th minute was the real post-match story.",
      "<strong>The flying kick:</strong> In the 14th minute Ronaldo charged into the box to contest a high ball and Cagliari keeper Alessio Cragno bravely came out to punch it clear. But Ronaldo, <em>unable to pull his leg back in time</em>, raised his studs and <strong>caught Cragno flush in the face and neck</strong>. Cragno went down immediately, his jaw gashed by the studs, bleeding heavily and requiring lengthy treatment on the touchline.",
      "<strong>Disciplinary controversy:</strong> Referee Gianpaolo Calvarese showed Ronaldo only a <strong>yellow card</strong>, and VAR <em>did not intervene</em>. Under IFAB Law 12.3, 'any player who lunges at an opponent with one or both legs with excessive force, endangering the safety of the opponent, is guilty of serious foul play and must be sent off.' This was a textbook red.",
      "<strong>Expert reaction:</strong> Former Serie A referee Luca Marelli was blunt: '<em>Ronaldo should have been sent off. Not intentional, but it is absolutely serious foul play; that VAR did not intervene is regrettable.</em>' Cagliari president Tommaso Giulini fumed: 'The fact Ronaldo was not sent off is what displeases me most — this was an action that could have changed the game. It endangered our keeper, and the rules are written clearly — it should have been a red.'",
      "<strong>Fan anger:</strong> Social media erupted. One fan quipped: '<strong>Unless the back of your shirt reads \"Ronaldo\", that's a red ten times out of ten.</strong>' Others pointed to systematic favouritism toward superstars in Serie A, arguing 'VAR only exists to protect the big clubs'. The 'star privilege' charge resonated widely in Italian football.",
      "<strong>Ironic aftermath:</strong> Having escaped red, Ronaldo not only stayed on but won a penalty in the 25th minute (Cragno's foul), converted it himself, and added another in the 32nd to complete his hat-trick. He celebrated by <em>touching his own neck</em> — interpretations varied. Some saw a riposte to critics; others read it as a provocative hint that he had 'only nicked Cragno's neck'.",
      "<strong>Legacy:</strong> The Cragno flying kick was ranked by Britain's The Sun at the top of 'horrific Ronaldo tackles that escaped red', alongside the Krychowiak punch and the Alves elbow — the complete picture of his on-pitch violence. The series cemented the fans' <strong>'Ballon d'Or halo protection' theory</strong> around Ronaldo.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong>Neither the on-field referee nor VAR judged the action a red card. Opinions on the nature of the action differ between the refereeing community and the media; this file synthesises multiple public comments.</div>"
    ],
    tags:["飞踹","克拉尼奥","卡利亚里","出血","黄牌争议"],
    tagsEn:["flying kick","Cragnotti","Cagliari","bleeding (loss)","yellow-card controversy"],
    tagsEs:["patada voladora","Cragnotti","Cagliari","sangría (derrota)","polémica de amarilla"]
  },
  {
    id:8, cat:"violence", catLabel:"场内暴力", severity:3,
    dateIso:"2017-01-01",
    title:"世预赛掌掴奥谢",
    titleEn:"Slap to O'Shea in World Cup Qualifier",
    titleEs: "Manotazo a O'Shea en clasificatorio mundialista",
    summaryEs: "Portugal–Irlanda, clasificatorio mundialista: con Cristiano a punto de lanzar un penalti, el irlandés Dara O'Shea apartó el balón; Cristiano le contestó con un manotazo.",
    dateEs: "Clasificatorio mundialista",
    locationEs: "Portugal (casa)",
    detailEs: [
      "<strong>El partido:</strong> Portugal–Irlanda, clasificatorio para el Mundial. Portugal tenía un penalti a favor y Cristiano se disponía a lanzarlo.",
      "<strong>La provocación:</strong> El irlandés Dara O'Shea, en un intento de cortar la concentración de Cristiano, apartó el balón del punto de penalti antes del lanzamiento.",
      "<strong>El manotazo:</strong> Cristiano, fuera de sí, le soltó un manotazo a O'Shea. La cámara lo cazó y el vídeo se hizo viral.",
      "<strong>Reacción:</strong> Para muchos, otra prueba de la poca deportividad y el ego descontrolado del portugués: un capitán pegando un manotazo a un rival por un balón.",
      "<strong>El patrón del «Penaldo»:</strong> Ocurrió, cómo no, alrededor de un penalti —su especialidad—: el manotazo retrató su obsesión con el balón y su tolerancia cero ante la mínima.",
      "<strong>Sanción:</strong> La acción no conllevó expulsión en el acto, pero las imágenes son claras: un manotazo descontrolado a un rival.",
      "<strong>El balance:</strong> Un manotazo por un balón de penalti —una escena ridícula para un jugador de su talla— que se suma a la larga lista de salidas de tono de Cristiano.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> El manotazo no fue considerado sancionable ni por el árbitro del campo ni por el VAR, y Ronaldo no fue sancionado. Este expediente registra el incidente a partir de vídeo público e informes mediáticos; la fuerza y la naturaleza del manotazo se interpretan de forma distinta.</div>"
    ],





    date:"世界杯预选赛",
    dateEn:"World Cup qualifier",
    location:"葡萄牙主场",
    locationEn:"Portugal (home)",
    img:"assets/images/report/r-08.jpg",
    summary:"世预赛葡萄牙对爱尔兰，C罗主罚点球，奥谢把球踢开——C罗抡起右手赏了他一巴掌。裁判与VAR，毫无表示。",
    summaryEn:"In a Portugal vs Ireland qualifier, as Ronaldo set up to take a penalty, opponent Dara O'Shea kicked the ball away — Ronaldo responded with an open-handed slap.",
    detail:[
      "<strong>比赛背景：</strong>2021年9月1日，2022年卡塔尔世界杯欧洲区预选赛A组，葡萄牙主场迎战爱尔兰共和国（法鲁的阿尔加夫球场）。这本该是C罗的封神之夜——他以<strong>111球</strong>打破伊朗传奇阿里·代伊保持的男子国家队进球世界纪录。但当晚最先上演的，是开场15分钟的一场<em>掌掴事件</em>。",
      "<strong>掌掴经过：</strong>上半场葡萄牙获得点球（布鲁诺·费尔南德斯被杰夫·亨德里克犯规，经VAR确认）。C罗站上罚球点准备主罚，爱尔兰后卫<strong>达拉·奥谢</strong>故意把球踢离罚球点——拖延战术，意在打乱节奏、施加心理压力。C罗随即情绪失控，<em>伸手掌掴/推搡奥谢面部</em>，22岁的爱尔兰小将捂脸倒地。",
      "<strong>逃过处罚：</strong>主裁判与VAR均未对这次掌掴做出任何处罚——<strong>既无黄牌，更无红牌</strong>。按规则，攻击性手势应直接红牌。视频回放清晰显示C罗的手部接触了奥谢面部，奥谢的倒地也并非假摔。英国《每日快报》干脆以“<em>C罗掌掴奥谢后逃过惩罚</em>”为题做了报道。",
      "<strong>戏剧反转：</strong>讽刺的是，C罗随后<strong>主罚的点球被爱尔兰门将加文·巴祖努扑出</strong>——他国家队生涯罕见的点球失手，被爱尔兰球迷戏称为“掌掴的现世报”。直到第89分钟和第96分钟，C罗才连入两记头球完成逆转（2-1），打破进球纪录。掌掴事件因此被胜利叙事掩盖，但视频证据从未消失。",
      "<strong>奥谢其人：</strong>达拉·奥谢（生于1999年）并非球迷误传的老将约翰·奥谢，而是当时效力于西布朗的年轻中卫。他赛后没有大肆抱怨，但爱尔兰球迷和媒体一直记着这笔账。奥谢就此与C罗结下“梁子”——2025年11月世预赛再遇，正是他被C罗肘击，让C罗吃下国家队生涯首张红牌，<em>四年恩怨，就此闭环</em>。",
      "<strong>横向对比：</strong>同类动作在现代足球里几乎铁定红牌：2014年世界杯苏亚雷斯咬人被禁赛9场；2018年哥伦比亚球员同样因推搡对手面部被红牌罚下。C罗的掌掴发生在VAR时代，却被彻底无视——<strong>超级巨星在判罚上的系统性优待</strong>，又添一例。",
      "<strong>结论：</strong>为争一个点球而挥出的那记巴掌——对一位如此身价的球员而言，足够荒诞——就此写进了C罗失态举动的长清单。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>该掌掴动作未被当值裁判或VAR认定需处罚，C罗未被禁赛。本档案依据公开视频与媒体报道记录，掌掴力度与性质存在不同解读。</div>"
    ],
    detailEn:[
      "<strong>Match background:</strong> On 1 September 2021, in European qualifying Group A for the 2022 Qatar World Cup, Portugal hosted the Republic of Ireland at the Algarve in Faro. The night was billed as Ronaldo's coronation — his <strong>111th goal</strong> broke the Iranian legend Ali Daei's all-time men's international scoring record. But the <em>slap</em> in the 15th minute made sure the record was only half the story.",
      "<strong>The slap:</strong> In the first half Portugal won a penalty (Bruno Fernandes fouled by Jeff Hendrick, confirmed by VAR). As Ronaldo stood over the ball, Irish defender <strong>Dara O'Shea</strong> deliberately kicked it away — a time-wasting ploy to disrupt Ronaldo's rhythm and get inside his head. The reply was instant: <em>an open-handed slap to O'Shea's face</em>; down went the 22-year-old Irishman, clutching it.",
      "<strong>Escape from punishment:</strong> Neither the referee nor VAR punished the slap — <strong>no yellow, no red</strong> — though the rules say an aggressive gesture is a straight red. The replays left no ambiguity: Ronaldo's hand made contact with O'Shea's face, and the fall was not a dive. Britain's Daily Express ran the headline '<em>Ronaldo escapes punishment after slapping O'Shea</em>'; the public was appalled.",
      "<strong>Ironic reversal:</strong> Ronaldo's <strong>subsequent penalty was saved by Irish keeper Gavin Bazunu</strong> — a rare penalty miss in his international career. Irish fans needed no VAR to call it 'instant karma for the slap'. Ronaldo atoned in the 89th and 96th minutes, heading in twice to complete a 2-1 comeback and break the scoring record; the slap was buried under the narrative of victory. The video evidence never disappeared.",
      "<strong>Who is O'Shea:</strong> Dara O'Shea (born 1999) was not, as some fans misreported, the veteran John O'Shea — just a young centre-back then at West Brom. He never played up the incident afterwards; Irish fans and media remembered it for years anyway. A 'grudge' lingered between the two — when they next met, in a November 2025 qualifier, it was O'Shea whom Ronaldo elbowed, drawing Ronaldo's first national-team red — an <em>inevitable closing of a four-year loop</em>.",
      "<strong>Broad comparison:</strong> Gestures like this in the modern game are virtually always red: Suárez drew a 9-match ban at the 2014 World Cup for the bite, and in 2018 a Colombian was sent off for shoving an opponent's face. Ronaldo's slap came in the VAR era and was entirely ignored — further proof of <strong>systematic preferential officiating of superstars</strong>.",
      "<strong>Conclusion:</strong> A swipe over a penalty ball — a ridiculous look for a player of his stature — one more entry in Cristiano's long list of outbursts.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong>The slap was not deemed punishable by the on-field referee or VAR, and Ronaldo was not banned. This file records the incident based on public video and media reports; the force and nature of the slap are read differently.</div>"
    ],
    tags:["掌掴","奥谢","爱尔兰","世预赛","冲动"],
    tagsEn:["slap","O'Shea","Ireland","World Cup qualifier","impulsiveness"],
    tagsEs:["manotazo","O'Shea","Irlanda","eliminatoria mundialista","impulsividad"]
  },
  {
    id:9, cat:"violence", catLabel:"场内暴力", severity:4,
    dateIso:"2004-01-01",
    title:"14张红牌 — 暴力生涯总账",
    titleEn:"14 Red Cards — A Career of Violence",
    titleEs: "14 tarjetas rojas — toda una carrera de violencia",
    summaryEs: "A fecha de 2025, Cristiano acumula 14 rojas en su carrera: 4 en el United, 6 en el Real Madrid, 1 en la Juve, 1 en el Al Nassr, 1 con Portugal y otra sin confirmar — casi 5 veces las de Messi.",
    dateEs: "2004 — 2025 (toda la carrera)",
    locationEs: "Múltiples clubes / competiciones",
    detailEs: [
      "<strong>El recuento total:</strong> 14 tarjetas rojas en toda su carrera profesional, repartidas entre sus clubes y la selección. Una cifra escandalosa para un delantero de élite.",
      "<strong>Por club:</strong> 4 en el Manchester United (en sus dos etapas), 6 en el Real Madrid, 1 en la Juventus, 1 en el Al Nassr, 1 con la selección portuguesa y otra cuyo club exacto se discute.",
      "<strong>Tipos de roja:</strong> Muchas por agresión directa (codazos, manotazos, patadas), otras por doble amarilla — casi siempre con su dosis de «perder los papeles».",
      "<strong>Comparación con Messi:</strong> Messi, con una carrera de similar duración, acumula solo <strong>3 rojas</strong>. Cristiano tiene casi 5 veces más expulsiones que el argentino.",
      "<strong>La primera roja:</strong> Llegó en su debut con el United en 2003, a los pocos minutos de saltar al campo — un anticipo de lo que estaba por llegar.",
      "<strong>La primera con Portugal:</strong> No vio la roja con la selección hasta 2025, en un clasificatorio mundialista contra Irlanda, ya con 40 años — la 14.ª de su carrera.",
      "<strong>Patrón psicológico:</strong> Para los analistas, las 14 rojas retratan un patrón claro: cuando las cosas van mal, Cristiano «se va de la cabeza» y recurre a la agresión. La violencia como válvula de escape de su ego herido.",
      "<strong>Citas y comparativas:</strong> «14 tarjetas rojas, una cada 200 partidos más o menos. Así es como es el 1.º, 2.º y 3.º mejor de la historia», bromearon en OPTA.",
      "<strong>Balance:</strong> 14 rojas — una colección de momentos de violencia que ensucian su palmarés. Lo que para sus fans es «carácter», para el resto es falta de autocontrol.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> Las estadísticas de tarjetas rojas siguen a medios autorizados como ESPN; las distintas fuentes difieren ligeramente en algunos partidos y los totales oscilan entre 12 y 14. Este expediente toma como referencia la cifra de 14 publicada por ESPN en noviembre de 2025.</div>"
    ],





    date:"2004 — 2025 (贯穿职业生涯)",
    dateEn:"2004 — 2025 (across his career)",
    location:"多俱乐部 / 多赛事",
    locationEn:"Multiple clubs / competitions",
    img:"assets/images/report/r-09.jpg",
    summary:"截至2025年，C罗职业生涯已攒下14张红牌：曼联4张、皇马6张、尤文1张、利雅得胜利1张、葡萄牙队1张，另有1张待确认——「史上最佳」的荣誉簿，纪律这页全是红的。",
    summaryEn:"As of 2025, Ronaldo had amassed 14 career red cards: 4 at Manchester United, 6 at Real Madrid, 1 at Juventus, 1 at Al Nassr, 1 with Portugal, plus 1 pending confirmation — quite the ledger for a 'GOAT'.",
    detail:[
      "<strong>红牌总账：</strong>截至2025年11月，C罗职业生涯累计<strong>14张红牌</strong>——ESPN为此做过完整清单。按东家拆账：曼联4张、皇家马德里6张、尤文图斯1张、利雅得胜利1张，葡萄牙国家队（含青年队）2张。同时代顶级前锋里，这个数字断层领先，和「史上最佳」的光环同框，格外扎眼。对照组：梅西生涯红牌仅<strong>3-4张</strong>。",
      "<strong>曼联时期（4张）：</strong>2004年5月vs阿斯顿维拉（英超首红）；2006年1月vs曼城（曼彻斯特德比）；2007年8月vs朴茨茅斯；2008年11月vs曼城（第二张德比红）。其中两次都栽在火药味十足的曼市德比——年轻的C罗，压力给足，情绪跟着崩。弗格森爵士私下嫌他「过于情绪化」，公开场合照旧力挺爱徒。",
      "<strong>皇马时期（6张）：</strong>皇马是C罗红牌的「重灾区」——2009年12月vs阿尔梅里亚（西甲首红）；2010年1月vs马拉加；2013年5月vs马竞（国王杯决赛，加时赛肘击加比后脑）；2014年2月vs毕尔巴鄂竞技；2015年1月vs科尔多瓦（拳击对手被禁赛2场）；2017年8月vs巴萨（西超杯推搡裁判，禁赛5场）。皇马6张红牌横跨8个赛季，性质恶劣者居多。",
      "<strong>尤文与沙特：</strong>2018年9月19日，尤文图斯欧冠首秀vs瓦伦西亚，C罗在第29分钟因抓扯穆里略头发被红牌罚下，<em>当场泪洒球场</em>——这是他生涯唯一一张欧冠红牌，禁赛1场。2024年4月8日，利雅得胜利vs利雅得新月（沙特超级杯德比），C罗肘击对手吃到直红，赛后不服判罚、过激言行再加码，险遭追加禁赛。",
      "<strong>国家队红牌：</strong>2002年4月28日，17岁的C罗在U17欧青赛vs法国时吃到生涯首红。此后长达<strong>23年、226场成年国家队比赛</strong>，他从未被罚下——直到2025年11月13日vs爱尔兰。这一「国家队零红牌」纪录曾被粉丝翻来覆去当作「纪律优秀」的证据，可惜14张生涯总红牌自己会说话。",
      "<strong>梅西对比：</strong>梅西生涯红牌仅<strong>3张</strong>（部分统计含国家队为4张），其中最著名的是2005年阿根廷首秀vs匈牙利，登场仅<em>43秒</em>即被红牌罚下。两人同处一个时代、同踢进攻核心位置，红牌数却相差10张以上。Planet Football的纪律数据对比显示，梅西的黄牌数也显著低于C罗——「梅罗之争」吵了这么多年，这套纪律账总被反复搬出来。",
      "<strong>红牌分布特征：</strong>把14张红牌摊开，规律工整得吓人——多发生在<em>高压关键战</em>（德比、决赛、世预赛）、多涉及<em>暴力或挑衅行为</em>（肘击、推搡、拳击）、且常有<em>追加禁赛</em>。每张红牌背后，都是一次情绪管理的彻底崩盘。",
      "<strong>辩护与反思：</strong>C罗阵营常拿「好胜心强」「被对手挑衅」替他开脱，前皇马主帅齐达内、葡萄牙主帅马丁内斯均公开维护其「为团队而战」。但批评者不买账：<strong>好胜不应等同于暴力</strong>，14张红牌的客观数字，美化不了。",
      "<strong>总评：</strong>14张红牌——一堆玷污他荣誉簿的暴力瞬间。粉丝眼里这叫「血性」，旁人眼里这叫缺乏自控。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>红牌统计依据ESPN等权威媒体，不同数据源对部分比赛的统计口径略有差异，总数在12-14张之间浮动。本档案以ESPN 2025年11月公布的14张为准。</div>"
    ],
    detailEn:[
      "<strong>Red-card tally:</strong> As of November 2025, Ronaldo's career total stood at <strong>14 red cards</strong> — ESPN has compiled the full list. By club: Manchester United 4, Real Madrid 6, Juventus 1, Al Nassr 1, and Portugal (including youth teams) 2. No contemporary elite forward comes close, a glaring contrast to the 'GOAT' aura. For comparison, Messi's career count is <strong>3-4</strong>.",
      "<strong>Manchester United era (4):</strong> May 2004 vs Aston Villa (first Premier League red); January 2006 vs Manchester City (Manchester derby); August 2007 vs Portsmouth; November 2008 vs Manchester City (a second derby red). Two of them came in the Manchester derby alone — the young Ronaldo had a gift for losing his head exactly when the stakes were highest. Sir Alex Ferguson privately called him 'too emotional' and always backed him in public.",
      "<strong>Real Madrid era (6):</strong> Madrid was the 'disaster zone' for Ronaldo reds — December 2009 vs Almería (first La Liga red); January 2010 vs Málaga; May 2013 vs Atlético (Copa del Rey final, an extra-time elbow on Gabi's head); February 2014 vs Athletic Bilbao; January 2015 vs Córdoba (punching an opponent, banned 2 matches); August 2017 vs Barcelona (Spanish Super Cup ref-shove, 5-match ban). Six reds across eight seasons, most of them egregious.",
      "<strong>Juventus and Saudi:</strong> On 19 September 2018, his Juventus Champions League debut at Valencia, Ronaldo was sent off in the 29th minute for pulling Murillo's hair, <em>crying on the pitch</em> — his only career UCL red, banned one match. On 8 April 2024, Al Nassr vs Al Hilal (Saudi Super Cup derby), Ronaldo took a straight red for elbowing an opponent, then raged at the decision, narrowly escaping an extended ban.",
      "<strong>National-team reds:</strong> On 28 April 2002, a 17-year-old Ronaldo received his first career red in the U17 European Championship vs France. Thereafter, across <strong>23 years and 226 senior national-team matches</strong>, he was never sent off again — until 13 November 2025 vs Ireland. His fans cited that 'zero red for Portugal' run endlessly as proof of 'excellent discipline'; the 14-card overall total is the counterargument.",
      "<strong>Messi comparison:</strong> Messi has only <strong>3</strong> career reds (4 by some counts including the national team), the most famous being his Argentina debut in 2005 vs Hungary, dismissed after just <em>43 seconds</em>. Contemporaries, both attacking focal points, yet more than ten red cards apart. Planet Football's disciplinary comparison shows Messi's yellow-card count is also significantly lower. The discipline gap is a recurrent exhibit in the Messi-Ronaldo debate.",
      "<strong>Distribution pattern:</strong> Line up the 14 reds and the pattern writes itself — most came in <em>high-pressure big matches</em> (derbies, finals, qualifiers), most involved <em>violence or provocation</em> (elbows, shoves, punches), and many drew <em>extended bans</em>. Behind every red card, a total collapse of emotional control.",
      "<strong>Defence and reflection:</strong> Ronaldo's camp invariably pleads 'competitiveness' or 'provocation', with former Real coach Zidane and Portugal coach Martínez publicly defending him as 'playing for the team'. But critics point out that <strong>competitiveness should not equal violence</strong>, and the objective figure of 14 red cards cannot be airbrushed.",
      "<strong>Verdict:</strong> 14 red cards — a collection of violent moments staining the trophy cabinet. What his fans call «character», the rest call a lack of self-control.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong> Red-card stats follow authoritative outlets such as ESPN; different data sources vary slightly on some matches, with totals floating between 12 and 14. This file uses ESPN's November 2025 figure of 14.</div>"
    ],
    quote:{text:"无论是面对球迷、记者、裁判、对手，无论是20多岁还是39岁，C罗都容易「上头」，做出一些「傻事儿」。", textEn:"Whether facing fans, journalists, referees or opponents, whether in his twenties or at thirty-nine, Ronaldo tends to lose his head and do foolish things.", author:"腾讯体育评论", authorEn:"Tencent Sports commentary", textEs:"Ante aficionados, periodistas, árbitros o rivales, con veintitantos o a los treinta y nueve, a Cristiano le suele ir la cabeza y hacer tonterías.", authorEs:"Comentario de Tencent Sports"},
    tags:["14张红牌","生涯总账","曼联4","皇马6","暴力史"],
    tagsEn:["14 red cards","career reckoning","Man United 4","Real Madrid 6","history of violence"],
    tagsEs:["14 tarjetas rojas","balance de carrera","Man United 4","Real Madrid 6","historial violento"]
  },
  {
    id:10, cat:"violence", catLabel:"场内暴力", severity:3,
    dateIso:"2025-01-01",
    title:"2025世预赛国家队首红",
    titleEn:"First National-Team Red Card — 2025 Qualifier",
    titleEs: "Primera roja con la selección — clasificatorio 2025",
    summaryEs: "A los 40, Cristiano vio su primera roja con Portugal en un clasificatorio mundialista contra Irlanda — también la 14.ª de su carrera — tras un manotazo; Portugal cayó 0-2.",
    dateEs: "2025 (clasificatorio mundialista)",
    locationEs: "Portugal vs Irlanda",
    detailEs: [
      "<strong>Un momento histórico:</strong> El 13 de noviembre de 2025, en la fase de clasificación europea para el Mundial 2026 (EE. UU.-Canadá-México), Portugal viajó a Dublín para medirse a Irlanda.",
      "<strong>El rival reencontrado:</strong> Lo más surrealista: la víctima del manotazo fue <strong>Dara O'Shea</strong>, el mismo jugador del manotazo de 2021 (incidente n.º 8 de este archivo). El destino tiene mucha guasa.",
      "<strong>Presagio previo:</strong> Antes del saque, el seleccionador irlandés Heimir Hallgrímsson presionó públicamente al árbitro sueco Nyberg para que estuviera alerta con las «tácticas» de Cristiano.",
      "<strong>Reacción de Cristiano:</strong> Al ser expulsado, entre abucheos de la afición irlandesa, Cristiano <em>aplaudió irónicamente y levantó los pulgares</em> al árbitro — un gesto que se sumó a la investigación disciplinaria.",
      "<strong>El seleccionador lo defiende:</strong> Roberto Martínez salió al paso: «Es un capitán que ha dado todo por la selección», e insistió en que la acción no merecía roja. Para muchos, un cuidado de imagen a destiempo.",
      "<strong>Riesgo de sanción:</strong> La roja traía cola. Según el código disciplinario de la FIFA, <em>una falta grave conlleva como mínimo un partido</em>, y el gesto de aplaudir podría agravarla.",
      "<strong>Resultado:</strong> Con uno menos, Portugal cayó por 0-2 con doblete del delantero irlandés Troy Parrott. Fue la primera derrota de Portugal en este clasificatorio europeo.",
      "<strong>Significado histórico:</strong> A los 40 años, Cristiano por fin completó la casilla «roja con la selección» — la 14.ª de su carrera. Una pieza del puzle que le faltaba desde hacía dos décadas.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> La roja y la posible sanción están sujetas a la resolución final de la FIFA. Los datos se basan en informaciones publicadas en el momento.</div>"
    ],




    date:"2025年 (世界杯预选赛)",
    dateEn:"2025 (World Cup qualifier)",
    location:"葡萄牙 vs 爱尔兰",
    locationEn:"Portugal vs Ireland",
    img:"assets/images/report/r-10.jpg",
    summary:"世界杯预选赛客战爱尔兰，40岁的C罗领到国家队生涯首张红牌——也是职业生涯第14张。",
    summaryEn:"At 40, Ronaldo received his first-ever red card for Portugal in a World Cup qualifier against Ireland — also the 14th of his career.",
    detail:[
      "<strong>历史性时刻：</strong>2025年11月13日，2026年美加墨世界杯欧洲区预选赛，葡萄牙客场挑战爱尔兰共和国（都柏林英杰华球场）。第61分钟，40岁的C罗在无球状态下<strong>挥肘击打爱尔兰后卫达拉·奥谢后背</strong>，主裁格伦·尼贝里先出示黄牌，经VAR提示回看后<em>改判直红</em>。226场国家队生涯，<strong>首张红牌</strong>——也是生涯第14张。",
      "<strong>宿敌重逢：</strong>被肘击的，正是2021年掌掴事件的当事人<strong>达拉·奥谢</strong>（详见掌掴奥谢事件）。四年前的法鲁，C罗掌掴奥谢逃过处罚；四年后的都柏林，C罗肘击同一个奥谢却没能再逃。爱尔兰球迷戏称：“<em>迟到的红牌终于到来</em>”。",
      "<strong>赛前伏笔：</strong>爱尔兰主帅海米尔·哈里格里姆松公开施压，呼吁瑞典主裁尼贝里“<strong>不要让罗纳尔多裁判比赛</strong>”。C罗则承诺会“做个乖男孩”——这份承诺撑了61分钟。",
      "<strong>C罗反应：</strong>被罚下时，面对爱尔兰球迷的嘘声与嘲讽，C罗<em>鼓掌回应，双手竖起大拇指</em>。离场途中，他特意走向爱尔兰替补席，与主帅哈里格里姆松言语交锋。赛后被问及聊了什么，哈里格里姆松透露：“<strong>他恭维我向裁判施了压。</strong>这是他自己在场上的动作害的——除非我真的钻进了他的脑袋。”末了还补一句：“这只是他一个小小的愚蠢时刻。”",
      "<strong>主帅辩护：</strong>葡萄牙主帅罗伯托·马丁内斯赛后为C罗强力辩护：“这是一位226场比赛从未被罚下的队长——仅凭这点就值得赞扬。我觉得今天判得有点苛刻……他在禁区内58分钟一直被拉拽、推搡，挣脱后卫时动作被摄像机放大成肘击。但<em>真正让我不满的，是赛前对手主帅就在谈论‘裁判会被影响’，然后一个大个子后卫就戏剧性地倒地了</em>。”",
      "<strong>禁赛风险：</strong>FIFA纪律规则明文规定：<em>严重犯规至少禁赛2场</em>，<em>暴力行为至少禁赛3场</em>。禁赛还须在<strong>正式比赛</strong>中执行（友谊赛不算），C罗极可能缺席2026年世界杯小组赛首战。至于FIFA——此刻正顶着巨大的舆论压力处理此案。",
      "<strong>比赛结果：</strong>少一人作战的葡萄牙0-2爆冷告负，爱尔兰前锋特洛伊·帕罗特梅开二度。这是葡萄牙本届世预赛首败。接下来主场对阵亚美尼亚，赢球即可锁定世界杯名额，但头号球星禁赛让前景蒙尘——<strong>一肘毁掉全队节奏</strong>。",
      "<strong>历史定位：</strong>40岁又数月，C罗在职业生涯暮年终于补齐了“国家队红牌”这块拼图。ESPN评论：“226场国际比赛的零红牌纪录就此终结，<em>这或许是他唯一一项不希望拥有的纪录</em>。”加上此役，生涯红牌升至14张——对照梅西的3-4张，更加刺眼。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>红牌判罚与潜在禁赛以FIFA官方最终裁定为准。本档案依据ESPN、Sky Sports等媒体报道整理，各方对动作性质的解读（肘击 vs 正常挣脱）存在立场分歧。</div>"
    ],
    detailEn:[
      "<strong>The milestone:</strong> On 13 November 2025, in European qualifying for the 2026 US-Canada-Mexico World Cup, Portugal travelled to Dublin's Aviva Stadium to face the Republic of Ireland. In the 61st minute, the 40-year-old Ronaldo, off the ball, <strong>swung an elbow into the back of Irish defender Dara O'Shea</strong>. Referee Glenn Nyberg showed yellow, then <em>upgraded to a straight red</em> after a VAR review. Ronaldo's <strong>first red card</strong> in 226 international appearances — and the 14th of his career.",
      "<strong>The reunion:</strong> The elbow found a familiar target in <strong>Dara O'Shea</strong> — the same player from the 2021 slap incident (see the O'Shea slap entry). Four years earlier in Faro, Ronaldo slapped O'Shea and escaped; four years on in Dublin, elbowing the same man, he could not escape again. Irish fans joked that '<em>the late red card finally arrived</em>' — the loop closed at last.",
      "<strong>The set-up:</strong> Before kick-off Ireland's manager Heimir Hallgrímsson publicly pressured the Swedish referee Nyberg, urging him '<strong>not to let Ronaldo referee the match</strong>'. Ronaldo himself promised to 'be a good boy' — a promise that lasted 61 minutes.",
      "<strong>Ronaldo's reaction:</strong> Sent off to boos and jeers from the Irish crowd, Ronaldo <em>ironically applauded and raised both thumbs</em>. On his way off he detoured to the Irish bench to exchange words with manager Hallgrímsson. Asked afterwards about the exchange, Hallgrímsson revealed: '<strong>He complimented me for pressuring the referee.</strong> It's his own fault for what he did on the pitch — unless I really got inside his head.' He added: 'It's just one little silly moment from him.'",
      "<strong>The manager defends him:</strong> Portugal manager Roberto Martínez defended Ronaldo afterwards: 'This is a captain who had never been sent off in 226 matches — that alone deserves praise. I think today's call was a bit harsh… he was being pulled and shoved in the box for 58 minutes, and when he shook off the defender the cameras amplified it into an elbow. <em>What really displeases me is that the opposing manager was talking about the referee being influenced before the match, and then a big defender went down theatrically.</em>'",
      "<strong>Ban risk:</strong> Under FIFA's disciplinary code, <em>serious foul play brings at least a 2-match ban</em>, <em>violent conduct at least 3</em>. Bans must be served in <strong>official matches</strong> — friendlies don't count — so Ronaldo was highly likely to miss Portugal's opening group game at the 2026 World Cup. FIFA was under enormous public pressure over how to handle the case.",
      "<strong>Match result:</strong> Down to ten men, Portugal crashed to a 0-2 upset, with Irish striker Troy Parrott scoring twice. It was Portugal's first defeat of this qualifying campaign. Next up was a home game against Armenia, where a win would seal their World Cup spot, but the star's ban clouded the picture — <strong>one elbow wrecking the team's rhythm</strong>.",
      "<strong>For the record:</strong> At 40 years and several months, Ronaldo finally collected the missing 'national-team red card' — the last piece of the puzzle, arriving at the tail end of his career. ESPN wrote: 'The zero-red run across 226 international matches is over — <em>perhaps the only record he never wanted to own</em>.' Career red-card tally: 14, against Messi's 3-4.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong>The red card and any potential ban are subject to FIFA's final ruling. This file is compiled from ESPN, Sky Sports and other media; views on the action (elbow vs normal shrug-off) differ by standpoint.</div>"
    ],
    tags:["国家队首红","第14红","40岁","爱尔兰","世预赛"],
    tagsEn:["first national-team red","14th red card","age 40","Ireland","World Cup qualifier"],
    tagsEs:["primera roja en selección","14.ª roja","40 años","Irlanda","eliminatoria mundialista"]
  },
  {
    id:11, cat:"offpitch", catLabel:"场外失态", severity:5,
    dateIso:"2022-04-09",
    title:"摔碎自闭症小球迷手机",
    titleEn:"Smashed Autistic Fan's Phone",
    titleEs: "Le rompe el móvil al fan autista",
    summaryEs: "Tras la derrota del United 0-1 en Everton, Cristiano golpeó el móvil de la mano del fan autista de 14 años Jacob Harding; la FA lo multó y avisó a la policía.",
    dateEs: "9 abr 2022",
    locationEs: "Goodison Park (Everton)",
    detailEs: [
      "<strong>El detonante:</strong> El 9 de abril de 2022, el United perdió 0-1 en Everton. Al terminar el partido en Goodison Park, Cristiano, visiblemente cabreado, caminaba hacia el túnel de vestuarios cuando un aficionado lo grabó de cerca.",
      "<strong>La víctima:</strong> La madre de Jacob, Sarah Kelly, contó luego a los medios que su hijo, de 14 años y dentro del espectro autista, era especialmente sensible a los ruidos del estadio y solo quería llevarse un recuerdo del partido.",
      "<strong>Una disculpa tardía:</strong> Cristiano no pidió perdón en el acto; en su lugar publicó una declaración en Instagram: «en los momentos difíciles cuesta controlar las emociones. Pido perdón por mi comportamiento». Para la familia, insuficiente.",
      "<strong>La llamada arrogante:</strong> Kelly relató que un tal «Sergio», supuestamente asistente personal de Cristiano, llamó primero y, lejos de disculparse, abrió diciendo que Cristiano «no era una mala persona», como si el problema fuera el relato y no el golpe.",
      "<strong>Intervención policial:</strong> En agosto de 2022 la policía de Merseyside investigó a Cristiano por agresión y daños, pero el caso se sobreseyó por la edad y la naturaleza del incidente.",
      "<strong>Multa fuerte de la FA:</strong> En septiembre de 2022 la FA imputó a Cristiano por «conducta impropia/violenta». Tras casi dos meses, lo sancionaron con 50.000 libras y 2 partidos de suspensión. Cristiano aceptó la sanción.",
      "<strong>Eco público:</strong> La indignación fue mundial; el hashtag #Ronaldo fue tendencia durante días. ONGs de autismo lo condenaron y muchas marcas se replantearon su asociación con la imagen del portugués.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> Esta entrada se basa en informaciones públicas del Daily Mirror, Liverpool Echo y la FA. Los detalles exactos varían según las versiones de las partes implicadas.</div>"
    ],




    date:"2022年4月9日",
    dateEn:"Apr 9, 2022",
    location:"古迪逊公园球场 (埃弗顿)",
    locationEn:"Goodison Park (Everton)",
    img:"assets/images/report/r-11.jpg",
    summary:"曼联0-1负埃弗顿赛后，C罗愤怒地将14岁自闭症小球迷Jacob Harding的手机打落在地，致其手部淤青、手机损坏。8月被警方正式警告。",
    summaryEn:"After United's 0-1 loss at Everton, Ronaldo slapped the phone out of 14-year-old autistic fan Jacob Harding's hand — bruising the boy's hand, smashing the phone and, by August, earning a formal police caution.",
    detail:[
      "<strong>事件起因：</strong>2022年4月9日，曼联英超客场0比1不敌埃弗顿。古迪逊公园终场哨响，走向球员通道的C罗情绪失控，把一名14岁小球迷手中的手机<strong>狠狠拍落在地</strong>。少年名叫Jacob Harding，患有<strong>自闭症合并运动协调障碍（dyspraxia）</strong>，赛后手部留下淤青。",
      "<strong>伤者背景：</strong>Jacob的母亲Sarah Kelly事后向媒体控诉：儿子本就对嘈杂球场环境异常敏感，无辜成了巨星泄愤的对象。她愤怒地表示，一个年薪数千万的球员，<em>却向一个有特殊需求的孩子动手</em>，这绝非一句“情绪失控”可以搪塞。",
      "<strong>迟来的道歉：</strong>C罗事发后并未第一时间致歉，而是在Instagram上发声明，称“困难时刻更要为年轻人树立榜样”，随后邀请小球迷到老特拉福德观赛，作为“公平竞赛”的姿态。Sarah Kelly断然拒绝，直言这种<em>用球票换原谅</em>的做法令人作呕。",
      "<strong>傲慢的致电：</strong>据Kelly描述，一名自称C罗私人助理的“Sergio”先来电，开口便问“你知道C罗是谁吗”，并邀请母子赴曼联主场相见。Kelly表示自己吓得浑身发抖、当场落泪。几天后C罗本人来电，却<strong>连对方名字都搞错</strong>，反复叫她“Jack”，被Kelly形容为“我交谈过最傲慢的男人”。",
      "<strong>警方介入：</strong>2022年8月，默西赛德郡警方就袭击与刑事毁坏两项罪名对C罗展开调查，最终以<strong>正式警告（caution）</strong>结案。Kelly对仅以警告了事极为不满，认为巨星身份让司法的天平倾斜，并考虑提起民事诉讼。对名人特权的质疑，随之在英国持续发酵。",
      "<strong>足总重罚：</strong>2022年9月，英足总（FA）正式指控C罗“不当/暴力行为”。经过近两个月审理，FA对其处以<strong>5万英镑罚款及2场禁赛</strong>。此时C罗已接受摩根专访炮轰俱乐部，与曼联关系彻底破裂，禁赛几乎成了他红魔生涯的黑色注脚。",
      "<strong>舆论效应：</strong>事件在全球引发轩然大波，#Ronaldo 话题连日霸榜。自闭症公益组织纷纷发声谴责，部分赞助商面临舆论压力。有评论指出：当<strong>一个孩子的尊严</strong>都不值一提时，所谓“榜样”不过是精心包装的人设。此后常年稳居C罗“黑历史”榜单前列。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>本条目依据英国《镜报》《利物浦回声报》《曼彻斯特晚报》及ESPN等公开报道整理。警方最终以警告结案，未被法院定罪；当事人陈述与媒体报道可能存在出入，相关细节请以权威信源为准。</div>"
    ],
    detailEn:[
      "<strong>What sparked it:</strong> On 9 April 2022, Manchester United lost 0-1 at Everton in the Premier League. After the final whistle at Goodison Park, a seething Ronaldo, walking toward the players' tunnel, <strong>violently slapped the phone out of a 14-year-old fan's hand</strong>. The boy, Jacob Harding, had <strong>autism and dyspraxia</strong>. His hand was left bruised.",
      "<strong>The victim:</strong> Jacob's mother Sarah Kelly later told media her son was already unusually sensitive to loud stadium environments, only to become the target of a superstar's fury. She fumed that a player earning tens of millions a year <em>striking a child with special needs</em> could not be waved away with 'lost control'.",
      "<strong>A late apology:</strong> Ronaldo did not apologise at once; instead he posted an Instagram statement — 'in difficult moments we have to set an example for the young' — and offered the boy a trip to Old Trafford as a 'fair play' gesture. The example, presumably, was the slap. Sarah Kelly flatly refused, calling the <em>tickets-for-forgiveness</em> approach disgusting.",
      "<strong>The phone calls:</strong> Kelly said a man claiming to be Ronaldo's personal assistant, 'Sergio', called first, opening with 'do you know who Cristiano Ronaldo is?' and inviting mother and son to meet at United's ground. The call left her shaking and in tears. Days later Ronaldo himself rang — and <strong>got her name wrong</strong>, repeatedly calling her 'Jack'. Her verdict: 'the most arrogant man I've ever spoken to'.",
      "<strong>Police involvement:</strong> In August 2022, Merseyside Police investigated Ronaldo for assault and criminal damage, ultimately resolving the case with a <strong>formal caution</strong>. Kelly was hardly satisfied with a mere caution, arguing that celebrity had tilted the scales of justice, and considered a civil claim. The outcome triggered a Britain-wide debate over celebrity privilege.",
      "<strong>The FA's heavy fine:</strong> In September 2022 the FA formally charged Ronaldo with 'improper/violent conduct'. After nearly two months of hearings, the FA fined him <strong>£50,000 and banned him for two matches</strong>. By this point the Morgan interview blasting the club was already out, his relationship with United was beyond repair, and the ban became a dark footnote to his Red Devils career.",
      "<strong>Public effect:</strong> The incident caused global uproar; #Ronaldo trended for days. Autism charities condemned it, and some sponsors faced public pressure. Critics noted that when <strong>a child's dignity counts for nothing</strong>, the so-called 'role model' is just a packaged persona. The case is a perennial fixture near the top of Ronaldo's 'dark history' list.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong>This entry is compiled from public reporting by the UK's Mirror, Liverpool Echo, Manchester Evening News and ESPN. The police ultimately closed the case with a caution; no court conviction followed. Witness statements and media reports may differ — please refer to authoritative sources for details.</div>"
    ],
    quote:{text:"在困难时刻，情绪失控是很难避免的。我为我的行为道歉。", textEn:"In difficult moments, it is hard to keep emotions under control. I apologize for my behavior.", author:"C罗，Instagram道歉文", authorEn:"Cristiano Ronaldo, Instagram apology post", textEs:"En los momentos difíciles cuesta controlar las emociones. Pido perdón por mi comportamiento.", authorEs:"Cristiano Ronaldo, publicación de disculpa en Instagram"},
    tags:["摔手机","自闭症","埃弗顿","警方警告","道歉","Jacob Harding"],
    tagsEn:["smashed phone","autism (fan)","Everton","police warning","apology","Jacob Harding"],
    tagsEs:["rompe un teléfono","autismo (aficionado)","Everton","aviso policial","disculpa","Jacob Harding"]
  },
  {
    id:12, cat:"offpitch", catLabel:"场外失态", severity:3,
    dateIso:"2016-06-01",
    title:"抢记者麦克风扔进湖里",
    titleEn:"Snatched Reporter's Mic, Threw It in the Lake",
    titleEs: "Le quita el micrófono al periodista y lo tira al lago",
    summaryEs: "Tras dos empates en la fase de grupos de la Euro 2016, un periodista intentó entrevistar a Cristiano junto a un lago; este le arrebató el micrófono y lo lanzó al agua.",
    dateEs: "Euro 2016",
    locationEs: "Francia (concentración de Portugal)",
    detailEs: [
      "<strong>El contexto:</strong> En la Eurocopa 2016, Portugal arrancó con dos empates decepcionantes en la fase de grupos. La prensa se cebaba con Cristiano y con la selección.",
      "<strong>La escena:</strong> Durante una sesión de recuperación junto a un lago de la concentración de Portugal en Francia, un periodista se acercó a Cristiano, micrófono en mano, para preguntarle.",
      "<strong>El gesto:</strong> Cristiano, sin mediar palabra, le arrebató el micrófono al periodista y, frente a las cámaras, lo lanzó al lago. Luego siguió caminando como si nada.",
      "<strong>El periodista:</strong> El reportero trabajaba para un medio portugués. El micrófono, valorado en cientos de euros, quedó hundido en el agua. La escena se retransmitió en bucle.",
      "<strong>La excusa:</strong> Cristiano justificó después que el periodista le había «criticado» en anteriores reportajes y que estaba «harto» de sus preguntas. Una explicación que casi nadie compró.",
      "<strong>Reacción:</strong> La prensa internacional lo puso como ejemplo de ego descontrolado y de poca tolerancia a la crítica. La imagen del micrófono volando al lago quedó convertida en meme de su carácter.",
      "<strong>Balance:</strong> Arrebatar un micrófono y tirarlo a un lago: una escena ridícula para un profesional de su nivel, y un retrato fiel de su relación tóxica con la prensa que no le aplaude.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> Basado en la cobertura mediática de la Euro 2016. La identidad y el medio del periodista varían según las fuentes.</div>"
    ],




    date:"2016年欧洲杯",
    dateEn:"Euro 2016",
    location:"法国 (葡萄牙队驻地)",
    locationEn:"France (Portugal team base)",
    img:"assets/images/report/r-12.jpg",
    summary:"2016年欧洲杯小组赛前两场平局后，记者迪奥戈-托雷斯在湖边采访C罗，得到的回应是麦克风被一把抢走，扔进湖中。",
    summaryEn:"After two group-stage draws at Euro 2016, a reporter tried to interview Ronaldo by a lake; he snatched the microphone and hurled it into the water.",
    detail:[
      "<strong>事件现场：</strong>2016年6月22日，欧洲杯小组赛末轮葡萄牙对阵匈牙利前夜，C罗在球队里昂驻地湖边散步放松。葡萄牙CMTV频道记者<strong>César Bankowski</strong>上前询问备战情况，C罗一言不发，<em>一把夺过记者手中的麦克风</em>，转身便抛入湖中，留下记者目瞪口呆。",
      "<strong>宿怨根源：</strong>这并非无的放矢。CMTV隶属Cofina传媒集团，多年来持续刊登关于C罗私生活的负面报道，从夜店绯闻到税务传闻几乎无孔不入。C罗早已立下<strong>“拒绝CMTV采访”</strong>的内部规矩，夺麦之举被外界解读为他对该媒体长期积怨的集中爆发。",
      "<strong>赛事压力：</strong>彼时C罗在欧洲杯开局低迷——对奥地利一役罚失点球，球队两连平，眼看就要出局，葡萄牙媒体批评声四起。有分析认为，赛场上的挫败感与媒体的高压围堵层层叠加，让风口浪尖上的C罗情绪濒临临界点，<em>湖边的麦克风成了出气筒</em>。",
      "<strong>记者回应：</strong>Bankowski事后接受采访时颇为淡定，表示自己理解C罗的怒火，并直言“这就是CMTV长期报道他的结果”。他甚至半开玩笑地说，麦克风已“光荣殉职”。这份淡定，反倒<strong>坐实了双方长期不和</strong>。",
      "<strong>舆论两极：</strong>视频在网络疯传后，舆论两极分化。粉丝盛赞C罗“真性情、敢做敢当”，认为媒体活该；批评者则指出，<em>毁坏他人物品、羞辱记者</em>本身就是失格行为，与“职业球员”身份极不相称。BBC、Guardian等主流媒体均撰文质疑其职业素养。",
      "<strong>后续反转：</strong>颇具讽刺意味的是，C罗随后对匈牙利梅开二度，包括一脚惊艳的脚后跟进球，带队3比3惊险出线，并最终捧起欧洲杯。媒体的批评声被胜利冲淡，<strong>“抛麦门”反而成了传奇叙事的注脚</strong>。这种结果导向的舆论逻辑，也被批评者视为对不当行为的纵容。",
      "<strong>总评：</strong>抢走记者麦克风扔进湖里——对一个如此级别的职业球员而言是荒诞的一幕，折射出他与不为他鼓掌的媒体之间扭曲的关系。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>本条目依据BBC、The Guardian、Reuters、Sky Sports等2016年公开报道整理。事件细节与记者身份以当时媒体报道为准，CMTV与C罗之间的具体纠纷细节部分源自记者单方陈述。</div>"
    ],
    detailEn:[
      "<strong>The scene:</strong> On 22 June 2016, the eve of Portugal's final Euro group match against Hungary, Ronaldo was strolling by the lake at Portugal's Lyon base to unwind. CMTV reporter <strong>César Bankowski</strong> came over to ask about preparations; without a word, Ronaldo <em>snatched the microphone from his hand</em>, turned and hurled it into the lake, leaving the reporter dumbfounded.",
      "<strong>Root of the grudge:</strong> It was not unprovoked. CMTV, part of the Cofina media group, had spent years running negative coverage of Ronaldo's private life — from nightclub gossip to tax rumours. Ronaldo had long since imposed an internal <strong>'no CMTV interviews'</strong> rule; the mic grab was read as a long-simmering grievance finally boiling over.",
      "<strong>Tournament pressure:</strong> Ronaldo's Euros had opened poorly — he missed a penalty against Austria, the team drew twice and sat on the brink of elimination, and the Portuguese press piled on. Analysts suggested that on-field frustration, compounded by the media hounding, had pushed him to breaking point, <em>and the lakeside microphone became the punching bag</em>.",
      "<strong>The reporter's response:</strong> Bankowski was remarkably composed afterwards, saying he understood Ronaldo's anger and that 'this is the result of CMTV's long coverage of him'. He even half-joked that the microphone had 'died in the line of duty'. That reply, in its own way, <strong>confirmed the long-standing bad blood</strong>.",
      "<strong>Polarised public:</strong> The clip went viral and opinion split hard. Fans hailed Ronaldo's 'authenticity' and argued the media had it coming; critics pointed out that <em>destroying someone else's property and humiliating a reporter</em> was unbecoming conduct from a 'professional footballer' of his standing. BBC, The Guardian and other mainstream outlets questioned his professionalism.",
      "<strong>Ironic reversal:</strong> Most ironically, Ronaldo then scored twice against Hungary, backheel included, dragged Portugal to a 3-3 escape, and went on to lift the trophy. The criticism was drowned by victory — <strong>'mic-toss-gate' instead became a footnote of the legend</strong>. Outcome-oriented narrative logic like this, critics said, only indulges bad behaviour.",
      "<strong>Verdict:</strong> Snatching a reporter's microphone and tossing it into a lake — a ridiculous scene for a professional of his stature, exposing his toxic relationship with any press that doesn't applaud him.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong>This entry is compiled from 2016 public reporting by the BBC, The Guardian, Reuters, Sky Sports and others. Event details and the reporter's identity follow contemporaneous media reports; specific details of the CMTV-Ronaldo dispute partly draw on the reporter's one-sided account.</div>"
    ],
    tags:["扔麦克风","2016欧洲杯","记者","迪奥戈-托雷斯","湖"],
    tagsEn:["threw the mic","Euro 2016","journalist","Diogo Torres","the lake"],
    tagsEs:["tiró el micrófono","Eurocopa 2016","periodista","Diogo Torres","el lago"]
  },
  {
    id:13, cat:"offpitch", catLabel:"场外失态", severity:3,
    dateIso:"2021-03-01",
    title:"两次摔队长袖标",
    titleEn:"Threw the Armband — Twice",
    titleEs: "Tira el brazalete de capitán — dos veces",
    summaryEs: "Tras anularle injustamente un gol en el descuento de un clasificatorio de 2021, tiró el brazalete al suelo; tras caer eliminados, lo volvió a tirar y se fue al vestuario sin dar las gracias.",
    dateEs: "Mar 2021 / Jun 2021",
    locationEs: "Serbia / Budapest",
    detailEs: [
      "<strong>Primera vez (Serbia, marzo 2021):</strong> En un clasificatorio mundialista contra Serbia, a Cristiano le anularon en el descuento un gol que sí había entrado. Portugal empató 2-2 y él, furioso, tiró el brazalete de capitán al suelo al salir del campo.",
      "<strong>El gol fantasma:</strong> La repetición mostró que el balón había cruzado la línea, pero, sin VAR ni tecnología de línea de gol en aquel partido, el árbitro no lo pitó. Cristiano montó en cólera — para muchos, con razón por el gol, pero no por el gesto.",
      "<strong>Segunda vez (Budapest, junio 2021):</strong> En la Euro 2020 (disputada en 2021), Portugal cayó eliminada contra Bélgica en Budapest. Cristiano tiró el brazalete al césped y se fue al vestuario sin dar las gracias a la afición.",
      "<strong>El patrón:</strong> Tirar el brazalete cada vez que las cosas no van como él quiere acabó siendo su seña de identidad. Para los críticos, una falta de respeto al símbolo de la capitanía y a los aficionados.",
      "<strong>Reacción mediática:</strong> La prensa portuguesa e internacional le cayó encima por el gesto. «Un capitán no tira el brazalete», titularon varios medios, recordando que el cargo implica responsabilidad, no solo privilegios.",
      "<strong>La subasta solidaria:</strong> El brazalete tirado en Serbia fue subastado y los fondos fueron a parar a una operación de un bebé con atrofia muscular espinal — una nota positiva en medio del bochorno.",
      "<strong>Balance:</strong> Tirar el brazalete dos veces en tres meses retrata de cuerpo entero su relación con la frustración. Cuando pierde, Cristiano no es un capitán: es un niño grande con rabietas.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> Basado en la cobertura de TVE, RTP y medios internacionales. El destino benéfico del brazalete está documentado.</div>"
    ],




    date:"2021年3月 / 2021年6月",
    dateEn:"Mar 2021 / Jun 2021",
    location:"塞尔维亚 / 布达佩斯",
    locationEn:"Serbia / Budapest",
    img:"assets/images/report/r-13.jpg",
    summary:"2021世预赛绝杀被吹后摔队长袖标；同年欧洲杯被淘汰后再次摔袖标，引发“不尊重国家”争议。",
    summaryEn:"A stoppage-time winner wrongly disallowed in a 2021 qualifier, and the captain's armband hit the turf; a Euro 2020 exit, and it hit the turf again — 'disrespect to the country' became the charge.",
    detail:[
      "<strong>塞尔维亚之怒：</strong>2021年3月27日，世界杯预选赛，葡萄牙客场挑战塞尔维亚。补时第93分钟，C罗挑射越过门将，球已明显整体过线，却被后卫斯特凡·米特洛维奇勾出，<strong>当值主裁丹尼·马凯利未判进球</strong>。暴怒的C罗扯下队长袖标狠狠摔在地上，径直走向更衣室，把剩下的比赛留给队友收尾。",
      "<strong>争议判罚：</strong>由于该场未启用门线技术，这个本应绝杀的进球被错误吹掉，最终2比2收场。赛后慢镜头反复回放，球越过门线看得清清楚楚，葡萄牙媒体称之为<strong>“世纪冤案”</strong>。主裁马凯利事后向葡萄牙《球报》公开致歉——但比分改不回来了。",
      "<strong>袖标的处理：</strong>被摔在地的那枚蓝色队长袖标，被当值消防员Djordje Vukicevic捡起，交给了当地慈善组织。然而C罗<strong>提前离场、摔袖标</strong>的行为本身，在葡萄牙国内同样引发巨大争议——批评者认定，判罚再荒谬，作为队长弃队于不顾都属失职，<em>袖标是国家的象征，不该被如此践踏</em>。",
      "<strong>袖标拍卖：</strong>这枚“愤怒的袖标”随后被塞尔维亚慈善组织放到网上拍卖，为期三天，最终以<strong>6.4万欧元（约5.4万英镑）</strong>成交，所得全部用于救治6个月大、患脊髓性肌萎缩症（SMA）的塞尔维亚男婴Gavrilo Djurdjevic。",
      "<strong>拍卖波折：</strong>拍卖过程并不太平——期间有人恶意报出天价搅局，引发公众愤怒，当局承诺追查捣乱者。最终成交价远超预期，男婴母亲Nevena喜极而泣，称这笔钱是<strong>“救命钱”</strong>。媒体戏称，这是C罗“最贵的一次发脾气”。",
      "<strong>欧洲杯再犯：</strong>同年6月27日欧洲杯1/8决赛，葡萄牙0比1遭比利时淘汰。C罗再次情绪失控，<strong>将队长袖标摔在地上并用脚踢飞</strong>，狼狈走回通道。三个月内两度摔袖标，“输不起”的标签就此焊在他身上，连葡萄牙名宿都公开表达失望。",
      "<strong>横向对比：</strong>梅西在阿根廷失利后选择隐忍，莫德里奇在世界杯决赛败北后保持从容；C罗的宣泄方式，则是反复<strong>“摔袖标”</strong>——这被广泛视为心智成熟度的短板。支持者辩称这是求胜欲的体现，但批评者指出，真正的领袖应在逆境中稳定军心，<em>而非带头溃散</em>。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>本条目依据BBC、The Guardian、ESPN、Goal.com等2021年公开报道整理。袖标拍卖金额与受助婴儿病情以塞尔维亚国家电视台及权威媒体报道为准。</div>"
    ],
    detailEn:[
      "<strong>Serbia rage:</strong> On 27 March 2021, in a World Cup qualifier, Portugal travelled to Serbia. In the 93rd minute of stoppage time Ronaldo's lob clearly crossed the line before defender Stefan Mitrović hooked it out, yet <strong>referee Danny Makkelie did not award the goal</strong>. Ronaldo tore off the captain's armband, hurled it to the turf and stormed off to the dressing room, leaving his teammates to finish the match without him.",
      "<strong>Disputed call:</strong> With no goal-line technology in use, the stoppage-time winner was wrongly chalked off and the match ended 2-2. Slow-motion replays confirmed the ball had clearly crossed the line; Portuguese media dubbed it the <strong>'injustice of the century'</strong>. Makkelie later apologised publicly to Portuguese paper A Bola, but an apology does not move a scoreboard — Ronaldo's fury, for once, was hard to argue with.",
      "<strong>What happened to the armband:</strong> The discarded blue armband was picked up by an on-duty firefighter, Djordje Vukicevic, and handed to a local charity. In Portugal, however, <strong>the walk-off and the armband toss</strong> stirred huge controversy — critics argued that no matter how absurd the call, a captain abandoning his team mid-match is a dereliction of duty, and <em>the armband is the symbol of the country and should not have been trampled</em>.",
      "<strong>The armband auction:</strong> The 'angry armband' was put up for online auction by the Serbian charity for three days. It eventually sold for <strong>€64,000 (about £54,000)</strong>, with all proceeds going to fund treatment for a six-month-old Serbian boy, Gavrilo Djurdjevic, suffering from spinal muscular atrophy (SMA).",
      "<strong>Auction twists:</strong> The auction had its own drama — during the bidding a bogus sky-high offer caused public outrage, and the authorities promised to track down the troll. The final price far exceeded expectations; the baby's mother, Nevena, wept with joy and called the money <strong>'life-saving'</strong>. The press filed the whole affair under Ronaldo's 'most expensive tantrum'.",
      "<strong>Euro repeat:</strong> On 27 June that year, in the Euro round of 16, Portugal were knocked out 0-1 by Belgium. Ronaldo again lost control, <strong>throwing the captain's armband to the ground and kicking it away</strong> as he trudged down the tunnel. Two armband tosses in three months drew wave after wave of criticism: the 'sore loser' tag stuck hard, and even Portuguese legends publicly voiced disappointment.",
      "<strong>Broad comparison:</strong> Set against Messi's restraint after Argentina defeats, or Modrić's composure after losing a World Cup final, Ronaldo's repeated <strong>'armband-toss'</strong> outbursts were widely seen as a shortfall in mental maturity. Supporters call it competitive will; critics counter that a true leader steadies the ship in adversity, <em>never leading the collapse</em>. It is a stain on his character file that won't wash out.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong>This entry is compiled from 2021 public reporting by the BBC, The Guardian, ESPN, Goal.com and others. The armband auction amount and the assisted infant's condition follow Serbian state television and authoritative media reports.</div>"
    ],
    tags:["摔袖标","队长","塞尔维亚","欧洲杯","不尊重国家"],
    tagsEn:["threw armband","captain","Serbia","Euros","disrespects nation"],
    tagsEs:["tira el brazalete","capitán","Serbia","Eurocopa","falta de respeto al país"]
  },
  {
    id:14, cat:"offpitch", catLabel:"场外失态", severity:4,
    dateIso:"2024-02-01",
    title:"对球迷做不雅动作 + 围巾塞裤裆",
    titleEn:"Obscene Gesture + Scarf Stuffed in Pants",
    titleEs: "Gesto obsceno + bufanda en el pantalón",
    summaryEs: "En el derbi de Riad, Cristiano respondió a los cánticos de «Messi» de la afición rival con un gesto obsceno (bombeo en la entrepierna) y se metió una bufanda en el pantalón; la Federación saudí lo sancionó.",
    dateEs: "Feb 2024",
    locationEs: "Saudi Pro League",
    detailEs: [
      "<strong>El partido:</strong> Derbi de Riad, Saudi Pro League 2024. La afición rival coreaba «Messi, Messi» cada vez que Cristiano tocaba el balón. Todo para meterle.",
      "<strong>El gesto obsceno:</strong> A la salida del campo, Cristiano respondió a los cánticos con un <strong>gesto obsceno</strong>: bombeó la mano a la altura de la entrepierna, en dirección a la grada.",
      "<strong>La bufanda en el pantalón:</strong> Como remate, cogió una bufanda del equipo rival que le habían lanzado y se la metió por el pantalón: otra provocación grotesca a la afición.",
      "<strong>Imágenes virales:</strong> Las cámaras lo cazaron todo. El vídeo del gesto y de la bufanda se hizo viral en redes y Bilibili lo incluyó en sus recopilaciones de «momentos bizarros de Cristiano».",
      "<strong>Sanción saudí:</strong> La Federación de Fútbol de Arabia Saudí abrió expediente y acabó sancionándolo con un partido de suspensión por «conducta contraria al espíritu deportivo».",
      "<strong>Reacción global:</strong> El gesto fue condenado internacionalmente: una falta de respeto a los aficionados y al propio deporte. La imagen de Cristiano bombeando en la entrepierna quedó como una de sus marcas más bochornosas.",
      "<strong>El patrón:</strong> Suma y sigue: en lugar de responder en el campo, Cristiano recurre a gestos obscenos y provocaciones cuando los cánticos le afectan. Poco profesional para un «ídolo global».",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> Basado en la cobertura del Saudi Pro League y la sanción oficial de la SAF. Las imágenes del gesto son públicas.</div>"
    ],




    date:"2024年2月",
    dateEn:"Feb 2024",
    location:"沙特联赛",
    locationEn:"Saudi Pro League",
    img:"assets/images/report/r-14.jpg",
    summary:"利雅得胜利的这场德比，对手球迷高喊“梅西”挑衅，C罗的回应分两步：先把掷来的球迷围巾塞进裤裆擦拭、扔回看台，再当众做出手贴短裤上下抽动的不雅手势。",
    summaryEn:"The Riyadh derby: when rival fans chanted 'Messi', Ronaldo first stuffed a fan's scarf into his pants and threw it back, then answered with an obscene pumping gesture at his crotch.",
    detail:[
      "<strong>事件经过：</strong>2024年2月25日，沙特联赛利雅得胜利主场3比2险胜利雅得青年人（Al Shabab）。终场哨响后，客队球迷高喊“Messi、Messi”挑衅，C罗先是将一条掷向他的<strong>球迷围巾塞进裤裆</strong>，随后做出掏裆、对着下体反复前后推送的<strong>不雅手势</strong>——转播镜头与手机全程记录，一帧没漏。",
      "<strong>挑衅与回应：</strong>现场视频里，“Messi”的呼喊声清晰可闻。C罗与梅西的宿怨跨越近二十年，对沙特球迷而言，喊“梅西”几乎是激怒C罗的<strong>“核按钮”</strong>。但拿低俗手势回击看台挑衅，早已越出“情绪宣泄”的边界，<em>其粗鄙程度令全球观众咋舌</em>。",
      "<strong>并非首次：</strong>这不是C罗在沙特第一次出现“摸裆”争议。ESPN特别指出，2023年4月利雅得胜利0比2负于利雅得新月后，C罗在走向替补席途中<strong>也曾被拍到抓握自己下体</strong>。同一动作在不同场合反复出现——构成的已是一种令人不安的行为模式，与偶然无关。",
      "<strong>重罚落地：</strong>2024年2月28日，沙特足协纪律与道德委员会宣布处罚决定——C罗<strong>禁赛1场，并处罚款共计3万里亚尔</strong>（1万上缴足协、2万支付给Al Shabab作为投诉费，约合8000美元）。委员会同时强调，该裁决<strong>不可上诉</strong>，没有留任何商量余地。",
      "<strong>舆论哗然：</strong>Reuters、ABC、Guardian等国际媒体广泛报道，沙特国内的批评声尤为尖锐。作为沙特联赛“头号招牌”和旅游形象大使，C罗此举被视为对东道主文化的不敬——在<strong>极为注重体面与宗教礼仪</strong>的沙特社会，下体动作几乎是不可触碰的禁忌，影响远超球场。",
      "<strong>形象反噬：</strong>C罗当初以天价年薪（据报约2亿欧元/年）登陆沙特，本被寄予“提升联赛国际形象”的厚望。此后从摸裆、不雅手势到沙特超级杯的<strong>肘击红牌</strong>，沙特联赛确实频频登上全球头条——只是姿态全是负面。“形象工程”，做到了反面。",
      "<strong>惯犯模式：</strong>累犯不改。球迷口号一触动他，C罗的回应从来不是场上表现，而是下流手势加挑衅。对一个「全球偶像」而言，极不专业。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>本条目依据ESPN、Reuters、ABC News、The Athletic及The Guardian等2024年公开报道整理。罚款金额与禁赛场次以沙特足协纪律委员会官方公告为准；现场手势的具体指向因视频角度不同存在不同解读。</div>"
    ],
    detailEn:[
      "<strong>The incident:</strong> On 25 February 2024, in the Saudi Pro League, Al Nassr edged Al Shabab 3-2 at home. After the final whistle, with the away end chanting 'Messi, Messi' at him, Ronaldo first <strong>stuffed a fan's scarf into his pants</strong>, then made a grabbing, pumping gesture at his crotch — an <strong>obscene gesture</strong> captured by broadcast cameras and mobile phones alike.",
      "<strong>Provocation and response:</strong> The 'Messi' chants are clearly audible in the background audio. With the Messi-Ronaldo grudge approaching its 20th year, that chant is the nearest thing Saudi fans have to a <strong>'nuclear button'</strong> against Ronaldo. Answering terrace taunts with a vulgar gesture sits well outside 'venting emotion' — and <em>its coarseness shocked the global audience</em>.",
      "<strong>Not the first time:</strong> This was not Ronaldo's first 'crotch-grab' row in Saudi. ESPN noted that in April 2023, after Al Nassr's 0-2 loss to Al Hilal, Ronaldo was <strong>filmed grabbing his genitals</strong> on his way to the bench. Same gesture, different context — hardly accidental.",
      "<strong>Heavy sanction:</strong> On 28 February 2024 the Saudi FA's disciplinary and ethics committee announced its verdict: Ronaldo was <strong>banned one match and fined a total of 30,000 riyals</strong> (10,000 to the FA, 20,000 paid to Al Shabab as complaint fees — about $8,000). The committee stressed the ruling was <strong>not subject to appeal</strong>.",
      "<strong>Public outcry:</strong> Reuters, ABC, The Guardian and other international outlets all carried the story; the sharpest criticism came inside Saudi Arabia itself. The Pro League's top billboard star and a tourism ambassador, Ronaldo was seen as disrespecting the host culture — in a society <strong>extremely sensitive to propriety and religious etiquette</strong>, crotch gestures are an untouchable taboo, far graver than a football matter.",
      "<strong>Image blowback:</strong> Ronaldo joined Saudi football on a record salary — reportedly about €200M a year — tasked with 'lifting the league's global image'. Yet from the crotch-grab to the obscene gesture to the subsequent Saudi Super Cup <strong>elbow-red</strong>, a string of indiscretions has repeatedly landed the Saudi league on global headlines for the wrong reasons — a major discount on the 'image project'.",
      "<strong>The pattern:</strong> Add it to the pile: rather than answering on the pitch, Cristiano resorts to obscene gestures and provocations whenever the chants get to him. Hardly professional for a 'global idol'.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong>This entry is compiled from 2024 public reporting by ESPN, Reuters, ABC News, The Athletic and The Guardian. The fine amount and ban matches follow the official announcement of the Saudi FA's disciplinary committee; the specific meaning of the on-site gesture is read differently depending on camera angle.</div>"
    ],
    tags:["不雅动作","围巾塞裤裆","沙特联赛","梅西","利雅得德比","停赛"],
    tagsEn:["obscene gesture","scarf stuffed in pants","Saudi Pro League","Messi","Riyadh derby","suspension"],
    tagsEs:["gesto obsceno","bufanda en el pantalón","Liga saudí","Messi","derbi de Riad","sanción"]
  },
  {
    id:15, cat:"offpitch", catLabel:"场外失态", severity:3,
    dateIso:"2010-01-01",
    title:"场上“小动作”合集",
    titleEn:"On-Pitch 'Dark Arts' Compilation",
    titleEs: "Recopilación de «artes oscuras» sobre el césped",
    summaryEs: "Goles «robados» con la punta del pelo, simulaciones en el área, la 9248 sin camiseta y hasta la tarjeta imaginaria a un compañero: el repertorio de «artes oscuras» de Cristiano.",
    dateEs: "Varios momentos de la carrera",
    locationEs: "Múltiples partidos",
    detailEs: [
      "<strong>Robar goles:</strong> Cristiano tiene la costumbre de «robar» goles a compañeros: el último toque, la punta del pelo o la espuela para llevarse un tanto que otro iba a firmar. El ego por delante del equipo.",
      "<strong>Simulaciones:</strong> Su afición a la piscina es legendaria: caídas exageradas en el área buscando penalti, gestos de dolor tras contacto mínimo. «Penaldo» no nació de la nada.",
      "<strong>Celebración 9248 sin camiseta:</strong> En pleno partido, Cristiano se quitaba la camiseta para celebrar goles (con la consiguiente amarilla), un gesto exhibicionista en el que el lucimiento personal valía más que la tarjeta.",
      "<strong>Tarjeta imaginaria a un compañero:</strong> En más de una ocasión, Cristiano sacó la «tarjeta imaginaria» pidiendo amonestación para un compañero suyo que había perdido el balón. Ni los de su propio equipo se libraban.",
      "<strong>Manotazos a rivales:</strong> Codazos, pisotones, manotazos a rivales en jugadas sin balón — el catálogo de agresiones invisibles que se suman a sus 14 rojas.",
      "<strong>Pedir penalti constantemente:</strong> Cada caída en el área iba acompañada del gesto de Cristiano pidiendo penalti al árbitro, brazos abiertos, cara de asombro — un número repetido miles de veces.",
      "<strong>Balance:</strong> Un popurrí de «artes oscuras» que retrata al Cristiano de más allá de los goles: el simulador, el ladrón de goles, el que pide tarjetas, el que celebra por encima del equipo. La cara B del ídolo.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> Recopilación de momentos documentados a lo largo de su carrera. Cada acción cuenta con imágenes públicas.</div>"
    ],




    date:"职业生涯各时期",
    dateEn:"Various points in career",
    location:"多场比赛",
    locationEn:"Multiple matches",
    img:"assets/images/report/r-15.jpg",
    summary:"从头发丝抢队友进球到跳水假摔，从9248脱衣庆祝到向裁判示意给队友红牌——C罗的“小动作”清单，丰富到值得单独立档。",
    summaryEn:"From 'hair-tip' goal-stealing to diving, from the 9248 shirt-off celebration to waving an imaginary card at a teammate — Ronaldo's dark-arts highlight reel has enough material for a box set.",
    detail:[
      "<strong>暗肘传统：</strong>C罗的“黑历史”里，场上小动作自成一章。其标志性动作是<strong>争顶或卡位时先抬肘开路</strong>——2024年4月沙特超级杯，他因肘击阿里·阿尔布拉伊希的胸喉部位被直接红牌罚下；2025年对爱尔兰更是吃下<strong>葡萄牙国家队生涯首张红牌</strong>，原因依旧是肘击后卫。屡教不改。",
      "<strong>蹬踏与踩踏：</strong>比赛中C罗多次出现<strong>离奇踩踏对手脚跟</strong>的画面：2022年切尔西一役，他被VAR认定故意踢倒奇尔韦尔和琼斯，险遭重罚；更早的皇马时期，对马拉加、比利亚雷亚尔等队都有踩踏对手脚踝的争议镜头，常以<em>“收脚不及”</em>辩解却难以服众。",
      "<strong>“上帝之发”：</strong>2018年世界杯，C罗对摩洛哥打入一球，赛后慢镜头显示他<strong>用手指拨弄头发庆祝时疑似抓了对手的脸</strong>。更经典的是2014年对瑞典的世预赛附加赛，他帽子戏法后朝看台做出“安静”手势挑衅——<em>赢球还要羞辱对手</em>，这份“得理不饶人”贯穿其职业生涯。",
      "<strong>夸张倒地：</strong>从曼联早期到皇马鼎盛期，C罗长期背负<strong>“假摔”“佩纳尔多（Penaldo）”</strong>的戏称。最著名的争议包括2006年世界杯“眨眼门”（怂恿裁判罚下俱乐部队友鲁尼）、多次在禁区内夸张倒地索要点球。ESPN评论员Ale Moreno曾直言其某些倒地“根本不该判点球”。",
      "<strong>拖延与施压：</strong>C罗也是<strong>围攻裁判、拖延比赛时间</strong>的老手：领先时倒地不起、失球后冲裁判咆哮、投诉对手犯规时夸张地比划动作。这些被英媒归入“dark arts（黑魔法）”的行为，虽不至吃牌，却严重影响比赛流畅度，被视为<strong>缺乏体育精神</strong>的表现。",
      "<strong>对比与辩护：</strong>辩护者常以“C罗早期在英超遭对手野蛮犯规（如2006年被踢断腿险情）”为由，认为其强硬作风是被环境逼出来的，且其球技远大于小动作。但批评者反问：梅西、伊涅斯塔同样屡遭侵犯，却<strong>极少以肘击、踩踏回敬</strong>。<em>伟大，不等于无可指摘。</em>",
      "<strong>总评：</strong>一锅“黑魔法”大杂烩，勾勒出进球之外的C罗：假摔者、抢功者、索牌者、凌驾全队庆祝者——偶像的B面。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>本条目为综述性整理，所列事件分散于多家媒体多年报道，部分慢镜头判罚（如是否故意）存在争议。红牌与处罚以各赛事官方纪律委员会公告为准；对球员品格的评价属媒体与公众观点，不代表本馆立场。</div>"
    ],
    detailEn:[
      "<strong>The dark-elbow tradition:</strong> The dark arts are an unavoidable chapter of Ronaldo's 'dark history', and the signature move is <strong>leading with the elbow</strong> when contesting or jockeying — a red card in the April 2024 Saudi Super Cup for elbowing Ali Al-Bulaihi in the chest/throat, and in 2025 against Ireland, his <strong>first Portugal red</strong>, again for elbowing a defender. The lesson never took.",
      "<strong>Stomping and stamping:</strong> Then there are the <strong>bizarre stamps on opponents' heels</strong>: in a 2022 match against Chelsea, VAR judged he had deliberately kicked out at Chilwell and Jones — heavy punishment, narrowly escaped; back in the Madrid years, against Málaga, Villarreal and others, the stamps landed on ankles, explained away as <em>'couldn't pull back in time'</em>. Never convincingly.",
      "<strong>'The hair of God':</strong> At the 2018 World Cup Ronaldo scored against Morocco, and replays suggested that amid the celebration hair-flick he <strong>appeared to grab the opponent's face</strong>. More famous still: the hat-trick in the 2014 World Cup play-off against Sweden, capped with a 'quiet' gesture toward the stands — <em>winding up beaten opponents</em>. This 'rubbing it in' style runs through the entire career.",
      "<strong>Exaggerated falls:</strong> From the early United years to the Madrid peak, the labels <strong>'diver' and 'Penaldo'</strong> stuck for a reason. The most notorious flashpoints: the 2006 World Cup 'wink-gate' (urging the referee to send off club-mate Rooney), and countless theatrical falls in the box begging for penalties. ESPN pundit Ale Moreno said it flatly — some of his falls 'should never have been penalties'.",
      "<strong>Pressuring referees, wasting time:</strong> He is also a veteran of <strong>swarming the referee and time-wasting</strong>: going down injured when ahead, roaring at the referee after conceding, gesturing wildly when appealing fouls. The English press classes these as 'dark arts' — they don't always draw cards, but they seriously disrupt match flow: <strong>a lack of sportsmanship</strong>, documented.",
      "<strong>The defence, and the counter:</strong> Defenders argue the early years in England were brutal (in 2006 he was nearly leg-broken), that the toughness was forced on him, that the actual play outweighs the dark arts. Critics counter that Messi, Iniesta and others were fouled just as regularly and <strong>rarely retaliated with elbows or stamps</strong> — character is character. <em>Greatness is not the same as spotlessness.</em>",
      "<strong>Verdict:</strong> A whole medley of 'dark arts' paints the Ronaldo the goals don't show: the diver, the goal-thief, the card-claimer, the one who celebrates above the team. The B-side of the idol.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong> This entry is a synthesis; the listed events are scattered across years of multi-outlet coverage, and some slow-motion verdicts (e.g. intent) are disputed. Red cards and punishments follow the official disciplinary committee announcements of each competition; judgements on the player's character reflect media and public opinion, not this archive's position.</div>"
    ],
    tags:["小动作","头发丝","跳水","假摔","脱衣","抢进球"],
    tagsEn:["dark arts","tip-in goal theft","diving","diving","shirt-off stunt","goal theft"],
    tagsEs:["artes oscuras","gol robado de peinada","simulación","simulación","se quitó la camiseta","robo de gol"]
  },
  {
    id:16, cat:"persona", catLabel:"人设争议", severity:3,
    dateIso:"2021-06-14",
    title:"欧洲杯移走可口可乐 致市值蒸发40亿美元",
    titleEn:"Removed Coca-Cola at the Euros — $40B Wiped Off Market Cap",
    titleEs: "Aparta la Coca-Cola en la Euro — 40.000 M$ borrados de la bolsa",
    summaryEs: "En una rueda de prensa prepartido de la Euro, Cristiano apartó dos botellas de Coca-Cola y dijo «bebe agua»; la acción de Coca-Cola se desplomó y su capitalización bajó unos 40.000 millones de dólares.",
    dateEs: "14 jun 2021",
    locationEs: "Rueda de prensa de la Euro",
    detailEs: [
      "<strong>La escena:</strong> El 14 de junio de 2021, en una rueda de prensa prepartido de la Eurocopa 2020 (disputada en 2021), Cristiano se sentó ante las cámaras con dos botellas de Coca-Cola, patrocinador oficial, frente a él.",
      "<strong>El gesto:</strong> Cristiano, visiblemente molesto, apartó las dos botellas fuera de plano, miró a la cámara y espetó: «<strong>Agua, no Coca-Cola</strong>». Viral al instante.",
      "<strong>El desplome bursátil:</strong> Tras el gesto, la acción de Coca-Cola pasó de 56,10 a 55,22 dólares, y su capitalización <strong>perdió unos 40.000 millones de dólares</strong> en cuestión de horas.",
      "<strong>La exageración del dato:</strong> La cifra de 40.000 millones se popularizó en medios, aunque parte de la caída respondía a otros factores del mercado. El daño reputacional al patrocinador, ese sí, fue real y sonado.",
      "<strong>Reacción de la UEFA:</strong> La UEFA y la propia Coca-Cola quitaron hierro al asunto en público; por dentro, el gesto de Cristiano dejó un terremoto entre los patrocinadores del torneo.",
      "<strong>El efecto imitación:</strong> Otros futbolistas (Pogba, Lukaku) siguieron el ejemplo y apartaron botellas de patrocinadores (Heineken, Coca-Cola) en conferencias posteriores. Cristiano, pionero hasta en eso.",
      "<strong>El coste:</strong> Una sola frase, «bebe agua», y 40.000 millones de dólares evaporados de la capitalización de un patrocinador. La arrogancia con la que se cargó a un socio del fútbol hecha cifra.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> La cifra de 40.000 M$ se popularizó en medios como Forbes y CNBC, aunque parte del movimiento de la acción obedecía a factores adicionales del mercado.</div>"
    ],




    date:"2021年6月14日",
    dateEn:"Jun 14, 2021",
    location:"欧洲杯新闻发布会",
    locationEn:"Euro press conference",
    img:"assets/images/report/r-16.jpg",
    summary:"欧洲杯发布会上，C罗将两瓶可口可乐移出镜头，举起矿泉水说「喝水」——可口可乐股价应声下跌，市值蒸发约40亿美元。",
    summaryEn:"At a Euro pre-match presser, Ronaldo slid two Coca-Cola bottles out of the frame and said 'drink water'; Coke's share price promptly dropped, and an estimated $4 billion of market cap went with it.",
    detail:[
      "<strong>发布会一幕：</strong>2021年6月14日，欧洲杯赛前发布会上，C罗落座后皱眉盯着桌前的两瓶可口可乐，<strong>伸手将其移出镜头</strong>，举起一瓶矿泉水，对着镜头郑重说了一句葡萄牙语：「Água（水）。」意在呼吁大众喝水、远离含糖饮料。短短几秒，<em>一家顶级赞助商的市值开始漏水</em>。",
      "<strong>市值蒸发：</strong>据多家财经媒体披露，此动作后数小时内，可口可乐股价从<strong>56.10美元跌至55.22美元</strong>，跌幅约1.6%，对应市值蒸发约<strong>40亿美元</strong>。可口可乐作为欧足联顶级赞助商（赞助费逾数千万欧元），展位却被球星顺手挪出画面，营销界为此瞠目，商学院则将其列为<em>名人效应反噬</em>的典型案例。",
      "<strong>欧足联回应：</strong>欧足联随后紧急表态，强调可口可乐是重要合作伙伴，并<strong>婉转提醒各队球员</strong>「不要在发布会破坏赞助商展示」。据传欧足联内部对C罗的「砸场」颇为恼火，但碍于其巨星地位未公开处罚，只能吃哑巴亏。",
      "<strong>球星效仿：</strong>C罗此举引发连锁反应：法国球星博格巴在随后的发布会上移走面前的<strong>喜力啤酒</strong>（他作为穆斯林不饮酒）；意大利的洛卡特利同样把可乐瓶挪走。一时间「移瓶」成了欧洲杯的另类风潮，<em>赞助商们提心吊胆</em>，欧足联不得不反复重申赞助权益。",
      "<strong>商业反讽：</strong>C罗本人是<strong>多项含糖/高热量品牌的代言人</strong>，个人商业帝国同样依赖赞助体系。批评者指出，他对可口可乐的「道德审判」多少有些<em>双重标准</em>——当利益在自己这边，所谓「健康倡导」就没那么旗帜鲜明了。",
      "<strong>真假归因：</strong>财经分析师指出，40亿美元市值波动并非全部归因于C罗——当日大盘整体下行、可口可乐基本面承压，<strong>股价波动是多重因素叠加</strong>的结果。但媒体显然更青睐「巨星一指，蒸发40亿」的戏剧化叙事——传播得越广，归因越简单，事实越模糊。",
      "<strong>代价：</strong>一句「喝水」，就让某赞助商的市值蒸发400亿美元。把搞垮足球合伙人的傲慢，量化成了一个数字。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>本条目依据Yahoo、Business Insider、Marketing Edge等2021年公开报道整理。「40亿美元」为媒体广泛引用的估算数字，实际市值波动受多重市场因素影响，并非全部由C罗举动导致，请读者审慎甄别。</div>"
    ],
    detailEn:[
      "<strong>The presser moment:</strong> On 14 June 2021, at a Euro pre-match press conference, Ronaldo sat down, frowned at the two Coca-Cola bottles before him, <strong>slid them out of the camera frame</strong>, raised a bottle of water and addressed the camera in Portuguese: 'Água (water).' The stated intent: urge the public to drink water and shun sugary drinks. A few seconds of arm work that <em>kicked off a market-cap storm</em>.",
      "<strong>Market-cap wipe-out:</strong> According to multiple financial outlets, in the hours afterwards Coca-Cola's share price fell from <strong>$56.10 to $55.22</strong>, a drop of about 1.6%, wiping roughly <strong>$4 billion</strong> off its market cap. For Coca-Cola, a top-tier UEFA sponsor (sponsorship fee in the tens of millions of euros), the 'disaster' was a bolt from the blue: it stunned the marketing world and became a textbook case of <em>celebrity-effect blowback</em> in business schools.",
      "<strong>UEFA's response:</strong> UEFA swiftly released a statement stressing that Coca-Cola was an important partner and <strong>politely reminded players</strong> across teams 'not to disrupt sponsor displays at press conferences'. UEFA insiders reportedly fumed at Ronaldo's 'sabotage' but, given his stature, did not punish him publicly — they could only swallow the loss, a neat live demonstration of the balance between commercial interests and superstar clout.",
      "<strong>Players copycat:</strong> Ronaldo's move set off a chain reaction. France's Paul Pogba, a Muslim who doesn't drink, removed the <strong>Heineken</strong> beer in front of him at a later presser; Italy's Locatelli likewise shifted the Coke bottles. For a moment 'bottle-shifting' became an unlikely Euros trend, <em>sponsors were on edge</em> and UEFA had to repeatedly reassert sponsor rights.",
      "<strong>Commercial irony:</strong> Ronaldo himself is a <strong>spokesperson for several sugary or high-calorie brands</strong>, and his personal business empire feeds on the very sponsorship system. Critics pointed out that his 'moral judgement' on Coca-Cola was somewhat <em>double-standard</em> — when the interest is on his side, the 'health advocacy' quietly drops its flag.",
      "<strong>Truth of attribution:</strong> Financial analysts noted that the $4 billion swing was not all down to Ronaldo — the broader market was down that day and Coca-Cola's fundamentals were under pressure, so the <strong>share-price move was a multi-factor outcome</strong>. But the media clearly preferred the version in which a superstar's finger evaporated $4 billion, and truth and rumour got reshaped at every retelling until nobody could tell them apart.",
      "<strong>The cost:</strong> A single phrase — 'drink water' — and $40 billion wiped off a sponsor's market cap. The arrogance it takes to sink a football partner, priced to the dollar.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong>This entry is compiled from 2021 public reporting by Yahoo, Business Insider, Marketing Edge and others. The '$4 billion' figure is a widely-quoted media estimate; the actual market-cap move was driven by multiple market factors and was not solely caused by Ronaldo's action — readers should judge carefully.</div>"
    ],
    quote:{text:"喝水，不要可乐。", textEn:"Drink water, not Coca-Cola.", author:"C罗，2021欧洲杯发布会", authorEn:"Cristiano Ronaldo, UEFA Euro 2020 press conference", textEs:"Bebe agua, no Coca-Cola.", authorEs:"Cristiano Ronaldo, rueda de prensa de la UEFA Euro 2020"},
    tags:["可口可乐","40亿美元","市值蒸发","赞助商","自律人设","欧洲杯"],
    tagsEn:["Coca-Cola","$40 billion","market cap wiped","sponsor","discipline persona","Euros"],
    tagsEs:["Coca-Cola","40.000 millones de dólares","caída de capitalización","patrocinador","imagen de disciplina","Eurocopa"]
  },
  {
    id:17, cat:"persona", catLabel:"人设争议", severity:4,
    dateIso:"2010-01-01",
    title:"自设“环球足球奖”颁给自己",
    titleEn:"Self-Founded 'Globe Soccer Awards' Handed to Himself",
    titleEs: "Autofundó los «Globe Soccer Awards» y se los da a sí mismo",
    summaryEs: "Cristiano y su representante Mendes fundaron en Dubái los Globe Soccer Awards; casi cada año desde 2010, el premio al Mejor Jugador acaba en manos del propio Cristiano.",
    dateEs: "2010 — presente (anualmente)",
    locationEs: "Dubái",
    detailEs: [
      "<strong>El invento:</strong> En 2010, Cristiano y su representante Jorge Mendes fundaron los <strong>Globe Soccer Awards</strong>, una gala anual en Dubái que reparte premios a jugadores, clubes y agentes.",
      "<strong>El patrón:</strong> Desde 2010, casi cada año, el premio al «Mejor Jugador del Año» de los Globe Soccer Awards acaba en manos del propio Cristiano. El círculo, perfectamente cerrado.",
      "<strong>Autopremiarse:</strong> Para los críticos, montarse un premio para dárselo a uno mismo es la cumbre del ego: no esperar a que otros te premien, sino fundar tú la gala que te premia.",
      "<strong>El «Premio Mendes»:</strong> La gala también incluye un premio al «Mejor Representante», que una y otra vez gana el propio Jorge Mendes. En casa, toda la familia sale premiada.",
      "<strong>Reputación:</strong> Para la prensa seria, los Globe Soccer Awards son poco más que una gala de autobombo sin peso real frente al Balón de Oro o The Best de la FIFA. Un acto de promoción personal.",
      "<strong>Los otros galardonados:</strong> A lo largo de los años, la gala ha premiado a varios jugadores y clubes (a menudo vinculados a Mendes), pero el premio estrella, el de Mejor Jugador, suele ir a parar a Cristiano.",
      "<strong>Balance:</strong> Fundar un premio en Dubái para dárselo a uno mismo año tras año — una obra maestra del ego. Si los Balones de Oro no bastan, te montas los tuyos.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> Los Globe Soccer Awards son un evento real fundado en 2010. La lista de galardonados es pública.</div>"
    ],




    date:"2010年至今 (每年)",
    dateEn:"2010 — present (annually)",
    location:"迪拜",
    locationEn:"Dubai",
    img:"assets/images/report/r-17.jpg",
    summary:"C罗与经纪人门德斯在迪拜设立“环球足球奖”，从2010年起几乎年年把最佳球员颁给C罗本人——标准的“运动员自己当裁判”。",
    summaryEn:"Ronaldo and his agent Mendes set up the Globe Soccer Awards in Dubai; nearly every year since 2010 its Best Player prize has gone to Ronaldo himself — an athlete moonlighting as his own judge.",
    detail:[
      "<strong>奖项起源：</strong>环球足球奖（Globe Soccer Awards）由意大利人<strong>Tommaso Bendoni于2010年创办</strong>，每年在迪拜举办，号称表彰全球最佳球员、教练、经纪人和俱乐部，也因此被戏称为<strong>“迪拜金球”</strong>——权威性则始终无法与《法国足球》金球奖或FIFA最佳相提并论。",
      "<strong>门德斯阴影：</strong>该奖项最致命的质疑在于<strong>利益关联</strong>：C罗的经纪人豪尔赫·门德斯（Jorge Mendes）被广泛报道是该奖项的<strong>共同所有人/深度合作方</strong>。他本人更是从首届起<strong>几乎年年拿下“最佳经纪人”奖</strong>——既是评委又是获奖者，<em>“左手颁奖右手领奖”</em>的戏码从未缺席。",
      "<strong>C罗收割：</strong>在门德斯的运作下，C罗成为该奖历史上的<strong>最大赢家</strong>：六夺“年度最佳球员”，2020年加冕“世纪最佳球员”，加盟沙特后又连续三年（2023-2025）拿下“中东最佳球员”。每当金球奖/最佳球员旁落他人，他总能在迪拜“扳回一城”——<strong>奖杯数量与其说是荣誉，不如说是补偿</strong>。",
      "<strong>自颁争议：</strong>因门德斯与C罗的深度绑定，媒体与球迷嘲讽起来毫不留情，直接叫它<strong>“C罗自颁奖”</strong>。梅西粉丝群体尤为不屑，批量生产“迪拜自助餐”梗图。Wikipedia则专门收录了该奖“被指偏袒门德斯系球员”的批评条目——其公信力在主流足坛始终卡在<strong>尴尬的灰色地带</strong>。",
      "<strong>扩张与营销：</strong>近年来，环球足球奖不断增设新奖项（如“球迷奖”“中东最佳”等），并大幅扩展参赛地区。2025年颁奖礼定于迪拜<strong>亚特兰蒂斯皇家酒店</strong>举办，C罗依然稳居候选名单。批评者认为，这是在<strong>用地区性奖项为某位球员量身定制荣誉</strong>——商业逻辑排在体育公正前面。",
      "<strong>横向对比：</strong>与历史悠久的金球奖（1956年创立）、FIFA最佳（前身可追溯至1991年）相比，环球足球奖<strong>缺乏透明的投票机制与广泛的国际记者/队长/主帅参与</strong>，评委构成则长期是个谜。一个由经纪人深度参与、为其客户反复加冕的奖项，<em>注定只能是一场自娱自乐的秀</em>。",
      "<strong>总评：</strong>在迪拜创办一个奖项年复一年颁给自己——一场利己主义的杰作。金球不够，就自己办一个。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>本条目依据Wikipedia、Gulf News、ESPN、beIN Sports等公开资料整理。门德斯与环球足球奖的具体股权关系，不同信源表述存在差异，本馆以“被广泛报道/质疑”的表述呈现，最终归属以官方工商登记为准。</div>"
    ],
    detailEn:[
      "<strong>Award origin:</strong> The Globe Soccer Awards were founded in 2010 by Italian <strong>Tommaso Bendoni</strong>, held annually in Dubai and billed as celebrating the world's best players, coaches, agents and clubs — hence the nickname <strong>'Dubai Ballon d'Or'</strong>. Its authority, though, has never come close to that of the France Football Ballon d'Or or The Best FIFA Football Awards.",
      "<strong>The Mendes shadow:</strong> The most damaging criticism is the <strong>conflict of interest</strong>: Ronaldo's agent Jorge Mendes has been widely reported as a <strong>co-owner / deep partner</strong> of the awards. Mendes himself has won 'Best Agent' almost every year since the first edition — both judge and winner, <em>handing the prize with one hand and receiving it with the other</em>.",
      "<strong>Ronaldo's sweep:</strong> With Mendes steering, Ronaldo became the award's <strong>biggest winner</strong>: six 'Player of the Year' crowns, the 2020 'Player of the Century', and three straight 'Best Middle East Player' (2023-2025) after moving to Saudi. Whenever the Ballon d'Or or FIFA Best went elsewhere, Ronaldo could always 'bounce back' in Dubai — <strong>the trophy count is less honour than consolation</strong>.",
      "<strong>Self-awarded controversy:</strong> With the Mendes-Ronaldo tie this deep, media and fans mocked it as <strong>'Ronaldo's self-awarded prize'</strong>; Messi fans in particular sneered, generating reams of 'Dubai buffet' memes. Wikipedia carries a critical entry noting the award's 'alleged favouritism toward Mendes-stable players' — its credibility sits in an <strong>awkward grey zone</strong> in mainstream football.",
      "<strong>Expansion and marketing:</strong> In recent years the awards have constantly added new categories ('Fans' Award', 'Best Middle East', etc.) and broadened their regional reach. The 2025 edition was slated for Dubai's <strong>Atlantis The Royal</strong> hotel, with Ronaldo still firmly on the shortlist. Critics see it as <strong>tailoring regional awards for a particular player</strong>, with commercial logic overriding sporting fairness.",
      "<strong>Broad comparison:</strong> Versus the historic Ballon d'Or (founded 1956) and FIFA Best (roots back to 1991), the Globe Soccer Awards <strong>lack a transparent voting mechanism and broad participation by international journalists, captains and coaches</strong>; the make-up of their electorate has long been opaque. An award deeply entangled with an agent and repeatedly crowning his client can <em>only ever be a self-entertaining show</em>.",
      "<strong>Verdict:</strong> Founding an award in Dubai to hand it to yourself year after year — a masterpiece of ego. When the Ballons d'Or aren't enough, you simply mint your own.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong>This entry is compiled from public sources including Wikipedia, Gulf News, ESPN, beIN Sports and others. The specific equity relationship between Mendes and the Globe Soccer Awards is phrased differently across sources; this archive uses the 'widely reported / questioned' formulation — final ownership follows official commercial registrations.</div>"
    ],
    tags:["环球足球奖","门德斯","自我营销","迪拜","自设奖项"],
    tagsEn:["Globe Soccer Awards","Mendes","self-promotion","Dubai","self-founded award"],
    tagsEs:["Globe Soccer Awards","Mendes","autopromoción","Dubái","premio autopropuesto"]
  },
  {
    id:18, cat:"persona", catLabel:"人设争议", severity:5,
    dateIso:"2013-01-01",
    title:"2013金球奖延期“偷”里贝里",
    titleEn:"2013 Ballon d'Or Vote Extended to 'Steal' It from Ribéry",
    titleEs: "Balón de Oro 2013 — prorrogaron la votación para «robárselo» a Ribéry",
    summaryEs: "Sin títulos en 2013, Cristiano necesitó una prórroga sin precedentes del plazo de votación de la FIFA para «robarle» el Balón de Oro al pentacampeón Ribéry.",
    dateEs: "2013",
    locationEs: "FIFA",
    detailEs: [
      "<strong>El contexto:</strong> En 2013, Franck Ribéry venía de ganar el triplete con el Bayern de Múnich (Bundesliga, Copa, Champions) y era el gran favorito al Balón de Oro. Cristiano, en cambio, ese año no ganó títulos importantes con el Real Madrid.",
      "<strong>La prórroga:</strong> Por primera vez en la historia, la FIFA <strong>prorrogó el plazo de votación</strong> del Balón de Oro 2013, alegando «baja participación». La ventana extra coincidió con una racha goleadora de Cristiano.",
      "<strong>El giro:</strong> Tras la prórroga, los votos se volcaron hacia Cristiano (que cuajó unos partidos espectaculares con el Madrid, especialmente el playoff de Mundial contra Suecia), y acabó ganando el Balón de Oro por delante de Messi y Ribéry.",
      "<strong>La indignación:</strong> Ribéry y el Bayern montaron en cólera. Para muchos, la prórroga se decidió a medida de Cristiano. «Me lo robaron», llegó a decir Ribéry años después.",
      "<strong>«Robéry»:</strong> El francés, que había ganado todo lo ganable con su club, se quedó sin el Balón de Oro por culpa de una prórroga de la FIFA que muchos consideraron ad hoc. Una de las mayores polémicas de la historia del premio.",
      "<strong>La regla vs 2010:</strong> Los defensores de Cristiano esgrimen el caso de 2010, cuando Sneijder (que ganó el triplete con el Inter) tampoco ganó el Balón de Oro (fue para Messi). Pero en 2010 la votación fue dentro de las reglas; en 2013, la FIFA cambió las reglas.",
      "<strong>Balance:</strong> Una prórroga «a medida» cambió la historia del Balón de Oro 2013. Cristiano se llevó el premio, Ribéry se quedó sin nada y la FIFA quedó marcada por la sospecha.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> La prórroga de la votación del Balón de Oro 2013 es un hecho documentado. La valoración de si fue «justa» o no genera debate hasta hoy.</div>"
    ],




    date:"2013年",
    dateEn:"2013",
    location:"国际足联 (FIFA)",
    locationEn:"FIFA",
    img:"assets/images/report/r-18.jpg",
    summary:"2013年四大皆空的C罗，靠FIFA史无前例的投票延期，从五冠王里贝里手中“偷”走金球奖——金球奖史上最大丑闻，就此定格。",
    summaryEn:"Trophyless in 2013, Ronaldo benefited from FIFA's unprecedented extension of the voting window to 'steal' the Ballon d'Or from Ribéry, fresh from sweeping five trophies with Bayern — widely called the biggest scandal in the award's history.",
    detail:[
      "<strong>里贝里的五冠：</strong>2012-13赛季，法国边锋弗兰克·里贝里随拜仁慕尼黑豪夺<strong>德甲、德国杯、欧冠、欧洲超级杯、世俱杯“五冠王”</strong>，是球队绝对核心。凭这份成绩单，他本是当年金球奖的<strong>头号热门</strong>，德国名宿和欧洲媒体普遍看好。",
      "<strong>布拉特失言：</strong>2013年10月，FIFA主席布拉特在牛津大学演讲时<strong>公开嘲讽C罗</strong>，模仿其“像个司令官一样挺胸站立”，并称自己“更喜欢梅西”。这番偏袒言论引发轩然大波，皇马与葡萄牙方面强烈抗议，C罗本人一度考虑<strong>抵制颁奖典礼</strong>。布拉特随后紧急道歉并称赞C罗。",
      "<strong>诡异延期：</strong>“先贬后褒”的风波未平，2013年11月，FIFA突然宣布<strong>将金球奖投票截止日从11月15日延长至11月29日</strong>，理由是“投票率过低”。更离谱的是，<em>已经提交的选票也允许修改</em>。这一史无前例的操作，被外界普遍视为<strong>为C罗逆转量身定制</strong>。",
      "<strong>瑞典戴帽：</strong>延期窗口期内，世预赛附加赛葡萄牙对阵瑞典，C罗打出<strong>史诗级帽子戏法</strong>，单骑淘汰伊布。这场表演恰好落在新的投票截止日之前，评委风向瞬间掉头。<em>没有延期，就没有这场逆转的舞台</em>——时机的“巧合”令人生疑。",
      "<strong>结果与哗然：</strong>C罗逆转获奖，里贝里仅列第三（第二名是梅西）。榜单公布，舆论哗然：德国《图片报》、法国《队报》连篇炮轰；里贝里本人多次在采访中表达不甘，直言<strong>“我被抢走了金球奖”</strong>；拜仁高层鲁梅尼格、海因克斯也公开质疑FIFA的公正性。此事就此成为金球奖史上最大的争议之一。",
      "<strong>历史定位：</strong>2013金球奖被视为<strong>“程序不公损害结果正当性”</strong>的教科书案例：里贝里凭团队荣誉理应问鼎，却因规则临时改动与布拉特的“道歉式补偿”被逆转。CNN评论一针见血：“先嘲讽他，再夸奖他，最后把奖杯递给他”——<em>一场闹剧，三个动作，彻底败坏了一个奖项的声誉</em>。",
      "<strong>总评：</strong>一次“量身定制”的延期，改写了2013年金球奖的历史。C罗捧走奖项，里贝里一无所获，国际足联从此活在被怀疑的阴影里。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>本条目依据The Guardian、ESPN、CNN、The National、CBC Sports等2013年公开报道整理。投票延期、布拉特言论及获奖结果均有据可查；对“延期为C罗量身定制”的指控属当时舆论与媒体评论，FIFA官方解释为“投票率过低”，本馆并存两说，供读者判断。</div>"
    ],
    detailEn:[
      "<strong>Ribéry's five trophies:</strong> In 2012-13 the French winger Franck Ribéry powered Bayern Munich to a <strong>Bundesliga, DFB-Pokal, Champions League, UEFA Super Cup and Club World Cup quintuple</strong> as the team's absolute core. On that haul he was the <strong>Ballon d'Or favourite</strong>, tipped by German legends and the European press.",
      "<strong>Blatter's gaffe:</strong> In October 2013 FIFA president Sepp Blatter publicly <strong>mocked Ronaldo</strong> during an Oxford Union speech, mimicking him 'standing like a commander on the parade ground' and saying he 'preferred Messi'. The partisan remark caused uproar; Real Madrid and the Portuguese camp protested, and Ronaldo briefly flirted with <strong>boycotting the ceremony</strong>. Blatter rushed out an apology praising Ronaldo.",
      "<strong>The bizarre extension:</strong> With the Blatter 'mock-then-praise' row still bubbling, in November 2013 FIFA suddenly announced it was <strong>extending the Ballon d'Or voting deadline from 15 November to 29 November</strong>, citing 'low turnout'. Worse, <em>votes already submitted could be changed</em>. The unprecedented move was widely read as <strong>tailor-made to flip the vote for Ronaldo</strong>.",
      "<strong>Hat-trick vs Sweden:</strong> During the extension window came the World Cup play-off, Portugal vs Sweden, in which Ronaldo produced an <strong>epic hat-trick</strong> to single-handedly knock out Ibrahimović. The blockbuster performance fell neatly inside the new voting window and instantly swung the electorate. <em>Without the extension, there would have been no stage for this turnaround</em> — the 'coincidence' of timing invited suspicion.",
      "<strong>Result and outcry:</strong> Ronaldo won in the end; Ribéry could only finish third (behind Messi). The result set off a media firestorm, with Germany's Bild and France's L'Équipe thundering; Ribéry himself repeatedly said in interviews <strong>'I was robbed of the Ballon d'Or'</strong>. Bayern bosses Rummenigge and Heynckes publicly questioned FIFA's fairness, and the vote took its place among the Ballon d'Or's all-time controversies.",
      "<strong>Legacy:</strong> The 2013 Ballon d'Or is a textbook case of <strong>'procedural unfairness undermining the legitimacy of the outcome'</strong>: Ribéry deserved it on team honours, only to be overturned by an ad-hoc rule change and Blatter's 'apology-compensation'. CNN nailed it: 'Mock him, then praise him, then hand him the trophy' — <em>a farce in three acts that thoroughly broke an award's reputation</em>.",
      "<strong>Verdict:</strong> A 'tailor-made' extension rewrote the history of the 2013 Ballon d'Or. Cristiano took the prize, Ribéry walked away empty-handed, and FIFA was left marked by suspicion.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong> This entry is compiled from 2013 public reporting by The Guardian, ESPN, CNN, The National, CBC Sports and others. The voting extension, Blatter's remarks and the result are all on record; the accusation that 'the extension was tailor-made for Ronaldo' reflects contemporaneous opinion and media commentary, while FIFA's official explanation was 'low turnout' — this archive presents both for the reader to judge.</div>"
    ],
    quote:{text:"2013年是破坏了规则，而2010年在规则之内。", textEn:"In 2013 the rules were bent; in 2010 everything stayed within the rules.", author:"知乎足球评论，对比梅西2010金球争议", authorEn:"Zhihu football commentary, comparing Messi's 2010 Ballon d'Or controversy", textEs:"En 2013 se doblaron las reglas; en 2010 todo fue dentro de las reglas.", authorEs:"Comentario de fútbol en Zhihu, comparando la polémica del Balón de Oro de Messi en 2010"},
    tags:["金球奖","延期投票","里贝里","四大皆空","布拉特","门德斯","丑闻"],
    tagsEn:["Ballon d'Or","vote extension","Ribéry","trophyless season","Blatter","Mendes","scandal"],
    tagsEs:["Balón de Oro","prórroga de votación","Ribéry","temporada en blanco","Blatter","Mendes","escándalo"]
  },
  {
    id:19, cat:"club", catLabel:"俱乐部与法律", severity:5,
    dateIso:"2022-11-16",
    title:"皮尔斯·摩根采访炮轰曼联",
    titleEn:"Piers Morgan Interview — Blasting Manchester United",
    titleEs: "Entrevista con Piers Morgan — destroza al Manchester United",
    summaryEs: "En una entrevista con Piers Morgan, Cristiano atacó al United, al entrenador ten Hag y al excompañero Rooney, asegurando que se sentía «traicionado»; el club le rescindió el contrato.",
    dateEs: "16-17 nov 2022",
    locationEs: "Reino Unido (TalkTV)",
    detailEs: [
      "<strong>La entrevista bomba:</strong> Los días 16 y 17 de noviembre de 2022, Cristiano se sentó con Piers Morgan en TalkTV, en prime time. El contenido: ataques al Manchester United de arriba abajo.",
      "<strong>Las acusaciones:</strong> Cristiano aseguró sentirse «<strong>traicionado</strong>» por el club — por el entrenador Erik ten Hag, por la directiva, por gente que «quiere echarlo». Lo dijo todo.",
      "<strong>Contra ten Hag:</strong> Atacó directamente al entrenador Erik ten Hag: no le respetaba, dijo, porque ten Hag tampoco le respetaba a él. En plena temporada.",
      "<strong>Contra Rooney:</strong> También se fue contra su excompañero Wayne Rooney, que había criticado su actitud, llamándolo «envidioso» porque «él es más joven que yo y ya no juega». La respuesta personal, no al argumento.",
      "<strong>Contra el club y el estadio:</strong> Dijo que el United se había quedado «estancado» desde la marcha de Ferguson, que las instalaciones estaban anticuadas y que el club no había evolucionado.",
      "<strong>La consecuencia:</strong> El United reaccionó: rescindió el contrato de Cristiano «de mutuo acuerdo» el 22 de noviembre, a pocas semanas del inicio del Mundial de Catar. Una salida por la puerta de atrás.",
      "<strong>La reacción:</strong> La prensa inglesa lo tachó de desagradecido y de «quemar los puentes». Gary Neville, excompañero, le replicó que quien había puesto al club «en la cruz» era él, con la entrevista a mitad de temporada.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> Basado en la transcripción de la entrevista de Piers Morgan en TalkTV (noviembre de 2022) y la nota oficial del Manchester United.</div>"
    ],




    date:"2022年11月16-17日",
    dateEn:"Nov 16-17, 2022",
    location:"英国 (TalkTV)",
    locationEn:"UK (TalkTV)",
    img:"assets/images/report/r-19.jpg",
    summary:"C罗接受皮尔斯·摩根专访，炮轰曼联俱乐部、主帅滕哈格、前队友鲁尼等人，称自己“被背叛”。采访播出后曼联随即解约。",
    summaryEn:"In a Piers Morgan interview, Ronaldo attacked United, manager Ten Hag and former teammate Rooney, claiming he'd been 'betrayed'; United terminated his contract right after it aired.",
    detail:[
      "<strong>专访引爆：</strong>2022年11月，C罗接受英国名嘴皮尔斯·摩根的专访《Piers Morgan Uncensored》，节目在TalkTV播出。镜头前，他炮轰曼联俱乐部、炮轰主帅滕哈格、炮轰前队友鲁尼，<em>连临时主帅朗尼克也没放过</em>——足坛年度最大炸弹，就此引爆。",
      "<strong>感到被背叛：</strong>杀伤力最大的一句话，是<strong>“我感觉被曼联背叛了”</strong>。他声称从回归伊始就感到有<strong>两三个人</strong>不想要他，自己被当作替罪羊、像“黑羊”一样被孤立。摩根追问俱乐部是否要逼他离队，他冷冷回应：<em>我不在乎，人们该听听真相</em>。",
      "<strong>狂怼滕哈格：</strong>对主帅滕哈格，C罗直接摊牌<strong>“我对他没有尊重”</strong>，理由是滕哈格缺乏对自己的基本尊重。他还暗讽临时教练朗尼克“连正式教练都算不上”。<em>公然挑战主教练权威</em>在任何更衣室都是大忌，将帅决裂自此无可挽回。",
      "<strong>旧怨鲁尼：</strong>面对昔日搭档鲁尼的批评，C罗反唇相讥，<em>暗示对方是“嫉妒”——大概是因为自己退役了、C罗还在高水平踢球，才那么尖酸</em>。多年并肩的战友，一棍子打死；<strong>个人恩怨，凌驾于团队荣誉之上</strong>。",
      "<strong>吐槽设施：</strong>火力还烧到硬件：俱乐部的<strong>泳池、水疗、厨房、健身房</strong>挨个批了一遍，他声称曼联自弗格森时代后<strong>“零进步”</strong>。把战术失败甩锅给硬件，被嘲讽为“找借口找出了新高度”——<em>典型的输不起式甩锅</em>，全然不顾自己也是受益方。",
      "<strong>提前解约：</strong>专访播出后，曼联没有客气。2022年11月22日，俱乐部发表声明：C罗<strong>“经双方同意立即离队”</strong>，合同提前终止。曼联史上罕见的“开除”超级巨星事件——他也就此成为世界杯开赛前<em>唯一没有俱乐部的足坛顶流</em>。",
      "<strong>自绝后路：</strong>世界杯结束后，C罗无豪门问津，最终只能远赴沙特加盟利雅得胜利。这场访谈被普遍认为是他职业生涯最大的公关灾难：断送红魔生涯，也让整个欧洲足坛对其职业素养与情商打上问号——<em>从欧洲顶流到中东淘金的坠落，伏笔在此埋下</em>。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>本文内容基于公开报道整理，仅供参考。</div>"
    ],
    detailEn:[
      "<strong>The bombshell interview:</strong> In November 2022, Ronaldo sat down with British broadcaster Piers Morgan for the talk-show 'Piers Morgan Uncensored', manufacturing football's biggest bomb of the year. Aired on TalkTV, it saw him blast Manchester United, manager Ten Hag, former teammate Rooney and interim boss Rangnick — the language so fierce, the intent so final, that <em>fans worldwide were left dumbstruck</em>.",
      "<strong>Feeling betrayed:</strong> Ronaldo dropped his most lethal line: <strong>'I feel betrayed by Manchester United.'</strong> He claimed that from the moment he returned he felt <strong>two or three people</strong> did not want him, that he had been made a scapegoat, isolated 'like a black sheep'. When Morgan pushed him on whether the club was forcing him out, he coldly replied: <em>I don't care, people should hear the truth</em>.",
      "<strong>Blasting Ten Hag:</strong> As for manager Erik ten Hag, Ronaldo flat-out said <strong>'I have no respect for him'</strong>, citing Ten Hag's lack of basic respect for him. He also took a swipe at interim Ralf Rangnick, calling him 'not even a proper coach'. <em>Open mutiny against the manager's authority</em> is forbidden in any dressing room, and the player-manager relationship was now irreparable.",
      "<strong>Old feud with Rooney:</strong> Confronted with criticism from old teammate Wayne Rooney, Ronaldo retorted, <em>hinting Rooney was jealous — 'probably because I'm still playing at a high level after he retired'</em>. Writing off a long-time ally like that, <strong>elevating personal grievance above team honour</strong>, was breathtakingly petty — and left many veteran fans cold.",
      "<strong>Facilities rant:</strong> Most absurdly, Ronaldo tore into United's <strong>pool, spa, kitchen and gym</strong>, claiming United had made <strong>'zero progress'</strong> since Sir Alex Ferguson. Tactical failure laid entirely at the door of hardware was mocked as 'taking excuses to a new level' — <em>a textbook sore-loser deflection</em>, conveniently ignoring that he had also benefited from those facilities.",
      "<strong>Contract termination:</strong> After the interview aired, United struck back hard. On 22 November 2022 the club announced that Ronaldo would <strong>'leave Manchester United by mutual agreement with immediate effect'</strong>, his contract terminated — a rare 'sacking' of a superstar in United history. Ronaldo went into the World Cup as <em>the only football megastar without a club</em>.",
      "<strong>Burning his own bridges:</strong> After the World Cup no elite club came for him; he eventually left for Al Nassr in Saudi. The interview is widely regarded as the worst PR disaster of Ronaldo's career — it ended his Old Trafford story and left European football deeply doubting his professionalism and temperament, <em>laying the groundwork for his slide from European elite to Middle East cash-grab</em>.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong>This entry is compiled from public reporting and is for reference only.</div>"
    ],
    quote:{text:"我感到被背叛了。曼联的人——教练、高层——他们背叛了我。", textEn:"I feel betrayed. The people at Manchester United—the manager, the hierarchy—they betrayed me.", author:"C罗，皮尔斯·摩根采访", authorEn:"Cristiano Ronaldo, Piers Morgan interview", textEs:"Me siento traicionado. La gente del Manchester United —el entrenador, la directiva— me ha traicionado.", authorEs:"Cristiano Ronaldo, entrevista con Piers Morgan"},
    tags:["皮尔斯摩根","炮轰曼联","滕哈格","鲁尼","解约","TalkTV","被背叛"],
    tagsEn:["Piers Morgan","blasted Man United","Ten Hag","Rooney","contract terminated","TalkTV","betrayed"],
    tagsEs:["Piers Morgan","ataca a United","Ten Hag","Rooney","rescisión de contrato","TalkTV","traicionado"]
  },
  {
    id:20, cat:"club", catLabel:"俱乐部与法律", severity:3,
    dateIso:"2022-07-01",
    title:"2022夏窗转会闹剧",
    titleEn:"2022 Summer Transfer Farce",
    titleEs: "Circo del fichaje del verano 2022",
    summaryEs: "En verano de 2022, sin Champions en el United, Cristiano presionó para irse a un club de Champions — pero Chelsea, Bayern, Atlético y Napoli dijeron que no. Acabó sin fichaje.",
    dateEs: "Jul — Sep 2022",
    locationEs: "Múltiples clubes (Chelsea/Bayern/Atlético/Napoli)",
    detailEs: [
      "<strong>El descontento:</strong> El verano de 2022 se abrió con el United fuera de la Champions tras una mala temporada. Cristiano, obsesionado con el récord de la Champions, presionó para marcharse a un club que sí la jugara.",
      "<strong>El cásting de pretendientes:</strong> Su representante Mendes ofreció a Cristiano a media Europa: <strong>Chelsea, Bayern de Múnich, Atlético de Madrid, Napoli, Sporting de Lisboa, PSG</strong>… todos dijeron que no.",
      "<strong>El rechazo del Bayern:</strong> El Bayern de Múnich, pese a las reuniones con Mendes, descartó el fichaje públicamente: «no encaja en nuestro modelo», argumentaron desde Múnich. Un bochorno para el ego de Cristiano.",
      "<strong>El rechazo del Atlético:</strong> El Atlético de Madrid, que llegó a sonar con fuerza, también le cerró la puerta: los ultras del Atleti se manifestaron en contra (por su pasado del Real Madrid) y el club desistió.",
      "<strong>El rechazo del Chelsea:</strong> El Chelsea, con el nuevo propietario Boehly, barajó el fichaje pero el entrenador Tuchel vetó la operación. Cristiano quería Champions, pero la Champions no quería a Cristiano.",
      "<strong>El resultado:</strong> Tras todo el verano de tira y afloja, <strong>nadie quiso fichar a Cristiano</strong>. Tuvo que quedarse en el United a disgusto, donde acabaría protagonizando la entrevista-bomba contra el club.",
      "<strong>El simbolismo:</strong> El verano de 2022 retrató la cuesta abajo de Cristiano: de fichaje soñado de cualquier club a rechazado por todos los grandes de Europa. Una humillación pública.",
      "<strong>Balance:</strong> Seis clubes de élite le dijeron «no» en un solo verano. El circo del 2022 quedó como la prueba definitiva de que el mercado ya no perseguía a Cristiano.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> Basado en la cobertura del mercado de fichajes de verano 2022 (Fabrizio Romano, Marca, Kicker, etc.). Las negociaciones exactas varían según las fuentes.</div>"
    ],




    date:"2022年7月 — 9月",
    dateEn:"Jul — Sep 2022",
    location:"多俱乐部 (切尔西/拜仁/马竞/那不勒斯)",
    locationEn:"Multiple clubs (Chelsea/Bayern/Atlético/Napoli)",
    img:"assets/images/report/r-20.jpg",
    summary:"2022年夏，曼联无缘欧冠，C罗随即闹转会，只想去还能踢欧冠的球队。结果切尔西、拜仁、马竞等豪门全部说不，他最终尴尬留队。",
    summaryEn:"In summer 2022, with United out of the Champions League, Ronaldo agitated for a move to a UCL club — Chelsea, Bayern, Atlético and the rest all said no; he stayed put, red-faced.",
    detail:[
      "<strong>急于逃离：</strong>2022年夏天，曼联无缘欧冠，C罗立刻闹着要走。他授意经纪人门德斯四处推销，唯一诉求就是<strong>踢欧冠</strong>。37岁的他放不下欧洲顶级舞台，而欧洲顶级舞台先放下了他——回应他的，只有<strong>“无人问津”</strong>。",
      "<strong>切尔西拒收：</strong>最先传出绯闻的是切尔西，新老板伯利一度有意，但主帅图赫尔坚决反对，<em>认为C罗不符合战术体系与更衣室生态</em>。最终蓝军高层听取技术团队意见，明确退出，给门德斯吃了第一记闭门羹。堂堂欧冠冠军级豪门，连谈都不愿谈。",
      "<strong>拜仁说不：</strong>门德斯随即把目标转向拜仁慕尼黑，得到的回应更直接。体育董事卡恩、董事会海纳接连向媒体表态<strong>“我们不签C罗”</strong>，理由直指年龄、工资与战术适配。拜仁球迷论坛顺势送出绰号<strong>“没人要的C罗（Sad sack）”</strong>——德甲巨人连客套都省了。",
      "<strong>马竞划清界限：</strong>C罗的团队甚至一度试探马竞——皇马的死敌。这一提议<strong>踩了竞技与情感的双重红线</strong>，马竞高层迅速公开辟谣，主帅西蒙尼和球迷群体也强烈反感。<em>为踢欧冠不惜投奔宿敌</em>，被批毫无底线与忠诚可言。",
      "<strong>多特巴黎齐拒：</strong>多特蒙德嫌弃高龄与高薪，明确表示不感兴趣；巴黎圣日耳曼坐拥梅西、内马尔、姆巴佩，对C罗更是<strong>敬谢不敏</strong>。巴萨则因财政与形象考量同样拒绝。门德斯跑遍欧洲豪门，<em>竟无一家愿意接手</em>——全欧洲，口径统一。",
      "<strong>尴尬留队：</strong>转会窗关闭日，C罗只能灰溜溜<strong>留在曼联</strong>，赛季初几度沦为替补，提前离场闹剧不断。这位自诩“历史最佳”的巨星，成了全欧豪门集体避之不及的烫手山芋，<em>从天之骄子跌落为无人问津</em>。",
      "<strong>出走沙特：</strong>终章在冬天到来——11月摩根专访引爆，曼联提前解约，12月C罗以天价加盟沙特利雅得胜利。从<strong>死守欧冠梦想到屈居亚洲联赛</strong>，这桩夏天没人接手的转会，最终成了足坛年度最大笑柄。",
      "<strong>总评：</strong>一个夏天里，六家豪门都对他说「不」。2022年的转会闹剧，成了市场不再追逐C罗的终极证据。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>本文内容基于公开报道整理，仅供参考。</div>"
    ],
    detailEn:[
      "<strong>Desperate to flee:</strong> In the summer of 2022, with Manchester United out of the Champions League, Ronaldo immediately agitated for a move. He had his agent Mendes tout him all over Europe, the only demand being to <strong>play in the Champions League</strong>. The 37-year-old could not let go of his obsession with Europe's top stage — and instead staged football's most embarrassing <strong>'nobody wants me'</strong> show.",
      "<strong>Chelsea say no:</strong> The first reported link was Chelsea, where new owner Boehly was keen but manager Tuchel firmly opposed it, <em>judging Ronaldo a poor fit for the system and dressing room</em>. In the end the Blues' technical team sided with Tuchel and walked away — the first door slammed in Mendes's face. A Champions League-calibre giant would not even sit down to talks.",
      "<strong>Bayern say no:</strong> Mendes then turned to Bayern Munich, and the German giants publicly slapped him down. Sporting director Kahn and board member Hoeness lined up to tell the media <strong>'we are not signing Ronaldo'</strong>, citing age, wages and tactical fit. Bayern fan forums even joked about <strong>'Sad sack Ronaldo'</strong> — the episode was mortifying while it lasted.",
      "<strong>Atlético draw the line:</strong> Most ironically, Ronaldo's camp reportedly sounded out Atlético — Real Madrid's deadly city rivals. The proposal <strong>crossed a competitive and emotional red line</strong>. Atlético's hierarchy swiftly issued a public denial and distanced itself, with manager Simeone and the fanbase voicing strong disapproval. <em>Joining a mortal enemy just for UCL football</em> was slammed as having no scruples and no loyalty whatsoever.",
      "<strong>Dortmund and PSG also refuse:</strong> Borussia Dortmund passed, citing age and wages; Paris Saint-Germain, already home to Messi, Neymar and Mbappé, were <em>even less interested</em>. Add Barcelona refusing on financial and image grounds, and Mendes had crisscrossed Europe's elite without a single taker — <em>so cold a reception it qualified as a footballing spectacle</em>.",
      "<strong>Forced to stay:</strong> On transfer-deadline day Ronaldo had to slink back and <strong>stay at United</strong>, reduced to a substitute several times early in the season as his early-exit antics piled up. The self-proclaimed 'best in history' was now a hot potato every elite club avoided, <em>plummeting from darling to pariah</em> — the contrast was breathtaking.",
      "<strong>Off to Saudi:</strong> The farce ended in November, when the Morgan interview blew up and United terminated his deal; in December Ronaldo signed for Saudi Arabia's Al Nassr on a mega-deal. From <strong>clinging to the UCL dream to slumming it in an Asian league</strong>, the saga closed in the most graceless way possible — football's joke of the year.",
      "<strong>Verdict:</strong> Six elite clubs told him 'no' in a single summer. The 2022 transfer circus stands as definitive proof that the market had stopped chasing Cristiano.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong>This entry is compiled from public reporting and is for reference only.</div>"
    ],
    tags:["转会闹剧","切尔西","拜仁","马竞","欧冠","被拒绝","门德斯"],
    tagsEn:["transfer farce","Chelsea","Bayern","Atlético Madrid","Champions League","rejected","Mendes"],
    tagsEs:["circo de fichaje","Chelsea","Bayern","Atlético de Madrid","Champions League","rechazado","Mendes"]
  },
  {
    id:21, cat:"club", catLabel:"俱乐部与法律", severity:4,
    dateIso:"2018-01-01",
    title:"废队友废教练 — 尤文与曼联的衰退",
    titleEn:"Ruining Teammates & Coaches — Juve & United Decline",
    titleEs: "Rompeequipos y entrenadores — decadencia en la Juve y el United",
    summaryEs: "Tras su salida del Real Madrid, Juventus y United se hundieron en lo deportivo y en lo económico: la Juve perdió la dinastía de la Serie A; el United vivió años de caos.",
    dateEs: "2018 — 2022",
    locationEs: "Juventus / Manchester United",
    detailEs: [
      "<strong>El patrón:</strong> Tras la marcha de Cristiano del Real Madrid (2018), los clubes donde recaló vivieron un declive deportivo y económico. Sus detractores lo llaman el «rompeequipos».",
      "<strong>La Juventus:</strong> La Juve fichó a Cristiano en 2018 por 100 M€ para ganar la Champions. Resultado: ninguna Champions y, de propina, la dinastía de la Serie A cortada (9 títulos seguidos). El vestuario, dividido.",
      "<strong>El Manchester United:</strong> Cristiano volvió al United en 2021 y, tras una temporada, protagonizó la entrevista-bomba. Le rescindieron el contrato y el club siguió en crisis deportiva.",
      "<strong>Cifras y contrato:</strong> El sueldo de Cristiano (31 M€ netos en la Juve) desequilibró las cuentas. La Juve tuvo que reestructurar contratos y acabó en pleno escándalo contable (el «caso plusvalenze»).",
      "<strong>El vestuario aislado:</strong> En ambas etapas, los compañeros de Cristiano acabaron resentidos: en la Juve, Dybala y Pjanić se fueron; en el United, la separación fue total tras la entrevista a Piers Morgan.",
      "<strong>El balance deportivo:</strong> En los 4 años de Cristiano en la Juve ganó 2 Ligas y 1 Copa, pero perdió 2 finales de Champions y se quedó sin el objetivo principal; en el United, ni un solo título importante.",
      "<strong>El factor Cristiano:</strong> Para los críticos, el patrón es claro: Cristiano llega, los compañeros se resenten, las cuentas se desequilibran y el club acaba peor de lo que estaba. El «rompeequipos» en acción.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> El declive de Juve y United obedece a múltiples factores. La atribución directa a Cristiano es la tesis de sus críticos y objeto de debate.</div>"
    ],




    date:"2018 — 2022",
    dateEn:"2018 — 2022",
    location:"尤文图斯 / 曼联",
    locationEn:"Juventus / Manchester United",
    img:"assets/images/report/r-21.jpg",
    summary:"C罗离开皇马后，尤文和曼联双双在竞技和经济上大幅下滑。尤文丢了意甲连冠，曼联从联赛第二跌至第六。多名队友和教练被“废”。",
    summaryEn:"After Ronaldo left Real, both Juventus and United slumped on the pitch and on the books: Juve lost their Serie A streak, United slid from 2nd to 6th, and multiple teammates and coaches were collateral damage.",
    detail:[
      "<strong>尤文断冠：</strong>2018年C罗以1亿欧元空降尤文图斯，斑马军团图的就是他带队冲击欧冠。结果适得其反——尤文在他效力期间<strong>连续两年止步欧冠16强</strong>，连意甲九连冠都断在了他手里。一个“欧冠救世主”，反而成了王朝的终结者。",
      "<strong>废掉迪巴拉：</strong>最典型的牺牲品是保罗·迪巴拉。C罗到来后，尤文的进攻体系全面围绕他重构，迪巴拉的战术地位、球权、出场时间均被大幅压缩。名宿塔尔德利直言<strong>“迪巴拉因C罗的存在而受苦”</strong>，迪巴拉身价一度暴跌1000万至1500万欧元，<em>金童被生生用废</em>。",
      "<strong>越位毁球：</strong>迪巴拉曾吐槽C罗“很难相处”。最荒诞的一幕发生在2018年：迪巴拉一脚奔袭世界波，眼看要入选赛季十佳，却因C罗<strong>从越位位置干扰门将</strong>被吹无效——<em>队友的精彩表现沦为巨星的背景板</em>。",
      "<strong>回归曼联：</strong>2021年夏C罗回归曼联，结果同样是场灾难。索尔斯克亚因无法适配他的战术下课，球队从上赛季<strong>英超第二滑落至第六</strong>，再次无缘欧冠。C罗个人数据尚可，但曼联整体攻防失衡、更衣室分裂——<strong>有他反而更弱</strong>。",
      "<strong>拖垮体系：</strong>无论尤文还是曼联，C罗加盟后的共同特征是：全队必须围绕他踢，进攻节奏放慢、防守少一人、年轻球员发展受限。教练被迫为巨星<strong>牺牲整体</strong>，<em>体系为他让路却得不到回报</em>，这被批评者称为典型的“球星依赖症”。",
      "<strong>反噬自身：</strong>C罗所到之处，<strong>俱乐部战绩集体滑坡</strong>——尤文从统治意甲到争四艰难，曼联从争冠到争六。所谓“自带1比0”的神话被现实击碎，<em>巨星效应最终反噬了球队</em>，这段“废队友”的黑历史也成了质疑他历史地位的现成论据。",
      "<strong>「C罗效应」：</strong>在批评者看来，规律清晰可辨：他每到一处，队友状态下滑、账目失衡、俱乐部结局更糟。「球队破坏者」在行动。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>本文内容基于公开报道整理，仅供参考。</div>"
    ],
    detailEn:[
      "<strong>Juve's streak broken:</strong> When Ronaldo landed at Juventus in 2018 for €100M, the Old Lady wanted the Champions League delivered. What arrived instead: <strong>Champions League round-of-16 exits two years running</strong> and, far more damaging, the end of their nine-year Serie A title streak. The 'UCL saviour' turned out to be the dynasty-killer.",
      "<strong>Sacrificing Dybala:</strong> The clearest casualty was Paulo Dybala. Once Ronaldo arrived, Juve rebuilt the attack around him, and Dybala's tactical role, share of the ball and minutes were all sharply curtailed. Legend Tardelli said it flat out: <strong>'Dybala suffered because of Ronaldo's presence'</strong>. Dybala's market value once dropped €10-15M — <em>a golden boy run into the ground</em>.",
      "<strong>The offside that killed a wonder-goal:</strong> Dybala once complained Ronaldo was 'difficult to play with'. Then there was 2018: Dybala's breathtaking solo strike, bound for goal of the season, chalked off because Ronaldo <strong>interfered with the keeper from an offside position</strong>. <em>A teammate's brilliance, reduced to background music for the star.</em>",
      "<strong>The United return:</strong> In summer 2021 Ronaldo returned to Manchester United, and the sequel was just as disastrous. Solskjær was sacked for being unable to fit him tactically; the team slid from <strong>2nd in the Premier League the prior season to 6th</strong>, missing the Champions League again. Ronaldo's personal numbers were fine — meanwhile United's overall balance collapsed and the dressing room split. <strong>With him, they were weaker.</strong>",
      "<strong>Dragging down systems:</strong> Juve or United, the deal was the same: the whole team had to play around him, the attacking tempo slowed, they effectively defended with ten, and young players' development was stunted. The manager was forced to <strong>sacrifice the collective</strong> — <em>the system gave way for him, with no payback</em>. Critics call it textbook 'superstar-dependency syndrome'.",
      "<strong>Blowback on himself:</strong> And wherever Ronaldo went, <strong>the club's results collectively slumped</strong> — Juventus from ruling Serie A to scrambling for top-four, United from title contenders to sixth-place. The myth that he 'brought a 1-0 lead' did not survive the league table; <em>the superstar effect backfired on the team</em>. This 'team-wrecker' entry remains a permanent exhibit against his historical standing.",
      "<strong>The Cristiano factor:</strong> For the critics, the ledger reads the same everywhere: Cristiano arrives, teammates suffer, the books unravel, and the club ends up worse than before. The «team-breaker» in action.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong> This entry is compiled from public reporting and is for reference only.</div>"
    ],
    quote:{text:"C罗没能力展现其它进攻技能，也只能是进球数据还不错。", textEn:"Ronaldo can't show any other attacking skills; all he really has is decent goal-scoring numbers.", author:"知乎足球分析", authorEn:"Zhihu football analysis", textEs:"Cristiano no sabe mostrar otras habilidades ofensivas; lo único que de verdad tiene son números goleadores decentes.", authorEs:"Análisis de fútbol en Zhihu"},
    tags:["废队友","废教练","尤文图斯","曼联","意甲连冠终结","联赛第六","团队破坏者"],
    tagsEn:["teammate-killer","coach-killer","Juventus","Man United","Serie A dynasty ended","finished 6th","team-breaker"],
    tagsEs:["compañero-mata","entrenador-mata","Juventus","Man United","fin de la dinastía en Serie A","sexto en la liga","rompeequipos"]
  },
  {
    id:22, cat:"national", catLabel:"国家队争议", severity:3,
    dateIso:"2016-07-01",
    title:"2016欧洲杯决赛“躺冠”被营销成第一功臣",
    titleEn:"Euro 2016 Final — 'Carried' to the Title, Marketed as the Hero",
    titleEs: "Final de la Euro 2016 — «llevado» al título, vendido como héroe",
    summaryEs: "Cristiano solo jugó 25 minutos de la final de la Euro 2016 antes de lesionarse; el gol de la victoria lo marcó el suplente Éder en la prórroga, pero el marketing lo vendió como «el gran héroe».",
    dateEs: "Jul 2016",
    locationEs: "Francia (final de la Euro)",
    detailEs: [
      "<strong>El partido:</strong> Final de la Eurocopa 2016, Portugal–Francia en el Stade de France. Cristiano saltó como capitán y referente, pero su final duró apenas 25 minutos.",
      "<strong>La lesión:</strong> En el minuto 25, tras un choque con Dimitri Payet, Cristiano se lesionó la rodilla. Sentado en el césped, entre lágrimas, tuvo que ser sustituido. Se fue con la mariposa en el brazo.",
      "<strong>Éder, el héroe olvidado:</strong> En la prórroga, el delantero suplente <strong>Éder</strong> marcó el gol de la victoria (1-0). Sin Cristiano en el campo, Portugal levantó su primera Eurocopa.",
      "<strong>El «entrenador» desde la banda:</strong> Ya en la prórroga, Cristiano se autoproclamó «entrenador»: gritaba instrucciones desde la línea de cal, animaba a los compañeros, hasta se metió en el campo a celebrar el gol antes de tiempo. La escena fue muy criticada.",
      "<strong>El marketing del héroe:</strong> Pese a no jugar la final, el marketing y los medios encumbraron a Cristiano como «el capitán que llevó a Portugal al título». Para muchos, una apropiación del mérito ajeno.",
      "<strong>El contraste:</strong> Mientras Éder, el goleador real, quedaba en el olvido, Cristiano se llevaba los focos. El patrón de siempre: el portugués acapara el protagonismo, gane quien gane el partido.",
      "<strong>Balance:</strong> Portugal ganó la Eurocopa 2016 sin Cristiano en el campo la mayor parte de la final. El título fue real; la narrativa del «héroe Cristiano», como poco, generosa con su papel.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> Portugal ganó la Eurocopa 2016 de forma real. El debate se centra en el peso real de Cristiano en la final y en la narrativa mediática posterior.</div>"
    ],




    date:"2016年7月",
    dateEn:"Jul 2016",
    location:"法国 (欧洲杯决赛)",
    locationEn:"France (Euro final)",
    img:"assets/images/report/r-22.jpg",
    summary:"2016欧洲杯决赛，C罗踢了25分钟就含泪伤退，替补埃德尔加时绝杀，葡萄牙夺冠。门德斯团队却把担架上的他营销成“第一功臣”——队友的贡献，被抹成了背景板。",
    summaryEn:"Ronaldo lasted 25 minutes of the Euro 2016 final before going off injured; teammate Éder scored the extra-time winner, yet Mendes's camp marketed Ronaldo as the chief architect — and stood accused of erasing his teammates' credit.",
    detail:[
      "<strong>仓促伤退：</strong>2016年欧洲杯决赛，葡萄牙对阵东道主法国。开场仅<strong>第8分钟</strong>，C罗就被帕耶凶狠冲撞，左膝韧带受损，强撑到<strong>第25分钟</strong>含泪被担架抬离，全场一片错愕。这场万众瞩目的对决，<em>主角只演了不到半小时就黯然退场</em>。",
      "<strong>飞蛾抢镜：</strong>当晚最出圈的画面，属于成千上万只涌入法兰西大球场的飞蛾——一只稳稳停在<strong>躺在草皮上的C罗脸上</strong>。这一幕瞬间刷爆全球社交媒体，成了本届欧洲杯最具讽刺意味的名场面。<em>主角没踢几分钟，飞蛾反而成了主角</em>。",
      "<strong>埃德尔绝杀：</strong>真正的主角是替补登场的埃德尔。加时赛第108分钟，这位名不见经传的前锋<strong>25米外冷射破门</strong>，为葡萄牙锁定1比0的胜利。埃德尔赛后坦言：“那一夜之前，除了球队和家人，<em>没人认识我</em>。”这粒进球，本该只属于他一个人。",
      "<strong>场边抢戏：</strong>然而颁奖与叙事的镜头，几乎全部聚焦在伤退的C罗身上。他在场边手舞足蹈、大喊大叫，宛如<strong>“第二主教练”</strong>，从激励队友到指挥跑位，表演欲贯穿全场，<em>把队友浴血奋战换来的奖杯据为己功</em>。",
      "<strong>营销封神：</strong>赛后营销机器全速运转，C罗被包装成<strong>“率队夺冠”的第一功臣</strong>、葡萄牙的民族英雄。各大媒体头版几乎清一色是他亲吻奖杯的画面，真正进球的埃德尔反倒沦为配角。<em>一场躺冠被硬生生演成了封神</em>，质疑声此起彼伏。",
      "<strong>数据真相：</strong>C罗本届欧洲杯虽有3球贡献，但决赛仅踢25分钟。葡萄牙小组赛<strong>三连平</strong>、靠最佳第三名侥幸出线，夺冠之路含金量有限。把全部荣耀归于一个提前伤退的球员，<strong>显然有违公平</strong>，却被商业叙事牢牢锁定。",
      "<strong>躺冠争议：</strong>这场决赛也因此被反复列入C罗“黑历史”——当一名球员<strong>没怎么踢就拿了冠军</strong>，还要揽下所有功劳，所谓“领袖气质”未免太廉价了。飞蛾停在脸上的那张照片，几乎成了这场<strong>“躺冠营销”</strong>最辛辣的注脚。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>本文内容基于公开报道整理，仅供参考。</div>"
    ],
    detailEn:[
      "<strong>Rushed injury exit:</strong> The Euro 2016 final pitched Portugal against hosts France. As early as the <strong>8th minute</strong> Payet clattered Ronaldo, damaging the left-knee ligaments; he grimly tried to play on, but by the <strong>25th minute</strong> he was stretchered off in tears while the stadium watched in dismay. The showpiece had lost its <em>lead actor inside half an hour</em>.",
      "<strong>The moth steals the show:</strong> The most viral image of the match was thousands of moths swarming the Stade de France. One of them landed squarely on <strong>Ronaldo's face as he lay on the pitch</strong>, instantly flooding social media worldwide — the tournament's most iconic shot, irony included. <em>The lead actor barely played; the moth took top billing</em>.",
      "<strong>Éder's winner:</strong> The real hero was substitute Éder. In the 108th minute of extra time the unknown striker <strong>drove a 25-metre shot into the bottom corner</strong>, sealing Portugal's 1-0 victory. He admitted afterwards: 'Before that night, <em>nobody knew me</em> outside the team and my family.' The credit should have been his alone.",
      "<strong>Sideline scene-stealing:</strong> Instead, the post-match celebrations and the narrative around them centred almost entirely on the injured Ronaldo. Through extra time he had worked the sideline — gesticulating, bellowing, playing <strong>'the second manager'</strong>, motivating teammates, directing runs, hogging the spotlight. The need to perform outlasted the ligaments, <em>claiming the trophy his teammates had bled for as his own</em>.",
      "<strong>PR-driven coronation:</strong> After the final the marketing machine ran at full tilt: Ronaldo repackaged as the <strong>'chief architect' who 'led the team to glory'</strong>, Portugal's national hero. Front page after front page showed him kissing the trophy; Éder, who actually scored, was reduced to a footnote. <em>A 'carried' title was rewritten as a coronation</em> — and not everyone bought it.",
      "<strong>The numbers tell the truth:</strong> Ronaldo did contribute 3 goals at these Euros — and played just 25 minutes of the final. Portugal drew <strong>all three group matches</strong> and squeaked through as one of the best third-placed sides; the road to the title was not a glittering one. Attributing all the glory to a player who went off injured early is <strong>plainly unfair</strong>. The commercial narrative locked it in anyway.",
      "<strong>The 'carried' controversy:</strong> The final remains a recurring 'dark-history' entry for Ronaldo — when a player <strong>wins a title without really playing</strong> and still claims all the credit, that 'leadership aura' looks awfully cheap. The moth-on-face photo is the most biting footnote that <strong>'carried-title marketing'</strong> could ask for.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong>This entry is compiled from public reporting and is for reference only.</div>"
    ],
    tags:["2016欧洲杯","躺冠","埃德尔","佩佩","纳尼","门德斯营销","MVP第七"],
    tagsEn:["Euro 2016","carried to the title","Éder","Pepe","Nani","Mendes marketing","7th-place MVP"],
    tagsEs:["Eurocopa 2016","título de prestado","Éder","Pepe","Nani","marketing de Mendes","MVP en 7.º lugar"]
  },
  {
    id:23, cat:"national", catLabel:"国家队争议", severity:3,
    dateIso:"2006-01-01",
    title:"世界杯淘汰赛20年进球荒",
    titleEn:"20-Year World Cup Knockout Goal Drought",
    titleEs: "20 años de sequía goleadora en eliminatorias del Mundial",
    summaryEs: "Para el goleador histórico Cristiano, cinco Mundiales se saldaron con 0 goles y 0 asistencias en eliminatorias — una sequía que por fin se rompió en 2026.",
    dateEs: "2006 — 2026 (cinco Mundiales; sequía rota en 2026)",
    locationEs: "Múltiples Mundiales",
    detailEs: [
      "<strong>El dato brutal:</strong> A lo largo de cinco Mundiales (2006-2022), Cristiano <strong>no marcó ni un solo gol ni dio una asistencia en eliminatorias</strong>. Para el máximo goleador de la historia, un agujero clamoroso.",
      "<strong>La estadística:</strong> En 8 partidos de eliminatoria mundialista entre 2006 y 2022, Cristiano acumuló cero goles, cero asistencias y varias eliminaciones con Portugal (2006 cuartos, 2010 octavos, 2014 fase de grupos, 2018 octavos, 2022 cuartos).",
      "<strong>El contraste:</strong> Mientras Messi levantaba el Mundial 2022 con goles decisivos en eliminatorias, Cristiano no había marcado nunca en un cruce mundialista.",
      "<strong>El récord «a cualquier precio»:</strong> Cristiano sí que es el máximo goleador de la historia de selecciones y de Mundiales en total (fase de grupos incluida), pero su sequía en eliminatorias era la asignatura pendiente.",
      "<strong>La excepción de 2026:</strong> En el Mundial 2026 (EE. UU.-Canadá-México), Cristiano por fin marcó en una eliminatoria (16avos) y se quitó el peso de encima — pero cayó eliminado en octavos contra España.",
      "<strong>El balance:</strong> 20 años y cinco Mundiales para marcar su primer gol en eliminatorias. Para el autoproclamado «mejor de la historia», una deuda saldada demasiado tarde.",
      "<strong>La narrativa:</strong> Los haters de Cristiano llevan años usando esta estadística como prueba de su desaparición en los grandes momentos: marca en la fase de grupos y se esfuma cuando el cruce aprieta de verdad.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> Las estadísticas de goles de Cristiano en eliminatorias del Mundial están documentadas por FIFA y OPTA. La sequía se rompió en 2026.</div>"
    ],




    date:"2006 — 2026 (五届世界杯，2026 破零)",
    dateEn:"2006 — 2026 (five World Cups; drought broken in 2026)",
    location:"多届世界杯",
    locationEn:"Multiple World Cups",
    img:"assets/images/report/r-23.jpg",
    summary:"足坛历史顶级射手，五届世界杯的淘汰赛成绩单：0球0助攻——C罗的“大场面先生”人设，与档案记录恰好相反。",
    summaryEn:"For a scorer of Ronaldo's standing, five World Cups produced 0 goals and 0 assists in the knockouts — the 'big-game man' persona is one thing, the stat line another.",
    detail:[
      "<strong>尴尬纪录：</strong>在2026年世界杯破荒之前，C罗的世界杯淘汰赛数据是足坛最尴尬的一项统计——<strong>截至2022年，8场淘汰赛0球0助攻</strong>。连续五届世界杯，他在小组赛偶有亮点，<em>一到淘汰赛便彻底隐形</em>，“大场面先生”的人设与数据各说各话。",
      "<strong>对比克洛泽：</strong>要量出这组数据有多惨淡，参照物是德国前锋克洛泽——四届世界杯<strong>16粒进球</strong>，淘汰赛屡有关键破门，大力神杯也捧回了家。C罗这边，五届仅8球，<strong>淘汰赛颗粒无收</strong>，<em>“球王”叙事在这样的对照面前薄得透光</em>。",
      "<strong>隐身时刻：</strong>2006年半决赛对法国隐身，2018年对乌拉圭哑火，2022年干脆在淘汰赛坐上替补席——世界杯最关键的舞台上，C罗反复<strong>“查无此人”</strong>。葡萄牙数次止步淘汰赛，几乎每一次都能在同一个位置找到原因：当家球星没有挺身而出。<em>关键时刻的缺位，从未缺席</em>。",
      "<strong>营销反差：</strong>放进CR7品牌的全球营销里看，这组数据更刺眼。商业叙事把他塑造成<strong>“为国家队而生”</strong>的救世主，世界杯淘汰赛0球0助攻的铁证却像一记耳光。宣传与现实背离到这个地步，质疑声只会更响，<strong>“大赛软脚虾”</strong>的标签想撕也撕不掉。",
      "<strong>小组赛刷数据：</strong>批评者指出，C罗的世界杯进球多集中在小组赛对阵弱旅，<em>含金量有限的进球被反复吹嘘</em>。一旦进入真刀真枪的淘汰赛，顶级防线与关键战的双重压力之下，俱乐部里的高效再难复制，<strong>大赛硬仗能力备受拷问</strong>。",
      "<strong>梅西参照：</strong>同一个舞台，梅西的答卷亮眼得多——多届淘汰赛进球助攻，2022年带队夺冠封王。两人在世界杯淘汰赛的<strong>巨大落差</strong>，长期是“梅罗之争”的核心论据之一。<em>俱乐部虐菜无人能敌，世界杯硬仗判若两人</em>，成了C罗绕不开的软肋。",
      "<strong>纪录修正：</strong>2026年世界杯，41岁的C罗终于在淘汰赛取得进球，<strong>打破了这一长达20年的尴尬</strong>。只是这一球落在职业生涯尾声，<em>洗不净此前8场淘汰赛0球0助攻的旧账</em>，黑榜上仍占一席之地。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>本文内容基于公开报道整理，仅供参考。</div>"
    ],
    detailEn:[
      "<strong>The embarrassing record:</strong> Before he finally broke his duck at the 2026 World Cup, Ronaldo's knockout-stage numbers were football's most awkward stat — <strong>as of 2022, 8 knockout matches, 0 goals, 0 assists</strong>. Across five straight World Cups he shone now and then in the groups, then <em>went missing the moment the knockouts began</em> — the exact reverse of the 'big-game man' persona.",
      "<strong>The Klose contrast:</strong> The cleanest yardstick for this drought is German striker Miroslav Klose: <strong>16 goals</strong> across four World Cups, delivering in the knockouts again and again, and lifting the trophy. Ronaldo managed 8 across five editions and <strong>nothing in the knockouts</strong> — a gap wide enough to <em>leave the 'GOAT' narrative remarkably thin</em>.",
      "<strong>Vanishing acts:</strong> From going missing in the 2006 semi-final against France, to firing blanks against Uruguay in 2018, to being dropped to the bench in the 2022 knockouts — on football's biggest stage, Ronaldo was repeatedly <strong>nowhere to be found</strong>. Several of Portugal's knockout exits trace directly to the marquee star failing to step up, <em>an absence at the decisive moments that still stings to revisit</em>.",
      "<strong>Marketing mismatch:</strong> None of it showed in the global marketing of the CR7 brand, which cast him as the <strong>'born for the national team'</strong> saviour. The knockout-stage evidence of 0 goals and 0 assists landed like a slap. As the gap between promotion and reality widens, the doubts grow louder, and the <strong>'big-game bottler'</strong> tag sticks hard.",
      "<strong>Group-stage padding:</strong> Critics point out that most of Ronaldo's World Cup goals came against weak sides in the group stage, <em>low-value strikes hyped on repeat</em>. Come the knockout rounds — top defences, real pressure — his club efficiency stopped translating, and his <strong>big-game mettle has long been questioned</strong>.",
      "<strong>The Messi yardstick:</strong> On the same stage Messi's World Cup numbers are far more dazzling — multiple knockout goals and assists, and the 2022 title that sealed his GOAT case. The <strong>gulf between the two</strong> in World Cup knockouts has long been a core exhibit in the Messi-Ronaldo debate. <em>Unmatched at bullying weaker sides in the groups; a totally different player in World Cup knockouts</em> — Ronaldo's enduring weakness.",
      "<strong>Record correction:</strong> In fairness, at the 2026 World Cup a 41-year-old Ronaldo finally scored in a knockout, <strong>ending the 20-year drought</strong>. But a goal at the very tail of his career <em>cannot fully wipe away the prior history of 0 goals and 0 assists in 8 knockout matches</em>; the dark ledger still has its page.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong>This entry is compiled from public reporting and is for reference only.</div>"
    ],
    tags:["世界杯","淘汰赛","0球0助","五届","大赛软脚","对比梅西"],
    tagsEn:["World Cup","knockout stage","0 goals 0 assists","five editions","chokes in big games","vs Messi"],
    tagsEs:["Mundial","fase final","0 goles 0 asistencias","cinco ediciones","se desinfla en grandes citas","vs Messi"]
  },
  {
    id:24, cat:"national", catLabel:"国家队争议", severity:3,
    dateIso:"2010-01-01",
    title:"国家队“营销”与数据注水争议",
    titleEn:"National-Team 'Marketing' & Stat-Padding Controversy",
    titleEs: "«Marketing» con la selección y polémica por inflar stats",
    summaryEs: "Del montaje PR del «ejército de un solo hombre» a pedir fuera de juego en el gol de un compañero; de las stats infladas en amistosos a las discusiones por la autoría de cada gol.",
    dateEs: "Varios momentos de la carrera",
    locationEs: "Selección portuguesa",
    detailEs: [
      "<strong>El «ejército de un solo hombre»:</strong> Cristiano es el máximo goleador histórico de selecciones. La letra pequeña: buena parte de esos goles llegaron contra equipos pequeños (Luxemburgo, Lituania, Andorra), en partidos sin trascendencia.",
      "<strong>Goles y stats a su nombre:</strong> La crítica recurrente: Cristiano prioriza sus números personales por encima del juego colectivo. Lanza todos los balones parados, todos los penales y busca el gol aunque el equipo esté mejor colocado.",
      "<strong>Fuera de juego en el gol de un compañero:</strong> En más de una ocasión se le ha visto celebrar un gol de un compañero para, acto seguido, discutir si el último toque era suyo. La obsesión por la autoría goleadora.",
      "<strong>Inflar stats en amistosos:</strong> Cuando Cristiano se acerca a un récord, Portugal programa amistosos contra selecciones modestas para que el portugués pueda sumar goles y batir marcas en condiciones favorables.",
      "<strong>El marketing personal:</strong> Cada gol récord de Cristiano viene con su campaña de medios y redes: «el mejor de la historia», «imparable». Un despliegue de autopromoción que roza lo obsesivo.",
      "<strong>Los números vs los títulos:</strong> Cristiano tiene todos los récords goleadores imaginables, pero con Portugal solo ha ganado 1 Eurocopa (2016) y 1 Liga de Naciones. La correlación goles = títulos no siempre se cumple.",
      "<strong>Balance:</strong> El máximo goleador de selecciones de la historia — y buena parte de la cifra firmada en partidos sin trascendencia o contra rivales menores. «Stats» vs títulos: el debate Cristiano.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> Las estadísticas goleadoras de Cristiano son reales y verificables. La valoración sobre el «peso» de sus goles es objeto de debate entre seguidores y críticos.</div>"
    ],




    date:"职业生涯各时期",
    dateEn:"Various points in career",
    location:"葡萄牙国家队",
    locationEn:"Portugal national team",
    img:"assets/images/report/r-24.jpg",
    summary:"“一己之力”的营销、队友进球时举手示意越位、国际友谊赛里接连刷进球——数据注水的质疑，贯穿了C罗的国家队生涯。",
    summaryEn:"From 'one-man-army' PR stunts to flagging a teammate's goal offside, from padding stats in friendlies to doubts over inflated numbers — Ronaldo's national-team career is steeped in marketing controversy.",
    detail:[
      "<strong>注水源头：</strong>C罗国家队进球数高居历史第一，但细究对手构成，注水痕迹明显。据欧足联官方统计，他进球最多的对手是<strong>卢森堡（11球）</strong>、立陶宛与瑞典（各7球）、安道尔与匈牙利（各6球），<em>清一色欧洲二三流甚至鱼腩球队</em>。",
      "<strong>刷球狂潮：</strong>曾有媒体统计，C罗某一阶段的<strong>14个国家队进球中有10个</strong>来自立陶宛和卢森堡两支球队。对卢森堡他场均<strong>1球</strong>、对安道尔6场6球——对阵这些排名百名开外的对手，<em>虐菜效率堪称“历史级”</em>。",
      "<strong>帽子戏法：</strong>2019年对阵立陶宛，C罗上演<strong>大四喜（4球）</strong>；同年的卢森堡、安道尔也频频沦为他的提款机。这些比赛葡萄牙往往实力碾压，C罗则<em>把鱼腩球队当成个人数据展厅</em>，含金量饱受质疑。",
      "<strong>对比梅西：</strong>梅西的世预赛对手虽然也不乏弱队，但南美无真正鱼腩，每场皆是硬仗。而C罗所在的欧洲区，预选赛常与<strong>袖珍国家</strong>同组，刷球空间远大于南美。<em>这种赛制红利被反复利用</em>，让两人的国家队数据并不在同一参照系上。",
      "<strong>淘汰赛软肋：</strong>C罗在<strong>世界杯淘汰赛8场0球0助攻</strong>（2026年前），欧洲杯淘汰赛的关键进球也屈指可数。<strong>弱队刷得飞起、强队集体隐身</strong>，这种选择性爆发的模式，正是“数据注水”论的核心依据。",
      "<strong>纪录争议：</strong>尽管凭借130+球登顶国际赛射手王，但<strong>“含金量”</strong>始终是绕不开的质疑。当一大半进球来自排名百位之外的对手，所谓历史第一，究竟是实力的证明，还是<em>赛制与对手馈赠的结果</em>？这一争论在梅罗之争中从未平息。",
      "<strong>洗白逻辑：</strong>支持者总以“对弱队进球是本职”辩护，但问题在于：当数据被拿来<strong>衡量历史地位</strong>时，对手强弱就必须纳入考量。一个对卢森堡刷11球、对顶级强队却屡屡哑火的纪录，<em>很难支撑起“历史最佳”的沉重王冠</em>。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>本文内容基于公开报道整理，仅供参考。</div>"
    ],
    detailEn:[
      "<strong>The padding source:</strong> Ronaldo sits top of the all-time international scoring chart, and a closer look at the opponents reveals the padding. According to UEFA's official stats, the sides he scored most against are <strong>Luxembourg (11)</strong>, Lithuania and Sweden (7 each), Andorra and Hungary (6 each) — <em>a clean sweep of European second- and third-tier minnows</em>.",
      "<strong>The stat-padding spree:</strong> Media have calculated that over one stretch <strong>10 of Ronaldo's 14 international goals</strong> came against Lithuania and Luxembourg alone — a staggering concentration. He averaged <strong>a goal a game</strong> against Luxembourg, scored 6 in 6 against Andorra; against opponents ranked outside the world's top 100, <em>his minnow-crushing efficiency is 'historic'</em>.",
      "<strong>Hat-tricks:</strong> In 2019 against Lithuania Ronaldo bagged <strong>four goals</strong>; that year's Luxembourg and Andorra also became his regular ATMs. In those games Portugal were usually vastly superior, and Ronaldo padded his stats like a pickpocket, <em>using minnows as his personal data showroom</em> — a haul whose value is heavily doubted.",
      "<strong>Messi comparison:</strong> Messi's World Cup qualifying opponents include weak teams too, but in South America there are no real minnows — every match is a battle. Ronaldo's European qualifying often groups Portugal with <strong>tiny nations</strong>, leaving far more padding room than in South America. <em>He has exploited that structural advantage over and over</em>, and the two men's national-team numbers end up on different reference frames.",
      "<strong>Knockout weak spot:</strong> More tellingly, Ronaldo had <strong>0 goals and 0 assists across 8 World Cup knockout matches</strong> (pre-2026), and his decisive Euro knockout goals are also rare. He <strong>ran riot against weak sides and went missing against strong ones</strong> — exactly the pattern that fuels the 'stat-padding' argument.",
      "<strong>The credibility question:</strong> Even sitting top with 130+ international goals, the <strong>'quality'</strong> of those goals is a perpetual doubt. When more than half come against opponents ranked outside the top 100, is the all-time record a measure of ability, or <em>a product of format and fixtures?</em> In the Messi-Ronaldo rivalry, that debate never closes.",
      "<strong>Whitewash logic:</strong> Supporters invariably defend him with 'scoring against weak sides is his job', but the issue is: when the data is used to <strong>measure historical standing</strong>, the strength of opponents has to count. A record padded with 11 goals against Luxembourg and frequent blanks against top sides <em>can hardly bear the weight of the 'best in history' crown</em>.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong>This entry is compiled from public reporting and is for reference only.</div>"
    ],
    tags:["营销","一己之力","数据注水","友谊赛刷球","门德斯","9248"],
    tagsEn:["marketing","one-man show","inflated stats","stat-padding in friendlies","Mendes","9248"],
    tagsEs:["marketing","espectáculo en solitario","estadísticas infladas","inflar datos en amistosos","Mendes","9248"]
  },
  {
    id:25, cat:"persona", catLabel:"人设争议", severity:4,
    dateIso:"2003-01-01",
    title:"背弃祖姓 — 抛弃 Aveiro 改用 Ronaldo",
    titleEn:"Abandoned His Surname — Dropped Aveiro, Stole 'Ronaldo'",
    titleEs: "Abandonó su apellido — tiró Aveiro, robó «Ronaldo»",
    summaryEs: "Su nombre completo es Cristiano Ronaldo dos Santos Aveiro; por convención portuguesa, la última parte —Aveiro— es el apellido familiar. Él lo tiró y se hace llamar CR7.",
    dateEs: "Del debut al presente (elección de nombre)",
    locationEs: "Madeira, Portugal / Global",
    detailEs: [
      "<strong>El nombre completo:</strong> Su nombre real es <strong>Cristiano Ronaldo dos Santos Aveiro</strong>. En la convención portuguesa de nombres, «dos Santos» es el apellido materno y «<strong>Aveiro</strong>», el paterno (el familiar).",
      "<strong>«Ronaldo», un segundo nombre:</strong> «Ronaldo» es solo un <strong>segundo nombre</strong>. Se lo puso su padre, José Dinis Aveiro, por admiración al actor Ronald Reagan, al que también apreciaba como político. Nada que ver con el linaje.",
      "<strong>El abandono del apellido:</strong> «Aveiro» era su apellido familiar. Cristiano lo abandonó y se hizo conocido como «Cristiano Ronaldo», luego abreviado en «CR7» (Cristiano Ronaldo + dorsal 7).",
      "<strong>El sello «CR7»:</strong> Cristiano construyó toda una marca personal en torno a las siglas «CR7»: hoteles, ropa interior, fragancias, moda. Unas iniciales que eligen el segundo nombre y descartan el apellido real.",
      "<strong>Las iniciales reales:</strong> Por sangre, deberían ser <strong>CA7 — Cristiano Aveiro</strong>. Pero Cristiano prefirió «CR7» para colgarse de la fama del nombre «Ronaldo».",
      "<strong>«Ronaldo» ya estaba ocupado:</strong> Cuando Cristiano debutó, en el fútbol mundial ya eran dioses el brasileño <strong>Ronaldo Nazário (R9)</strong> y Ronaldinho. Cristiano se apropió del «Ronaldo» para cabalgar sobre esa fama.",
      "<strong>La metáfora:</strong> Para sus críticos, tirar el apellido familiar y robar el «Ronaldo» es la metáfora perfecta de Cristiano: le interesa la fama, no la verdad. Por sangre, es Cristiano Aveiro, no Ronaldo.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> El nombre completo y las convenciones portuguesas de nombres son hechos verificables. La interpretación de «abandonar el apellido» es la tesis crítica de este archivo.</div>"
    ],




    date:"出道至今 (命名选择)",
    dateEn:"Debut to present (naming choice)",
    location:"葡萄牙马德拉岛 / 全球",
    locationEn:"Madeira, Portugal / Global",
    img:"assets/images/report/r-25.jpg",
    summary:"C罗全名 Cristiano Ronaldo dos Santos Aveiro，按葡萄牙惯例，末尾的 Aveiro 才是家族姓氏。他偏不用——弃了祖姓，拿中间名 Ronaldo 当对外名号，被批“背弃血脉、自我营销”。",
    summaryEn:"His full name is Cristiano Ronaldo dos Santos Aveiro; by Portuguese convention, the family surname is the last part — Aveiro. He ditched it and answered to his middle name instead, on charges of 'betraying his bloodline for self-marketing'.",
    detail:[
      "<strong>真姓揭秘：</strong>球迷张口闭口“C罗”，却少有人追问过他的真姓。他的全名是<strong>Cristiano Ronaldo dos Santos Aveiro（克里斯蒂亚诺·罗纳尔多·多斯·桑托斯·阿威罗）</strong>。其中，<em>“阿威罗（Aveiro）”才是他真正的父姓</em>，而非广为流传的“罗纳尔多”。",
      "<strong>中间名真相：</strong>所谓“罗纳尔多”，其实只是他的<strong>中间名</strong>，并非家族姓氏。按葡萄牙命名传统，正确的姓名缩写应当是<strong>CA7（Cristiano Aveiro）</strong>，而非人尽皆知的CR7。这个被全球喊了二十年的称号，<em>本质上是用中间名顶替了真姓</em>。",
      "<strong>里根渊源：</strong>“罗纳尔多”这个名字的来历更是离奇——他的父亲若泽·迪尼斯·阿威罗是<strong>美国前总统罗纳德·里根（Ronald Reagan）</strong>的铁杆影迷，尤其迷恋里根早年的好莱坞电影，干脆给小儿子取了“Ronaldo”这个中间名。<em>一个葡萄牙球员，竟以美国总统兼演员命名</em>。",
      "<strong>弃用父姓：</strong>在商业品牌和公众形象里，C罗几乎<strong>彻底弃用了真正的父姓“阿威罗”</strong>，转而把中间名“罗纳尔多”打造成了世界级IP。从CR7商标到全球连锁酒店，<em>真姓被一路刻意边缘化</em>。",
      "<strong>品牌重塑：</strong>拿“Ronaldo”而非“Aveiro”当代号，显然是<strong>更响亮、更国际化</strong>的品牌策略：“阿威罗”在葡语之外发音拗口、辨识度低，“罗纳尔多”则朗朗上口、易于全球传播。这种<em>为商业利益牺牲家族姓氏</em>的操作，被批评者视为功利主义的标本。",
      "<strong>家族疏离：</strong>C罗与父系家族的情感纽带并不紧密——他的父亲在他20岁时因酗酒去世，家庭关系复杂。以中间名行走江湖，某种程度上也<strong>淡化了与“阿威罗”这一父系血脉的联结</strong>，<em>姓名选择折射出微妙的家族态度</em>。",
      "<strong>名实之辩：</strong>当一个巨星的真实姓名与公众认知<strong>南辕北辙</strong>——大家喊的“姓”其实是中间名、真正的姓鲜为人知、缩写CA7无人识得——这场身份营销堪称现代体育商业的奇观。<em>被全世界叫错名字还能乐在其中</em>，本身就是一条现成的“黑历史”。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>本文内容基于公开报道整理，仅供参考。</div>"
    ],
    detailEn:[
      "<strong>The real surname revealed:</strong> Most fans call him 'CR7'; few ever ask what his actual surname is. His full name is <strong>Cristiano Ronaldo dos Santos Aveiro</strong>. The true paternal surname is <em>'Aveiro'</em> — not the 'Ronaldo' everyone assumes.",
      "<strong>The middle-name truth:</strong> 'Ronaldo' is merely his <strong>middle name</strong>, not a family surname. By Portuguese naming convention the correct abbreviation would be <strong>CA7 (Cristiano Aveiro)</strong>, not the universally known CR7. The title the world has yelled for two decades is <em>a middle name sitting where the surname should be</em>.",
      "<strong>The Reagan connection:</strong> The origin of 'Ronaldo' is stranger still — his father José Dinis Aveiro was a diehard fan of former US president <strong>Ronald Reagan</strong>, particularly his early Hollywood films, and so gave his youngest son the middle name 'Ronaldo'. <em>A Portuguese footballer, named after an American actor-turned-president</em>.",
      "<strong>Dumping the paternal surname:</strong> In his commercial branding and public image, Ronaldo has <strong>all but dumped his real paternal surname 'Aveiro'</strong>, building the middle name 'Ronaldo' into a global IP instead. From the CR7 trademark to the chain of hotels, <em>the real surname is deliberately marginalised</em> — commercial calculation or identity reinvention, take your pick.",
      "<strong>Brand reinvention:</strong> Choosing 'Ronaldo' over 'Aveiro' is plainly the <strong>more resonant, more international</strong> brand strategy. 'Aveiro' is hard to pronounce and barely registers beyond the Portuguese-speaking world; 'Ronaldo' trips off the tongue and travels globally. <em>Sacrificing the family surname for commercial gain</em> is, in critics' eyes, textbook utilitarianism.",
      "<strong>Family estrangement:</strong> The deeper reading is that Ronaldo's ties to his father's side of the family were never strong — his father died of alcoholism when he was 20, and relations were complicated. Going by the middle name also <strong>diluted the link to the Aveiro bloodline</strong>; <em>the naming choice reflects a subtle attitude toward the family</em>.",
      "<strong>Name versus reality:</strong> When a superstar's real name and public perception <strong>point in opposite directions</strong> — the world shouts a 'surname' that is actually a middle name, the real surname is barely known, and the abbreviation CA7 is recognised by no one — the identity marketing is a marvel of modern sports business. <em>Being called the wrong name by the whole world, and enjoying it</em>, is a 'dark-history' footnote in itself.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong>This entry is compiled from public reporting and is for reference only.</div>"
    ],
    quote:{text:"把阿韦罗这个父姓给彻底扔了，除了蹭热度并且想要掩盖事实以外，实在是没觉得有什么别的可能。", textEn:"Dropping the surname Aveiro altogether — aside from chasing attention and trying to cover up the facts — I really can't see any other reason.", author:"知乎足球评论", authorEn:"Zhihu football commentary", textEs:"Tirar el apellido Aveiro por completo, además de perseguir atención e intentar tapar los hechos: de verdad no le veo otra explicación.", authorEs:"Comentario de fútbol en Zhihu"},
    tags:["背弃祖姓","Aveiro","Ronaldo","自我营销","蹭热度","中间名","葡萄牙命名"],
    tagsEn:["dropped family surname","Aveiro","Ronaldo","self-promotion","clout-chasing","middle name","Portuguese naming"],
    tagsEs:["renunció al apellido","Aveiro","Ronaldo","autopromoción","buscando protagonismo","segundo nombre","onomástica portuguesa"]
  },
  {
    id:27, cat:"persona", catLabel:"人设争议", severity:3,
    dateIso:"2003-01-01",
    title:"12任女友 · 5个孩子3个妈 — 风流情史",
    titleEn:"12 Girlfriends · 5 Kids, 3 Moms — A Romantic Saga",
    titleEs: "12 novias · 5 hijos, 3 madres — una saga romántica",
    summaryEs: "12 novias, 5 hijos y 3 madres distintas; de ellas, solo 2 identificadas públicamente. La vida privada de Cristiano, convertida en un mercado de fichajes: mucho movimiento, pocas confirmaciones.",
    dateEs: "2003 — presente",
    locationEs: "Global",
    detailEs: [
      "<strong>El balance sentimental:</strong> A lo largo de dos décadas, Cristiano ha tenido <strong>12 relaciones públicas</strong> conocidas, desde modelos hasta dependientas. En la lista figuran nombres como Paris Hilton y Kim Kardashian.",
      "<strong>5 hijos, 3 madres:</strong> Cristiano es padre de <strong>5 hijos</strong>: Cristiano Jr (2010) y los gemelos Eva y Mateo (2017) nacieron por gestación subrogada; Alana (2017) es hija de Georgina Rodríguez; Bella (2022) también de Georgina.",
      "<strong>3 madres distintas:</strong> Los 5 hijos provienen de <strong>3 madres</strong>: la madre biológica de Cristiano Jr (identidad secreta), la madre subrogada de los gemelos y Georgina Rodríguez (madre de Alana y Bella).",
      "<strong>Solo 2 identificadas:</strong> De las 3 madres de sus hijos, solo la subrogada de los gemelos (que no se ha desvelado) y Georgina son conocidas. La madre de Cristiano Jr sigue siendo un misterio guardado bajo acuerdo de confidencialidad.",
      "<strong>El acuerdo de silencio:</strong> La madre de Cristiano Jr, nacido en EE. UU. en 2010, firmó un acuerdo por el que renunciaba a toda reclamación y a su identificación pública a cambio de una suma económica. Cristiano Jr crece sin saber públicamente quién es su madre.",
      "<strong>El «mercado de fichajes»:</strong> Para la prensa del corazón, la vida amorosa de Cristiano es un trasiego constante de fichajes y cesiones: relaciones breves, hijos por subrogación, parejas estables que entran y salen. Un mercado en sí mismo.",
      "<strong>Las 12 relaciones:</strong> Entre las novias conocidas de Cristiano figuran Jordana Jardel, Merche Romero, Nereida Gallardo, Irina Shayk (la relación más larga), Georgina Rodríguez (la pareja actual) y diversas relaciones breves con modelos y celebrities.",
      "<strong>Georgina Rodríguez:</strong> La pareja actual, Georgina Rodríguez, es la única con la que Cristiano ha tenido hijos «de forma natural» y pública (Alana y Bella). El documental «Soy Georgina» de Netflix ha vendido la imagen de familia estable.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> La cifra de 12 relaciones se basa en informaciones de la prensa del corazón. La identidad de las madres por subrogación y de la madre de Cristiano Jr es confidencial.</div>"
    ],



    date:"2003 — 至今",
    dateEn:"2003 — present",
    location:"全球",
    locationEn:"Global",
    img:"assets/images/report/r-27.jpg",
    summary:"41岁的C罗被曝有过12任女友，育有5个孩子，分属3位不同的母亲，仅2位生母身份公开。而现任乔治娜的头衔，也只到“女友”为止。",
    summaryEn:"Ronaldo is reported to have had 12 girlfriends and fathered 5 children by 3 different mothers, only 2 of the mothers ever publicly identified; even current partner Georgina remains a 'girlfriend', not a wife.",
    detail:[
      "<strong>情史丰富：</strong>C罗的感情生活堪称足坛最热闹的“连续剧”，公开与绯闻对象<strong>多达十余位</strong>。从超模到名媛、从模特到服务员，女友名单横跨多个圈层，媒体戏称他“<em>足坛第一海王</em>”。",
      "<strong>希尔顿绯闻：</strong>2000年代，C罗曾与美国社交名媛<strong>帕丽斯·希尔顿（Paris Hilton）</strong>短暂传出绯闻，两人在洛杉矶夜店被多次拍到亲密互动。希尔顿家族的财富光环与C罗的巨星身份，让这段绯闻一度登上全球八卦头条，<em>典型的名利场式恋情</em>。",
      "<strong>卡戴珊插曲：</strong>2010年，C罗又与<strong>金·卡戴珊（Kim Kardashian）</strong>被拍到在马德里同游，绯闻甚嚣尘上。卡戴珊事后在节目里含糊其辞。两段好莱坞名媛绯闻，让C罗的<strong>“情场战绩”</strong>与其球场数据一样备受瞩目，却也难逃“花心”标签。",
      "<strong>伊莲娜五年：</strong>C罗最认真的一段公开恋情，是与俄罗斯超模<strong>伊莲娜·莎伊克（Irina Shayk）</strong>。两人2010年于阿玛尼（Armani）广告拍摄现场相识，相恋<strong>整整五年</strong>，一度谈婚论嫁。然而2015年突然分手，传闻与C罗母亲多洛蕾斯的婆媳矛盾有关，<em>感情败给家庭</em>。",
      "<strong>乔治娜登场：</strong>2016年，C罗在马德里古驰（Gucci）专卖店邂逅了销售员<strong>乔治娜·罗德里格斯（Georgina Rodríguez）</strong>，这段“灰姑娘”式恋情迅速升温并延续至今。乔治娜为C罗生下两个孩子，并以未婚妻身份深度参与CR7商业帝国，<em>从柜姐摇身成为全球网红</em>。",
      "<strong>准岳父是贩毒囚徒：</strong>媒体（The Sun 等）随后挖出，乔治娜的生父<strong>豪尔赫·罗德里格斯（Jorge Rodríguez）</strong>曾因从阿根廷向西班牙<strong>走私可卡因</strong>被判<strong>10年监禁</strong>，并在狱中服刑多年。C罗与一个有此家庭背景的女人订婚，让「人生赢家」的家庭叙事平添一层暗色——豪尔赫是乔治娜的生父、C罗的准岳父，并非C罗血亲；但这份贩毒前科，与C罗苦心经营的「自律、清白」人设摆在一起，足够刺眼。",
      "<strong>五娃三妈：</strong>最具争议的是C罗的<strong>5个孩子疑似来自3位母亲</strong>：长子迷你罗（2010年）生母身份至今成谜，据传为代孕；2017年的双胞胎马特奥与伊娃同样经由代孕出生，代孕母亲另有其人；而阿拉娜（2017年）与贝拉（2022年）则由乔治娜所生。<em>三母五子，一笔糊涂账</em>。",
      "<strong>隐私与争议：</strong>代孕传闻、长子生母签署终身保密协议、多段恋情无缝衔接……C罗的私生活始终<strong>包裹在金钱与隐私协议的迷雾中</strong>。媒体将其塑造成“人生赢家”，但<strong>12任女友、5娃3妈</strong>的情史摆在那里，“好男人”“好父亲”的人设频频受到拷问——<em>而这份档案的其余部分，仍在保密协议的有效期内</em>。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>本文内容基于公开报道整理，仅供参考。</div>"
    ],
    detailEn:[
      "<strong>A prolific love life:</strong> Ronaldo's romantic history is football's most-watched soap, with more than <strong>a dozen</strong> confirmed and rumoured partners. Supermodels, socialites, models, shop assistants — the girlfriend list cuts across every circle, earning him the media nickname '<em>football's biggest player</em>'.",
      "<strong>The Paris Hilton rumour:</strong> In the 2000s Ronaldo was briefly linked to American socialite <strong>Paris Hilton</strong>, with the two repeatedly spotted getting close at Los Angeles nightclubs. The Hilton family fortune plus Ronaldo's superstar status catapulted the rumour onto global gossip pages — <em>a textbook high-society fling</em>.",
      "<strong>The Kim Kardashian interlude:</strong> In 2010 Ronaldo was spotted touring Madrid with <strong>Kim Kardashian</strong>, sparking a furore. Kardashian later played coy on her show, which only deepened the mystery. Two Hollywood socialite rumours made Ronaldo's <strong>'dating record'</strong> as head-turning as his football stats, and the 'player' label stuck.",
      "<strong>Five years with Irina:</strong> Ronaldo's most serious public relationship was with Russian supermodel <strong>Irina Shayk</strong>. They met on the set of an Armani ad in 2010, dated for <strong>five full years</strong> and at one point talked of marriage. They abruptly split in 2015, rumoured to be tied to friction with Ronaldo's mother Dolores — <em>a romance that lost to his family</em>.",
      "<strong>Georgina arrives:</strong> In 2016 Ronaldo met sales assistant <strong>Georgina Rodríguez</strong> at a Gucci boutique in Madrid; the 'Cinderella' romance rapidly heated up and continues to this day. Georgina has borne two of Ronaldo's children and, as his fiancée, is deeply involved in the CR7 business empire — <em>a shop assistant transformed into a global influencer</em>.",
      "<strong>The drug-convict father-in-law:</strong> Media (The Sun etc.) later dug up that Georgina's biological father <strong>Jorge Rodríguez</strong> had been sentenced to <strong>10 years in prison</strong> for <strong>smuggling cocaine</strong> from Argentina to Spain, and served years inside. Ronaldo's engagement to a woman with that family background added a dark tint to the 'man who has it all' narrative. For the record: Jorge is Georgina's biological father (a father-in-law relationship), not Ronaldo's blood relative — but a drug conviction sits jarringly against the painstakingly built 'disciplined, clean' image.",
      "<strong>Five kids, three mums:</strong> Most controversial of all, Ronaldo's <strong>5 children appear to come from 3 mothers</strong>: eldest son Cristiano Jr (2010) has a still-mysterious mother, rumoured to be a surrogate; the 2017 twins Mateo and Eva also arrived via surrogate, by another surrogate mother; while Alana (2017) and Bella (2022) were borne by Georgina. <em>A three-mum, five-kid family tree that needs a flowchart.</em>",
      "<strong>Privacy and controversy:</strong> Surrogacy rumours, the lifetime NDA signed by Cristiano Jr's mother, one relationship blending straight into the next… Ronaldo's private life is forever <strong>shrouded in money and NDAs</strong>. The media paints him as the man who has it all, but the tangled history of <strong>12 girlfriends, 5 kids and 3 mums</strong> keeps pressing against the 'good man', 'good father' image — <em>a controversy the glory can't quite cover</em>.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong> This entry is compiled from public reporting and is for reference only.</div>"
    ],
    tags:["12任女友","5娃3妈","迷你罗生母","代孕","乔治娜","未婚","风流","私生活"],
    tagsEn:["12 girlfriends","5 kids 3 moms","Cristiano Jr's mother","surrogacy","Georgina","unmarried","womaniser","private life"],
    tagsEs:["12 novias","5 hijos 3 madres","madre de Cristiano Jr","gestación subrogada","Georgina","soltero","mujeriego","vida privada"]
  },
  {
    id:28, cat:"persona", catLabel:"人设争议", severity:3,
    dateIso:"2010-06-01",
    title:"迷你罗生母身份成谜 — 代孕封口疑云",
    titleEn:"Cristiano Jr's Mother — Surrogacy & Hush-Money Cloud",
    titleEs: "La madre de Cristiano Jr — la sombra de la subrogación y el dinero",
    summaryEs: "Cuando el primogénito Cristiano Jr nació en EE. UU. en 2010, Cristiano anunció que era padre pero se negó a desvelar la identidad de la madre; un acuerdo millonario mantiene el secreto.",
    dateEs: "Jun 2010 — presente",
    locationEs: "California, EE. UU.",
    detailEs: [
      "<strong>El anuncio:</strong> En junio de 2010, Cristiano anunció en sus redes que había sido padre de un niño, Cristiano Jr, nacido en EE. UU. El comunicado no desveló la identidad de la madre.",
      "<strong>La identidad secreta:</strong> La identidad de la madre biológica de Cristiano Jr permanece en secreto. Se da por hecho que fue una gestación subrogada en California, donde es legal.",
      "<strong>El acuerdo de confidencialidad:</strong> La madre biológica habría firmado un <strong>acuerdo de confidencialidad</strong> por el que renunciaba a todo derecho sobre el niño a cambio de una suma económica. El secreto está blindado.",
      "<strong>La «madre» pública:</strong> Durante años, Cristiano afirmó que él era «madre y padre» de Cristiano Jr. La crianza corrió a cargo de su madre Dolores Aveiro y de sus hermanas, hasta la llegada de Georgina Rodríguez.",
      "<strong>Cristiano Jr y la pregunta incómoda:</strong> Cristiano Jr ha crecido con la pregunta pública sobre la identidad de su madre. Cristiano ha dicho que le contará la verdad «cuando sea el momento adecuado», un momento que nunca llega.",
      "<strong>La sombra de la subrogación:</strong> La gestación subrogada, sobre todo entre famosos millonarios, suscita debate ético. Cristiano es uno de los ejemplos más sonados del fútbol.",
      "<strong>El negocio del secreto:</strong> Para los críticos, el caso de Cristiano Jr retrata a un Cristiano que ha convertido hasta la paternidad en una transacción confidencial. La vida del niño como un secreto industrial.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> La identidad de la madre de Cristiano Jr no es pública. La subrogación es la hipótesis más extendida, basada en informaciones de la prensa internacional.</div>"
    ],



    date:"2010年6月 — 至今",
    dateEn:"Jun 2010 — present",
    location:"美国加利福尼亚",
    locationEn:"California, USA",
    img:"assets/images/report/r-28.jpg",
    summary:"2010年长子迷你罗在美国出生，C罗宣布“当爸爸”却拒绝透露生母身份。据报签署保密协议，生母获巨额封口费，身份至今成谜。",
    summaryEn:"When eldest son Cristiano Jr was born in the US in 2010, Ronaldo announced he was a father but refused to name the mother — reportedly signing an NDA with a huge pay-off. Her identity remains a mystery.",
    detail:[
      "<strong>美国代孕之谜：</strong>2010年6月17日，迷你罗（Cristiano Ronaldo Jr.）出生于美国。C罗一纸声明宣布“喜得贵子”，却对生母身份<em>三缄其口</em>。彼时他正与俄罗斯超模伊莲娜·莎伊克热恋，孩子却并非她所生。恋情见得了光，生母见不了光，外界的议论从这一天起就没停过。",
      "<strong>代理孕母安排：</strong>多家外媒披露，迷你罗由美国加州的<strong>妊娠代孕</strong>（gestational surrogate）所生，相关手续全程在幕后办妥。C罗团队把每个环节都封得严严实实，知情者寥寥，连最亲近的圈内人也不例外——一场分娩，办出了机密行动的规格。",
      "<strong>封口协议传闻：</strong>坊间盛传C罗与生母签有数额惊人的<strong>保密协议</strong>，据称涉及数百万美元的“买断”费用。生母在分娩后即放弃一切抚养权与探视权，随即从公众视野里彻底蒸发。",
      "<strong>“去母留子”争议：</strong>这种只取孩子、不留母亲的模式被批评为<em>把生命当商品</em>。伦理学者质疑其将代孕商业化推到极致，孩子的身份认同、生母的心理创伤，皆被巨额金钱与明星光环所掩盖。",
      "<strong>罗家独家叙事：</strong>C罗母亲多洛雷斯曾多次对外宣称“孩子是家族血脉”，并亲自抚养迷你罗长大。整个家族刻意塑造“无母家庭”叙事，将生母从故事中彻底抹去，仿佛孩子是从石头里蹦出来的。",
      "<strong>狗仔多年追踪：</strong>十多年来，英国《太阳报》、葡萄牙媒体穷追不舍，先后抛出“英国女学生”“美国服务员”“墨西哥裔代孕者”等多种版本，但无一获得实锤。生母身份至今仍是<em>足坛第一未解之谜</em>，比任何转会传闻都更扑朔迷离。",
      "<strong>孩子长大后的疑问：</strong>如今迷你罗已十五六岁。据报他曾向父亲追问生母身份，得到的答复却是“等合适的时候再告诉你”。一个连自己从何而来都不被允许知道的孩子，童年被父亲的隐私执念<em>绑架</em>。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>本文内容基于公开报道整理，仅供参考。</div>"
    ],
    detailEn:[
      "<strong>The US surrogacy mystery:</strong> On 17 June 2010, Cristiano Ronaldo Jr was born in the United States. Ronaldo announced via a statement that he had 'become a father' but stayed <em>tight-lipped</em> on the mother's identity. At the time he was dating Russian supermodel Irina Shayk — the child was not hers. That timeline mismatch fed years of speculation.",
      "<strong>The surrogacy arrangement:</strong> Multiple international outlets reported that Cristiano Jr was born via <strong>gestational surrogacy</strong> in California, the paperwork quietly completed behind the scenes. Ronaldo's team sealed every step so tightly that even close insiders rarely knew.",
      "<strong>The NDA rumour:</strong> It was widely rumoured that Ronaldo signed a <strong>non-disclosure agreement</strong> with the mother, reportedly running into millions of dollars. After the birth she renounced all custody and visitation rights and vanished from public view.",
      "<strong>The 'take the child, lose the mother' controversy:</strong> The arrangement — take the child, discard the mother — was slammed as <em>commodifying life</em>. Ethicists argued it pushed commercial surrogacy to its extreme, with the child's identity and the birth mother's trauma buried under money and stardust.",
      "<strong>The Aveiro family's narrative:</strong> Ronaldo's mother Dolores repeatedly claimed publicly that 'the child is family bloodline' and personally raised Cristiano Jr. The whole family cultivated a deliberate 'no-mother family' narrative, erasing the mother from the story entirely — as if the child had sprung from a stone.",
      "<strong>Paparazzi on the trail:</strong> For over a decade Britain's The Sun and Portuguese outlets chased the story, serving up 'a British student', 'an American waitress', 'a Mexican surrogate' in turn — none ever confirmed. The mother's identity remains <em>football's greatest unsolved mystery</em>, more tangled than any transfer rumour.",
      "<strong>Questions as the child grows:</strong> Cristiano Jr is now around fifteen; reportedly he has pressed his father about his mother's identity, only to be told 'I will tell you when the time is right'. A child not even allowed to know where he came from, his childhood <em>held hostage</em> by his father's obsession with privacy.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong>This entry is compiled from public reporting and is for reference only.</div>"
    ],
    tags:["迷你罗","生母成谜","代孕","保密协议","封口费","美国出生","抚养权"],
    tagsEn:["Cristiano Jr","mother's identity mystery","surrogacy","NDA","hush money","US-born","custody"],
    tagsEs:["Cristiano Jr","misterio de la madre","gestación subrogada","acuerdo de confidencialidad","dinero de silencio","nacido en EE.UU.","custodia"]
  },
  {
    id:29, cat:"offpitch", catLabel:"场外失态", severity:3,
    dateIso:"2004-01-01",
    title:"抢点球 · 抢任意球 · 自私独狼行为",
    titleEn:"Hogging Penalties & Free-Kicks — The Lone-Wolf Selfishness",
    titleEs: "Acapara penales y faltas — el ego del lobo solitario",
    summaryEs: "Arrebata el lanzamiento de penales a sus compañeros, se pelea con Bruno por las faltas, pide que anulen el gol de un compañero y monopoliza hasta el último balón parado.",
    dateEs: "Varios momentos de la carrera",
    locationEs: "Múltiples clubes / selección",
    detailEs: [
      "<strong>Acaparar los penales:</strong> Cristiano monopoliza el lanzamiento de penales en todos sus equipos. United, Real Madrid, Juve, Al Nassr, Portugal: en todos, lanzador indiscutido — venga como venga la cosa.",
      "<strong>La riña con Bruno:</strong> En el United, Cristiano llegó a enfrentarse con Bruno Fernandes por el lanzamiento de las faltas. La imagen de los dos discutiendo quién lanzaba se hizo viral y retrata el ego del portugués.",
      "<strong>Pedir anular un gol de un compañero:</strong> En más de una ocasión, Cristiano ha celebrado el gol de un compañero para, acto seguido, reclamar al árbitro que el último toque era suyo. La autoría goleadora, por delante del gol del equipo.",
      "<strong>Monopolizar los balones parados:</strong> Todos los córners, todas las faltas directas, todos los tiros libres los lanza Cristiano. Los compañeros, aunque estén mejor colocados, no tienen opción a tirar.",
      "<strong>El «stat-padding»:</strong> La obsesión por acaparar tiros se traduce en números inflados: Cristiano lanza muchos más tiros por partido que cualquier compañero y bate récords goleadores con una eficacia cuestionable.",
      "<strong>El contraste con Messi:</strong> Mientras Messi cede el lanzamiento de penales a compañeros (Neymar, Suárez, Mbappé) en determinados momentos, Cristiano nunca renuncia a un penal. La diferencia de estilo es clamorosa.",
      "<strong>El precio para el equipo:</strong> Para los críticos, esta actitud de lobo solitario lastra al equipo: compañeros frustrados, juego predecible (todo para Cristiano) y un ego por encima del colectivo.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> Los datos de lanzamientos de penales y faltas de Cristiano son verificables. La valoración sobre el impacto en el equipo es objeto de debate.</div>"
    ],



    date:"职业生涯各时期",
    dateEn:"Various points in career",
    location:"多俱乐部 / 国家队",
    locationEn:"Multiple clubs / national team",
    img:"assets/images/report/r-29.jpg",
    summary:"抢队友点球主罚权、与B费争任意球、进球后举手示意队友越位、拒绝传球——C罗的「独狼」做派贯穿整部职业生涯。",
    summaryEn:"Penalty duties snatched off teammates, free-kicks fought over with Bruno, waving for a teammate's goal to be ruled offside, the pass that never comes — Ronaldo's lone-wolf streak runs through his whole career.",
    detail:[
      "<strong>点球垄断实锤：</strong>皇马「BBC」时期，C罗几乎包揽球队所有点球主罚权。贝尔公开吐槽：「我和他比过任意球，<em>训练里我总能赢</em>，但比赛中点球和任意球都归他，这不公平。」训练里能赢的是贝尔，比赛里站上球前的永远是C罗。",
      "<strong>任意球霸权：</strong>单赛季俱乐部射门数据摆在那：C罗<strong>135次</strong>，贝尔50次、本泽马60次。任意球更是他的「私人禁区」——距离角度再不合理，标志性站姿一摆，球就是他的，队友负责围观。",
      "<strong>与贝尔的暗战：</strong>2014-15赛季，贝尔多次被拍到在C罗主罚任意球时面露不悦，主罚权之争几近白热化。媒体统计过：若按进球效率分配，贝尔的任意球转化率<em>远高于</em>C罗——可惜球权从不按效率分配。",
      "<strong>本泽马的隐忍：</strong>「绿叶型」前锋本泽马，长期给C罗当策应者与挡拆墙。镜头捕捉到本泽马进球后，C罗不庆祝，反而因为自己没吃到饼，转头向裁判<em>抱怨</em>——团队精神沦为笑柄。",
      "<strong>数据凌驾团队：</strong>C罗对个人进球数的执念近乎病态：曾有一场大胜，他因自己没进球，面带不悦离场。皇马名宿古蒂直言：「他有时把<strong>个人数据</strong>看得比球队胜利更重。」更衣室氛围，就是这么被毒化的。",
      "<strong>葡萄牙队的延续：</strong>到了国家队，剧本照旧：点球、任意球照单全收。2022世界杯，他罚丢点球，葡萄牙节奏大乱；2024欧洲杯，他罚失点球当场<em>痛哭</em>——个人荣辱排在全队前面，队友还得反过来安慰他。",
      "<strong>自私的代价：</strong>把「我的进球」排在「我们的胜利」前面，「领袖气质」就成了独裁的遮羞布。贝尔远走、本泽马长期背锅——BBC组合的瓦解，与这种<strong>资源独占</strong>脱不了干系。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>本文内容基于公开报道整理，仅供参考。</div>"
    ],
    detailEn:[
      "<strong>Penalty monopoly, the receipts:</strong> In Real Madrid's 'BBC' era Ronaldo took virtually every penalty going. Gareth Bale put it on record: 'I competed with him on free-kicks, <em>I always won in training</em>, but in matches the penalties and free-kicks all went to him, it's not fair.' One complaint that said everything about life in a superstar's shadow.",
      "<strong>Free-kick hegemony:</strong> In a single club season Ronaldo racked up <strong>135 shots</strong>, to Bale's 50 and Benzema's 60. Free-kicks were his 'private reserve' — no matter how absurd the distance or angle, there he was over the ball in the signature pose, teammates watching.",
      "<strong>The cold war with Bale:</strong> In the 2014-15 season Bale was caught on camera time and again, visibly unhappy, as Ronaldo lined up the free-kicks — the contest over duties all but white-hot. Media tallies had Bale's free-kick conversion rate <em>far higher</em> than Ronaldo's. The ball still never went to him.",
      "<strong>Benzema's forbearance:</strong> The 'supporting' forward spent years as Ronaldo's foil and shield. Cameras once caught Benzema scoring, only for Ronaldo to <em>complain to the referee</em> about not getting the assist — team spirit reduced to a punchline.",
      "<strong>Stats over team:</strong> Ronaldo's obsession with his personal goal tally bordered on the pathological — he once walked off visibly unhappy after a big win in which he had not scored. Real legend Guti said it outright: 'He sometimes rates his <strong>personal stats</strong> above the team's win.' That self-centred value system poisoned the dressing room.",
      "<strong>Continued at Portugal:</strong> At international level he monopolised penalties and free-kicks all the same. At the 2022 World Cup he missed a penalty that disrupted Portugal's rhythm; at Euro 2024 he missed another and <em>wept on the pitch</em>, personal pride placed above the team while teammates had to come and console him.",
      "<strong>The price of selfishness:</strong> When a player puts 'my goals' above 'our wins', so-called leadership becomes a fig leaf for autocracy. Bale eventually chose to leave, Benzema shouldered the blame for years, and the BBC trio's breakup was not unconnected to this <strong>monopoly on resources</strong>.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong>This entry is compiled from public reporting and is for reference only.</div>"
    ],
    tags:["抢点球","抢任意球","B费","自私","独狼","不传球","头发丝","个人数据"],
    tagsEn:["penalty theft","free-kick theft","Bruno Fernandes","selfishness","lone wolf","won't pass","tip-in goal theft","personal stats"],
    tagsEs:["robo de penalti","robo de tiro libre","Bruno Fernandes","egoísmo","lobo solitario","no pasa el balón","gol robado de peinada","estadísticas personales"]
  },
  {
    id:30, cat:"persona", catLabel:"人设争议", severity:2,
    dateIso:"2004-01-01",
    title:"绰号“水罗” — 假摔编年史",
    titleEn:"Nickname 'Penaldo' — A Chronology of Dives",
    titleEs: "El apodo «Penaldo» — una cronología de piscinas",
    summaryEs: "Piscina contra Francia en el Mundial, piscina contra el Boro en la FA Cup: el Cristiano primerizo se hizo célebre como «simulador». En 2007, Ferguson quiso defenderlo y soltó: «Ronaldo ya no se tira».",
    dateEs: "2004 — 2007 (etapa en el United)",
    locationEs: "Premier League / Mundial",
    detailEs: [
      "<strong>El origen del apodo:</strong> El Cristiano de sus primeros años en el United (2004-2007) hizo de la simulación su marca de la casa. Cada roce dentro del área acababa en caída exagerada y reclamo de penalti.",
      "<strong>Piscina contra Francia (2006):</strong> En el Mundial 2006, Cristiano se tiró dentro del área ante Francia: una piscina de manual. El árbitro no pitó nada y la imagen dio la vuelta al mundo.",
      "<strong>Piscina en la FA Cup:</strong> En la FA Cup contra el Middlesbrough, Cristiano sumó otra simulación escandalosa. La prensa inglesa lo bautizó para siempre como «<strong>diver</strong>» (simulador).",
      "<strong>La metedura de pata de Ferguson:</strong> En 2007, Sir Alex Ferguson salió a defenderlo en una entrevista: «<strong>Ronaldo ya no se tira</strong>». El problema es que la defensa equivalía a admitir que antes sí se tiraba.",
      "<strong>El nacimiento de «Penaldo»:</strong> De sumar «Penal» (penalti) y «Ronaldo» nació el apodo despectivo «<strong>Penaldo</strong>», que se popularizó para señalar su dependencia de los penales y su tendencia a la piscina.",
      "<strong>La evolución del apodo:</strong> Con los años, Cristiano dejó de tirarse tanto, pero «Penaldo» se quedó y se recicló: ahora apunta a su dependencia goleadora de los penales (de los que es máximo goleador histórico).",
      "<strong>El legado:</strong> Para los haters, «Penaldo» resume toda la carrera de Cristiano: sin penales y sin simulaciones, sería mucho menos de lo que dicen las cifras. El apodo que no ha podido quitarse de encima.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> Las simulaciones de Cristiano en sus primeros años están documentadas en vídeo. La frase de Ferguson es real (entrevista de 2007).</div>"
    ],



    date:"2004 — 2007 (曼联时期)",
    dateEn:"2004 — 2007 (Man United era)",
    location:"英超 / 世界杯",
    locationEn:"Premier League / World Cup",
    img:"assets/images/report/r-30.jpg",
    summary:"世界杯对法国假摔、足总杯对米堡假摔——早期C罗以“爱跳水”著称，弗格森2007年的口误则替他盖了章：“罗纳尔多已经不假摔了。”",
    summaryEn:"Diving against France at the World Cup, diving against Boro in the FA Cup — early Ronaldo was notorious as a 'diver'; in 2007 Ferguson produced the Freudian slip 'Ronaldo doesn't dive any more'.",
    detail:[
      "<strong>曼联时期的“跳水王子”：</strong>初登老特拉福德的C罗，以花哨脚法和<em>夸张倒地</em>闻名英超。2003-06年间，他场均被铲倒的次数，远远赶不上他倒地的次数，“假摔罗”（Diving Ronaldo）的恶名不胫而走，连主场球迷都曾发出嘘声。",
      "<strong>弗格森的尴尬辩护：</strong>2008年，面对媒体对C罗假摔的追问，弗格森爵士脱口而出“他已经<em>不假摔了</em>”——本意维护爱徒，却当场坐实了“曾经假摔”，就此成为足坛经典口误，被段子手传颂至今。",
      "<strong>2006世界杯“眨眼门”：</strong>英葡大战中，鲁尼踩踏卡瓦略被罚下，C罗冲裁判施压后向葡萄牙替补席<em>狡黠眨眼</em>，被镜头完整捕捉。这一“算计成功”的信号，让全英格兰视他为阴险小人，回曼联后遭漫天嘘声长达数月。",
      "<strong>世界杯假摔争议：</strong>2018世界杯对阵伊朗，C罗在禁区内轻微接触后夸张倒地被黄牌警告；2022世界杯他声称“碰到头发”破门——赛后FIFA不得不将进球改判给B费，那记<strong>头部接触</strong>的成色，算是有了官方鉴定。",
      "<strong>西甲时期的延续：</strong>效力皇马期间，C罗多次因禁区内的表演性倒地被西班牙媒体嘲讽。一场国家德比中，他面对皮克轻微贴身便如遭雷击般翻滚，慢镜头显示两人<em>几乎无接触</em>，“影帝”之名再添一笔。",
      "<strong>沙特联赛的“老油条”：</strong>年近四旬转战沙特，C罗的假摔并未收敛。2023年一场联赛中，他在禁区内的鱼跃冲顶式倒地被VAR识破，主裁果断出示黄牌，<strong>老将的职业素养</strong>遭到本土媒体集体嘲讽。",
      "<strong>假摔的遗产：</strong>从英超到世界杯，从西甲到沙特，C罗用二十年时间把“假摔”修炼成了一门艺术。他那夸张的翻滚与捂脸，已成为足球反面的<strong>标志性符号</strong>，比任何进球集锦都更深入人心。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>本文内容基于公开报道整理，仅供参考。</div>"
    ],
    detailEn:[
      "<strong>United's 'diving prince':</strong> The freshly-arrived Ronaldo at Old Trafford traded in flashy footwork and <em>exaggerated falls</em>. Between 2003 and 2006 the ratio of times he was tackled to times he actually went down was badly skewed; the 'Diving Ronaldo' reputation spread, and even home fans occasionally jeered.",
      "<strong>Ferguson's awkward defence:</strong> In 2008, pressed by the media over Ronaldo's diving, Sir Alex Ferguson blurted out 'he doesn't dive <em>any more</em>' — a defence of his player that instead <strong>confirmed he used to dive</strong>. A footballing classic Freudian slip, still mercilessly recycled by meme-makers.",
      "<strong>The 2006 World Cup 'wink-gate':</strong> In the England-Portugal quarter-final, Rooney was sent off for stamping on Carvalho. Ronaldo pressured the referee, then <em>slyly winked</em> at the Portuguese bench — captured perfectly by the cameras. The 'mission accomplished' signal made all of England cast him as the scheming villain, and on his return to United he was jeered for months.",
      "<strong>World Cup diving controversies:</strong> At the 2018 World Cup against Iran, Ronaldo went down theatrically after minimal box contact and was booked; at the 2022 World Cup he claimed a 'hair-touch' goal that FIFA later reattributed to B. Fernandes — <strong>the exaggeration of the head contact</strong> spoke for itself.",
      "<strong>La Liga years continued:</strong> At Real Madrid the Spanish press repeatedly mocked Ronaldo for theatrical falls in the box. In one El Clásico, at the lightest of contact from Piqué he rolled as if struck by lightning; slow motion showed <em>almost no contact</em> — another entry on his 'Oscar-winner' résumé.",
      "<strong>The Saudi-era 'old hand':</strong> Approaching 40 in Saudi, Ronaldo's diving did not let up. In a 2023 league match his diving-header-style tumble in the box was caught by VAR; the referee showed a yellow without hesitation, and <strong>the veteran's professionalism</strong> was collectively mocked by the local media.",
      "<strong>The diving legacy:</strong> From the Premier League to the World Cup, from La Liga to Saudi Arabia, over twenty years Ronaldo turned 'diving' into an art. His exaggerated rolls and face-clutching are an <strong>iconic symbol of football's dark side</strong>, more deeply etched in memory than any goal compilation.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong> This entry is compiled from public reporting and is for reference only.</div>"
    ],
    quote:{text:"罗纳尔多已经不假摔了。", textEn:"Ronaldo doesn't dive anymore.", author:"弗格森，2007年口误", authorEn:"Alex Ferguson, 2007 slip of the tongue", textEs:"Ronaldo ya no se tira.", authorEs:"Alex Ferguson, metedura de pata en 2007"},
    tags:["水罗","假摔","跳水","世界杯","法国","米堡","弗格森口误","鲁尼红牌","眨眼"],
    tagsEn:["Dive-ldo","diving","diving","World Cup","France","Middlesbrough","Ferguson slip","Rooney red card","the wink"],
    tagsEs:["Penaldo simulador","simulación","simulación","Mundial","Francia","Middlesbrough","lapsus de Ferguson","roja a Rooney","el guiño"]
  },
  {
    id:31, cat:"persona", catLabel:"人设争议", severity:2,
    dateIso:"2004-01-01",
    title:"绰号“花罗” — 华而不实的花活期",
    titleEn:"Nickname 'Showboat' — The Flashy-Stepovers Era",
    titleEs: "El apodo «Showboat» — la era de los stepovers farolillo",
    summaryEs: "Enganchado a los stepovers y al lucimiento, fue burlado en Inglaterra como «showboat»; Van Nistelrooy y Smith se pillaron con él en los entrenamientos por su estilo «todo lujo, cero pase».",
    dateEs: "2004 — 2007 (primera etapa en el United)",
    locationEs: "Old Trafford",
    detailEs: [
      "<strong>El estilo farolillo:</strong> El Cristiano primerizo estaba enganchado a los <strong>stepovers</strong> (pisadas o bicicletas): encadenaba docenas de amagues de pierna por partido, mareando al rival — y a veces a sí mismo.",
      "<strong>El apodo «Showboat»:</strong> La prensa inglesa lo bautizó como «<strong>Showboat</strong>» (farolillo, todo estilo y cero sustancia): para los ingleses, Cristiano era puro postureo sobre el césped.",
      "<strong>Stepovers sin entrega:</strong> El problema no era el lujo; era que muchos de esos stepovers no terminaban en nada: ni pase, ni dispar, ni asistencia. Puro exhibicionismo estéril.",
      "<strong>Las peleas en el entrenamiento:</strong> <strong>Ruud van Nistelrooy</strong> y <strong>Alan Smith</strong>, goleadores más veteranos, se hartaron del estilo «todo lujo, cero pase» de Cristiano y se pillaron con él.",
      "<strong>La bronca con Van Nistelrooy:</strong> La tensión estalló en una discusión sonada entre Cristiano y Van Nistelrooy. Ferguson, viendo el potencial del portugués, acabó vendiendo al holandés para respaldar a Cristiano.",
      "<strong>Los conjuntos estrafalarios:</strong> Fuera del campo, Cristiano reforzó su imagen de «showboat» con <strong>conjuntos estrafalarios</strong>: camisas abotonadas, gafas de sol, peinados coloristas. El postureo como seña de identidad.",
      "<strong>La evolución:</strong> Con los años, Cristiano depuró su estilo y eliminó buena parte del exhibicionismo. Pero el apodo «Showboat» y la imagen del Cristiano farolillo se le quedaron pegados como marca de su juventud.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> El estilo de Cristiano en el United está documentado en vídeo. La bronca con Van Nistelrooy en los entrenamientos fue recogida por la prensa inglesa.</div>"
    ],



    date:"2004 — 2007 (曼联早期)",
    dateEn:"2004 — 2007 (early United era)",
    location:"老特拉福德",
    locationEn:"Old Trafford",
    img:"assets/images/report/r-31.jpg",
    summary:"沉迷盘带、痴迷花活，被英格兰人讽刺为「Showboat」（华而不实）。范尼和史密斯因他贻误战机与其冲突，斯科尔斯当面教训。",
    summaryEn:"Hooked on stepovers and showing off, he was mocked in England as a 'showboat'; Van Nistelrooy and Smith clashed with him over wasted attacks, and Scholes lectured him to his face.",
    detail:[
      "<strong>踩单车成瘾：</strong>初出茅庐的C罗，最招牌的动作便是<em>踩单车</em>（stepovers）。一场比赛能连踩七八下，球却没过几个人——英国解说戏称其为「花式单车表演赛」，过人效率低得可怜。",
      "<strong>被钉上「Showboat」：</strong>英国小报给他贴上「Showboat」（华而不实）的标签，批评他只顾炫技、不顾团队。对阵富勒姆一战，C罗连续踩单车后被对手轻松断球，<strong>花活翻车</strong>的名场面至今在集锦里循环播放。",
      "<strong>加里·内维尔的吐槽：</strong>这位曼联老臣回忆，更衣室里队友曾集体劝C罗「少踩两下、多传一脚」。老队员们看不惯这个葡萄牙小子把球场当马戏团，称他「<em>只为自己表演</em>，不为球队赢球」。",
      "<strong>弗格森的「驯化」：</strong>爵爷花了整整三年，才把C罗从「踩单车杂技演员」改造成高效射手。要求很明确：减少无效盘带、增加终结能力，否则这棵苗子可能永远停留在<em>花瓶阶段</em>。",
      "<strong>旧病复发：</strong>年岁渐长、效率下滑时，C罗总会不自觉地捡起踩单车这门老本行。2021年回归曼联后，他在某些场次重现踩单车，被新一代球迷嘲笑「<strong>老戏骨</strong>重出江湖」。",
      "<strong>花活的原罪：</strong>踩单车本无原罪，问题在于C罗早期把它当成炫技工具、而非过人手段。当花哨凌驾于实用之上，足球便沦为<em>个人秀场</em>——这也为他日后「个人数据至上」的行事风格埋下伏笔。",
      "<strong>标签比动作长寿：</strong>年岁上去，C罗也确实打磨了风格，剔除了大量炫技。但「Showboat（炫技者）」的绰号与踩单车的形象，至今仍是他青春期的印记。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>本文内容基于公开报道整理，仅供参考。</div>"
    ],
    detailEn:[
      "<strong>Addicted to stepovers:</strong> The newly-arrived Ronaldo's signature move was the <em>stepover</em>. He could rattle off seven or eight in a single play without beating anybody — English commentary called it the 'stepover showcase' — and his actual take-on efficiency was pitifully low.",
      "<strong>The flashy 'Showboat':</strong> The English tabloids stamped the label on him — flash over teamwork, tricks over end product. In one match against Fulham, Ronaldo ran through a string of stepovers only to be cleanly dispossessed; the <strong>trick-reel fail</strong> still loops in highlight packages.",
      "<strong>Gary Neville's quip:</strong> United veteran Neville recalled the dressing room's collective plea — 'do fewer stepovers, play one more pass'. The old guard had no patience for a Portuguese kid treating the pitch like a circus, dismissing him as '<em>only performing for himself, not for the team's wins</em>'.",
      "<strong>Ferguson's 'taming':</strong> It took Sir Alex three whole years to remake Ronaldo from 'stepover acrobat' into a high-efficiency striker. The demand was explicit — fewer useless dribbles, more finishing — or the talent might have stalled forever in the <em>ornament phase</em>.",
      "<strong>Relapse in the goal drought:</strong> As age rose and efficiency dipped, Ronaldo would unconsciously reach for the old bag of tricks. After his 2021 return to United he revived stepovers in patches, and new-generation fans mocked the '<strong>old ham</strong> on a comeback' — to counter-productive effect.",
      "<strong>The essence of showboating:</strong> The stepover is not sinful in itself — the sin was in the deployment. Early Ronaldo used it as a showing-off tool rather than a take-on weapon, and when flash overrides substance, football degenerates into a <em>personal show</em>; the seeds of the later 'stats above all' style were planted right here.",
      "<strong>The evolution:</strong> Over the years Cristiano refined his game and shed much of the sterile showboating. The 'Showboat' nickname and the stepover image stuck anyway — the enduring hallmark of his youth.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong>This entry is compiled from public reporting and is for reference only.</div>"
    ],
    tags:["花罗","SHOWBOAT","花活","盘带","范尼冲突","斯科尔斯","华而不实","曼联早期"],
    tagsEn:["Showboat Cristiano","SHOWBOAT","showboating","dribbling","Van Nistelrooy clash","Scholes","all flash no substance","early United years"],
    tagsEs:["Cristiano exhibicionista","SHOWBOAT","exhibicionismo","regate","bronca con Van Nistelrooy","Scholes","puro espectáculo","primeros años en United"]
  },
  {
    id:34, cat:"persona", catLabel:"人设争议", severity:2,
    dateIso:"2018-01-01",
    title:"“鸡你太美”式网络梗 — C罗的球迷文化反噬",
    titleEn:"'Factos'-style Memes — Fan-Culture Backlash",
    titleEs: "Memes estilo «Factos» — el boomerang de la cultura de fans",
    summaryEs: "«Ronaldo 3 votos», «ejército de un solo hombre», «dios bajado», «siuuu»: los eslóganes de marketing de Cristiano acabaron reciclados como memes satíricos por la cultura hater china.",
    dateEs: "2018 — presente",
    locationEs: "Internet chino",
    detailEs: [
      "<strong>«Ronaldo 3 votos»:</strong> En 2011, Cristiano sacó solo 3 votos en el premio al Mejor Jugador de la UEFA. Los fans chinos lo bautizaron «罗三票» (3 votos), apodo que se quedó como símbolo de su ridículo en aquella votación.",
      "<strong>«Ejército de un solo hombre»:</strong> El eslogan de marketing de Cristiano como «ejército de un solo hombre» (one-man army) se volvió contra él: los haters lo usan con sorna para burlarse de su egocentrismo.",
      "<strong>«Dios bajado»:</strong> Los fans devotos de Cristiano lo presentaban como un «dios bajado a la tierra»; los haters reciclaron la frase en memes que yuxtaponen su imagen divina con sus payasadas sobre el césped.",
      "<strong>«Siuuu»:</strong> La celebración «SIUUU» de Cristiano se convirtió en meme global. Para los haters, el grito es la representación perfecta del ego de Cristiano: una celebración propia, registrada como marca, por delante del equipo.",
      "<strong>«Factos»:</strong> La palabra «Factos» (hechos), que Cristiano soltó bajo el post de Messi tras perder el Balón de Oro 2021, se convirtió en el meme por antonomasia del portugués: grito de guerra de su ego herido.",
      "<strong>La cultura hater china:</strong> En plataformas como Bilibili, Zhihu y 虎扑, Cristiano ha generado toda una cultura de memes satíricos: apodos (球玊, 阿伟罗, 骡子) y recopilaciones de sus «momentos bizarros».",
      "<strong>El boomerang:</strong> Todo este material nace del propio marketing de Cristiano: eslóganes pomposos, celebraciones grandilocuentes, frases pretenciosas. La cultura hater china lo recicla y lo vuelve contra él.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> Los memes y apodos citados forman parte de la cultura de fans/haters china. Son sátira de internet, no afirmaciones literales.</div>"
    ],



    date:"2018 — 至今",
    dateEn:"2018 — present",
    location:"中文互联网",
    locationEn:"Chinese internet",
    img:"assets/images/report/r-34.jpg",
    summary:"从“罗三票”到“一己之力”，从“天神下凡”到“siuuu”——C罗的营销话术在中文互联网演变成了无数梗，最终反噬其形象。",
    summaryEn:"From 'Ronaldo 3 votes' to 'one-man army', from 'god descending' to 'siuuu' — the slogans that once sold Ronaldo now circulate as countless memes on the Chinese internet, and they sell against him.",
    detail:[
      "<strong>Factos之夜：</strong>2021年梅西第七次拿金球奖后，C罗在粉丝帖子下留言“<em>Factos</em>”（事实），引发全网狂欢。B站、微博、抖音上“Factos”迅速成为C罗“破防”的代名词，恶搞视频播放量动辄百万，球迷文化彻底<em>娱乐化</em>。",
      "<strong>B站梗百科生态：</strong>UP主们围绕C罗量产“梗百科”“足球梗指南”系列，“世界杯非梦想”“姆巴佩公式”“被豪门嫌弃”“禁区外无威胁”一路铺开，攒出一套成体系的<strong>恶搞内容矩阵</strong>，粉丝与黑粉在此激烈交锋。",
      "<strong>罗黑罗粉的阵营对立：</strong>中文互联网上，“罗黑”与“罗粉”两大阵营水火不容。一条C罗进球的微博下，能吵出几千层高楼；一个梅西相关视频里，必有C罗粉丝来“抢戏”。这种<em>部落化对立</em>，让理性讨论几无可能。",
      "<strong>“给你俩窝窝”的传染：</strong>梅西的“给你俩窝窝”（Qué mirás, bobo）火遍全网后，C罗在比赛中竟也模仿起这一手势，被球迷嘲讽“<strong>连梗都要抄</strong>”。球员本人被网络文化反向“洗脑”。",
      "<strong>喊梅西刺激C罗：</strong>沙特联赛中，客队球迷集体高喊“梅西！梅西！”挑衅C罗，他一次次绷不住，曾以不雅手势回敬，结果遭禁赛处罚。这种<em>线下玩梗反噬</em>，让网络恶搞走出屏幕，直接砸在他的职业生涯上。",
      "<strong>“抽象文化”的受害者：</strong>“siu”“刀削面”“吕七优人”“罗三脚”——C罗几乎每个动作都被做成表情包、鬼畜视频。他既是流量密码，也是<strong>抽象文化</strong>最大的祭品，个人形象在狂欢中被拆得支离破碎。",
      "<strong>反噬的代价：</strong>当一位传奇沦为全民鬼畜素材，其历史地位便在笑声中被悄然稀释。C罗或许没想到，自己最“持久”的遗产，竟是在<em>中文互联网的梗图里</em>永生，而非在球场之上。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>本文内容基于公开报道整理，仅供参考。</div>"
    ],
    detailEn:[
      "<strong>The Factos night:</strong> After Messi won his seventh Ballon d'Or in 2021, Ronaldo commented '<em>Factos</em>' (facts) under a fan post — and set off a worldwide carnival. On Bilibili, Weibo and Douyin, 'Factos' quickly became shorthand for Ronaldo 'melting down'; parody videos routinely hit a million views, and fan culture became pure entertainment.",
      "<strong>The Bilibili meme-ecology:</strong> Content creators built a vast library of 'meme-encyclopaedia' and 'football meme guide' series around Ronaldo — from 'the World Cup isn't my dream' to 'the Mbappé formula', from 'rejected by elite clubs' to 'no threat outside the box' — a systematic <strong>meme matrix</strong> where fans and anti-fans clash fiercely.",
      "<strong>Camp antagonism:</strong> On the Chinese internet the 'CR7-haters' and 'CR7-stans' are two irreconcilable camps. A single Ronaldo-goal Weibo post can spawn thousands of comment layers; any Messi video will see Ronaldo fans barge in to 'steal the scene'. This <em>tribalism</em> makes rational discussion virtually impossible.",
      "<strong>The 'Qué mirás, bobo' contagion:</strong> After Messi's 'Qué mirás, bobo' (what are you looking at, fool) went viral, Ronaldo was even caught imitating the gesture during a match, mocked by fans for '<strong>copying even the memes</strong>'. A player being reverse-assimilated by internet culture — magic realism at work.",
      "<strong>'Messi!' to provoke Ronaldo:</strong> In the Saudi league, away fans chant 'Messi! Messi!' in unison to provoke Ronaldo; he has repeatedly melted down and once retaliated with an obscene gesture, earning a suspension. This <em>offline meme blowback</em> has directly affected the player's career.",
      "<strong>Victim of 'abstract culture':</strong> From 'siu' to the 'noodle-slice', from 'Lyu Qi You Ren' to the 'Ronaldo three-kick', virtually every Ronaldo move is turned into stickers and parody videos. He is both an engagement goldmine and the <strong>biggest sacrificial offering of 'abstract culture'</strong>, his personal image dismembered in the carnival.",
      "<strong>The price of blowback:</strong> When a legend is reduced to whole-nation parody material, his historical standing is quietly diluted in laughter. Ronaldo probably never imagined that his most 'enduring' legacy would be immortality <em>in the meme library of the Chinese internet</em>, rather than on the pitch.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong>This entry is compiled from public reporting and is for reference only.</div>"
    ],
    tags:["网络梗","罗三票","一己之力","天神下凡","siuuu","自律人设","欧冠之王","球迷文化","反噬"],
    tagsEn:["internet meme","Three-Vote Ronaldo","one-man show","god-mode claim","siuuu","discipline persona","King of the UCL","fan culture","backlash"],
    tagsEs:["meme de internet","Cristiano Tres Votos","espectáculo en solitario","presunción de divinidad","siuuu","imagen de disciplina","Rey de la Champions","cultura de afición","reacción negativa"]
  },
  {
    id:35, cat:"persona", catLabel:"人设争议", severity:3,
    dateIso:"2006-01-01",
    title:"CR7商业帝国 — 自恋式个人品牌",
    titleEn:"CR7 Business Empire — A Narcissistic Personal Brand",
    titleEs: "El imperio comercial CR7 — una marca personal narcisista",
    summaryEs: "Cristiano ha convertido «CR7» en un imperio que abarca hoteles, ropa interior, fragancias y moda; pero la marca en sí es una apropiación: abandona el apellido Aveiro y se queda con el segundo nombre «Ronaldo».",
    dateEs: "2006 — presente",
    locationEs: "Global",
    detailEs: [
      "<strong>El origen de «CR7»:</strong> «CR7» son las iniciales de «Cristiano Ronaldo» más su dorsal 7. La marca nació en 2006, cuando Cristiano empezó a explotar comercialmente su imagen por todo el mundo.",
      "<strong>Los hoteles «Pestana CR7»:</strong> En sociedad con el grupo hotelero portugués Pestana, Cristiano ha abierto hoteles «Pestana CR7» en Lisboa, Funchal, Madrid, Nueva York y Marrakech. Un imperio hotelero con su marca.",
      "<strong>Ropa interior CR7:</strong> Cristiano ha lanzado varias líneas de ropa interior «CR7» con campañas protagonizadas por él mismo, semidesnudo. La obsesión por su propio cuerpo como herramienta de marketing.",
      "<strong>Fragancias CR7:</strong> Ha puesto su nombre a varias fragancias. El imperio se extiende a relojes, calcetines, vaqueros — cualquier producto con el sello «CR7» se vende a base de su imagen.",
      "<strong>La apropiación del nombre:</strong> La paradoja: la marca «CR7» abandona el apellido familiar real (Aveiro) y se queda con el segundo nombre (Ronaldo). Una marca construida sobre una mentira nominal.",
      "<strong>El narcisismo como producto:</strong> Para los críticos, el imperio CR7 es la cumbre del narcisismo: la propia imagen como producto, el propio cuerpo como reclamo, el propio nombre (manipulado) como sello.",
      "<strong>El negocio y las cifras:</strong> El imperio CR7 mueve cientos de millones de euros al año. Cristiano es, según Forbes, uno de los deportistas mejor pagados del mundo en buena parte gracias a sus negocios personales.",
      "<strong>El balance:</strong> Un imperio comercial formidable — pero construido sobre la apropiación del nombre y el narcisismo como producto. La marca CR7 es la culminación del Cristiano que se vende a sí mismo.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> El imperio comercial CR7 es real y verificable. La valoración ética sobre «narcisismo» y «apropiación del nombre» es la tesis crítica de este archivo.</div>"
    ],



    date:"2006 — 至今",
    dateEn:"2006 — present",
    location:"全球",
    locationEn:"Global",
    img:"assets/images/report/r-35.jpg",
    summary:"C罗将“CR7”打造成覆盖酒店、内衣、香水、服装的商业帝国——但“CR7”本身就是一个背弃祖姓的符号，用蹭热度的Ronaldo而非家族姓Aveiro。",
    summaryEn:"Ronaldo built 'CR7' into an empire spanning hotels, underwear, fragrances and fashion — a brand that betrays his own surname, trading on the trendy 'Ronaldo' rather than the real family name, Aveiro.",
    detail:[
      "<strong>CR7帝国版图：</strong>从2006年注册CR7商标起，C罗打造了横跨<strong>酒店、内裤、香水、健身房、植发诊所</strong>的商业帝国，成为史上首位职业生涯总收入突破10亿美元的团队运动员。而帝国真正的拳头产品，只有铺天盖地的自我推销。",
      "<strong>Pestana CR7酒店：</strong>与葡萄牙Pestana集团合作的CR7生活方式酒店，开遍里斯本、马德里、纽约、马拉喀什。每家酒店都挂满他的巨幅肖像与球衣，住客仿佛入住<em>个人神庙</em>——房卡即门票。",
      "<strong>内裤与香水：</strong>CR7内裤系列广告里，C罗半裸展示肌肉，巨幅海报曾占领纽约时代广场。香水线同样主打“他本人就是香味”的逻辑，连产品名都直接叫“<strong>CR7</strong>”，品牌即本人，本人即品牌。",
      "<strong>自恋式营销：</strong>从ins粉丝数全球第一，到每个进球后对着镜头摆pose，再到纪录片《我是C罗》，他将<em>个人崇拜</em>商业化到了极致。一位营销专家评价：“他卖的不是产品，是他自己的崇拜感。”",
      "<strong>植发诊所Insparya：</strong>C罗投资了连锁植发机构Insparya，本人却一头浓密卷发，被网友戏称“自己不用，专门卖给别人”。这种<strong>精准收割焦虑</strong>的商业嗅觉，与其说是精明，不如说是投机。",
      "<strong>Museu CR7 个人崇拜神庙：</strong>2013年，C罗在故乡马德拉丰沙尔开设<strong>Museu CR7 博物馆</strong>，后又开到里斯本。馆内陈列他的金球奖复制品、球衣、巨幅雕像——一座活人给自己建的「封神庙」。批评者直言：在世运动员为自己立博物馆，是<strong>自恋的终极形态</strong>，把对自我的崇拜明码标价卖给了游客。",
      "<strong>私人岛与电影公司：</strong>据《太阳报》报道，C罗名下还有私人岛屿、电影工作室、板球场馆等资产，7EGEND图片公司专门经营其肖像权。一个球员把自己活成<em>跨国集团</em>，足球反倒成了副业。",
      "<strong>商业帝国的阴影：</strong>当一名运动员把太多精力投入商业版图，竞技状态迟早买单。2021年回归曼联后，C罗场外的代言、纪录片、ins更新比进球更勤，被批评“<strong>本末倒置</strong>”，把球场当成了商业秀场。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>本文内容基于公开报道整理，仅供参考。</div>"
    ],
    detailEn:[
      "<strong>The CR7 empire map:</strong> Since registering the CR7 trademark in 2006, Ronaldo has built an empire spanning <strong>hotels, underwear, fragrance, gyms and a hair-transplant clinic</strong>, becoming the first team-sport athlete to surpass $1 billion in career earnings. Behind the 'success' is the empire's real flagship: relentless self-promotion.",
      "<strong>Pestana CR7 hotels:</strong> The CR7 lifestyle hotels, co-branded with Portugal's Pestana group, dot Lisbon, Madrid, New York and Marrakech. Every property is plastered with giant portraits and shirts of him — guests check into what feels like a <em>personal temple</em>.",
      "<strong>Underwear and fragrance:</strong> In CR7 underwear ads Ronaldo poses half-naked to flex his muscles; giant billboards once took over Times Square in New York. The fragrance line operates on the same logic — 'he himself is the scent' — with every product named simply '<strong>CR7</strong>'. The brand is the man; the man is the brand.",
      "<strong>Narcissistic marketing:</strong> From holding the world's most-followed Instagram account, to the pose for the cameras after every goal, to the documentary 'I Am Ronaldo', he commercialised the <em>personality cult</em> to its very limit. One marketing expert quipped: 'He isn't selling products — he's selling the worship of himself.'",
      "<strong>The Insparya hair clinic:</strong> Ronaldo invested in the Insparya hair-transplant chain, yet boasts a thick head of curls himself, prompting jokes that 'he doesn't need it but sells it to others'. That nose for <strong>harvesting anxiety</strong> is less 'smart' than 'opportunistic'.",
      "<strong>The Museu CR7 personality-cult temple:</strong> In 2013 Ronaldo opened the <strong>Museu CR7</strong> in his hometown of Funchal, Madeira, later adding a Lisbon outpost. The museum displays replicas of his Ballon d'Or trophies, shirts and giant statues — a 'personality cult temple' built by a living man for himself. Critics are blunt: an active athlete building his own museum is <strong>the ultimate form of narcissism</strong>, pricing self-worship for tourists.",
      "<strong>Private island and film studio:</strong> According to The Sun, Ronaldo also owns a private island, a film studio, a cricket ground and other assets, with the 7EGEND image company managing his image rights. A player who has turned himself into a <em>multinational conglomerate</em>, with football almost a side hustle.",
      "<strong>The shadow on the empire:</strong> When an athlete pours this much energy into business, his sporting form inevitably suffers. After his 2021 return to United, the endorsements, documentaries and Instagram updates came more often than the goals — '<strong>putting the cart before the horse</strong>', critics said, and turning the pitch into a commercial showcase.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong>This entry is compiled from public reporting and is for reference only.</div>"
    ],
    quote:{text:"除了在球场上拼搏之外，场下C罗也一直在打造着属于自己的CR7系列，渗入到了衣饰、香水、酒店等多种行业。", textEn:"Beyond the fight on the pitch, Ronaldo has kept building his CR7 line off it, branching into clothing, fragrances, hotels and more.", author:"肆客足球", authorEn:"Sike Football commentary", textEs:"Además de luchar en el campo, fuera de él Cristiano no ha parado de construir su línea CR7, que se ramifica en moda, fragancias, hoteles y más.", authorEs:"Comentario de Sike Football"},
    tags:["CR7","商业帝国","自恋品牌","酒店","内衣","香水","背弃祖姓","蹭热度","Aveiro"],
    tagsEn:["CR7","business empire","narcissistic brand","hotel","underwear","fragrance","dropped family surname","clout-chasing","Aveiro"],
    tagsEs:["CR7","imperio empresarial","marca narcisista","hotel","ropa interior","perfume","renunció al apellido","buscando protagonismo","Aveiro"]
  },
  {
    id:36, cat:"club", catLabel:"俱乐部与法律", severity:4,
    dateIso:"2023-01-01",
    title:"沙漠骆驼 — 4年才拿1个沙特冠军",
    titleEn:"Desert Camel — 4 Years for 1 Saudi Title",
    titleEs: "El Camello del Desierto — 4 años para 1 título saudí",
    summaryEs: "En 2023 fichó por el Al Nassr con un megacontrato; la prensa europea lo ridiculizó: estaba «huyendo de Europa para jubilarse en el desierto». Esperó 3,5 años y 4 temporadas para ganar por fin 1 título de liga saudí.",
    dateEs: "Ene 2023 — May 2026",
    locationEs: "Riad, Arabia Saudí",
    detailEs: [
      "<strong>El fichaje bomba:</strong> En enero de 2023, tras rescindir con el United, Cristiano fichó por el <strong>Al Nassr</strong> de Arabia Saudí con un contrato estratosférico: <strong>200 millones de euros al año</strong>, el mayor salario del fútbol mundial.",
      "<strong>«Huir al desierto»:</strong> La prensa europea lo ridiculizó: Cristiano «huía de Europa para jubilarse en el desierto». Se marchaba de la élite europea a los 37 años para cobrar una fortuna en una liga menor.",
      "<strong>La espera del título:</strong> Lo que se vendió como un pase triunfal se convirtió en una travesía del desierto — y el desierto no era solo metafórico. Cristiano tardó <strong>3,5 años y 4 temporadas completas</strong> en ganar su primer título de liga saudí.",
      "<strong>El contraste con Messi:</strong> Mientras Cristiano esperaba 4 años por 1 título saudí, <strong>Messi ganó un trofeo (Leagues Cup) al mes de aterrizar en el Inter de Miami</strong>. Un contraste entre los dos GOATs que no necesita adjetivos.",
      "<strong>«El Camello del Desierto»:</strong> De esta etapa nació el apodo «<strong>El Camello del Desierto</strong>»: un doble sentido — por un lado, la pulla geográfica (Arabia = desierto); por otro, la metáfora de que «carga stats pero no sale del desierto».",
      "<strong>La primera liga (2025-26):</strong> Por fin, en mayo de 2026, el Al Nassr se proclamó campeón de la Saudi Pro League. Cristiano, de 41 años, lloró de emoción: tras 4 años, su primer —y único— título de liga saudí.",
      "<strong>El balance:</strong> 4 años, 200 M€ anuales y solo 1 título de liga. Para los haters, el paso de Cristiano por Arabia es la prueba de que el dinero no compra títulos ni éxito deportivo: solo cifras goleadoras.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> El fichaje de Cristiano por el Al Nassr en 2023 y su primer título saudí en 2026 son hechos verificables. El apodo «El Camello» forma parte de la cultura hater.</div>"
    ],



    date:"2023年1月 — 2026年5月",
    dateEn:"Jan 2023 — May 2026",
    location:"沙特利雅得",
    locationEn:"Riyadh, Saudi Arabia",
    img:"assets/images/report/r-36.jpg",
    summary:"2023年高薪加盟沙特利雅得胜利，被讽“逃避欧洲去沙漠养老”。足足等了3年半、4个赛季，直到2026年5月才拿到第一个沙特联赛冠军——这期间利雅得新月多次力压夺冠。",
    summaryEn:"Drawing a mega-salary at Al Nassr in 2023, mocked as 'fleeing Europe to retire in the desert', he then needed 3.5 years and 4 seasons — until May 2026 — for his first Saudi league title, pipped time and again by Al Hilal.",
    detail:[
      "<strong>四年磨一冠：</strong>2022年12月加盟利雅得胜利，C罗足足等了<strong>四年</strong>，才在2025-26赛季拿到沙特联赛冠军。梅西加盟迈阿密国际，<em>一个月</em>后就捧起了联赛杯。",
      "<strong>前三个赛季的颗粒无收：</strong>2022-23、2023-24、2024-25三个赛季，C罗个人进球数不少，利雅得胜利却在联赛中屡屡被利雅得新月压制——<strong>三连亚</strong>。数据是自己的，奖杯是别人的。",
      "<strong>点球占比的尴尬：</strong>细看C罗在沙特的进球构成，有赛季联赛进球<strong>近三分之一</strong>来自点球，运动战效率远不如巅峰期，“水罗”之讥并非空穴来风。",
      "<strong>对比梅西的刺痛：</strong>梅西2023年7月加盟迈阿密，8月便率队夺得联赛杯，<em>首月即夺冠</em>；C罗在沙特苦熬四年才等来联赛冠军。两人境遇之悬殊，成了梅罗对立中C罗粉丝最不愿提及的痛点。",
      "<strong>第四次的侥幸：</strong>2025-26赛季，利雅得新月阵容老化、伤病频发，利雅得胜利才趁势夺冠。媒体直言这是C罗<strong>运气使然</strong>，而非其领袖能力的体现——若非对手拉胯，恐仍是“老二命”。",
      "<strong>夺冠后的奇怪手势：</strong>夺冠庆典上，C罗做出一连串抽象手势，被中国网友戏称“刀削面动作”，再次成为网络恶搞素材。一个等了四年的冠军，收获的不是敬意，而是<em>新一轮鬼畜</em>。",
      "<strong>沙漠的真相：</strong>所谓的“沙特夺冠”，是在联赛水平有限、对手主动让位的前提下取得的。C罗用四年时间证明的不是伟大，而是<strong>英雄迟暮</strong>——在一片质疑声中，勉强为自己挽回最后一点颜面。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>本文内容基于公开报道整理，仅供参考。</div>"
    ],
    detailEn:[
      "<strong>Four years for one title:</strong> After joining Al Nassr in December 2022, Ronaldo needed a full <strong>four years</strong> to lift the Saudi Pro League title, which only arrived in the 2025-26 season. For comparison: Messi won a league cup <em>a month</em> after joining Inter Miami.",
      "<strong>Three trophyless seasons:</strong> In 2022-23, 2023-24 and 2024-25, Ronaldo's personal goal tally stayed healthy, but Al Nassr kept finishing behind Al Hilal — <strong>second three times in a row</strong>. The numbers were his; the collective honours were not.",
      "<strong>The penalty-share embarrassment:</strong> The penalty share in Ronaldo's Saudi goals stays stubbornly high. In some seasons <strong>nearly a third</strong> of his league goals came from the spot, with open-play efficiency far below his peak — the 'Penaldo' jibe writes itself.",
      "<strong>The sting of the Messi contrast:</strong> Messi joined Inter Miami in July 2023 and by August had led them to the Leagues Cup, <em>a title in his first month</em>; Ronaldo ground through four years in Saudi before winning anything. In the Messi-Ronaldo rivalry, this became the comparison his fans found hardest to swallow.",
      "<strong>Fourth time lucky:</strong> In the 2025-26 season, with Al Hilal ageing and injury-hit, Al Nassr capitalised to take the title. The press filed it under Ronaldo's <strong>luck of the draw</strong> rather than any proof of leadership — without the opponent's stumble, the 'perennial runner-up' tag might have stuck.",
      "<strong>The strange celebration gesture:</strong> At the title celebrations Ronaldo reeled off a string of abstract gestures that Chinese fans dubbed the 'noodle-slicing move', once again turning himself into meme material. A title four years in the waiting brought not respect but <em>a fresh wave of parody videos</em>.",
      "<strong>The desert truth:</strong> The so-called 'Saudi title' was won in a league of limited standard, and only after the rivals stepped aside. Four years in Saudi proved not greatness but <strong>a hero in his twilight</strong> — barely salvaging the last shred of face amid a chorus of doubt.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong>This entry is compiled from public reporting and is for reference only.</div>"
    ],
    quote:{text:"来到沙特快4年！C罗，终于在联赛夺冠了！", textEn:"Almost 4 years in Saudi Arabia! Ronaldo finally wins the league title!", author:"澎湃新闻2026年5月22日报道标题", authorEn:"The Paper, May 22, 2026 headline", textEs:"¡Casi 4 años en Arabia Saudí! ¡Cristiano por fin gana la liga!", authorEs:"Titular de The Paper, 22 de mayo de 2026"},
    tags:["沙漠骆驼","沙特联赛","利雅得胜利","4年1冠","逃避欧洲","养老","2亿年薪","利雅得新月"],
    tagsEn:["desert camel","Saudi Pro League","Al Nassr","4 years 1 title","fleeing Europe","retirement league","€200M yearly wage","Al Hilal"],
    tagsEs:["camello del desierto","Liga saudí","Al Nassr","4 años 1 título","huida de Europa","liga de retiro","200 M€ de sueldo anual","Al Hilal"]
  },
  {
    id:38, cat:"offpitch", catLabel:"场外失态", severity:3,
    dateIso:"2024-01-01",
    title:"“刀削面”动作 + 怪异行为合集",
    titleEn:"'Noodle-Slicing' Move + Bizarre Antics Compilation",
    titleEs: "El gesto «corta-fideos» + recopilación de payasadas",
    summaryEs: "En la liga saudí, Cristiano les regaló a los aficionados el gesto de «cortar fideos» que se hizo viral; Bilibili recoge sus «30 momentos más bizarros»: gestos obscenos, bufandas en el pantalón y demás.",
    dateEs: "2024 — presente",
    locationEs: "Saudi Pro League",
    detailEs: [
      "<strong>El «corta-fideos»:</strong> En un partido de la Saudi Pro League 2024, Cristiano, a la salida del campo, les dedicó a los aficionados rivales un gesto <strong>bizarro</strong> que se hizo viral: movía las manos como si cortara fideos (o pelo), en una extraña celebración/provocación.",
      "<strong>El vídeo viral:</strong> Las imágenes del «corta-fideos» corrieron por redes y plataformas como Bilibili, donde los usuarios chinos las reciclaron en memes. El gesto carecía de sentido aparente, y ahí estaba la gracia.",
      "<strong>«30 momentos abstractos»:</strong> La plataforma Bilibili (el «YouTube chino») recoge un vídeo recopilatorio titulado «<strong>Los 30 momentos más abstractos/bizarros de Cristiano</strong>»: gestos raros, obscenos, bufandas, etc.",
      "<strong>Los gestos obscenos:</strong> El «corta-fideos» se suma a la larga lista de gestos extraños de Cristiano: el bombeo obsceno en la entrepierna, la bufanda metida en el pantalón, el dedo corazón a la grada y demás payasadas.",
      "<strong>La «factoría de memes»:</strong> En la cultura hater, Cristiano ya es material inagotable: cada partido saudí, una nueva entrega de «momentos bizarros» que alimentan las recopilaciones de internet.",
      "<strong>El contraste con la imagen:</strong> Para los críticos, este repertorio choca de frente con la imagen de «profesional impecable» que Cristiano vende. El ídolo «disciplinado» protagonizando semejantes gestos.",
      "<strong>El balance:</strong> El «corta-fideos» y la recopilación de «30 momentos abstractos» retratan la faceta más ridícula de Cristiano en Arabia: un jugador de 41 años haciendo payasadas mientras sus rivales le ganan la partida.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> El gesto «corta-fideos» está documentado en vídeo. La recopilación de Bilibili es real, aunque su tono es satírico.</div>"
    ],



    date:"2024年 — 至今",
    dateEn:"2024 — present",
    location:"沙特联赛",
    locationEn:"Saudi Pro League",
    img:"assets/images/report/r-38.jpg",
    summary:"C罗在沙特联赛对球迷做出的“刀削面”式怪异手势被全网恶搞，B站甚至有“C罗30大抽象行为排行榜”专门收录他的怪异举动。",
    summaryEn:"In the Saudi league Ronaldo made a 'noodle-slicing' gesture at the fans, and it duly went viral; Bilibili hosts a 'Top 30 Abstract Ronaldo Moments' ranking dedicated to his bizarre behaviour.",
    detail:[
      "<strong>夺冠庆典的抽象手势：</strong>2026年沙特联赛捧杯之夜，C罗在领奖台上比划出一连串令人费解的手势，被中国网友戏称“<em>刀削面动作</em>”——双手如削面般上下翻飞，神情夸张，活脱脱一场行为艺术。",
      "<strong>B站的鬼畜狂欢：</strong>该手势被UP主制成大量鬼畜视频，配上《刀削面》《拉面哥》BGM，点击量动辄数十万。网友戏言“C罗退役后可以去山西开面馆”，<strong>恶搞文化</strong>再次把他的“抽象”送上风口浪尖。",
      "<strong>沙特赛场的不雅手势：</strong>更早之前，2024年2月，C罗因对球迷做出被视为“猥亵/挑衅”的手势，被沙特足协<strong>禁赛一场</strong>。他辩称是“误会”，但官方不买账，处分照执行，形象再度受损。",
      "<strong>回应“梅西”挑衅：</strong>沙特国王杯客场比赛中，主队球迷齐声高喊“梅西！梅西！”挑衅，C罗连续做出“<em>闭嘴</em>”手势回敬，场面一度紧张。这种一碰就炸的心理素质，成了对手球迷的“流量密码”。",
      "<strong>撇嘴与耸肩：</strong>不止手势，C罗在沙特期间的撇嘴、耸肩、翻白眼等微表情也被逐帧截图，制成表情包传播。一个简单的赛后采访，都能被解读出<strong>八百种“心机”</strong>，他俨然成了“抽象文化”的活体素材。",
      "<strong>Siu庆祝的变味：</strong>曾经标志性的“Siu”庆祝，如今也被玩坏。C罗本人在某些场次刻意减少Siu，改用其他怪异动作，结果新动作又被恶搞，一头栽进“<em>越想低调越被关注</em>”的怪圈。",
      "<strong>怪异行为的本质：</strong>从刀削面到闭嘴手势，答案并不复杂：一位状态下滑的老将，试图用<em>博眼球</em>维持存在感。当一个传奇只能靠动作出圈，其足球价值便已所剩无几。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>本文内容基于公开报道整理，仅供参考。</div>"
    ],
    detailEn:[
      "<strong>The abstract title-celebration gesture:</strong> At the 2026 Saudi Pro League title celebration, Ronaldo worked through a string of baffling gestures on the podium, until Chinese fans dubbed the routine the '<em>noodle-slicing move</em>' — hands flailing up and down like a chef shaving noodles, expression exaggerated, the whole thing pure performance art.",
      "<strong>The Bilibili parody carnival:</strong> Content creators recut the gesture into countless parody videos, set to BGM titled 'Noodle-Slicing' or 'Noodle-Brother', routinely racking up hundreds of thousands of views. Fans joked that 'Ronaldo can open a noodle shop in Shanxi after he retires' — <strong>parody culture</strong> once again pushed his 'abstract' moments onto the front page.",
      "<strong>The Saudi-pitch obscene gesture:</strong> Earlier, in February 2024, Ronaldo was <strong>banned one match</strong> by the Saudi FA for a gesture toward fans deemed 'obscene / provocative'. He called it 'a misunderstanding'; the authorities did not buy it, the punishment stood — another blow to the image.",
      "<strong>Answering the 'Messi' provocation:</strong> In an away Saudi King's Cup match, home fans chanted 'Messi! Messi!' in unison to provoke Ronaldo, who answered with repeated '<em>shush</em>' gestures as the scene briefly turned tense. This hair-trigger temperament has become the 'engagement magnet' for opposition fans.",
      "<strong>Smirks and shrugs:</strong> Beyond gestures, the lip-curls, shrugs and eye-rolls of his Saudi stint have been captured frame by frame and turned into stickers and memes. A single post-match interview can be read in <strong>800 different 'scheming' ways</strong>; the man has become a living specimen of 'abstract culture'.",
      "<strong>The Siu celebration goes sour:</strong> Even the once-signature 'Siu' is thoroughly played out. In some matches Ronaldo deliberately cut back on the Siu and switched to other weird moves, only for the new ones to be parodied in turn — a '<em>the more low-key he tries to be, the more attention he gets</em>' vicious circle that leaves him stuck either way.",
      "<strong>The essence of bizarre behaviour:</strong> From the noodle-slice to the shush gestures, these 'bizarre behaviours' reflect a veteran in decline trying to maintain presence through <em>attention-seeking</em>. When a legend can only stay relevant through his moves, his football value is largely spent.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong> This entry is compiled from public reporting and is for reference only.</div>"
    ],
    tags:["刀削面","怪异行为","抽象","B站","抖音","恶搞","30大抽象行为","挑衅球迷","手势"],
    tagsEn:["noodle-slice","bizarre antics","absurdist","Bilibili","Douyin (TikTok)","parody","30 absurd acts","provoking fans","gesture"],
    tagsEs:["tiro de fideo","actitudes raras","absurdo","Bilibili","Douyin (TikTok)","parodia","30 actos absurdos","provoca a la afición","gesto"]
  },
  {
    id:39, cat:"offpitch", catLabel:"场外失态", severity:4,
    dateIso:"2025-11-01",
    title:"采访神语录 — “世界杯不是我的梦想”",
    titleEn:"Quote Madness — 'The World Cup Is Not My Dream'",
    titleEs: "Locura de frases — «El Mundial no es mi sueño»",
    summaryEs: "En noviembre de 2025, Cristiano volvió a sentarse con Piers Morgan y soltó perlas como «el Mundial no es mi sueño» y «soy el primero, segundo y tercero mejor de la historia».",
    dateEs: "Nov 2025 (entrevista con Piers Morgan)",
    locationEs: "TalkTV, Reino Unido",
    detailEs: [
      "<strong>La segunda entrevista con Morgan:</strong> En noviembre de 2025, Cristiano volvió a sentarse con Piers Morgan (el mismo de la entrevista-bomba contra el United de 2022). El resultado, otra vez: una sarta de frases para enmarcar.",
      "<strong>«El Mundial no es mi sueño»:</strong> Tras 6 Mundiales sin levantar el trofeo, Cristiano soltó: «<strong>el Mundial no es mi sueño</strong>». La frase, una pirueta retórica para encajar el fracaso, se hizo viral al instante.",
      "<strong>«Soy el 1.º, 2.º y 3.º»:</strong> No conforme, recicló su clásico: «<strong>soy el primero, segundo y tercero mejor jugador de la historia</strong>». Una autoproclamación que ya forma parte de la mitología (y de los memes) de Cristiano.",
      "<strong>El contexto del fracaso:</strong> La entrevista se emitió semanas antes del Mundial 2026, donde Cristiano, a sus 41 años, caería eliminado en octavos sin marcar (salvo un gol en 16avos). El «no es mi sueño» sonó a excusa anticipada.",
      "<strong>La cultura del meme:</strong> Estas frases se sumaron al catálogo Cristiano: «Factos», «pregunta por mí», «el Mundial no es mi sueño». El portugués es una mina de memes: tono pretencioso, poca autocrítica.",
      "<strong>El contraste con Messi:</strong> Mientras Messi, recién campeón del mundo, mantenía un perfil bajo y agradecido, Cristiano seguía soltando frases grandilocuentes. El contraste de estilos alimenta el debate del GOAT.",
      "<strong>El balance:</strong> Una entrevista plagada de frases autoproclamatorias y excusas ante el fracaso mundialista inminente. Para sus haters, más material para la colección; para sus fans, «confianza en sí mismo».",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> La entrevista de Cristiano con Piers Morgan en noviembre de 2025 es real. Las frases son literales, recogidas por TalkTV.</div>"
    ],



    date:"2025年11月 (皮尔斯·摩根专访)",
    dateEn:"Nov 2025 (Piers Morgan interview)",
    location:"英国 TalkTV",
    locationEn:"TalkTV, UK",
    img:"assets/images/report/r-39.jpg",
    summary:"2025年11月，C罗再次接受皮尔斯·摩根专访，“世界杯不是我的梦想”“我就是历史最佳”接连出口，被梅西和葡萄牙队友公开反驳。",
    summaryEn:"In November 2025 Ronaldo sat down with Piers Morgan again, dropping lines like 'the World Cup is not my dream' and 'I am the best in history' — publicly rebutted by Messi and his Portugal teammates.",
    detail:[
      "<strong>2025摩根专访：</strong>2025年11月，40岁的C罗再度接受老朋友皮尔斯·摩根的专访。这一次，他干脆把话挑明——“<em>世界杯对我来说不是梦想</em>”。话音未落，全球舆论已经炸锅，他被批“自我开脱到无以复加”。",
      "<strong>原话曝光：</strong>C罗原话是：“如果你问我，‘克里斯蒂亚诺，赢得世界杯是梦想吗？’不，它不是。凭什么用一项赛事、六场七场比赛，来<strong>定义</strong>我是不是历史最佳？”此言一出，足坛哗然。",
      "<strong>“历史第一第二第三”：</strong>他紧接着重申那句老掉牙的论调——“我是<em>历史第一、第二、第三</em>球员”。把自己捧上神坛，又拿不出世界杯来佐证，这套逻辑闭环被Goal.com批为“荒谬至极的自嗨”。",
      "<strong>对队友的背叛感：</strong>最受伤的是葡萄牙队友。Reddit上有评论直言：“听到队长说世界杯不是梦想，作为队友该多<em>心寒</em>。”一群人为世界杯拼命，换来的却是队长一句“不稀罕”。",
      "<strong>梅西夺冠的阴影：</strong>这番话的时间点很微妙——梅西2022年已率阿根廷捧起世界杯，彻底补齐“GOAT最后拼图”。C罗此时说“世界杯不重要”，被普遍解读为<strong>吃不到葡萄说葡萄酸</strong>的心理防御。",
      "<strong>巴西等国的反驳：</strong>足球王国巴西的媒体、名宿纷纷发声，强调世界杯是“每个球员的终极梦想”。贝利、罗纳尔多的遗产摆在那里，C罗一句“不重要”，在<strong>足球文化</strong>层面显得既无知又傲慢。",
      "<strong>采访的反噬：</strong>摩根的本意是帮C罗“洗白”，结果适得其反。ESPN、BBC等主流媒体齐声批评，球迷嘲讽他“嘴硬”。这场专访没能重塑形象，只让C罗“<em>输不起还要装</em>”的人设更加根深蒂固。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>本文内容基于公开报道整理，仅供参考。</div>"
    ],
    detailEn:[
      "<strong>The 2025 Morgan interview:</strong> In November 2025, the 40-year-old Ronaldo sat down with old friend Piers Morgan for another session. This time the product was '<em>the World Cup is not a dream for me</em>' — global opinion detonated on cue, and the line was promptly slammed as 'self-justification taken to the extreme'.",
      "<strong>The exact quote:</strong> Ronaldo's words: 'If you ask me, \"Cristiano, is winning the World Cup a dream?\" No, it is not. Why should one tournament, six or seven matches, <strong>define</strong> whether I'm the best in history?' The football world erupted.",
      "<strong>'First, second and third in history':</strong> He immediately re-ran the tired refrain — 'I am the <em>first, second and third</em> player in history'. Self-canonisation with no World Cup to back it up; Goal.com slammed it as 'an absurd exercise in self-delusion'.",
      "<strong>Teammates feel betrayed:</strong> The most wounded were his own Portugal teammates. One Reddit comment put it bluntly: 'Hearing the captain say the World Cup isn't a dream — how <em>chilling</em> for the teammates.' A whole squad fighting for the World Cup, and the captain's verdict on the enterprise: 'I don't care'.",
      "<strong>The shadow of Messi's title:</strong> The timing could hardly have been worse: Messi had led Argentina to the 2022 World Cup, completing 'the GOAT's final puzzle'. Ronaldo's 'the World Cup doesn't matter' was widely read as <strong>sour grapes</strong>, a psychological defence.",
      "<strong>Brazil and others push back:</strong> Brazilian media and legends from the football kingdom weighed in to stress that the World Cup is 'every player's ultimate dream'. With the legacies of Pelé and Ronaldo (R9) staring him down, Ronaldo's 'it doesn't matter' looked both ignorant and arrogant at the level of <strong>football culture</strong>.",
      "<strong>The interview's blowback:</strong> Morgan presumably meant to 'rehabilitate' Ronaldo; it backfired. ESPN, the BBC and other mainstream outlets unanimously criticised; fans mocked his 'stubbornness'. The interview did not reshape his image — it set Ronaldo's '<em>sore loser who still fronts</em>' persona in deeper.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong>This entry is compiled from public reporting and is for reference only.</div>"
    ],
    quote:{text:"世界杯不是我的梦想。我就是历史第一、第二、第三。", textEn:"The World Cup is not my dream. I am the first, second and third best in history.", author:"C罗，2025年11月皮尔斯·摩根专访", authorEn:"Cristiano, Nov 2025 Piers Morgan interview", textEs:"El Mundial no es mi sueño. Soy el primero, segundo y tercero mejor de la historia.", authorEs:"Cristiano, entrevista con Piers Morgan, noviembre de 2025"},
    tags:["摩根专访","世界杯不是梦想","历史最佳","GOAT","梅罗对立","酸葡萄","反复无常","B费反驳"],
    tagsEn:["Piers Morgan interview","World Cup not my dream","all-time great","GOAT","Messi-CR7 rivalry","sour grapes","inconstancy","Bruno F. rebuts"],
    tagsEs:["entrevista con Piers Morgan","el Mundial no es mi sueño","mejor de la historia","GOAT","rivalidad Messi-CR7","uvas verdes","inconstancia","réplica de Bruno F."]
  },
  {
    id:40, cat:"persona", catLabel:"人设争议", severity:2,
    dateIso:"2024-01-01",
    title:"“吕七优人” — C罗的日文恶搞名",
    titleEn:"'Lyu Qi You Ren' — A Japanese-Style Meme Name",
    titleEs: "«Lyu Qi You Ren» — un nombre en clave estilo japonés",
    summaryEs: "El viaje de Cristiano a Japón en 2024 encendió un meme: los internautas chinos transcribieron su nombre a un kanji estilo japonés, «Lyu Qi You Ren», cuya lectura fonética era una burla.",
    dateEs: "Sobre 2024 (internet chino)",
    locationEs: "Internet chino / Bilibili / Zhihu",
    detailEs: [
      "<strong>El viaje a Japón:</strong> En 2024, Cristiano hizo una gira por Japón que dejó abundante material en redes (entrenamientos, eventos comerciales, encuentros con fans); las imágenes circularon por internet.",
      "<strong>El meme del kanji:</strong> Los internautas chinos, en Bilibili y Zhihu, transcribieron el nombre de Cristiano a un <strong>kanji estilo japonés</strong>: «<strong>Lyu Qi You Ren</strong>» (una transliteración fonética). El nombre se leyó como una burla.",
      "<strong>La broma fonética:</strong> Al leer «Lyu Qi You Ren» en chino, salía una frase que se prestaba a la sátira. La broma se convirtió en meme en la comunidad hater.",
      "<strong>La cultura del apodo:</strong> El meme se suma a la larga tradición china de inventar apodos satíricos para Cristiano: 球玊 (Ball-King), 阿伟罗 (Ah-Wei), 骡子 (el Burro), y ahora «Lyu Qi You Ren».",
      "<strong>El juego transcultural:</strong> La broma funciona solo en el cruce de idiomas: un nombre portugués, transcrito a kanji japonés, leído en chino. Una pirueta lingüística típica de la cultura de internet china.",
      "<strong>La dimensión viral:</strong> El meme se extendió por Bilibili (el «YouTube chino») y Zhihu (el «Quora chino»), con vídeos y debates satíricos sobre el «nuevo nombre japonés» de Cristiano.",
      "<strong>El balance:</strong> Un meme lingüístico que retrata hasta qué punto Cristiano es material inagotable para la sátira en internet: hasta su propio nombre acaba convertido en chiste transcultural.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> Este meme forma parte de la cultura de internet china (Bilibili, Zhihu). Es sátira y juego lingüístico, no una afirmación literal.</div>"
    ],



    date:"2024年前后 (中文互联网)",
    dateEn:"Around 2024 (Chinese internet)",
    location:"中文互联网 / B站 / 知乎",
    locationEn:"Chinese internet / Bilibili / Zhihu",
    img:"assets/images/report/r-40.jpg",
    summary:"C罗访日，喜提日语汉字音译名“吕七优人”。这个本意友好的礼物，被中文互联网解构成调侃其过度自我品牌化的网络梗。",
    summaryEn:"Ronaldo's Japan trip sparked a meme: the Japanese-style kanji 'Lyu Qi You Ren' spread across the Chinese internet as a running tease on his over-the-top self-branding.",
    detail:[
      "<strong>日本行的茶话会：</strong>2024年C罗随队前往日本期间，受邀参加一场日方举办的<em>茶话会</em>。品茶之余，主办方郑重献上一幅书法作品，上面赫然写着C罗的“日文名字”——“<strong>吕七优人</strong>”。",
      "<strong>“吕七优人”的由来：</strong>这个名字按日语音译把“Cristiano Ronaldo”写成汉字：“吕”取罕见姓氏，“七优人”近似“Ronaldo”的发音。日方本意友好，不料字形落进中文<em>谐音</em>语境，直接引爆网络狂欢。",
      "<strong>中文谐音的恶搞：</strong>“吕七优人”被中国网友读出“屡战屡败却屡败屡战”的戏谑意味，更有人逐字拆解成“吕（屡）七（次）优（忧）人（忍）”，衍生出“<em>七次心忧之人</em>”等无数版本——C罗喜提新外号。",
      "<strong>知乎B站的传播：</strong>知乎冒出“为什么都称C罗为吕七优人？”的热门问答，B站、抖音的“吕七优人”书法恶搞视频层出不穷，甚至有人真去请书法家<em>定制</em>装裱，把这一“日文名”供成桌面摆件。",
      "<strong>跨语言文字游戏：</strong>说到底，“吕七优人”是日语汉字音译撞进中文语境后酿出的<strong>文化错位喜剧</strong>。C罗大概做梦也想不到，自己在东方收获的是一个自带喜感的“汉名”——传唱度还不输本名。",
      "<strong>与“西罗”“克里斯”的对比：</strong>此前C罗在中文世界的称呼，多为“C罗”“西罗”“克里斯蒂亚诺”，相对正经。“吕七优人”问世，中文外号彻底<em>娱乐化</em>，与“阿韦罗”“罗三脚”并列为恶搞名号。",
      "<strong>文化反噬的典型案例：</strong>一个本意致敬的书法礼物，到中文互联网手里成了无厘头符号——这正是球迷文化的<strong>解构狂欢</strong>。C罗的“国际形象”，就在一次次跨文化误读里被重塑得面目全非。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>本文内容基于公开报道整理，仅供参考。</div>"
    ],
    detailEn:[
      "<strong>The Japan-trip tea party:</strong> During a 2024 club trip to Japan, Ronaldo was invited to a <em>tea party</em>. Over tea, his Japanese hosts solemnly presented him with a piece of calligraphy bearing his 'Japanese name' — '<strong>Lyu Qi You Ren</strong>'.",
      "<strong>The origin of 'Lyu Qi You Ren':</strong> The name is a Japanese on-yomi transliteration of 'Cristiano Ronaldo' — 'Lyu', a rare surname; 'Qi You Ren', an approximation of the sound of 'Ronaldo'. Meant as a Japanese gesture of friendship, it touched off an online carnival the moment its glyphs collided with Chinese <em>homophones</em>.",
      "<strong>Chinese homophone parody:</strong> Chinese netizens read 'Lyu Qi You Ren' as a tease — 'lost again and again but kept trying'; others unpacked it glyph by glyph, 'Lyu (repeatedly) Qi (seven, times) You (worry) Ren (endure)', spawning endless variants like '<em>seven-time sorrowful man</em>' and gifting Ronaldo yet another nickname.",
      "<strong>Zhihu-Bilibili spread:</strong> Zhihu played host to the viral Q&A 'Why is Ronaldo called Lyu Qi You Ren?'; Bilibili and Douyin filled up with calligraphy parodies; some went as far as commissioning calligraphers to <em>custom-frame</em> the 'Japanese name' as a desktop ornament.",
      "<strong>Cross-linguistic wordplay:</strong> 'Lyu Qi You Ren' is a <strong>cultural-dislocation comedy</strong>: Japanese kanji transliteration landing in a Chinese context. Ronaldo probably never dreamed he would acquire such a comic 'Chinese name' in the East, its circulation rivalling his real name.",
      "<strong>Versus 'Xi Luo' / 'Cristiano':</strong> Ronaldo's earlier Chinese monikers — 'C Luo', 'Xi Luo', 'Cristiano' — were relatively proper. 'Lyu Qi You Ren' dragged his Chinese nicknames into pure entertainment, taking its place alongside 'Aveiro' and 'Ronaldo three-kick' as a parody handle.",
      "<strong>A textbook case of cultural blowback:</strong> A calligraphy gift meant as tribute was deconstructed into a nonsensical symbol on the Chinese internet — fan culture's <strong>carnival of deconstruction</strong> in its natural habitat. Ronaldo's 'international image' has been remade beyond recognition, one cross-cultural misreading at a time.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong>This entry is compiled from public reporting and is for reference only.</div>"
    ],
    tags:["吕七优人","CR7","日文恶搞","谐音梗","B站","网络梗","日本行","自我品牌","阿先生"],
    tagsEn:["Lyu-Qi-You-Ren meme","CR7","Japanese parody","pun meme","Bilibili","internet meme","Japan tour","self-brand","Ah-Wei (meme)"],
    tagsEs:["meme japonés Lyu-Qi","CR7","parodia japonesa","juego de palabras","Bilibili","meme de internet","gira por Japón","marca personal","Ah-Wei (meme)"]
  },
  {
    id:41, cat:"persona", catLabel:"人设争议", severity:3,
    dateIso:"2010-01-01",
    title:"点球依赖症 + 任意球“念咒”蒙人墙",
    titleEn:"Penalty Dependency & Free-Kick 'Incantation'",
    titleEs: "Dependencia de penales y «conjuro» de falta",
    summaryEs: "A Cristiano le llaman «mercader de penales»: buena parte de su cosecha goleadora nace del punto fatídico. En las faltas, la eficacia lleva años hundida; aun así, las sigue lanzando y celebrándolas.",
    dateEs: "Varios momentos de la carrera",
    locationEs: "Múltiples clubes / selección",
    detailEs: [
      "<strong>El «mercader de penales»:</strong> Por méritos propios, Cristiano es el máximo goleador de penales de la historia del fútbol. Se estima que casi 1 de cada 6 de sus goles sale del punto fatídico.",
      "<strong>Los números del penal:</strong> En su carrera, Cristiano ha lanzado más de 200 penales y marcado alrededor de 175. Cifra colosal que, para sus críticos, infla artificialmente sus estadísticas goleadoras.",
      "<strong>El hundimiento en faltas:</strong> La eficacia de Cristiano en tiros libres directos lleva años por los suelos: más de 600 días sin marcar una falta y una racha de 0 goles en 59 intentos en liga. Aun así, sigue lanzándolas todas.",
      "<strong>El «conjuro» de la falta:</strong> Cada vez que Cristiano se planta ante una falta, adopta su pose de ritual — piernas abiertas, respiración profunda — como si fuera a marcar un golazo. La realidad: la mayoría acaba en barrera o fuera.",
      "<strong>El contraste con su imagen:</strong> Cristiano vende la imagen de especialista en faltas (recordemos sus golpes secos en el Real Madrid), pero su eficacia actual es bajísima. El mito del «cañonero» no resiste los datos recientes.",
      "<strong>El porqué:</strong> ¿Por qué Cristiano sigue monopolizando las faltas pese a su poca eficacia? Para los críticos, puro ego: no cede el balón parado aunque un compañero tenga más opciones de marcar.",
      "<strong>El balance:</strong> Dependencia de penales (su vía principal de gol) y un mito inflado de «cañonero de faltas» que los datos recientes desmienten. «Penaldo» no es un apodo: es una realidad estadística.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> Los datos de penales y faltas de Cristiano son verificables (OPTA, Transfermarkt). La sequía en faltas está documentada.</div>"
    ],



    date:"职业生涯各时期",
    dateEn:"Various points in career",
    location:"多俱乐部 / 国家队",
    locationEn:"Multiple clubs / national team",
    img:"assets/images/report/r-41.jpg",
    summary:"C罗大量进球来自点球，人称“点球大户”；任意球命中率急剧下降后仍垄断主罚权，主罚前喜欢闭眼念咒，被嘲“蒙人墙”。",
    summaryEn:"Ronaldo is known as a 'penalty merchant' — a sizeable slice of his career goals came from the spot. And even as his free-kick conversion collapsed, he clung to free-kick duties all the harder: eyes closed in the pre-kick 'incantation', mocked as 'praying at the wall'.",
    detail:[
      "<strong>点球进球占比：</strong>C罗职业生涯已罚进<strong>175个点球</strong>（罚丢33个，主罚208次），点球占总进球两成以上；某些赛季，他的俱乐部进球里点球比重甚至接近<em>三分之一</em>——“点球罗”之名由此而来。",
      "<strong>任意球的“念咒”站姿：</strong>主罚任意球前，C罗必有一套标志性仪式：双腿大开立、深呼吸、双手叉腰、眼神锁定球门，仿佛在<em>念咒施法</em>。这套动作被球迷戏称为“招魂姿势”，仪式感拉满，效果却每况愈下。",
      "<strong>任意球进球荒：</strong>据The Athletic统计，C罗曾在联赛中经历<strong>超过600天、59次尝试</strong>的任意球进球荒。国际大赛更是61次直接任意球仅进1球，效率惨不忍睹，“念咒”念了个寂寞。",
      "<strong>站姿的迷信色彩：</strong>那套大开立站姿，本质是一种<strong>心理暗示</strong>与迷信仪式。C罗相信它能带来好运，但数据证明，后期他的任意球转化率远低于队内其他主罚者，却仍霸占主罚权不放。",
      "<strong>点球依赖的逻辑：</strong>当运动战能力下滑，点球成了C罗维持进球数的重要手段：垄断主罚权，确保<strong>个人数据</strong>不掉。这种“刷数据”的方式被批评为投机取巧——“历史最佳”的自我定位，配上这份靠点球保住的账面，本身就是讽刺。",
      "<strong>队友的不满：</strong>贝尔曾抱怨训练中自己任意球更准，比赛却轮不到。本泽马、B费等队友的任意球与点球效率均不低，却都要给C罗“让位”，这种<em>资源倾斜</em>长期毒化球队生态。",
      "<strong>仪式与现实的落差：</strong>当“念咒站姿”变成笑话、点球成了主要食粮，C罗的进球含金量便遭质疑。一个靠<strong>点球续命</strong>、任意球“摆pose”的传奇，伟大成色几何，问号恐怕比任意球进球来得勤。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>本文内容基于公开报道整理，仅供参考。</div>"
    ],
    detailEn:[
      "<strong>Penalty share of goals:</strong> The ledger is blunt: Ronaldo has converted <strong>175 penalties</strong> in his career (33 misses from 208 taken), and penalties make up more than a fifth of his total goals. In some seasons penalties even approached <em>a third</em> of his club goals — hence the 'Penaldo' nickname.",
      "<strong>The free-kick 'incantation' stance:</strong> Before each free-kick comes the signature ritual: legs planted wide, deep breath, hands on hips, eyes locked on goal — as if <em>chanting a spell</em>. Fans dubbed it the 'summoning stance': the ritual ever more elaborate, the results ever worse.",
      "<strong>The free-kick drought:</strong> According to The Athletic, Ronaldo once went <strong>more than 600 days and 59 attempts</strong> without a direct free-kick goal in the league. In major internationals he managed just 1 goal from 61 direct free-kicks — dismal efficiency, an 'incantation' that produced nothing.",
      "<strong>The superstition of the stance:</strong> That wide-base stance is a <strong>psychological cue</strong>, a superstition Ronaldo trusts to bring luck. The data disagrees: late in his career his free-kick conversion lagged far behind the other takers at his clubs — and still the duties never left his hands.",
      "<strong>The logic of penalty dependence:</strong> As open-play ability declined, penalties became the maintenance programme for the goal tally. Monopolising the duties keeps the <strong>personal numbers</strong> ticking over; critics call the 'stat-padding' opportunistic — quite the footnote to the 'best in history' self-image.",
      "<strong>Teammate frustration:</strong> Bale complained he was the more accurate free-kick taker in training — and never got the call in matches. Benzema, B. Fernandes and other teammates all had solid penalty and free-kick numbers, yet all had to 'give way' to Ronaldo: a <em>resource tilt</em> that poisoned the dressing room for years.",
      "<strong>Ritual versus reality:</strong> When the 'incantation stance' is a running joke and penalties are the staple, the 'quality' of the goals is inevitably questioned. A legend sustained by <strong>penalty handouts</strong> and free-kick 'posing' — the case for his greatness carries a permanent asterisk.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong>This entry is compiled from public reporting and is for reference only.</div>"
    ],
    tags:["点球依赖","点球大户","任意球","念咒","做法","蒙人墙","命中率暴跌","射门癖","主罚权"],
    tagsEn:["penalty reliance","penalty merchant","free kick","free-kick chant","antics","blocked teammate's goal","conversion-rate crash","shot hog","free-kick/penalty monopoly"],
    tagsEs:["dependencia de penaltis","especialista en penaltis","tiro libre","cántico del tiro libre","actitudes","taponó gol de compañero","caída de efectividad","adicto a rematar","monopolio de tiros"]
  },
  {
    id:42, cat:"offpitch", catLabel:"场外失态", severity:3,
    dateIso:"2010-01-01",
    title:"“总裁找裁判” — 永远在抱怨的队长",
    titleEn:"'Always Chasing the Ref' — The Complaining Captain",
    titleEs: "«Siempre detrás del árbitro» — el capitán quejica",
    summaryEs: "Su apodo «Jefe» esconde un doble sentido: «siempre detrás del árbitro». Cristiano es célebre por recriminar a los colegiados — brazos abiertos, cara de asombro, gestos de todo tipo.",
    dateEs: "Varios momentos de la carrera",
    locationEs: "Múltiples partidos",
    detailEs: [
      "<strong>El doble sentido del apodo:</strong> Su apodo chino, «总裁» (zǒngcái, «el jefe» o CEO), se lee también como «<em>总</em>是靠<em>裁</em>判» (siempre depende del árbitro). Un juego de palabras brillante.",
      "<strong>El capitán quejica:</strong> Cristiano es el jugador que más recrimina a los árbitros del fútbol mundial. Cada decisión que no le favorece llega con su repertorio gestual: brazos abiertos, cara de asombro, palmadas, quejas.",
      "<strong>El repertorio gestual:</strong> Cuando pitan algo contra él o contra su equipo, Cristiano despliega el catálogo completo: manos en la cabeza, brazos extendidos, mirada al cielo, protestas verbales al cuarto árbitro. Un espectáculo en sí mismo.",
      "<strong>El empujón al árbitro (2017):</strong> Su relación con los árbitros culminó en la Supercopa de España 2017, con el <strong>empujón al árbitro</strong> (incidente n.º 3 de este archivo). Le costó 5 partidos de sanción.",
      "<strong>El «siempre depende del árbitro»:</strong> La acusación de los críticos es simple: Cristiano depende de los penales (que pitan los árbitros) para sus goles, y recrimina al colegiado cuando no se lo da. Una relación tóxica.",
      "<strong>La permisividad:</strong> Pese a sus constantes protestas, Cristiano rara vez es amonestado por ellas. Para muchos, la estrella goza de un blindaje arbitral que a un jugador normal no se le toleraría.",
      "<strong>El balance:</strong> «El capitán quejica», «el que siempre va detrás del árbitro». Cristiano, de cuerpo entero: el jugador que recurre al colegiado (protestando o buscando penales) como vía para sus goles y su ego.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> Las protestas de Cristiano a los árbitros son constantes y están documentadas en vídeo. El apodo «总裁» y su doble sentido forman parte de la cultura hater china.</div>"
    ],



    date:"职业生涯各时期",
    dateEn:"Various points in career",
    location:"多场比赛",
    locationEn:"Multiple matches",
    img:"assets/images/report/r-42.jpg",
    summary:"“总裁”这个绰号还有另一层含义——“总找裁判”。C罗以抱怨裁判著称：举双手、摊手、摇头、追着裁判理论，全是他的标志性动作。",
    summaryEn:"Another meaning of his 'boss' nickname is 'always after the ref' — Ronaldo is notorious for berating officials: arms aloft, palms out, shaking his head, chasing down the referee to argue.",
    detail:[
      "<strong>摊手成瘾：</strong>无论在皇马、尤文、曼联还是利雅得胜利，C罗唯一保持稳定的动作就是<em>摊手</em>——队友传球不到位，摊手；自己射门偏出，摊手；裁判没吹犯规，摊手。一场比赛能摊七八次，<strong>肢体语言</strong>比进球还丰富。",
      "<strong>找裁判理论：</strong>每遇争议判罚，C罗必第一时间冲向裁判<em>讨说法</em>。2026年1月沙特联赛一场比赛后，他因对裁判手势过激险遭<strong>四场禁赛</strong>，Marca称其“赛后彻底爆发”。",
      "<strong>队长袖标当垃圾扔：</strong>最经典的“抱怨名场面”，莫过于2021世预赛对阵塞尔维亚，进球被吹后C罗<em>怒摔队长袖标</em>扬长而去，赛后被批“毫无队长风度”。这绝非个例，他多次在失利后丢弃袖标，被讽“不配当队长”。",
      "<strong>对队友的当众施压：</strong>镜头多次捕捉到C罗在场上<em>当众指责队友</em>：挥拳、摇头、大声咆哮。还有一场比赛结束后，他因队友没传球而面带愠色离场，被批“把队友当<em>工具人</em>”。",
      "<strong>推搡裁判，也能脱身：</strong>据《阿拉伯新闻》报道，C罗曾在沙特联赛中<em>推搡并大声呵斥</em>当值裁判，主场球迷顺势高喊“梅西”嘲讽。推裁判在任何联赛都是重罪，他却屡屡侥幸脱身——这份待遇，一般叫做特权。",
      "<strong>不雅手势的代价：</strong>因对球迷做出挑衅手势，C罗曾被沙特足协<strong>禁赛一场</strong>。他事后辩称“误会”，官方认定其行为不当，处分照常执行——常年向别人讨说法的人，这次轮到自己吃罚单。",
      "<strong>永远无辜的自我定位：</strong>在C罗的世界观里，错的永远是别人：裁判不公、队友不力、教练不懂、媒体偏见。这份<strong>永远受害者</strong>的名单可以很长，唯独容不下他自己——与“领袖”二字的距离，就是这么一步步拉开的。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>本文内容基于公开报道整理，仅供参考。</div>"
    ],
    detailEn:[
      "<strong>Addicted to flinging arms:</strong> Real, Juve, United, Al Nassr — wherever he goes, the constant is the <em>arms-flung-out</em>: a teammate misplaces a pass, fling; he skies a shot, fling; the referee waves play on, fling. Seven or eight times a game; his <strong>body language</strong> is more prolific than his goals.",
      "<strong>Chasing the referee:</strong> Whenever a controversial call goes against him, Ronaldo is instantly in pursuit <em>to demand an explanation</em>. After a Saudi league match in January 2026 he narrowly escaped a <strong>four-match ban</strong> for over-aggressive gesturing at the officials; Marca's verdict: 'completely exploding afterwards'.",
      "<strong>Throwing the armband like trash:</strong> The classic 'complaint moment' came in the 2021 Serbia qualifier: goal disallowed, Ronaldo <em>slammed the armband down</em> and stormed off — criticised post-match for having 'zero captain's dignity'. Far from an isolated case: after defeats he has discarded the armband multiple times, mocked as 'unfit to be captain'.",
      "<strong>Public pressure on teammates:</strong> Cameras have repeatedly caught Ronaldo <em>publicly dressing down teammates</em> on the pitch: fist-shaking, head-shaking, shouting. After one match he walked off scowling because a teammate failed to pass to him — accused of treating teammates as <em>tools</em>.",
      "<strong>The audacity to shove a referee:</strong> According to Arab News, Ronaldo once <em>shoved and bellowed at</em> the on-pitch referee in a Saudi league match, with home fans loudly chanting 'Messi' to taunt him. Shoving a referee is a grave offence in any league, yet he escaped. Repeatedly.",
      "<strong>The price of obscene gestures:</strong> For making a provocative gesture at fans, Ronaldo was <strong>banned one match</strong> by the Saudi FA. He called it a 'misunderstanding' afterwards; officials ruled his behaviour improper, and the punishment stood — the culture of complaint finally catching up with him.",
      "<strong>The eternal 'innocent' self-image:</strong> In Ronaldo's worldview the wrongdoer is always someone else: the referee unfair, the teammates not good enough, the coach clueless, the media biased. This <strong>eternal-victim</strong> mentality takes him further and further from 'leadership', leaving only the silhouette of an angry, lonely superstar.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong>This entry is compiled from public reporting and is for reference only.</div>"
    ],
    tags:["总裁找裁判","抱怨裁判","举双手","摊手","摇头","追裁判","抱怨队友","队长担当","表情包"],
    tagsEn:["bossing the ref","complaining to ref","both hands raised","throws hands up","head shake","chasing the ref","complaining at teammates","captain's burden","memes"],
    tagsEs:["peleando al árbitro","quejas al árbitro","brazos en alto","brazos en alto","negación con la cabeza","persigue al árbitro","quejas a compañeros","peso del capitanato","memes"]
  },
  {
    id:43, cat:"national", catLabel:"国家队争议", severity:3,
    dateIso:"2022-01-01",
    title:"公开引发梅罗对立 — “梅西夺冠后我心态崩了”",
    titleEn:"Stoking the Messi–Ronaldo Rift — 'I Cracked After Messi's World Cup Win'",
    titleEs: "Atizando la rivalidad Messi–Cristiano — «Me rompí tras el Mundial de Messi»",
    summaryEs: "Tras el Mundial de Messi en 2022, la sarta de declaraciones y gestos de Cristiano («el Mundial no es mi sueño», «soy el mejor», etc.) alimentó la teoría de que «se rompió» de envidia.",
    dateEs: "2022 — 2026",
    locationEs: "Múltiples ocasiones / entrevistas",
    detailEs: [
      "<strong>El Mundial de Messi (2022):</strong> En diciembre de 2022, Messi levantó el Mundial de Catar con Argentina. Era el título que le faltaba y, para muchos, el que lo consolidaba como el indiscutido GOAT por delante de Cristiano.",
      "<strong>La reacción de Cristiano:</strong> Tras el título de Messi, la actitud de Cristiano cambió drásticamente. La sarta de declaraciones y gestos que siguió alimentó la teoría de que «se rompió» por no poder superar a su rival.",
      "<strong>«El Mundial no es mi sueño»:</strong> En noviembre de 2025, Cristiano soltó la frase «el Mundial no es mi sueño» (incidente n.º 39). Una pirueta retórica para encajar que Messi había ganado lo que él no podría ganar.",
      "<strong>«Soy el 1.º, 2.º y 3.º»:</strong> La constancia con que Cristiano repite que es «el primero, segundo y tercero mejor de la historia» se leyó como una necesidad de reafirmarse ante el éxito del rival.",
      "<strong>El «Factos»:</strong> La Nochebuena de 2021 (antes incluso del Mundial de Messi), Cristiano ya había comentado «Factos» bajo el post de Messi tras perder el Balón de Oro. Un anticipo de su incapacidad para asumir el éxito ajeno.",
      "<strong>Los gestos de frustración:</strong> Caídas de brazos, protestas, declaraciones pretenciosas, empujones a aficionados que le corean «Messi» — el portugués ha mostrado una frustración creciente desde el título del argentino.",
      "<strong>La teoría del «rompimiento»:</strong> Para los críticos, el Mundial de Messi fue el punto de inflexión: tras ver a su rival levantar el trofeo soñado, Cristiano «se rompió» y encadenó declaraciones y gestos autodefensivos.",
      "<strong>El balance:</strong> La rivalidad Messi-Cristiano, que durante años alimentó el debate del GOAT, se decantó del lado argentino con el Mundial 2022. La reacción de Cristiano, lejos de aceptarlo con deportividad, ha sido de negación.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> Las declaraciones de Cristiano son reales. La interpretación de que «se rompió» por envidia es la tesis de sus críticos, no una afirmación literal del propio Cristiano.</div>"
    ],



    date:"2022 — 2026",
    dateEn:"2022 — 2026",
    location:"多场合 / 采访",
    locationEn:"Multiple occasions / interviews",
    img:"assets/images/report/r-43.jpg",
    summary:"自从2022年梅西捧起世界杯，C罗的一系列言论与行为就被指蓄意制造梅罗对立——“世界杯不是梦想”“我是历史最佳”轮番上线，足坛就此裂成两半。",
    summaryEn:"Messi won the 2022 World Cup; Ronaldo answered with a string of remarks and moves — 'the World Cup isn't my dream', 'I'm the best in history' — and now stands accused of deliberately fuelling the Messi–Ronaldo rift and splitting football.",
    detail:[
      "<strong>2022世界杯的分水岭：</strong>梅西率阿根廷捧起2022世界杯，补齐了GOAT拼图的最后一块；C罗却在淘汰赛<em>沦为替补</em>，葡萄牙止步八强。一升一降，缠斗十余年的梅罗之争就此<em>尘埃落定</em>，C罗心态彻底崩盘。",
      "<strong>Factos之夜的破防：</strong>2021年梅西第七夺金球，C罗留言“Factos”公开质疑，惨遭全网群嘲。这场<em>破防</em>被视为梅罗对立激化的导火索，罗粉从此走上“逢梅必反”的不归路。",
      "<strong>粉丝阵营的水火不容：</strong>中文互联网上，“罗粉”与“梅粉”两大阵营早已不共戴天。2022决赛，大批罗粉<em>集体支持法国</em>，只求梅西失利；阿根廷夺冠后，罗粉又炮制出“国际足联保送”“点球阿根廷”等阴谋论，把<strong>输不起</strong>三个字演绎到极致。",
      "<strong>亨利批评引发的连锁反应：</strong>2026年世界杯前夕，亨利公开批评C罗，再度点燃“GOAT之争”。印度媒体直言，梅罗对立已“暴露出球迷文化最丑陋的一面”，<em>理性讨论</em>被部落化谩骂彻底淹没。",
      "<strong>2026世界杯的重新激活：</strong>2026年美加墨世界杯，梅西与C罗双双参赛，让本已“盖棺定论”的争论<strong>死灰复燃</strong>。此后两人每一次触球、每一粒进球，都会被粉丝拿去对比、拉踩，比赛本身反倒成了背景板。",
      "<strong>阿根廷爱梅西vs葡萄牙疑C罗：</strong>《第一邮报》点出一个反差：阿根廷举国把梅西供上神坛，葡萄牙国内对C罗的<em>质疑声</em>却一浪高过一浪——角色定位、团队贡献、该不该退役，样样都有得吵。同为国民英雄，待遇天壤之别。",
      "<strong>对立的代价：</strong>当两位伟大球员被粉丝绑架成“圣战”符号，足球之美便在<em>无休止的拉踩</em>中被消耗殆尽。C罗或许没想到，他与梅西的对立，最终成就的不是谁更伟大，而是<strong>球迷文化的内耗</strong>与撕裂。",
      "<strong>总评：</strong>多年来滋养GOAT之争的梅罗恩怨，在2022年世界杯后倒向了阿根廷一方。C罗的反应远非大度接受，而是否认。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>本文内容基于公开报道整理，仅供参考。</div>"
    ],
    detailEn:[
      "<strong>The 2022 watershed:</strong> Messi led Argentina to the 2022 World Cup and completed the GOAT's final puzzle; Ronaldo was <em>reduced to a substitute</em> in the knockouts as Portugal went out in the quarter-finals. That divergence settled the decade-plus Messi-Ronaldo argument, <em>and Ronaldo's mentality crumbled entirely</em>.",
      "<strong>The Factos night meltdown:</strong> When Messi won his seventh Ballon d'Or in 2021, Ronaldo left a one-word comment — 'Factos' — publicly questioning the award, and was mocked across the internet. This <em>meltdown</em> is regarded as the fuse that intensified the Messi-Ronaldo rivalry, setting his fans on the irrevocable path of 'anti-Messi everything'.",
      "<strong>Irreconcilable fan camps:</strong> On the Chinese internet, 'Ronaldo-stans' and 'Messi-stans' treat each other as sworn enemies. At the 2022 final, hordes of Ronaldo fans <em>collectively backed France</em> and prayed for Messi to lose; when Argentina won, they cooked up conspiracy theories — 'FIFA was fixed', 'penalty-Argentina' — <strong>sore losing</strong> taken to its limit.",
      "<strong>Thierry Henry's critique:</strong> On the eve of the 2026 World Cup, Henry publicly criticised Ronaldo and reignited the 'GOAT debate'. Indian media noted the Messi-Ronaldo rivalry had 'exposed the ugliest face of fan culture', with <em>rational discussion</em> drowned out by tribal abuse.",
      "<strong>Re-ignited at the 2026 World Cup:</strong> At the 2026 US-Canada-Mexico World Cup, both Messi and Ronaldo are playing, and the supposedly settled argument is open again. Every touch, every goal by either man is seized on by fans for comparison and put-down; the football itself becomes a sideshow.",
      "<strong>Argentina loves Messi, Portugal doubts CR7:</strong> First Post notes a striking asymmetry: Argentina worships Messi universally, while inside Portugal the <em>doubts</em> over Ronaldo keep growing — his role, his contribution, whether he should retire. Both are national heroes; the treatment is night and day.",
      "<strong>The cost of the rivalry:</strong> When two great players are hijacked by their fans into symbols of 'holy war', football's beauty is consumed by <em>endless point-scoring</em>. Ronaldo probably never imagined that his rivalry with Messi would produce, in the end, not an answer to who was greater, but the <strong>internal attrition</strong> and tearing apart of fan culture.",
      "<strong>Verdict:</strong> The Messi–Cristiano rivalry that fuelled the GOAT debate for years tilted Argentina's way with the 2022 World Cup. Cristiano's reaction, far from gracious acceptance, has been denial.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong>This entry is compiled from public reporting and is for reference only.</div>"
    ],
    quote:{text:"自从阿根廷夺得2022年世界杯冠军之后，C罗的心态发生了巨变。", textEn:"Ever since Argentina won the 2022 World Cup, Ronaldo's mindset has changed dramatically.", author:"网易体育评论", authorEn:"NetEase Sports commentary", textEs:"Desde que Argentina ganó el Mundial de 2022, la actitud de Cristiano ha cambiado drásticamente.", authorEs:"Comentario de NetEase Sports"},
    tags:["梅罗对立","梅西","世界杯","酸葡萄","GOAT之争","大罗排名","B费","公关煽动","2022卡塔尔"],
    tagsEn:["Messi-CR7 rivalry","Messi","World Cup","sour grapes","GOAT debate","Ronaldo ranking","Bruno Fernandes","PR stoking","Qatar 2022"],
    tagsEs:["rivalidad Messi-CR7","Messi","Mundial","uvas verdes","debate GOAT","ranking de Ronaldo","Bruno Fernandes","manipulación mediática","Catar 2022"]
  },
  {
    id:45, cat:"club", catLabel:"俱乐部与法律", severity:3,
    dateIso:"2005-01-01",
    title:"范尼冲突 — \“滚去找你爸爸哭去吧\”",
    titleEn:"Van Nistelrooy Clash — 'Go Cry to Your Daddy'",
    titleEs: "Bronca con Van Nistelrooy — «ve a llorarle a tu padre»",
    summaryEs: "En un entrenamiento del United, Van Nistelrooy le espetó a Cristiano «ve a llorarle a tu padre» — el padre de Cristiano acababa de morir. Ferguson vendió al holandés para respaldar al portugués.",
    dateEs: "2005-2006 (entrenamiento del United)",
    locationEs: "Ciudad deportiva del Old Trafford",
    detailEs: [
      "<strong>El escenario:</strong> Manchester United, entrenamientos de la temporada 2005-06. Cristiano, una promesa de 20 años, y <strong>Ruud van Nistelrooy</strong>, delantero estrella del vestuario, chocaban una y otra vez.",
      "<strong>El estilo que crispaba:</strong> Van Nistelrooy, goleador de área pura, estaba harto del «todo lujo, cero pase» de Cristiano: para el holandés, los stepovers del portugués malgastaban ocasiones claras de gol.",
      "<strong>La frase que cruzó la línea:</strong> En un entrenamiento tenso, Van Nistelrooy le soltó a Cristiano: «<strong>ve y dile a tu padre que te consuele</strong>» (o «ve a llorarle a tu padre»). El problema: el padre de Cristiano, José Dinis Aveiro, <strong>había muerto en septiembre de 2005</strong> en Londres por una enfermedad hepática relacionada con el alcohol.",
      "<strong>La provocación personal:</strong> No era una bronca de vestuario más: la frase tocaba la herida más dolorosa de Cristiano, la reciente pérdida de su padre.",
      "<strong>La reacción de Cristiano:</strong> El portugués no respondió en el acto, pero el incidente marcó el punto de no retorno en su relación con Van Nistelrooy.",
      "<strong>La decisión de Ferguson:</strong> Sir Alex Ferguson pesó el potencial de Cristiano contra la tensión del vestuario y tomó partido: <strong>vendió a Van Nistelrooy</strong> al Real Madrid en 2006 y apostó por el portugués como nueva estrella.",
      "<strong>El balance:</strong> La bronca con Van Nistelrooy es uno de los episodios más duros de la carrera de Cristiano. El holandés acabó pidiéndole disculpas públicas años después por cómo trató al joven portugués.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> El incidente es conocido pero los detalles exactos varían según las fuentes. La disculpa posterior de Van Nistelrooy es pública.</div>"
    ],


    date:"2005-2006 (曼联训练场)",
    dateEn:"2005-2006 (United training ground)",
    location:"老特拉福德训练场",
    locationEn:"Old Trafford training ground",
    img:"assets/images/report/r-45.jpg",
    summary:"曼联训练场上，范尼对C罗怒吼\“滚去找你爸爸哭去吧\”——当时C罗父亲刚因酗酒引发的肝病去世不久。C罗当场落泪，弗格森最终选择送走范尼、扶正C罗。",
    summaryEn:"On the United training ground Van Nistelrooy bellowed at Ronaldo 'go and cry to your daddy' — Ronaldo's father had just died of alcohol-related liver disease. Ronaldo burst into tears; Ferguson's answer was to back the kid and ship Van Nistelrooy out.",
    detail:[
      "<strong>训练场骂战起因：</strong>2005年的卡灵顿训练基地，年轻气盛的C罗与队内头号射手<strong>范尼斯特鲁伊</strong>（Ruud van Nistelrooy）爆发冲突。彼时范尼是曼联“老大哥”，而C罗只是一介花活少年，两人在一次训练对抗中因传球选择与跑位问题彻底撕破脸，场面一度失控，队友不得不上前拉开。",
      "<strong>“找你爸哭去”：</strong>争执中，范尼对C罗甩出那句最致命的脏话——<em>“去跟你爸哭去吧！”</em>（Go and cry to your daddy!）。这一句并非寻常垃圾话，因为就在2005年9月，C罗的父亲<strong>何塞·迪尼斯·阿韦罗</strong>（José Dinis Aveiro）因酗酒引发肝衰竭去世，丧父之痛尚未平复，范尼的话无异于往伤口上撒盐。",
      "<strong>少年当场落泪：</strong>据前曼联队友<strong>路易·萨哈</strong>（Louis Saha）后来爆料，这句嘲讽直接让C罗当场红了眼眶、几近崩溃。一个二十出头的异乡少年，在最脆弱的时候被队友用亡父来羞辱，那种刺痛外人难以想象。里奥·费迪南德也在回忆中提及，当时的C罗“完全无法接受”。",
      "<strong>弗格森的抉择：</strong>这场冲突成为曼联更衣室权力的拐点。<strong>弗格森爵士</strong>（Sir Alex Ferguson）在权衡之后，认定少年C罗的天花板远高于年过而立的范尼，遂在2006年夏天将范尼以区区1400万欧元贱卖至皇马。老爵爷用行动表态：曼联的未来属于这个被骂哭的葡萄牙小子。",
      "<strong>范尼事后认错：</strong>多年后范尼本人也承认，自己当年的言行“不合时宜、确实过分”。但认错归认错，那句“找你爸哭去”已成为足坛更衣室霸凌的经典案例，也侧面印证了C罗早年并非“天选之子”，而是在嘲笑与撕裂中咬牙爬上神坛。",
      "<strong>丧父背景的讽刺：</strong>更令人唏嘘的是，C罗职业生涯最持久的动力之一正是对亡父的思念——他无数次进球后指天告慰父亲。范尼恰恰戳中了他最深的伤疤，这场冲突也就超越了普通队友矛盾，成为一段带有悲剧色彩的<em>人性撕扯</em>。",
      "<strong>总评：</strong>与范尼斯特鲁伊的冲突是C罗生涯中最激烈的事件之一。数年后，这位荷兰人公开为当年对待年轻葡萄牙小将的方式致歉。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>本文内容基于公开报道与当事人回忆整理，仅供参考。</div>"
    ],
    detailEn:[
      "<strong>Training-ground bust-up origin:</strong> At Carrington in 2005, the hot-headed young Ronaldo clashed with United's star striker <strong>Ruud van Nistelrooy</strong>. Van Nistelrooy was the dressing room's 'big brother' and Ronaldo just a flashy kid; in one training drill the two fell out over passing choices and positioning until teammates had to pull them apart.",
      "<strong>'Go cry to your daddy':</strong> In the argument Van Nistelrooy threw the most savage line — <em>'Go and cry to your daddy!'</em> It was no ordinary trash talk: in September 2005 Ronaldo's father <strong>José Dinis Aveiro</strong> had just died of alcohol-related liver failure, and the grief was still raw. Van Nistelrooy was rubbing salt straight into the wound.",
      "<strong>The kid wept on the spot:</strong> According to former United teammate <strong>Louis Saha</strong>, the jibe brought Ronaldo to the verge of tears. A twenty-something far from home, taunted about his dead father at his most vulnerable moment. Rio Ferdinand remembered it too: the young Ronaldo 'took it really hard'.",
      "<strong>Ferguson's choice:</strong> The clash became a turning point in United's dressing-room power. <strong>Sir Alex Ferguson</strong> weighed it up and concluded that Ronaldo's ceiling sat far above the thirty-something Van Nistelrooy's; in summer 2006 he sold Van Nistelrooy to Real Madrid for a cut-price €14M. The statement needed no translation: United's future belonged to the mocked Portuguese kid.",
      "<strong>Van Nistelrooy's later regret:</strong> Years later Van Nistelrooy admitted his behaviour had been 'inappropriate and over the line'. An apology is an apology, but 'go cry to your daddy' has since become a textbook case of dressing-room bullying — and a reminder that the early Ronaldo was no 'chosen one': he climbed to the throne amid mockery and tears.",
      "<strong>The sad irony of the father's death:</strong> Missing his late father stayed one of Ronaldo's most enduring career motivations — after countless goals he pointed to the sky to comfort him. Van Nistelrooy jabbed exactly that wound, which is what lifted the clash beyond ordinary teammate conflict: <em>a cut into the man, not the player</em>.",
      "<strong>Verdict:</strong> The clash with Van Nistelrooy remains one of the hardest episodes of Cristiano's career — and the Dutchman did eventually apologise publicly for how he had treated the young Portuguese.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong> This entry is compiled from public reporting and the parties' recollections, and is for reference only.</div>"
    ],
    quote:{text:"那时候我太执着于进球，对年轻球员缺乏耐心，我的确做得有些过分。", textEn:"Back then I was too obsessed with scoring, too impatient with the younger players—I did go a bit too far.", author:"范尼，事后公开道歉", authorEn:"Ruud van Nistelrooy, public apology afterwards", textEs:"Entonces estaba demasiado obsesionado con marcar goles, demasiado impaciente con los jugadores jóvenes — me pasé un poco de la raya.", authorEs:"Ruud van Nistelrooy, disculpa pública posterior"},
    tags:["范尼","训练场冲突","找你爸爸","丧父","弗格森抉择","董方卓","奎罗斯","曼联更衣室","踩单车"],
    tagsEn:["Van Nistelrooy","training-ground clash","go cry to your daddy","father's death","Ferguson's call","Dong Fangzhuo","Queiroz","United dressing room","stepovers"],
    tagsEs:["Van Nistelrooy","pelea en entrenamiento","llora a tu papá","muerte del padre","decisión de Ferguson","Dong Fangzhuo","Queiroz","vestuario de United","bicicleta"]
  },
  {
    id:46, cat:"national", catLabel:"国家队争议", severity:4,
    dateIso:"2022-12-01",
    title:"2022世界杯被替补 — 与桑托斯十年恩怨决裂",
    titleEn:"Benched at the 2022 World Cup — Ten-Year Feud with Santos",
    titleEs: "Suplente en el Mundial 2022 — diez años de tirria con Santos",
    summaryEs: "En el Mundial 2022, el seleccionador Santos dejó a Cristiano en el banquillo en octavos y cuartos; tras la eliminación contra Marruecos, Cristiano se marchó llorando y rompió con Santos.",
    dateEs: "Dic 2022 (Mundial de Catar)",
    locationEs: "Catar",
    detailEs: [
      "<strong>El banquillo:</strong> En el Mundial de Catar 2022, el seleccionador <strong>Fernando Santos</strong> hizo lo impensable: sentar a Cristiano en el banquillo, primero en octavos de final (contra Suiza) y luego en cuartos (contra Marruecos).",
      "<strong>Octavos contra Suiza:</strong> Portugal goleó 6-1 a Suiza con Cristiano en el banquillo (su sustituto Gonçalo Ramos marcó un hat-trick). El marcador le daba la razón a Santos; Cristiano, aun así, se mostró molesto.",
      "<strong>La celebración polémica:</strong> Tras la goleada a Suiza, Cristiano celebró a su manera: caminando solo, sin sumarse al festejo colectivo del equipo. La imagen de un ego herido.",
      "<strong>Cuartos contra Marruecos:</strong> Portugal cayó eliminado 1-0 contra Marruecos. Cristiano, que saltó desde el banquillo en la segunda mitad, no pudo evitarla y se marchó llorando solo por el túnel de vestuarios.",
      "<strong>La salida en solitario:</strong> Mientras sus compañeros se quedaban en el campo agradeciendo a la afición, Cristiano ya iba camino del túnel, solo y llorando. La imagen fue criticada como un gesto individualista.",
      "<strong>La ruptura con Santos:</strong> Tras el Mundial, Cristiano rompió definitivamente con Santos. En junio de 2026, Santos declaró: «<strong>Desde que terminó el Mundial 2022, no he vuelto a hablar ni una palabra con Cristiano</strong>».",
      "<strong>Diez años de tirria:</strong> La relación entre ambos venía deteriorándose desde 2014. El banquillo de Catar fue el punto final de una década de tensiones entre el capitán y el seleccionador.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> El banquillo de Cristiano en Catar 2022 y su marcha llorando son hechos documentados. La declaración de Santos es de junio de 2026.</div>"
    ],


    date:"2022年12月 (卡塔尔世界杯)",
    dateEn:"Dec 2022 (Qatar World Cup)",
    location:"卡塔尔",
    locationEn:"Qatar",
    img:"assets/images/report/r-46.jpg",
    summary:"2022世界杯1/8决赛和1/4决赛，主帅桑托斯连续两场将C罗放上替补席。葡萄牙被摩洛哥淘汰后C罗黯然落泪，赛后与桑托斯彻底决裂——2026年桑托斯承认：\“从2022世界杯后，我再没和C罗说过一句话。\”",
    summaryEn:"At the 2022 World Cup, Fernando Santos benched Ronaldo for the last-16 and quarter-final alike; when Morocco knocked Portugal out, Ronaldo left in tears and cut Santos off for good — as Santos himself admitted in 2026: 'I haven't spoken a word to Ronaldo since the 2022 World Cup.'",
    detail:[
      "<strong>连续两场被按替补：</strong>2022年卡塔尔世界杯，葡萄牙主帅<strong>费尔南多·桑托斯</strong>（Fernando Santos）做出震撼决定——在1/8决赛对阵瑞士时将C罗<strong>移出首发</strong>，此前他在小组赛末轮已被提前换下并露出不悦。连续两场沦为替补，对一位自诩“历史最佳”的巨星而言无异于公开羞辱。",
      "<strong>贡萨洛帽子戏法打脸：</strong>顶替C罗首发的21岁小将<strong>贡萨洛·拉莫斯</strong>（Gonçalo Ramos）单场上演<em>帽子戏法</em>，葡萄牙6-1血洗瑞士。这是当届世界杯首个帽子戏法，也是最响亮的一记耳光——没有C罗的葡萄牙反而踢得更流畅、更具活力。",
      "<strong>桑托斯的坦白：</strong>赛后桑托斯坦言这一决定是“战略与人事的综合考量”，并未因C罗地位而手软。媒体普遍解读为：教练组已无法忍受C罗在场上散步、防守不回追的态度，宁可牺牲巨星光环也要换取团队战斗力。",
      "<strong>离场时的落寞：</strong>比赛结束后，C罗独自一人先行走向球员通道，队友在场上狂欢庆祝，他却头也不回地<em>快步离场</em>。这一幕被镜头全程捕捉，那张孤独的背影迅速刷屏，成为他与国家队关系破裂的最直观注脚。",
      "<strong>妹妹的“最后一舞”：</strong>其姐卡蒂娅在社交媒体发文暗示这可能是C罗国家队的“最后一舞”，进一步将内部矛盾公开化。家族式表态让本就紧张的更衣室雪上加霜，也暴露了C罗团队对舆论的强烈干预欲。",
      "<strong>与桑托斯彻底决裂：</strong>赛事结束后不久，桑托斯离任，C罗与其再无往来。这段师徒关系以最不体面的方式收场——一个被认为“用完即弃”，一个被认为“倚老卖老”。所谓<strong>国家队图腾</strong>，终究敌不过岁月与战术革新的现实。",
      "<strong>十年嫌隙：</strong>C罗与桑托斯的关系早自2014年起便持续恶化。卡塔尔世界杯的替补，只是队长与主帅十年 tensions 的终点。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>本文内容基于公开报道整理，仅反映事件多方说法，不代表定论。</div>"
    ],
    detailEn:[
      "<strong>Two matches on the bench:</strong> At the 2022 Qatar World Cup, Portugal manager <strong>Fernando Santos</strong> made a stunning call — for the round-of-16 tie with Switzerland, he <strong>dropped Ronaldo from the starting XI</strong>, having already hauled him off early in the final group match (to his visible displeasure). For a self-proclaimed 'best in history', two straight games benched was a very public humiliation.",
      "<strong>Gonçalo's hat-trick slap:</strong> In Ronaldo's place, 21-year-old <strong>Gonçalo Ramos</strong> scored a <em>hat-trick</em> as Portugal thrashed Switzerland 6-1 — the tournament's first hat-trick, and the loudest possible retort: without Ronaldo, Portugal were more fluid and more alive.",
      "<strong>Santos's honesty:</strong> After the match Santos called the decision a 'strategic and human-resources comprehensive consideration', and did not soften it for Ronaldo's sake. The consensus read: the coaching staff could no longer tolerate Ronaldo's strolling and refusal to track back; better to sacrifice the halo for the collective.",
      "<strong>The lonely walk off:</strong> After full time Ronaldo walked alone toward the tunnel while teammates celebrated on the pitch, <em>striding off without looking back</em>. Cameras caught it all; that solitary silhouette quickly went viral — the most visceral footnote to his fractured relationship with the national team.",
      "<strong>Sister's 'last dance':</strong> His sister Katia took to social media to hint this could be Ronaldo's 'last dance' for Portugal, further exposing the internal friction to the public. A statement from the family piled pressure onto an already-tense dressing room — and revealed the Ronaldo camp's urgent need to control the narrative.",
      "<strong>A clean break with Santos:</strong> Soon after the tournament Santos left his post, and Ronaldo never spoke to him again. The master-pupil relationship ended in the most graceless way — one deemed 'used and discarded', the other 'trading on seniority'. So much for the <strong>national-team totem</strong>, beaten by age and tactical renewal.",
      "<strong>Ten years of bad blood:</strong> The Cristiano–Santos relationship had been rotting since 2014. The Qatar bench was not a sudden rupture — merely the endpoint of a decade of tension between captain and coach.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong>This entry is compiled from public reporting, only reflecting multiple parties' accounts, and does not represent a final verdict.</div>"
    ],
    quote:{text:"从2022年世界杯结束以后，自己就再也没有跟C罗说过任何一句话。", textEn:"Since the 2022 World Cup ended, I haven't spoken a single word to Ronaldo.", author:"桑托斯，2026年6月25日采访", authorEn:"Fernando Santos, interview on June 25, 2026", textEs:"Desde que terminó el Mundial 2022, no he vuelto a hablar ni una sola palabra con Cristiano.", authorEs:"Fernando Santos, entrevista del 25 de junio de 2026"},
    tags:["2022世界杯","桑托斯","替补","摩洛哥","落泪","决裂","贡萨洛拉莫斯","10年恩怨","卡塔尔","被淘汰"],
    tagsEn:["2022 World Cup","Santos","benched","Morocco","in tears","falling-out","Gonçalo Ramos","10-year feud","Qatar","eliminated"],
    tagsEs:["Mundial 2022","Santos","al banquillo","Marruecos","lágrimas","ruptura","Gonçalo Ramos","rivalidad de 10 años","Catar","eliminado"]
  },
  {
    id:47, cat:"national", catLabel:"国家队争议", severity:3,
    dateIso:"2026-06-01",
    title:"2026世界杯被本国球迷狂嘘 — \“C罗！C罗！\”的讽刺",
    titleEn:"Jeered by Home Fans at the 2026 World Cup",
    titleEs: "Abucheado por los fans locales en el Mundial 2026",
    summaryEs: "A los 41, Cristiano fue fuertemente abucheado por la propia afición portuguesa en el Mundial 2026; el seleccionador Martínez salió en su defensa tras el partido.",
    dateEs: "Jun-Jul 2026 (Mundial EE.UU.-Canadá-México)",
    locationEs: "EE. UU.",
    detailEs: [
      "<strong>El Mundial 2026:</strong> Cristiano, con 41 años, disputó el Mundial 2026 (organizado por EE. UU., Canadá y México) como capitán de Portugal. Era su sexta participación mundialista, un récord.",
      "<strong>Los abucheos:</strong> En los partidos de Portugal, Cristiano fue <strong>fuertemente abucheado por la propia afición portuguesa</strong>: cada vez que tocaba el balón, parte de la grada lo pitaba, decepcionada por su rendimiento.",
      "<strong>La respuesta goleadora:</strong> Pese a los pitos, Cristiano respondió con dos goles. Con 41 años y 138 días, se convirtió en <strong>el jugador más longevo en marcar un doblete en un Mundial</strong> y ya suma seis ediciones seguidas marcando.",
      "<strong>El récord de longevidad:</strong> El doblete de Cristiano a sus 41 años batió el récord de longevidad goleadora en Mundiales. Para CCTV, «un récord único en su especie». Pero los abucheos empañaron la gesta.",
      "<strong>La defensa de Martínez:</strong> Roberto Martínez, seleccionador de Portugal, salió al paso de los abucheos: «Es inaceptable que un jugador que lo ha dado todo por su selección sea abucheado por sus propios aficionados».",
      "<strong>El contexto:</strong> Los abucheos reflejaban el cansancio de la afición portuguesa con un Cristiano de 41 años que, pese a sus récords, ya no rinde al nivel de antaño y todavía monopoliza el protagonismo en detrimento del equipo.",
      "<strong>El balance:</strong> Abucheado por los suyos, defendido por su seleccionador. Para muchos, aquellos pitos marcaron el principio del fin: ni siquiera su afición, tradicionalmente entregada, soporta ya el circo Cristiano.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> Los abucheos a Cristiano en el Mundial 2026 son hechos documentados, así como su doblete y los récords de longevidad.</div>"
    ],


    date:"2026年6-7月 (美加墨世界杯)",
    dateEn:"Jun-Jul 2026 (US-Canada-Mexico World Cup)",
    location:"美国",
    locationEn:"USA",
    img:"assets/images/report/r-47.jpg",
    summary:"41岁的C罗在2026世界杯前被葡萄牙球迷狂嘘，每场触球都伴随嘘声。主帅马丁内斯不得不公开表态\“C罗完全接受替补\”。但C罗在被嘘后打进2球，用表现回击——也用更加狂妄的言论回击。",
    summaryEn:"At 41, Ronaldo was loudly jeered by Portugal's own fans at the 2026 World Cup, every touch met with boos; coach Martinez had to state publicly that 'Ronaldo fully accepts being a sub'. Ronaldo then scored twice to answer the boos, with remarks as arrogant as ever.",
    detail:[
      "<strong>本国球迷的嘘声：</strong>2026年美加墨世界杯，葡萄牙对阵克罗地亚的1/8决赛前，现场广播念出C罗名字，看台回应他的是<strong>铺天盖地的嘘声</strong>。嘘声大多来自随队远征的葡萄牙本国球迷——曾经把他奉为神明的同胞，如今用最直接的方式表达不满。",
      "<strong>41岁的争议首发：</strong>彼时C罗已<strong>41岁高龄</strong>，体能与冲击力肉眼可见地下滑。在多数球迷与评论员看来，他占着年轻前锋的位置，拖慢了球队节奏。嘘声背后，是整个葡萄牙在焦虑同一件事：“传奇是否该体面退场”。",
      "<strong>点球回应质疑：</strong>第68分钟，C罗主罚点球命中扳平比分，这是他<em>世界杯淘汰赛首球</em>。他用最擅长的方式回击嘘声——只是这粒进球恰恰来自点球，而非运动战，“含金量不足”的争论随即再起。",
      "<strong>连续六届破门纪录：</strong>凭借此球，C罗成为史上首位在<strong>六届世界杯</strong>均有进球的球员，并以41岁147天成为世界杯淘汰赛最年长进球者，超越梅西。纪录都足够辉煌，只是辉煌停留在纪录簿上——场上的实际统治力，正朝相反方向走。",
      "<strong>“赢了数据输了场面”：</strong>比赛最终由贡萨洛·拉莫斯补时绝杀，葡萄牙晋级，但赛后舆论的焦点并不在C罗的纪录上，而在于他依旧霸占核心位置是否合理。<em>个人里程碑</em>是个人里程碑，团队胜利是团队胜利——这一夜，两者并不重合。",
      "<strong>图腾与包袱的双重身份：</strong>这场比赛浓缩了C罗晚年的悖论——他既是葡萄牙足球最伟大的象征，也是战术体系中最沉重的包袱。本国球迷的嘘，并非忘恩负义，而是一种痛苦而清醒的<strong>集体割舍</strong>。",
      "<strong>总评：</strong>被自家球迷嘘，却被主教练力挺。在许多人看来，嘘声标志着终结的开始：连历来最死忠的拥趸，都已无法忍受C罗的闹剧。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>本文基于公开赛事报道整理，观点仅代表舆论倾向，不代表本平台立场。</div>"
    ],
    detailEn:[
      "<strong>Home fans boo:</strong> At the 2026 US-Canada-Mexico World Cup, before the round-of-16 match against Croatia, when the stadium announcer read Ronaldo's name, the stands erupted in <strong>cascading boos</strong>. Most came from travelling Portuguese supporters — once his loudest worshippers, now simply his loudest.",
      "<strong>The 41-year-old's disputed start:</strong> Ronaldo was now <strong>41 years old</strong>, his stamina and impact visibly declined. Most fans and pundits felt he was blocking younger forwards and slowing the team's tempo. The boos carried Portugal's collective anxiety about 'whether to let the legend bow out with dignity'.",
      "<strong>Answering with a penalty:</strong> In the 68th minute Ronaldo slotted home a penalty to equalise — his <em>first World Cup knockout goal</em>. He answered the boos in the most trademark way — except it came from the spot, not open play, and the 'limited value' debate duly reignited.",
      "<strong>A record across six editions:</strong> With that goal Ronaldo became the first player to score at <strong>six World Cups</strong> and, at 41 years 147 days, the oldest scorer in a World Cup knockout match, surpassing Messi. The records are glittering enough — the glitter just stays in the record book, while his on-pitch dominance heads the other way.",
      "<strong>'Won the stat, lost the optics':</strong> The match was decided by Gonçalo Ramos's stoppage-time winner, sending Portugal through, but the post-match focus was not Ronaldo's records — it was whether he should still be the centrepiece. That night, the <em>personal milestones</em> and the collective win did not overlap.",
      "<strong>Totem and burden at once:</strong> The match laid out every paradox of Ronaldo's late career — Portugal's greatest symbol and its heaviest tactical burden, at once. The boos from his own fans were not ingratitude; they were the sound of a clear-eyed <strong>collective letting go</strong>.",
      "<strong>Verdict:</strong> Booed by his own fans, defended by his coach. For many, the jeers marked the beginning of the end: even his traditionally devoted supporters can no longer stomach the Cristiano circus.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong>This entry is compiled from public match reporting; the views reflect public-opinion trends only, not this platform's position.</div>"
    ],
    quote:{text:"41岁138天的C罗，成为世界杯史上最年长的梅开二度球员，连续6届世界杯破门——这是独一份的纪录。", textEn:"At 41 years and 138 days, Ronaldo became the oldest player to score twice in a single World Cup match, finding the net in six consecutive World Cups—a one-of-a-kind record.", author:"央视新闻2026年6月24日报道", authorEn:"CCTV News, June 24, 2026 report", textEs:"Con 41 años y 138 días, Cristiano se convirtió en el jugador más longevo en marcar dos goles en un mismo partido del Mundial, con gol en seis Mundiales consecutivos — un récord único.", authorEs:"CCTV News, informe del 24 de junio de 2026"},
    tags:["2026世界杯","被嘘","本国球迷","马丁内斯","接受替补","连续6届","最年长梅开二度","莫德里奇","克罗地亚","siuuu"],
    tagsEn:["2026 World Cup","booed","home fans","Martínez","accepted the bench","six in a row","oldest brace record","Modrić","Croatia","siuuu"],
    tagsEs:["Mundial 2026","abucheado","afición local","Martínez","aceptó el banquillo","seis seguidos","doblete más longevo","Modrić","Croacia","siuuu"]
  },
  {
    id:48, cat:"offpitch", catLabel:"场外失态", severity:3,
    dateIso:"2023-01-01",
    title:"拒绝合影 + 推开球迷 — \“高人一等\”的傲慢",
    titleEn:"Refusing Selfies, Shoving Fans — 'Above It All' Arrogance",
    titleEs: "Rechazando selfies, empujando fans — la arrogancia «por encima de todo»",
    summaryEs: "Cristiano ha rechazado repetidamente fotos con aficionados y ha empujado a más de uno en público; el caso más sonado: el empujón a un fan que pedía una foto tras un título.",
    dateEs: "2023 — varias veces",
    locationEs: "Arabia Saudí / varios",
    detailEs: [
      "<strong>El patrón:</strong> un largo historial de <strong>selfies rechazadas y aficionados empujados</strong> por acercársele en público. Una actitud que contradice su imagen de «ídolo cercano».",
      "<strong>El empujón tras el título:</strong> El caso más sonado se produjo tras ganar un título: un aficionado se le acercó corriendo para pedirle una selfie y Cristiano lo <strong>apartó con un empujón brusco</strong>, ante las cámaras.",
      "<strong>Rechazo sistemático de selfies:</strong> En numerosas salidas de estadios, hoteles y aeropuertos, el guion se repite: gesto molesto, aparta el móvil o directamente ignora a los aficionados que le piden la selfie.",
      "<strong>El contraste con la imagen:</strong> Cristiano vende una imagen de profesional impecable y afable con los fans (sobre todo en sus campañas comerciales). La realidad, según los vídeos: arrogancia y desprecio al aficionado común.",
      "<strong>La excusa de la seguridad:</strong> En algunos casos, Cristiano o su entorno alegan motivos de seguridad para justificar los empujones. Pero en muchos vídeos no hay amenaza real, solo aficionados pidiendo una foto.",
      "<strong>La ironía comercial:</strong> Cristiano, que ha hecho su fortuna vendiendo la imagen de «ídolo de masas», despide a los aficionados reales, a los que lo hicieron lo que es. La paradoja del producto que desprecia al consumidor.",
      "<strong>El balance:</strong> Empujones, rechazos de selfies y desprecio al aficionado común. Para los críticos, la arrogancia «por encima de todo» de Cristiano contradice la imagen cercana que vende en sus anuncios.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> Los vídeos de Cristiano rechazando selfies o empujando aficionados circulan por internet. El contexto exacto de cada caso varía.</div>"
    ],


    date:"2023年 — 多次",
    dateEn:"2023 — multiple times",
    location:"沙特 / 多地",
    locationEn:"Saudi Arabia / various",
    img:"assets/images/report/r-48.jpg",
    summary:"C罗多次在公开场合拒绝球迷合影、推开球迷，最典型的是2023年夺冠后推开一名想合影的球迷。与其\“爱球迷\”的公关人设形成巨大反差。",
    summaryEn:"Ronaldo has repeatedly refused fan photos and shoved fans in public — most notably pushing away a selfie-seeking fan after a 2023 title win. A stark contrast to his 'loves the fans' PR image.",
    detail:[
      "<strong>酒店推搡球迷：</strong>据Goal.com报道，C罗在葡萄牙国家队下榻酒店外，对一名冲上前想合影的球迷<strong>当面推搡</strong>，并冷脸甩出“滚开”（Get out of here）。视频流出后，“傲慢”标签再度被牢牢贴在他身上。",
      "<strong>5-0大胜后的冷脸：</strong>另一次广为流传的事件中，葡萄牙5-0大胜后，一名突破安保的球迷试图与他自拍，C罗非但没有配合，反而<em>一把将人推开</em>。Forbes中东版与每日邮报均对此事进行了报道，引发两极化讨论。",
      "<strong>“高人一等”的姿态：</strong>这类事件并非孤例。从机场到训练基地，C罗多次被拍到对普通球迷摆臭脸、甩手拒绝、甚至言语呵斥。这种<strong>居高临下</strong>的态度，与他精心营造的“亲民偶像”形象形成强烈反差。",
      "<strong>与梅西的鲜明对比：</strong>舆论几乎本能地将其与梅西对照——梅西面对合影请求几乎来者不拒，甚至会主动停下脚步配合小球迷。这种反差被反复传播，进一步坐实了C罗“难伺候”的刻板印象。",
      "<strong>安保借口难服众：</strong>支持者以“自我保护”“安保风险”为其辩护，但批评者指出：真正的大牌球星懂得用微笑与简短配合化解尴尬，而非用暴力推开。把每一次靠近都视为威胁，本身即是<strong>过度防御</strong>的傲慢。",
      "<strong>人设的裂缝：</strong>一边是CR7品牌营销中“亲民、励志、感恩”的形象，一边是现实中屡屡推搡球迷的冷脸，这种割裂让“偶像滤镜”不断碎裂。当一个球星把粉丝视为麻烦而非衣食父母，<em>反噬</em>迟早会来。",
      "<strong>总评：</strong>推搡、拒绝自拍、鄙夷普通球迷。批评者认为，C罗「凌驾一切」的傲慢，恰恰与他广告中贩卖的亲民形象相悖。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>本文内容基于公开视频与媒体报道整理，事件细节可能存在不同说法，仅供参考。</div>"
    ],
    detailEn:[
      "<strong>Hotel shove:</strong> Per Goal.com, outside the Portugal national team hotel Ronaldo <strong>shoved a fan</strong> who rushed up for a photo, snapping coldly: 'Get out of here'. Once the video leaked, the 'arrogant' tag was reapplied — firmly.",
      "<strong>Cold face after 5-0 rout:</strong> In another widely shared incident, a fan broke through security for a selfie after Portugal's 5-0 win; Ronaldo not only refused, he <em>shoved the man away</em>. Forbes Middle East and the Daily Mail both covered it, and the debate split down the middle.",
      "<strong>The 'above it all' attitude:</strong> Such incidents are not isolated. From airports to training grounds, Ronaldo has repeatedly been caught pulling a long face at ordinary fans, waving them off or even telling them off. That <strong>condescending</strong> streak runs clean against the carefully cultivated 'fans-first idol' image.",
      "<strong>The Messi contrast is automatic:</strong> Public opinion makes the Messi comparison by instinct — a man who almost never refuses a selfie and will stop unprompted to humour young fans. That contrast gets shared and reshared on a loop, cementing Ronaldo's 'hard to deal with' stereotype.",
      "<strong>The security excuse won't wash:</strong> Supporters plead 'self-protection' or 'security risk'; critics counter that real big stars know how to smile, play along briefly and defuse the awkwardness — not shove. Treating every approach as a threat is its own kind of <strong>over-defensive</strong> arrogance.",
      "<strong>Cracks in the persona:</strong> On the one hand the CR7 brand markets 'approachable, inspiring, grateful'; on the other, the recurring cold shoulder to fans. That split keeps shattering the 'idol filter'. When a star treats supporters as a nuisance rather than the source of his livelihood, the <em>blowback</em> is only a matter of time.",
      "<strong>Verdict:</strong> Shoves, rejected selfies, contempt for the ordinary fan. For the critics, Cristiano's 'above-it-all' arrogance contradicts the approachable image he sells in his adverts.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong>This entry is compiled from public video and media reporting; event details may vary across accounts, and it is for reference only.</div>"
    ],
    tags:["推开球迷","拒绝合影","拒绝签名","2023夺冠","公关人设","傲慢","高人一等","对比梅西","亲民假象"],
    tagsEn:["shoved a fan","refused selfie","refused autograph","2023 title","PR persona","arrogance","above it all","vs Messi","faux-relatable image"],
    tagsEs:["empuja a un aficionado","rechaza selfie","rechaza autógrafo","título 2023","imagen de relaciones públicas","arrogancia","por encima de todo","vs Messi","falsa imagen cercana"]
  },
  {
    id:49, cat:"persona", catLabel:"人设争议", severity:3,
    dateIso:"2010-01-01",
    title:"“自律典范”人设崩塌 — 汉堡可乐样样来",
    titleEn:"'Discipline Icon' Persona Cracks — Burgers & Coke Galore",
    titleEs: "Se resquebraja el personaje «icono de disciplina» — hamburguesas y Coca-Cola",
    summaryEs: "Cristiano viene empaquetado como el profesional definitivo — sin alcohol, dieta estricta, entrenamientos de madrugada — pero las cámaras lo han pillado con hamburguesas, Coca-Cola y salidas nocturnas.",
    dateEs: "Varios momentos de la carrera",
    locationEs: "Diversas ocasiones",
    detailEs: [
      "<strong>El personaje:</strong> Cristiano se vende como el «<strong>icono de disciplina</strong>»: sin alcohol, dieta estricta, entrenamientos a las 4 de la madrugada, descansos de calidad y un sueño vigilado con rigor militar. Un ídolo del esfuerzo.",
      "<strong>Las imágenes contradictorias:</strong> Sin embargo, en múltiples ocasiones se le ha visto saltarse su propia disciplina: <strong>hamburguesas, Coca-Cola, comida rápida, salidas nocturnas</strong>. El contraste con el envase es clamoroso.",
      "<strong>El «bebe agua» y la Coca-Cola:</strong> Tras apartar la Coca-Cola en la Eurocopa 2021 (incidente n.º 16), se le vio en otras ocasiones bebiendo refrescos y comiendo comida basura. La paradoja del predicador que no cumple sus sermones.",
      "<strong>Las salidas nocturnas:</strong> Pese a su imagen de «recogimiento y descanso», Cristiano ha protagonizado salidas nocturnas, fiestas y eventos sociales hasta altas horas. El mito de la «disciplina monástica» se resquebraja.",
      "<strong>El marketing del esfuerzo:</strong> La «disciplina» es una construcción comercial: libros, documentales y campañas de marca venden la imagen del Cristiano sacrificado. La realidad, según sus detractores, se parece más a la de un ricachón que disfruta de la vida.",
      "<strong>El contraste con Messi:</strong> Mientras Messi mantiene un perfil discreto, Cristiano vende a todas horas su icono de la disciplina. La distancia entre imagen y realidad alimenta los memes de sus haters.",
      "<strong>El balance:</strong> El «icono de disciplina» es un personaje comercial que no sobrevive a las fotografías: Cristiano con comida basura, Cristiano en fiestas. El predicador del esfuerzo que vive como un multimillonario disipado.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> Las imágenes de Cristiano con comida rápida o en fiestas circulan por internet. La valoración sobre la «falsedad» del personaje es la tesis crítica de este archivo.</div>"
    ],


    date:"职业生涯各时期",
    dateEn:"Various points in career",
    location:"多场合",
    locationEn:"Various occasions",
    img:"assets/images/report/r-49.jpg",
    summary:"C罗被包装成“极度自律”典范——不喝酒、严格饮食、午夜训练。但多次被拍到吃汉堡、喝可乐、深夜派对，“自律”人设屡屡崩塌。",
    summaryEn:"Ronaldo is packaged as the ultimate disciplined pro — no alcohol, strict diet, midnight workouts — yet has been caught eating burgers, drinking Coke and hitting late-night parties. The 'discipline' facade cracks one leak at a time.",
    detail:[
      "<strong>自律人设的神话：</strong>多年来，C罗被包装成“营养教科书”般的自律典范——鸡胸肉、西兰花、永不含糖的饮食，仿佛生来与垃圾食品绝缘。这套<strong>“CR7式自律”</strong>叙事，是他商业帝国的核心卖点之一。",
      "<strong>挪走可乐的作秀：</strong>2020欧洲杯赛前发布会，C罗当众将桌上的两瓶可口可乐移走，举起水瓶喊出“喝水！”（Água!）。这一举动被吹捧为健康宣言，据称令可口可乐市值瞬间蒸发约40亿美元，营销效果拉满。",
      "<strong>汉堡与可乐的真实：</strong>然而多方爆料显示，C罗私下并非滴糖不沾。早年在曼联，他被队友撞见偷吃<strong>汉堡包</strong>；其前营养师与多位知情人士均提及他对可乐、甜食的偏爱。<em>人前戒糖，人后解馋</em>。",
      "<strong>商业反讽：</strong>一个私下也喝可乐的人，却靠“抵制可乐”收割健康人设红利，堪称足坛<strong>最具讽刺意味的营销</strong>。可口可乐作为欧洲杯官方赞助商被当场羞辱——而完成这场羞辱的，恰恰是可乐的潜在消费者。",
      "<strong>人设崩塌的连锁：</strong>“自律神话”与现实行为的落差，最终由公众信任买单。C罗的肌肉与体魄确实值得敬佩，但把他捧成“从不碰垃圾食品的圣徒”，本身就是一种<strong>过度营销</strong>，迟早会被细节戳破。",
      "<strong>偶像经济的通病：</strong>这并非C罗独有问题，而是整个体育偶像工业的缩影——把球员塑造成无瑕疵的超人，再用一个汉堡、一瓶可乐将其击碎。<em>造神与毁神</em>，本就是同一套流量逻辑的两面。",
      "<strong>总评：</strong>「纪律偶像」是一个经不起推敲的商业人设——C罗当着镜头大嚼垃圾食品、出入派对的画面便是明证。一个宣讲努力、却活得像个散漫亿万富翁的布道者。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>饮食细节多源于二手爆料，可能与事实有出入，本文仅作舆论现象梳理。</div>"
    ],
    detailEn:[
      "<strong>The discipline myth:</strong> For years Ronaldo was packaged as a 'nutrition textbook' paragon of self-discipline — chicken breast, broccoli, never a grain of sugar, as if born immune to junk food. That <strong>'CR7-style discipline'</strong> narrative is a core selling point of the business empire.",
      "<strong>The Coke-shifting show:</strong> At a Euro 2020 pre-match press conference, Ronaldo ostentatiously moved two Coca-Cola bottles off the table, raised a water bottle and shouted 'Água!'. The gesture was hailed as a health manifesto and reportedly wiped about $4 billion off Coca-Cola's market cap — peak marketing effect.",
      "<strong>The burgers-and-coke reality:</strong> Multiple leaks, however, suggest Ronaldo is not sugar-free behind closed doors. In his early United days teammates caught him sneaking <strong>burgers</strong>; his former nutritionist and several insiders have noted his fondness for Coke and sweets. <em>No sugar in public, snacking in private.</em>",
      "<strong>Commercial irony:</strong> Privately a Coke drinker, publicly harvesting the dividend of 'boycotting Coke' — this is football's <strong>most ironic marketing</strong>. Coca-Cola, an official Euro sponsor, was humiliated on the spot, while the man himself remains a potential customer.",
      "<strong>The domino effect of persona collapse:</strong> When the 'discipline myth' clashes with real behaviour, public trust collapses. Ronaldo's physique is genuinely admirable, but casting him as a 'saint who never touches junk food' is <strong>over-marketing</strong> that sooner or later gets punctured by a detail.",
      "<strong>The idol economy's common failing:</strong> Nor is this Ronaldo's problem alone — it is the whole sports-idol industry's routine: mould players into flawless supermen, then watch a single burger or bottle of Coke bring them down. <em>Building gods and tearing them down</em> are two halves of the same attention economy.",
      "<strong>Verdict:</strong> The 'discipline icon' is a commercial persona that cannot survive images of Cristiano with junk food and at parties. A preacher of effort who lives like a dissipated billionaire.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong>Dietary details mostly come from second-hand leaks and may not match reality; this entry only surveys the public-opinion phenomenon.</div>"
    ],
    tags:["自律人设","汉堡","可乐","深夜派对","酒精","人设崩塌","公关营销","CR7品牌"],
    tagsEn:["discipline persona","Hamburg","Coca-Cola","late-night party","alcohol","persona collapse","PR marketing","CR7 brand"],
    tagsEs:["imagen de disciplina","Hamburgo","Coca-Cola","fiesta nocturna","alcohol","caída de la imagen","marketing de relaciones públicas","marca CR7"]
  },
  {
    id:50, cat:"persona", catLabel:"人设争议", severity:3,
    dateIso:"2010-01-01",
    title:"“慈善”作秀争议 — 捐款拍照一条龙",
    titleEn:"'Charity Show' Controversy — Donate, Pose, Post",
    titleEs: "Polémica del «espectáculo benéfico» — dona, posa, publica",
    summaryEs: "La «caridad» de Cristiano, tachada una y otra vez de performativa: dona, hace la foto, publica el comunicado. Al contrario que Messi, no consta que done discretamente a tantas causas.",
    dateEs: "Varios momentos de la carrera",
    locationEs: "Diversas ocasiones",
    detailEs: [
      "<strong>El patrón:</strong> La «caridad» de Cristiano no falla nunca: <strong>dona una cantidad, se hace la foto con el beneficiario, publica un comunicado en redes</strong>. La limosna con cámara.",
      "<strong>El gesto visible:</strong> Para los críticos, más un acto de relaciones públicas que de generosidad discreta. La foto y el tuit suelen pesar tanto como la propia donación.",
      "<strong>El contraste con Messi:</strong> Messi, en cambio, mantiene un perfil discreto en sus acciones benéficas (a través de su Fundación Leo Messi). La diferencia de enfoque alimenta el debate sobre el «carácter» de cada uno.",
      "<strong>Los ejemplos mediáticos:</strong> El repertorio es amplio: subastas de camisetas, donaciones a hospitales, visitas a niños enfermos con cámara en mano. Cada acción, con su correspondiente cobertura.",
      "<strong>La duda de la sinceridad:</strong> Nadie duda de que las cantidades son importantes y las causas buenas; la duda es el <strong>carácter performativo</strong> de esas donaciones, hechas públicas para alimentar la imagen.",
      "<strong>El cálculo reputacional:</strong> Para los analistas de imagen, las acciones benéficas de Cristiano son parte de una estrategia deliberada de rehabilitación reputacional (sobre todo tras episodios oscuros como Las Vegas o el móvil roto).",
      "<strong>El balance:</strong> Dona, posa, publica. Para los críticos, la caridad de Cristiano es un espectáculo más que un acto de generosidad. Generosa en cifras, sí, pero también en autopromo.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> Las acciones benéficas de Cristiano son reales y verificables. La valoración sobre el «carácter performativo» es objeto de debate entre seguidores y críticos.</div>"
    ],


    date:"职业生涯各时期",
    dateEn:"Various points in career",
    location:"多场合",
    locationEn:"Various occasions",
    img:"assets/images/report/r-50.jpg",
    summary:"C罗的“慈善”自带流程：捐款必拍照、探望必直播、慈善赛必营销。对照梅西默默捐款、不开记者会的做派，他收到的评语是——“以善行换流量”。",
    summaryEn:"Ronaldo's 'charity' has been called performative again and again. The routine never changes: donate, snap a photo, post the press release. Messi donates quietly, no presser attached; Ronaldo stands accused of 'trading good deeds for clicks'.",
    detail:[
      "<strong>捐款拍照一条龙：</strong>C罗的慈善行为常以<strong>媒体同步发布</strong>收尾——捐款、探望、合影、通稿，一气呵成。从拍卖金球奖为许愿基金筹得60万欧，到捐出欧冠决赛60万欧奖金，每一次善举都恰到好处地被镜头记录。",
      "<strong>“作秀”质疑：</strong>批评者指出，真正的慈善是<strong>润物无声</strong>，C罗的公益却总带着浓重的个人品牌宣传色彩——每一次捐赠都伴随CR7 logo的露出与社交媒体的高调晒图，至于是善心驱动还是<em>流量计算</em>，通稿里没写。",
      "<strong>伊朗一亿美元假捐款：</strong>最典型的翻车案例是“C罗向伊朗捐赠1亿美元”的病毒式传闻。多家事实核查机构证实，这一说法<strong>毫无可信证据</strong>，纯属粉丝与营销号的集体造神，却已造成广泛的认知污染。",
      "<strong>血库献血的真诚？</strong>支持者常以C罗定期献血、不纹身以保血液纯净为例反驳。但即便是这一善举，也被反复收进个人宣传素材——<em>善意与营销</em>的边界，从来没能清晰过。",
      "<strong>“最慈善运动员”头衔：</strong>他曾被某机构评为“全球最慈善运动员”，该榜单的评选标准与数据来源却长期遭受质疑。当慈善变成<strong>排名竞赛</strong>，本真性打折，只是时间问题。",
      "<strong>真心与作秀的辩证：</strong>无论动机如何，受助者确实得到了帮助，这是事实。但公益行为被持续工具化为形象工程，公众的质疑便有了立足点。<strong>慈善不该是流量生意</strong>——哪怕这门生意确实有人受益。",
      "<strong>总评：</strong>捐赠、摆拍、发布。批评者认为，C罗的慈善更像一场秀，而非慷慨之举。数字上确实慷慨，自我营销也同样慷慨。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>慈善行为细节多源于公开报道，动机评判主观性强，本文仅呈现多方观点。</div>"
    ],
    detailEn:[
      "<strong>Donate-pose-post package:</strong> Ronaldo's charitable acts rarely travel alone — each arrives with a precise <strong>parallel media rollout</strong>: donation, visit, photo, press release, one seamless flow. From auctioning a Ballon d'Or to raise €600,000 for Make-A-Wish, to donating his €600,000 Champions League final bonus, every good deed is conveniently caught on camera.",
      "<strong>'Performative' critique:</strong> Critics hold that true charity is <strong>silent and invisible</strong>; Ronaldo's philanthropy arrives pre-branded. Every donation comes with CR7-logo exposure and high-profile social posts, blurring the line between kindness and <em>traffic calculus</em>.",
      "<strong>The Iranian '$100M' fabrication:</strong> The most textbook face-plant was the viral rumour that 'Ronaldo donated $100 million to Iran'. Multiple fact-checkers confirmed there was <strong>zero credible evidence</strong> — a collective myth built by fans and engagement accounts that plenty of people believed anyway.",
      "<strong>The blood-donation defence:</strong> Supporters often rebut with Ronaldo's regular blood donation — and his refusal to get tattooed, to keep his blood clean. But even this good deed is endlessly folded into his personal promotional material, where <em>goodwill and marketing</em> share a folder.",
      "<strong>The 'most charitable athlete' title:</strong> He was once named 'the world's most charitable athlete' by an organisation, but the criteria and data behind the ranking have long been questioned. When charity becomes a <strong>ranking contest</strong>, authenticity trades at a discount.",
      "<strong>Sincerity versus performance:</strong> Whatever the motive, the recipients did get help — that much is on the record. But when philanthropy is consistently weaponised as image-building, the scepticism writes itself. <strong>Charity should not be a traffic business</strong> — and on that, the critics have a case.",
      "<strong>Verdict:</strong> He donates, poses, posts. For the critics, Cristiano's charity is spectacle more than generosity. Generous in figures, yes — but equally generous in self-promotion.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong>Details of the charitable acts mostly come from public reporting; judging motive is highly subjective, and this entry only presents multiple viewpoints.</div>"
    ],
    tags:["慈善作秀","捐款拍照","高调行善","献血营销","慈善赛","对比梅西","UNICEF","公关素材"],
    tagsEn:["charity stunt","donate-and-pose","loud charity","blood-donation PR","charity match","vs Messi","UNICEF","PR material"],
    tagsEs:["caridad como espectáculo","donar y posar","caridad ostentosa","donación de sangre como marketing","partido benéfico","vs Messi","UNICEF","material de relaciones públicas"]
  },
  {
    id:51, cat:"violence", catLabel:"场内暴力", severity:3,
    dateIso:"2010-01-01",
    title:"竖中指 + 场上侮辱手势合集",
    titleEn:"Middle Finger + On-Pitch Insulting Gestures",
    titleEs: "Dedo corazón + gestos insultantes en el campo",
    summaryEs: "Cristiano ha repetido gestos insultantes — dedos corazón incluidos — a rivales, árbitros y aficionados; el caso más famoso, el «calma» al Camp Nou tras marcar, que muchos leyeron como un gesto obsceno.",
    dateEs: "Varios momentos de la carrera",
    locationEs: "Múltiples partidos",
    detailEs: [
      "<strong>El repertorio insultante:</strong> A lo largo de su carrera, Cristiano ha firmado una <strong>larguísima colección de gestos insultantes</strong> hacia rivales, árbitros y aficionados: dedos corazón, gestos de calma provocadores, manotazos al aire.",
      "<strong>El «calma» del Camp Nou:</strong> El más famoso: tras marcar un gol en el Camp Nou, Cristiano se giró hacia la grada y <strong>se llevó el dedo a la mejilla pidiendo «calma»</strong>, un gesto que muchos leyeron como obsceno o provocador.",
      "<strong>Los dedos corazón:</strong> En varias ocasiones, las cámaras han grabado a Cristiano mostrando <strong>el dedo corazón</strong> (o gestos similares) a rivales o aficionados que lo abucheaban. Imágenes que quedan como prueba de su poca deportividad.",
      "<strong>El gesto a la afición del Atlético:</strong> En un derbi madrileño, tras los cánticos hostiles de la afición rival, Cristiano respondió con un <strong>gesto provocador</strong> a la grada que le costó la amonestación y la correspondiente polémica.",
      "<strong>El patrón de respuesta:</strong> Cada vez que Cristiano es abucheado o provocado, su respuesta es el gesto insultante, no la deportiva. Poco profesional para un jugador de su talla.",
      "<strong>La permisividad:</strong> Pese a estos gestos, Cristiano rara vez ha sido sancionado con dureza. Para los críticos, el factor «estrella» lo blinda de castigos que un jugador normal sí recibiría.",
      "<strong>El balance:</strong> Dedos corazón, gestos de calma, provocaciones a la grada: Cristiano acumula un catálogo de gestos insultantes que retratan su poca tolerancia a la crítica y su escasa deportividad cuando se le provoca.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> Los gestos de Cristiano están documentados en vídeo. La interpretación de cada gesto varía según las partes.</div>"
    ],


    date:"职业生涯各时期",
    dateEn:"Various points in career",
    location:"多场比赛",
    locationEn:"Multiple matches",
    img:"assets/images/report/r-51.jpg",
    summary:"C罗在场上对对手、裁判、球迷都多次做过竖中指之类的侮辱性手势。最有名的那回冲的是马竞球迷，被镜头拍了个正着；对裁判，他则反复比划“你疯了”。",
    summaryEn:"Ronaldo's career carries a steady tally of insulting gestures aimed at opponents, referees and fans — middle fingers and the like. The most famous entries: the finger caught on camera at Atlético fans, and repeated 'you're crazy' gestures at referees.",
    detail:[
      "<strong>沙特竖中指事件：</strong>2024年2月，利雅得胜利3-2击败青年党后，面对高喊梅西名字的客队球迷，C罗公然做出<strong>不雅手势</strong>——被广泛解读为竖中指或摸下体的挑衅动作。视频迅速在全球刷屏。",
      "<strong>禁赛一场的处罚：</strong>沙特足协随后对C罗开出<strong>禁赛一场+罚款</strong>的罚单，理由是“挑衅球迷”。但众多评论员指出，这一处罚明显偏轻——若换作其他球员，在沙特严苛的体育法规下恐难逃更重制裁。",
      "<strong>“梅西”咒语，一喊就灵：</strong>堂堂五座金球奖得主，听见对手球迷喊死敌的名字便当场失态——这种<strong>心理脆弱</strong>，与“球王”人设严重不符。对手球迷什么都不用做，喊对名字就够了。",
      "<strong>侮辱手势合集：</strong>竖中指并非孤例。整个职业生涯，C罗多次被拍到对球迷、对手甚至裁判做出争议手势——从最经典的“<em>calma calma</em>”到肘击、踢人、摔队长袖标；场上情绪管理，一直是他的<strong>软肋</strong>。",
      "<strong>双重标准的庇护：</strong>这些行为若是其他球员所为，早已被舆论口诛笔伐、追加禁赛；而C罗往往能凭借巨星身份获得相对宽容的处理。<em>名气成了免罪金牌</em>——这本身就是一种不公。",
      "<strong>情绪管理的失分项：</strong>技术与体能或许可登峰造极，情绪智力却是短板——在“完美偶像”的赛道上，C罗始终差着最后一步。<strong>控制不了中指的人</strong>，也难以完全控制自己的历史评价。",
      "<strong>总评：</strong>比心、“冷静”手势、挑衅看台——C罗攒下了一整套侮辱性手势目录，配方始终不变：对批评的低容忍，受挑衅时少得可怜的体育风度。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>本文基于公开赛事画面与处罚公告整理，行为性质存在不同解读，仅供参考。</div>"
    ],
    detailEn:[
      "<strong>The Saudi middle-finger incident:</strong> In February 2024, after Al Nassr's 3-2 win over Al Shabab, with away fans chanting 'Messi', Ronaldo answered with a <strong>controversial gesture</strong> — widely read as a middle finger or a crotch-grab. The clip quickly circled the globe.",
      "<strong>A one-match ban:</strong> The Saudi FA subsequently banned Ronaldo for <strong>one match and fined him</strong> for 'provoking fans' — a punishment many pundits found conspicuously light; under Saudi sports law's strict standards, a different player would likely have faced a heavier sanction.",
      "<strong>Childish response to the 'Messi' spell:</strong> A five-time Ballon d'Or winner coming undone the moment opposition fans chant his rival's name — that <strong>mental fragility</strong> sits badly with the 'GOAT' persona. A true king is not unhinged by a few terrace chants.",
      "<strong>The insulting-gesture compilation:</strong> The middle finger is far from isolated. Across his career Ronaldo has repeatedly been caught gesturing at fans, opponents and even referees — from the classic '<em>calma calma</em>' to elbows, kicks and armband-tosses. On-pitch emotional management has long been the <strong>weak spot</strong> on the résumé.",
      "<strong>Double-standard protection:</strong> When other players do these things, they are dragged through the press and hit with extended bans; Ronaldo, thanks to his superstar status, repeatedly gets the lighter end of the scale. <em>Fame as a get-out-of-jail card</em> — rarely declined.",
      "<strong>Emotional IQ as the missing grade:</strong> Technique and fitness can both peak; emotional intelligence is the column where Ronaldo is forever one grade short of the 'perfect idol'. <strong>A man who cannot control his middle finger</strong> is in no position to dictate his own historical verdict.",
      "<strong>Verdict:</strong> Heart gestures, 'calm' signals, provocations aimed at the stands — Cristiano has amassed a catalogue of insulting gestures that speaks plainly of a thin skin and scant sportsmanship when provoked.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong> This entry is compiled from public match footage and punishment notices; readings of the gestures vary, and it is for reference only.</div>"
    ],
    tags:["竖中指","马竞球迷","你疯了","摊手","翻白眼","闭嘴手势","挑衅","侮辱裁判","向下欺凌"],
    tagsEn:["middle finger","Atlético fans","you're crazy","throws hands up","eye-roll","silence gesture","provocation","insulting the ref","punching down"],
    tagsEs:["dedo corazón","afición del Atlético","estás loco","brazos en alto","poniendo los ojos en blanco","gesto de silencio","provocación","insulto al árbitro","abusar del débil"]
  },
  {
    id:52, cat:"national", catLabel:"国家队争议", severity:3,
    dateIso:"2018-06-15",
    title:"2018世界杯帽子戏法后的狂妄庆祝",
    titleEn:"Arrogant Celebration After 2018 World Cup Hat-Trick",
    titleEs: "Celebración arrogante tras el hat-trick del Mundial 2018",
    summaryEs: "En la fase de grupos del Mundial 2018, Portugal empató 3-3 con España con hat-trick de Cristiano; las celebraciones y el «yo soy el mejor» marcaron el tono de su torneo.",
    dateEs: "15 jun 2018",
    locationEs: "Rusia (Portugal vs España)",
    detailEs: [
      "<strong>El partido:</strong> El 15 de junio de 2018, en el primer partido de Portugal en el Mundial de Rusia, Cristiano protagonizó un partidazo: <strong>hat-trick</strong> ante España (3-3) en la fase de grupos.",
      "<strong>El primer gol (penalti):</strong> Cristiano abrió el marcador de penalti. El gesto de «calma» que vino después dejó claro el tono del partido: él era el protagonista, aunque fuese solo un penalti.",
      "<strong>El segundo y tercer gol:</strong> Cristiano volvió a marcar —golazo de falta en el descuento incluido— para certificar el hat-trick, y lo remató con los brazos abiertos y el «yo soy el mejor»: la imagen del partido.",
      "<strong>La celebración chula:</strong> Tras cada gol, Cristiano desplegó el repertorio más chulo: gesto de calma, brazos en cruz, mirada desafiante. Un espectáculo personal por encima del resultado.",
      "<strong>El contraste con el resultado:</strong> El partido acabó 3-3, un empate. Cristiano lo vivió como un triunfo personal: «he marcado tres goles a España». Para sus críticos, la prueba de que el ego iba por delante del equipo.",
      "<strong>El resto del Mundial:</strong> Pese al hat-trick inicial, Portugal cayó eliminada en octavos de final contra Uruguay (1-2), con Cristiano invisible. La promesa del primer partido se quedó en nada.",
      "<strong>El balance:</strong> Un hat-trick espectacular ante España, sí, pero acompañado de celebraciones chulas que retrataban el ego desbordado de Cristiano. El Mundial 2018 acabó en fracaso colectivo, pese al estreno goleador.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> El hat-trick de Cristiano a España en el Mundial 2018 es un hecho histórico. La valoración sobre su celebración y el rendimiento posterior de Portugal es objeto de debate.</div>"
    ],


    date:"2018年6月15日",
    dateEn:"Jun 15, 2018",
    location:"俄罗斯 (葡萄牙vs西班牙)",
    locationEn:"Russia (Portugal vs Spain)",
    img:"assets/images/report/r-52.jpg",
    summary:"2018世界杯小组赛，葡萄牙3-3西班牙，C罗上演帽子戏法；赛后的狂妄庆祝与“我就是历史最佳”的暗示同步刷屏。至于结局——葡萄牙16强出局。",
    summaryEn:"Portugal drew Spain 3-3 in the 2018 World Cup group stage, Ronaldo scoring the hat-trick; the cocky celebration and its 'I'm the best in history' subtext did the rounds — then Portugal went out in the last 16.",
    detail:[
      "<strong>对阵西班牙的帽子戏法：</strong>2018年俄罗斯世界杯小组赛，葡萄牙3-3战平西班牙，C罗<strong>独中三元</strong>——点球、左脚爆射、第88分钟任意球绝平。这是世界杯历史上首次有人对西班牙上演帽子戏法，确实是现象级个人表演。",
      "<strong>狂妄的庆祝：</strong>然而，比进球更刷屏的是他进球后的<strong>下巴抚摸庆祝</strong>（chin-stroking），被广泛解读为“我就是历史最佳”的自我宣告。自信与狂妄之间的边界，就在那一刻被他摸着下巴抹掉了。",
      "<strong>“历史最佳”的自诩：</strong>赛后采访与后续纪录片里，C罗多次以<strong>“史上最佳球员”</strong>自居，话里话外透着一股“无人可比”的傲气。自我加冕自有实力打底，只是翻来覆去全是这套词，就成了<em>令人不适的自恋</em>。",
      "<strong>个人英雄 vs 团队出局：</strong>帽子戏法被封神也没用，葡萄牙当届世界杯依然<strong>止步16强</strong>。一个人的高光盖不住团队的平庸——“历史最佳”的表演再卖力，终究换不来一座大力神杯。",
      "<strong>与梅西的镜像对照：</strong>媒体照例拿他和梅西作对比——后者同年世界杯同样表现出色，只是更显内敛。这副张扬，部分球迷读出真性情，另一部分读出<strong>过度自我中心</strong>的病态。",
      "<strong>“我即历史”的危险：</strong>当一个运动员把“历史最佳”挂在嘴边、写进庆祝动作，等于<em>强行绑架历史评价</em>——真正的伟大由后人定义，轮不到本人提前盖章。C罗的傲慢，正是这类巨星的通病，也是软肋。",
      "<strong>总评：</strong>对西班牙的帽子戏法足够精彩，只是配上那套张扬的庆祝，留下的印象只剩C罗失控的自我。开局明明进了球，2018年世界杯终究是一场集体失败。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>庆祝动作的解读存在主观性，“狂妄”评价仅为舆论倾向之一，不代表定论。</div>"
    ],
    detailEn:[
      "<strong>The hat-trick against Spain:</strong> In the 2018 World Cup group stage, Portugal drew Spain 3-3, and Ronaldo scored <strong>all three</strong> — a penalty, a left-footed thunderbolt, an 88th-minute free-kick equaliser. The first hat-trick ever scored against Spain at a World Cup, and every one of Portugal's goals on the night.",
      "<strong>Cocky celebration:</strong> More viral than the goals was the post-goal <strong>chin-stroking celebration</strong>, widely read as an 'I'm the best in history' declaration. The pose didn't so much brush the line between confidence and arrogance as set up camp on the far side of it.",
      "<strong>Self-anointed 'GOAT':</strong> In post-match interviews and later documentaries Ronaldo styled himself the <strong>'best player in history'</strong> on repeat, with the air of a man without a peer. The self-coronation rests on ability; it also gives off <em>a discomforting narcissism</em>.",
      "<strong>Hero versus team exit:</strong> For all the deified hat-trick, Portugal still went out in the <strong>round of 16</strong> of that World Cup. One man's brilliance could not mask the team's mediocrity, and the 'best in history' performance could not deliver a World Cup trophy.",
      "<strong>Messi mirror image:</strong> The media reached for the inevitable comparison — Messi, equally outstanding at that year's World Cup and far more restrained about it. Some fans read Ronaldo's bravado as authenticity; others as the pathology of <strong>excessive self-centredness</strong>.",
      "<strong>The danger of 'I am history':</strong> When an athlete wears 'best in history' on his sleeve and choreographs it into his celebrations, he is in effect <em>hijacking history's verdict</em>. True greatness is usually defined by future generations, not self-issued. Ronaldo's arrogance is the textbook failing of this kind of superstar.",
      "<strong>Verdict:</strong> A spectacular hat-trick against Spain, yes — but delivered with a celebration that laid Cristiano's runaway ego bare. The 2018 World Cup still ended as a collective failure, goal-laden opener notwithstanding.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong>The reading of the celebration involves subjectivity; the 'arrogant' verdict is one strand of public opinion, not a final word.</div>"
    ],
    tags:["2018世界杯","帽子戏法","西班牙","siuuu","狂妄庆祝","16强出局","一己之力营销","对比梅西","淘汰赛0球"],
    tagsEn:["2018 World Cup","hat-trick","Spain","siuuu","arrogant celebration","Round of 16 exit","one-man marketing","vs Messi","0 knockout goals"],
    tagsEs:["Mundial 2018","hat-trick","España","siuuu","celebración arrogante","eliminado en octavos","marketing en solitario","vs Messi","0 goles en eliminatorias"]
  },
  {
    id:53, cat:"club", catLabel:"俱乐部与法律", severity:3,
    dateIso:"2018-01-01",
    title:"尤文图斯更衣室孤立 + 被队友嫌弃",
    titleEn:"Juventus Dressing-Room Isolation — Shunned by Teammates",
    titleEs: "Aislamiento en el vestuario de la Juventus — marginado por los compañeros",
    summaryEs: "Tres años de Cristiano en la Juventus: el vestuario pasó de la armonía al aislamiento; Dybala, Pjanić y otros se hundieron y acabaron marchándose.",
    dateEs: "2018 — 2021",
    locationEs: "Turín",
    detailEs: [
      "<strong>El fichaje bomba:</strong> En 2018, la Juventus fichó a Cristiano por 100 millones de euros para ganar la Champions. Llegaba como el salvador; su etapa en Turín terminó en <strong>frustración y aislamiento</strong>.",
      "<strong>El vestuario dividido:</strong> En solo tres años, el vestuario de la Juve pasó de la armonía de la dinastía (9 Ligas seguidas) a la división y el resentimiento. El portugués acaparaba balón, penales y focos.",
      "<strong>Dybala marginado:</strong> <strong>Paulo Dybala</strong>, la estrella ofensiva de la Juve hasta la llegada de Cristiano, se hundió a su sombra. Compartir delantera con quien monopolizaba tiros y penales le apartó del equipo.",
      "<strong>Pjanić y la salida:</strong> <strong>Miralem Pjanić</strong>, motor del centro del campo juventino, también entró en declive con Cristiano y acabó marchándose al Barça en 2020. El protagonismo del portugués sentaba mal en el vestuario.",
      "<strong>El vestuario italiano:</strong> Para la prensa italiana, Cristiano generó un ambiente tóxico. Los jugadores italianos (Chiellini, Bonucci) intentaban mantener el orden, pero la jerarquía era clara: todo giraba en torno al portugués.",
      "<strong>El balance deportivo:</strong> En los 3 años de Cristiano, la Juve ganó 2 Ligas y 1 Copa, pero no la Champions (objetivo del fichaje) y, de paso, <strong>perdió la dinastía de la Serie A</strong> en 2021.",
      "<strong>El escándalo contable:</strong> La marcha de Cristiano coincidió con el estallido del caso contable de la Juve (plusvalenze), en el que los sueldos del portugués tuvieron su papel. Visto con perspectiva, el fichaje fue un desastre económico y deportivo.",
      "<strong>La factura:</strong> Tres años de aislamiento, compañeros marginados (Dybala, Pjanić), pérdida de la dinastía de la Serie A y ningún título de Champions. La era Cristiano en la Juve fue, para los críticos, la prueba del «rompeequipos».",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> El declive de la Juventus tras la llegada de Cristiano es un hecho, aunque obedece a múltiples factores. La atribución a Cristiano es la tesis de sus críticos.</div>"
    ],


    date:"2018 — 2021",
    dateEn:"2018 — 2021",
    location:"都灵",
    locationEn:"Turin",
    img:"assets/images/report/r-53.jpg",
    summary:"C罗在尤文三年，更衣室从和谐一路滑向孤立。迪巴拉、皮亚尼奇等核心被要求「配合C罗」后状态暴跌，基耶利尼等老将对他的特权待遇日益不满——到头来，意甲王朝旁落，欧冠依旧零冠。",
    summaryEn:"Across Ronaldo's three Juventus years the dressing room slid from harmony to isolation: Dybala, Pjanić and others nosedived once the orders came down to 'serve Ronaldo', and veterans like Chiellini grew resentful of his privileges.",
    detail:[
      "<strong>更衣室孤立的报道：</strong>据《米兰体育报》（La Gazzetta dello Sport）报道，C罗在尤文图斯期间<strong>被队友孤立</strong>，更衣室关系紧张。原因说来不复杂：队友普遍认为俱乐部给予他的<strong>特权与自由过多</strong>，原有的团队平衡随之打破。",
      "<strong>特权引发不满：</strong>从单独的训练计划、专属营养师，到赛后采访与商业活动的优先权，C罗在尤文享受的待遇远超常人。基耶利尼、迪巴拉等核心球员虽表面客气，私下对这种<em>一人之上的金字塔结构</em>颇有微词。",
      "<strong>迪巴拉的牺牲：</strong>最直接的受害者是<strong>迪巴拉</strong>（Paulo Dybala）。为了让C罗舒适，尤文不得不调整战术体系，迪巴拉被迫让出核心位置、改打边缘角色，两人的化学反应始终不温不火，阿根廷人的天赋被系统性浪费。",
      "<strong>《孤注一掷》的曝光：</strong>亚马逊纪录片《All or Nothing》把矛盾直接搬上屏幕——C罗在更衣室对队友<strong>爆粗怒骂</strong>，与夸德拉多在场上激烈争执。画面俱在，「难以共事」的标签并非媒体杜撰，是本人出镜坐实。",
      "<strong>基耶利尼的尴尬：</strong>作为队长，基耶利尼不得不在维护C罗面子与照顾本土球员情绪之间<strong>艰难走钢丝</strong>。一次对阵AC米兰赛后，他与C罗的合影事件把队内微妙的权力失衡摆上台面——<em>大哥变成配角</em>。",
      "<strong>团队战绩的代价：</strong>C罗个人数据依旧耀眼，但尤文在欧冠始终无法突破，意甲统治力逐年下滑。当一支球队围绕一个「特权孤岛」运转，<strong>集体战斗力</strong>必然受损——尤文这场三年实验，代价由全队分摊。",
      "<strong>账目丑闻：</strong>C罗的离队恰逢尤文账目丑闻（plusvalenze，虚增资本案）爆发，葡萄牙人的薪水也是其中一环。事后复盘：这笔签约在经济与竞技层面，都是一场灾难。",
      "<strong>总评：</strong>三年孤立、边缘化队友（迪巴拉、皮亚尼奇）、丢掉意甲王朝、欧冠零冠。在批评者眼中，C罗的尤文时代正是「球队破坏者」的现成铁证。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>更衣室内部情况多源于媒体报道与纪录片片段，可能与当事人视角有出入，仅供参考。</div>"
    ],
    detailEn:[
      "<strong>Isolation reports:</strong> According to La Gazzetta dello Sport, Ronaldo spent his Juventus years <strong>isolated by teammates</strong>, dressing-room relations tense throughout. The cause: the squad broadly felt the club had granted him <strong>excessive privileges and freedoms</strong>, and the existing team balance quietly rotted away.",
      "<strong>Privilege breeds resentment:</strong> From a bespoke training plan and a personal nutritionist to the front of the queue for post-match interviews and commercial events, Ronaldo's treatment at Juve sat far beyond anyone else's. Veterans like Chiellini and Dybala stayed outwardly polite and muttered in private about the <em>pyramid with one man at the top</em>.",
      "<strong>Dybala's sacrifice:</strong> The most direct victim was <strong>Paulo Dybala</strong>. To make Ronaldo comfortable, Juve had to reshape the system, forcing Dybala out of the core role and into the margins. The chemistry between the two was never more than lukewarm, and the Argentine's talent was systematically wasted.",
      "<strong>'All or Nothing' exposes it:</strong> The Amazon documentary 'All or Nothing' put the conflict on screen — Ronaldo <strong>swearing loudly at teammates</strong> in the dressing room, and clashing fiercely with Cuadrado on the pitch. The footage confirmed that the 'hard to work with' label was no media invention.",
      "<strong>Chiellini's awkwardness:</strong> As captain, Chiellini had to <strong>walk a tightrope</strong> between sparing Ronaldo's pride and looking after the local players' feelings. After one AC Milan match a photo-op incident between him and Ronaldo further exposed the dressing-room's delicate power imbalance — <em>the big brother reduced to a supporting role</em>.",
      "<strong>The collective cost:</strong> Ronaldo's personal numbers remained glittering, but Juventus could not break through in the Champions League and their Serie A dominance eroded year by year. When a team is built around a 'privileged island', <strong>the collective</strong> inevitably pays the price — the bitterest lesson of Juve's three-year experiment.",
      "<strong>The accounting scandal:</strong> Cristiano's departure coincided with the explosion of Juve's accounting scandal (plusvalenze), in which the Portuguese star's wages played their part. In hindsight, the signing was an economic and sporting disaster.",
      "<strong>Verdict:</strong> Three years of isolation, marginalised teammates (Dybala, Pjanić), a lost Serie A dynasty and no Champions League title. For the critics, the Cristiano era at Juve was living proof of the 'team-breaker'.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong> Inside-dressing-room details mostly come from media reporting and documentary clips, and may differ from the parties' perspectives; for reference only.</div>"
    ],
    tags:["尤文","更衣室孤立","迪巴拉","皮亚尼奇","基耶利尼","萨里","皮尔洛","无限开火权","特权","逃离"],
    tagsEn:["Juve","dressing-room isolation","Dybala","Pjanić","Chiellini","Sarri","Pirlo","unlimited shooting license","privilege","flight"],
    tagsEs:["Juve","aislamiento en vestuario","Dybala","Pjanić","Chiellini","Sarri","Pirlo","licencia infinita para tirar","privilegio","huida"]
  },
  {
    id:54, cat:"offpitch", catLabel:"场外失态", severity:3,
    dateIso:"2015-01-01",
    title:"社交媒体买粉 + 数据注水",
    titleEn:"Social-Media Fake Followers & Inflated Numbers",
    titleEs: "Seguidores falsos en redes y números inflados",
    summaryEs: "Los seguidores de Cristiano en Instagram superan los 600 millones, pero varios análisis señalan que una parte sustancial son bots y cuentas zombi; sus cifras infladas alimentan su imagen de ídolo global.",
    dateEs: "2015 — presente",
    locationEs: "Instagram / Twitter",
    detailEs: [
      "<strong>Los 600 millones:</strong> Cristiano es la <strong>persona con más seguidores de Instagram del mundo</strong>, con más de 600 millones. Una cifra colosal que se vende como prueba de su condición de ídolo global.",
      "<strong>Los seguidores falsos:</strong> Varios análisis —entre ellos los de empresas de analítica de redes sociales— señalan que una <strong>parte importante de esos seguidores son bots o cuentas zombi</strong>. La cifra de «humanos reales» es menor.",
      "<strong>El 24% de cuentas falsas:</strong> Según uno de estos análisis, alrededor del <strong>24,3% de los seguidores de Cristiano serían cuentas falsas</strong>. De 600 millones, entre 50 y 100 millones podrían ser bots.",
      "<strong>La inflación de cifras:</strong> Para los críticos, la cifra de seguidores de Cristiano es una métrica inflada que alimenta su imagen de ídolo global. El «ídolo de masas» tiene un porcentaje considerable de «masas» que no existen.",
      "<strong>Los «likes» también inflados:</strong> No solo los seguidores: parte de los «likes» y comentarios de Cristiano también serían producto de granjas de bots y campañas de marketing automatizadas.",
      "<strong>El marketing personal:</strong> Cristiano comercializa activamente su cuenta de Instagram: cada post patrocinado mueve millones. La inflación de cifras beneficia directamente al negocio personal del portugués.",
      "<strong>El balance:</strong> 600 millones de seguidores, sí, pero con una parte importante de cuentas falsas. Para los haters, los «números inflados» de Cristiano en redes son la metáfora perfecta de su carrera: cifras colosales, realidad algo más modesta.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> Los análisis sobre cuentas falsas en redes sociales son aproximados. La cifra de seguidores de Cristiano es real (la cuenta existe); el debate se centra en el porcentaje de cuentas auténticas.</div>"
    ],


    date:"2015 — 至今",
    dateEn:"2015 — present",
    location:"Instagram / Twitter",
    locationEn:"Instagram / Twitter",
    img:"assets/images/report/r-54.jpg",
    summary:"C罗的Instagram粉丝数突破6亿，但多项分析指出其中混着大量僵尸粉和机器人账号，其社交媒体互动率也远低于同级别球星。数据注水的疑云，至今未散。",
    summaryEn:"Ronaldo's Instagram followers top 600 million, but multiple analyses keep flagging the huge numbers of bots and zombie accounts inside that count, and his engagement rate lags well behind peers of similar stature — the stat-padding doubts persist.",
    detail:[
      "<strong>假粉比例：</strong>据Goal.com等多方分析，C罗 Instagram账号中约有<strong>24.3%的粉丝为虚假账号</strong>（fake followers）——他数亿美元的商业估值里，有相当一部分建立在<em>僵尸粉与机器人</em>之上。",
      "<strong>1亿假粉的体量：</strong>更早的分析显示，当其粉丝突破2亿时，已有约<strong>5020万账号</strong>被判定为非法或非活跃。Cheeky Punter的统计则估计，C罗的假粉总数高达约1亿，位居全球足球运动员之首。",
      "<strong>2026清粉事件：</strong>Meta在2026年发起的大规模机器人清理行动中，C罗一夜之间<strong>流失约1800万粉丝</strong>，账号从6.73亿骤降至6.66亿——Instagram历史上单日最大跌幅之一。",
      "<strong>商业估值的水分：</strong>凭借庞大的粉丝基数，C罗每条赞助帖报价高达数百万美元。但剔除假粉后，单条帖子的真实触达价值将大打折扣——<em>品牌方在为空气买单</em>。",
      "<strong>与梅西的共同困境：</strong>假粉问题并非C罗独有，梅西、内马尔等顶流同样受困。但C罗是粉丝数最多的运动员，<strong>绝对水分体量</strong>也最大——众矢之的，当之无愧。",
      "<strong>数据造神的反思：</strong>当“全球最火运动员”的桂冠建立在数千万机器人之上，所谓的影响力排名便沦为<strong>数字游戏</strong>。CR7商业帝国的辉煌，按含假量打个折，才更接近真实。",
      "<strong>总评：</strong>6亿粉丝，确实，但其中相当一部分是虚假账号。在黑粉眼中，C罗社交平台上「注水的数字」正是其生涯的最佳注脚：数字惊人，现实却略逊一筹。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>假粉比例数据因统计工具不同而异，本文采用公开报道数字，仅供参考。</div>"
    ],
    detailEn:[
      "<strong>The fake-follower share:</strong> According to Goal.com and other analyses, around <strong>24.3% of Cristiano's Instagram followers are fake</strong> — meaning a substantial portion of his multi-hundred-million-dollar commercial valuation rests on <em>zombie accounts and bots</em>.",
      "<strong>The 100-million-fake scale:</strong> Earlier analyses found that by the time his follower count broke 200 million, some <strong>50.2 million accounts</strong> had already been flagged as illegitimate or inactive. Cheeky Punter's stats estimated Ronaldo's total fake followers at about 100 million — the highest among footballers worldwide.",
      "<strong>The 2026 purge:</strong> When Meta ran its massive bot-sweep in 2026, Ronaldo lost <strong>about 18 million followers overnight</strong> — his account dropping from 673 million to 666 million, one of the largest single-day drops in Instagram history.",
      "<strong>The valuation bubble:</strong> Off the back of that follower base, Ronaldo commands millions of dollars per sponsored post. Strip out the fakes and the real reach of each post shrinks accordingly. <em>Brands are paying for air</em> — the influencer economy's bubble in microcosm.",
      "<strong>Messi shares the problem:</strong> To be fair, fake-follower issues are not Ronaldo's alone — Messi, Neymar and other megastars all carry them. But as the most-followed athlete on the planet, Ronaldo's <strong>absolute volume of fake followers</strong> is also the most staggering, which makes him the lightning rod.",
      "<strong>The data-driven myth:</strong> When the crown of 'world's most-followed athlete' is built on tens of millions of bots, the so-called influence ranking becomes a <strong>numbers game</strong>. The glories of the CR7 business empire may need a sizeable discount.",
      "<strong>Verdict:</strong> 600 million followers, yes — but a sizeable share of them are fake. For the haters, Cristiano's 'inflated numbers' on social media are the perfect metaphor for his career: colossal figures, a somewhat humbler reality.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong>Fake-follower percentages vary with the statistical tool used; this entry uses publicly reported figures and is for reference only.</div>"
    ],
    tags:["买粉","6亿粉丝","Instagram","僵尸粉","机器人","互动率","门德斯","对比梅西","数据注水"],
    tagsEn:["bought followers","600M followers","Instagram","fake followers","bots","engagement rate","Mendes","vs Messi","inflated stats"],
    tagsEs:["seguidores comprados","600 M de seguidores","Instagram","seguidores falsos","bots","tasa de interacción","Mendes","vs Messi","estadísticas infladas"]
  },
  {
    id:55, cat:"persona", catLabel:"人设争议", severity:3,
    dateIso:"2018-01-01",
    title:"球迷“结晶化” — C罗粉丝的极端化现象",
    titleEn:"'Crystallised' Fans — The Extremism of Ronaldo Stans",
    titleEs: "Fans «cristalizados» — el extremismo de los fans de Cristiano",
    summaryEs: "La afición de Cristiano ha derivado en un extremismo «cristalizado» en internet china: atacan a Messi, atacan a otros jugadores, insultan a cualquiera que critique a su ídolo.",
    dateEs: "2018 — presente",
    locationEs: "Internet chino / Global",
    detailEs: [
      "<strong>La «cristalización»:</strong> En la cultura de internet china, los fans más acérrimos de Cristiano son conocidos como «<strong>结晶</strong>» (cristalizados), por su devoción ciega y su militancia agresiva en defensa del ídolo.",
      "<strong>Ataques a Messi:</strong> Los fans cristalizados de Cristiano dedican buena parte de su actividad a <strong>atacar a Messi y a sus seguidores</strong>: desprecian sus logros, banalizan su Mundial, difunden memes despectivos contra el argentino.",
      "<strong>Ataques a otros jugadores:</strong> No solo Messi: cualquier jugador que se compare con Cristiano (Haaland, Mbappé, Neymar, Lewandowski) es blanco de los ataques de los cristalizados, que consideran a Cristiano intocable.",
      "<strong>Insultos a críticos:</strong> Cualquier usuario de redes que critique a Cristiano recibe el acoso organizado de los cristalizados: insultos, amenazas, campañas de reportes masivos para silenciar la crítica.",
      "<strong>La militancia organizada:</strong> Los cristalizados operan en foros como Bilibili, Zhihu y 虎扑, con campañas coordinadas para «defender» al ídolo y atacar a sus rivales. Una verdadera milicia digital.",
      "<strong>El contraste con otros fanáticos:</strong> Aunque todas las estrellas tienen fans acérrimos, los cristalizados se distinguen por su agresividad y por el peso de su militancia en la cultura futbolística china.",
      "<strong>El balance:</strong> Una afición militante y agresiva que retrata, para los críticos, el lado oscuro del «fenómeno Cristiano»: un ídolo que genera una devoción casi religiosa, con fans dispuestos a atacar a cualquiera que lo cuestione.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> La «cristalización» es un fenómeno real de la cultura de fans china, documentado en Bilibili y Zhihu. No todos los fans de Cristiano son «cristalizados».</div>"
    ],


    date:"2018 — 至今",
    dateEn:"2018 — present",
    location:"中文互联网 / 全球",
    locationEn:"Chinese internet / Global",
    img:"assets/images/report/r-55.jpg",
    summary:"C罗的粉丝群体在中文互联网养出了极端化的“结晶”文化——攻击梅西、攻击其他球星、为C罗的一切行为洗白。这种饭圈化现象，被视为C罗公关团队长期煽动的成果。",
    summaryEn:"On the Chinese internet, Ronaldo's fanbase has evolved an extremist 'crystal' culture: attacking Messi, attacking other stars, whitewashing every Ronaldo move — a fan-cult phenomenon read as a long-term product of his PR machine.",
    detail:[
      "<strong>“罗结晶”群体的形成：</strong>在中文足球圈，“结晶”指那些在偶像多次“掉粉操作”后依然死忠留下的粉丝。C罗的极端死忠被戏称为<strong>“罗结晶”</strong>，贬义明摆着；能饭圈化到这个深度，本身就是中国球迷文化的标志性现象。",
      "<strong>全网网暴的常态：</strong>据腾讯新闻等媒体报道，C罗的部分极端粉丝存在<strong>系统性网暴</strong>行为——反复攻击梅西及其球迷，道德绑架葡萄牙全队“必须为C罗而战”，对不配合的队友进行言语围剿。",
      "<strong>拉踩互撕的饭圈化：</strong>梅罗双方粉丝群体的<strong>互撕</strong>不断升级，从球技争论到人身攻击，从数据比拼到家族羞辱。新浪等平台指出，这种“日常极化”已成为体育饭圈暴力的典型，华南师大甚至把它写进了学术论文。",
      "<strong>主播煽动的骂战：</strong>知名主播如“李老八”，一句“梅西技术碾压C罗”就能引发双方粉丝的<strong>大规模对线</strong>。流量主播刻意制造对立、收割情绪，粉丝们则心甘情愿当那茬<em>情绪韭菜</em>。",
      "<strong>理性声音的微弱：</strong>豆瓣、Reddit等平台上也有球迷呼吁“别变得跟罗结晶一样NC饭圈”——承认C罗的优秀，并不等于必须贬低梅西。但在极端声浪的裹挟下，<strong>理性声音</strong>向来淹没得很快。",
      "<strong>偶像失格的连带：</strong>粉丝是偶像的镜子。C罗多次在公开场合流露的傲慢、对梅西的明嘲暗讽，都被极端粉丝默默记下，学成了<strong>行为示范</strong>。偶像本人都不克制，粉丝的理性自然无从谈起。",
      "<strong>总评：</strong>一支好斗而激进的拥趸群体，在批评者眼中拼出了「C罗现象」的暗面：一个几乎引发宗教式狂热的偶像，配上一群随时准备攻击任何质疑者的粉丝。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>粉丝群体行为不能代表全体C罗球迷，“结晶”为网络戏称，本文仅讨论饭圈化现象。</div>"
    ],
    detailEn:[
      "<strong>The 'crystal-fan' formation:</strong> In the Chinese football sphere, the slang 'crystal' (literally 'crystallised residue') denotes fans who stay die-hard loyal even after repeated 'face-plants' by their idol. Ronaldo's extremist diehards are dubbed <strong>'Ronaldo-crystals'</strong> — a distinctly derogatory tag, and the depth of that loyalty has become a fixture of Chinese fan culture.",
      "<strong>Normalised online violence:</strong> According to Tencent News and others, a section of Ronaldo's extremist fans runs <strong>systematic online violence</strong> — repeatedly attacking Messi and his fans, morally blackmailing the entire Portugal squad into 'fighting for Ronaldo', and verbally besieging teammates who don't fall into line.",
      "<strong>Camps at each other's throats:</strong> The <strong>infighting</strong> between the Messi and Ronaldo camps escalates by the day — from debates about skill to personal attacks, from stat comparison to family humiliation. Platforms like Sina have noted this 'daily polarisation' as a typical case of sports fan-cult violence; South China Normal University has gone as far as putting it into academic papers.",
      "<strong>Influencer-stoked flamewars:</strong> A single remark from a big streamer like 'Li Laoba' — 'Messi's technique crushes Ronaldo' — can trigger large-scale <strong>confrontations</strong> between the two camps. Engagement influencers deliberately manufacture division to harvest emotion, while the fans gladly volunteer as the <em>emotional leeks</em> to be harvested.",
      "<strong>Weak rational voices:</strong> On Douban, Reddit and elsewhere, some fans still urge others not to be 'Ronaldo-crystals', not to run an NC fandom — conceding Ronaldo's greatness does not require diminishing Messi. But under the extremist noise, <strong>rational voices</strong> are quickly drowned out.",
      "<strong>Idol misconduct ricochets:</strong> Fans are mirrors of their idols. Ronaldo's repeated public arrogance and veiled digs at Messi have quietly handed his extremist fans a <strong>behavioural template</strong>. When the idol shows no restraint, expecting rationality from the fans is wishful thinking.",
      "<strong>Verdict:</strong> A militant, aggressive fandom that, for the critics, is the dark side of the 'Cristiano phenomenon': an idol who inspires near-religious devotion — and fans ready to attack anyone who questions him.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong>Fan-group behaviour cannot represent all Ronaldo fans; 'crystal' is internet slang, and this entry only discusses the fan-cult phenomenon.</div>"
    ],
    tags:["结晶","极端粉丝","饭圈化","攻击梅西","洗白","水军","公关煽动","路人缘反噬","虎扑","贴吧"],
    tagsEn:["crystallised (stans)","extremist fans","fandom radicalisation","attacking Messi","image rehab","astroturfing","PR stoking","public-image backlash","Hupu","Baidu Tieba"],
    tagsEs:["cristalizados (fans)","fans extremistas","fans fanatizados","ataca a Messi","limpieza de imagen","comentarios comprados","manipulación mediática","rechazo del público","Hupu","Baidu Tieba"]
  },
  // ========== ↓↓↓ 续编新增（2026-07-03 ZCode） id:56+ ↓↓↓ ==========
  {
    id:56, cat:"national", catLabel:"国家队争议", severity:4,
    dateIso:"2006-07-01",
    title:"2006世界杯「眨眼门」 — 坑哭鲁尼",
    titleEn:"2006 World Cup 'Wink-Gate' — Sank Rooney",
    titleEs: "«Guiñogate» del Mundial 2006 — hundió a Rooney",
    summaryEs: "Tras la expulsión de Rooney por pisotón a Carvalho, las cámaras cazaron a Cristiano guiñando el ojo al banquillo — acusado de «chivarse» de su compañero del United para favorecer a Portugal.",
    dateEs: "1 jul 2006 · Gelsenkirchen",
    locationEs: "Alemania · Mundial Cuartos · Portugal vs Inglaterra",
    detailEs: [
      "<strong>El partido:</strong> Cuartos de final del Mundial 2006, Portugal-Inglaterra en Gelsenkirchen. Cristiano y su compañero del United <strong>Wayne Rooney</strong> se enfrentaban como rivales.",
      "<strong>El pisotón de Rooney:</strong> En una jugada, Rooney pisó a Ricardo Carvalho (compañero de Cristiano en Portugal) en la entrepierna. El árbitro lo amonestó y, presionado por los jugadores portugueses, acabó expulsándolo.",
      "<strong>El guiño:</strong> Tras la roja a Rooney, las cámaras captaron a <strong>Cristiano guiñando el ojo</strong> al banquillo portugués, como diciendo «misión cumplida». La imagen dio la vuelta al mundo.",
      "<strong>La acusación:</strong> Cristiano fue acusado de haberse «chivado» de su compañero del United, presionando al árbitro para que expulsara a Rooney, en beneficio de la selección portuguesa. Un gesto de deslealtad.",
      "<strong>Enemigo público n.º 1 en Inglaterra:</strong> Tras el guiño, Cristiano se convirtió en el <strong>enemigo público n.º 1</strong> en Inglaterra. La temporada siguiente, cada vez que tocaba el balón en la Premier, los aficionados ingleses lo abucheaban sin descanso.",
      "<strong>Su versión:</strong> Cristiano negó las acusaciones: «solo le guiñé el ojo al banquillo para decir que teníamos un jugador de más; no tuvo nada que ver con la roja de Rooney». Pocos le creyeron.",
      "<strong>La reconciliación con Rooney:</strong> Pese al incidente, Cristiano y Rooney siguieron jugando juntos en el United y, con los años, se reconciliaron públicamente. Pero el «guiñogate» quedó como una mancha en su carrera.",
      "<strong>El balance:</strong> El guiño que hundió a Rooney retrató el lado más calculador de Cristiano: un jugador dispuesto a perjudicar a un compañero de club si beneficiaba a su selección. El «guiñogate» sigue siendo una de sus imágenes más sonrojantes.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> El guiño de Cristiano en el Mundial 2006 es un hecho documentado (cámaras en directo). La intención exacta del gesto es objeto de debate hasta hoy.</div>"
    ],


    date:"2006年7月1日 · 盖尔森基兴",
    dateEn:"Jul 1, 2006 · Gelsenkirchen",
    location:"德国 世界杯1/4决赛 葡萄牙vs英格兰",
    locationEn:"Germany · World Cup QF · Portugal vs England",
    img:"assets/images/report/r-56.jpg",
    summary:"鲁尼蹬踏卡瓦略被罚下后，镜头捕捉到C罗朝替补席眨眼——被指「告状坑队友」。世界杯后，他顶着全英嘘声回到曼联。",
    summaryEn:"Rooney saw red for stamping on Carvalho; the cameras caught Ronaldo winking at the Portuguese bench — England accused him of 'grassing up a teammate'. He returned to United to a chorus of boos across the country.",
    detail:[
      "<strong>鲁尼红牌的来龙去脉：</strong>2006年德国世界杯1/4决赛，英格兰对阵葡萄牙。第62分钟，鲁尼踩踏卡瓦略被出示红牌。而当时身为鲁尼<strong>曼联队友</strong>的C罗，第一时间冲上去向裁判施压，间接促成了这张红牌。",
      "<strong>那记臭名昭著的眨眼：</strong>红牌一亮，镜头正好逮个正着——C罗朝葡萄牙替补席<strong>挤了挤眼睛</strong>（wink）。全英格兰把这一眨眼解读为「计谋得逞的庆祝」：他成功坑走俱乐部队友，为葡萄牙扫清障碍。",
      "<strong>「眨眼犯」的诞生：</strong>英国小报火力全开，《每日镜报》等媒体给C罗冠上<strong>「眨眼犯」</strong>（winker）的羞辱性称号。一时间，他成了<strong>全英公敌</strong>——无数球迷烧毁他的曼联球衣，要求俱乐部把他清洗出门。",
      "<strong>几乎断送曼联生涯：</strong>前曼联后卫韦斯·布朗透露，老特拉福德的更衣室一度因这次眨眼<strong>濒临分裂</strong>。鲁尼与C罗的关系降至冰点，弗格森不得不亲自斡旋，才勉强把两人重新捏合到一起。",
      "<strong>鲁尼的旧账：</strong>多年后，鲁尼在自传与采访里仍耿耿于怀，直言「宁愿葡萄牙进不了世界杯」。哪怕后来两人公开和解，那记眨眼在英格兰人心里留下的<strong>背叛感</strong>，至今未消。",
      "<strong>心机与胜利：</strong>支持者辩称C罗只是「求胜欲强」。但把俱乐部情谊当战术筹码，这种<strong>功利至上</strong>的做派，暴露的正是他为胜利不择手段的那一面。<em>胜利至上，情谊靠边</em>——这就是C罗性格里的冷酷底色。",
      "<strong>与鲁尼和解：</strong>尽管有过那一出，C罗与鲁尼此后仍在曼联并肩作战，多年后也公开和解。但「眨眼门」始终是他生涯里的一道污点。",
      "<strong>总评：</strong>那记坑了鲁尼的眨眼，勾勒出C罗最工于心计的一面——为成全国家队利益，俱乐部队友是可以牺牲的。「眨眼门」至今仍是他最尴尬的画面之一。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>眨眼的具体含义当事人有不同解释，本文采用主流舆论解读，仅供参考。</div>"
    ],
    detailEn:[
      "<strong>The Rooney red-card story:</strong> 2006 World Cup quarter-final, England vs Portugal, 62nd minute: Rooney stamped on Carvalho and was shown red. Ronaldo — at the time Rooney's <strong>United teammate</strong> — was first into the referee's face to apply pressure, nudging the card along.",
      "<strong>The infamous wink:</strong> After the red was shown, the cameras caught Ronaldo <strong>winking</strong> at the Portuguese bench. All of England read it as a 'mission accomplished' celebration — the club-mate successfully grassed up, Portugal's path cleared.",
      "<strong>The Mirror's 'winker':</strong> The British tabloids opened fire — the Daily Mirror aimed lowest, slapping Ronaldo with the moniker <strong>'the winker'</strong>. He became <strong>public enemy No.1 in England</strong>; fans burned his United shirt in droves and demanded the club ship him out.",
      "<strong>Nearly ended his United career:</strong> Former United defender Wes Brown revealed the Old Trafford dressing room at one point <strong>verged on splitting</strong> over the incident. Rooney's relationship with Ronaldo hit rock bottom; Ferguson had to mediate personally just to glue the two back together.",
      "<strong>Rooney's lingering grudge:</strong> Years later Rooney was still fuming in his autobiography and interviews — he 'would rather Portugal didn't qualify for the World Cup'. Even after the two publicly reconciled, the <strong>sting of betrayal</strong> from that wink still lingers in the English mind.",
      "<strong>Scheming versus winning:</strong> Supporters plead that Ronaldo was 'just ultra-competitive', but spending club-mate bonds like a tactical chip is precisely the <strong>utilitarian-to-the-bone</strong> streak that exposes his willingness to do anything to win. <em>Winning above all, friendship aside</em> — the cold undertone of Ronaldo's character.",
      "<strong>The Rooney reconciliation:</strong> Despite the incident, Cristiano and Rooney kept playing together at United and publicly reconciled. But «Winkgate» remained a stain on his career.",
      "<strong>Verdict:</strong> The wink that sank Rooney captured Cristiano at his most calculating: a player willing to harm a club teammate if it benefited his national team. «Winkgate» remains one of his most embarrassing images.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong> The exact meaning of the wink is explained differently by those involved; this entry follows the mainstream media reading and is for reference only.</div>"
    ],
    quote:{text:"我只是对替补席眨眼说我们人数占优了，和鲁尼的红牌没关系。", textEn:"I just winked at the bench to say we were a man up—it had nothing to do with Rooney's red card.", author:"C罗，2006年赛后辩解", authorEn:"Cristiano Ronaldo, post-match explanation, 2006", textEs:"Solo le guiñé el ojo al banquillo para decir que teníamos un jugador de más; no tuvo nada que ver con la roja de Rooney.", authorEs:"Cristiano Ronaldo, explicación post-partido, 2006"},
    tags:["眨眼门","2006世界杯","坑鲁尼","红牌","全英嘘声","每日镜报","背叛队友"],
    tagsEn:["Winkgate","2006 World Cup","sank Rooney","red card","booed across England","Daily Mirror","betrayed teammates"],
    tagsEs:["guiñogate","Mundial 2006","hundió a Rooney","tarjeta roja","abucheado en toda Inglaterra","Daily Mirror","traicionó a compañeros"]
  },
  {
    id:57, cat:"club", catLabel:"俱乐部与法律", severity:3,
    dateIso:"2006-06-01",
    title:"第一次离队风波 — 弗格森「卖鲁尼留他」的抉择",
    titleEn:"First Exit Storm — Ferguson's 'Keep Him, Sell Rooney' Call",
    titleEs: "Primera tormenta de salida — el «quédatlo, vende a Rooney» de Ferguson",
    summaryEs: "Tras el guiñogate, Cristiano quería marcharse y el Real Madrid lo pretendía; Ferguson se plantó, aguantó el tirón y lo retuvo; la leyenda incluso le atribuye un «quedaos con él, vended a Rooney».",
    dateEs: "Verano 2006 · Manchester United",
    locationEs: "Mánchester, Inglaterra",
    detailEs: [
      "<strong>La voluntad de salida:</strong> Tras el «guiñogate» del Mundial 2006, Cristiano era el enemigo público n.º 1 en Inglaterra. El portugués quería <strong>marcharse del United</strong> para escapar de un clima hostil que él mismo había encendido con un guiño.",
      "<strong>El Real Madrid al acecho:</strong> El <strong>Real Madrid</strong>, en plena era galáctica, olió la sangre y sondeó el fichaje de Cristiano: el presidente Calderón y el portugués mantuvieron contactos durante el verano de 2006.",
      "<strong>La reunión con Ferguson:</strong> Sir Alex Ferguson, consciente del talento que tenía entre manos, se plantó. En la reunión con el portugués le convenció para quedarse y prometió construir el equipo en torno a él.",
      "<strong>La promesa del Balón de Oro:</strong> Ferguson le prometió que, si se quedaba y trabajaba, ganaría el Balón de Oro. Promesa que cumplió: su primer Balón de Oro llegó en 2008, con el United.",
      "<strong>El mito «vended a Rooney»:</strong> La leyenda (recogida por la prensa inglesa) dice que, ante la tensión entre Cristiano y Rooney tras el guiño, Ferguson llegó a plantearse: «<strong>quedaos con él, vended a Rooney</strong>». Finalmente, se quedó con ambos.",
      "<strong>La temporada de la explosión:</strong> La temporada 2006-07 fue la de la explosión de Cristiano en el United: 23 goles, la Premier para el equipo y el estatus de estrella indiscutible. La decisión de Ferguson quedaba justificada, con intereses.",
      "<strong>El balance:</strong> La primera tormenta de salida de Cristiano se resolvió con Ferguson plantándose y reteniéndolo. Aquella temporada marcó el punto de inflexión que lo llevó a su primer Balón de Oro y al estrellato definitivo.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> La voluntad de salida de Cristiano en 2006 y la intervención de Ferguson son hechos documentados. La frase «vended a Rooney» forma parte de la leyenda periodística de la época.</div>"
    ],


    date:"2006年夏 · 曼联",
    dateEn:"Summer 2006 · Manchester United",
    location:"英格兰 曼彻斯特",
    locationEn:"Manchester, England",
    img:"assets/images/report/r-57.jpg",
    summary:"眨眼门后C罗萌生去意，皇马递来橄榄枝。弗格森力排众议留人，却让鲁尼心生芥蒂。",
    summaryEn:"Wink-gate had Ronaldo wanting out and Real Madrid came calling; Ferguson faced the choice, stared down the noise and kept him — leaving Rooney to nurse the grudge.",
    detail:[
      "<strong>世界杯后的离队念头：</strong>据SPORTbible等媒体报道，2006年德国世界杯后，C罗便已<strong>“同意离开曼联”</strong>。眨眼门让他成了全英公敌，老特拉福德彻底待不下去了，他迫切想投奔早已示好的皇马。",
      "<strong>皇马的暧昧示好：</strong>弗洛伦蒂诺治下的皇马长期对C罗抛媚眼，媒体放风、私下接触，<strong>撩拨</strong>个不停。这套“银河战舰”式的挖角手法，让C罗心思早已飞离曼彻斯特，红魔留人也愈发吃力。",
      "<strong>弗格森的强行留人：</strong>这回，<strong>弗格森爵士</strong>亲自出面，和C罗推心置腹地谈了一次。老爵爷给出“再留一年、必有回报”的承诺，<strong>情感牌与权威施压</strong>双管齐下，硬是将这桩转会按下不表。",
      "<strong>“至少再留一年”：</strong>BBC当时的报道记录了C罗的公开表态——“我至少会在曼联再留一年”。教练权威与球员意愿的博弈、弗格森治军手腕的<em>经典案例</em>，全在这句话里。",
      "<strong>留队换来的巅峰：</strong>被迫留守的C罗，反而在2007-08赛季迎来大爆发，率曼联豪夺英超与欧冠双冠，个人首夺金球奖。但这场“被迫的伟大”，也为2009年最终离队埋下了<strong>更深的伏笔</strong>。",
      "<strong>转会肥皂剧的开端：</strong>2006年的这场风波，开启了长达数年的“C罗转会皇马”连续剧：每年夏天准时上演一次离队传闻，俱乐部、球员、媒体三方合谋的<strong>流量盛宴</strong>，让红魔球迷疲惫不堪，也成了C罗“身在曹营心在汉”的早期证据。",
      "<strong>总评：</strong>C罗首次离队风波以弗格森强硬挽留告终。留下的那个赛季成了转折点——首座金球奖到手，通往巨星的路就此铺开。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>转会内幕多源于事后追溯报道，具体细节可能因当事人记忆有出入，仅供参考。</div>"
    ],
    detailEn:[
      "<strong>Post-World-Cup exit thoughts:</strong> Per SPORTbible and others, Ronaldo had already <strong>'agreed to leave United'</strong> after the 2006 World Cup in Germany. Wink-gate had made him public enemy in England, the mood around Old Trafford curdled, and he was desperate to join Real Madrid, who had long courted him.",
      "<strong>Real's flirtation:</strong> Under Florentino Pérez, Madrid had spent years making eyes at Ronaldo, <strong>teasing</strong> the move through media leaks and back-channel contact — the 'Galáctico' style of poaching. It worked: Ronaldo's head was already out of Manchester, and United's hold on him was weakening.",
      "<strong>Ferguson forces him to stay:</strong> Enter <strong>Sir Alex Ferguson</strong>, who sat Ronaldo down for a heart-to-heart. A 'stay one more year and it'll pay off' promise, plus a <strong>mix of arm-round-the-shoulder persuasion and flat authority</strong> — and the boss single-handedly parked the transfer.",
      "<strong>'At least one more year':</strong> BBC at the time logged Ronaldo’s public line: 'I'll stay at United for at least one more year'. A tug-of-war between the manager's authority and the player's wishes — also a <em>classic case</em> of Ferguson's man-management.",
      "<strong>The peak that staying produced:</strong> Forced to stay, Ronaldo exploded in the 2007-08 season — a Premier League + Champions League double with United, and his first Ballon d’Or. But this 'forced greatness' also laid a <strong>longer fuse</strong>, one that burned all the way to his eventual 2009 exit.",
      "<strong>The start of the soap opera:</strong> The 2006 storm opened the multi-year 'Ronaldo to Real' saga. Every summer served up another round of exit rumours; the <strong>content feast</strong>, jointly laid on by club, player and media, exhausted United fans — early evidence of Ronaldo's 'body at United, heart elsewhere'.",
      "<strong>Verdict:</strong> Cristiano's first exit storm ended with Ferguson digging in and keeping him. That season was the turning point — the one that carried Cristiano to his first Ballon d'Or and definitive stardom.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong>Transfer inside-information mostly comes from retrospective reporting; specific details may vary with the parties' memories and are for reference only.</div>"
    ],
    tags:["转会风波","弗格森","皇马","2006","留人","鲁尼芥蒂","更衣室"],
    tagsEn:["transfer saga","Ferguson","Real Madrid","2006","retention","Rooney grudge","dressing room"],
    tagsEs:["telenovela de fichaje","Ferguson","Real Madrid","2006","retención","rencilla con Rooney","vestuario"]
  },
  {
    id:59, cat:"club", catLabel:"俱乐部与法律", severity:3,
    dateIso:"2010-01-01",
    title:"欧冠「十六郎」时期 — 连续止步16强",
    titleEn:"The 'Last-16' Era — Stuck in the Champions League R16",
    titleEs: "La era «octavos» — atascado en los octavos de Champions",
    summaryEs: "En sus cuatro primeras temporadas en el Real Madrid, Cristiano cayó hasta tres veces en octavos de la Champions y se ganó el apodo de «rey de los octavos».",
    dateEs: "2010-2013 · Champions",
    locationEs: "UEFA Champions League",
    detailEs: [
      "<strong>La promesa del fichaje:</strong> En 2009, el Real Madrid fichó a Cristiano por 96 millones de euros para ganar la <strong>Champions League</strong>, título que se le resistía al club desde 2002. Pero los primeros años no estuvieron a la altura.",
      "<strong>Octavos 2010:</strong> En su primera temporada blanca (2009-10), el Madrid cayó eliminado en <strong>octavos de final</strong> contra el Olympique de Lyon. Un fracaso clamoroso.",
      "<strong>Octavos 2011:</strong> En 2010-11, el Madrid volvió a caer —ahora en <strong>semifinales</strong>— contra el Barça; en las dos temporadas siguientes (2011-12 y 2012-13), nueva eliminación en <strong>semifinales</strong>.",
      "<strong>Octavos 2012-13:</strong> Más concretamente, la eliminación en <strong>semifinales</strong> fue la tónica: en 2012-13, otra caída ante el Borussia Dortmund. La «década de los octavos» se leyó como un estancamiento.",
      "<strong>El apodo «rey de los octavos»:</strong> En internet chino, Cristiano y el Madrid de esa época fueron bautizados como «<strong>罗十六</strong>» (Luoshiliu, Cristiano octavos/16) por la recurrente caída en octavos o fases tempranas de la Champions.",
      "<strong>El contraste con Messi:</strong> Mientras el Barça de Messi ganaba Champions en 2009, 2011 y 2015, el Madrid de Cristiano no ganó ninguna hasta 2014.",
      "<strong>El cambio con Ancelotti:</strong> La maldición se rompió en 2014 con Carlo Ancelotti: el Madrid ganó la <strong>Decimotercera</strong> Champions (la primera de Cristiano) y encadenó cuatro títulos entre 2014 y 2018.",
      "<strong>El balance:</strong> Las primeras temporadas de Cristiano en el Madrid fueron una sucesión de caídas en octavos/semifinales de la Champions, lo que le valió el apodo de «rey de los octavos». La maldición se rompió en 2014.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> Las eliminaciones del Real Madrid en Champions entre 2010 y 2013 son hechos verificables. El apodo «rey de los octavos» forma parte de la cultura hater china.</div>"
    ],


    date:"2010-2013 · 欧冠",
    dateEn:"2010-2013 · Champions League",
    location:"欧洲冠军联赛",
    locationEn:"UEFA Champions League",
    img:"assets/images/report/r-59.jpg",
    summary:"加盟皇马前四个赛季，C罗三次在欧冠1/8决赛出局，「十六郎」绰号由此而来——个人数据照旧耀眼，球队战绩却不见起色。",
    summaryEn:"In his first four Real Madrid seasons, Ronaldo went out in the Champions League round of 16 three times — a run that bought him the 'Mr Last-16' moniker, an awkward fit next to his personal numbers.",
    detail:[
      "<strong>「十六郎」绰号的由来：</strong>C罗加盟皇马初期，这支「银河战舰」在欧冠却连续多个赛季<strong>止步16强</strong>，被中国球迷戏称为<strong>「欧冠十六郎」</strong>。这个绰号从此钉在皇马与C罗早期生涯上，成了难以摆脱的耻辱标签。",
      "<strong>2010年里昂之痛：</strong>2009/10赛季欧冠1/8决赛，皇马被法甲里昂以<strong>总比分2-1淘汰</strong>。C罗在次回合第6分钟早早破门，却无力回天。这支斥巨资打造的豪华阵容，竟连续六年迈不过16强这道坎，堪称世纪笑话。",
      "<strong>个人数据 vs 团队无冠：</strong>C罗的个人进球数据依旧耀眼，皇马的欧冠集体战绩却<strong>惨不忍睹</strong>。<em>一人进球，全队出局</em>——个人与团队之间的撕裂，就是「十六郎」时期最大的尴尬。",
      "<strong>「皇马黑洞」的质疑：</strong>媒体与球迷开始追问：是天价转会费与巨星政策失败了，还是C罗无法在欧冠关键战挺身而出？<strong>「皇马黑洞」</strong>的论调甚嚣尘上，C罗作为头牌，自然首当其冲。",
      "<strong>穆里尼奥时代的破局：</strong>直到2010年穆里尼奥入主，皇马才在2011/12赛季打破16强魔咒，连续三年闯入欧冠四强。只是破局的关键，更多被记在<strong>穆帅的战术革命</strong>头上，而非C罗一人之力。",
      "<strong>从十六郎到欧冠之王：</strong>后来的C罗用四座欧冠奖杯洗刷了这段耻辱，但「十六郎」时期的教训摆在那里——<em>个人再强，无团队亦是空谈</em>。所谓「欧冠之王」，并非从第一天就成立。",
      "<strong>安切洛蒂时代的转折：</strong>这一魔咒在2014年由卡尔洛·安切洛蒂打破：皇马捧起<strong>第十座</strong>欧冠（C罗的第一座），随后又在2014至2018年间连夺四冠。",
      "<strong>总评：</strong>C罗在皇马的前几个赛季屡屡折戟于欧冠八强/半决赛，由此得名「十六郎」。这一魔咒直到2014年才被打破。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>历史战绩为客观事实，“十六郎”绰号源于球迷戏称，本文仅作历史回顾。</div>"
    ],
    detailEn:[
      "<strong>The origin of 'Mr Last-16':</strong> In Ronaldo's early years at the club, the 'Galácticos' went out at the Champions League <strong>round of 16 for several seasons running</strong>, and Chinese fans duly coined the nickname <strong>'Mr Last-16 of the UCL'</strong>. The tag stuck to club and player alike — a humiliation neither could shake off.",
      "<strong>Lyon, 2010:</strong> In the 2009/10 Champions League round of 16, Real were <strong>knocked out 2-1 on aggregate</strong> by French side Lyon. Ronaldo opened the scoring in the 6th minute of the second leg; the tie still slipped away. A squad assembled at vast expense had now failed to escape the round of 16 for six straight years — the joke of the century, at full price.",
      "<strong>Personal stats versus collective failure:</strong> Ronaldo's personal scoring numbers stayed dazzling while Real's collective Champions League record was <strong>atrocious</strong>. <em>One man scoring, the whole team going out</em> — that was the 'Mr Last-16' era in a single line.",
      "<strong>The 'Real Madrid black hole' question:</strong> Media and fans began to ask: had the mega transfer fees and the galáctico policy failed? Or was Ronaldo incapable of stepping up in the UCL's biggest games? The <strong>'Real Madrid black hole'</strong> narrative swelled, and as the poster boy, Ronaldo bore the brunt.",
      "<strong>Mourinho breaks the curse:</strong> Only after Mourinho's arrival in 2010 did Real escape the round-of-16 curse in 2011/12 and reach three straight UCL semi-finals. The breakthrough, though, was credited more to <strong>Mourinho's tactical revolution</strong> than to Ronaldo alone.",
      "<strong>From Mr Last-16 to UCL King:</strong> Ronaldo would later wash the disgrace away with four Champions League titles. But the lesson of the 'Mr Last-16' years held — <em>however great an individual is, without the collective it's all talk</em>. And the 'UCL King' myth, for the record, was not true from day one.",
      "<strong>The Ancelotti turning point:</strong> The curse finally broke in 2014, under Carlo Ancelotti — Real Madrid lifted their <strong>tenth</strong> Champions League (Cristiano's first), then went on to claim four titles between 2014 and 2018.",
      "<strong>Verdict:</strong> Cristiano's first Real Madrid seasons ran on a loop of Champions League exits — the round of 16, then the semi-finals — earning him the 'king of the last 16' tag. The loop did not close until 2014.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong> Historical results are objective facts; the 'Mr Last-16' nickname originated as a fan joke. This entry is purely a historical retrospective.</div>"
    ],
    tags:["欧冠","十六郎","皇马","2010-2013","里昂","拜仁","个人vs团队","罗三票"],
    tagsEn:["Champions League","Mr. Round of 16","Real Madrid","2010-2013","Lyon","Bayern","individual vs team","Three-Vote Ronaldo"],
    tagsEs:["Champions League","rey de octavos","Real Madrid","2010-2013","Lyon","Bayern","individual vs equipo","Cristiano Tres Votos"]
  },
  {
    id:60, cat:"national", catLabel:"国家队争议", severity:3,
    dateIso:"2014-06-01",
    title:"2014世界杯带伤出战 — 小组出局后落泪",
    titleEn:"2014 World Cup on One Knee — Out in Groups, in Tears",
    titleEs: "Mundial 2014 de rodillas — eliminado en fase de grupos, en lágrimas",
    summaryEs: "Jugó con tendinosis rotuliana, marcó solo 1 gol y 1 asistencia en 3 partidos y Portugal cayó en fase de grupos; Cristiano se fue en lágrimas y declaró que «quería quemar la última gota».",
    dateEs: "Jun 2014 · Brasil",
    locationEs: "Brasil · fase de grupos del Mundial",
    detailEs: [
      "<strong>El Mundial de Brasil 2014:</strong> Cristiano llegó al Mundial 2014 arrastrando una <strong>tendinosis rotuliana</strong> (inflamación crónica del tendón de la rodilla) y, pese a las dudas físicas, decidió jugar con Portugal.",
      "<strong>La rodilla tocada:</strong> La lesión le limitó todo el torneo: jugó con la rodilla vendada, visiblemente mermado, sin la explosividad que le caracterizaba.",
      "<strong>El rendimiento:</strong> En los 3 partidos de fase de grupos, Cristiano dejó solo <strong>1 gol y 1 asistencia</strong>. Del Balón de Oro reinante se esperaba otra cosa.",
      "<strong>La eliminación:</strong> Portugal quedó <strong>eliminada en fase de grupos</strong>: derrota contra Alemania (0-4), empate contra EE. UU. (2-2) y victoria ante Ghana (2-1). Un fracaso clamoroso.",
      "<strong>El gol a Ghana:</strong> Su único gol del torneo llegó ante Ghana, en el tercer partido, con Portugal ya casi eliminada. La imagen de Cristiano celebrando —más mueca de frustración que júbilo— recorrió el mundo.",
      "<strong>Las lágrimas:</strong> Eliminado, Cristiano se fue en <strong>lágrimas</strong>. Declaró: «<strong>quería quemar la última gota por la selección, pero mi cuerpo no me lo permitió</strong>».",
      "<strong>El balance:</strong> Lesionado, de pobre rendimiento y eliminado en fase de grupos. Para los críticos, una nueva prueba de la desconexión entre el Cristiano de club (imparable) y el Cristiano de selección (irregular).",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> La lesión de rodilla de Cristiano en 2014 y la eliminación de Portugal en fase de grupos son hechos documentados.</div>"
    ],


    date:"2014年6月 · 巴西",
    dateEn:"Jun 2014 · Brazil",
    location:"巴西 世界杯小组赛",
    locationEn:"Brazil · World Cup group stage",
    img:"assets/images/report/r-60.jpg",
    summary:"拖着膝盖肌腱炎强行参赛，3场仅1球1助，葡萄牙小组出局。赛后落泪被批「为个人数据硬上」。",
    summaryEn:"He played through patellar tendinosis, managed just 1 goal and 1 assist in 3 games, and Portugal went out in the group stage; his tears were slammed as 'playing through injury just for personal stats'.",
    detail:[
      "<strong>带伤出战的决定：</strong>2014年巴西世界杯开赛前，C罗确诊<strong>髌骨肌腱炎</strong>（patellar tendinosis）——膝盖被过度使用磨出来的慢性劳损。医学专家把话挑明：<strong>不应参赛</strong>，否则可能留下长期不可逆的损伤。",
      "<strong>小组出局的惨淡：</strong>带伤出战的C罗状态全无，葡萄牙<strong>小组赛即遭淘汰</strong>，稳稳跻身当届世界杯最令人失望强队的行列。世界杯就在邻国巴西的地界上办着，葡萄牙连淘汰赛的门都没摸到——对这支球队、对C罗，这都是一记结结实实的闷棍。",
      "<strong>训练场冰敷的镜头：</strong>赛前训练，C罗一次次被拍到<strong>提前离场、左膝敷冰</strong>。伤有多重，镜头早就替全世界确认过了；但为国出战的压力叠加个人英雄主义，他还是选了<em>硬扛</em>，而不是休养。",
      "<strong>“不怪伤病”的嘴硬：</strong>出局之后，C罗公开表态<strong>“伤病不是借口”</strong>，拒绝把失败记在身体状态的账上。职业精神归职业精神，账归账：明知伤重仍执意上场，这本身就是一次<strong>战术与医疗上的失策</strong>。",
      "<strong>与梅西同年的残酷反差：</strong>同一年，梅西同样没能捧起大力神杯，却在俱乐部赛事与个人荣誉上照常收割；C罗的2014，则定格在<strong>带伤折戟</strong>。同一个年份、两种走向，这届世界杯就此成为C罗生涯的<em>至暗时刻</em>之一。",
      "<strong>短期荣誉 vs 长期健康的博弈：</strong>带伤出战换来的，顶多是“顽强拼搏”的虚名；押上去的，是职业生涯的健康储备。<strong>英雄主义与科学决策</strong>的冲突，在这届世界杯上被摆上了台面。",
      "<strong>本馆点评：</strong>一届该被遗忘的世界杯：带伤出战、表现平庸、小组出局。批评者的看法很简单——俱乐部C罗势不可挡，国家队C罗起伏不定，这届杯赛不过是又一条证据。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>伤病情节基于公开医疗报道与媒体记录，本文仅作赛事回顾，不构成医疗判断。</div>"
    ],
    detailEn:[
      "<strong>The decision to play injured:</strong> On the eve of the 2014 World Cup in Brazil, Ronaldo was diagnosed with <strong>patellar tendinosis</strong>, a chronic overuse condition in the knee. Medical experts warned him explicitly <strong>not to play</strong>, citing the risk of long-term, irreversible damage.",
      "<strong>The group-stage exit:</strong> Carrying the injury, Ronaldo was nowhere near his best and Portugal <strong>went out in the group stage</strong>, one of the most disappointing big sides of the tournament. For a heavyweight neighbour of hosts Brazil, the outcome was a devastating blow to Portuguese football and a reality check for Ronaldo.",
      "<strong>The training-pitch ice packs:</strong> In pre-match training Ronaldo was repeatedly filmed <strong>leaving early with ice on his left knee</strong>. The footage told the world how serious it was; the pressure to play for his country and a personal taste for heroics won out, and he chose to <em>grit through</em> rather than rest.",
      "<strong>The 'don't blame the injury' stubbornness:</strong> After the exit Ronaldo publicly insisted <strong>'the injury is no excuse'</strong>, refusing to attribute the failure to fitness. The stubbornness passes for professional spirit; it also conceals a fact: knowingly playing through a serious injury is itself a <strong>tactical and medical miscalculation</strong>.",
      "<strong>Cruel contrast with Messi:</strong> That same year Messi also missed out on a World Cup and spent it racking up club and individual honours; Ronaldo's 2014 closed with <strong>injury and an early exit</strong>. The contrast in their fortunes made this World Cup one of the <em>darker moments</em> of Ronaldo's career.",
      "<strong>Short-term glory versus long-term health:</strong> Playing injured may have earned him a fleeting reputation for 'gritty determination'; it may just as easily have overdrawn his career's health reserves. The clash between <strong>heroism and scientific decision-making</strong> was laid bare at this World Cup.",
      "<strong>Verdict:</strong> A World Cup to forget — injured, off the pace, out at the group stage. For the critics, further proof of the disconnect between the club Cristiano (unstoppable) and the international Cristiano (inconsistent).",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong>The injury details are based on public medical reporting and media records; this entry is purely a match retrospective and does not constitute medical advice.</div>"
    ],
    quote:{text:"我想为国家队燃烧最后一滴，可惜身体不允许。", textEn:"I wanted to burn my last drop for the national team, but my body wouldn't allow it.", author:"C罗，2014世界杯赛后", authorEn:"Cristiano Ronaldo, after the 2014 World Cup", textEs:"Quería quemar mi última gota por la selección, pero mi cuerpo no me lo permitió.", authorEs:"Cristiano Ronaldo, tras el Mundial de 2014"},
    tags:["2014世界杯","带伤","膝盖","落泪","小组出局","金球","梅罗对比"],
    tagsEn:["2014 World Cup","injured","knee","in tears","group-stage exit","Ballon d'Or","Messi vs CR7"],
    tagsEs:["Mundial 2014","lesionado","rodilla","lágrimas","eliminado en fase de grupos","Balón de Oro","Messi vs CR7"]
  },
  {
    id:61, cat:"club", catLabel:"俱乐部与法律", severity:3,
    dateIso:"2003-01-01",
    title:"球衣号码恩怨 — 抢7号、与拉莫斯的「传承」之争",
    titleEn:"Shirt Number Sagas — Seizing the No.7",
    titleEs: "Sagas del dorsal — adueñándose del n.º 7",
    summaryEs: "Del 7 de Beckham en el United al 7 de Raúl en el Real Madrid, pasando por el tira y afloja con Cuadrado en la Juve: el mismo número, club tras club.",
    dateEs: "2003 / 2009 / 2018 · múltiples clubes",
    locationEs: "Manchester United / Real Madrid / Juventus",
    detailEs: [
      "<strong>El n.º 7 del United (2003):</strong> Cuando Cristiano llegó al United en 2003, Ferguson le asignó el <strong>dorsal 7</strong>, histórico del club (Georgie Best, Eric Cantona, David Beckham). Cristiano heredaba un peso enorme.",
      "<strong>La sombra de Beckham:</strong> Coger el 7 que dejaba Beckham, recién marchado al Real Madrid, suponía una presión añadida para el joven Cristiano. Con los años, el dorsal dejaría de ser el de Beckham para ser el de Cristiano.",
      "<strong>El n.º 7 del Real Madrid (2009):</strong> En 2009, al fichar por el Madrid, Cristiano <strong>heredó el n.º 7 de Raúl</strong>, capitán y leyenda blanca. Coger el dorsal de Raúl fue todo un símbolo del traspaso de poder.",
      "<strong>El n.º 9 en la Juve (2018):</strong> En su llegada a la Juventus en 2018, el n.º 7 estaba ocupado por <strong>Cuadrado</strong>. Cristiano tuvo que conformarse con el n.º 9 en su primera temporada, hasta que Cuadrado le cedió el 7.",
      "<strong>El tira y afloja por el dorsal:</strong> El episodio del n.º 7 en la Juve fue un serial mediático. Cristiano quería su 7, Cuadrado acabó cediendo, y la operación dejó una imagen: «Cristiano lo quiere todo».",
      "<strong>El 7 como marca:</strong> El dorsal 7 es ya parte indisociable de la marca «CR7». Cristiano ha construido su imperio comercial en torno a ese número, que da nombre a hoteles, ropa interior y demás productos.",
      "<strong>El balance:</strong> Cristiano ha convertido el dorsal 7 en su seña de identidad personal y comercial. Pero el camino para hacerse con el 7 en cada club (sobre todo en la Juve) retrata su obsesión por el control de su imagen.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> La historia de los dorsales de Cristiano en sus clubes es verificable. El tira y afloja por el 7 en la Juve fue recogido por la prensa italiana.</div>"
    ],


    date:"2003 / 2009 / 2018 · 多家俱乐部",
    dateEn:"2003 / 2009 / 2018 · multiple clubs",
    location:"曼联 / 皇马 / 尤文",
    locationEn:"Manchester United / Real Madrid / Juventus",
    img:"assets/images/report/r-61.jpg",
    summary:"从曼联接过贝克汉姆留下的7号，到皇马接班劳尔的7号，再到尤文「让号」风波——C罗的7号情结贯穿生涯，剧情从没变过：号码必须是他的。",
    summaryEn:"From taking Beckham's old No.7 at United, to inheriting Raúl's No.7 at Real Madrid, to the 'hand it over' routine at Juventus — Ronaldo's No.7 fixation is the through-line of his entire career.",
    detail:[
      "<strong>接班小贝的7号：</strong>2003年，C罗加盟曼联，弗格森亲手将<strong>贝克汉姆离队后留下的7号球衣</strong>交到他手中。这件球衣先后属于乔治·贝斯特、布莱恩·罗布森、坎通纳、贝克汉姆，从此与「C罗」绑定，CR7品牌由此诞生。",
      "<strong>皇马初期的9号：</strong>2009年转投皇马时，C罗却只能身披<strong>9号</strong>——因为象征俱乐部的7号，仍属于队长<strong>劳尔·冈萨雷斯</strong>（Raúl）。这位皇马活传奇一日不退，C罗便一日无法继承那件神圣的7号。",
      "<strong>逼宫劳尔让号？</strong>2010年，劳尔黯然离队加盟沙尔克04，C罗「顺理成章」接过7号。但外界始终有人质疑：劳尔的离开，究竟是状态下滑的自然更迭，还是<strong>俱乐部与C罗合力「逼宫」</strong>的结果？这场号码交接的真相，至今众说纷纭。",
      "<strong>尤文让号夸德拉多：</strong>转投尤文图斯后，C罗再度上演「夺号」戏码——原7号主人<strong>夸德拉多</strong>被迫让号，改穿其他号码。尽管哥伦比亚人表面「自愿」，但这种<em>巨星特权对老臣的挤压</em>在更衣室激起的不满，微妙而真实。",
      "<strong>「7号信仰」背后的自负：</strong>C罗对7号的执着，早已超出普通号码的分量，成为一种<strong>近乎宗教式的信仰</strong>。但当一个数字被捧成个人图腾，还要别人为它让位，那份以自我为中心的<em>霸道</em>就藏不住了。",
      "<strong>号码帝国的商业逻辑：</strong>说到底，CR7不只是球衣号码，更是价值数十亿美元的商业品牌。每一次「夺号」，都是品牌资产的保护性扩张。<strong>号码即生意</strong>——这或许才是7号情结最底层的动机。",
      "<strong>总评：</strong>C罗已把7号球衣变成个人与商业的标识。但他在每家俱乐部夺取7号的过程（尤文尤甚），折射出他对自身形象控制的偏执。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>球衣让号多为俱乐部内部事务，「逼宫」等说法属媒体推测，仅供参考。</div>"
    ],
    detailEn:[
      "<strong>Taking Beckham's 7:</strong> When Ronaldo signed for United in 2003, Ferguson personally pressed the <strong>No.7 shirt vacated by Beckham's departure</strong> into his hands. A number that had carried George Best, Bryan Robson, Cantona and Beckham was now bound to 'Cristiano Ronaldo' — and the CR7 brand was born.",
      "<strong>The 9 at Real:</strong> Yet when he moved to Real Madrid in 2009, Ronaldo had to wear <strong>No.9</strong> — the iconic 7 still belonged to captain <strong>Raúl González</strong>, and only when the living legend retired could the sacred 7 become his.",
      "<strong>Forcing Raúl out?:</strong> In 2010 Raúl left sorrowfully for Schalke 04, and Ronaldo 'naturally' took the 7. But the question never died: was Raúl's departure natural decline, or the result of <strong>the club and Ronaldo jointly forcing him out</strong>? The truth of that handover remains debated.",
      "<strong>Cuadrado forced out at Juve:</strong> After moving to Juventus, Ronaldo staged another 'number-grab' — the original 7 owner <strong>Cuadrado</strong> was forced to give it up and take another number. Though the Colombian was outwardly 'willing', this <em>superstar-privilege squeezing of an old hand</em> stirred quiet dressing-room discontent.",
      "<strong>The narcissism behind the 'No.7 faith':</strong> Ronaldo's fixation on the 7 has long transcended the ordinary shirt number — it is a <strong>near-religious faith</strong>. But when a digit becomes a personal totem and others must give way, the <em>overbearing</em> self-centredness is hard to hide.",
      "<strong>The commercial logic of the number empire:</strong> At root, CR7 is not just a shirt number but a multi-billion-dollar commercial brand, and every 'number-grab' is a protective expansion of brand assets. <strong>The number is the business</strong> — perhaps the truest motive of Ronaldo's No.7 obsession.",
      "<strong>Verdict:</strong> Cristiano has turned the No.7 shirt into his personal and commercial signature. But the lengths he went to in seizing the 7 at each club (Juventus above all) reveal an obsession with controlling his image.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong> Shirt-number handovers are mostly internal club matters; terms like 'forced out' are media speculation and are for reference only.</div>"
    ],
    tags:["7号","CR7","曼联","皇马","尤文","劳尔","夸德拉多","号码传承","商业品牌"],
    tagsEn:["No. 7","CR7","Man United","Real Madrid","Juve","Raúl","Cuadrado","shirt-number saga","commercial brand"],
    tagsEs:["dorsal 7","CR7","Man United","Real Madrid","Juve","Raúl","Cuadrado","saga del dorsal","marca comercial"]
  },
  {
    id:62, cat:"club", catLabel:"俱乐部与法律", severity:3,
    dateIso:"2023-01-01",
    title:"沙特联赛点球占比 — 含金量争议",
    titleEn:"Saudi-League Penalty Share — 'Quality' Doubts",
    titleEs: "Porcentaje de penales en liga saudí — dudas sobre la «calidad»",
    summaryEs: "Buena parte de los goles saudíes de Cristiano en cuatro años nace del punto de penal, con las consiguientes acusaciones de «stat-padding» y de goles de baja calidad; los haters lo llaman «Penaldo».",
    dateEs: "2023-2026 · Al Nassr",
    locationEs: "Riad, Arabia Saudí",
    detailEs: [
      "<strong>El rendimiento saudí:</strong> Desde su llegada al Al Nassr en 2023, Cristiano ha marcado decenas de goles en la Saudi Pro League —cifras que le han valido varios registros goleadores y la condición de máximo goleador histórico de la selección—.",
      "<strong>El peso de los penales:</strong> Sin embargo, buena parte de esos goles sale del <strong>punto de penalti</strong>. Los haters estiman que el porcentaje de penales en su cuenta saudí es muy elevado.",
      "<strong>El monopolio del penal:</strong> En el Al Nassr, el lanzamiento de penales tiene un solo dueño: Cristiano lanza todos los que pitan a favor de su equipo. Nadie más tiene opción a sumar desde el punto fatídico.",
      "<strong>Las críticas de «stat-padding»:</strong> Para los críticos, sus goles en Arabia son un caso de manual de «<strong>stat-padding</strong>» (inflar cifras): muchos contra defensas menores, muchos de penalti, todos en una liga de nivel inferior.",
      "<strong>La calidad cuestionada:</strong> La Saudi Pro League, pese a los fichajes estrella, es considerada una liga notablemente inferior a las europeas: marcar allí no pesa lo mismo que en la Premier, LaLiga o la Serie A.",
      "<strong>El contraste con Europa:</strong> En Europa marcaba goles de verdadero mérito; en Arabia las cifras se disparan y la calidad de los goles (y de los rivales) es mucho menor. Los haters hablan de «goles de mentira».",
      "<strong>El apodo «Penaldo»:</strong> En Arabia, «<strong>Penaldo</strong>» se ha consolidado aún más: muchos de sus goles saudíes son penales que él mismo provoca o monopoliza. La cifra total queda inflada por penales y rivales menores.",
      "<strong>El balance:</strong> Muchos goles en Arabia, sí, pero con un porcentaje elevado de penales y contra defensas menores. Para los críticos, los «registros» saudíes de Cristiano son la prueba del stat-padding y de la baja calidad de sus goles.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> El porcentaje de penales en los goles saudíes de Cristiano es estimable pero no exacto. La valoración sobre la «calidad» de la Saudi Pro League es objeto de debate.</div>"
    ],


    date:"2023-2026 · 利雅得胜利",
    dateEn:"2023-2026 · Al Nassr",
    location:"沙特阿拉伯 利雅得",
    locationEn:"Riyadh, Saudi Arabia",
    img:"assets/images/report/r-62.jpg",
    summary:"沙特4年，C罗的进球里点球占比偏高，被批「含金量不足」「刷数据」；与欧洲时期效率的对比，成为舆论焦点。",
    summaryEn:"Penalties make up a high share of Ronaldo's four-year Saudi tally, drawing 'stat-padding' and 'low quality' criticism; his efficiency vs his European years is the talking point.",
    detail:[
      "<strong>沙特进球的点球占比：</strong>据Transfermarkt与多方统计，C罗在利雅得胜利期间累计主罚点球已超过<strong>32次</strong>。2023/24赛季，他以35球刷新沙特联赛单赛季进球纪录，但其中相当比例来自<strong>12码点</strong>。",
      "<strong>点球大户的争议：</strong>统计显示，利雅得胜利在2024/25赛季获得13次点球（罚进12个），位列<strong>联赛点球数前列</strong>。一支球队频繁获得点球，难免引发「裁判照顾」「巨星红利」的质疑，C罗作为主罚者，自然首当其冲。",
      "<strong>含金量的拷问：</strong>批评者指出，在<strong>防守强度远逊欧洲主流联赛</strong>的沙特，靠大量点球刷出来的进球数据，含金量自然存疑。<em>点球帽子戏法</em>式的进球狂欢，和运动战里的真实统治力，是两回事。",
      "<strong>与梅西迈阿密的对照：</strong>舆论难免拿梅西在迈阿密国际的表现来作对比。梅西在美职联同样数据亮眼，靠的却更多是<strong>组织与运动战创造力</strong>，而非点球堆砌。相比之下，「沙特射手王」的含金量大打折扣。",
      "<strong>「沙特联赛」的整体质疑：</strong>更深层的争议在联赛本身。沙特联赛的水平、节奏、对抗强度，与五大联赛不可同日而语。在这样一个联赛刷数据，再与欧洲时期的数据简单相加，本身就有<strong>注水之嫌</strong>。",
      "<strong>纪录 vs 真实水准：</strong>C罗确实凭沙特时期的数据，把职业生涯总进球堆到了惊人的高度。但当「历史射手王」的桂冠有相当部分建立在<strong>点球与弱旅</strong>之上，这个头衔的<em>纯度</em>，便值得冷静审视。",
      "<strong>「Penaldo」绰号：</strong>在沙特，「<strong>Penaldo</strong>」（点球罗）这一绰号进一步坐实——他的许多沙特进球，来自他本人制造或垄断的点球。总数则被点球与弱旅防线注水。",
      "<strong>总评：</strong>在沙特确实进了很多球，但点球占比高、防线孱弱。批评者认为，C罗的沙特「数据」正是 stat-padding 与进球含金量低下的明证。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>点球占比数据因统计口径不同而异，联赛水平评价存在主观性，本文仅呈现争议。</div>"
    ],
    detailEn:[
      "<strong>Saudi goals and the penalty share:</strong> According to Transfermarkt and multiple stats outlets, Ronaldo has taken <strong>over 32 penalties</strong> for Al Nassr. In 2023/24 he set a Saudi Pro League single-season record with 35 goals — a hefty proportion of them from <strong>12 yards</strong>.",
      "<strong>Penalty-merchant controversy:</strong> Al Nassr won 13 penalties in the 2024/25 season (converting 12), among the <strong>league leaders</strong> in spot-kicks. A team racking up that many penalties draws 'referee favouritism' and 'superstar dividend' suspicion; as the taker, Ronaldo bears the brunt.",
      "<strong>The quality question:</strong> Critics are blunt: in <strong>a league far weaker defensively than Europe's</strong>, padding the goal tally with penalties raises real doubts about quality. <em>A penalty hat-trick</em> is one thing; dominating in open play is another.",
      "<strong>The Messi-Miami contrast:</strong> The instinctive comparison is with Messi at Inter Miami. Messi has shone in MLS too, but mostly through <strong>playmaking and open-play creativity</strong>, not piling up penalties. The contrast does Ronaldo's 'Saudi top scorer' crown no favours.",
      "<strong>The league-level question:</strong> The deeper controversy is the league itself. The Saudi Pro League's level, tempo and intensity are no match for Europe's top five. Padding stats in such a league, then simply adding them to his European totals, smacks of <strong>inflation</strong>.",
      "<strong>Record versus actual level:</strong> Ronaldo has indeed used his Saudi-phase numbers to push his career goal tally to staggering heights. But when the 'all-time top scorer' crown is substantially built on <strong>penalties and weak opposition</strong>, the <em>purity</em> of that title deserves scrutiny.",
      "<strong>The «Penaldo» nickname:</strong> In Saudi Arabia, the «<strong>Penaldo</strong>» nickname has only consolidated: many of his Saudi goals are penalties — won by him, taken by him. The overall tally: inflated by penalties and minor opposition.",
      "<strong>Verdict:</strong> Plenty of goals in Saudi Arabia, yes — but a high share from the spot, against weaker defences. For the critics, Cristiano's Saudi «records» are proof of stat-padding and the modest quality of his goals.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong>Penalty-share data varies with the statistical method used, and judgements of league quality are subjective; this entry only presents the controversy.</div>"
    ],
    tags:["沙特","点球","刷数据","含金量","利雅得胜利","4年1冠","梅西对比","塔利斯卡"],
    tagsEn:["Saudi","penalty","stat-padding","stat quality","Al Nassr","4 years 1 title","vs Messi","Talisca"],
    tagsEs:["Arabia","penalti","inflar estadísticas","calidad de los registros","Al Nassr","4 años 1 título","vs Messi","Talisca"]
  },
  // ========== 🚨 BREAKING 2026-07-07：世界杯绝杀淘汰（深度长报道）==========
  {
    id:63, slug:"six-world-cups-zero-trophies-tearful-farewell", cat:"national", catLabel:"国家队争议", severity:5,
    dateIso:"2026-07-07",
    title:"【头条】六届世界杯0冠 — 西班牙补时绝杀，41岁CR7泪别最后一舞",
    titleEn:"[HEADLINE] Six World Cups, Zero Trophies — Spain's Stoppage Winner, 41-Year-Old CR7's Tearful Last Dance",
    titleEs: "[TITULAR] Seis Mundiales, cero títulos — gol de España en el descuento, última danza llorosa de CR7 a los 41",
    summaryEs: "En octavos de final, el gol de Mikel Merino en el minuto 91 le dio a España el 1-0 sobre Portugal; Cristiano, de 41 años, se despidió entre lágrimas y dejó un balance intacto: seis Mundiales, cero títulos.",
    dateEs: "7 jul 2026 · AT&T Stadium, Arlington, EE. UU.",
    locationEs: "EE. UU. · Mundial 2026 octavos · Portugal 0-1 España",
    detailEs: [
      "<strong>El partido de octavos:</strong> El 7 de julio de 2026, Portugal y España se vieron las caras en el AT&T Stadium de Arlington (Texas), por los octavos de final del Mundial 2026. Para Cristiano, de 41 años, era la última oportunidad de levantar el trofeo soñado.",
      "<strong>El gol de Merino (91'):</strong> Con el partido 0-0 y abocado a la prórroga, en el minuto 91 de descuento, <strong>Mikel Merino</strong> marcó el gol que puso el 1-0 y llevó a España a cuartos.",
      "<strong>La eliminación portuguesa:</strong> Portugal cayó <strong>0-1 contra España</strong> y quedó eliminada en octavos de final. Para Cristiano, era la sexta —y última— vez que se quedaba sin el Mundial.",
      "<strong>El balance de Cristiano:</strong> Tras seis Mundiales (2006-2026), Cristiano se retiraba de la Copa del Mundo con <strong>cero títulos</strong>, un solo gol en eliminatorias (en 16avos de 2026) y nueve partidos de esa fase sin la copa.",
      "<strong>Las lágrimas en la zona mixta:</strong> Cristiano se despidió del Mundial entre <strong>lágrimas en la zona mixta</strong>, donde declaró: «<strong>Lo di todo. Me voy con la conciencia tranquila</strong>». Una frase que se hizo viral y fue objeto de memes.",
      "<strong>Seis Mundiales, nueve eliminatorias:</strong> La estadística es demoledora: seis participaciones mundialistas, nueve partidos de eliminatoria, un solo gol (en 2026), cero títulos. El balance del autoproclamado «mejor de la historia».",
      "<strong>El contraste con Messi:</strong> Mientras Messi levantó el Mundial en 2022, Cristiano se retiró de la Copa del Mundo sin el título. El debate del GOAT se decantó definitivamente del lado argentino tras el Mundial 2026.",
      "<strong>La última danza:</strong> El Mundial 2026 fue la «última danza» de Cristiano con Portugal. Su despedida entre lágrimas y sin título cerró un ciclo de dos décadas de frustración mundialista para el portugués.",
      "<strong>La frase «conciencia tranquila»:</strong> La declaración «me voy con la conciencia tranquila» se hizo viral y llenó las redes de memes: para sus críticos, una muestra más de su incapacidad para asumir la derrota con autocrítica.",
      "<strong>El legado mundialista:</strong> Para los críticos, el balance mundialista de Cristiano (0 títulos, 1 gol en eliminatorias en seis ediciones) desmiente su autoproclamación como «mejor de la historia». El Mundial fue su asignatura pendiente.",
      "<strong>El final de una era:</strong> Con la eliminación de Portugal en octavos del Mundial 2026, se cerró la era Cristiano en la selección. Su despedida, llorosa y sin título, puso fin a dos décadas de dominio del portugués en el fútbol mundial.",
      "<strong>La cobertura global:</strong> La eliminación de Cristiano fue titular global: «<strong>The King leaves without his crown</strong>» (El rey se va sin corona), tituló LiveMint. La imagen de Cristiano llorando recorrió el mundo.",
      "<strong>El debate del GOAT cerrado:</strong> Para muchos analistas, el Mundial 2026 cerró definitivamente el debate del GOAT: Messi con su Mundial de 2022, Cristiano con cero títulos mundialistas en seis intentos. El argentino se llevó la partida.",
      "<strong>El balance definitivo:</strong> Seis Mundiales, cero títulos, un gol en eliminatorias. La «última danza» de Cristiano acabó con lágrimas y sin la copa soñada. El final de un mito y el principio de su relectura crítica.",
      "<strong>La reacción de los fans:</strong> Los fans de Cristiano lo defendieron: «ha dado todo por Portugal». Los haters lo remacharon: «seis Mundiales, cero títulos, esa es la realidad». La polarización, hasta el final.",
      "<strong>El adiós:</strong> Cristiano se despidió del Mundial entre lágrimas, con la frase «conciencia tranquila» y con el balance de seis Mundiales sin título. Una era marcada por el genio, el ego y la frustración de la copa soñada.",
      "<strong>La última imagen:</strong> La imagen de Cristiano, de 41 años, llorando solo en la zona mixta tras la eliminación ante España, quedará como la última fotografía de su era mundialista: el genio que nunca levantó la copa.",
      "<strong>El récord, sí, pero sin copa:</strong> Cristiano marcó en seis Mundiales consecutivos (récord) y es uno de los máximos goleadores mundialistas. Pero el trofeo, el que de verdad importa, se le resistió siempre. La paradoja de su carrera.",
      "<strong>El epitafio:</strong> «Seis Mundiales, cero títulos» quedará como el epitafio mundialista de Cristiano. Un genio absoluto del fútbol que, en la cita más importante del deporte, nunca fue capaz de levantar el trofeo.",
      "<figure class='modal-figure'><picture><source type='image/webp' srcset='assets/images/wc2026/wc2026-13.webp'><img src='assets/images/wc2026/wc2026-13.jpg' alt='Cristiano de espaldas' loading='lazy' decoding='async'></picture><figcaption><b>Figura 10</b> · De espaldas. Quizá, dentro de muchos años, la gente no recuerde el marcador, sino esta silueta caminando sola hacia el túnel — la de un hombre que persiguió sin descanso la Copa del Mundo y siempre quedó a un paso.<i>Fuente: midday</i></figcaption></figure>",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> La eliminación de Portugal contra España en octavos del Mundial 2026, el gol de Merino y la despedida llorosa de Cristiano son hechos verificables.</div>"
    ],


    date:"2026年7月7日 · 美国阿灵顿 AT&T 体育场",
    dateEn:"Jul 7, 2026 · AT&T Stadium, Arlington, USA",
    location:"美国 2026世界杯1/8决赛 葡萄牙0-1西班牙",
    locationEn:"USA · 2026 World Cup R16 · Portugal 0-1 Spain",
    img:"assets/images/wc2026/wc2026-01.jpg",
    summary:"1/8决赛，梅里诺第91分钟补时绝杀，西班牙1-0淘汰葡萄牙。41岁C罗确认这是最后一届世界杯，赛后潸然泪下，留下「问心无愧」之名言。六届世界杯、九场淘汰赛、仅一球、零冠军——封神之路的终点，是一个哭泣的句号。",
    summaryEn:"In the round of 16, Mikel Merino's 91st-minute stoppage-time winner gave Spain a 1-0 win over Portugal; 41-year-old Ronaldo confirmed this was his last World Cup and left in tears, with the line 'I leave with a clear conscience'. Six World Cups, nine knockout games, only one goal, zero trophies — the end of the road to godhood is a crying full stop.",
    detail:[
      "<p class='modal-lead'>北京时间2026年7月7日凌晨，美加墨世界杯1/8决赛。葡萄牙0-1遭西班牙补时绝杀淘汰。这是41岁C罗的<strong>第六届、也是最后一届世界杯</strong>。六届参赛、九场淘汰赛、仅一粒进球、零座奖杯——「历史最佳」的封神之路，最终停在了十六强。本馆以深度长报道形式，存档这场告别。</p>",
      "<strong>一、赛前：高调的「最后一舞」</strong><br>本届世界杯开赛前，C罗便已多次暗示这将是他「最后一次」身披葡萄牙战袍征战世界杯。1/16决赛对阵克罗地亚，他<strong>打进世界杯淘汰赛个人首球</strong>（打破六届荒），随后贡萨洛·拉莫斯补时头球绝杀，葡萄牙2-1逆转晋级16强。那一刻，全网「剑指冠军」「最后一舞」「圆梦美加墨」的造势达到顶峰——主流媒体、赞助商、粉丝集体进入「加冕模式」，仿佛大力神杯已在招手。",
      "<figure class='modal-figure'><picture><source type='image/webp' srcset='assets/images/wc2026/wc2026-05.webp'><img src='assets/images/wc2026/wc2026-05.jpg' alt='C罗比赛中踢球动作' loading='lazy' decoding='async'></picture><figcaption><b>图1</b> · 1/16决赛，C罗打进世界杯淘汰赛首球后的怒吼。这一球打破了他六届世界杯淘汰赛的进球荒，全网为之沸腾——谁也没想到，这竟是他世界杯生涯的最后一粒进球。<i>图源：新浪体育</i></figcaption></figure>",
      "<strong>二、伊比利亚德比：120分钟的窒息僵局</strong><br>1/8决赛，葡萄牙与西班牙这对伊比利亚邻居在阿灵顿AT&T体育场狭路相逢。这是一场被外界期待为「火星撞地球」的对决，却演变成了一场令人窒息的消耗战。双方在中场绞杀，机会寥寥。C罗作为单箭头被西班牙后防线重点照顾，整场比赛触球机会有限，几次试图用招牌的冲刺撕开防线，都被年轻一代的西班牙后卫化解。下半场，葡萄牙左后卫努诺·门德斯伤退，马丁内斯的换人调整未能改变场上僵局——0-0，比赛被拖入了它最残酷的部分。",
      "<figure class='modal-figure'><img src='assets/images/wc2026/wc2026-03.webp' alt='比赛特写'><figcaption><b>图2</b> · AT&T体育场，伊比利亚德比进行中。现场8万多名观众见证了这场沉闷却致命的对决。<i>图源：AP</i></figcaption></figure>",
      "<figure class='modal-figure'><img src='assets/images/wc2026/wc2026-02.webp' alt='C罗射门'><figcaption><b>图3</b> · C罗难得的一次射门机会，被西班牙门将神勇化解。整场比赛他仅有的几次起脚，都未能改写比分。<i>图源：AP</i></figcaption></figure>",
      "<strong>三、第91分钟：死刑判决</strong><br>当所有人都以为比赛将进入加时赛，西班牙中场<strong>梅里诺（Mikel Merino）在第91分钟完成绝杀</strong>。一记接传中后的抢点，皮球入网的那一刻，AT&T体育场西班牙球迷区沸腾，而葡萄牙半边陷入死寂。0-1。终场哨响，41岁的C罗缓缓走向球员通道——这是他世界杯生涯的最后90分钟（含补时），以一个「0」收尾。讽刺的是：上一场他刚刚「破荒」进球，全网高呼「剑指冠军」；这一场，补时一剑封喉，伊比利亚邻居亲手把「最后一舞」送进了坟墓。",
      "<figure class='modal-figure'><img src='assets/images/wc2026/wc2026-04.webp' alt='比赛场景'><figcaption><b>图4</b> · 绝杀瞬间，西班牙球员冲向角旗庆祝，背景里是葡萄牙球员呆立原地。一张图，两种命运。<i>图源：AP</i></figcaption></figure>",
      "<strong>四、泪洒混采区：「问心无愧」</strong><br>赛后，C罗在混合采访区<strong>潸然泪下</strong>。多家媒体（ESPN、半岛电视台、体坛加、Times of India）的镜头记录下了这一幕——这位向来以强硬、自信、甚至傲慢示人的巨星，在世界杯的终点线上崩溃了。他哽咽着留下了那句注定被反复引用的名言：<em>「我已倾尽所有，问心无愧地离开。」</em>(I gave it my all, and I leave with a clear conscience.)",
      "<figure class='modal-figure'><picture><source type='image/webp' srcset='assets/images/wc2026/wc2026-07.webp'><img src='assets/images/wc2026/wc2026-07.jpg' alt='C罗全身特写落泪' loading='lazy' decoding='async'></picture><figcaption><b>图5</b> · 全身特写：C罗捂脸落泪走向球员通道。这一幕成为本届世界杯最经典的画面之一，也被「罗黑」群体迅速做成海量 meme。<i>图源：新浪体育</i></figcaption></figure>",
      "<figure class='modal-figure'><picture><source type='image/webp' srcset='assets/images/wc2026/wc2026-06.webp'><img src='assets/images/wc2026/wc2026-06.jpg' alt='葡萄牙全队失落' loading='lazy' decoding='async'></picture><figcaption><b>图6</b> · 葡萄牙全队赛后呆坐草坪。老将佩佩、B费等人同样难掩失落——但对41岁的C罗而言，这一坐，就是永远。<i>图源：新浪体育</i></figcaption></figure>",
      "<strong>五、「问心无愧」的预演与话术闭环</strong><br>「问心无愧」这套话术，C罗早在赛前（7/6发布会）就预演过一遍——当时他信誓旦旦：<em>「明天无论如何，我都1000%问心无愧。我顶着压力打进3球，表现不差。」</em>果不其然，输球之后，同一个词准时上线。这种<strong>赛前预埋、赛后兑现</strong>的话术闭环，被球迷调侃为「输了也要赢话术」——仿佛无论结果如何，剧本里的台词都早已写好，只等镜头对准时背诵。支持者称这是「冠军心态」，批评者则认为这是拒绝反思的挡箭牌。",
      "<strong>六、三冠护身符与「救世主」叙事</strong><br>面对六届世界杯零冠的质疑，C罗祭出惯用的挡箭牌：<em>「在我之前，葡萄牙从未获得过任何冠军；我帮葡萄牙赢了三座奖杯，欧洲杯冠军不亚于世界杯。」</em>支持者认可其历史贡献——2016欧洲杯、2019欧国联，C罗确实是核心功臣。但批评者指出：<strong>2016欧洲杯决赛他早早伤退</strong>，是替补埃德德的远射绝杀捧回了奖杯；而六届世界杯颗粒无收，却仍要把自己摆在「救世主」「无冕之王」的位置上，这种自我中心化的叙事，正是他「人设争议」的缩影。",
      "<figure class='modal-figure'><img src='assets/images/wc2026/wc2026-08.webp' alt='亚马尔安慰C罗'><figcaption><b>图7</b> · 赛后，西班牙17岁天才亚马尔主动上前拥抱安慰C罗。两代球员的交接，在这一刻显得格外残酷——17岁少年已封王在望，41岁老将却带着零座世界杯奖杯告别。<i>图源：Bolavip</i></figcaption></figure>",
      "<strong>七、六届世界杯的成绩单：一张写满「0」的答卷</strong><br>把时间拉长，看看这条「封神之路」的全貌：<br>· <strong>2006 德国</strong>：四强（鲁尼「眨眼门」坑哭队友，半决赛负法国）<br>· <strong>2010 南非</strong>：十六强（0-1负西班牙，C罗对西班牙0球）<br>· <strong>2014 巴西</strong>：小组赛未出线（带伤出战，留下「我一个人扛不动」的悲情形象）<br>· <strong>2018 俄罗斯</strong>：十六强（对乌拉圭0球，赛后沉默离场）<br>· <strong>2022 卡塔尔</strong>：八强（0-1负摩洛哥，赛后径直钻进球员通道哭）<br>· <strong>2026 美加墨</strong>：十六强（0-1被西班牙补时绝杀，泪洒混采区）<br><strong>六届、九场淘汰赛、一粒进球、零座冠军</strong>。对比同代对手梅西在2022年卡塔尔封王，这条「历史最佳」的尽头，是一张写满「0」的答卷。",
      "<figure class='modal-figure'><picture><source type='image/webp' srcset='assets/images/wc2026/wc2026-11.webp'><img src='assets/images/wc2026/wc2026-11.jpg' alt='C罗告别落泪' loading='lazy' decoding='async'></picture><figcaption><b>图8</b> · 最后一舞谢幕。C罗的国家队世界杯征程，以一个落泪的背影画上句号。对「罗黑」而言，这是六年等待的「现世报」；对死忠而言，这是英雄迟暮的悲歌。<i>图源：midday</i></figcaption></figure>",
      "<strong>八、全网狂欢与「Factos」式控评</strong><br>绝杀哨响的瞬间，社交网络炸开了锅。西班牙球迷、阿根廷球迷与中文圈的「罗黑」群体陷入狂欢——「The King leaves without his crown」（王无冠而退）、「六届0冠」、「问心无愧.jpg」等 meme 迅速刷屏，LiveMint 更是直接用「<em>The King leaves without his crown</em>」作了标题，一语成谶。而C罗的死忠粉丝则在评论区上演熟悉的<strong>「Factos」式控评</strong>：攻击媒体「不懂球」、攻击西班牙「靠运气」、攻击一切质疑者「黑子」「嫉妒」——这种输了比赛、赢了评论区的饭圈操作，与他在2021年金球奖输给梅西后深夜狂发「Factos! Factos!」的场面如出一辙。胜负已分，但舆论战场，永远不会停火。",
      "<figure class='modal-figure'><picture><source type='image/webp' srcset='assets/images/wc2026/wc2026-12.webp'><img src='assets/images/wc2026/wc2026-12.jpg' alt='C罗特写' loading='lazy' decoding='async'></picture><figcaption><b>图9</b> · 赛后特写。这张脸写满了不甘与无奈——但竞技体育不相信眼泪，只记比分。<i>图源：midday</i></figcaption></figure>",
      "<strong>九、本馆点评：封神还是封墓？</strong><br>作为「黑历史档案馆」，我们必须承认：C罗是足球史上最伟大的球员之一——五座金球、五座欧冠、欧洲杯、无数进球纪录，这些成就无可否认。但「伟大」与「完美」是两回事。一个真正伟大的球员，可以坦然接受自己的局限与失败；而一个被自我神话绑架的球员，则必须在每一次失败后，用「问心无愧」「我尽力了」「他们不懂」来修补那面永远完美的镜子。六届世界杯零冠，本身并不可耻——可耻的是，每一次出局后，叙事的主角永远只能是他自己。这才是「黑历史」的真正注脚：不是输球，而是输不起。",
      "<figure class='modal-figure'><picture><source type='image/webp' srcset='assets/images/wc2026/wc2026-13.webp'><img src='assets/images/wc2026/wc2026-13.jpg' alt='C罗背影' loading='lazy' decoding='async'></picture><figcaption><b>图10</b> · 背影。也许很多年后，人们记住的不再是比分，而是这个独自走向通道的背影——一个永远在追赶大力神杯、却始终差一步的男人。<i>图源：midday</i></figcaption></figure>",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>本条为深度长报道，依据央视网、ESPN、半岛电视台、NBC、体坛加、凤凰网、Times of India、LiveMint、新浪体育等公开报道整理。C罗是足坛历史级巨星，本馆仅记录其世界杯征程的客观结果与公开赛后言论，所有数据可查证。文中图片版权归 AP、新浪体育、Bolavip、midday 等各通讯社/媒体所有，本馆仅作球迷文化创作的图文引用，不代表任何官方立场。内容仅供娱乐。</div>"
    ],
    detailEn:[
      "<p class='modal-lead'>In the early hours of 7 July 2026 Beijing time, in the round of 16 at the US-Canada-Mexico World Cup, Portugal were knocked out 0-1 by a Spanish stoppage-time winner. It was the <strong>sixth and final World Cup</strong> for the 41-year-old Ronaldo. Six tournaments, nine knockout matches, only one goal, zero trophies — the 'GOAT's' path to deification ended in the round of 16. This archive records, in long-form reportage, how the 'last dance' actually finished.</p>",
      "<strong>I. Pre-match: the loud 'last dance'</strong><br>Before the tournament Ronaldo had hinted multiple times that this would be his 'last' World Cup in a Portugal shirt. In the round of 32 against Croatia he <strong>scored his first World Cup knockout goal</strong> (ending a six-edition drought), then Gonçalo Ramos headed a stoppage-time winner as Portugal came from behind to win 2-1 and reach the round of 16. That night the noise peaked — 'onward to the title', 'last dance', 'crowning glory in the US-Canada-Mexico' — mainstream media, sponsors and fans all entered 'coronation mode', as if the World Cup trophy were already beckoning.",
      "<figure class='modal-figure'><picture><source type='image/webp' srcset='assets/images/wc2026/wc2026-05.webp'><img src='assets/images/wc2026/wc2026-05.jpg' alt='Ronaldo in match action' loading='lazy' decoding='async'></picture><figcaption><b>Fig 1</b> · In the round of 32, Ronaldo roars after scoring his first World Cup knockout goal. The strike ended his six-edition drought and the whole internet erupted — nobody imagined it would be the final goal of his World Cup career. <i>Source: Sina Sports</i></figcaption></figure>",
      "<strong>II. The Iberian derby: 120 minutes of suffocating deadlock</strong><br>In the round of 16, the Iberian neighbours Portugal and Spain met at AT&T Stadium in Arlington. Billed as 'Mars hitting Earth', it turned into a suffocating war of attrition. The two sides fought out a midfield scrap with few chances. As the lone striker, Ronaldo was closely marshalled by the Spanish defence; he barely got on the ball, and several attempts to break the line with his trademark bursts were snuffed out by the younger generation of Spanish defenders. In the second half Portugal's left-back Nuno Mendes went off injured; Martínez's changes could not break the deadlock — 0-0, and the match was dragged into its cruellest phase.",
      "<figure class='modal-figure'><img src='assets/images/wc2026/wc2026-03.webp' alt='Match close-up'><figcaption><b>Fig 2</b> · AT&T Stadium during the Iberian derby. More than 80,000 spectators witnessed a dull yet deadly contest. <i>Source: AP</i></figcaption></figure>",
      "<figure class='modal-figure'><img src='assets/images/wc2026/wc2026-02.webp' alt='Ronaldo shooting'><figcaption><b>Fig 3</b> · A rare shooting chance for Ronaldo, brilliantly saved by the Spanish keeper. Of his few attempts on the night, none changed the scoreline. <i>Source: AP</i></figcaption></figure>",
      "<strong>III. The 91st minute: the death sentence</strong><br>Just as everyone expected extra time, Spanish midfielder <strong>Mikel Merino struck in the 91st minute</strong> to win it. Meeting a cross, he slotted home; the moment the ball hit the net, the Spanish end at AT&T Stadium erupted while the Portuguese side fell silent. 0-1. At the final whistle, the 41-year-old Ronaldo slowly walked toward the tunnel — the final 90 minutes (plus stoppage time) of his World Cup career, ending on a '0'. The irony: just one match earlier he had 'broken the duck' and the entire internet had hailed 'onward to the title'; this match saw a stoppage-time dagger, the Iberian neighbour personally sending the 'last dance' to the grave.",
      "<figure class='modal-figure'><img src='assets/images/wc2026/wc2026-04.webp' alt='Match scene'><figcaption><b>Fig 4</b> · The moment of the winner, Spanish players charge to the corner flag to celebrate while Portuguese players stand frozen in the background. One picture, two destinies. <i>Source: AP</i></figcaption></figure>",
      "<strong>IV. Tears in the mixed zone: 'a clear conscience'</strong><br>After the match Ronaldo <strong>wept openly in the mixed zone</strong>. Multiple outlets (ESPN, Al Jazeera, Titan Sports, Times of India) caught the moment — the superstar who always projects toughness, confidence, even arrogance, broke down at the World Cup's finish line. Through sobs he left the line destined to be quoted on repeat: <em>'I gave it my all, and I leave with a clear conscience.'</em>",
      "<figure class='modal-figure'><picture><source type='image/webp' srcset='assets/images/wc2026/wc2026-07.webp'><img src='assets/images/wc2026/wc2026-07.jpg' alt='Ronaldo full-body close-up, in tears' loading='lazy' decoding='async'></picture><figcaption><b>Fig 5</b> · Full-body close-up: Ronaldo covers his face and weeps as he walks toward the tunnel. This shot became one of the iconic images of the World Cup, and was quickly turned into a torrent of memes by the 'CR7-hater' camp. <i>Source: Sina Sports</i></figcaption></figure>",
      "<figure class='modal-figure'><picture><source type='image/webp' srcset='assets/images/wc2026/wc2026-06.webp'><img src='assets/images/wc2026/wc2026-06.jpg' alt='Portugal squad desolate' loading='lazy' decoding='async'></picture><figcaption><b>Fig 6</b> · The whole Portugal squad slumps on the turf after the match. Veterans like Pepe and B. Fernandes could not hide their desolation — but for the 41-year-old Ronaldo, this slump is permanent. <i>Source: Sina Sports</i></figcaption></figure>",
      "<strong>V. The 'clear conscience' preview and the closed-loop rhetoric</strong><br>Most ironically, Ronaldo had already previewed the 'clear conscience' line the day before at the 7/6 press conference — then he had vowed: <em>'No matter what tomorrow, I'm 1000% at peace with my conscience. I scored 3 goals under pressure, my performance was not bad.'</em> Sure enough, after the loss, the same line arrived on cue. This <strong>pre-match plant and post-match delivery</strong> closed-loop rhetoric was mocked by fans as 'winning the talking even when losing' — as if whatever the result, the script's lines were already written, just waiting to be recited when the camera rolled. Supporters call it 'champion mentality'; critics call it a shield that refuses reflection.",
      "<strong>VI. The three-trophy shield and the 'saviour' narrative</strong><br>Confronted with the zero-trophy charge across six World Cups, Ronaldo produced his customary shield: <em>'Before me, Portugal had never won anything; I helped Portugal win three trophies — the Euros are no less than the World Cup.'</em> Supporters credit his historical record — Euro 2016, the 2019 Nations League, with Ronaldo a core contributor. But critics point out sharply: <strong>he went off injured early in the Euro 2016 final</strong>, and substitute Éder's long-range winner delivered the trophy; meanwhile, with zero yield across six World Cups he still insists on casting himself as the 'saviour', the 'uncrowned king' — this self-centring narrative is precisely the essence of his 'persona controversy'.",
      "<figure class='modal-figure'><img src='assets/images/wc2026/wc2026-08.webp' alt='Yamal consoles Ronaldo'><figcaption><b>Fig 7</b> · After the match, Spain's 17-year-old sensation Lamine Yamal went up to embrace and console Ronaldo. The handover between two generations felt especially cruel in this moment — the 17-year-old youth was already within reach of the crown, while the 41-year-old veteran walked away with zero World Cup trophies. <i>Source: Bolavip</i></figcaption></figure>",
      "<strong>VII. Six World Cups' scorecard: a sheet full of zeros</strong><br>The full scorecard of this 'path to deification':<br>· <strong>2006 Germany</strong>: semi-finals (Rooney's 'wink-gate' sank a teammate; lost to France in the semis)<br>· <strong>2010 South Africa</strong>: round of 16 (0-1 vs Spain; Ronaldo goalless against Spain)<br>· <strong>2014 Brazil</strong>: group-stage exit (played injured; left the tragic image of 'I alone cannot carry it')<br>· <strong>2018 Russia</strong>: round of 16 (no goals vs Uruguay; left the pitch in silence)<br>· <strong>2022 Qatar</strong>: quarter-finals (0-1 vs Morocco; stormed straight down the tunnel in tears)<br>· <strong>2026 US-Canada-Mexico</strong>: round of 16 (0-1 to a Spanish stoppage-time winner; wept in the mixed zone)<br><strong>Six tournaments, nine knockout matches, one goal, zero trophies.</strong> Versus his contemporary Messi, who was crowned at Qatar 2022, the end of this 'GOAT' road is a scorecard full of zeros.",
      "<figure class='modal-figure'><picture><source type='image/webp' srcset='assets/images/wc2026/wc2026-11.webp'><img src='assets/images/wc2026/wc2026-11.jpg' alt='Ronaldo farewell in tears' loading='lazy' decoding='async'></picture><figcaption><b>Fig 8</b> · The curtain falls on the last dance. Ronaldo's World Cup journey with the national team ends with a tearful silhouette. To 'CR7-haters' it is the 'instant karma' of a six-edition wait; to die-hards it is the tragic song of a hero in his twilight. <i>Source: midday</i></figcaption></figure>",
      "<strong>VIII. Worldwide carnival and 'Factos'-style comment-control</strong><br>The moment the winner hit the net, social networks exploded. Spanish fans, Argentine fans and the 'CR7-hater' camp in the Chinese sphere celebrated — 'The King leaves without his crown', 'six editions zero trophies', 'clear-conscience.jpg' and other memes flooded the timeline; LiveMint even used '<em>The King leaves without his crown</em>' as its headline, a prophecy that came true. Meanwhile Ronaldo's die-hard fans staged the familiar <strong>'Factos'-style comment-control</strong> in the replies: attacking the media for 'not understanding football', attacking Spain for 'riding luck', attacking all sceptics as 'haters' and 'jealous' — the same fan-cult operation of 'lost the match, won the comment section' as when he spammed 'Factos! Factos! Factos!' under Messi's post after losing the 2021 Ballon d'Or. The result is decided, but the public-opinion battlefield will never fall silent.",
      "<figure class='modal-figure'><picture><source type='image/webp' srcset='assets/images/wc2026/wc2026-12.webp'><img src='assets/images/wc2026/wc2026-12.jpg' alt='Ronaldo close-up' loading='lazy' decoding='async'></picture><figcaption><b>Fig 9</b> · Post-match close-up. The face is written across with frustration and helplessness — but sport does not believe in tears, only in the scoreline. <i>Source: midday</i></figcaption></figure>",
      "<strong>IX. Archive verdict: deification or burial?</strong><br>As a 'dark-history archive', we must admit: Cristiano Ronaldo is one of the greatest players in football history — five Ballons d'Or, five Champions Leagues, a European Championship, countless scoring records — these achievements are undeniable. But 'greatness' and 'perfection' are two different things. A truly great player can calmly accept his limitations and failures; a player hijacked by his own myth must, after every failure, patch the forever-perfect mirror with 'clear conscience', 'I did my best', 'they don't understand'. Six World Cups with zero trophies is not in itself shameful — what is shameful is that after every exit, the protagonist of the narrative can only ever be himself. That is the true footnote of the 'dark history': not losing the match, but being unable to lose.",
      "<figure class='modal-figure'><picture><source type='image/webp' srcset='assets/images/wc2026/wc2026-13.webp'><img src='assets/images/wc2026/wc2026-13.jpg' alt='Ronaldo silhouette from behind' loading='lazy' decoding='async'></picture><figcaption><b>Fig 10</b> · Silhouette. Perhaps many years from now, what people remember will no longer be the scoreline but this silhouette walking alone toward the tunnel — a man forever chasing the World Cup trophy yet always one step short. <i>Source: midday</i></figcaption></figure>",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong> This is an in-depth long-form report compiled from public coverage by CCTV.com, ESPN, Al Jazeera, NBC, Titan Sports, Phoenix, Times of India, LiveMint, Sina Sports and others. Ronaldo is an all-time football great; this archive only records the objective results of his World Cup journey and his public post-match remarks, all data verifiable. Image copyrights belong to AP, Sina Sports, Bolavip, midday and other agencies/media; this archive uses them only for fan-culture creative text-and-image reference and does not represent any official position. Content for entertainment only.</div>"
    ],
    quote:{text:"我已倾尽所有，问心无愧地离开。", textEn:"I gave everything I had. I leave with a clear conscience.", author:"C罗，2026世界杯1/8决赛被西班牙淘汰后，泪洒混采区", authorEn:"Cristiano Ronaldo, in tears in the mixed zone after being knocked out by Spain in the 2026 World Cup round of 16", textEs:"Lo di todo. Me voy con la conciencia tranquila.", authorEs:"Cristiano Ronaldo, llorando en la zona mixta tras la eliminación contra España en octavos del Mundial 2026"},
    tags:["2026世界杯","西班牙","梅里诺","补时绝杀","41岁","最后一舞","问心无愧","六届0冠","泪洒赛场","1-0","十六强","AT&T体育场","深度报道","亚马尔","伊比利亚德比"],
    tagsEn:["2026 World Cup","Spain","Merino","stoppage winner","age 41","last dance","clear conscience","6 World Cups 0 titles","tears on the pitch","1-0","Round of 16","AT&T Stadium","in-depth report","Yamal","Iberian derby"],
    tagsEs:["Mundial 2026","España","Merino","gol en el descuento","41 años","último baile","conciencia tranquila","6 Mundiales 0 títulos","lágrimas en el campo","1-0","octavos de final","Estadio AT&T","reportaje extenso","Yamal","derbi ibérico"]
  },
  // ========== ↓↓↓ 续编（2026-07-08）三个新黑料档案，配图来自公开报道文章原图 ↓↓↓
  {
    id:64, cat:"club", catLabel:"俱乐部与法律", severity:5,
    dateIso:"2022-06-01",
    title:"Binance 币圈 10 亿美元集体诉讼 — 割粉丝韭菜",
    titleEn:"Binance $1B Class Action — Harvesting His Own Fans",
    titleEs: "Demanda colectiva de 1.000 M$ contra Binance — cosechando a sus propios fans",
    summaryEs: "Promocionó la línea NFT «CR7» del exchange de criptomonedas Binance; acusado de promover valores no registrados, en noviembre de 2023 fue demandado colectivamente por sus propios fans, que perdieron millones.",
    dateEs: "Jun 2022 (firma) / Nov 2023 (demanda)",
    locationEs: "Tribunal Federal de EE. UU., Distrito Sur de Florida",
    detailEs: [
      "<strong>El acuerdo con Binance:</strong> En junio de 2022, Cristiano firmó un acuerdo millonario con <strong>Binance</strong>, el mayor exchange de criptomonedas del mundo, para promocionar una línea de NFT «CR7».",
      "<strong>La promoción de NFTs:</strong> Cristiano promocionó los NFT «CR7» de Binance en sus redes, ante sus más de 600 millones de seguidores. Las piezas se vendieron a precios que llegaban a los miles de dólares.",
      "<strong>La caída del mercado cripto:</strong> En 2022, el mercado cripto se hundió, Binance acumuló escándalos y presión regulatoria, y los compradores de los NFT «CR7» vieron desplomarse su inversión.",
      "<strong>La demanda colectiva (noviembre de 2023):</strong> En noviembre de 2023, un grupo de inversores presentó una <strong>demanda colectiva contra Cristiano</strong> en el Tribunal Federal del Distrito Sur de Florida, reclamando más de <strong>1.000 millones de dólares</strong>.",
      "<strong>La acusación:</strong> La demanda lo acusaba de promocionar <strong>valores no registrados</strong> (los NFT) sin la debida diligencia, induciendo a sus seguidores a invertir en un producto que se vino abajo.",
      "<strong>«Cosechando a sus propios fans»:</strong> Para los críticos, el caso Binance retrata el lado más sórdido del imperio comercial Cristiano: colocar productos financieros de alto riesgo entre sus propios aficionados y acabar demandado por ellos.",
      "<strong>La defensa de Cristiano:</strong> Sus abogados intentaron desestimar la demanda alegando que el portugués no era responsable del comportamiento del mercado cripto; el caso siguió su curso.",
      "<strong>El balance:</strong> Una demanda colectiva de más de 1.000 millones de dólares por publicitar NFT que arruinaron a sus propios fans. Para los críticos, la prueba del instinto depredador del negocio Cristiano.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> La demanda colectiva contra Cristiano por Binance es real y pública. La resolución del caso sigue su curso en los tribunales.</div>"
    ],


    date:"2022年6月（代言签约）/ 2023年11月（被诉）",
    dateEn:"Jun 2022 (deal signed) / Nov 2023 (sued)",
    location:"美国 佛罗里达南区联邦法院",
    locationEn:"US District Court, Southern Florida",
    img:"assets/images/report/r-64.jpg",
    summary:"为加密交易所 Binance 代言「CR7」系列 NFT，被控推广未注册证券，2023年11月遭美国投资者集体诉讼，索赔超10亿美元。粉丝买进的 NFT，一年内从77美元跌到1美元。",
    summaryEn:"He endorsed the CR7 NFT line for crypto exchange Binance and stands accused of promoting unregistered securities; in November 2023 US investors filed a class action seeking over $1 billion. Fans who bought in watched the NFT crash from $77 to $1 within a year.",
    detail:[
      "<strong>代言始末：</strong>2022年6月23日，C罗与全球最大加密货币交易所 Binance 签下多年独家 NFT 合作，并高调宣布「<em>我们将改变 NFT 游戏</em>」。同年11月，卡塔尔世界杯前夕，首发「CR7」系列 NFT，主打7款动画雕像，记录他职业生涯的标志性瞬间，售价从<strong>77美元到1万美元</strong>不等。",
      "<strong>引爆流量的代价：</strong>诉讼文件指出，C罗的明星代言直接带动 Binance 搜索量<strong>暴涨500%</strong>，超过1亿用户被其广告曝光。粉丝冲着「C罗同款」开了 Binance 账户、买入 BNB 等代币——而这些代币，被美国 SEC 认定为<strong>未注册证券</strong>。",
      "<strong>10亿美元集体诉讼：</strong>2023年11月27日，美国佛罗里达南区联邦法院受理集体诉讼，索赔金额<strong>超过10亿美元</strong>。原告律师 Moskowitz 指控：C罗「鼓励其数以千万计的粉丝、支持者投资 Binance 平台」，且未依法披露代言报酬，违反美国证券法的明星代言披露规则。",
      "<strong>NFT 跳水：</strong>最讽刺的是粉丝手里的「CR7 NFT」——最低档首发价77美元，一年后跌到约<strong>1美元</strong>，跌幅近99%。所谓「改变 NFT 游戏」，最终变成「改变粉丝的钱包」。",
      "<strong>SEC 的警告：</strong>SEC 主席 Gary Gensler 此前已多次点名：明星代言加密资产证券必须公开收了多少钱、替谁站台。C罗被指「<em>明知或应知 Binance 在出售未注册加密证券</em>」，却依旧为其背书。",
      "<strong>Binance 本身的污点：</strong>就在诉讼前两周，Binance 及其创始人赵长鹏（CZ）认罪，承认反洗钱违规并缴纳<strong>43亿美元</strong>罚金，CZ 辞职。C罗选在这个时候仍继续为这家已被定罪的交易所站台，被批「眼里只有代言费」。",
      "<strong>拒不收手：</strong>截至2024–2025年，C罗与 Binance 仍持续推出新 NFT 系列（如纪念950球的「#7heSelection」），并搞「拍得者可赴沙特见C罗」的营销。诉讼悬而未决，收割却一刻没停。",
      "<strong>总评：</strong>一场超10亿美元的集体诉讼，起因是他把自家粉丝领进了血本无归的 NFT。批评者眼中，这是C罗生意版图中最具掠夺性的一面。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>本档案依据 BBC、Guardian、Decrypt、ABC News 等公开报道与美国联邦法院诉讼文件整理。诉讼尚在进行中，C罗对所有指控均未承认，最终以法院判决为准。</div>"
    ],
    detailEn:[
      "<strong>The endorsement timeline:</strong> On 23 June 2022 Ronaldo signed a multi-year exclusive NFT deal with the world's largest crypto exchange, Binance, loudly announcing that '<em>we will change the NFT game</em>'. In November that year, on the eve of the Qatar World Cup, the first 'CR7' NFT collection dropped — animated statues capturing iconic moments of his career, priced from <strong>$77 to $10,000</strong>.",
      "<strong>The price of going viral:</strong> The lawsuit alleges Ronaldo's celebrity endorsement directly drove a <strong>500% spike</strong> in Binance search traffic, exposing more than 100 million users to his ads. Fans opened Binance accounts and bought tokens like BNB 'because of Ronaldo' — tokens that the US SEC has classified as <strong>unregistered securities</strong>.",
      "<strong>The $1 billion class action:</strong> On 27 November 2023 the US District Court for the Southern District of Florida certified a class action seeking <strong>over $1 billion</strong>. Plaintiff attorney Moskowitz alleged Ronaldo 'encouraged his tens of millions of fans and supporters to invest in the Binance platform' and failed to disclose his endorsement compensation, as US securities-law rules require of celebrity promoters.",
      "<strong>The NFT cliff dive:</strong> The 'CR7 NFT' in fans' hands — the entry-level $77 drop — fell to about <strong>$1</strong> within a year, a 99% crash. The promise to 'change the NFT game' was kept, after a fashion — what changed were his fans' wallets.",
      "<strong>The SEC's warning:</strong> SEC chair Gary Gensler had repeatedly warned that celebrities endorsing crypto-asset securities must publicly disclose how much they were paid and whose product they were fronting. Ronaldo was alleged to have '<em>known or should have known that Binance was selling unregistered crypto securities</em>', yet still fronted for it.",
      "<strong>Binance's own stain:</strong> Just two weeks before the suit, Binance and its founder Changpeng Zhao (CZ) had pleaded guilty to anti-money-laundering violations and paid a <strong>$4.3 billion</strong> fine, with CZ stepping down. Ronaldo kept fronting for the convicted exchange all the same — a choice slammed as 'caring only about the endorsement fee'.",
      "<strong>Refusing to stop:</strong> Through 2024-2025 Ronaldo and Binance kept dropping new NFT series (such as the '#7heSelection' commemorating his 950th goal), even running a 'highest bidder wins a trip to Saudi Arabia to meet Cristiano' promo. The lawsuit hangs unresolved; the harvesting never pauses.",
      "<strong>Verdict:</strong> A class action seeking over $1 billion for promoting NFTs that sank his own fans. For the critics, Exhibit A of the Cristiano business at its most predatory.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong> This file is compiled from public reporting by the BBC, Guardian, Decrypt, ABC News and others, and from US federal court filings. The lawsuit is ongoing; Ronaldo has not admitted any of the allegations, and the final outcome rests with the court's verdict.</div>"
    ],
    quote:{text:"我们将改变 NFT 游戏，把足球带到下一个层次。", textEn:"We're going to change the NFT game and take football to the next level.", author:"C罗，2022年Binance代言官宣视频", authorEn:"Cristiano Ronaldo, 2022 Binance endorsement announcement video", textEs:"Vamos a cambiar el mundo de los NFT y a llevar el fútbol al siguiente nivel.", authorEs:"Cristiano Ronaldo, vídeo de presentación del patrocinio de Binance en 2022"},
    tags:["Binance","NFT","加密货币","10亿美元","集体诉讼","SEC","割韭菜","佛罗里达","CR7","赵长鹏","未注册证券"],
    tagsEn:["Binance","NFT","cryptocurrency","$1 billion","class action","SEC","fleecing fans","Florida","CR7","CZ (Zhao)","unregistered securities"],
    tagsEs:["Binance","NFT","criptomoneda","1.000 millones de dólares","demanda colectiva","SEC","estafa a aficionados","Florida","CR7","CZ (Zhao)","valores no registrados"]
  },
  {
    id:65, cat:"offpitch", catLabel:"场外失态", severity:4,
    dateIso:"2020-10-01",
    title:"新冠疫情两次违规 — 特权阶级的隔离",
    titleEn:"Two COVID-Rule Breaches — A Privileged Quarantine",
    titleEs: "Dos incumplimientos COVID — una cuarentena privilegiada",
    summaryEs: "En octubre de 2020, con la Juve en cuarentena, voló en avión privado a Portugal para la selección y dio positivo; el ministro italiano de Deportes lo recriminó públicamente y él lo llamó mentiroso. En 2021, reincidente.",
    dateEs: "Oct 2020 / Ene 2021",
    locationEs: "Turín, Italia ↔ Portugal ↔ valle alpino",
    detailEs: [
      "<strong>El primer incumplimiento (octubre 2020):</strong> En octubre de 2020, con la Juventus en cuarentena por un brote de COVID en el vestuario, Cristiano <strong>voló en avión privado a Portugal</strong> para unirse a la selección. En plena pandemia, claro.",
      "<strong>El positivo:</strong> En la concentración portuguesa, Cristiano <strong>dio positivo por COVID-19</strong>. Escándalo en Italia: se había desplazado a pesar de las restricciones y había acabado contagiándose.",
      "<strong>El regreso irregular:</strong> Cristiano regresó a Turín en avión privado <strong>violando las restricciones sanitarias</strong> italianas (que prohibían desplazamientos desde zonas de riesgo). La fiscalía italiana abrió una investigación.",
      "<strong>El ministro italiano recrimina:</strong> <strong>Vincenzo Spadafora</strong>, ministro de Deportes, recriminó públicamente a Cristiano por su comportamiento: «<strong>Todos deben respetar las normas de prevención de la pandemia</strong>», dijo.",
      "<strong>La respuesta de Cristiano:</strong> Respondió a Spadafora en redes: «un señor ministro me acusa de haber violado el protocolo, pero está mintiendo». Un futbolista llamando mentiroso a un ministro.",
      "<strong>El segundo incumplimiento (enero 2021):</strong> En enero de 2021, Cristiano volvió a incumplir las restricciones: se desplazó a un <strong>valle alpino</strong> para una fiesta de cumpleaños con Georgina, en pleno confinamiento italiano.",
      "<strong>El balance:</strong> Dos incumplimientos públicos de las normas COVID, una bronca con un ministro y una imagen de privilegio: las estrellas como Cristiano podían saltarse las restricciones que el resto debía cumplir.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> Los desplazamientos de Cristiano en plena pandemia y la polémica con Spadafora son hechos documentados por la prensa italiana.</div>"
    ],


    date:"2020年10月 / 2021年1月",
    dateEn:"Oct 2020 / Jan 2021",
    location:"意大利 都灵 ↔ 葡萄牙 ↔ 阿尔卑斯山谷",
    locationEn:"Turin, Italy ↔ Portugal ↔ Alpine valley",
    img:"assets/images/report/r-65.jpg",
    summary:"2020年10月，尤文全队隔离，C罗仍飞赴葡萄牙国家队；检测阳性后照样回国，被意大利体育部长公开点名违规。2021年1月疫情封城期，他又带女友去阿尔卑斯山谷庆生，遭警方调查。",
    summaryEn:"In October 2020, with Juventus in quarantine, he still flew to Portugal for national duty and tested positive; Italy's sports minister publicly called him out for breaching rules after he flew home. In January 2021 he took his girlfriend to an Alpine valley resort for her birthday during lockdown and was investigated by police.",
    detail:[
      "<strong>第一次违规（2020年10月）：</strong>尤文图斯因两名工作人员确诊进入隔离，全队被要求留在都灵。C罗却<strong>擅自飞往葡萄牙</strong>参加国家队集训，随后新冠检测呈阳性。意大利体育部长 Spadafora 公开表态：「<em>我认为他违反了防疫规定。</em>」",
      "<strong>阳性后仍回国：</strong>确诊后，C罗没有就地隔离，反而从葡萄牙<strong>私人医疗专机飞回都灵</strong>。当地卫生部门明确表示其行为可能违反隔离令，意大利警方介入调查。",
      "<strong>「特权通行」的愤怒：</strong>普通市民跨区都要审批，C罗却凭球星身份在国家间来去自如。Spadafora 的公开点名让舆论炸锅——「规则对巨星无效」成为当时意大利社交媒体最热的话题。",
      "<strong>第二次违规（2021年1月）：</strong>疫情封城期间，都灵居民被禁止跨区出行。C罗却带女友 Georgina 前往<strong>100公里外的阿尔卑斯山山谷度假村</strong>庆生。警方以「涉嫌违反出行限制」立案调查，C罗后以「个人原因」辩解。",
      "<strong>C罗的回应：</strong>面对部长点名，C罗反驳「<em>我做了所有该做的事</em>」，并把锅推给尤文俱乐部和防疫部门。这种「我没错、是你们的规则有问题」的姿态，与他此后处理争议事件的话术如出一辙。",
      "<strong>横向对比：</strong>同期多位球星（如迪巴拉、拉什福德）感染后都严格遵守隔离。C罗两次顶风作案，被批评者视为「<strong>用商业价值绑架防疫</strong>」的典型——他需要的不是特例，而是觉得自己本就该有特例。",
      "<strong>总评：</strong>两次公然违反新冠防疫规定、与部长吵架——一幅特权阶层的画像：像C罗这样的球星，可以肆意突破普通人必须遵守的限制。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>本档案依据 CGTN、The Guardian、ESPN、Al Jazeera、Goal.com 等公开报道整理。两次违规均经意大利体育部长及警方公开确认/调查，C罗否认违规指控。</div>"
    ],
    detailEn:[
      "<strong>First breach (October 2020):</strong> With Juventus in quarantine after two staff members tested positive, the entire squad was ordered to stay in Turin. Ronaldo <strong>flouted the order and flew to Portugal</strong> for the national-team camp, then tested positive for COVID-19. Italy's sports minister Spadafora publicly stated: '<em>I believe he breached the pandemic regulations.</em>'",
      "<strong>Flying home after the positive test:</strong> After the diagnosis, rather than isolate in place, Ronaldo took a <strong>private medical flight from Portugal back to Turin</strong>. Local health authorities said his action potentially violated the isolation order, and Italian police opened an investigation.",
      "<strong>The anger over 'privileged passage':</strong> Ordinary citizens needed permits to cross regions, yet Ronaldo, thanks to his superstar status, moved freely between countries. Spadafora's public naming lit an Italian social-media firestorm — and for days the country's hottest topic was the anger at 'rules not applying to megastars'.",
      "<strong>Second breach (January 2021):</strong> During a pandemic lockdown, Turin residents were barred from crossing regions. Yet Ronaldo took his girlfriend Georgina to an <strong>Alpine valley resort 100 kilometres away</strong> to celebrate her birthday. Police opened a probe for 'suspected breach of movement restrictions'; Ronaldo later pleaded 'personal reasons'.",
      "<strong>Ronaldo's response:</strong> Confronted with the minister's call-out, Ronaldo countered that '<em>I did everything I was supposed to</em>' and deflected blame onto Juventus and the health authorities. That 'I did nothing wrong, your rules are the problem' posture mirrors how he has handled every controversy since.",
      "<strong>For contrast:</strong> In the same period, several stars (Dybala and Rashford among them) strictly observed isolation after infection. Ronaldo's two breaches were read by critics as a textbook case of '<strong>using commercial value to hold the pandemic rules hostage</strong>' — he wasn't asking for an exception; he was convinced he deserved one by default.",
      "<strong>Verdict:</strong> Two public breaches of COVID rules, a row with a minister, a picture of privilege: restrictions the rest had to obey — and stars like Cristiano free to flout them.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong> This file is compiled from public reporting by CGTN, The Guardian, ESPN, Al Jazeera, Goal.com and others. Both breaches were publicly confirmed / investigated by Italy's sports minister and police; Ronaldo denies the breach allegations.</div>"
    ],
    quote:{text:"所有人都必须遵守防疫规定。", textEn:"Everyone must follow the pandemic-prevention rules.", author:"意大利体育部长 Spadafora，公开点名C罗", authorEn:"Vincenzo Spadafora, Italian Minister for Sport, publicly calling out Ronaldo", textEs:"Todo el mundo debe respetar las normas de prevención de la pandemia.", authorEs:"Vincenzo Spadafora, ministro italiano de Deporte, recriminando públicamente a Cristiano"},
    tags:["新冠","疫情违规","特权阶级","Spadafora","尤文图斯","葡萄牙","阿尔卑斯","隔离","警方调查","2020","2021"],
    tagsEn:["COVID","COVID-rule breach","privileged class","Spadafora","Juventus","Portugal","Juventus (Alps)","quarantine","police investigation","2020","2021"],
    tagsEs:["COVID","incumplimiento COVID","clase privilegiada","Spadafora","Juventus","Portugal","Juventus (Alpes)","cuarentena","investigación policial","2020","2021"]
  },
  {
    id:66, cat:"national", catLabel:"国家队争议", severity:3,
    dateIso:"2024-07-01",
    title:"2024欧洲杯罚丢点球痛哭 — 自我救赎还是抢戏？",
    titleEn:"Euro 2024 Penalty Miss & Tears — Redemption or Scene-Stealing?",
    titleEs: "Penal fallado y lágrimas en la Euro 2024 — ¿redención o robo de protagonismo?",
    summaryEs: "En el minuto 114 de la prórroga, Oblak le detuvo un penal; Cristiano, de 39 años, rompió a llorar en el campo; en la tanda, Portugal clasificó y Cristiano celebró como si fuera el héroe.",
    dateEs: "1 jul 2024 · Fráncfort, Alemania",
    locationEs: "Alemania · Euro 2024 octavos · Portugal 0-0 (3-0 pen.) Eslovenia",
    detailEs: [
      "<strong>El partido de octavos:</strong> El 1 de julio de 2024, Portugal se enfrentó a Eslovenia en octavos de final de la Eurocopa 2024, en Fráncfort. El partido se fue a la prórroga con 0-0 en el marcador.",
      "<strong>El penal fallado (114'):</strong> En el minuto 114 de la prórroga, Portugal tuvo un penal a favor. Cristiano, de 39 años, se dispuso a lanzarlo, pero <strong>Jan Oblak</strong>, portero esloveno, le detuvo el disparo.",
      "<strong>Las lágrimas en el campo:</strong> Tras fallar el penal, Cristiano <strong>rompió a llorar en el campo</strong>. La imagen del portugués, de 39 años, llorando por un penal que aún no había decidido nada dio la vuelta al mundo.",
      "<strong>La tanda de penales:</strong> Pese al fallo de Cristiano en la prórroga, el partido se decidió desde el punto penal. Portugal ganó <strong>3-0 en la tanda</strong> (Diogo Costa paró tres penales eslovenos) y clasificó a cuartos.",
      "<strong>La celebración de Cristiano:</strong> Tras la clasificación, Cristiano celebró con euforia, como si el gol de la victoria hubiera sido suyo. Para sus críticos, un caso claro de «robo de protagonismo»: falla él y el héroe sigue siendo él.",
      "<strong>«Redención o robo de foco»:</strong> El debate se instaló: ¿las lágrimas de Cristiano fueron una señal de redención (reconocer el error) o una forma más de acaparar el foco? Para los haters, claramente lo segundo.",
      "<strong>La frase posterior:</strong> Tras el partido, Cristiano declaró: «<strong>La tristeza del principio es la alegría del final. Esto es el fútbol: momentos increíbles</strong>». Una frase que algunos vieron poética y otros, pretenciosa.",
      "<strong>El balance:</strong> Un penal fallado, lágrimas en el campo, clasificación en la tanda y una celebración desproporcionada. Para los críticos, el partido de Cristiano en la Euro 2024 retrató su incapacidad de asumir el error sin acaparar el foco.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> El penal fallado de Cristiano y sus lágrimas en la Euro 2024 son hechos documentados. La valoración sobre «redención o robo de protagonismo» es objeto de debate.</div>"
    ],


    date:"2024年7月1日 · 德国法兰克福",
    dateEn:"Jul 1, 2024 · Frankfurt, Germany",
    location:"德国 2024欧洲杯1/8决赛 葡萄牙0-0(点球3-0)斯洛文尼亚",
    locationEn:"Germany · Euro 2024 R16 · Portugal 0-0 (3-0 pens) Slovenia",
    img:"assets/images/report/r-66.jpg",
    summary:"C罗加时赛第114分钟主罚点球，被奥布拉克扑出，39岁的他当场痛哭；点球大战第一罚将功补过。本该是全队晋级之夜，叙事的主角却又是他自己。",
    summaryEn:"In the 114th minute of extra time his penalty was saved by Oblak; 39-year-old Ronaldo burst into tears on the pitch, then took the first kick in the shootout to make amends. A night that should have belonged to the team became, once again, all about him.",
    detail:[
      "<strong>120分钟的窒息：</strong>2024年7月1日，欧洲杯1/8决赛，葡萄牙对阵斯洛文尼亚。常规时间0-0，加时赛上半场补时阶段（第114分钟），葡萄牙获得点球——这是绝杀的黄金机会。",
      "<strong>关键罚丢：</strong>39岁的C罗主罚，却被马竞老对手、斯洛文尼亚门将<strong>奥布拉克（Jan Oblak）</strong>神勇扑出，皮球撞立柱弹出。C罗整场比赛此前已浪费5-6次绝佳机会，这次点球本可救赎一切，却以最残酷的方式告吹。",
      "<strong>当场落泪：</strong>点球罚丢后，镜头捕捉到C罗<strong>眼眶泛红、当场落泪</strong>，加时赛休息期间队友纷纷上前安慰、亲吻额头。看台上的母亲同样泪流满面——这一幕迅速成为本届欧洲杯最出圈的画面。",
      "<strong>点球大战的自我救赎：</strong>进入点球大战，C罗<strong>主动要求第一罚</strong>，低射破门，将功补过。而队友科斯塔（Diogo Costa）将对方三粒点球全部没收，葡萄牙3-0晋级。本该是「门将封神之夜」——可赛后的舆论焦点，又回到了C罗身上。",
      "<strong>「抢戏」的争议：</strong>批评者指出：晋级功劳应归于扑出三粒点球的科斯塔，但C罗的眼泪、C罗的救赎、C罗的「第一罚」抢走了全部叙事。媒体称之为「<em>The Cristiano Ronaldo Show</em>」——无论成败，主角永远只能是他。",
      "<strong>「整届赛事0球」的尴尬：</strong>39岁的C罗整届欧洲杯<strong>颗粒无收（0进球1助攻）</strong>，成为队史最年长却也是最沉寂的核心。罚丢点球，不过是这种衰退最公开的一次爆发。",
      "<strong>主教练的力挺与反讽：</strong>主帅马丁内斯赛后力挺：「他是我们的榜样……错过点球后主动第一个罚，是典范。」但这番「力挺」本身也充满反讽——一个需要教练反复强调「他很重要」的核心，恰恰说明他的重要性已经需要被论证了。",
      "<strong>总评：</strong>一粒罚失的点球、场上的泪水、点球大战后的晋级，还有一场失度的庆祝。批评者认为，C罗在2024欧洲杯的这场比赛里，连承担失误都做不到不出风头。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>本档案依据 ESPN、CNN、Sky Sports 等公开报道整理。比赛结果与数据均可查证，对叙事主角的讨论属媒体评论。</div>"
    ],
    detailEn:[
      "<strong>120 minutes of suffocation:</strong> On 1 July 2024, in the Euro round of 16, Portugal faced Slovenia. Regulation time ended 0-0; then, in the stoppage time at the end of extra time's first half (114th minute), Portugal were awarded a penalty — a golden chance to win it.",
      "<strong>The costly miss:</strong> The 39-year-old Ronaldo took it, only for Slovenian keeper (and long-time Atlético foe) <strong>Jan Oblak</strong> to produce a stunning save — the ball struck the post and bounced away. He had already wasted 5-6 great chances in the match; this penalty was meant to wipe the slate clean. It did the opposite.",
      "<strong>Tears on the spot:</strong> After the miss, cameras caught Ronaldo <strong>red-eyed and weeping on the pitch</strong>; at the extra-time interval, teammates queued to console him and kiss his forehead. His mother was in tears in the stands too — a moment that quickly became the most-viral image of the Euros.",
      "<strong>Shootout redemption:</strong> In the shootout Ronaldo <strong>asked to take the first kick</strong> and slotted it low to make amends. Teammate Diogo Costa went further still, saving all three Slovenian penalties — Portugal through 3-0. It should have been 'the keeper's night'; the post-match narrative swung back to Ronaldo all the same.",
      "<strong>The 'scene-stealing' controversy:</strong> Critics argued the credit belonged to Costa, who saved three penalties — but Ronaldo's tears, Ronaldo's redemption, Ronaldo's 'first kick' hogged the entire narrative. The media dubbed it '<em>The Cristiano Ronaldo Show</em>' — win or lose, the protagonist can only ever be him.",
      "<strong>The '0 goals for the tournament' awkwardness:</strong> The 39-year-old Ronaldo finished the Euros <strong>goalless (0 goals, 1 assist)</strong> — the oldest focal point in Portugal's history, and the quietest. The penalty miss was merely that decline surfacing all at once: the man who once decided matches alone is being slowly stripped of his leading-man halo by time.",
      "<strong>The manager's backing, and the irony:</strong> Manager Martínez backed him afterwards: 'He is our role model… to take the first penalty after missing shows his character.' But the 'backing' is itself the irony — a linchpin whose coach must keep insisting 'he matters' is a linchpin whose importance now has to be argued.",
      "<strong>Verdict:</strong> A missed penalty, tears on the pitch, qualification via the shootout, then celebration out of all proportion. For the critics, Cristiano's Euro 2024 laid it bare: he cannot own a mistake without hogging the spotlight.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong> This file is compiled from public reporting by ESPN, CNN, Sky Sports and others. Match results and data are all verifiable; discussion of the narrative protagonist reflects media commentary.</div>"
    ],
    quote:{text:"开场的悲伤，是结尾的喜悦。这就是足球——不可思议的瞬间。", textEn:"The sorrow of the opening is the joy of the ending. That's football — unbelievable moments.", author:"C罗，2024欧洲杯1/8决赛点球大战后采访", authorEn:"Cristiano Ronaldo, interview after the UEFA Euro 2024 round-of-16 penalty shootout", textEs:"La tristeza del principio es la alegría del final. Esto es el fútbol: momentos increíbles.", authorEs:"Cristiano Ronaldo, entrevista tras la tanda de penales de los octavos de la Euro 2024"},
    tags:["2024欧洲杯","斯洛文尼亚","奥布拉克","罚丢点球","痛哭","39岁","0进球","自我救赎","抢戏","法兰克福","科斯塔","点球大战"],
    tagsEn:["Euro 2024","Slovenia","Oblak","missed penalty","in tears","age 39","0 goals","self-redemption","scene-stealing","Frankfurt","Costa","penalty shootout"],
    tagsEs:["Eurocopa 2024","Eslovenia","Oblak","penalti fallado","llorando","39 años","0 goles","autorredención","robar el protagonismo","Fráncfort","Costa","tanda de penales"]
  },
  // ========== ↓↓↓ 续编（2026-07-08）伊瓜因被抢单刀事件，配图来自 Bleacher Report 文章原图（AP） ↓↓↓
  {
    id:67, cat:"club", catLabel:"俱乐部与法律", severity:3,
    dateIso:"2009-01-01",
    title:"抢单刀废队友 — 伊瓜因空门被C罗挡出",
    titleEn:"Snatching the Breakaway — Blocked Higuaín's Open Goal",
    titleEs: "Robando el contraataque — le taponó el gol a bocajarro a Higuaín",
    summaryEs: "Higuaín recortó al portero y se quedó solo ante la portería vacía, pero Cristiano se metió para intentar marcar él mismo y le tapó el gol a su compañero; egoísmo en estado puro.",
    dateEs: "2009-2013 · Real Madrid / 2018-2020 · se repitió en la Juve",
    locationEs: "Madrid, España / Turín, Italia",
    detailEs: [
      "<strong>La jugada (Real Madrid, 2009-2013):</strong> En un partido del Real Madrid, <strong>Gonzalo Higuaín</strong> recortó al portero rival y se quedó solo ante la portería vacía, con todo el gol por empujar.",
      "<strong>La intromisión de Cristiano:</strong> Entonces, <strong>Cristiano se metió en la jugada</strong> e intentó marcar él mismo. El resultado: le tapó el disparo a Higuaín y desperdició una ocasión clarísima de gol.",
      "<strong>El egoísmo:</strong> En vez de dejar que su compañero marcara a placer, intentó robarle el gol para llevárselo él. El «yo» por delante del equipo.",
      "<strong>La reacción de Higuaín:</strong> Higuaín, visiblemente enfadado, recriminó a Cristiano la intromisión. La imagen de los dos discutiendo por un gol desperdiciado quedó como ejemplo del carácter del portugués.",
      "<strong>El patrón repetido:</strong> La escena se repitió a lo largo de la carrera de Cristiano, también en su etapa en la Juventus (2018-2020): por costumbre, se metía en jugadas de compañeros para llevarse el gol.",
      "<strong>La frase de Higuaín:</strong> Años después, en una entrevista, <strong>Higuaín</strong> declaró (según Don Balón): «<strong>Es demasiado egocéntrico. Si no le dices que es el mejor, no es tu amigo. Compartí vestuario con Messi y son dos personas completamente distintas</strong>».",
      "<strong>La negación posterior:</strong> Higuaín (ya en el Napoli) matizó después que no había dicho esas palabras, pero la anécdota quedó. El contraste con Messi (alabado por sus compañeros por su generosidad) habló solo.",
      "<strong>El balance:</strong> Taponar el gol a un compañero para intentar marcar uno mismo es la imagen perfecta del egoísmo Cristiano. Una jugada que define al portugués mejor que cualquier discurso.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> La jugada del gol tapado a Higuaín está documentada en vídeo. Las declaraciones atribuidas a Higuaín (luego matizadas) fueron recogidas por Don Balón.</div>"
    ],


    date:"2009-2013 · 皇马时期 / 2018-2020 · 尤文二次挤压",
    dateEn:"2009-2013 · Real Madrid / 2018-2020 · squeezed again at Juve",
    location:"西班牙马德里 / 意大利都灵",
    locationEn:"Madrid, Spain / Turin, Italy",
    img:"assets/images/report/r-67.jpg",
    summary:"伊瓜因过掉门将面对空门，C罗挤过去想自己进球、挡掉队友必进球路线；伊瓜因随后公开炮轰「他太自负，不夸他最好就不爽」，并对比梅西「两人完全不一样」。",
    summaryEn:"Higuaín rounded the keeper and faced an open goal — until Ronaldo charged in to finish it himself and blocked a teammate's certain goal. Higuaín later blasted him in public: 'he's too full of himself, if you don't praise him as the best he sulks' — then drew the Messi comparison: 'the two are nothing alike'.",
    detail:[
      "<strong>名场面：挡掉伊瓜因空门：</strong>皇马时期，伊瓜因反越位成功、过掉门将面对空门，本可轻松推射得分。C罗却从侧后方挤进禁区，试图自己抢点射门，结果两人撞在一起，球也没进。这一幕被做成视频「Cristiano Ronaldo selfishness costs Higuain a goal」广泛流传——<em>宁可自己不进，也不能让队友进</em>。",
      "<strong>「抢点球/抢任意球」传统：</strong>这并非孤例。C罗在皇马、尤文都以「抢点球权」著称：本该由状态更好的队友主罚的点球，他常坚持自己来；任意球更是几乎独占，哪怕命中率已断崖式下滑。伊瓜因、本泽马、迪巴拉都当过这种「球权独占」的牺牲品。",
      "<strong>伊瓜因的公开炮轰：</strong>离开皇马转投那不勒斯后，伊瓜因在接受西班牙《Don Balon》杂志采访时公开批评C罗：「<em>他太自负了。你不夸他是最好的，他就不是你朋友。C罗自以为最好，但他被高估了。</em>」并直接拿梅西做对比：「我跟梅西共用过一个更衣室，两个人完全不一样。」",
      "<strong>那不勒斯的「否认」：</strong>这番言论引发轩然大波后，伊瓜因当时效力的那不勒斯俱乐部紧急发声明「否认伊瓜因接受过该采访」，称「相关言论被视为虚假且毫无根据」。但多家媒体（Bleacher Report、Mirror、Sport）已广泛转载，伊瓜因本人也未就言论内容明确反驳——「否认采访」和「否认说过」之间，留足了想象空间。",
      "<strong>离开皇马的导火索之一：</strong>伊瓜因 2013 年以 3700 万欧元转投那不勒斯，外界普遍认为，与C罗的球权之争、在皇马被迫给C罗让位的压抑，是离队的重要诱因之一。他本人在不同场合暗示过，皇马的战术「一切围绕C罗」，前锋队友只是配角。",
      "<strong>尤文时期的二次挤压：</strong>2018 年，C罗转投尤文图斯——伊瓜因当时正是尤文前锋。C罗一来，伊瓜因立刻被外租（先后至 AC 米兰、切尔西），彻底失去位置。尤文对阵米兰一役，伊瓜因情绪当场崩溃：<strong>骂裁判、怼C罗、吼基耶利尼，最终红牌罚下</strong>——多年积压的怨气，在重逢「老队友」时一齐爆发。",
      "<strong>本泽马的「自我牺牲」对照：</strong>同样与C罗共事的本泽马走了相反的路——主动化身「绿叶」，做支点、做策应、把射门权让给C罗。他多次公开为C罗辩护「他不是自私」，但这恰恰证明：和C罗共存的前提是<strong>你必须自我牺牲</strong>，否则就是伊瓜因的下场。",
      "<strong>总评：</strong>封堵队友的必进球、好让自己起脚，这就是C罗的自私本性。对伊瓜因的这次「拦截」，不过是把「我优先于球队」的底色又描粗了一遍。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>本档案依据 Bleacher Report、Mirror、Sport、懂球帝、知乎专栏等公开报道整理。伊瓜因「炮轰C罗」的采访那不勒斯俱乐部曾否认其真实性；场上「挡空门」一事为流传视频，具体赛事场次有待进一步核实。内容仅供娱乐。</div>"
    ],
    detailEn:[
      "<strong>The open-goal block on Higuaín:</strong> In the Real Madrid years Higuaín once sprang the offside trap, rounded the keeper and faced an open goal — an easy tap-in. Ronaldo came charging in from behind to finish it himself; the two collided and the ball went begging. The clip did the rounds under the title 'Cristiano Ronaldo selfishness costs Higuain a goal' — <em>better neither score than let a teammate score</em>.",
      "<strong>The 'penalty/free-kick grabbing' tradition:</strong> Far from an isolated case. At Madrid and Juve, Ronaldo was famed for 'grabbing penalty duties': he insisted on taking penalties that should have gone to in-form teammates, and free-kicks were almost exclusively his — even as his conversion rate fell off a cliff. Higuaín, Benzema and Dybala all fell victim to this 'ball-hogging'.",
      "<strong>Higuaín's public blast:</strong> After leaving Real for Napoli, Higuaín criticised Ronaldo in an interview with Spain's Don Balon magazine: '<em>He's too full of himself. If you don't praise him as the best, he's not your friend. Cristiano thinks he's the best, but he's overrated.</em>' He then drew a direct comparison with Messi: 'I shared a dressing room with Messi — the two are completely different.'",
      "<strong>Napoli's 'denial':</strong> Once the remarks stirred up trouble, Napoli — Higuaín's club at the time — rushed out a statement 'denying that Higuaín had given the interview', calling the quotes 'fabricated and groundless'. But multiple outlets (Bleacher Report, Mirror, Sport) had already widely reproduced them, and Higuaín himself never explicitly refuted the substance. There is plenty of room between 'denying the interview' and 'denying having said it'.",
      "<strong>A spark for leaving Real:</strong> Higuaín joined Napoli in 2013 for €37 million; the consensus is that his ball-rights feud with Ronaldo and the oppressive business of playing second fiddle were major reasons for the move. He has since hinted, on more than one occasion, that Madrid's tactics 'were all about Ronaldo' and that the striker partners were merely supporting cast.",
      "<strong>Squeezed again at Juve:</strong> By cruel coincidence, in 2018 Ronaldo moved to Juventus — where Higuaín was the striker. The moment Ronaldo arrived, Higuaín was loaned out (to AC Milan, then Chelsea) and lost his place entirely. In one Juve-Milan meeting Higuaín melted down completely: <strong>cursing the referee, squaring up to Ronaldo, bellowing at Chiellini, and finally getting sent off</strong> — years of pent-up resentment erupting at the reunion with the 'old teammate'.",
      "<strong>Benzema's 'self-sacrifice' contrast:</strong> Benzema, who also played with Ronaldo, took the opposite path — volunteering for the 'supporting act': holding up the play, providing the link, ceding the finishing to Ronaldo. He publicly defended Ronaldo more than once as 'not selfish' — but that very defence proves the point: the price of coexisting with Ronaldo is <strong>you have to sacrifice yourself</strong> — otherwise you get the Higuaín treatment.",
      "<strong>Verdict:</strong> Blocking a teammate's goal-bound effort to score it yourself: Cristiano's selfishness in a single frame. The Higuaín incident captured the «me ahead of the team» that defines the Portuguese.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong> This file is compiled from public reporting by Bleacher Report, Mirror, Sport, Dongqiudi, Zhihu columns and others. Napoli once denied the authenticity of the interview in which Higuaín 'blasted Ronaldo'; the 'blocked open goal' moment is a circulating video whose specific fixture awaits further verification. Content for entertainment only.</div>"
    ],
    quote:{text:"他太自负了。你不夸他是最好的，他就不是你朋友。我跟梅西共用过更衣室，两个人完全不一样。", textEn:"He's too full of himself. If you don't call him the best, he's not your friend. I shared a dressing room with Messi—they're two completely different people.", author:"伊瓜因，据《Don Balon》杂志报道（那不勒斯事后否认）", authorEn:"Gonzalo Higuaín, per Don Balón magazine (later denied by Napoli)", textEs:"Es demasiado egocéntrico. Si no le dices que es el mejor, no es tu amigo. Compartí vestuario con Messi y son dos personas completamente distintas.", authorEs:"Gonzalo Higuaín, según la revista Don Balón (luego negado por el Napoli)"},
    tags:["伊瓜因","抢点球","抢单刀","废队友","自私","皇马","尤文","本泽马","Don Balon","更衣室矛盾","球权独占"],
    tagsEn:["Higuaín","penalty theft","one-on-one theft","teammate-killer","selfishness","Real Madrid","Juve","Benzema","Don Balon","dressing-room rift","ball hog"],
    tagsEs:["Higuaín","robo de penalti","robo de mano a mano","compañero-mata","egoísmo","Real Madrid","Juve","Benzema","Don Balon","conflicto en vestuario","acapara el balón"]
  },
  {
    id:68, cat:"national", catLabel:"国家队争议", severity:3,
    dateIso:"2016-06-14",
    title:"怒喷冰岛“小国心态”",
    titleEn:"'Small Mentality' — The Iceland Rant",
    titleEs:"«Mentalidad pequeña»: la bronca a Islandia",
    summaryEs:"Tras el 1-1 ante Islandia en la Euro 2016, Cristiano soltó que los islandeses celebraron «como si hubieran ganado la Eurocopa» y que eso «denota una mentalidad pequeña». Islandia respondió en el campo: octavos y victoria sobre Inglaterra.",
    dateEs: "14 jun 2016",
    locationEs: "Saint-Étienne, Francia",
    detailEs: [
      "<strong>El partido:</strong> debut de Portugal en la Euro 2016, grupo F, en Saint-Étienne. Nani abrió el marcador en el 31, pero Birkir Bjarnason empató en el 50 para un Islandia que disputaba su primer gran torneo. El 1-1 final dejó a Cristiano de muy mal humor: remató once veces sin puerta real y se fue de vacío.",
      "<strong>La bronca:</strong> en la zona mixta, Cristiano arremetió contra el rival: «Islandia no intentó jugar; solo defendieron con diez atrás. Creo que celebraron el empate como si hubieran ganado la Eurocopa. Eso, en mi opinión, <em>denota una mentalidad pequeña</em>, y no van a hacer nada en este torneo».",
      "<strong>La afrenta a un país entero:</strong> Islandia tiene unos 330.000 habitantes — el país más pequeño que ha disputado nunca una Eurocopa. Que un multimillonario global le echara en cara su «mentalidad» por celebrar un punto se leyó como arrogancia de manual: burlarse desde arriba de un debutante ilusionado.",
      "<strong>La respuesta islandesa:</strong> el seleccionador Lars Lagerbäck se rió del comentario, y el vestuario lo convirtió en gasolina. Los islandeses empataron con Hungría, vencieron a Austria en el 94' y en octavos <strong>eliminaron a Inglaterra (2-1)</strong> — mientras Portugal pasaba como tercera de grupo sin ganar un solo partido.",
      "<strong>Justicia poética:</strong> el atronador «clap» islandés se hizo célebre en todo el mundo, y la frase de Cristiano se recicló como meme cada vez que Islandia daba la campanada. El propio Cristiano acabó comiéndose sus palabras: esas «mentes pequeñas» llegaron a cuartos; él no marcó ni un gol en toda la fase de grupos.",
      "<strong>El patrón:</strong> minusvalorar al rival es una constante — Islandia, «equipos que se encierran», árbitros, compañeros… Cuando no gana, siempre hay un culpable externo, y suele ser el más pequeño de la clase.",
      "<strong>Ironía final:</strong> Portugal acabó campeón de esa Eurocopa sin ganar un solo partido en 90 minutos hasta semifinales — con Cristiano lesionado en el minuto 25 de la final. La «mentalidad pequeña» islandesa quedó a un paso de cuartos; la «mentalidad grande» portuguesa levantó el trofeo del banco. El fútbol es cruel con los pronósticos del ego.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> Las declaraciones fueron recogidas por múltiples medios en la zona mixta de la Euro 2016. Este expediente se limita a la cobertura pública y al resultado deportivo documentado del torneo.</div>"
    ],
    date:"2016年6月14日",
    dateEn:"Jun 14, 2016",
    location:"法国圣艾蒂安",
    locationEn:"Saint-Étienne, France",
    img:"assets/images/report/r-22.jpg",
    summary:"2016欧洲杯首战1-1被冰岛逼平后，C罗赛后怒喷对手「庆祝得像拿了欧洲杯冠军，这是小国心态」。冰岛用战绩回击：小组出线、16强淘汰英格兰，而C罗整届小组赛一球未进。",
    summaryEn:"After Portugal's 1-1 draw with Iceland at Euro 2016, Ronaldo fumed that Iceland celebrated 'like they'd won the Euros' — 'a small mentality'. Iceland hit back on the pitch: they reached the last 16 and knocked out England, while Ronaldo went goalless through the entire group stage.",
    detail:[
      "<strong>比赛背景：</strong>2016年6月14日，法国欧洲杯F组首轮，葡萄牙在圣艾蒂安迎战首次参加大赛的冰岛。纳尼第31分钟先拔头筹，但人口仅33万的足球小国冰岛由比基尔·比亚尔纳松第50分钟扳平，1-1的比分保持到终场。C罗此役多次尝试射门均无功而返，全程脸色阴沉。",
      "<strong>赛后失言：</strong>混合区采访中，C罗把怒火全部倾泻在对手身上：「<em>冰岛根本不想踢球，他们11个人全在防守。他们进个球庆祝得就像拿了欧洲杯冠军一样——在我看来，这是一种<em>小国心态</em>，他们在这届比赛中不会有什么作为。</em>」",
      "<strong>以强凌弱的傲慢：</strong>冰岛是欧洲杯历史上参赛国中人口最少的国家（约33万），全国人口不及C罗一个人的社交媒体粉丝零头。一支首次站上大赛舞台的球队，为扳平世界豪门而狂欢，本是最纯粹的足球故事——C罗的「小国心态」论，被全球媒体解读为<em>教科书级的居高临下</em>。",
      "<strong>冰岛的回击：</strong>冰岛双主帅之一的拉格贝克笑着回应「不觉得意外」，全队则把这句话钉在更衣室当燃料。随后冰岛1-1逼平匈牙利、第94分钟绝杀奥地利，以小组第二出线；1/8决赛<strong>2-1淘汰英格兰</strong>，一路杀进八强，「维京战吼」响彻全球。而葡萄牙三场小组赛全部战平，以成绩最好的小组第三惊险晋级。",
      "<strong>天道好轮回：</strong>冰岛每前进一步，「小国心态」就被拿出来鞭尸一次，成了2016年夏天最著名的反向flag。而被C罗断言「不会有什么作为」的冰岛人，交出的成绩单比这句嘲讽体面得多——C罗本人整届小组赛<strong>一球未进</strong>，直到半决赛才靠点球打破进球荒。",
      "<strong>贬低对手的模式：</strong>从冰岛到「摆大巴的球队」，从裁判到队友，C罗的赛后发言里永远有一个外部替罪羊。赢球是「我是历史最佳」的证明，输球或平局则是对手「不配」「心态小」「只防守」——这套话术贯穿其整个职业生涯。",
      "<strong>讽刺结局：</strong>那届杯赛葡萄牙直到半决赛才第一次在90分钟内赢球，决赛C罗第25分钟伤退、靠替补埃德尔绝杀捧杯。被他嘲笑「小国心态」的冰岛昂首离开，他口中的「大心态」葡萄牙则一路平局躺进决赛。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>本档案依据2016年欧洲杯赛后混合区采访的公开报道（BBC、ESPN、卫报等）及赛事结果整理，相关引语为媒体广泛转载的译本。</div>"
    ],
    detailEn:[
      "<strong>The match:</strong> On 14 June 2016, Portugal opened their Euro 2016 Group F campaign against tournament debutants Iceland in Saint-Étienne. Nani struck in the 31st minute, but a nation of just 330,000 hit back through Birkir Bjarnason in the 50th, and it ended 1-1. Ronaldo racked up attempt after attempt to no avail, scowling his way through the night.",
      "<strong>The rant:</strong> In the mixed zone Ronaldo unloaded on the opposition: '<em>Iceland didn't try to play; they just defended with everyone behind the ball. They celebrated as if they'd won the Euros — in my opinion that shows a <em>small mentality</em>, and they won't achieve anything in this competition.</em>'",
      "<strong>Arrogance, textbook edition:</strong> Iceland was the smallest nation ever to play a Euro (pop. ~330,000 — fewer people than a rounding error of Ronaldo's social following). A debutant squad celebrating an equaliser against a world power is football's purest story; branding it 'small mentality' was read worldwide as <em>punching down with both fists</em>.",
      "<strong>Iceland's answer:</strong> Co-manager Lars Lagerbäck laughed it off, and the squad stapled the quote to the dressing-room wall as fuel. Iceland drew Hungary, beat Austria with a 94th-minute winner, then <strong>knocked out England 2-1</strong> in the last 16 — while Portugal advanced as a best-third with three draws.",
      "<strong>Poetic justice:</strong> Every Iceland step forward resurrected 'small mentality' as 2016's most famous reverse-jinx. The team Ronaldo declared 'won't achieve anything' reached the quarter-finals — while Ronaldo himself went <strong>goalless through the entire group stage</strong>, only opening his account from the spot in the semi-final.",
      "<strong>The pattern:</strong> From Iceland to 'teams that park the bus', from referees to teammates, Ronaldo's post-match script always features an external scapegoat. Wins prove he's 'the best in history'; draws and defeats mean the opponent 'didn't deserve it', had a 'small mentality' or 'only defended' — a rhetorical loop that has run his entire career.",
      "<strong>The ironic ending:</strong> Portugal didn't win a single match in 90 minutes until the semi-finals, and in the final Ronaldo went off injured in the 25th minute before substitute Éder won it. The 'small mentality' Iceland left with heads high; the 'big mentality' Portugal tiptoed through on draws.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong>This file is compiled from public reporting of the Euro 2016 mixed-zone interviews (BBC, ESPN, The Guardian, etc.) and documented tournament results; quotes are the widely circulated translations.</div>"
    ],
    quote:{text:"他们庆祝得就像拿了欧洲杯冠军一样——在我看来，这是小国心态，他们在这届比赛不会有什么作为。", textEn:"They celebrated like they'd won the Euros — in my opinion that's a small mentality, and they won't achieve anything in this competition.", author:"C罗，2016年6月14日战平冰岛赛后", authorEn:"Cristiano Ronaldo, after the 1-1 draw with Iceland, 14 June 2016", textEs:"Celebraron como si hubieran ganado la Eurocopa — en mi opinión, eso denota una mentalidad pequeña, y no van a lograr nada en este torneo.", authorEs:"Cristiano Ronaldo, tras el 1-1 ante Islandia, 14 de junio de 2016"},
    tags:["冰岛","小国心态","欧洲杯2016","赛后失言","贬低对手","维京战吼"],
    tagsEn:["Iceland","small mentality","Euro 2016","post-match rant","belittling opponents","Viking clap"],
    tagsEs:["Islandia","mentalidad pequeña","Euro 2016","bronca post-partido","minusvalorar rivales","aplauso vikingo"]
  },
  {
    id:69, cat:"persona", catLabel:"人设争议", severity:2,
    dateIso:"2011-09-14",
    title:"“年轻·英俊·富有”妒忌论",
    titleEn:"'Rich, Handsome and a Great Player' — The Jealousy Defence",
    titleEs:"«Rico, guapo y gran jugador»: la defensa de los celos",
    summaryEs:"Pitado y insultado en Zagreb, Cristiano explicó los abucheos así: «Creo que la gente me tiene envidia porque soy rico, guapo y un gran jugador. No tengo otra explicación». En 2014 lo llamó «un error» — tras repetir la fórmula varias veces.",
    dateEs: "14 sep 2011",
    locationEs: "Zagreb, Croacia",
    detailEs: [
      "<strong>El contexto:</strong> Real Madrid–Dinamo de Zagreb, fase de grupos de la Champions, septiembre de 2011. Cristiano se pasó aquella noche oyendo pitos e insultos desde la grada del Maksimir. El Madrid ganó 0-1, pero lo que marcó la conversación posterior fue su respuesta a los abusos.",
      "<strong>La frase:</strong> preguntado por qué cree que lo abuchean, Cristiano soltó: «<em>Creo que es porque soy rico, guapo y un gran jugador. La gente me tiene envidia. No tengo otra explicación.</em>» — pasando de largo por cualquier reflexión sobre por qué genera rechazo.",
      "<strong>Reacción:</strong> la frase dio la vuelta al mundo en horas y se convirtió en el summum del ego futbolístico. Bautizada por la prensa inglesa como «the jealousy defence» (la defensa de los celos), se cita hasta hoy como exhibit A del narcisismo Cristiano.",
      "<strong>El «arrepentimiento» de 2014:</strong> años más tarde, en una entrevista con <em>France Football</em>, reconoció que aquel mensaje fue «un error» y que había madurado. El problema: para entonces la cita ya formaba parte del imaginario del fútbol, y sus repetidas autoproclamaciones («primero, segundo y tercero de la historia») apenas dejaban ver la madurez prometida.",
      "<strong>Por qué persiste:</strong> la defensa de los celos reduce toda crítica a envidia — si me critican es porque quieren ser yo, no porque yo haya hecho nada. Esa lógica reaparece en sus respuestas al «Factos», a los abucheos del Bernabéu o al caso fiscal («me investigáis porque soy CR7»): el ego como escudo universal.",
      "<strong>El espejo:</strong> el contraste con Messi es inevitable. Ante los mismos abucheos, el argentino tendía a responder en el campo y callar fuera. Uno convirtió la envidia en teoría unificada; el otro ni siquiera la mencionó. La «defensa de los celos» quedó así como una marca registrada intransferible de CA7.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> La cita original fue recogida por numerosos medios tras el Dinamo–Madrid de la Champions 2011/12; el «error» reconocido procede de una entrevista posterior en France Football. Este archivo recoge la cobertura pública.</div>"
    ],
    date:"2011年9月14日",
    dateEn:"Sep 14, 2011",
    location:"克罗地亚萨格勒布",
    locationEn:"Zagreb, Croatia",
    img:"assets/images/report/r-34.jpg",
    summary:"2011年欧冠客战萨格勒布迪纳摩，C罗整场被嘘、被辱骂，赛后他给出的解释是：「我想那是因为我富有、英俊、还是个伟大的球员，人们嫉妒我——我找不到别的解释。」2014年他承认这话是个「错误」。",
    summaryEn:"Playing away at Dinamo Zagreb in the 2011 Champions League, Ronaldo was jeered and abused all night. His explanation afterwards: 'I think it's because I'm rich, handsome and a great player — people are envious of me. I don't have any other explanation.' In 2014 he called the remark a 'mistake'.",
    detail:[
      "<strong>事件背景：</strong>2011年9月14日，欧冠小组赛，皇家马德里客场挑战萨格勒布迪纳摩。马克西米尔球场的主队球迷整场对C罗报以嘘声和辱骂标语，他在漫天倒彩里踢满全场。皇马最终0-1带走三分，但赛后真正的头条不是比分，而是他对「为什么全世界都嘘你」这个问题给出的答案。",
      "<strong>妒忌论诞生：</strong>面对记者提问，C罗淡定回应：「<em>我想那是因为我富有、英俊、还是一个伟大的球员，人们嫉妒我。除此之外，我找不到别的解释。</em>」一句话，把「富有、英俊、伟大」三项全占，顺手把所有批评者的动机统一归档为「羡慕」。",
      "<strong>舆论炸锅：</strong>这番「妒忌论」数小时内传遍全球，《Bleacher Report》将其列入年度金句，英国媒体把它命名为「the jealousy defence（妒忌防御）」。它成了足球自恋史的展品A——此后每当C罗再语出惊人，这段采访就会被重新挖出来考古。",
      "<strong>2014年的「反思」：</strong>几年后，C罗接受《法国足球》（France Football）专访时松口，承认当年那句话是个「<em>错误</em>」，表示自己已经成熟。问题是，此时「妒忌论」早已成为他的标签，而后续的「历史第一第二第三」「你们查我因为我是C罗」等语录，让这次「成熟宣言」的含金量存疑。",
      "<strong>话术的内核：</strong>「妒忌防御」的精髓在于<em>取消批评的合法性</em>：凡批评我，皆因想成为我；凡质疑我，皆因得不到我所拥有的。这套逻辑在C罗身上反复出现——Factos事件、被伯纳乌嘘、逃税案庭审，他永远是被嫉妒的那一个，而不是需要自省的那一个。",
      "<strong>对照组：</strong>同样面对嘘声与比较，梅西的选择通常是在场上回应、场下闭嘴。「妒忌」从未成为梅西解释世界的框架，却成了C罗的世界观底座——一个把「被嫉妒」当勋章的人，最终活成了自己话术的囚徒。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>原始引语来自2011/12欧冠迪纳摩vs皇马赛后采访的公开报道（Bleacher Report、IBTimes等）；「承认错误」出自其后《法国足球》专访的公开转述。本档案仅记录公开媒体报道。</div>"
    ],
    detailEn:[
      "<strong>Background:</strong> On 14 September 2011, Real Madrid travelled to Dinamo Zagreb in the Champions League group stage. The Maksimir crowd jeered Ronaldo and waved insulting banners all night; Madrid left with a 0-1 win, but the real headline was his answer to 'why does the whole world boo you?'",
      "<strong>The jealousy defence is born:</strong> 'I think it's because <em>I'm rich, handsome and a great player</em> — people are envious of me. I don't have any other explanation.' One sentence, all three boxes ticked — wealth, looks, greatness — and every critic's motive filed neatly under 'envy'.",
      "<strong>The world reacts:</strong> The quote circled the globe within hours. Bleacher Report placed it among the quotes of the year; the English press christened it 'the jealousy defence'. It became Exhibit A of football narcissism, dusted off every time Ronaldo produced a new headline-grabbing line.",
      "<strong>The 2014 'reflection':</strong> Years later, in an interview with <em>France Football</em>, Ronaldo conceded the remark had been a '<em>mistake</em>' and that he had matured. The trouble: by then the defence was already his signature, and subsequent specials — 'first, second and third in history', 'you investigate me because I'm CR7' — kept the promised maturity under audit.",
      "<strong>The core of the script:</strong> The genius of the jealousy defence is that it <em>cancels the legitimacy of all criticism</em>: whoever criticises me wishes to be me; whoever questions me covets what I have. The loop recurs throughout his career — Factos, Bernabéu whistles, the tax trial — he is always the envied one, never the one who might reflect.",
      "<strong>The control group:</strong> Faced with the same whistles and comparisons, Messi's usual route was answering on the pitch and silence off it. 'Jealousy' never became Messi's framework for explaining the world; it became Ronaldo's foundation — a man who wears 'being envied' as a medal ends up a prisoner of his own vocabulary.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong>The original quote comes from public reporting of the post-match interviews after Dinamo Zagreb vs Real Madrid, Champions League 2011/12 (Bleacher Report, IBTimes, etc.); the 'mistake' admission derives from public accounts of his later France Football interview. This file records public media coverage only.</div>"
    ],
    quote:{text:"我想他们嘘我，是因为我富有、英俊、还是个伟大的球员——人们嫉妒我，我找不到别的解释。", textEn:"I think they boo me because I'm rich, handsome and a great player — people are envious of me. I don't have any other explanation.", author:"C罗，2011年欧冠客战萨格勒布迪纳摩赛后", authorEn:"Cristiano Ronaldo, after the 2011 Champions League trip to Dinamo Zagreb", textEs:"Creo que me pitan porque soy rico, guapo y un gran jugador — la gente me tiene envidia. No tengo otra explicación.", authorEs:"Cristiano Ronaldo, tras el partido de Champions ante el Dinamo de Zagreb en 2011"},
    tags:["妒忌论","金句","自恋","萨格勒布","欧冠2011","France Football"],
    tagsEn:["jealousy defence","famous quote","narcissism","Zagreb","2011 UCL","France Football"],
    tagsEs:["defensa de los celos","frase célebre","narcisismo","Zagreb","Champions 2011","France Football"]
  },
  {
    id:70, cat:"club", catLabel:"俱乐部与法律", severity:5,
    dateIso:"2022-10-19",
    title:"拒绝替补登场 · 提前离场 — 遭曼联停赛罚款",
    titleEn:"Refused to Come On, Walked Out — Suspended & Fined by United",
    titleEs:"Se negó a salir y se marchó — sancionado por el United",
    summaryEs:"Con el United ganando 2-0 al Tottenham, Cristiano se negó a entrar en el 87' y bajó al túnel antes del final. Castigo: fuera de la convocatoria ante el Chelsea, entrenando solo y multa de dos semanas de salario (~£720.000). Dos meses después, despido.",
    dateEs: "19 oct 2022",
    locationEs: "Old Trafford, Mánchester",
    detailEs: [
      "<strong>La noche:</strong> 19 de octubre de 2022, United–Tottenham (2-0), una de las mejores actuaciones de la era Ten Hag. Cristiano, suplente, no movió un músculo para calentar. En el minuto 87 el técnico le pidió que entrara; <strong>se negó</strong>. Minutos después bajó por el túnel y abandonó el estadio antes del pitido final.",
      "<strong>La confirmación del club:</strong> Ten Hag lo confirmó al día siguiente: «Le pedí que entrara y se negó». El United lo dejó <strong>fuera de la convocatoria ante el Chelsea</strong>, apartado del grupo en los entrenamientos, y le impuso la sanción estándar: multa de dos semanas de salario — entre <strong>720.000 y 1.000.000 de libras</strong>.",
      "<strong>El «descargo»:</strong> al día siguiente publicó en Instagram que «a veces el calor del momento nos gana» y que siempre había actuado «con respeto». La palabra «perdón» no aparece por ningún lado: ni disculpa al técnico, ni al club, ni a los aficionados que le vitoreaban.",
      "<strong>No fue un caso aislado:</strong> en julio, en su primer amistoso de vuelta (Rayo Vallecano), ya se había ido del estadio antes del final y sin permiso alguno; Ten Hag lo calificó de «inaceptable» entonces. Octubre fue la reincidencia en plena competición oficial.",
      "<strong>El contexto:</strong> Cristiano quería marcharse desde el verano — su agente había ofrecido el fichaje a medio Europa y todos habían dicho no. Ser suplente en el United lo vivió como humillación máxima; su respuesta no fue pelear el puesto en el campo, sino boicotear el banquillo.",
      "<strong>Principio del fin:</strong> cinco semanas después llegó la entrevista-bomba con Piers Morgan y, días más tarde, la <strong>rescisión de contrato de mutuo acuerdo</strong> antes del Mundial. La noche del Tottenham quedó como el punto de no retorno de su segunda etapa en Old Trafford.",
      "<strong>El balance:</strong> un jugador de 37 años, legendario para la afición, negándose a entrar para ayudar a sus compañeros y marchándose de su propio estadio mientras estos celebraban. No hay narrativa de «pasión ganadora» que tape eso: es el ego desnudo en directo.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> Los hechos (negativa a entrar, salida anticipada, exclusión de la convocatoria y multa de dos semanas de salario) están confirmados por declaraciones del club y del propio entrenador, así como por Reuters, Sky y The Athletic. El texto del post de Instagram es el difundido públicamente.</div>"
    ],
    date:"2022年10月19日",
    dateEn:"Oct 19, 2022",
    location:"英国曼彻斯特老特拉福德",
    locationEn:"Old Trafford, Manchester, UK",
    img:"assets/images/report/r-19.jpg",
    summary:"曼联2-0击败热刺的第87分钟，C罗拒绝替补登场，随后提前走进通道离场。曼联官方宣布将其排除出对阵切尔西的大名单、单独训练，并处以约72万-100万英镑（两周周薪）罚款。两个月后，双方解约。",
    summaryEn:"With United beating Tottenham 2-0, Ronaldo refused to come on in the 87th minute and marched down the tunnel before full-time. United dropped him from the squad to face Chelsea, made him train alone and fined him two weeks' wages (~£720K–1M). Two months later, his contract was terminated.",
    detail:[
      "<strong>事件经过：</strong>2022年10月19日，英超第12轮，曼联主场2-0击败热刺，打出滕哈赫时代最具统治力的比赛之一。而替补席上的C罗整场热身懒散，第87分钟滕哈赫示意他登场时，<strong>C罗明确拒绝</strong>；补时阶段他起身独自走进球员通道，<em>在终场哨响之前离开了老特拉福德</em>。",
      "<strong>俱乐部重拳：</strong>次日滕哈赫公开确认「我要求他登场，他拒绝了」。曼联随即宣布：C罗<strong>落选客战切尔西的大名单</strong>、离开一线队单独训练，并按队规处以<strong>两周周薪罚款</strong>——按其约50万英镑周薪计算，罚金约72万至100万英镑，达到英超纪律罚单的纪录级别。",
      "<strong>「热搜式」回应：</strong>10月20日C罗在Instagram发声，称「<em>有时情绪上头会占上风</em>」「我始终以尊重为先」，全文没有出现「道歉」二字——对主帅、对俱乐部、对全场为他歌唱的球迷，谁也没等到那两个字。所谓回应更像一次公关降温，而非认错。",
      "<strong>并非初犯：</strong>早在2022年7月31日回归首战（对巴列卡诺的友谊赛），C罗就在中场休息后提前离场，滕哈赫当时已定性「不可接受」。10月的这次拒绝登场+提前退场，是同样剧本在正式比赛里的重演——惯犯，且升级。",
      "<strong>背景动因：</strong>整个夏窗C罗一门心思离队，经纪人门德斯向全欧豪门兜售均遭拒（详见「2022夏窗转会闹剧」卷宗）。留队后沦为替补被视为奇耻大辱，但他选择的回应不是在场上抢回主力，而是<em>用罢赛式行为向全世界施压</em>——37岁的传奇，把替补席变成了自己的战场。",
      "<strong>压垮骆驼的倒数第二根稻草：</strong>此事五周后，C罗接受皮尔斯·摩根专访炮轰曼联（详见对应卷宗），数天后双方「协商一致」解约——世界杯开赛前，C罗以自由身前往卡塔尔。老特拉福德的这场童话二次婚姻，早在球员通道那扇门关上时就已注定离婚。",
      "<strong>历史定位：</strong>曼联球迷永远不会忘记这幅画面：球队久违地踢出漂亮足球、全场高歌庆祝之时，队史最伟大的7号选择转身走进黑暗的通道。自诩「赢家心态」的巨星，用输家的方式退场——这一夜成为C罗职业生涯人设崩塌的分水岭之一。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>本档案依据曼联官方声明、滕哈赫赛前发布会及Reuters、Sky Sports、The Athletic等公开报道整理；Instagram声明原文为公开贴文之译文。罚款金额为媒体按周薪推算之报道数（约72万-100万英镑）。</div>"
    ],
    detailEn:[
      "<strong>What happened:</strong> On 19 October 2022, United beat Tottenham 2-0 in one of the most dominant displays of the Ten Hag era. Ronaldo, on the bench, barely warmed up; when Ten Hag called for him in the 87th minute, he <strong>point-blank refused</strong>; in stoppage time he rose, walked down the tunnel and <em>left Old Trafford before the final whistle</em>.",
      "<strong>The club's hammer:</strong> The next day Ten Hag confirmed publicly: 'I asked him to come on and he refused.' United promptly dropped Ronaldo <strong>from the squad for the trip to Chelsea</strong>, made him train away from the first team, and imposed the standard <strong>fine of two weeks' wages</strong> — on his ~£500K weekly salary, roughly £720K to £1 million, Premier League record territory for a disciplinary fine.",
      "<strong>The 'statement':</strong> On 20 October Ronaldo posted on Instagram that '<em>sometimes the heat of the moment gets the best of us</em>' and that he had always acted with respect. Conspicuously absent: the word 'sorry' — no apology to the manager, the club, or the fans who had sung his name all night. It read as damage control, not contrition.",
      "<strong>Not a first offence:</strong> On 31 July 2022, in his first game back (a friendly vs Rayo Vallecano), Ronaldo had already left the stadium early without permission; Ten Hag branded it 'unacceptable' at the time. October was the same script re-staged on league business — a repeat, and an escalation.",
      "<strong>The backdrop:</strong> Ronaldo had spent the whole summer angling for the exit as Mendes hawked him around Europe's elite, and everyone said no (see the '2022 Transfer Farce' file). Being benched on his return was, to him, intolerable humiliation; his answer was not to win the place back on the pitch but to <em>stage a bench-side protest for the world to see</em> — a 37-year-old legend turning the substitutes' bench into his personal battlefield.",
      "<strong>The second-to-last straw:</strong> Five weeks later came the Piers Morgan interview blasting United (see that file); days later the contract was terminated 'by mutual agreement' — Ronaldo arrived at the World Cup a free agent. The second marriage with Old Trafford was doomed from the moment that tunnel door swung shut.",
      "<strong>Historic footnote:</strong> United fans will never forget the picture: the team playing its best football in years, the crowd in full voice — and the club's greatest-ever No.7 choosing to turn and walk into the dark tunnel. The self-styled 'winner's mentality' exiting like a loser: a watershed night in the collapse of the Ronaldo persona.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong>This file is compiled from Manchester United's official statements, Ten Hag's press conferences, and public reporting by Reuters, Sky Sports and The Athletic; the Instagram text is a translation of the public post. Fine figures are as reported in the media based on his wages (£720K–£1M).</div>"
    ],
    quote:{text:"有时情绪上头会占上风。我一直努力以身作则，尊重我的队友、对手和教练。", textEn:"Sometimes the heat of the moment gets the best of us. I've always tried to set an example, respecting my team-mates, my opponents and my coaches.", author:"C罗，2022年10月20日Instagram声明（全文无一字道歉）", authorEn:"Cristiano Ronaldo, Instagram statement, 20 Oct 2022 (containing no apology)", textEs:"A veces el calor del momento nos gana. Siempre he intentado dar ejemplo y respetar a compañeros, rivales y entrenadores.", authorEs:"Cristiano Ronaldo, comunicado en Instagram, 20/10/2022 (sin una sola disculpa)"},
    tags:["拒绝登场","提前离场","热刺","滕哈赫","停赛罚款","解约前奏"],
    tagsEn:["refused to come on","early walkout","Tottenham","Ten Hag","suspension & fine","prelude to exit"],
    tagsEs:["se negó a salir","marcha anticipada","Tottenham","Ten Hag","sanción y multa","preludio de salida"]
  },
  {
    id:71, cat:"persona", catLabel:"人设争议", severity:2,
    dateIso:"2013-12-15",
    title:"自建CR7博物馆 — 没退役先立庙 + 机场丑雕像",
    titleEn:"The CR7 Museum — A Shrine to Himself Before Retiring (+ the Infamous Airport Bust)",
    titleEs:"El museo CR7 — un templo a sí mismo antes de retirarse (+ el busto del aeropuerto)",
    summaryEs:"En diciembre de 2013 Cristiano inauguró en Funchal su propio museo, dedicado a… sí mismo, con sus ~150 trofeos a la vista mientras seguía en activo. En 2017 Madeira rebautizó su aeropuerto con su nombre y destapó un busto tan espantoso que se volvió meme global; fue sustituido a escondidas en 2018.",
    dateEs: "15 dic 2013",
    locationEs: "Funchal, Madeira, Portugal",
    detailEs: [
      "<strong>El museo:</strong> el 15 de diciembre de 2013 Cristiano inauguró el Museu CR7 en su Funchal natal, un espacio de 400 m² dedicado íntegramente a su propia carrera. Su hermano Hugo lo gestiona. Empezó con una cincuentena de piezas; hoy exhibe en torno a <strong>150 trofeos</strong> — de un jugador <em>que aún no se había retirado</em>.",
      "<strong>El precedente:</strong> los museos deportivos suelen abrirse tras la retirada, para legado cerrado. Cristiano no esperó: se montó su propio panteón en vida, con las vitrinas listas para ir ampliando — la vanidad como obra en construcción permanente.",
      "<strong>El aeropuerto:</strong> en marzo de 2017 Madeira rebautizó su aeropuerto internacional como <strong>Aeroporto Cristiano Ronaldo</strong>. En la ceremonia se destapó un busto —encargado al escultor local Emanuel Santos— que no se parecía en nada al homenajeado: sonrisa extraña, ojos desorbitados…",
      "<strong>El busto mundial:</strong> las fotos del busto dieron la vuelta al planeta en horas y generaron ríos de memes — «el único rival capaz de asustar a Cristiano». BBC, CNN y The Guardian se hicieron eco; incluso el propio Santos defendió su obra: «ni Einstein lo entendían».",
      "<strong>El cambio a escondidas:</strong> en 2018, unos 16 meses después, el aeropuerto sustituyó el busto por una versión más fiel <em>sin avisar al escultor</em>; Santos declaró quedar «devastado». El busto original acabó recluido en un almacén — destino más cruel que cualquier meme.",
      "<strong>El patrón:</strong> autopremios (Globe Soccer), autopromoción (CR7™ en todo), automuseo. Cuando la carrera se gestiona como marca personal, hasta los honores públicos se leen como marketing: que una región entera ponga su aeropuerto a nombre de un deportista en activo era, para los críticos, la estatua final del culto al ego.",
      "<strong>Ironía:</strong> el único monumento que la fama le levantó en vida… salió con cara de otro. Internet hizo el resto: el busto terminó siendo más célebre que el homenaje, y «tener la cara del busto de Madeira» quedó como el insulto definitivo del fútbol.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> La apertura del museo (15/12/2013), su gestión por Hugo Aveiro y el cambio del busto en 2018 están documentados por The Guardian, BBC, UPI y otros medios. Este archivo recoge la cobertura pública; las valoraciones sobre el busto corresponden a la reacción mediática.</div>"
    ],
    date:"2013年12月15日（博物馆）/ 2017年3月（机场）",
    dateEn:"Dec 15, 2013 (museum) / Mar 2017 (airport)",
    location:"葡萄牙马德拉丰沙尔",
    locationEn:"Funchal, Madeira, Portugal",
    img:"assets/images/report/r-35.jpg",
    summary:"2013年12月，C罗在老家丰沙尔开设Museu CR7个人博物馆，陈列自己的约150座奖杯——此时他还没退役。2017年马德拉机场更名「C罗机场」，揭幕的雕像丑到全球爆梗，2018年被悄悄换掉，原作者毫不知情。",
    summaryEn:"In December 2013 Ronaldo opened the Museu CR7 in his native Funchal — a museum of himself, displaying ~150 of his own trophies while still an active player. In 2017 Madeira renamed its airport after him and unveiled a bust so off-likeness it became a global meme; it was quietly replaced in 2018.",
    detail:[
      "<strong>给自己立庙：</strong>2013年12月15日，C罗在出生地丰沙尔为「Museu CR7」剪彩——一座400平方米、完全陈列<em>他自己职业生涯</em>的博物馆，由哥哥乌戈·阿韦罗（Hugo Aveiro）打理。开馆时展品50余件，如今已扩容至<strong>约150座奖杯</strong>。此时C罗28岁，正值当打之年——<em>别人退役后才建纪念馆，他现役就给自己立了庙</em>。",
      "<strong>打破惯例的「活人纪念馆」：</strong>体育博物馆的传统逻辑是「生涯盖棺定论、荣誉完整呈现」。C罗等不及：展柜预留空位、随时扩容，等于把个人崇拜做成了一个<em>持续施工的活人祠堂</em>。把自恋做成了项目管理，莫过于此。",
      "<strong>机场冠名：</strong>2017年3月29日，马德拉国际机场正式更名「克里斯蒂亚诺·罗纳尔多机场」，总统与总理亲自出席。以一位活着的、还在踢球的运动员为机场命名，全球罕有——C罗个人品牌对家乡的捆绑至此完成闭环：博物馆、酒店（Pestana CR7）、机场，一条龙朝圣动线。",
      "<strong>雕像惨案：</strong>更名仪式上揭幕的C罗青铜半身像（本地雕塑家Emanuel Santos作品）因<strong>完全不像本人</strong>而瞬间引爆全球互联网：诡异的笑容、走形的眉眼，被网友封为「唯一能吓退C罗的防守者」。BBC、CNN、卫报集体围观，表情包产能直接拉满。",
      "<strong>雕塑家的悲喜：</strong>Santos起初很硬气：「爱因斯坦生前也没人懂他」。但2018年——揭幕约16个月后——机场方面<em>未通知他本人</em>就把丑雕像换成了一尊更写实的新版，Santos自述「心碎」。原雕像被打入仓库冷宫——这个结局，比任何群嘲都残忍。",
      "<strong>自恋产业链的一环：</strong>自设奖项颁给自己（环球足球奖）、自建博物馆陈列自己、机场以自己冠名——三者连成「自我加冕」三部曲。批评者指出，这是把职业生涯彻底<em>品牌化运营</em>的必然产物：连公共荣誉都要纳入CR7的营销漏斗。",
      "<strong>终极讽刺：</strong>互联网对这场造神运动的官方回应，是那尊连脸都是歪的雕像——搜索「Cristiano Ronaldo bust」，第一屏全是表情包。「活人立庙」立到最后，全球记住的名场面不是150座奖杯，而是一张<strong>不像他的脸</strong>。历史由胜利者书写，梗图由失败者承包。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>博物馆开馆（2013-12-15）与运营、机场更名（2017-03）及雕像更换（2018）均见载于卫报、BBC、UPI等公开报道。对雕像的负面评价引用自全球媒体与网民公开反应，本站不评价雕塑艺术本身。</div>"
    ],
    detailEn:[
      "<strong>A shrine to himself:</strong> On 15 December 2013 Ronaldo cut the ribbon on the Museu CR7 in his native Funchal — 400 square metres dedicated entirely to <em>his own career</em>, run by his elder brother Hugo Aveiro. It opened with 50-odd exhibits and has since grown to around <strong>150 trophies</strong>. Note the timing: Ronaldo was 28, at his peak — <em>other players get museums after retiring; he built one for himself while still playing</em>.",
      "<strong>The living memorial:</strong> The traditional logic of a sports museum is a career closed and a legacy complete. Ronaldo couldn't wait: display cases stood ready with space to grow, turning self-worship into a <em>shrine under permanent construction</em>. Vanity, professionally managed as a project.",
      "<strong>The airport:</strong> On 29 March 2017 Madeira's international airport was formally renamed <strong>Cristiano Ronaldo Airport</strong>, with the country's president and prime minister in attendance. Naming an airport after a living, still-active athlete is virtually unheard of — and it completed the CR7 pilgrimage circuit of the homeland: museum, Pestana CR7 hotel, airport, the full route.",
      "<strong>The bust disaster:</strong> The bronze bust unveiled at the ceremony (by local sculptor Emanuel Santos), bearing <strong>essentially no resemblance</strong> to Ronaldo, detonated across the global internet within hours: the eerie grin, the off-model eyes — netizens crowned it 'the only defender capable of scaring Cristiano'. BBC, CNN and The Guardian all joined the spectator sport; meme production went industrial.",
      "<strong>The sculptor's tragedy:</strong> Santos was defiant at first: 'Not even Einstein was understood in his day.' But in 2018 — some 16 months on — the airport <em>without informing him</em> swapped the bust for a more realistic version; Santos said he was 'devastated'. The original was consigned to a storeroom, a crueler ending than any mockery.",
      "<strong>One node in the narcissism supply chain:</strong> A self-founded award handed to himself (Globe Soccer), a self-founded museum of himself, an airport named after himself — a triptych of self-coronation. Critics argue this is the inevitable end-state of running a career <em>as a brand</em>: even public honours get funnelled into the CR7 marketing machine.",
      "<strong>The final irony:</strong> The internet's official reply to the canonisation effort was a bust whose face was famously wrong — search 'Cristiano Ronaldo bust' and the first screen is all memes. The living shrine's most-viewed exhibit turned out to be not the 150 trophies but <strong>a face that isn't his</strong>. History is written by winners; meme duty is subcontracted to the rest.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong>The museum opening (15 Dec 2013) and management, the airport renaming (Mar 2017) and the bust replacement (2018) are documented by The Guardian, BBC, UPI and other outlets. Negative judgements of the bust quote global media and public internet reaction; this site takes no position on the sculpture's artistic merit.</div>"
    ],
    quote:{text:"爱因斯坦在世时，也没有人理解他。", textEn:"Not even Einstein was understood in his day.", author:"伊曼纽尔·桑托斯，丑雕像作者，为作品辩护", authorEn:"Emanuel Santos, sculptor of the infamous bust, defending his work", textEs:"Ni a Einstein lo entendieron en su época.", authorEs:"Emanuel Santos, escultor del busto infame, defendiendo su obra"},
    tags:["CR7博物馆","丰沙尔","活人立庙","机场冠名","丑雕像","个人崇拜"],
    tagsEn:["CR7 museum","Funchal","living shrine","airport naming","infamous bust","cult of personality"],
    tagsEs:["museo CR7","Funchal","templo en vida","aeropuerto con su nombre","busto infame","culto a la personalidad"]
  },
  // ========== 🚨 BREAKING 2026-10-08：与主帅热苏斯闹崩 擅自退出国家队（头条深度）==========
  {
    id:72, slug:"ronaldo-jesus-fallout-quits-national-team", cat:"national", catLabel:"国家队争议", severity:5,
    dateIso:"2026-09-30",
    title:"【头条】答应的30分钟没给 — 阿伟罗与主帅热苏斯闹崩连夜退群，41岁总裁国家队生涯进入倒计时",
    titleEn:"[HEADLINE] Promised 30 Minutes, Benched Instead — CR7 Falls Out with Jorge Jesus and Walks Out on Portugal",
    titleEs:"[TITULAR] Le prometieron 30 minutos y acabó en el banquillo — CR7 rompe con Jorge Jesus y abandona Portugal",
    summaryEs:"Noventa días después de despedirse del Mundial entre lágrimas y «conciencia tranquila», Cristiano, de 41 años, abandonó la concentración en vísperas del partido con Dinamarca (30 sep): Jorge Jesus acababa de anunciar que no sería titular. Llegó el comunicado de 1.700 palabras (6 oct): «rompió su palabra dos veces», disculpa, castigo autoimpuesto — mientras la Portugal sin Cristiano goleaba 4-2 a Dinamarca por cuarta victoria seguida. Cuenta de la prensa lusa: sanción de 1 a 6 meses, que caduca con 42 años. La puerta de la selección no se cierra: se suelda.",
    dateEs:"30 sep 2026 (marcha) — 6 oct 2026 (comunicado)",
    locationEs:"Campamento de Portugal, Copenhague, Dinamarca",
    detailEs:[
      "<p class='modal-lead'>La noche del 30 de septiembre de 2026, víspera del viaje a Copenhague por la Nations League, Cristiano Ronaldo, de 41 años, abandonó por su cuenta la concentración de Portugal tras rupturar públicamente con el seleccionador Jorge Jesus — ojo: no lo expulsaron ni lo excusaron; <em>hizo las maletas y se fue solo, de noche</em>. El 6 de octubre llegó el comunicado de 1.700 palabras acusando al técnico de «romper su palabra dos veces», seguido de disculpas y castigo autoimpuesto, todo en la misma sentada. Este archivo recoge, como TITULAR, la implosión entre el máximo goleador histórico de Portugal y su selección — o dicho con más precisión, <strong>una carta de renuncia escrita en 1.700 palabras</strong>.</p>",
      "<strong>El contexto: la era Jesús:</strong> Noventa días después del adiós mundialista, Portugal estrenó seleccionador: Jorge Jesus, nada menos que su exentrenador en Al Nassr. La prensa lo vendió como «continuidad perfecta»; la luna de miel duró menos de tres meses — que, en el currículum de este señor, ya cuenta como un matrimonio largo: United, Juve, Madrid… que cite una que no acabara en divorcio.",
      "<strong>El pacto:</strong> Cuatro partidos en la ventana de septiembre (Gales, Noruega, Dinamarca y la revancha con Noruega). Según el comunicado de Cristiano y los documentos filtrados por la prensa lusa, el plan pactado era claro: el veterano de 41 años descansaría los dos partidos intermedios y jugaría 30 minutos en la segunda cita con Noruega.",
      "<figure class='modal-figure'><picture><source type='image/webp' srcset='assets/images/report/r-72-2.webp'><img src='assets/images/report/r-72-2.jpg' alt='Jorge Jesus conversa con Cristiano en un entrenamiento' loading='lazy' decoding='async'></picture><figcaption><b>Figura 2</b> · Técnico y capitán en tiempos mejores: Jesus conversa con Cristiano en un entrenamiento de Portugal. <i>Fuente: foto de agencia</i></figcaption></figure>",
      "<strong>Primera palabra rota (Noruega, 27 sep):</strong> Portugal ganó 2-1, pero la promesa de media hora se evaporó: compromiso sellado al mediodía, calentamiento cumplido y ni un minuto en el campo. Jesus lo despachó: «no era el momento adecuado para Cris». Y la imagen más amarga: mientras el equipo saludaba a la grada, el capitán se marchó directo al vestuario, <strong>sin saludo ni gesto</strong>. Ganó el equipo; perdió él — el protagonismo, se entiende.",
      "<strong>Segunda palabra rota y retirada (30 sep):</strong> En Copenhague, Jesus anunció en rueda de prensa que «no contaba con Cristiano» de titular ante Dinamarca. Horas después, el capitán hacía las maletas y abandonaba el campamento de noche, dejando a las cámaras una sola frase: «<strong>El seleccionador rompió su palabra</strong>». De «30 minutos según lo pactado» a «suplente oficial» a «fuera antes de cualquier explicación», todo el arco cabía en un solo día. Con Santos en Catar al menos lloró antes de irse; con Jesus se ahorró hasta las lágrimas.",
      "<strong>Portugal 4-2 Dinamarca sin Cristiano:</strong> El 1 de octubre, la Portugal «huérfana» goleó 4-2 a Dinamarca con goles y liderazgo de Gonçalo Ramos y Rafael Leão, y encadenó cuatro victorias seguidas en la Nations League. La pregunta se instaló en todas las portadas: «¿Por qué Portugal juega mejor sin Cristiano?» — y lo cruel es quién la hace: no los haters, los resultados. Cuatro triunfos seguidos lo dicen claro: a este equipo le sobra cualquiera, menos al único convencido de que sin él no funciona.",
      "<strong>El comunicado de las dos promesas rotas (6 oct):</strong> En más de 1.700 palabras, Cristiano denunció que Jesus rompió su palabra dos veces: la media hora prometida ante Noruega y un guion acordado para «cerrar el asunto con la verdad» en rueda de prensa, que incluía que el propio técnico reconociera: «me equivoqué al poner a calentar a alguien del nivel de Pelé o Maradona». En lugar de eso, según Cristiano, Jesus improvisó «con agresividad y altivez». Su conclusión: «<strong>Escuché una agresión que no merecía. Es la segunda vez que rompe su palabra</strong>». Y remató: «En casi 25 años jamás me he metido en las decisiones de un entrenador». Exacto: solo le pide al míster que recita las líneas que él ha aprobado. Eso no es meterse; <em>eso es un ensayo de guion</em>.",
      "<strong>Pedir perdón y pedir castigo: voltear la mesa y luego inclinarse:</strong> La segunda parte del comunicado cambió de tono: disculpa pública a compañeros y aficionados, reconocimiento de que abandonar el campamento «no debía ocurrir» y de que no saludar a la grada fue «responsabilidad únicamente mía», y disposición a aceptar cualquier sanción como capitán. Cumplida la sanción y con el cuerpo entero, «siempre listo para Portugal» — traducción: castíguenme cuanto quieran, pero la retirada no estaba en el guion; la fecha del partido de despedida, reservada. Coreografía de siempre: voltear la mesa, saludar a la sala y colgarse la medalla de «mirar por el conjunto».",
      "<strong>La respuesta helada de Jesus:</strong> Interceptado por la prensa, el seleccionador soltó una sola frase: «Estaba en Leiria viendo al juvenil. Ahora leeré el comunicado. No tengo nada que decir». Antes, sobre las explicaciones de Cristiano, había sido igual de breve: «No tuve tiempo para ello». Tú escribes 1.700 palabras, él contesta con ocho. Uno pide reparación; el otro no acepta la cita. El duelo se decidió por recuento de palabras.",
      "<figure class='modal-figure'><picture><source type='image/webp' srcset='assets/images/report/r-72-3.webp'><img src='assets/images/report/r-72-3.jpg' alt='Cristiano y Jorge Jesus, imagen partida' loading='lazy' decoding='async'></picture><figcaption><b>Figura 3</b> · Un fotograma, dos trincheras: el 7 con gesto tormentoso y Jesus gesticulando en la sala de prensa de Portugal. <i>Fuente: LatestLY</i></figcaption></figure>",
      "<figure class='modal-figure'><picture><source type='image/webp' srcset='assets/images/report/r-72-4.webp'><img src='assets/images/report/r-72-4.jpg' alt='Jesus con cara de piedra' loading='lazy' decoding='async'></picture><figcaption><b>Figura 4</b> · «No tengo nada que decir» — Jesus, interceptado por la prensa, con cara de piedra. <i>Fuente: Sports Illustrated</i></figcaption></figure>",
      "<strong>La cuerda floja de la federación:</strong> El presidente de la FPF, Pedro Proença, intentó apagar el fuego («es un malentendido», Cristiano sigue disponible), Jesus propuso una nueva reunión… y la federación ya trabaja en el partido de despedida de su máximo goleador histórico (146 goles en 234 partidos). Mediar por un lado, preparar el funeral por otro.",
      "<strong>La espada de Damocles disciplinaria:</strong> La prensa lusa rescató el código disciplinario de la FPF: abandonar la concentración sin permiso se castiga con <strong>de 1 a 6 meses de sanción</strong> y multa de hasta unos 1.020 euros. La multa, para un señor de 200 M€ al año, es un ticket de aparcamiento; la sanción es la condena de verdad — cumpla la máxima y volverá, si vuelve, con 42 años. «Disponible siempre» suena más a cortesía que a plan. Dicho sin rodeos: a la federación le hace falta un paso atrás y lo llama «castigo»; a él le hace falta una coartada y la llama «palabra rota». Cada cual consigue lo suyo; la verdad puede esperar fuera.",
      "<strong>El giro extra: ¿presión a través del director de su club?</strong> El periodista portugués Pereira añadió leña: al lado de la marcha y de la huelga, la versión de que Cristiano <em>recurrió al director de su club para presionar al seleccionador</em> sonó «aún más escandalosa — no le basta con que el técnico reconozca el error». Con los documentos del «pacto» filtrados, la contundencia del comunicado hizo girar parte de la opinión: los simpatizantes vieron a un veterano al que le fallaron; los críticos, la misma historia de siempre — <strong>en el campo los compañeros son compañeros; en el guion, atrezzo</strong>.",
      "<strong>El contraste con 2022:</strong> En Catar, relegado al banquillo por Fernando Santos, tragó, lloró y se fue por la puerta de atrás tras la eliminatoria. En 2026, con Jesus, ni esperó al partido: cogió la puerta y la cerró detrás de él. Cuatro años después, el único crecimiento medible es la eficiencia de salida: de «marcha entre lágrimas tras el partido» a «evacuación nocturna antes del partido». De «suplente doloroso» a «retirada unilateral», el astro de 41 años arrancó la última hoja de parra del «equipo por encima de todo».",
      "<strong>Veredicto del archivo:</strong> Las lágrimas del «conciencia tranquila» apenas tenían 90 días cuando estrenó el guion de «palabra rota» — su retórica de después del partido, como siempre, en mejor forma que sus piernas. En 25 años de carrera, el Cristiano que «jamás se metió con las decisiones de un entrenador» voló por los aires su etapa en Portugal por una promesa de titularidad — y tuvo que esperar a los 41 para dar con un míster que «rompió su palabra dos veces». El denominador común empieza a verse solo. Sea cual sea la verdad, el registro es demoledor: campamento abandonado, disculpa pública, sanción en el aire y despedida en marcha — <em>el cierre de su era con la selección se escribe con una sola palabra: yo; y la fecha de envío de esa carta de despedida, la firmó él mismo</em>.",
      "<div class='modal-disclaimer'><strong>⚠️ Aviso:</strong> Recopilado de cobertura pública de Reuters, ESPN, BBC, AP, A Bola, Record, Yahoo Sports y medios chinos (sept-oct 2026). Las imágenes son fotos de noticias públicas; los derechos pertenecen a las agencias y medios originales (incluidos LatestLY y Sports Illustrated); se usan aquí solo como referencia de cultura aficion. Cristiano se disculpó públicamente y aceptó la sanción que corresponda; el proceso disciplinario sigue su curso y la versión definitiva corresponderá a la FPF.</div>"
    ],
    date:"2026年9月30日（离营）— 10月6日（长文声明）",
    dateEn:"Sep 30, 2026 (walkout) — Oct 6, 2026 (statement)",
    location:"丹麦哥本哈根 葡萄牙队训练营",
    locationEn:"Portugal training camp, Copenhagen, Denmark",
    img:"assets/images/report/r-72.jpg",
    summary:"世界杯出局刚90天，41岁阿伟罗把国家队群退了：被热苏斯官宣轮换，当晚收拾行李离营，几天后甩出1700字小作文控诉「他两次食言」，转头又道歉、自请重罚。没有他的葡萄牙4-2丹麦、四连胜；葡媒：或禁赛至42岁——国家队的大门，基本焊死了。",
    summaryEn:"Ninety days after tearfully leaving the World Cup with a 'clear conscience', 41-year-old Ronaldo walked out of Portugal's camp on the eve of the Denmark game (Sep 30) — coach Jorge Jesus had just announced he would not start him. Then came the 1,700-word statement (Oct 6): 'he broke his word twice', an apology, a self-requested punishment — while Ronaldo-less Portugal thrashed Denmark 4-2 for a fourth straight win. Portuguese press math: a 1-6 month ban, expiring when he's 42. The national-team door isn't closing; it's being welded shut.",
    detail:[
      "<p class='modal-lead'>北京时间2026年9月30日晚，国家联赛客战丹麦的前夜，41岁的C罗在与主帅<strong>若热·热苏斯（Jorge Jesus）</strong>公开闹翻后，<strong>擅自离开葡萄牙国家队训练营</strong>。注意，不是被劝退，是他<em>自己连夜跑的</em>。10月6日，他发布1700余字小作文，指控热苏斯「<em>两次食言</em>」，随后向队友与球迷道歉、自请重罚。本馆以头条卷宗形式，记录这场葡萄牙队史最佳射手与国家队之间的「师徒反目」——严格来说，是一封1700字的退群声明。</p>",
      "<strong>一、背景：世界杯出局90天，葡萄牙进入「热苏斯时代」</strong><br>美加墨世界杯十六强出局的第90天，葡萄牙迎来新任主帅——若热·热苏斯。此人并非外人：他曾在利雅得胜利与C罗共事，标准的「旧部重逢」。葡媒把这场师徒重聚吹成「无缝衔接」，结果蜜月期撑了不到三个月。放在总裁的履历里，这居然已经算长情了：曼联、尤文、皇马，哪一站不是以闹掰收场？",
      "<strong>二、「约定」：轮休两场 + 挪威之战30分钟</strong><br>9月国际比赛日，葡萄牙四场比赛连轴转（威尔士、挪威、丹麦、再战挪威）。据C罗小作文自述与葡媒曝光的「约定」文件，师徒俩原本说好：41岁的老将<em>中间两场轮休，第二战挪威替补登场30分钟</em>——既保状态，也保体面。一个自称「25年从不干涉教练决定」的人，出场时间是提前写进协议里的。这很C罗。",
      "<figure class='modal-figure'><picture><source type='image/webp' srcset='assets/images/report/r-72-2.webp'><img src='assets/images/report/r-72-2.jpg' alt='热苏斯与C罗在训练课中交谈' loading='lazy' decoding='async'></picture><figcaption><b>图2</b> · 训练场上的师徒：热苏斯与C罗在葡萄牙队训练课中交谈——如今连「合适的时机」都成了空话。<i>图源：媒体通稿配图</i></figcaption></figure>",
      "<strong>三、第一次食言：挪威2-1，热身了却没上场</strong><br>9月27日对挪威，中午还被承诺「给你30分钟」的C罗热身完毕，却始终等不来登场指令，葡萄牙2-1险胜。热苏斯赛后轻描淡写：「<em>当时不是让Cris上场的合适时机</em>。」更刺眼的是终场哨响后，全队谢场，总裁径直走回更衣室，<strong>没有向球迷致意</strong>——球队赢了，他输了，输的是戏份。",
      "<strong>四、第二次食言与退营：官宣不首发，连夜跑路</strong><br>9月30日，哥本哈根。热苏斯在赛前发布会公开宣布：<em>对丹麦不打算让C罗首发</em>。几个小时后，他收拾行李，连夜离开训练营，面对镜头只留下一句：「<strong>教练食言了。</strong>」从「约定30分钟」到「官宣替补」再到「不等解释直接跑路」，剧情只用了一天。对比2022卡塔尔被桑托斯按在替补席，好歹哭完才走；这一次，连哭都省了。",
      "<strong>五、没有C罗的葡萄牙，4-2大胜丹麦</strong><br>10月1日，缺少C罗的葡萄牙4-2击溃丹麦，<strong>贡萨洛·拉莫斯与莱奥</strong>填满锋线火力，国家联赛豪取四连胜。赛后「<em>为什么没有C罗，葡萄牙反而踢得更好</em>」冲上各国热搜。残忍的地方在于提问的人：不是黑子，是比分。四连胜说明的事很简单——这支球队少了谁都照样转，只有一个人不这么认为。",
      "<strong>六、1700字小作文：「他两次食言」</strong><br>10月6日，沉默一周的C罗发布长文小作文，指控热苏斯两次食言：第一次是挪威之战的30分钟承诺；第二次更为戏剧——两人曾约定由热苏斯在发布会「关起门来说真话」了结风波，讲稿都过了目，原定台词包括「<em>把一个贝利、马拉多纳级别的球员放去热身，是我犯了错</em>」。结果热苏斯上台，「带着攻击性与高高在上的姿态」自由发挥，总裁当场破防：「<strong>我听到了一种我并未应得的攻击。这已经是他第二次食言。</strong>」并强调「近25年来，我从不干涉任何教练的决定」。他只是要求教练照他审过的稿子念——这不叫干涉，叫对台词。",
      "<strong>七、道歉与自请重罚：先掀桌，再鞠躬</strong><br>小作文后半段画风一转：C罗向队友和球迷公开道歉，承认擅离训练营「<em>本不该发生</em>」、未谢场「责任全在我」，并表示愿以队长身份<strong>接受足协的一切处罚</strong>；停赛期满、只要身体允许，「随时准备为国效力」。翻译一下：罚可以认，退役没提——告别赛的档期，先留着。先掀桌、再鞠躬，熟练得不像第一次。",
      "<strong>八、热苏斯的冷回应：「我没什么可说的」</strong><br>被葡萄牙记者拦车追问时，热苏斯只丢下一句：「<em>我当时在莱里亚看青年队比赛，现在我会去读那份声明。我没什么可说的。</em>」此前在发布会上，他对C罗的解释同样只有一句：「我没时间理会这个。」你写1700字，我回八个字——这场对峙，光看字数就知道谁先扛不住。",
      "<figure class='modal-figure'><picture><source type='image/webp' srcset='assets/images/report/r-72-3.webp'><img src='assets/images/report/r-72-3.jpg' alt='C罗与热苏斯同框拼图' loading='lazy' decoding='async'></picture><figcaption><b>图3</b> · 同框即决裂：一边是神色凝重的7号，一边是发布会指点江山的热苏斯。<i>图源：LatestLY</i></figcaption></figure>",
      "<figure class='modal-figure'><picture><source type='image/webp' srcset='assets/images/report/r-72-4.webp'><img src='assets/images/report/r-72-4.jpg' alt='热苏斯面色铁青' loading='lazy' decoding='async'></picture><figcaption><b>图4</b> · 「我没什么可说的」——被拦车追问时的热苏斯，脸色比里斯本的冬天还冷。<i>图源：Sports Illustrated</i></figcaption></figure>",
      "<strong>九、足协的算盘：一边劝和，一边筹备告别赛</strong><br>葡萄牙足协主席普罗恩卡（Pedro Proença）定调「这是一场误会」，坚称C罗仍是球队一员、随时可用；热苏斯也提出再约谈一次。但另一边，足协已被曝<strong>开始为国家队历史最佳射手（146球/234场）筹备告别赛</strong>。一边劝和、一边张罗告别。对41岁的巨星来说，告别赛都开始彩排了，正赛还抢什么戏？",
      "<strong>十、禁赛倒计时：顶格半年，解禁42岁</strong><br>葡媒《球报》翻出足协纪律条例：<strong>擅离国家队训练营，可禁赛1至6个月</strong>，外加最高约1020欧元罚款。若顶格半年，解禁时C罗已42岁。所谓「随时归队」，大概率只是留给彼此的体面。说难听点：足协要个台阶，叫处罚；他要个说法，叫食言。两边各取所需，真相反倒没人过问。",
      "<strong>十一、猛料追加：不止要主帅认错？</strong><br>葡萄牙记者佩雷拉再爆猛料：与罢赛、退队相比，<em>C罗请「自己人」（俱乐部总监）向国家队主帅施压</em>的操作更加离谱——「他要的可不止是主帅认错这么简单」。随着师徒「约定」文件遭曝光，这份强硬声明反而让部分舆论再度反转：同情者看到被辜负的老将，批评者看到的还是老问题——<strong>球场上的队友是队友，稿子里的队友是道具</strong>。",
      "<strong>十二、对比2022：从「哭完再走」到「掀桌就走」</strong><br>四年前卡塔尔，被桑托斯按在替补席上的C罗，选择哭完、隐忍、赛后悄悄离场；四年后面对热苏斯，他连比赛都没等——收拾行李、当场退群。四年过去，唯一肉眼可见的成长是退出效率：从「赛后含泪离场」升级为「赛前连夜跑路」。41岁的巨星，亲手扯下了「团队高于个人」的最后一块遮羞布。",
      "<strong>十三、本馆点评：终章写满「我」字</strong><br>世界杯「问心无愧」的泪水还没干，「食言」的新剧本又火速上线——总裁的赛后话术，向来比他的状态来得稳定。25年职业生涯里「从不干涉教练决定」的CR7，最终为一个「首发承诺」与国家队公开决裂；二十多年换了一圈名帅，到41岁才头一回碰上「食言」的——要么运气太差，要么有人对「承诺」的理解和别人不一样。无论真相偏向哪边，事实清单已经足够刺眼：擅自离营在先、道歉认罚在后、告别赛在筹备、纪律处罚在悬——<em>国家队生涯的终章，每一行都写着「我」；而这封告别信的寄出日期，是他自己亲手签的</em>。",
      "<div class='modal-disclaimer'><strong>⚠️ 免责声明：</strong>本条依据路透社、ESPN、BBC、美联社、葡萄牙《球报》、Record、Yahoo Sports及网易体育、直播吧等2026年9-10月公开报道整理。文中图片来自公开新闻配图，版权归原拍摄机构及 LatestLY、Sports Illustrated 等发布媒体所有，本站仅作球迷文化创作的图文引用。C罗已在声明中就擅离训练营公开道歉并自请处罚，事件仍在发展中，纪律处理以葡萄牙足协官方结论为准。本馆仅记录公开报道内容，不代表任何官方立场，内容仅供娱乐。</div>"
    ],
    detailEn:[
      "<p class='modal-lead'>On the night of 30 September 2026, on the eve of the Nations League trip to Denmark, the 41-year-old Ronaldo <strong>walked out of Portugal's training camp</strong> after an open rupture with head coach <strong>Jorge Jesus</strong>. He wasn't dismissed; he packed and left by himself, overnight. On 6 October came the 1,700-word statement accusing Jesus of '<em>breaking his word twice</em>', followed by the apology and the offer to accept any punishment, all in one sitting. This dossier, filed as the archive's HEADLINE, records the implosion between Portugal's all-time top scorer and his national team — or, more precisely, <strong>a resignation letter written in 1,700 words</strong>.</p>",
      "<strong>I. Background: 90 days after the World Cup, the 'Jesus era' begins</strong><br>Ninety days after the round-of-16 exit in North America, Portugal appointed Jorge Jesus — no stranger: he had already coached Ronaldo at Al Nassr. The Portuguese press sold it as 'perfect continuity'; the honeymoon lasted less than three months — which, on this man's CV, counts as a long marriage. United, Juventus, Real Madrid: name one that didn't end in divorce.",
      "<strong>II. The arrangement: two games off, 30 minutes vs Norway</strong><br>Portugal had four matches in the September window (Wales, Norway, Denmark, Norway again). Per Ronaldo's statement and the agreement documents leaked by the Portuguese press, the plan was simple: the 41-year-old would sit out the two middle games and come on for <em>30 minutes in the second Norway match</em> — preserving both fitness and face. For a player who 'never interfered with a coach's decisions in 25 years', the minutes were contractual. <em>Very Cristiano.</em>",
      "<figure class='modal-figure'><picture><source type='image/webp' srcset='assets/images/report/r-72-2.webp'><img src='assets/images/report/r-72-2.jpg' alt='Jorge Jesus talks with Ronaldo at a Portugal training session' loading='lazy' decoding='async'></picture><figcaption><b>Fig 2</b> · Coach and captain in calmer hours: Jorge Jesus talks with Ronaldo at a Portugal training session — before 'the right moment' became a broken promise. <i>Source: media wire photo</i></figcaption></figure>",
      "<strong>III. Broken word No.1: warmed up vs Norway, never came on</strong><br>On 27 September against Norway, the promise made at lunchtime — 'you'll get your 30 minutes' — evaporated: Ronaldo warmed up and never entered as Portugal laboured to a 2-1 win. Jesus shrugged afterwards: '<em>It wasn't the right moment for Cris.</em>' Worse followed: at the final whistle, while the team went to salute the fans, the captain walked straight down the tunnel — <strong>no acknowledgement, no wave</strong>. The team won; he lost — the screentime, that is.",
      "<strong>IV. Broken word No.2, and the walkout</strong><br>On 30 September in Copenhagen, Jesus told the pre-match press conference he was <em>not planning to start Ronaldo against Denmark</em>. Hours later, the captain packed his bags and left the camp overnight, offering the cameras exactly one line: '<strong>The coach broke his word.</strong>' From '30 minutes as agreed' to 'officially benched' to 'gone before anyone could explain' — the whole arc took a single day. Benched by Santos in Qatar, he at least cried first. Under Jesus he didn't even bother with the tears.",
      "<strong>V. Ronaldo-less Portugal thrash Denmark 4-2</strong><br>On 1 October, the 'orphaned' Portugal demolished Denmark 4-2, with <strong>Gonçalo Ramos and Rafael Leão</strong> supplying the firepower — a fourth straight Nations League win. The narrative flipped overnight: '<em>Why do Portugal play better without Ronaldo?</em>' trended worldwide. The cruel part is who's asking: not the haters — the results. Four straight wins say it plainly — this team can do without anyone; the only dissent comes from the one man convinced it can't do without him.",
      "<strong>VI. The 1,700-word statement: 'he broke his word twice'</strong><br>On 6 October Ronaldo broke a week's silence. Broken promise one: the 30 minutes vs Norway. Broken promise two was more theatrical: the pair had agreed Jesus would 'close the matter by telling the truth' at a press conference, from a script Ronaldo had reviewed — its agreed lines included the coach admitting '<em>I made a mistake by putting someone of the stature of Pelé or Diego Maradona on to warm up</em>'. Instead, Ronaldo wrote, Jesus went off-script 'with aggressiveness and a high-and-mighty attitude'. His verdict: '<strong>I heard an aggression I did not deserve. It was the second time he broke his word.</strong>' And: 'In almost 25 years I have never interfered in a coach's decisions.' Quite right — he merely asks the coach to deliver the lines he has approved. That's not interference; <em>that's a table read</em>.",
      "<strong>VII. Apology and self-requested punishment: flip the table, then bow</strong><br>The statement's second half changed key: a public apology to teammates and fans, an admission that leaving the camp 'should not have happened' and that skipping the fan salute was 'solely my responsibility', and a pledge to accept <strong>any sanction the federation imposes</strong>, as captain. Serve the ban, stay fit, and he is 'always available for Portugal' — translated: punish me all you like, but retirement was never on the table; keep the farewell-match slot pencilled in. The choreography is familiar: flip the table, bow to the room, pin the 'bigger picture' medal on your own chest.",
      "<strong>VIII. Jesus's cold reply: 'I have nothing to say'</strong><br>Waylaid by reporters, Jesus fired back a single reply: '<em>I was in Leiria watching the youth team. Now I'll read the statement. I have nothing to say.</em>' His earlier reaction to Ronaldo's explanation was just as curt: 'I did not have time for it.' You write 1,700 words, he answers with eight. One side demands redress; the other can't spare the appointment. The contest was settled on word count.",
      "<figure class='modal-figure'><picture><source type='image/webp' srcset='assets/images/report/r-72-3.webp'><img src='assets/images/report/r-72-3.jpg' alt='Ronaldo and Jorge Jesus split image' loading='lazy' decoding='async'></picture><figcaption><b>Fig 3</b> · One frame, two camps: a grim-faced No.7 on one side, Jesus gesticulating at the Portugal press desk on the other. <i>Source: LatestLY</i></figcaption></figure>",
      "<figure class='modal-figure'><picture><source type='image/webp' srcset='assets/images/report/r-72-4.webp'><img src='assets/images/report/r-72-4.jpg' alt='Jorge Jesus, stone-faced' loading='lazy' decoding='async'></picture><figcaption><b>Fig 4</b> · 'I have nothing to say' — Jesus, waylaid by reporters, utterly stone-faced. <i>Source: Sports Illustrated</i></figcaption></figure>",
      "<strong>IX. The federation's balancing act</strong><br>FPF president Pedro Proença called the affair a 'misunderstanding', insisting Ronaldo remains part of the squad; Jesus offered one more meeting. Yet the federation has reportedly <strong>already begun planning a farewell match</strong> for the national team's all-time top scorer (146 goals in 234 caps). Mediating on one flank, arranging the funeral on the other.",
      "<strong>X. The disciplinary arithmetic: six months max, 42 at the end of it</strong><br>Portuguese media dug out the FPF disciplinary code: leaving the national-team camp without permission carries a <strong>ban of one to six months</strong> plus a fine of up to about €1,020. The fine, for a man on €200M a year, is a parking ticket; the ban is the real sentence — serve the maximum and he returns, if he returns, at 42. 'Available anytime' now reads more like courtesy than a plan. Put bluntly: the federation needs a step down and calls it punishment; he needs an excuse and calls it a broken word. Everyone gets what they need; the truth can wait outside.",
      "<strong>XI. The extra twist: pressure via his club director?</strong><br>Portuguese journalist Pereira added fuel: compared with the strike and the walkout, the claim that Ronaldo <em>enlisted his club director to lean on the national-team coach</em> was 'even more outrageous — he wants far more than an apology from the coach'. With the 'agreement' documents leaked, the hard-hitting statement swung part of the narrative back: sympathisers saw a wronged veteran; critics saw the same old story — <strong>on the pitch his teammates are teammates; in the script, they're props</strong>.",
      "<strong>XII. Versus 2022: from crying quietly to flipping the table</strong><br>In Qatar four years ago, benched by Fernando Santos, he swallowed it, wept, and slipped away after elimination. In 2026, with Jesus, he didn't even wait for the match — bags packed, door slammed. Four years on, the only measurable growth is exit efficiency: from 'post-match tearful departure' to 'pre-match overnight evacuation'. From 'painful substitution' to 'unilateral walkout', the 41-year-old tore off the last fig leaf of 'team above self'.",
      "<strong>XIII. Archive verdict: a final chapter written in 'I'</strong><br>The tears of 'a clear conscience' were barely 90 days old when the 'broken word' script premiered — his after-match rhetoric, as ever, in better form than his legs. In 25 years, the CR7 who 'never interfered with a coach's decisions' detonated his Portugal career over a starting promise — and it took until 41 to finally meet a manager who 'broke his word twice'. The common denominator is starting to stand out. Whichever way the truth leans, the fact sheet is stark: camp abandoned, apology issued, sanction pending, farewell in preparation — <em>the closing chapter of his international career is written in a single letter, I — and the send date on that farewell letter, he signed himself</em>.",
      "<div class='modal-disclaimer'><strong>⚠️ Disclaimer:</strong> Compiled from public reporting by Reuters, ESPN, BBC, AP, A Bola, Record, Yahoo Sports and Chinese outlets (Sep-Oct 2026). Images are public news photos; copyright remains with the original agencies and publishing outlets (including LatestLY, Sports Illustrated); used here solely as fan-culture reference. Ronaldo has publicly apologised and offered to accept any sanction; the disciplinary process is ongoing and the final word belongs to the Portuguese FA. This archive records public reporting only and takes no official position. For entertainment purposes.</div>"
    ],
    quote:{text:"我听到了一种我并未应得的攻击。这已经是他第二次食言。", textEn:"I heard an aggression I did not deserve. It was the second time he broke his word.", author:"C罗，2026年10月6日回应退队风波的公开声明", authorEn:"Cristiano Ronaldo, public statement on the walkout, 6 Oct 2026", textEs:"Escuché una agresión que no merecía. Es la segunda vez que rompe su palabra.", authorEs:"Cristiano Ronaldo, comunicado público sobre su marcha del campamento, 6 de octubre de 2026"},
    tags:["头条","退队","热苏斯","葡萄牙国家队","两次食言","擅自离营","连夜退群","小作文","国家联赛","丹麦4-2","道歉","自请重罚","告别赛","禁赛风险","41岁","2026"],
    tagsEn:["headlined","walkout","Jorge Jesus","Portugal national team","broken promises twice","left the camp","overnight group-chat exit","essay-length post","Nations League","Denmark 4-2","apology","self-requested punishment","farewell match","ban risk","age 41","2026"],
    tagsEs:["titular","abandono","Jorge Jesus","selección de Portugal","dos promesas rotas","marcha del campamento","fuga nocturna del grupo","comunicado interminable","Nations League","Dinamarca 4-2","disculpa","autoimposición de castigo","partido de despedida","riesgo de sanción","41 años","2026"]
  },
];

// ========== 分类配置 ==========
const catConfig = {
  persona:{label:"人设争议",labelEn:"Persona",labelEs:"Personaje",color:"#4a235a"},
  violence:{label:"场内暴力",labelEn:"Violence",labelEs:"Violencia",color:"#dc143c"},
  offpitch:{label:"场外失态",labelEn:"Off-pitch",labelEs:"Fuera del campo",color:"#b9770e"},
  club:{label:"俱乐部与法律",labelEn:"Club & Law",labelEs:"Club y Ley",color:"#6e2c00"},
  national:{label:"国家队争议",labelEn:"National Team",labelEs:"Selección",color:"#145a32"}
};

// ========== 时间线数据 ==========
const timelineData = [
  {year:"出道",title:"背弃祖姓 改用 Ronaldo",titleEn:"Abandoned surname, stole \"Ronaldo\"",desc:"全名 dos Santos Aveiro，却抛弃家族姓氏、用中间名 Ronaldo 出道，蹭大罗热度",descEn:"Full name dos Santos Aveiro, yet he ditched his family surname and debuted under the middle name \"Ronaldo\" to piggyback on R9's fame",titleEs:"Abandonó el apellido, robó «Ronaldo»",descEs:"Su nombre completo es dos Santos Aveiro, pero tiró el apellido familiar y debutó con el segundo nombre «Ronaldo» para subirse a la fama de R9"},
  {year:"2003",title:"加盟曼联 + 范尼冲突",titleEn:"Joins Man United + Van Nistelrooy clash",desc:"18岁接班7号；带球独、射门差，更衣室被孤立；与范尼爆发冲突被骂“找你爸爸哭去吧”",descEn:"Took the No.7 shirt at 18; selfish dribbler, poor finisher, isolated in the dressing room; clashed with Van Nistelrooy and was told \"go cry to your daddy\"",titleEs:"Ficha por el United + bronca con Van Nistelrooy",descEs:"Se quedó el dorsal n.º 7 a los 18; regateador egoísta, mal definidor, aislado en el vestuario; se pilló con Van Nistelrooy y este le soltó «ve a llorarle a tu padre»"},
  {year:"2005",title:"丧父 + 训练场大爆发",titleEn:"Father dies + training-ground blowup",desc:"父亲因酗酒肝病去世；范尼训练场怒吼触碰底线，弗格森送走范尼扶正C罗",descEn:"Father died of alcohol-related liver failure; Van Nistelrooy's training rant crossed the line, Ferguson shipped Van Nistelrooy out to back Ronaldo",titleEs:"Muere su padre + explosión en el entrenamiento",descEs:"Su padre murió por fallo hepático por alcohol; el rapto de Van Nistelrooy en el entrenamiento cruzó la línea, Ferguson sacó al holandés para respaldar a Cristiano"},
  {year:"2006",title:"世界杯假摔 + 眨眼坑鲁尼",titleEn:"World Cup dive + wink that sank Rooney",desc:"对法国假摔；鲁尼踩踏卡瓦略后C罗向裁判施压致鲁尼红牌，赛后眨眼成全英公敌",descEn:"Dived vs France; after Rooney stamped on Carvalho, Ronaldo pressured the ref into a red card, then winked to the bench — public enemy No.1 in England",titleEs:"Piscina en el Mundial + guiño que hundió a Rooney",descEs:"Se tiró contra Francia; tras la pisada de Rooney a Carvalho, Cristiano presionó al árbitro para la roja y luego guiñó al banquillo — enemigo público n.º 1 en Inglaterra"},
  {year:"2007-2008",title:"泡健身房蜕变 + 首夺金球",titleEn:"Gym transformation + first Ballon d'Or",desc:"从清瘦边锋变身肌肉前锋；07/08赛季率曼联夺英超+欧冠双冠，首夺金球奖与欧洲金靴",descEn:"From wiry winger to muscled striker; in 07/08 led United to a Premier League + Champions League double, winning his first Ballon d'Or and European Golden Shoe",titleEs:"Metamorfosis en el gimnasio + primer Balón de Oro",descEs:"De extremo frailuno a delantero musculado; en 07/08 llevó al United a la Premier + Champions, ganando su primer Balón de Oro y Bota de Oro"},
  {year:"2009",title:"拉斯维加斯酒店事件",titleEn:"Las Vegas hotel incident",desc:"6月C罗在拉斯维加斯被指控性侵，次年支付37.5万美元封口费",descEn:"In June Ronaldo was accused of sexual assault in Las Vegas; the next year he paid $375,000 in hush money",titleEs:"Incidente del hotel de Las Vegas",descEs:"En junio Cristiano fue acusado de agresión sexual en Las Vegas; al año siguiente pagó 375.000 $ para callar"},
  {year:"2010",title:"迷你罗出生 生母成谜 + 金球奖自设",titleEn:"Cristiano Jr born, mom a mystery + self-awarded trophy",desc:"6月长子在美国出生生母未公开；C罗与门德斯在迪拜设环球足球奖每年颁给自己",descEn:"In June his first son was born in the US, the mother undisclosed; Ronaldo and Mendes set up the Globe Soccer Awards in Dubai to hand himself trophies yearly",titleEs:"Nace Cristiano Jr, madre enigma + trofeo autopremiado",descEs:"En junio nació su primer hijo en EE. UU., madre sin desvelar; Cristiano y Mendes montaron los Globe Soccer Awards en Dubái para darse trofeos cada año"},
  {year:"2011",title:"「妒忌论」金句诞生",titleEn:"The 'jealousy defence' is coined",desc:"欧冠客战萨格勒布被全场辱骂，赛后甩出「我富有、英俊、还是伟大球员，人们嫉妒我」；2014年他自认「失误」",descEn:"Abused all night in Zagreb in the Champions League, he explained it afterwards: 'I'm rich, handsome and a great player — people are jealous'; in 2014 he called it a 'mistake'",titleEs:"Nace la «defensa de los celos»",descEs:"Insultado toda la noche en Zagreb en Champions, lo explicó así: «soy rico, guapo y un gran jugador, la gente me tiene envidia»; en 2014 lo llamó «un error»"},
  {year:"2013",title:"金球奖延期丑闻 + 自建博物馆",titleEn:"Ballon d'Or extension scandal + self-built museum",desc:"四大皆空的C罗通过FIFA延期投票“偷”走五冠王里贝里的金球奖；12月更在丰沙尔开设CR7博物馆——没退役先立庙",descEn:"Trophyless that season, Ronaldo \"stole\" the Ballon d'Or from five-time winner Ribéry thanks to FIFA extending the vote; in December he opened the CR7 museum — a shrine to himself before retiring",titleEs:"Escándalo de la prórroga del Balón de Oro + museo propio",descEs:"Sin títulos esa temporada, Cristiano se «robó» el Balón de Oro al pentacampeón Ribéry gracias a que la FIFA alargó la votación; en diciembre inauguró el museo CR7 — un templo a sí mismo antes de retirarse"},
  {year:"2014",title:"肖像权补缴 + 世界杯带伤出局",titleEn:"Image-rights backtax + injured World Cup exit",desc:"主动补缴550万肖像权税埋下后患；世界杯带膝伤出战小组赛仅1球，出局后落泪",descEn:"Voluntarily paid back €5.5M in image-rights tax, storing up trouble; played the World Cup with a knee injury, scored just once in the group stage, left in tears",titleEs:"Atrasados de imagen + Mundial tocado y eliminado",descEs:"Pagó voluntariamente 5,5 M€ de imagen y sembró problemas; jugó el Mundial con la rodilla tocada, marcó solo uno en la fase de grupos y se fue llorando"},
  {year:"2015",title:"拳击克雷霍维亚克",titleEn:"Punched Krychowiak",desc:"皇马对阵塞维利亚，C罗跑动中挥拳击打对手头部",descEn:"Real Madrid vs Sevilla, Ronaldo punched his opponent in the head while running",titleEs:"Le dio un puñetazo a Krychowiak",descEs:"Real Madrid-Sevilla, Cristiano le soltó un puñetazo en la cabeza al rival mientras corría"},
  {year:"2016",title:"怒喷冰岛 + 扔麦克风 + 决赛躺冠",titleEn:"Iceland rant + mic-toss + final lay-and-win",desc:"小组赛怒喷冰岛「小国心态」遭八强打脸；抢记者麦克风扔进湖里；决赛25分钟伤退，被营销为“第一功臣”",descEn:"Slammed Iceland's \"small mentality\" in the group stage and got owned as they reached the quarters; snatched a reporter's mic and threw it in a lake; went off injured in the 25th minute of the final, then was marketed as the \"main hero\"",titleEs:"Bronca a Islandia + tira el micrófono + final de tumbado",descEs:"Arremetió contra la «mentalidad pequeña» de Islandia y esta llegó a cuartos; le quitó el micrófono a un periodista y lo tiró a un lago; se lesionó en el minuto 25 de la final y aun así lo vendieron como «el gran héroe»"},
  {year:"2017",title:"逃税案 + 推裁判 + 可口可乐预告",titleEn:"Tax case + ref-shove + Coca-Cola foreshadow",desc:"被控逃税1480万欧元；西超杯推搡裁判遭禁赛5场",descEn:"Charged with €14.8M tax fraud; shoved a ref in the Spanish Super Cup, banned 5 games",titleEs:"Caso fiscal + empuja al árbitro + presagio de Coca-Cola",descEs:"Imputado por 14,8 M€ de fraude fiscal; empujó al árbitro en la Supercopa y se llevó 5 partidos de sanción"},
  {year:"2018",title:"逃离西班牙 + 加盟尤文",titleEn:"Flees Spain + joins Juventus",desc:"逃税案和解1900万欧元；为避高税率转投尤文图斯，开启“废队友”模式",descEn:"Settled the tax case for €19M; moved to Juventus to dodge Spain's high tax rate, kicking off his \"team-wrecker\" era",titleEs:"Huye de España + ficha por la Juventus",descEs:"Cerró el caso fiscal por 19 M€; se fue a la Juve para esquivar la alta fiscalidad española y arrancó su etapa de «rompeequipos»"},
  {year:"2019",title:"逃税案认罪",titleEn:"Tax-case guilty plea",desc:"1月当庭认罪，2年缓刑+1880万欧元罚款，免于牢狱",descEn:"In January he pleaded guilty in court: 2 years suspended + €18.8M fine, no jail time",titleEs:"Declaración de culpa en el caso fiscal",descEs:"En enero se declaró culpable en la vista: 2 años en suspenso + 18,8 M€ de multa, sin pisar la cárcel"},
  {year:"2020",title:"尤文欧冠出局 + 疫情期身价缩水",titleEn:"Juve UCL exit + pandemic value dip",desc:"尤文图斯欧冠被里昂淘汰止步16强；疫情冲击下「CR7」商业版图估值承压，连冠荒加剧",descEn:"Juve knocked out of the UCL Round of 16 by Lyon; the pandemic squeezed the CR7 business empire's valuation as the trophy drought deepened",titleEs:"Eliminación de la Juve en UCL + caída de valor por pandemia",descEs:"La Juve cayó en octavos de Champions contra el Lyon; la pandemia apretó la valoración del imperio CR7 mientras se profundizaba la sequía de títulos"},
  {year:"2021",title:"罗三脚 + 可乐40亿 + 两次摔袖标",titleEn:"Three-Kick + Coke $40B + double armband toss",desc:"双红会2秒连踢琼斯3脚；移走可口可乐致市值蒸发40亿美元；两次摔队长袖标",descEn:"Kicked Jones three times in 2 seconds in the Northwest Derby; moving the Coke bottles wiped ~$40B off Coca-Cola's cap; tossed his captain's armband twice",titleEs:"Tres-patadas + Coca-Cola 40.000 M$ + doble brazalete tirado",descEs:"Le dio tres patadas a Jones en 2 segundos en el derbi; apartar las cocas secó unos 40.000 M$ de la bolsa; tiró el brazalete de capitán dos veces"},
  {year:"2022",title:"摔手机 + 转会闹剧 + 拒绝登场 + 炮轰曼联",titleEn:"Phone-smash + transfer saga + bench mutiny + blasts United",desc:"4月摔自闭症小球迷手机；夏窗6豪门全拒；10月拒绝替补登场提前离场遭停赛罚款；11月炮轰曼联被解约；年底2亿年薪去沙特",descEn:"In April smashed an autistic boy's phone; in the summer all 6 elite clubs said no; in October refused to come on, walked out early and was suspended and fined; in November blasted United and got his contract terminated; by year-end he was in Saudi on €200M a year",titleEs:"Móvil roto + circo de fichaje + motín de banquillo + destroza al United",descEs:"En abril rompió el móvil de un niño autista; en verano los 6 gigantes dijeron que no; en octubre se negó a salir, se marchó antes del final y fue sancionado y multado; en noviembre destrozó al United y le rompieron el contrato; fin de año en Arabia por 200 M€"},
  {year:"2022.12",title:"世界杯被替补 + 与桑托斯决裂",titleEn:"World Cup benched + falls out with Santos",desc:"卡塔尔世界杯连续两场被放替补；摩洛哥淘汰后落泪；赛后与桑托斯彻底决裂",descEn:"Benched for two straight Qatar World Cup knockout games; left in tears after Morocco knocked them out; completely fell out with manager Santos",titleEs:"Suplente en el Mundial + ruptura con Santos",descEs:"Suplente dos partidos seguidos en los cruces de Catar; se fue llorando al caer contra Marruecos; ruptura total con Santos"},
  {year:"2023",title:"拉斯维加斯案终结 + 推开球迷",titleEn:"Vegas case closed + shoves a fan",desc:"上诉法院驳回Mayorga上诉；夺冠后推开想合影的球迷",descEn:"Appeals court rejected Mayorga's appeal; after a title he shoved a fan who wanted a selfie",titleEs:"Caso de Vegas cerrado + empuja a un fan",descEs:"La apelación desestimó el recurso de Mayorga; tras un título empujó a un fan que se quería hacer una foto"},
  {year:"2024",title:"刀削面 + 不雅动作 + 围巾塞裤裆",titleEn:"Noodle-slice + obscene gesture + scarf-in-pants",desc:"对球迷做“刀削面”怪异手势、不雅动作、围巾塞裤裆，B站出“30大抽象行为”",descEn:"Did the \"noodle-slicing\" gesture at fans, an obscene gesture, stuffed a rival scarf down his pants — Bilibili compiled his \"30 most unhinged moments\"",titleEs:"Corta-fideos + gesto obsceno + bufanda en el pantalón",descEs:"Hizo el gesto raro de «cortar fideos» a los fans, un gesto obsceno y se metió una bufanda rival en el pantalón — Bilibili recopiló sus «30 momentos más bizarros»"},
  {year:"2025",title:"国家队首红 + 摩根专访神语录",titleEn:"First national-team red + Piers Morgan quotes",desc:"40岁世预赛领国家队首红（第14红）；11月再上摩根专访：“世界杯不是梦想”“我是历史第一第二第三”",descEn:"At 40 got his first national-team red (his 14th overall) in a World Cup qualifier; in November back on Piers Morgan: \"The World Cup isn't a dream,\" \"I'm the 1st, 2nd and 3rd best in history\"",titleEs:"Primera roja con la selección + frases en Piers Morgan",descEs:"A los 40 vio su primera roja con Portugal (la 14.ª) en un clasificatorio mundialista; en noviembre volvió a Piers Morgan: «El Mundial no es un sueño», «soy el 1.º, 2.º y 3.º mejor de la historia»"},
  {year:"2026.5",title:"沙漠4年1冠",titleEn:"Desert: 4 years for 1 title",desc:"加盟沙特3年半后终于拿到第一个联赛冠军，赛后激动落泪",descEn:"After 3.5 years in Saudi he finally won his first league title, in tears afterwards",titleEs:"Desierto: 4 años para 1 título",descEs:"Tras 3,5 años en Arabia por fin ganó su primera liga, llorando de emoción después"},
  {year:"2026.6",title:"世界杯被嘘",titleEn:"World Cup: jeered by own fans",desc:"世界杯被本国球迷狂嘘后梅开二度，41岁138天成世界杯最年长梅开二度球员、连续6届破门",descEn:"Loudly booed by his own country's fans at the World Cup, then scored twice — at 41 years 138 days the oldest to score a brace in World Cup history, scoring in 6 straight editions",titleEs:"Mundial: abucheado por sus propios fans",descEs:"Fuertemente abucheado por la afición de su país en el Mundial y aun así marcó dos: con 41 años y 138 días se convirtió en el más longevo en marcar un doblete en un Mundial y en marcar en 6 ediciones seguidas"},
  {year:"2026.7",title:"世界杯1/8决赛被换下",titleEn:"World Cup R16: subbed off",desc:"葡萄牙逆转克罗地亚，C罗第81分钟被马丁内斯换下，表情耐人寻味",descEn:"Portugal came back to beat Croatia; Ronaldo was subbed off by Martínez in the 81st minute with a telling look on his face",titleEs:"Mundial octavos: sustituido",descEs:"Portugal remontó a Croacia; Cristiano fue sustituido por Martínez en el minuto 81 con una cara muy elocuente"},
  {year:"2026.9",title:"与热苏斯闹崩 擅自退队",titleEn:"Falls out with Jesus, walks out on Portugal",desc:"世界杯出局90天后，41岁阿伟罗因轮换风波与主帅热苏斯闹崩，丹麦之战前夜连夜退群；小作文控诉「两次食言」并自请重罚，或禁赛至42岁，足协已在筹备告别赛",descEn:"Promised 30 minutes vs Norway, benched for Denmark — he left camp that very night; the statement cried 'broken word twice', the ban could run to 42, and the FA is already rehearsing the farewell",titleEs:"Le prometen 30 minutos y deja la concentración",descEs:"Le prometieron 30 minutos ante Noruega y acabó suplente contra Dinamarca: dejó la concentración esa misma noche; el comunicado gritó «dos promesas rotas», la sanción puede llegar hasta los 42 y la federación ya ensaya la despedida"}
];

// ========== 语录数据 ==========
const quotes = [
  // —— C罗自述（自大/甩锅/避责，句句反噬自身）——
  {text:"我感到被背叛了。曼联的人——教练、高层——他们背叛了我。", author:"C罗，2022年皮尔斯·摩根采访", textEn:"I feel betrayed. The people at Manchester United — the coach, the hierarchy — they betrayed me.", authorEn:"Cristiano, 2022 Piers Morgan interview", textEs:"Me siento traicionado. La gente del Manchester United —el entrenador, la directiva— me ha traicionado.", authorEs:"Cristiano, entrevista con Piers Morgan de 2022"},
  {text:"是我在这里，不是梅西！", author:"C罗，沙特联赛回应球迷挑衅", textEn:"I'm here, not Messi!", authorEn:"Cristiano, responding to fan taunts in the Saudi league", textEs:"¡Estoy yo, no Messi!", authorEs:"Cristiano, respondiendo a los cánticos de los aficionados en la liga saudí"},
  {text:"喝水，不要可乐。", author:"C罗，2021欧洲杯发布会", textEn:"Drink water, not Coca-Cola.", authorEn:"Cristiano, Euro 2020 press conference", textEs:"Bebe agua, no Coca-Cola.", authorEs:"Cristiano, rueda de prensa de la Eurocopa 2020"},
  {text:"世界杯不是我的梦想。我就是历史第一、第二、第三。", author:"C罗，2025年11月皮尔斯·摩根专访", textEn:"The World Cup is not my dream. I am the first, second and third best in history.", authorEn:"Cristiano, Nov 2025 Piers Morgan interview", textEs:"El Mundial no es mi sueño. Soy el primero, segundo y tercero mejor de la historia.", authorEs:"Cristiano, entrevista con Piers Morgan, noviembre de 2025"},
  {text:"我之所以被嘘，是因为我长得帅、又有钱、还踢得伟大，人们就是嫉妒我。", author:"C罗，2011年欧冠客战萨格勒布迪纳摩赛后（2014年自认“失误”）", textEn:"I get booed because I'm handsome, rich and play brilliantly — people are just jealous.", authorEn:"Cristiano, after the 2011 CL trip to Dinamo Zagreb (a 'mistake' he admitted in 2014)", textEs:"Me abuchean porque soy guapo, rico y juego de maravilla — la gente simplemente me tiene envidia.", authorEs:"Cristiano, tras el partido de Champions ante el Dinamo de Zagreb en 2011 (un «error», admitió en 2014)"},
  {text:"你们之所以要查我，是因为我是C罗。", author:"C罗，2017年逃税案庭审", textEn:"The only reason you're investigating me is because I'm Cristiano Ronaldo.", authorEn:"Cristiano, 2017 tax-fraud court hearing", textEs:"La única razón por la que me investigáis es porque soy Cristiano Ronaldo.", authorEs:"Cristiano, vista del juicio por fraude fiscal de 2017"},
  {text:"Factos! Factos! Factos!", author:"C罗，2021年金球奖输给梅西后深夜在梅西帖子下的连发评论", textEn:"Factos! Factos! Factos!", authorEn:"Cristiano, comments spammed under Messi's post after losing the 2021 Ballon d'Or", textEs:"¡Factos! ¡Factos! ¡Factos!", authorEs:"Cristiano, comentarios lanzados en serie bajo el post de Messi tras perder el Balón de Oro 2021"},
  {text:"我1000%问心无愧，我顶着压力打进3球，表现不差。", author:"C罗，2026世界杯1/8决赛前一天发布会", textEn:"I'm 1000% at peace with my conscience. I scored 3 goals under pressure, my performance was not bad.", authorEn:"Cristiano, press conference the day before the 2026 World Cup R16", textEs:"Estoy 1000% en paz con mi conciencia. Marqué 3 goles bajo presión, mi rendimiento no fue malo.", authorEs:"Cristiano, rueda de prensa del día antes de los octavos del Mundial 2026"},
  {text:"在我之前，葡萄牙什么都没赢过。我帮葡萄牙拿了三座奖杯，欧洲杯不亚于世界杯。", author:"C罗，2026世界杯出局后自辩", textEn:"Before me, Portugal had won nothing. I won them three trophies — the Euros are no less than the World Cup.", authorEn:"Cristiano, defending himself after the 2026 World Cup exit", textEs:"Antes de mí, Portugal no había ganado nada. Les conseguí tres trofeos — la Eurocopa no es menos que el Mundial.", authorEs:"Cristiano, defendiéndose tras la eliminación del Mundial 2026"},
  {text:"明天无论如何，我都1000%问心无愧。", author:"C罗，2026世界杯赛前发布会（与赛后同一句，被嘲'输了也背词'）", textEn:"No matter what tomorrow, I'm 1000% at peace with my conscience.", authorEn:"Cristiano, pre-match press conference (the same line reused after — mocked for 'memorizing lines even when losing')", textEs:"Pase lo que pase mañana, estoy 1000% en paz con mi conciencia.", authorEs:"Cristiano, rueda de prensa pre-partido (la misma frase reciclada después — objeto de burla por «memorizar el guion incluso al perder»)"},
  // —— 媒体/评论（纯贬）——
  {text:"把阿伟罗这个父姓给彻底扔了，除了蹭热度并且想要掩盖事实以外，实在是没觉得有什么别的可能。", author:"知乎足球评论，论背弃祖姓", textEn:"Ditching the family name Aveiro — apart from chasing hype and covering up the truth, there's really no other explanation.", authorEn:"Zhihu football commentary, on abandoning the surname", textEs:"Tirar el apellido familiar Aveiro — además de perseguir el bombo y tapar la verdad, de verdad no le veo otra explicación.", authorEs:"Comentario de fútbol en Zhihu, sobre el abandono del apellido"},
  {text:"更加喜欢的是表里如一、行不更名坐不改姓的人，那样显得更真实更有自信。", author:"网易体育评论", textEn:"I prefer someone who's the same inside and out, who doesn't change his name — that reads as more real, more confident.", authorEn:"NetEase Sports commentary", textEs:"Prefiero a alguien que es igual por dentro y por fuera, que no cambia de nombre — eso se lee como más real, más seguro de sí mismo.", authorEs:"Comentario de NetEase Sports"},
  {text:"无论是面对球迷、记者、裁判、对手，无论是20多岁还是39岁，C罗都容易'上头'。", author:"腾讯体育评论", textEn:"Whether facing fans, journalists, referees or opponents, in his 20s or at 39, Cristiano easily loses his head.", authorEn:"Tencent Sports commentary", textEs:"Sea ante aficionados, periodistas, árbitros o rivales, ya sea con veintitantos o a los treinta y nueve, a Cristiano le suele ir la cabeza y hacer tonterías.", authorEs:"Comentario de Tencent Sports"},
  {text:"2013年是破坏了规则，而2010年在规则之内。", author:"知乎足球评论，论金球延期丑闻", textEn:"2013 broke the rules; 2010 stayed within them.", authorEn:"Zhihu football commentary, on the Ballon d'Or extension scandal", textEs:"En 2013 se rompieron las reglas; en 2010 todo fue dentro de ellas.", authorEs:"Comentario de fútbol en Zhihu, sobre el escándalo de la prórroga del Balón de Oro"},
  {text:"来沙特快4年！C罗，终于在联赛夺冠了！", author:"澎湃新闻2026年5月22日", textEn:"Almost 4 years in Saudi! Cristiano finally wins the league!", authorEn:"The Paper, May 22, 2026", textEs:"¡Casi 4 años en Arabia Saudí! ¡Cristiano por fin gana la liga!", authorEs:"The Paper, 22 de mayo de 2026"},
  {text:"六届世界杯、九场淘汰赛、仅一粒进球、零座奖杯——'历史最佳'的尽头是一张写满零的答卷。", author:"ESPN，2026世界杯1/8决赛后", textEn:"Six World Cups, nine knockout games, one single goal, zero trophies — the end of the \"GOAT\" is a report card full of zeros.", authorEn:"ESPN, after the 2026 World Cup R16", textEs:"Seis Mundiales, nueve partidos de eliminatoria, un solo gol, cero trofeos — el final del «GOAT» es un boletín lleno de ceros.", authorEs:"ESPN, tras los octavos del Mundial 2026"},
  {text:"The King leaves without his crown（王无冠而退）。", author:"LiveMint，2026世界杯葡萄牙出局头条", textEn:"The King leaves without his crown.", authorEn:"LiveMint, headline after Portugal's 2026 World Cup exit", textEs:"El Rey se va sin su corona.", authorEs:"LiveMint, titular tras la eliminación de Portugal en el Mundial 2026"},
  {text:"2016欧洲杯决赛他25分钟就伤退，是替补埃德的远射捧回了奖杯，可叙事的主角永远还得是他自己。", author:"体坛加，2026世界杯赛后评论", textEn:"He went off injured in the 25th minute of the Euro 2016 final; substitute Éder's long shot won the trophy — yet the story's protagonist always has to be him.", authorEn:"Titan Sports, post-2026 World Cup commentary", textEs:"Se lesionó en el minuto 25 de la final de la Eurocopa 2016; el disparo lejano del suplente Éder ganó el trofeo — y aun así, el protagonista de la historia siempre tiene que ser él.", authorEs:"Titan Sports, comentario post-Mundial 2026"},
  {text:"这不是输球，是输不起——每一次出局后，剧本的主角永远只能是他自己。", author:"凤凰网体育，论'问心无愧'话术", textEn:"This isn't losing a match — it's being a sore loser. After every exit, the lead role of the script can only ever be him.", authorEn:"Phoenix Sports, on the \"clear conscience\" rhetoric", textEs:"Esto no es perder un partido — es ser un mal perdedor. Tras cada eliminación, el papel protagonista del guion solo puede ser él.", authorEs:"Phoenix Sports, sobre la retórica de la «conciencia tranquila»"},
  {text:"赛前预埋一句、赛后兑现同一句，输了也要赢话术，这叫'冠军心态'。", author:"知乎，论C罗的赛后发言模板", textEn:"Plant a line before the match, repeat the same line after — even when you lose you win the rhetoric. That's \"champion mentality.\"", authorEn:"Zhihu, on Cristiano's post-match talking template", textEs:"Planta una frase antes del partido, repite la misma frase después — incluso cuando pierdes, ganas la retórica. Eso es «mentalidad de campeón».", authorEs:"Zhihu, sobre la plantilla de declaraciones post-partido de Cristiano"},
  {text:"和C罗做队友你得做好准备：球权是他的，镜头也是他的。", author:"匿名前皇马队友，《马卡报》专栏", textEn:"If you're Cristiano's teammate, be ready: the ball is his, and so is the camera.", authorEn:"Anonymous former Real Madrid teammate, Marca column", textEs:"Si eres compañero de Cristiano, prepárate: el balón es suyo, y la cámara también.", authorEs:"Excompañero anónimo del Real Madrid, columna en Marca"},
  {text:"对C罗来说，没有进球的比赛就是失败的比赛，哪怕球队赢了。", author:"哈维，巴萨名宿", textEn:"For Cristiano, a game without a goal is a failed game — even if the team won.", authorEn:"Xavi, Barcelona legend", textEs:"Para Cristiano, un partido sin gol es un partido fallido — aunque el equipo haya ganado.", authorEs:"Xavi, leyenda del Barcelona"},
  {text:"我亲眼目睹C罗踢了三脚！却被裁判告知这不是红牌。", author:"克洛普，利物浦主帅", textEn:"I saw Cristiano kick him three times with my own eyes! Yet the referee told me it wasn't a red.", authorEn:"Jürgen Klopp, Liverpool manager", textEs:"¡Vi a Cristiano darle tres patadas con mis propios ojos! Y, aun así, el árbitro me dijo que no era roja.", authorEs:"Jürgen Klopp, entrenador del Liverpool"},
  {text:"他们庆祝得像拿了欧洲杯冠军——这是小国心态。", author:"C罗，2016年战平冰岛后；冰岛随后淘汰英格兰打进八强", textEn:"They celebrated like they'd won the Euros — that's a small mentality.", authorEn:"Cristiano Ronaldo, after the 2016 draw with Iceland — who then knocked out England and reached the quarters", textEs:"Celebraron como si hubieran ganado la Eurocopa — eso es mentalidad pequeña.", authorEs:"Cristiano Ronaldo, tras el empate con Islandia en 2016 — que luego eliminó a Inglaterra y llegó a cuartos"},
  {text:"一个永远在追赶大力神杯、却始终差一步的男人——但合影里的C位，他一步都不肯让。", author:"新浪体育，2026世界杯告别特写", textEn:"A man forever chasing the World Cup trophy yet always one step short — but in the group photo, he won't yield center stage by an inch.", authorEn:"Sina Sports, 2026 World Cup farewell feature", textEs:"Un hombre persiguiendo para siempre el trofeo del Mundial y siempre a un paso de conseguirlo — pero en la foto de grupo, no cede el centro ni un centímetro.", authorEs:"Sina Sports, reportaje de despedida del Mundial 2026"},
  {text:"摔手机、扔麦克风、摔袖标、不雅动作——这不是巨星脾气，是失控。", author:"BBC Sport，盘点C罗场外失态", textEn:"Smashing phones, throwing mics, tossing armbands, obscene gestures — this isn't star temper, it's losing control.", authorEn:"BBC Sport, rounding up Cristiano's off-pitch meltdowns", textEs:"Romper móviles, lanzar micrófonos, tirar brazaliales, gestos obscenos — esto no es carácter de estrella, es perder el control.", authorEs:"BBC Sport, recopilando los berrinches de Cristiano fuera del campo"},
  {text:"他不是没有天赋，而是天赋之上又加了一层永远填不满的自我。", author:"腾讯体育，深度人物评论", textEn:"It's not that he lacks talent — it's that on top of his talent there's a layer of self that can never be filled.", authorEn:"Tencent Sports, in-depth profile", textEs:"No es que le falte talento — es que encima de su talento hay una capa de ego que nunca se puede llenar.", authorEs:"Tencent Sports, perfil en profundidad"},
  {text:"40亿美元市值蒸发，只因一句'喝水，不要可乐'——傲慢的代价由股东买单。", author:"CNN，2021可口可乐事件评论", textEn:"$40 billion in market cap wiped out by one line, \"drink water, not Coke\" — the price of arrogance paid by shareholders.", authorEn:"CNN, on the 2021 Coca-Cola incident", textEs:"40.000 millones de dólares de capitalización esfumados por una frase, «bebe agua, no Coca-Cola» — el precio de la arrogancia lo pagan los accionistas.", authorEs:"CNN, sobre el incidente de Coca-Cola de 2021"},
  {text:"在沙特刷数据，再和欧洲时期的数据简单相加，这本身就注水了。", author:"虎扑，论沙特进球含金量", textEn:"Padding stats in Saudi and simply adding them to his European totals — that's water-injected by definition.", authorEn:"Hupu, on the value of Saudi-league goals", textEs:"Inflar cifras en Arabia y simplemente sumarlas a sus totales europeos — eso es, por definición, estadística aguada.", authorEs:"Hupu, sobre el valor de los goles saudíes"},
  // ↓↓↓ 续编（2026-07-08）补充：穆帅只留前半句 + 更多纯贬/自黑语录 ↓↓↓
  {text:"他是我带过最自我中心的球员。", author:"穆里尼奥，前皇马主帅", textEn:"He's the most self-centred player I've ever coached.", authorEn:"José Mourinho, former Real Madrid manager", textEs:"Es el jugador más egocéntrico que he entrenado nunca.", authorEs:"José Mourinho, exentrenador del Real Madrid"},
  {text:"如果连队友的红牌都能换来一个挤眼的微笑，那这种胜利观已经病态了。", author:"《每日镜报》，论2006世界杯'眨眼门'", textEn:"If a teammate's red card can be met with a wink and a smile, then this idea of winning is already pathological.", authorEn:"Daily Mirror, on the 2006 World Cup \"wink gate\"", textEs:"Si la roja de un compañero puede recibirse con un guiño y una sonrisa, entonces esta idea de ganar ya es patológica.", authorEs:"Daily Mirror, sobre el «guiñogate» del Mundial 2006"},
  {text:"他不是为葡萄牙而战，是为'C罗'而战。", author:"葡萄牙《球报》，2022世界杯替补风波后", textEn:"He doesn't fight for Portugal — he fights for \"Cristiano Ronaldo.\"", authorEn:"Portuguese daily A Bola, after the 2022 World Cup benching saga", textEs:"No lucha por Portugal — lucha por «Cristiano Ronaldo».", authorEs:"Diario portugués A Bola, tras la polémica del banquillo en el Mundial 2022"},
  {text:"7亿欧元的解约金，换不来一个愿意为球队回追的7号。", author:"塞尔电台，皇马后期更衣室分歧报道", textEn:"A €700M release clause can't buy a No.7 willing to track back for the team.", authorEn:"Cadena SER, reporting late-era Real Madrid dressing-room splits", textEs:"Una cláusula de rescisión de 700 M€ no puede comprar un n.º 7 dispuesto a replegarse por el equipo.", authorEs:"Cadena SER, sobre las tensiones en el vestuario del Real Madrid tardío"},
  {text:"儿子迷你罗的生母是谁，他守口如瓶——一个把人生都做成保密协议的男人。", author:"知天下，论迷你罗生母之谜", textEn:"Who is Cristiano Jr's mother? He won't say a word — a man who's turned his whole life into an NDA.", authorEn:"Zhihu Tianxia, on the Cristiano Jr. mother mystery", textEs:"¿Quién es la madre de Cristiano Jr? No dice ni una palabra — un hombre que ha convertido toda su vida en un acuerdo de confidencialidad.", authorEs:"Zhihu Tianxia, sobre el misterio de la madre de Cristiano Jr"},
  {text:"十二任女友、五个孩子、三个生母——他把私生活踢成了转会市场。", author:"腾讯娱乐，盘点C罗情史", textEn:"Twelve girlfriends, five children, three mothers — he's turned his private life into a transfer market.", authorEn:"Tencent Entertainment, rounding up Cristiano's dating history", textEs:"Doce novias, cinco hijos, tres madres — ha convertido su vida privada en un mercado de fichajes.", authorEs:"Tencent Entertainment, recopilando el historial amoroso de Cristiano"},
  {text:"合同到期前骂东家、骂教练、骂队友，这不是爆料，这是过河拆桥的标准动作。", author:"天空体育，论炮轰曼联专访", textEn:"Badmouthing the club, the coach and his teammates right before his contract ends — that's not whistle-blowing, it's the standard burn-the-bridge play.", authorEn:"Sky Sports, on the Piers Morgan United blast", textEs:"Hablarmeal del club, del entrenador y de los compañeros justo antes de que acabe su contrato — eso no es denunciar, es la jugada estándar de quemar los puentes.", authorEs:"Sky Sports, sobre el destrozo al United en Piers Morgan"},
  {text:"他口口声声说曼联背叛了他，却忘了是谁在赛季中途接受采访把俱乐部推上十字架。", author:"加里·内维尔，2022摩根专访后评论", textEn:"He keeps saying United betrayed him, forgetting who gave a mid-season interview that put the club on the cross.", authorEn:"Gary Neville, commenting after the 2022 Morgan interview", textEs:"Sigue diciendo que el United le traicionó, olvidando quién dio una entrevista a mitad de temporada que puso al club en la cruz.", authorEs:"Gary Neville, comentando tras la entrevista con Morgan de 2022"},
  {text:"被换下时那张脸，比比分牌上的0-5还难看。", author:"《太阳报》，论双红会0-5惨败", textEn:"The look on his face when subbed off was uglier than the 0-5 on the scoreboard.", authorEn:"The Sun, on the 0-5 Northwest Derby debacle", textEs:"La cara que puso al ser sustituido era más fea que el 0-5 del marcador.", authorEs:"The Sun, sobre el descalabro 0-5 en el derbi del Norte"},
  {text:"沙特给了他2亿年薪，他给了沙特一句'欧洲水准'的嫌弃。", author:"阿拉比亚电视台，评论C罗沙特首赛季", textEn:"Saudi gave him a €200M salary; he gave Saudi a sniff about \"European standards.\"", authorEn:"Al Arabiya, on Cristiano's first Saudi season", textEs:"Arabia le dio un sueldo de 200 M€; él le dio a Arabia un desdén sobre los «estándares europeos».", authorEs:"Al Arabiya, sobre la primera temporada saudí de Cristiano"},
  {text:"他追求的不是进球，是镜头；不是胜利，是个人胜利。", author:"《阿斯报》专栏，C罗巅峰后期评论", textEn:"He's not chasing goals, he's chasing cameras; not wins, but personal wins.", authorEn:"Diario AS column, late-peak Cristiano commentary", textEs:"No persigue goles, persigue cámaras; no victorias, sino victorias personales.", authorEs:"Columna de Diario AS, comentario sobre el Cristiano del final de su pico"},
  {text:"金球奖输了怪规则、世界杯输了怪教练、联赛输了怪队友——他从来不输，只是被'陷害'。", author:"知乎热评，论C罗的归因模式", textEn:"Loses the Ballon d'Or, blame the rules; loses the World Cup, blame the coach; loses the league, blame his teammates — he never loses, he only ever gets \"framed.\"", authorEn:"Zhihu top comment, on Cristiano's blame patterns", textEs:"Pierde el Balón de Oro, culpa a las reglas; pierde el Mundial, culpa al entrenador; pierde la liga, culpa a los compañeros — nunca pierde, solo le «enmarcan».", authorEs:"Comentario destacado de Zhihu, sobre los patrones de culpa de Cristiano"},
  {text:"所谓'自律标杆'，到了输球那一刻，第一时间想到的是怎么把自己摘出来。", author:"虎扑，论'问心无愧'式发言", textEn:"The so-called \"discipline benchmark\" — the moment he loses, his first thought is how to extract himself from blame.", authorEn:"Hupu, on the \"clear conscience\" style of statement", textEs:"El supuesto «referente de disciplina» — en el momento en que pierde, su primer pensamiento es cómo sacar su propia responsabilidad de la culpa.", authorEs:"Hupu, sobre el estilo de declaración de «conciencia tranquila»"},
  {text:"他用进球数证明自己伟大，却用红牌数证明自己失控。", author:"马卡报，C罗皇马生涯红牌盘点", textEn:"He uses his goal tally to prove he's great, and his red-card tally to prove he's out of control.", authorEn:"Marca, on Cristiano's Real Madrid red cards", textEs:"Usa sus cifras goleadoras para demostrar que es grande, y sus cifras de tarjetas rojas para demostrar que está fuera de control.", authorEs:"Marca, sobre las rojas de Cristiano en el Real Madrid"},
  {text:"一个把庆祝动作注册成个人商标的人，足球对他而言从来不是团队运动。", author:"ESPN，评论'SIU'庆祝商业化", textEn:"A man who trademarked his celebration — football was never a team sport to him.", authorEn:"ESPN, on the commercialisation of the \"SIU\" celebration", textEs:"Un hombre que registró su celebración como marca — el fútbol nunca fue un deporte de equipo para él.", authorEs:"ESPN, sobre la comercialización de la celebración «SIU»"},
  {text:"你们觉得他是英雄，可在被他推开的球迷、被摔掉的麦克风眼里，他只是个失控的富翁。", author:"网易体育，2024刀削面手势事件后", textEn:"You think he's a hero — but to the fans he's shoved and the mics he's thrown, he's just an out-of-control rich man.", authorEn:"NetEase Sports, after the 2024 \"noodle-slice\" gesture incident", textEs:"Creéis que es un héroe — pero para los aficionados a los que ha empujado y los micrófonos que ha lanzado, no es más que un ricachón fuera de control.", authorEs:"NetEase Sports, tras el incidente del gesto «corta-fideos» de 2024"},
  {text:"14张红牌，平均不到200场就要失控一次——这就是所谓'历史第一第二第三'。", author:"OPTA数据调侃，C罗红牌分布", textEn:"14 red cards — losing it once every 200 games or so. So much for \"the 1st, 2nd and 3rd best in history.\"", authorEn:"OPTA data dig, on Cristiano's red-card distribution", textEs:"14 tarjetas rojas — perdiendo los papeles una vez cada 200 partidos más o menos. Así es como es «el 1.º, 2.º y 3.º mejor de la historia».", authorEs:"Análisis de datos de OPTA, sobre la distribución de rojas de Cristiano"},
  {text:"他自封的'GOAT'，六届世界杯一个淘汰赛进球填不满。", author:"阿根廷《奥莱报》，2026世界杯葡萄牙出局后", textEn:"His self-appointed \"GOAT\" title can't be filled by a single World Cup knockout goal across six editions.", authorEn:"Argentine daily Olé, after Portugal's 2026 World Cup exit", textEs:"Su título autoproclamado de «GOAT» no se puede llenar con un solo gol en eliminatoria del Mundial a lo largo de seis ediciones.", authorEs:"Diario argentino Olé, tras la eliminación de Portugal en el Mundial 2026"},
  {text:"连'最后送他一程'的告别赛，他都能把镜头抢回自己身上。", author:"印度斯坦时报，2026世界杯最后一舞评论", textEn:"Even at his own \"last dance\" send-off, he managed to drag the camera back onto himself.", authorEn:"Hindustan Times, on the 2026 World Cup farewell", textEs:"Incluso en su propia despedida de «última danza», fue capaz de arrastrar la cámara de vuelta hacia él.", authorEs:"Hindustan Times, sobre la despedida del Mundial 2026"},
  {text:"别人退役是谢幕，他退役是'必须有人为我不拿冠军负责'。", author:"Reddit足球版热评，论C罗告别姿态", textEn:"For others, retirement is a curtain call; for him, it's \"someone must be held responsible for me not winning a title.\"", authorEn:"Reddit r/soccer top comment, on Cristiano's farewell stance", textEs:"Para los demás, la retirada es una clausura; para él, es «alguien tiene que responder de que yo no gane un título».", authorEs:"Comentario destacado de Reddit r/soccer, sobre la postura de despedida de Cristiano"},
  // ↓↓↓ 续编（2026-10-08）补充：退队风波双方语录 ↓↓↓
  {text:"我听到了一种我并未应得的攻击。这已经是他第二次食言。", author:"C罗，2026年10月6日回应退队风波的公开声明", textEn:"I heard an aggression I did not deserve. It was the second time he broke his word.", authorEn:"Cristiano Ronaldo, public statement on the walkout, 6 Oct 2026", textEs:"Escuché una agresión que no merecía. Es la segunda vez que rompe su palabra.", authorEs:"Cristiano Ronaldo, comunicado sobre su marcha del campamento, 6 de octubre de 2026"},
  {text:"我当时在莱里亚看青年队比赛，现在我会去读那份声明。我没什么可说的。", author:"热苏斯，葡萄牙主帅，被记者拦车追问退队风波", textEn:"I was in Leiria watching the youth team. Now I'll read the statement. I have nothing to say.", authorEn:"Jorge Jesus, Portugal head coach, ambushed by reporters over the walkout", textEs:"Estaba en Leiria viendo al juvenil. Ahora leeré el comunicado. No tengo nada que decir.", authorEs:"Jorge Jesus, seleccionador de Portugal, abordado por la prensa por la marcha de Cristiano"},
  {text:"为什么没有C罗，葡萄牙反而踢得更好？", author:"全球社交媒体热搜，葡萄牙4-2丹麦后", textEn:"Why do Portugal play better without Ronaldo?", authorEn:"Global social-media trending question, after Portugal's 4-2 win over Denmark", textEs:"¿Por qué Portugal juega mejor sin Cristiano?", authorEs:"Pregunta viral en redes, tras el Portugal 4-2 Dinamarca"}
];

/* ========== 绰号进化史数据（9 条，双语）==========
 * img/imgWebp：原图路径；name/period/desc 中英双语
 */
const nicknamesData = [
  {
    num:1, img:"assets/images/nick/nick-new-1.jpg", imgWebp:"assets/images/nick/nick-new-1.webp",
    name:"小小罗", nameEn:"Little Ronaldo",
    nameEs: "Little Ronaldo",
    periodEs: "2003-2006 · Debut en el United",
    descEs: "Cuando llegó al United, el «Ronaldo» brasileño (R9) y Ronaldinho ya eran dioses, así que al recién llegado lo llamaron «Little Ronaldo» por antigüedad. Pelo de fideos, stepovers de exhibición y se tiraba al menor contacto — el apodo cargaba un desprecio de «hermano pequeño» que solo se quitó tras rendir a nivel de Balón de Oro.",
    period:"2003-2006 · 曼联出道期", periodEn:"2003-2006 · Man United debut",
    desc:"出道时巴西\"大罗\"罗纳尔多、\"小罗\"罗纳尔迪尼奥已封神，初来曼联的他按长幼被叫\"小小罗\"。方便面发型、踩单车花活、一碰就倒——这个称呼带着\"小弟\"的轻视，直到他在曼联踢出金球级表现才慢慢摘掉。",
    descEn:"When he arrived at Man United, Brazil's \"Ronaldo\" (R9) and \"Little Ronaldo\" (Ronaldinho) were already gods, so the newcomer was called \"Little Ronaldo\" by seniority. Instant-noodle hair, stepover showboating, going down at a touch — the name carried a \"little brother\" dismissiveness, only shed after he produced Ballon d'Or-level performances."
  },
  {
    num:2, img:"assets/images/nick/nick-new-2.jpg", imgWebp:"assets/images/nick/nick-new-2.webp",
    name:"花罗", nameEn:"Showboat Ronaldo",
    nameEs: "Showboat Ronaldo",
    periodEs: "2004-2007 · Etapa farolillo",
    descEs: "Adicto al regate y al truco llamativo, haciéndose una docena de stepovers por partido y malgastando ocasiones — la prensa inglesa lo bautizó como SHOWBOAT (todo estilo, cero sustancia). Van Nistelrooy y Alan Smith se pillaron con él en los entrenamientos por su estilo «todo lujo, cero pase». Sus estrafalarios conjuntos fuera del campo confirmaron el apellido de «showboat».",
    period:"2004-2007 · 花哨期", periodEn:"2004-2007 · Showboat era",
    desc:"沉迷盘带爱秀花活，一场踩十几个单车却贻误战机，被英格兰媒体讽刺为SHOWBOAT（华而不实）。范尼、阿兰·史密斯都因他\"只花不传\"在训练场爆发冲突。场外五颜六色奇葩着装更坐实\"花\"名。",
    descEn:"Addicted to dribbling and flashy tricks, doing a dozen stepovers a game yet wasting chances — the English media mocked him as a SHOWBOAT (all style, no substance). Ruud van Nistelrooy and Alan Smith clashed with him in training over his \"all flash, no pass\" style. His garish off-pitch outfits cemented the \"showboat\" name."
  },
  {
    num:3, img:"assets/images/nick/nick-new-3.jpg", imgWebp:"assets/images/nick/nick-new-3.webp",
    name:"水罗 / 跳水王", nameEn:"Diver Ronaldo",
    nameEs: "Diver Ronaldo",
    periodEs: "2005-2007 · Etapa piscinero",
    descEs: "Una piscina contra Francia en el Mundial 2006 y otra en la FA Cup contra el Middlesbrough hicieron que la prensa inglesa lo marcara como «diver». En 2007 Ferguson se despistó y soltó «Ronaldo ya no se tira» — una admisión a la inversa de que antes sí lo hacía. De ahí se extendieron los apodos «Diver» y «Penaldo».",
    period:"2005-2007 · 假摔期", periodEn:"2005-2007 · Diving era",
    desc:"2006世界杯对法国禁区假摔、足总杯对米堡假摔被英媒狂批\"跳水\"。弗格森2007年还嘴硬说漏嘴：\"罗纳尔多已经不假摔了。\"——等于变相承认此前确实假摔。\"水罗\"\"跳水王\"由此传开。",
    descEn:"A dive against France at the 2006 World Cup and another in the FA Cup against Middlesbrough saw the English media brand him a \"diver.\" In 2007 Ferguson slipped and said \"Ronaldo doesn't dive anymore\" — a backhanded admission that he used to. The nicknames \"Diver\" and \"Penaldo\" spread from there."
  },
  {
    num:4, img:"assets/images/report/r-18.jpg", imgWebp:"assets/images/report/r-18.webp",
    name:"罗三票 / 票哥", nameEn:"Three-Vote Ronaldo",
    nameEs: "Three-Vote Ronaldo",
    periodEs: "2011-2014 · Etapa de mofa",
    descEs: "En el Mejor Jugador de la UEFA de 2011, Messi repitió y Cristiano sacó solo <strong>3 votos</strong>. Los fans lo bautizaron «Three-Vote» y los autodespreciativos lo llamaron «Vote Bro». Cuando ganó su tercer Balón de Oro en 2014, los haters lo subieron a «Three-Ball» — vaya uno a saber por qué siempre le quedaba pegado el tres.",
    period:"2011-2014 · 调侃期", periodEn:"2011-2014 · Mockery era",
    desc:"2011年欧足联最佳球员评选，梅西蝉联，C罗竟只获<strong>3票</strong>。球迷戏称\"罗三票\"，自嘲的粉丝则叫\"票哥\"。2014年他拿第三座金球后，黑粉又把\"罗三票\"升级为\"罗三球\"——怎么都要带个\"三\"。",
    descEn:"At the 2011 UEFA Best Player award, Messi won again while Ronaldo received only <strong>3 votes</strong>. Fans dubbed him \"Three-Vote,\" and self-deprecating fans called him \"Vote Bro.\" After he won his third Ballon d'Or in 2014, haters upgraded it to \"Three-Ball\" — somehow always stuck with the number three."
  },
  {
    num:5, img:"assets/images/nick/nick-new-5.jpg", imgWebp:"assets/images/nick/nick-new-5.webp",
    name:"沙漠骆驼", nameEn:"Desert Camel",
    nameEs: "El Camello",
    periodEs: "2023–presente · Fiebre del oro saudí",
    descEs: "En 2023 Cristiano se fue al Al Nassr de Arabia por 200 M€ al año, ridiculizado como «se va al desierto a jubilarse». Acabó quedándose 4 años, ganando solo <strong>1 título de liga en 4 temporadas</strong> — contraste brutal con Messi levantando un trofeo al mes de aterrizar en Miami. «El Camello» es a la vez una pulla regional y una crítica a que «carga stats pero no sale del desierto».",
    period:"2023至今 · 沙特淘金期", periodEn:"2023–present · Saudi gold-rush",
    desc:"2023年C罗以2亿欧元年薪远走沙特利雅得胜利，被嘲讽\"去沙漠养老\"。结果一待就是4年，期间<strong>4年才拿到1个联赛冠军</strong>，与梅西加盟迈阿密1个月即夺冠形成惨烈对比。\"沙漠骆驼\"既是地域调侃，也是对其\"驮着数据走不出沙漠\"的讽刺。",
    descEn:"In 2023 Ronaldo left for Saudi's Al Nassr on a €200M-a-year deal, mocked as \"going to the desert to retire.\" He ended up staying 4 years, winning only <strong>1 league title in 4 seasons</strong> — a brutal contrast with Messi winning a trophy 1 month after joining Miami. \"Desert Camel\" is both a regional jab and a dig at him \"carrying stats but never leaving the desert.\""
  },
  {
    num:6, img:"assets/images/report/r-17.jpg", imgWebp:"assets/images/report/r-17.webp",
    name:"总裁", nameEn:"The Boss",
    nameEs: "El Jefe",
    periodEs: "2014–presente · Etapa de pico",
    descEs: "Al principio era un <strong>apodo de haters</strong> — «<em>siempre</em> depende del <em>árbitro</em>» — burlándose de que sus goles venían de favores arbitrales y penales. Pero su imagen dominante, el imperio comercial CR7 y su estilo de ricachón playboy hicieron que «El Jefe» se queriera irónicamente, adoptado por los fans como insignia y convirtiéndose en su etiqueta más sonora.",
    period:"2014至今 · 巅峰期", periodEn:"2014–present · Peak era",
    desc:"最早是<strong>黑称</strong>——\"<em>总</em>是靠<em>裁</em>判\"，讽刺他进球靠裁判照顾、点球多。但C罗霸道形象、CR7商业帝国、多金多情的做派，反而让\"总裁\"黑出感情，被粉丝当作褒义供奉，成了他最响亮的标签。",
    descEn:"Originally a <strong>hater nickname</strong> — \"<em>Always</em> relies on the <em>referee</em>\" — mocking that his goals came from ref favors and penalties. But his domineering image, the CR7 business empire, and his rich-playboy lifestyle made \"The Boss\" ironically beloved, adopted by fans as a badge of honor and becoming his loudest label."
  },
  {
    num:7, img:"assets/images/nick/nick-new-7.jpg", imgWebp:"assets/images/nick/nick-new-7.webp",
    name:"球玊 / 典韦", nameEn:"Ball-King / Penalty-Wei",
    nameEs: "Ball-King / Penalty-Wei",
    periodEs: "2015–presente · Etapa de autoproclamado rey",
    descEs: "«Ball-King» cambia el carácter «rey» por el casi idéntico «玊» (sù) — un trazo de más, burla a su amor por los penales («un punto más»), y pronunciado parecido a su celebración «siu». «Penalty-Wei» juega con «Dian Wei» (un general histórico) y «penal». Ambos son juegos de palabras de primer nivel en la comunidad de haters de Cristiano.",
    period:"2015至今 · 自封球王期", periodEn:"2015–present · Self-crowned era",
    desc:"\"球玊\"把\"球王\"的\"王\"换成形近的\"玊\"（sù）——玊比王多一\"点\"，既讽其多一\"点\"（点球），发音又酷似C罗招牌庆祝动作\"siu\"，一语双关。\"典韦\"则谐音\"点伟\"，暗讽爱罚点球的\"阿伟罗\"。两个黑称都是罗黑圈的拆字顶流。",
    descEn:"\"Ball-King\" swaps the \"king\" character for the near-identical \"玊\" (sù) — one stroke more, mocking his love of penalties (\"one more point\"), and pronounced like his signature \"siu\" celebration. \"Penalty-Wei\" puns on \"Dian Wei\" (a historical general) and \"penalty.\" Both are top-tier wordplay insults in the Ronaldo-hater community."
  },
  {
    num:8, img:"assets/images/report/r-29.jpg", imgWebp:"assets/images/report/r-29.webp",
    name:"阿伟罗", nameEn:"Ah-Wei-Ronaldo",
    nameEs: "Ah-Wei-Ronaldo",
    periodEs: "Largo plazo · Mofa fonética",
    descEs: "Toma el «Wei» de su apellido real «Aveiro» (visto como «Ah-Wei-Luo» en chino), con el prefijo «Ah» para cachondeo — a la vez juega con su apellido paterno y apunta a su «ausencia magistral» en los partidos grandes. Uno de los apodos chinos más juguetones, a menudo emparejado con «Ball-King» y «Penalty-Wei».",
    period:"长期 · 谐音戏称", periodEn:"Long-term · Phonetic mockery",
    desc:"取C罗全名\"阿韦罗（Aveiro）\"的\"伟\"，配上\"阿\"字戏谑化，读起来像\"阿伟罗\"——既谐音父姓Aveiro，又暗讽其关键战隐身时的\"伟岸缺席\"。是中文圈对C罗最戏谑的简称之一，常与\"球玊\"\"典韦\"组合出现。",
    descEn:"Takes the \"Wei\" from his real surname \"Aveiro\" (rendered \"Ah-Wei-Luo\" in Chinese), prefixed with \"Ah\" for mockery — it both puns on his paternal surname and hints at his \"grand absence\" in big games. One of the most playful Chinese nicknames, often paired with \"Ball-King\" and \"Penalty-Wei.\""
  },
  {
    num:9, img:"assets/images/nick/nick-new-9.jpg", imgWebp:"assets/images/nick/nick-new-9.webp",
    name:"骡子", nameEn:"The Mule",
    nameEs: "El Burro",
    periodEs: "Largo plazo · Insulto fonético",
    descEs: "Un insulto fonético de «Luo», muy extendido en la comunidad hater. «El Burro» tanto se burla de que «carga stats pero no llega lejos» (invisible en eliminatorias) como que carga un claro tono insultante. Suele ir con «Penalty-Luo» y «Ball-Jade» para formar la matriz más densa de antinombres chinos.",
    period:"长期 · 谐音黑称", periodEn:"Long-term · Phonetic insult",
    desc:"\"罗\"的谐音黑称，罗黑圈子传播极广。\"骡子\"既暗讽其\"驮着数据走不远\"（淘汰赛隐身），也带明显的侮辱色彩。常与\"点罗\"\"球玉\"组合出现，构成中文互联网对C罗最密集的黑称矩阵。",
    descEn:"A phonetic insult from \"Luo,\" spread widely in the hater community. \"The Mule\" both mocks him for \"carrying stats but going nowhere\" (invisible in knockout games) and carries clear insult overtones. Often paired with \"Penalty-Luo\" and \"Ball-Jade\" to form the densest matrix of Chinese anti-nicknames."
  }
];

/* ========== 数据可视化数据（3 张图，双语 label）==========
 * titleKey/labelKey 对应 i18nDict；w=条形宽度%，val=数值文本
 */
const dataVizData = [
  {
    title:"红牌分布 (按俱乐部)", titleKey:"data.redByClub",
    rows:[
      {label:"曼联 (两段)", labelKey:"data.manUtd", w:"35%", val:"4"},
      {label:"皇家马德里", labelKey:"data.real", w:"55%", val:"6"},
      {label:"尤文图斯", labelKey:"data.juve", w:"9%", val:"1"},
      {label:"利雅得胜利", labelKey:"data.nassr", w:"9%", val:"1"},
      {label:"葡萄牙队", labelKey:"data.portugal", w:"9%", val:"1"},
      {label:"其他/未确认", labelKey:"data.other", w:"9%", val:"1"}
    ]
  },
  {
    title:"争议分类占比", titleKey:"data.catShare",
    rows:[
      {label:"人设争议", labelKey:"filter.persona", w:"28%", val:"17"},
      {label:"场内暴力", labelKey:"filter.violence", w:"15%", val:"9"},
      {label:"场外失态", labelKey:"filter.offpitch", w:"20%", val:"12"},
      {label:"俱乐部与法律", labelKey:"filter.club", w:"25%", val:"15"},
      {label:"国家队争议", labelKey:"filter.national", w:"21%", val:"13"}
    ]
  },
  {
    title:"私生活数据", titleKey:"data.private",
    rows:[
      {label:"历任女友", labelKey:"data.exGfs", w:"80%", val:"12"},
      {label:"子女数量", labelKey:"data.kids", w:"33%", val:"5"},
      {label:"孩子生母数", labelKey:"data.mothers", w:"20%", val:"3"},
      {label:"生母身份公开", labelKey:"data.momKnown", w:"40%", val:"2/5"},
      {label:"迷你罗生母", labelKey:"data.jrMom", w:"5%", val:"成谜", valEn:"Mystery"}
    ]
  }
];

