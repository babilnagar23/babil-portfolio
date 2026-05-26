"use client";

import { navLinks, personal } from "@/data/portfolio";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

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
        <a href="#hero" className="text-lg font-bold gradient-text no-underline">
          {personal.logo}
        </a>

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

          <a href={personal.cv} download className="hidden md:inline-flex btn-ghost text-xs py-2 px-4">
            Download CV
          </a>
        </div>
      </nav>
    </header>
  );
}
