import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { projects } from "@/content/projects";
import ProofBar from "./ProofBar";
import ProjectCard from "./ProjectCard";
import SectionHeading from "./SectionHeading";

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

describe("home surfaces", () => {
  it("renders the proof bar open on the grid", () => {
    const { container } = render(<ProofBar />);

    expect(container.querySelector("section")).toHaveClass("site-rule-y");
    expect(container.querySelector(".bg-white")).toBeNull();
    expect(screen.getByText("ECAI 2026")).toBeInTheDocument();
  });

  it("renders a themed section heading", () => {
    render(
      <SectionHeading
        eyebrow="Selected work"
        title="Production apps, not demos"
        description="Three shipped projects."
      />
    );

    expect(screen.getByText("Selected work")).toHaveClass("section-eyebrow");
    expect(screen.getByText("Three shipped projects.")).toHaveClass(
      "section-description"
    );
  });

  it("renders project cards as glass panels", () => {
    const project = projects[0];
    const { container } = render(<ProjectCard project={project} />);
    const link = screen.getByRole("link");

    expect(link).toHaveAttribute("href", `/projects/${project.slug}`);
    expect(link).toHaveClass("glass-panel");
    expect(container.querySelector(".bg-white")).toBeNull();
    expect(container.querySelector(".metric-pill")).not.toBeNull();
    expect(container.querySelector(".ghost-pill")).not.toBeNull();
  });
});
