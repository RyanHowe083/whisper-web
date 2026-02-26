interface StatusBadgeProps {
  status: string;
}

const STATUS_STYLES: Record<string, { background: string; color: string }> = {
  CREATED: { background: "var(--color-info-light)", color: "var(--color-info)" },
  REPLIED: { background: "var(--color-success-light)", color: "var(--color-success)" },
  STITCHED: { background: "var(--color-primary-light)", color: "var(--color-primary)" },
  EXPIRED: { background: "var(--color-border-light)", color: "var(--color-text-muted)" },
};

const FALLBACK_STYLE = { background: "var(--color-border-light)", color: "var(--color-text-muted)" };

export default function StatusBadge({ status }: StatusBadgeProps) {
  const resolved = STATUS_STYLES[status] ?? FALLBACK_STYLE;

  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px var(--space-sm)",
        borderRadius: "var(--radius-pill)",
        fontSize: "var(--font-xs)",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.5px",
        lineHeight: "var(--line-tight)",
        background: resolved.background,
        color: resolved.color,
      }}
    >
      {status}
    </span>
  );
}

