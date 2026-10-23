import { describe, expect, it } from "vitest";
import { DEFAULT_WORLD, WORLD_IDS, WORLDS, getWorld } from "./gridWorlds";

describe("tron grid worlds", () => {
  it("ships exactly the three owner-approved combinations", () => {
    expect(WORLD_IDS).toEqual(["cyan", "crimson", "solar"]);
    expect(DEFAULT_WORLD).toBe("cyan");
    expect(WORLDS.cyan).toMatchObject({
      form: "ripple",
      label: "Cyan",
      name: "Cyan Ripple",
      index: "01",
    });
    expect(WORLDS.crimson).toMatchObject({
      form: "tunnel",
      label: "Crimson",
      name: "Crimson Tunnel",
      index: "02",
    });
    expect(WORLDS.solar).toMatchObject({
      form: "floor",
      label: "Solar",
      name: "Solar Floor",
      index: "03",
    });
  });

  it("uses the approved palette anchors", () => {
    expect(WORLDS.cyan.palette).toMatchObject({
      bg: "#02060D",
      line: "#5FF7FF",
      line2: "#B9FFFF",
      glow: "#35E6FF",
    });
    expect(WORLDS.crimson.palette).toMatchObject({
      bg: "#090205",
      line: "#DC2645",
      line2: "#FF97A8",
      glow: "#FF2C52",
    });
    expect(WORLDS.solar.palette).toMatchObject({
      bg: "#F3E8DA",
      line: "#8A3A1E",
      line2: "#C2410C",
      glow: "#FF7A3D",
    });
  });

  it("returns the config by id", () => {
    expect(getWorld("solar").form).toBe("floor");
  });
});
