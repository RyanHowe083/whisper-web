"use client";

import { useEffect, useState, useCallback } from "react";
import type { WhisperResponse } from "@/lib/types/api";
import { apiClient, ApiError } from "@/lib/api/client";
import WhisperListItem from "@/components/creator/WhisperListItem";
import WhisperDetail from "@/components/creator/WhisperDetail";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorBanner from "@/components/ErrorBanner";

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
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 16px" }}>
      <h1
        style={{
          fontSize: "22px",
          fontWeight: 700,
          color: "#1f2937",
          marginBottom: 20,
        }}
      >
        Creator Inbox
      </h1>

      {error && (
        <div style={{ marginBottom: 16 }}>
          <ErrorBanner message={error} onRetry={fetchWhispers} />
        </div>
      )}

      {whispers.length === 0 && !error && (
        <p style={{ color: "#9ca3af", fontSize: "14px" }}>
          No whispers yet. Whispers from fans will appear here.
        </p>
      )}

      {whispers.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: selected ? "380px 1fr" : "1fr",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            overflow: "hidden",
            background: "#fff",
            minHeight: 400,
          }}
        >
          <div
            style={{
              borderRight: selected ? "1px solid #e5e7eb" : "none",
              overflowY: "auto",
              maxHeight: "70vh",
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
            <div style={{ overflowY: "auto", maxHeight: "70vh" }}>
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
