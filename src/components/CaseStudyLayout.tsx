import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";

export default function CaseStudyLayout({ project }: { project: Project }) {
  return (
    <article className="mx-auto max-w-4xl px-6 py-16">
      <Link href="/#work" className="text-sm font-semibold text-accent hover:underline">
        ← Back to work
      </Link>
      <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-muted">
        {project.year} — {project.role}
      </p>
      <h1 className="mt-2 font-display text-5xl font-bold tracking-tight">{project.title}</h1>
      <p className="mt-4 text-xl text-muted">{project.tagline}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <span
            key={s}
            className="rounded-full border border-ink/15 px-3 py-1 text-sm text-muted"
          >
            {s}
          </span>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-3 gap-4">
        {project.metrics.map((metric) => (
          <div key={metric} className="rounded-2xl bg-ink p-4 text-white">
            <p className="text-sm font-semibold leading-snug">{metric}</p>
          </div>
        ))}
      </div>
      <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl border border-ink/10 bg-ink/5">
        <Image
          src={project.image}
          alt={`${project.title} hero`}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>
      <div className="mt-10">
        <h2 className="font-display text-2xl font-bold">Challenge</h2>
        <p className="mt-2 text-[17px] leading-relaxed text-ink/80">{project.challenge}</p>
        <h2 className="mt-8 font-display text-2xl font-bold">Solution</h2>
        <p className="mt-2 text-[17px] leading-relaxed text-ink/80">{project.solution}</p>
        <h2 className="mt-8 font-display text-2xl font-bold">Outcome</h2>
        <p className="mt-2 text-[17px] leading-relaxed text-ink/80">{project.outcome}</p>
      </div>
      {project.gallery.slice(1).map((src) => (
        <div
          key={src}
          className="relative mt-6 aspect-[3/2] overflow-hidden rounded-2xl border border-ink/10 bg-ink/5"
        >
          <Image
            src={src}
            alt={`${project.title} detail`}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}
      <div className="mt-10 flex flex-wrap gap-4">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-ink px-6 py-3 font-semibold text-white hover:bg-accent"
        >
          Visit live site
        </a>
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-ink/20 px-6 py-3 font-semibold hover:border-accent hover:text-accent"
        >
          View code
        </a>
      </div>
    </article>
  );
}
