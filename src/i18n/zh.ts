export const zh = {
  meta: {
    title: "Aura — 本地优先的桌面 AI Agent",
    description:
      "Aura 是一个本地优先的桌面 AI Agent，直接在你的工作区里读文件、改代码、跑构建。会话、密钥与配置全部留在本机。",
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
    eyebrow: "应用界面",
    heading: "一个窗口，专注当前工作",
    desc: "左侧工作区与会话归类，右侧对话即界面；亮暗两套主题自动跟随系统偏好。",
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
      model: "GLM-4.7",
      enterHint: "Enter 发送 · Shift+Enter 换行",
    },
  },
  features: {
    eyebrow: "产品特性",
    heading: "为什么选 Aura",
    items: [
      {
        title: "本地优先",
        desc: "会话历史、任务清单、设置与 API 密钥全部存在本地 SQLite，配置密钥不上传任何第三方服务，断网也能翻历史。",
      },
      {
        title: "纯 Rust 后端",
        desc: "基于 Tauri 2 构建极小体积与低内存占用，核心逻辑全部 Rust 处理，模型直接在工作区真实读写文件、执行命令。",
      },
      {
        title: "三种工作模式",
        desc: "对话、规划、执行三档递进：权限由程序硬校验，越权调用会被拦截并提示，而不是静默失败。",
      },
      {
        title: "多模型接入",
        desc: "内置 DeepSeek、OpenAI、Anthropic 等主流厂商预设，也能自定义 Base URL；常用模型可收藏，点击即切。",
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
    userMessagePrefix: "帮我",
  },
  trust: {
    eyebrow: "信任",
    heading: "开源、透明、可验证",
    items: [
      {
        label: "开源许可",
        value: "Apache 2.0",
        desc: "全部源码公开，欢迎阅读与贡献。",
      },
      {
        label: "源码仓库",
        value: "github.com/aura-xyz/aura",
        desc: "源码与全部 Release 记录都在这里。",
      },
      {
        label: "数据存储",
        value: "本地 SQLite",
        desc: "不依赖云端账号体系，卸载即清空。",
      },
    ],
  },
  footer: {
    github: "GitHub",
    releases: "下载 Release",
    readme: "README",
    note: "文档目前以中文维护",
  },
};

export type Dictionary = typeof zh;
