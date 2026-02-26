import type { FanInboxItemResponse } from "@/lib/types/api";
import StatusBadge from "@/components/StatusBadge";
import TimeDisplay from "@/components/TimeDisplay";

interface FanInboxItemProps {
  item: FanInboxItemResponse;
}

export default function FanInboxItem({ item }: FanInboxItemProps) {
  const preview =
    item.message.length > 100
      ? item.message.slice(0, 100) + "…"
      : item.message;

  return (
    <div
      style={{
        padding: "var(--space-lg)",
        borderBottom: "1px solid var(--color-border-light)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "var(--space-sm)",
        }}
      >
        <StatusBadge status={item.status} />
        <TimeDisplay iso={item.createdAt} />
      </div>

      <p
        style={{
          fontSize: "var(--font-md)",
          color: "var(--color-text-secondary)",
          margin: 0,
          lineHeight: "var(--line-normal)",
          marginBottom: "var(--space-md)",
        }}
      >
        {preview}
      </p>

      {item.replyMessage && (
        <div
          style={{
            padding: "var(--space-md)",
            background: "var(--color-success-light)",
            border: "1px solid var(--color-success-border)",
            borderRadius: "var(--radius-md)",
            marginBottom: "var(--space-sm)",
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
            Creator Reply
          </div>
          <p
            style={{
              fontSize: "var(--font-base)",
              color: "var(--color-text)",
              margin: 0,
              lineHeight: "var(--line-normal)",
            }}
          >
            {item.replyMessage}
          </p>
        </div>
      )}

      {item.creatorReaction && (
        <div
          style={{
            fontSize: "var(--font-sm)",
            color: "var(--color-warn)",
            marginBottom: "var(--space-sm)",
          }}
        >
          ✦ Creator reacted: {item.creatorReaction}
        </div>
      )}

      {item.stitchId && (
        <a
          href={`/c/${encodeURIComponent(item.creatorId)}/stitched`}
          style={{
            display: "inline-block",
            fontSize: "var(--font-sm)",
            color: "var(--color-primary)",
            fontWeight: 600,
            textDecoration: "none",
            padding: "var(--space-xs) var(--space-md)",
            background: "var(--color-primary-light)",
            borderRadius: "var(--radius-sm)",
          }}
        >
          View Stitched Answer →
        </a>
      )}
    </div>
  );
}

