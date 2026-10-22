import CtaBand from "./components/CtaBand";
import FeatureGrid from "./components/FeatureGrid";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ModeSwitcher from "./components/ModeSwitcher";
import Quote from "./components/Quote";
import ToolCallDemo from "./components/ToolCallDemo";
import TrustBar from "./components/TrustBar";
import LanguageProvider from "./i18n/provider";

export default function App() {
  return (
    <LanguageProvider>
      <div id="top" className="flex min-h-svh flex-col bg-surface text-foreground">
        <Header />
        <main className="flex flex-1 flex-col">
          <Hero />
          <TrustBar />
          {/* 中部特性区通栏浅底，与上下白底形成官网式分段节奏 */}
          <div className="border-y border-line bg-surface-sunken">
            <FeatureGrid />
          </div>
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
