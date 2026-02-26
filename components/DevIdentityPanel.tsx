"use client";

import { useState, useSyncExternalStore } from "react";
import {
  getDevIdentity,
  setDevUserId,
  setDevCreatorId,
  clearDevIdentity,
} from "@/lib/identity/dev-identity";
import type { DevIdentity } from "@/lib/identity/dev-identity";

function subscribeStorage(callback: () => void): () => void {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

let cachedIdentity: DevIdentity = { userId: null, creatorId: null };

function getIdentitySnapshot(): DevIdentity {
  const next = getDevIdentity();
  if (
    next.userId !== cachedIdentity.userId ||
    next.creatorId !== cachedIdentity.creatorId
  ) {
    cachedIdentity = next;
  }
  return cachedIdentity;
}

function getServerIdentitySnapshot(): DevIdentity {
  return cachedIdentity;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "var(--space-sm)",
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius-sm)",
  fontSize: "var(--font-base)",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "var(--space-xs)",
  fontWeight: 600,
  fontSize: "var(--font-sm)",
  color: "var(--color-warn)",
};

export default function DevIdentityPanel() {
  const identity = useSyncExternalStore(
    subscribeStorage,
    getIdentitySnapshot,
    getServerIdentitySnapshot
  );
  const [visible, setVisible] = useState(false);
  const [userId, setUserId] = useState(identity.userId ?? "");
  const [creatorId, setCreatorId] = useState(identity.creatorId ?? "");

  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  const handleApply = () => {
    if (userId.trim()) {
      setDevUserId(userId.trim());
    }
    if (creatorId.trim()) {
      setDevCreatorId(creatorId.trim());
    }
    window.dispatchEvent(new Event("storage"));
  };

  const handleClear = () => {
    clearDevIdentity();
    setUserId("");
    setCreatorId("");
    window.dispatchEvent(new Event("storage"));
  };

  const panelButtonStyle: React.CSSProperties = {
    flex: 1,
    border: "none",
    borderRadius: "var(--radius-sm)",
    padding: "var(--space-sm)",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "var(--font-sm)",
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "var(--space-sm)",
        right: "var(--space-sm)",
        zIndex: 10000,
      }}
    >
      <button
        onClick={() => setVisible(!visible)}
        style={{
          background: "#fbbf24",
          border: "2px solid #d97706",
          borderRadius: "var(--radius-md)",
          padding: "var(--space-xs) var(--space-md)",
          fontSize: "var(--font-xs)",
          fontWeight: 700,
          cursor: "pointer",
          textTransform: "uppercase",
        }}
      >
        🔧 Dev ID
      </button>
      {visible && (
        <div
          style={{
            marginTop: "var(--space-xs)",
            background: "var(--color-warn-light)",
            border: "2px solid #d97706",
            borderRadius: "var(--radius-lg)",
            padding: "var(--space-lg)",
            width: 280,
          }}
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: "var(--font-xs)",
              color: "var(--color-warn)",
              marginBottom: "var(--space-md)",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            ⚠ Dev Only — Identity Headers
          </div>
          <div style={{ marginBottom: "var(--space-md)" }}>
            <label style={labelStyle}>X-User-Id</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="UUID"
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: "var(--space-lg)" }}>
            <label style={labelStyle}>X-Creator-Id</label>
            <input
              type="text"
              value={creatorId}
              onChange={(e) => setCreatorId(e.target.value)}
              placeholder="UUID"
              style={inputStyle}
            />
          </div>
          <div style={{ display: "flex", gap: "var(--space-sm)" }}>
            <button
              onClick={handleApply}
              style={{
                ...panelButtonStyle,
                background: "#d97706",
                color: "#fff",
              }}
            >
              Apply
            </button>
            <button
              onClick={handleClear}
              style={{
                ...panelButtonStyle,
                background: "var(--color-border-light)",
                color: "var(--color-text-secondary)",
              }}
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

