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
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeIndex = WORLD_IDS.indexOf(value);

  function select(next: WorldId) {
    onChange(next);
    const index = WORLD_IDS.indexOf(next);
    tabRefs.current[index]?.focus();
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
      <span id="world-switch-label" className="world-switch-label">
        World
      </span>
      <div
        role="radiogroup"
        aria-labelledby="world-switch-label"
        className="world-switch-tabs"
        onKeyDown={handleKeyDown}
      >
        <span
          className="world-switch-thumb"
          data-testid="world-switch-thumb"
          style={{ "--i": activeIndex } as CSSProperties}
          aria-hidden="true"
        />
        {WORLD_IDS.map((id, index) => (
          <button
            key={id}
            ref={(node) => {
              tabRefs.current[index] = node;
            }}
            type="button"
            role="radio"
            aria-checked={value === id}
            tabIndex={value === id ? 0 : -1}
            data-world={id}
            className="world-switch-tab"
            onClick={() => onChange(id)}
          >
            {WORLDS[id].label}
          </button>
        ))}
      </div>
    </div>
  );
}
