import { Language, TranslationKeys } from "@/languages/translations";
import React, { useState } from "react";
import { translations } from "../languages/translations";
import { defaultLanguage, LanguageContext } from "./LanguageContext";

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(defaultLanguage);

  const t = (key: TranslationKeys): string => {
    return translations[language][key] || translations["en"][key];
  };

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
};
