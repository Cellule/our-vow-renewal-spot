import ChildrenAndRooms from "@/components/ChildrenAndRooms";
import Connect from "@/components/Connect";
import DressCodeAndPalette from "@/components/DressCodeAndPalette";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import MenuAndActivities from "@/components/MenuAndActivities";
import OurStory from "@/components/OurStory";
import PackingListAndGifts from "@/components/PackingListAndGifts";
import SaveTheDateHero from "@/components/SaveTheDateHero";
import Schedule from "@/components/Schedule";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen">
      <LanguageSwitcher />
      <SaveTheDateHero />
      <div className="py-20 bg-gradient-to-b from-cream to-champagne">
        <OurStory />
        {/* <EventDetails /> */}
        <Schedule />
        <DressCodeAndPalette />
        <MenuAndActivities />
        <ChildrenAndRooms />
        <PackingListAndGifts />
        <Connect />
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
