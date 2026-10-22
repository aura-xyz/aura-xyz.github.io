import FeatureGrid from "./components/FeatureGrid";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import LanguageSwitcher from "./components/LanguageSwitcher";
import ModeSwitcher from "./components/ModeSwitcher";
import Screenshot from "./components/Screenshot";
import ToolCallDemo from "./components/ToolCallDemo";
import TrustSignals from "./components/TrustSignals";
import LanguageProvider from "./i18n/provider";

export default function App() {
  return (
    <LanguageProvider>
      <div className="flex min-h-svh flex-col bg-surface text-foreground">
        {/* 语言切换固定在右上角（DESIGN.md §4.2） */}
        <header className="flex justify-end px-6 py-4">
          <LanguageSwitcher />
        </header>
        <main className="flex flex-1 flex-col">
          <Hero />
          <Screenshot />
          <FeatureGrid />
          <ModeSwitcher />
          <ToolCallDemo />
          <TrustSignals />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
