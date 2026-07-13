export type WeddingEventType = "nikah" | "dugun";

export type WeddingEvent = {
  type: WeddingEventType;
  title: string;
  date: string;
  displayDate: string;
  time: string;
  endTime: string;
  venue: string;
  address?: string;
  mapUrl: string;
  countdownTitle: string;
  envelopeText: string;
  calendarTitle: string;
};

export type WeddingInvitationOption = {
  title: string;
  envelopeText: string;
  countdownTitle: string;
  calendarTitle: string;
};

export const weddingConfig = {
  couple: {
    bride: "Burcu",
    groom: "Alperen",
    displayName: "Burcu & Alperen",
    initials: "B & A"
  },
  common: {
    fullDate: "19 Eylül 2026, Cumartesi",
    invitationText:
      "Bu mutlu günümüzde sizleri aramızda görmekten büyük mutluluk duyarız.",
    artworkPath: "/images/burcu-alperen-main.png",
    artworkAlt: "Burcu ve Alperen düğün illüstrasyonu",
    copyright: "© 2026 U. Gülgeze. Tüm hakları saklıdır."
  },
  labels: {
    rsvp: "Katılım Bilgisi Ver",
    rsvpDone: "Katılım Bilgisi Alındı",
    calendar: "Takvime Ekle",
    directions: "Yol Tarifi Al",
    backToInvitation: "Davetiye Sayfasına Dön"
  },
  nikah: {
    type: "nikah",
    title: "Nikah Töreni",
    date: "2026-09-19",
    displayDate: "19 Eylül 2026, Cumartesi",
    time: "16:00",
    endTime: "17:00",
    venue: "Karşıyaka Evlendirme Dairesi",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Kar%C5%9F%C4%B1yaka%20Evlendirme%20Dairesi",
    countdownTitle: "Nikaha kalan süre",
    envelopeText: "Davetiyenizi açmak için dokunun",
    calendarTitle: "Burcu & Alperen Nikah Töreni"
  },
  dugun: {
    type: "dugun",
    title: "Düğün",
    date: "2026-09-19",
    displayDate: "19 Eylül 2026, Cumartesi",
    time: "18:30",
    endTime: "00:00",
    venue: "My Terrace Event",
    address: "My Plaza, Adalet, Anadolu Cd. No.41/1 D:2 Kat, 35530 Bayraklı/İzmir, Türkiye",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=My%20Terrace%20Event%20My%20Plaza%20Adalet%20Anadolu%20Cd.%20No.41%2F1%20Bayrakl%C4%B1%20%C4%B0zmir",
    countdownTitle: "Düğüne kalan süre",
    envelopeText: "Davetiyenizi açmak için dokunun",
    calendarTitle: "Burcu & Alperen Düğün"
  },
  invitations: {
    nikah: {
      title: "Nikah Töreni",
      envelopeText: "Davetiyenizi açmak için dokunun",
      countdownTitle: "Nikaha kalan süre",
      calendarTitle: "Burcu & Alperen Nikah Töreni"
    },
    nikahVeDugun: {
      title: "Nikah ve Düğün",
      envelopeText: "Davetiyenizi açmak için dokunun",
      countdownTitle: "Nikaha kalan süre",
      calendarTitle: "Burcu & Alperen Nikah ve Düğün"
    }
  }
} satisfies {
  couple: {
    bride: string;
    groom: string;
    displayName: string;
    initials: string;
  };
  common: {
    fullDate: string;
    invitationText: string;
    artworkPath: string;
    artworkAlt: string;
    copyright: string;
  };
  labels: {
    rsvp: string;
    rsvpDone: string;
    calendar: string;
    directions: string;
    backToInvitation: string;
  };
  nikah: WeddingEvent;
  dugun: WeddingEvent;
  invitations: {
    nikah: WeddingInvitationOption;
    nikahVeDugun: WeddingInvitationOption;
  };
};
