import { useLanguage } from "@/contexts/LanguageContext";
import { useIsWeekend } from "@/hooks/use-is-weekend";
import { Baby } from "lucide-react";

export function Children() {
  const { t } = useLanguage();
  const isWeekend = useIsWeekend();

  return (
    <div>
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-6">
          <Baby className="w-8 h-8 text-cream" />
        </div>
        <h2 className="font-script text-4xl md:text-5xl text-burgundy mb-4">{t("children.title")}</h2>
        <div className="w-24 h-px bg-gradient-accent mx-auto"></div>
      </div>

      <div className="bg-gradient-elegant rounded-2xl p-8 shadow-elegant max-w-3xl mx-auto">
        <div className="text-champagne space-y-4">
          <p className="font-sans text-lg leading-relaxed">{t("children.welcome")}</p>
          {isWeekend && (
            <>
              <p className="font-sans text-lg leading-relaxed">{t("children.friday")}</p>
            </>
          )}
          {/* <p className="font-sans text-lg leading-relaxed">{t("children.saturday")}</p> */}
        </div>
      </div>
    </div>
  );
}
