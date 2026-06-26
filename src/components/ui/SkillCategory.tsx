"use client";

import { motion } from "framer-motion";
import SkillsGrid from "./SkillsGrid";
import { use3DTilt } from "@/hooks/use3DTilt";
import { useState } from "react";

interface Skill {
  name: string;
  icon: string;
  color: string;
}

interface SkillCategoryProps {
  title: string;
  skills: Skill[];
}

export default function SkillCategory({ title, skills }: SkillCategoryProps) {
  const { ref, onMouseMove, onMouseLeave } = use3DTilt();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        onMouseMove(e);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={(e) => {
        onMouseLeave();
        setIsHovered(false);
      }}
      whileHover={{ y: -4 }}
      className="relative overflow-hidden rounded-[20px] p-5 h-full transition-all duration-500 ease-out flex flex-col"
      style={{
        background: "var(--surface-rgb)",
        backgroundColor: "rgba(var(--surface-rgb), 0.4)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        boxShadow: isHovered 
          ? "0 20px 40px -10px rgba(0,0,0,0.3), 0 0 20px rgba(var(--primary-rgb), 0.15)"
          : "0 10px 30px -10px rgba(0,0,0,0.2)",
      }}
    >
      {/* CSS Noise Texture (Lightweight SVG data URI) */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Hover Gradient Overlay */}
      <div 
        className="absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(var(--primary-rgb), 0.1) 0%, transparent 100%)",
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Animated Border Glow */}
      <div 
        className="absolute inset-0 rounded-[24px] border border-transparent pointer-events-none transition-colors duration-500 z-10"
        style={{
          borderColor: isHovered ? "rgba(var(--primary-rgb), 0.3)" : "transparent",
        }}
      />

      <div className="relative z-10 mb-4">
        <h3 className="text-accent font-bold text-sm tracking-[0.2em] uppercase">
          {title}
        </h3>
        <div className="h-px w-12 bg-accent/30 mt-3 transition-all duration-300" style={{ width: isHovered ? '48px' : '24px' }} />
      </div>

      <div className="relative z-10 flex-grow flex items-center justify-center">
        <SkillsGrid skills={skills} />
      </div>
    </motion.div>
  );
}
