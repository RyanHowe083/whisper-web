import type { Metadata } from "next";
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
        {children}
        <DevTools />
      </body>
    </html>
  );
}

