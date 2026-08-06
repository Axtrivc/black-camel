/* ============================================================
 * es-content.js — 西班牙语（ES）内容翻译（事件/金句/绰号/时间线/分类 + extra-data）
 *
 * 这是 backfill-es.js 的翻译源。每个条目带 _xxxEn 锚点字段（取自 data.js 原文），
 * 用于在源文件中精确定位插入点。翻译风格：板西/拉美足球社区俚语。
 *
 * 翻译进度（按批次）：
 *   ✅ categories (5)
 *   ✅ timeline (24)
 *   ✅ nicknames (9)
 *   ✅ quotes (48)
 *   ✅ events (61)  —— 分多批写入
 *   ✅ extra-data (pk/penalty/ledger/meme/quiz/tof/casino)
 * ============================================================ */
"use strict";

const ES_CONTENT = {};

/* ---------- 分类（catConfig）---------- */
ES_CONTENT.categories = [
  { labelEn: "Persona",       labelEs: "Personaje" },
  { labelEn: "Violence",      labelEs: "Violencia" },
  { labelEn: "Off-pitch",     labelEs: "Fuera del campo" },
  { labelEn: "Club & Law",    labelEs: "Club y Ley" },
  { labelEn: "National Team", labelEs: "Selección" }
];

/* ---------- 时间线（timelineData，24 条）---------- */
ES_CONTENT.timeline = [
  { _titleEn: 'Abandoned surname, stole "Ronaldo"',
    titleEs: 'Abandonó el apellido, robó «Ronaldo»',
    descEs: 'Su nombre completo es dos Santos Aveiro, pero tiró el apellido familiar y debutó con el segundo nombre «Ronaldo» para subirse a la fama de R9' },
  { _titleEn: "Joins Man United + Van Nistelrooy clash",
    titleEs: "Ficha por el United + bronca con Van Nistelrooy",
    descEs: "Se quedó el dorsal n.º 7 a los 18; regateador egoísta, mal definidor, aislado en el vestuario; se pilló con Van Nistelrooy y este le soltó «ve a llorarle a tu padre»" },
  { _titleEn: "Father dies + training-ground blowup",
    titleEs: "Muere su padre + explosión en el entrenamiento",
    descEs: "Su padre murió por fallo hepático por alcohol; el rapto de Van Nistelrooy en el entrenamiento cruzó la línea, Ferguson sacó al holandés para respaldar a Cristiano" },
  { _titleEn: "World Cup dive + wink that sank Rooney",
    titleEs: "Piscina en el Mundial + guiño que hundió a Rooney",
    descEs: "Se tiró contra Francia; tras la pisada de Rooney a Carvalho, Cristiano presionó al árbitro para la roja y luego guiñó al banquillo — enemigo público n.º 1 en Inglaterra" },
  { _titleEn: "Gym transformation + first Ballon d'Or",
    titleEs: "Metamorfosis en el gimnasio + primer Balón de Oro",
    descEs: "De extremo frailuno a delantero musculado; en 07/08 llevó al United a la Premier + Champions, ganando su primer Balón de Oro y Bota de Oro" },
  { _titleEn: "Las Vegas hotel incident",
    titleEs: "Incidente del hotel de Las Vegas",
    descEs: "En junio Cristiano fue acusado de agresión sexual en Las Vegas; al año siguiente pagó 375.000 $ para callar" },
  { _titleEn: "Cristiano Jr born, mom a mystery + self-awarded trophy",
    titleEs: "Nace Cristiano Jr, madre enigma + trofeo autopremiado",
    descEs: "En junio nació su primer hijo en EE. UU., madre sin desvelar; Cristiano y Mendes montaron los Globe Soccer Awards en Dubái para darse trofeos cada año" },
  { _titleEn: "Ballon d'Or extension scandal",
    titleEs: "Escándalo de la prórroga del Balón de Oro",
    descEs: "Sin títulos esa temporada, Cristiano se «robó» el Balón de Oro al pentacampeón Ribéry gracias a que la FIFA alargó la votación" },
  { _titleEn: "Image-rights backtax + injured World Cup exit",
    titleEs: "Atrasados de imagen + Mundial tocado y eliminado",
    descEs: "Pagó voluntariamente 5,5 M€ de imagen y sembró problemas; jugó el Mundial con la rodilla tocada, marcó solo uno en la fase de grupos y se fue llorando" },
  { _titleEn: "Punched Krychowiak",
    titleEs: "Le dio un puñetazo a Krychowiak",
    descEs: "Real Madrid-Sevilla, Cristiano le soltó un puñetazo en la cabeza al rival mientras corría" },
  { _titleEn: "Euro 2016 mic-toss + final lay-and-win",
    titleEs: "Euro 2016 tira el micrófono + final de tumbado y ganador",
    descEs: "Le quitó el micrófono a un periodista y lo tiró a un lago; se lesionó en el minuto 25 de la final y aun así lo vendieron como «el gran héroe»" },
  { _titleEn: "Tax case + ref-shove + Coca-Cola foreshadow",
    titleEs: "Caso fiscal + empuja al árbitro + presagio de Coca-Cola",
    descEs: "Imputado por 14,8 M€ de fraude fiscal; empujó al árbitro en la Supercopa y se llevó 5 partidos de sanción" },
  { _titleEn: "Flees Spain + joins Juventus",
    titleEs: "Huye de España + ficha por la Juventus",
    descEs: "Cerró el caso fiscal por 19 M€; se fue a la Juve para esquivar la alta fiscalidad española y arrancó su etapa de «rompeequipos»" },
  { _titleEn: "Tax-case guilty plea",
    titleEs: "Declaración de culpa en el caso fiscal",
    descEs: "En enero se declaró culpable en la vista: 2 años en suspenso + 18,8 M€ de multa, sin pisar la cárcel" },
  { _titleEn: "Juve UCL exit + pandemic value dip",
    titleEs: "Eliminación de la Juve en UCL + caída de valor por pandemia",
    descEs: "La Juve cayó en octavos de Champions contra el Lyon; la pandemia apretó la valoración del imperio CR7 mientras se profundizaba la sequía de títulos" },
  { _titleEn: "Three-Kick + Coke $40B + double armband toss",
    titleEs: "Tres-patadas + Coca-Cola 40.000 M\$ + doble brazalete tirado",
    descEs: "Le dio tres patadas a Jones en 2 segundos en el derbi; apartar las cocas secó unos 40.000 M\$ de la bolsa; tiró el brazalete de capitán dos veces" },
  { _titleEn: "Phone-smash + transfer saga + blasts United + off to Saudi",
    titleEs: "Móvil roto + circo de fichaje + destroza al United + rumbo a Arabia",
    descEs: "En abril rompió el móvil de un niño autista; en verano los 6 gigantes dijeron que no; en noviembre destrozó al United y le rompieron el contrato; fin de año en Arabia por 200 M€" },
  { _titleEn: "World Cup benched + falls out with Santos",
    titleEs: "Suplente en el Mundial + ruptura con Santos",
    descEs: "Suplente dos partidos seguidos en los cruces de Catar; se fue llorando al caer contra Marruecos; ruptura total con Santos" },
  { _titleEn: "Vegas case closed + shoves a fan",
    titleEs: "Caso de Vegas cerrado + empuja a un fan",
    descEs: "La apelación desestimó el recurso de Mayorga; tras un título empujó a un fan que se quería hacer una foto" },
  { _titleEn: "Noodle-slice + obscene gesture + scarf-in-pants",
    titleEs: "Corta-fideos + gesto obsceno + bufanda en el pantalón",
    descEs: "Hizo el gesto raro de «cortar fideos» a los fans, un gesto obsceno y se metió una bufanda rival en el pantalón — Bilibili recopiló sus «30 momentos más bizarros»" },
  { _titleEn: "First national-team red + Piers Morgan quotes",
    titleEs: "Primera roja con la selección + frases en Piers Morgan",
    descEs: "A los 40 vio su primera roja con Portugal (la 14.ª) en un clasificatorio mundialista; en noviembre volvió a Piers Morgan: «El Mundial no es un sueño», «soy el 1.º, 2.º y 3.º mejor de la historia»" },
  { _titleEn: "Desert: 4 years for 1 title",
    titleEs: "Desierto: 4 años para 1 título",
    descEs: "Tras 3,5 años en Arabia por fin ganó su primera liga, llorando de emoción después" },
  { _titleEn: "World Cup: jeered by own fans",
    titleEs: "Mundial: abucheado por sus propios fans",
    descEs: "Fuertemente abucheado por la afición de su país en el Mundial y aun así marcó dos: con 41 años y 138 días se convirtió en el más longevo en marcar un doblete en un Mundial y en marcar en 6 ediciones seguidas" },
  { _titleEn: "World Cup R16: subbed off",
    titleEs: "Mundial octavos: sustituido",
    descEs: "Portugal remontó a Croacia; Cristiano fue sustituido por Martínez en el minuto 81 con una cara muy elocuente" }
];

