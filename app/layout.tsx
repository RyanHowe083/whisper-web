import type { Metadata } from "next";
import DevBanner from "@/components/DevBanner";
import DevIdentityPanel from "@/components/DevIdentityPanel";
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
        <DevBanner />
        <DevIdentityPanel />
      </body>
    </html>
  );
}

