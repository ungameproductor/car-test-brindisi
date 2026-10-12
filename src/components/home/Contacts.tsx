import type { ReactNode } from "react";
import { Clock, Mail, MapPin, MessageCircle } from "lucide-react";
import IconFrame from "@/components/IconFrame";
import Reveal from "@/components/Reveal";
import SocialButtons from "@/components/SocialButtons";
import { CONTACTS } from "@/content/site";
import ContactForm from "./ContactForm";

export default function Contacts() {
  return (
    <section id="contatti" className="wrap py-16 sm:py-24">
      <h2 className="mb-8 text-ghiaccio sm:mb-12">Scrivici</h2>
      <div className="grid grid-cols-1 gap-12 min-[1024px]:grid-cols-2 min-[1024px]:gap-16">
        <Reveal>
          <ContactForm />
        </Reveal>
        <Reveal delay={90}>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-1">
            <h3 className="mb-3 text-ghiaccio">Contatti diretti</h3>
            <ContactLink href={`mailto:${CONTACTS.email}`} icon={<Mail size={16} strokeWidth={1.75} aria-hidden="true" />}>
              {CONTACTS.email}
            </ContactLink>
            <ContactLink
              href={CONTACTS.whatsappLink}
              external
              icon={<MessageCircle size={16} strokeWidth={1.75} aria-hidden="true" />}
            >
              WhatsApp {CONTACTS.whatsapp}
            </ContactLink>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-ghiaccio">Social</h3>
            <SocialButtons />
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-ghiaccio">Dove siamo</h3>
            <a
              href={CONTACTS.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-acciaio transition-colors duration-150 hover:text-azzurro"
            >
              <IconFrame small>
                <MapPin size={16} strokeWidth={1.75} aria-hidden="true" />
              </IconFrame>
              {CONTACTS.address}
            </a>
            <div className="flex items-start gap-3 text-acciaio">
              <IconFrame small>
                <Clock size={16} strokeWidth={1.75} aria-hidden="true" />
              </IconFrame>
              <div className="flex flex-col gap-1 pt-1.5">
                {CONTACTS.hours.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}

function ContactLink({
  href,
  icon,
  children,
  external = false,
}: {
  href: string;
  icon: ReactNode;
  children: ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="flex min-h-12 items-center gap-3 break-all text-acciaio transition-colors duration-150 hover:text-azzurro"
    >
      <IconFrame small>{icon}</IconFrame>
      {children}
    </a>
  );
}
