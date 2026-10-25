"use client";

import { use3DTilt } from "@/hooks/use3DTilt";
import { FiGithub } from "react-icons/fi";

interface ProjectCardProps {
  number: string;
  category: string;
  title: string;
  url: string;
  demo?: string;
  stack: string;
  bullets: string[];
  tags: string[];
}

function formatBullet(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-bright font-medium">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default function ProjectCard({
  number,
  category,
  title,
  url,
  demo,
  stack,
  bullets,
  tags,
}: ProjectCardProps) {
  const { ref, onMouseMove, onMouseLeave } = use3DTilt();
  const githubPath = url.replace("https://", "");

  return (
    <article
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="card-glass p-6 flex flex-col h-full group"
      data-cursor-hover
    >
      <p className="text-accent/60 text-[10px] uppercase tracking-widest mb-2">
        {number} / {category}
      </p>
      <h3 className="text-bright font-semibold text-lg mb-1 leading-snug">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-inherit no-underline hover:text-accent transition-colors"
        >
          {title}
        </a>
      </h3>
      <p className="text-dim text-xs mb-4">{stack}</p>
      <ul className="flex-1 space-y-2 mb-4">
        {bullets.map((bullet, i) => (
          <li key={i} className="text-txt text-sm pl-3 relative before:content-['·'] before:absolute before:left-0 before:text-accent">
            {formatBullet(bullet)}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {tags.map((tag) => (
          <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-accent/10 text-accent border border-accent/20">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-auto flex flex-wrap gap-4 pt-2 text-sm">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-accent no-underline transition-colors hover:text-bright hover:underline"
        >
          <FiGithub size={14} /> GitHub ↗
        </a>
        {demo && (
          <a
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent no-underline transition-colors hover:text-bright hover:underline"
          >
            Live Demo ↗
          </a>
        )}
      </div>
    </article>
  );
}
