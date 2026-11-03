import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { experience } from "@/content/experience";
import Experience from "./Experience";

describe("Experience", () => {
  it("renders every entry as a glass panel", () => {
    const { container } = render(<Experience />);

    expect(container.querySelectorAll(".experience-panel")).toHaveLength(
      experience.length + 2
    );
    expect(container.querySelectorAll(".glass-panel")).toHaveLength(
      experience.length + 2
    );
    expect(container.querySelector(".bg-white")).toBeNull();
    expect(screen.getByText("Where I've delivered")).toBeInTheDocument();
    expect(screen.getByText("Education")).toBeInTheDocument();
    expect(screen.getByText("Certifications")).toBeInTheDocument();
  });
});
