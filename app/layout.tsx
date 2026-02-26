import type { Metadata } from "next";
import AppHeader from "@/components/AppHeader";
import DevTools from "@/components/DevTools";
import "./globals.css";

export const metadata: Metadata = {
  title: "Whisper",
  description: "Private fan communication platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppHeader />
        <main style={{ padding: "var(--space-2xl) var(--space-lg)" }}>
          {children}
        </main>
        <DevTools />
      </body>
    </html>
  );
}

