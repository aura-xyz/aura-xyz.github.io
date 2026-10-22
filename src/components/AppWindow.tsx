import { useI18n } from "../i18n/context";

/**
 * 用代码 1:1 复刻主应用主界面（替代真实截图素材）。
 *
 * 结构与样式对齐 app/src/components/ 下的 TitleBar / Sidebar /
 * MessageList / UserBubble / ActionRow / InputArea / ModeTabs 落地实现，
 * 语义令牌取 website index.css（与主应用同步），亮暗主题自动跟随。
 * 纯展示组件：不注册交互，整体以 role="img" + aria-label 对外描述。
 */

/** lucide 风格手写路径（24 viewBox，1.75 线宽），避免为几个图标引依赖 */
const PATHS = {
  minus: "M5 12h14",
  x: ["M18 6L6 18", "M6 6l12 12"],
  chevronRight: "M9 18l6-6-6-6",
  chevronUp: "M18 15l-6-6-6 6",
  folder:
    "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
  arrowUp: ["M12 19V5", "M5 12l7-7 7 7"],
  plusSquare: [
    "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
    "M12 7v6",
    "M9 10h6",
  ],
  sparkles: [
    "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
  ],
  plug: [
    "M12 22v-5",
    "M9 8V2",
    "M15 8V2",
    "M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8z",
  ],
  panelClose: [
    "M15 4v16",
    "m14 9-3 3 3 3",
    "M6 3h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z",
  ],
  settings: [
    "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.74v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
    "M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0",
  ],
} as const;

