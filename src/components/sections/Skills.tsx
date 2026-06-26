import { skillCategories } from "@/data/portfolio";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SectionHeading from "@/components/ui/SectionHeading";
import SkillCategory from "@/components/ui/SkillCategory";

export default function Skills() {
  return (
    <section id="skills" className="relative section-padding overflow-hidden" aria-labelledby="skills-heading">
      {/* Soft Radial Background Lights */}
      <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-accent/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[40rem] h-[40rem] bg-[rgb(var(--primary-rgb))]/5 rounded-full blur-[150px] pointer-events-none -z-10" />

      <SectionHeading
        title="Skills"
        subtitle="Technologies and tools I work with to build modern applications."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10 max-w-6xl mx-auto">
        {skillCategories.map((cat, i) => (
          <RevealOnScroll key={cat.title} delay={i * 0.1}>
            <SkillCategory title={cat.title} skills={cat.skills} />
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
