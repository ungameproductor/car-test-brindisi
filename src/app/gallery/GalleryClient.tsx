"use client";
import { useState } from "react";
import Placeholder from "@/components/Placeholder";
import Lightbox from "@/components/Lightbox";
import Reveal from "@/components/Reveal";
import { GALLERY_ITEMS } from "@/content/site";

export default function GalleryClient() {
  const [open, setOpen] = useState<number | null>(null);

  const handleOpen = (idx: number) => setOpen(idx);
  const handleClose = () => setOpen(null);
  const handlePrev = () =>
    setOpen((i) => (i === null ? null : (i - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length));
  const handleNext = () =>
    setOpen((i) => (i === null ? null : (i + 1) % GALLERY_ITEMS.length));

  return (
    <section className="wrap pb-24">
      <div className="columns-1 gap-4 min-[480px]:columns-2 min-[1024px]:columns-3">
        {GALLERY_ITEMS.map((item, idx) => (
          <Reveal key={item.id} className="mb-4 break-inside-avoid" delay={(idx % 3) * 70}>
          <button
            type="button"
            onClick={() => handleOpen(idx)}
            aria-label={`Apri immagine ${idx + 1}: ${item.label}`}
            className="gallery-tile block w-full"
          >
            <div
              className="w-full overflow-hidden rounded-sm"
              style={{ aspectRatio: item.aspect }}
            >
              <Placeholder
                label={item.label}
                className="w-full h-full group-hover:brightness-110 transition-[filter] duration-150"
              />
            </div>
          </button>
          </Reveal>
        ))}
      </div>

      {/* Lightbox */}
      {open !== null && (
        <Lightbox
          total={GALLERY_ITEMS.length}
          current={open}
          onClose={handleClose}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </section>
  );
}
