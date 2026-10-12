"use client";
import { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryMedia } from "@/content/gallery";

interface LightboxProps {
  items: GalleryMedia[];
  current: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({ items, current, onClose, onPrev, onNext }: LightboxProps) {
  const item = items[current];
  const total = items.length;

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: "rgba(15,21,28,0.95)" }}
      onClick={onClose}
    >
      <div
        className="relative flex h-full w-full items-center justify-center px-14 py-16"
        onClick={(e) => e.stopPropagation()}
      >
        <figure className="flex max-h-full max-w-full flex-col items-center gap-3">
          {item.kind === "video" ? (
            <video
              key={item.src}
              src={item.src}
              controls
              autoPlay
              playsInline
              className="max-h-[min(72vh,860px)] w-auto max-w-full bg-black"
            />
          ) : (
            <img
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              className="max-h-[min(72vh,860px)] w-auto max-w-full object-contain"
            />
          )}
          <figcaption className="max-w-xl text-center text-sm text-acciaio">
            {item.alt}
            <span className="mt-1 block text-xs text-acciaio/60">
              {current + 1} / {total}
            </span>
          </figcaption>
        </figure>

        <button
          onClick={onClose}
          aria-label="Chiudi"
          className="absolute top-[max(1rem,env(safe-area-inset-top))] right-4 flex h-11 w-11 items-center justify-center text-ghiaccio hover:text-azzurro"
        >
          <X size={24} />
        </button>

        {total > 1 && (
          <button
            onClick={onPrev}
            aria-label="Elemento precedente"
            className="absolute top-1/2 left-2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-ghiaccio hover:text-azzurro sm:left-4"
          >
            <ChevronLeft size={32} />
          </button>
        )}

        {total > 1 && (
          <button
            onClick={onNext}
            aria-label="Elemento successivo"
            className="absolute top-1/2 right-2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-ghiaccio hover:text-azzurro sm:right-4"
          >
            <ChevronRight size={32} />
          </button>
        )}
      </div>
    </div>
  );
}
