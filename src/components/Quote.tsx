import { useI18n } from "../i18n/context";
import Section from "./Section";

/** 大字哲学区：品牌口诀 + 一句演绎（中英各自提供） */
export default function Quote() {
  const { t } = useI18n();
  return (
    <Section>
      <blockquote className="mx-auto max-w-4xl text-center">
        <span
          aria-hidden="true"
          className="mx-auto mb-8 block h-px w-16 bg-brand"
        />
        <p className="text-balance text-4xl font-semibold tracking-[-0.03em] text-foreground sm:text-5xl">
          {t.quote.line}
        </p>
        <p className="mt-5 text-lg text-subtle">{t.quote.sub}</p>
      </blockquote>
    </Section>
  );
}
