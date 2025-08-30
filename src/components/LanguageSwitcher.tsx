import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="bg-card/90 backdrop-blur-md rounded-xl p-2 shadow-elegant border border-cream/20">
        <div className="flex gap-1">
          <Button
            variant={language === 'en' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setLanguage('en')}
            className={`font-sans font-medium transition-all duration-300 ${
              language === 'en' 
                ? 'bg-gradient-primary text-cream shadow-soft' 
                : 'text-foreground/70 hover:text-foreground hover:bg-accent/50'
            }`}
          >
            EN
          </Button>
          <Button
            variant={language === 'fr' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setLanguage('fr')}
            className={`font-sans font-medium transition-all duration-300 ${
              language === 'fr' 
                ? 'bg-gradient-primary text-cream shadow-soft' 
                : 'text-foreground/70 hover:text-foreground hover:bg-accent/50'
            }`}
          >
            FR
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitcher;