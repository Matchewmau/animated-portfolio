import {
  WORLDS,
  WORLD_IDS,
  type WorldId,
  type WorldPalette,
} from "./gridWorlds";

export interface SiteThemeTokens {
  bg: string;
  fg: string;
  dim: string;
  line: string;
  line2: string;
  accent: string;
  accentFill: string;
  onAccent: string;
  glow: string;
  panel: string;
  panelBorder: string;
  wordStroke: string;
  rim: string;
  shadow: string;
  vignette: string;
  grain: string;
  gridOpacity: string;
  gridSize: string;
  pageGlow: string;
}

const SITE: Record<
  WorldId,
  Pick<SiteThemeTokens, "gridOpacity" | "gridSize" | "pageGlow">
> = {
  cyan: {
    gridOpacity: ".14",
    gridSize: "48px",
    pageGlow: "color-mix(in srgb, #35E6FF 10%, transparent)",
  },
  crimson: {
    gridOpacity: ".08",
    gridSize: "48px",
    pageGlow: "color-mix(in srgb, #FF2C52 5%, transparent)",
  },
  solar: {
    gridOpacity: ".12",
    gridSize: "48px",
    pageGlow: "color-mix(in srgb, #FF7A3D 8%, transparent)",
  },
};

export function getSiteTheme(world: WorldId): SiteThemeTokens {
  const palette: WorldPalette = WORLDS[world].palette;
  return {
    bg: palette.bg,
    fg: palette.fg,
    dim: palette.dim,
    line: palette.line,
    line2: palette.line2,
    accent: palette.accentText,
    accentFill: palette.thumbBg,
    onAccent: palette.thumbFg,
    glow: palette.glow,
    panel: palette.panel,
    panelBorder: palette.panelBorder,
    wordStroke: palette.wordStroke,
    rim: palette.rim,
    shadow: palette.shadow,
    vignette: palette.vignette,
    grain: String(palette.grainOpacity),
    ...SITE[world],
  };
}

const TOKEN_ORDER: Array<[keyof SiteThemeTokens, string]> = [
  ["bg", "bg"],
  ["fg", "fg"],
  ["dim", "dim"],
  ["line", "line"],
  ["line2", "line-2"],
  ["accent", "accent"],
  ["accentFill", "accent-fill"],
  ["onAccent", "on-accent"],
  ["glow", "glow"],
  ["panel", "panel"],
  ["panelBorder", "panel-border"],
  ["wordStroke", "word-stroke"],
  ["rim", "rim"],
  ["shadow", "shadow"],
  ["vignette", "vignette"],
  ["grain", "grain"],
  ["gridOpacity", "grid-opacity"],
  ["gridSize", "grid-size"],
  ["pageGlow", "page-glow"],
];

export function getWorldThemeCss(): string {
  return WORLD_IDS.map((id) => {
    const theme = getSiteTheme(id);
    const body = TOKEN_ORDER.map(
      ([key, name]) => `--world-${name}:${theme[key]}`
    ).join(";");
    return `[data-world="${id}"]{${body}}`;
  }).join("\n");
}
