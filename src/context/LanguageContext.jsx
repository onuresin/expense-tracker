import { useEffect, useMemo, useState } from "react";
import { LanguageContext } from "./language-context";
import { translations } from "../locales/translations";

const STORAGE_KEY = "expense-tracker-language";

function getInitialLanguage() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "tr" || stored === "en") return stored;
  return navigator.language && navigator.language.toLowerCase().startsWith("tr") ? "tr" : "en";
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  function toggleLanguage() {
    setLanguage((prev) => (prev === "tr" ? "en" : "tr"));
  }

  // "categories.rent" gibi nokta ile ayrilmis bir anahtari secili dildeki
  // metne cevirir. Karsiligi bulunamazsa gelistirme sirasinda fark edilsin
  // diye dogrudan anahtarin kendisini geri dondurur.
  const t = useMemo(() => {
    return function translate(path) {
      const dict = translations[language] || translations.tr;
      const result = path
        .split(".")
        .reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), dict);
      return result !== undefined ? result : path;
    };
  }, [language]);

  const value = { language, toggleLanguage, t };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
