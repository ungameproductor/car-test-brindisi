import PlateButton from "@/components/PlateButton";
import { CONTACTS } from "@/content/site";

export default function RevisionBand() {
  return (
    <section className="border-y border-acciaio/20 bg-lamiera">
      <div className="wrap flex flex-col items-center gap-6 py-16 text-center sm:gap-8 sm:py-20">
        <h2 className="max-w-xl text-ghiaccio">Non ricordi quando scade la tua revisione?</h2>
        <p className="max-w-md text-acciaio">
          Controlla lo storico del veicolo sul portale ufficiale, senza registrazione.
        </p>
        <PlateButton
          href={CONTACTS.portalRevisioni}
          note="Si apre il Portale dell'Automobilista, il sito ufficiale."
        >
          Verifica se la tua revisione è scaduta
        </PlateButton>
      </div>
    </section>
  );
}
