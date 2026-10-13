import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Gallery — Car Test Brindisi",
  robots: { index: false, follow: false },
};

export default function GalleryPage() {
  return (
    <>
      <Header visible />
      <main className="pt-[calc(4rem+env(safe-area-inset-top))]">
        <section className="wrap pt-14 pb-2 sm:pt-20 sm:pb-4">
          <div className="max-w-xl">
            <h1 className="text-ghiaccio mb-6">Gallery</h1>
            <p className="text-acciaio text-lg leading-relaxed">
              Foto e video dell&apos;officina, delle attrezzature e del lavoro su auto e moto.
            </p>
          </div>
        </section>

        <GalleryClient />
      </main>
      <Footer />
      <WhatsAppFab visible />
    </>
  );
}
