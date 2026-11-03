import Link from "next/link";
import type { Project } from "@/lib/types";
import { projects } from "@/content/projects";
import SafeImage from "@/components/SafeImage";

export default function CaseStudyLayout({ project }: { project: Project }) {
  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = index >= 0 ? projects[(index + 1) % projects.length] : undefined;
  const showNext = next && next.slug !== project.slug;

  return (
    <article className="case-study mx-auto max-w-4xl px-6 py-16">
      <Link href="/#work" className="world-link text-sm font-semibold">
        ← Back to work
      </Link>
      <p className="section-eyebrow mt-6">
        {project.year} — {project.role}
      </p>
      <h1 className="mt-2 font-display text-5xl font-bold tracking-tight">
        {project.title}
      </h1>
      <p className="case-study-tagline mt-4 text-xl">{project.tagline}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <span key={s} className="ghost-pill">
            {s}
          </span>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-3 gap-4">
        {project.metrics.map((metric) => (
          <div key={metric} className="metric-block">
            <p className="text-sm font-semibold leading-snug">{metric}</p>
          </div>
        ))}
      </div>
      <div className="case-study-media relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl border">
        {/* Keep SafeImage unchanged */}
        <SafeImage
          src={project.image}
          alt={`${project.title} hero`}
          sizes="100vw"
          priority
          className="object-cover"
          fallbackTitle={project.title}
          fallbackMetric={project.metrics[0]}
        />
      </div>
      <div className="mt-10">
        <h2 className="font-display text-2xl font-bold">Challenge</h2>
        <p className="case-study-body mt-2 text-[17px] leading-relaxed">
          {project.challenge}
        </p>
        <h2 className="mt-8 font-display text-2xl font-bold">Solution</h2>
        <p className="case-study-body mt-2 text-[17px] leading-relaxed">
          {project.solution}
        </p>
        <h2 className="mt-8 font-display text-2xl font-bold">Outcome</h2>
        <p className="case-study-body mt-2 text-[17px] leading-relaxed">
          {project.outcome}
        </p>
      </div>
      {project.gallery.slice(1).map((src) => (
        <div
          key={src}
          className="case-study-media relative mt-6 aspect-[3/2] overflow-hidden rounded-2xl border"
        >
          {/* Keep SafeImage unchanged */}
          <SafeImage
            src={src}
            alt={`${project.title} detail`}
            sizes="100vw"
            className="object-cover"
            fallbackTitle={project.title}
            fallbackMetric={project.metrics[0]}
          />
        </div>
      ))}
      <div className="mt-10 flex flex-wrap gap-4">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-primary"
        >
          Visit live site
        </a>
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-secondary"
        >
          View code
        </a>
      </div>
      {showNext ? (
        <nav
          aria-label="Next project"
          className="glass-panel case-study-next mt-12 p-6"
        >
          <p className="section-eyebrow section-eyebrow-sm">Next project</p>
          <Link
            href={`/projects/${next.slug}`}
            className="world-link mt-2 block font-display text-2xl font-bold tracking-tight"
          >
            {next.title} →
          </Link>
          <p className="muted-copy mt-1 text-sm">{next.tagline}</p>
        </nav>
      ) : null}
    </article>
  );
}
