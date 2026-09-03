// ════════════════════════════════════════════════════════════
// 文章数据.js — 文章与文档内容 (从 网站数据.js 拆出)
// 格式: 每篇 { 标题, 作者, 日期, 标签, 格式, 正文 }
//       格式支持 txt (等宽纯文本) / html (富文本片段) / svg (矢量图)
//       本门户不支持 Markdown, 一律用上述三种格式替代
// 加载: 经典 <script src>, file:// 下可用
// ════════════════════════════════════════════════════════════
(function (根) {
  'use strict';

  const 文章表 = [
    // ══════════════ txt 格式 ══════════════
    {
      标题: 'gh CLI 安装与登录 (MSYS2 篇)', 作者: 'truenice2', 日期: '2026-09-03',
      标签: ['gh', 'MSYS2'], 格式: 'txt', 板块: '理学',
      正文:
`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  gh CLI 安装与登录 (MSYS2 篇)
  作者: truenice2   更新: 2026-09-03
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

【1. 安装 (MSYS2)】

    pacman -S --noconfirm --needed mingw-w64-x86_64-github-cli
    gh --version

  本机结果: gh version 2.98.0 (2026-08-21)
  安装位置: F:\\msys64\\mingw64\\bin\\gh.exe

  注意: npm 上的 gh-cli (0.0.1) 与 gh (2.8.9) 都不是官方包,
        不要用来安装官方 CLI。

【2. 登录 (浏览器设备码)】

    gh auth login --web --git-protocol https --skip-ssh-key

  终端会给出一次性代码 (例如 B3A8-C5C4) 与地址:
    https://github.com/login/device

  浏览器填入代码 → Authorize → 终端提示:
    Logged in as truenice2

  无浏览器时用 PAT:

    echo "ghp_xxx" > token.txt
    gh auth login --with-token < token.txt

【3. 验证】

    gh auth status
    gh api user --jq .login
    gh repo list --limit 10

  本机账号: truenice2 (niceup)
  令牌作用域: gist / read:org / repo
  已有仓库: truenice2.github.io / truenice2bbb / truenice2hello
            truenice2htm / netlify-starter (全部 PUBLIC)

【4. 国内加速 (仅对下载有效)】

    git config --global url."https://ghfast.top/https://github.com/".insteadOf "https://github.com/"

  登录本身必须直连 github.com, 加速代理无法替代。
  若出现 dial tcp 超时, 重试一次通常即可恢复。
`
    },
    {
      标题: 'GitHub 加速下载完全指南', 作者: 'truenice2', 日期: '2026-09-03',
      标签: ['加速', '下载'], 格式: 'txt', 板块: '理学',
      正文:
`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  GitHub 加速下载完全指南
  作者: truenice2   更新: 2026-09-03
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

【1. 四类链接的加速拼法】

  ┌ raw 文件
  │ 原: https://raw.githubusercontent.com/o/r/main/a.js
  │ 快: https://ghfast.top/https://raw.githubusercontent.com/o/r/main/a.js
  │
  ├ release 附件
  │ 原: https://github.com/o/r/releases/download/v1/a.zip
  │ 快: https://ghfast.top/https://github.com/o/r/releases/download/v1/a.zip
  │
  ├ 仓库归档
  │ 原: https://github.com/o/r/archive/refs/heads/main.zip
  │ 快: https://ghfast.top/https://github.com/o/r/archive/refs/heads/main.zip
  │
  └ git clone
    原: https://github.com/o/r.git
    快: https://gitclone.com/github.com/o/r.git

【2. 公共代理节点】

  ghfast.top                  全站加速 (推荐, 实测可用)
  v6.gh-proxy.org             gh-proxy 官方 v6 节点
  hk.gh-proxy.org             中国香港节点
  cdn.gh-proxy.org            CDN 节点
  edgeone.gh-proxy.org        EdgeOne 边缘节点

【3. jsDelivr 备用 (仓库文件)】

  https://fastly.jsdelivr.net/gh/owner/repo@分支/路径
  https://gcore.jsdelivr.net/gh/owner/repo@分支/路径

【4. 兜底顺序】

  1) 直连   2) ghfast   3) gh-proxy 各节点
  4) jsDelivr          5) 自建 Cloudflare Workers 代理

【5. 本机镜像源现状】

  pacman  → mirror.nju.edu.cn/msys2   (南京大学)
  npm     → registry.npmmirror.com    (清华)
  pip     → pypi.tuna.tsinghua.edu.cn (清华)
`
    },
    {
      标题: '静态博客 Hexo + Butterfly + GitHub Pages', 作者: 'truenice2', 日期: '2026-09-03',
      标签: ['Hexo', '部署'], 格式: 'txt', 板块: '理学',
      正文:
`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Hexo 博客部署到 GitHub Pages
  作者: truenice2   更新: 2026-09-03
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

【1. 本机位置】

  F:\\folder\\html\\hexoblog    Hexo + Butterfly 主题

【2. 部署配置 (_config.yml)】

  deploy:
    type: git
    repository: https://github.com/morisw2/morisw2.github.io.git
    branch: main

【3. 常用命令】

  hexo new "文章标题"      新建文章
  hexo clean && hexo g     清理并生成到 public/
  hexo s                   本地预览 http://localhost:4000
  hexo d                   部署到 GitHub Pages

【4. 评论 (gitalk)】

  在 GitHub 申请 OAuth Application, 把 client_id 与
  client_secret 写入 _config.butterfly.yml。

  评论以 Issue 形式存放在仓库中, 不需要数据库。
  本站门户改用本地存储 (localStorage / IndexedDB / sql.js),
  离线也能看评论。

【5. 自定义域名】

  在 source/CNAME 写入域名, DNS 用 CNAME 指向
  <用户名>.github.io, 生效需等待 5~30 分钟。
`
    },
    {
      标题: 'file:// 静态站的三种存储方案', 作者: 'truenice2', 日期: '2026-09-03',
      标签: ['存储', '离线'], 格式: 'txt', 板块: '理学',
      正文:
`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  file:// 直开站点的数据持久化
  作者: truenice2   更新: 2026-09-03
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

双击 htm 就能打开, 意味着没有后端、没有 http 同源服务,
存储只能在浏览器内解决。本站采用三层:

【第一层 — localStorage (主存储)】

  localStorage.setItem('键', JSON.stringify(值));

  · Chrome 在 file:// 下可用 (origin 为 null, 但可读写)
  · 容量约 5MB, 同步 API, 最简单可靠
  · 本站收藏 / 历史 / 评论 / 点赞 / 自建资源都存在这里

【第二层 — IndexedDB (结构化异步层)】

  idb.openDB('gh门户', 1, { upgrade: ... })

  · 容量可达数百 MB, 支持索引与事务
  · Chrome 在 file:// 下会抛 SecurityError, 必须 try/catch
  · 若不可用, 状态栏显示 IDB ✗, 功能不受影响

【第三层 — sql.js (完整 SQL)】

  initSqlJs({ locateFile: f => CDN目录 + f })

  · SQLite 编译成 WASM, 可跑完整 SQL, 并能导出 .db 文件
  · 依赖 CDN, 断网时自动跳过
  · 本站用它做数据镜像与 .db 导出

【关键点: 不要用 fetch 读本地文件】

  file:// 下 fetch('./数据.json') 与 import './模块.js'
  都会被 CORS 拦截。数据应写成 window.数据 = {...} 的
  经典脚本, 用 <script src> 引入。

  这也是本站把 ESM 写成"无静态 import/export"的原因:
  http 下可用 import() 加载, file:// 下自动回退经典脚本。
`
    },
    {
      标题: 'frp 自建内网穿透要点', 作者: 'truenice2', 日期: '2026-09-03',
      标签: ['frp', '穿透'], 格式: 'txt', 板块: '理学',
      正文:
`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  frp 0.71.0 自建内网穿透
  作者: truenice2   更新: 2026-09-03
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

【目录】

  F:\\luckylang_js\\examples\\github项目\\frp-0.71.0   (Go 源码)

【服务端 frps.toml】

  bindPort = 7000
  auth.token = "自定义令牌"
  webServer.addr = "0.0.0.0"
  webServer.port = 7500
  webServer.user = "admin"
  webServer.password = "自定义"

【客户端 frpc.toml】

  serverAddr = "服务器IP"
  serverPort = 7000
  auth.token = "与服务端一致"

  [[proxies]]
  name = "web"
  type = "tcp"
  localIP = "127.0.0.1"
  localPort = 1905
  remotePort = 1905

【踩坑记录】

  · 云服务器安全组要放行 7000 / 7500 以及每个 remotePort
  · systemd 托管时, ExecStart 必须写绝对路径
  · token 不一致时, 日志出现 "token in login doesn't match"
  · 老版本 frpc.ini 与新版 frpc.toml 不能混用
`
    },
    {
      标题: '2026 静态托管平台选型对比', 作者: 'truenice2', 日期: '2026-09-03',
      标签: ['部署', '选型'], 格式: 'txt', 板块: '理学',
      正文:
`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  2026 静态托管平台选型对比
  作者: truenice2   更新: 2026-09-03
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

【额度与访问对比】

  平台             免费额度              自定义域名   国内访问
  ─────────────────────────────────────────────────────────
  GitHub Pages     1GB 存储/100GB 流量      支持       一般
  Cloudflare Pages 无限带宽/500 次构建     支持       较好
  EdgeOne Pages    不限流量/双线路         支持       最稳
  Vercel           100GB 带宽             支持       不稳
  Netlify          100GB/300 构建分钟      支持       一般
  Surge.sh         无限站点               支持       一般

【结论】

  · 国内访客为主   → EdgeOne Pages 或 Cloudflare Pages
  · 已在用 GitHub  → GitHub Pages + Actions 自动构建
  · 前端框架演示   → Vercel / Netlify
  · 命令行一条命令 → Surge.sh

【本站做法】

  本门户不依赖任何托管, 直接 file:// 双击打开,
  数据落在 localStorage / IndexedDB / sql.js 三层,
  换电脑拷目录即可迁移。需要分享时再推到 Pages。
`
    },

    // ══════════════ html 格式 ══════════════
    {
      标题: '白色 + 粉色主题设计说明 (HTML)', 作者: 'truenice2', 日期: '2026-09-03',
      标签: ['设计', '主题', 'HTML'], 格式: 'html', 板块: '文学',
      正文: `
<h3>配色变量</h3>
<table>
  <tr><th>变量</th><th>色值</th><th>用途</th></tr>
  <tr><td>--主色</td><td><code>#d4456f</code></td><td>玫红主色 (顶栏渐变 / 按钮)</td></tr>
  <tr><td>--次色</td><td><code>#f6a5c0</code></td><td>浅粉 (描边 / 悬停)</td></tr>
  <tr><td>--背景</td><td><code>#fdf7fa</code></td><td>极浅粉底</td></tr>
  <tr><td>--边框</td><td><code>#f0e2ea</code></td><td>卡片分隔线</td></tr>
</table>
<h3>布局层次</h3>
<ul>
  <li><b>顶栏</b> — fixed 定位, 向下滚动隐藏, 向上滚动显示</li>
  <li><b>侧栏</b> — 可折叠, 收起后内容区网格列数自动变密</li>
  <li><b>卡片</b> — 12px 圆角 + 淡粉阴影, 悬停上移 3px</li>
  <li><b>弹窗</b> — 遮罩 + 缩放弹入动画, Esc 关闭</li>
</ul>
<blockquote>本站不使用 Markdown, 文档统一用 txt / html / svg 三种格式,
这一篇就是 html 格式的示例。</blockquote>`
    },

    // ══════════════ svg 格式 ══════════════
    {
      标题: '门户架构图 (SVG)', 作者: 'truenice2', 日期: '2026-09-03',
      标签: ['架构', 'SVG'], 格式: 'svg', 板块: '文学',
      正文: `<svg viewBox="0 0 620 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto">
  <rect width="620" height="300" fill="#fdf7fa" rx="10"/>
  <text x="310" y="28" text-anchor="middle" font-size="17" fill="#b8375c" font-weight="bold">GH 资源门户 · 架构分层</text>

  <rect x="40" y="50" width="160" height="52" rx="8" fill="#d4456f"/>
  <text x="120" y="72" text-anchor="middle" font-size="13" fill="#fff">网站主页.htm</text>
  <text x="120" y="90" text-anchor="middle" font-size="11" fill="#ffe3ee">骨架 + ESM 加载器</text>

  <rect x="230" y="50" width="160" height="52" rx="8" fill="#f6a5c0"/>
  <text x="310" y="72" text-anchor="middle" font-size="13" fill="#7a2b47">网站主页.js (核心)</text>
  <text x="310" y="90" text-anchor="middle" font-size="11" fill="#7a2b47">存储 / 路由 / 业务</text>

  <rect x="420" y="50" width="160" height="52" rx="8" fill="#f6a5c0"/>
  <text x="500" y="72" text-anchor="middle" font-size="13" fill="#7a2b47">网页操作.js (渲染)</text>
  <text x="500" y="90" text-anchor="middle" font-size="11" fill="#7a2b47">DOM / 事件 / 弹窗</text>

  <rect x="40" y="130" width="250" height="52" rx="8" fill="#ffffff" stroke="#f0e2ea"/>
  <text x="165" y="152" text-anchor="middle" font-size="13" fill="#2d2a2e">网站数据.js</text>
  <text x="165" y="170" text-anchor="middle" font-size="11" fill="#8a8490">资源 / 加速源 / 命令 / 导航</text>

  <rect x="330" y="130" width="250" height="52" rx="8" fill="#ffffff" stroke="#f0e2ea"/>
  <text x="455" y="152" text-anchor="middle" font-size="13" fill="#2d2a2e">文章数据.js</text>
  <text x="455" y="170" text-anchor="middle" font-size="11" fill="#8a8490">txt / html / svg 文章</text>

  <rect x="40" y="210" width="540" height="52" rx="8" fill="#ffffff" stroke="#f0e2ea"/>
  <text x="310" y="232" text-anchor="middle" font-size="13" fill="#2d2a2e">三层存储: localStorage (主) · IndexedDB (idb) · sql.js (WASM)</text>
  <text x="310" y="250" text-anchor="middle" font-size="11" fill="#8a8490">CDN: marked 已移除 · idb / sql.js 多源回退 · 断网自动降级</text>

  <path d="M200 76 L228 76" stroke="#d4456f" stroke-width="2" marker-end="url(#a)"/>
  <path d="M390 76 L418 76" stroke="#d4456f" stroke-width="2" marker-end="url(#a)"/>
  <path d="M120 104 L120 128" stroke="#d4456f" stroke-width="2" marker-end="url(#a)"/>
  <path d="M310 104 L310 128" stroke="#d4456f" stroke-width="2" marker-end="url(#a)"/>
  <defs>
    <marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 Z" fill="#d4456f"/>
    </marker>
  </defs>
</svg>`
    },

    {
      标题: '浅粉色的下午: 一次配色的取舍', 作者: 'truenice2', 日期: '2026-09-03',
      标签: ['随笔', '配色'], 格式: 'txt', 板块: '文学',
      正文:
`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  浅粉色的下午: 一次配色的取舍
  作者: truenice2   更新: 2026-09-03
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

一开始我选的是玫红 #d4456f, 顶栏铺满, 整个站像一颗糖。
看了半小时, 眼睛开始累 —— 饱和度高的颜色适合点缀,
不适合当底色, 更不适合长时间阅读。

于是把主色调浅:

  主色   #d4456f  →  #f7a8c4    浅粉, 用在按钮与强调
  次色   #f6a5c0  →  #fbd8e6    更浅, 用在描边与悬停
  背景   #fdf7fa  →  #fffafd    近白, 只留一点点粉
  文字   #2d2a2e  →  #4a4048    略调暖, 与粉底更协调

顶栏改成浅粉渐变配深粉文字, 而不是白字压深红。
白底 + 浅粉, 像纸上的淡淡荧光笔痕迹: 有记忆点,
但不抢内容的位置。

取舍的原则只有一条: 颜色要让位给内容。
一本书的封面可以鲜艳, 内页必须安静。
`
    },
    {
      标题: '我把整个工作区装进了一个 htm', 作者: 'truenice2', 日期: '2026-09-03',
      标签: ['随笔', '静态站'], 格式: 'txt', 板块: '文学',
      正文:
`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  我把整个工作区装进了一个 htm
  作者: truenice2   更新: 2026-09-03
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

这些年在 F 盘攒了几十个项目: 门户、博客、影评、
棋类、编辑器、游戏、AI 助手、内网穿透……
每次想找一个命令, 都要在资源管理器里翻半天。

后来我做了一个决定: 把它们全部写进数据文件,
用一个 htm 串起来。

于是有了这个门户:

  · 双击 网站主页.htm 就能打开, 不需要装任何东西
  · 断网也能用: 数据在本地, 存储也在本地
  · 换电脑时, 拷一个目录就走
  · 需要分享时, 推到 GitHub Pages 或 Cloudflare Pages

有意思的是, 做了这个门户之后, 我最常用的功能
不是花哨的卡片, 而是那个命令速查表 ——
gh auth login 到底要不要加 --web,
每次都要查。

工具的价值, 往往就藏在这种"每天都会忘一次"的地方。
`
    },

    {
      标题: 'gh / git 命令速查全表', 作者: 'truenice2', 日期: '2026-09-03',
      标签: ['gh', 'git', '命令'], 格式: 'txt', 板块: '理学',
      正文:
`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  gh / git 命令速查全表 (34 条)
  板块: 理学    来源: 命令表迁移为 txt 文章    更新: 2026-09-03
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

【认证】🔐
  gh auth login --web
  gh auth login --with-token < token.txt
  gh auth status
  gh auth switch
  gh auth refresh
  gh auth setup-git

【仓库】📦
  gh repo clone <owner/repo>
  gh repo create <name> --public --source=. --push
  gh repo fork <owner/repo> --clone
  gh repo view --web
  gh repo list --limit 50
  gh repo edit --description "..."

【PR】🔀
  gh pr create --fill
  gh pr list --state open
  gh pr checkout 123
  gh pr merge 123 --squash
  gh pr checks
  gh pr diff 123

【Issue】🐛
  gh issue create --title "..." --body "..."
  gh issue list --label bug
  gh issue status
  gh issue close 12

【Release】🚀
  gh release create v1.0.0 --generate-notes
  gh release upload v1.0.0 ./dist.zip
  gh release list
  gh release download v1.0.0

【Actions】⚙️
  gh run list --limit 10
  gh run watch
  gh run rerun <run-id>
  gh workflow run deploy.yml

【加速】⚡
  git config --global url."https://ghfast.top/https://github.com/".insteadOf "https://github.com/"
  npm config set registry https://registry.npmmirror.com
  pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
  git clone https://gitclone.com/github.com/owner/repo.git

提示: 本站命令速查也可在 理学板块 顶部的一键复制手册中查看。`
    },
  ];

  const 命令表 = [
    {
      组: '认证', 图标: '🔐', 命令: [
        { 令: 'gh auth login --web', 说: '浏览器设备码授权登录 GitHub' },
        { 令: 'gh auth login --with-token < token.txt', 说: '用 Personal Access Token 登录' },
        { 令: 'gh auth status', 说: '查看当前登录账号与权限' },
        { 令: 'gh auth switch', 说: '多账号之间切换' },
        { 令: 'gh auth refresh', 说: '刷新令牌与作用域' },
        { 令: 'gh auth setup-git', 说: '把 gh 作为 git 凭据助手' },
      ]
    },
    {
      组: '仓库', 图标: '📦', 命令: [
        { 令: 'gh repo clone <owner/repo>', 说: '克隆仓库 (免密码)' },
        { 令: 'gh repo create <name> --public --source=. --push', 说: '从当前目录创建并推送' },
        { 令: 'gh repo fork <owner/repo> --clone', 说: '派生并克隆' },
        { 令: 'gh repo view --web', 说: '浏览器打开仓库页' },
        { 令: 'gh repo list --limit 50', 说: '列出自己的仓库' },
        { 令: 'gh repo edit --description "..."', 说: '修改仓库描述' },
      ]
    },
    {
      组: 'PR', 图标: '🔀', 命令: [
        { 令: 'gh pr create --fill', 说: '按提交信息创建 PR' },
        { 令: 'gh pr list --state open', 说: '列出开放 PR' },
        { 令: 'gh pr checkout 123', 说: '切到 PR 分支' },
        { 令: 'gh pr merge 123 --squash', 说: '压缩合并' },
        { 令: 'gh pr checks', 说: '查看 CI 检查结果' },
        { 令: 'gh pr diff 123', 说: '查看 PR 差异' },
      ]
    },
    {
      组: 'Issue', 图标: '🐛', 命令: [
        { 令: 'gh issue create --title "..." --body "..."', 说: '新建 issue' },
        { 令: 'gh issue list --label bug', 说: '按标签筛选' },
        { 令: 'gh issue status', 说: '查看分配/提及/创建的 issue' },
        { 令: 'gh issue close 12', 说: '关闭 issue' },
      ]
    },
    {
      组: 'Release', 图标: '🚀', 命令: [
        { 令: 'gh release create v1.0.0 --generate-notes', 说: '创建发布并自动生成说明' },
        { 令: 'gh release upload v1.0.0 ./dist.zip', 说: '上传发布附件' },
        { 令: 'gh release list', 说: '列出发布' },
        { 令: 'gh release download v1.0.0', 说: '下载发布附件' },
      ]
    },
    {
      组: 'Actions', 图标: '⚙️', 命令: [
        { 令: 'gh run list --limit 10', 说: '列出工作流运行' },
        { 令: 'gh run watch', 说: '实时跟踪运行日志' },
        { 令: 'gh run rerun <run-id>', 说: '重跑失败任务' },
        { 令: 'gh workflow run deploy.yml', 说: '手动触发工作流' },
      ]
    },
    {
      组: '加速', 图标: '⚡', 命令: [
        { 令: 'git config --global url."https://ghfast.top/https://github.com/".insteadOf "https://github.com/"', 说: '全局替换, git clone 自动加速' },
        { 令: 'npm config set registry https://registry.npmmirror.com', 说: 'npm 切国内源' },
        { 令: 'pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple', 说: 'pip 切清华源' },
        { 令: 'git clone https://gitclone.com/github.com/owner/repo.git', 说: 'gitclone 镜像克隆' },
      ]
    },
  ]

  const 数据 = {
    文章表, 命令表,
    格式表: ['txt', 'html', 'svg'],
    版本: 'v1.2',
    生成时间: '2026-09-03',
  };

  根.文章数据 = 数据;

  if (typeof module !== 'undefined' && module.exports) module.exports = 数据;
})(typeof window !== 'undefined' ? window : globalThis);
