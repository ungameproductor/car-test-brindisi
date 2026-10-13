"use client";

import { useState } from "react";
import Lightbox from "@/components/Lightbox";
import SillageGallery from "@/components/gallery/SillageGallery";
import { GALLERY_ITEMS } from "@/content/gallery";

export default function GalleryClient() {
  const [open, setOpen] = useState<number | null>(null);

  const handleClose = () => setOpen(null);
  const handlePrev = () =>
    setOpen((i) => (i === null ? null : (i - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length));
  const handleNext = () => setOpen((i) => (i === null ? null : (i + 1) % GALLERY_ITEMS.length));

  return (
    <section className="pb-20 sm:pb-28" aria-label="Foto e video dell'officina">
      <SillageGallery items={GALLERY_ITEMS} onOpen={setOpen} paused={open !== null} />

      {open !== null && (
        <Lightbox
          items={GALLERY_ITEMS}
          current={open}
          onClose={handleClose}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </section>
  );
}
