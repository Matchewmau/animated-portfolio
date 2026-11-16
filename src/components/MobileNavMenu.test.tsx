import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import MobileNavMenu from "./MobileNavMenu";

const links = [
  { label: "Work", href: "/#work" },
  { label: "Contact", href: "/#contact" },
];

const menuButton = () => screen.getByRole("button", { name: "Menu" });

describe("MobileNavMenu", () => {
  it("starts closed with its controlled panel hidden", () => {
    render(<MobileNavMenu links={links} />);

    expect(menuButton()).toHaveAttribute("aria-expanded", "false");
    const panel = document.getElementById(menuButton().getAttribute("aria-controls") ?? "");
    expect(panel).not.toBeNull();
    expect(panel).not.toBeVisible();
    expect(screen.queryByRole("link", { name: "Work" })).toBeNull();
  });

  it("opens to show every section link", async () => {
    const user = userEvent.setup();
    render(<MobileNavMenu links={links} />);

    await user.click(menuButton());

    expect(menuButton()).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute("href", "/#work");
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "/#contact");
  });

  it("closes on Escape and returns focus to the button", async () => {
    const user = userEvent.setup();
    render(<MobileNavMenu links={links} />);

    await user.click(menuButton());
    await user.tab();
    expect(screen.getByRole("link", { name: "Work" })).toHaveFocus();

    await user.keyboard("{Escape}");

    expect(menuButton()).toHaveAttribute("aria-expanded", "false");
    expect(menuButton()).toHaveFocus();
  });

  it("closes when a link is chosen", async () => {
    const user = userEvent.setup();
    render(<MobileNavMenu links={links} />);

    await user.click(menuButton());
    await user.click(screen.getByRole("link", { name: "Contact" }));

    expect(menuButton()).toHaveAttribute("aria-expanded", "false");
  });

  it("closes when the pointer goes down outside it", async () => {
    const user = userEvent.setup();
    render(
      <>
        <MobileNavMenu links={links} />
        <p>Outside</p>
      </>
    );

    await user.click(menuButton());
    fireEvent.pointerDown(screen.getByText("Outside"));

    expect(menuButton()).toHaveAttribute("aria-expanded", "false");
  });

  it("closes when keyboard focus moves past the last link", async () => {
    const user = userEvent.setup();
    render(
      <>
        <MobileNavMenu links={links} />
        <button type="button">After menu</button>
      </>
    );

    await user.click(menuButton());
    await user.tab();
    await user.tab();
    expect(screen.getByRole("link", { name: "Contact" })).toHaveFocus();

    await user.tab();

    expect(screen.getByRole("button", { name: "After menu" })).toHaveFocus();
    expect(menuButton()).toHaveAttribute("aria-expanded", "false");
  });
});
