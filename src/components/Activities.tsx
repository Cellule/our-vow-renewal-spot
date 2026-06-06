import { useLanguage } from "@/contexts/LanguageContext";
import { Gamepad2, Mic, Sparkles, Waves } from "lucide-react";

export function Activities() {
  const { t } = useLanguage();

  const activities = [
    { key: "gamesRoom", icon: Gamepad2, color: "bg-gradient-primary" },
    { key: "karaoke", icon: Mic, color: "bg-gradient-secondary" },
    { key: "spa", icon: Sparkles, color: "bg-gradient-accent" },
    { key: "privateBeach", icon: Waves, color: "bg-gradient-gold" },
  ] as const;

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="font-script text-4xl md:text-5xl text-emerald mb-4">{t("activities.title")}</h2>
        <p className="font-serif text-lg text-navy/70">{t("activities.subtitle")}</p>
        <div className="w-24 h-px bg-gradient-accent mx-auto mt-6"></div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.key} className="bg-card rounded-2xl p-6 text-center shadow-soft border border-burgundy/10 hover:shadow-elegant transition-all duration-300">
              <div className={`w-14 h-14 ${activity.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <Icon className="w-7 h-7 text-cream" />
              </div>
              <h3 className="font-serif text-lg text-burgundy">{t(`activities.${activity.key}`)}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}
