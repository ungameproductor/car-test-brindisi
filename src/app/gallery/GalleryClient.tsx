"use client";
import { useState } from "react";
import { Play } from "lucide-react";
import Lightbox from "@/components/Lightbox";
import Reveal from "@/components/Reveal";
import { GALLERY_ITEMS } from "@/content/gallery";

export default function GalleryClient() {
  const [open, setOpen] = useState<number | null>(null);

  const handleClose = () => setOpen(null);
  const handlePrev = () =>
    setOpen((i) => (i === null ? null : (i - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length));
  const handleNext = () => setOpen((i) => (i === null ? null : (i + 1) % GALLERY_ITEMS.length));

  return (
    <section className="wrap pb-24">
      <div className="columns-1 gap-4 min-[480px]:columns-2 min-[1024px]:columns-3">
        {GALLERY_ITEMS.map((item, idx) => (
          <Reveal key={item.id} className="mb-4 break-inside-avoid" delay={(idx % 3) * 70}>
            <button
              type="button"
              onClick={() => setOpen(idx)}
              aria-label={`${item.kind === "video" ? "Apri video" : "Apri foto"}: ${item.alt}`}
              className="gallery-tile relative block w-full overflow-hidden rounded-sm"
            >
              {item.kind === "video" ? (
                <video
                  src={item.src}
                  muted
                  playsInline
                  preload="metadata"
                  width={item.width}
                  height={item.height}
                  className="pointer-events-none h-auto w-full"
                />
              ) : (
                <img
                  src={item.src}
                  alt=""
                  width={item.width}
                  height={item.height}
                  className="h-auto w-full"
                />
              )}
              {item.kind === "video" && (
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-asfalto/80 text-ghiaccio">
                    <Play size={22} fill="currentColor" aria-hidden="true" />
                  </span>
                </span>
              )}
            </button>
          </Reveal>
        ))}
      </div>

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
