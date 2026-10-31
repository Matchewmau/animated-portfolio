import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Footer from "./Footer";
import Navbar from "./Navbar";

describe("site shell", () => {
  it("keeps navbar links usable from project pages", () => {
    const { container } = render(<Navbar />);

    expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute(
      "href",
      "/#work"
    );
    expect(screen.getByRole("link", { name: "Skills" })).toHaveAttribute(
      "href",
      "/#skills"
    );
    expect(screen.getByRole("link", { name: "Experience" })).toHaveAttribute(
      "href",
      "/#experience"
    );
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute(
      "href",
      "/#contact"
    );
    expect(container.querySelector("header")).toHaveClass("site-nav");
    expect(container.querySelector(".world-switch")).toBeNull();
  });

  it("renders a themed footer without a solid light strip", () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector("footer");

    expect(footer).toHaveClass("site-footer");
    expect(footer).not.toHaveClass("bg-white");
    expect(screen.getByRole("link", { name: "Resume" })).toHaveAttribute(
      "href",
      "/Mauricio_Resume.pdf"
    );
  });
});
