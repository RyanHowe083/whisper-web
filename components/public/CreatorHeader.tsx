import type { CreatorProfileResponse } from "@/lib/types/api";

interface CreatorHeaderProps {
  creator: CreatorProfileResponse;
}

export default function CreatorHeader({ creator }: CreatorHeaderProps) {
  return (
    <div style={{ marginBottom: "var(--space-2xl)" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-md)",
          marginBottom: "var(--space-sm)",
        }}
      >
        <h1
          style={{
            fontSize: "var(--font-2xl)",
            fontWeight: 700,
            color: "var(--color-text)",
            margin: 0,
          }}
        >
          {creator.displayName}
        </h1>
        {creator.verified && (
          <span
            style={{
              fontSize: "var(--font-xs)",
              fontWeight: 600,
              color: "var(--color-info)",
              background: "var(--color-info-light)",
              padding: "2px var(--space-sm)",
              borderRadius: "var(--radius-pill)",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Verified
          </span>
        )}
      </div>
      {creator.bio && (
        <p
          style={{
            fontSize: "var(--font-md)",
            color: "var(--color-text-muted)",
            lineHeight: "var(--line-relaxed)",
            margin: 0,
          }}
        >
          {creator.bio}
        </p>
      )}
      {!creator.whispersEnabled && (
        <div
          style={{
            marginTop: "var(--space-lg)",
            padding: "var(--space-md) var(--space-lg)",
            background: "var(--color-warn-light)",
            border: "1px solid var(--color-warn-border)",
            borderRadius: "var(--radius-md)",
            fontSize: "var(--font-base)",
            color: "var(--color-warn)",
          }}
        >
          This creator is not accepting whispers right now.
        </div>
      )}
    </div>
  );
}

