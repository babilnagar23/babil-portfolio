"use client";

import ProfileAvatar from "@/components/ui/ProfileAvatar";
import { hero, heroRoles, personal } from "@/data/portfolio";
import { useTypingEffect } from "@/hooks/useTypingEffect";
import { motion } from "framer-motion";
import { FiArrowRight, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero() {
  const typedRole = useTypingEffect(heroRoles, "", 100, 40, 1600);

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center pt-28 pb-16 px-6 md:px-12 max-w-6xl mx-auto"
      aria-label="Introduction"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center w-full">
        {/* Left — text */}
        <div>
          <motion.p
            {...fade(0.1)}
            className="text-accent font-medium text-lg mb-2"
          >
            {hero.greeting}
          </motion.p>

          <motion.h1
            {...fade(0.2)}
            className="text-7xl md:text-8xl lg:text-9xl font-extrabold text-bright leading-[1] mb-4"
            style={{ fontSize: "clamp(3.5rem, 12vw, 10rem)" }}
          >
            {personal.name}
            <br />
            {personal.lastName}
          </motion.h1>

          <motion.p
            {...fade(0.35)}
            className="text-3xl md:text-4xl font-bold text-bright/90 mb-6 min-h-[48px]"
          >
            {typedRole || hero.role}
          </motion.p>

          <motion.p
            {...fade(0.48)}
            className="text-txt text-base md:text-lg leading-relaxed max-w-lg mb-8"
          >
            {hero.bio}
          </motion.p>

          <motion.div
            {...fade(0.58)}
            className="flex flex-wrap gap-4 mb-10"
          >
            <a href="#projects" className="btn-white">
              View Projects <FiArrowRight />
            </a>
            <a href="#contact" className="btn-ghost">
              Contact Me
            </a>
          </motion.div>

          <motion.div
            {...fade(0.68)}
            className="flex gap-3"
          >
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-btn"
              aria-label="GitHub"
            >
              <FiGithub size={18} />
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-btn"
              aria-label="LinkedIn"
            >
              <FiLinkedin size={18} />
            </a>
            <a
              href={`mailto:${personal.email}`}
              className="icon-btn"
              aria-label="Email"
            >
              <FiMail size={18} />
            </a>
          </motion.div>
        </div>

        {/* Right — profile photo */}
        <motion.div
          {...fade(0.3)}
          className="flex justify-center lg:justify-end order-first lg:order-last"
        >
          <ProfileAvatar />
        </motion.div>
      </div>
    </section>
  );
}
