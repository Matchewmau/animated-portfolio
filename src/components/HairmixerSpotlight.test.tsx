import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import HairmixerSpotlight from "./HairmixerSpotlight";

vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    const { priority, alt, ...rest } = props;
    void priority;
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img {...(rest as Record<string, string>)} alt={String(alt ?? "")} />
    );
  },
}));

describe("HairmixerSpotlight", () => {
  it("renders one large glass panel with the existing content", () => {
    const { container } = render(<HairmixerSpotlight />);

    expect(container.querySelector(".spotlight-panel")).toHaveClass(
      "glass-panel"
    );
    expect(container.querySelector(".bg-ink")).toBeNull();
    expect(
      screen.getByText("HairMixer: -40% latency, ECAI 2026")
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Read case study" })).toHaveAttribute(
      "href",
      "/projects/hairmixer-ai"
    );
    expect(screen.getByRole("link", { name: "Live site" })).toBeInTheDocument();
  });
});
