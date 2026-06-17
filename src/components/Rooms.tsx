import { useLanguage } from "@/contexts/LanguageContext";
import { BedDouble } from "lucide-react";

export function Rooms() {
  const { t } = useLanguage();

  const rooms = [
    { key: "quadRooms", icon: "🛏️" },
    { key: "queenRooms", icon: "🛏️" },
    { key: "kingRooms", icon: "🛏️" },
  ] as const;

  return (
    <div>
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <BedDouble className="w-8 h-8 text-cream" />
        </div>
        <h2 className="font-script text-4xl md:text-5xl text-emerald mb-4">{t("accommodations.title")}</h2>
        <div className="w-24 h-px bg-gradient-primary mx-auto"></div>
      </div>

      <div className="mb-8 rounded-2xl border-2 border-burgundy bg-burgundy text-cream p-6 md:p-8 text-center shadow-soft">
        <h3 className="font-script text-3xl md:text-4xl mb-2">🎉 {t("accommodations.includedTitle")}</h3>
        <p className="font-sans text-base md:text-lg leading-relaxed">{t("accommodations.includedDetails")}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div key={room.key} className="bg-card rounded-2xl p-6 text-center shadow-soft border border-burgundy/10">
            <span className="text-4xl block mb-4">{room.icon}</span>
            <h3 className="font-serif text-lg text-burgundy">{t(`accommodations.${room.key}`)}</h3>
          </div>
        ))}
      </div>

      <p className="font-sans text-center text-muted-foreground mt-6 max-w-2xl mx-auto">{t("accommodations.details")}</p>
    </div>
  );
}
