// ════════════════════════════════════════════════════════════
// 网页操作.js — 渲染与交互层 (从 网站主页.js 拆出)
// 职责: DOM 渲染 (顶栏/侧栏/卡片/页面/弹窗/面板) + 事件委托
// 依赖: window.网站数据 / window.文章数据 / window.门户核心 (由 网站主页.js 暴露)
// 说明: 经典脚本, 不使用静态 import/export, file:// 与 http 均可加载
//       所有核心能力通过 核() 访问器获取, 避免加载顺序问题
// ════════════════════════════════════════════════════════════
(function () {
  'use strict';

  const $ = (选) => document.querySelector(选);
  const 核 = () => window.门户核心 || {};

  const 转义 = (值) => String(值 === null || 值 === undefined ? '' : 值)
    .replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // ══════════ 顶栏 / 侧栏 ══════════
  // 顶栏板块: 首页 / 导航 / 软件 / 文学 / 理学 / 用户
  const 导航项 = [
    { 键: '首页', 名: '首页', 路: '' },
    { 键: '导航', 名: '🌐 导航', 路: '导航' },
    { 键: '软件', 名: '💾 软件', 路: '板块/软件' },
    { 键: '文学', 名: '📖 文学', 路: '板块/文学' },
    { 键: '理学', 名: '🔬 理学', 路: '板块/理学' },
    { 键: '用户', 名: '👤 用户', 路: '用户/收藏' },
  ];

  function 渲染顶栏(当前) {
    const C = 核();
    const 条 = document.querySelector('#顶栏');
    if (!条) return;
    条.innerHTML = `
      <div class="品牌" data-动作="回家">
        <span class="品牌图标">${转义((C.站点 || {}).图标 || '🌸')}</span>
        <div>
          <h1>${转义((C.站点 || {}).名 || '门户')}</h1>
          <p>${转义((C.站点 || {}).副标题 || '')}</p>
        </div>
      </div>
      <nav class="导航">
        ${导航项.map((项) => `<a data-动作="导航" data-路="${转义(项.路)}" class="${当前 === 项.键 ? '活跃' : ''}">${转义(项.名)}</a>`).join('')}
      </nav>
      <div class="顶栏右">
        <input class="搜索框" id="搜索框" placeholder="搜索资源 / 命令 / 文档…" value="${转义(C.状态.搜索词)}">
        <button class="圆钮" id="用户钮" title="我的门户">👤</button>
      </div>`;
  }

  function 渲染侧边栏(当前) {
    const C = 核();
    const 栏 = document.querySelector('#侧边栏');
    if (!栏) return;
    const 分类表 = Object.keys(C.分类图标);
    const 计数 = (分类) => C.全部资源.filter((r) => r.分类 === 分类).length;

    栏.innerHTML = `
      <div class="侧栏头"><span>🗂️ 门户导航</span><button class="侧栏折叠钮" id="侧栏折叠" title="折叠/展开">⏪</button></div>

      <div class="侧栏组">
        <div class="侧栏组标题">板块</div>
        ${C.板块表.map((b) => `
          <div class="侧栏项 ${当前.页 === '板块' && 当前.板块 === b.键 ? '活跃' : ''}" data-动作="板块" data-板块="${转义(b.键)}">
            <span>${b.图标}</span><span>${转义(b.名)}</span>
            <span class="计">${b.分类.reduce((s, c) => s + 计数(c), 0)}</span>
          </div>`).join('')}
      </div>

      ${C.板块表.map((b) => `
        <div class="侧栏组">
          <div class="侧栏组标题">${b.图标} ${转义(b.名)}</div>
          ${b.分类.map((c) => `
            <div class="侧栏项 ${当前.页 === '分类' && 当前.分类 === c ? '活跃' : ''}" data-动作="分类" data-分类="${转义(c)}">
              <span>${C.分类图标[c] || '📄'}</span><span>${转义(c)}</span>
              <span class="计">${计数(c)}</span>
            </div>`).join('')}
        </div>`).join('')}

      <div class="侧栏组">
        <div class="侧栏组标题">我的</div>
        <div class="侧栏项" data-动作="用户" data-标签="收藏"><span>⭐</span><span>收藏夹</span><span class="计">${C.收藏列表().length}</span></div>
        <div class="侧栏项" data-动作="用户" data-标签="历史"><span>🕘</span><span>历史记录</span><span class="计">${C.历史列表().length}</span></div>
        <div class="侧栏项" data-动作="用户" data-标签="自建"><span>➕</span><span>自建资源</span><span class="计">${C.自建列表().length}</span></div>
        <div class="侧栏项" data-动作="用户" data-标签="设置"><span>⚙️</span><span>设置</span></div>
      </div>

      <div class="侧栏组">
        <div class="侧栏组标题">我的仓库 (gh)</div>
        ${C.仓库表.map((r) => `
          <div class="侧栏项" data-动作="开链" data-链="${转义(r.站)}" title="${转义(r.说明)}">
            <span>📦</span><span>${转义(r.名)}</span>
          </div>`).join('')}
      </div>`;
  }

  function 应用侧栏() {
    const 收起 = 核().存储.读('侧栏收起', false);
    const 栏 = document.querySelector('#侧边栏');
    const 钮 = document.querySelector('#展开钮');
    document.body.classList.toggle('侧栏收起', 收起);
    if (栏) 栏.classList.toggle('收起', 收起);
    if (钮) 钮.style.display = 收起 ? 'block' : 'none';
  }

  function 切换侧栏() {
    const C = 核();
    const 值 = !C.存储.读('侧栏收起', false);
    C.存储.写('侧栏收起', 值);
    应用侧栏();
  }

  // ── 顶栏浮动: 向下滚隐藏, 向上滚显示 ──
  let 上次滚动Y = 0;
  function 绑定滚动() {
    window.addEventListener('scroll', () => {
      const y = window.scrollY || window.pageYOffset || 0;
      const 条 = document.querySelector('#顶栏');
      if (!条) return;
      if (y > 120 && y > 上次滚动Y) 条.classList.add('隐藏');
      else if (y < 上次滚动Y || y <= 120) 条.classList.remove('隐藏');
      上次滚动Y = y;
    }, { passive: true });
  }

  // ══════════ 卡片与列表 ══════════
  function 卡片HTML(项) {
    const C = 核();
    const 图标 = C.分类图标[项.分类] || '📄';
    const 收 = C.是否收藏(项.名称);
    return `
      <div class="卡片" data-动作="详情" data-分类="${转义(项.分类)}" data-名称="${转义(项.名称)}">
        <div class="卡头">${图标}</div>
        <div class="卡体">
          <div class="卡名">${转义(项.名称)}</div>
          <div class="卡分类">${转义(项.分类)}${项.年份 ? ' · ' + 转义(项.年份) : ''}</div>
          <div class="卡介">${转义(项.简介)}</div>
          <div class="卡尾">
            <span class="星">${'★'.repeat(Math.max(0, Math.min(5, 项.星级 || 0)))}</span>
            <span>👍 ${C.点赞数(项.名称)}</span>
            ${收 ? '<span class="收藏标">⭐</span>' : ''}
          </div>
        </div>
      </div>`;
  }

  function 工具条HTML(当前筛选 = '全部', 当前排序 = '默认') {
    const 片 = ['全部', '已收藏', '有链接', '本机'];
    const 序 = ['默认', '星级最高', '名称', '年份最新'];
    return `
      <div class="工具条">
        <div class="组">
          ${片.map((f) => `<button class="筛选片 ${当前筛选 === f ? '活跃' : ''}" data-动作="筛选" data-筛选="${f}">${f}</button>`).join('')}
        </div>
        <div class="组">
          <select class="下拉" id="排序" data-动作="排序">
            ${序.map((s) => `<option value="${s}" ${当前排序 === s ? 'selected' : ''}>${s}</option>`).join('')}
          </select>
        </div>
        <span class="计数" id="结果计数"></span>
      </div>`;
  }

  function 过筛(列表, 筛选, 排序, 词) {
    const C = 核();
    let 结 = 列表.slice();
    if (词) {
      const 小 = 词.toLowerCase();
      结 = 结.filter((r) =>
        (r.名称 || '').toLowerCase().includes(小) ||
        (r.简介 || '').toLowerCase().includes(小) ||
        (r.分类 || '').toLowerCase().includes(小) ||
        (r.标签 || []).join(',').toLowerCase().includes(小));
    }
    if (筛选 === '已收藏') 结 = 结.filter((r) => C.是否收藏(r.名称));
    else if (筛选 === '有链接') 结 = 结.filter((r) => !!r.链接);
    else if (筛选 === '本机') 结 = 结.filter((r) => !r.链接);

    if (排序 === '星级最高') 结.sort((a, b) => (b.星级 || 0) - (a.星级 || 0));
    else if (排序 === '名称') 结.sort((a, b) => String(a.名称).localeCompare(String(b.名称), 'zh-CN'));
    else if (排序 === '年份最新') 结.sort((a, b) => (b.年份 || 0) - (a.年份 || 0));
    return 结;
  }

  function 网格HTML(列表) {
    if (!列表.length) {
      return `<div class="空态"><div class="图">🌸</div><div>没有匹配的资源, 换个关键词试试</div></div>`;
    }
    return `<div class="网格">${列表.map(卡片HTML).join('')}</div>`;
  }

  // ══════════ 各页面 ══════════
  function 加速区HTML() {
    return `
      <div class="加速区">
        <div class="区标题">⚡ GitHub 加速下载 — 粘贴链接, 一键生成全部加速地址</div>
        <div class="加速输入行">
          <input class="加速输入" id="加速输入" placeholder="粘贴 GitHub 链接 (raw / release / archive / blob / .git)…">
          <button class="主钮" id="加速生成">生成加速链接</button>
          <button class="次钮" id="加速示例">填入示例</button>
        </div>
        <div class="加速结果" id="加速结果"></div>
      </div>`;
  }

  function 纯文本摘要(正文, 行数) {
    return String(正文 || '').split('\n').filter((l) => l.trim() && !l.startsWith('━')).slice(0, 行数).join(' ').slice(0, 140);
  }

  function 渲染首页() {
    const C = 核();
    const 统计 = [
      { 数: C.全部资源.length, 名: '资源条目' },
      { 数: Object.keys(C.分类图标).length, 名: '分类' },
      { 数: C.加速源表.length, 名: '加速源' },
      { 数: C.命令表.reduce((s, g) => s + g.命令.length, 0), 名: '命令' },
      { 数: C.文章表.length, 名: '文档' },
      { 数: C.仓库表.length, 名: '我的仓库' },
    ];
    const 推荐 = C.全部资源.filter((r) => (r.星级 || 0) >= 5).slice(0, 12);

    return `
      <div class="横幅">
        <h2>${转义(C.站点.图标)} ${转义(C.站点.名)} — ${转义(C.站点.副标题)}</h2>
        <p>${转义(C.站点.说明)} · 已登录 gh 账号 <b>${转义((C.站点.账号表 || {}).gh || '')}</b>
        ${(C.站点.上线 || {}).地址 ? ` · <a data-动作="开链" data-链="${转义(C.站点.上线.地址)}">🔗 线上 ${转义((C.站点.上线 || {}).地址)}</a>` : ''}</p>
        <div class="统计行">
          ${统计.map((s) => `<div class="统计块"><b>${s.数}</b><span>${s.名}</span></div>`).join('')}
        </div>
      </div>

      ${加速区HTML()}

      <div class="区标题">⭐ 精选资源 (5 星)</div>
      ${网格HTML(推荐)}

      <div class="区标题" style="margin-top:18px">📚 最新文档 (卡片视图 · txt / html / svg)</div>
      <div class="网格">${C.文章表.slice(0, 4).map(文章卡片HTML).join('')}</div>

      <div class="区标题" style="margin-top:18px">📦 我的仓库</div>
      <div class="网格">
        ${C.仓库表.map((r) => `
          <div class="卡片" data-动作="开链" data-链="${转义(r.站)}">
            <div class="卡头">📦</div>
            <div class="卡体">
              <div class="卡名">${转义(r.名)}</div>
              <div class="卡分类">${转义(r.可见)}</div>
              <div class="卡介">${转义(r.说明)}</div>
            </div>
          </div>`).join('')}
      </div>`;
  }

  function 渲染加速页() {
    const C = 核();
    return `
      <div class="横幅">
        <h2>⚡ GitHub 加速下载</h2>
        <p>支持 raw / release / archive / blob / clone 五类链接, 自动生成 ghfast、gh-proxy 四大节点、jsDelivr、gitclone 的加速地址。</p>
      </div>
      ${加速区HTML()}
      <div class="区标题">🌐 加速源一览 (${C.加速源表.length})</div>
      ${网格HTML(C.全部资源.filter((r) => ['加速代理', 'CDN镜像', '下载工具'].includes(r.分类)))}`;
  }

  // 命令手册 (可嵌入理学板块)
  function 命令手册HTML() {
    const C = 核();
    const 词 = C.状态.搜索词.toLowerCase();
    return C.命令表.map((组) => {
        const 命令 = 组.命令.filter((c) => !词 || c.令.toLowerCase().includes(词) || c.说.includes(词));
        if (!命令.length) return '';
        return `
          <div class="命令组">
            <div class="命令组标题">${组.图标} ${转义(组.组)} (${命令.length})</div>
            ${命令.map((c) => `
              <div class="命令行">
                <code>${转义(c.令)}</code>
                <span class="说">${转义(c.说)}</span>
                <button class="小钮" data-动作="复制" data-文本="${转义(c.令)}">复制</button>
              </div>`).join('')}
          </div>`;
      }).join('') || '<div class="空态"><div class="图">⌨️</div><div>没有匹配的命令</div></div>';
  }

  function 渲染命令页() {
    const C = 核();
    return `
      <div class="横幅">
        <h2>⌨️ gh / git 命令速查 (理学)</h2>
        <p>共 ${C.命令表.reduce((s, g) => s + g.命令.length, 0)} 条命令, 点击右侧按钮复制到剪贴板。</p>
      </div>
      ${命令手册HTML()}`;
  }

  // ── 文章卡片视图 ──
  function 文章卡片HTML(文) {
    const 格式 = ((文 && 文.格式) || 'txt').toUpperCase();
    const 图标 = 文.格式 === 'svg' ? '🖼️' : (文.格式 === 'html' ? '📝' : '📄');
    return `
      <div class="卡片 文档卡" data-动作="文档" data-标题="${转义(文.标题)}">
        <div class="卡头">${图标}</div>
        <div class="卡体">
          <div class="卡名">${转义(文.标题)}</div>
          <div class="卡分类">${转义(文.板块 || '理学')} <span class="徽章">${转义(格式)}</span></div>
          <div class="卡介">${转义(纯文本摘要(文.正文, 2))}</div>
          <div class="卡尾">
            <span>${转义(文.作者 || '')}</span>
            <span class="收藏标">${转义(文.日期 || '')}</span>
          </div>
        </div>
      </div>`;
  }

  function 板块文章卡片(板块) {
    const C = 核();
    const 表 = C.文章表.filter((a) => ((a && a.板块) || '理学') === 板块);
    if (!表.length) return '';
    const 图标 = 板块 === '文学' ? '📖' : '🔬';
    return `<div class="区标题" style="margin-top:18px">${图标} ${转义(板块)}文档 (${表.length})</div>
      <div class="网格">${表.map(文章卡片HTML).join('')}</div>`;
  }

  // ── 正文渲染: txt / html / svg (本站不使用 Markdown) ──
  function 渲染正文(文) {
    const 格式 = ((文 && 文.格式) || 'txt').toLowerCase();
    if (格式 === 'html') {
      const 净 = String((文 && 文.正文) || '')
        .replace(/<\s*\/?\s*script[^>]*>/gi, '')
        .replace(/\son\w+\s*=\s*"[^"]*"/gi, '');
      return `<div class="文档体">${净}</div>`;
    }
    if (格式 === 'svg') {
      return `<div class="文档体 图容器">${(文 && 文.正文) || ''}</div>`;
    }
    return `<pre class="txt正文">${转义((文 && 文.正文) || '')}</pre>`;
  }

  function 渲染文档列表() {
    const C = 核();
    const 词 = C.状态.搜索词.toLowerCase();
    const 板 = C.状态.文板块 || '全部';
    const 表 = C.文章表.filter((a) =>
      (!词 || a.标题.toLowerCase().includes(词) || (a.标签 || []).join(',').toLowerCase().includes(词)) &&
      (板 === '全部' || ((a && a.板块) || '理学') === 板));
    return `
      <div class="横幅">
        <h2>📚 文档 (${C.文章表.length}) · 卡片视图</h2>
        <p>本站不支持 Markdown, 文档统一为 txt / html / svg 三种格式 · 支持撰写与保存</p>
      </div>
      <div class="工具条">
        <button class="主钮" data-动作="撰写">✍️ 撰写新文档</button>
        <div class="组">
          ${['全部', '文学', '理学'].map((f) => `<button class="筛选片 ${C.状态.文板块 === f ? '活跃' : ''}" data-动作="文板块" data-板块="${f}">${f}</button>`).join('')}
        </div>
        <span class="计数">共 ${表.length} 篇</span>
      </div>
      ${表.length
        ? `<div class="网格">${表.map(文章卡片HTML).join('')}</div>`
        : '<div class="空态"><div class="图">📚</div><div>没有匹配的文档</div></div>'}`;
  }

  function 渲染文档详情(标题) {
    const C = 核();
    const 文 = C.文章表.find((a) => a.标题 === 标题) || C.自建列表().find((a) => a.标题 === 标题);
    if (!文) return '<div class="空态"><div class="图">📄</div><div>文档不存在</div></div>';
    return `
      <div class="横幅">
        <h2>📄 ${转义(文.标题)}</h2>
        <p>${转义(文.作者 || '')} · ${转义(文.日期 || '')} · ${(文.标签 || []).join(' / ')}
           <span class="徽章">${转义((文.格式 || 'txt').toUpperCase())}</span></p>
      </div>
      <div class="文档卡" style="cursor:default">
        ${渲染正文(文)}
      </div>
      <div class="工具条">
        <button class="次钮" data-动作="文档列表">← 返回文档列表</button>
        <button class="次钮" data-动作="复制" data-文本="${转义(文.正文 || '')}">复制全文</button>
      </div>`;
  }

  function 渲染导航页() {
    const C = 核();
    return `
      <div class="横幅">
        <h2>🌐 站外导航 (${C.导航站.length})</h2>
        <p>常用 GitHub 生态与镜像站点, 点击在新标签打开。</p>
      </div>
      <div class="网格">
        ${C.导航站.map((n) => `
          <div class="卡片" data-动作="开链" data-链="${转义(n.网址)}">
            <div class="卡头">${n.图标 || '🌐'}</div>
            <div class="卡体">
              <div class="卡名">${转义(n.名)}</div>
              <div class="卡分类">${转义(n.说明)}</div>
              <div class="卡介" style="word-break:break-all">${转义(n.网址)}</div>
            </div>
          </div>`).join('')}
      </div>`;
  }

  function 渲染用户页(标签) {
    const C = 核();
    const 标签表 = ['收藏', '历史', '自建', '设置'];
    const 复原 = (c) => C.全部资源.find((r) => r.名称 === c.名称) || { 名称: c.名称, 分类: c.分类, 简介: '本地条目', 星级: 0 };
    let 体 = '';
    if (标签 === '收藏') {
      const 列 = C.收藏列表();
      体 = 列.length ? `<div class="网格">${列.map(复原).map(卡片HTML).join('')}</div>`
        : '<div class="空态"><div class="图">⭐</div><div>收藏夹还是空的</div></div>';
    } else if (标签 === '历史') {
      const 列 = C.历史列表();
      体 = 列.length ? `<div class="网格">${列.map(复原).map(卡片HTML).join('')}</div>`
        : '<div class="空态"><div class="图">🕘</div><div>暂无历史记录</div></div>';
    } else if (标签 === '自建') {
      const 列 = C.自建列表();
      体 = `${列.length ? `<div class="网格">${列.map(卡片HTML).join('')}</div>` : '<div class="空态"><div class="图">➕</div><div>还没有自建资源</div></div>'}
        <div class="工具条"><button class="主钮" data-动作="新建">➕ 新建资源</button></div>`;
    } else {
      const 后端 = C.存储.读('后端', '自动');
      体 = `
        <div class="区标题小">数据后端 (三层存储)</div>
        ${['自动', '本地优先', '停用 sql.js'].map((b) => `<div class="设置项 ${后端 === b ? '活跃' : ''}" data-动作="设后端" data-后端="${b}">${b}</div>`).join('')}
        <div class="区标题小">数据管理</div>
        <div class="工具条">
          <button class="次钮" data-动作="导出JSON">📤 导出 JSON</button>
          <button class="次钮" data-动作="导出DB">💾 导出 .db (sql.js)</button>
          <button class="次钮" data-动作="清空">🧹 清空本地数据</button>
        </div>
        <div class="区标题小">存储层状态</div>
        <div class="设置项">localStorage — ${C.存储.可用.本地 ? '可用 ✓' : '未测试'}</div>
        <div class="设置项">IndexedDB — ${C.存储.可用.索引 ? '可用 ✓' : '不可用 (file:// 下常见)'}</div>
        <div class="设置项">sql.js (WASM) — ${C.存储.可用.数据库 ? '可用 ✓' : '未加载 (断网时自动跳过)'}</div>`;
    }
    return `
      <div class="横幅">
        <h2>👤 我的门户</h2>
        <p>收藏 ${C.收藏列表().length} · 历史 ${C.历史列表().length} · 自建 ${C.自建列表().length} · 评论 ${C.评论列表().length}</p>
      </div>
      <div class="工具条">
        ${标签表.map((t) => `<button class="筛选片 ${标签 === t ? '活跃' : ''}" data-动作="用户页" data-标签="${t}">${t}</button>`).join('')}
      </div>
      ${体}`;
  }

  // ══════════ 弹窗 / 面板 ══════════
  function 打开详情(分类, 名称) {
    const C = 核();
    const 项 = C.全部资源.find((r) => r.名称 === 名称 && r.分类 === 分类)
      || C.自建列表().find((r) => r.名称 === 名称)
      || C.全部资源.find((r) => r.名称 === 名称);
    if (!项) return;
    C.记录历史(项);
    C.状态.当前 = 项;
    const 键 = (项.分类 || '') + '/' + 项.名称;
    const 图 = C.分类图标[项.分类] || '📄';

    document.querySelector('#弹窗').innerHTML = `
      <div class="弹头">
        <span class="图">${图}</span>
        <div>
          <h3>${转义(项.名称)}</h3>
          <div class="副">${转义(项.分类)} · ${转义(C.分类说明[项.分类] || '')} · 更新 ${转义(项.年份 || '')}</div>
        </div>
        <button class="关闭钮" data-动作="关弹窗">×</button>
      </div>
      <div class="弹体">
        <p>${转义(项.简介)}</p>
        ${(项.要点 || []).length ? `<div class="区标题小">要点</div><div class="要点行">${项.要点.map((p) => `<span class="要点">${转义(p)}</span>`).join('')}</div>` : ''}
        ${(项.标签 || []).length ? `<div class="区标题小">标签</div><div class="标签行">${项.标签.map((t) => `<span class="标签" data-动作="搜标签" data-标签="${转义(t)}">#${转义(t)}</span>`).join('')}</div>` : ''}
        ${项.链接 ? `<div class="区标题小">链接</div><div class="加速项"><span class="链">${转义(项.链接)}</span><span class="钮组"><button class="小钮" data-动作="开链" data-链="${转义(项.链接)}">打开</button><button class="小钮" data-动作="复制" data-文本="${转义(项.链接)}">复制</button></span></div>` : ''}

        <div class="操作行">
          <button class="操作钮" id="赞钮" data-动作="点赞" data-名称="${转义(项.名称)}">👍 赞 <span id="赞数">${C.点赞数(项.名称)}</span></button>
          <button class="操作钮 ${C.是否收藏(项.名称) ? 'on' : ''}" id="藏钮" data-动作="收藏" data-分类="${转义(项.分类)}" data-名称="${转义(项.名称)}">⭐ ${C.是否收藏(项.名称) ? '已收藏' : '收藏'}</button>
          ${项.链接 ? `<button class="操作钮" data-动作="加速这条" data-链="${转义(项.链接)}">⚡ 生成加速链接</button>` : ''}
        </div>

        <div class="评论框">
          <div class="区标题小">评论 <span class="徽章" id="评论后端徽章">localStorage</span></div>
          <textarea id="评论输入" placeholder="说点什么…"></textarea>
          <div class="操作行">
            <button class="主钮" id="评论发送" data-动作="发评论" data-键="${转义(键)}">发送评论</button>
          </div>
          <div id="评论列表" style="margin-top:10px">
            ${C.某键评论(键).map((c) => `
              <div class="评论项">
                <div class="元">${转义(c.姓名)} · ${转义(c.时间)}</div>
                <div class="文">${转义(c.文本)}</div>
              </div>`).join('') || '<div class="元" style="color:#a89ba4">暂无评论</div>'}
          </div>
        </div>
      </div>`;
    document.querySelector('#遮罩').classList.add('显示');
  }

  function 关弹窗() {
    const 罩 = document.querySelector('#遮罩');
    if (罩) 罩.classList.remove('显示');
    if (location.hash.startsWith('#/详情')) {
      try {
        history.replaceState(null, '', location.pathname + location.search + '#/');
      } catch (e) {
        location.hash = '#/'; // file:// 下 replaceState 可能被拒
      }
    }
  }

  function 打开新建() {
    const 分类表 = Object.keys(核().分类图标);
    document.querySelector('#弹窗').innerHTML = `
      <div class="弹头">
        <span class="图">➕</span>
        <div><h3>新建资源</h3><div class="副">保存到 localStorage, 刷新不丢</div></div>
        <button class="关闭钮" data-动作="关弹窗">×</button>
      </div>
      <div class="弹体">
        <div class="加速输入行" style="margin-bottom:8px">
          <input class="加速输入" id="新名" placeholder="名称 *">
          <select class="下拉" id="新分类">${分类表.map((c) => `<option value="${转义(c)}">${转义(c)}</option>`).join('')}</select>
        </div>
        <div class="加速输入行" style="margin-bottom:8px">
          <input class="加速输入" id="新标签" placeholder="标签 (逗号分隔)">
          <input class="加速输入" id="新年份" placeholder="年份" value="2026">
        </div>
        <input class="加速输入" id="新链接" placeholder="链接 (可留空)" style="width:100%;margin-bottom:8px">
        <textarea id="新简介" class="加速输入" placeholder="简介" style="width:100%;min-height:70px"></textarea>
        <div class="操作行">
          <button class="主钮" id="新建保存" data-动作="保存新建">保存</button>
          <button class="次钮" data-动作="关弹窗">取消</button>
        </div>
      </div>`;
    document.querySelector('#遮罩').classList.add('显示');
  }

  function 打开撰写() {
    const 格式表 = (window.文章数据 && window.文章数据.格式表) || ['txt', 'html', 'svg'];
    document.querySelector('#弹窗').innerHTML = `
      <div class="弹头">
        <span class="图">✍️</span>
        <div><h3>撰写文档</h3><div class="副">支持 txt / html / svg, 不支持 Markdown</div></div>
        <button class="关闭钮" data-动作="关弹窗">×</button>
      </div>
      <div class="弹体">
        <div class="加速输入行" style="margin-bottom:8px">
          <input class="加速输入" id="文标题" placeholder="标题 *">
          <select class="下拉" id="文格式">${格式表.map((f) => `<option value="${f}">${String(f).toUpperCase()}</option>`).join('')}</select>
        </div>
        <input class="加速输入" id="文标签" placeholder="标签 (逗号分隔)" style="width:100%;margin-bottom:8px">
        <textarea id="文正文" class="加速输入" placeholder="正文内容 (txt 直接写; html 写标签; svg 写 <svg…>)"
          style="width:100%;min-height:200px;font-family:Consolas,monospace"></textarea>
        <div class="操作行">
          <button class="主钮" id="文档保存" data-动作="保存文档">保存文档</button>
          <button class="次钮" data-动作="关弹窗">取消</button>
        </div>
      </div>`;
    document.querySelector('#遮罩').classList.add('显示');
  }

  function 用户面板(显示) {
    const C = 核();
    const 面 = document.querySelector('#用户面板');
    const 罩 = document.querySelector('#面板遮罩');
    if (显示) {
      面.classList.add('展开');
      罩.classList.add('显示');
      document.querySelector('#面板体').innerHTML = `
        <div class="菜单项" id="菜单收藏" data-动作="用户页" data-标签="收藏">⭐ 我的收藏 (${C.收藏列表().length})</div>
        <div class="菜单项" id="菜单历史" data-动作="用户页" data-标签="历史">🕘 历史记录 (${C.历史列表().length})</div>
        <div class="菜单项" id="菜单自建" data-动作="用户页" data-标签="自建">➕ 自建资源 (${C.自建列表().length})</div>
        <div class="菜单项" id="菜单设置" data-动作="用户页" data-标签="设置">⚙️ 设置与数据</div>`;
    } else {
      面.classList.remove('展开');
      罩.classList.remove('显示');
    }
  }

  // ══════════ 页面调度 ══════════
  function 渲染页面() {
    const C = 核();
    const 路 = C.解析路由();
    const 主 = document.querySelector('#主容器');
    const 顶栏键 = 路.页 === '首页' ? '首页'
      : (['导航', '用户'].includes(路.页) ? 路.页
        : (路.页 === '板块' ? 路.板块 : ''));

    let 内容 = '';
    switch (路.页) {
      case '首页': 内容 = 渲染首页(); break;
      case '加速': 内容 = 渲染加速页(); break;
      case '命令': 内容 = 渲染命令页(); break;
      case '文档': 内容 = 渲染文档列表(); break;
      case '文档详情': 内容 = 渲染文档详情(路.标题); break;
      case '导航': 内容 = 渲染导航页(); break;
      case '板块': {
        const 板 = C.板块表.find((b) => b.键 === 路.板块);
        const 列 = 板 ? C.全部资源.filter((r) => 板.分类.includes(r.分类)) : C.全部资源;
        // 板块附加区: 软件含加速工具, 理学含命令手册, 文学含文章卡片
        let 附加 = '';
        if (板 && 板.键 === '软件') 附加 = 加速区HTML();
        if (板 && 板.键 === '理学') 附加 = 板块文章卡片('理学') + 命令手册HTML();
        if (板 && 板.键 === '文学') 附加 = 板块文章卡片('文学');
        内容 = `<div class="横幅"><h2>${板 ? 板.图标 + ' ' + 板.名 : '全部资源'}</h2><p>${转义(板 ? (板.分类.map((c) => C.分类说明[c] || c).join(' · ')) : '')}</p></div>
          ${附加}
          ${工具条HTML(C.状态.筛选, C.状态.排序)}${网格HTML(过筛(列, C.状态.筛选, C.状态.排序, C.状态.搜索词))}`;
        break;
      }
      case '分类': {
        const 列 = C.全部资源.filter((r) => r.分类 === 路.分类);
        内容 = `<div class="横幅"><h2>${C.分类图标[路.分类] || '📄'} ${转义(路.分类)}</h2><p>${转义(C.分类说明[路.分类] || '')}</p></div>
          ${工具条HTML(C.状态.筛选, C.状态.排序)}${网格HTML(过筛(列, C.状态.筛选, C.状态.排序, C.状态.搜索词))}`;
        break;
      }
      case '搜索': {
        C.状态.搜索词 = 路.词 || '';
        const 列 = 过筛(C.全部资源, C.状态.筛选, C.状态.排序, C.状态.搜索词);
        内容 = `<div class="横幅"><h2>🔍 搜索: ${转义(C.状态.搜索词)}</h2><p>命中 ${列.length} 条资源</p></div>
          ${工具条HTML(C.状态.筛选, C.状态.排序)}${网格HTML(列)}`;
        break;
      }
      case '用户': 内容 = 渲染用户页(路.标签); break;
      case '详情':
        内容 = 渲染首页();
        setTimeout(() => 打开详情(路.分类, 路.名称), 60);
        break;
      default: 内容 = 渲染首页();
    }

    主.innerHTML = 内容;
    document.body.dataset.视图 = 路.页;

    const 计 = document.querySelector('#结果计数');
    if (计) 计.textContent = '共 ' + 主.querySelectorAll('.卡片').length + ' 项';

    渲染顶栏(顶栏键);
    渲染侧边栏(路);
    应用侧栏();
    刷新存储状态();
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function 刷新存储状态() {
    const C = 核();
    const 元 = document.querySelector('#存储状态');
    if (!元) return;
    元.innerHTML = `<span class="好">💾 localStorage ${C.存储.可用.本地 ? '✓' : '✓'} | IDB ${C.存储.可用.索引 ? '✓' : '✗'} | sql.js ${C.存储.可用.数据库 ? '✓' : '✗'}</span>
      <span class="差"> | 收藏 ${C.收藏列表().length} | 历史 ${C.历史列表().length} | 评论 ${C.评论列表().length} | 点赞 ${Object.keys(C.点赞表()).length}</span>`;
  }

  function 渲染加速结果(值) {
    const C = 核();
    const 框 = document.querySelector('#加速结果');
    if (!框) return;
    const 列 = C.生成加速(值);
    if (!列.length) {
      框.classList.add('显示');
      框.innerHTML = '<div class="元" style="color:#a89ba4;padding:6px 2px">请输入有效的 GitHub 链接 (raw / release / archive / blob / .git)</div>';
      return;
    }
    框.classList.add('显示');
    框.innerHTML = `
      <div class="区标题小" id="加速标题">共生成 ${列.length} 个加速地址</div>
      ${列.map((c) => `
        <div class="加速项">
          <span class="名">${c.推荐 ? '⭐ ' : ''}${转义(c.名)}</span>
          <span class="链" title="${转义(c.地址)}">${转义(c.地址)}</span>
          <span class="钮组">
            <button class="小钮" data-动作="复制" data-文本="${转义(c.地址)}">复制</button>
            <button class="小钮" data-动作="开链" data-链="${转义(c.地址)}">打开</button>
          </span>
        </div>`).join('')}`;
  }

  function 下载文件(名, 内容, 类型) {
    const C = 核();
    try {
      const blob = new Blob([内容], { type: 类型 || 'text/plain' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 名;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 3000);
      C.提示('已导出 ' + 名);
    } catch (e) {
      C.提示('导出失败: ' + e.message);
    }
  }

  // ══════════ 事件绑定 (委托) ══════════
  function 绑定事件() {
    document.addEventListener('click', async (事) => {
      const C = 核();
      const 元 = 事.target.closest('[data-动作]');
      if (!元) {
        if (事.target.id === '用户钮') 用户面板(!document.querySelector('#用户面板').classList.contains('展开'));
        return;
      }
      const 动 = 元.dataset.动作;

      switch (动) {
        case '回家': C.跳转(''); break;
        case '导航': C.跳转(元.dataset.路 || ''); break;
        case '板块': C.跳转('板块/' + encodeURIComponent(元.dataset.板块)); break;
        case '分类': C.跳转('分类/' + encodeURIComponent(元.dataset.分类)); break;
        case '用户':
        case '用户页':
          C.跳转('用户/' + encodeURIComponent(元.dataset.标签 || '收藏'));
          用户面板(false);
          break;
        case '详情':
          C.跳转('详情/' + encodeURIComponent(元.dataset.分类) + '/' + encodeURIComponent(元.dataset.名称));
          break;
        case '开链': {
          const 链 = 元.dataset.链;
          if (链) window.open(链, '_blank', 'noopener');
          else C.提示('该资源为本地项目, 暂无外链');
          break;
        }
        case '复制': await C.复制文本(元.dataset.文本 || ''); break;
        case '搜标签':
          C.状态.搜索词 = 元.dataset.标签;
          C.跳转('搜索/' + encodeURIComponent(元.dataset.标签));
          break;
        case '筛选':
          C.状态.筛选 = 元.dataset.筛选;
          渲染页面();
          break;
        case '文板块':
          C.状态.文板块 = 元.dataset.板块;
          渲染页面();
          break;
        case '点赞': {
          const 名 = 元.dataset.名称;
          const 数 = C.添加点赞(名);
          const 数元 = document.querySelector('#赞数');
          if (数元) 数元.textContent = 数;
          C.提示('已点赞: ' + 名 + ' (' + 数 + ')');
          刷新存储状态();
          break;
        }
        case '收藏': {
          const 项 = { 名称: 元.dataset.名称, 分类: 元.dataset.分类 };
          const 收 = C.切换收藏(项);
          元.classList.toggle('on', 收);
          元.textContent = 收 ? '⭐ 已收藏' : '⭐ 收藏';
          if (location.hash.indexOf('#/用户') === 0) 渲染页面();
          break;
        }
        case '发评论': {
          const 框 = document.querySelector('#评论输入');
          const 文 = ((框 && 框.value) || '').trim();
          if (!文) { C.提示('请输入评论内容'); return; }
          C.添加评论(元.dataset.键, '访客', 文);
          C.提示('评论已保存 (localStorage)');
          const 项 = C.状态.当前;
          if (项) 打开详情(项.分类, 项.名称);
          break;
        }
        case '加速这条': {
          const 框 = document.querySelector('#加速输入');
          if (框) {
            框.value = 元.dataset.链 || '';
            渲染加速结果(框.value);
            document.querySelector('#加速结果').scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
          break;
        }
        case '文档': C.跳转('文档/' + encodeURIComponent(元.dataset.标题)); break;
        case '文档列表': C.跳转('文档'); break;
        case '撰写': 打开撰写(); break;
        case '新建': 打开新建(); break;
        case '保存新建': {
          const 名 = ((document.querySelector('#新名') || {}).value || '').trim();
          if (!名) { C.提示('请填写名称'); return; }
          const 列 = C.自建列表();
          列.unshift({
            名称: 名,
            分类: (document.querySelector('#新分类') || {}).value || '本地项目',
            标签: (((document.querySelector('#新标签') || {}).value) || '').split(/[,，]/).map((s) => s.trim()).filter(Boolean),
            年份: parseInt(((document.querySelector('#新年份') || {}).value) || '2026', 10),
            链接: (((document.querySelector('#新链接') || {}).value) || '').trim(),
            简介: (((document.querySelector('#新简介') || {}).value) || '').trim() || '自建资源',
            星级: 4,
          });
          C.存储.写('自建', 列);
          关弹窗();
          C.提示('已保存: ' + 名);
          C.跳转('用户/自建');
          break;
        }
        case '保存文档': {
          const 题 = ((document.querySelector('#文标题') || {}).value || '').trim();
          if (!题) { C.提示('请填写标题'); return; }
          const 列 = C.自建列表();
          列.unshift({
            名称: 题, 标题: 题,
            正文: (((document.querySelector('#文正文') || {}).value) || '').trim() || '（空内容）',
            格式: (document.querySelector('#文格式') || {}).value || 'txt',
            作者: (C.站点.账号表 || {}).gh || '我',
            日期: new Date().toISOString().slice(0, 10),
            标签: (((document.querySelector('#文标签') || {}).value) || '').split(/[,，]/).map((s) => s.trim()).filter(Boolean),
            分类: '文章', 星级: 4, 年份: new Date().getFullYear(),
          });
          C.存储.写('自建', 列);
          关弹窗();
          C.提示('文档已保存: ' + 题);
          C.跳转('文档');
          break;
        }
        case '设后端':
          C.存储.写('后端', 元.dataset.后端);
          C.提示('数据后端: ' + 元.dataset.后端);
          渲染页面();
          break;
        case '导出JSON': {
          const 包 = {
            收藏: C.收藏列表(), 历史: C.历史列表(), 评论: C.评论列表(),
            自建: C.自建列表(), 点赞: C.点赞表(), 导出时间: new Date().toISOString(),
          };
          下载文件('gh门户数据.json', JSON.stringify(包, null, 2), 'application/json');
          break;
        }
        case '导出DB': {
          const 字节 = C.存储.导出数据库();
          if (!字节) { C.提示('sql.js 未就绪, 无法导出 .db'); return; }
          const blob = new Blob([字节], { type: 'application/octet-stream' });
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = 'gh门户.db';
          a.click();
          setTimeout(() => URL.revokeObjectURL(a.href), 3000);
          C.提示('已导出 gh门户.db');
          break;
        }
        case '清空':
          if (window.confirm('确定清空本机门户数据? (收藏/历史/评论/自建)')) {
            ['收藏', '历史', '评论', '自建', '点赞'].forEach((k) => C.存储.写(k, k === '点赞' ? {} : []));
            C.提示('已清空');
            渲染页面();
          }
          break;
        case '关弹窗': 关弹窗(); break;
        default: break;
      }
    });

    document.addEventListener('input', (事) => {
      const C = 核();
      if (事.target.id === '搜索框') {
        C.状态.搜索词 = 事.target.value.trim();
        clearTimeout(window.__搜索定时器);
        window.__搜索定时器 = setTimeout(() => {
          C.跳转('搜索/' + encodeURIComponent(C.状态.搜索词));
        }, 420);
      }
    });

    document.addEventListener('change', (事) => {
      const C = 核();
      if (事.target.id === '排序') {
        C.状态.排序 = 事.target.value;
        渲染页面();
      }
    });

    document.addEventListener('click', (事) => {
      if (事.target.id === '加速生成') {
        const 框 = document.querySelector('#加速输入');
        渲染加速结果(框 ? 框.value : '');
      } else if (事.target.id === '加速示例') {
        const 框 = document.querySelector('#加速输入');
        if (框) {
          框.value = 'https://github.com/cli/cli/archive/refs/heads/trunk.zip';
          渲染加速结果(框.value);
        }
      } else if (事.target.id === '侧栏折叠') {
        切换侧栏();
      } else if (事.target.id === '展开钮') {
        切换侧栏();
      } else if (事.target.id === '面板关闭') {
        用户面板(false);
      } else if (事.target.id === '面板遮罩') {
        用户面板(false);
      } else if (事.target.id === '遮罩') {
        关弹窗();
      }
    });

    document.addEventListener('keydown', (事) => {
      if (事.key === 'Escape') {
        关弹窗();
        用户面板(false);
      }
    });

    window.addEventListener('hashchange', () => 渲染页面());
  }

  // ── 暴露给 网站主页.js (核心) 调用 ──
  window.门户操作 = {
    渲染页面, 绑定事件, 绑定滚动, 渲染加速结果,
    打开详情, 关弹窗, 打开新建, 打开撰写, 用户面板,
    应用侧栏, 切换侧栏, 刷新存储状态, 下载文件, 渲染正文,
  };
})();
