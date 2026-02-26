"use client";

interface ErrorBannerProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorBanner({ message, onRetry }: ErrorBannerProps) {
  return (
    <div
      style={{
        padding: "var(--space-md) var(--space-lg)",
        background: "var(--color-error-light)",
        border: "1px solid var(--color-error-border)",
        borderRadius: "var(--radius-lg)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "var(--space-md)",
      }}
    >
      <span
        style={{
          fontSize: "var(--font-md)",
          color: "var(--color-error)",
          lineHeight: "var(--line-normal)",
        }}
      >
        {message}
      </span>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            background: "transparent",
            color: "var(--color-error)",
            border: "1px solid var(--color-error-border)",
            borderRadius: "var(--radius-md)",
            padding: "var(--space-xs) var(--space-md)",
            cursor: "pointer",
            fontSize: "var(--font-base)",
            fontWeight: 500,
            whiteSpace: "nowrap",
          }}
        >
          Retry
        </button>
      )}
    </div>
  );
}

