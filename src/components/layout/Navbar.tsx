"use client";

import { navLinks, personal } from "@/data/portfolio";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useEffect, useState } from "react";
import { useSplash } from "@/components/providers/SplashProvider";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Navbar() {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const { isChatbotOpen, setChatbotOpen } = useSplash();

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("section[id]");
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      let current = "hero";
      sections.forEach((s) => {
        if (window.scrollY >= s.offsetTop - 120) current = s.id;
      });
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header>
      <nav
        className={`fixed top-0 left-0 right-0 z-[200] flex items-center justify-between px-6 py-5 md:px-12 transition-all duration-500 ${
          scrolled ? "glass-nav shadow-lg shadow-black/20" : "bg-transparent"
        }`}
        aria-label="Main navigation"
      >
        <motion.button
          onClick={() => setChatbotOpen(!isChatbotOpen)}
          className="relative flex items-center gap-3 no-underline group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle AI Assistant"
        >
          <div className="relative flex items-center justify-center">
            {/* Blue glow effect on hover */}
            <div className="absolute inset-0 rounded-full bg-blue-500/0 group-hover:bg-blue-400/30 blur-md transition-all duration-300" />
            
            {/* Active assistant ring pulse */}
            {isChatbotOpen && (
              <span className="absolute inset-0 rounded-full border-2 border-cyan-400 animate-ping opacity-75"></span>
            )}
            
            <Image
              src="/avatar.png"
              alt="Babil Nagar Avatar"
              width={48}
              height={48}
              className={`relative z-10 rounded-full border-2 transition-all duration-300 ${
                isChatbotOpen 
                  ? "border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)] rotate-3" 
                  : "border-white/10 group-hover:border-blue-400/50"
              } w-[36px] h-[36px] md:w-[48px] md:h-[48px] object-cover`}
              priority
            />
          </div>

          <span className="hidden md:block font-space-grotesk font-semibold text-white tracking-wide text-lg">
            Babil Nagar
          </span>
        </motion.button>

        <ul className="hidden md:flex gap-8 list-none m-0 p-0">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`text-sm no-underline transition-colors duration-300 ${
                  active === link.href.slice(1)
                    ? "text-bright"
                    : "text-txt hover:text-bright"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 md:gap-4">
          <ThemeToggle />

          <a
            href={personal.cv}
            download
            className="inline-flex md:hidden btn-ghost text-xs py-2 px-3"
          >
            CV
          </a>

          <a href={personal.cv} download className="hidden md:inline-flex btn-ghost text-xs py-2 px-4">
            Download CV
          </a>
        </div>
      </nav>
    </header>
  );
}