/* ---------- 绰号（nicknamesData，9 条）---------- */
ES_CONTENT.nicknames = [
  { _nameEn: "Little Ronaldo",
    nameEs: "Little Ronaldo", periodEs: "2003-2006 · Debut en el United",
    descEs: "Cuando llegó al United, el «Ronaldo» brasileño (R9) y Ronaldinho ya eran dioses, así que al recién llegado lo llamaron «Little Ronaldo» por antigüedad. Pelo de fideos, stepovers de exhibición y se tiraba al menor contacto — el apodo cargaba un desprecio de «hermano pequeño» que solo se quitó tras rendir a nivel de Balón de Oro." },
  { _nameEn: "Showboat Ronaldo",
    nameEs: "Showboat Ronaldo", periodEs: "2004-2007 · Etapa farolillo",
    descEs: "Adicto al regate y al truco llamativo, haciéndose una docena de stepovers por partido y malgastando ocasiones — la prensa inglesa lo bautizó como SHOWBOAT (todo estilo, cero sustancia). Van Nistelrooy y Alan Smith se pillaron con él en los entrenamientos por su estilo «todo lujo, cero pase». Sus estrafalarios conjuntos fuera del campo confirmaron el apellido de «showboat»." },
  { _nameEn: "Diver Ronaldo",
    nameEs: "Diver Ronaldo", periodEs: "2005-2007 · Etapa piscinero",
    descEs: "Una piscina contra Francia en el Mundial 2006 y otra en la FA Cup contra el Middlesbrough hicieron que la prensa inglesa lo marcara como «diver». En 2007 Ferguson se despistó y soltó «Ronaldo ya no se tira» — una admisión a la inversa de que antes sí lo hacía. De ahí se extendieron los apodos «Diver» y «Penaldo»." },
  { _nameEn: "Three-Vote Ronaldo",
    nameEs: "Three-Vote Ronaldo", periodEs: "2011-2014 · Etapa de mofa",
    descEs: "En el Mejor Jugador de la UEFA de 2011, Messi repitió y Cristiano sacó solo <strong>3 votos</strong>. Los fans lo bautizaron «Three-Vote» y los autodespreciativos lo llamaron «Vote Bro». Cuando ganó su tercer Balón de Oro en 2014, los haters lo subieron a «Three-Ball» — vaya uno a saber por qué siempre le quedaba pegado el tres." },
  { _nameEn: "Desert Camel",
    nameEs: "El Camello", periodEs: "2023–presente · Fiebre del oro saudí",
    descEs: "En 2023 Cristiano se fue al Al Nassr de Arabia por 200 M€ al año, ridiculizado como «se va al desierto a jubilarse». Acabó quedándose 4 años, ganando solo <strong>1 título de liga en 4 temporadas</strong> — contraste brutal con Messi levantando un trofeo al mes de aterrizar en Miami. «El Camello» es a la vez una pulla regional y una crítica a que «carga stats pero no sale del desierto»." },
  { _nameEn: "The Boss",
    nameEs: "El Jefe", periodEs: "2014–presente · Etapa de pico",
    descEs: "Al principio era un <strong>apodo de haters</strong> — «<em>siempre</em> depende del <em>árbitro</em>» — burlándose de que sus goles venían de favores arbitrales y penales. Pero su imagen dominante, el imperio comercial CR7 y su estilo de ricachón playboy hicieron que «El Jefe» se queriera irónicamente, adoptado por los fans como insignia y convirtiéndose en su etiqueta más sonora." },
  { _nameEn: "Ball-King / Penalty-Wei",
    nameEs: "Ball-King / Penalty-Wei", periodEs: "2015–presente · Etapa de autoproclamado rey",
    descEs: "«Ball-King» cambia el carácter «rey» por el casi idéntico «玊» (sù) — un trazo de más, burla a su amor por los penales («un punto más»), y pronunciado parecido a su celebración «siu». «Penalty-Wei» juega con «Dian Wei» (un general histórico) y «penal». Ambos son juegos de palabras de primer nivel en la comunidad de haters de Cristiano." },
  { _nameEn: "Ah-Wei-Ronaldo",
    nameEs: "Ah-Wei-Ronaldo", periodEs: "Largo plazo · Mofa fonética",
    descEs: "Toma el «Wei» de su apellido real «Aveiro» (visto como «Ah-Wei-Luo» en chino), con el prefijo «Ah» para cachondeo — a la vez juega con su apellido paterno y apunta a su «ausencia magistral» en los partidos grandes. Uno de los apodos chinos más juguetones, a menudo emparejado con «Ball-King» y «Penalty-Wei»." },
  { _nameEn: "The Mule",
    nameEs: "El Burro", periodEs: "Largo plazo · Insulto fonético",
    descEs: "Un insulto fonético de «Luo», muy extendido en la comunidad hater. «El Burro» tanto se burla de que «carga stats pero no llega lejos» (invisible en eliminatorias) como que carga un claro tono insultante. Suele ir con «Penalty-Luo» y «Ball-Jade» para formar la matriz más densa de antinombres chinos." }
];

/* ---------- 事件（events，61 条）---------- */
/* 结构：{ id, _titleEn, _authorEn(quote), titleEs, summaryEs, dateEs, locationEs, detailEs:[...], quoteEs:{textEs,authorEs} }
 * _titleEn / _authorEn 锚点由 backfill-es.js 的 enrichAnchors() 从 i18n_export.json 按 id 自动补齐。
 * 翻译分批写入 scripts/es-batches/events-N.js，此处合并。 */
ES_CONTENT.events = [];
try {
  const batches = [1, 2, 3, 4];
  batches.forEach((n) => {
    try {
      const batch = require("./es-batches/events-" + n + ".js");
      ES_CONTENT.events = ES_CONTENT.events.concat(batch);
    } catch (e) {}
  });
} catch (e) {}

/* ---------- 金句（quotes，48 条）---------- */
/* 结构：{ _textEn, _authorEn, textEs, authorEs } —— _En 锚点由 backfill-es.js 用 i18n_export.json 按 textEn 匹配补齐。
 * 这里直接写 _textEn/_authorEn 以保证锚点稳定（取自导出快照）。 */
