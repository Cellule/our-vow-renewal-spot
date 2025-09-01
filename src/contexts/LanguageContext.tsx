import { createContext, useContext } from "react";
import { Language } from "@/languages/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

function getLocales() {
  try {
    const theLanguages = window.navigator.languages || [
      window.navigator.language,
    ];
    return [...theLanguages, getLocaleEquivalentFromDateString()];
  } catch (err) {
    // ...
  }
  return [getLocaleEquivalentFromDateString()];
}

function getLocaleEquivalentFromDateString(): Language {
  // dec 13, 2019. We can make sure we'll get 3 different 2-digits numbers. 19, 12, 13.
  const dateToTest = new Date(2019, 11, 13);
  const dateString = dateToTest.toLocaleDateString();

  const indexOfMonth = dateString.indexOf("12");
  const indexOfDate = dateString.indexOf("13");
  const indexOfYear = dateString.indexOf("19");

  if (Math.min(indexOfMonth, indexOfDate, indexOfYear) === indexOfYear) {
    // We have the year first
    return "fr";
  }

  // Month is after date: uk.
  return "en";
}

function getPreferredLanguage(): Language {
  const locales = getLocales();
  if (locales[0]?.toLowerCase().includes("fr")) {
    return "fr";
  }
  return "en";
}

export const defaultLanguage = getPreferredLanguage();

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
