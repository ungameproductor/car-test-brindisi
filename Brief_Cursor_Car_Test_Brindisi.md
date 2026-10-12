# Brief per Cursor: mockup sito Car Test Brindisi

Documento operativo per l'agente di sviluppo. Leggilo tutto prima di scrivere codice. Dove trovi valori numerici (px, percentuali, durate) sono punti di partenza da rifinire a vista, non vincoli rigidi.

---

## 1. Cosa si deve costruire

Un **mockup navigabile** del sito di **Car Test Brindisi** (centro revisioni e officina meccanica, auto e moto), da mostrare al cliente prima dello sviluppo vero.

- È una **vetrina**: nessun backend, nessuna API route, nessun database, nessuna variabile d'ambiente, nessun invio reale di email.
- **Solo il logo è reale.** Tutto il resto (foto, team, testi descrittivi, immagini della gallery) è segnaposto, e deve *sembrare* un segnaposto onesto.
- L'elemento memorabile è l'**intro della homepage**: un garage chiuso con il logo al centro; scrollando la serranda si apre, la camera entra nel garage e compare il sito.
- Pagine: **Home**, **Chi siamo**, **Gallery** (tre schermate in totale).

Il dominio `cartestbrindisi.it` esiste già con un sito da rifare: **non va collegato né toccato**. Il mockup vive su un URL temporaneo (`*.vercel.app`).

---

## 2. Asset forniti

### Logo (reale, unico asset vero)

| Dato | Valore |
| --- | --- |
| File originale | `Logo_transparent.png`, 512×512, sfondo trasparente |
| Area visibile | x 6–507, y 146–346 (501×200 px, rapporto circa 2,5:1). Il resto del canvas è margine trasparente |
| File pronto all'uso | `logo-cartest-trim.png` (509×208, stesso logo ritagliato dei margini, pixel invariati) |
| Colore azzurro | circa `#42B4E8` |
| Colore bianco | circa `#F8F8F8` |

Come usarlo:

- Copia entrambi in `public/brand/` (`logo-original.png`, `logo-trim.png`). Usa **`logo-trim.png`** per header, footer, intro e favicon, così non devi gestire i margini.
- Le scritte "CAR" e "CENTRO REVISIONI / OFFICINA MECCANICA" sono **bianche con contorno scuro**: su sfondo chiaro quasi spariscono. **Il sito è quindi scuro per necessità**, e il logo non va mai messo su fondi chiari.
- Consentito: scalare in proporzione, ombra esterna sottile (`drop-shadow`) o bagliore esterno.
- Vietato: ridisegnarlo, ricolorarlo, deformarlo, applicare filtri che ne alterino i colori, convertirlo in SVG "approssimato".
- Favicon: ricava un'icona dalla sola silhouette dell'auto del logo (ritaglio del logo, non ridisegno).

### Contenuti reali dal cliente (da usare così come sono)

- Servizi: revisioni, meccanica, diagnosi di ultima generazione, pulizia FAP, ricarica aria condizionata. Si lavora su **auto e moto**.
- Email: `info@cartestbrindisi.it`
- WhatsApp: +39 328 418 7050 (link `https://wa.me/393284187050`)
- Instagram: `https://www.instagram.com/cartest.brindisi/`
- Portale revisioni: `https://www.ilportaledellautomobilista.it/interrogazionistoricorevisioni/spa/`

I link esterni sono link normali (`target="_blank"`, `rel="noopener noreferrer"`), non funzionalità del sito.

---

## 3. Stack e vincoli tecnici

- **Next.js** (App Router) + **TypeScript** + **Tailwind CSS**, ultime versioni stabili.
- **GSAP** con **ScrollTrigger** (pacchetto `gsap` + `@gsap/react`) per l'intro, **Lenis** per lo scroll fluido, **lucide-react** per le icone.
- Font con `next/font/google`: **Barlow Condensed** (titoli) e **Barlow** (testo).
- Niente altre librerie di animazione, niente Three.js: l'intro si fa con CSS 3D + GSAP (spiegato sotto).
- Immagini con `next/image`. Nessun video, nessun asset pesante.
- Contenuti in un unico file `src/content/site.ts` (servizi, team, gallery, contatti), così il passaggio ai contenuti veri è una sostituzione di dati.
- `robots: { index: false, follow: false }` nei metadata e `public/robots.txt` con `Disallow: /`. Titolo: "Car Test Brindisi | Centro revisioni e officina meccanica".
- Nessun analytics, nessun cookie, nessun tracciamento.

---

## 4. Direzione visiva

