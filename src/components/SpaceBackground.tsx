"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

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
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#000000]">
      {/* Main dark gradient */}
      <div className="absolute inset-0 bg-[#000000]" />

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
            className="absolute rounded-full bg-white"
            suppressHydrationWarning
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              top: `${star.top}%`,
              left: `${star.left}%`,
              opacity: star.opacity,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
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
            className="absolute w-1 h-1 bg-gray-500 rounded-full shadow-lg shadow-gray-400"
            suppressHydrationWarning
            style={{
              top: `${particlePositions[particle.id]?.top ?? particle.baseTop}%`,
              left: `${particlePositions[particle.id]?.left ?? particle.baseLeft}%`,
            }}
            animate={{
              y: [0, -40, 20, 0],
              x: [0, 15, -20, 0],
              opacity: [0.3, 1, 0.6, 0.3],
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
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
    </div>
  );
}
