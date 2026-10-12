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
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.streetAddress,
      addressLocality: SITE.addressLocality,
      addressRegion: SITE.addressRegion,
      addressCountry: SITE.addressCountry,
    },
    areaServed: { "@type": "City", name: SITE.addressLocality },
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
  vat: "[da fornire]",
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

// 9 elementi con rapporti d'aspetto misti: 4:3, 1:1, 3:4
export const GALLERY_ITEMS = [
  { id: 1, aspect: "4/3" as const, label: "Foto fornita dal cliente" },
  { id: 2, aspect: "1/1" as const, label: "Foto fornita dal cliente" },
  { id: 3, aspect: "3/4" as const, label: "Foto fornita dal cliente" },
  { id: 4, aspect: "4/3" as const, label: "Foto fornita dal cliente" },
  { id: 5, aspect: "3/4" as const, label: "Foto fornita dal cliente" },
  { id: 6, aspect: "1/1" as const, label: "Foto fornita dal cliente" },
  { id: 7, aspect: "1/1" as const, label: "Foto fornita dal cliente" },
  { id: 8, aspect: "4/3" as const, label: "Foto fornita dal cliente" },
  { id: 9, aspect: "3/4" as const, label: "Foto fornita dal cliente" },
];

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/chi-siamo", label: "Chi siamo" },
  { href: "/gallery", label: "Gallery" },
];
