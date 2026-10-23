import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import WorldSwitch from "./WorldSwitch";

describe("WorldSwitch", () => {
  it("renders three radios and marks the active world", () => {
    render(<WorldSwitch value="crimson" onChange={() => {}} />);

    expect(screen.getByRole("radiogroup", { name: "World" })).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(3);
    expect(screen.getByRole("radio", { name: "Crimson" })).toHaveAttribute(
      "aria-checked",
      "true"
    );
    expect(screen.getByRole("radio", { name: "Cyan" })).toHaveAttribute(
      "aria-checked",
      "false"
    );

    const thumb = screen.getByTestId("world-switch-thumb");
    expect(thumb.style.getPropertyValue("--i")).toBe("1");
  });

  it("changes the whole world on click", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<WorldSwitch value="cyan" onChange={onChange} />);

    await user.click(screen.getByRole("radio", { name: "Solar" }));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith("solar");
  });

  it("wraps with arrow keys and moves focus", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<WorldSwitch value="cyan" onChange={onChange} />);

    screen.getByRole("radio", { name: "Cyan" }).focus();
    await user.keyboard("{ArrowLeft}");

    expect(onChange).toHaveBeenCalledWith("solar");
    expect(screen.getByRole("radio", { name: "Solar" })).toHaveFocus();

    await user.keyboard("{Home}");

    expect(onChange).toHaveBeenCalledWith("cyan");
    expect(screen.getByRole("radio", { name: "Cyan" })).toHaveFocus();
  });
});
