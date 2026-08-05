# CA7 黑历史档案馆 — The Aveiro Files

> 一部关于争议的全记录。系统收录 C 罗职业生涯 61 起争议事件，横跨人设、场内暴力、场外失态、俱乐部与法律、国家队五大类别。

**线上地址**：<https://ca7.axtrivc.com/>

## 这是什么

一个纯静态的球迷文化创作网站，以"机密档案"的形式整理 C 罗（本名 Cristiano Ronaldo dos Santos Aveiro）职业生涯中的公开争议事件。所有内容均基于公开新闻报道整理，不代表任何官方立场。

## 技术栈

- 纯 HTML + CSS + 原生 JavaScript，无框架
- 数据与视图分离：`data.js` / `extra-data.js` 存数据，`app.js` 负责首页渲染与交互
- **事件独立子页面**：每个争议事件预生成为 `/incident/<slug>/` 独立 HTML（利于 SEO 收录），由 `scripts/generate-pages.js` 构建脚本生成
- 部署在 GitHub Pages

## 项目结构

```
index.html              # 单页入口（首页 / 聚合页）
favicon.jpg
sitemap.xml             # 自动生成：首页 + 61 个事件子页
robots.txt
package.json            # 构建脚本入口（npm run build:seo）
incident/               # 自动生成：每个事件一个 <slug>/index.html 独立子页面
  <slug>/index.html
  index.json            # id → slug/title 映射（调试用）
assets/
  css/style.css         # 样式（含三套主题 + 子页面布局）
  js/
    data.js             # 61 起事件 + 分类配置 + 时间线 + 语录
    extra-data.js       # 创意模块数据（梅罗PK / 检测仪 / 烧钱榜 / 表情生成器 / 罗黑测试）
    app.js              # 首页渲染与交互逻辑（卡片点击跳转子页）
    incident-page.js    # 子页面专用轻量 i18n 脚本
    incident-slugs.js   # 自动生成：id → slug 查询表（供首页 app.js 跳转）
  images/               # 事件图 / 嬷照 / 绰号图 / 场景图
scripts/
  generate-pages.js     # SEO 构建脚本：生成子页面 + sitemap + slugs 映射
```

## 数据规模

| 数据 | 数量 |
|---|---|
| 争议事件 | 61 |
| 分类 | 5（人设 / 暴力 / 失态 / 俱乐部 / 国家队）|
| 时间线条目 | 24 |
| 语录 | 16 |
| 嬷照（hero 轮播）| 37 |

## 三套主题

顶部导航可切换：

- **小小罗**（默认）：曼联红黄配色
- **沙漠骆驼**：利雅得胜利黄蓝深底
- **菌鞭罗**：皇马纯白底浅色主题

## 功能模块

- **档案库**：61 起争议事件卡片，支持分类筛选、严重程度筛选、关键词搜索、模态框翻页浏览
- **黑料盲盒 / 今日通缉令**：随机抽取一份卷宗做成通缉令海报，可下载、可一键展开完整档案
- **争议世界地图 2.0**：按地区聚合标点 + 时间轴双滑块筛选 + C罗生涯轨迹动画 + 争议热度图层，悬停查看卷宗
- **梅罗 PK 大战**：8 个维度对比 C 罗与梅西（红牌、世界杯、点球、金球等）
- **点球含金量检测仪**：9 项"注水"指标 + 综合含金量仪表盘
- **CA7 表情生成器**：选图 + 填字 + 下载，一键造梗
- **罪恶账本烧钱榜**：争议金额流水
- **人设崩塌编年史**：把"人设争议"类事件按年份串成一条向下坠落的长卷
- **绰号进化史**：9 个绰号的来历与争议
- **数据可视化**：红牌分布、争议分类占比、私生活数据
- **罗黑程度测试**：每局随机抽 8 题，答得越准分越高
- **黑料真假鉴别**：24 条语录（一半真一半假），猜 C罗真说过还是我编的，讽刺他的真话比段子还离谱
- **罗黑赌场**：用虚拟「Factos 币」对 C罗行为下注，赔率由真实历史概率决定，余额持久化
- **罗黑弹幕墙 + 段子工厂**：发射弹幕吐槽、半句接龙写段子，UGC 内容本地存储可导出
- **成就徽章系统**：阅读卷宗 / 答测试 / 开盲盒 / 发弹幕等行为解锁十枚徽章，进度持久化
- **SIU 音效彩蛋**：右下悬浮按钮，点击播放 SIU 庆祝（音效 + 全屏姿势）

## 自定义 SIU 素材

所有 SIU 触发点（右下悬浮按钮 / 底部封印集齐7印 / 直接调用）统一播放：**cr7 真人视频**（`assets/videos/siu.mp4`，全屏循环）+ **原版 SIU 音效**（`assets/siu.mp3`，同步播放）。素材优先级：视频 > 图片 > 原创矢量；音效：mp3 > WebAudio 合成（详见 `assets/images/SIU-放这里.txt`）。

- 视频：`assets/videos/siu.mp4`（当前生效，cr7 真人 SIU）
- 音效：`assets/siu.mp3`（当前生效，原版 SIU 音效）
- 庆祝图：`assets/images/siu.jpg`（可选兜底）

> ⚠️ 原版录音与真人影像受版权 / 肖像权保护，如需使用请确保合法授权。

## 免责声明

本网站为球迷文化创作，所有事件均基于公开新闻报道整理，不代表任何官方立场。克里斯蒂亚诺·罗纳尔多是世界足坛最伟大的球员之一，本站仅记录其职业生涯中的争议事件。内容仅供娱乐。

DATA SOURCES: AP / ESPN / CNN / BBC / SKY SPORTS / 腾讯体育 / 知乎

## 开发说明

`build/` 和 `scripts/` 目录是开发期用的图片下载 / 去重 / 维基抓取脚本，已加入 `.gitignore`，不计入部署。`docs/` 为原始资料与开发日志，同样不计入部署。**例外**：`scripts/generate-pages.js` 是事件子页面与 sitemap 的构建脚本，**已计入部署**（在 `.gitignore` 中显式放行）。

### 事件数据改动后重新生成子页面

修改了 `assets/js/data.js` 中的事件数据（增删事件、改标题/正文）后，必须重新运行构建脚本，否则首页卡片跳转的子页面与 sitemap 会与数据不一致：

```bash
npm run build:seo          # 等价于 node scripts/generate-pages.js
```

该脚本会：
- 读取 `data.js` 的 `events` 数组；
- 为每个事件生成 `incident/<slug>/index.html`（含独立 `<title>` / meta / OG / canonical / JSON-LD 结构化数据，英文内容静态直出，爬虫无需 JS 即可收录）；
- 重新生成 `sitemap.xml`（首页 + 全部事件页，`changefreq=monthly` / `priority=0.8`）；
- 重新生成 `assets/js/incident-slugs.js`（id → slug 查询表）。

> slug 由事件英文标题 `titleEn` 自动生成（如 `Spanish Tax Fraud Case` → `spanish-tax-fraud-case`）。若某事件自带 `slug` 字段则优先使用，以便未来固化 URL。

如需本地预览：

```bash
python -m http.server 8000
# 浏览器打开 http://localhost:8000
```
