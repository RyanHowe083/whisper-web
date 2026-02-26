"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import type { CreatorProfileResponse, PostResponse } from "@/lib/types/api";
import { apiClient, ApiError } from "@/lib/api/client";
import WhisperComposer from "@/components/public/WhisperComposer";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorBanner from "@/components/ErrorBanner";

export default function PostDetailPage() {
  const params = useParams<{ creatorId: string; postId: string }>();
  const creatorId = params.creatorId;
  const postId = params.postId;

  const [creator, setCreator] = useState<CreatorProfileResponse | null>(null);
  const [post, setPost] = useState<PostResponse | null>(null);
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
      const found = postsData.find((p) => p.id === postId) ?? null;
      setPost(found);
      if (!found) {
        setError("Post not found.");
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Failed to load post.");
      }
    } finally {
      setLoading(false);
    }
  }, [creatorId, postId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <LoadingSpinner />;

  return (
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      <Link
        href={`/c/${encodeURIComponent(creatorId)}`}
        style={{
          display: "inline-block",
          fontSize: "var(--font-base)",
          color: "var(--color-text-muted)",
          textDecoration: "none",
          marginBottom: "var(--space-xl)",
        }}
      >
        ← Back to {creator?.displayName ?? "creator"}
      </Link>

      {error && (
        <div style={{ marginBottom: "var(--space-lg)" }}>
          <ErrorBanner message={error} onRetry={fetchData} />
        </div>
      )}

      {post && (
        <article
          style={{
            padding: "var(--space-2xl)",
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            marginBottom: "var(--space-2xl)",
          }}
        >
          <h1
            style={{
              fontSize: "var(--font-xl)",
              fontWeight: 700,
              color: "var(--color-text)",
              margin: 0,
              marginBottom: "var(--space-sm)",
            }}
          >
            {post.title}
          </h1>
          <div
            style={{
              fontSize: "var(--font-sm)",
              color: "var(--color-text-faint)",
              marginBottom: "var(--space-xl)",
            }}
          >
            {new Date(post.createdAt).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
          <div
            style={{
              fontSize: "var(--font-md)",
              color: "var(--color-text-secondary)",
              lineHeight: "var(--line-relaxed)",
              whiteSpace: "pre-wrap",
            }}
          >
            {post.content}
          </div>
        </article>
      )}

      {post && creator?.whispersEnabled && (
        <WhisperComposer creatorId={creatorId} postId={postId} />
      )}

      {post && creator && !creator.whispersEnabled && (
        <div
          style={{
            padding: "var(--space-lg)",
            background: "var(--color-warn-light)",
            border: "1px solid var(--color-warn-border)",
            borderRadius: "var(--radius-lg)",
            fontSize: "var(--font-md)",
            color: "var(--color-warn)",
            textAlign: "center",
          }}
        >
          This creator is not accepting whispers right now.
        </div>
      )}
    </div>
  );
}

