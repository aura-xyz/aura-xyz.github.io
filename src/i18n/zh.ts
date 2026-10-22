export const zh = {
  meta: {
    title: "Aura — 本地优先的桌面 AI Agent",
    description:
      "Aura 是一个本地优先的桌面 AI Agent，直接在你的工作区里读文件、改代码、跑构建。会话、密钥与配置全部留在本机。",
  },
  nav: {
    features: "特性",
    demo: "演示",
    download: "下载",
    getStarted: "下载",
  },
  hero: {
    subtitle:
      "本地优先的桌面 AI Agent，直接在你的工作区里读文件、改代码、跑构建。会话、密钥与配置全部留在本机。",
    download: "下载",
    downloadHint: "获取适合 Windows 的最新安装包",
    github: "GitHub",
    githubHint: "查看源码仓库",
    chips: ["Windows 原生", "Apache-2.0", "Tauri 2 · Rust", "自动更新"],
  },
  screenshot: {
    alt: "Aura 应用主界面（跟随系统主题，由代码复刻）",
    ui: {
      newChat: "新建对话",
      skills: "Skills",
      mcp: "MCP",
      settings: "设置",
      wsActive: "aura-app",
      wsOther: "docs-site",
      s1: "搜索高亮缺失",
      s2: "输入区高度抖动",
      s3: "静态站点导出",
      user: "搜索结果里的关键词没有高亮，把命中片段加上可读的强调色，深色模式下也一样。",
      action1: "Read src/lib/search.rs",
      detail1: "impl Search {\n  fn hits(&self, q: &str) -> Vec<Hit> { … }\n}",
      action2: "Read src/components/SearchBar.tsx",
      detail2: 'return <span className="hit">{frag}</span>\n// 颜色仍取自亮色主题，深色下对比度不足',
      planTitle: "改法计划",
      plan1: "`search.rs`：把命中区间切分成 `Span` 列表，交给渲染层",
      plan2: "新增 `mark` 样式：亮色用品牌蓝 12% 底色，深色改用 bubble 底 + 下划线",
      plan3: "SearchBar 只消费渲染结果，不改动现有快捷键行为",
      placeholder: "输入消息…",
      placeholders: {
        chat: "输入消息…",
        plan: "描述你想做的事，先让 Aura 给出计划…",
        build: "描述要执行的任务…",
      },
      modeAria: "会话模式",
      expandSidebar: "展开侧边栏",
      collapseSidebar: "收起侧边栏",
      openModel: "选择模型",
      modelAria: "模型列表",
      send: "发送",
      demoHint:
        "演示窗口：安装 Aura 并接入模型后，就能在这里继续真实对话。",
      models: [
        { provider: "Zhipu", list: ["GLM-4.7", "GLM-4.7-Air"] },
        { provider: "DeepSeek", list: ["DeepSeek Chat"] },
        { provider: "OpenAI", list: ["GPT Mini"] },
      ],
      model: "GLM-4.7",
      enterHint: "Enter 发送 · Shift+Enter 换行",
    },
  },
  features: {
    eyebrow: "产品特性",
    heading: "为什么选 Aura",
    mockNote: "输入框下方随时切换",
    testNote: "✓ 核心、UI、权限路径全覆盖",
    editResult: "已写入 · cargo check 通过",
    items: [], // 已改用 rows 分屏展示
    rows: [
      {
        title: "所有数据都留在本机",
        desc: "会话、密钥、设置只存本地 SQLite。没有账号体系，没有云端同步开销，断网也能翻完整历史。",
        bullets: [
          "SQLite 单文件，卸载即清空",
          "API 密钥只存本机配置",
          "工作区自动归类历史对话",
        ],
      },
      {
        title: "在真实工作区里动手",
        desc: "选定一个目录作为工作区，读写的就是真实文件；改完直接跑构建、看报错再改，闭环在同一个窗口里。",
        bullets: [
          "工作区由你选定，作用域清晰",
          "改代码、跑构建、看报错再改",
          "每条改动都留在对话流里",
        ],
      },
      {
        title: "纯 Rust，小而快",
        desc: "核心逻辑全在 Rust 侧，前端只是薄薄一层 UI；数百个测试用例护住行为边界，改坏核心会先报红。",
        bullets: ["Rust 侧 249 个测试用例", "前端 110 个用例", "构建仅依赖本地工具链"],
      },
      {
        title: "接哪家模型仓库都行",
        desc: "内置主流厂商预设，也可以自定义 Base URL；常用模型收藏置顶，点击即切。",
        bullets: [
          "预设与自定义 Base URL",
          "按厂商分组收藏常用模型",
          "密钥本地保存，不上传任何第三方",
        ],
      },
    ],
  },
  modes: {
    eyebrow: "交互演示",
    heading: "三种模式，同一份硬边界",
    desc: "输入框下方切换，每次发送时按所选模式生效。权限矩阵由程序强制校验——即使模型越权调用，也会被拦截。",
    columns: {
      read: "可读文件",
      write: "可改文件",
      exec: "可执行命令",
    },
    list: {
      chat: {
        name: "Chat",
        label: "对话",
        desc: "纯问答，直接回答不涉及流程，适合解释代码、梳理思路。",
        read: true,
        write: false,
        exec: false,
      },
      plan: {
        name: "Plan",
        label: "规划",
        desc: "先调研现状，再产出结构化的任务清单，不触碰文件。",
        read: true,
        write: false,
        exec: false,
      },
      build: {
        name: "Build",
        label: "执行",
        desc: "按任务清单逐步推进：真实修改文件、执行命令、看报错再改。",
        read: true,
        write: true,
        exec: true,
      },
    },
  },
  demo: {
    eyebrow: "思考过程",
    heading: "每一步动作都在对话流里",
    desc: "推理与工具调用以纯文本形式平铺展示，点什么文件、改了哪里一目了然。",
    expand: "展开输出",
    collapse: "收起输出",
    userMessagePrefix: "帮我",
  },
  footer: {
    tagline: "本地优先的桌面 AI Agent，会话与密钥都留在你的机器上。",
    product: "产品",
    productFeatures: "特性",
    productDemo: "交互演示",
    productDownload: "下载",
    resources: "资源",
    github: "GitHub",
    releases: "Releases",
    readme: "README",
    license: "Apache 2.0 许可",
    note: "文档目前以中文维护",
  },
  quote: {
    line: "Minimal surface. Maximum logic.",
    sub: "界面做减法，逻辑做加法。",
  },
  cta: {
    heading: "装上 Aura，十分钟内完成第一次完整对话",
  },
};

export type Dictionary = typeof zh;
