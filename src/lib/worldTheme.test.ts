import { describe, expect, it } from "vitest";
import { WORLD_IDS } from "./gridWorlds";
import { getSiteTheme, getWorldThemeCss } from "./worldTheme";

describe("site theme", () => {
  it("maps every world palette to complete site tokens", () => {
    for (const id of WORLD_IDS) {
      const theme = getSiteTheme(id);
      expect(theme.bg).toMatch(/^#|^rgba/);
      expect(theme.fg).toMatch(/^#|^rgba/);
      expect(theme.accent).toBeTruthy();
      expect(theme.accentFill).toBeTruthy();
      expect(theme.onAccent).toBeTruthy();
      expect(theme.gridOpacity).toMatch(/^0?\.\d+$/);
      expect(theme.gridSize).toMatch(/px$/);
      expect(theme.pageGlow).toContain("color-mix");
    }
  });

  it("keeps crimson quieter than cyan and sunset light", () => {
    expect(Number(getSiteTheme("crimson").gridOpacity)).toBeLessThan(
      Number(getSiteTheme("cyan").gridOpacity)
    );
    expect(getSiteTheme("solar").bg).toBe("#F3E8DA");
    expect(getSiteTheme("solar").fg).toBe("#1C130D");
  });

  it("generates one token block per world", () => {
    const css = getWorldThemeCss();
    for (const id of WORLD_IDS) {
      expect(css).toContain(`[data-world="${id}"]`);
    }
    expect(css).toContain("--world-bg:#02060D");
    expect(css).toContain("--world-accent-fill:#9CFBFF");
    expect(css).toContain("--world-grid-opacity:.08");
    expect(css).not.toContain("undefined");
  });
});
