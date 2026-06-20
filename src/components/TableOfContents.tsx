import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";
import styles from "./TableOfContents.module.css";

const sectionKeys = ["ourStory", "schedule", "dressCode", "palette", "menu", "activities", "children", "rooms", "packingList", "gifts", "connect"] as const;

const TableOfContents = () => {
  const { t } = useLanguage();
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
  };

  return (
    <nav className={`${styles.tocFloating} fixed right-4 top-1/2 -translate-y-1/2 z-30 flex-col gap-4`}>
      {sectionKeys.map((key) => (
        <button key={key} onClick={() => scrollToSection(key)} className="group flex items-center gap-3 transition-all duration-300">
          <span
            className={`text-lg font-serif whitespace-nowrap transition-all duration-300 ${
              activeSection === key ? "text-burgundy font-medium opacity-100" : "text-navy/80 opacity-70 group-hover:opacity-100"
            }`}
          >
            {t(`toc.${key}`)}
          </span>
        </button>
      ))}
    </nav>
  );
};

export default TableOfContents;
