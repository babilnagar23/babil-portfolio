"use client";

import { experience } from "@/data/portfolio";
import { use3DTilt } from "@/hooks/use3DTilt";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SectionHeading from "@/components/ui/SectionHeading";
import { FiArrowRight } from "react-icons/fi";

function formatBullet(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-bright font-medium">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default function Experience() {
  const { ref, onMouseMove, onMouseLeave } = use3DTilt();

  return (
    <section id="experience" className="section-padding" aria-labelledby="experience-heading">
      <SectionHeading
        title="Experience"
        subtitle="Open-source contributions and campus leadership beyond the classroom."
      />

      <RevealOnScroll>
        <article
          ref={ref}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          className="card-glass p-8 md:p-10 relative overflow-hidden max-w-4xl"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-line" aria-hidden />
          <div
            className="flex justify-between items-start mb-6 flex-wrap gap-4"
          >
            <div>
              <h3 className="text-xl font-bold text-bright">{experience.role}</h3>
              <p className="text-accent text-sm mt-1 font-medium">{experience.org}</p>
            </div>
            <span className="text-dim text-sm border border-white/10 px-3 py-1 rounded-lg">
              {experience.date}
            </span>
          </div>
          <ul className="space-y-3">
            {experience.bullets.map((bullet, i) => (
              <li key={i} className="text-txt text-sm pl-4 relative before:content-['→'] before:absolute before:left-0 before:text-accent">
                {formatBullet(bullet)}
              </li>
            ))}
          </ul>
          
        </article>
      </RevealOnScroll>
    </section>
  );
}
