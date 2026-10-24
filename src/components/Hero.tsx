"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { profile } from "@/content/profile";
import MagneticButton from "@/components/MagneticButton";
import ErrorBoundary from "@/components/ErrorBoundary";
import HeroGrid from "@/components/HeroGrid";
import HeroGridFallback from "@/components/HeroGridFallback";
import WorldSwitch from "@/components/WorldSwitch";
import { DEFAULT_WORLD, WORLDS, type WorldId } from "@/lib/gridWorlds";

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const [worldId, setWorldId] = useState<WorldId>(DEFAULT_WORLD);
  const [switching, setSwitching] = useState(false);
  const switchTimer = useRef<number | null>(null);
  const world = WORLDS[worldId];
  const { scrollY } = useScroll();
  const portraitY = useTransform(scrollY, [0, 600], [0, 12]);
  const textY = useTransform(scrollY, [0, 600], [0, -12]);

  const style = {
    "--hero-bg": world.palette.bg,
    "--hero-fg": world.palette.fg,
    "--hero-dim": world.palette.dim,
    "--hero-line": world.palette.line,
    "--hero-line-2": world.palette.line2,
    "--hero-glow": world.palette.glow,
    "--hero-panel": world.palette.panel,
    "--hero-panel-border": world.palette.panelBorder,
    "--hero-word-stroke": world.palette.wordStroke,
    "--hero-rim": world.palette.rim,
    "--hero-shadow": world.palette.shadow,
    "--hero-vignette": world.palette.vignette,
    "--hero-thumb-bg": world.palette.thumbBg,
    "--hero-thumb-fg": world.palette.thumbFg,
    "--hero-grain": world.palette.grainOpacity,
  } as CSSProperties;

  useEffect(() => {
    return () => {
      if (switchTimer.current !== null) {
        window.clearTimeout(switchTimer.current);
      }
    };
  }, []);

  function handleWorldChange(next: WorldId) {
    setWorldId(next);
    setSwitching(true);
    if (switchTimer.current !== null) {
      window.clearTimeout(switchTimer.current);
    }
    switchTimer.current = window.setTimeout(() => setSwitching(false), 650);
  }

  return (
    <section
      id="top"
      data-world={worldId}
      style={style}
      className={`hero-stage ${switching ? "switching" : ""} relative isolate flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden bg-[color:var(--hero-bg)] transition-colors duration-700`}
    >
      <HeroGridFallback world={worldId} />
      <ErrorBoundary fallback={null}>
        <HeroGrid world={worldId} reducedMotion={Boolean(reduceMotion)} />
      </ErrorBoundary>

      <div className="hero-vignette" aria-hidden="true" />
      <div className="hero-scanlines" aria-hidden="true" />
      <div className="hero-grain" aria-hidden="true" />
      <div className="hero-giant-word" aria-hidden="true">MAURICIO</div>
      <div key={`flash-${worldId}`} className="hero-flash" aria-hidden="true" />
      <div key={`sweep-${worldId}`} className="hero-sweep" aria-hidden="true" />
      <div className="hero-bottom-fade" aria-hidden="true" />

      <div className="relative z-[3] mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 gap-12 px-6 pb-16 pt-16 sm:pt-20 md:grid-cols-[1.1fr_auto] md:content-center min-[1100px]:grid-cols-[1.1fr_auto_0.8fr] min-[1100px]:items-center">
        <motion.div
          style={reduceMotion ? { y: 0 } : { y: textY }}
          className="hero-copy"
        >
          <p className="hero-location">{profile.location}</p>
          <p className="hero-hello">Hello, I&rsquo;m</p>
          <p className="hero-name">{profile.name}</p>
          <h1 className="hero-headline">{profile.headline}</h1>
          <p className="hero-subhead">{profile.subhead}</p>
          <div className="hero-actions">
            <MagneticButton href="#work" tone="hero">
              View selected work
            </MagneticButton>
            <a href={profile.resumeUrl} download className="hero-btn-ghost">
              Download Resume
            </a>
            <a href={`mailto:${profile.email}`} className="hero-btn-ghost">
              Get in touch
            </a>
          </div>
        </motion.div>

        <motion.div
          style={reduceMotion ? { y: 0 } : { y: portraitY }}
          className="hero-portrait-wrap"
        >
          <div className="hero-portrait-halo" aria-hidden="true" />
          <div className="hero-portrait-ring" aria-hidden="true" />
          <div className="hero-portrait-floor" aria-hidden="true" />
          <Image
            src="/portrait/hero-profile.webp"
            alt="Portrait of John Mauricio"
            width={1600}
            height={2400}
            priority
            sizes="(max-width: 1024px) 70vw, 380px"
            className="hero-portrait-img"
          />
          <span className="hero-portrait-label">Subject 01 / Mauricio</span>
        </motion.div>

        <motion.aside
          style={reduceMotion ? { y: 0 } : { y: textY }}
          aria-label="Highlights"
          className="hero-proof"
        >
          <ul>
            {profile.proof.map((stat) => (
              <li key={stat.label}>
                <span aria-hidden="true" className="hero-proof-plus">
                  +
                </span>
                <span>
                  <span className="hero-proof-value">{stat.value}</span>
                  <span className="hero-proof-label">{stat.label}</span>
                </span>
              </li>
            ))}
          </ul>
        </motion.aside>
      </div>

      <div className="relative z-20 flex w-full flex-col items-center gap-3 px-6 pb-6">
        <div className="hero-readout" aria-live="polite">
          <span className="hero-readout-index">{world.index}</span>
          <span className="hero-readout-name">{world.name}</span>
          <span className="hero-readout-desc">{world.description}</span>
        </div>
        <WorldSwitch value={worldId} onChange={handleWorldChange} />
      </div>
    </section>
  );
}
