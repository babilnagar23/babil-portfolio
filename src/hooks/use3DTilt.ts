"use client";

import { useCallback, useRef } from "react";

export function use3DTilt() {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = ref.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateY = ((x - cx) / cx) * 7;
    const rotateX = -((y - cy) / cy) * 5;

    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(5px)`;
  }, []);

  const onMouseLeave = useCallback(() => {
    const card = ref.current;
    if (!card) return;
    card.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)";
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
