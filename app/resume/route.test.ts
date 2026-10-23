import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("resume route", () => {
  it("serves the new PDF with a clean download filename", async () => {
    const response = await GET();

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("application/pdf");
    expect(response.headers.get("content-disposition")).toContain(
      'filename="John-Mauricio-Resume.pdf"'
    );
    expect((await response.arrayBuffer()).byteLength).toBeGreaterThan(10_000);
  });
});
