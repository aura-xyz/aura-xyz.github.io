import CtaBand from "./components/CtaBand";
import FeatureGrid from "./components/FeatureGrid";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import LanguageSwitcher from "./components/LanguageSwitcher";
import ModeSwitcher from "./components/ModeSwitcher";
import Quote from "./components/Quote";
import ToolCallDemo from "./components/ToolCallDemo";
import TrustBar from "./components/TrustBar";
import LanguageProvider from "./i18n/provider";

export default function App() {
  return (
    <LanguageProvider>
      <div className="flex min-h-svh flex-col bg-surface text-foreground">
        <header className="flex justify-end px-6 py-4">
          <LanguageSwitcher />
        </header>
        <main className="flex flex-1 flex-col">
          <Hero />
          <TrustBar />
          <FeatureGrid />
          <ModeSwitcher />
          <ToolCallDemo />
          <Quote />
          <CtaBand />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
