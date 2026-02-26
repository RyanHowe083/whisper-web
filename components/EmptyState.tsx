interface EmptyStateProps {
  message: string;
}

export default function EmptyState({ message }: EmptyStateProps) {
  return (
    <div
      style={{
        padding: "var(--space-4xl) var(--space-lg)",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontSize: "var(--font-md)",
          color: "var(--color-text-faint)",
          lineHeight: "var(--line-relaxed)",
        }}
      >
        {message}
      </p>
    </div>
  );
}

