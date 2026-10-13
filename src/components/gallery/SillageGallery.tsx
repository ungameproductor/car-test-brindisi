"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Play } from "lucide-react";
import type { GalleryMedia } from "@/content/gallery";

/**
 * Coverflow adattato dal componente Framer Sillage.
 * Un clic su una scheda apre il lightbox; frecce, swipe e autoplay scorrono la pila.
 */

const CARD_CURVE = "cubic-bezier(0.23, 1, 0.32, 1)";
const BUTTON_CURVE = "cubic-bezier(0.34, 1.56, 0.64, 1)";
const AZZURRO = "#42b4e8";

type Direction = "horizontal" | "vertical";

type Props = {
  items: GalleryMedia[];
  onOpen: (index: number) => void;
  paused?: boolean;
};

function ringOffset(index: number, focus: number, total: number) {
  if (total <= 1) return 0;
  let offset = index - focus;
  const half = total / 2;
  if (offset > half) offset -= total;
  else if (offset < -half) offset += total;
  return offset;
}

function poseAt(
  offset: number,
  stack: { spread: number; depth: number; rotation: number; shrink: number; fade: number; soften: number },
  upright: boolean,
) {
  const distance = Math.abs(offset);
  const along = offset * stack.spread;
  const z = -distance * stack.depth;
  const scale = Math.max(0.4, 1 - distance * stack.shrink);
  const travel = upright
    ? `translate3d(0px, ${along}px, ${z}px) rotateX(${offset * stack.rotation}deg)`
    : `translate3d(${along}px, 0px, ${z}px) rotateY(${-offset * stack.rotation}deg)`;
  return {
    transform: `translate(-50%, -50%) ${travel} scale(${scale})`,
    opacity: Math.max(0, 1 - distance * stack.fade),
    blur: distance * stack.soften,
    layer: Math.round((100 - distance) * 10),
  };
}

const posterCache = new Map<string, string>();
const posterJobs = new Map<string, Promise<string | null>>();
let posterSlots = 0;
const posterQueue: Array<() => void> = [];

function releasePosterSlot() {
  posterSlots = Math.max(0, posterSlots - 1);
  const next = posterQueue.shift();
  if (!next) return;
  posterSlots += 1;
  next();
}

function loadPoster(src: string): Promise<string | null> {
  const cached = posterCache.get(src);
  if (cached) return Promise.resolve(cached);
  const existing = posterJobs.get(src);
  if (existing) return existing;

  const job = new Promise<string | null>((resolve) => {
    const start = () => {
      const video = document.createElement("video");
      video.muted = true;
      video.playsInline = true;
      video.preload = "auto";
      let settled = false;
      let timer = 0;
      const finish = (url: string | null) => {
        if (settled) return;
        settled = true;
        window.clearTimeout(timer);
        video.pause();
        video.removeAttribute("src");
        video.load();
        if (url) posterCache.set(src, url);
        resolve(url);
        releasePosterSlot();
      };
      timer = window.setTimeout(() => finish(null), 8000);
      video.addEventListener("error", () => finish(null), { once: true });
      video.addEventListener(
        "loadeddata",
        () => {
          const duration = Number.isFinite(video.duration) ? video.duration : 1;
          const target = Math.min(0.45, Math.max(0.05, duration * 0.12));
          try {
            video.currentTime = target;
          } catch {
            finish(null);
          }
        },
        { once: true },
      );
      video.addEventListener(
        "seeked",
        () => {
          const w = video.videoWidth;
          const h = video.videoHeight;
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if (!w || !h || !ctx) {
            finish(null);
            return;
          }
          canvas.width = w;
          canvas.height = h;
          try {
            ctx.drawImage(video, 0, 0, w, h);
            finish(canvas.toDataURL("image/jpeg", 0.72));
          } catch {
            finish(null);
          }
        },
        { once: true },
      );
      video.src = src;
    };

    if (posterSlots < 2) {
      posterSlots += 1;
      start();
    } else {
      posterQueue.push(start);
    }
  }).finally(() => {
    posterJobs.delete(src);
  });

  posterJobs.set(src, job);
  return job;
}

function VideoStill({ src }: { src: string }) {
  const [poster, setPoster] = useState<string | null>(() => posterCache.get(src) ?? null);

  useEffect(() => {
    const cached = posterCache.get(src);
    if (cached) {
      setPoster(cached);
      return;
    }
    let cancelled = false;
    loadPoster(src).then((url) => {
      if (!cancelled && url) setPoster(url);
    });
    return () => {
      cancelled = true;
    };
  }, [src]);

  if (!poster) return null;
  return (
    <img
      src={poster}
      alt=""
      draggable={false}
      className="pointer-events-none absolute inset-0 block h-full w-full object-cover"
    />
  );
}

