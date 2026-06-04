import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Self-hosted to avoid any build-time network fetch (more reliable + faster).
const spaceGrotesk = localFont({
  src: "./fonts/SpaceGrotesk.ttf",
  variable: "--font-space-grotesk",
  weight: "300 700",
  display: "swap",
});

const dmSans = localFont({
  src: "./fonts/DMSans.ttf",
  variable: "--font-dm-sans",
  weight: "100 1000",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NW Trades Co — Plumbing, Electrical & Building in the North West",
  description:
    "NW's most trusted trades team. Plumbing, electrical and building work across the North West. Free same-day quotes, fast response, fully insured & certified.",
  openGraph: {
    title: "NW Trades Co — Trusted Trades Across the North West",
    description:
      "Plumbing, electrical & building work across the North West. Free quotes, fast response.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B1120",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-GB"
      className={`${spaceGrotesk.variable} ${dmSans.variable}`}
    >
      <body className="font-sans">{children}</body>
    </html>
  );
}
