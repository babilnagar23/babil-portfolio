"use client";

import Image from "next/image";
import { useState } from "react";
import { personal } from "@/data/portfolio";

export default function ProfileAvatar() {
  const [imgError, setImgError] = useState(false);
  const initials = `${personal.name[0]}${personal.lastName[0]}`;

  return (
    <div className="relative flex items-center justify-center">
      <div
        className="absolute w-[min(340px,85vw)] h-[min(340px,85vw)] rounded-full bg-hero-glow animate-pulse-glow"
        aria-hidden
      />
      <div
        className="absolute w-[min(300px,78vw)] h-[min(300px,78vw)] rounded-full border border-accent/20 shadow-glow"
        aria-hidden
      />

      <div className="relative w-[min(260px,68vw)] h-[min(260px,68vw)] rounded-full overflow-hidden border-2 border-white/10 bg-card shadow-glow ring-4 ring-accent/20">
        {!imgError ? (
          <Image
            src="/profile.jpg"
            alt={`${personal.name} ${personal.lastName}`}
            fill
            className="object-cover object-center scale-105 hover:scale-110 transition-transform duration-700"
            priority
            onError={() => setImgError(true)}
            sizes="(max-width: 768px) 68vw, 260px"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-navy-3 via-card to-navy-2">
            <span className="text-7xl md:text-8xl font-bold text-white/10 select-none">
              {initials}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
