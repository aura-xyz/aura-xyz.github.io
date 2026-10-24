import { useI18n } from "../i18n/context";
import Icon from "./Icon";
import { PATHS } from "./iconPaths";
import Section from "./Section";
import SectionHeader from "./SectionHeader";

/**
 * 技能系统展示区：左文案 + 右「Skills」面板 mock（内置技能列表 + 市场入口）。
 * 内容对齐主应用 v0.6.x 的 Skills 能力与市场（DEV.md §2.8.1）。
 */
export default function SkillsShowcase() {
  const { t } = useI18n();

  return (
    <Section id="skills">
      <SectionHeader
        eyebrow={t.skills.eyebrow}
        heading={t.skills.heading}
        desc={t.skills.desc}
      />
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* 左：能力要点 */}
        <ul className="space-y-3">
          {t.skills.bullets.map((b) => (
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

        {/* 右：Skills 面板 mock（复刻主应用 SkillsPage） */}
        <div className="card-elev overflow-hidden">
          <div className="flex items-center justify-between border-b border-line/70 px-4 py-3">
            <span className="text-sm font-medium text-foreground">
              {t.skills.panelTitle}
            </span>
            <div className="flex items-center gap-1 rounded-full border border-line bg-surface-sunken p-0.5 text-xs">
              <span className="rounded-full bg-brand px-2.5 py-0.5 font-medium text-white">
                {t.skills.builtin}
              </span>
              <span className="px-2.5 py-0.5 text-subtle">{t.skills.market}</span>
            </div>
          </div>
          <ul className="divide-y divide-line/70">
            {t.skills.items.map((it) => (
              <li
                key={it.name}
                className="flex items-center gap-3 px-4 py-3"
              >
                <span className="h-2 w-2 shrink-0 rounded-full bg-brand" />
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-sm text-foreground">{it.name}</p>
                  <p className="truncate text-xs text-subtle">{it.desc}</p>
                </div>
                <span className="rounded-full bg-success/12 px-2 py-0.5 text-[11px] font-medium text-success">
                  ✓
                </span>
              </li>
            ))}
            <li className="flex items-center gap-3 px-4 py-3">
              <span className="h-2 w-2 shrink-0 rounded-full bg-line" />
              <div className="min-w-0 flex-1">
                <p className="text-sm text-foreground">aura-skill-registry</p>
                <p className="truncate text-xs text-subtle">{t.skills.market}</p>
              </div>
              <span className="rounded-full border border-brand px-2.5 py-0.5 text-[11px] font-medium text-brand">
                {t.skills.install}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </Section>
  );
}
