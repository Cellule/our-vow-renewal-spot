import { useLanguage } from "@/contexts/LanguageContext";
import { Gift } from "lucide-react";

export function Gifts() {
  const { t } = useLanguage();

  return (
    <div>
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <Gift className="w-8 h-8 text-cream" />
        </div>
        <h2 className="font-script text-4xl md:text-5xl text-burgundy mb-4">{t("gift.title")}</h2>
      </div>

      <div className="bg-gradient-elegant rounded-2xl p-10 shadow-elegant">
        <p className="font-serif text-xl text-champagne text-center leading-relaxed">{t("gift.text")}</p>
        <p className="font-serif text-xl text-champagne text-center leading-relaxed">{t("gift.note")}</p>
      </div>
    </div>
  );
}
