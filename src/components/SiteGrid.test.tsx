import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SiteGrid from "./SiteGrid";

describe("SiteGrid", () => {
  it("renders one decorative static layer", () => {
    const { container } = render(<SiteGrid />);
    const grid = container.firstElementChild;

    expect(grid).toHaveClass("site-grid");
    expect(grid).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelectorAll(".site-grid")).toHaveLength(1);
    expect(container.querySelector("canvas")).toBeNull();
  });
});
