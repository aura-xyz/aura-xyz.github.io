import type { ReactNode } from "react";
import { LanguageContext, useLanguageValue } from "./context";

export default function LanguageProvider({ children }: { children: ReactNode }) {
  const value = useLanguageValue();
  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}
