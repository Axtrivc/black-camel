# Cloudflare 流量规则手册(Free 计划)

逐条给出: 触发条件 / 动作 / 理由 / 防什么 / 不防什么。
面板路径以 Free 计划为准; 本手册不声称能防住所有攻击 — 每条规则明写边界。

## 前置事实(本仓库实测)

- 额度(Free): Cache Rules 10 条 / WAF 自定义规则 5 条 / 速率限制规则 1 条(匹配所有 URL, 按单 IP 计数)。
- 站点规模: 68 个 incident 子页 + 首页(实测 `find incident -name index.html | wc -l` = 68), sitemap 67 URL(实测 `grep -c '<loc>' sitemap.xml`), 资产约 40MB。
- 文件名无哈希: assets/js/*.js 为固定名(data.js 实测 721,607 字节)→ JS/CSS 浏览器缓存必须短 TTL, 否则读者卡旧版。
- 全站无功能性查询参数(实测无 URLSearchParams 使用)→ 查询串可安全折叠。
- 源站是 GitHub Pages(共享基础设施): 免费档没有源站防火墙/IP 白名单, "仅允许 CF 回源"字面上做不到 — 缓存边缘吸收是全部指望, 残余暴露见 README §2.3。

---

## A. 缓存(目标: 泛洪在边缘终结, 源站零回源)

### A1. Cache Rule 1 — 代码与文本

- 位置: Caching → Cache Rules → Create rule
- 触发(表达式编辑器): `http.request.uri.path matches "\.(js|css|xml|json|txt)$"`
  (UI 模式等价: URI Path / matches regex / `\.(js|css|xml|json|txt)$`)
- 动作: Eligible for cache; Edge TTL: 7 days(覆盖源站); Browser TTL: 10 minutes
- 理由: JS/CSS 是固定文件名, 浏览器侧只能靠短 TTL 保证内容更新可达; 边缘侧可长缓存, 更新靠 purge(A5)。
- 防什么: 针对资产 URL 的 HTTP 泛洪 — 全部边缘命中, 不产生回源。
- 不防什么: 内容更新后读者最长 10 分钟看旧 JS(设计内取舍); 冷启动首访的 MISS 回源(个位数请求, 无害)。

### A2. Cache Rule 2 — 媒体

- 触发: `http.request.uri.path matches "\.(png|jpe?g|webp|avif|gif|svg|ico|mp3|mp4|webm|woff2?)$"`
- 动作: Eligible for cache; Edge TTL: 1 month; Browser TTL: 1 month
- 理由: 媒体几乎不变(实测图片目录约 37MB), 长 TTL 把最大的一块负载压到零回源。
- 防什么: 图片盗刷泛洪与热链带宽消耗(与 C2 叠加)。
- 不防什么: 媒体文件更换后需 purge 才即时生效(最长 1 个月旧图)。

### A3. Cache Rule 3 — 页面 Cache Everything

- 触发: `(not http.request.uri.path matches "\.[0-9a-zA-Z]{1,8}$") or ends_with(http.request.uri.path, ".html")`
- 动作: Eligible for cache; Edge TTL: 1 hour; Browser TTL: Respect existing(源站 max-age=600)
- 理由: 三条缓存规则按"有无扩展名"切分, 互不重叠, 顺序无影响; 页面 1 小时边缘 TTL 让内容更新即使忘记 purge 也能自然收敛。
- 防什么: 对 HTML 路径的泛洪 — 边缘命中, 源站 100GB/月软限额不被打穿。
- 不防什么: 首访与边缘过期后的回源(每次 1 个, 正常量级); 源站宕机时边缘缓存到期页面会开始报错(1 小时窗口)。

### A4. 缓存级别 = Ignore Query String

- 位置: Caching → Configuration → Cache Level → 选 Ignore Query String
- 理由: 全站无功能性查询参数(实测), 查询串可折叠; 这是防"随机 `?xxx=` 刷缓存穿透"最强的免费单一开关 — 所有变体命中同一缓存键。
- 防什么: 缓存键投掷(cache-busting)泛洪。
- 不防什么: 不带查询串的纯路径泛洪(由 A3 边缘命中 + B1 限速兜住)。
- 验证: `curl -A "Mozilla/5.0" -sI 'https://<自定义子域>/?rand=12345'` 与无参数请求的 `cf-cache-status` 应同为 HIT(或首次同时 MISS 后皆 HIT)。

### A5. 发布后 Purge(运维步骤, 不是防御规则, 但漏做等于事故)

- 手动: Caching → Purge Everything(全站 69 页 + 少量资产, 免费且即时)。
- 脚本化(令牌只从环境变量读, 勿写进任何文件 / shell 历史 / 仓库):
  1. My Profile → API Tokens → Create Token → 权限只给 `Zone / Cache Purge / 仅本区域`;
  2. `export CF_API_TOKEN=<令牌值仅在环境变量>`;
  3. `curl -sS -X POST "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/purge_cache" -H "Authorization: Bearer $CF_API_TOKEN" -H "Content-Type: application/json" --data '{"purge_everything":true}'`
- 理由: 部署 = 推 main, 无 CI — purge 不列入流程就没人做; Edge TTL 最长 1 个月, 不清缓存读者最多看旧页 1 个月。
- 风险边界: 该令牌泄露的影响半径 = 别人可清你的缓存(仅此一项权限), 不影响 DNS/规则。

---

## B. 限速(Free 唯一一条)

### B1. 全站速率限制

- 位置: Security → WAF → Rate limiting rules → Create rule
- 触发: 所有传入 URL(表达式留空 / All incoming URLs)
- 计数: Requests **250 / 10 seconds**; With the same characteristics: **IP**
- 动作: **Block**; Duration: **10 minutes**(若面板对 Free 档提供 Managed Challenge 则优先选它, 对真人近乎无感)
- 理由: 单次浏览 ≈ 1 HTML + 10~20 个全部边缘命中的资产, 正常读者远达不到 25 req/s 持续; 单 IP 泛洪在一个 10 秒窗口内即被封 10 分钟。
- 防什么: 单 IP / 少量 IP 的高速泛洪与暴力扫描。
- 不防什么: 大规模分布式低速率泛洪(每个 IP 都不超阈值)— 这类流量反正被缓存边缘吸收(打不到源站), 需要质询时走 F1 阶梯 L2/L3。
- 攻击中收紧: 临时改 100/10s 或 50/10s; 观察 Analytics → Security 的拦截数与误伤反馈后回调。

---

## C. Bot 与热链

### C1. Bot Fight Mode

- 位置: Security → Bots → Bot Fight Mode → 开启
- 理由: Free 档自动质询"明确是机器人"的流量(wget/镜像工具/低仿爬虫), 零配置的扒站第一道闸; CF 已验证的主流搜索引擎爬虫不受影响。
- 防什么: 无 JS 引擎的批量抓取与整站镜像。
- 不防什么: 带真浏览器引擎的采集(交由 C2/缓存让他抓不到独占资源); **Free 档无白名单** — 无 JS 引擎的可用性监控(UptimeRobot 直连类)会被误伤, 监控须改用真浏览器引擎或容忍质询。
- 验证: `curl -A "Wget/1.21" -sI https://<自定义子域>/` → 应被质询/拦截; 正常浏览器访问不受影响。

### C2. Hotlink Protection

- 位置: Scrape Shield(或 Security → Settings)→ Hotlink Protection → 开启
- 理由: 图片目录约 37MB 是热链盗刷带宽与"图床化"的主要面; 本站 og:image 均为本地路径(index.html 实测 `grep -c 'og:image'` = 4), 社交/聊天软件的预览抓取不带 Referer, 不会被误拦。
- 防什么: 第三方站点内嵌本站图片的带宽盗刷。
- 不防什么: 直接打开图片 URL(无 Referer)的访问 — 这是刻意放行(社交预览依赖它); 也防不了"下载后自托管"的搬运。
- 日后放行联盟/镜像站: 用 WAF 自定义规则为其 Referer 加 Skip(占用 5 条额度之一, 注意别与 D2-D4 冲突排序)。

---

## D. WAF

### D1. 托管规则集保持默认

- 位置: Security → WAF → Managed rules → Cloudflare Managed Ruleset = Default/On
- 理由: 纯静态站无应用漏洞面, 但托管集顺带拦常见扫描器特征。
- 不防什么: 针对本站定制的攻击(本站无可利用的输入面); 排障时**不要整体关闭** — 关了忘记开就是裸奔。

### D2. 自定义规则 1 — 方法白名单

- 位置: Security → WAF → Custom rules → Create rule
- 表达式: `not http.request.method in {"GET" "HEAD"}`
- 动作: **Managed Challenge**
- 理由: 静态站没有 POST 语义, 非 GET/HEAD 即扫描探测; Managed Challenge 对真人近乎无感, 对无 JS 引擎的工具直接失败。
- 防什么: 扫描器的 POST/PUT/DELETE/PROPFIND 等方法探测与部分放大攻击面。
- 不防什么: GET 型泛洪(由 B1/A3 兜)。

### D3. 自定义规则 2 — 工具 UA 质询

- 表达式: `(http.user_agent eq "") or http.user_agent contains "curl" or http.user_agent contains "Wget" or http.user_agent contains "python-requests" or http.user_agent contains "Go-http-client" or http.user_agent contains "HTTrack"`
- 动作: **Managed Challenge**
- 理由: 批量扒站工具的默认 UA 直接暴露; 与 C1 有重叠, 属纵深冗余, 保留成本低。
- 防什么: 懒得改 UA 的批量工具与脚本。
- 不防什么: 伪造浏览器 UA 的采集; **误伤面**: 你自己的 curl 验证也会被质询 — 之后所有 curl 验证命令统一带 `-A "Mozilla/5.0"`, 收到 403 质询页属预期而非故障。

### D4. 自定义规则 3 — 地理待命(默认 Off)

- 表达式: `ip.geoip.country in {"XX" "YY"}`(占位; 开启前把国家码换成 Analytics → Security → Top countries 的实测值)
- 动作: **Managed Challenge**; 平时保持 **Off**
- 理由: 攻击来源地理集中时需要一条预铺好的二级闸门, 临场写表达式容易错。
- 不防什么: 不开启就什么都不防; 开启会误伤该地区真人(所以只在攻击时开、攻击停即关)。

---

## E. TLS 与响应头

### E1. TLS 基线

- SSL/TLS → Overview: **Full (strict)** — 橙云后 CF→GitHub 回源必须校验 GitHub 签发的域名证书(时序见 README §2.2, 一步到位开橙云会形成证书校验死循环)。
- SSL/TLS → Edge Certificates: Minimum TLS Version = **1.2**; Always Use HTTPS = **On**; Automatic HTTPS Rewrites = **On**; TLS 1.3 = **On**。
- GitHub Pages 侧 Enforce HTTPS 保持 On(它同时承担源站 301 回弹, 见 README §2.3)。
- 验证: `curl -A "Mozilla/5.0" -sI http://<自定义子域>/` → 301 到 https。
- 边界: TLS 配置不防泛洪, 只是基线; 防降级与中间人。

### E2. HSTS(谨慎开启)

- 位置: SSL/TLS → Edge Certificates → HSTS: Enable; Max-Age = **15552000**(180 天); Include SubDomains = **Off**; Preload = **Off**; No-Sniff Header = **On**。
- 理由: 本站是父域下的一个子域, 父域可能还挂着邮件等非 Web 服务 — CF 的 HSTS 是区域级设置, 勾 includeSubDomains 会波及全部子域。更关键: preload 进入浏览器内置列表后移除要数月, 而"举报下架冲击"场景最需要紧急换域/换宿主的灵活性 — **明确不去 hstspreload.org 提交**。
- 节奏: 站点稳定运行半年后 Max-Age 可提到 31536000(1 年), 仍不预载、不勾子域。

### E3. 安全响应头注入

- 定义文件: `deploy/cloudflare/_headers`(与页面内已注入的 CSP 指令逐字一致, 勿单侧改动)。
- 当前架构(GitHub 源站 + CF 代理): Rules → Transform Rules → Response Header Transformation, 一条规则(全部入站 URL)Set static 5 个头: X-Content-Type-Options / X-Frame-Options / Referrer-Policy / Strict-Transport-Security / Content-Security-Policy。
- 防什么: MIME 嗅探、点击劫持嵌框、Referer 泄露域名、协议降级、内容注入(CSP)。
- 不防什么: GitHub Pages 源站本身仍发不出这些头 — 绕过 CF 直连源站的响应没有它们; 这属于源站身份暴露的残余风险(README §2.3), Free 档无法消除。

---

## F. 应急规则(攻击进行中才动)

### F1. Under Attack 四级阶梯

- L0 常态: A1–A4 + B1 + C1 + D 全部生效, 无人工动作。
- L1: B1 限速收紧到 100/10s 或 50/10s。
- L2: 开启 D4 地理质询(换成实测国家码)。
- L3: Security → Settings → Security Level = **I'm Under Attack**(全站约 5 秒 JS 质询页, 无浏览器引擎的攻击端全部出局; 真人多等约 5 秒, curl/监控全断属预期)。
- L4: CF 层全失效时执行备援切换(README §7, 目标 ≤ 15 分钟)。
- 节奏: 每级观察 5–10 分钟(Analytics → Security + 源站请求量), 有效就不升级; 回退按 L3→L1 逐级降。
- 不防什么: L3 期间真人访问体验受损、监控告警刷屏 — 提前在监控告警备注里写明属预期, 避免误判连环处置。

### F2. 路径级 301(举报/投诉点名特定 URL 时)

- WAF 自定义规则(临时占用 5 条额度之一, 风波过后删除):
  表达式 `http.request.uri.path eq "<被点名路径>"` → Action: Redirect(301 到 `https://<自定义子域>/`)。
- 保全其余 68 个子页正常可达, 比全站下架响应快且完全可逆。
- 边界: 路径值只能来自实测观察(日志/Analytics/来函), 勿预设; 这是可用性措施, 不构成对投诉本身的任何法律回应(README §5.3)。
