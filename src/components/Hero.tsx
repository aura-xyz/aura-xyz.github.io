import { useI18n } from "../i18n/context";
import AppWindow from "./AppWindow";

const REPO_URL = "https://github.com/aura-xyz/aura";
const RELEASES_URL = `${REPO_URL}/releases/latest`;

export default function Hero() {
  const { t } = useI18n();
  return (
    <section className="relative overflow-hidden">
      {/* 氛围层：细网格 + 品牌色光晕，随主题令牌着色 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black_20%,transparent_75%)]" />
        <div className="hero-glow absolute inset-x-0 top-0 h-[520px]" />
      </div>

      <div className="mx-auto max-w-3xl px-6 pt-20 pb-12 text-center sm:pt-28">
        <img src="/logo.png" width={88} height={88} alt="Aura" className="mx-auto mb-7 rounded-2xl" />
        <h1 className="mb-3 text-5xl font-semibold tracking-[-0.03em] text-foreground sm:text-6xl">
          Aura
        </h1>
        {/* 产品 tagline，双语一致不翻译（与主应用空状态同源） */}
        <p className="mb-5 text-sm text-subtle sm:text-base">
          Minimal surface. Maximum logic.
        </p>
        <p className="mx-auto max-w-xl text-balance text-lg leading-relaxed text-subtle">
          {t.hero.subtitle}
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={RELEASES_URL}
            target="_blank"
            rel="noreferrer"
            title={t.hero.downloadHint}
            className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-2.5 font-medium text-white transition-colors hover:bg-brand-strong"
          >
            {t.hero.download}
          </a>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            title={t.hero.githubHint}
            className="inline-flex items-center justify-center rounded-full border border-line bg-surface px-6 py-2.5 font-medium text-foreground transition-colors hover:border-subtle"
          >
            {t.hero.github}
          </a>
        </div>
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {t.hero.chips.map((chip) => (
            <li
              key={chip}
              className="rounded-full border border-line bg-surface px-3 py-1 text-xs text-subtle"
            >
              {chip}
            </li>
          ))}
        </ul>
      </div>

      {/* 首屏即见产品：主界面复刻窗口 */}
      <div className="mx-auto max-w-6xl px-6 pb-16">
        <AppWindow />
      </div>
    </section>
  );
}
