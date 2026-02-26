"use client";

import { useState } from "react";
import type { WhisperResponse } from "@/lib/types/api";
import StatusBadge from "@/components/StatusBadge";
import TimeDisplay from "@/components/TimeDisplay";
import StitchForm from "@/components/creator/StitchForm";

interface WhisperDetailProps {
  whisper: WhisperResponse;
  onStitchComplete: (whisperId: string) => void;
  onBack: () => void;
}

export default function WhisperDetail({
  whisper,
  onStitchComplete,
  onBack,
}: WhisperDetailProps) {
  const [showStitchForm, setShowStitchForm] = useState(false);

  const canStitch = whisper.status !== "STITCHED";

  return (
    <div style={{ padding: "var(--space-xl) var(--space-2xl)" }}>
      <button
        onClick={onBack}
        style={{
          background: "none",
          border: "none",
          color: "var(--color-text-muted)",
          fontSize: "var(--font-base)",
          cursor: "pointer",
          padding: 0,
          marginBottom: "var(--space-xl)",
        }}
      >
        ← Back to list
      </button>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-md)",
          marginBottom: "var(--space-xl)",
        }}
      >
        <StatusBadge status={whisper.status} />
        <TimeDisplay iso={whisper.createdAt} />
      </div>

      <div
        style={{
          padding: "var(--space-lg)",
          background: "var(--color-border-light)",
          borderRadius: "var(--radius-lg)",
          marginBottom: "var(--space-2xl)",
        }}
      >
        <p
          style={{
            fontSize: "var(--font-lg)",
            color: "var(--color-text)",
            lineHeight: "var(--line-relaxed)",
            margin: 0,
          }}
        >
          {whisper.message}
        </p>
      </div>

      {whisper.creatorReaction && (
        <div
          style={{
            padding: "var(--space-md) var(--space-lg)",
            background: "var(--color-warn-light)",
            border: "1px solid var(--color-warn-border)",
            borderRadius: "var(--radius-md)",
            marginBottom: "var(--space-md)",
            fontSize: "var(--font-base)",
            color: "var(--color-warn)",
          }}
        >
          Reaction: {whisper.creatorReaction}
        </div>
      )}

      {whisper.replyMessage && (
        <div
          style={{
            padding: "var(--space-md) var(--space-lg)",
            background: "var(--color-success-light)",
            border: "1px solid var(--color-success-border)",
            borderRadius: "var(--radius-md)",
            marginBottom: "var(--space-md)",
          }}
        >
          <div
            style={{
              fontSize: "var(--font-xs)",
              fontWeight: 600,
              color: "var(--color-success)",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginBottom: "var(--space-xs)",
            }}
          >
            Private Reply
          </div>
          <p
            style={{
              fontSize: "var(--font-md)",
              color: "var(--color-text)",
              margin: 0,
              lineHeight: "var(--line-normal)",
            }}
          >
            {whisper.replyMessage}
          </p>
          {whisper.repliedAt && (
            <div style={{ marginTop: "var(--space-sm)" }}>
              <TimeDisplay iso={whisper.repliedAt} />
            </div>
          )}
        </div>
      )}

      {whisper.status === "STITCHED" && (
        <div
          style={{
            padding: "var(--space-md) var(--space-lg)",
            background: "var(--color-primary-light)",
            border: "1px solid var(--color-primary-border)",
            borderRadius: "var(--radius-md)",
            marginBottom: "var(--space-md)",
            fontSize: "var(--font-base)",
            color: "var(--color-primary)",
          }}
        >
          This whisper has been stitched into a public answer.
        </div>
      )}

      {canStitch && !showStitchForm && (
        <div style={{ marginTop: "var(--space-2xl)" }}>
          <button
            onClick={() => setShowStitchForm(true)}
            style={{
              padding: "var(--space-sm) var(--space-xl)",
              background: "var(--color-primary)",
              color: "#fff",
              border: "none",
              borderRadius: "var(--radius-md)",
              fontSize: "var(--font-base)",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            ✂ Stitch into Public Answer
          </button>
        </div>
      )}

      {showStitchForm && (
        <div
          style={{
            marginTop: "var(--space-2xl)",
            padding: "var(--space-xl)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            background: "var(--color-surface)",
          }}
        >
          <StitchForm
            whisperId={whisper.id}
            originalMessage={whisper.message}
            onComplete={() => {
              setShowStitchForm(false);
              onStitchComplete(whisper.id);
            }}
            onCancel={() => setShowStitchForm(false)}
          />
        </div>
      )}
    </div>
  );
}

