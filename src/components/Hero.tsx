"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { profile } from "@/content/profile";
import MagneticButton from "@/components/MagneticButton";
import ErrorBoundary from "@/components/ErrorBoundary";
import HeroGrid from "@/components/HeroGrid";
import HeroGridFallback from "@/components/HeroGridFallback";
import WorldSwitch from "@/components/WorldSwitch";
import { useWorld } from "@/components/WorldProvider";
import { type WorldId } from "@/lib/gridWorlds";

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const { world, ready, setWorld } = useWorld();
  const [switching, setSwitching] = useState(false);
  const switchTimer = useRef<number | null>(null);
  const { scrollY } = useScroll();
  const portraitY = useTransform(scrollY, [0, 600], [0, 12]);
  const textY = useTransform(scrollY, [0, 600], [0, -12]);

  useEffect(() => {
    return () => {
      if (switchTimer.current !== null) {
        window.clearTimeout(switchTimer.current);
      }
    };
  }, []);

  function handleWorldChange(next: WorldId) {
    setWorld(next);
    setSwitching(true);
    if (switchTimer.current !== null) {
      window.clearTimeout(switchTimer.current);
    }
    switchTimer.current = window.setTimeout(() => setSwitching(false), 650);
  }

  return (
    <section
      id="top"
      className={`hero-stage ${switching ? "switching" : ""} relative isolate flex min-h-[calc(100svh-4.2rem)] flex-col overflow-hidden bg-[color:var(--hero-bg)] transition-colors duration-700`}
    >
      <HeroGridFallback />
      {ready ? (
        <ErrorBoundary fallback={null}>
          <HeroGrid world={world} reducedMotion={Boolean(reduceMotion)} />
        </ErrorBoundary>
      ) : null}

      <div className="hero-vignette" aria-hidden="true" />
      <div className="hero-scanlines" aria-hidden="true" />
      <div className="hero-grain" aria-hidden="true" />
      <div className="hero-giant-word" aria-hidden="true">MAURICIO</div>
      <div key={`flash-${world}`} className="hero-flash" aria-hidden="true" />
      <div key={`sweep-${world}`} className="hero-sweep" aria-hidden="true" />
      <div className="hero-bottom-fade" aria-hidden="true" />

      <div className="hero-content relative z-[3] mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 gap-10 px-6 pb-10 pt-12 sm:pt-14 md:grid-cols-[1.1fr_auto] md:content-center min-[1100px]:grid-cols-[1.35fr_auto_0.55fr] min-[1100px]:items-center min-[1100px]:pb-4 min-[1100px]:pt-10">
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

      <div className="hero-footer relative z-20 flex w-full flex-col items-center gap-1 px-6 pb-1">
        <WorldSwitch value={world} onChange={handleWorldChange} />
      </div>
    </section>
  );
}
