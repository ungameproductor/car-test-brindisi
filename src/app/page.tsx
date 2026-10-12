"use client";

import { useCallback, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import RevisionBand from "@/components/home/RevisionBand";
import Contacts from "@/components/home/Contacts";
import GarageIntro, { hasIntroPlayed } from "@/components/intro/GarageIntro";

export default function HomePage() {
  const [introComplete, setIntroComplete] = useState(hasIntroPlayed);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  return (
    <>
      <SmoothScroll />
      <Header visible={introComplete} />
      <GarageIntro onComplete={handleIntroComplete}>
        <Hero />
      </GarageIntro>
      <main id="contenuto" tabIndex={-1} className="scroll-mt-24 outline-none">
        <Services />
        <RevisionBand />
        <Contacts />
      </main>
      <Footer />
      <WhatsAppFab visible={introComplete} />
    </>
  );
}
