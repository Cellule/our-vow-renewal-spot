import Connect from "@/components/Connect";
import EventDetails from "@/components/EventDetails";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import OurStory from "@/components/OurStory";
import SaveTheDateHero from "@/components/SaveTheDateHero";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen">
      <LanguageSwitcher />
      <SaveTheDateHero />
      <div className="space-y-16 py-20 bg-gradient-to-b from-cream to-champagne">
        <OurStory />
        <EventDetails />
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
