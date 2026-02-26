import Link from "next/link";
import type { PostResponse } from "@/lib/types/api";

interface PostListItemProps {
  post: PostResponse;
  creatorId: string;
}

export default function PostListItem({ post, creatorId }: PostListItemProps) {
  return (
    <Link
      href={`/c/${encodeURIComponent(creatorId)}/p/${encodeURIComponent(post.id)}`}
      style={{
        display: "block",
        padding: "var(--space-lg)",
        borderBottom: "1px solid var(--color-border-light)",
        textDecoration: "none",
        transition: "background 0.15s",
      }}
    >
      <h3
        style={{
          fontSize: "var(--font-lg)",
          fontWeight: 600,
          color: "var(--color-text)",
          margin: 0,
          marginBottom: "var(--space-xs)",
        }}
      >
        {post.title}
      </h3>
      <p
        style={{
          fontSize: "var(--font-md)",
          color: "var(--color-text-muted)",
          margin: 0,
          lineHeight: "var(--line-normal)",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {post.content}
      </p>
      <div
        style={{
          marginTop: "var(--space-sm)",
          fontSize: "var(--font-sm)",
          color: "var(--color-text-faint)",
        }}
      >
        {new Date(post.createdAt).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </div>
    </Link>
  );
}

