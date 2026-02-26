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
        padding: "14px 16px",
        borderBottom: "1px solid #f3f4f6",
        background: "#fff",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 6,
        }}
      >
        <StatusBadge status={item.status} />
        <TimeDisplay iso={item.createdAt} />
      </div>

      <p
        style={{
          fontSize: "14px",
          color: "#374151",
          margin: 0,
          lineHeight: 1.5,
          marginBottom: 8,
        }}
      >
        {preview}
      </p>

      {item.replyMessage && (
        <div
          style={{
            padding: "10px 12px",
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            borderRadius: "6px",
            marginBottom: 8,
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
            Creator Reply
          </div>
          <p
            style={{
              fontSize: "13px",
              color: "#1f2937",
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            {item.replyMessage}
          </p>
        </div>
      )}

      {item.creatorReaction && (
        <div
          style={{
            fontSize: "12px",
            color: "#92400e",
            marginBottom: 6,
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
            fontSize: "12px",
            color: "#7e22ce",
            fontWeight: 600,
            textDecoration: "none",
            padding: "4px 10px",
            background: "#faf5ff",
            borderRadius: "4px",
          }}
        >
          View Stitched Answer →
        </a>
      )}
    </div>
  );
}

