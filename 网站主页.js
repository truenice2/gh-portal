// ════════════════════════════════════════════════════════════
// 网站主页.js — GitHub 资源门户 · 核心层
// 职责: 数据装配 / 三层存储 / 路由 / 业务操作 (收藏·点赞·评论·历史·自建)
//       / GitHub 加速链接生成 / 启动装配
// 拆分: 渲染与 DOM 事件已移至 网页操作.js, 本文件只留核心逻辑
// 语法: ESM 风格现代 JS, 但不含静态 import/export —— 因此
//       http 下可被 import() 加载, file:// 下可回退经典 <script src>
// 存储: localStorage (主) + IndexedDB (idb) + sql.js (WASM), 三层降级
// 文档: 不支持 Markdown, 内容为 txt / html / svg (见 文章数据.js)
// ════════════════════════════════════════════════════════════
(function () {
  'use strict';

  // 数据装配: 网站数据(资源/加速) + 文章数据(文学) + 理学文章(理学+命令表)
  const 数据 = window.网站数据 || {};
  const 文章 = window.文章数据 || {};
  const 理学 = window.理学文章 || {};

  const 站点 = 数据.站点 || { 名: 'GH 资源门户', 图标: '🌸', 副标题: '', 说明: '', 账号表: {} };
  const 全部资源 = Array.isArray(数据.资源) ? 数据.资源 : [];
  const 分类图标 = 数据.分类图标 || {};
  const 分类说明 = 数据.分类说明 || {};
  const 加速源表 = Array.isArray(数据.加速源) ? 数据.加速源 : [];
  // 命令表已随理学拆至 理学文章.js (命令速查全表 也是一篇 txt 文章)
  const 命令表 = Array.isArray(理学.命令表) ? 理学.命令表 : Array.isArray(文章.命令表) ? 文章.命令表 : [];
  const 导航站 = Array.isArray(数据.导航站) ? 数据.导航站 : [];
  const 仓库表 = Array.isArray(数据.仓库表) ? 数据.仓库表 : [];
  const 板块表 = Array.isArray(数据.板块表) ? 数据.板块表 : [];
  // 内置文章 = 理学(理学文章.js) + 文学(文章数据.js)
  const 内置文章 = (Array.isArray(理学.文章表) ? 理学.文章表 : []).concat(Array.isArray(文章.文章表) ? 文章.文章表 : []);

  // ══════════ 一、存储层 (三层) ══════════
  const 存储 = {
    前缀: 'gh门户_',
    可用: { 本地: false, 索引: false, 数据库: false },
    索引库: null,
    数据库: null,

    读(键, 默认) {
      try {
        const 原 = localStorage.getItem(this.前缀 + 键);
        return 原 === null ? 默认 : JSON.parse(原);
      } catch (e) { return 默认; }
    },
    写(键, 值) {
      try {
        localStorage.setItem(this.前缀 + 键, JSON.stringify(值));
        this.可用.本地 = true;
        this.镜像到索引(键, 值);
        this.同步到数据库(键, 值);
        return true;
      } catch (e) { return false; }
    },

    // 第二层: IndexedDB (file:// 下 Chrome 会抛 SecurityError, 自动降级)
    async 初始化索引() {
      try {
        if (!window.idb || typeof window.idb.openDB !== 'function') return false;
        this.索引库 = await window.idb.openDB('gh门户', 1, {
          upgrade(库) { if (!库.objectStoreNames.contains('键值')) 库.createObjectStore('键值'); },
        });
        this.可用.索引 = true;
      } catch (e) { this.可用.索引 = false; }
      return this.可用.索引;
    },
    async 镜像到索引(键, 值) {
      if (!this.可用.索引 || !this.索引库) return;
      try { await this.索引库.put('键值', 值, 键); } catch (e) { /* 忽略 */ }
    },

    // 第三层: sql.js (SQLite WASM, 依赖 CDN, 断网自动跳过)
    async 初始化数据库(路径列表) {
      if (typeof window.initSqlJs !== 'function') return false;
      for (const 目录 of (路径列表 || [])) {
        try {
          const SQL = await window.initSqlJs({ locateFile: (文件) => 目录 + 文件 });
          this.数据库 = new SQL.Database();
          this.数据库.run('CREATE TABLE IF NOT EXISTS 键值表 (键 TEXT PRIMARY KEY, 值 TEXT, 时间 TEXT)');
          this.可用.数据库 = true;
          return true;
        } catch (e) { /* 换下一个 CDN 源 */ }
      }
      return false;
    },
    同步到数据库(键, 值) {
      if (!this.可用.数据库 || !this.数据库) return;
      try {
        this.数据库.run('INSERT OR REPLACE INTO 键值表 (键, 值, 时间) VALUES (?, ?, ?)',
          [键, JSON.stringify(值), new Date().toISOString()]);
      } catch (e) { /* 忽略 */ }
    },
    导出数据库() {
      if (!this.可用.数据库 || !this.数据库) return null;
      try { return this.数据库.export(); } catch (e) { return null; }
    },
  };

  // ══════════ 二、业务数据读写 ══════════
  const 收藏列表 = () => 存储.读('收藏', []);
  const 历史列表 = () => 存储.读('历史', []);
  const 评论列表 = () => 存储.读('评论', []);
  const 自建列表 = () => 存储.读('自建', []);
  const 点赞表 = () => 存储.读('点赞', {});

  const 是否收藏 = (名称) => 收藏列表().some((项) => 项.名称 === 名称);
  const 点赞数 = (名称) => (点赞表()[名称] || 0);
  const 某键评论 = (键) => 评论列表().filter((c) => c.键 === 键);

  function 切换收藏(项) {
    const 列 = 收藏列表();
    const 位 = 列.findIndex((x) => x.名称 === 项.名称);
    if (位 >= 0) {
      列.splice(位, 1);
      存储.写('收藏', 列);
      提示('已取消收藏: ' + 项.名称);
      return false;
    }
    列.unshift({ 名称: 项.名称, 分类: 项.分类, 时间: new Date().toLocaleString('zh-CN') });
    存储.写('收藏', 列);
    提示('已收藏: ' + 项.名称);
    return true;
  }

  function 添加点赞(名称) {
    const 表 = 点赞表();
    表[名称] = (表[名称] || 0) + 1;
    存储.写('点赞', 表);
    return 表[名称];
  }

  function 记录历史(项) {
    const 列 = 历史列表().filter((x) => x.名称 !== 项.名称);
    列.unshift({ 名称: 项.名称, 分类: 项.分类, 时间: new Date().toLocaleString('zh-CN') });
    存储.写('历史', 列.slice(0, 60));
  }

  function 添加评论(键, 姓名, 文本) {
    const 列 = 评论列表();
    列.unshift({ 键, 姓名, 文本, 时间: new Date().toLocaleString('zh-CN') });
    存储.写('评论', 列);
    return 列;
  }

  // 内置文档 + 自建文档 (自建文档也出现在文档列表)
  function 全部文章() {
    return 自建列表().filter((a) => a && a.标题).concat(内置文章);
  }

  // ══════════ 三、提示 / 复制 ══════════
  let 提示定时器 = null;
  function 提示(消息) {
    let 元素 = document.getElementById('全局提示');
    if (!元素) {
      元素 = document.createElement('div');
      元素.id = '全局提示';
      元素.className = '全局提示';
      document.body.appendChild(元素);
    }
    元素.textContent = 消息;
    元素.style.display = 'block';
    if (提示定时器) clearTimeout(提示定时器);
    提示定时器 = setTimeout(() => { 元素.style.display = 'none'; }, 3000);
  }

  async function 复制文本(文本) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(文本);
        提示('已复制 ✓');
        return true;
      }
    } catch (e) { /* 回退 */ }
    try {
      const 框 = document.createElement('textarea');
      框.value = 文本;
      框.style.position = 'fixed';
      框.style.opacity = '0';
      document.body.appendChild(框);
      框.select();
      const 成 = document.execCommand('copy');
      document.body.removeChild(框);
      提示(成 ? '已复制 ✓' : '复制失败, 请手动选择');
      return 成;
    } catch (e) {
      提示('复制失败, 请手动选择');
      return false;
    }
  }

  // ══════════ 四、GitHub 加速链接生成 ══════════
  function 识别类型(链接) {
    if (/raw\.githubusercontent\.com/.test(链接)) return 'raw';
    if (/codeload\.github\.com/.test(链接)) return 'archive';
    if (/\/archive\//.test(链接)) return 'archive';
    if (/\/releases\/download\//.test(链接)) return 'release';
    if (/\/blob\//.test(链接)) return 'raw';
    if (/\.git$/.test(链接)) return 'clone';
    return 'git';
  }

  function 生成加速(原链接) {
    const 链 = (原链接 || '').trim();
    if (!链) return [];
    const 类型 = 识别类型(链);
    const 结果 = [];

    for (const 源 of 加速源表) {
      let 地址 = '';
      if (源.特殊 === 'jsdelivr') {
        // github.com/owner/repo/blob/分支/路径 → /gh/owner/repo@分支/路径
        const 匹 = 链.match(/github\.com\/([^/]+)\/([^/]+)\/(?:blob|raw)\/([^/]+)\/(.+)$/);
        if (!匹) continue;
        地址 = 源.前缀 + '/' + 匹[1] + '/' + 匹[2] + '@' + 匹[3] + '/' + 匹[4];
      } else if (源.键 === 'gitclone') {
        if (类型 !== 'clone' && 类型 !== 'git') continue;
        地址 = 链.replace('https://github.com/', 源.前缀);
      } else {
        地址 = 源.前缀 + 链;
      }
      if (地址) 结果.push({ 名: 源.名, 地址, 说明: 源.说明, 推荐: !!源.默认 });
    }
    return 结果;
  }

  // ══════════ 五、路由 ══════════
  function 解析路由() {
    let h = location.hash.replace(/^#\/?/, '');
    try { h = decodeURIComponent(h); } catch (e) { /* 忽略 */ }
    const 段 = h.split('/').filter(Boolean);
    if (段.length === 0) return { 页: '首页' };
    const 头 = 段[0];
    if (头 === '板块') return { 页: '板块', 板块: 段[1] || '' };
    if (头 === '分类') return { 页: '分类', 分类: 段[1] || '' };
    if (头 === '详情') return { 页: '详情', 分类: 段[1] || '', 名称: 段.slice(2).join('/') || '' };
    if (头 === '文档') return { 页: 段[1] ? '文档详情' : '文档', 标题: 段[1] || '' };
    if (头 === '搜索') return { 页: '搜索', 词: 段[1] || '' };
    if (头 === '用户') return { 页: '用户', 标签: 段[1] || '收藏' };
    return { 页: 头 }; // 加速 / 命令 / 导航
  }

  function 跳转(路) {
    const 目标 = '#/' + 路;
    let 当前 = location.hash;
    try { 当前 = decodeURIComponent(当前); } catch (e) { /* 忽略 */ }
    // 目标与当前相同时不触发 hashchange, 需手动重渲染 (新建保存后依赖此逻辑)
    if (当前 === 目标 && window.门户操作) window.门户操作.渲染页面();
    else location.hash = 目标;
  }

  // ══════════ 六、状态 ══════════
  const 状态 = { 搜索词: '', 筛选: '全部', 排序: '默认', 文板块: '全部', 当前: null, 当前文: null };

  // ══════════ 七、核心暴露 (供 网页操作.js 使用) ══════════
  const 核心 = {
    站点, 全部资源, 分类图标, 分类说明, 板块表,
    加速源表, 命令表, 导航站, 仓库表,
    存储, 状态,
    解析路由, 跳转, 生成加速,
    提示, 复制文本,
    收藏列表, 历史列表, 评论列表, 自建列表, 点赞表,
    是否收藏, 点赞数, 某键评论,
    切换收藏, 添加点赞, 记录历史, 添加评论,
    全部文章,
  };
  // 文章表: 内置文档 + 自建文档 (getter, 始终最新)
  Object.defineProperty(核心, '文章表', { get: 全部文章, enumerable: true });

  window.门户核心 = 核心;

  // ══════════ 八、启动 ══════════
  async function 启动(依赖) {
    if (window.__门户已启动) return;
    window.__门户已启动 = true;

    const 依赖状态 = 依赖 || window.__门户依赖 || {};
    const 操作 = window.门户操作 || {};

    // 存储层初始化 (三层, 失败自动降级)
    存储.可用.本地 = (() => {
      try {
        localStorage.setItem('gh门户_自检', '1');
        localStorage.removeItem('gh门户_自检');
        return true;
      } catch (e) { return false; }
    })();
    await 存储.初始化索引();
    if (依赖状态.sqljs) await 存储.初始化数据库(window.__门户SQL路径 || []);

    if (操作.绑定事件) 操作.绑定事件();
    if (操作.绑定滚动) 操作.绑定滚动();
    if (操作.渲染页面) 操作.渲染页面();

    const 部件 = [];
    if (依赖状态.idb) 部件.push('idb');
    if (依赖状态.sqljs) 部件.push('sql.js');
    提示(`🌸 ${站点.名} 已就绪 · localStorage 模式 (file:// 直开)${部件.length ? ' · CDN: ' + 部件.join('/') : ''}`);
  }

  window.门户应用 = { 启动, 存储, 状态, 生成加速, 核心 };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { 启动(window.__门户依赖 || {}); });
  } else {
    启动(window.__门户依赖 || {});
  }
})();
