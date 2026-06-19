import { useLanguage } from "@/contexts/LanguageContext";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./TableOfContents.module.css";

const sectionKeys = ["ourStory", "schedule", "dressCode", "palette", "menu", "activities", "children", "rooms", "packingList", "gifts", "connect"] as const;

const TableOfContents = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

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

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${styles.tocButton} fixed bottom-6 right-6 z-50 w-12 h-12 bg-burgundy text-cream rounded-full shadow-lg flex items-center justify-center hover:bg-burgundy-light transition-colors`}
        aria-label={t("toc.title")}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile overlay */}
      {isOpen && <div className={`${styles.tocButton} fixed inset-0 bg-navy/50 z-40`} onClick={() => setIsOpen(false)} />}

      {/* Mobile drawer */}
      <div
        className={`${styles.tocButton} fixed top-0 right-0 h-full w-72 bg-cream z-50 shadow-xl transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
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
      </div>

      {/* Desktop floating nav */}
      <nav className={`${styles.tocFloating} fixed right-4 top-1/2 -translate-y-1/2 z-30 flex-col gap-4`}>
        {sectionKeys.map((key) => (
          <button key={key} onClick={() => scrollToSection(key)} className="group flex items-center gap-3 transition-all duration-300">
            <span
              className={`text-sm font-serif whitespace-nowrap transition-all duration-300 ${
                activeSection === key ? "text-burgundy font-medium opacity-100" : "text-navy/80 opacity-70 group-hover:opacity-100"
              }`}
            >
              {t(`toc.${key}`)}
            </span>
          </button>
        ))}
      </nav>
    </>
  );
};

export default TableOfContents;
