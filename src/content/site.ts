/** ─── Dati del sito Car Test Brindisi ────────────────────────────
 *  Tutti i contenuti del mockup sono qui.
 *  Per il passaggio ai contenuti veri, basta sostituire i valori.
 * ──────────────────────────────────────────────────────────────── */

export const WHATSAPP = "https://wa.me/393284187050";
export const PORTALE_REVISIONI =
  "https://www.ilportaledellautomobilista.it/interrogazionistoricorevisioni/spa/";

export const SITE = {
  name: "Car Test Brindisi",
  description: "Centro revisioni auto e moto e officina meccanica a Brindisi.",
  url: "https://www.cartestbrindisi.it/",
  logo: "https://www.cartestbrindisi.it/brand/logo-trim.png",
  telephone: "+393284187050",
  whatsappDisplay: "+39 328 418 7050",
  email: "info@cartestbrindisi.it",
  streetAddress: "Viale Spagna 24/30",
  addressLocality: "Brindisi",
  addressRegion: "BR",
  addressCountry: "IT",
  vat: "02490370745",
  instagram: "https://www.instagram.com/cartest.brindisi/",
  facebook: "https://www.facebook.com/CarTestBrindisi",
} as const;

export function buildAutoRepairJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": `${SITE.url}#attivita`,
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    logo: SITE.logo,
    image: SITE.logo,
    telephone: SITE.telephone,
    email: SITE.email,
    vatID: `IT${SITE.vat}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.streetAddress,
      addressLocality: SITE.addressLocality,
      addressRegion: SITE.addressRegion,
      addressCountry: SITE.addressCountry,
    },
    areaServed: { "@type": "City", name: SITE.addressLocality },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "13:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "14:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "13:00",
      },
    ],
    sameAs: [SITE.instagram, SITE.facebook],
  };
}

export const CONTACTS = {
  email: SITE.email,
  whatsapp: SITE.whatsappDisplay,
  whatsappLink: WHATSAPP,
  instagram: SITE.instagram,
  facebook: SITE.facebook,
  portalRevisioni: PORTALE_REVISIONI,
  address: `${SITE.streetAddress}, ${SITE.addressLocality}`,
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Viale%20Spagna%2024%2F30%2C%20Brindisi",
  hours: [
    "Lunedì–venerdì: 8:00–13:00 e 14:00–17:00. Revisioni fino alle 18:00.",
    "Sabato: 8:00–13:00.",
  ],
  vat: SITE.vat,
};

export const SERVICES: {
  id: string;
  title: string;
  description: string;
  icon: string;
  featured?: boolean;
}[] = [
  {
    id: "revisioni",
    title: "Revisioni",
    description:
      "Revisione periodica per auto e moto, con controlli eseguiti secondo normativa.",
    icon: "ClipboardCheck",
    featured: true,
  },
  {
    id: "meccanica",
    title: "Meccanica",
    description:
      "Tagliandi, riparazioni e manutenzione ordinaria e straordinaria.",
    icon: "Wrench",
  },
  {
    id: "diagnosi",
    title: "Diagnosi di ultima generazione",
    description:
      "Lettura degli errori e controllo dei sistemi del veicolo con strumentazione aggiornata.",
    icon: "Cpu",
  },
  {
    id: "fap",
    title: "Pulizia FAP",
    description:
      "Pulizia del filtro antiparticolato per ripristinarne l'efficienza.",
    icon: "Wind",
  },
  {
    id: "aria",
    title: "Ricarica aria condizionata",
    description:
      "Controllo e ricarica dell'impianto per tornare a viaggiare al fresco.",
    icon: "Thermometer",
  },
];

export const TEAM = [
  {
    id: 1,
    name: "Nome Cognome",
    role: "Titolare",
    bio: "Segue la gestione del centro e il rapporto con chi porta l'auto o la moto in officina.",
  },
  {
    id: 2,
    name: "Nome Cognome",
    role: "Responsabile officina",
    bio: "Coordina il lavoro in officina e i controlli previsti per la revisione.",
  },
  {
    id: 3,
    name: "Nome Cognome",
    role: "Tecnico revisioni",
    bio: "Si occupa della diagnosi e della strumentazione usata sui veicoli.",
  },
  {
    id: 4,
    name: "Nome Cognome",
    role: "Meccanico",
    bio: "Esegue tagliandi, manutenzione e riparazioni di meccanica.",
  },
];

export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?sca_esv=95a3924c91beb42b&sxsrf=APpeQnuDt48U17t0hXKL4jj6hWKeXQXwFw:1791882045235&q=car+test+brindisi&si=APenkKm7iecQ4G6P-TsbSMFKIQtv3EFIqRAFw-i8uEbk55Z-_zwKQi4Poop_BwO9vhVi_AYNVFwB4tCZ2T8ZWKSCry2rKQT7_CS833MjwqGb2BC_-TbkgBo%3D&uds=AJ5uw1_rUfMqrtZe7QfpdFGwaPC3zrgRQmTJ8X06rMrY5IML0-2sUCF7E_H35WF1hSLgx8PQ7MT9mOWgrCnnBB_6Gdy3bbYP1FKGINSEElcGTfQSCps1TPA&sa=X&ved=2ahUKEwjYjqTm0LaXAxXr1QIHHbf-G5UQ3PALegQIHxAE&biw=1502&bih=814&dpr=2#sv=CAESowIKjwISjAIKzAFBSmlUNHRMOWFzbUF1WUlpRTZCWnY5Z01QcllFenFMaXdRUFRNU29FWTFCZ1NkSTRXLWM5UGp0NnNBT19pSjdMeXc2ZzJJNXFZSnJCMlpTSXhaejItQ3NNUU1URGt4MUZkV29FVzItUzJNbG5xS1FlRmpHOWZaVnBtWUhUbWx1TXRFaG1rZlQyWTRaeXdPRVlIZ2tKVDM4dmM4TWFZYkl6RU92dERDcUtBdk43S2ZudnU5dDBaSzIwUXFycm81UkpEMVZvLWJpb1UtdTASF1F2UE5hdnFSSXZ1Qzc3NFBwWUtad0FrGiJBRHNyOWZTMHNtOEpYWHlhZUZ1c2w3MElIZHExdExvNnlnEgQ4MTE0GgEzKgAwADgBQAAYACCJuIGTDkoCEAE";

export const REVIEWS = [
  {
    id: "giuliano",
    author: "Giuliano",
    source: "Google",
    rating: 5,
    when: "3 mesi fa",
    quote:
      "Un'officina fantastica gestita da due ragazzi splendidi. Alessio e Marco uniscono una grande competenza a un'onestà e una disponibilità rare da trovare oggi. Sono veramente persone di cuore. Consigliatissimi!",
  },
  {
    id: "emanuele",
    author: "Emanuele",
    source: "Google",
    rating: 5,
    when: "4 mesi fa",
    quote:
      "Ottima esperienza, da quando hanno cambiato gestione l’aria di cambiamento si sente ed in questo caso ha portato solo ottime novità! Alessio e Marco sono stati super competenti e professionali, ci torneremo sicuramente. Consigliati.",
  },
  {
    id: "erika",
    author: "Erika",
    source: "Google",
    rating: 5,
    when: "1 mese fa",
    quote:
      "Ho lasciato la mia A1 per fare un cambio di catena. Comprato i pezzi, i ragazzi hanno fatto un ottimo lavoro, durante la settimana di ferragosto ad un prezzo davvero competitivo. Grazie mille!",
  },
  {
    id: "giancarlo",
    author: "Giancarlo",
    source: "Google",
    rating: 5,
    when: "6 mesi fa",
    quote:
      "Personale altamente qualificato. Ho avuto un problema alla mia auto e mi hanno risolto il problema in pochissimo tempo. Veloci anche nelle revisioni.",
  },
  {
    id: "nicole",
    author: "Nicole",
    source: "Google",
    rating: 5,
    when: "2 mesi fa",
    quote:
      "Un ambiente giovane e dinamico, gentilissimi e soprattutto pazienti! Super consigliato.",
  },
];

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/chi-siamo", label: "Chi siamo" },
  { href: "/gallery", label: "Gallery" },
];
