import { PORTALE_REVISIONI, WHATSAPP } from "@/content/site";

export type FaqStatus = "ready" | "draft";
export type FaqCategory = "revisione" | "centro-servizi" | "dove-prenotare";

export interface FaqItem {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
  link?: { label: string; href: string };
  status: FaqStatus;
  /** Solo interna: non va mai mostrata né inclusa nel markup. */
  note?: string;
}

export const FAQ_LAST_CHECKED = "2026-10-12";
export const FAQ_SHOW_DRAFTS = true;
export const FAQ_DRAFT_LABEL = "Da confermare con il centro";

const ITALIAN_MONTHS = [
  "gennaio",
  "febbraio",
  "marzo",
  "aprile",
  "maggio",
  "giugno",
  "luglio",
  "agosto",
  "settembre",
  "ottobre",
  "novembre",
  "dicembre",
] as const;

export const FAQ_CATEGORIES: { id: FaqCategory; title: string }[] = [
  { id: "revisione", title: "Regole e costi della revisione" },
  { id: "centro-servizi", title: "Il centro e i servizi" },
  { id: "dove-prenotare", title: "Dove siamo e come prenotare" },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "ogni-quanto-revisione",
    category: "revisione",
    status: "ready",
    question: "Ogni quanto va fatta la revisione di auto e moto?",
    answer:
      "La prima revisione va fatta entro quattro anni dalla prima immatricolazione, poi ogni due anni, entro l'ultimo giorno del mese di immatricolazione o dell'ultima revisione. La stessa cadenza vale per auto, moto, scooter e ciclomotori.",
  },
  {
    id: "scadenza-revisione",
    category: "revisione",
    status: "ready",
    question: "Come faccio a sapere quando scade la mia revisione?",
    answer:
      "La data della prossima revisione è riportata sul talloncino adesivo sul retro della carta di circolazione. In alternativa puoi controllare lo storico delle revisioni del veicolo sul Portale dell'Automobilista.",
    link: {
      label: "Verifica se la tua revisione è scaduta",
      href: PORTALE_REVISIONI,
    },
  },
  {
    id: "costo-revisione",
    category: "revisione",
    status: "draft",
    question: "Quanto costa la revisione dell'auto?",
    answer:
      "In un centro privato autorizzato la tariffa di legge per la revisione di un'autovettura è di 79,02 euro, uguale in tutta Italia e comprensiva di IVA e diritti di Motorizzazione. Per moto, scooter e altri veicoli [PREZZO: da confermare con il centro].",
    note: "Un aumento a 88,20 euro è stato discusso ma, secondo le fonti consultate, non era in vigore ad agosto 2026. Riverificare la tariffa prima di pubblicare.",
  },
  {
    id: "revisione-scaduta",
    category: "revisione",
    status: "ready",
    question: "Cosa rischio se circolo con la revisione scaduta?",
    answer:
      "Si rischia una sanzione amministrativa da 173 a 694 euro, che può raddoppiare se la revisione è stata omessa più di una volta. Per evitarlo, prenota la revisione prima della fine del mese di scadenza.",
    link: { label: "Scrivici su WhatsApp", href: WHATSAPP },
  },
  {
    id: "esito-negativo",
    category: "revisione",
    status: "ready",
    question: "Cosa succede se il veicolo non supera la revisione?",
    answer:
      "Se i controlli rilevano difetti gravi, la revisione ha esito «da ripetere» o negativo: il veicolo va sistemato prima di una nuova revisione. Con la pre-revisione gratuita le anomalie emergono prima e si possono riparare in anticipo.",
    note: "Chiedere al cliente se la ripetizione si paga.",
  },
  {
    id: "cosa-portare",
    category: "revisione",
    status: "draft",
    question: "Cosa devo portare per la revisione?",
    answer:
      "Porta la carta di circolazione del veicolo. [ALTRI DOCUMENTI E DELEGHE: da confermare con il centro].",
  },
  {
    id: "durata-revisione",
    category: "revisione",
    status: "draft",
    question: "Quanto dura la revisione?",
    answer: "[DURATA MEDIA E TEMPI DI ATTESA: da confermare con il centro].",
  },
  {
    id: "veicoli-revisionati",
    category: "centro-servizi",
    status: "ready",
    question: "Quali veicoli revisionate?",
    answer:
      "Revisioniamo autoveicoli, quadricicli, tricicli, moto, minicar, quad e veicoli atipici fino a 3,5 tonnellate.",
  },
  {
    id: "centro-autorizzato",
    category: "centro-servizi",
    status: "ready",
    question: "Car Test è un centro autorizzato dalla Motorizzazione Civile?",
    answer:
      "Sì. Car Test è un centro autorizzato dalla Motorizzazione Civile, con attrezzature per eseguire i controlli previsti dalla normativa sulla revisione.",
    note: "Chiedere il numero di autorizzazione da poter citare.",
  },
  {
    id: "pre-revisione",
    category: "centro-servizi",
    status: "ready",
    question: "La pre-revisione è gratuita?",
    answer:
      "Sì. La pre-revisione è un controllo preliminare, gratuito, che serve a capire se il veicolo è idoneo prima della revisione ufficiale e a valutare in anticipo eventuali riparazioni.",
  },
  {
    id: "ritiro-domicilio",
    category: "centro-servizi",
    status: "ready",
    question: "Fate il ritiro e la riconsegna dell'auto a domicilio?",
    answer:
      "Sì, per la revisione periodica il ritiro e la riconsegna del veicolo a domicilio sono gratuiti. Contattaci per concordare la data.",
    note: "Chiedere zone e veicoli coperti.",
  },
  {
    id: "lavori-meccanica",
    category: "centro-servizi",
    status: "ready",
    question: "Che lavori di meccanica fate?",
    answer:
      "Facciamo riparazioni di meccanica leggera, tagliandi completi, sostituzione di dischi e pastiglie dei freni, cambio olio e filtri e altre riparazioni meccaniche. Offriamo anche diagnosi di ultima generazione, pulizia del FAP e ricarica dell'aria condizionata.",
  },
  {
    id: "preventivo-gratuito",
    category: "centro-servizi",
    status: "ready",
    question: "Il preventivo per le riparazioni è gratuito?",
    answer:
      "Sì. Porta il veicolo in officina e ti facciamo un preventivo gratuito sugli interventi necessari.",
  },
  {
    id: "ricambi",
    category: "centro-servizi",
    status: "ready",
    question: "Vendete ricambi per auto e moto?",
    answer: "Sì, vendiamo ricambi per auto e moto di ogni marca.",
  },
  {
    id: "tagliando-garanzia",
    category: "centro-servizi",
    status: "draft",
    question: "Posso fare il tagliando da voi senza perdere la garanzia della casa auto?",
    answer:
      "[RISPOSTA: da confermare con il centro (marchi seguiti, ricambi utilizzati, condizioni di garanzia)].",
    note: "Non affermare nulla di legale senza conferma del cliente.",
  },
  {
    id: "fap-aria-condizionata",
    category: "centro-servizi",
    status: "draft",
    question: "Quanto costano la pulizia del FAP e la ricarica dell'aria condizionata?",
    answer: "[PREZZI O MODALITÀ DI PREVENTIVO: da confermare con il centro].",
  },
  {
    id: "dove-prenotare",
    category: "dove-prenotare",
    status: "ready",
    question: "Dove si trova Car Test e come si prenota la revisione?",
    answer:
      "Car Test è a Brindisi, in Viale Spagna 24/30. Per prenotare la revisione puoi scriverci su WhatsApp o chiamare il centro: trovi i recapiti nella sezione Contatti.",
    link: { label: "Scrivici su WhatsApp", href: WHATSAPP },
  },
  {
    id: "orari",
    category: "dove-prenotare",
    status: "ready",
    question: "Quali sono gli orari di apertura?",
    answer:
      "Dal lunedì al venerdì il centro è aperto dalle 8:00 alle 13:00 e dalle 14:00 alle 17:00, con revisioni fino alle 18:00. Il sabato è aperto dalle 8:00 alle 13:00.",
  },
];

export function formatFaqCheckedLabel(isoDate: string) {
  const [year, month] = isoDate.split("-");
  const monthName = ITALIAN_MONTHS[Number(month) - 1];
  if (!year || !monthName) return isoDate;
  return `Informazioni aggiornate a ${monthName} ${year}.`;
}

export function getVisibleFaqItems(limit?: number) {
  const items = FAQ_SHOW_DRAFTS
    ? FAQ_ITEMS
    : FAQ_ITEMS.filter((item) => item.status === "ready");
  return typeof limit === "number" ? items.slice(0, limit) : items;
}

export function buildFaqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items
      .filter((item) => item.status === "ready")
      .map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
  };
}
