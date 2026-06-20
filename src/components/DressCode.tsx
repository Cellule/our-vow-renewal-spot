import { useLanguage } from "@/contexts/LanguageContext";
import { Sparkles } from "lucide-react";

export function DressCode() {
  const { t } = useLanguage();

  return (
    <div>
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-8 h-8 text-cream" />
        </div>
        <h2 className="font-script text-4xl md:text-5xl text-burgundy mb-4">{t("event.dressCode")}</h2>
        <div className="w-24 h-px bg-gradient-primary mx-auto mb-6"></div>
        <p className="font-serif text-xl text-navy/80 max-w-2xl mx-auto">{t("event.dressCodeValue")}</p>
      </div>

      <div className="bg-card rounded-2xl p-8 shadow-soft border border-burgundy/10 mx-auto">
        <div className="text-center mb-6">
          <span className="inline-block bg-gradient-primary text-white font-serif text-lg px-6 py-2 rounded-full">{t("event.dressCodeTheme")}</span>
        </div>
        <p className="font-sans text-foreground text-center leading-relaxed">{t("event.dressCodeDetails")}</p>
      </div>
    </div>
  );
}
