import { createContext, useContext, useState, ReactNode } from "react";
import en from "@/i18n/en.json";
import fr from "@/i18n/fr.json";

type Lang = "en" | "fr";
type Dict = typeof en;

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: Dict;
}

const Ctx = createContext<LangCtx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const t = lang === "en" ? en : (fr as Dict);
  return (
    <Ctx.Provider value={{ lang, setLang, toggle: () => setLang(lang === "en" ? "fr" : "en"), t }}>
      {children}
    </Ctx.Provider>
  );
}

export function useLang() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useLang must be used within LangProvider");
  return c;
}