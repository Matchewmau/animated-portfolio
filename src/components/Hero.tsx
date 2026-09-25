"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
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
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const portraitY = useTransform(scrollY, [0, 600], [0, 12]);
  const textY = useTransform(scrollY, [0, 600], [0, -12]);

  return (
    <section id="top" className="relative overflow-hidden">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center select-none overflow-hidden"
      >
        <span className="whitespace-nowrap font-display text-[18vw] font-bold uppercase leading-none tracking-tight text-transparent [-webkit-text-stroke:1px_rgba(220,38,69,0.08)] lg:text-[12rem]">
          MAURICIO
        </span>
      </span>
      <ErrorBoundary fallback={<Hero3DFallback />}>
        <Hero3DBackground />
      </ErrorBoundary>
      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-24 sm:py-32 lg:grid-cols-[1.1fr_auto_0.8fr] lg:items-center">
        <motion.div
          style={reduceMotion ? { y: 0 } : { y: textY }}
          className="relative z-10"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            {profile.location}
          </p>
          <p className="font-script mt-6 text-4xl leading-none text-accent">
            Hello, I&apos;m
          </p>
          <p className="mt-2 font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight sm:text-6xl">
            {profile.name}
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
        </motion.div>

        <motion.div
          style={reduceMotion ? { y: 0 } : { y: portraitY }}
          className="relative z-[5] mx-auto w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[380px]"
        >
          <div className="relative aspect-[2/3] w-full">
            <Image
              src="/portrait/hero-profile.webp"
              alt="Portrait of John Mauricio"
              width={1600}
              height={2400}
              priority
              sizes="(max-width: 1024px) 70vw, 380px"
              className="mx-auto h-full w-auto object-contain text-accent/35 [filter:drop-shadow(0_24px_48px_currentColor)]"
            />
          </div>
          <div
            aria-hidden="true"
            className="hero-floor-shadow absolute -bottom-4 left-1/2 h-8 w-3/4 -translate-x-1/2"
          />
        </motion.div>

        <motion.aside
          style={reduceMotion ? { y: 0 } : { y: textY }}
          aria-label="Highlights"
          className="relative z-10"
        >
          <ul className="space-y-5">
            {profile.proof.map((stat) => (
              <li key={stat.label} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-0.5 font-display text-xl font-bold leading-none text-accent"
                >
                  +
                </span>
                <span>
                  <span className="block font-display text-2xl font-bold tracking-tight">
                    {stat.value}
                  </span>
                  <span className="mt-1 block text-sm text-muted">
                    {stat.label}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </motion.aside>
      </div>
    </section>
  );
}
