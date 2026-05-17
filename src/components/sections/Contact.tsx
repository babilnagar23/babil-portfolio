import { personal } from "@/data/portfolio";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SectionHeading from "@/components/ui/SectionHeading";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

export default function Contact() {
  return (
    <section id="contact" className="section-padding" aria-labelledby="contact-heading">
      <RevealOnScroll>
        <div className="max-w-2xl mx-auto text-center">
          <SectionHeading
            title="Get In Touch"
            subtitle="Open to SDE, Full Stack, and Data Analyst roles. Based in Bhopal — open to relocation and remote work."
            centered
          />
          <div className="flex justify-center gap-4 flex-wrap mt-4">
            <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="btn-white">
              <FiLinkedin /> LinkedIn
            </a>
            <a href={personal.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <FiGithub /> GitHub
            </a>
            <a href={`mailto:${personal.email}`} className="btn-ghost">
              <FiMail /> Email Me
            </a>
          </div>
          <p className="text-txt text-sm mt-8">
            <a href={`mailto:${personal.email}`} className="text-accent no-underline hover:underline">
              {personal.email}
            </a>
            {" · "}
            {personal.phone}
          </p>
        </div>
      </RevealOnScroll>
    </section>
  );
}
