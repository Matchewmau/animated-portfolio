import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Contact from "./Contact";

describe("Contact", () => {
  it("uses themed primary and secondary actions", () => {
    const { container } = render(<Contact />);

    expect(screen.getByRole("link", { name: "Email me" })).toHaveClass(
      "btn-primary"
    );
    expect(screen.getByRole("link", { name: "Call" })).toHaveClass(
      "btn-secondary"
    );
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveClass(
      "btn-secondary"
    );
    expect(screen.getByRole("button", { name: "Copy email" })).toHaveClass(
      "btn-secondary"
    );
    expect(container.querySelector(".bg-ink")).toBeNull();
  });
});
