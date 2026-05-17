"use client";

import { useEffect, useState } from "react";

export function useTypingEffect(
  roles: string[],
  suffix: string = " · VIT BHOPAL",
  typingSpeed = 80,
  deletingSpeed = 38,
  pauseMs = 1900
) {
  const [displayText, setDisplayText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), 1200);
    return () => clearTimeout(startTimer);
  }, []);

  useEffect(() => {
    if (!started) return;

    const currentRole = roles[roleIndex];
    let delay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
      delay = pauseMs;
    }

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentRole.length) {
          const next = currentRole.slice(0, charIndex + 1);
          setDisplayText(next + suffix);
          setCharIndex(charIndex + 1);
        } else {
          setIsDeleting(true);
        }
      } else {
        if (charIndex > 0) {
          const next = currentRole.slice(0, charIndex - 1);
          setDisplayText(next + suffix);
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setRoleIndex((i) => (i + 1) % roles.length);
        }
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [
    started,
    roles,
    roleIndex,
    charIndex,
    isDeleting,
    suffix,
    typingSpeed,
    deletingSpeed,
    pauseMs,
  ]);

  return displayText || roles[0] + (suffix || "");
}