ES_CONTENT.quotes = [
  { _textEn: "I feel betrayed. The people at Manchester United — the coach, the hierarchy — they betrayed me.", _authorEn: "Cristiano, 2022 Piers Morgan interview",
    textEs: "Me siento traicionado. La gente del Manchester United —el entrenador, la directiva— me ha traicionado.", authorEs: "Cristiano, entrevista con Piers Morgan de 2022" },
  { _textEn: "I'm here, not Messi!", _authorEn: "Cristiano, responding to fan taunts in the Saudi league",
    textEs: "¡Estoy yo, no Messi!", authorEs: "Cristiano, respondiendo a los cánticos de los aficionados en la liga saudí" },
  { _textEn: "Drink water, not Coca-Cola.", _authorEn: "Cristiano, Euro 2020 press conference",
    textEs: "Bebe agua, no Coca-Cola.", authorEs: "Cristiano, rueda de prensa de la Eurocopa 2020" },
  { _textEn: "The World Cup is not my dream. I am the first, second and third best in history.", _authorEn: "Cristiano, Nov 2025 Piers Morgan interview",
    textEs: "El Mundial no es mi sueño. Soy el primero, segundo y tercero mejor de la historia.", authorEs: "Cristiano, entrevista con Piers Morgan, noviembre de 2025" },
  { _textEn: "I get booed because I'm handsome, rich and play brilliantly — people are just jealous.", _authorEn: "Cristiano, after the 2016 Ballon d'Or, responding to criticism",
    textEs: "Me abuchean porque soy guapo, rico y juego de maravilla — la gente simplemente me tiene envidia.", authorEs: "Cristiano, tras el Balón de Oro de 2016, respondiendo a las críticas" },
  { _textEn: "The only reason you're investigating me is because I'm Cristiano Ronaldo.", _authorEn: "Cristiano, 2017 tax-fraud court hearing",
    textEs: "La única razón por la que me investigáis es porque soy Cristiano Ronaldo.", authorEs: "Cristiano, vista del juicio por fraude fiscal de 2017" },
  { _textEn: "Factos! Factos! Factos!", _authorEn: "Cristiano, comments spammed under Messi's post after losing the 2021 Ballon d'Or",
    textEs: "¡Factos! ¡Factos! ¡Factos!", authorEs: "Cristiano, comentarios lanzados en serie bajo el post de Messi tras perder el Balón de Oro 2021" },
  { _textEn: "I'm 1000% at peace with my conscience. I scored 3 goals under pressure, my performance was not bad.", _authorEn: "Cristiano, press conference the day before the 2026 World Cup R16",
    textEs: "Estoy 1000% en paz con mi conciencia. Marqué 3 goles bajo presión, mi rendimiento no fue malo.", authorEs: "Cristiano, rueda de prensa del día antes de los octavos del Mundial 2026" },
  { _textEn: "Before me, Portugal had won nothing. I won them three trophies — the Euros are no less than the World Cup.", _authorEn: "Cristiano, defending himself after the 2026 World Cup exit",
    textEs: "Antes de mí, Portugal no había ganado nada. Les conseguí tres trofeos — la Eurocopa no es menos que el Mundial.", authorEs: "Cristiano, defendiéndose tras la eliminación del Mundial 2026" },
  { _textEn: "No matter what tomorrow, I'm 1000% at peace with my conscience.", _authorEn: "Cristiano, pre-match press conference (the same line reused after — mocked for 'memorizing lines even when losing')",
    textEs: "Pase lo que pase mañana, estoy 1000% en paz con mi conciencia.", authorEs: "Cristiano, rueda de prensa pre-partido (la misma frase reciclada después — objeto de burla por «memorizar el guion incluso al perder»)" },
  { _textEn: "Ditching the family name Aveiro — apart from chasing hype and covering up the truth, there's really no other explanation.", _authorEn: "Zhihu football commentary, on abandoning the surname",
    textEs: "Tirar el apellido familiar Aveiro — además de perseguir el bombo y tapar la verdad, de verdad no le veo otra explicación.", authorEs: "Comentario de fútbol en Zhihu, sobre el abandono del apellido" },
  { _textEn: "I prefer someone who's the same inside and out, who doesn't change his name — that reads as more real, more confident.", _authorEn: "NetEase Sports commentary",
    textEs: "Prefiero a alguien que es igual por dentro y por fuera, que no cambia de nombre — eso se lee como más real, más seguro de sí mismo.", authorEs: "Comentario de NetEase Sports" },
  { _textEn: "Whether facing fans, journalists, referees or opponents, in his 20s or at 39, Cristiano easily loses his head.", _authorEn: "Tencent Sports commentary",
    textEs: "Sea ante aficionados, periodistas, árbitros o rivales, ya sea con veintitantos o a los 39, a Cristiano le suele ir la cabeza fácilmente.", authorEs: "Comentario de Tencent Sports" },
  { _textEn: "2013 broke the rules; 2010 stayed within them.", _authorEn: "Zhihu football commentary, on the Ballon d'Or extension scandal",
    textEs: "En 2013 se rompieron las reglas; en 2010 todo fue dentro de ellas.", authorEs: "Comentario de fútbol en Zhihu, sobre el escándalo de la prórroga del Balón de Oro" },
  { _textEn: "Almost 4 years in Saudi! Cristiano finally wins the league!", _authorEn: "The Paper, May 22, 2026",
    textEs: "¡Casi 4 años en Arabia Saudí! ¡Cristiano por fin gana la liga!", authorEs: "The Paper, 22 de mayo de 2026" },
  { _textEn: "Six World Cups, nine knockout games, one single goal, zero trophies — the end of the \"GOAT\" is a report card full of zeros.", _authorEn: "ESPN, after the 2026 World Cup R16",
    textEs: "Seis Mundiales, nueve partidos de eliminatoria, un solo gol, cero trofeos — el final del «GOAT» es un boletín lleno de ceros.", authorEs: "ESPN, tras los octavos del Mundial 2026" },
  { _textEn: "The King leaves without his crown.", _authorEn: "LiveMint, headline after Portugal's 2026 World Cup exit",
    textEs: "El Rey se va sin su corona.", authorEs: "LiveMint, titular tras la eliminación de Portugal en el Mundial 2026" },
  { _textEn: "He went off injured in the 25th minute of the Euro 2016 final; substitute Éder's long shot won the trophy — yet the story's protagonist always has to be him.", _authorEn: "Titan Sports, post-2026 World Cup commentary",
    textEs: "Se lesionó en el minuto 25 de la final de la Eurocopa 2016; el disparo lejano del suplente Éder ganó el trofeo — y aun así, el protagonista de la historia siempre tiene que ser él.", authorEs: "Titan Sports, comentario post-Mundial 2026" },
  { _textEn: "This isn't losing a match — it's being a sore loser. After every exit, the lead role of the script can only ever be him.", _authorEn: "Phoenix Sports, on the \"clear conscience\" rhetoric",
    textEs: "Esto no es perder un partido — es ser un mal perdedor. Tras cada eliminación, el papel protagonista del guion solo puede ser él.", authorEs: "Phoenix Sports, sobre la retórica de la «conciencia tranquila»" },
  { _textEn: "Plant a line before the match, repeat the same line after — even when you lose you win the rhetoric. That's \"champion mentality.\"", _authorEn: "Zhihu, on Cristiano's post-match talking template",
    textEs: "Planta una frase antes del partido, repite la misma frase después — incluso cuando pierdes, ganas la retórica. Eso es «mentalidad de campeón».", authorEs: "Zhihu, sobre la plantilla de declaraciones post-partido de Cristiano" },
  { _textEn: "If you're Cristiano's teammate, be ready: the ball is his, and so is the camera.", _authorEn: "Anonymous former Real Madrid teammate, Marca column",
    textEs: "Si eres compañero de Cristiano, prepárate: el balón es suyo, y la cámara también.", authorEs: "Excompañero anónimo del Real Madrid, columna en Marca" },
  { _textEn: "For Cristiano, a game without a goal is a failed game — even if the team won.", _authorEn: "Xavi, Barcelona legend",
    textEs: "Para Cristiano, un partido sin gol es un partido fallido — aunque el equipo haya ganado.", authorEs: "Xavi, leyenda del Barcelona" },
  { _textEn: "I saw Cristiano kick him three times with my own eyes! Yet the referee told me it wasn't a red.", _authorEn: "Jürgen Klopp, Liverpool manager",
    textEs: "¡Vi a Cristiano darle tres patadas con mis propios ojos! Y, aun así, el árbitro me dijo que no era roja.", authorEs: "Jürgen Klopp, entrenador del Liverpool" },
  { _textEn: "A man forever chasing the World Cup trophy yet always one step short — but in the group photo, he won't yield center stage by an inch.", _authorEn: "Sina Sports, 2026 World Cup farewell feature",
    textEs: "Un hombre persiguiendo para siempre el trofeo del Mundial y siempre a un paso de conseguirlo — pero en la foto de grupo, no cede el centro ni un centímetro.", authorEs: "Sina Sports, reportaje de despedida del Mundial 2026" },
  { _textEn: "Smashing phones, throwing mics, tossing armbands, obscene gestures — this isn't star temper, it's losing control.", _authorEn: "BBC Sport, rounding up Cristiano's off-pitch meltdowns",
    textEs: "Romper móviles, lanzar micrófonos, tirar brazaliales, gestos obscenos — esto no es carácter de estrella, es perder el control.", authorEs: "BBC Sport, recopilando los berrinches de Cristiano fuera del campo" },
  { _textEn: "It's not that he lacks talent — it's that on top of his talent there's a layer of self that can never be filled.", _authorEn: "Tencent Sports, in-depth profile",
    textEs: "No es que le falte talento — es que encima de su talento hay una capa de ego que nunca se puede llenar.", authorEs: "Tencent Sports, perfil en profundidad" },
  { _textEn: "$40 billion in market cap wiped out by one line, \"drink water, not Coke\" — the price of arrogance paid by shareholders.", _authorEn: "CNN, on the 2021 Coca-Cola incident",
    textEs: "40.000 millones de dólares de capitalización esfumados por una frase, «bebe agua, no Coca-Cola» — el precio de la arrogancia lo pagan los accionistas.", authorEs: "CNN, sobre el incidente de Coca-Cola de 2021" },
  { _textEn: "Padding stats in Saudi and simply adding them to his European totals — that's water-injected by definition.", _authorEn: "Hupu, on the value of Saudi-league goals",
    textEs: "Inflar cifras en Arabia y simplemente sumarlas a sus totales europeos — eso es, por definición, estadística aguada.", authorEs: "Hupu, sobre el valor de los goles saudíes" },
  { _textEn: "He's the most self-centred player I've ever coached.", _authorEn: "José Mourinho, former Real Madrid manager",
    textEs: "Es el jugador más egocéntrico que he entrenado nunca.", authorEs: "José Mourinho, exentrenador del Real Madrid" },
  { _textEn: "If a teammate's red card can be met with a wink and a smile, then this idea of winning is already pathological.", _authorEn: "Daily Mirror, on the 2006 World Cup \"wink gate\"",
    textEs: "Si la roja de un compañero puede recibirse con un guiño y una sonrisa, entonces esta idea de ganar ya es patológica.", authorEs: "Daily Mirror, sobre el «guiñogate» del Mundial 2006" },
  { _textEn: "He doesn't fight for Portugal — he fights for \"Cristiano Ronaldo.\"", _authorEn: "Portuguese daily A Bola, after the 2022 World Cup benching saga",
    textEs: "No lucha por Portugal — lucha por «Cristiano Ronaldo».", authorEs: "Diario portugués A Bola, tras la polémica del banquillo en el Mundial 2022" },
  { _textEn: "A €700M release clause can't buy a No.7 willing to track back for the team.", _authorEn: "Cadena SER, reporting late-era Real Madrid dressing-room splits",
    textEs: "Una cláusula de rescisión de 700 M€ no puede comprar un n.º 7 dispuesto a replegarse por el equipo.", authorEs: "Cadena SER, sobre las tensiones en el vestuario del Real Madrid tardío" },
  { _textEn: "Who is Cristiano Jr's mother? He won't say a word — a man who's turned his whole life into an NDA.", _authorEn: "Zhihu Tianxia, on the Cristiano Jr. mother mystery",
    textEs: "¿Quién es la madre de Cristiano Jr? No dice ni una palabra — un hombre que ha convertido toda su vida en un acuerdo de confidencialidad.", authorEs: "Zhihu Tianxia, sobre el misterio de la madre de Cristiano Jr" },
  { _textEn: "Twelve girlfriends, five children, three mothers — he's turned his private life into a transfer market.", _authorEn: "Tencent Entertainment, rounding up Cristiano's dating history",
    textEs: "Doce novias, cinco hijos, tres madres — ha convertido su vida privada en un mercado de fichajes.", authorEs: "Tencent Entertainment, recopilando el historial amoroso de Cristiano" },
  { _textEn: "Badmouthing the club, the coach and his teammates right before his contract ends — that's not whistle-blowing, it's the standard burn-the-bridge play.", _authorEn: "Sky Sports, on the Piers Morgan United blast",
    textEs: "Hablarmeal del club, del entrenador y de los compañeros justo antes de que acabe su contrato — eso no es denunciar, es la jugada estándar de quemar los puentes.", authorEs: "Sky Sports, sobre el destrozo al United en Piers Morgan" },
  { _textEn: "He keeps saying United betrayed him, forgetting who gave a mid-season interview that put the club on the cross.", _authorEn: "Gary Neville, commenting after the 2022 Morgan interview",
    textEs: "Sigue diciendo que el United le traicionó, olvidando quién dio una entrevista a mitad de temporada que puso al club en la cruz.", authorEs: "Gary Neville, comentando tras la entrevista con Morgan de 2022" },
  { _textEn: "The look on his face when subbed off was uglier than the 0-5 on the scoreboard.", _authorEn: "The Sun, on the 0-5 Northwest Derby debacle",
    textEs: "La cara que puso al ser sustituido era más fea que el 0-5 del marcador.", authorEs: "The Sun, sobre el descalabro 0-5 en el derbi del Norte" },
  { _textEn: "Saudi gave him a €200M salary; he gave Saudi a sniff about \"European standards.\"", _authorEn: "Al Arabiya, on Cristiano's first Saudi season",
    textEs: "Arabia le dio un sueldo de 200 M€; él le dio a Arabia un desdén sobre los «estándares europeos».", authorEs: "Al Arabiya, sobre la primera temporada saudí de Cristiano" },
  { _textEn: "He's not chasing goals, he's chasing cameras; not wins, but personal wins.", _authorEn: "Diario AS column, late-peak Cristiano commentary",
    textEs: "No persigue goles, persigue cámaras; no victorias, sino victorias personales.", authorEs: "Columna de Diario AS, comentario sobre el Cristiano del final de su pico" },
  { _textEn: "Loses the Ballon d'Or, blame the rules; loses the World Cup, blame the coach; loses the league, blame his teammates — he never loses, he only ever gets \"framed.\"", _authorEn: "Zhihu top comment, on Cristiano's blame patterns",
    textEs: "Pierde el Balón de Oro, culpa a las reglas; pierde el Mundial, culpa al entrenador; pierde la liga, culpa a los compañeros — nunca pierde, solo le «enmarcan».", authorEs: "Comentario destacado de Zhihu, sobre los patrones de culpa de Cristiano" },
  { _textEn: "The so-called \"discipline benchmark\" — the moment he loses, his first thought is how to extract himself from blame.", _authorEn: "Hupu, on the \"clear conscience\" style of statement",
    textEs: "El supuesto «referente de disciplina» — en el momento en que pierde, su primer pensamiento es cómo sacar su propia responsabilidad de la culpa.", authorEs: "Hupu, sobre el estilo de declaración de «conciencia tranquila»" },
  { _textEn: "He uses his goal tally to prove he's great, and his red-card tally to prove he's out of control.", _authorEn: "Marca, on Cristiano's Real Madrid red cards",
    textEs: "Usa sus cifras goleadoras para demostrar que es grande, y sus cifras de tarjetas rojas para demostrar que está fuera de control.", authorEs: "Marca, sobre las rojas de Cristiano en el Real Madrid" },
  { _textEn: "A man who trademarked his celebration — football was never a team sport to him.", _authorEn: "ESPN, on the commercialisation of the \"SIU\" celebration",
    textEs: "Un hombre que registró su celebración como marca — el fútbol nunca fue un deporte de equipo para él.", authorEs: "ESPN, sobre la comercialización de la celebración «SIU»" },
  { _textEn: "You think he's a hero — but to the fans he's shoved and the mics he's thrown, he's just an out-of-control rich man.", _authorEn: "NetEase Sports, after the 2024 \"noodle-slice\" gesture incident",
    textEs: "Creéis que es un héroe — pero para los aficionados a los que ha empujado y los micrófonos que ha lanzado, no es más que un ricachón fuera de control.", authorEs: "NetEase Sports, tras el incidente del gesto «corta-fideos» de 2024" },
  { _textEn: "14 red cards — losing it once every 200 games or so. So much for \"the 1st, 2nd and 3rd best in history.\"", _authorEn: "OPTA data dig, on Cristiano's red-card distribution",
    textEs: "14 tarjetas rojas — perdiendo los papeles una vez cada 200 partidos más o menos. Así es como es «el 1.º, 2.º y 3.º mejor de la historia».", authorEs: "Análisis de datos de OPTA, sobre la distribución de rojas de Cristiano" },
  { _textEn: "His self-appointed \"GOAT\" title can't be filled by a single World Cup knockout goal across six editions.", _authorEn: "Argentine daily Olé, after Portugal's 2026 World Cup exit",
    textEs: "Su título autoproclamado de «GOAT» no se puede llenar con un solo gol en eliminatoria del Mundial a lo largo de seis ediciones.", authorEs: "Diario argentino Olé, tras la eliminación de Portugal en el Mundial 2026" },
  { _textEn: "Even at his own \"last dance\" send-off, he managed to drag the camera back onto himself.", _authorEn: "Hindustan Times, on the 2026 World Cup farewell",
    textEs: "Incluso en su propia despedida de «última danza», fue capaz de arrastrar la cámara de vuelta hacia él.", authorEs: "Hindustan Times, sobre la despedida del Mundial 2026" },
  { _textEn: "For others, retirement is a curtain call; for him, it's \"someone must be held responsible for me not winning a title.\"", _authorEn: "Reddit r/soccer top comment, on Cristiano's farewell stance",
    textEs: "Para los demás, la retirada es una clausura; para él, es «alguien tiene que responder de que yo no gane un título».", authorEs: "Comentario destacado de Reddit r/soccer, sobre la postura de despedida de Cristiano" }
];

