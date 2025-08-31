import { Mail, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const Connect = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-gradient-to-b from-background to-champagne">
      <div className="max-w-4xl mx-auto px-6">
        {/* <ContactInfo /> */}
        <RSVPInfo />
      </div>
    </section>
  );
};

export default Connect;

function ContactInfo() {
  const { t } = useLanguage();
  return (
    <>
      <div className="text-center mb-16">
        <h2 className="font-script text-5xl md:text-6xl text-burgundy mb-6">
          {t("contact.title")}
        </h2>
        <div className="w-24 h-px bg-gradient-primary mx-auto mb-8"></div>
        <p className="font-serif text-xl text-navy/80 max-w-2xl mx-auto">
          {t("contact.subtitle")}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-card rounded-2xl p-8 text-center shadow-soft border border-burgundy/10 hover:shadow-elegant transition-all duration-300">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-cream" />
          </div>
          <h3 className="font-serif text-xl text-burgundy mb-4">
            {t("contact.email")}
          </h3>
          <p className="font-sans text-foreground font-semibold">
            {t("contact.emailValue")}
          </p>
        </div>

        <div className="bg-card rounded-2xl p-8 text-center shadow-soft border border-emerald/10 hover:shadow-elegant transition-all duration-300">
          <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-6">
            <Phone className="w-8 h-8 text-cream" />
          </div>
          <h3 className="font-serif text-xl text-emerald mb-4">
            {t("contact.call")}
          </h3>
          <p className="font-sans text-foreground font-semibold">
            {t("contact.callValue")}
          </p>
        </div>

        <div className="bg-card rounded-2xl p-8 text-center shadow-soft border border-navy/10 hover:shadow-elegant transition-all duration-300">
          <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="w-8 h-8 text-cream" />
          </div>
          <h3 className="font-serif text-xl text-navy mb-4">
            {t("contact.text")}
          </h3>
          <p className="font-sans text-foreground font-semibold">
            {t("contact.textValue")}
          </p>
        </div>
      </div>
    </>
  );
}

function RSVPInfo() {
  const { t } = useLanguage();
  return (
    <div className="bg-gradient-elegant rounded-2xl p-12 text-center shadow-elegant">
      <div className="text-cream">
        <h3 className="font-script text-4xl md:text-5xl mb-6">
          {t("contact.rsvpTitle")}
        </h3>
        <p className="font-serif text-lg md:text-xl mb-8 leading-relaxed max-w-2xl mx-auto">
          {t("contact.rsvpText")}
        </p>
        <div className="space-y-4 font-sans max-w-md mx-auto">
          <div className="flex justify-between items-center py-3 px-6 bg-cream/10 rounded-lg border border-cream/20">
            <span>{t("contact.formalInvitations")}</span>
            <span className="font-semibold">
              {t("contact.formalInvitationsValue")}
            </span>
          </div>
          <div className="flex justify-between items-center py-3 px-6 bg-cream/10 rounded-lg border border-cream/20">
            <span>{t("contact.rsvpDeadline")}</span>
            <span className="font-semibold">
              {t("contact.rsvpDeadlineValue")}
            </span>
          </div>
        </div>
        <div className="mt-8">
          <Button
            size="lg"
            className="bg-gradient-gold hover:shadow-glow transition-all duration-300 font-sans font-semibold text-burgundy px-8 py-3"
          >
            {t("contact.addToCalendar")}
          </Button>
        </div>
      </div>
    </div>
  );
}
