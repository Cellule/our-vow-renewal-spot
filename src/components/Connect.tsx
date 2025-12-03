import { Mail, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { createEvent, EventAttributes } from "ics";
import { useIsWeekend } from "@/hooks/use-is-weekend";

const coupleNames = "Andréanne & Michaël";
const organizerEmail = "mike.ferris@hotmail.com";

const Connect = () => {
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
  const isWeekend = useIsWeekend();

  const eventDetails = {
    title: t("contact.addToCalendarTitle"),
    description: `${t("event.subtitle")}`,
    location: t("hero.locationValue"),
    startTime: isWeekend ? "2026-09-18T15:00:00" : "2026-09-19T09:00:00", // September 18th at 15:00 (weekend) or 19th (regular) at 9:00 AM
    endTime: "2026-09-20T11:00:00", // September 20th, 2026 at 11:00 AM (brunch for everyone)
  };
  const addToGoogleCalendar = () => {
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      eventDetails.title
    )}&details=${encodeURIComponent(
      eventDetails.description
    )}&location=${encodeURIComponent(
      eventDetails.location.replace("\n", ", ")
    )}&dates=${eventDetails.startTime.replace(
      /[-:]/g,
      ""
    )}/${eventDetails.endTime.replace(/[-:]/g, "")}`;
    window.open(googleCalendarUrl, "_blank");
  };

  const addToOutlook = () => {
    const outlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(
      eventDetails.title
    )}&body=${encodeURIComponent(
      eventDetails.description
    )}&location=${encodeURIComponent(eventDetails.location)}&startdt=${
      eventDetails.startTime
    }&enddt=${eventDetails.endTime}`;
    window.open(outlookUrl, "_blank");
  };

  const downloadICSFile = () => {
    // Create and download .ics file using the ics package
    const startDate = new Date(eventDetails.startTime);
    const endDate = new Date(eventDetails.endTime);
    
    // Convert Date objects to DateArray format [year, month, day, hour, minute]
    // Note: month is 1-12 in DateArray (not 0-11 like JavaScript Date)
    const start: [number, number, number, number, number] = [
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      startDate.getDate(),
      startDate.getHours(),
      startDate.getMinutes(),
    ];
    
    const end: [number, number, number, number, number] = [
      endDate.getFullYear(),
      endDate.getMonth() + 1,
      endDate.getDate(),
      endDate.getHours(),
      endDate.getMinutes(),
    ];
    
    const event: EventAttributes = {
      start,
      end,
      startInputType: 'local' as const,
      startOutputType: 'local' as const,
      endInputType: 'local' as const,
      endOutputType: 'local' as const,
      title: eventDetails.title,
      description: eventDetails.description,
      location: eventDetails.location.replace(/\n/g, ", "),
      status: 'CONFIRMED' as const,
      busyStatus: 'BUSY' as const,
      organizer: { name: coupleNames, email: organizerEmail },
    };

    createEvent(event, (error, value) => {
      if (error) {
        console.error('Error creating ICS file:', error);
        return;
      }

      if (value) {
        const blob = new Blob([value], { type: 'text/calendar' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'vow-renewal-event.ics';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
    });
  };

  return (
    <div className="bg-gradient-elegant rounded-2xl p-12 text-center shadow-elegant">
      <div className="text-cream">
        {/* Add to Calendar Section */}
          <h3 className="font-serif text-4xl mb-6 text-cream">
            {t("contact.addToCalendar")}
          </h3>
          <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {/* Google Calendar Button */}
            <Button
              size="lg"
              variant="outline"
              className="bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-800 border-2 border-white hover:border-gray-200 transition-all duration-300 font-sans font-semibold px-6 py-4 h-auto flex flex-col items-center gap-3"
              onClick={addToGoogleCalendar}
            >
              <svg className="w-8 h-8" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Google Calendar</span>
            </Button>

            {/* Outlook Button */}
            <Button
              size="lg"
              variant="outline"
              className="bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-800 border-2 border-white hover:border-gray-200 transition-all duration-300 font-sans font-semibold px-6 py-4 h-auto flex flex-col items-center gap-3"
              onClick={addToOutlook}
            >
              <svg className="w-8 h-8" viewBox="0 0 24 24">
                <path
                  fill="#0078D4"
                  d="M19 3H5C3.89 3 3 3.89 3 5V19C3 20.11 3.89 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.89 20.11 3 19 3M19 19H5V9H19V19M19 7H5V5H19V7M7 11H12V16H7V11Z"
                />
                <path fill="#0078D4" d="M15 11H9V13H15V11Z" />
                <path fill="#0078D4" d="M15 14H9V16H15V14Z" />
                <path fill="#0078D4" d="M12 8H9V10H12V8Z" />
              </svg>
              <span>Outlook</span>
            </Button>

            {/* Apple Calendar Button */}
            <Button
              size="lg"
              variant="outline"
              className="bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-800 border-2 border-white hover:border-gray-200 transition-all duration-300 font-sans font-semibold px-6 py-4 h-auto flex flex-col items-center gap-3"
              onClick={downloadICSFile}
            >
              <svg className="w-8 h-8" viewBox="0 0 24 24">
                <path
                  fill="#000000"
                  d="M19 3H5C3.89 3 3 3.89 3 5V19C3 20.11 3.89 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.89 20.11 3 19 3M19 19H5V9H19V19M19 7H5V5H19V7M7 11H12V16H7V11Z"
                />
              </svg>
              <span>Apple Calendar (.ics)</span>
            </Button>
        </div>
      </div>
    </div>
  );
}
