"use client";

import { useTheme } from "next-themes";

export default function SpaceBackground() {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden transition-colors duration-300 pointer-events-none" style={{ backgroundColor: isLight ? 'var(--bg-primary)' : '#000000' }}>
      {/* Subtle radial gradient behind the hero section for depth */}
      <div 
        className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full blur-3xl opacity-50"
        style={{
          background: isLight 
            ? "radial-gradient(circle, rgba(45, 212, 163, 0.08) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
