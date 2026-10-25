"use client";

import { experience, internship } from "@/data/portfolio";
import { use3DTilt } from "@/hooks/use3DTilt";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SectionHeading from "@/components/ui/SectionHeading";

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
  return (
    <section id="experience" className="section-padding" aria-labelledby="experience-heading">
      <SectionHeading
        title="Experience"
        subtitle="Open-source contributions and campus leadership beyond the classroom."
      />
      <div className="space-y-6">
        <ExperienceCard entry={internship} />
        <ExperienceCard entry={experience} />
      </div>
    </section>
  );
}

type ExperienceEntry = typeof internship | typeof experience;

function ExperienceCard({ entry }: { entry: ExperienceEntry }) {
  const { ref, onMouseMove, onMouseLeave } = use3DTilt();
  const organization = Array.isArray(entry.org) ? entry.org.join("") : entry.org;

  return (
    <RevealOnScroll>
      <article
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="card-glass p-8 md:p-10 relative overflow-hidden max-w-4xl"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-line" aria-hidden />
        <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
          <div className="min-w-0">
            <h3 className="text-xl font-bold text-bright">{entry.role}</h3>
            <p className="text-accent text-sm mt-1 font-medium">{organization}</p>
            {"location" in entry && <p className="text-dim text-sm mt-1">{entry.location}</p>}
          </div>
          <span className="text-dim text-sm border border-white/10 px-3 py-1 rounded-lg max-w-full whitespace-normal">
            {entry.date}
          </span>
        </div>
        <ul className="space-y-3">
          {entry.bullets.map((bullet, i) => (
            <li key={i} className="text-txt text-sm pl-4 relative before:content-['→'] before:absolute before:left-0 before:text-accent">
              {formatBullet(bullet)}
            </li>
          ))}
        </ul>
        {"certificateUrl" in entry && (
          <a
            href={entry.certificateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex mt-5 text-accent text-sm underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            View Certificate ↗
          </a>
        )}
      </article>
    </RevealOnScroll>
  );
}
