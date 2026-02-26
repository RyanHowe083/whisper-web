"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const NAV_ITEMS = [
  { href: "/inbox", label: "Fan Inbox" },
  { href: "/creator/inbox", label: "Creator Inbox" },
  { href: "/api-health", label: "API Health" },
];

export default function AppHeader() {
  const pathname = usePathname();

  return (
    <header
      style={{
        borderBottom: "1px solid var(--color-border)",
        background: "var(--color-surface)",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 var(--space-lg)",
          display: "flex",
          alignItems: "center",
          height: 48,
          gap: "var(--space-2xl)",
        }}
      >
        <Link
          href="/"
          style={{
            fontSize: "var(--font-lg)",
            fontWeight: 700,
            color: "var(--color-text)",
            textDecoration: "none",
            letterSpacing: "-0.01em",
          }}
        >
          Whisper
        </Link>
        <nav
          style={{
            display: "flex",
            gap: "var(--space-lg)",
            alignItems: "center",
          }}
        >
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  fontSize: "var(--font-base)",
                  fontWeight: active ? 600 : 400,
                  color: active
                    ? "var(--color-text)"
                    : "var(--color-text-muted)",
                  textDecoration: "none",
                  padding: "var(--space-xs) 0",
                  borderBottom: active
                    ? "2px solid var(--color-text)"
                    : "2px solid transparent",
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

