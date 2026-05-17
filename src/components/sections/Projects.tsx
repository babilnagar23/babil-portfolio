import { projects } from "@/data/portfolio";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/ui/ProjectCard";

export default function Projects() {
  return (
    <section id="projects" className="section-padding bg-navy-2/50" aria-labelledby="projects-heading">
      <SectionHeading
        title="Projects"
        subtitle="A selection of my recent work across full-stack, ML, and data science."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <RevealOnScroll key={project.title} delay={i * 0.06}>
            <ProjectCard {...project} />
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
