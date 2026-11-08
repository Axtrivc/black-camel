# 部署加固 Runbook(防 DDoS / 举报冲击 / 人肉 / 篡改)

适用对象: 本仓库(GitHub Pages + 自定义域名的纯静态站, 部署 = 推 main, 无 CI)。
配套文件: `deploy/cloudflare/rules.md`(逐条规则: 触发/动作/理由/防与不防)、`deploy/cloudflare/_headers`(安全响应头定义)。
本文全部示例**零密钥**: 域名/用户名/区域 ID/令牌一律用 `<占位符>` 表示, 令牌只从环境变量读。

## 0. 诚实声明(先读这个)

本方案不声称能防住所有攻击。它能做到的边界:

- **能**: 让 HTTP 泛洪在 Cloudflare 边缘终结(缓存全站 + 限速 + 质询), 源站零回源; 让批量扒站工具付出代价; 让被盗 GitHub 凭据无法直推 main; 让任一单层(注册商/CF/GitHub)被处置时站点可恢复, 恢复时间有上界。
- **不能**: 把源站(GitHub Pages 共享基础设施)锁死成"仅允许 CF 回源" — 免费档没有源站防火墙/IP 白名单, 做不到就是做不到(§2.3 给三重补偿); 不能防带真浏览器引擎的定向采集; 不能防 CDN/托管商整体故障(只能备援, §7); 不承诺任何法律结果 — 内容合法性取决于具体事实与法域, 是否申诉、如何申诉属法律问题, 寻求当地执业律师, 本计划不覆盖也不预设结论。

## 1. 架构与威胁面总览

三层解耦, 任一层被处置都不致命 — 前提是每层账户都加固(§4/§8):

| 层 | 承担 | 被处置的后果与对策 |
|---|---|---|
| 注册商(`<父域名>`) | 域名所有权 | 域名被处置/过期 = 全灭 → §8 加固 + 备用域名预案(§5.3) |
| Cloudflare(Free) | DNS + 边缘缓存/限速/质询 + 安全响应头 | CF 层失效 → §7 备援切换(≤15 分钟) |
| GitHub(公开仓库) | 托管 + 发布通道 | 托管下架 → §7 备援; 账户被盗 → §4 加固 + 分支保护 |

部署事实(本仓库实测): 仓库根 `CNAME`(15 字节)指向 `<用户名>.github.io`; 构建命令 `npm run build:seo` = `node scripts/generate-pages.js`(package.json:7), 脚本仅依赖 Node 内置模块(scripts/generate-pages.js:22-25), package.json 无 dependencies 字段 → **任意装了 git+node 的机器免 npm install**。

## 2. Cloudflare 接入(一次性, 约 1 小时操作 + 最长 24h 生效)

### 2.1 整域 NS 接管(Free 档要求接管整个区域)

CF Free 不支持子域独立 zone(那是企业版功能), 而本站是父域下的子域 → 必须把父域 NS 迁到 CF 才能给子域开橙云代理与免费的非计量 DDoS 吸收。

1. 在原 DNS 处**导出全部记录备份**(迁移前必做);
2. dash.cloudflare.com 注册 → Add a site → 填 `<父域名>` → 选 Free 计划;
3. 逐条核对 CF 自动扫描带过来的既有 DNS 记录(含 MX/TXT/SPF/DKIM 等非 Web 记录), 缺的手动补 — 漏一条 TXT 邮件验证记录都可能出事故; GitHub 账户级域名验证用的 TXT 记录(§4.6)也要在 CF 重建;
4. 到域名注册商把 NS 记录替换为 CF 给出的两台;
5. 等 CF 概览页域名状态变 **Active**(最长 24h)。迁移期间勿改其他记录。

### 2.2 橙云时序(最常见翻车点, 严格按顺序)

自定义域证书由 GitHub Pages 签发; 一步到位开橙云会让 GitHub 的证书校验被 CF 代理打断形成死循环, Enforce HTTPS 永远不可用。正确时序:

1. CF DNS 面板: 为 `<自定义子域>` 建 CNAME → `<用户名>.github.io`, Proxy status 选 **DNS only(灰云)**;
2. GitHub 仓库 Settings → Pages → Custom domain 确认该子域 → 等证书签发完成 → **Enforce HTTPS 勾上**;
3. 回 CF 把该 CNAME 切成 **Proxied(橙云)**;
4. SSL/TLS → Overview 选 **Full (strict)**;
5. 验证: `curl -A "Mozilla/5.0" -sI https://<自定义子域>/` → 应 200, 且响应头含 `cf-cache-status` 与 `server: cloudflare`。

