import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const BackToTopButton = () => {
  const { t } = useLanguage();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("save-the-date-hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShow(!entry.isIntersecting);
      },
      { threshold: 0 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  if (!show) return null;

  return (
    <Button
      variant="ghost"
      size="sm"
      title={t("switcher.top")}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="rounded-full h-6 px-2 text-[10px] font-medium transition-all duration-300 text-foreground/70 hover:text-foreground hover:bg-accent/50 flex items-center gap-0.5"
    >
      <ArrowUp className="w-2.5 h-2.5" />
    </Button>
  );
};

export default BackToTopButton;
