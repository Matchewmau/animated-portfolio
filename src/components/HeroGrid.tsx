"use client";

import { useEffect, useRef } from "react";
import { createGridRenderer, type GridRenderer } from "@/lib/gridRenderer";
import type { WorldId } from "@/lib/gridWorlds";

interface HeroGridProps {
  world: WorldId;
  reducedMotion: boolean;
}

export default function HeroGrid({ world, reducedMotion }: HeroGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<GridRenderer | null>(null);
  const worldRef = useRef(world);
  worldRef.current = world;

  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = createGridRenderer({
      canvas,
      world: worldRef.current,
      reducedMotion,
    });
    rendererRef.current = renderer;
    renderer.start();

    return () => {
      renderer.destroy();
      rendererRef.current = null;
    };
  }, [reducedMotion]);

  useEffect(() => {
    rendererRef.current?.setWorld(world);
  }, [world]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  );
}
