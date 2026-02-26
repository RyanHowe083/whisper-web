"use client";

import { useEffect, useState, useCallback } from "react";
import type { FanInboxItemResponse } from "@/lib/types/api";
import { apiClient, ApiError } from "@/lib/api/client";
import FanInboxItem from "@/components/fan/FanInboxItem";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorBanner from "@/components/ErrorBanner";
import EmptyState from "@/components/EmptyState";

export default function FanInboxPage() {
  const [items, setItems] = useState<FanInboxItemResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInbox = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiClient.get<FanInboxItemResponse[]>("/api/fan/inbox");
      setItems(data);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Failed to load inbox.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInbox();
  }, [fetchInbox]);

  if (loading) return <LoadingSpinner />;

  return (
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      <h1
        style={{
          fontSize: "var(--font-2xl)",
          fontWeight: 700,
          color: "var(--color-text)",
          marginBottom: "var(--space-xl)",
        }}
      >
        Your Inbox
      </h1>

      {error && (
        <div style={{ marginBottom: "var(--space-lg)" }}>
          <ErrorBanner message={error} onRetry={fetchInbox} />
        </div>
      )}

      {items.length === 0 && !error && (
        <EmptyState message="No updates yet. Whispers you send will appear here with their status." />
      )}

      {items.length > 0 && (
        <div
          style={{
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            background: "var(--color-surface)",
          }}
        >
          {items.map((item) => (
            <FanInboxItem key={item.whisperId} item={item} />
          ))}
        </div>
      )}

      <p
        style={{
          marginTop: "var(--space-3xl)",
          fontSize: "var(--font-sm)",
          color: "var(--color-text-faint)",
          textAlign: "center",
        }}
      >
        Whispers are private. Only the creator sees them.
      </p>
    </div>
  );
}

