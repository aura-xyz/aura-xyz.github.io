import { useEffect, useRef, useState } from "react";
import { useI18n } from "../i18n/context";
import Icon from "./Icon";
import { PATHS } from "./iconPaths";

/**
 * 用代码 1:1 复刻主应用主界面，并且可真实操作：
 * 侧栏折叠、工作区展开、会话切换、模式切换、模型下拉、输入与发送。
 *
 * 结构与交互对齐 app/src/components/ 的落地实现（TitleBar / Sidebar /
 * MessageList / ActionRow / InputArea / ModeTabs / ModelSelect）。
 * 主题与语言全部跟随官网自身状态。
 */

type Mode = "chat" | "plan" | "build";
const MODES: Mode[] = ["chat", "plan", "build"];
const MODE_LABELS = { chat: "Chat", plan: "Plan", build: "Build" } as const;

export default function AppWindow() {
  const { t } = useI18n();
  const ui = t.screenshot.ui;

  const [collapsed, setCollapsed] = useState(false);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    [ui.wsActive]: true,
  });
  const [activeSession, setActiveSession] = useState<"s1" | "s2" | "s3">("s1");
  const [mode, setMode] = useState<Mode>("plan");
  const [model, setModel] = useState(ui.models[0].list[0]);
  const [modelOpen, setModelOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [sent, setSent] = useState<Array<{ user: string; reply: string }>>([]);
  const [openDetails, setOpenDetails] = useState<Record<number, boolean>>({
    0: true,
  });

  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const modelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const didMount = useRef(false);

  useEffect(() => {
    if (!modelOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!modelRef.current?.contains(e.target as Node)) setModelOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModelOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [modelOpen]);

  useEffect(() => {
    // 首帧不要滚动：只有用户主动发送新消息后才跟到最新一条
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [sent]);

  function send() {
    const text = draft.trim();
    if (!text) return;
    setSent((prev) => [...prev, { user: text, reply: ui.demoHint }]);
    setDraft("");
  }

  function onTablistKeyDown(e: React.KeyboardEvent) {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const idx = (MODES.indexOf(mode) + dir + MODES.length) % MODES.length;
    setMode(MODES[idx]);
    tabRefs.current[idx]?.focus();
  }

  const toggleDetail = (i: number) =>
    setOpenDetails((prev) => ({ ...prev, [i]: !prev[i] }));

  const actionRows = [
    { text: ui.action1, detail: ui.detail1 },
    { text: ui.action2, detail: ui.detail2 },
  ];

  return (
    <div className="overflow-hidden rounded-card border border-line text-left shadow-xl transition-shadow hover:shadow-2xl">
      {/* ---- 标题栏（复刻主应用 TitleBar；版本号与主应用发布同步） ---- */}
      <div className="flex h-9 shrink-0 select-none items-center justify-between border-b border-line bg-surface pl-4">
        <div className="flex items-baseline gap-2">
          <span className="text-[13px] font-semibold tracking-[-0.02em] text-foreground">
            Aura
          </span>
          <span className="font-mono text-[11px] text-subtle">v0.5.2</span>
        </div>
        <div aria-hidden="true" className="flex h-full">
          <span className="flex h-full w-11 items-center justify-center text-subtle transition-colors hover:bg-bubble hover:text-foreground">
            <Icon d={PATHS.minus} size={14} />
          </span>
          <span className="flex h-full w-11 items-center justify-center text-subtle transition-colors hover:bg-bubble hover:text-foreground">
            <Icon d="M6 6h12v12H6z" size={11} />
          </span>
          <span className="flex h-full w-11 items-center justify-center text-subtle transition-colors hover:bg-danger hover:text-white">
            <Icon d={PATHS.x} size={14} />
          </span>
        </div>
      </div>

      <div className="flex h-[520px] bg-surface">
        {/* ---- 侧栏（复刻 Sidebar，可折叠） ---- */}
        <aside
          className={`hidden shrink-0 flex-col overflow-hidden border-r border-line transition-[width] duration-200 sm:flex ${
            collapsed ? "w-14" : "w-56"
          }`}
        >
          <header className="flex h-[49px] shrink-0 items-center gap-2 px-3">
            <button
              type="button"
              onClick={() => setCollapsed(false)}
              disabled={!collapsed}
              aria-label={ui.expandSidebar}
              title={ui.expandSidebar}
              className="shrink-0 rounded-tag p-1.5 text-subtle transition-colors enabled:hover:bg-bubble enabled:hover:text-foreground disabled:pointer-events-none"
            >
              <img src="/logo.png" alt="" className="h-5 w-5" />
            </button>
            {!collapsed && (
              <>
                <span className="whitespace-nowrap text-base font-semibold tracking-[-0.02em] text-foreground">
                  Aura
                </span>
                <button
                  type="button"
                  onClick={() => setCollapsed(true)}
                  aria-label={ui.collapseSidebar}
                  title={ui.collapseSidebar}
                  className="ml-auto rounded-tag p-1 text-subtle transition-colors hover:bg-bubble hover:text-foreground"
                >
                  <Icon d={PATHS.panelClose} size={14} />
                </button>
              </>
            )}
          </header>

          <nav className="shrink-0 px-3">
            {[
              { label: ui.newChat, icon: PATHS.plusSquare },
              { label: ui.skills, icon: PATHS.sparkles },
              { label: ui.mcp, icon: PATHS.plug },
            ].map((item) => (
              <button
                key={item.label}
                type="button"
                title={collapsed ? item.label : undefined}
                className={`mt-0.5 flex w-full items-center rounded-tag text-left text-sm text-subtle transition-colors hover:bg-bubble hover:text-foreground first:mt-0 ${
                  collapsed ? "justify-center px-0 py-2" : "gap-2.5 px-2 py-2"
                }`}
              >
                <Icon d={item.icon} size={15} />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </button>
            ))}
          </nav>

          <div className="scrollbar-hidden min-h-0 flex-1 overflow-y-auto px-3 pt-1">
            {collapsed ? (
              <div className="space-y-0.5">
                {[ui.wsActive, ui.wsOther].map((ws) => (
                  <button
                    key={ws}
                    type="button"
                    onClick={() => setOpenGroups({ ...openGroups, [ws]: true })}
                    title={ws}
                    aria-label={ws}
                    className="flex w-full items-center justify-center rounded-tag py-2 transition-colors hover:bg-bubble"
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        openGroups[ws] ? "bg-brand" : "bg-line"
                      }`}
                    />
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-0.5">
                {[ui.wsActive, ui.wsOther].map((ws) => {
                  const open = !!openGroups[ws];
                  const sessions =
                    ws === ui.wsActive
                      ? (["s1", "s2"] as const)
                      : (["s3"] as const);
                  return (
                    <section key={ws}>
                      <button
                        type="button"
                        onClick={() =>
                          setOpenGroups((prev) => ({ ...prev, [ws]: !open }))
                        }
                        aria-expanded={open}
                        title={ws}
                        className={`flex w-full min-w-0 items-center gap-2 rounded-tag py-1.5 pl-1 pr-2 text-left text-sm transition-colors ${
                          ws === ui.wsActive ? "bg-bubble" : "hover:bg-bubble"
                        }`}
                      >
                        <Icon
                          d={PATHS.chevronRight}
                          size={13}
                          className={`text-subtle transition-transform ${
                            open ? "rotate-90" : ""
                          }`}
                        />
                        <span
                          className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                            ws === ui.wsActive ? "bg-brand" : "bg-line"
                          }`}
                        />
                        <span
                          className={`truncate ${
                            ws === ui.wsActive
                              ? "font-medium text-foreground"
                              : "text-subtle"
                          }`}
                        >
                          {ws}
                        </span>
                      </button>
                      {open && (
                        <ul className="ml-5 mt-0.5 space-y-0.5">
                          {sessions.map((s) => (
                            <li key={s}>
                              <button
                                type="button"
                                onClick={() => setActiveSession(s)}
                                className={`w-full truncate rounded-tag px-2 py-1.5 text-left text-sm transition-colors hover:bg-bubble ${
                                  activeSession === s
                                    ? "bg-bubble text-foreground"
                                    : "text-foreground"
                                }`}
                              >
                                {ui[s]}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </section>
                  );
                })}
              </div>
            )}
          </div>

          <footer className="shrink-0 px-3 pb-3">
            <button
              type="button"
              title={collapsed ? ui.settings : undefined}
              className={`flex w-full items-center rounded-tag text-sm text-subtle transition-colors hover:bg-bubble hover:text-foreground ${
                collapsed ? "justify-center px-0 py-1.5" : "gap-2 px-2 py-1.5"
              }`}
            >
              <Icon d={PATHS.settings} size={14} />
              {!collapsed && <span className="truncate">{ui.settings}</span>}
            </button>
          </footer>
        </aside>

        {/* ---- 主列：消息流 + 输入区 ---- */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div
            ref={scrollRef}
            className="scrollbar-hidden mx-auto w-full max-w-2xl flex-1 overflow-y-auto px-6 pb-2 pt-6"
          >
            <div className="flex flex-col gap-6">
              <div className="flex justify-end">
                <div className="max-w-[75%] whitespace-pre-wrap break-words rounded-card bg-bubble px-4 py-3 text-[15px] leading-relaxed text-foreground">
                  {ui.user}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {actionRows.map((row, i) => {
                  const open = !!openDetails[i];
                  return (
                    <div
                      key={row.text}
                      className="font-mono text-[13px] leading-relaxed"
                    >
                      <button
                        type="button"
                        onClick={() => toggleDetail(i)}
                        aria-expanded={open}
                        className="flex w-full items-start gap-2 text-left"
                      >
                        <Icon
                          d={PATHS.chevronRight}
                          size={13}
                          className={`mt-1 text-subtle transition-transform ${
                            open ? "rotate-90" : ""
                          }`}
                        />
                        <span className="break-all text-subtle">
                          {row.text}
                        </span>
                      </button>
                      {open && (
                        <pre className="ml-5 mt-1.5 whitespace-pre-wrap break-words rounded-tag border border-line bg-surface-sunken px-2.5 py-2 text-[12px] leading-relaxed text-subtle">
                          {row.detail}
                        </pre>
                      )}
                    </div>
                  );
                })}

                <div className="text-[15px] leading-relaxed text-foreground">
                  <p className="font-semibold">{ui.planTitle}</p>
                  <ul className="mt-1.5 list-disc space-y-1 pl-5 marker:text-subtle">
                    {[ui.plan1, ui.plan2, ui.plan3].map((li) => (
                      <li key={li}>{li}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {sent.map((m, i) => (
                <div key={i} className="flex flex-col gap-3">
                  <div className="flex justify-end">
                    <div className="max-w-[75%] whitespace-pre-wrap break-words rounded-card bg-bubble px-4 py-3 text-[15px] leading-relaxed text-foreground">
                      {m.user}
                    </div>
                  </div>
                  <p className="text-[15px] leading-relaxed text-subtle">
                    {m.reply}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 输入区（复刻 InputArea） */}
          <div className="px-6 pb-5 pt-3">
            <div className="mx-auto max-w-2xl">
              <div className="flex items-center gap-2 rounded-card border border-line bg-surface px-4 py-3 shadow-xs transition-colors focus-within:border-brand focus-within:shadow-sm">
                <textarea
                  rows={1}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.nativeEvent.isComposing) return;
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send();
                    }
                  }}
                  placeholder={ui.placeholders[mode]}
                  aria-label={ui.placeholders[mode]}
                  className="max-h-24 min-h-6 flex-1 resize-none bg-transparent py-0 text-[15px] leading-6 text-foreground outline-none placeholder:text-subtle"
                />
                <button
                  type="button"
                  onClick={send}
                  disabled={!draft.trim()}
                  aria-label={ui.send}
                  className="rounded-full bg-brand p-2 text-white transition-colors enabled:hover:bg-brand-strong disabled:opacity-30"
                >
                  <Icon d={PATHS.arrowUp} size={14} />
                </button>
              </div>

              <div className="mt-2 flex items-center justify-between gap-3">
                <div className="flex min-w-0 flex-wrap items-center gap-2">
                  <div
                    role="tablist"
                    aria-label={ui.modeAria}
                    onKeyDown={onTablistKeyDown}
                    className="inline-flex items-center gap-0.5 rounded-full border border-line bg-surface p-0.5"
                  >
                    {MODES.map((m, i) => (
                      <button
                        key={m}
                        ref={(el) => {
                          tabRefs.current[i] = el;
                        }}
                        type="button"
                        role="tab"
                        aria-selected={m === mode}
                        tabIndex={m === mode ? 0 : -1}
                        onClick={() => setMode(m)}
                        className={`rounded-full px-2.5 py-1 text-xs transition-colors ${
                          m === mode
                            ? "bg-brand text-white"
                            : "text-subtle hover:bg-bubble hover:text-foreground"
                        }`}
                      >
                        {MODE_LABELS[m]}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    title={ui.wsActive}
                    className="flex items-center gap-1.5 py-1 text-xs text-subtle transition-colors hover:text-foreground"
                  >
                    <Icon d={PATHS.folder} size={13} />
                    <span className="max-w-[140px] truncate">
                      {ui.wsActive}
                    </span>
                  </button>

                  <span className="h-3 w-px bg-line" />

                  <div ref={modelRef} className="relative">
                    <button
                      type="button"
                      onClick={() => setModelOpen((v) => !v)}
                      aria-label={ui.openModel}
                      aria-expanded={modelOpen}
                      className="flex items-center gap-1.5 py-1 text-xs text-subtle transition-colors hover:text-foreground"
                    >
                      <span className="max-w-[140px] truncate">{model}</span>
                      <Icon
                        d={PATHS.chevronUp}
                        size={12}
                        className={`transition-transform ${
                          modelOpen ? "" : "rotate-180"
                        }`}
                      />
                    </button>

                    {modelOpen && (
                      <div
                        role="listbox"
                        aria-label={ui.modelAria}
                        className="absolute bottom-full right-0 z-10 mb-1.5 w-52 rounded-card border border-line bg-surface p-1.5 shadow-lg"
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
                                  setModelOpen(false);
                                }}
                                className={`flex w-full items-center justify-between rounded-tag px-2 py-1.5 text-left text-sm ${
                                  name === model
                                    ? "bg-bubble font-medium text-foreground"
                                    : "text-foreground hover:bg-bubble"
                                }`}
                              >
                                <span className="pl-1.5">{name}</span>
                                {name === model && (
                                  <Icon
                                    d={PATHS.check}
                                    size={13}
                                    className="text-brand"
                                  />
                                )}
                              </button>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <p className="hidden shrink-0 text-xs text-subtle sm:block">
                  {ui.enterHint}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
