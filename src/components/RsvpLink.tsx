import { useLanguage } from "@/contexts/LanguageContext";
import { useIsWeekend } from "@/hooks/use-is-weekend";
import { PartyPopper } from "lucide-react";
import { Link } from "react-router-dom";

export function RsvpLink() {
  const { t } = useLanguage();
  const isWeekend = useIsWeekend();

  return (
    <div>
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-6">
          <PartyPopper className="w-8 h-8 text-cream" />
        </div>
        <h2 className="font-script text-4xl md:text-5xl text-accent mb-4">{t("rsvpLink.title")}</h2>
      </div>

      <div className="bg-gradient-elegant rounded-2xl p-10 shadow-elegant text-center">
        <p className="font-serif text-xl text-champagne leading-relaxed mb-8">{t("rsvpLink.text")}</p>
        <Link
          to={isWeekend ? "/weekend/rsvp" : "/rsvp"}
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold/50 hover:bg-gold/60 text-cream font-semibold text-lg rounded-lg border-2 border-gold/70 hover:border-gold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
        >
          {t("rsvpLink.button")}
        </Link>
      </div>
    </div>
  );
}
