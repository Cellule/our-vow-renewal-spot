import React, { createContext, useContext, useState } from "react";

export type Language = "en" | "fr";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

function getLocales() {
  try {
    const theLanguages = window.navigator.languages || [
      window.navigator.language,
    ];
    return [...theLanguages, getLocaleEquivalentFromDateString()];
  } catch (err) {
    // ...
  }
  return [getLocaleEquivalentFromDateString()];
}

function getLocaleEquivalentFromDateString(): Language {
  // dec 13, 2019. We can make sure we'll get 3 different 2-digits numbers. 19, 12, 13.
  const dateToTest = new Date(2019, 11, 13);
  const dateString = dateToTest.toLocaleDateString();

  const indexOfMonth = dateString.indexOf("12");
  const indexOfDate = dateString.indexOf("13");
  const indexOfYear = dateString.indexOf("19");

  if (Math.min(indexOfMonth, indexOfDate, indexOfYear) === indexOfYear) {
    // We have the year first
    return "fr";
  }

  // Month is after date: uk.
  return "en";
}

function getPreferredLanguage(): Language {
  const locales = getLocales();
  if (locales[0]?.toLowerCase().includes("fr")) {
    return "fr";
  }
  return "en";
}

const defaultLanguage = getPreferredLanguage();

const translations = {
  en: {
    // Hero Section
    "hero.saveDate": "Save the Date",
    "hero.renewingVows": "We're Renewing Our Vows",
    "hero.couple": "The Couple",
    "hero.coupleNames": "Andréanne Salvas\nMichaël Ferris",
    "hero.dates": "The Date",
    "hero.datesValue": "September 26th, 2026",
    "hero.location": "The Location",
    "hero.locationValue":
      "Manoir Montpellier\n533 QC-315, Montpellier, QC J0V 1M0",
    "hero.formalInvitation": "Formal invitation to follow",
    "hero.moreDetails": "More Details Coming Soon",

    // Our Story Section
    "story.title": "Our Journey",
    "story.subtitle":
      "Celebrating the love that has grown stronger with each passing year",
    "story.then": "Then",
    "story.thenText":
      "[Share a brief story about when you first got married - what you were like, your hopes and dreams, the early days of your marriage]",
    "story.now": "Now",
    "story.nowText":
      "[Share how you've grown together, what you've learned, and why you're choosing to renew your vows - what this celebration means to you]",
    "story.yearsTitle": "10 Years",
    "story.yearsSubtitle": "of love, laughter & adventure",
    "story.yearsMarried": "Years Married",
    "story.yearsMarriedValue": "10",
    "story.adventures": "Adventures Shared",
    "story.adventuresValue": "Countless",
    "story.love": "Love",
    "story.loveValue": "Infinite",

    // Event Details Section
    "event.title": "Celebration Details",
    "event.subtitle":
      "Join us for an evening of love, renewal, and celebration",
    "event.date": "Date",
    "event.dateValue": "September 26th, 2026",
    "event.dayOfWeek": "Saturday",
    "event.time": "Time",
    "event.timeValue": "[Ceremony Time]",
    "event.reception": "Reception to follow",
    "event.location": "Location",
    "event.locationValue": "[Venue Name]",
    "event.address": "[Address]",
    "event.dressCode": "Dress Code",
    "event.dressCodeValue": "[Dress Code]",
    "event.jewelTones": "Jewel tones encouraged",
    "event.presenceTitle": "Your Presence is Our Present",
    "event.presenceText":
      "We are so grateful for the love and support you've shown us throughout our marriage. Your presence at our vow renewal celebration would make this day even more special.",
    "event.gettingThere": "Getting There",
    "event.gettingThereText":
      "[Include parking information, transportation options, or any special instructions]",
    "event.accommodations": "Accommodations",
    "event.accommodationsText":
      "[Include nearby hotel recommendations or accommodation details if needed]",

    // Contact Section
    "contact.title": "Let's Connect",
    "contact.subtitle": "Questions? We'd love to hear from you",
    "contact.email": "Email Us",
    "contact.emailValue": "[your-email@email.com]",
    "contact.call": "Call Us",
    "contact.callValue": "[Your Phone Number]",
    "contact.text": "Text Us",
    "contact.textValue": "[Your Phone Number]",
    "contact.rsvpTitle": "RSVP Information",
    "contact.rsvpText":
      "Formal invitations with RSVP details will be sent closer to the date. This save the date is to ensure you can mark your calendars!",
    "contact.formalInvitations": "Formal Invitations",
    "contact.formalInvitationsValue": "[Date to be sent]",
    "contact.rsvpDeadline": "RSVP Deadline",
    "contact.rsvpDeadlineValue": "[RSVP Date]",
    "contact.addToCalendar": "Add to Calendar",

    // Footer
    "footer.withLove": "With all our love",
    "footer.names": "Andréanne & Michaël • 2025",
  },
  fr: {
    // Hero Section
    "hero.saveDate": "Réservez la Date",
    "hero.renewingVows": "Nous Renouvelons Nos Vœux",
    "hero.couple": "Le Couple",
    "hero.coupleNames": "Andréanne Salvas\nMichaël Ferris",
    "hero.dates": "La Date",
    "hero.datesValue": "26 septembre 2026",
    "hero.location": "Le Lieu",
    "hero.locationValue":
      "Manoir Montpellier\n533 QC-315, Montpellier, QC J0V 1M0",
    "hero.formalInvitation": "Invitation officielle à suivre",
    "hero.moreDetails": "Plus de Détails Bientôt",

    // Our Story Section
    "story.title": "Notre Parcours",
    "story.subtitle": "Célébrant l'amour qui s'est renforcé au fil des années",
    "story.then": "Alors",
    "story.thenText":
      "[Partagez une brève histoire de votre premier mariage - comment vous étiez, vos espoirs et rêves, les premiers jours de votre mariage]",
    "story.now": "Maintenant",
    "story.nowText":
      "[Partagez comment vous avez grandi ensemble, ce que vous avez appris, et pourquoi vous choisissez de renouveler vos vœux - ce que cette célébration signifie pour vous]",
    "story.yearsTitle": "10 Années",
    "story.yearsSubtitle": "d'amour, de rire et d'aventure",
    "story.yearsMarried": "Années Mariés",
    "story.yearsMarriedValue": "10",
    "story.adventures": "Aventures Partagées",
    "story.adventuresValue": "Innombrables",
    "story.love": "Amour",
    "story.loveValue": "Infini",

    // Event Details Section
    "event.title": "Détails de la Célébration",
    "event.subtitle":
      "Joignez-vous à nous pour une soirée d'amour, de renouveau et de célébration",
    "event.date": "Date",
    "event.dateValue": "26 septembre 2026",
    "event.dayOfWeek": "[Jour de la Semaine]",
    "event.time": "Heure",
    "event.timeValue": "[Heure de la Cérémonie]",
    "event.reception": "Réception à suivre",
    "event.location": "Lieu",
    "event.locationValue": "[Nom du Lieu]",
    "event.address": "[Adresse]",
    "event.dressCode": "Code Vestimentaire",
    "event.dressCodeValue": "[Code Vestimentaire]",
    "event.jewelTones": "Tons de bijoux encouragés",
    "event.presenceTitle": "Votre Présence est Notre Cadeau",
    "event.presenceText":
      "Nous sommes si reconnaissants pour l'amour et le soutien que vous nous avez témoignés tout au long de notre mariage. Votre présence à notre célébration de renouvellement de vœux rendrait cette journée encore plus spéciale.",
    "event.gettingThere": "Comment S'y Rendre",
    "event.gettingThereText":
      "[Inclure les informations de stationnement, les options de transport, ou toute instruction spéciale]",
    "event.accommodations": "Hébergement",
    "event.accommodationsText":
      "[Inclure les recommandations d'hôtels à proximité ou les détails d'hébergement si nécessaire]",

    // Contact Section
    "contact.title": "Restons en Contact",
    "contact.subtitle": "Des questions? Nous aimerions avoir de vos nouvelles",
    "contact.email": "Envoyez-nous un Courriel",
    // "contact.emailValue": "[votre-email@email.com]",
    "contact.call": "Appelez-nous",
    // "contact.callValue": "[Votre Numéro de Téléphone]",
    "contact.text": "Textez-nous",
    // "contact.textValue": "[Votre Numéro de Téléphone]",
    "contact.rsvpTitle": "Information RSVP",
    "contact.rsvpText":
      "Les invitations officielles avec les détails RSVP seront envoyées plus près de la date. Cette réservation de date est pour vous assurer de pouvoir marquer vos calendriers!",
    "contact.formalInvitations": "Invitations Officielles",
    "contact.formalInvitationsValue": "[Date d'envoi]",
    "contact.rsvpDeadline": "Date Limite RSVP",
    "contact.rsvpDeadlineValue": "[Date RSVP]",
    "contact.addToCalendar": "Ajouter au Calendrier",

    // Footer
    "footer.withLove": "Avec tout notre amour",
  },
};

export type Keys = keyof (typeof translations)["en"];

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>(defaultLanguage);

  const t = (key: Keys): string => {
    return translations[language][key] || translations["en"][key];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
