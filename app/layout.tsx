import type { Metadata, Viewport } from "next";
import { Poppins, Open_Sans } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-open-sans",
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
    <html lang="en-GB" className={`${poppins.variable} ${openSans.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
