import { Home, UtensilsCrossed, BedDoubleIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsWeekend } from "@/hooks/use-is-weekend";

const EventDetails = () => {
  const { t } = useLanguage();
  const isWeekend = useIsWeekend();
  
  return (
    <section className="py-20 bg-gradient-to-b from-champagne to-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-script text-5xl md:text-6xl text-burgundy mb-6">
            {t('event.title')}
          </h2>
          <div className="w-24 h-px bg-gradient-primary mx-auto mb-8"></div>
          {/* <p className="font-serif text-xl text-navy/80 max-w-2xl mx-auto">
            {t('event.subtitle')}
          </p> */}
        </div>
        
        {/* <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-card rounded-2xl p-8 text-center shadow-soft border border-burgundy/10 hover:shadow-elegant transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-8 h-8 text-cream" />
            </div>
            <h3 className="font-serif text-xl text-burgundy mb-4">{t('event.date')}</h3>
            <p className="font-sans text-foreground font-semibold text-lg mb-2">
              {isWeekend ? t('event.dateValueWeekend') : t('event.dateValue')}
            </p>
            <p className="font-sans text-muted-foreground">
              {isWeekend ? t('event.dayOfWeekWeekend') : t('event.dayOfWeek')}
            </p>
          </div>
          
          <div className="bg-card rounded-2xl p-8 text-center shadow-soft border border-emerald/10 hover:shadow-elegant transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-8 h-8 text-cream" />
            </div>
            <h3 className="font-serif text-xl text-emerald mb-4">{t('event.time')}</h3>
            <p className="font-sans text-foreground font-semibold text-lg mb-2">{t('event.timeValue')}</p>
            <p className="font-sans text-muted-foreground">{t('event.reception')}</p>
          </div>
          
          <div className="bg-card rounded-2xl p-8 text-center shadow-soft border border-navy/10 hover:shadow-elegant transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-8 h-8 text-cream" />
            </div>
            <h3 className="font-serif text-xl text-navy mb-4">{t('event.location')}</h3>
            <p className="font-sans text-foreground font-semibold text-lg mb-2">{t('event.locationValue')}</p>
            <p className="font-sans text-muted-foreground text-sm">{t('event.address')}</p>
          </div>
          
          <div className="bg-card rounded-2xl p-8 text-center shadow-soft border border-gold/20 hover:shadow-elegant transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-burgundy" />
            </div>
            <h3 className="font-serif text-xl text-burgundy mb-4">{t('event.dressCode')}</h3>
            <p className="font-sans text-foreground font-semibold text-lg mb-2">{t('event.dressCodeValue')}</p>
            <p className="font-sans text-muted-foreground text-sm">{t('event.jewelTones')}</p>
          </div>
        </div> */}
        
        {/* <div className="mt-16 bg-gradient-elegant rounded-2xl p-12 text-center shadow-elegant">
          <div className="max-w-3xl mx-auto text-cream">
            <h3 className="font-script text-4xl md:text-5xl mb-6">
              {t('event.presenceTitle')}
            </h3>
            <p className="font-serif text-lg md:text-xl mb-8 leading-relaxed">
              {t('event.presenceText')}
            </p>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div>
                <h4 className="font-serif text-xl mb-4 text-gold">{t('event.gettingThere')}</h4>
                <p className="font-sans text-champagne">
                  {t('event.gettingThereText')}
                </p>
              </div>
              <div>
                <h4 className="font-serif text-xl mb-4 text-gold">{t('event.accommodations')}</h4>
                <p className="font-sans text-champagne">
                  {t('event.accommodationsText')}
                </p>
              </div>
            </div>
          </div>
        </div> */}

        {/* Accommodations & Meals Section */}
        <div className="mt-16 bg-card rounded-2xl p-12 shadow-soft border border-burgundy/10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Home className="w-8 h-8 text-cream" />
              </div>
              <h3 className="font-script text-4xl md:text-5xl text-burgundy mb-4">
                {t('event.accommodationsMealsTitle')}
              </h3>
              <div className="w-24 h-px bg-gradient-primary mx-auto mb-6"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Accommodations */}
              <div className="bg-gradient-elegant/50 rounded-xl p-6 border border-cream/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <BedDoubleIcon className="w-6 h-6 text-cream" />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl text-burgundy mb-2">
                      {t('event.accommodations')}
                    </h4>
                    <p className="font-sans text-foreground">
                      {t('event.accommodationsProvided')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Meals */}
              <div className="bg-gradient-elegant/50 rounded-xl p-6 border border-cream/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <UtensilsCrossed className="w-6 h-6 text-cream" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-serif text-xl text-emerald mb-3">
                      {t('event.meals')}
                    </h4>
                    <ul className="space-y-2 font-sans text-foreground">
                      {isWeekend && (
                        <li className="flex items-center gap-2">
                          <span className="text-emerald">•</span>
                          <span>{t('event.fridayBarbecue')}</span>
                        </li>
                      )}
                      <li className="flex items-center gap-2">
                        <span className="text-emerald">•</span>
                        <span>{t('event.saturdayDinner')}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-emerald">•</span>
                        <span>{t('event.sundayBrunch')}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* More details coming note */}
            <div className="mt-8 text-center">
              <p className="font-sans text-sm text-muted-foreground italic">
                {t('event.moreDetailsComing')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;