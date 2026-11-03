import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { WORLD_STORAGE_KEY } from "@/lib/worldStorage";
import { WorldProvider, useWorld } from "./WorldProvider";

function Probe() {
  const { world, ready, setWorld } = useWorld();
  return (
    <div>
      <span data-testid="world">{world}</span>
      <span data-testid="ready">{String(ready)}</span>
      <button type="button" onClick={() => setWorld("solar")}>
        solar
      </button>
    </div>
  );
}

describe("WorldProvider", () => {
  it("syncs from the pre-paint root attribute", async () => {
    document.documentElement.setAttribute("data-world", "crimson");

    render(
      <WorldProvider>
        <Probe />
      </WorldProvider>
    );

    await waitFor(() =>
      expect(screen.getByTestId("ready")).toHaveTextContent("true")
    );
    expect(screen.getByTestId("world")).toHaveTextContent("crimson");
  });

  it("updates the root attribute and session storage", async () => {
    const user = userEvent.setup();
    render(
      <WorldProvider>
        <Probe />
      </WorldProvider>
    );

    await user.click(screen.getByRole("button", { name: "solar" }));

    expect(document.documentElement).toHaveAttribute("data-world", "solar");
    expect(window.sessionStorage.getItem(WORLD_STORAGE_KEY)).toBe("solar");
  });

  it("falls back to cyan for an invalid root value", async () => {
    document.documentElement.setAttribute("data-world", "neon");

    render(
      <WorldProvider>
        <Probe />
      </WorldProvider>
    );

    await waitFor(() =>
      expect(screen.getByTestId("world")).toHaveTextContent("cyan")
    );
    expect(document.documentElement).toHaveAttribute("data-world", "cyan");
  });

  it("throws when useWorld is used outside the provider", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Probe />)).toThrow(
      "useWorld must be used within WorldProvider"
    );
    spy.mockRestore();
  });
});