Concept: **officina di notte con le luci accese**. Superfici da grafite blu, l'azzurro del logo come unica luce di accento, tipografia da cartellonistica stradale e targhe.

### Palette (dal logo)

| Nome | Hex | Uso |
| --- | --- | --- |
| Asfalto | `#0F151C` | Sfondo base |
| Lamiera | `#17202A` | Superfici, card, serranda |
| Acciaio | `#8B9AAA` | Testo secondario, bordi, linee |
| Azzurro Car Test | `#42B4E8` | Accento, CTA primaria, luci (dal logo) |
| Ghiaccio | `#F5F9FC` | Testo principale |
| Azzurro scuro | `#2C9BD0` | Hover/pressed dell'accento |

Testo scuro su azzurro: usa Asfalto `#0F151C` (contrasto circa 8:1). Rispetta contrasto AA ovunque.

### Tipografia

- **Barlow Condensed** 600/700 per titoli e numeri grandi. Ispirata alla cartellonistica stradale e alle targhe, quindi pertinente per un centro revisioni. Titoli in *sentence case*, grandi, interlinea stretta (circa 1.0–1.05).
- **Barlow** 400/500 per il testo, 17–18 px su desktop, righe sotto gli 70 caratteri.
- Scala suggerita (desktop): H1 clamp(3rem, 7vw, 6rem), H2 clamp(2.25rem, 4vw, 3.5rem), H3 1.5rem, testo 1.0625rem.

### Principi

1. **Un solo momento memorabile: l'intro del garage.** Tutto il resto è sobrio, ordinato, allineato a sinistra su una griglia solida.
2. **Forma ricorrente:** angolo tagliato a 45° (chamfer) su un solo angolo di card e pulsanti, via `clip-path`. Richiama targhe e lamiera. Un solo raggio/forma per tutto il sito, non mescolare.
3. **Il pulsante "Verifica se la tua revisione è scaduta"** è l'azione principale del sito. Nella banda dedicata può avere forma di **targa** (rettangolo bianco con angoli lievemente arrotondati e fascia azzurra a sinistra), senza simboli o sigle ufficiali.
4. **Movimento:** oltre all'intro, solo transizioni di hover/focus brevi (150–200 ms) e il menu mobile. **Niente fade-and-slide-up su ogni sezione**, niente parallasse sparsa.
5. Interfaccia in italiano, tono diretto: verbi semplici, CTA che dicono cosa succede.

### Da evitare (segni tipici di un sito "generato")

- Etichette in MAIUSCOLO spaziato sopra ogni titolo, stringhe di meta-dati con puntini centrali, frecce `→` appese ai pulsanti.
- Numerazione 01/02/03 sui servizi (non sono una sequenza).
- Una sola parola colorata o in corsivo dentro un titolo.
- Card tutte uguali con ombra grigia morbida e raggio grande; sfondi sfumati decorativi.
- Nero puro o grigi neutri: usa i valori della palette.

---

## 5. Intro della homepage: garage che si apre allo scroll

Questa è la parte più delicata. Costruiscila in un componente isolato `GarageIntro`, con la hero del sito **nello stesso contenitore pinnato**, dietro l'intro, in modo che il passaggio sia una dissolvenza continua e non uno scroll verso la sezione successiva.

### 5.1 Storyboard

```
 0%                  25%                   55%                    90–100%
┌───────────────┐   ┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓ │   │ ▓▓▓▓▓▓▓▓▓▓▓▓▓ │   │ ░░░░░░░░░░░░░ │   │  HERO DEL SITO │
│ ▓ ┌───────┐ ▓ │   │ ▓ ┌───────┐ ▓ │   │ ░ ┌───────┐ ░ │   │  titolo, CTA,  │
│ ▓ │ LOGO  │ ▓ │   │ ▓ │▒▒▒▒▒▒▒│ ▓ │   │ ░ │       │ ░ │   │  header visibile│
│ ▓ └───────┘ ▓ │   │ ▓ └───────┘ ▓ │   │ ░ └───────┘ ░ │   │                │
│ garage chiuso │   │ serranda sale │   │ camera entra  │   │ flash e hero   │
└───────────────┘   └───────────────┘   └───────────────┘   └───────────────┘
```

### 5.2 Timeline (progresso dello scroll da 0 a 1)

