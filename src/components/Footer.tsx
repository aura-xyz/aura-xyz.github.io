import { useI18n } from "../i18n/context";

const REPO_URL = "https://github.com/aura-xyz/aura";
const YEAR = new Date().getFullYear();

export default function Footer() {
  const { t } = useI18n();
  const navClass =
    "text-sm text-subtle transition-colors hover:text-foreground";
  return (
    <footer className="bg-surface-sunken">
      <div
        aria-hidden="true"
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-brand) 45%, transparent), transparent)",
        }}
      />
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <img src="/logo.png" alt="" className="h-6 w-6" />
              <span className="text-[15px] font-semibold tracking-[-0.02em] text-foreground">
                Aura
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-subtle">
              {t.footer.tagline}
            </p>
          </div>

          <nav aria-label={t.footer.product}>
            <p className="eyebrow mb-3">{t.footer.product}</p>
            <ul className="space-y-3">
              <li>
                <a href="#features" className={navClass}>
                  {t.footer.productFeatures}
                </a>
              </li>
              <li>
                <a href="#demo" className={navClass}>
                  {t.footer.productDemo}
                </a>
              </li>
              <li>
                <a href="#download" className={navClass}>
                  {t.footer.productDownload}
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label={t.footer.resources}>
            <p className="eyebrow mb-3">{t.footer.resources}</p>
            <ul className="space-y-3">
              <li>
                <a
                  href={REPO_URL}
                  target="_blank"
                  rel="noreferrer"
                  className={navClass}
                >
                  {t.footer.github}
                </a>
              </li>
              <li>
                <a
                  href={`${REPO_URL}/releases`}
                  target="_blank"
                  rel="noreferrer"
                  className={navClass}
                >
                  {t.footer.releases}
                </a>
              </li>
              <li>
                <a
                  href={`${REPO_URL}#readme`}
                  target="_blank"
                  rel="noreferrer"
                  className={navClass}
                >
                  {t.footer.readme}
                </a>
              </li>
              <li>
                <a
                  href={`${REPO_URL}/blob/main/LICENSE`}
                  target="_blank"
                  rel="noreferrer"
                  className={navClass}
                >
                  {t.footer.license}
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between">
          <span>© {YEAR} Aura</span>
          <span>Apache-2.0 · {t.footer.note}</span>
        </div>
      </div>
    </footer>
  );
}
