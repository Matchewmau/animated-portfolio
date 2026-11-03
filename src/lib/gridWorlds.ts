export type WorldId = "cyan" | "crimson" | "solar";
export type GridForm = "ripple" | "tunnel" | "floor";

export interface WorldPalette {
  bg: string;
  fg: string;
  dim: string;
  line: string;
  line2: string;
  accentText: string;
  glow: string;
  panel: string;
  panelBorder: string;
  wordStroke: string;
  rim: string;
  shadow: string;
  vignette: string;
  thumbBg: string;
  thumbFg: string;
  grainOpacity: number;
}

export interface WorldDefinition {
  id: WorldId;
  index: string;
  label: string;
  name: string;
  description: string;
  form: GridForm;
  palette: WorldPalette;
}

export const WORLD_IDS = ["cyan", "crimson", "solar"] as const;
export const DEFAULT_WORLD: WorldId = "cyan";

export const WORLDS: Record<WorldId, WorldDefinition> = {
  cyan: {
    id: "cyan",
    index: "01",
    label: "Cyan",
    name: "Cyan Ripple",
    description: "A cold liquid grid that ripples under your cursor.",
    form: "ripple",
    palette: {
      bg: "#02060D",
      fg: "#F4F8FF",
      dim: "rgba(244, 248, 255, 0.62)",
      line: "#5FF7FF",
      line2: "#B9FFFF",
      accentText: "#B9FFFF",
      glow: "#35E6FF",
      panel: "rgba(4, 12, 20, 0.55)",
      panelBorder: "rgba(120, 245, 255, 0.24)",
      wordStroke: "rgba(95, 247, 255, 0.16)",
      rim: "rgba(80, 240, 255, 0.55)",
      shadow: "rgba(0, 0, 0, 0.65)",
      vignette: "rgba(0, 2, 8, 0.72)",
      thumbBg: "#9CFBFF",
      thumbFg: "#021018",
      grainOpacity: 0.06,
    },
  },
  crimson: {
    id: "crimson",
    index: "02",
    label: "Crimson",
    name: "Crimson Tunnel",
    description: "A crimson corridor that breathes with your movement.",
    form: "tunnel",
    palette: {
      bg: "#090205",
      fg: "#FFF5F7",
      dim: "rgba(255, 245, 247, 0.62)",
      line: "#DC2645",
      line2: "#FF97A8",
      accentText: "#FF97A8",
      glow: "#FF2C52",
      panel: "rgba(20, 2, 7, 0.55)",
      panelBorder: "rgba(255, 90, 120, 0.28)",
      wordStroke: "rgba(255, 90, 120, 0.15)",
      rim: "rgba(255, 60, 95, 0.6)",
      shadow: "rgba(0, 0, 0, 0.7)",
      vignette: "rgba(8, 0, 2, 0.78)",
      thumbBg: "#FF5C77",
      thumbFg: "#190206",
      grainOpacity: 0.07,
    },
  },
  solar: {
    id: "solar",
    index: "03",
    label: "Solar",
    name: "Solar Floor",
    description: "A warm wireframe dawn at the edge of the grid.",
    form: "floor",
    palette: {
      bg: "#F3E8DA",
      fg: "#1C130D",
      dim: "rgba(28, 19, 13, 0.7)",
      line: "#8A3A1E",
      line2: "#C2410C",
      accentText: "#A63A12",
      glow: "#FF7A3D",
      panel: "rgba(255, 250, 243, 0.58)",
      panelBorder: "rgba(80, 30, 10, 0.18)",
      wordStroke: "rgba(80, 30, 10, 0.15)",
      rim: "rgba(255, 122, 61, 0.7)",
      shadow: "rgba(70, 35, 15, 0.25)",
      vignette: "rgba(120, 70, 30, 0.16)",
      thumbBg: "#A63A12",
      thumbFg: "#FFF8F0",
      grainOpacity: 0.035,
    },
  },
};

export function getWorld(id: WorldId): WorldDefinition {
  return WORLDS[id];
}