| Progresso | Cosa succede |
| --- | --- |
| 0 – 0,08 | Garage chiuso, logo al centro sulla serranda. L'indicazione "Scorri per aprire il garage" è visibile e svanisce subito. |
| 0,08 – 0,38 | La serranda sale (`yPercent` 0 → -100, ease `power2.inOut`) portando con sé il logo. Si accende una fessura di luce sul bordo inferiore e una pozza di luce si allarga sul pavimento davanti all'ingresso. |
| 0,30 – 0,85 | La **camera avanza**: il contenitore 3D `world` si muove in `z` da 0 a circa 1150 px (ease `power2.in`). La facciata supera la camera, i piani dell'interno scorrono ai lati, le linee del pavimento corrono verso lo spettatore. |
| 0,80 – 0,92 | Flash di luce: overlay con gradiente radiale azzurro-bianco, opacità 0 → 0,85. |
| 0,88 – 1,00 | L'intero layer intro va a `autoAlpha: 0` rivelando la hero sotto. Compaiono testi hero, header e pulsante WhatsApp flottante. Fine del pin: da qui in poi scroll normale. |

Lunghezza dello scroll pinnato: **`+=450%`** su desktop, **`+=320%`** su mobile (`gsap.matchMedia`).

### 5.3 Struttura (riferimento)

```tsx
<section id="stage" className="relative h-[100svh] overflow-hidden bg-asfalto">
  {/* Sotto: hero reale del sito (h1 incluso, quindi accessibile e indicizzabile) */}
  <Hero />

  {/* Sopra: intro decorativa, aria-hidden */}
  <div id="intro" aria-hidden="true" className="absolute inset-0">
    <div className="scene">           {/* perspective: 1200px; perspective-origin: 50% 58% */}
      <div className="world">         {/* transform-style: preserve-3d; will-change: transform */}
        <Interior />                  {/* piani a z negativo */}
        <Facade>                      {/* piano a z = 0 */}
          <div className="doorway">   {/* overflow: hidden */}
            <Door logo />             {/* 6 pannelli + logo */}
          </div>
        </Facade>
      </div>
    </div>
    <div className="flash" />
    <ScrollHint />
  </div>
</section>
```

### 5.4 Cosa disegnare (tutto vettoriale: CSS, gradienti, SVG. Nessuna foto)

**Facciata (z = 0)**
- Parete in lamiera scura (`Lamiera`) con grana leggerissima (SVG `feTurbulence` in data-URI, opacità bassa).
- Apertura centrale: larghezza `min(62vw, 1000px)` e rapporto circa 16:11 su desktop, `88vw` su mobile, appoggiata a terra.
- Sopra l'apertura una sottile **striscia LED azzurra**. Sotto la facciata un tratto di asfalto/cemento, un po' più chiaro, dove arriva la pozza di luce.
- Costruiscila con quattro rettangoli attorno all'apertura (architrave, due pilastri, soglia) così i piani dell'interno restano visibili attraverso.

**Serranda**
- 6 pannelli orizzontali con nervature leggere, bordo luminoso di 1 px in alto e ombra in basso, finitura metallica satinata (gradiente), colore tra `Lamiera` e `Asfalto`.
- **Logo reale (`logo-trim.png`) centrato**, circa 52% della larghezza della serranda, con ombra esterna sottile. Il logo sale insieme alla serranda.
- Opzionale per realismo: leggero sfasamento tra i pannelli mentre salgono.

**Interno (piani a z negativo, camera tipo stanza più larga della porta)**
- Pareti laterali, pavimento, soffitto e parete di fondo (circa z = -1000 px). La parete di fondo deve essere **sovradimensionata** (ad esempio 160vw × 140vh) così a fine corsa riempie lo schermo.
- Soffitto: 4 strisce luminose (azzurro-bianco) lungo la profondità, con alone.
- Pavimento: resina scura con riflessi e una linea guida; le linee prospettiche scorrono con `backgroundPosition` animato.
- Fondo: sagoma stilizzata di un'auto su un ponte sollevatore e pannello portautensili a puntini. Sagome semplici in SVG, tono su tono, nessun dettaglio fotografico.
- La hero deve avere **lo stesso sfondo/gradiente** della parete di fondo, per rendere invisibile il passaggio.

### 5.5 Schema GSAP (riferimento, non da copiare alla cieca)

