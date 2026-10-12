"use client";

import { useEffect } from "react";

export function openDetailsBranch(el: HTMLElement) {
  let node: HTMLElement | null = el;
  while (node) {
    if (node instanceof HTMLDetailsElement) node.open = true;
    node = node.parentElement;
  }
}

function openFromHash() {
  const hash = window.location.hash;
  if (!hash.startsWith("#faq-")) return;
  const el = document.getElementById(decodeURIComponent(hash.slice(1)));
  if (el) openDetailsBranch(el);
}

export default function FaqHashOpen() {
  useEffect(() => {
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  return null;
}