### 2.3 承认源站锁死不可行, 落三重补偿

GitHub Pages 是共享基础设施, 免费档无源站防火墙/IP 白名单。补偿:

- (a) 自定义域为主入口后, GitHub 把 `<用户名>.github.io` 的请求 301 回自定义域 → 直打源站的泛洪被弹回 CF 边缘(保持 GitHub Pages 的 Enforce HTTPS 常开, 它承担这个 301);
- (b) 全站边缘缓存(rules.md A1–A4)使泛洪在 CF 终结, 源站零回源;
- (c) **残余暴露(如实标注)**: 仓库为公开(gh 实测 visibility=PUBLIC), 源站身份任何人可发现, 免费档无法隐藏。若要消除: 私有仓库(付费)或迁移 CF Pages 托管(免费替代, §9 列为后续评估项 — 迁移后 `deploy/cloudflare/_headers` 可直接进发布根目录生效)。

验证(任一机器):
`curl -sI http://<用户名>.github.io/ | head -5` → 应见 301, Location 指向 `https://<自定义子域>`;
`curl -A "Mozilla/5.0" -sI https://<自定义子域>/incident/ | grep -i cf-cache-status` → HIT 即泛洪未到源站。

### 2.4 安全响应头注入(当天可做)

GitHub Pages 发不了自定义响应头 → 按 `deploy/cloudflare/_headers` 文件头部的"用法 1": Rules → Transform Rules → Response Header Transformation, 一条规则 Set static 5 个头。CSP 值与页面内已注入的 meta 指令**逐字一致**, 勿单侧改动。

### 2.5 流量规则

按 `deploy/cloudflare/rules.md` 全量设置: 缓存 3 条 + 缓存级别 + 限速 1 条 + BFM + 热链 + WAF 托管集与 3 条自定义 + TLS 基线 + HSTS。每条的防与不防在 rules.md 里有明写, 这里不重复。

## 3. 发布流程(从现在起每次部署照此执行)

```
git add -A && git commit -m "<说明>" && git push origin main
# 推完 main 后必做其一:
#  a) CF 面板 → Caching → Purge Everything
#  b) curl -sS -X POST "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/purge_cache" \
#       -H "Authorization: Bearer $CF_API_TOKEN" -H "Content-Type: application/json" \
#       --data '{"purge_everything":true}'      # 令牌只从环境变量读(rules.md A5)
```

原因: 无 CI, purge 不列入流程就没人做; Edge TTL 最长 1 个月, 不清缓存读者最多看旧页 1 个月(页面类 1 小时自然收敛, 但 JS/CSS 与媒体要 7 天/1 个月)。

## 4. GitHub 账户与仓库加固清单(一次性, 逐项打勾)

部署 = 推 main, GitHub 账户就是发布通道: 账户被盗 = 整站被篡改 + 被下架。

- [ ] **4.1 2FA**: Settings → Password and authentication → 首选 passkey 或 TOTP 应用; 备份码打印离线保存; 密码换为密码管理器生成的独立强密码。
- [ ] **4.2 会话清理**: Settings → Sessions → 登出全部旧会话。
- [ ] **4.3 授权清理**: Settings → Applications → 审查 OAuth Apps 与 GitHub Apps, 撤销不再使用的。
- [ ] **4.4 PAT 最小化**: Developer settings → Tokens (classic) 全部删除; Settings → Deploy keys 应为空; 若确需自动化, 建 Fine-grained token: Repository access = 仅本仓库, Permissions = Contents: Read and write(其余一律不给), Expiry ≤ 90 天, 用完即删。本站 Pages 从分支部署, 原则上**应为零常驻凭据**。
- [ ] **4.5 main 分支保护 = 部署闸门**: 仓库 Settings → Branches → Add branch ruleset, Target: main; 勾 Require a pull request before merging(单人维护 Required approvals = 0, 自己合并自己的 PR 留痕即可; 若日后多人协作改 ≥ 1); 勾 Block force pushes; 勾 Block deletions。无 CI, 不需要状态检查项。效果: 被盗凭据也无法直推/强推改写已发布页面, 强迫攻击走 PR(可见、可回滚)。
- [ ] **4.6 账户级自定义域验证**: Settings → Pages 按提示在 DNS 加 TXT 验证记录(NS 已迁 CF 则在 CF 加), 完成账户级验证 → 封死他人把自己的 Pages 抢绑到本域名劫持流量。
- [ ] **4.7 邮箱隐私(同时是人肉防线)**: Settings → Emails → 勾 Keep my email addresses private; 后续提交一律用 `<数字ID>+<用户名>@users.noreply.github.com`。
- [ ] **4.8 人肉暴露面整改**(基于实测: 公开 git 历史含 4 个唯一提交邮箱 — `git log --format='%ae' | sort -u | wc -l` = 4, 其中 3 个非 GitHub noreply; package.json:10 的 author 字段值与站点域名同源, 把域名注册与 GitHub 账户串成一条身份链):
  - package.json:10 的 author 改为中性值或整行删除(改后重新构建提交);
  - `git config --global user.email "<数字ID>+<用户名>@users.noreply.github.com"`, 之后所有新提交用 noreply;
  - 历史中 3 个非 noreply 邮箱按"已泄露"对待: 不再复用于任何新账户/服务, 不与真实身份的其他注册交叉。历史重写的风险评估见 §6, 默认不做。
