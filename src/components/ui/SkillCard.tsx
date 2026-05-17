"use client";

import { use3DTilt } from "@/hooks/use3DTilt";

interface Skill {
  name: string;
  highlight: boolean;
}

interface SkillCardProps {
  title: string;
  skills: Skill[];
}

export default function SkillCard({ title, skills }: SkillCardProps) {
  const { ref, onMouseMove, onMouseLeave } = use3DTilt();

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="card-glass p-5 h-full"
      data-cursor-hover
    >
      <p className="text-accent font-semibold text-xs uppercase tracking-wider mb-3">
        {title}
      </p>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill.name}
            className={`text-xs px-2.5 py-1 rounded-md border ${
              skill.highlight
                ? "bg-accent/15 border-accent/40 text-accent"
                : "bg-white/5 border-white/10 text-txt"
            }`}
          >
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );
}
