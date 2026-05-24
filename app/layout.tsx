import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cube Campaign",
  description: "Digital Campaign Management Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ fontFamily: "var(--font-sans)" }}>
      <body style={{ fontFamily: "var(--font-sans)" }}>{children}</body>
    </html>
  );
}