```ts
gsap.registerPlugin(ScrollTrigger, useGSAP);

// Lenis + ScrollTrigger: sincronizzazione obbligatoria
const lenis = new Lenis({ lerp: 0.1 });
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((t) => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);

const mm = gsap.matchMedia();

mm.add("(prefers-reduced-motion: no-preference)", () => {
  const isMobile = window.innerWidth < 768;

  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: "#stage",
      start: "top top",
      end: isMobile ? "+=320%" : "+=450%",
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  tl.to(".scroll-hint", { autoAlpha: 0, duration: 0.05 }, 0)
    .to(".door", { yPercent: -100, ease: "power2.inOut", duration: 0.30 }, 0.08)
    .fromTo(".light-spill", { opacity: 0, scaleY: 0.4 }, { opacity: 1, scaleY: 1, duration: 0.30 }, 0.08)
    .to(".world", { z: 1150, ease: "power2.in", duration: 0.55, force3D: true }, 0.30)
    .to(".floor-lines", { backgroundPositionY: "+=600px", duration: 0.55 }, 0.30)
    .to(".flash", { opacity: 0.85, duration: 0.12 }, 0.80)
    .to("#intro", { autoAlpha: 0, duration: 0.12 }, 0.88)
    .fromTo(".hero-reveal", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.12 }, 0.88)
    .to(".site-header, .whatsapp-fab", { autoAlpha: 1, duration: 0.08 }, 0.92);
});

// Reduced motion: nessuna intro. Mostra direttamente la hero, header e FAB visibili.
mm.add("(prefers-reduced-motion: reduce)", () => { /* stato finale statico */ });
```

