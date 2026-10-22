/**
 * 交互演示区（ToolCallDemo）的静态数据。
 *
 * 与主应用 MessageList 的 block 模型对齐：user 气泡 → action 行 → 正文。
 * 所有内容双语并列；场景贴合 Aura 定位（本地笔记助手）。
 */
import type { Lang } from "./i18n/context";

type Localized = Record<Lang, string>;

export interface DemoBlock {
  kind: "action" | "text";
  text: Localized;
  /** 仅 action 块使用：可折叠的命令输出 */
  detail?: Localized;
}

export const demoUserMessage: Localized = {
  zh: "帮我看看上周那篇《本地优先》的笔记，待办清单还剩哪几项没做？",
  en: "In last week's note \"Local-first\", which checklist items are still open?",
};

export const demoBlocks: DemoBlock[] = [
  {
    kind: "action",
    text: { zh: "Read notes/local-first.md", en: "Read notes/local-first.md" },
    detail: {
      zh: "# 本地优先\n\n## 待办\n- [x] 数据库迁移到 SQLite\n- [ ] 双向同步的冲突解决\n- [ ] 导出为静态站点\n\n> 更新于 2026-10-21",
      en: "# Local-first\n\n## Todo\n- [x] Migrate database to SQLite\n- [ ] Conflict resolution for two-way sync\n- [ ] Export as a static site\n\n> Updated on 2026-10-21",
    },
  },
  {
    kind: "text",
    text: {
      zh: "这篇笔记的待办剩 2 项没完成：`双向同步的冲突解决` 和 `导出为静态站点`；`数据库迁移到 SQLite` 已完成。",
      en: "Two items remain open: `conflict resolution for two-way sync` and `export as a static site`; `migrate database to SQLite` is already done.",
    },
  },
];
