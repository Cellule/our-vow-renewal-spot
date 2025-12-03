import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-card/60 backdrop-blur-md rounded-full p-1 shadow-elegant border border-cream/20 hover:bg-card/80 transition-all duration-300">
        <div className="flex flex-col gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLanguage("en")}
            className={`rounded-full w-8 h-8 p-0 text-xs font-medium transition-all duration-300 ${language === "en" ? "bg-gradient-primary text-cream shadow-soft" : "text-foreground/70 hover:text-foreground hover:bg-accent/50"}`}
          >
            EN
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLanguage("fr")}
            className={`rounded-full w-8 h-8 p-0 text-xs font-medium transition-all duration-300 ${language === "fr" ? "bg-gradient-primary text-cream shadow-soft" : "text-foreground/70 hover:text-foreground hover:bg-accent/50"}`}
          >
            FR
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
