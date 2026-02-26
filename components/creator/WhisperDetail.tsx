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
    <div style={{ padding: "20px 24px" }}>
      <button
        onClick={onBack}
        style={{
          background: "none",
          border: "none",
          color: "#6b7280",
          fontSize: "13px",
          cursor: "pointer",
          padding: 0,
          marginBottom: 16,
        }}
      >
        ← Back to list
      </button>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 16,
        }}
      >
        <StatusBadge status={whisper.status} />
        <TimeDisplay iso={whisper.createdAt} />
      </div>

      <div
        style={{
          padding: "16px",
          background: "#f9fafb",
          borderRadius: "8px",
          marginBottom: 20,
        }}
      >
        <p
          style={{
            fontSize: "15px",
            color: "#1f2937",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {whisper.message}
        </p>
      </div>

      {whisper.creatorReaction && (
        <div
          style={{
            padding: "10px 14px",
            background: "#fffbeb",
            border: "1px solid #fde68a",
            borderRadius: "6px",
            marginBottom: 12,
            fontSize: "13px",
            color: "#92400e",
          }}
        >
          Reaction: {whisper.creatorReaction}
        </div>
      )}

      {whisper.replyMessage && (
        <div
          style={{
            padding: "12px 14px",
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            borderRadius: "6px",
            marginBottom: 12,
          }}
        >
          <div
            style={{
              fontSize: "11px",
              fontWeight: 600,
              color: "#15803d",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginBottom: 4,
            }}
          >
            Private Reply
          </div>
          <p
            style={{
              fontSize: "14px",
              color: "#1f2937",
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            {whisper.replyMessage}
          </p>
          {whisper.repliedAt && (
            <div style={{ marginTop: 6 }}>
              <TimeDisplay iso={whisper.repliedAt} />
            </div>
          )}
        </div>
      )}

      {whisper.status === "STITCHED" && (
        <div
          style={{
            padding: "10px 14px",
            background: "#faf5ff",
            border: "1px solid #e9d5ff",
            borderRadius: "6px",
            marginBottom: 12,
            fontSize: "13px",
            color: "#7e22ce",
          }}
        >
          This whisper has been stitched into a public answer.
        </div>
      )}

      {canStitch && !showStitchForm && (
        <div style={{ marginTop: 20 }}>
          <button
            onClick={() => setShowStitchForm(true)}
            style={{
              padding: "8px 20px",
              background: "#7e22ce",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontSize: "13px",
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
            marginTop: 20,
            padding: "16px",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            background: "#fff",
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