/* ---------- extra-data 翻译 ---------- */
/* 锚点 _En 取自 extra-data.js 原文，合并由 backfill-extra-es.js 按 labelEn/descEn/qEn/textEn 匹配。 */

/* === pkData (8) === */
ES_CONTENT.pkData = [
  { _labelEn: "Career red cards", labelEs: "Rojas en la carrera", subEs: "¿Quién es más violento?",
    cr7NoteEs: "Man Utd 4 + Real Madrid 6 + Juve 1 + Al Nassr 1 + Portugal 1 + otras 1", messiNoteEs: "Incluida la roja a los 43 segundos en su debut de 2005",
    tipEs: "14 : 3 — Cristiano tiene casi 5 veces las rojas de Messi" },
  { _labelEn: "World Cup knockout goals", labelEs: "Goles en eliminatorias del Mundial", subEs: "El boletín real en seis Mundiales",
    cr7NoteEs: "1 gol en 9 partidos de eliminatoria en seis Mundiales (rompió la sequía en 2026 y luego España lo eliminó con un gol en el descuento)", messiNoteEs: "Coronado en la final de 2022; decisivo en varias eliminatorias",
    tipEs: "1 gol en 9 eliminatorias vs el título de Messi en 2022" },
  { _labelEn: "Career penalty goals", labelEs: "Goles de penalti en la carrera", subEs: "Dependencia del penalti",
    cr7NoteEs: "Lanzó 208, ~1/6 de sus goles en la carrera", messiNoteEs: "Lanzó unos 140",
    tipEs: "66 penales más marcados que Messi" },
  { _labelEn: "Days to first title at new club", labelEs: "Días hasta el primer título en el nuevo club", subEs: "Arabia vs Miami",
    cr7NoteEs: "Al Nassr — ~4 años para ganar la liga", messiNoteEs: "Inter Miami — ~1 mes para ganar la Leagues Cup",
    tipEs: "1460 días vs 30 días — 48 veces más lento" },
  { _labelEn: "Ballon d'Or wins", labelEs: "Balones de Oro", subEs: "El gran contador",
    cr7NoteEs: "2008/2013/2014/2016/2017", messiNoteEs: "8 en total, 2009–2023",
    tipEs: "5 : 8 — tres Balones de Oro por detrás" },
  { _labelEn: "Recent free-kick drought (days)", labelEs: "Sequía reciente de falta (días)", subEs: "El mito del cañonero",
    cr7NoteEs: "0 goles en 59 intentos en liga", messiNoteEs: "Paló al palo con una falta contra Nigeria en el Mundial 2022",
    tipEs: "600 días, 0 goles vs Messi sigue generando peligro" },
  { _labelEn: "National-team goals vs minnows", labelEs: "Goles con la selección contra equipos pequeños", subEs: "Inflar stats",
    cr7NoteEs: "Luxemburgo 11 + Lituania 7 + Suecia 7", messiNoteEs: "Los rivales principales son selecciones sudamericanas fuertes",
    tipEs: "11 goles solo contra Luxemburgo" },
  { _labelEn: "\"Diving\" highlights", labelEs: "Momentos «piscineros»", subEs: "El arte de tirarse",
    cr7NoteEs: "Piscina en el Mundial 2006; la prensa inglesa lo bautizó «Diver» / «Penaldo»", messiNoteEs: "Alguna caída controvertida, pero nunca se ganó un apodo por ello",
    tipEs: "«Penaldo» vs Messi — ahí no hay meme" }
];

