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

function getIdentitySnapshot(): DevIdentity {
  return getDevIdentity();
}

function getServerIdentitySnapshot(): DevIdentity {
  return { userId: null, creatorId: null };
}

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

  return (
    <div
      style={{
        position: "fixed",
        top: 8,
        right: 8,
        zIndex: 10000,
      }}
    >
      <button
        onClick={() => setVisible(!visible)}
        style={{
          background: "#fbbf24",
          border: "2px solid #d97706",
          borderRadius: "6px",
          padding: "4px 10px",
          fontSize: "11px",
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
            marginTop: 4,
            background: "#fffbeb",
            border: "2px solid #d97706",
            borderRadius: "8px",
            padding: "12px",
            width: 280,
            fontSize: "13px",
          }}
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: "11px",
              color: "#92400e",
              marginBottom: 8,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            ⚠ Dev Only — Identity Headers
          </div>
          <label style={{ display: "block", marginBottom: 4, fontWeight: 600 }}>
            X-User-Id
          </label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="UUID"
            style={{
              width: "100%",
              padding: "6px 8px",
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              fontSize: "13px",
              marginBottom: 8,
            }}
          />
          <label style={{ display: "block", marginBottom: 4, fontWeight: 600 }}>
            X-Creator-Id
          </label>
          <input
            type="text"
            value={creatorId}
            onChange={(e) => setCreatorId(e.target.value)}
            placeholder="UUID"
            style={{
              width: "100%",
              padding: "6px 8px",
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              fontSize: "13px",
              marginBottom: 10,
            }}
          />
          <div style={{ display: "flex", gap: 6 }}>
            <button
              onClick={handleApply}
              style={{
                flex: 1,
                background: "#d97706",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                padding: "6px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "12px",
              }}
            >
              Apply
            </button>
            <button
              onClick={handleClear}
              style={{
                flex: 1,
                background: "#e5e7eb",
                color: "#374151",
                border: "none",
                borderRadius: "4px",
                padding: "6px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "12px",
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
