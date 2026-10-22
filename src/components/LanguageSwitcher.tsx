import { useI18n, type Lang } from "../i18n/context";

export default function LanguageSwitcher() {
  const { lang, setLang } = useI18n();
  // 单按钮始终显示目标语言，点击即切换
  const target: Lang = lang === "zh" ? "en" : "zh";
  return (
    <button
      type="button"
      onClick={() => setLang(target)}
      title="切换语言 / Switch language"
      className="rounded-full border border-line px-3 py-1.5 text-sm text-subtle transition-colors hover:border-subtle hover:text-foreground"
    >
      {lang === "zh" ? "EN" : "中"}
    </button>
  );
}
