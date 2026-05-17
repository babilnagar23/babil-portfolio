import { aboutContent, coreInterests } from "@/data/portfolio";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  FiBarChart2,
  FiCode,
  FiCpu,
  FiDatabase,
} from "react-icons/fi";

const iconMap = {
  brain: FiCpu,
  chart: FiBarChart2,
  code: FiCode,
  database: FiDatabase,
};

function formatText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-bright font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default function About() {
  return (
    <section id="about" className="section-padding" aria-labelledby="about-heading">
      <SectionHeading
        title="About Me"
        subtitle="A brief introduction to who I am and what I do."
      />

      <div
        className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-start"
      >
        <RevealOnScroll>
          <div className="space-y-5 text-txt text-base md:text-lg leading-relaxed">
            {aboutContent.paragraphs.map((para, i) => (
              <p key={i}>{formatText(para)}</p>
            ))}
            <p>
              I&apos;m currently pursuing my degree at{" "}
              <span className="text-accent font-medium">
                VIT Bhopal University
              </span>
              , focusing on building a strong foundation in both theory and
              practical application.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <div>
            <h3 className="text-bright font-semibold text-lg mb-4">
              Core Interests
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {coreInterests.map((item) => {
                const Icon = iconMap[item.icon as keyof typeof iconMap] || FiCode;
                return (
                  <div
                    key={item.title}
                    className="card-glass p-4 flex gap-3 items-start"
                    data-cursor-hover
                  >
                    <div
                      className="w-9 h-9 rounded-lg bg-accent/15 flex items-center justify-center shrink-0 text-accent"
                    >
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="text-bright font-medium text-sm">
                        {item.title}
                      </p>
                      <p className="text-dim text-xs mt-0.5 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
