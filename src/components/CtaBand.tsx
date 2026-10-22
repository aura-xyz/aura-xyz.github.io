import { useI18n } from "../i18n/context";

const REPO_URL = "https://github.com/aura-xyz/aura";
const RELEASES_URL = `${REPO_URL}/releases/latest`;

/** 收尾光带：品牌渐变底、白字大标题 + 两个 CTA（官网必备的结尾号召） */
export default function CtaBand() {
  const { t } = useI18n();
  return (
    <div id="download" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-20">
      <div className="relative overflow-hidden rounded-card bg-brand px-6 py-14 text-center text-white sm:px-12">
        {/* 斜向高光纹理，静态直读氛围 */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(70% 90% at 75% 10%, rgba(255,255,255,0.18), transparent 60%), radial-gradient(50% 70% at 20% 90%, rgba(255,255,255,0.12), transparent 65%)",
          }}
        />
        <div className="relative">
          <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            {t.cta.heading}
          </h2>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={RELEASES_URL}
              target="_blank"
              rel="noreferrer"
              title={t.hero.downloadHint}
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 font-medium text-brand transition-colors hover:bg-white/90"
            >
              {t.hero.download}
            </a>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
              title={t.hero.githubHint}
              className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-2.5 font-medium text-white transition-colors hover:border-white"
            >
              {t.hero.github}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
