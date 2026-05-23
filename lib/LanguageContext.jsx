"use client";

import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext({
  lang: "en",
  toggleLang: () => {},
  setLang: () => {},
});

// Locale-scoped provider. The root layout instantiates this with defaults
// (lang="en", localStorage hydration enabled). Nested /es/ layout overrides
// with initialLang="es" + forceLang=true so the SSR render is Spanish and
// the localStorage hydration cannot flip it back to English mid-render.
export function LanguageProvider({ children, initialLang = "en", forceLang = false }) {
  const [lang, setLang] = useState(initialLang);

  useEffect(() => {
    // Locked routes (/es/*) skip localStorage. Their URL is the source of truth.
    if (forceLang) return;
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem("jr-lang");
    if (saved === "es") setLang("es");
  }, [forceLang]);

  const toggleLang = () => {
    // Locked routes can't toggle in-place. To switch language the user must
    // navigate to the EN counterpart URL (SiteNav handles this when it sees forceLang).
    if (forceLang) return;
    const next = lang === "en" ? "es" : "en";
    setLang(next);
    if (typeof window !== "undefined") window.localStorage.setItem("jr-lang", next);
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, setLang, locked: forceLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
