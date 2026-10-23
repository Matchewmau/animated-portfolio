import type { WorldId } from "@/lib/gridWorlds";

export default function HeroGridFallback({ world }: { world: WorldId }) {
  return (
    <div
      aria-hidden="true"
      data-world={world}
      className="hero-grid-fallback pointer-events-none absolute inset-0 z-0"
    />
  );
}
