"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import SmoothScroll from "@/components/SmoothScroll";
import { openDetailsBranch } from "@/components/home/FaqHashOpen";
import GarageIntro, { hasIntroPlayed } from "@/components/intro/GarageIntro";

type LenisScroll = {
  scrollTo: (
    target: number | string | HTMLElement,
    options?: { immediate?: boolean; force?: boolean; offset?: number }
  ) => void;
};

function scrollToHash() {
  const hash = window.location.hash;
  if (!hash || hash === "#contenuto") return true;

  const el = document.getElementById(decodeURIComponent(hash.slice(1)));
  if (!el) return true;

  const garage = ScrollTrigger.getById("garage");
  if (garage && garage.progress < 1) return false;

  if (el instanceof HTMLDetailsElement) openDetailsBranch(el);

  const scroller = (window as unknown as { __lenis?: LenisScroll }).__lenis;
  const header = document.querySelector(".site-header");
  const offset = header instanceof HTMLElement ? -(header.offsetHeight + 12) : -88;

  if (scroller) scroller.scrollTo(el, { immediate: true, force: true, offset });
  else el.scrollIntoView({ block: "start" });

  return true;
}

export default function HomeChrome({
  hero,
  children,
}: {
  hero: ReactNode;
  children: ReactNode;
}) {
  const [introComplete, setIntroComplete] = useState(hasIntroPlayed);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  useEffect(() => {
    if (!introComplete || !window.location.hash) return;

    let attempts = 0;
    let timer = 0;
    let cancelled = false;

    const go = () => {
      if (cancelled) return;
      attempts += 1;
      const done = scrollToHash();
      if (!done && attempts < 200) timer = window.setTimeout(go, 100);
    };

    timer = window.setTimeout(go, 60);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [introComplete]);

  return (
    <>
      <SmoothScroll />
      <Header visible={introComplete} />
      <GarageIntro onComplete={handleIntroComplete}>{hero}</GarageIntro>
      <main id="contenuto" tabIndex={-1} className="scroll-mt-24 outline-none">
        {children}
      </main>
      <Footer />
      <WhatsAppFab visible={introComplete} />
    </>
  );
}
