import { certifications } from "@/data/portfolio";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SectionHeading from "@/components/ui/SectionHeading";
import { FiAward, FiExternalLink, FiCloud, FiZap, FiHeart, FiCode } from "react-icons/fi";

function getCertificationIcon(iconType: string) {
  switch (iconType) {
    case "google":
      return <span className="text-lg">🔍</span>;
    case "girlscript":
      return <span className="text-lg">🚀</span>;
    case "cloud":
      return <FiCloud size={18} />;
    case "brain":
      return <FiZap size={18} />;
    case "matlab":
      return <span className="text-lg">📊</span>;
    case "heart":
      return <FiHeart size={18} />;
    default:
      return <FiAward size={18} />;
  }
}

export default function Certifications() {
  return (
    <section id="certifications" className="section-padding bg-navy-2/50" aria-labelledby="certs-heading">
      <SectionHeading
        title="Certifications"
        subtitle="Professional credentials and specialized training I've completed to enhance my skills."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {certifications.map((cert, i) => (
          <RevealOnScroll key={cert.name} delay={i * 0.06}>
            <article className="card-glass p-6 h-full flex flex-col" data-cursor-hover>
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent mb-4">
                {getCertificationIcon(cert.icon)}
              </div>
              <h3 className="text-bright font-semibold text-base mb-2 leading-snug">
                {cert.name}
              </h3>
              <p className="text-dim text-sm mb-1">{cert.issuer}</p>
              <p className="text-dim/80 text-xs mb-4">{cert.year}</p>
              {cert.url ? (
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-1.5 text-accent-cyan text-sm font-medium no-underline hover:gap-2.5 transition-all"
                >
                  View Certificate <FiExternalLink size={14} />
                </a>
              ) : (
                <span className="mt-auto inline-flex items-center gap-1.5 text-accent-cyan text-sm font-medium">
                  View Certificate <FiExternalLink size={14} />
                </span>
              )}
            </article>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
