// ════════════════════════════════════════════════════════════
// 网站数据.js — GitHub 资源门户 · 种子数据 (文章内容已拆至 文章数据.js)
// 加载方式: 经典 <script src> (file:// 协议可直接加载, 不受 CORS 限制)
//           也可在 Node 中 require / 在 ESM 中读取 window.网站数据
// 说明: 本文件不使用 export 语句, 保证 file:// 下经典脚本与 ESM 环境都能用
// ════════════════════════════════════════════════════════════
(function (根) {
  'use strict';

  // ── 站点信息 ──
  const 站点 = {
    名: 'GH 资源门户',
    全名: 'GitHub 资源门户 · GH Portal',
    副标题: '加速 · 部署 · 项目 · 命令行 · 文档',
    版本: 'v1.2',
    图标: '🌸',
    上线: { 地址: 'https://gh.avasophia.indevs.in/', 仓库: 'truenice2/gh-portal' },
    账号表: {
      gh: 'truenice2',          // gh CLI 已登录账号 (2026-09-03)
      gh名: 'niceup',
      hexo: 'morisw2',          // hexoblog 部署账号
      页: 'https://truenice2.github.io',
    },
    说明: '本地 GitHub 工作区门户: 加速下载 / 部署托管 / 本地项目 / gh 命令行 / 技术文档, 纯静态 file:// 直开, 亦可线上访问',
    更新: '2026-09-03',
  };

  // ── 已登录账号的仓库 (gh repo list 实测) ──
  const 仓库表 = [
    { 名: 'truenice2.github.io', 站: 'https://truenice2.github.io', 说明: '主站点 Pages', 可见: 'PUBLIC' },
    { 名: 'truenice2bbb.github.io', 站: 'https://truenice2bbb.github.io', 说明: '备用站点 Pages', 可见: 'PUBLIC' },
    { 名: 'truenice2hello.github.io', 站: 'https://truenice2hello.github.io', 说明: 'Hello 演示站', 可见: 'PUBLIC' },
    { 名: 'truenice2htm.github.io', 站: 'https://truenice2htm.github.io', 说明: 'htm 静态站', 可见: 'PUBLIC' },
    { 名: 'netlify-starter', 站: 'https://app.netlify.com', 说明: 'Netlify 起始模板', 可见: 'PUBLIC' },
  ];

  // ── 板块 / 分类 ──
  // 顶栏板块: 首页 / 导航 / 软件 / 文学 / 理学 / 用户
  //   · 原 "工具 / 项目 / 加速" 板块 → 合并为 软件
  //   · 原 "命令" 板块 → 理学
  //   · 原 "文档" 板块 → 拆分为 文学 + 理学
  const 板块表 = [
    {
      键: '软件', 名: '软件', 图标: '💾',
      分类: ['本地项目', '开源项目', '部署平台', '加速代理', 'CDN镜像', '下载工具', '开发环境', '测试工具'],
    },
    { 键: '理学', 名: '理学', 图标: '🔬', 分类: ['命令行', '技术文档', '部署笔记'] },
    { 键: '文学', 名: '文学', 图标: '📖', 分类: ['文章'] },
  ];
  const 板块查 = {};
  板块表.forEach(b => b.分类.forEach(c => { 板块查[c] = b.键; }));

  const 分类图标 = {
    加速代理: '⚡', CDN镜像: '🌐', 下载工具: '📥',
    本地项目: '📦', 开源项目: '🌟', 部署平台: '🚀',
    命令行: '⌨️', 开发环境: '🧰', 测试工具: '🧪',
    技术文档: '📚', 部署笔记: '📝', 文章: '📄',
  };
  const 分类说明 = {
    加速代理: 'GitHub 文件/仓库加速下载代理站',
    CDN镜像: 'jsDelivr / npm / 镜像源加速',
    下载工具: '克隆与下载提速工具',
    本地项目: '本机 F 盘工作区已有项目',
    开源项目: '常用开源项目与源码工具',
    部署平台: '静态站点免费托管平台',
    命令行: 'gh / git / pacman 命令速查',
    开发环境: 'MSYS2 / Node / Python 环境',
    测试工具: 'Playwright 自动化与截图',
    技术文档: '教程与手册 (Markdown)',
    部署笔记: '部署踩坑与排查记录',
    文章: '随笔文章 · 可撰写发布',
  };

  // ── 加速源 (一键生成加速链接) ──
  const 加速源 = [
    { 键: 'ghfast', 名: 'ghfast.top', 前缀: 'https://ghfast.top/', 说明: 'GitHub 全站加速 (推荐, 实测可用)', 默认: true, 支持: ['raw', 'release', 'archive', 'clone', 'git'] },
    { 键: 'v6', 名: 'v6.gh-proxy.org', 前缀: 'https://v6.gh-proxy.org/', 说明: 'gh-proxy 官方 v6 节点 (IPv6 优先)', 支持: ['raw', 'release', 'archive'] },
    { 键: 'hk', 名: 'hk.gh-proxy.org', 前缀: 'https://hk.gh-proxy.org/', 说明: 'gh-proxy 中国香港节点', 支持: ['raw', 'release', 'archive'] },
    { 键: 'cdn', 名: 'cdn.gh-proxy.org', 前缀: 'https://cdn.gh-proxy.org/', 说明: 'gh-proxy CDN 节点', 支持: ['raw', 'release', 'archive'] },
    { 键: 'edgeone', 名: 'edgeone.gh-proxy.org', 前缀: 'https://edgeone.gh-proxy.org/', 说明: 'EdgeOne 边缘加速节点', 支持: ['raw', 'release', 'archive'] },
    { 键: 'jsdelivr', 名: 'fastly.jsdelivr.net', 前缀: 'https://fastly.jsdelivr.net/gh', 说明: 'jsDelivr GitHub CDN (仓库文件)', 支持: ['raw'], 特殊: 'jsdelivr' },
    { 键: 'gcore', 名: 'gcore.jsdelivr.net', 前缀: 'https://gcore.jsdelivr.net/gh', 说明: 'jsDelivr Gcore 节点', 支持: ['raw'], 特殊: 'jsdelivr' },
    { 键: 'gitclone', 名: 'gitclone.com', 前缀: 'https://gitclone.com/github.com/', 说明: 'git clone 加速镜像', 支持: ['clone', 'git'] },
  ];

  // ── 资源卡片 ──
  const 资源 = [
    // ═══ 加速代理 ═══
    { 名称: 'ghfast.top', 分类: '加速代理', 标签: ['加速', '下载', '推荐'], 星级: 5, 年份: 2026,
      简介: 'GitHub 文件/仓库加速下载, 在链接前拼接 https://ghfast.top/ 即可, 支持 raw / release / archive / git clone。',
      链接: 'https://ghfast.top', 要点: ['全站加速', '支持 git clone', '无需注册'] },
    { 名称: 'gh-proxy 多节点', 分类: '加速代理', 标签: ['加速', '代理'], 星级: 4, 年份: 2026,
      简介: 'gh-proxy 公共实例合集: v6 / hk / cdn / edgeone 四个节点可切换, 用于 raw 与 release 文件加速。',
      链接: 'https://gh-proxy.com', 要点: ['多节点冗余', '支持 release', '可自建'] },
    { 名称: 'gh-proxy 自建', 分类: '加速代理', 标签: ['自建', 'Cloudflare'], 星级: 4, 年份: 2026,
      简介: '基于 Cloudflare Workers 自建 gh-proxy, 私有节点更稳定, 不依赖公共实例限流。',
      链接: 'https://github.com/hunshcn/gh-proxy', 要点: ['Workers 部署', '可自定义', '防滥用'] },
    { 名称: 'gitclone.com', 分类: '加速代理', 标签: ['git', '克隆'], 星级: 4, 年份: 2026,
      简介: '把 github.com 换成 gitclone.com/github.com 即可加速 git clone, 大仓库拉取明显提速。',
      链接: 'https://gitclone.com', 要点: ['克隆加速', '镜像同步', '命令行友好'] },

    // ═══ CDN 镜像 ═══
    { 名称: 'jsDelivr', 分类: 'CDN镜像', 标签: ['CDN', 'npm', 'gh'], 星级: 5, 年份: 2026,
      简介: '免费公共 CDN, 可加速 npm 包 / GitHub 仓库文件。国内推荐 fastly / gcore / testingcf 备用域名。',
      链接: 'https://www.jsdelivr.com', 要点: ['npm 加速', 'gh 文件加速', '多域名冗余'] },
    { 名称: 'npm 清华源', 分类: 'CDN镜像', 标签: ['npm', '国内'], 星级: 5, 年份: 2026,
      简介: 'https://registry.npmmirror.com — npm / pnpm / yarn 国内镜像, 安装速度提升数十倍。',
      链接: 'https://npmmirror.com', 要点: ['npmmirror', '同步快', '含二进制镜像'] },
    { 名称: 'MSYS2 南京大学源', 分类: 'CDN镜像', 标签: ['pacman', '国内'], 星级: 5, 年份: 2026,
      简介: 'mirror.nju.edu.cn/msys2 — 本机已配置的 pacman 镜像, 安装 mingw 包走国内带宽。',
      链接: 'https://mirror.nju.edu.cn/msys2/', 要点: ['pacman 加速', '已配置', 'TUNA 备选'] },
    { 名称: 'PyPI 清华源', 分类: 'CDN镜像', 标签: ['pip', '国内'], 星级: 5, 年份: 2026,
      简介: 'https://pypi.tuna.tsinghua.edu.cn/simple — pip 安装加速, conda 亦配置 TUNA 通道。',
      链接: 'https://mirrors.tuna.tsinghua.edu.cn/pypi/web/simple', 要点: ['pip 加速', 'conda 同厂', '全量同步'] },

    // ═══ 下载工具 ═══
    { 名称: 'git 2.55 (本机)', 分类: '下载工具', 标签: ['git', '本机'], 星级: 5, 年份: 2026,
      简介: 'Git for Windows 2.55.0, 安装位置 F:\\Program Files\\Git, 全局账号 morisw2。',
      链接: 'https://git-scm.com', 要点: ['F:\\Program Files\\Git', 'user.name=morisw2', '配合 gh 使用'] },
    { 名称: 'DevSidecar', 分类: '下载工具', 标签: ['加速', '桌面端'], 星级: 4, 年份: 2026,
      简介: '桌面端开发者工具, 通过本地代理为 GitHub / StackOverflow / npm 等提速。',
      链接: 'https://github.com/docmirror/dev-sidecar', 要点: ['系统代理', '多站点', '免配置'] },
    { 名称: 'FastGithub', 分类: '下载工具', 标签: ['加速', '桌面端'], 星级: 4, 年份: 2026,
      简介: 'DNS 优选 + 本地反代, 自动为 github 域名挑选最快 IP。',
      链接: 'https://github.com/dotnetcore/FastGithub', 要点: ['DNS 优选', '开箱即用', '跨平台'] },

    // ═══ 本地项目 ═══
    { 名称: 'frp 0.71.0 内网穿透', 分类: '本地项目', 标签: ['Go', '穿透', '源码'], 星级: 5, 年份: 2026,
      简介: 'fast reverse proxy 源码工作区 (F:\\luckylang_js\\examples\\github项目\\frp-0.71.0), 用于自建内网穿透, 替代 cpolar / nat123。',
      链接: 'https://github.com/fatedier/frp', 要点: ['frps/frpc', '自建可控', 'Go 编译'] },
    { 名称: '阿里云百炼 MaaS', 分类: '本地项目', 标签: ['AI', 'OpenAI兼容'], 星级: 5, 年份: 2026,
      简介: '大模型 API 连接 (OpenAI 兼容 / Anthropic / DashScope), 北京区与香港区双业务空间, 241 个可用模型。',
      链接: 'https://bailian.console.aliyun.com', 要点: ['qwen3.8-max', 'deepseek-v4-pro', '双区域密钥'] },
    { 名称: '翻译助手.py v2.0', 分类: '本地项目', 标签: ['Python', '翻译'], 星级: 4, 年份: 2026,
      简介: '阿里云机器翻译 + argostranslate 离线兜底, 支持单条 / 文件 / 交互 / 语言检测, 615 行。',
      链接: 'https://mt.console.aliyun.com', 要点: ['QPS 50', '离线兜底', '-f 文件翻译'] },
    { 名称: 'hexoblog 静态博客', 分类: '本地项目', 标签: ['Hexo', 'Butterfly'], 星级: 5, 年份: 2026,
      简介: 'Hexo + Butterfly 主题博客 (F:\\folder\\html\\hexoblog), 部署到 github.com/morisw2/morisw2.github.io (main 分支)。',
      链接: 'https://github.com/morisw2/morisw2.github.io', 要点: ['Butterfly 主题', 'gitalk 评论', 'hexo d 一键部署'] },
    { 名称: 'cloudflare 项目', 分类: '本地项目', 标签: ['Wrangler', 'Workers'], 星级: 4, 年份: 2026,
      简介: 'Cloudflare Pages / Workers 工作区, 含静态博客、在线聊天项目、浏览器工具。',
      链接: 'https://dash.cloudflare.com', 要点: ['Pages', 'Workers', 'KV'] },
    { 名称: 'netlify 项目', 分类: '本地项目', 标签: ['静态托管'], 星级: 4, 年份: 2026,
      简介: 'Netlify 静态站点部署工作区, 支持拖拽部署与 Git 持续集成。',
      链接: 'https://app.netlify.com', 要点: ['CI/CD', '免费额度', '自定义域名'] },
    { 名称: 'infinityfree 项目', 分类: '本地项目', 标签: ['免费主机', 'PHP'], 星级: 4, 年份: 2026,
      简介: 'InfinityFree 免费 PHP 主机工作区 (uptrue.ct.ws / sweetcake.gt.tc), FTP ftpupload.net。',
      链接: 'https://infinityfree.net', 要点: ['免费 PHP', 'MySQL', 'FTP 上传'] },
    { 名称: 'hyperphp 影评站', 分类: '本地项目', 标签: ['cPanel', '影评'], 星级: 4, 年份: 2026,
      简介: '影评网站 aberry.hyperphp.com (hyperphp 免费主机, cPanel 面板), 本地 Express 版端口 1905。',
      链接: 'https://aberry.hyperphp.com', 要点: ['cPanel', '本地 Express 版', 'Playwright 测试'] },
    { 名称: 'vercel 项目', 分类: '本地项目', 标签: ['静态托管'], 星级: 4, 年份: 2026,
      简介: 'Vercel 部署工作区, 适配前端框架与 Serverless Functions。',
      链接: 'https://vercel.com', 要点: ['Serverless', '边缘网络', '自动 HTTPS'] },
    { 名称: '在线资源导航', 分类: '本地项目', 标签: ['导航站', '门户'], 星级: 5, 年份: 2026,
      简介: '冷页门户 ColdPages v2 — 游戏/媒体/电子书/门户四大板块, 纯原生 JS, file:// 直开。',
      链接: '', 要点: ['file:// 直开', 'localStorage', '顶栏浮动'] },
    { 名称: '带图资源网站', 分类: '本地项目', 标签: ['图库', '门户'], 星级: 4, 年份: 2026,
      简介: '服饰/鞋袜/多媒体图库门户, 顶栏浮动与侧栏折叠的参考实现 (js\\应用.js)。',
      链接: '', 要点: ['顶栏浮动参考', '侧栏折叠参考', '粉色主题'] },
    { 名称: '宝可梦 H5 (朱 / 火红)', 分类: '本地项目', 标签: ['游戏', 'Phaser'], 星级: 5, 年份: 2026,
      简介: 'RMXP 宝可梦移植 H5: Vue3 + Phaser4 + Express5 + sql.js, 含大地图拼接与战斗 UI。',
      链接: '', 要点: ['Phaser 4', 'sql.js/WASM', '大地图位图'] },
    { 名称: '棋类游戏 / 页游', 分类: '本地项目', 标签: ['游戏', '大厅'], 星级: 4, 年份: 2026,
      简介: '去 iframe 单页大厅设计, 飞行棋 / 跳棋 / 富翁等棋类与网页小游戏集合。',
      链接: '', 要点: ['单页大厅', '多人规则', '去 iframe'] },
    { 名称: '文本编辑器 / 电子表格', 分类: '本地项目', 标签: ['编辑器', 'WPS风'], 星级: 4, 年份: 2026,
      简介: 'WPS 风格富文本编辑器 (txt/docx/odt) 与电子表格处理, Express 后端 + ESM 语法。',
      链接: '', 要点: ['docx/odt', 'ESM', 'Express'] },
    { 名称: 'LuckyLang 幸福语言', 分类: '本地项目', 标签: ['编译器', '中文编程'], 星级: 5, 年份: 2026,
      简介: '自研中文编程语言 (E:\\folder\\luckylang), 含 CLI / GUI (cimgui) / JS 解释器三端。',
      链接: '', 要点: ['中文关键字', 'GUI 控件', 'JS 解释器'] },

    // ═══ 开源项目 ═══
    { 名称: 'GitHub CLI (gh)', 分类: '开源项目', 标签: ['CLI', '官方'], 星级: 5, 年份: 2026,
      简介: '官方命令行工具, 本机已装 v2.98.0 (F:\\msys64\\mingw64\\bin\\gh.exe), 已登录 truenice2, 可管理 PR / Issue / Release / Actions。',
      链接: 'https://github.com/cli/cli', 要点: ['gh auth login', 'gh pr/issue', 'gh release'] },
    { 名称: 'sql.js', 分类: '开源项目', 标签: ['SQLite', 'WASM'], 星级: 5, 年份: 2026,
      简介: 'SQLite 编译为 WebAssembly, 浏览器内跑完整 SQL, 本站可选数据后端。',
      链接: 'https://github.com/sql-js/sql.js', 要点: ['WASM', '完整 SQL', '可导出 .db'] },
    { 名称: 'idb', 分类: '开源项目', 标签: ['IndexedDB', 'Promise'], 星级: 4, 年份: 2026,
      简介: 'Jake Archibald 的 IndexedDB Promise 封装, 本站用于结构化存储层。',
      链接: 'https://github.com/jakearchibald/idb', 要点: ['Promise 化', '轻量', '事务封装'] },
    { 名称: 'marked', 分类: '开源项目', 标签: ['Markdown'], 星级: 4, 年份: 2026,
      简介: '高性能 Markdown 解析器, 本站文档正文渲染 (CDN 失败自动回退纯文本)。',
      链接: 'https://github.com/markedjs/marked', 要点: ['快速', 'GFM', 'CDN 加载'] },
    { 名称: 'Playwright', 分类: '开源项目', 标签: ['自动化', '测试'], 星级: 5, 年份: 2026,
      简介: '跨浏览器自动化, 本机位于 F:\\msys64\\mingw64\\node_modules\\playwright, 测试脚本经 createRequire 加载。',
      链接: 'https://github.com/microsoft/playwright', 要点: ['Chromium', '截图', 'file:// 支持'] },
    { 名称: 'gitalk', 分类: '开源项目', 标签: ['评论', 'Issue'], 星级: 4, 年份: 2026,
      简介: '基于 GitHub Issue 的评论系统, hexoblog 使用, 需要 OAuth Application 配置。',
      链接: 'https://github.com/gitalk/gitalk', 要点: ['GitHub Issue 存储', '免数据库', '需 OAuth'] },
    { 名称: 'Hexo', 分类: '开源项目', 标签: ['博客', 'Node'], 星级: 5, 年份: 2026,
      简介: '快速简洁的静态博客框架, 本机 hexoblog 使用, hexo g / hexo s / hexo d 三件套。',
      链接: 'https://github.com/hexojs/hexo', 要点: ['Markdown 写作', '插件生态', '一键部署'] },
    { 名称: 'hexo-theme-butterfly', 分类: '开源项目', 标签: ['主题', 'Hexo'], 星级: 5, 年份: 2026,
      简介: '功能丰富的 Hexo 主题, 本机 hexoblog 当前主题 (_config.butterfly.yml)。',
      链接: 'https://github.com/jerryc127/hexo-theme-butterfly', 要点: ['美观', '配置多', '支持 gitalk'] },

    // ═══ 部署平台 ═══
    { 名称: 'GitHub Pages (truenice2)', 分类: '部署平台', 标签: ['免费', '静态'], 星级: 5, 年份: 2026,
      简介: '已登录账号 truenice2 拥有 4 个 Pages 仓库: truenice2 / truenice2bbb / truenice2hello / truenice2htm, 均 PUBLIC。',
      链接: 'https://truenice2.github.io', 要点: ['4 个 Pages 站', '免费', '自定义域名'] },
    { 名称: 'GitHub Pages (morisw2)', 分类: '部署平台', 标签: ['免费', '博客'], 星级: 5, 年份: 2026,
      简介: 'morisw2.github.io — hexoblog 的部署目标, main 分支, hexo d 一键推送。',
      链接: 'https://github.com/morisw2/morisw2.github.io', 要点: ['hexo deploy', 'main 分支', 'Butterfly 主题'] },
    { 名称: 'Cloudflare Pages', 分类: '部署平台', 标签: ['免费', 'CDN'], 星级: 5, 年份: 2026,
      简介: '全球 CDN + 无限带宽, 支持 Git 集成与 Wrangler CLI 直接部署。',
      链接: 'https://pages.cloudflare.com', 要点: ['无限流量', '预览分支', 'Workers 联动'] },
    { 名称: 'Netlify', 分类: '部署平台', 标签: ['免费', 'CI'], 星级: 4, 年份: 2026,
      简介: '拖拽即部署, 100GB/月流量, 支持 Forms 与 Functions, 已有 netlify-starter 模板仓库。',
      链接: 'https://www.netlify.com', 要点: ['拖拽部署', '表单功能', '函数'] },
    { 名称: 'Vercel', 分类: '部署平台', 标签: ['免费', '前端'], 星级: 4, 年份: 2026,
      简介: '前端框架首选, 零配置部署, 边缘网络加速。',
      链接: 'https://vercel.com', 要点: ['零配置', '边缘网络', 'Analytics'] },
    { 名称: 'InfinityFree', 分类: '部署平台', 标签: ['PHP', '免费'], 星级: 4, 年份: 2026,
      简介: '免费 PHP + MySQL 主机 (ftpupload.net), 支持 cPanel 式管理。',
      链接: 'https://infinityfree.net', 要点: ['PHP + MySQL', '免费域名', 'FTP'] },
    { 名称: 'hyperphp', 分类: '部署平台', 标签: ['cPanel', '免费'], 星级: 3, 年份: 2026,
      简介: '免费 cPanel 主机 (HP_42737667), 需绕过 JS challenge 才能访问。',
      链接: 'https://hyperphp.com', 要点: ['cPanel', 'PHP', '需挑战绕过'] },
    { 名称: 'byet / dsh / swb 免费主机', 分类: '部署平台', 标签: ['免费', 'PHP'], 星级: 3, 年份: 2026,
      简介: 'byethost / dsh / swb 系列免费主机工作区, 均支持 PHP + MySQL + FTP。',
      链接: '', 要点: ['多站点备选', 'FTP 上传', '免费子域'] },
    { 名称: 'digitalplat / vmhost', 分类: '部署平台', 标签: ['免费', '域名'], 星级: 3, 年份: 2026,
      简介: 'digitalplat 免费域名 + vmhost 主机组合, 用于长期静态站部署。',
      链接: '', 要点: ['免费域名', '长期可用', '需实名'] },
    { 名称: 'EdgeOne Pages (国内友好)', 分类: '部署平台', 标签: ['免费', '国内'], 星级: 5, 年份: 2026,
      简介: '腾讯云 EdgeOne Pages: 不限流量 + 国内/国际双线路 + 免费 SSL, 2026 年国内访问最稳的静态托管选择。',
      链接: 'https://edgeone.ai/products/pages', 要点: ['国内访问稳', '不限流量', 'Git 部署'] },
    { 名称: 'Surge.sh', 分类: '部署平台', 标签: ['命令行', '演示'], 星级: 4, 年份: 2026,
      简介: '命令行一键上传静态站 (surge ./dist), 无限站点 + 自定义域名 + HTTPS, 适合快速演示。',
      链接: 'https://surge.sh', 要点: ['一条命令', '无限站点', '无构建能力'] },

    // ═══ 命令行 ═══
    { 名称: 'gh 认证与登录', 分类: '命令行', 标签: ['gh', '登录'], 星级: 5, 年份: 2026,
      简介: 'gh auth login --web (浏览器授权) / --with-token (PAT) / gh auth status 查看状态, 本机已登录 truenice2。',
      链接: 'https://cli.github.com/manual/gh_auth_login', 要点: ['设备码授权', 'PAT 登录', '多账号切换'] },
    { 名称: 'gh 仓库操作', 分类: '命令行', 标签: ['gh', '仓库'], 星级: 5, 年份: 2026,
      简介: 'gh repo clone / create / fork / view, 免密码 HTTPS 克隆。',
      链接: 'https://cli.github.com/manual/gh_repo', 要点: ['gh repo clone', 'gh repo create', 'gh repo view --web'] },
    { 名称: 'gh PR 与 Issue', 分类: '命令行', 标签: ['gh', '协作'], 星级: 5, 年份: 2026,
      简介: 'gh pr create/checkout/merge, gh issue create/list/close, 终端完成代码评审。',
      链接: 'https://cli.github.com/manual/gh_pr', 要点: ['pr create', 'pr checkout', 'issue list'] },
    { 名称: 'gh Release 与 Actions', 分类: '命令行', 标签: ['gh', 'CI'], 星级: 4, 年份: 2026,
      简介: 'gh release create/upload, gh run list/watch/rerun, gh workflow run。',
      链接: 'https://cli.github.com/manual/gh_release', 要点: ['release upload', 'run watch', 'workflow run'] },
    { 名称: 'git 常用命令', 分类: '命令行', 标签: ['git'], 星级: 5, 年份: 2026,
      简介: 'clone / add / commit / push / pull / rebase / stash / tag 速查。',
      链接: 'https://git-scm.com/docs', 要点: ['分支管理', '变基', '标签'] },
    { 名称: 'pacman 包管理', 分类: '命令行', 标签: ['MSYS2'], 星级: 4, 年份: 2026,
      简介: 'pacman -S / -Ss / -Qs / -R / -Syu, 本机镜像已切南京大学源。',
      链接: 'https://wiki.archlinux.org/title/Pacman', 要点: ['-S 安装', '-Ss 搜索', '-Syu 升级'] },

    // ═══ 开发环境 ═══
    { 名称: 'MSYS2 (F盘)', 分类: '开发环境', 标签: ['MSYS2', '本机'], 星级: 5, 年份: 2026,
      简介: 'F:\\msys64, mingw64 环境, node 24.x / npm 11.x 共用 node_modules, gh 2.98.0 已装于此。',
      链接: 'https://www.msys2.org', 要点: ['F:\\msys64', 'mingw64', '南大镜像'] },
    { 名称: 'Node.js 24', 分类: '开发环境', 标签: ['Node', 'ESM'], 星级: 5, 年份: 2026,
      简介: '项目统一 ESM 语法, Node 侧用 createRequire 加载 CJS 依赖 (如 playwright)。',
      链接: 'https://nodejs.org', 要点: ['ESM', 'createRequire', 'npmmirror'] },
    { 名称: 'Miniconda Python 3.14', 分类: '开发环境', 标签: ['Python'], 星级: 4, 年份: 2026,
      简介: 'F:\\msys64\\home\\miniconda3, 含 minimind 环境与 OpenVINO 加速。',
      链接: 'https://www.anaconda.com', 要点: ['3.14.6', 'TUNA 源', 'minimind 环境'] },
    { 名称: 'Chrome (Playwright 用)', 分类: '开发环境', 标签: ['浏览器'], 星级: 4, 年份: 2026,
      简介: 'F:\\Program Files (x86)\\chrome-win64\\chrome.exe — 测试脚本默认可执行路径。',
      链接: 'https://www.google.cn/chrome', 要点: ['headless', '--no-sandbox', 'file:// 直开'] },

    // ═══ 测试工具 ═══
    { 名称: 'Playwright 测试脚本', 分类: '测试工具', 标签: ['自动化', '本机'], 星级: 5, 年份: 2026,
      简介: '网页测试.js — ESM + createRequire, 覆盖加载/搜索/筛选/排序/收藏/评论/加速等。',
      链接: '', 要点: ['createRequire', '✅/❌ 输出', '汇总退出码'] },
    { 名称: '截图与诊断', 分类: '测试工具', 标签: ['截图'], 星级: 3, 年份: 2026,
      简介: '工作区输出目录保存测试截图 (F:\\myfloder3\\workspace4\\输出)。',
      链接: '', 要点: ['PNG 输出', '全页截图', '错误留证'] },

    // ═══ 技术文档 ═══
    { 名称: 'gh CLI 安装与登录 (MSYS2)', 分类: '技术文档', 标签: ['gh', '安装'], 星级: 5, 年份: 2026,
      简介: 'pacman -S mingw-w64-x86_64-github-cli → gh --version → gh auth login --web → gh auth status。',
      链接: '', 要点: ['pacman 安装', '设备码登录', 'PAT 备选'] },
    { 名称: 'GitHub 加速下载完全指南', 分类: '技术文档', 标签: ['加速', '下载'], 星级: 5, 年份: 2026,
      简介: 'raw / release / archive / clone 四类链接的加速拼法与失效兜底顺序。',
      链接: '', 要点: ['四类链接', '多源冗余', '自建代理'] },
    { 名称: '静态博客 Hexo + GitHub Pages', 分类: '技术文档', 标签: ['Hexo', '部署'], 星级: 5, 年份: 2026,
      简介: 'hexo new / hexo g / hexo d, 配置 _config.yml deploy 段指向 morisw2.github.io。',
      链接: '', 要点: ['_config.yml', 'hexo-deployer-git', 'gitalk 评论'] },
    { 名称: 'file:// 静态站存储方案', 分类: '技术文档', 标签: ['存储', '离线'], 星级: 5, 年份: 2026,
      简介: 'localStorage 为主 + IndexedDB (idb) + sql.js (WASM) 三层, 无 http 服务也能持久化。',
      链接: '', 要点: ['localStorage', 'IndexedDB', 'sql.js'] },

    // ═══ 部署笔记 ═══
    { 名称: 'frp 自建穿透踩坑', 分类: '部署笔记', 标签: ['frp', '踩坑'], 星级: 4, 年份: 2026,
      简介: 'frps.toml / frpc.toml 配置要点, 端口放行, systemd 托管与日志排查。',
      链接: '', 要点: ['toml 配置', '防火墙', '服务托管'] },
    { 名称: 'Cloudflare Pages 部署要点', 分类: '部署笔记', 标签: ['CF', '部署'], 星级: 4, 年份: 2026,
      简介: 'Wrangler 部署、构建命令与输出目录、自定义域名与 DNS 生效。',
      链接: '', 要点: ['wrangler.toml', '构建目录', 'DNS'] },
    { 名称: '免费主机 JS Challenge 绕过', 分类: '部署笔记', 标签: ['hyperphp', '挑战'], 星级: 3, 年份: 2026,
      简介: 'hyperphp / InfinityFree 的 JS 挑战页面导致空响应, 需用真实浏览器 UA 与 Cookie 预热。',
      链接: '', 要点: ['真实 UA', 'Cookie 预热', '重试策略'] },

    // ═══ 文章 ═══
    { 名称: '为什么我把所有站点都做成 file:// 直开', 分类: '文章', 标签: ['随笔', '静态站'], 星级: 4, 年份: 2026,
      简介: '不需要服务器、不需要构建, 双击 htm 就能跑, 换电脑拷目录即可迁移。',
      链接: '', 要点: ['零依赖部署', '可移植', '离线可用'] },
    { 名称: '粉色主题的门户设计笔记', 分类: '文章', 标签: ['设计', '主题'], 星级: 4, 年份: 2026,
      简介: '白底 + 主色 #d4456f, 顶栏浮动隐藏, 侧栏折叠展开, 卡片阴影层次。',
      链接: '', 要点: ['配色变量', '浮动顶栏', '折叠侧栏'] },
  ];

  // ── gh / git 命令速查表 ──
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
  ];


  // ── 站外导航 ──
  const 导航站 = [
    { 名: 'GitHub', 网址: 'https://github.com', 说明: '代码托管主站', 图标: '🐙' },
    { 名: '我的主页', 网址: 'https://github.com/truenice2', 说明: 'truenice2 账号主页', 图标: '👤' },
    { 名: 'GitHub Pages', 网址: 'https://pages.github.com', 说明: '静态站点托管', 图标: '📄' },
    { 名: 'gh CLI 手册', 网址: 'https://cli.github.com/manual/', 说明: '命令行文档', 图标: '⌨️' },
    { 名: 'jsDelivr', 网址: 'https://www.jsdelivr.com', 说明: '免费 CDN', 图标: '🚚' },
    { 名: 'ghfast', 网址: 'https://ghfast.top', 说明: 'GitHub 加速', 图标: '⚡' },
    { 名: 'npmmirror', 网址: 'https://npmmirror.com', 说明: 'npm 国内镜像', 图标: '📦' },
    { 名: '清华 TUNA', 网址: 'https://mirrors.tuna.tsinghua.edu.cn', 说明: '开源镜像站', 图标: '🇨🇳' },
    { 名: 'MSYS2 镜像', 网址: 'https://mirror.nju.edu.cn/msys2/', 说明: 'pacman 镜像', 图标: '🐧' },
    { 名: 'Playwright', 网址: 'https://playwright.dev', 说明: '自动化文档', 图标: '🎭' },
    { 名: 'Hexo 文档', 网址: 'https://hexo.io/zh-cn/docs/', 说明: '博客框架文档', 图标: '📝' },
    { 名: 'Cloudflare Dash', 网址: 'https://dash.cloudflare.com', 说明: 'Pages/Workers', 图标: '☁️' },
    { 名: '阿里云百炼', 网址: 'https://bailian.console.aliyun.com', 说明: '大模型控制台', 图标: '🤖' },
  ];

  // ── CDN 源 (多源回退) ──
  const CDN源 = {
    marked: [
      'https://fastly.jsdelivr.net/npm/marked/marked.min.js',
      'https://cdn.jsdelivr.net/npm/marked/marked.min.js',
      'https://unpkg.com/marked/dist/marked.min.js',
      'https://gcore.jsdelivr.net/npm/marked/marked.min.js',
    ],
    idb: [
      'https://fastly.jsdelivr.net/npm/idb@8.0.0/build/umd.js',
      'https://cdn.jsdelivr.net/npm/idb@8.0.0/build/umd.js',
      'https://unpkg.com/idb@8.0.0/build/umd.js',
    ],
    sqljs: [
      'https://fastly.jsdelivr.net/npm/sql.js@1.13.0/dist/sql-wasm.js',
      'https://cdn.jsdelivr.net/npm/sql.js@1.13.0/dist/sql-wasm.js',
      'https://unpkg.com/sql.js@1.13.0/dist/sql-wasm.js',
    ],
    sqljs目录: [
      'https://fastly.jsdelivr.net/npm/sql.js@1.13.0/dist/',
      'https://cdn.jsdelivr.net/npm/sql.js@1.13.0/dist/',
      'https://unpkg.com/sql.js@1.13.0/dist/',
    ],
  };

  // ── 标签库 (侧栏/筛选用) ──
  const 热门标签 = ['加速', '本机', '免费', '推荐', 'gh', '部署', '静态站', '开源', 'AI', '游戏', 'CDN', '存储'];

  const 数据 = {
    站点, 仓库表, 板块表, 板块查, 分类图标, 分类说明,
    加速源, 资源, 命令表, 导航站, CDN源, 热门标签,
    版本: 站点.版本,
    生成时间: '2026-09-03',
  };

  根.网站数据 = 数据;

  // Node 环境兼容 (测试脚本可 require)
  if (typeof module !== 'undefined' && module.exports) module.exports = 数据;
})(typeof window !== 'undefined' ? window : globalThis);
