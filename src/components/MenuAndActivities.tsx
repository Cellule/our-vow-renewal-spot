import { useLanguage } from "@/contexts/LanguageContext";
import { Gamepad2, Mic, Sparkles, UtensilsCrossed, Waves } from "lucide-react";

const MenuAndActivities = () => {
  const { t } = useLanguage();

  const menuItems = [
    { key: "appetizers", icon: "🥗" },
    { key: "entry", icon: "🍽️" },
    { key: "salad", icon: "🥬" },
    { key: "mainCourse", icon: "🍽️" },
    { key: "dessertTable", icon: "🍰" },
  ] as const;

  const mainDishes = [
    { key: "chicken", icon: "🍗" },
    { key: "beef", icon: "🥩" },
    { key: "vegetarian", icon: "🥦" },
  ] as const;

  const activities = [
    { key: "gamesRoom", icon: Gamepad2, color: "bg-gradient-primary" },
    { key: "karaoke", icon: Mic, color: "bg-gradient-secondary" },
    { key: "spa", icon: Sparkles, color: "bg-gradient-accent" },
    { key: "privateBeach", icon: Waves, color: "bg-gradient-gold" },
  ] as const;

  return (
    <section className="py-16 bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        {/* Menu Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <UtensilsCrossed className="w-8 h-8 text-cream" />
            </div>
            <h2 className="font-script text-4xl md:text-5xl text-burgundy mb-4">{t("menu.title")}</h2>
            <div className="w-24 h-px bg-gradient-primary mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Menu Items */}
            <div className="bg-card rounded-2xl p-8 shadow-soft border border-burgundy/10">
              <ul className="space-y-4">
                {menuItems.map((item) => (
                  <li key={item.key} className="flex items-center gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="font-sans text-foreground text-lg">{t(`menu.${item.key}`)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Main Course Details */}
            <div className="bg-gradient-elegant rounded-2xl p-8 shadow-elegant">
              <h3 className="font-script text-2xl text-gold mb-6 text-center">{t("menu.mainCourse")}</h3>
              <ul className="space-y-4">
                {mainDishes.map((dish) => (
                  <li key={dish.key} className="flex items-center gap-3">
                    <span className="text-2xl">{dish.icon}</span>
                    <span className="font-sans text-champagne">{t(`menu.${dish.key}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Activities Section */}
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
      </div>
    </section>
  );
};

export default MenuAndActivities;
