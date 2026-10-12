"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, MessageCircle, X } from "lucide-react";
import ShinyButton from "@/components/ShinyButton";
import { CONTACTS, NAV_LINKS } from "@/content/site";

interface HeaderProps {
  visible?: boolean;
}

export default function Header({ visible = true }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header
      className={visible ? "site-header is-visible fixed inset-x-0 top-0 z-50" : "site-header fixed inset-x-0 top-0 z-50"}
      aria-hidden={visible ? undefined : true}
      inert={!visible}
      style={{
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <div className="border-b border-lamiera bg-asfalto/92 backdrop-blur-md pt-[env(safe-area-inset-top)]">
        <div className="wrap flex h-16 items-center justify-between gap-3">
          <Link href="/" className="shrink-0" aria-label="Car Test Brindisi, torna alla home">
            <Image
              src="/brand/logo-trim.png"
              alt="Car Test Brindisi, centro revisioni e officina meccanica"
              width={148}
              height={60}
              className="h-9 w-auto sm:h-10"
              preload
            />
          </Link>

          <nav aria-label="Menu principale" className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-ghiaccio transition-colors duration-150 hover:text-azzurro"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <ShinyButton
            href={CONTACTS.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            size="sm"
            className="hidden md:inline-flex"
          >
            <MessageCircle size={16} aria-hidden="true" />
            Scrivici su WhatsApp
          </ShinyButton>

          <button
            type="button"
            aria-label={menuOpen ? "Chiudi menu" : "Apri menu"}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center text-ghiaccio transition-colors duration-150 hover:text-azzurro md:hidden"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div id="menu-mobile" hidden={!menuOpen} className="border-b border-acciaio/20 bg-lamiera md:hidden">
        <nav aria-label="Menu mobile" className="wrap flex flex-col py-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex min-h-12 items-center border-b border-acciaio/15 text-lg text-ghiaccio"
            >
              {link.label}
            </Link>
          ))}
          <ShinyButton
            href={CONTACTS.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 mb-3 w-full"
          >
            <MessageCircle size={18} aria-hidden="true" />
            Scrivici su WhatsApp
          </ShinyButton>
        </nav>
      </div>
    </header>
  );
}
