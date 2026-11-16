import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
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

  it("is hidden from the sm breakpoint up", () => {
    render(<MobileNavMenu links={links} />);

    expect(menuButton().parentElement).toHaveClass("sm:hidden");
  });

  it("closes when the viewport grows to the desktop breakpoint", async () => {
    const user = userEvent.setup();
    const original = window.matchMedia;
    let onChange: ((event: { matches: boolean }) => void) | undefined;
    window.matchMedia = ((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: (_type: string, listener: typeof onChange) => {
        onChange = listener;
      },
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    })) as unknown as typeof window.matchMedia;
    try {
      render(<MobileNavMenu links={links} />);
      await user.click(menuButton());
      expect(menuButton()).toHaveAttribute("aria-expanded", "true");
      expect(onChange).toBeDefined();

      act(() => onChange?.({ matches: false }));
      expect(menuButton()).toHaveAttribute("aria-expanded", "true");

      act(() => onChange?.({ matches: true }));
      expect(menuButton()).toHaveAttribute("aria-expanded", "false");
    } finally {
      window.matchMedia = original;
    }
  });

  it("falls back to addListener where MediaQueryList lacks addEventListener", async () => {
    const user = userEvent.setup();
    const original = window.matchMedia;
    const addListener = vi.fn();
    const removeListener = vi.fn();
    window.matchMedia = ((query: string) => ({
      matches: false,
      media: query,
      addListener,
      removeListener,
    })) as unknown as typeof window.matchMedia;
    try {
      render(<MobileNavMenu links={links} />);
      await user.click(menuButton());
      expect(menuButton()).toHaveAttribute("aria-expanded", "true");
      expect(addListener).toHaveBeenCalledTimes(1);

      await user.click(menuButton());
      expect(removeListener).toHaveBeenCalledTimes(1);
    } finally {
      window.matchMedia = original;
    }
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
