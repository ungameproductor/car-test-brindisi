"use client";

import { useRef, useState, type MouseEvent, type ReactNode } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./garage-intro.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

let introPlayed = false;

if (typeof window !== "undefined") {
  history.scrollRestoration = "manual";
}

export function hasIntroPlayed() {
  return introPlayed;
}

interface GarageIntroProps {
  children: ReactNode;
  onComplete: () => void;
}

type LenisScroll = {
  scrollTo: (
    target: number | string | HTMLElement,
    options?: { immediate?: boolean; force?: boolean; offset?: number }
  ) => void;
};

const SLATS = ["slatA", "slatB", "slatC", "slatB", "slatD", "slatA", "slatC", "slatB"] as const;

function getLenis() {
  return (window as unknown as { __lenis?: LenisScroll }).__lenis;
}

export default function GarageIntro({ children, onComplete }: GarageIntroProps) {
  const stageRef = useRef<HTMLElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const doorRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);
  const spillRef = useRef<HTMLDivElement>(null);
  const sillRef = useRef<HTMLDivElement>(null);
  const dimRef = useRef<HTMLDivElement>(null);
  const hazeRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef<HTMLAnchorElement>(null);
  const [heroLocked, setHeroLocked] = useState(false);

  const setLocked = (locked: boolean) => {
    if (revealRef.current) revealRef.current.inert = locked;
    setHeroLocked(locked);
  };

  useGSAP(
    () => {
      const revealSite = () => {
        setLocked(false);
        if (introPlayed) return;
        introPlayed = true;
        onComplete();
      };

      const showFinal = () => {
        gsap.set(introRef.current, { autoAlpha: 0 });
        gsap.set(skipRef.current, { autoAlpha: 0 });
        gsap.set(".site-header, .whatsapp-fab", { autoAlpha: 1 });
        if (doorRef.current) doorRef.current.style.willChange = "auto";
        if (shellRef.current) shellRef.current.style.willChange = "auto";
        revealSite();
      };

      if (introPlayed) {
        showFinal();
        return;
      }

      history.scrollRestoration = "manual";
      const resetScroll = () => {
        getLenis()?.scrollTo(0, { immediate: true, force: true });
        window.scrollTo(0, 0);
      };
      resetScroll();
      setLocked(true);
      gsap.set(".site-header, .whatsapp-fab", { autoAlpha: 0 });

      // Il browser può ripristinare lo scroll dopo l'hydration e saltare la serranda.
      let interacted = false;
      const markInteracted = () => {
        interacted = true;
      };
      window.addEventListener("pointerdown", markInteracted, { passive: true });
      window.addEventListener("wheel", markInteracted, { passive: true });
      window.addEventListener("touchstart", markInteracted, { passive: true });
      window.addEventListener("keydown", markInteracted);
      const startedAt = performance.now();
      const holdStart = () => {
        if (interacted || introPlayed || performance.now() - startedAt > 700) return;
        if (window.scrollY > 40) resetScroll();
        requestAnimationFrame(holdStart);
      };
      holdStart();

      const mm = gsap.matchMedia();

      const play = (distance: string, scrub: boolean | number) => {
        const stage = stageRef.current;
        const shell = shellRef.current;
        const door = doorRef.current;
        const hint = hintRef.current;
        const spill = spillRef.current;
        const sill = sillRef.current;
        const dim = dimRef.current;
        const intro = introRef.current;
        const skip = skipRef.current;
        if (!stage || !shell || !door || !hint || !spill || !sill || !dim || !intro || !skip) return;

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            id: "garage",
            trigger: stage,
            start: "top top",
            end: distance,
            pin: true,
            scrub,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onToggle: (self) => {
              const value = self.isActive ? "transform" : "auto";
              door.style.willChange = value;
              shell.style.willChange = value;
            },
            onLeave: revealSite,
          },
        });

        // 0–12% logo fermo e CTA che si dissolve.
        // 12–46% la serranda sale.
        // 40–82% la camera entra nell'apertura (translateZ al posto dello scale).
        // 82–100% dissolvenza sulla homepage.
        timeline
          .to(hint, { autoAlpha: 0, duration: 0.16 }, 0)
          .to(spill, { opacity: 0.55, duration: 0.12 }, 0)
          .to(sill, { opacity: 0.75, duration: 0.12 }, 0)
          .to(door, { yPercent: -6, duration: 0.12 }, 0)
          .to(door, { yPercent: -108, duration: 0.34, ease: "power2.inOut" }, 0.1)
          .to(spill, { opacity: 0.85, duration: 0.34 }, 0.1)
          .to(sill, { opacity: 1, duration: 0.34 }, 0.1)
          .to(dim, { opacity: 0.14, duration: 0.34 }, 0.1)
          .to(shell, { z: 1120, ease: "power2.in", duration: 0.36, force3D: true }, 0.38)
          .to(dim, { opacity: 0, duration: 0.22 }, 0.46)
          .to(intro, { autoAlpha: 0, duration: 0.14 }, 0.84)
          .to(skip, { autoAlpha: 0, duration: 0.08 }, 0.8)
          .to(
            ".site-header, .whatsapp-fab",
            { autoAlpha: 1, duration: 0.1, onStart: revealSite },
            0.9
          );
      };

      // Con «riduci movimento» la serranda resta la prima schermata, ma lo scroll
      // necessario per aprirla è di una sola viewport e senza inerzia.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        play("+=100%", true);
      });
      mm.add("(prefers-reduced-motion: no-preference) and (max-width: 767px)", () => {
        play("+=200%", true);
      });
      mm.add(
        "(prefers-reduced-motion: no-preference) and (min-width: 768px) and (max-width: 1023px)",
        () => {
          play("+=300%", 0.25);
        }
      );
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 1024px)", () => {
        play("+=400%", 0.35);
      });
      mm.add("all", () => {
        if (ScrollTrigger.getById("garage")) return;
        play("+=200%", true);
      });

      return () => {
        window.removeEventListener("pointerdown", markInteracted);
        window.removeEventListener("wheel", markInteracted);
        window.removeEventListener("touchstart", markInteracted);
        window.removeEventListener("keydown", markInteracted);
        mm.revert();
      };
    },
    { dependencies: [onComplete] }
  );

  const skipIntro = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const trigger = ScrollTrigger.getById("garage");

    if (trigger) {
      trigger.animation?.progress(1);
      trigger.kill(true);
    }

    gsap.set(introRef.current, { autoAlpha: 0 });
    gsap.set(skipRef.current, { autoAlpha: 0 });
    gsap.set(".site-header, .whatsapp-fab", { autoAlpha: 1 });
    if (doorRef.current) doorRef.current.style.willChange = "auto";
    if (shellRef.current) shellRef.current.style.willChange = "auto";
    setLocked(false);
    if (!introPlayed) {
      introPlayed = true;
      onComplete();
    }

    const main = document.getElementById("contenuto");
    if (!main) return;

    requestAnimationFrame(() => {
      const scroller = getLenis();
      const header = document.querySelector(".site-header");
      const offset = header ? -(header.getBoundingClientRect().height + 12) : -80;
      if (scroller) scroller.scrollTo(main, { immediate: true, force: true, offset });
      else main.scrollIntoView({ block: "start" });
      main.focus({ preventScroll: true });
    });
  };

  return (
    <section id="stage" ref={stageRef} className={styles.stage}>
      <a ref={skipRef} href="#contenuto" className={styles.skip} onClick={skipIntro}>
        Salta intro
      </a>

      <div ref={revealRef} className={styles.reveal} inert={heroLocked}>
        {children}
      </div>

      <div id="intro" ref={introRef} className={styles.intro} aria-hidden="true">
        <div ref={shellRef} className={styles.shell}>
          <div className={styles.wallTop} />
          <div className={styles.wallMid}>
            <div className={`${styles.wallSide} ${styles.wallSideLeft}`} />
            <div className={styles.frame}>
              <div className={styles.lintel}>
                <div className={styles.grazing} />
              </div>
              <div className={styles.opening}>
                <div className={`${styles.rail} ${styles.railLeft}`} />
                <div className={styles.doorway}>
                  <div className={styles.interior}>
                    <div ref={hazeRef} className={styles.haze}>
                      <span className={styles.tube} />
                      <span className={styles.tubeFar} />
                      <span className={`${styles.post} ${styles.postLeft}`} />
                      <span className={`${styles.post} ${styles.postRight}`} />
                      <span className={styles.beam} />
                      <span className={styles.vehicle} />
                      <span className={styles.cabinet} />
                      <span className={styles.bayFloor} />
                    </div>
                    <div ref={dimRef} className={styles.dim} />
                    <div ref={sillRef} className={styles.sill} />
                  </div>
                  <div ref={doorRef} className={styles.door}>
                    {SLATS.map((variant, index) => (
                      <div key={variant + index} className={`${styles.slat} ${styles[variant]}`} />
                    ))}
                    <div className={styles.doorShade} />
                    <div className={styles.centerWash} />
                    <div className={styles.logoPlate}>
                      <span className={styles.logoGlow} />
                      <Image
                        src="/brand/logo-trim.png"
                        alt=""
                        width={501}
                        height={200}
                        preload
                        unoptimized
                        draggable={false}
                        className={styles.logoImg}
                      />
                      <span className={styles.sheen} />
                    </div>
                    <div className={styles.lip} />
                  </div>
                </div>
                <div className={`${styles.rail} ${styles.railRight}`} />
              </div>
            </div>
            <div className={`${styles.wallSide} ${styles.wallSideRight}`} />
          </div>
          <div className={styles.threshold}>
            <div className={styles.ground} />
            <div ref={spillRef} className={styles.spill} />
            <p ref={hintRef} className={styles.hint}>
              <span className={styles.hintLabel}>Scorri per entrare in officina</span>
              <span className={styles.cue} />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
