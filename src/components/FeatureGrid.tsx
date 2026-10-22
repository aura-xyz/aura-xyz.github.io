import { useI18n } from "../i18n/context";
import type { Dictionary } from "../i18n/zh";
import Section from "./Section";
import SectionHeader from "./SectionHeader";

/**
 * 图文交替分屏（官网常用的 feature rows）。
 * 右侧每条配一个用代码画的 mini 界面片段，素材全部取自主应用真实 UI。
 */

/** lucide 风格手写图标（24 viewBox） */
function MiniIcon({
  d,
  size = 14,
  className = "",
}: {
  d: string | readonly string[];
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
    >
      {(typeof d === "string" ? [d] : d).map((p, i) => (
        <path key={i} d={p} />
      ))}
    </svg>
  );
}

const CHECK = "M5 12l4 4 10-10";
const CHEVRON_UP = "M18 15l-6-6-6 6";

/** 统一的「窗口片段」外框 */
function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-card border border-line bg-surface p-5 shadow-xs">
      {children}
    </div>
  );
}

/** 0 · 本地库：迷你工作区列表 + SQLite 底条 */
function MockLocal() {
  const rows = [
    { dot: "bg-brand", name: "aura-app", active: true },
    { dot: "bg-line", name: "docs-site", active: false },
    { dot: "bg-line", name: "web-scratch", active: false },
  ];
  return (
    <Frame>
      <div className="space-y-1">
        {rows.map((r) => (
          <div
            key={r.name}
            className={`flex items-center gap-2 rounded-tag px-2 py-1.5 text-sm ${
              r.active ? "bg-bubble font-medium text-foreground" : "text-subtle"
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${r.dot}`} />
            <span className="truncate">{r.name}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-line pt-3 font-mono text-xs text-subtle">
        <span>aura.db · SQLite</span>
        <span className="text-success">offline ok</span>
      </div>
    </Frame>
  );
}

/** 1 · 权限：ModeTabs 胶囊 + 权限矩阵 */
function MockModes({ t }: { t: Dictionary }) {
  const cols = ["Chat", "Plan", "Build"];
  const matrix: Array<[string, boolean, boolean, boolean]> = [
    [t.modes.columns.read, true, true, true],
    [t.modes.columns.write, false, false, true],
    [t.modes.columns.exec, false, false, true],
  ];
  return (
    <Frame>
      <div className="inline-flex items-center gap-0.5 rounded-full border border-line bg-surface p-0.5">
        {cols.map((c, i) => (
          <span
            key={c}
            className={`rounded-full px-3 py-1 text-xs ${
              i === 2 ? "bg-brand text-white" : "text-subtle"
            }`}
          >
            {c}
          </span>
        ))}
      </div>
      <div className="mt-4 space-y-1.5">
        {matrix.map(([label, ...ok]) => (
          <div
            key={label}
            className="grid grid-cols-[1fr_auto] items-center gap-x-6 sm:grid-cols-[1fr_auto_auto_auto]"
          >
            <span className="text-sm text-foreground">{label}</span>
            {ok.map((v, i) => (
              <span key={i} className="w-10 text-center">
                {v ? (
                  <MiniIcon d={CHECK} size={13} className="mx-auto text-success" />
                ) : (
                  <span className="text-sm text-subtle opacity-60">—</span>
                )}
              </span>
            ))}
          </div>
        ))}
      </div>
    </Frame>
  );
}

/** 2 · Rust：终端卡片 */
function MockRust() {
  const lines: Array<{ text: string; tone: "cmd" | "ok" | "plain" }> = [
    { text: "$ cargo test", tone: "cmd" },
    { text: "test result: ok. 249 passed; 0 failed", tone: "plain" },
    { text: "$ pnpm test", tone: "cmd" },
    { text: "110 tests passed", tone: "plain" },
    { text: "✓ 核心、UI、权限路径全覆盖", tone: "ok" },
  ];
  return (
    <Frame>
      <pre className="font-mono text-[13px] leading-loose text-subtle">
        {lines.map((l, i) => (
          <div key={i}>
            {l.tone === "ok" ? (
              <span className="text-success">{l.text}</span>
            ) : (
              l.text
            )}
          </div>
        ))}
      </pre>
    </Frame>
  );
}

/** 3 · 多模型：模型下拉片段 */
function MockModels({ t }: { t: Dictionary }) {
  const groups: Array<[string, string[], number]> = [
    ["Zhipu", ["GLM-4.7", "GLM-4.7-Air"], 0],
    ["DeepSeek", ["DeepSeek Chat"], -1],
    ["OpenAI", ["GPT Mini"], -1],
  ];
  return (
    <Frame>
      <div className="rounded-card border border-line bg-surface p-1.5 shadow-xs">
        {groups.map(([provider, models, checked], gi) => (
          <div key={provider} className={gi > 0 ? "border-t border-line pt-1" : ""}>
            <p className="px-2 pb-1 text-[11px] text-subtle">{provider}</p>
            {models.map((m, mi) => {
              const active = checked === mi && gi === 0;
              return (
                <div
                  key={m}
                  className={`flex items-center justify-between rounded-tag px-2 py-1.5 text-sm ${
                    active
                      ? "bg-bubble font-medium text-foreground"
                      : "text-foreground"
                  }`}
                >
                  <span className="pl-1.5">{m}</span>
                  {active && (
                    <MiniIcon d={CHECK} size={13} className="text-brand" />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-1.5 text-xs text-subtle">
        <MiniIcon d={CHEVRON_UP} size={12} />
        {t.features.mockNote}
      </div>
    </Frame>
  );
}

const MOCKS: Array<(t: Dictionary) => React.ReactNode> = [
  () => <MockLocal />,
  (t) => <MockModes t={t} />,
  () => <MockRust />,
  (t) => <MockModels t={t} />,
];

export default function FeatureGrid() {
  const { t } = useI18n();
  return (
    <Section>
      <SectionHeader
        eyebrow={t.features.eyebrow}
        heading={t.features.heading}
      />
      <div>
        {t.features.rows.map((row, i) => {
          const flip = i % 2 === 1;
          return (
            <div
              key={row.title}
              className="grid items-center gap-8 py-10 first:pt-0 last:pb-0 sm:gap-12 lg:grid-cols-2 lg:gap-16"
            >
              <div className={flip ? "lg:order-2" : ""}>
                <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                  {row.title}
                </h3>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-subtle">
                  {row.desc}
                </p>
                <ul className="mt-5 space-y-2.5">
                  {row.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2.5 text-[15px] text-foreground"
                    >
                      <span className="mt-0.5 text-brand">
                        <MiniIcon d={CHECK} size={15} />
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={flip ? "lg:order-1" : ""}>
                {MOCKS[i % MOCKS.length](t)}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
