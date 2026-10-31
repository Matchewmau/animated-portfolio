import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
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
  it("starts in Cyan Ripple and changes the whole world from the switch", async () => {
    const user = userEvent.setup();
    const { container } = render(<Hero />);
    const section = container.querySelector("#top");

    expect(section).toHaveAttribute("data-world", "cyan");
    expect(container.querySelector(".hero-readout")).toBeNull();
    expect(screen.getByRole("status")).toHaveTextContent("Cyan Ripple");
    expect(screen.getByRole("radio", { name: "Cyan Ripple" })).toHaveAttribute(
      "aria-checked",
      "true"
    );
    expect(screen.getByText("ECAI 2026")).toBeInTheDocument();
    expect(screen.queryByText("-50%")).not.toBeInTheDocument();

    await user.click(screen.getByRole("radio", { name: "Crimson Tunnel" }));
    expect(section).toHaveAttribute("data-world", "crimson");
    expect(screen.getByRole("radio", { name: "Crimson Tunnel" })).toHaveAttribute(
      "aria-checked",
      "true"
    );
    expect(screen.getByRole("status")).toHaveTextContent("Crimson Tunnel");

    await user.click(screen.getByRole("radio", { name: "Solar Floor" }));
    expect(section).toHaveAttribute("data-world", "solar");
    expect(screen.getByRole("radio", { name: "Solar Floor" })).toHaveAttribute(
      "aria-checked",
      "true"
    );
    expect(screen.getByRole("status")).toHaveTextContent("Solar Floor");

    await user.click(screen.getByRole("radio", { name: "Cyan Ripple" }));
    expect(section).toHaveAttribute("data-world", "cyan");
    expect(screen.getByRole("radio", { name: "Cyan Ripple" })).toHaveAttribute(
      "aria-checked",
      "true"
    );
    expect(screen.getByRole("status")).toHaveTextContent("Cyan Ripple");
  });
});
