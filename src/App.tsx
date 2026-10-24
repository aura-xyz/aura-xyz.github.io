import CtaBand from "./components/CtaBand";
import FeatureGrid from "./components/FeatureGrid";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import LiveDemo from "./components/LiveDemo";
import Quote from "./components/Quote";
import SkillsShowcase from "./components/SkillsShowcase";
import LanguageProvider from "./i18n/provider";

/**
 * 页面骨架。
 *
 * 底色按「白 → 浅 → 白 → 浅 → 白」有意交替，节奏由结构产生而非装饰堆：
 *   Hero(白) → 特性(浅) → 交互演示(白) → Skills(浅) → 引言(白) → CTA(品牌色)
 * 区块由 9 个收敛到 6 个：信任条并入 Hero，两种模式演示与工具流合并为 LiveDemo。
 */
export default function App() {
  return (
    <LanguageProvider>
      <div id="top" className="flex min-h-svh flex-col bg-surface text-foreground">
        <div
          className="page-top-rule fixed inset-x-0 top-0 z-50 h-0.5"
          aria-hidden="true"
        />
        <Header />
        <main className="flex flex-1 flex-col">
          <Hero />
          <FeatureGrid />
          <LiveDemo />
          <SkillsShowcase />
          <Quote />
          <CtaBand />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