function Icon({
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

/** 输入区下方的胶囊 tablist（复刻 ModeTabs），静态展示 */
const TABS = ["Chat", "Plan", "Build"] as const;

function StatusBar({ active }: { active: (typeof TABS)[number] }) {
  return (
    <div className="inline-flex items-center gap-0.5 rounded-full border border-line bg-surface p-0.5">
      {TABS.map((tab) => (
        <span
          key={tab}
          className={`rounded-full px-2.5 py-1 text-xs ${
            tab === active ? "bg-brand text-white" : "text-subtle"
          }`}
        >
          {tab}
        </span>
      ))}
    </div>
  );
}

/** 输入区下方的次级文字按钮（复刻 WorkspaceSelect / ModelSelect） */
function SubButton({
  icon,
  children,
}: {
  icon?: string | readonly string[];
  children: React.ReactNode;
}) {
  return (
    <span className="flex items-center gap-1.5 py-1 text-xs text-subtle">
      {icon && <Icon d={icon} size={13} />}
      <span className="max-w-[180px] truncate">{children}</span>
      {icon ? null : <Icon d={PATHS.chevronUp} size={12} />}
    </span>
  );
}

export default function AppWindow() {
  const { t } = useI18n();
  const ui = t.screenshot.ui;

  return (
    <div
      role="img"
      aria-label={t.screenshot.alt}
      className="overflow-hidden rounded-card border border-line text-left shadow-lg"
    >
      <div className="flex h-[500px] bg-surface">
        {/* ---- 侧栏（复刻 Sidebar 展开态） ---- */}
        <aside className="hidden w-56 shrink-0 flex-col border-r border-line sm:flex">
          <header className="flex h-[49px] shrink-0 items-center gap-2 px-3">
            <img src="/logo.png" alt="" className="h-5 w-5" />
            <span className="text-base font-semibold tracking-[-0.02em] text-foreground">
              Aura
            </span>
            <span className="ml-auto text-subtle">
              <Icon d={PATHS.panelClose} size={14} />
            </span>
          </header>
          <nav className="shrink-0 px-3">
            {[
              { label: ui.newChat, icon: PATHS.plusSquare, active: false },
              { label: ui.skills, icon: PATHS.sparkles, active: false },
              { label: ui.mcp, icon: PATHS.plug, active: false },
            ].map((item) => (
              <div
                key={item.label}
                className="mt-0.5 flex items-center gap-2.5 rounded-tag px-2 py-2 text-sm text-subtle first:mt-0"
              >
                <Icon d={item.icon} size={15} />
                <span className="truncate">{item.label}</span>
              </div>
            ))}
          </nav>
          <div className="min-h-0 flex-1 space-y-0.5 overflow-hidden px-3 pt-1">
            {[
              { ws: ui.wsActive, open: true },
              { ws: ui.wsOther, open: false },
            ].map((g) => (
              <section key={g.ws}>
                <div
                  className={`flex items-center gap-2 rounded-tag py-1.5 pl-1 pr-2 text-sm ${
                    g.open ? "bg-bubble" : ""
                  }`}
                >
                  <span
                    className={`text-subtle ${
                      g.open ? "rotate-90" : ""
                    } transition-transform`}
                  >
                    <Icon d={PATHS.chevronRight} size={13} />
                  </span>
                  <span
                    className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                      g.open ? "bg-brand" : "bg-line"
                    }`}
                  />
                  <span
                    className={`truncate ${
                      g.open ? "font-medium text-foreground" : "text-subtle"
                    }`}
                  >
                    {g.ws}
                  </span>
                </div>
                {g.open && (
                  <ul className="ml-5 space-y-0.5">
                    {[ui.s1, ui.s2].map((s, i) => (
                      <li
                        key={s}
                        className={`truncate rounded-tag px-2 py-1.5 text-sm ${
                          i === 0
                            ? "bg-bubble text-foreground"
                            : "text-foreground"
                        }`}
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                )}
                {!g.open && (
                  <div className="ml-5 truncate rounded-tag px-2 py-1.5 text-sm text-foreground">
                    {ui.s3}
                  </div>
                )}
              </section>
            ))}
          </div>
          <footer className="shrink-0 px-3 pb-3">
            <div className="flex items-center gap-2 rounded-tag px-2 py-1.5 text-sm text-subtle">
              <Icon d={PATHS.settings} size={14} />
              <span className="truncate">{ui.settings}</span>
            </div>
          </footer>
        </aside>

        {/* ---- 主列：消息流 + 输入区（复刻 MessageList/InputArea） ---- */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="mx-auto w-full max-w-2xl flex-1 overflow-hidden px-6 pt-6">
            <div className="flex flex-col gap-6">
              {/* 用户气泡（复刻 UserBubble） */}
              <div className="flex justify-end">
                <div className="max-w-[75%] whitespace-pre-wrap break-words rounded-card bg-bubble px-4 py-3 text-[15px] leading-relaxed text-foreground">
                  {ui.user}
                </div>
              </div>
              {/* assistant 动作行（复刻 ActionRow：一条展开、一条收起） */}
              <div className="flex flex-col gap-3">
                {[
                  { text: ui.action1, detail: ui.detail1, open: true },
                  { text: ui.action2, detail: ui.detail2, open: false },
                ].map((row) => (
                  <div
                    key={row.text}
                    className="font-mono text-[13px] leading-relaxed"
                  >
                    <div className="flex items-start gap-2">
                      <span
                        className={`mt-1 text-subtle ${
                          row.open ? "rotate-90" : ""
                        } transition-transform`}
                      >
                        <Icon d={PATHS.chevronRight} size={13} />
                      </span>
                      <span className="break-all text-subtle">{row.text}</span>
                    </div>
                    {row.open && (
                      <pre className="ml-5 mt-1.5 whitespace-pre-wrap break-words rounded-tag border border-line bg-surface-sunken px-2.5 py-2 text-[12px] leading-relaxed text-subtle">
                        {row.detail}
                      </pre>
                    )}
                  </div>
                ))}
                {/* 结论块（复刻 Markdown 文本块） */}
                <div className="text-[15px] leading-relaxed text-foreground">
                  <p className="font-semibold">{ui.planTitle}</p>
                  <ul className="mt-1.5 list-disc space-y-1 pl-5 marker:text-subtle">
                    {[ui.plan1, ui.plan2, ui.plan3].map((li) => (
                      <li key={li}>{li}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* 输入区（复刻 InputArea，focus 态） */}
          <div className="px-6 pb-5 pt-3">
            <div className="mx-auto max-w-2xl">
              <div className="flex items-center gap-2 rounded-card border border-brand bg-surface px-4 py-3 shadow-sm">
                <span className="flex-1 text-[15px] text-subtle">
                  {ui.placeholder}
                </span>
                <span className="rounded-full bg-brand p-2 text-white">
                  <Icon d={PATHS.arrowUp} size={14} />
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <StatusBar active="Plan" />
                  <SubButton icon={PATHS.folder}>{ui.wsActive}</SubButton>
                  <span className="h-3 w-px bg-line" />
                  <SubButton>{ui.model}</SubButton>
                </div>
                <p className="text-xs text-subtle">{ui.enterHint}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
