interface StatusBadgeProps {
  status: string;
}

const STATUS_STYLES: Record<string, { background: string; color: string }> = {
  CREATED: { background: "#eff6ff", color: "#1d4ed8" },
  REPLIED: { background: "#f0fdf4", color: "#15803d" },
  STITCHED: { background: "#faf5ff", color: "#7e22ce" },
  EXPIRED: { background: "#f3f4f6", color: "#6b7280" },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES.EXPIRED;

  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 8px",
        borderRadius: "12px",
        fontSize: "11px",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.5px",
        background: style.background,
        color: style.color,
      }}
    >
      {status}
    </span>
  );
}
