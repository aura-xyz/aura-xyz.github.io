import { useI18n } from "../i18n/context";

const REPO_URL = "https://github.com/aura-xyz/aura";

export default function Footer() {
  const { t } = useI18n();
  const links = [
    { label: t.footer.github, href: REPO_URL },
    { label: t.footer.releases, href: `${REPO_URL}/releases/latest` },
    { label: t.footer.readme, href: `${REPO_URL}#readme` },
  ];

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row">
        <div className="flex items-center gap-2 text-sm text-subtle">
          <img src="/logo.png" width={20} height={20} alt="" />
          <span className="font-semibold text-foreground">Aura</span>
          <span>· Apache 2.0</span>
          <span>· {t.footer.note}</span>
        </div>
        <nav className="flex items-center gap-6 text-sm">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="text-subtle transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
