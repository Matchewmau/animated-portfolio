import { render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { skillGroups } from "@/content/skills";
import SkillsMatrix from "./SkillsMatrix";

// ScrollReveal uses motion/react's whileInView, which needs an
// IntersectionObserver that jsdom does not provide.
class IntersectionObserverStub {
  root = null;
  rootMargin = "";
  thresholds: number[] = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

beforeAll(() => {
  vi.stubGlobal("IntersectionObserver", IntersectionObserverStub);
});

describe("SkillsMatrix", () => {
  it("renders open columns with every skill group", () => {
    const { container } = render(<SkillsMatrix />);

    expect(container.querySelectorAll(".skill-group")).toHaveLength(
      skillGroups.length
    );
    expect(container.querySelector(".bg-white")).toBeNull();
    expect(screen.getByText("Hire-ready stack")).toBeInTheDocument();
    for (const group of skillGroups) {
      expect(screen.getByText(group.title)).toBeInTheDocument();
    }
  });
});
