import type { StitchResponse } from "@/lib/types/api";

interface StitchedItemProps {
  stitch: StitchResponse;
}

export default function StitchedItem({ stitch }: StitchedItemProps) {
  return (
    <div
      style={{
        padding: "20px",
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        marginBottom: 12,
      }}
    >
      <div
        style={{
          fontSize: "14px",
          color: "#6b7280",
          fontStyle: "italic",
          lineHeight: 1.5,
          marginBottom: 12,
          paddingLeft: 12,
          borderLeft: "3px solid #e5e7eb",
        }}
      >
        {stitch.publicPrompt}
      </div>
      <div
        style={{
          fontSize: "15px",
          color: "#1f2937",
          lineHeight: 1.6,
        }}
      >
        {stitch.publicResponse}
      </div>
      {stitch.publishedAt && (
        <div
          style={{
            marginTop: 10,
            fontSize: "12px",
            color: "#9ca3af",
          }}
        >
          {new Date(stitch.publishedAt).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      )}
    </div>
  );
}

