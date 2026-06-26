"use client";

import { motion } from "framer-motion";
import SkillIcon from "./SkillIcon";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface Skill {
  name: string;
  icon: string;
  color: string;
}

interface SkillsGridProps {
  skills: Skill[];
}

export default function SkillsGrid({ skills }: SkillsGridProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className="flex flex-wrap gap-3 justify-center items-center w-full py-2"
    >
      {skills.map((skill) => (
        <SkillIcon 
          key={skill.name}
          name={skill.name}
          icon={skill.icon}
          color={skill.color}
        />
      ))}
    </motion.div>
  );
}
