import { useLanguage } from "@/contexts/LanguageContext";
import { UtensilsCrossed } from "lucide-react";

export function Menu() {
  const { t } = useLanguage();

  const menuItems = [
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

  return (
    <div>
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <UtensilsCrossed className="w-8 h-8 text-cream" />
        </div>
        <h2 className="font-script text-4xl md:text-5xl text-burgundy mb-4">{t("menu.title")}</h2>
        <div className="w-24 h-px bg-gradient-primary mx-auto"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Menu Items */}
        <div className="bg-card rounded-2xl p-8 shadow-soft border border-burgundy/10">
          <ul className="space-y-4">
            {menuItems.map((item) => (
              <li key={item.key} className="flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <span className="font-sans text-foreground text-lg">
                  {t(`menu.${item.key}`)}
                  {item.key === "mainCourse" && <span className="text-gray-400 text-sm md:hidden ml-2">{t("menu.seeBelow")}</span>}
                </span>
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
  );
}
