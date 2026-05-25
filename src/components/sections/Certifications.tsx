"use client";

import { useEffect, useRef, useState } from "react";
import { certifications } from "@/data/portfolio";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SectionHeading from "@/components/ui/SectionHeading";
import { FiExternalLink, FiX } from "react-icons/fi";
import { motion } from "framer-motion";

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState<any>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  const isHovered = useRef(false);

  useEffect(() => {
    const container = scrollRef.current;

    if (!container) return;

    let animationFrame: number;

    const autoScroll = () => {
      if (!isHovered.current) {
        container.scrollLeft += 0.8;

        // infinite loop
        if (
          container.scrollLeft >=
          container.scrollWidth / 2
        ) {
          container.scrollLeft = 0;
        }
      }

      animationFrame = requestAnimationFrame(autoScroll);
    };

    animationFrame = requestAnimationFrame(autoScroll);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <section
      id="certifications"
      className="section-padding relative overflow-hidden"
    >
      <SectionHeading
        title="Certificates"
        subtitle="Credentials and achievements"
      />

      <RevealOnScroll>
        <div
          className="
            relative
            rounded-[3rem]
            border
            border-white/10
            bg-white/[0.03]
            backdrop-blur-2xl
            p-4
            sm:p-6
            md:p-10
            overflow-hidden
            shadow-[0_0_80px_rgba(139,92,246,0.08)]
          "
        >
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.03] to-cyan-500/[0.02]" />

          {/* SCROLL CONTAINER */}
          <div
            ref={scrollRef}
            onMouseEnter={() => (isHovered.current = true)}
            onMouseLeave={() => (isHovered.current = false)}
            className="
              flex
              gap-4 sm:gap-8
              overflow-x-auto
              overflow-y-hidden
              scrollbar-custom
              py-4
              px-1
              pb-5
            "
          >
            {[
              ...certifications,
              ...certifications,
              ...certifications
            ].map((cert, i) => (
              <motion.div
                key={`${cert.id}-${i}`}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedCert(cert)}
                className="
                  snap-center
                  min-w-[260px]
                  sm:min-w-[320px]
                  md:min-w-[380px]
                  rounded-[2rem]
                  overflow-hidden
                  bg-white/[0.04]
                  border
                  border-white/10
                  hover:border-violet-500/40
                  transition-all
                  duration-500
                  cursor-pointer
                  group
                  backdrop-blur-xl
                  flex-shrink-0
                "
              >
                {/* IMAGE */}
                <div className="relative overflow-hidden">
                  <img
                    src={cert.imageUrl}
                    alt={cert.title}
                    className="
                      w-full
                      h-[180px]
                      sm:h-[240px]
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-105
                    "
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  <h3 className="text-white text-lg sm:text-2xl font-bold leading-tight mb-3">
                    {cert.title}
                  </h3>

                  <p className="text-zinc-400 text-sm">
                    {cert.issuer} • {cert.date}
                  </p>

                  <button
                    className="
                      mt-6
                      px-4
                      py-2
                      sm:px-5
                      sm:py-2.5
                      rounded-xl
                      bg-gradient-to-r
                      from-violet-600
                      to-cyan-500
                      text-white
                      text-sm
                      font-semibold
                      hover:scale-105
                      transition-all
                      shadow-lg
                    "
                  >
                    View Certificate →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </RevealOnScroll>

      {/* MODAL */}
      {selectedCert && (
        <div
          className="
            fixed
            inset-0
            z-[999]
            flex
            items-center
            justify-center
            bg-black/70
            backdrop-blur-md
            p-4
          "
          onClick={() => setSelectedCert(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="
              relative
              w-full
              max-w-[360px]
              sm:max-w-[420px]
              md:max-w-5xl
              rounded-[2rem]
              overflow-hidden
              border
              border-white/10
              bg-[#050816]/95
              backdrop-blur-2xl
              shadow-2xl
              flex
              flex-col
              md:grid
              md:grid-cols-2
            "
          >
            {/* LEFT */}
            <div className="p-4 sm:p-5 md:p-8 flex items-center justify-center">
              <img
                src={selectedCert.imageUrl}
                alt={selectedCert.title}
                className="
                  rounded-2xl
                  border
                  border-white/10
                  shadow-2xl
                  max-h-[240px]
                  sm:max-h-[320px]
                  md:max-h-[80vh]
                  object-contain
                "
              />
            </div>

            {/* RIGHT */}
            <div className="p-5 sm:p-6 md:p-12 flex flex-col justify-center max-h-[50vh] md:max-h-none overflow-y-auto md:overflow-y-visible">
              <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-violet-400 mb-6 md:mb-10">
                {selectedCert.title}
              </h2>

              <div className="space-y-6 md:space-y-8">
                <div>
                  <p className="text-zinc-500 uppercase text-xs md:text-sm mb-1 md:mb-2">
                    Issuer
                  </p>

                  <p className="text-white text-lg md:text-2xl font-semibold">
                    {selectedCert.issuer}
                  </p>
                </div>

                <div>
                  <p className="text-zinc-500 uppercase text-xs md:text-sm mb-1 md:mb-2">
                    Issue Date
                  </p>

                  <p className="text-white text-base md:text-xl">
                    {selectedCert.date}
                  </p>
                </div>

                <div>
                  <p className="text-zinc-500 uppercase text-xs md:text-sm mb-2 md:mb-3">
                    Details
                  </p>

                  <p className="text-zinc-300 leading-relaxed text-xs sm:text-sm md:text-lg">
                    {selectedCert.description}
                  </p>
                </div>

                <a
                  href={selectedCert.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex
                    items-center
                    gap-2
                    md:gap-3
                    w-fit
                    px-4
                    md:px-5
                    py-2
                    md:py-3
                    rounded-xl
                    md:rounded-2xl
                    bg-gradient-to-r
                    from-violet-600
                    to-cyan-500
                    text-white
                    text-xs
                    md:text-base
                    font-bold
                    hover:scale-105
                    transition-all
                    shadow-xl
                  "
                >
                  VERIFY CERTIFICATE
                  <FiExternalLink />
                </a>
              </div>
            </div>

            {/* CLOSE */}
            <button
              onClick={() => setSelectedCert(null)}
              className="
                absolute
                top-6
                right-6
                w-11
                h-11
                sm:w-14
                sm:h-14
                rounded-full
                bg-white
                text-black
                flex
                items-center
                justify-center
                text-2xl
                hover:scale-110
                transition-all
              "
            >
              <FiX />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}