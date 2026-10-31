import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { WorldProvider } from "./WorldProvider";
import Hero from "./Hero";

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

describe("Hero", () => {
  it("starts in Cyan and changes the world from the compact switch", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <WorldProvider>
        <Hero />
      </WorldProvider>
    );

    expect(document.documentElement).toHaveAttribute("data-world", "cyan");
    expect(screen.getByRole("status")).toHaveTextContent("Cyan Ripple");
    expect(screen.getByText("ECAI 2026")).toBeInTheDocument();
    expect(screen.queryByText("-50%")).not.toBeInTheDocument();
    expect(container.querySelector(".hero-readout")).toBeNull();

    await user.click(
      screen.getByRole("radio", { name: "Crimson Tunnel" })
    );
    expect(document.documentElement).toHaveAttribute(
      "data-world",
      "crimson"
    );
    expect(screen.getByRole("status")).toHaveTextContent("Crimson Tunnel");

    await user.click(screen.getByRole("radio", { name: "Solar Floor" }));
    expect(document.documentElement).toHaveAttribute("data-world", "solar");
    expect(screen.getByRole("status")).toHaveTextContent("Solar Floor");

    await user.click(screen.getByRole("radio", { name: "Cyan Ripple" }));
    expect(document.documentElement).toHaveAttribute("data-world", "cyan");
    expect(screen.getByRole("status")).toHaveTextContent("Cyan Ripple");
  });
});
