// @vitest-environment node
// Node env: importing vitest.config.ts loads esbuild, which rejects jsdom's TextEncoder.
import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import vitestConfig from "../../vitest.config";

const root = path.resolve(__dirname, "../..");

describe("@/ path alias", () => {
  it("resolves to src/ only, identically in tsconfig and vitest", () => {
    const tsconfig = JSON.parse(readFileSync(path.join(root, "tsconfig.json"), "utf8"));

    expect(tsconfig.compilerOptions.paths["@/*"]).toEqual(["./src/*"]);
    expect(vitestConfig.resolve?.alias).toEqual({ "@": path.join(root, "src") });
  });
});
