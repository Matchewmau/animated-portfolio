import { DEFAULT_WORLD, WORLD_IDS, type WorldId } from "./gridWorlds";

export const WORLD_STORAGE_KEY = "tron-world";

export function isWorldId(value: unknown): value is WorldId {
  return (
    typeof value === "string" &&
    (WORLD_IDS as readonly string[]).includes(value)
  );
}

export function parseStoredWorld(value: string | null): WorldId {
  return isWorldId(value) ? value : DEFAULT_WORLD;
}

export function readStoredWorld(): WorldId {
  try {
    const raw = window.sessionStorage.getItem(WORLD_STORAGE_KEY);
    if (raw !== null && !isWorldId(raw)) {
      window.sessionStorage.removeItem(WORLD_STORAGE_KEY);
    }
    return parseStoredWorld(raw);
  } catch {
    return DEFAULT_WORLD;
  }
}

export function writeStoredWorld(world: WorldId): void {
  try {
    window.sessionStorage.setItem(WORLD_STORAGE_KEY, world);
  } catch {
    // Storage can be blocked; the in-memory world still works.
  }
}

export function applyWorld(
  world: WorldId,
  root: HTMLElement = document.documentElement
): void {
  root.setAttribute("data-world", world);
}

export function getWorldBootScript(): string {
  return `(function(){try{var k=${JSON.stringify(
    WORLD_STORAGE_KEY
  )},w=sessionStorage.getItem(k);if(${JSON.stringify(
    WORLD_IDS
  )}.indexOf(w)!==-1){document.documentElement.setAttribute("data-world",w)}else if(w!==null){sessionStorage.removeItem(k)}}catch(e){}})();`;
}
