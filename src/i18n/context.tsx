import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Dictionary } from "./zh";
import { zh } from "./zh";
import { en } from "./en";

export type Lang = "zh" | "en";

const STORAGE_KEY = "aura-lang";
/** 持久化只接受这两个值，其它一律回退到浏览器语言探测 */
const LANGS: Lang[] = ["zh", "en"];

const dictionaries: Record<Lang, Dictionary> = { zh, en };

function fromStorage(): Lang | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved !== null && (LANGS as string[]).includes(saved)
      ? (saved as Lang)
      : null;
  } catch {
    return null;
  }
}

function fromNavigator(): Lang {
  return navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
}

export interface LanguageContextValue {
  lang: Lang;
  t: Dictionary;
  setLang: (lang: Lang) => void;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);

/** 语言状态与文档属性同步的完整逻辑，由 LanguageProvider 调用并注入 context */
export function useLanguageValue(): LanguageContextValue {
  const [lang, setLangState] = useState<Lang>(
    () => fromStorage() ?? fromNavigator(),
  );

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // 存储被禁用时仅切换本次会话的语言，不致崩溃
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    const t = dictionaries[lang];
    document.title = t.meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", t.meta.description);
  }, [lang]);

  return useMemo<LanguageContextValue>(
    () => ({ lang, t: dictionaries[lang], setLang }),
    [lang, setLang],
  );
}

export function useI18n(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useI18n 必须在 LanguageProvider 内使用");
  }
  return ctx;
}
