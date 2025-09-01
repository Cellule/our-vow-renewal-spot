import { en } from "./en";
import { fr } from "./fr";

export type TranslationKeys = keyof typeof en;
export type Language = keyof typeof translations;
export const translations = {
  en,
  fr,
};
