import { useLanguage } from "@/contexts/LanguageContext";
import { Palette, Phone, Sparkles } from "lucide-react";

const DressCodeAndPalette = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-gradient-to-b from-champagne to-cream">
      <div className="max-w-6xl mx-auto px-6">
        {/* Dress Code Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-8 h-8 text-burgundy" />
            </div>
            <h2 className="font-script text-4xl md:text-5xl text-burgundy mb-4">{t("event.dressCode")}</h2>
            <div className="w-24 h-px bg-gradient-primary mx-auto mb-6"></div>
            <p className="font-serif text-xl text-navy/80 max-w-2xl mx-auto">{t("event.dressCodeValue")}</p>
          </div>

          <div className="bg-card rounded-2xl p-8 shadow-soft border border-burgundy/10 max-w-3xl mx-auto">
            <div className="text-center mb-6">
              <span className="inline-block bg-gradient-gold text-burgundy font-serif text-lg px-6 py-2 rounded-full">{t("event.dressCodeTheme")}</span>
            </div>
            <p className="font-sans text-foreground text-center leading-relaxed">{t("event.dressCodeDetails")}</p>
          </div>
        </div>

        {/* Color Palette Section */}
        <div>
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-6">
              <Palette className="w-8 h-8 text-cream" />
            </div>
            <h2 className="font-script text-4xl md:text-5xl text-emerald mb-4">{t("event.colorPaletteTitle")}</h2>
            <div className="w-24 h-px bg-gradient-accent mx-auto mb-6"></div>
          </div>

          <div className="bg-gradient-elegant rounded-2xl p-8 shadow-elegant max-w-3xl mx-auto">
            <div className="text-champagne">
              <p className="font-sans text-lg leading-relaxed mb-4">{t("event.colorPaletteText")}</p>
              <p className="font-serif text-gold text-lg mb-4">{t("event.colorPaletteAvoid")}</p>
              <div className="flex items-center justify-center gap-2 text-champagne/80">
                <Phone className="w-4 h-4" />
                <span className="font-sans">{t("event.colorPaletteContact")}</span>
              </div>
            </div>
          </div>

          {/* Color Swatches */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {[
              { name: "Saphir", color: "#184891" },
              { name: "Rubis", color: "#be1153" },
              { name: "Grenat", color: "#912646" },
              { name: "Émeraude", color: "#17803a" },
              { name: "Topaze", color: "#f1a63e" },
              { name: "Améthyste", color: "#5a1f94" },
            ].map((gem) => (
              <div key={gem.name} className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full border-2 border-cream shadow-lg" style={{ backgroundColor: gem.color }} />
                {/* <span className="font-sans text-xs text-navy/70 mt-2">{gem.name}</span> */}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {[
              { name: "Blerg", color: "#306ecb" },
              { name: "Rubis", color: "#be1153" },
              { name: "Grenat", color: "#912646" },
              { name: "Émeraude", color: "#17803a" },
              { name: "Topaze", color: "#f1a63e" },
              { name: "Améthyste", color: "#5a1f94" },
            ].map((gem) => (
              <div key={gem.name} className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full border-2 border-cream shadow-lg" style={{ backgroundColor: gem.color }} />
                {/* <span className="font-sans text-xs text-navy/70 mt-2">{gem.name}</span> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DressCodeAndPalette;
