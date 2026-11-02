import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { projects } from "@/content/projects";
import CaseStudyLayout from "./CaseStudyLayout";

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

describe("CaseStudyLayout", () => {
  it("renders a themed open article with no world switch", () => {
    const project = projects[0];
    const { container } = render(<CaseStudyLayout project={project} />);

    expect(
      screen.getByRole("heading", { level: 1, name: project.title })
    ).toBeInTheDocument();
    expect(container.querySelector("article")).toHaveClass("case-study");
    expect(container.querySelector(".metric-block")).not.toBeNull();
    expect(container.querySelector(".case-study-next")).toHaveClass(
      "glass-panel"
    );
    expect(container.querySelector(".bg-ink")).toBeNull();
    expect(container.querySelector(".world-switch")).toBeNull();
    expect(screen.getByRole("link", { name: /Back to work/ })).toHaveAttribute(
      "href",
      "/#work"
    );
  });
});
