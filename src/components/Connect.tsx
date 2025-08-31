import { Mail, Phone, MessageCircle, Calendar } from "lucide-react";
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
  const { t, language } = useLanguage();

  const addToCalendar = () => {
    // Event details using language context
    const eventDetails = {
      title: t("hero.renewingVows"),
      description: `${t("hero.coupleNames")} - ${t("event.subtitle")}`,
      location: t("hero.locationValue"),
      startTime: "2026-09-26T18:00:00", // September 26th, 2026 at 6:00 PM
      endTime: "2026-09-26T23:00:00", // September 26th, 2026 at 11:00 PM
    };

    // Create calendar event URLs for different services
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.title)}&details=${encodeURIComponent(eventDetails.description)}&location=${encodeURIComponent(eventDetails.location)}&dates=${eventDetails.startTime.replace(/[-:]/g, '')}/${eventDetails.endTime.replace(/[-:]/g, '')}`;
    
    const outlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(eventDetails.title)}&body=${encodeURIComponent(eventDetails.description)}&location=${encodeURIComponent(eventDetails.location)}&startdt=${eventDetails.startTime}&enddt=${eventDetails.endTime}`;
    
    const appleCalendarUrl = `data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ADTSTART:${eventDetails.startTime.replace(/[-:]/g, '')}%0ADTEND:${eventDetails.endTime.replace(/[-:]/g, '')}%0ASUMMARY:${encodeURIComponent(eventDetails.title)}%0ADESCRIPTION:${encodeURIComponent(eventDetails.description)}%0ALOCATION:${encodeURIComponent(eventDetails.location)}%0AEND:VEVENT%0AEND:VCALENDAR`;

    // Show options to user
    const userChoice = window.confirm(
      language === "fr" 
        ? "Choisissez votre service de calendrier:\n\nCliquez sur OK pour Google Calendar\nCliquez sur Annuler pour plus d'options"
        : "Choose your calendar service:\n\nClick OK for Google Calendar\nClick Cancel to see more options"
    );

    if (userChoice) {
      // Open Google Calendar
      window.open(googleCalendarUrl, '_blank');
    } else {
      // Show more options
      const choice = window.prompt(
        language === "fr"
          ? "Choisissez votre service de calendrier:\n\n1. Google Calendar\n2. Outlook\n3. Apple Calendar (télécharger fichier .ics)\n\nEntrez 1, 2 ou 3:"
          : "Choose your calendar service:\n\n1. Google Calendar\n2. Outlook\n3. Apple Calendar (download .ics file)\n\nEnter 1, 2, or 3:"
      );

      switch (choice) {
        case "1":
          window.open(googleCalendarUrl, '_blank');
          break;
        case "2":
          window.open(outlookUrl, '_blank');
          break;
        case "3": {
          // Create and download .ics file for Apple Calendar
          const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${eventDetails.startTime.replace(/[-:]/g, '')}
DTEND:${eventDetails.endTime.replace(/[-:]/g, '')}
SUMMARY:${eventDetails.title}
DESCRIPTION:${eventDetails.description}
LOCATION:${eventDetails.location}
END:VEVENT
END:VCALENDAR`;
          
          const blob = new Blob([icsContent], { type: 'text/calendar' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'vow-renewal-event.ics';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
          break;
        }
        default:
          // Cancel, do nothing
          break;
      }
    }
  };

  return (
    <div className="bg-gradient-elegant rounded-2xl p-12 text-center shadow-elegant">
      <div className="text-cream">
        <h3 className="font-script text-4xl md:text-5xl mb-6">
          {t("contact.rsvpTitle")}
        </h3>
        <p className="font-serif text-lg md:text-xl mb-8 leading-relaxed max-w-2xl mx-auto">
          {t("contact.rsvpText")}
        </p>
        {/* <div className="space-y-4 font-sans max-w-md mx-auto">
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
        </div> */}
        <div className="mt-8">
          <Button
            size="lg"
            className="bg-gradient-gold hover:shadow-glow transition-all duration-300 font-sans font-semibold text-burgundy px-8 py-3"
            onClick={addToCalendar}
          >
            <Calendar className="w-5 h-5 mr-2" />
            {t("contact.addToCalendar")}
          </Button>
        </div>
      </div>
    </div>
  );
}
