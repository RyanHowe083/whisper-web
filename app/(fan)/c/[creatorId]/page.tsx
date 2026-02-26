"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import type { CreatorProfileResponse, PostResponse } from "@/lib/types/api";
import { apiClient, ApiError } from "@/lib/api/client";
import CreatorHeader from "@/components/public/CreatorHeader";
import PostListItem from "@/components/public/PostListItem";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorBanner from "@/components/ErrorBanner";
import EmptyState from "@/components/EmptyState";

export default function CreatorProfilePage() {
  const params = useParams<{ creatorId: string }>();
  const creatorId = params.creatorId;

  const [creator, setCreator] = useState<CreatorProfileResponse | null>(null);
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [creatorData, postsData] = await Promise.all([
        apiClient.get<CreatorProfileResponse>(
          `/api/creators/${encodeURIComponent(creatorId)}`
        ),
        apiClient.get<PostResponse[]>(
          `/api/creators/${encodeURIComponent(creatorId)}/posts`
        ),
      ]);
      setCreator(creatorData);
      setPosts(postsData);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Failed to load creator profile.");
      }
    } finally {
      setLoading(false);
    }
  }, [creatorId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <LoadingSpinner />;

  return (
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      {error && (
        <div style={{ marginBottom: "var(--space-lg)" }}>
          <ErrorBanner message={error} onRetry={fetchData} />
        </div>
      )}

      {creator && <CreatorHeader creator={creator} />}

      {creator && (
        <div style={{ marginBottom: "var(--space-lg)" }}>
          <div
            style={{
              display: "flex",
              gap: "var(--space-lg)",
              borderBottom: "1px solid var(--color-border)",
              marginBottom: "var(--space-lg)",
            }}
          >
            <span
              style={{
                fontSize: "var(--font-md)",
                fontWeight: 600,
                color: "var(--color-text)",
                paddingBottom: "var(--space-sm)",
                borderBottom: "2px solid var(--color-text)",
              }}
            >
              Posts
            </span>
            <Link
              href={`/c/${encodeURIComponent(creatorId)}/stitched`}
              style={{
                fontSize: "var(--font-md)",
                fontWeight: 400,
                color: "var(--color-text-muted)",
                paddingBottom: "var(--space-sm)",
                borderBottom: "2px solid transparent",
                textDecoration: "none",
              }}
            >
              Stitched Answers
            </Link>
          </div>
        </div>
      )}

      {posts.length === 0 && !error && (
        <EmptyState message="No posts yet." />
      )}

      {posts.length > 0 && (
        <div
          style={{
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            background: "var(--color-surface)",
          }}
        >
          {posts.map((post) => (
            <PostListItem key={post.id} post={post} creatorId={creatorId} />
          ))}
        </div>
      )}
    </div>
  );
}

