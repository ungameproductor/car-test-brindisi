"use client";

import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import { GOOGLE_REVIEWS_URL, REVIEWS } from "@/content/site";

const SPEED = 42;

export default function Reviews() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const hold = useRef({ hover: false, drag: false, focus: false, user: false, touch: false });
  const drag = useRef({ active: false, x: 0, left: 0 });
  const touchTimer = useRef<number | null>(null);
  const [userPaused, setUserPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(motion.matches);
    sync();
    motion.addEventListener("change", sync);
    return () => motion.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || reduced) return;

    let frame = 0;
    let last = 0;

    const step = (now: number) => {
      if (!last) last = now;
      const delta = now - last;
      last = now;
      const half = scroller.scrollWidth / 2;
      const held = Object.values(hold.current).some(Boolean);
      if (half > 0) {
        if (!held) scroller.scrollLeft += (SPEED * delta) / 1000;
        if (scroller.scrollLeft >= half) scroller.scrollLeft -= half;
        else if (held && scroller.scrollLeft <= 0) scroller.scrollLeft += half - 1;
      }
      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [reduced]);

  const pauseTouch = () => {
    hold.current.touch = true;
    if (touchTimer.current) window.clearTimeout(touchTimer.current);
    touchTimer.current = window.setTimeout(() => {
      hold.current.touch = false;
    }, 2800);
  };

  return (
    <section id="recensioni" aria-labelledby="recensioni-titolo" className="py-16 sm:py-24">
      <div className="wrap mb-8 flex flex-col gap-4 sm:mb-10 min-[768px]:flex-row min-[768px]:items-end min-[768px]:justify-between">
        <h2 id="recensioni-titolo" className="max-w-3xl text-ghiaccio">
          Cosa dicono i clienti
        </h2>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center text-sm text-acciaio underline decoration-acciaio/40 underline-offset-4 hover:text-azzurro"
          >
            Vedi su Google
          </a>
          {!reduced && (
            <button
              type="button"
              className="inline-flex min-h-11 items-center text-sm text-acciaio hover:text-azzurro"
              aria-pressed={userPaused}
              onClick={() => {
                const next = !userPaused;
                hold.current.user = next;
                setUserPaused(next);
              }}
            >
              {userPaused ? "Riprendi" : "Pausa"}
            </button>
          )}
        </div>
      </div>

      <div className="reviews-fade">
        <div
          ref={scrollerRef}
          className="reviews-scroller"
          data-lenis-prevent-horizontal
          data-lenis-prevent-touch
          tabIndex={0}
          aria-label="Recensioni Google, scorri in orizzontale"
          onMouseEnter={() => {
            hold.current.hover = true;
          }}
          onMouseLeave={() => {
            hold.current.hover = false;
          }}
          onFocus={(event) => {
            if (event.currentTarget.matches(":focus-visible")) hold.current.focus = true;
          }}
          onBlur={(event) => {
            const next = event.relatedTarget;
            if (!(next instanceof Node) || !event.currentTarget.contains(next)) hold.current.focus = false;
          }}
          onWheel={(event) => {
            if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) pauseTouch();
          }}
          onTouchStart={pauseTouch}
          onPointerDown={(event) => {
            if (event.pointerType !== "mouse" || event.button !== 0) return;
            const scroller = scrollerRef.current;
            if (!scroller) return;
            drag.current = { active: true, x: event.clientX, left: scroller.scrollLeft };
            hold.current.drag = true;
            scroller.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => {
            const scroller = scrollerRef.current;
            if (!drag.current.active || !scroller) return;
            scroller.scrollLeft = drag.current.left - (event.clientX - drag.current.x);
          }}
          onPointerUp={(event) => {
            drag.current.active = false;
            hold.current.drag = false;
            if (scrollerRef.current?.hasPointerCapture(event.pointerId)) {
              scrollerRef.current.releasePointerCapture(event.pointerId);
            }
          }}
          onPointerCancel={() => {
            drag.current.active = false;
            hold.current.drag = false;
          }}
        >
          <ReviewSet />
          {!reduced && <ReviewSet hidden />}
        </div>
      </div>
    </section>
  );
}

function ReviewSet({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="reviews-set" aria-hidden={hidden || undefined}>
      {REVIEWS.map((review) => (
        <figure key={`${hidden ? "copy-" : ""}${review.id}`} className="panel chamfer review-card p-6">
          <figcaption className="mb-4">
            <p className="font-heading text-2xl font-semibold text-ghiaccio">{review.author}</p>
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
              <p className="text-sm font-medium text-azzurro">{review.source}</p>
              <p className="flex items-center gap-0.5 text-bozza" aria-label={`Valutazione: ${review.rating} stelle su 5`}>
                {Array.from({ length: review.rating }, (_, index) => (
                  <Star key={index} size={16} fill="currentColor" aria-hidden="true" />
                ))}
              </p>
              <p className="text-sm text-acciaio">{review.when}</p>
            </div>
          </figcaption>
          <blockquote>
            <p className="leading-relaxed text-ghiaccio">{review.quote}</p>
          </blockquote>
        </figure>
      ))}
    </div>
  );
}
