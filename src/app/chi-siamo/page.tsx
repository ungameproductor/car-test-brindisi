import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import Placeholder from "@/components/Placeholder";
import Reveal from "@/components/Reveal";
import ShinyButton from "@/components/ShinyButton";
import { TEAM, CONTACTS } from "@/content/site";

export const metadata: Metadata = {
  title: "Chi siamo — Car Test Brindisi",
  robots: { index: false, follow: false },
};

export default function ChiSiamoPage() {
  return (
    <>
      <Header visible />
      <main className="pt-[calc(4rem+env(safe-area-inset-top))]">
        {/* Intestazione pagina */}
        <section className="wrap py-16 sm:py-24">
          <div className="max-w-2xl">
            <h1 className="mb-6 text-ghiaccio">Chi siamo</h1>
            <p className="text-lg leading-relaxed text-acciaio">
              Car Test Brindisi è il centro revisioni e l&apos;officina meccanica
              per auto e moto. Qui si fanno i controlli previsti dalla normativa,
              la diagnosi e gli interventi di manutenzione, con un passaggio diretto
              tra chi guida e chi lavora sul veicolo.
            </p>
          </div>
        </section>

        {/* Divisore decorativo */}
        <div className="border-t border-acciaio/10" />

        {/* Team */}
        <section className="wrap py-16 sm:py-20">
          <h2 className="mb-8 text-ghiaccio sm:mb-12">Il nostro team</h2>

          <div className="grid grid-cols-1 gap-8 min-[480px]:grid-cols-2 min-[1024px]:grid-cols-4">
            {TEAM.map((member, index) => (
              <Reveal key={member.id} delay={index * 80}>
              <article className="flex flex-col gap-4">
                {/* Foto segnaposto — rapporto 4:5 */}
                <div className="w-full" style={{ aspectRatio: "4/5" }}>
                  <Placeholder
                    label="Foto fornita dal cliente"
                    className="w-full h-full rounded-sm"
                  />
                </div>
                <div>
                  <h3 className="text-ghiaccio font-heading font-semibold text-xl">
                    {member.name}
                  </h3>
                  <p className="text-azzurro text-sm font-medium mb-2">
                    {member.role}
                  </p>
                  <p className="text-acciaio text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Chiusura: invito al contatto */}
        <section className="border-y border-acciaio/15 bg-lamiera">
          <div className="wrap flex flex-col items-start justify-between gap-6 py-12 min-[768px]:flex-row min-[768px]:items-center">
            <p className="max-w-md font-heading text-2xl font-semibold text-ghiaccio">
              Vuoi sapere come preparare il veicolo alla revisione?
            </p>
            <div className="flex w-full flex-col gap-3 min-[480px]:w-auto min-[480px]:flex-row">
              <ShinyButton
                href={CONTACTS.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-[480px]:w-auto"
              >
                <MessageCircle size={18} aria-hidden="true" />
                Scrivici su WhatsApp
              </ShinyButton>
              <ShinyButton href="/#contatti" className="w-full min-[480px]:w-auto">
                Scrivici un messaggio
              </ShinyButton>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFab visible />
    </>
  );
}
