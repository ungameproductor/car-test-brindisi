import { MessageCircle } from "lucide-react";
import ShinyButton from "@/components/ShinyButton";
import { CONTACTS } from "@/content/site";

export default function Hero() {
  return (
    <section className="hero-reveal relative flex h-full min-h-[100svh] flex-col justify-center overflow-hidden bg-transparent px-4 py-20 sm:px-6 lg:px-8">
      <div className="wrap relative w-full">
        <div className="max-w-2xl">
          <h1 className="mb-4 text-ghiaccio sm:mb-6">
            Centro revisioni e officina meccanica a Brindisi
          </h1>
          <p className="mb-6 max-w-lg text-base leading-relaxed text-acciaio sm:mb-8 sm:text-lg">
            Auto e moto: revisioni, meccanica e diagnosi con strumenti di ultima generazione.
          </p>
          <div className="flex w-full max-w-xl flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ShinyButton
              href={CONTACTS.portalRevisioni}
              target="_blank"
              rel="noopener noreferrer"
              tone="light"
              className="w-full sm:w-auto"
            >
              Verifica se la tua revisione è scaduta
            </ShinyButton>
            <ShinyButton
              href={CONTACTS.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <MessageCircle size={18} aria-hidden="true" />
              Scrivici su WhatsApp
            </ShinyButton>
          </div>
        </div>
      </div>
    </section>
  );
}
