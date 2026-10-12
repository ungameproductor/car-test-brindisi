import type { Metadata } from "next";
import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import { CONTACTS, SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy — Car Test Brindisi",
  description:
    "Informativa sul trattamento dei dati personali di Car Test Brindisi, ai sensi del GDPR e del Codice privacy italiano.",
  robots: { index: false, follow: false },
};

const UPDATED = "12 ottobre 2026";

const INDEX = [
  { href: "#titolare", label: "Titolare del trattamento" },
  { href: "#dati", label: "Dati trattati" },
  { href: "#finalita", label: "Finalità e basi giuridiche" },
  { href: "#raccolta", label: "Come raccogliamo i dati" },
  { href: "#destinatari", label: "Destinatari" },
  { href: "#trasferimenti", label: "Trasferimenti extra UE" },
  { href: "#conservazione", label: "Tempi di conservazione" },
  { href: "#diritti", label: "Diritti dell'interessato" },
  { href: "#cookie", label: "Cookie" },
  { href: "#minori", label: "Minori" },
  { href: "#aggiornamenti", label: "Aggiornamenti" },
];

export default function PrivacyPage() {
  return (
    <>
      <Header visible />
      <main className="legal pt-[calc(4rem+env(safe-area-inset-top))]">
        <article className="wrap max-w-3xl py-16 sm:py-24">
          <h1 className="mb-6 text-ghiaccio">Privacy</h1>
          <p className="text-lg leading-relaxed text-acciaio">
            Informativa sul trattamento dei dati personali, resa ai sensi degli articoli 13 e 14 del
            Regolamento (UE) 2016/679 e del decreto legislativo 30 giugno 2003, n. 196, come
            modificato dal decreto legislativo 10 agosto 2018, n. 101.
          </p>
          <p className="mt-4 text-sm text-acciaio">Ultimo aggiornamento: {UPDATED}.</p>

          <nav aria-label="Indice dell'informativa" className="mt-10 border-t border-acciaio/20 pt-6">
            <p className="mb-2 font-heading text-lg font-semibold text-ghiaccio">In questa pagina</p>
            <ul className="flex flex-col">
              {INDEX.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-flex min-h-11 items-center text-sm text-acciaio underline decoration-acciaio/40 underline-offset-4 hover:text-azzurro"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <Section id="titolare" title="Titolare del trattamento">
            <p>
              Il titolare del trattamento è {SITE.name}, centro revisioni e officina meccanica, con
              sede in {CONTACTS.address}.
            </p>
            <ul>
              <li>
                Email: <Ext href={`mailto:${CONTACTS.email}`}>{CONTACTS.email}</Ext>
              </li>
              <li>Telefono e WhatsApp: {CONTACTS.whatsapp}</li>
              <li>Partita IVA: {CONTACTS.vat}</li>
            </ul>
            <p>
              Un responsabile della protezione dei dati non è nominato, perché l&apos;attività non
              rientra nei casi obbligatori dell&apos;articolo 37 del Regolamento. Le richieste sui
              dati si inviano all&apos;email del titolare. Se un responsabile viene nominato, i
              recapiti saranno pubblicati in questa pagina.
            </p>
          </Section>

          <Section id="dati" title="Dati trattati">
            <p>In base al canale che scegli, il titolare può trattare:</p>
            <ul>
              <li>nome, indirizzo email, numero di telefono e contenuto del messaggio;</li>
              <li>
                dati del veicolo che indichi tu, per esempio targa, modello o difetto. La targa è un
                dato personale quando consente di risalire a una persona;
              </li>
              <li>
                dati tecnici di connessione che il fornitore che ospita il sito può registrare nei
                log di sicurezza: indirizzo IP, data e ora, pagina richiesta, tipo di browser. Servono
                a far funzionare il sito e a proteggerlo, e non sono usati per ricostruire le
                abitudini di navigazione.
              </li>
            </ul>
            <p>
              Il sito non chiede dati particolari, come quelli sulla salute, di cui all&apos;articolo
              9 del Regolamento. Se li inserisci in un messaggio, restano nel trattamento solo per il
              tempo indispensabile a risponderti.
            </p>
            <p>
              Non ci sono iscrizioni a newsletter e i dati di contatto non sono usati per inviare
              pubblicità.
            </p>
          </Section>

          <Section id="finalita" title="Finalità e basi giuridiche">
            <p>
              <strong className="font-medium text-ghiaccio">Richieste di informazioni e appuntamenti.</strong>{" "}
              Se scrivi per un&apos;informazione, un appuntamento, una revisione o un intervento, i
              dati sono trattati per eseguire misure precontrattuali su tua richiesta (articolo 6,
              paragrafo 1, lettera b, del Regolamento).
            </p>
            <p>
              <strong className="font-medium text-ghiaccio">Esecuzione del servizio.</strong> Se la
              richiesta diventa un lavoro in officina, i dati servono a eseguire quel servizio
              (articolo 6, paragrafo 1, lettera b).
            </p>
            <p>
              <strong className="font-medium text-ghiaccio">Obblighi di legge.</strong> I documenti
              contabili e fiscali collegati a un intervento sono conservati per i tempi di legge, in
              particolare l&apos;articolo 2220 del codice civile. Se l&apos;officina esegue una
              revisione, i dati del veicolo e dell&apos;esito sono trattati anche per gli obblighi
              della normativa sulle revisioni e comunicati ai sistemi della Motorizzazione civile
              (articolo 6, paragrafo 1, lettera c).
            </p>
            <p>
              <strong className="font-medium text-ghiaccio">Sicurezza del sito.</strong> I log tecnici
              si basano sul legittimo interesse a mantenere il sito disponibile e sicuro (articolo 6,
              paragrafo 1, lettera f). Puoi opporti a questo trattamento per motivi legati alla tua
              situazione particolare (articolo 21).
            </p>
            <p>
              Il conferimento è facoltativo. Senza un nome e un recapito il titolare non può
              rispondere a quella richiesta.
            </p>
            <p>
              Il titolare non adotta decisioni basate unicamente su un trattamento automatizzato e non
              effettua profilazione (articolo 22).
            </p>
          </Section>

          <Section id="raccolta" title="Come raccogliamo i dati">
            <p>
              <strong className="font-medium text-ghiaccio">Email.</strong> Un messaggio a{" "}
              {CONTACTS.email} arriva nella casella del titolare.
            </p>
            <p>
              <strong className="font-medium text-ghiaccio">WhatsApp.</strong> La chat aperta dal sito
              avviene sull&apos;applicazione di WhatsApp. Il titolare riceve il numero e il testo che
              invii. Da quel momento il trattamento segue anche l&apos;informativa di Meta Platforms,
              titolare autonomo del servizio.
            </p>
            <p>
              <strong className="font-medium text-ghiaccio">Modulo contatti.</strong> Il modulo chiede
              nome, email e messaggio. In questa versione di anteprima il controllo avviene solo nel
              browser: i dati non sono trasmessi a {SITE.name} e non sono conservati. Quando l&apos;invio
              sarà collegato alla casella {CONTACTS.email}, gli stessi dati saranno usati soltanto per
              rispondere, con le basi giuridiche di questa pagina, e l&apos;informativa sarà aggiornata.
            </p>
            <p>
              <strong className="font-medium text-ghiaccio">In officina.</strong> I dati consegnati di
              persona, quando servono per l&apos;intervento o per la revisione, sono trattati per il
              servizio richiesto e per gli obblighi di legge collegati.
            </p>
          </Section>

          <Section id="destinatari" title="Destinatari">
            <p>
              I dati sono conosciuti dalle persone autorizzate che lavorano in officina, nei limiti
              del loro compito.
            </p>
            <p>Il titolare può comunicarli a:</p>
            <ul>
              <li>
                il fornitore della casella email e il fornitore che ospita il sito, quando trattano i
                dati per conto del titolare e secondo le sue istruzioni, nel ruolo di responsabili del
                trattamento (articolo 28);
              </li>
              <li>Meta Platforms, se usi WhatsApp, Instagram o Facebook;</li>
              <li>Google, se apri la mappa dell&apos;indirizzo;</li>
              <li>
                il Portale dell&apos;Automobilista, se lo apri per controllare lo storico delle
                revisioni: i dati inseriti lì sono trattati da quel sito;
              </li>
              <li>
                autorità e pubbliche amministrazioni, quando una norma lo richiede, compresi i sistemi
                della Motorizzazione per le revisioni eseguite.
              </li>
            </ul>
            <p>
              I dati non sono venduti e non sono ceduti per la pubblicità di terzi. I pulsanti di
              Instagram e Facebook portano alle pagine del titolare: aprirli non invia a quei social il
              contenuto del modulo.
            </p>
          </Section>

          <Section id="trasferimenti" title="Trasferimenti fuori dallo Spazio economico europeo">
            <p>
              Il sito non trasferisce verso Paesi extra europei i dati scritti nel modulo o inviati
              all&apos;email del titolare.
            </p>
            <p>
              Se apri WhatsApp, Instagram, Facebook o Google Maps, quei fornitori possono trattare
              dati anche fuori dallo Spazio economico europeo. Il trasferimento avviene secondo il capo
              V del Regolamento, con le garanzie indicate nelle loro informative, tra cui le clausole
              contrattuali tipo della Commissione europea.
            </p>
            <ul>
              <li>
                <Ext href="https://www.facebook.com/privacy/policy/">Informativa di Meta</Ext>
              </li>
              <li>
                <Ext href="https://www.whatsapp.com/legal/privacy-policy-eea">
                  Informativa di WhatsApp per lo Spazio economico europeo
                </Ext>
              </li>
              <li>
                <Ext href="https://policies.google.com/privacy">Informativa di Google</Ext>
              </li>
              <li>
                <Ext href={CONTACTS.portalRevisioni}>Portale dell&apos;Automobilista</Ext>
              </li>
            </ul>
          </Section>

          <Section id="conservazione" title="Tempi di conservazione">
            <ul>
              <li>
                Richieste che non diventano un intervento: per il tempo necessario a rispondere e a
                gestire i chiarimenti, e comunque entro 24 mesi dall&apos;ultimo messaggio, salvo un
                obbligo di legge con un termine più lungo.
              </li>
              <li>
                Documenti di un intervento e scritture contabili: per il tempo previsto dalla legge, in
                genere 10 anni (articolo 2220 del codice civile).
              </li>
              <li>
                Log tecnici di sicurezza: per il tempo necessario a proteggere il sito, di regola non
                oltre 12 mesi, senza uso per profilazione.
              </li>
            </ul>
            <p>Al termine i dati sono cancellati o resi anonimi.</p>
          </Section>

          <Section id="diritti" title="Diritti dell'interessato">
            <p>Puoi chiedere al titolare:</p>
            <ul>
              <li>l&apos;accesso ai dati (articolo 15);</li>
              <li>la rettifica (articolo 16);</li>
              <li>la cancellazione (articolo 17);</li>
              <li>la limitazione del trattamento (articolo 18);</li>
              <li>
                la portabilità dei dati che hai fornito, quando il trattamento è automatizzato e si
                basa sul contratto o sul consenso (articolo 20);
              </li>
              <li>l&apos;opposizione al trattamento basato sul legittimo interesse (articolo 21).</li>
            </ul>
            <p>
              La richiesta è gratuita e non richiede formule particolari. Si invia a{" "}
              <Ext href={`mailto:${CONTACTS.email}`}>{CONTACTS.email}</Ext>. Il titolare risponde entro
              un mese. Se la richiesta è complessa, il termine può essere prorogato di due mesi e la
              proroga viene comunicata (articolo 12 del Regolamento).
            </p>
            <p>
              Se ritieni che il trattamento violi la normativa, puoi proporre reclamo al Garante per la
              protezione dei dati personali (articolo 77 del Regolamento e articoli 140-bis e seguenti
              del Codice).
            </p>
            <ul>
              <li>Garante per la protezione dei dati personali, Piazza Venezia 11, 00187 Roma</li>
              <li>
                <Ext href="https://www.garanteprivacy.it/diritti/come-agire-per-tutelare-i-tuoi-dati-personali/reclamo">
                  Come presentare un reclamo
                </Ext>
              </li>
              <li>
                PEC: <Ext href="mailto:protocollo@pec.gpdp.it">protocollo@pec.gpdp.it</Ext> (solo da
                posta elettronica certificata)
              </li>
            </ul>
            <p>Resta salvo il diritto di rivolgerti all&apos;autorità giudiziaria (articolo 79 del Regolamento).</p>
          </Section>

          <Section id="cookie" title="Cookie e altri strumenti di tracciamento">
            <p>
              Questa sezione integra l&apos;informativa ai sensi dell&apos;articolo 122 del Codice e
              delle Linee guida del Garante del 10 giugno 2021.
            </p>
            <p>
              Il sito non installa cookie di profilazione, cookie analitici di terze parti né pixel
              pubblicitari. Il banner di consenso non è presente perché non ci sono strumenti per cui
              il consenso è richiesto.
            </p>
            <p>
              I caratteri sono distribuiti dal sito stesso: la visita non invia dati a Google per
              caricarli.
            </p>
            <p>
              I link verso WhatsApp, Instagram, Facebook, Google Maps e il Portale
              dell&apos;Automobilista si aprono solo se li scegli. Prima di quel passaggio quei siti non
              ricevono i tuoi dati da queste pagine.
            </p>
            <p>
              Se in seguito saranno aggiunti cookie diversi da quelli tecnici strettamente necessari, il
              consenso sarà chiesto prima di attivarli e questa pagina sarà aggiornata.
            </p>
          </Section>

          <Section id="minori" title="Minori">
            <p>
              Il sito descrive servizi rivolti a chi guida o fa revisionare un veicolo. Il titolare non
              raccoglie consapevolmente dati di minori di 14 anni (articolo 2-quinquies del Codice). Se
              un genitore o chi esercita la responsabilità genitoriale segnala un invio di questo tipo,
              i dati sono cancellati.
            </p>
          </Section>

          <Section id="aggiornamenti" title="Aggiornamenti">
            <p>
              Se cambiano le finalità, i destinatari o gli strumenti del sito, questa pagina e la data
              in alto sono aggiornate. La versione pubblicata qui è quella applicabile.
            </p>
          </Section>
        </article>
      </main>
      <Footer />
      <WhatsAppFab visible />
    </>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="mt-12 scroll-mt-24 border-t border-acciaio/15 pt-8">
      <h2 className="mb-4 text-ghiaccio">{title}</h2>
      <div className="flex flex-col gap-4 text-base leading-relaxed text-acciaio [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-5 [&_ul]:marker:text-azzurro">
        {children}
      </div>
    </section>
  );
}

function Ext({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-ghiaccio underline decoration-acciaio/50 underline-offset-4 hover:text-azzurro"
    >
      {children}
    </a>
  );
}
