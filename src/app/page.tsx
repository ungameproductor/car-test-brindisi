import JsonLd from "@/components/seo/JsonLd";
import HomeChrome from "@/components/home/HomeChrome";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import RevisionBand from "@/components/home/RevisionBand";
import Reviews from "@/components/home/Reviews";
import FaqSection from "@/components/home/FaqSection";
import Contacts from "@/components/home/Contacts";

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <HomeChrome hero={<Hero />}>
        <Services />
        <RevisionBand />
        <Reviews />
        <FaqSection />
        <Contacts />
      </HomeChrome>
    </>
  );
}
