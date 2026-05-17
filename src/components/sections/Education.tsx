import { education } from "@/data/portfolio";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Education() {
  return (
    <section id="education" className="section-padding bg-navy-2/50" aria-labelledby="education-heading">
      <SectionHeading
        title="Education"
        subtitle="My academic journey and achievements."
      />
      <div className="flex flex-col gap-4 max-w-3xl">
        {education.map((item, i) => (
          <RevealOnScroll key={item.degree} delay={i * 0.06}>
            <div
              className={`card-glass px-6 py-5 flex justify-between items-start gap-4 flex-wrap ${
                item.main ? "border-l-2 border-l-accent" : ""
              }`}
              data-cursor-hover
            >
              <div>
                <h3 className="text-bright font-semibold">{item.degree}</h3>
                {item.specialization && (
                  <p className="text-accent text-sm mt-0.5">{item.specialization}</p>
                )}
                <p className="text-dim text-sm mt-1">{item.school}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-dim text-xs">{item.period}</p>
                <p className="text-2xl font-bold text-accent mt-1">{item.score}</p>
                {item.scoreLabel && (
                  <p className="text-dim text-[10px]">{item.scoreLabel}</p>
                )}
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
