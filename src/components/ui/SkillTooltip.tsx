"use client";

import { motion, AnimatePresence } from "framer-motion";

interface SkillTooltipProps {
  name: string;
  isVisible: boolean;
}

export default function SkillTooltip({ name, isVisible }: SkillTooltipProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 5, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-md text-[11px] font-medium tracking-wide z-50 pointer-events-none"
          style={{
            background: "rgba(var(--surface-rgb), 0.75)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            color: "var(--text-rgb)",
          }}
        >
          {name}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
