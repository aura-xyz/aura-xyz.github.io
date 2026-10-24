import { Fragment, useRef, useState } from "react";
import { useI18n } from "../i18n/context";
import { demoBlocks, demoUserMessage, type DemoBlock } from "../demoData";
import Icon from "./Icon";
import { PATHS } from "./iconPaths";
import Section from "./Section";
import SectionHeader from "./SectionHeader";

type Mode = "chat" | "plan" | "build";
const MODES: Mode[] = ["chat", "plan", "build"];

/**
 * 交互演示区：把原先连续的「三种模式」与「工具演示」两个区块合为一个。
 * 左栏选模式（tab 驱动权限矩阵），右栏展示该模式下的对话与工具流，
 * 两栏同属一个叙事单元，消除重复模板造成的臃肿。
 */

/** demo 正文只支持单层反引号内联代码，够用且免引库 */
function InlineText({ text }: { text: string }) {
  const parts = text.split("`");
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <code key={i} className="code-inline">
            {part}
          </code>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

/** 动作行样式复刻主应用 ActionRow：等宽小字、chevron、detail 折叠块 */
function DemoAction({ block }: { block: DemoBlock }) {
  const { lang, t } = useI18n();
  const detail = block.detail;
  const [open, setOpen] = useState(false);

  return (
    <div className="font-mono text-[13px] leading-relaxed">
      <div className="flex items-start gap-2">
        {detail ? (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? t.demo.collapse : t.demo.expand}
            className="mt-1 shrink-0 text-subtle transition-transform hover:text-foreground"
          >
            <Icon
              d={PATHS.chevronRight}
              size={13}
              className={open ? "rotate-90" : ""}
            />
          </button>
        ) : null}
        <span className="min-w-0 break-all text-subtle">
          {block.text[lang]}
        </span>
      </div>
      {detail && open && (
        <pre className="ml-5 mt-1.5 max-h-64 overflow-auto whitespace-pre-wrap break-words rounded-tag border border-line bg-surface-sunken px-2.5 py-2 text-[12px] leading-relaxed text-subtle">
          {detail[lang]}
        </pre>
      )}
    </div>
  );
}

export default function LiveDemo() {
  const { lang, t } = useI18n();
  const [mode, setMode] = useState<Mode>("build");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const current = t.modes.list[mode];

  const matrix: Array<{ key: keyof typeof t.modes.columns; ok: boolean }> = [
    { key: "read", ok: current.read },
    { key: "write", ok: current.write },
    { key: "exec", ok: current.exec },
  ];

  /** tablist 键盘导航：左右方向键循环切换并转移焦点 */
  const onTablistKeyDown = (e: React.KeyboardEvent) => {
    const dir =
      e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = MODES.indexOf(mode) + dir;
    const idx = (next + MODES.length) % MODES.length;
    setMode(MODES[idx]);
    tabRefs.current[idx]?.focus();
  };

  return (
    <Section id="demo">
      {/* 左对齐眉题：与上下居中区块形成节奏差 */}
      <SectionHeader
        eyebrow={t.modes.eyebrow}
        heading={t.modes.heading}
        desc={t.modes.desc}
        align="left"
      />

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-14">
        {/* 左：模式选择与权限矩阵 */}
        <div>
          <div
            role="tablist"
            aria-label={lang === "zh" ? "会话模式" : "Session modes"}
            onKeyDown={onTablistKeyDown}
            className="flex w-fit items-center gap-0.5 rounded-full border border-line bg-surface p-0.5"
          >
            {MODES.map((m, i) => {
              const active = m === mode;
              const item = t.modes.list[m];
              return (
                <button
                  key={m}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  tabIndex={active ? 0 : -1}
                  title={item.label}
                  onClick={() => setMode(m)}
                  className={[
                    "rounded-full px-3 py-1 text-xs transition-colors sm:px-4 sm:py-1.5 sm:text-sm",
                    active
                      ? "bg-brand text-white"
                      : "text-subtle hover:bg-bubble hover:text-foreground",
                  ].join(" ")}
                >
                  {item.name}
                </button>
              );
            })}
          </div>

          <div key={mode} className="mode-in mt-8">
            <h3 className="text-lg font-semibold text-foreground">
              {current.name}
              {lang === "zh" && (
                <span className="ml-2 font-normal text-subtle">
                  {current.label}
                </span>
              )}
            </h3>
            <p className="mt-2 max-w-md text-[15px] leading-relaxed text-subtle">
              {current.desc}
            </p>

            {/* 权限矩阵：允许=品牌绿填充，拒绝=中性描边 */}
            <div className="mt-8 flex flex-wrap items-start gap-x-10 gap-y-5">
              {matrix.map(({ key, ok }) => (
                <div key={key} className="flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors duration-300 ${
                      ok
                        ? "bg-success/12 text-success"
                        : "bg-surface-sunken text-subtle opacity-60"
                    }`}
                  >
                    {ok ? <Icon d={PATHS.check} size={15} /> : "—"}
                  </span>
                  <span className="text-sm text-foreground">
                    {t.modes.columns[key]}
                  </span>
                  <span className="sr-only">
                    {ok
                      ? lang === "zh"
                        ? "允许"
                        : "allowed"
                      : lang === "zh"
                        ? "不允许"
                        : "not allowed"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 右：该模式下的对话与工具流 */}
        <div className="card-elev overflow-hidden">
          <div className="flex items-center gap-1.5 border-b border-line/70 px-4 py-2.5">
            <span className="h-2 w-2 rounded-full bg-line" />
            <span className="h-2 w-2 rounded-full bg-line" />
            <span className="h-2 w-2 rounded-full bg-line" />
            <span className="ml-2 rounded-full bg-brand/10 px-2 py-0.5 text-[11px] font-medium text-brand">
              {current.name}
            </span>
          </div>
          <div className="p-5">
            <p className="mb-5 text-xs leading-relaxed text-subtle">
              {t.demo.desc}
            </p>

            {/* 用户气泡，样式复刻主应用 UserBubble */}
            <div className="flex justify-end">
              <div className="max-w-[85%] whitespace-pre-wrap break-words rounded-card bg-bubble px-4 py-3 text-[14px] leading-relaxed">
                {demoUserMessage[lang]}
              </div>
            </div>

            {/* 透明动作流：竖向时间线，体现"逐步、可审计" */}
            <div className="timeline mt-6 flex flex-col gap-5">
              {demoBlocks.map((block, i) =>
                block.kind === "action" ? (
                  <div key={i} className="timeline-node pl-7">
                    <DemoAction block={block} />
                  </div>
                ) : (
                  <div key={i} className="timeline-node pl-7">
                    <p className="text-[14px] leading-relaxed">
                      <InlineText text={block.text[lang]} />
                      {i === demoBlocks.length - 1 && (
                        <span
                          className="aura-breathing-cursor ml-1"
                          aria-hidden="true"
                        />
                      )}
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
