"use client";

import { useEffect, useId, useRef, useState, type FocusEvent } from "react";

export interface NavLink {
  label: string;
  href: string;
}

// Tailwind's `sm` breakpoint: at this width the inline desktop links take over.
const DESKTOP_QUERY = "(min-width: 640px)";

export default function MobileNavMenu({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };

    // Safari 12-13 lack MediaQueryList.addEventListener; use the legacy API there.
    // Registered first so a failure cannot leave document listeners behind.
    if (desktop.addEventListener) desktop.addEventListener("change", onBreakpoint);
    else desktop.addListener(onBreakpoint);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      if (desktop.removeEventListener) desktop.removeEventListener("change", onBreakpoint);
      else desktop.removeListener(onBreakpoint);
    };
  }, [open]);

  const onBlur = (event: FocusEvent<HTMLDivElement>) => {
    const next = event.relatedTarget as Node | null;
    if (next && !event.currentTarget.contains(next)) setOpen(false);
  };

  return (
    <div ref={rootRef} className="sm:hidden" onBlur={onBlur}>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="site-nav-resume inline-flex min-h-11 items-center gap-2 font-medium"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          {open ? (
            <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
          ) : (
            <path d="M2.5 5h11M2.5 11h11" />
          )}
        </svg>
        Menu
      </button>
      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-[color:var(--world-soft-line)] bg-[color:var(--world-bg)] shadow-[0_24px_48px_-24px_var(--world-shadow)]"
      >
        <ul className="mx-auto max-w-5xl divide-y divide-[color:var(--world-soft-line)] px-6 py-1">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="site-nav-link flex min-h-12 items-center text-base"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
