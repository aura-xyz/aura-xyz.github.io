import { useI18n } from "../i18n/context";

const REPO_URL = "https://github.com/aura-xyz/aura";
const RELEASES_URL = `${REPO_URL}/releases/latest`;

/** 收尾光带：品牌渐变底、白字大标题 + 两个 CTA（官网必备的结尾号召） */
export default function CtaBand() {
  const { t } = useI18n();
  return (
    <div id="download" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-20">
      <div className="relative overflow-hidden rounded-card cta-glow px-6 py-16 text-center text-white shadow-2xl ring-1 ring-inset ring-white/15 sm:px-12">
        <div className="relative mx-auto max-w-2xl">
          <p className="mb-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.1em] text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
            {t.cta.eyebrow}
          </p>
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {t.cta.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-balance text-base text-white/80">
            {t.cta.subtitle}
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={RELEASES_URL}
              target="_blank"
              rel="noreferrer"
              title={t.hero.downloadHint}
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-base font-semibold text-brand shadow-lg shadow-black/10 transition-transform hover:-translate-y-0.5 hover:bg-white/95"
            >
              {t.hero.download}
            </a>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
              title={t.hero.githubHint}
              className="inline-flex items-center justify-center rounded-full border border-white/50 px-8 py-3 text-base font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              {t.hero.github}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
