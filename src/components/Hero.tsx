import { useI18n } from "../i18n/context";

const REPO_URL = "https://github.com/aura-xyz/aura";
const RELEASES_URL = `${REPO_URL}/releases/latest`;

export default function Hero() {
  const { t } = useI18n();
  return (
    <section className="mx-auto flex max-w-3xl flex-1 flex-col items-center justify-center px-6 pt-16 pb-20 text-center sm:pt-24">
      <img
        src="/logo.png"
        width={112}
        height={112}
        alt="Aura"
        className="mb-8 rounded-2xl"
      />
      <h1 className="mb-3 text-6xl font-semibold tracking-[-0.03em] text-foreground sm:text-7xl">
        Aura
      </h1>
      {/* 产品 tagline，双语一致不翻译（与主应用空状态同源） */}
      <p className="mb-5 text-sm text-subtle sm:text-base">
        Minimal surface. Maximum logic.
      </p>
      <p className="max-w-xl text-balance text-lg leading-relaxed text-subtle">
        {t.hero.subtitle}
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
          className="inline-flex items-center justify-center rounded-full border border-line px-6 py-2.5 font-medium text-foreground transition-colors hover:border-subtle"
        >
          {t.hero.github}
        </a>
      </div>
      <ul className="mt-8 flex flex-wrap items-center justify-center gap-2">
        {t.hero.chips.map((chip) => (
          <li
            key={chip}
            className="rounded-full border border-line px-3 py-1 text-xs text-subtle"
          >
            {chip}
          </li>
        ))}
      </ul>
    </section>
  );
}
