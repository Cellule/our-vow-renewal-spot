import { useLanguage } from "@/contexts/LanguageContext";
import { Palette, Phone } from "lucide-react";

export function ColorPalette() {
  const { t } = useLanguage();

  return (
    <div>
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-6">
          <Palette className="w-8 h-8 text-cream" />
        </div>
        <h2 className="font-script text-4xl md:text-5xl text-emerald mb-4">{t("event.colorPaletteTitle")}</h2>
        <div className="w-24 h-px bg-gradient-accent mx-auto mb-6"></div>
      </div>

      <div className="bg-gradient-elegant rounded-2xl p-8 shadow-elegant">
        <div className="text-champagne">
          <p className="font-sans text-lg leading-relaxed mb-4">
            {t("event.colorPaletteText")}
            <i> {t("event.colorPaletteAvoid")}</i>
          </p>
          <div className="flex items-center justify-center gap-2 text-champagne/80">
            <Phone className="w-4 h-4" />
            <span className="font-sans">{t("event.colorPaletteContact")}</span>
          </div>
        </div>
      </div>

      {/* Color Swatches */}
      <div className="bg-white rounded-2xl p-4 mt-12">
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {[
            { name: "Émeraude", color: "#073014" },
            { name: "Saphir", color: "#121c5a" },
            { name: "Améthyste", color: "#421f6f" },
            { name: "Grenat", color: "#6e123b" },
            { name: "Rubis", color: "#5d0606" },
            { name: "Topaze", color: "#a03c0d" },
          ].map((gem) => (
            <div key={gem.name} className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border-2 border-cream shadow-lg" style={{ backgroundColor: gem.color, filter: "brightness(0.9)" }} />
              {/* <span className="font-sans text-xs text-navy/70 mt-2">{gem.name}</span> */}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {[
            { name: "Émeraude", color: "#084d11" },
            { name: "Émeraude", color: "#075b5a" },
            { name: "Blerg", color: "#2a4773" },
            { name: "Améthyste", color: "#63137c" },
            { name: "Grenat", color: "#9c3361" },
            { name: "Rubis", color: "#7a1122" },
            { name: "Topaze", color: "#c17211" },
          ].map((gem) => (
            <div key={gem.name} className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border-2 border-cream shadow-lg" style={{ backgroundColor: gem.color, filter: "brightness(0.9)" }} />
              {/* <span className="font-sans text-xs text-navy/70 mt-2">{gem.name}</span> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
