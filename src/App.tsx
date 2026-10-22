import Hero from "./components/Hero";
import LanguageSwitcher from "./components/LanguageSwitcher";
import LanguageProvider from "./i18n/provider";

export default function App() {
  return (
    <LanguageProvider>
      <div className="flex min-h-svh flex-col bg-surface text-zinc-300">
        {/* 语言切换固定在右上角；首版无导航栏，后续版本统一迁移 */}
        <header className="flex justify-end px-6 py-4">
          <LanguageSwitcher />
        </header>
        <main className="flex flex-1 flex-col">
          <Hero />
        </main>
      </div>
    </LanguageProvider>
  );
}
