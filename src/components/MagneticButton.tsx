"use client";

import { useEffect, useRef, useState } from "react";
import type { MouseEvent, ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

type MagneticButtonProps = {
  children: ReactNode;
  href: string;
  tone?: "default" | "hero";
};

export default function MagneticButton({
  children,
  href,
  tone = "default",
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  useEffect(() => {
    setMounted(true);
  }, []);

  const className =
    tone === "hero"
      ? "hero-btn-primary inline-block rounded-full px-6 py-3 text-sm font-semibold transition"
      : "inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition hover:bg-accent";

  const disableMotion = mounted && Boolean(reduceMotion);

  function handleMouseMove(event: MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);
    x.set(offsetX * 0.25);
    y.set(offsetY * 0.25);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      style={disableMotion ? undefined : { x: springX, y: springY }}
      onMouseMove={disableMotion ? undefined : handleMouseMove}
      onMouseLeave={disableMotion ? undefined : handleMouseLeave}
    >
      {children}
    </motion.a>
  );
}