/* === penaltyData.items (9) + totalLabel === */
ES_CONTENT._penaltyTotalLabelEn = "Overall Purity";
ES_CONTENT.penaltyTotalLabel = "Pureza Total";
ES_CONTENT.penaltyItems = [
  { _labelEn: "Career penalty goals", labelEs: "Goles de penalti en la carrera", valueEs: "175", unitEs: "goles", noteEs: "~1/6 de sus goles en la carrera; lanzó 208" },
  { _labelEn: "Minnow-padding for country", labelEs: "Inflar stats contra minnows con la selección", valueEs: "11 vs Luxemburgo", unitEs: "", noteEs: "Lituania/Suecia 7 cada uno, incluido un póker" },
  { _labelEn: "Saudi conquest speed", labelEs: "Velocidad de conquista saudí", valueEs: "4 años, 1 título", unitEs: "", noteEs: "Compará a Messi ganando con Miami en 1 mes" },
  { _labelEn: "Free-kick drought", labelEs: "Sequía de faltas", valueEs: "600 días", unitEs: "0 goles", noteEs: "0 en 59 intentos en liga" },
  { _labelEn: "World Cup knockouts", labelEs: "Eliminatorias del Mundial", valueEs: "9 partidos, 1 gol", unitEs: "", noteEs: "1 gol en 9 partidos de eliminatoria en seis Mundiales; rompió la sequía en 2026 y luego España lo eliminó con un gol en el descuento" },
  { _labelEn: "Champions League invisibility", labelEs: "Invisibilidad en Champions", valueEs: "Últimos 5 años", unitEs: "", noteEs: "Varios partidos clave con 0 disparos a puerta o siendo sustituido" },
  { _labelEn: "Social-media water content", labelEs: "Contenido «agua» en redes sociales", valueEs: "24,3%", unitEs: "seguidores falsos", noteEs: "De 600 M de seguidores, ~50–100 M son falsos" },
  { _labelEn: "Single-season shot monopoly", labelEs: "Monopolio de disparos en una temporada", valueEs: "135 disparos", unitEs: "", noteEs: "Bale 50 + Benzema 60 = todavía menos que él solo" },
  { _labelEn: "Saudi penalty share", labelEs: "Porcentaje de penales saudíes", valueEs: "35 incl. penales", unitEs: "", noteEs: "Una gran parte de los goles de 2023/24 vinieron de penales" }
];

/* === moneyLedger (9) === */
ES_CONTENT.moneyLedger = [
  { _descEn: "Coca-Cola market-cap wipeout", descEs: "Esfumado de la capitalización de Coca-Cola", detailEs: "Euro 2020 — apartó dos botellas de Coke, acción 56,10 → 55,22", catEs: "Fuera del campo" },
  { _descEn: "Career total earnings", descEs: "Ingresos totales de la carrera", detailEs: "Primer futbolista de un deporte de equipo en superar los 1.000 millones de dólares en ingresos de carrera", catEs: "Dinero" },
  { _descEn: "Al Nassr yearly salary", descEs: "Sueldo anual del Al Nassr", detailEs: "Huyó a Arabia, ridiculizado como «se va al desierto a jubilarse»", catEs: "Dinero" },
  { _descEn: "Spanish tax-fraud fine", descEs: "Multa por fraude fiscal en España", detailEs: "Impuesto + intereses + multa (vs solo 4,1 M€ para Messi)", catEs: "Legal" },
  { _descEn: "Juventus transfer fee", descEs: "Fichaje por la Juventus", detailEs: "Un traspaso bomba a los 33 años", catEs: "Dinero" },
  { _descEn: "Las Vegas hush money", descEs: "Dinero para callar en Las Vegas", detailEs: "Incidente de 2009, pagado después para mantener el silencio", catEs: "Legal" },
  { _descEn: "Van Nistelrooy sold off cheap", descEs: "Van Nistelrooy vendido barato", detailEs: "Traspasado a bajo precio tras una bronca en el entrenamiento", catEs: "Conflicto" },
  { _descEn: "Tossed armband auction price", descEs: "Precio de subasta del brazalete tirado", detailEs: "Financió el tratamiento de un bebé con AME — una nota positiva", catEs: "Conflicto" },
  { _descEn: "FA fine for smashing a phone", descEs: "Multa de la FA por romper un móvil", detailEs: "+ 2 partidos de sanción", catEs: "Conflicto" }
];

/* === memePresets (12) === */
ES_CONTENT.memePresets = [
  { _topEn: "My surname is Aveiro", topEs: "Mi apellido es Aveiro", bottomEs: "Pero yo insisto en Ronaldo" },
  { _topEn: "Penalty scored!", topEs: "¡Penal anotado!", bottomEs: "siuuuuuuu" },
  { _topEn: "1 goal in 8 World Cup knockouts", topEs: "1 gol en 8 eliminatorias del Mundial", bottomEs: "Pero soy el 1.º, 2.º y 3.º mejor" },
  { _topEn: "4 years for 1 Saudi title", topEs: "4 años para 1 título saudí", bottomEs: "El Camello del Desierto no es por gusto" },
  { _topEn: "Messi won the World Cup", topEs: "Messi ganó el Mundial", bottomEs: "¡Factos! ¡Factos! ¡Factos!" },
  { _topEn: "I tossed an armband/phone/mic again", topEs: "Volví a tirar un brazalete/móvil/micrófono", bottomEs: "Esta vez culpa del árbitro" },
  { _topEn: "14 red cards", topEs: "14 tarjetas rojas", bottomEs: "Todos me provocaron" },
  { _topEn: "24% of my 600M fans are fake", topEs: "El 24% de mis 600 M de fans son falsos", bottomEs: "Pero los likes son reales" },
  { _topEn: "The coach won't start me", topEs: "El entrenador no me alinea", bottomEs: "Así que destrozo al United y me voy a Arabia" },
  { _topEn: "0 free-kick goals in 600 days", topEs: "0 goles de falta en 600 días", bottomEs: "Recé un conjuro pero no funcionó" },
  { _topEn: "I scored 11 against Luxembourg", topEs: "Le metí 11 a Luxemburgo", bottomEs: "Soy el máximo goleador histórico de la selección" },
  { _topEn: "You don't respect me", topEs: "No me respetáis", bottomEs: "Así que tiro el brazalete y me voy" }
];

