import { useI18n } from "../i18n/context";
import AppWindow from "./AppWindow";

const REPO_URL = "https://github.com/aura-xyz/aura";
const RELEASES_URL = `${REPO_URL}/releases/latest`;

/**
 * 首屏：主张 → 产品窗口 → 信任条。
 * 原先 hero.chips 与紧随其后的 TrustBar 说的是同一件事（Apache-2.0 出现两次），
 * 现在合并为唯一一条信任条；技术栈与获取方式收进按钮下方的一行小字。
 */
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
        <div className="hero-glow absolute inset-x-0 top-0 h-[860px]" />
        <div className="hero-core-glow absolute inset-x-0 top-0 h-[640px]" />
      </div>

      <div className="mx-auto max-w-3xl px-6 pt-16 pb-12 text-center sm:pt-24">
        <div className="relative mb-7 inline-flex">
          <span aria-hidden="true" className="logo-glow" />
          <img
            src="/logo.png"
            width={88}
            height={88}
            alt="Aura"
            className="relative rounded-2xl shadow-xl shadow-brand/15 ring-1 ring-line ring-offset-4 ring-offset-surface"
          />
        </div>
        <h1 className="mb-3 text-5xl font-semibold tracking-[-0.03em] text-foreground sm:text-6xl">
          Aura
        </h1>
        {/* 产品 tagline，双语一致不翻译（与主应用空状态同源）；后半句品牌色强调 */}
        <p className="mb-5 text-sm font-medium tracking-wide text-subtle sm:text-base">
          Minimal surface.{" "}
          <span className="text-brand">Maximum logic.</span>
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
            className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-2.5 font-medium text-white shadow-sm shadow-brand/25 transition-colors hover:bg-brand-strong"
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
        <p className="mt-4 text-xs text-subtle">{t.hero.techNote}</p>
      </div>

      {/* 首屏即见产品：主界面复刻窗口，背后品牌光晕增强与白底的层次分离 */}
      <div className="relative mx-auto max-w-6xl px-6 pb-16">
        <div
          aria-hidden="true"
          className="window-glow pointer-events-none absolute -inset-x-12 -top-12 bottom-0 -z-10"
        />
        <AppWindow />
      </div>

      {/* 信任条：合并后的唯一一条，落在浅底卡片里与产品窗口分区 */}
      <div className="mx-auto max-w-6xl px-6 pb-20">
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 rounded-card border border-line bg-surface-sunken px-6 py-4">
          {t.trust.items.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-2 text-xs text-subtle"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
