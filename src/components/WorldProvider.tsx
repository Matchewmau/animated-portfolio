"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DEFAULT_WORLD, type WorldId } from "@/lib/gridWorlds";
import {
  applyWorld,
  parseStoredWorld,
  readStoredWorld,
  writeStoredWorld,
} from "@/lib/worldStorage";

interface WorldContextValue {
  world: WorldId;
  ready: boolean;
  setWorld: (world: WorldId) => void;
}

const WorldContext = createContext<WorldContextValue | null>(null);

export function WorldProvider({ children }: { children: ReactNode }) {
  const [world, setWorldId] = useState<WorldId>(DEFAULT_WORLD);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const attribute = document.documentElement.getAttribute("data-world");
    const initial = attribute
      ? parseStoredWorld(attribute)
      : readStoredWorld();
    applyWorld(initial);
    setWorldId(initial);
    setReady(true);
  }, []);

  const setWorld = useCallback((next: WorldId) => {
    setWorldId(next);
    applyWorld(next);
    writeStoredWorld(next);
  }, []);

  const value = useMemo(
    () => ({ world, ready, setWorld }),
    [world, ready, setWorld]
  );

  return (
    <WorldContext.Provider value={value}>{children}</WorldContext.Provider>
  );
}

export function useWorld(): WorldContextValue {
  const value = useContext(WorldContext);
  if (!value) {
    throw new Error("useWorld must be used within WorldProvider");
  }
  return value;
}
