"use client";

import { footer, personal } from "@/data/portfolio";
import { FiArrowUp, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

const COPYRIGHT_YEAR = 2026;

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="border-t border-white/[0.06] px-6 py-12 md:px-12 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-10">
        <div>
          <p className="text-xl font-bold gradient-text mb-2">{personal.logo}</p>
          <p className="text-txt text-sm max-w-sm leading-relaxed">{footer.tagline}</p>
        </div>
        <div className="flex gap-3">
          <a href={personal.github} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="GitHub">
            <FiGithub size={18} />
          </a>
          <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="LinkedIn">
            <FiLinkedin size={18} />
          </a>
          <a href={`mailto:${personal.email}`} className="icon-btn" aria-label="Email">
            <FiMail size={18} />
          </a>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-white/[0.06]">
        <p className="text-dim text-xs">
          © {COPYRIGHT_YEAR} {personal.name} {personal.lastName}. All rights reserved.
        </p>
        <button
          type="button"
          onClick={scrollTop}
          suppressHydrationWarning
          className="flex items-center gap-2 text-txt text-sm hover:text-bright transition-colors bg-transparent border-none cursor-pointer font-sans"
        >
          Back to top
          <span className="icon-btn w-8 h-8"><FiArrowUp size={14} /></span>
        </button>
      </div>
    </footer>
  );
}