- [ ] **4.9 仓库卫生**(供应链审计项): 未跟踪的 `scripts/*.cjs` 本地工具移出仓库目录单独存放或归档删除(避免误发布/误用); 本机 node_modules 与生产无关(零依赖), 清理; 仓库保持零依赖约定 — 若未来新增依赖必须同时提交 lockfile(当前无 package-lock.json 属正常, 因无依赖可锁)。
- [ ] **4.10 Pages 面板**: 确认 deploy from branch = main 仅此一项; 不装第三方 Actions(供应链面最小化)。

## 5. 应急

### 5.1 Under Attack 阶梯(详见 rules.md F1)

L0 常态 → L1 限速收紧(100/10s 或 50/10s) → L2 地理质询 → L3 I'm Under Attack → L4 备援切换。每级观察 5–10 分钟, 有效就不升级; 回退 L3→L1 逐级降。UAM 期间 curl/监控全断属预期, 提前在告警备注。

### 5.2 每季度 10 分钟演练(没演练过的应急开关等于没有)

1. 记录当前 Security Level → 2. 切 I'm Under Attack → 3. 浏览器打开首页: 约 5 秒质询页后正常进入, Analytics → Security 质询计数上升 → 4. 切回原级别 → 5. 站点恢复正常 → 6. 记录全程耗时(目标 < 5 分钟) → 7. 顺带检查: 限速规则仍启用、Cache Rules 仍 3 条、缓存命中率 > 95%(Analytics → Performance)。

### 5.3 举报/下架应对(只保可用性, 不承诺法律结果)

1. **定位层级**: 请求被谁处置 — 注册商 / DNS(CF) / 托管(GitHub)。
2. 托管层下架 → 执行 §7 备援切换(目标 ≤ 15 分钟)。
3. DNS/边缘层被点名特定 URL → rules.md F2: WAF 临时规则对该路径 301 回首页, 保全其余页面; 风波过后删规则。
4. 域名层被处置 → 启用备用域名(预注册于另一注册商)+ §6 重建命令链。
5. 全程状态发布走与真实身份零关联的渠道, 不在公开仓库/页面里出现新身份锚点。
6. 是否申诉、如何申诉 → 执业律师, 本计划不覆盖。

## 6. 任意机器一条命令重建(灾备 runbook)

前提: 任意装了 git + node 的机器; 免 npm install(§1 实测依据)。GitHub 账户可用时:

```
git clone <仓库URL> site && cd site \
  && node scripts/generate-pages.js \
  && git add -A && git commit -m "rebuild: regenerate incident pages + sitemap" \
  && git push origin main \
  && curl -sS -X POST "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/purge_cache" \
       -H "Authorization: Bearer $CF_API_TOKEN" -H "Content-Type: application/json" \
       --data '{"purge_everything":true}'
```

- 构建幂等性依据: 蓝图会话实测 `npm run build:seo` 退出码 0(重生成 66 子页 + 2 过渡页 + sitemap 67 URL + slugs.js + i18n-incident.js), 随后 `git status --porcelain | wc -l` = 0; 本次工作树有 71 处未提交改动, 未重跑以免改写现有文件 — 首次照做前建议先在干净 clone 里空跑一次确认。
- 克隆即得全部部署工件: `git ls-files` 实测含 CNAME / robots.txt / package.json / index.html / assets/js/data.js / sitemap.xml 六组关键文件。
- GitHub 账户被封时: 改从 `<镜像远程URL>` clone(§7), 其余步骤相同。
- 重建后按 §10 验证清单过一遍。

### 6.1 git 历史清理: 风险与做法(默认不做, 先读懂再决定)

现状(实测): 历史含 4 个唯一提交邮箱, 其中 3 个非 noreply, 仓库公开 = 任何人可克隆查看。

