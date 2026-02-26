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
        padding: "12px 16px",
        border: "none",
        borderBottom: "1px solid #f3f4f6",
        background: selected ? "#f0f9ff" : "#fff",
        cursor: "pointer",
        transition: "background 0.15s",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 4,
        }}
      >
        <StatusBadge status={whisper.status} />
        <TimeDisplay iso={whisper.createdAt} />
      </div>
      <p
        style={{
          fontSize: "14px",
          color: "#374151",
          margin: 0,
          lineHeight: 1.4,
        }}
      >
        {preview}
      </p>
      <div
        style={{
          display: "flex",
          gap: 8,
          marginTop: 6,
          fontSize: "11px",
          color: "#9ca3af",
        }}
      >
        {whisper.creatorReaction && <span>✦ Reacted</span>}
        {whisper.replyMessage && <span>↩ Replied</span>}
        {whisper.status === "STITCHED" && <span>✂ Stitched</span>}
      </div>
    </button>
  );
}
