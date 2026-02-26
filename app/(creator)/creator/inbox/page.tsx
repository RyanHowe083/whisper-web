"use client";

import { useEffect, useState, useCallback } from "react";
import type { WhisperResponse } from "@/lib/types/api";
import { apiClient, ApiError } from "@/lib/api/client";
import WhisperListItem from "@/components/creator/WhisperListItem";
import WhisperDetail from "@/components/creator/WhisperDetail";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorBanner from "@/components/ErrorBanner";
import EmptyState from "@/components/EmptyState";

export default function CreatorInboxPage() {
  const [whispers, setWhispers] = useState<WhisperResponse[]>([]);
  const [selected, setSelected] = useState<WhisperResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWhispers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiClient.get<WhisperResponse[]>("/api/creator/whispers");
      setWhispers(data);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Failed to load whispers.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWhispers();
  }, [fetchWhispers]);

  const handleStitchComplete = (whisperId: string) => {
    setWhispers((prev) =>
      prev.map((w) => (w.id === whisperId ? { ...w, status: "STITCHED" } : w))
    );
    setSelected((prev) =>
      prev && prev.id === whisperId ? { ...prev, status: "STITCHED" } : prev
    );
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <h1
        style={{
          fontSize: "var(--font-2xl)",
          fontWeight: 700,
          color: "var(--color-text)",
          marginBottom: "var(--space-xl)",
        }}
      >
        Creator Inbox
      </h1>

      {error && (
        <div style={{ marginBottom: "var(--space-lg)" }}>
          <ErrorBanner message={error} onRetry={fetchWhispers} />
        </div>
      )}

      {whispers.length === 0 && !error && (
        <EmptyState message="No whispers yet. Whispers from fans will appear here." />
      )}

      {whispers.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: selected ? "360px 1fr" : "1fr",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            background: "var(--color-surface)",
            minHeight: 420,
          }}
        >
          <div
            style={{
              borderRight: selected ? "1px solid var(--color-border)" : "none",
              overflowY: "auto",
              maxHeight: "72vh",
            }}
          >
            {whispers.map((w) => (
              <WhisperListItem
                key={w.id}
                whisper={w}
                selected={selected?.id === w.id}
                onSelect={setSelected}
              />
            ))}
          </div>

          {selected && (
            <div style={{ overflowY: "auto", maxHeight: "72vh" }}>
              <WhisperDetail
                key={selected.id}
                whisper={selected}
                onStitchComplete={handleStitchComplete}
                onBack={() => setSelected(null)}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

