"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import SkillTooltip from "./SkillTooltip";
import { skillIconsMap } from "@/utils/skillIcons";

interface SkillIconProps {
  name: string;
  icon: string;
  color: string;
}

export default function SkillIcon({ name, icon, color }: SkillIconProps) {
  const IconComponent = skillIconsMap[icon];
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Mouse position values for magnetic and tilt effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for translation and rotation
  const springConfig = { damping: 15, stiffness: 150, mass: 0.5 };
  const tx = useSpring(mouseX, springConfig);
  const ty = useSpring(mouseY, springConfig);

  // Map mouse movement to translation (magnetic effect max 5px)
  const translateX = useTransform(tx, [-0.5, 0.5], [-5, 5]);
  const translateY = useTransform(ty, [-0.5, 0.5], [-5, 5]);

  // Map mouse movement to rotation (max 5 degrees)
  const rotateX = useTransform(ty, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(tx, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const centerX = rect.left + width / 2;
    const centerY = rect.top + height / 2;
    
    // Normalized values between -0.5 and 0.5
    const x = (e.clientX - centerX) / width;
    const y = (e.clientY - centerY) / height;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  // Floating animation with randomized delay
  const floatDelay = useRef(Math.random() * 2).current;
  const floatDuration = useRef(3 + Math.random() * 1).current;

  // Stagger variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      className="relative flex items-center justify-center"
      style={{ perspective: 1000 }}
    >
      {/* Floating Wrapper */}
      <motion.div
        animate={{
          y: [-3, 3, -3],
        }}
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay,
        }}
      >
        {/* Interactive Wrapper */}
        <motion.div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setIsFocused(true);
            }
          }}
          style={{
            x: isHovered ? translateX : 0,
            y: isHovered ? translateY : 0,
            rotateX: isHovered ? rotateX : 0,
            rotateY: isHovered ? rotateY : 0,
            scale: isHovered || isFocused ? 1.12 : 1,
          }}
          transition={{ type: "spring", damping: 15, stiffness: 200 }}
          className="relative group cursor-pointer flex items-center justify-center rounded-full w-[44px] h-[44px] sm:w-[52px] sm:h-[52px]"
          tabIndex={0}
          role="button"
          aria-label={`Skill: ${name}`}
        >
          {/* Background and Border */}
          <div 
            className="absolute inset-0 rounded-full transition-all duration-300 shadow-sm"
            style={{
              background: "rgba(120, 120, 120, 0.04)",
              backdropFilter: "blur(4px)",
              border: `1px solid ${isHovered || isFocused ? color + '40' : 'rgba(150, 150, 150, 0.15)'}`,
              boxShadow: isHovered || isFocused ? `0 8px 24px -6px ${color}80, 0 0 16px ${color}40` : "0 4px 12px rgba(0,0,0,0.05)",
            }}
          />
          
          {/* Active Glow */}
          <div 
            className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 blur-md -z-10"
            style={{
              background: `radial-gradient(circle at center, ${color}60 0%, transparent 70%)`,
              opacity: isHovered || isFocused ? 1 : 0,
            }}
          />

          {/* Icon */}
          <div 
            className="relative z-10 text-[20px] sm:text-[24px] transition-colors duration-300"
            style={{ 
              color: isHovered || isFocused ? color : "var(--text-soft-rgb)",
              // Filter to apply solid color safely, fallback to text color
              filter: isHovered || isFocused ? "brightness(1.1)" : "grayscale(0.5) opacity(0.8)",
            }}
          >
            {IconComponent ? <IconComponent style={{ color: isHovered || isFocused ? color : 'currentColor' }} /> : <span className="text-xs">{name[0]}</span>}
          </div>

          <SkillTooltip name={name} isVisible={isHovered || isFocused} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
