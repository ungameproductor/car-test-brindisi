"use client";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
}

/**
 * Pulsante con chamfer a 45° su un angolo via clip-path.
 * Richiama targhe e lamiera (brief §4 — Principi).
 */
export default function Button({
  variant = "primary",
  as: Tag = "button",
  href,
  target,
  rel,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 px-6 py-3 font-heading font-semibold text-base tracking-wide transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-azzurro focus-visible:outline-offset-2";

  // Chamfer angolo in basso a destra: 12px
  const chamfer =
    "[clip-path:polygon(0_0,100%_0,100%_calc(100%_-_12px),calc(100%_-_12px)_100%,0_100%)]";

  const variants: Record<string, string> = {
    primary:
      "bg-azzurro text-asfalto hover:bg-azzurro-scuro active:bg-azzurro-scuro",
    secondary:
      "border border-azzurro text-azzurro hover:bg-azzurro hover:text-asfalto",
    ghost: "text-ghiaccio hover:text-azzurro",
  };

  const classes = [base, chamfer, variants[variant], className].join(" ");

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
