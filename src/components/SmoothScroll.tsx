"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    let ticker: ((time: number) => void) | null = null;

    const stop = () => {
      if (ticker) gsap.ticker.remove(ticker);
      ticker = null;
      lenis?.destroy();
      lenis = null;
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };

    const start = () => {
      if (lenis || motion.matches) return;

      lenis = new Lenis({ lerp: 0.1 });
      lenis.on("scroll", ScrollTrigger.update);
      const instance = lenis;
      ticker = (time: number) => {
        instance.raf(time * 1000);
      };
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    };

    const onChange = () => {
      if (motion.matches) stop();
      else start();
    };

    start();
    motion.addEventListener("change", onChange);

    return () => {
      motion.removeEventListener("change", onChange);
      stop();
    };
  }, []);

  return null;
}
