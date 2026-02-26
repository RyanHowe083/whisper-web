"use client";

import { useEffect, useState, useCallback } from "react";
import type { FanInboxItemResponse } from "@/lib/types/api";
import { apiClient, ApiError } from "@/lib/api/client";
import FanInboxItem from "@/components/fan/FanInboxItem";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorBanner from "@/components/ErrorBanner";

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
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "24px 16px" }}>
      <h1
        style={{
          fontSize: "22px",
          fontWeight: 700,
          color: "#1f2937",
          marginBottom: 20,
        }}
      >
        Your Inbox
      </h1>

      {error && (
        <div style={{ marginBottom: 16 }}>
          <ErrorBanner message={error} onRetry={fetchInbox} />
        </div>
      )}

      {items.length === 0 && !error && (
        <p style={{ color: "#9ca3af", fontSize: "14px" }}>
          No updates yet. Whispers you send will appear here with their status.
        </p>
      )}

      <div
        style={{
          border: items.length > 0 ? "1px solid #e5e7eb" : "none",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        {items.map((item) => (
          <FanInboxItem key={item.whisperId} item={item} />
        ))}
      </div>

      <div
        style={{
          marginTop: 24,
          fontSize: "12px",
          color: "#9ca3af",
          textAlign: "center",
        }}
      >
        Whispers are private. Only the creator sees them.
      </div>
    </div>
  );
}
