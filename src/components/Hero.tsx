import { useI18n } from "../i18n/context";

const REPO_URL = "https://github.com/aura-xyz/aura";
const RELEASES_URL = `${REPO_URL}/releases/latest`;

export default function Hero() {
  const { t } = useI18n();
  return (
    <section className="mx-auto flex max-w-3xl flex-1 flex-col items-center justify-center px-6 pb-24 text-center">
      <img
        src="/logo.png"
        width={112}
        height={112}
        alt="Aura"
        className="mb-8 rounded-2xl"
      />
      <h1 className="mb-4 text-6xl font-semibold tracking-tight text-zinc-100 sm:text-7xl">
        Aura
      </h1>
      <p className="max-w-xl text-balance text-lg leading-relaxed text-zinc-400">
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
          className="inline-flex items-center justify-center rounded-full border border-line px-6 py-2.5 font-medium text-zinc-300 transition-colors hover:border-zinc-600 hover:text-zinc-100"
        >
          {t.hero.github}
        </a>
      </div>
    </section>
  );
}
