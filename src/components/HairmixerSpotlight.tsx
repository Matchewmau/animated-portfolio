import Link from "next/link";
import { getProject } from "@/content/projects";
import SafeImage from "@/components/SafeImage";

export default function HairmixerSpotlight() {
  const project = getProject("hairmixer-ai");

  if (!project) {
    return null;
  }

  return (
    <section aria-label="Hairmixer spotlight" className="w-full">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <div className="spotlight-panel glass-panel grid items-center gap-10 p-6 sm:p-10 md:grid-cols-2">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="section-eyebrow">Spotlight — {project.year}</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              HairMixer: -40% latency, ECAI 2026
            </h2>
            <p className="spotlight-copy mt-4 text-lg">{project.description}</p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Hairmixer metrics">
              {project.metrics.map((metric) => (
                <li key={metric} className="metric-pill">
                  {metric}
                </li>
              ))}
            </ul>
            <ol
              className="spotlight-pipeline mt-6 space-y-2 text-sm"
              aria-label="Hairmixer pipeline"
            >
              <li>1. Upload — user submits a selfie</li>
              <li>2. Preprocess — normalize and clean the image with OpenCV</li>
              <li>3. Face Align — detect and align facial landmarks</li>
              <li>4. ResNet50 Classify — predict face-shape class</li>
              <li>5. Recommend — rank hairstyles for the predicted shape</li>
              <li>6. Render — simulate the selected hairstyle</li>
            </ol>
            <blockquote className="spotlight-quote mt-6 rounded-xl border p-4 text-sm">
              <p>
                “HairMixer: A Hairstyle Recommendation and Simulation System Based
                on Facial Structure Using CNNs” — accepted for ECAI 2026
                presentation and publication.
              </p>
            </blockquote>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/projects/hairmixer-ai" className="btn-primary">
                Read case study
              </Link>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
              >
                Live site
              </a>
            </div>
          </div>
          <div className="spotlight-media relative aspect-[4/3] w-full overflow-hidden rounded-2xl border">
            <SafeImage
              src={project.image}
              alt={`${project.title} screenshot`}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              fallbackTitle={project.title}
              fallbackMetric={project.metrics[0]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
