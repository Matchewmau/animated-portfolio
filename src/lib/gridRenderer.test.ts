import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createGridRenderer,
  hexToRgb,
  mixRgb,
  rgba,
} from "./gridRenderer";

function makeCanvas() {
  const parent = document.createElement("div");
  Object.defineProperty(parent, "clientWidth", { value: 800 });
  Object.defineProperty(parent, "clientHeight", { value: 600 });
  const canvas = document.createElement("canvas");
  parent.appendChild(canvas);
  document.body.appendChild(parent);
  return canvas;
}

describe("grid renderer", () => {
  afterEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = "";
  });

  it("parses, mixes, and formats colours", () => {
    expect(hexToRgb("#5FF7FF")).toEqual({ r: 95, g: 247, b: 255 });
    expect(
      mixRgb({ r: 0, g: 0, b: 0 }, { r: 100, g: 200, b: 40 }, 0.5)
    ).toEqual({ r: 50, g: 100, b: 20 });
    expect(rgba({ r: 95, g: 247, b: 255 }, 0.5)).toBe(
      "rgba(95,247,255,0.5)"
    );
  });

  it("starts one loop and tears down cleanly", () => {
    const canvas = makeCanvas();
    const renderer = createGridRenderer({
      canvas,
      world: "cyan",
      reducedMotion: false,
    });

    renderer.start();
    expect(vi.mocked(requestAnimationFrame)).toHaveBeenCalledTimes(1);

    renderer.setWorld("crimson");
    renderer.destroy();

    expect(vi.mocked(cancelAnimationFrame)).toHaveBeenCalled();
  });

  it("does not animate under reduced motion", () => {
    const canvas = makeCanvas();
    const renderer = createGridRenderer({
      canvas,
      world: "solar",
      reducedMotion: true,
    });

    renderer.start();

    expect(vi.mocked(requestAnimationFrame)).not.toHaveBeenCalled();
    renderer.destroy();
  });

  it("survives a missing 2D context", () => {
    const canvas = makeCanvas();
    const spy = vi
      .spyOn(HTMLCanvasElement.prototype, "getContext")
      .mockReturnValue(null);

    const renderer = createGridRenderer({
      canvas,
      world: "cyan",
      reducedMotion: false,
    });

    expect(() => {
      renderer.start();
      renderer.setWorld("solar");
      renderer.destroy();
    }).not.toThrow();

    spy.mockRestore();
  });
});
