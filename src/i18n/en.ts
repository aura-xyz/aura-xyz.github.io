import type { Dictionary } from "./zh";

export const en: Dictionary = {
  meta: {
    title: "Aura — Local-first desktop AI agent",
    description:
      "Aura is a local-first desktop AI agent that reads, edits and builds right inside your workspace. Sessions, keys and settings never leave your machine.",
  },
  nav: {
    features: "Features",
    demo: "Demo",
    download: "Download",
    getStarted: "Download",
  },
  hero: {
    subtitle:
      "Local-first desktop AI agent that reads, edits and builds right inside your workspace. Sessions, keys and settings never leave your machine.",
    download: "Download",
    downloadHint: "Get the latest installer for Windows",
    github: "GitHub",
    githubHint: "Browse the source repository",
    chips: ["Native Windows", "Apache-2.0", "Tauri 2 · Rust", "Auto updates"],
  },
  screenshot: {
    alt: "Aura app main window (follows system theme, rebuilt in code)",
    ui: {
      newChat: "New chat",
      skills: "Skills",
      mcp: "MCP",
      settings: "Settings",
      wsActive: "aura-app",
      wsOther: "docs-site",
      s1: "Missing search highlight",
      s2: "Input area height jitter",
      s3: "Static site export",
      user: "Search results don't highlight matched keywords — give hits a readable accent that works in dark mode too.",
      action1: "Read src/lib/search.rs",
      detail1: "impl Search {\n  fn hits(&self, q: &str) -> Vec<Hit> { … }\n}",
      action2: "Read src/components/SearchBar.tsx",
      detail2: 'return <span className="hit">{frag}</span>\n// colors still come from the light theme, poor contrast in dark',
      planTitle: "Plan",
      plan1: "`search.rs`: split matched ranges into a `Span` list for the renderer",
      plan2: "Add a `mark` style: brand blue 12% in light, bubble background + underline in dark",
      plan3: "SearchBar only consumes the rendered result — no shortcut behavior changes",
      placeholder: "Type a message…",
      placeholders: {
        chat: "Type a message…",
        plan: "Describe what you want — Aura will plan it first…",
        build: "Describe the task to execute…",
      },
      modeAria: "Session modes",
      expandSidebar: "Expand sidebar",
      collapseSidebar: "Collapse sidebar",
      openModel: "Choose model",
      modelAria: "Model list",
      send: "Send",
      demoHint:
        "Demo window: install Aura and connect a model to continue a real conversation here.",
      models: [
        { provider: "Zhipu", list: ["GLM-4.7", "GLM-4.7-Air"] },
        { provider: "DeepSeek", list: ["DeepSeek Chat"] },
        { provider: "OpenAI", list: ["GPT Mini"] },
      ],
      model: "GLM-4.7",
      enterHint: "Enter to send · Shift+Enter for newline",
    },
  },
  features: {
    eyebrow: "Features",
    heading: "Why Aura",
    mockNote: "Switch anytime below the input box",
    items: [],
    rows: [
      {
        title: "Every byte stays on your machine",
        desc: "Sessions, keys and settings live only in local SQLite. No account system, no cloud sync overhead, and full history works offline.",
        bullets: [
          "One SQLite file — uninstalling removes everything",
          "API keys stay in local config",
          "History is grouped by workspace automatically",
        ],
      },
      {
        title: "Three modes, permissions enforced",
        desc: "Chat is read-only, Plan produces a task list, and only Build may edit files or run commands — out-of-scope calls are double-checked by the program, never by prompt discipline.",
        bullets: [
          "Tool calls validated before and after",
          "Plan mode outputs a structured task list",
          "Every action stays visible in the flow",
        ],
      },
      {
        title: "Pure Rust, small and fast",
        desc: "All core logic runs in Rust; the frontend is a thin UI layer backed by hundreds of tests guarding the boundaries.",
        bullets: [
          "249 Rust test cases",
          "110 frontend test cases",
          "Build only needs the local toolchain",
        ],
      },
      {
        title: "Bring any model",
        desc: "Built-in presets for major providers, or point Aura at any Base URL. Pin what you use and switch instantly.",
        bullets: [
          "Presets and custom Base URLs",
          "Pin favorite models per provider",
          "Keys stay local, uploaded to no one",
        ],
      },
    ],
  },
  modes: {
    eyebrow: "Interactive demo",
    heading: "Three modes, one hard boundary",
    desc: "Switch below the input box; each message uses the currently selected mode. The permission matrix is enforced by the program — even if the model overreaches, the call is blocked.",
    columns: {
      read: "Read files",
      write: "Edit files",
      exec: "Run commands",
    },
    list: {
      chat: {
        name: "Chat",
        label: "Chat",
        desc: "Plain Q&A without any workflow — great for explaining code or thinking through ideas.",
        read: true,
        write: false,
        exec: false,
      },
      plan: {
        name: "Plan",
        label: "Plan",
        desc: "Researches the current state first, then produces a structured task list — read-only, never touches files.",
        read: true,
        write: false,
        exec: false,
      },
      build: {
        name: "Build",
        label: "Build",
        desc: "Works through the task list step by step: edits files, runs commands, reads errors and iterates.",
        read: true,
        write: true,
        exec: true,
      },
    },
  },
  demo: {
    eyebrow: "Transparency",
    heading: "Every action stays in the conversation",
    desc: "Reasoning and tool calls appear as plain text in the flow — which files were opened, what was changed, all in the open.",
    userMessagePrefix: "Please",
  },
  footer: {
    tagline:
      "A local-first desktop AI agent — sessions and keys never leave your machine.",
    product: "Product",
    productFeatures: "Features",
    productDemo: "Demo",
    productDownload: "Download",
    resources: "Resources",
    github: "GitHub",
    releases: "Releases",
    readme: "README",
    about: "About",
    license: "Apache 2.0 License",
    note: "Documentation is maintained in Chinese",
  },
  quote: {
    line: "Minimal surface. Maximum logic.",
    sub: "A small surface with a strong core.",
  },
  cta: {
    heading: "Install Aura and finish your first session in ten minutes",
  },
};
