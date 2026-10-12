"use client";

import { useEffect, useRef } from "react";

const SPACING = 56;
const DOT = 3.5;
const REACH = 150;
const LINE = "rgba(139, 154, 170, 0.16)";
const DOT_REST = "rgba(139, 154, 170, 0.38)";
const DOT_HOT = "rgba(66, 180, 232, 0.95)";

export default function DotsField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const mouse = { x: -1000, y: -1000 };
    let frame = 0;

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.floor(window.innerWidth * ratio);
      canvas.height = Math.floor(window.innerHeight * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      context.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / SPACING);
      const rows = Math.ceil(height / SPACING);

      context.strokeStyle = LINE;
      context.lineWidth = 1;
      context.beginPath();
      for (let col = 0; col <= cols; col += 1) {
        const x = col * SPACING + SPACING / 2;
        context.moveTo(x, 0);
        context.lineTo(x, height);
      }
      for (let row = 0; row <= rows; row += 1) {
        const y = row * SPACING + SPACING / 2;
        context.moveTo(0, y);
        context.lineTo(width, y);
      }
      context.stroke();

      for (let row = 0; row <= rows; row += 1) {
        for (let col = 0; col <= cols; col += 1) {
          const x = col * SPACING + SPACING / 2;
          const y = row * SPACING + SPACING / 2;
          const distance = Math.hypot(mouse.x - x, mouse.y - y);
          const near = distance < REACH ? 1 - distance / REACH : 0;
          context.beginPath();
          context.fillStyle = near > 0.08 ? DOT_HOT : DOT_REST;
          context.globalAlpha = near > 0.08 ? 0.35 + near * 0.65 : 0.38;
          context.arc(x, y, DOT + near * 1.5, 0, Math.PI * 2);
          context.fill();
        }
      }
      context.globalAlpha = 1;
    };

    const paint = () => {
      frame = 0;
      draw();
    };

    const onMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      if (frame) return;
      frame = window.requestAnimationFrame(paint);
    };

    const onLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      paint();
    };

    const onResize = () => {
      resize();
      paint();
    };

    resize();
    paint();
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas ref={canvasRef} className="dots-field" aria-hidden="true" />;
}
