import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useLanguage();
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("save-the-date-hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowTopButton(!entry.isIntersecting);
      },
      { threshold: 0 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-card/60 backdrop-blur-md rounded-full p-1 shadow-elegant border border-cream/20 hover:bg-card/80 transition-all duration-300">
        <div className="flex flex-col items-center gap-1">
          {showTopButton && (
            <Button
              variant="ghost"
              size="sm"
              title={t("switcher.top")}
              onClick={scrollToTop}
              className="rounded-full h-6 px-2 text-[10px] font-medium transition-all duration-300 text-foreground/70 hover:text-foreground hover:bg-accent/50 flex items-center gap-0.5"
            >
              <ArrowUp className="w-2.5 h-2.5" />
            </Button>
          )}
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
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
