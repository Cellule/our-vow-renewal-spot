import { useLanguage } from "@/contexts/LanguageContext";
import { useIsWeekend } from "@/hooks/use-is-weekend";
import { Baby, BedDouble } from "lucide-react";

const ChildrenAndRooms = () => {
  const { t } = useLanguage();
  const isWeekend = useIsWeekend();

  const rooms = [
    { key: "quadRooms", icon: "🛏️" },
    { key: "queenRooms", icon: "🛏️" },
    { key: "kingRooms", icon: "🛏️" },
  ] as const;

  return (
    <section className="py-16 bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        {/* Children Section */}
        <div className="mb-16">
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

        {/* Rooms Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <BedDouble className="w-8 h-8 text-cream" />
            </div>
            <h2 className="font-script text-4xl md:text-5xl text-emerald mb-4">{t("accommodations.title")}</h2>
            <div className="w-24 h-px bg-gradient-primary mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {rooms.map((room) => (
              <div key={room.key} className="bg-card rounded-2xl p-6 text-center shadow-soft border border-burgundy/10">
                <span className="text-4xl block mb-4">{room.icon}</span>
                <h3 className="font-serif text-lg text-burgundy">{t(`accommodations.${room.key}`)}</h3>
              </div>
            ))}
          </div>

          <p className="font-sans text-center text-muted-foreground mt-6 max-w-2xl mx-auto">{t("accommodations.details")}</p>
        </div>
      </div>
    </section>
  );
};

export default ChildrenAndRooms;
