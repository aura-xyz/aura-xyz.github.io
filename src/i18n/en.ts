import type { Dictionary } from "./zh";

export const en: Dictionary = {
  meta: {
    title: "Aura — Local-first desktop AI agent",
    description:
      "Aura is a local-first desktop AI agent that reads, edits and builds right inside your workspace. Sessions, keys and settings never leave your machine.",
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
    eyebrow: "The app",
    heading: "One window, focused work",
    desc: "Workspaces and sessions on the left, the conversation fills the rest — light and dark themes follow your system automatically.",
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
      model: "GLM-4.7",
      enterHint: "Enter to send · Shift+Enter for newline",
    },
  },
  features: {
    eyebrow: "Features",
    heading: "Why Aura",
    items: [
      {
        title: "Local-first",
        desc: "Session history, task lists, settings and API keys live in a local SQLite database. Nothing is uploaded to any third party, and your history works offline.",
      },
      {
        title: "Pure Rust backend",
        desc: "Built on Tauri 2 for a tiny footprint and low memory use. Core logic is all Rust — the agent reads and writes real files and runs real commands in your workspace.",
      },
      {
        title: "Three work modes",
        desc: "Chat, Plan and Build form a strict progression. Permissions are enforced by the program: out-of-scope tool calls are blocked with a clear hint, never silently.",
      },
      {
        title: "Model agnostic",
        desc: "Built-in presets for DeepSeek, OpenAI, Anthropic and more, or point Aura at any Base URL. Pin the models you use and switch instantly.",
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
  trust: {
    eyebrow: "Trust",
    heading: "Open source, transparent, verifiable",
    items: [
      {
        label: "License",
        value: "Apache 2.0",
        desc: "The full source is public; contributions are welcome.",
      },
      {
        label: "Source",
        value: "github.com/aura-xyz/aura",
        desc: "Source code and the complete release history live here.",
      },
      {
        label: "Data storage",
        value: "Local SQLite",
        desc: "No cloud account required; uninstalling removes everything.",
      },
    ],
  },
  footer: {
    github: "GitHub",
    releases: "Download Release",
    readme: "README",
    note: "Documentation is maintained in Chinese",
  },
};
