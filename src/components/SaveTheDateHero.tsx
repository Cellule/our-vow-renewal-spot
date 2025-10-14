import heroImage from "@/assets/hero-image.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const SaveTheDateHero = () => {
  const { t } = useLanguage();
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-burgundy/60 via-burgundy/40 to-navy/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="font-script text-6xl md:text-8xl lg:text-9xl text-cream mb-4 drop-shadow-lg">
            {t('hero.saveDate')}
          </h1>
          <div className="w-32 h-px bg-gradient-gold mx-auto mb-6"></div>
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-champagne mb-6">
            {t('hero.renewingVows')}
          </h2>
        </div>

        <div className="bg-cream/10 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-cream/20 shadow-elegant">
          <div className="grid md:grid-cols-2 gap-8 text-cream">
            <div>
              <h3 className="font-serif text-xl md:text-2xl mb-4 text-gold">
                {t('hero.couple')}
              </h3>
              <p className="font-sans text-lg md:text-xl font-medium whitespace-pre-line">
                {t('hero.coupleNames')}
              </p>
            </div>
            <div>
              <h3 className="font-serif text-xl md:text-2xl mb-4 text-gold">
                {t('hero.dates')}
              </h3>
              <p className="font-sans text-lg md:text-xl font-medium">
                {t('hero.datesValue')}
              </p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-cream/20">
            <h3 className="font-serif text-xl md:text-2xl mb-4 text-gold">
              {t('hero.location')}
            </h3>
            <p className="font-sans text-lg md:text-xl font-medium text-cream whitespace-pre-line">
              {t('hero.locationValue')}
            </p>
          </div>

          <div className="mt-8 pt-8 border-t border-cream/20">
            <p className="font-sans text-sm md:text-base text-champagne mb-6">
              {t('hero.formalInvitation')}
            </p>
            {/* <div className="bg-amber-50/20 backdrop-blur-sm rounded-lg p-6 border border-amber-200/30">
              {/* <p className="font-sans text-base md:text-lg text-amber-100 font-medium leading-relaxed mb-4">
                {t('hero.addressCallout')}
              </p> 
              <a
                href="https://forms.google.com/your-form-url"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-gold/20 hover:bg-gold/30 text-gold font-medium rounded-lg border border-gold/30 hover:border-gold/50 transition-all duration-200 hover:shadow-lg"
              >
                {t('hero.googleFormLink')}
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div> */}
            <a
                href="https://forms.google.com/your-form-url"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-gold/20 hover:bg-gold/30 text-gold font-medium rounded-lg border border-gold/30 hover:border-gold/50 transition-all duration-200 hover:shadow-lg"
              >
                {t('hero.googleFormLink')}
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
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
