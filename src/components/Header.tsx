import { useEffect, useState } from "react";
import { useI18n } from "../i18n/context";
import LanguageSwitcher from "./LanguageSwitcher";

const REPO_URL = "https://github.com/aura-xyz/aura";
const RELEASES_URL = `${REPO_URL}/releases/latest`;

/** 站点顶栏：sticky 半透明导航，滚动后浮出分隔线与底色 */
export default function Header() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#features", label: t.nav.features },
    { href: "#demo", label: t.nav.demo },
    { href: "#download", label: t.nav.download },
  ];

  return (
    <header
      className={`sticky top-0 z-40 border-b backdrop-blur-md transition-[background-color,border-color] duration-200 ${
        scrolled
          ? "border-line bg-surface/85"
          : "border-transparent bg-surface/0"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-6 px-6">
        <a
          href="#top"
          className="flex shrink-0 items-center gap-2.5 rounded-tag"
          aria-label="Aura"
        >
          <img src="/logo.png" alt="" className="h-6 w-6" />
          <span className="text-[15px] font-semibold tracking-[-0.02em] text-foreground">
            Aura
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-1.5 text-sm text-subtle transition-colors hover:bg-bubble hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-full px-3 py-1.5 text-sm text-subtle transition-colors hover:bg-bubble hover:text-foreground"
          >
            GitHub
          </a>
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          <a
            href={RELEASES_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-full bg-brand px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-brand-strong"
          >
            {t.nav.getStarted}
          </a>
        </div>
      </div>
    </header>
  );
}
