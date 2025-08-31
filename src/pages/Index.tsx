import SaveTheDateHero from "@/components/SaveTheDateHero";
import OurStory from "@/components/OurStory";
import EventDetails from "@/components/EventDetails";
import Connect from "@/components/Connect";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { t } = useLanguage();
  
  return (
    <main className="min-h-screen">
      <LanguageSwitcher />
      <SaveTheDateHero />
      <OurStory />
      {/* <EventDetails /> */}
      <Connect />
      
      {/* Footer */}
      <footer className="bg-gradient-elegant py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="font-script text-3xl text-cream mb-4">
            {t('footer.withLove')}
          </p>
          <div className="w-16 h-px bg-gradient-gold mx-auto mb-4"></div>
          <p className="font-serif text-lg text-champagne">
            {t('footer.names')}
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
