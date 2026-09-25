import Image from "next/image";
import Link from "next/link";
import { getProject } from "@/content/projects";

export default function HairmixerSpotlight() {
  const project = getProject("hairmixer-ai");

  if (!project) {
    return null;
  }

  return (
    <section aria-label="Hairmixer spotlight" className="w-full bg-ink text-paper">
      <div className="mx-auto grid max-w-5xl items-center gap-10 px-6 py-16 sm:py-20 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Spotlight — {project.year}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            HairMixer: -40% latency, ECAI 2026
          </h2>
          <p className="mt-4 text-lg text-paper/70">{project.description}</p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Hairmixer metrics">
            {project.metrics.map((metric) => (
              <li
                key={metric}
                className="rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-paper"
              >
                {metric}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/projects/hairmixer-ai"
              className="rounded-full bg-paper px-6 py-3 text-sm font-semibold text-ink transition hover:bg-accent hover:text-paper"
            >
              Read case study
            </Link>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-paper/25 px-6 py-3 text-sm font-semibold transition hover:border-accent hover:text-accent"
            >
              Live site
            </a>
          </div>
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-paper/10">
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
