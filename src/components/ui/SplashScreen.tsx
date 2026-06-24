"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSplash } from "@/components/providers/SplashProvider";
type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
};

const generateParticles = (count: number): Particle[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 3 + 4,
    delay: Math.random() * 1.5,
  }));
};

export default function SplashScreen() {
  const [show, setShow] = useState(true);
  const [particles, setParticles] = useState<Particle[]>([]);
  const { setShowSplash } = useSplash();

  useEffect(() => {
    setParticles(generateParticles(55));

    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("splash-seen", "true");
      setShowSplash(false);
      document.body.style.overflow = "";
    }, 8500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [setShowSplash]);

  if (!show) return null;

  const name = "BABIL NAGAR";

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

            .splash-text {
              font-family: 'Space Grotesk', sans-serif;
            }

            @keyframes drift {
              0% { transform: translateY(0px); }
              50% { transform: translateY(-12px); }
              100% { transform: translateY(0px); }
            }

            @keyframes sweep {
              0% { background-position: 200% 0; }
              100% { background-position: -200% 0; }
            }

            .light-sweep {
              background: linear-gradient(
                90deg,
                transparent,
                rgba(255, 255, 255, 0.45),
                transparent
              );
              background-size: 200% 100%;
              animation: sweep 1.8s ease-in-out infinite;
            }
          `,
        }}
      />

      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505] overflow-hidden"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 7.8, duration: 0.7, ease: "easeInOut" }}
      >
        {/* Background particles */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        >
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-blue-100"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                boxShadow: "0 0 10px 2px rgba(180, 210, 255, 0.55)",
                animation: "drift 6s ease-in-out infinite",
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: [0, 0.25, 0.8, 0.35, 0],
                scale: [0.5, 1, 1.2, 1, 0.7],
                y: [0, -14, -24, -10, 0],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                ease: "easeInOut",
                times: [0, 0.18, 0.45, 0.75, 1],
                repeat: Infinity,
              }}
            />
          ))}
        </motion.div>

        {/* Center bloom */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] md:w-[42vw] md:h-[42vw] bg-[rgba(100,150,255,0.03)] blur-[130px] rounded-full pointer-events-none"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{
            opacity: [0, 0.85, 0.7, 0],
            scale: [0.7, 1.1, 1.25, 0.8],
          }}
          transition={{
            times: [0, 0.35, 0.75, 1],
            duration: 8.5,
            ease: "easeInOut",
          }}
        />

        {/* Scene 1: HELLO + this side ... */}
        {/* We fade the whole container out before the name reveals */}
        <motion.div
          className="absolute flex items-end justify-center gap-3 md:gap-4"
          initial={{ opacity: 1, y: 0 }}
          animate={{
            opacity: [1, 1, 0],
            y: [0, 0, -10]
          }}
          transition={{
            times: [0, 0.8, 1],
            duration: 3.2,
            ease: "easeInOut",
          }}
        >
          <motion.h1
            className="splash-text text-white font-bold text-6xl sm:text-7xl md:text-8xl tracking-tight leading-none"
            initial={{ opacity: 0, scale: 0.18, filter: "blur(12px)" }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 2.5,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            HELLO
          </motion.h1>

          <motion.span
            className="splash-text text-white/70 font-light text-sm sm:text-base md:text-lg tracking-wide mb-2 sm:mb-3 md:mb-4"
            initial={{ opacity: 0, x: -14, filter: "blur(8px)" }}
            animate={{
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
            }}
            transition={{
              delay: 0.5,
              duration: 2.0,
              ease: "easeOut",
            }}
          >
            this side ...
          </motion.span>
        </motion.div>

        {/* Main content: BABIL NAGAR */}
        <motion.div
          className="relative flex flex-col items-center justify-center w-full max-w-5xl px-4"
          initial={{ opacity: 1, scale: 1, y: 0 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
        >
          {/* Babil Nagar name reveal */}
          <motion.div
            className="relative flex flex-col items-center justify-center mb-6 md:mb-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: [0, 0, 1, 1],
              scale: [0.95, 0.95, 1, 1],
            }}
            transition={{
              times: [0, 0.38, 0.55, 1],
              duration: 8.5,
              ease: "easeOut",
            }}
          >
            <h1 className="text-white text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-semibold splash-text tracking-tight text-center">
              {name.split("").map((letter, index) => (
                <motion.span
                  key={`${letter}-${index}`}
                  className="inline-block"
                  initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }}
                  transition={{
                    delay: 3.2 + index * 0.08,
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </h1>

            {/* Sweep over name */}
            <motion.div
              className="absolute inset-0 pointer-events-none mix-blend-overlay"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)",
                backgroundSize: "200% 100%",
                backgroundRepeat: "no-repeat",
              }}
              initial={{ backgroundPosition: "200% 0", opacity: 0 }}
              animate={{
                backgroundPosition: ["200% 0", "200% 0", "-200% 0", "-200% 0"],
                opacity: [0, 0, 1, 0],
              }}
              transition={{
                times: [0, 0.55, 0.7, 1],
                duration: 8.5,
                ease: "easeInOut",
              }}
            />

            {/* Glow behind name */}
            <motion.div
              className="absolute inset-0 bg-blue-400 blur-[46px] -z-10 rounded-full"
              initial={{ opacity: 0, scale: 0.45 }}
              animate={{
                opacity: [0, 0, 0.22, 0.45, 0.34, 0],
                scale: [0.45, 0.45, 1.02, 1.3, 1.5, 0.6],
              }}
              transition={{
                times: [0, 0.45, 0.55, 0.75, 0.9, 1],
                duration: 8.5,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Subtitle */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 4.8,
              duration: 1.5,
              ease: "easeOut",
            }}
          >
            <div className="flex flex-col items-center text-white/70 font-light text-sm md:text-base text-center splash-text">
              <span className="tracking-wide mb-1">Full Stack Developer</span>
              <span className="tracking-wide">AI & Data Science Enthusiast</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}