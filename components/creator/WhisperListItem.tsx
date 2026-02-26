"use client";

import type { WhisperResponse } from "@/lib/types/api";
import StatusBadge from "@/components/StatusBadge";
import TimeDisplay from "@/components/TimeDisplay";

interface WhisperListItemProps {
  whisper: WhisperResponse;
  selected: boolean;
  onSelect: (whisper: WhisperResponse) => void;
}

export default function WhisperListItem({
  whisper,
  selected,
  onSelect,
}: WhisperListItemProps) {
  const preview =
    whisper.message.length > 80
      ? whisper.message.slice(0, 80) + "…"
      : whisper.message;

  return (
    <button
      onClick={() => onSelect(whisper)}
      style={{
        display: "block",
        width: "100%",
        textAlign: "left",
        padding: "var(--space-md) var(--space-lg)",
        border: "none",
        borderBottom: "1px solid var(--color-border-light)",
        background: selected ? "var(--color-info-light)" : "var(--color-surface)",
        cursor: "pointer",
        transition: "background 0.15s",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "var(--space-xs)",
        }}
      >
        <StatusBadge status={whisper.status} />
        <TimeDisplay iso={whisper.createdAt} />
      </div>
      <p
        style={{
          fontSize: "var(--font-md)",
          color: "var(--color-text-secondary)",
          margin: 0,
          lineHeight: "var(--line-normal)",
        }}
      >
        {preview}
      </p>
      <div
        style={{
          display: "flex",
          gap: "var(--space-sm)",
          marginTop: "var(--space-sm)",
          fontSize: "var(--font-xs)",
          color: "var(--color-text-faint)",
        }}
      >
        {whisper.creatorReaction && <span>✦ Reacted</span>}
        {whisper.replyMessage && <span>↩ Replied</span>}
        {whisper.status === "STITCHED" && <span>✂ Stitched</span>}
      </div>
    </button>
  );
}

