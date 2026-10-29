import { beforeEach, describe, expect, it, vi } from "vitest";
import { DEFAULT_WORLD } from "./gridWorlds";
import {
  WORLD_STORAGE_KEY,
  getWorldBootScript,
  parseStoredWorld,
  readStoredWorld,
  writeStoredWorld,
} from "./worldStorage";

beforeEach(() => {
  window.sessionStorage.clear();
});

describe("world storage", () => {
  it("parses only known worlds", () => {
    expect(parseStoredWorld("crimson")).toBe("crimson");
    expect(parseStoredWorld("neon")).toBe(DEFAULT_WORLD);
    expect(parseStoredWorld(null)).toBe(DEFAULT_WORLD);
  });

  it("reads and writes the session world", () => {
    writeStoredWorld("solar");
    expect(window.sessionStorage.getItem(WORLD_STORAGE_KEY)).toBe("solar");
    expect(readStoredWorld()).toBe("solar");
  });

  it("removes an invalid stored world", () => {
    window.sessionStorage.setItem(WORLD_STORAGE_KEY, "neon");

    expect(readStoredWorld()).toBe(DEFAULT_WORLD);
    expect(window.sessionStorage.getItem(WORLD_STORAGE_KEY)).toBeNull();
  });

  it("falls back safely when storage throws", () => {
    const get = vi
      .spyOn(Storage.prototype, "getItem")
      .mockImplementation(() => {
        throw new Error("blocked");
      });
    const set = vi
      .spyOn(Storage.prototype, "setItem")
      .mockImplementation(() => {
        throw new Error("blocked");
      });

    expect(readStoredWorld()).toBe(DEFAULT_WORLD);
    expect(() => writeStoredWorld("crimson")).not.toThrow();

    get.mockRestore();
    set.mockRestore();
  });

  it("emits a pre-paint boot script with the key and ids", () => {
    const script = getWorldBootScript();
    expect(script).toContain(WORLD_STORAGE_KEY);
    expect(script).toContain('"cyan"');
    expect(script).toContain('"crimson"');
    expect(script).toContain('"solar"');
    expect(script).toContain("document.documentElement");
    expect(script).toContain("removeItem");
  });
});
