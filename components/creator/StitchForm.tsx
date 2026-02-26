"use client";

import { useState } from "react";
import { apiClient, ApiError } from "@/lib/api/client";
import type { StitchResponse } from "@/lib/types/api";

interface StitchFormProps {
  whisperId: string;
  originalMessage: string;
  onComplete: () => void;
  onCancel: () => void;
}

export default function StitchForm({
  whisperId,
  originalMessage,
  onComplete,
  onCancel,
}: StitchFormProps) {
  const [publicPrompt, setPublicPrompt] = useState(originalMessage);
  const [publicResponse, setPublicResponse] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const canSubmit =
    publicPrompt.trim().length > 0 &&
    publicResponse.trim().length > 0 &&
    !submitting &&
    !success;

  const handleSubmit = async () => {
    if (!canSubmit) return;

    setSubmitting(true);
    setError(null);
    try {
      await apiClient.post<StitchResponse>(
        `/api/creator/whispers/${encodeURIComponent(whisperId)}/stitch`,
        {
          publicPrompt: publicPrompt.trim(),
          publicResponse: publicResponse.trim(),
        }
      );
      setSuccess(true);
      onComplete();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Failed to create stitch.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div
        style={{
          padding: "var(--space-lg)",
          background: "var(--color-success-light)",
          border: "1px solid var(--color-success-border)",
          borderRadius: "var(--radius-lg)",
          color: "var(--color-success)",
          fontSize: "var(--font-md)",
          textAlign: "center",
        }}
      >
        Stitch published successfully.
      </div>
    );
  }

  const fieldLabelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "var(--font-base)",
    fontWeight: 600,
    color: "var(--color-text-secondary)",
    marginBottom: "var(--space-xs)",
  };

  const textareaStyle: React.CSSProperties = {
    width: "100%",
    padding: "var(--space-sm) var(--space-md)",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius-md)",
    fontSize: "var(--font-md)",
    lineHeight: "var(--line-normal)",
    resize: "vertical",
  };

  return (
    <div>
      <h3
        style={{
          fontSize: "var(--font-lg)",
          fontWeight: 700,
          color: "var(--color-text)",
          marginBottom: "var(--space-sm)",
        }}
      >
        Create Stitch
      </h3>

      <p
        style={{
          fontSize: "var(--font-sm)",
          color: "var(--color-text-faint)",
          marginBottom: "var(--space-xl)",
          lineHeight: "var(--line-normal)",
        }}
      >
        Rephrase the whisper into a public prompt. Fan identity is never shown.
      </p>

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

      <div style={{ marginBottom: "var(--space-lg)" }}>
        <label style={fieldLabelStyle}>Public Prompt</label>
        <textarea
          value={publicPrompt}
          onChange={(e) => setPublicPrompt(e.target.value)}
          rows={3}
          style={textareaStyle}
        />
      </div>

      <div style={{ marginBottom: "var(--space-xl)" }}>
        <label style={fieldLabelStyle}>Public Response</label>
        <textarea
          value={publicResponse}
          onChange={(e) => setPublicResponse(e.target.value)}
          rows={5}
          placeholder="Your public answer..."
          style={textareaStyle}
        />
      </div>

      <div style={{ display: "flex", gap: "var(--space-sm)" }}>
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          style={{
            flex: 1,
            padding: "var(--space-sm) var(--space-lg)",
            background: canSubmit ? "var(--color-primary)" : "var(--color-border)",
            color: canSubmit ? "#fff" : "var(--color-text-faint)",
            border: "none",
            borderRadius: "var(--radius-md)",
            fontSize: "var(--font-base)",
            fontWeight: 600,
            cursor: canSubmit ? "pointer" : "not-allowed",
          }}
        >
          {submitting ? "Publishing…" : "Publish Stitch"}
        </button>
        <button
          onClick={onCancel}
          disabled={submitting}
          style={{
            padding: "var(--space-sm) var(--space-lg)",
            background: "var(--color-border-light)",
            color: "var(--color-text-secondary)",
            border: "none",
            borderRadius: "var(--radius-md)",
            fontSize: "var(--font-base)",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

