"use client";

import { motion } from "framer-motion";

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

const particles = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  top: randomFromIndex(i, 6) * 100,
  left: randomFromIndex(i, 7) * 100,
  duration: randomFromIndex(i, 8) * 10 + 5,
}));

export default function SpaceBackground() {
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
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-gray-500 rounded-full"
            suppressHydrationWarning
            style={{
              top: `${particle.top}%`,
              left: `${particle.left}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
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
