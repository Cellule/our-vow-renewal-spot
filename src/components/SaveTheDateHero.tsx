import heroImage from "@/assets/hero-image.jpg";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsWeekend } from "@/hooks/use-is-weekend";
import { HouseHeart, MapPin } from "lucide-react";

const SaveTheDateHero = () => {
  const { t } = useLanguage();
  const isWeekend = useIsWeekend();

  return (
    <section className="relative py-6 md:py-12 min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-burgundy/60 via-burgundy/40 to-navy/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 md:px-6 max-w-4xl mx-auto w-full">
        <div className="mb-4 md:mb-8">
          <h1 className="font-script text-4xl md:text-8xl lg:text-9xl text-cream mb-2 md:mb-4 drop-shadow-lg">{t("hero.saveDate")}</h1>
          <div className="w-24 md:w-32 h-px bg-gradient-gold mx-auto mb-3 md:mb-6"></div>
          <h2 className="font-serif text-xl md:text-3xl lg:text-4xl text-champagne mb-4 md:mb-6">{t("hero.coupleNames")}</h2>
        </div>

        <div className="bg-cream/10 backdrop-blur-md rounded-2xl p-4 md:p-8 lg:p-12 border border-cream/20 shadow-elegant mb-4 md:mb-8">
          <div className="text-cream">
            <div>
              <h3 className="font-serif text-lg md:text-xl lg:text-2xl mb-2 md:mb-4 text-gold">{t("hero.dates")}</h3>
              <p className="font-sans text-base md:text-lg lg:text-xl font-medium">{isWeekend ? t("hero.datesValueWeekend") : t("hero.datesValue")}</p>
            </div>
          </div>

          <div className="mt-4 md:mt-8 pt-4 md:pt-8 border-t border-cream/20">
            <h3 className="font-serif text-lg md:text-xl lg:text-2xl mb-2 md:mb-4 text-gold">{t("hero.location")}</h3>
            <p className="font-sans text-base md:text-lg lg:text-xl font-medium text-cream whitespace-pre-line mb-2 md:mb-3">{t("hero.locationValue")}</p>
            <a
              href="https://www.manoirmontpellier.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-cream hover:text-champagne font-medium transition-colors duration-200 underline underline-offset-4 decoration-cream/40 hover:decoration-cream/60"
            >
              <HouseHeart className="w-4 h-4" />
              manoirmontpellier.com
            </a>
            <br />
            <a
              href="https://www.google.com/maps/search/?api=1&query=Manoir+Montpellier,+533+QC-315,+Montpellier,+QC+J0V+1M0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-cream hover:text-champagne font-medium transition-colors duration-200 underline underline-offset-4 decoration-cream/40 hover:decoration-cream/60"
            >
              <MapPin className="w-4 h-4" />
              {t("hero.viewOnGoogleMaps")}
            </a>
          </div>

          <div className="mt-4 md:mt-8 pt-4 md:pt-8 border-t border-cream/20">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScJ-25Zw3FPnANJ4ktoPVl57bvBwpDfR0WfHFqJ5sIseeVJTA/viewform?usp=dialog"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-gold/50 hover:bg-gold/60 text-cream font-semibold text-base md:text-lg rounded-lg border-2 border-gold/70 hover:border-gold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              {t("hero.googleFormLink")}
              <svg className="w-4 md:w-5 h-4 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border-2 border-gold/30 rounded-full animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-16 h-16 border-2 border-emerald/30 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-20 w-12 h-12 border border-cream/20 rotate-45 animate-pulse delay-500"></div>
    </section>
  );
};

export default SaveTheDateHero;