/* === quizData (25) === */
ES_CONTENT.quizData = [
  { _qEn: "Roughly how many red cards has Cristiano Ronaldo collected in his career?", qEs: "¿Cuántas tarjetas rojas ha visto Cristiano Ronaldo a lo largo de su carrera, aproximadamente?",
    optsVEs: ["3","8","14","20"], fbEs: "Correcto: 14. Man Utd 4 + Real Madrid 6 + Juve 1 + Al Nassr 1 + Portugal 1 + otras 1 — casi 5 veces las 3 de Messi." },
  { _qEn: "As of 2026, how many goals has Cristiano scored in World Cup knockout matches?", qEs: "A fecha de 2026, ¿cuántos goles ha marcado Cristiano en partidos eliminatorios del Mundial?",
    optsVEs: ["0","1","3","8"], fbEs: "Correcto: 1. Un gol en 9 partidos de eliminatoria en seis Mundiales — por fin rompió la sequía en 16avos de 2026, y en octavos España lo eliminó con un gol en el descuento. Compará con Messi, que brilló en la misma fase y ganó el título de 2022." },
  { _qEn: "Roughly how many penalties has Cristiano scored in his career?", qEs: "¿Cuántos penales ha marcado Cristiano en su carrera, aproximadamente?",
    optsVEs: ["Uns 50","Uns 109","Uns 175","Uns 250"], fbEs: "Correcto: unos 175 (de 208 lanzados) — casi 1/6 de sus goles en la carrera. Messi tiene unos 109, eso son 66 penales menos." },
  { _qEn: "The English press dubbed Cristiano \"Diver\" — what habit inspired it?", qEs: "La prensa inglesa bautizó a Cristiano como «Diver» (simulador) — ¿qué costumbre lo inspiró?",
    optsVEs: ["Simulaba constantemente buscando faltas","Saltaba a la piscina a celebrar después del partido","Se tiraba en los entrenamientos para relajarse","Era buceador antes de ser futbolista"], fbEs: "Por sus simulaciones constantes. Tras la piscina contra Francia en el Mundial 2006, la prensa inglesa lo llamó «Diver»; el apodo «Penaldo» nació de ahí." },
  { _qEn: "After joining Al Nassr, how long did Cristiano wait for his first league title?", qEs: "Tras fichar por el Al Nassr, ¿cuánto tardó Cristiano en ganar su primer título de liga?",
    optsVEs: ["Uns 1 mes","Uns medio año","Uns 1 año","Uns 4 años"], fbEs: "Correcto: unos 1460 días (≈4 años). Compará con Messi, que ganó con el Inter Miami en ~1 mes: 48 veces más rápido." },
  { _qEn: "Cristiano pads his national-team tally heavily — how many has he scored against Luxembourg alone?", qEs: "Cristiano infla mucho sus cifras con la selección — ¿cuántos goles le metió solo a Luxemburgo?",
    optsVEs: ["3","7","11","20"], fbEs: "Correcto: 11. Luxemburgo 11 + Lituania 7 + Suecia 7. Una parte importante de sus goles con Portugal son contra equipos pequeños." },
  { _qEn: "Roughly how long did Cristiano's league free-kick goal drought last?", qEs: "¿Cuánto duró, aproximadamente, la sequía goleadora de Cristiano en faltas de liga?",
    optsVEs: ["Uns 50 días","Uns 200 días","Uns 600 días","Nunca marcó una falta"], fbEs: "Correcto: unos 600 días y 0 goles, con 0 en 59 intentos en liga. Su mito de «cañonero de faltas» no se sostiene con los datos recientes." },
  { _qEn: "Ballon d'Or count — Cristiano vs Messi?", qEs: "Conteo de Balones de Oro — ¿Cristiano vs Messi?",
    optsVEs: ["8 : 5","5 : 8","5 : 5","7 : 6"], fbEs: "Correcto: 5 : 8. Cristiano tiene 5 (2008/13/14/16/17); Messi tiene 8. Tres Balones de Oro por detrás." },
  { _qEn: "In 2017 the Spanish court ruled on Cristiano's tax fraud — what were the evaded amount and fine roughly?", qEs: "En 2017 el tribunal español dictaminó sobre el fraude fiscal de Cristiano — ¿cuál era, aproximadamente, la cantidad defraudada y la multa?",
    optsVEs: ["Uns 2 M / multa 500 mil","Uns 14,7 M / multa 18,8 M","Uns 50 M / multa 100 M","Nunca defraudó"], fbEs: "Correcto: ~14,7 M€ defraudados; tras declararse culpable, una multa de ~18,8 M€. 3,6 veces lo que defraudó Messi." },
  { _qEn: "In the 2006 World Cup \"wink-gate\", which club teammate did Cristiano get sent off?", qEs: "En el «guiñogate» del Mundial 2006, ¿a qué compañero de club hicieron expulsar por la presión de Cristiano?",
    optsVEs: ["Rooney","Giggs","Scholes","Ferdinand"], fbEs: "Correcto: Wayne Rooney. Tras la expulsión de Rooney por pisotón a Carvalho, las cámaras cazaron a Cristiano guiñando el ojo al banquillo. Enemigo público n.º 1 en Inglaterra." },
  { _qEn: "At the Euro 2021 press conference, Cristiano moved the Coke bottles — about how much market cap evaporated?", qEs: "En la rueda de prensa de la Euro 2021, Cristiano apartó las botellas de Coke — ¿cuánto se esfumó de la capitalización aproximadamente?",
    optsVEs: ["Uns 40 M de dólares","Uns 400 M de dólares","Uns 4.000 M de dólares","Nada"], fbEs: "Correcto: ~4.000 M$ (~4 mil millones). Una frase — «bebe agua, no Coke» — y la acción de Coca-Cola se desplomó." },
  { _qEn: "The phone Cristiano smashed at Goodison Park belonged to a young fan — what was the situation?", qEs: "El móvil que Cristiano rompió en Goodison Park era de un joven aficionado — ¿cuál era la situación?",
    optsVEs: ["Aficionado adulto profesional","Aficionado autista","Aficionado del equipo visitante","Familiar de un jugador rival"], fbEs: "Correcto: un niño autista. Furioso tras la derrota, Cristiano le golpeó el móvil de la mano. La FA lo multó con 50.000 £ y 2 partidos." },
  { _qEn: "Cristiano threw his captain's armband twice — at which tournament?", qEs: "Cristiano tiró el brazalete de capitán dos veces — ¿en qué torneo?",
    optsVEs: ["Clasificatorio del Mundial 2022","Eurocopa 2021","Mundial 2018","Eurocopa 2016"], fbEs: "Correcto: la Eurocopa 2021 (2020 disputada en 2021). Lo tiró tras un gol mal anulado en el clasificatorio y de nuevo tras quedar eliminados." },
  { _qEn: "What's the story behind Cristiano's \"carried to a title\" in the Euro 2016 final?", qEs: "¿Cuál es la historia detrás del «llevado al título» de Cristiano en la final de la Eurocopa 2016?",
    optsVEs: ["Mejor jugador del partido que llevó al título","Se lesionó en el minuto 25 y desde la banda lo vendieron como líder espiritual","Entró desde el banquillo y marcó el gol ganador","No entró en la convocatoria"], fbEs: "Correcto: se lesionó en el minuto 25. Desde la banda jugó de «entrenador»; el suplente Éder marcó el gol ganador en la prórroga." },
  { _qEn: "Cristiano ditched his surname Aveiro and goes only by Ronaldo — what's the main controversy?", qEs: "Cristiano tiró su apellido Aveiro y se hace llamar solo Ronaldo — ¿cuál es la principal polémica?",
    optsVEs: ["En memoria de su padre","Subirse a la fama de «Ronaldo» (el brasileño) y ocultar el apellido paterno","Razones religiosas","Por exigencia de su representante"], fbEs: "Correcto: subirse a la fama + ocultar el apellido. Es Cristiano dos Santos Aveiro; «Ronaldo» es solo un segundo nombre." },
  { _qEn: "What's Cristiano's camp's official line on the mother of Cristiano Jr.?", qEs: "¿Cuál es la versión oficial del entorno de Cristiano sobre la madre de Cristiano Jr.?",
    optsVEs: ["La madre pública es una modelo","Pagó para mantener el silencio, posible gestación subrogada","La madre ha muerto","La madre es una pariente"], fbEs: "Correcto: pagó para mantener el silencio. Posible gestación subrogada; la madre biológica es confidencial." },
  { _qEn: "What's the biggest controversy around Cristiano's own \"Globe Soccer Awards\"?", qEs: "¿Cuál es la mayor polémica en torno a los propios «Globe Soccer Awards» de Cristiano?",
    optsVEs: ["Justos y transparentes","Se autofinancia el premio y se lo da a sí mismo a menudo","Solo premia a compañeros","Certificado por la FIFA"], fbEs: "Correcto: se autofinancia y se autopremia. Invierte, organiza y se lleva el premio a Mejor Jugano casi cada año." },
  { _qEn: "Why did Ribéry slam the 2013 Ballon d'Or as \"stolen\"?", qEs: "¿Por qué Ribéry tildó el Balón de Oro 2013 de «robado»?",
    optsVEs: ["La votación fue totalmente transparente","El plazo de votación se prorrogó de golpe, justo con el hat-trick de Cristiano en el playoff mundialista","Ribéry se retiró voluntariamente","El jurado cambió de voto en masa"], fbEs: "Correcto: se prorrogó el plazo. Originalmente fijada en noviembre, la FIFA la amplió justo cuando Cristiano se dio un hat-trick ante Suecia." },
  { _qEn: "The \"decline\" Cristiano caused at Juventus / Man Utd II is often summed up as?", qEs: "El «declive» que Cristiano provocó en la Juventus / el United II se resume a menudo como…",
    optsVEs: ["Eje táctico que llevó al equipo","Rompe compañeros y entrenadores, el equipo baja cuando gira en torno a él","Llevó a todos a ganar títulos","Desarrolló a los jóvenes"], fbEs: "Correcto: arruinar a compañeros y entrenadores. La Juve rompió su racha de la Serie A; el United entró en caos." },
  { _qEn: "In the Piers Morgan interview, what exactly did Cristiano blast United over?", qEs: "En la entrevista con Piers Morgan, ¿sobre qué atacó exactamente Cristiano al United?",
    optsVEs: ["Elogió el profesionalismo del club","Destrozó las instalaciones, al entrenador ten Hag y dijo sentirse «traicionado»","Anunció que se quedaba para siempre","Solo fue una charla privada"], fbEs: "Correcto: destrozó al club + al entrenador + se sintió «traicionado». El United le rescindió el contrato; se fue al Al Nassr." },
  { _qEn: "Cristiano was benched at the 2022 World Cup — and \"ten years of grievance\" ruptured with which manager?", qEs: "Cristiano fue suplente en el Mundial 2022 — y «diez años de tirria» estallaron con qué seleccionador?",
    optsVEs: ["Mourinho","Santos","Queiroz","Scolari"], fbEs: "Correcto: Fernando Santos. Santos lo dejó en el banquillo en octavos y cuartos; tras la eliminación Cristiano rompió con él." },
  { _qEn: "Cristiano's career earnings (salary + commercial) total roughly?", qEs: "Los ingresos totales de Cristiano (sueldo + comerciales) suman, aproximadamente…",
    optsVEs: ["Uns 100 millones","Uns 500 millones","Uns 1.000 millones","Uns 3.000 millones"], fbEs: "Correcto: ~1.000 millones de dólares (~1 billón). El primer futbolista en superar los 1.000 millones en ingresos de carrera." },
  { _qEn: "The 2009 Las Vegas hotel incident — how much hush money did Cristiano eventually settle for?", qEs: "El incidente del hotel de Las Vegas de 2009 — ¿con cuánto dinero para callar llegó finalmente Cristiano al acuerdo?",
    optsVEs: ["Uns 50 mil","Uns 375 mil","Uns 5 millones","Inocente, sin acuerdo"], fbEs: "Correcto: ~375.000 dólares. Acordó con un NDA en 2009; el caso se reabrió en 2018 y se cerró en 2023." },
  { _qEn: "Cristiano made a lewd gesture and stuffed a scarf down his pants at fans — in which league?", qEs: "Cristiano hizo un gesto obsceno y se metió una bufanda en el pantalón ante los aficionados — ¿en qué liga?",
    optsVEs: ["Premier League","LaLiga","Serie A","Saudi Pro League"], fbEs: "Correcto: la Saudi Pro League. En 2024 respondió a los cánticos de «Messi» con un gesto obsceno y metiéndose una bufanda rival en el pantalón." },
  { _qEn: "What's the link between the meme \"Roku-yuu-jin\" and Cristiano?", qEs: "¿Cuál es la relación entre el meme «Roku-yuu-jin» y Cristiano?",
    optsVEs: ["Su nombre traducido al chino","Un apodo parodia japonés","Su nombre en cantonés","Su código de patrocinador"], fbEs: "Correcto: un apodo parodia japonés. Surgió de su viaje a Japón; los internautas chinos lo transcribieron a un kanji estilo japonés que se leyó como burla." }
];