export default function SillageGallery({ items, onOpen, paused = false }: Props) {
  const total = items.length;
  const rootRef = useRef<HTMLDivElement>(null);
  const justSwiped = useRef(false);
  const moved = useRef(false);
  const pullRef = useRef(0);
  const dragCleanup = useRef<(() => void) | null>(null);
  const scope = `sl${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  const [box, setBox] = useState({ w: 0, h: 0 });
  const [direction, setDirection] = useState<Direction>("horizontal");
  const [focus, setFocus] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [pull, setPull] = useState(0);
  const [onScreen, setOnScreen] = useState(false);
  const [still, setStill] = useState(false);

  const upright = direction === "vertical";
  const mobile = box.w > 0 && box.w < 720;
  const current = total ? ((focus % total) + total) % total : 0;

  const cardW = (() => {
    if (!box.w || !box.h) return mobile ? 240 : 380;
    const maxW = Math.min(mobile ? 300 : 420, box.w * (mobile ? 0.74 : 0.44));
    const maxH = box.h * (mobile ? 0.72 : 0.78);
    let width = maxW;
    let height = width * (560 / 400);
    if (height > maxH) {
      height = maxH;
      width = height * (400 / 560);
    }
    return Math.round(Math.max(168, width));
  })();
  const cardH = Math.round(cardW * (560 / 400));
  const spread = Math.round(cardW * (mobile ? 0.46 : 0.58));
  const stack = {
    spread,
    depth: mobile ? 110 : 180,
    rotation: mobile ? 12 : 15,
    shrink: 0.14,
    fade: 0.42,
    soften: mobile ? 2 : 3.5,
  };
  const buttonSize = mobile ? 44 : 52;
  const buttonInset = mobile ? 12 : 28;
  const timing = still ? "0s" : "0.8s";

  const shift = useCallback(
    (step: number) => {
      if (total < 2) return;
      setFocus((value) => ((value + step) % total + total) % total);
    },
    [total],
  );

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const measure = () => {
      const next = { w: node.clientWidth, h: node.clientHeight };
      setBox((prev) =>
        Math.abs(prev.w - next.w) < 2 && Math.abs(prev.h - next.h) < 2 ? prev : next,
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = rootRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setOnScreen(true);
      return;
    }
    const watcher = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1];
        setOnScreen(entry.isIntersecting && entry.intersectionRatio >= 0.45);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    watcher.observe(node);
    return () => watcher.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setStill(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (paused || still || dragging || !onScreen || total < 2) return;
    const timer = window.setInterval(() => shift(1), 4000);
    return () => window.clearInterval(timer);
  }, [paused, still, dragging, onScreen, total, shift, current]);

  useEffect(() => {
    if (paused || !onScreen || total < 2) return;
    const backKey = upright ? "ArrowUp" : "ArrowLeft";
    const forwardKey = upright ? "ArrowDown" : "ArrowRight";
    const handle = (event: KeyboardEvent) => {
      const el = event.target as HTMLElement | null;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable)) return;
      if (event.key === backKey) {
        if (upright) event.preventDefault();
        shift(-1);
      } else if (event.key === forwardKey) {
        if (upright) event.preventDefault();
        shift(1);
      }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [paused, onScreen, total, shift, upright]);

  const releaseDrag = useCallback(() => {
    dragCleanup.current?.();
    dragCleanup.current = null;
  }, []);

  useEffect(() => {
    if (!paused) return;
    pullRef.current = 0;
    moved.current = false;
    setPull(0);
    setDragging(false);
    releaseDrag();
  }, [paused, releaseDrag]);

  useEffect(() => () => releaseDrag(), [releaseDrag]);

  const beginPress = (event: React.PointerEvent<HTMLDivElement>) => {
    if (paused || (event.pointerType === "mouse" && event.button !== 0)) return;
    releaseDrag();
    const origin = { x: event.clientX, y: event.clientY };
    const step = Math.max(1, spread);
    justSwiped.current = false;
    moved.current = false;
    pullRef.current = 0;

    const travelOf = (pointer: PointerEvent) =>
      upright ? pointer.clientY - origin.y : pointer.clientX - origin.x;

    const follow = (pointer: PointerEvent) => {
      const travel = travelOf(pointer);
      if (Math.abs(travel) > 6) {
        moved.current = true;
        setDragging(true);
      }
      const next = -travel / step;
      pullRef.current = next;
      if (moved.current) setPull(next);
    };
    const release = (pointer: PointerEvent) => {
      const travel = travelOf(pointer);
      let steps = Math.round(pullRef.current);
      if (steps === 0 && Math.abs(travel) > 50) steps = travel > 0 ? -1 : 1;
      const swiped = moved.current;
      justSwiped.current = swiped;
      pullRef.current = 0;
      moved.current = false;
      setPull(0);
      setDragging(false);
      cleanup();
      if (swiped && steps !== 0) shift(steps);
    };
    const cleanup = () => {
      window.removeEventListener("pointermove", follow);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
      if (dragCleanup.current === cleanup) dragCleanup.current = null;
    };
    dragCleanup.current = cleanup;
    window.addEventListener("pointermove", follow);
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
  };

  const openCard = (index: number) => {
    if (justSwiped.current) {
      justSwiped.current = false;
      return;
    }
    onOpen(index);
  };

  const following = dragging && moved.current;
  const cardMotion = following
    ? "none"
    : `transform ${timing} ${CARD_CURVE}, opacity ${timing} ${CARD_CURVE}`;
  const showLabels = box.w >= 680;
  const glowDrift = ((current / Math.max(total - 1, 1) - 0.5) * spread * 0.6);
  const backPoints = upright ? "18 15 12 9 6 15" : "15 18 9 12 15 6";
  const forwardPoints = upright ? "6 9 12 15 18 9" : "9 18 15 12 9 6";

  const buttonSheet = `
    .${scope}-nav {
      width: ${buttonSize}px;
      height: ${buttonSize}px;
      border-radius: 50%;
      padding: 0;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #f5f9fc;
      background: rgba(15, 21, 28, 0.55);
      border: 1px solid rgba(245, 249, 252, 0.16);
      -webkit-backdrop-filter: blur(16px);
      backdrop-filter: blur(16px);
      box-shadow: 0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.1);
      transform: translateY(0) scale(1);
      transition: all ${still ? "0s" : "0.4s"} ${BUTTON_CURVE};
      outline: none;
      -webkit-tap-highlight-color: transparent;
    }
    .${scope}-nav:hover {
      background: ${AZZURRO};
      color: #0f151c;
      transform: translateY(-2px) scale(1.08);
      box-shadow: 0 12px 36px rgba(66, 180, 232, 0.45);
    }
    .${scope}-nav:focus-visible {
      outline: 2px solid ${AZZURRO};
      outline-offset: 3px;
    }
  `;

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carosello"
      aria-label="Gallery di foto e video. Trascina o usa le frecce per scorrere. Un clic apre la foto o il video."
      onPointerDown={beginPress}
      className="relative w-full overflow-clip"
      style={{
        height: "clamp(30rem, 72svh, 44rem)",
        touchAction: upright ? "pan-x" : "pan-y",
        userSelect: "none",
        clipPath: "inset(0px)",
        cursor: dragging ? "grabbing" : "grab",
      }}
    >
      <style>{buttonSheet}</style>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 z-0"
        style={{
          width: "62%",
          height: "62%",
          background: "radial-gradient(circle, rgba(66, 180, 232, 0.18) 0%, transparent 70%)",
          filter: "blur(48px)",
          transform: `translate(-50%, -50%) ${upright ? `translateY(${glowDrift}px)` : `translateX(${glowDrift}px)`}`,
          transition: `transform ${timing} ${CARD_CURVE}`,
        }}
      />

      <div
        className="absolute inset-0 z-[1]"
        style={{ perspective: mobile ? "900px" : "1200px", transformStyle: "preserve-3d" }}
      >
        {box.w > 0 &&
          items.map((item, index) => {
            const visual = ringOffset(index, current + pull, total);
            if (Math.abs(visual) > 4.2) return null;
            const pose = poseAt(visual, stack, upright);
            const front = ringOffset(index, current, total) === 0;
            const subtitle = item.kind === "video" ? "Video" : "Foto";
            return (
              <button
                key={item.id}
                type="button"
                aria-label={`${item.kind === "video" ? "Apri video" : "Apri foto"}: ${item.alt}`}
                aria-hidden={!front}
                tabIndex={front ? 0 : -1}
                onClick={() => openCard(index)}
                className="absolute top-1/2 left-1/2 block border-0 p-0 text-left"
                style={{
                  width: cardW,
                  height: cardH,
                  borderRadius: mobile ? 22 : 32,
                  background: "#111",
                  overflow: "hidden",
                  transform: pose.transform,
                  opacity: pose.opacity,
                  zIndex: pose.layer,
                  pointerEvents: pose.opacity > 0.05 ? "auto" : "none",
                  cursor: "pointer",
                  transition: cardMotion,
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{ filter: pose.blur > 0.4 ? `blur(${pose.blur}px)` : "none" }}
                >
                  {item.kind === "video" ? (
                    <VideoStill src={item.src} />
                  ) : (
                    <img
                      src={item.src}
                      alt=""
                      draggable={false}
                      width={item.width}
                      height={item.height}
                      className="pointer-events-none absolute inset-0 block h-full w-full object-cover"
                    />
                  )}
                </div>

                {item.kind === "video" && (
                  <span className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center">
                    <span className="bg-asfalto/80 text-ghiaccio flex h-12 w-12 items-center justify-center rounded-full">
                      <Play size={22} fill="currentColor" aria-hidden="true" />
                    </span>
                  </span>
                )}

                <span
                  className="pointer-events-none absolute inset-0 z-[3] flex flex-col justify-end"
                  style={{
                    padding: mobile ? 18 : 28,
                    background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, transparent 58%)",
                    opacity: front ? 1 : 0,
                    transition: still ? "none" : "opacity 0.4s ease",
                  }}
                >
                  <span
                    className="mb-2 block"
                    style={{
                      color: AZZURRO,
                      fontFamily: "var(--font-barlow), system-ui, sans-serif",
                      fontSize: mobile ? 11 : 13,
                      fontWeight: 500,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                    }}
                  >
                    {subtitle}
                  </span>
                  <span
                    className="block overflow-hidden"
                    style={{
                      color: "#f5f9fc",
                      fontFamily: "var(--font-barlow-condensed), system-ui, sans-serif",
                      fontSize: mobile ? 22 : 30,
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.05,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {item.alt}
                  </span>
                </span>
              </button>
            );
          })}
      </div>

      {total > 1 && (
        <div
          onPointerDown={(event) => event.stopPropagation()}
          className="absolute z-[200] flex"
          style={{
            top: buttonInset,
            right: buttonInset,
            flexDirection: upright ? "column" : "row",
            gap: mobile ? 8 : 12,
          }}
        >
          <button
            type="button"
            className={`${scope}-nav`}
            aria-label="Elemento precedente"
            onClick={() => shift(-1)}
          >
            <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points={backPoints} />
            </svg>
          </button>
          <button
            type="button"
            className={`${scope}-nav`}
            aria-label="Elemento successivo"
            onClick={() => shift(1)}
          >
            <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points={forwardPoints} />
            </svg>
          </button>
        </div>
      )}

      <div
        role="radiogroup"
        aria-label="Orientamento della gallery"
        onPointerDown={(event) => event.stopPropagation()}
        className="absolute z-[210] grid grid-cols-2"
        style={{
          top: buttonInset,
          left: buttonInset,
          height: mobile ? 40 : 44,
          padding: 4,
          borderRadius: 999,
          background: "rgba(15, 21, 28, 0.55)",
          border: "1px solid rgba(245, 249, 252, 0.16)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <div
          aria-hidden="true"
          className="absolute top-1 bottom-1 left-1 rounded-full"
          style={{
            width: "calc(50% - 4px)",
            background: AZZURRO,
            transform: `translateX(${upright ? 100 : 0}%)`,
            transition: `transform ${still ? "0s" : "0.45s"} ${BUTTON_CURVE}`,
          }}
        />
        {(
          [
            ["horizontal", "Orizzontale"],
            ["vertical", "Verticale"],
          ] as const
        ).map(([value, label]) => {
          const active = direction === value;
          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={active}
              aria-label={label}
              onClick={() => setDirection(value)}
              className="relative z-[1] border-0 bg-transparent"
              style={{
                height: "100%",
                padding: showLabels ? "0 0.85rem" : "0 0.7rem",
                borderRadius: 999,
                cursor: active ? "default" : "pointer",
                color: active ? "#0f151c" : "rgba(245, 249, 252, 0.78)",
                fontFamily: "var(--font-barlow), system-ui, sans-serif",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.02em",
                whiteSpace: "nowrap",
              }}
            >
              {showLabels ? label : value === "horizontal" ? "↔" : "↕"}
            </button>
          );
        })}
      </div>
    </div>
  );
}
