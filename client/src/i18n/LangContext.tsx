import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { DEFAULT_LANG, LANGS, UI, type Lang } from "./dictionary";

const STORAGE_KEY = "vetart-lang";

interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const LangContext = createContext<LangContextValue | null>(null);

function readInitialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && (LANGS as string[]).includes(saved)) return saved as Lang;
  } catch {
    /* ignore */
  }
  return DEFAULT_LANG;
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readInitialLang);

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const value = useMemo<LangContextValue>(
    () => ({
      lang,
      setLang: setLangState,
      t: (key: string) => UI[lang][key] ?? UI.en[key] ?? key,
    }),
    [lang]
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}

export function suffixFor(lang: Lang): "En" | "Ka" | "Ru" {
  return lang === "en" ? "En" : lang === "ka" ? "Ka" : "Ru";
}

/** Pick a per-language field off an object with En/Ka/Ru-suffixed keys, e.g. field(service, "title"). */
export function useField() {
  const { lang } = useLang();
  const suffix = suffixFor(lang);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function field(obj: any, base: string): string {
    return (obj?.[`${base}${suffix}`] as string) ?? (obj?.[`${base}En`] as string) ?? "";
  };
}

/** Pick the active-language payload off a { dataEn, dataKa, dataRu } content row. */
export function usePageData<T>(row: { dataEn: T; dataKa: T; dataRu: T } | null | undefined): T | null {
  const { lang } = useLang();
  if (!row) return null;
  const suffix = suffixFor(lang);
  return (row[`data${suffix}`] as T) ?? row.dataEn;
}
