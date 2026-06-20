import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLanguage("fr")}
        className={`rounded-full w-8 h-8 p-0 text-xs font-medium transition-all duration-300 ${language === "fr" ? "bg-gradient-primary text-cream shadow-soft" : "text-foreground/70 hover:text-foreground hover:bg-accent/50"}`}
      >
        FR
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLanguage("en")}
        className={`rounded-full w-8 h-8 p-0 text-xs font-medium transition-all duration-300 ${language === "en" ? "bg-gradient-primary text-cream shadow-soft" : "text-foreground/70 hover:text-foreground hover:bg-accent/50"}`}
      >
        EN
      </Button>
    </>
  );
};

export default LanguageSwitcher;
