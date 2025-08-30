import { useLanguage } from "@/contexts/LanguageContext";

const OurStory = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-20 bg-gradient-to-b from-cream to-champagne">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-script text-5xl md:text-6xl text-burgundy mb-6">
            {t('story.title')}
          </h2>
          <div className="w-24 h-px bg-gradient-primary mx-auto mb-8"></div>
          <p className="font-serif text-xl md:text-2xl text-navy/80 max-w-2xl mx-auto leading-relaxed">
            {t('story.subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="bg-card/80 backdrop-blur-sm rounded-xl p-8 shadow-soft border border-burgundy/10">
              <h3 className="font-serif text-2xl text-burgundy mb-4">{t('story.then')}</h3>
              <p className="font-sans text-foreground/80 leading-relaxed">
                {t('story.thenText')}
              </p>
            </div>
            
            <div className="bg-card/80 backdrop-blur-sm rounded-xl p-8 shadow-soft border border-emerald/10">
              <h3 className="font-serif text-2xl text-emerald mb-4">{t('story.now')}</h3>
              <p className="font-sans text-foreground/80 leading-relaxed">
                {t('story.nowText')}
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-elegant rounded-2xl p-12 text-center shadow-elegant">
              <div className="text-cream">
                <div className="mb-8">
                  <span className="font-script text-4xl md:text-5xl block mb-2">
                    {t('story.yearsTitle')}
                  </span>
                  <p className="font-serif text-xl">{t('story.yearsSubtitle')}</p>
                </div>
                
                <div className="space-y-4 font-sans">
                  <div className="flex justify-between items-center py-2 border-b border-cream/20">
                    <span>{t('story.yearsMarried')}</span>
                    <span className="font-semibold">{t('story.yearsMarriedValue')}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-cream/20">
                    <span>{t('story.adventures')}</span>
                    <span className="font-semibold">{t('story.adventuresValue')}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-cream/20">
                    <span>{t('story.love')}</span>
                    <span className="font-semibold">{t('story.loveValue')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;