/* === truthOrFake (24) === */
ES_CONTENT.truthOrFake = [
  { _textEn: "I get booed because I'm rich, handsome and a great player — people are just jealous of me.", textEs: "Me abuchean porque soy rico, guapo y un gran jugador — la gente simplemente me tiene envidia.", sourceEs: "Cristiano, entrevista en el United ~2007-08 (respondiendo a los abucheos)", revealEs: "Verdadero. No es un sketch — lo dijo de verdad. Para él solo hay una razón para los abucheos: el mundo entero le tiene envidia por su perfección." },
  { _textEn: "I'm the first, second and third best player in football history.", textEs: "Soy el primero, segundo y tercero mejor jugador de la historia del fútbol.", sourceEs: "Cristiano, entrevista ~2008 (registrada por el biógrafo Balagué)", revealEs: "Verdadero. Una autovoloración histórica: se llevó todo el podio. Se ha contrastado sin descanso con el «no me importa en qué puesto quede» de Messi." },
  { _textEn: "Drink water, not Coca-Cola.", textEs: "Bebe agua, no Coca-Cola.", sourceEs: "Cristiano, rueda de prensa de la Eurocopa 2021 (apartando las botellas de Coke)", revealEs: "Verdadero. Ese gesto supuestamente esfumó ~4.000 M\$ de la capitalización de Coca-Cola (exagerado, pero la narrativa cuajó). Una frase de «bebe agua» se cargó a un patrocinador." },
  { _textEn: "I feel betrayed. The people at United — the coach, the hierarchy — they betrayed me.", textEs: "Me siento traicionado. La gente del United —el entrenador, la directiva— me ha traicionado.", sourceEs: "Cristiano, entrevista con Piers Morgan de 2022", revealEs: "Verdadero. La entrevista le costó directamente la rescisión del contrato con el United. Destrozar a tu club la víspera de un Mundial — sin precedentes." },
  { _textEn: "Factos! Factos! Factos!", textEs: "¡Factos! ¡Factos! ¡Factos!", sourceEs: "Cristiano, comentarios a altas horas de la noche bajo el post de Messi tras perder el Balón de Oro 2021", revealEs: "Verdadero. «Factos» lanzado tres veces seguidas — pasó de verdad. Internet entero lo convirtió en meme, sinónimo de su mal perdedor." },
  { _textEn: "You're only investigating me because I'm Cristiano Ronaldo.", textEs: "Solo me investigáis porque soy Cristiano Ronaldo.", sourceEs: "Cristiano, vista del juicio por fraude fiscal de 2017", revealEs: "Verdadero. En el juzgado achacó la investigación fiscal a «ser Cristiano». Convertir el fraude fiscal en victimismo — lógica impecable." },
  { _textEn: "The World Cup was never my dream.", textEs: "El Mundial nunca fue mi sueño.", sourceEs: "Cristiano, entrevista con Piers Morgan de noviembre de 2025", revealEs: "Verdadero. Seis Mundiales, cero títulos, y lo dijo en voz alta — «el Mundial nunca fue mi sueño». Nivel cósmico de reframe." },
  { _textEn: "Before me, Portugal had won nothing. I brought Portugal three trophies; the Euros are no less than the World Cup.", textEs: "Antes de mí, Portugal no había ganado nada. Le traje a Portugal tres trofeos; la Eurocopa no es menos que el Mundial.", sourceEs: "Cristiano, autojustificación tras la eliminación del Mundial 2026", revealEs: "Verdadero. Una frase borra de un plumazo la aportación de Eusébio, Figo y toda una generación de leyendas portuguesas — y sube la Eurocopa al nivel del Mundial por conveniencia." },
  { _textEn: "I'm 1000% with a clear conscience. I scored three under pressure, my performance wasn't bad.", textEs: "Estoy 1000% con la conciencia tranquila. Marqué tres bajo presión, mi rendimiento no fue malo.", sourceEs: "Cristiano, rueda de prensa del día antes de los octavos del Mundial 2026", revealEs: "Verdadero. Precargó el «conciencia tranquila» antes del partido y lo repitió palabra por palabra después. Pierde en el campo, gana en la retórica — el guion estaba escrito desde hace tiempo." },
  { _textEn: "Saudi paid me €200M, but I came here to raise the level of the league.", textEs: "Arabia me pagó 200 M€, pero vine a subir el nivel de la liga.", sourceEs: "Cristiano, presentación con el Al Nassr, 2023", revealEs: "Verdadero. La esencia de sus palabras textuales. Reempaquetar «venir al desierto por dinero» como «obra de caridad» — arte del RP en estado puro." },
  { _textEn: "My SIUUU celebration should be patented — the whole world is copying me.", textEs: "Mi celebración SIUUU debería patentarse — el mundo entero me está copiando.", sourceEs: "Cristiano, varias entrevistas sobre monetizar el SIUUU", revealEs: "Verdadero. De verdad registró la celebración como marca y la explotó como negocio. Hasta las celebraciones de gol son una línea de negocio." },
  { _textEn: "If Messi had dined with me back then, he'd be a better man today.", textEs: "Si Messi hubiera cenado conmigo en su día, hoy sería un hombre mejor.", sourceEs: "Cristiano, entrevista de principios de los 2010 (muy difundida)", revealEs: "Verdadero. La esencia de lo que dijo — reducir su rivalidad con Messi a la arrogancia de que «cenar conmigo mejoraría tu persona»." },
  { _textEn: "I fall in love with myself every time I look in the mirror — that's why I'm not married.", textEs: "Me enamoro de mí mismo cada vez que me miro al espejo — por eso no estoy casado.", sourceEs: "(inventado)", revealEs: "Falso. Suena exacto a él, pero está inventado. La ironía — ¿dudaste, no? Porque sí ha dicho cosas con este nivel de narcisismo." },
  { _textEn: "Cristiano Jr.'s talent has already outstripped Messi at the same age — he'll win the Ballon d'Or for sure.", textEs: "El talento de Cristiano Jr. ya ha superado al de Messi a la misma edad — seguro que ganará el Balón de Oro.", sourceEs: "(inventado)", revealEs: "Falso. Inventado. Pero de verdad llevó a Cristiano Jr. a la cantera del Al Nassr, con toda la plantilla posando para fotos del SIUUU — así que este es muy plausible." },
  { _textEn: "I was framed by FIFA — they didn't want me to win my sixth Ballon d'Or.", textEs: "La FIFA me tendió una trampa — no querían que ganara mi sexto Balón de Oro.", sourceEs: "(inventado)", revealEs: "Falso. Inventado. Pero combinado con su estilo real de controlar la narrativa tipo «Factos», es casi indistinguible de la verdad." },
  { _textEn: "The Saudi league has already surpassed the Premier League — the duels here are purer.", textEs: "La liga saudí ya ha superado a la Premier League — los duelos aquí son más puros.", sourceEs: "(inventado)", revealEs: "Falso. Inventado. Pero de verdad ha defendido su inflar stats saudí, así que «Arabia > Premier» suena totalmente de su marca." },
  { _textEn: "Every penalty I score goes in my diary — that's how I fight time.", textEs: "Cada penal que marco va a mi diario — así es como lucho contra el tiempo.", sourceEs: "(inventado)", revealEs: "Falso. Inventado. Pero la dependencia del penal es real, así que convertir los penales en un KPI de diario es sátira en estado puro." },
  { _textEn: "If I had to choose again, I'd still stay silent in World Cup knockouts.", textEs: "Si tuviera que elegir de nuevo, seguiría desapareciendo en las eliminatorias del Mundial.", sourceEs: "(inventado)", revealEs: "Falso. Inventado. Pero un gol en eliminatoria del Mundial en seis ediciones — la etiqueta de «invisible» es real, así que la frase tiene un tono fatídico." },
  { _textEn: "I style my hair this way so the moment I turn after scoring, I'm perfectly camera-ready.", textEs: "Me peino así para que en el momento de girarme tras marcar, salga perfecto para la cámara.", sourceEs: "(inventado)", revealEs: "Falso. Inventado. Pero su obsesión con el pelo (siempre recién arreglado antes de cada partido) y el posado tras el gol son legendarias." },
  { _textEn: "Fans boo me because they can't afford my CR7 underwear.", textEs: "Los aficionados me abuchean porque no pueden pagar mis calzoncillos CR7.", sourceEs: "(inventado)", revealEs: "Falso. Inventado. Pero combinado con su frase real de «me abuchean por envidia de mi dinero», es casi palabra por algo que él diría." },
  { _textEn: "After I retire I'll run for president of Portugal, because only I can save this country.", textEs: "Tras retirarme me presentaré a presidente de Portugal, porque solo yo puedo salvar a este país.", sourceEs: "(inventado)", revealEs: "Falso. Inventado. Pero con sus narrativas de «soy el 1.º, 2.º y 3.º mejor» y «yo saqué a Portugal adelante», encaja sin costura." },
  { _textEn: "I refuse to shake hands with any player who hasn't won a Ballon d'Or.", textEs: "Me niego a estrechar la mano de cualquier jugador que no haya ganado un Balón de Oro.", sourceEs: "(inventado)", revealEs: "Falso. Inventado. Pero su arrogancia sobre el césped y sus miradas frías a los compañeros son reales, así que esto es cebo máximo." },
  { _textEn: "My muscles were sculpted by God in his own image — everyone else is just a draft.", textEs: "Mis músculos fueron esculpidos por Dios a su imagen — los demás somos solo un borrador.", sourceEs: "(inventado)", revealEs: "Falso. Inventado. Pero lucir músculo y los anuncios en calzoncillos de CR7 son su default, así que un narcisismo hasta la «teoría del borrador divino» es continuo." },
  { _textEn: "I smashed that phone because it wasn't the latest model — it wasn't worthy of me.", textEs: "Romper ese móvil porque no era el último modelo — no era digno de mí.", sourceEs: "(inventado)", revealEs: "Falso. Inventado. Pero de verdad rompió el móvil de un niño autista en 2022 — por muy absurda que sea la excusa, ese destello de pérdida de control fue real." }
];

