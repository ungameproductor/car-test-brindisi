"use client";

import { MessageCircle } from "lucide-react";
import { CONTACTS } from "@/content/site";

interface WhatsAppFabProps {
  visible?: boolean;
}

export default function WhatsAppFab({ visible = true }: WhatsAppFabProps) {
  return (
    <a
      href={CONTACTS.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Scrivici su WhatsApp"
      className={
        visible
          ? "whatsapp-fab is-visible fixed right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 flex h-14 w-14 items-center justify-center rounded-full bg-azzurro text-asfalto shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-colors duration-150 hover:bg-azzurro-scuro"
          : "whatsapp-fab fixed right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 flex h-14 w-14 items-center justify-center rounded-full bg-azzurro text-asfalto shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-colors duration-150 hover:bg-azzurro-scuro"
      }
      inert={!visible}
      style={{
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <MessageCircle size={26} aria-hidden="true" />
    </a>
  );
}
