import { skillCategories } from "@/data/portfolio";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SectionHeading from "@/components/ui/SectionHeading";
import SkillCard from "@/components/ui/SkillCard";

export default function Skills() {
  return (
    <section id="skills" className="section-padding" aria-labelledby="skills-heading">
      <SectionHeading
        title="Skills"
        subtitle="Technologies and tools I work with to build modern applications."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {skillCategories.map((cat, i) => (
          <RevealOnScroll key={cat.title} delay={i * 0.05}>
            <SkillCard title={cat.title} skills={cat.skills} />
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
