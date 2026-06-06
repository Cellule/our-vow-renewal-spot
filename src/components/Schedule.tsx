import { useLanguage } from "@/contexts/LanguageContext";
import { useIsWeekend } from "@/hooks/use-is-weekend";
import { CalendarClock, Moon, Sun, Sunset } from "lucide-react";

const Schedule = () => {
  const { t } = useLanguage();
  const isWeekend = useIsWeekend();

  return (
    <div>
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-6">
          <CalendarClock className="w-8 h-8 text-cream" />
        </div>
        <h2 className="font-script text-4xl md:text-5xl text-navy mb-4">{t("schedule.title")}</h2>
        <div className="w-24 h-px bg-gradient-secondary mx-auto"></div>
      </div>

      <div className="space-y-6">
        {/* Friday */}
        {isWeekend && (
          <div className="bg-card rounded-2xl p-8 shadow-soft border border-burgundy/10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center">
                <Sunset className="w-6 h-6 text-burgundy" />
              </div>
              <h3 className="font-script text-2xl text-burgundy">{t("schedule.fridayTitle")}</h3>
            </div>
            <ul className="space-y-3 ml-16">
              <li className="font-sans text-foreground">
                <span className="font-semibold">•</span> {t("schedule.fridayArrival")}
              </li>
            </ul>
          </div>
        )}

        {/* Saturday */}
        <div className="bg-card rounded-2xl p-8 shadow-soft border border-emerald/10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
              <Sun className="w-6 h-6 text-cream" />
            </div>
            <h3 className="font-script text-2xl text-emerald">{t("schedule.saturdayTitle")}</h3>
          </div>
          <ul className="space-y-3 ml-16">
            <li className="font-sans text-foreground">
              <span className="font-semibold">•</span> {t("schedule.saturdayArrival")}
            </li>
          </ul>
        </div>

        {/* Sunday */}
        <div className="bg-card rounded-2xl p-8 shadow-soft border border-navy/10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-secondary rounded-full flex items-center justify-center">
              <Moon className="w-6 h-6 text-cream" />
            </div>
            <h3 className="font-script text-2xl text-navy">{t("schedule.sundayTitle")}</h3>
          </div>
          <ul className="space-y-3 ml-16">
            <li className="font-sans text-foreground">
              <span className="font-semibold">•</span> {t("schedule.sundayDeparture")}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