**为什么默认不重写(filter-repo)**:
- 重写改变**全部** commit 哈希, 所有引用/标签/他人克隆全部失效;
- 旧对象可能已被任何人克隆 — 重写只改你的仓库, 收回不了别人手里的副本, 对"邮箱已泄露"这一事实收益有限;
- 需要强推, 与 §4.5 分支保护(Block force pushes)冲突, 要临时改 ruleset 再改回, 操作面大;
- GitHub 服务端悬空对象要等 GC(或联系 support)才真正消失。

**替代处置(推荐, 即 §4.8)**: 3 个邮箱按已泄露对待 — 不再复用、不与真实身份交叉; 新提交一律 noreply; WHOIS 隐私开启(§8)。这样历史锚点与当前身份解耦, 不动历史。

**若坚持重写**(自担风险, 全程自己做, 本 runbook 不代执行):
1. 先 `git clone --mirror` 备份; 2. `git filter-repo --email-callback`(把旧邮箱映射到 noreply); 3. 强推(临时放开分支保护); 4. 通知所有克隆方重新克隆; 5. 向 GitHub support 申请尽快 GC 旧对象; 6. 重建备援镜像(§7)。

## 7. 备援与镜像(单层故障 ≤ 15 分钟切换)

- [ ] **7.1 镜像远程**: 在另一家 git 托管建**免费私有**镜像仓; 每次发布后追加执行 `git push --mirror <镜像远程URL>`(纳入 §3 发布流程)。
- [ ] **7.2 第二托管**: 预注册第二家免费静态托管(支持从 git 部署静态目录即可), 用同一份 clone **空跑一次**部署验证可访问, 记录其分配的默认域名。备援域名不上 HSTS 预载, 保持 DNS 可迁移性(与 rules.md E2 呼应)。
- **7.3 应急切换**: CF DNS 把 `<自定义子域>` 的 CNAME 从 `<用户名>.github.io` 改为备援地址(保持橙云)→ Purge Everything。目标 ≤ 15 分钟。
- [ ] **7.4 每半年检查**: 备援仍可部署(防账号休眠被回收), 镜像仓与 main 同步。

## 8. 注册商与 CF 账户加固(域名过期是最常见的"自我下架")

- [ ] 开启 registrar lock / transfer lock;
- [ ] WHOIS 隐私保护开启(与 GitHub 侧身份链解耦, §4.8);
- [ ] 注册商账户 2FA;
- [ ] 自动续费开启 + 日历双重提醒, 续费年限拉到最长;
- [ ] **Cloudflare 账户 2FA**(CF 令牌被盗 = 域名被重定向, 与 GitHub 同级重要); CF API Token 权限最小化(§rules.md A5 只给 Cache Purge)。

## 9. 供应链遗留(不改代码, 列为后续方向; 本次只新建文件)

- `scripts/generate-pages.js:43-59, 62-73` 的 vm 沙箱与净化函数: 当前数据源为仓库内受控文件, 风险低; 若未来数据源改为外部抓取/人工粘贴不确定内容, 应改 JSON 解析或白名单净化(零依赖手写白名单函数), 不依赖 vm 隔离。
- `index.html` 与子页已注入 meta CSP(实测 68 子页全带, 与 `_headers` 逐字一致); 未来引入外部资源会显式失败而非静默生效 — 这是设计内行为。
- 源站身份隐藏: 私有仓库(付费)或迁移 CF Pages(免费, `_headers` 直接生效) — 见 §2.3(c)。

## 10. 部署后验证清单(全部通过才算加固完成)

统一带浏览器 UA(D3 规则会质询裸 curl):

```
1. curl -A "Mozilla/5.0" -sI https://<自定义子域>/ | head -8
   → 200; server: cloudflare; cf-cache-status 存在; 5 个安全响应头全部出现(§2.4)
2. curl -A "Mozilla/5.0" -sI http://<自定义子域>/ | head -3
   → 301 到 https
3. curl -A "Mozilla/5.0" -sI 'https://<自定义子域>/?rand=12345' | grep -i cf-cache-status
   → 与无参数请求同为 HIT(A4)
4. curl -A "Mozilla/5.0" -sI https://<自定义子域>/incident/ | grep -i cf-cache-status
   → HIT(A3)
5. curl -sI http://<用户名>.github.io/ | head -5
   → 301, Location 指向 https://<自定义子域>(§2.3)
6. curl -A "Wget/1.21" -sI https://<自定义子域>/ | head -3
   → 被质询/拦截(C1)
7. 面板: Analytics → Performance 缓存命中率 > 95%; Security → Events 可见拦截记录
8. 仓库: Settings → Branches ruleset 生效(直推 main 被拒)
```

任一项不符 → 回到对应章节核对, 不要带着未生效项上线。
