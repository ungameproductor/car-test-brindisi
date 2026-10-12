"use client";

import { useState, type FormEvent } from "react";
import ShinyButton from "@/components/ShinyButton";

/**
 * Form contatti — solo grafica.
 * Nessun invio reale.
 * Fase 2: invio a info@cartestbrindisi.it tramite route handler + provider email.
 */
type Errors = Partial<Record<"nome" | "email" | "messaggio", string>>;

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nome = String(data.get("nome") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const messaggio = String(data.get("messaggio") ?? "").trim();
    const next: Errors = {};

    if (!nome) next.nome = "Inserisci il nome.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Inserisci un'email valida.";
    if (!messaggio) next.messaggio = "Scrivi un messaggio.";

    setErrors(next);
    setSubmitted(false);
    if (Object.keys(next).length > 0) return;

    setSubmitted(true);
    event.currentTarget.reset();
    window.setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5" noValidate>
      <Field
        id="contact-nome"
        name="nome"
        label="Nome"
        type="text"
        autoComplete="name"
        placeholder="Il tuo nome"
        error={errors.nome}
      />
      <Field
        id="contact-email"
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
        placeholder="la-tua@email.it"
        error={errors.email}
      />
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-messaggio" className="text-sm font-medium text-ghiaccio">
          Messaggio
        </label>
        <textarea
          id="contact-messaggio"
          name="messaggio"
          rows={5}
          placeholder="Scrivi il tuo messaggio…"
          aria-invalid={Boolean(errors.messaggio)}
          aria-describedby={errors.messaggio ? "contact-messaggio-errore" : undefined}
          className="field resize-none"
        />
        {errors.messaggio && (
          <p id="contact-messaggio-errore" className="text-sm text-ghiaccio">
            {errors.messaggio}
          </p>
        )}
      </div>

      {submitted && (
        <p role="status" className="border border-azzurro/40 bg-azzurro/10 px-4 py-3 text-sm text-azzurro">
          Anteprima: in questa versione il messaggio non viene inviato.
        </p>
      )}

      <ShinyButton type="submit" className="self-stretch sm:self-start">
        Invia messaggio
      </ShinyButton>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  type,
  autoComplete,
  placeholder,
  error,
}: {
  id: string;
  name: string;
  label: string;
  type: string;
  autoComplete: string;
  placeholder: string;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-ghiaccio">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-errore` : undefined}
        className="field"
      />
      {error && (
        <p id={`${id}-errore`} className="text-sm text-ghiaccio">
          {error}
        </p>
      )}
    </div>
  );
}
