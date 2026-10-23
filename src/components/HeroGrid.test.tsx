import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import HeroGrid from "./HeroGrid";

const mocks = vi.hoisted(() => {
  const renderer = {
    start: vi.fn(),
    stop: vi.fn(),
    setWorld: vi.fn(),
    resize: vi.fn(),
    destroy: vi.fn(),
  };
  return {
    renderer,
    createGridRenderer: vi.fn(() => renderer),
  };
});

vi.mock("@/lib/gridRenderer", () => ({
  createGridRenderer: mocks.createGridRenderer,
}));

import { createGridRenderer } from "@/lib/gridRenderer";

describe("HeroGrid", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates the engine once and forwards world changes", () => {
    const { rerender, unmount } = render(
      <HeroGrid world="cyan" reducedMotion={false} />
    );

    expect(createGridRenderer).toHaveBeenCalledWith(
      expect.objectContaining({ world: "cyan", reducedMotion: false })
    );
    expect(mocks.renderer.start).toHaveBeenCalled();

    rerender(<HeroGrid world="solar" reducedMotion={false} />);
    expect(mocks.renderer.setWorld).toHaveBeenCalledWith("solar");

    unmount();
    expect(mocks.renderer.destroy).toHaveBeenCalled();
  });

  it("does not create a renderer under reduced motion", () => {
    const { container } = render(
      <HeroGrid world="cyan" reducedMotion />
    );

    expect(createGridRenderer).not.toHaveBeenCalled();
    expect(container.querySelector("canvas")).not.toBeNull();
  });
});
