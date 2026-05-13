import { useLanguage } from "@/contexts/LanguageContext";
import { Briefcase, Gift, Droplets, Shirt, Waves as WavesIcon } from "lucide-react";

const PackingListAndGifts = () => {
  const { t } = useLanguage();

  const packingItems = [
    { key: "soap", icon: Droplets },
    { key: "shampoo", icon: Shirt },
    { key: "swimsuit", icon: WavesIcon },
    { key: "towel", icon: WavesIcon },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-champagne to-cream">
      <div className="max-w-6xl mx-auto px-6">
        {/* Packing List Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-8 h-8 text-cream" />
            </div>
            <h2 className="font-script text-4xl md:text-5xl text-navy mb-4">{t("packing.title")}</h2>
            <div className="w-24 h-px bg-gradient-secondary mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {packingItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.key}
                  className="bg-card rounded-xl p-4 shadow-soft border border-burgundy/10 flex items-center gap-4"
                >
                  <div className="w-10 h-10 bg-gradient-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-cream" />
                  </div>
                  <span className="font-sans text-foreground">
                    {t(`packing.${item.key}`)}
                  </span>
                </div>
              );
            })}
          </div>

          <p className="font-sans text-center text-muted-foreground mt-6 italic">
            {t("packing.spaNote")}
          </p>
        </div>

        {/* Gift Section */}
        <div>
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-6">
              <Gift className="w-8 h-8 text-burgundy" />
            </div>
            <h2 className="font-script text-4xl md:text-5xl text-burgundy mb-4">{t("gift.title")}</h2>
          </div>

          <div className="bg-gradient-elegant rounded-2xl p-10 shadow-elegant max-w-2xl mx-auto">
            <p className="font-serif text-xl text-champagne text-center leading-relaxed">
              {t("gift.text")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackingListAndGifts;