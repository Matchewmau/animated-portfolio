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
    expect(screen.getByText("Cyan Ripple")).toBeInTheDocument();

    await user.click(screen.getByRole("radio", { name: "Crimson" }));
    expect(section).toHaveAttribute("data-world", "crimson");
    expect(screen.getByText("Crimson Tunnel")).toBeInTheDocument();

    await user.click(screen.getByRole("radio", { name: "Solar" }));
    expect(section).toHaveAttribute("data-world", "solar");
    expect(screen.getByText("Solar Floor")).toBeInTheDocument();

    await user.click(screen.getByRole("radio", { name: "Cyan" }));
    expect(section).toHaveAttribute("data-world", "cyan");
    expect(screen.getByText("Cyan Ripple")).toBeInTheDocument();
  });
});
