import { Activities } from "@/components/Activities";
import { Children } from "@/components/Children";
import { ColorPalette } from "@/components/ColorPalette";
import { AddToCalendar } from "@/components/Connect";
import { DressCode } from "@/components/DressCode";
import { Gifts } from "@/components/Gifts";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Menu } from "@/components/Menu";
import { OurStory } from "@/components/OurStory";
import { PackingList } from "@/components/PackingList";
import { Rooms } from "@/components/Rooms";
import SaveTheDateHero from "@/components/SaveTheDateHero";
import Schedule from "@/components/Schedule";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { t } = useLanguage();

  const sections = [
    { key: "ourStory", component: <OurStory /> },
    // { key: "eventDetails", component: <EventDetails /> },
    { key: "schedule", component: <Schedule /> },
    { key: "dressCode", component: <DressCode /> },
    { key: "palette", component: <ColorPalette /> },
    { key: "menu", component: <Menu /> },
    { key: "activities", component: <Activities /> },
    { key: "children", component: <Children /> },
    { key: "rooms", component: <Rooms /> },
    { key: "packingList", component: <PackingList /> },
    { key: "gifts", component: <Gifts /> },
    { key: "connect", component: <AddToCalendar /> },
  ];

  return (
    <main className="min-h-screen">
      <LanguageSwitcher />
      <SaveTheDateHero />
      <div className="py-20 bg-gradient-to-b from-cream to-champagne">
        {sections.map((Section) => (
          <section key={Section.key} className="py-2">
            <div className="max-w-4xl mx-auto px-6 mb-16">{Section.component}</div>
          </section>
        ))}
      </div>

      {/* Footer */}
      <footer className="bg-gradient-elegant py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="font-script text-3xl text-cream mb-4">{t("footer.withLove")}</p>
          <div className="w-16 h-px bg-gradient-gold mx-auto mb-4"></div>
          <p className="font-serif text-lg text-champagne">{t("footer.names")}</p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
