import { sectionKeys } from "@/components/TableOfContents";
import { useLanguage } from "@/contexts/LanguageContext";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const MobileTocButton = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1249px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      let current: string = sectionKeys[0];
      for (const key of sectionKeys) {
        const el = document.getElementById(key);
        if (el && el.offsetTop <= scrollPos) {
          current = key;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (key: string) => {
    const el = document.getElementById(key);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  if (!isMobile) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full w-8 h-8 p-0 text-xs font-medium transition-all duration-300 text-foreground/70 hover:text-foreground hover:bg-accent/50 flex items-center justify-center"
        aria-label={t("toc.title")}
      >
        {isOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
      </button>

      {isOpen && createPortal(<div className="fixed inset-0 bg-navy/50 z-40" onClick={() => setIsOpen(false)} />, document.body)}

      {createPortal(
        <div className={`fixed top-0 right-0 h-full w-72 bg-cream z-50 shadow-xl transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="p-6 pt-16">
            <h3 className="font-script text-2xl text-burgundy mb-6">{t("toc.title")}</h3>
            <nav className="flex flex-col gap-1">
              {sectionKeys.map((key) => (
                <button
                  key={key}
                  onClick={() => scrollToSection(key)}
                  className={`block w-full text-left py-2 px-3 rounded-lg text-sm font-serif transition-colors ${
                    activeSection === key ? "text-burgundy bg-burgundy/5 font-medium" : "text-navy/70 hover:text-burgundy hover:bg-burgundy/5"
                  }`}
                >
                  {t(`toc.${key}`)}
                </button>
              ))}
            </nav>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
};

export default MobileTocButton;
