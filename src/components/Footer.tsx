import Image from "next/image";
import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import SectionLink from "@/components/SectionLink";
import SocialButtons from "@/components/SocialButtons";
import { CONTACTS, NAV_LINKS } from "@/content/site";

export default function Footer() {
  return (
    <footer className="mt-8 border-t border-acciaio/20 bg-lamiera pb-[max(1.5rem,env(safe-area-inset-bottom))]">
      <div className="wrap grid grid-cols-1 gap-10 py-12 min-[768px]:grid-cols-3">
        <div className="flex flex-col gap-4">
          <Image
            src="/brand/logo-trim.png"
            alt="Car Test Brindisi, centro revisioni e officina meccanica"
            width={501}
            height={200}
            className="h-10 w-auto max-w-none self-start"
            style={{ width: "auto" }}
          />
          <p className="max-w-xs text-sm leading-relaxed text-acciaio">
            Centro revisioni e officina meccanica a Brindisi. Auto e moto.
          </p>
          <p className="text-xs text-acciaio/70">P.IVA [da fornire]</p>
        </div>

        <nav aria-label="Pagine nel footer">
          <p className="mb-3 font-heading text-lg font-semibold text-ghiaccio">Pagine</p>
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center text-sm text-acciaio transition-colors duration-150 hover:text-azzurro"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <SectionLink
                hash="domande-frequenti"
                className="inline-flex min-h-11 items-center text-sm text-acciaio transition-colors duration-150 hover:text-azzurro"
              >
                Domande frequenti
              </SectionLink>
            </li>
          </ul>
        </nav>

        <div className="flex flex-col">
          <p className="mb-3 font-heading text-lg font-semibold text-ghiaccio">Contatti</p>
          <a
            href={`mailto:${CONTACTS.email}`}
            className="inline-flex min-h-11 items-center gap-2 break-all text-sm text-acciaio hover:text-azzurro"
          >
            <Mail size={16} aria-hidden="true" />
            {CONTACTS.email}
          </a>
          <a
            href={CONTACTS.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 text-sm text-acciaio hover:text-azzurro"
          >
            <MessageCircle size={16} aria-hidden="true" />
            WhatsApp {CONTACTS.whatsapp}
          </a>
          <SocialButtons className="mt-3" />
        </div>
      </div>
      <div className="wrap border-t border-acciaio/20 py-5">
        <p className="text-center text-xs leading-relaxed text-acciaio/70">
          Anteprima grafica: foto, testi e dati sono segnaposto.
        </p>
      </div>
    </footer>
  );
}