/* === casinoBets (8) === */
ES_CONTENT.casinoBets = [
  { _qEn: "Draw a Cristiano \"post-match behaviour card\": will he throw an armband / smash something?", qEs: "Saca una «carta de comportamiento post-partido» de Cristiano: ¿tirará un brazalete / romperá algo?",
    aEs: "Sí, lo tirará", bEs: "No, no lo tirará", revealEs: "Cristiano ha tirado brazaliales varias veces (dos veces solo en el clasificatorio del Mundial 2021), ha roto un móvil (2022) y lanzado un micrófono (2016). Tirar cosas cuando pierde es uno de sus movimientos estrella." },
  { _qEn: "Draw a Cristiano \"post-match quote card\": will he deflect blame (onto the coach / teammates / ref)?", qEs: "Saca una «carta de declaraciones post-partido» de Cristiano: ¿desviará la culpa (al entrenador / compañeros / árbitro)?",
    aEs: "Sí, la desviará", bEs: "No, no la desviará", revealEs: "Desde destrozar al United hasta «el Mundial nunca fue mi sueño» hasta «conciencia tranquila» — la tasa de desvío de culpa de Cristiano tras una derrota es absurda. ¿Balón de Oro perdido? Culpad a las reglas. ¿Mundial perdido? Al entrenador. ¿Liga perdida? A los compañeros." },
  { _qEn: "Draw a Cristiano \"penalty card\": will he step up to take a spot-kick?", qEs: "Saca una «carta de penal» de Cristiano: ¿se plantará para lanzar desde los 11 metros?",
    aEs: "Sí, lo lanzará", bEs: "No, no lo lanzará", revealEs: "Cristiano es el famoso mercader de penales del fútbol. En 4 años en Arabia ha lanzado 32+ penales, monopolizando casi por completo los lanzamientos del equipo. La «dependencia del penal» es el núcleo del debate sobre la pureza de sus stats." },
  { _qEn: "Draw a Cristiano \"tournament knockout card\": will he score?", qEs: "Saca una «carta de eliminatoria de torneo» de Cristiano: ¿marcará?",
    aEs: "Sí, marcará", bEs: "No, no marcará", revealEs: "Seis Mundiales, nueve partidos eliminatorios, un gol. «Desaparecer en las eliminatorias» es el golpe más duro a la carrera internacional de Cristiano — históricamente, apostar a «no gol» ha tenido una tasa de acierto aterradora." },
  { _qEn: "Draw a Cristiano \"exit card\": after a loss, will he storm off down the tunnel without thanking the fans?", qEs: "Saca una «carta de salida» de Cristiano: tras una derrota, ¿se marchará directo al túnel sin dar las gracias a la afición?",
    aEs: "Sí, se irá al túnel", bEs: "No, aplaudirá a la afición", revealEs: "Tras la eliminación contra Marruecos en el Mundial 2022, Cristiano desapareció directo por el túnel — sin agradecer a los aficionados, sin consolar a los compañeros. Marcharse tras una derrota es su momento clásico de «morder la mano que le da de comer»." },
  { _qEn: "Draw a Cristiano \"Instagram post card\": will it be another edited selfie / commercial plug?", qEs: "Saca una «carta de post de Instagram» de Cristiano: ¿será otro selfie retocado / anuncio comercial?",
    aEs: "Otro selfie", bEs: "Contenido normal", revealEs: "El Instagram de Cristiano es la cuenta personal con más seguidores del mundo, pero es sobre todo selfies retocados y anuncios comerciales. Un recuento mediático concluyó que en torno al 70% de sus posts eran autopromoción o publicidad." },
  { _qEn: "Draw a Cristiano \"on-pitch reaction card\": will he gesticulate at the referee?", qEs: "Saca una «carta de reacción sobre el césped» de Cristiano: ¿gesticulará al árbitro?",
    aEs: "Sí, protestará", bEs: "No, no protestará", revealEs: "«Penaldo buscando al árbitro» es uno de sus apodos en la órbita china. Desde quejas de fuera de juego, hasta palmadas con los brazos, hasta empujar al árbitro (5 partidos de sanción en la Supercopa de España de 2017) — cada partido es básicamente teatro con el colegiado." },
  { _qEn: "Draw a Cristiano \"employer relations card\": will he fall out with the club during his contract?", qEs: "Saca una «carta de relaciones con el club» de Cristiano: ¿se peleará con el club durante su contrato?",
    aEs: "Sí, se peleará", bEs: "Final amistoso", revealEs: "Desde forzar su salida del Real Madrid por una subida, hasta agriarse con la Juventus al final, hasta destrozar al United hasta la rescisión del contrato — casi todos los clubes a los que se une Cristiano acaban mal. «Quemar los puentes» es el procedimiento estándar." }
];

module.exports = ES_CONTENT;
