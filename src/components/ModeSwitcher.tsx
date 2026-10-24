import { useRef, useState } from "react";
import { useI18n } from "../i18n/context";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import Icon from "./Icon";
import { PATHS } from "./iconPaths";

type Mode = "chat" | "plan" | "build";
const MODES: Mode[] = ["chat", "plan", "build"];

export default function ModeSwitcher() {
  const { lang, t } = useI18n();
  const [mode, setMode] = useState<Mode>("chat");
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
    <Section>
      <SectionHeader
        eyebrow={t.modes.eyebrow}
        heading={t.modes.heading}
        desc={t.modes.desc}
      />
      {/* 胶囊 tablist，样式复刻主应用 ModeTabs */}
      <div
        role="tablist"
        aria-label={lang === "zh" ? "会话模式" : "Session modes"}
        onKeyDown={onTablistKeyDown}
        className="mx-auto mb-10 flex w-fit items-center gap-0.5 rounded-full border border-line bg-surface p-0.5"
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
                "rounded-full px-2.5 py-1 text-xs transition-colors sm:px-4 sm:py-1.5 sm:text-sm",
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

      <div
        key={mode}
        className="mode-in mode-card mx-auto max-w-2xl p-8 text-center"
      >
        <h3 className="mb-1 text-lg font-semibold text-foreground">
          {current.name}
          {lang === "zh" && (
            <span className="ml-2 font-normal text-subtle">{current.label}</span>
          )}
        </h3>
        <p className="mx-auto max-w-md text-[15px] leading-relaxed text-subtle">
          {current.desc}
        </p>
        <div className="mt-8 flex flex-wrap items-start justify-center gap-x-14 gap-y-4">
          {matrix.map(({ key, ok }) => (
            <div
              key={key}
              className="flex flex-col items-center gap-2"
              title={
                ok
                  ? lang === "zh"
                    ? "允许"
                    : "allowed"
                  : lang === "zh"
                    ? "不允许"
                    : "not allowed"
              }
            >
              {/* 权限以圆形徽章表达：允许=品牌绿填充，拒绝=中性描边 */}
              <span
                aria-hidden="true"
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors duration-300 ${
                  ok
                    ? "bg-success/12 text-success"
                    : "bg-surface-sunken text-subtle opacity-60"
                }`}
              >
                {ok ? <Icon d={PATHS.check} size={15} /> : "—"}
              </span>
              <span className="text-xs text-subtle">
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
    </Section>
  );
}
