import { useI18n } from "../i18n/context";
import Section from "./Section";

/** 大字哲学区：品牌口诀 + 一句演绎（中英各自提供） */
export default function Quote() {
  const { t } = useI18n();
  return (
    <Section>
      <div className="relative">
        {/* 背后极淡品牌光晕，给大字区制造氛围而非空旷 */}
        <div
          aria-hidden="true"
          className="quote-glow pointer-events-none absolute inset-0 -z-10"
        />
        <blockquote className="mx-auto max-w-4xl text-center">
          <span aria-hidden="true" className="brand-rule mx-auto mb-8 block" />
          <p className="text-balance text-4xl font-semibold tracking-[-0.03em] text-foreground sm:text-5xl">
            Minimal surface.{" "}
            <span className="text-brand">Maximum logic.</span>
          </p>
          <p className="mt-5 text-lg text-subtle">{t.quote.sub}</p>
        </blockquote>
      </div>
    </Section>
  );
}
