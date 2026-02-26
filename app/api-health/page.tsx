"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api/client";

export default function ApiHealthPage() {
  const [status, setStatus] = useState<string>("loading");

  useEffect(() => {
    apiClient
      .get<{ status: string }>("/health")
      .then((data) => setStatus(data.status))
      .catch(() => setStatus("error"));
  }, []);

  const isUp = status === "UP";
  const isError = status === "error";

  return (
    <div style={{ maxWidth: 480, margin: "0 auto" }}>
      <h1
        style={{
          fontSize: "var(--font-2xl)",
          fontWeight: 700,
          color: "var(--color-text)",
          marginBottom: "var(--space-xl)",
        }}
      >
        API Health
      </h1>
      <div
        style={{
          padding: "var(--space-lg)",
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-lg)",
          display: "flex",
          alignItems: "center",
          gap: "var(--space-md)",
        }}
      >
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: isError
              ? "var(--color-error)"
              : isUp
                ? "var(--color-success)"
                : "var(--color-text-faint)",
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontSize: "var(--font-md)",
            color: "var(--color-text-secondary)",
          }}
        >
          Status: {status}
        </span>
      </div>
    </div>
  );
}