Assicurati che la timeline duri esattamente 1 (l'ultimo tween finisce a 1,00) così le percentuali della tabella corrispondono.

### 5.6 Dettagli che fanno la differenza

- `history.scrollRestoration = "manual"` e `window.scrollTo(0, 0)` al mount: ricaricando la pagina l'intro riparte sempre dall'inizio.
- Pulsante discreto **"Salta intro"** in alto a destra (usa `lenis.scrollTo` fino alla fine del pin). Serve in presentazione al cliente.
- Header, nav e pulsante WhatsApp flottante partono nascosti (`autoAlpha: 0`, `pointer-events: none`) e compaiono a fine intro.
- Tornando alla Home da un'altra pagina con la navigazione interna, **non** rigiocare l'intro (flag a livello di modulo `introPlayed`). Il ricaricamento della pagina la fa ripartire.
- Anima solo `transform` e `opacity`. Evita `filter: blur` animati e box-shadow animate. `contain: layout paint` sui layer pesanti.
- Non usare immagini raster scalate molto: tutto vettoriale, così resta nitido. L'unico raster è il logo, che esce di scena prima dello zoom forte.
- Mobile: porta con la stessa timeline, apertura più larga, durata più corta, nessun effetto aggiuntivo. Prova su iPhone Safari (viewport dinamico: usa `svh`/`dvh`, non `vh`).
- **Piano B** se il CSS 3D dà problemi su Safari iOS: sostituisci la `translateZ` con uno `scale` del contenitore (da 1 a circa 7) con `transform-origin` al centro dell'apertura, e dai ai layer dell'interno `scale` diversi per simulare la profondità.
- L'intro è decorativa: `aria-hidden="true"`, nessun contenuto informativo solo lì dentro.

---

## 6. Pagine e contenuti

Regola generale sui testi: **bozza credibile ma senza fatti inventati**. Niente anni di attività, numeri, premi, recensioni, prezzi, orari, indirizzo, nomi veri. Dove manca un dato scrivi in chiaro `[da fornire]`.

### 6.1 Header e footer (su tutte le pagine)

- **Header** (fisso): logo a sinistra (link alla Home), menu `Home`, `Chi siamo`, `Gallery`, pulsante `Scrivici su WhatsApp`. Su mobile menu a scomparsa (hamburger) accessibile da tastiera.
- **Footer**: logo, link alle tre pagine, pulsanti Instagram e WhatsApp, email, riga "P.IVA [da fornire]" e una nota discreta: **"Anteprima grafica: foto, testi e dati sono segnaposto."**
- **Pulsante WhatsApp flottante** in basso a destra (link `wa.me`), visibile dopo l'intro.

### 6.2 Home (dopo l'intro)

1. **Hero**
   - H1: "Centro revisioni e officina meccanica a Brindisi"
   - Sottotitolo: "Auto e moto: revisioni, meccanica e diagnosi con strumenti di ultima generazione."
   - CTA primaria: **Verifica se la tua revisione è scaduta** (link esterno al Portale dell'Automobilista).
   - CTA secondaria: **Scrivici su WhatsApp**.
2. **Servizi** ("Cosa facciamo")
   - Cinque card: Revisioni, Meccanica, Diagnosi di ultima generazione, Pulizia FAP, Ricarica aria condizionata. Ognuna con icona lucide, titolo e una riga di descrizione bozza.
   - Griglia asimmetrica: la card "Revisioni" più grande, le altre più piccole. Non numerarle.
   - Fascia "Lavoriamo su auto e moto" con due icone semplici (auto, moto).
3. **Banda revisione**
   - Titolo: "Non ricordi quando scade la tua revisione?"
   - Pulsante a forma di targa: **Verifica se la tua revisione è scaduta**.
   - Nota piccola: "Si apre il Portale dell'Automobilista, il sito ufficiale."
4. **Contatti**
   - Form con **Nome**, **Email**, **Messaggio** e pulsante **Invia messaggio** (vedi 6.5).
   - A fianco: email, pulsanti WhatsApp e Instagram, indirizzo e orari come `[da fornire]`.

Descrizioni bozza dei servizi (puoi usarle così):

| Servizio | Descrizione bozza |
| --- | --- |
| Revisioni | Revisione periodica per auto e moto, con controlli eseguiti secondo normativa. |
| Meccanica | Tagliandi, riparazioni e manutenzione ordinaria e straordinaria. |
| Diagnosi di ultima generazione | Lettura degli errori e controllo dei sistemi del veicolo con strumentazione aggiornata. |
| Pulizia FAP | Pulizia del filtro antiparticolato per ripristinarne l'efficienza. |
| Ricarica aria condizionata | Controllo e ricarica dell'impianto per tornare a viaggiare al fresco. |

### 6.3 Chi siamo

- Titolo pagina e un paragrafo introduttivo bozza (3–4 righe, generico, senza fatti).
- **Griglia di 4 membri del team**: ritratto segnaposto, `Nome Cognome`, `Ruolo`, due righe di descrizione bozza. Le foto singole con descrizione sono una richiesta del cliente: il layout deve funzionare quando arriveranno le foto vere (rapporto fisso 4:5, `object-cover`).
- Chiusura con invito a contattarci (link a WhatsApp e alla sezione contatti).

### 6.4 Gallery

- Titolo pagina e griglia di **9 segnaposto** con rapporti d'aspetto misti (4:3, 1:1, 3:4), disposti a mosaico.
- Clic su un'immagine apre un **lightbox** semplice (solo front-end, chiusura con Esc, frecce per scorrere). Se rischia di complicare, ometti il lightbox: non è prioritario.

### 6.5 Form contatti (solo grafica)

- Campi: Nome, Email, Messaggio. Etichette visibili (non solo placeholder), stati focus ben visibili, stati di errore grafici.
- **Nessun invio.** Al submit: `preventDefault()` e un avviso temporaneo: "Anteprima: in questa versione il messaggio non viene inviato."
- Nei commenti del codice lascia una nota: "Fase 2: invio a info@cartestbrindisi.it tramite route handler + provider email."

### 6.6 Componente segnaposto

Crea un componente `Placeholder` riusato per foto team e gallery: riquadro con campitura `Lamiera`, tratteggio diagonale leggerissimo, una piccola icona (silhouette) e la scritta **"Foto fornita dal cliente"**. Deve essere evidente a colpo d'occhio che sono immagini da sostituire, senza sembrare un errore di caricamento.

---

## 7. Qualità richiesta

- Responsive da 360 px a desktop largo. Mobile curato, non adattato all'ultimo.
- Navigazione da tastiera completa, `:focus-visible` ben visibile, `alt` sensati (il logo ha alt "Car Test Brindisi, centro revisioni e officina meccanica"; le decorazioni hanno `aria-hidden`).
- Un solo `h1` per pagina, gerarchia dei titoli corretta.
- `prefers-reduced-motion` rispettato (niente intro animata).
- Obiettivo Lighthouse (mobile): Performance ≥ 85, Accessibility ≥ 95. Se l'intro abbassa la performance, ottimizza l'intro, non toglierla.
- Nessun errore in console, nessun warning di hydration.

---

## 8. Ordine di lavoro consigliato

1. Setup progetto, font, token Tailwind (palette e tipografia di questo documento), asset del logo in `public/brand/`, `site.ts`.
2. Layout condiviso: header, footer, pulsante WhatsApp, componente `Placeholder`.
3. Pagine **Chi siamo** e **Gallery**.
4. Sezioni della **Home** (hero, servizi, banda revisione, contatti) **senza** intro, già complete e responsive.
5. Componente `GarageIntro` e integrazione con la hero (sezione 5), prima desktop poi mobile.
6. Rifinitura: Lighthouse, tastiera, reduced motion, prova su iPhone, controllo "Da evitare" della sezione 4.
7. Deploy su Vercel come preview con `noindex`.

---

## 9. Fuori dal mockup (non realizzare ora)

Invio reale del form, CMS, SEO avanzata, analytics, cookie banner e privacy policy, collegamento del dominio `cartestbrindisi.it`, foto e testi definitivi, multilingua, prenotazioni online. Sono previsti, eventualmente, nelle fasi successive concordate con il cliente.
