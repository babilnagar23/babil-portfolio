"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";

const randomFromIndex = (index: number, salt: number) => {
  const value = Math.sin(index * 999 + salt * 101) * 10000;
  return value - Math.floor(value);
};

const stars = Array.from({ length: 120 }, (_, i) => ({
  id: i,
  size: randomFromIndex(i, 1) * 3,
  top: randomFromIndex(i, 2) * 100,
  left: randomFromIndex(i, 3) * 100,
  opacity: randomFromIndex(i, 4),
  duration: randomFromIndex(i, 5) * 4 + 2,
}));

const initialParticles = Array.from({ length: 100 }, (_, i) => ({
  id: i,
  baseTop: randomFromIndex(i, 6) * 100,
  baseLeft: randomFromIndex(i, 7) * 100,
  duration: randomFromIndex(i, 8) * 10 + 5,
}));

interface ParticlePosition {
  top: number;
  left: number;
}

export default function SpaceBackground() {
  const [particlePositions, setParticlePositions] = useState<Record<number, ParticlePosition>>({});
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  useEffect(() => {
    // Initialize particle positions
    const positions: Record<number, ParticlePosition> = {};
    initialParticles.forEach((p) => {
      positions[p.id] = { top: p.baseTop, left: p.baseLeft };
    });
    setParticlePositions(positions);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      const newPositions = { ...particlePositions };
      const repulsionDistance = 150;
      const repulsionForce = 30;

      initialParticles.forEach((particle) => {
        const dx = e.clientX - (particle.baseLeft * window.innerWidth) / 100;
        const dy = e.clientY - (particle.baseTop * window.innerHeight) / 100;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < repulsionDistance) {
          const angle = Math.atan2(dy, dx);
          const force = (1 - distance / repulsionDistance) * repulsionForce;
          
          newPositions[particle.id] = {
            top: particle.baseTop - (Math.sin(angle) * force) / (window.innerHeight / 100),
            left: particle.baseLeft - (Math.cos(angle) * force) / (window.innerWidth / 100),
          };
        } else {
          newPositions[particle.id] = {
            top: particle.baseTop,
            left: particle.baseLeft,
          };
        }
      });

      setParticlePositions(newPositions);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-navy">
      {/* Main dark gradient */}
      <div className="absolute inset-0 bg-navy" />

      {/* Deep blue glow - nearly invisible */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-black/5 blur-3xl" />

      {/* Cyan glow - nearly invisible */}
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-black/5 blur-3xl" />

      {/* Center glow - nearly invisible */}
      <div className="absolute top-1/2 left-1/2 w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/5 blur-3xl" />

      {/* Stars */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <motion.span
            key={star.id}
            className="absolute rounded-full bg-bright"
            suppressHydrationWarning
            style={{
              width: `${star.size * (isLight ? 0.6 : 1)}px`,
              height: `${star.size * (isLight ? 0.6 : 1)}px`,
              top: `${star.top}%`,
              left: `${star.left}%`,
              opacity: isLight ? Math.min(star.opacity * 0.25, 0.22) : star.opacity,
              backgroundColor: isLight ? "rgba(45,212,163,0.28)" : undefined,
            }}
            animate={{
              opacity: isLight ? [0.04, 0.22, 0.04] : [0.2, 1, 0.2],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0" ref={containerRef}>
        {initialParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 rounded-full bg-accent shadow-lg shadow-accent/30"
            suppressHydrationWarning
            style={{
              top: `${particlePositions[particle.id]?.top ?? particle.baseTop}%`,
              left: `${particlePositions[particle.id]?.left ?? particle.baseLeft}%`,
              width: isLight ? "0.15rem" : "0.25rem",
              height: isLight ? "0.15rem" : "0.25rem",
              backgroundColor: isLight ? "rgba(45,212,163,0.28)" : undefined,
              boxShadow: isLight ? "0 0 10px rgba(45,212,163,0.22)" : undefined,
            }}
            animate={{
              y: [0, -40, 20, 0],
              x: [0, 15, -20, 0],
              opacity: isLight ? [0.08, 0.3, 0.18, 0.08] : [0.3, 1, 0.6, 0.3],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(color-mix(in srgb, var(--text) 10%, transparent) 1px, transparent 1px),
            linear-gradient(90deg, color-mix(in srgb, var(--text) 10%, transparent) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
    </div>
  );
}
