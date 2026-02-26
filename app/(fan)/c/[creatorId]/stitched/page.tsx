"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import type { StitchResponse } from "@/lib/types/api";
import { apiClient, ApiError } from "@/lib/api/client";
import StitchedItem from "@/components/public/StitchedItem";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorBanner from "@/components/ErrorBanner";
import EmptyState from "@/components/EmptyState";

export default function CreatorStitchedPage() {
  const params = useParams<{ creatorId: string }>();
  const creatorId = params.creatorId;

  const [stitches, setStitches] = useState<StitchResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStitches = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiClient.get<StitchResponse[]>(
        `/api/stitches?creatorId=${encodeURIComponent(creatorId)}`
      );
      setStitches(data);
    } catch (err) {
      if (err instanceof ApiError && err.status === 400) {
        try {
          const allData = await apiClient.get<StitchResponse[]>("/api/stitches");
          setStitches(allData.filter((s) => s.creatorId === creatorId));
        } catch (fallbackErr) {
          if (fallbackErr instanceof ApiError) {
            setError(fallbackErr.message);
          } else {
            setError("Failed to load stitched answers.");
          }
        }
      } else if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Failed to load stitched answers.");
      }
    } finally {
      setLoading(false);
    }
  }, [creatorId]);

  useEffect(() => {
    fetchStitches();
  }, [fetchStitches]);

  if (loading) return <LoadingSpinner />;

  return (
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      <h1
        style={{
          fontSize: "var(--font-2xl)",
          fontWeight: 700,
          color: "var(--color-text)",
          marginBottom: "var(--space-xs)",
        }}
      >
        Stitched Answers
      </h1>
      <p
        style={{
          fontSize: "var(--font-base)",
          color: "var(--color-text-faint)",
          marginBottom: "var(--space-2xl)",
        }}
      >
        Public answers curated by the creator. Fan identity is never shown.
      </p>

      {error && (
        <div style={{ marginBottom: "var(--space-lg)" }}>
          <ErrorBanner message={error} onRetry={fetchStitches} />
        </div>
      )}

      {stitches.length === 0 && !error && (
        <EmptyState message="No stitched answers yet." />
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
        {stitches.map((s) => (
          <StitchedItem key={s.id} stitch={s} />
        ))}
      </div>
    </div>
  );
}

