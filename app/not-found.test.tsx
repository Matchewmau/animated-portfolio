import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NotFound from "./not-found";

describe("NotFound", () => {
  it("uses the themed 404 surface", () => {
    render(<NotFound />);

    expect(screen.getByText("404")).toHaveClass("section-eyebrow");
    expect(screen.getByRole("link", { name: "Return home" })).toHaveClass(
      "btn-primary"
    );
    expect(
      screen.getByRole("link", { name: "View selected work" })
    ).toHaveClass("btn-secondary");
  });
});
