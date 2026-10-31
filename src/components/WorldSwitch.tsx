"use client";

import { useRef, type CSSProperties, type KeyboardEvent } from "react";
import { WORLD_IDS, WORLDS, type WorldId } from "@/lib/gridWorlds";

interface WorldSwitchProps {
  value: WorldId;
  onChange: (world: WorldId) => void;
  className?: string;
}

export default function WorldSwitch({
  value,
  onChange,
  className = "",
}: WorldSwitchProps) {
  const dotRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function select(next: WorldId) {
    onChange(next);
    const index = WORLD_IDS.indexOf(next);
    dotRefs.current[index]?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const current = WORLD_IDS.indexOf(value);
    let nextIndex = current;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (current + 1) % WORLD_IDS.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (current - 1 + WORLD_IDS.length) % WORLD_IDS.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = WORLD_IDS.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    select(WORLD_IDS[nextIndex]);
  }

  return (
    <div className={`world-switch ${className}`.trim()}>
      <div
        role="radiogroup"
        aria-label="Grid world"
        className="world-switch-dots"
        onKeyDown={handleKeyDown}
      >
        {WORLD_IDS.map((id, index) => (
          <button
            key={id}
            ref={(node) => {
              dotRefs.current[index] = node;
            }}
            type="button"
            role="radio"
            aria-checked={value === id}
            aria-label={WORLDS[id].name}
            tabIndex={value === id ? 0 : -1}
            data-world={id}
            className="world-switch-dot"
            style={{ "--dot": WORLDS[id].palette.thumbBg } as CSSProperties}
            onClick={() => onChange(id)}
          >
            <span aria-hidden="true" className="world-switch-dot-core" />
          </button>
        ))}
      </div>
      <span role="status" aria-atomic="true" className="sr-only">
        {WORLDS[value].name}
      </span>
    </div>
  );
}
