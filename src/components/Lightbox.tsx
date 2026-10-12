"use client";
import { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  total: number;
  current: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({
  total,
  current,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Lightbox gallery"
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: "rgba(15,21,28,0.95)" }}
      onClick={onClose}
    >
      {/* Contenuto lightbox (non propaga il click) */}
      <div
        className="relative flex items-center justify-center w-full h-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Segnaposto immagine */}
        <div
          className="flex flex-col items-center justify-center gap-4 rounded-sm"
          style={{
            width: "min(80vw, 700px)",
            height: "min(75vh, 500px)",
            backgroundColor: "#17202A",
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(139,154,170,0.06) 8px, rgba(139,154,170,0.06) 9px)",
          }}
        >
          <span className="text-acciaio text-sm">Foto fornita dal cliente</span>
          <span className="text-acciaio/40 text-xs">{current + 1} / {total}</span>
        </div>

        {/* Chiudi */}
        <button
          onClick={onClose}
          aria-label="Chiudi lightbox"
          className="absolute top-[max(1rem,env(safe-area-inset-top))] right-4 flex h-11 w-11 items-center justify-center text-ghiaccio hover:text-azzurro"
        >
          <X size={24} />
        </button>

        {/* Freccia prev */}
        {total > 1 && (
          <button
            onClick={onPrev}
            aria-label="Immagine precedente"
            className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-ghiaccio hover:text-azzurro sm:left-4"
          >
            <ChevronLeft size={32} />
          </button>
        )}

        {/* Freccia next */}
        {total > 1 && (
          <button
            onClick={onNext}
            aria-label="Immagine successiva"
            className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-ghiaccio hover:text-azzurro sm:right-4"
          >
            <ChevronRight size={32} />
          </button>
        )}
      </div>
    </div>
  );
}
