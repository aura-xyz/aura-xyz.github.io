import { useEffect, useRef, useState } from "react";
import { useI18n } from "../i18n/context";
import type { Dictionary } from "../i18n/zh";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import Icon from "./Icon";
import { PATHS } from "./iconPaths";

/**
 * 图文交替分屏（官网常用的 feature rows）。
 * 右侧每条配一个用代码画的 mini 界面片段，素材取自主应用真实 UI；
 * 模型下拉片段可点击展开 / 收起，和产品里一样。
 */

/**
 * 统一的「窗口片段」外框：带面板圆点与内描边，hover 抬升。
 * clip=false 用于内部有浮层（下拉）的片段——否则会被 overflow-hidden 裁掉。
 */
function Frame({
  children,
  clip = true,
}: {
  children: React.ReactNode;
  clip?: boolean;
}) {
  return (
    <div className={`card-elev ${clip ? "overflow-hidden" : ""}`}>
      <div className="flex items-center gap-1.5 border-b border-line/70 px-4 py-2.5">
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="h-2 w-2 rounded-full bg-line" />
      </div>
      <div className="p-5">{children}</div>
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

/** 1 · 工作区操作：可折叠的编辑工具行（复刻 ActionRow 的 Edit 形态） */
function MockEdit({ t }: { t: Dictionary }) {
  return (
    <Frame>
      <div className="font-mono text-[13px] leading-relaxed">
        <div className="flex items-center gap-2 text-subtle">
          <Icon d={PATHS.chevronRight} size={13} className="rotate-90" />
          <span className="break-all">Edit src/lib/search.rs</span>
        </div>
        <pre className="mt-1.5 overflow-x-auto rounded-tag border border-line bg-surface-sunken px-3 py-2 text-[12px] leading-relaxed">
          <span className="block text-danger">-  let hit = find(q);</span>
          <span className="block text-success">
            +  let hit = find(q).map(Span::from);
          </span>
        </pre>
        <div className="mt-3 flex items-center gap-2 border-t border-line pt-3 text-xs text-subtle">
          <Icon d={PATHS.check} size={13} className="text-success" />
          {t.features.editResult}
        </div>
      </div>
    </Frame>
  );
}

/** 2 · Rust：终端卡片 */
function MockRust({ t }: { t: Dictionary }) {
  const lines: Array<{ text: string; tone: "cmd" | "ok" | "plain" }> = [
    { text: "$ cargo test", tone: "cmd" },
    { text: "test result: ok. 537 passed; 0 failed", tone: "plain" },
    { text: "$ pnpm test", tone: "cmd" },
    { text: "739 tests passed", tone: "plain" },
    { text: t.features.testNote, tone: "ok" },
  ];
  return (
    <Frame>
      <pre className="overflow-x-auto font-mono text-[13px] leading-loose text-subtle">
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

/**
 * 3 · 多模型：模型下拉片段（可交互）。
 * 下拉以浮层形式绝对定位展开——原先它在正常文档流里，展开会把卡片乃至整个
 * 区块的边界撑长；浮层化后卡片尺寸恒定，超出部分内部滚动。
 * 点击外部 / Esc 收起，与主应用 ModelSelect 行为一致。
 */
function MockModels({ t }: { t: Dictionary }) {
  const ui = t.screenshot.ui;
  const [open, setOpen] = useState(false);
  const [model, setModel] = useState(ui.models[0].list[0]);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="flex min-h-[260px] items-center">
      <Frame clip={false}>
        <div ref={boxRef} className="relative">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={ui.openModel}
            className="flex w-full items-center justify-between rounded-tag border border-line px-3 py-2 text-sm text-foreground transition-colors hover:border-subtle"
          >
            <span className="truncate">{model}</span>
            <Icon
              d={PATHS.chevronUp}
              size={13}
              className={`shrink-0 text-subtle transition-transform ${
                open ? "" : "rotate-180"
              }`}
            />
          </button>
          {open && (
            <div
              role="listbox"
              aria-label={ui.modelAria}
              className="absolute left-0 right-0 top-full z-20 mt-1.5 max-h-56 overflow-y-auto rounded-tag border border-line bg-surface p-1.5 shadow-lg"
            >
              {ui.models.map((g, gi) => (
                <div
                  key={g.provider}
                  className={gi > 0 ? "border-t border-line pt-1" : ""}
                >
                  <p className="px-2 pb-1 pt-1 text-[11px] text-subtle">
                    {g.provider}
                  </p>
                  {g.list.map((name) => (
                    <button
                      key={name}
                      type="button"
                      role="option"
                      aria-selected={name === model}
                      onClick={() => {
                        setModel(name);
                        setOpen(false);
                      }}
                      className={`flex w-full items-center justify-between gap-2 rounded-tag px-2 py-1.5 text-left text-sm transition-colors ${
                        name === model
                          ? "bg-bubble font-medium text-foreground"
                          : "text-foreground hover:bg-bubble"
                      }`}
                    >
                      <span className="truncate pl-1.5">{name}</span>
                      {name === model && (
                        <Icon
                          d={PATHS.check}
                          size={13}
                          className="shrink-0 text-brand"
                        />
                      )}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-subtle">
          <Icon d={PATHS.chevronUp} size={12} />
          {t.features.mockNote}
        </div>
      </Frame>
    </div>
  );
}

const MOCKS: Array<(t: Dictionary) => React.ReactNode> = [
  () => <MockLocal />,
  (t) => <MockEdit t={t} />,
  (t) => <MockRust t={t} />,
  (t) => <MockModels t={t} />,
  () => <MockSidebar />,
  () => <MockMcp />,
];

/** 4 · 侧边栏：左侧导航 + 右侧文件 / 网页面板（实时联动） */
function MockSidebar() {
  const nav = [
    { label: "文件", active: true },
    { label: "网页", active: false },
    { label: "Skills", active: false },
  ];
  return (
    <Frame>
      <div className="flex gap-3">
        <div className="flex w-1/3 flex-col gap-1.5">
          {nav.map((n) => (
            <div
              key={n.label}
              className={`flex items-center gap-1.5 rounded-tag px-2 py-1.5 text-xs ${
                n.active
                  ? "bg-bubble font-medium text-foreground"
                  : "text-subtle"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  n.active ? "bg-brand" : "bg-line"
                }`}
              />
              {n.label}
            </div>
          ))}
        </div>
        <div className="flex-1 rounded-tag border border-line bg-surface-sunken p-2.5">
          <div className="space-y-1 font-mono text-[11px] text-subtle">
            <div>src/lib/search.rs</div>
            <div>src/components/SearchBar.tsx</div>
            <div>README.md</div>
          </div>
        </div>
      </div>
    </Frame>
  );
}

/** 6 · MCP：服务器状态 + 工具清单 + 审批徽标 */
function MockMcp() {
  const servers = [
    { name: "filesystem", running: true, tools: 4 },
    { name: "github", running: false, tools: 2 },
  ];
  return (
    <Frame>
      <div className="space-y-2">
        {servers.map((s) => (
          <div
            key={s.name}
            className="flex items-center gap-2 rounded-tag border border-line bg-surface px-2.5 py-2"
          >
            <span
              className={`h-2 w-2 shrink-0 rounded-full ${
                s.running ? "bg-success" : "bg-danger"
              }`}
            />
            <span className="min-w-0 flex-1 truncate font-mono text-[11px] text-foreground">
              {s.name}
            </span>
            <span className="shrink-0 text-[10px] text-subtle">
              {s.tools} tools
            </span>
          </div>
        ))}
        <div className="flex items-center gap-2 rounded-tag border border-warning/40 bg-warning/10 px-2.5 py-2">
          <span className="rounded-full border border-warning/40 px-1.5 py-0.5 text-[9px] text-warning">
            需审批
          </span>
          <span className="min-w-0 flex-1 truncate font-mono text-[11px] text-foreground">
            mcp_filesystem_read_file
          </span>
        </div>
      </div>
    </Frame>
  );
}

export default function FeatureGrid() {
  const { t } = useI18n();
  return (
    <Section id="features" tone="sunken">
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
              className="grid items-center gap-8 py-12 first:pt-0 last:pb-0 sm:gap-12 lg:grid-cols-2 lg:gap-16 lg:py-14"
            >
              <div className={flip ? "lg:order-2" : ""}>
                <span className="num-badge mb-3 inline-block">
                  {String(i + 1).padStart(2, "0")}
                </span>
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
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                        <Icon d={PATHS.check} size={13} />
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
