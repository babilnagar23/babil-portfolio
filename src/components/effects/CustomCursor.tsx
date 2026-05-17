"use client";

import { useEffect, useRef, useState } from "react";

const LERP_DOT = 0.22;
const LERP_RING = 0.11;

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const target = useRef({ x: 0, y: 0 });
  const dot = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const dotEl = useRef<HTMLDivElement>(null);
  const ringEl = useRef<HTMLDivElement>(null);
  const frameId = useRef(0);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (coarse || reduced) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      dot.current.x += (target.current.x - dot.current.x) * LERP_DOT;
      dot.current.y += (target.current.y - dot.current.y) * LERP_DOT;
      ring.current.x += (target.current.x - ring.current.x) * LERP_RING;
      ring.current.y += (target.current.y - ring.current.y) * LERP_RING;

      if (dotEl.current) {
        dotEl.current.style.transform = `translate3d(${dot.current.x}px, ${dot.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringEl.current) {
        ringEl.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;
      }

      frameId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    frameId.current = requestAnimationFrame(animate);

    const selectors = "a, button, .card-3d, .card-glass, [data-cursor-hover]";
    const onEnter = () => setHovered(true);
    const onLeave = () => setHovered(false);

    const bindHover = () => {
      document.querySelectorAll(selectors).forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    bindHover();
    const observer = new MutationObserver(bindHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frameId.current);
      observer.disconnect();
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotEl}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] will-change-transform mix-blend-screen"
        style={{
          background: hovered
            ? "radial-gradient(circle, #C084FC, #A855F7)"
            : "#A855F7",
          boxShadow: "0 0 12px rgba(168,85,247,0.8)",
          scale: hovered ? "2" : "1",
          transition: "scale 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        aria-hidden
      />
      <div
        ref={ringEl}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] will-change-transform border border-accent/50"
        style={{
          width: hovered ? 48 : 36,
          height: hovered ? 48 : 36,
          transition: "width 0.4s cubic-bezier(0.22, 1, 0.36, 1), height 0.4s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.3s ease",
          boxShadow: hovered
            ? "0 0 24px rgba(168,85,247,0.25)"
            : "0 0 12px rgba(168,85,247,0.1)",
        }}
        aria-hidden
      />
    </>
  );
}
