import dynamic from "next/dynamic";
import { profile } from "@/content/profile";
import MagneticButton from "@/components/MagneticButton";
import ErrorBoundary from "@/components/ErrorBoundary";
import Hero3DFallback from "@/components/Hero3DFallback";

const Hero3DBackground = dynamic(
  () => import("@/components/Hero3DBackground"),
  {
    ssr: false,
    loading: () => <Hero3DFallback />,
  }
);

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <ErrorBoundary fallback={<Hero3DFallback />}>
        <Hero3DBackground />
      </ErrorBoundary>
      <div className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          {profile.location}
        </p>
        <h1 className="mt-4 font-display text-5xl font-bold tracking-tight sm:text-6xl">
          {profile.headline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">{profile.subhead}</p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <MagneticButton href="#work">View selected work</MagneticButton>
          <a
            href={profile.resumeUrl}
            download
            className="rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold transition hover:border-accent hover:text-accent"
          >
            Download Resume
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold transition hover:border-accent hover:text-accent"
          >
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}
