import { createContext, useContext, useState, ReactNode } from "react";
import en from "@/i18n/en.json";
import fr from "@/i18n/fr.json";

type Lang = "en" | "fr";
type Dict = typeof en;

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: ((path: string) => string) & Dict;
}

const Ctx = createContext<LangCtx | null>(null);

function resolve(obj: unknown, path: string): string {
  return String(path.split(".").reduce((acc: unknown, key: string) => {
    if (acc && typeof acc === "object" && key in acc) return (acc as Record<string, unknown>)[key];
    return path;
  }, obj));
}

function createT(dict: unknown): ((path: string) => string) & Dict {
  const fn = (path: string) => resolve(dict, path);
  return new Proxy(fn, {
    get(_target, prop) {
      if (prop === "then") return undefined;
      const val = (dict as Record<string, unknown>)[prop as string];
      if (Array.isArray(val)) return val;
      if (val !== null && typeof val === "object") return createT(val);
      return val;
    },
  }) as unknown as (path: string) & Dict;
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const dict = lang === "en" ? en : (fr as Dict);
  const t = createT(dict);

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
