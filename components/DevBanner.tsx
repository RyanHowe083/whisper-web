"use client";

import { useSyncExternalStore, useCallback } from "react";
import { getDevIdentity, clearDevIdentity } from "@/lib/identity/dev-identity";
import type { DevIdentity } from "@/lib/identity/dev-identity";

function subscribe(callback: () => void): () => void {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

let cachedSnapshot: DevIdentity = { userId: null, creatorId: null };

function getSnapshot(): DevIdentity {
  const next = getDevIdentity();
  if (
    next.userId !== cachedSnapshot.userId ||
    next.creatorId !== cachedSnapshot.creatorId
  ) {
    cachedSnapshot = next;
  }
  return cachedSnapshot;
}

function getServerSnapshot(): DevIdentity {
  return cachedSnapshot;
}

export default function DevBanner() {
  const identity = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const handleClear = useCallback(() => {
    clearDevIdentity();
    window.dispatchEvent(new Event("storage"));
  }, []);

  if (process.env.NODE_ENV !== "development") return null;
  if (!identity.userId && !identity.creatorId) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "var(--color-warn-light)",
        borderTop: "2px solid #f59e0b",
        padding: "var(--space-sm) var(--space-lg)",
        fontSize: "var(--font-base)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <span style={{ color: "var(--color-warn)" }}>
        Dev Identity →
        {identity.userId && ` User: ${identity.userId}`}
        {identity.creatorId && ` Creator: ${identity.creatorId}`}
      </span>
      <button
        onClick={handleClear}
        style={{
          background: "transparent",
          border: "1px solid var(--color-warn-border)",
          borderRadius: "var(--radius-sm)",
          padding: "var(--space-xs) var(--space-md)",
          cursor: "pointer",
          fontWeight: 600,
          fontSize: "var(--font-sm)",
          color: "var(--color-warn)",
        }}
      >
        Clear
      </button>
    </div>
  );
}

