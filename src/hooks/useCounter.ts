"use client";

import { useEffect, useState } from "react";

export function useCounter(
  target: number,
  enabled: boolean,
  duration = 45,
  intervalMs = 28
) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    const step = target / duration;
    let current = 0;

    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      setValue(Math.floor(current));
      if (current >= target) clearInterval(timer);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [target, enabled, duration, intervalMs]);

  return value;
}
