import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { profile } from "./profile";
import { siteDescription } from "@/lib/seo";

describe("resume-aligned profile", () => {
  it("uses the new resume and keeps Zamboanga visible", () => {
    expect(profile.location).toContain("Zamboanga City");
    expect(profile.location).not.toContain("Muntinlupa");
    expect(profile.resumeUrl).toBe("/Mauricio_Resume.pdf");
    expect(
      existsSync(path.join(process.cwd(), "public", "Mauricio_Resume.pdf"))
    ).toBe(true);
    expect(profile.phone).toBe("+63 956 628 4039");
  });

  it("replaces the unsupported -50% stat with ECAI 2026", () => {
    expect(profile.proof.map((item) => item.value)).toContain("ECAI 2026");
    expect(JSON.stringify(profile.proof)).not.toContain("-50%");
  });

  it("describes PConnect as B2B, not campus", () => {
    expect(siteDescription.toLowerCase()).toContain("b2b");
    expect(siteDescription.toLowerCase()).not.toContain("campus");
    expect(siteDescription).not.toContain("-50%");
  });
});
