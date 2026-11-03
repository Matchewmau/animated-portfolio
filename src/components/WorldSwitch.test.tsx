import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import WorldSwitch from "./WorldSwitch";

describe("WorldSwitch", () => {
  it("renders three compact radios with accessible names", () => {
    render(<WorldSwitch value="crimson" onChange={() => {}} />);

    expect(
      screen.getByRole("radiogroup", { name: "Grid world" })
    ).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(3);
    expect(
      screen.getByRole("radio", { name: "Crimson Tunnel" })
    ).toHaveAttribute("aria-checked", "true");
    expect(
      screen.getByRole("radio", { name: "Cyan Ripple" })
    ).toHaveAttribute("aria-checked", "false");
    expect(screen.getByRole("status")).toHaveTextContent("Crimson Tunnel");

    expect(screen.queryByText("World")).not.toBeInTheDocument();
    expect(screen.queryByText("Cyan")).not.toBeInTheDocument();
    expect(screen.queryByText("Crimson")).not.toBeInTheDocument();
  });

  it("changes the world on click", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<WorldSwitch value="cyan" onChange={onChange} />);

    await user.click(screen.getByRole("radio", { name: "Solar Floor" }));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith("solar");
  });

  it("wraps with arrow keys and moves focus", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<WorldSwitch value="cyan" onChange={onChange} />);

    screen.getByRole("radio", { name: "Cyan Ripple" }).focus();
    await user.keyboard("{ArrowLeft}");

    expect(onChange).toHaveBeenCalledWith("solar");
    expect(
      screen.getByRole("radio", { name: "Solar Floor" })
    ).toHaveFocus();

    await user.keyboard("{Home}");

    expect(onChange).toHaveBeenCalledWith("cyan");
    expect(
      screen.getByRole("radio", { name: "Cyan Ripple" })
    ).toHaveFocus();
  });
});
