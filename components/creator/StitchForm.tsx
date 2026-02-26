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
          padding: "16px",
          background: "#f0fdf4",
          border: "1px solid #bbf7d0",
          borderRadius: "8px",
          color: "#166534",
          fontSize: "14px",
          textAlign: "center",
        }}
      >
        Stitch published successfully.
      </div>
    );
  }

  return (
    <div>
      <h3
        style={{
          fontSize: "15px",
          fontWeight: 700,
          color: "#1f2937",
          marginBottom: 12,
        }}
      >
        Create Stitch
      </h3>

      <p
        style={{
          fontSize: "12px",
          color: "#9ca3af",
          marginBottom: 16,
        }}
      >
        Rephrase the whisper into a public prompt. Fan identity is never shown.
      </p>

      {error && (
        <div
          style={{
            padding: "8px 12px",
            background: "#fef2f2",
            border: "1px solid #fecaca",
            borderRadius: "6px",
            color: "#991b1b",
            fontSize: "13px",
            marginBottom: 12,
          }}
        >
          {error}
        </div>
      )}

      <label
        style={{
          display: "block",
          fontSize: "13px",
          fontWeight: 600,
          color: "#374151",
          marginBottom: 4,
        }}
      >
        Public Prompt
      </label>
      <textarea
        value={publicPrompt}
        onChange={(e) => setPublicPrompt(e.target.value)}
        rows={3}
        style={{
          width: "100%",
          padding: "8px 10px",
          border: "1px solid #d1d5db",
          borderRadius: "6px",
          fontSize: "14px",
          lineHeight: 1.5,
          resize: "vertical",
          marginBottom: 12,
        }}
      />

      <label
        style={{
          display: "block",
          fontSize: "13px",
          fontWeight: 600,
          color: "#374151",
          marginBottom: 4,
        }}
      >
        Public Response
      </label>
      <textarea
        value={publicResponse}
        onChange={(e) => setPublicResponse(e.target.value)}
        rows={5}
        placeholder="Your public answer..."
        style={{
          width: "100%",
          padding: "8px 10px",
          border: "1px solid #d1d5db",
          borderRadius: "6px",
          fontSize: "14px",
          lineHeight: 1.5,
          resize: "vertical",
          marginBottom: 16,
        }}
      />

      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          style={{
            flex: 1,
            padding: "8px 16px",
            background: canSubmit ? "#7e22ce" : "#d1d5db",
            color: canSubmit ? "#fff" : "#9ca3af",
            border: "none",
            borderRadius: "6px",
            fontSize: "13px",
            fontWeight: 600,
            cursor: canSubmit ? "pointer" : "not-allowed",
          }}
        >
          {submitting ? "Publishing..." : "Publish Stitch"}
        </button>
        <button
          onClick={onCancel}
          disabled={submitting}
          style={{
            padding: "8px 16px",
            background: "#f3f4f6",
            color: "#374151",
            border: "none",
            borderRadius: "6px",
            fontSize: "13px",
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

