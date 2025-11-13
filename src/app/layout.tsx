import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VirtualCandy - Explore the Candyverse",
  description: "Interactive candy discovery platform featuring the Candyverse - explore curated candy products organized by flavor planets and constellations",
  keywords: ["candy", "confectionery", "sweets", "gummies", "chocolate", "candy shop", "treats"],
  authors: [{ name: "VirtualCandy" }],
  openGraph: {
    title: "VirtualCandy - Explore the Candyverse",
    description: "Interactive candy discovery platform with curated products",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://virtualcandy.com",
    siteName: "VirtualCandy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VirtualCandy - Explore the Candyverse",
    description: "Interactive candy discovery platform",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
