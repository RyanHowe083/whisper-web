"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import type { StitchResponse } from "@/lib/types/api";
import { apiClient, ApiError } from "@/lib/api/client";
import StitchedItem from "@/components/public/StitchedItem";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorBanner from "@/components/ErrorBanner";

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
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "24px 16px" }}>
      <h1
        style={{
          fontSize: "22px",
          fontWeight: 700,
          color: "#1f2937",
          marginBottom: 6,
        }}
      >
        Stitched Answers
      </h1>
      <p
        style={{
          fontSize: "13px",
          color: "#9ca3af",
          marginBottom: 20,
        }}
      >
        Public answers curated by the creator. Fan identity is never shown.
      </p>

      {error && (
        <div style={{ marginBottom: 16 }}>
          <ErrorBanner message={error} onRetry={fetchStitches} />
        </div>
      )}

      {stitches.length === 0 && !error && (
        <p style={{ color: "#9ca3af", fontSize: "14px" }}>
          No stitched answers yet.
        </p>
      )}

      {stitches.map((s) => (
        <StitchedItem key={s.id} stitch={s} />
      ))}
    </div>
  );
}
