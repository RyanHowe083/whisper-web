import type { StitchResponse } from "@/lib/types/api";

interface StitchedItemProps {
  stitch: StitchResponse;
}

export default function StitchedItem({ stitch }: StitchedItemProps) {
  return (
    <article
      style={{
        padding: "var(--space-2xl)",
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
      }}
    >
      <div
        style={{
          fontSize: "var(--font-md)",
          color: "var(--color-text-muted)",
          fontStyle: "italic",
          lineHeight: "var(--line-normal)",
          marginBottom: "var(--space-lg)",
          paddingLeft: "var(--space-md)",
          borderLeft: "3px solid var(--color-border)",
        }}
      >
        {stitch.publicPrompt}
      </div>
      <div
        style={{
          fontSize: "var(--font-lg)",
          color: "var(--color-text)",
          lineHeight: "var(--line-relaxed)",
        }}
      >
        {stitch.publicResponse}
      </div>
      {stitch.publishedAt && (
        <div
          style={{
            marginTop: "var(--space-md)",
            fontSize: "var(--font-sm)",
            color: "var(--color-text-faint)",
          }}
        >
          {new Date(stitch.publishedAt).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      )}
    </article>
  );
}

