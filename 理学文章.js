// ════════════════════════════════════════════════════════════
// 理学文章.js — 理学板块文章 + 命令表 (自 文章数据.js 拆出)
// 板块: 理学 (技术文档 / 命令行)   格式: txt / html / svg, 不支持 Markdown
// 说明: 经典脚本, file:// 下可加载; 挂 window.理学文章
//       命令表 = gh/git 命令速查数据 (命令手册 UI 使用)
// ════════════════════════════════════════════════════════════
(function (根) {
  'use strict';

  const 命令表 = [
  {
    "组": "认证",
    "图标": "🔐",
    "命令": [
      {
        "令": "gh auth login --web",
        "说": "浏览器设备码授权登录 GitHub"
      },
      {
        "令": "gh auth login --with-token < token.txt",
        "说": "用 Personal Access Token 登录"
      },
      {
        "令": "gh auth status",
        "说": "查看当前登录账号与权限"
      },
      {
        "令": "gh auth switch",
        "说": "多账号之间切换"
      },
      {
        "令": "gh auth refresh",
        "说": "刷新令牌与作用域"
      },
      {
        "令": "gh auth setup-git",
        "说": "把 gh 作为 git 凭据助手"
      }
    ]
  },
  {
    "组": "仓库",
    "图标": "📦",
    "命令": [
      {
        "令": "gh repo clone <owner/repo>",
        "说": "克隆仓库 (免密码)"
      },
      {
        "令": "gh repo create <name> --public --source=. --push",
        "说": "从当前目录创建并推送"
      },
      {
        "令": "gh repo fork <owner/repo> --clone",
        "说": "派生并克隆"
      },
      {
        "令": "gh repo view --web",
        "说": "浏览器打开仓库页"
      },
      {
        "令": "gh repo list --limit 50",
        "说": "列出自己的仓库"
      },
      {
        "令": "gh repo edit --description \"...\"",
        "说": "修改仓库描述"
      }
    ]
  },
  {
    "组": "PR",
    "图标": "🔀",
    "命令": [
      {
        "令": "gh pr create --fill",
        "说": "按提交信息创建 PR"
      },
      {
        "令": "gh pr list --state open",
        "说": "列出开放 PR"
      },
      {
        "令": "gh pr checkout 123",
        "说": "切到 PR 分支"
      },
      {
        "令": "gh pr merge 123 --squash",
        "说": "压缩合并"
      },
      {
        "令": "gh pr checks",
        "说": "查看 CI 检查结果"
      },
      {
        "令": "gh pr diff 123",
        "说": "查看 PR 差异"
      }
    ]
  },
  {
    "组": "Issue",
    "图标": "🐛",
    "命令": [
      {
        "令": "gh issue create --title \"...\" --body \"...\"",
        "说": "新建 issue"
      },
      {
        "令": "gh issue list --label bug",
        "说": "按标签筛选"
      },
      {
        "令": "gh issue status",
        "说": "查看分配/提及/创建的 issue"
      },
      {
        "令": "gh issue close 12",
        "说": "关闭 issue"
      }
    ]
  },
  {
    "组": "Release",
    "图标": "🚀",
    "命令": [
      {
        "令": "gh release create v1.0.0 --generate-notes",
        "说": "创建发布并自动生成说明"
      },
      {
        "令": "gh release upload v1.0.0 ./dist.zip",
        "说": "上传发布附件"
      },
      {
        "令": "gh release list",
        "说": "列出发布"
      },
      {
        "令": "gh release download v1.0.0",
        "说": "下载发布附件"
      }
    ]
  },
  {
    "组": "Actions",
    "图标": "⚙️",
    "命令": [
      {
        "令": "gh run list --limit 10",
        "说": "列出工作流运行"
      },
      {
        "令": "gh run watch",
        "说": "实时跟踪运行日志"
      },
      {
        "令": "gh run rerun <run-id>",
        "说": "重跑失败任务"
      },
      {
        "令": "gh workflow run deploy.yml",
        "说": "手动触发工作流"
      }
    ]
  },
  {
    "组": "加速",
    "图标": "⚡",
    "命令": [
      {
        "令": "git config --global url.\"https://ghfast.top/https://github.com/\".insteadOf \"https://github.com/\"",
        "说": "全局替换, git clone 自动加速"
      },
      {
        "令": "npm config set registry https://registry.npmmirror.com",
        "说": "npm 切国内源"
      },
      {
        "令": "pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple",
        "说": "pip 切清华源"
      },
      {
        "令": "git clone https://gitclone.com/github.com/owner/repo.git",
        "说": "gitclone 镜像克隆"
      }
    ]
  }
];

  const 文章表 = [
    {"标题":"gh CLI 安装与登录 (MSYS2 篇)","作者":"truenice2","日期":"2026-09-03","标签":["gh","MSYS2"],"格式":"txt","板块":"理学","正文":"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n  gh CLI 安装与登录 (MSYS2 篇)\n  作者: truenice2   更新: 2026-09-03\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n【1. 安装 (MSYS2)】\n\n    pacman -S --noconfirm --needed mingw-w64-x86_64-github-cli\n    gh --version\n\n  本机结果: gh version 2.98.0 (2026-08-21)\n  安装位置: F:\\msys64\\mingw64\\bin\\gh.exe\n\n  注意: npm 上的 gh-cli (0.0.1) 与 gh (2.8.9) 都不是官方包,\n        不要用来安装官方 CLI。\n\n【2. 登录 (浏览器设备码)】\n\n    gh auth login --web --git-protocol https --skip-ssh-key\n\n  终端会给出一次性代码 (例如 B3A8-C5C4) 与地址:\n    https://github.com/login/device\n\n  浏览器填入代码 → Authorize → 终端提示:\n    Logged in as truenice2\n\n  无浏览器时用 PAT:\n\n    echo \"ghp_xxx\" > token.txt\n    gh auth login --with-token < token.txt\n\n【3. 验证】\n\n    gh auth status\n    gh api user --jq .login\n    gh repo list --limit 10\n\n  本机账号: truenice2 (niceup)\n  令牌作用域: gist / read:org / repo\n  已有仓库: truenice2.github.io / truenice2bbb / truenice2hello\n            truenice2htm / netlify-starter (全部 PUBLIC)\n\n【4. 国内加速 (仅对下载有效)】\n\n    git config --global url.\"https://ghfast.top/https://github.com/\".insteadOf \"https://github.com/\"\n\n  登录本身必须直连 github.com, 加速代理无法替代。\n  若出现 dial tcp 超时, 重试一次通常即可恢复。\n"},
    {"标题":"GitHub 加速下载完全指南","作者":"truenice2","日期":"2026-09-03","标签":["加速","下载"],"格式":"txt","板块":"理学","正文":"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n  GitHub 加速下载完全指南\n  作者: truenice2   更新: 2026-09-03\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n【1. 四类链接的加速拼法】\n\n  ┌ raw 文件\n  │ 原: https://raw.githubusercontent.com/o/r/main/a.js\n  │ 快: https://ghfast.top/https://raw.githubusercontent.com/o/r/main/a.js\n  │\n  ├ release 附件\n  │ 原: https://github.com/o/r/releases/download/v1/a.zip\n  │ 快: https://ghfast.top/https://github.com/o/r/releases/download/v1/a.zip\n  │\n  ├ 仓库归档\n  │ 原: https://github.com/o/r/archive/refs/heads/main.zip\n  │ 快: https://ghfast.top/https://github.com/o/r/archive/refs/heads/main.zip\n  │\n  └ git clone\n    原: https://github.com/o/r.git\n    快: https://gitclone.com/github.com/o/r.git\n\n【2. 公共代理节点】\n\n  ghfast.top                  全站加速 (推荐, 实测可用)\n  v6.gh-proxy.org             gh-proxy 官方 v6 节点\n  hk.gh-proxy.org             中国香港节点\n  cdn.gh-proxy.org            CDN 节点\n  edgeone.gh-proxy.org        EdgeOne 边缘节点\n\n【3. jsDelivr 备用 (仓库文件)】\n\n  https://fastly.jsdelivr.net/gh/owner/repo@分支/路径\n  https://gcore.jsdelivr.net/gh/owner/repo@分支/路径\n\n【4. 兜底顺序】\n\n  1) 直连   2) ghfast   3) gh-proxy 各节点\n  4) jsDelivr          5) 自建 Cloudflare Workers 代理\n\n【5. 本机镜像源现状】\n\n  pacman  → mirror.nju.edu.cn/msys2   (南京大学)\n  npm     → registry.npmmirror.com    (清华)\n  pip     → pypi.tuna.tsinghua.edu.cn (清华)\n"},
    {"标题":"静态博客 Hexo + Butterfly + GitHub Pages","作者":"truenice2","日期":"2026-09-03","标签":["Hexo","部署"],"格式":"txt","板块":"理学","正文":"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n  Hexo 博客部署到 GitHub Pages\n  作者: truenice2   更新: 2026-09-03\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n【1. 本机位置】\n\n  F:\\folder\\html\\hexoblog    Hexo + Butterfly 主题\n\n【2. 部署配置 (_config.yml)】\n\n  deploy:\n    type: git\n    repository: https://github.com/morisw2/morisw2.github.io.git\n    branch: main\n\n【3. 常用命令】\n\n  hexo new \"文章标题\"      新建文章\n  hexo clean && hexo g     清理并生成到 public/\n  hexo s                   本地预览 http://localhost:4000\n  hexo d                   部署到 GitHub Pages\n\n【4. 评论 (gitalk)】\n\n  在 GitHub 申请 OAuth Application, 把 client_id 与\n  client_secret 写入 _config.butterfly.yml。\n\n  评论以 Issue 形式存放在仓库中, 不需要数据库。\n  本站门户改用本地存储 (localStorage / IndexedDB / sql.js),\n  离线也能看评论。\n\n【5. 自定义域名】\n\n  在 source/CNAME 写入域名, DNS 用 CNAME 指向\n  <用户名>.github.io, 生效需等待 5~30 分钟。\n"},
    {"标题":"file:// 静态站的三种存储方案","作者":"truenice2","日期":"2026-09-03","标签":["存储","离线"],"格式":"txt","板块":"理学","正文":"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n  file:// 直开站点的数据持久化\n  作者: truenice2   更新: 2026-09-03\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n双击 htm 就能打开, 意味着没有后端、没有 http 同源服务,\n存储只能在浏览器内解决。本站采用三层:\n\n【第一层 — localStorage (主存储)】\n\n  localStorage.setItem('键', JSON.stringify(值));\n\n  · Chrome 在 file:// 下可用 (origin 为 null, 但可读写)\n  · 容量约 5MB, 同步 API, 最简单可靠\n  · 本站收藏 / 历史 / 评论 / 点赞 / 自建资源都存在这里\n\n【第二层 — IndexedDB (结构化异步层)】\n\n  idb.openDB('gh门户', 1, { upgrade: ... })\n\n  · 容量可达数百 MB, 支持索引与事务\n  · Chrome 在 file:// 下会抛 SecurityError, 必须 try/catch\n  · 若不可用, 状态栏显示 IDB ✗, 功能不受影响\n\n【第三层 — sql.js (完整 SQL)】\n\n  initSqlJs({ locateFile: f => CDN目录 + f })\n\n  · SQLite 编译成 WASM, 可跑完整 SQL, 并能导出 .db 文件\n  · 依赖 CDN, 断网时自动跳过\n  · 本站用它做数据镜像与 .db 导出\n\n【关键点: 不要用 fetch 读本地文件】\n\n  file:// 下 fetch('./数据.json') 与 import './模块.js'\n  都会被 CORS 拦截。数据应写成 window.数据 = {...} 的\n  经典脚本, 用 <script src> 引入。\n\n  这也是本站把 ESM 写成\"无静态 import/export\"的原因:\n  http 下可用 import() 加载, file:// 下自动回退经典脚本。\n"},
    {"标题":"frp 自建内网穿透要点","作者":"truenice2","日期":"2026-09-03","标签":["frp","穿透"],"格式":"txt","板块":"理学","正文":"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n  frp 0.71.0 自建内网穿透\n  作者: truenice2   更新: 2026-09-03\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n【目录】\n\n  F:\\luckylang_js\\examples\\github项目\\frp-0.71.0   (Go 源码)\n\n【服务端 frps.toml】\n\n  bindPort = 7000\n  auth.token = \"自定义令牌\"\n  webServer.addr = \"0.0.0.0\"\n  webServer.port = 7500\n  webServer.user = \"admin\"\n  webServer.password = \"自定义\"\n\n【客户端 frpc.toml】\n\n  serverAddr = \"服务器IP\"\n  serverPort = 7000\n  auth.token = \"与服务端一致\"\n\n  [[proxies]]\n  name = \"web\"\n  type = \"tcp\"\n  localIP = \"127.0.0.1\"\n  localPort = 1905\n  remotePort = 1905\n\n【踩坑记录】\n\n  · 云服务器安全组要放行 7000 / 7500 以及每个 remotePort\n  · systemd 托管时, ExecStart 必须写绝对路径\n  · token 不一致时, 日志出现 \"token in login doesn't match\"\n  · 老版本 frpc.ini 与新版 frpc.toml 不能混用\n"},
    {"标题":"2026 静态托管平台选型对比","作者":"truenice2","日期":"2026-09-03","标签":["部署","选型"],"格式":"txt","板块":"理学","正文":"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n  2026 静态托管平台选型对比\n  作者: truenice2   更新: 2026-09-03\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n【额度与访问对比】\n\n  平台             免费额度              自定义域名   国内访问\n  ─────────────────────────────────────────────────────────\n  GitHub Pages     1GB 存储/100GB 流量      支持       一般\n  Cloudflare Pages 无限带宽/500 次构建     支持       较好\n  EdgeOne Pages    不限流量/双线路         支持       最稳\n  Vercel           100GB 带宽             支持       不稳\n  Netlify          100GB/300 构建分钟      支持       一般\n  Surge.sh         无限站点               支持       一般\n\n【结论】\n\n  · 国内访客为主   → EdgeOne Pages 或 Cloudflare Pages\n  · 已在用 GitHub  → GitHub Pages + Actions 自动构建\n  · 前端框架演示   → Vercel / Netlify\n  · 命令行一条命令 → Surge.sh\n\n【本站做法】\n\n  本门户不依赖任何托管, 直接 file:// 双击打开,\n  数据落在 localStorage / IndexedDB / sql.js 三层,\n  换电脑拷目录即可迁移。需要分享时再推到 Pages。\n"},
    {"标题":"gh / git 命令速查全表","作者":"truenice2","日期":"2026-09-03","标签":["gh","git","命令"],"格式":"txt","板块":"理学","正文":"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n  gh / git 命令速查全表 (34 条)\n  板块: 理学    来源: 命令表迁移为 txt 文章    更新: 2026-09-03\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n【认证】🔐\n  gh auth login --web\n  gh auth login --with-token < token.txt\n  gh auth status\n  gh auth switch\n  gh auth refresh\n  gh auth setup-git\n\n【仓库】📦\n  gh repo clone <owner/repo>\n  gh repo create <name> --public --source=. --push\n  gh repo fork <owner/repo> --clone\n  gh repo view --web\n  gh repo list --limit 50\n  gh repo edit --description \"...\"\n\n【PR】🔀\n  gh pr create --fill\n  gh pr list --state open\n  gh pr checkout 123\n  gh pr merge 123 --squash\n  gh pr checks\n  gh pr diff 123\n\n【Issue】🐛\n  gh issue create --title \"...\" --body \"...\"\n  gh issue list --label bug\n  gh issue status\n  gh issue close 12\n\n【Release】🚀\n  gh release create v1.0.0 --generate-notes\n  gh release upload v1.0.0 ./dist.zip\n  gh release list\n  gh release download v1.0.0\n\n【Actions】⚙️\n  gh run list --limit 10\n  gh run watch\n  gh run rerun <run-id>\n  gh workflow run deploy.yml\n\n【加速】⚡\n  git config --global url.\"https://ghfast.top/https://github.com/\".insteadOf \"https://github.com/\"\n  npm config set registry https://registry.npmmirror.com\n  pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple\n  git clone https://gitclone.com/github.com/owner/repo.git\n\n提示: 本站命令速查也可在 理学板块 顶部的一键复制手册中查看。"},
    {"标题":"2026 GEO 生成引擎优化实践","作者":"truenice2","日期":"2026-09-03","标签":["GEO","SEO","AI 搜索"],"格式":"txt","板块":"理学","正文":"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n  2026 GEO 生成引擎优化实践\n  作者: truenice2   更新: 2026-09-03\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n【0. 什么是 GEO】\n\n  GEO (Generative Engine Optimization) = 面向生成引擎的优化。\n  ChatGPT / Perplexity / Google AI Overviews / Copilot 已经能直接\n  回答问题而不产生点击, 一个答案只会引用 2~7 个站点。\n  优化目标从\"排在结果页\"变成\"成为模型引用的那句话\"。\n\n【1. 最重要的五件事】\n\n  1) 答案前置: 每段开头 1~2 句直接给结论与定义\n  2) 结构化数据: FAQPage / Article / Organization / Breadcrumb\n  3) 证据密度: 具体数字、带日期的基准、对比表、命名实体\n  4) 可引用溯源: 作者署名、最后更新日期、行内来源\n  5) AI 可达性: robots.txt 放行 AI 爬虫、llms.txt、可抓取的 HTML\n\n【2. Schema 优先级 (JSON-LD)】\n\n  Article/BlogPosting  文章类, 含 author/datePublished/dateModified\n  FAQPage              问答即答案单元 (AI 抽取率最高的类型之一)\n  HowTo                教程/流程, 步骤可被逐条引用\n  Organization         站点一次, 配 sameAs 与 logo\n  BreadcrumbList       主题层级\n\n【3. llms.txt 与 AI 爬虫】\n\n  robots.txt 放行:\n    GPTBot / ChatGPT-User / ClaudeBot / PerplexityBot / Google-Extended\n\n  llms.txt: 类似 robots.txt 的 LLM 站点地图, 2026 年早期标准,\n  实现成本极低 (一个 txt), 值得先行占位。\n\n【4. 本站已落地 (2026-09-03)】\n\n  · Bing Webmaster: meta msvalidate.01 + BingSiteAuth.xml + CNAME 验证\n  · robots.txt: 放行全部 + AI 生成引擎爬虫\n  · llms.txt: 板块 / 文档 / 加速源概览\n  · sitemap.xml + JSON-LD (WebSite + Organization) 在首页 head\n  · 内容: txt/html/svg 文档自带作者与日期, 文章卡片含格式徽章\n\n【5. 后续建议】\n\n  · 文档详情页加 Article schema (日期/作者已有字段)\n  · 每篇文档开头写\"一段式答案\"再展开\n  · 定期用 ChatGPT/Perplexity 提问自查是否被引用\n"}
  ];

  const 数据 = {
    文章表, 命令表,
    板块: '理学',
    版本: 'v1.4',
    生成时间: '2026-09-03',
  };

  根.理学文章 = 数据;

  if (typeof module !== 'undefined' && module.exports) module.exports = 数据;
})(typeof window !== 'undefined' ? window : globalThis);
