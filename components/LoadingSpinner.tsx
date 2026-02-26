export default function LoadingSpinner() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "var(--space-4xl)",
        color: "var(--color-text-muted)",
        fontSize: "var(--font-md)",
      }}
    >
      Loading…
    </div>
  );
}

