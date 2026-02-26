"use client";

import { useState } from "react";
import { apiClient, ApiError } from "@/lib/api/client";
import { getDevIdentity } from "@/lib/identity/dev-identity";
import type { WhisperResponse, WhisperCreateRequest } from "@/lib/types/api";

interface WhisperComposerProps {
  creatorId: string;
  postId: string;
}

export default function WhisperComposer({
  creatorId,
  postId,
}: WhisperComposerProps) {
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const needsIdentity =
    process.env.NODE_ENV === "development" && !getDevIdentity().userId;

  const canSubmit = message.trim().length > 0 && !submitting && !sent;

  const handleSubmit = async () => {
    if (!canSubmit) return;

    setSubmitting(true);
    setError(null);
    try {
      const body: WhisperCreateRequest = {
        postId,
        message: message.trim(),
      };
      await apiClient.post<WhisperResponse>(
        `/api/creators/${encodeURIComponent(creatorId)}/whispers`,
        body
      );
      setSent(true);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Failed to send whisper.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div
        style={{
          padding: "var(--space-xl)",
          background: "var(--color-success-light)",
          border: "1px solid var(--color-success-border)",
          borderRadius: "var(--radius-lg)",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "var(--font-md)",
            color: "var(--color-success)",
            fontWeight: 600,
            margin: 0,
            marginBottom: "var(--space-sm)",
          }}
        >
          Whisper sent.
        </p>
        <a
          href="/inbox"
          style={{
            fontSize: "var(--font-base)",
            color: "var(--color-primary)",
            fontWeight: 500,
          }}
        >
          View your inbox →
        </a>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "var(--space-xl)",
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
      }}
    >
      <h3
        style={{
          fontSize: "var(--font-lg)",
          fontWeight: 700,
          color: "var(--color-text)",
          margin: 0,
          marginBottom: "var(--space-sm)",
        }}
      >
        Send a Whisper
      </h3>
      <p
        style={{
          fontSize: "var(--font-sm)",
          color: "var(--color-text-faint)",
          margin: 0,
          marginBottom: "var(--space-xl)",
          lineHeight: "var(--line-normal)",
        }}
      >
        Only the creator will see this. Your identity is hidden.
      </p>

      {needsIdentity && (
        <div
          style={{
            padding: "var(--space-md) var(--space-lg)",
            background: "var(--color-warn-light)",
            border: "1px solid var(--color-warn-border)",
            borderRadius: "var(--radius-md)",
            fontSize: "var(--font-base)",
            color: "var(--color-warn)",
            marginBottom: "var(--space-lg)",
          }}
        >
          Set an X-User-Id via the 🔧 Dev ID panel before sending.
        </div>
      )}

      {error && (
        <div
          style={{
            padding: "var(--space-sm) var(--space-md)",
            background: "var(--color-error-light)",
            border: "1px solid var(--color-error-border)",
            borderRadius: "var(--radius-md)",
            color: "var(--color-error)",
            fontSize: "var(--font-base)",
            marginBottom: "var(--space-md)",
          }}
        >
          {error}
        </div>
      )}

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={4}
        placeholder="Write your whisper..."
        style={{
          width: "100%",
          padding: "var(--space-sm) var(--space-md)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-md)",
          fontSize: "var(--font-md)",
          lineHeight: "var(--line-normal)",
          resize: "vertical",
          marginBottom: "var(--space-lg)",
        }}
      />

      <button
        onClick={handleSubmit}
        disabled={!canSubmit}
        style={{
          width: "100%",
          padding: "var(--space-sm) var(--space-lg)",
          background: canSubmit ? "var(--color-primary)" : "var(--color-border)",
          color: canSubmit ? "#fff" : "var(--color-text-faint)",
          border: "none",
          borderRadius: "var(--radius-md)",
          fontSize: "var(--font-md)",
          fontWeight: 600,
          cursor: canSubmit ? "pointer" : "not-allowed",
        }}
      >
        {submitting ? "Sending…" : "Send Whisper"}
      </button>
    </div>
  );
}

