import Link from "next/link";
import type { Project } from "@/lib/types";
import SafeImage from "@/components/SafeImage";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="glass-panel project-card group block overflow-hidden"
    >
      <div className="project-card-media relative aspect-[16/9] w-full overflow-hidden">
        <SafeImage
          src={project.image}
          alt={`${project.title} screenshot`}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition duration-300 group-hover:scale-[1.02]"
          fallbackTitle={project.title}
          fallbackMetric={project.metrics[0]}
        />
      </div>
      <div className="p-6">
        <p className="section-eyebrow section-eyebrow-sm">
          {project.year} — {project.role}
        </p>
        <h3 className="mt-2 font-display text-xl font-bold tracking-tight">
          {project.title}
        </h3>
        <p className="project-card-tagline mt-2 text-sm">{project.tagline}</p>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Key metrics">
          {project.metrics.map((metric) => (
            <li key={metric} className="metric-pill">
              {metric}
            </li>
          ))}
        </ul>
        <ul className="mt-3 flex flex-wrap gap-2" aria-label="Tech stack">
          {project.stack.map((tech) => (
            <li key={tech} className="ghost-pill">
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
