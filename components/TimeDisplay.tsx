interface TimeDisplayProps {
  iso: string;
}

export default function TimeDisplay({ iso }: TimeDisplayProps) {
  const date = new Date(iso);
  const formatted = date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <time
      dateTime={iso}
      style={{
        fontSize: "var(--font-sm)",
        color: "var(--color-text-faint)",
      }}
    >
      {formatted}
    </time>
  );
}

