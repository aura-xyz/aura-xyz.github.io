import { useI18n } from "../i18n/context";
import Section from "./Section";

/** 大字哲学区：品牌口诀 + 中文演绎（en 直接省略演绎行） */
export default function Quote() {
  const { lang, t } = useI18n();
  return (
    <Section>
      <blockquote className="mx-auto max-w-4xl text-center">
        <p className="text-balance text-4xl font-semibold tracking-[-0.03em] text-foreground sm:text-5xl">
          {t.quote.line}
        </p>
        {lang === "zh" && (
          <p className="mt-5 text-lg text-subtle">{t.quote.sub}</p>
        )}
      </blockquote>
    </Section>
  );
}
