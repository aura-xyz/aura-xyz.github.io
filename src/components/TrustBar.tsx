import { Fragment } from "react";

/**
 * 首屏产品窗口下方的信任横条（官网惯例 trust bar）。
 * 数据要点单行漂白：许可、仓库、技术栈、存储。
 */
const ITEMS = [
  "Apache-2.0",
  "github.com/aura-xyz/aura",
  "Tauri 2 · Rust",
  "SQLite",
];

export default function TrustBar() {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 rounded-card border border-line bg-surface px-6 py-4 font-mono text-xs text-subtle shadow-xs">
        {ITEMS.map((label, i) => (
          <Fragment key={label}>
            {i > 0 && (
              <span aria-hidden="true" className="hidden h-3 w-px bg-line sm:block" />
            )}
            <span className="font-medium">{label}</span>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
