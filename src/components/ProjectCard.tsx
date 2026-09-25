import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block overflow-hidden rounded-2xl border border-ink/10 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-ink/5">
        <Image
          src={project.image}
          alt={`${project.title} screenshot`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition duration-300 group-hover:scale-[1.02]"
        />
      </div>
      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">
          {project.year} — {project.role}
        </p>
        <h3 className="mt-2 font-display text-xl font-bold tracking-tight">{project.title}</h3>
        <p className="mt-2 text-sm text-muted">{project.tagline}</p>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Key metrics">
          {project.metrics.map((metric) => (
            <li
              key={metric}
              className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent"
            >
              {metric}
            </li>
          ))}
        </ul>
        <ul className="mt-3 flex flex-wrap gap-2" aria-label="Tech stack">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-ink/10 px-3 py-1 text-xs text-muted"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
