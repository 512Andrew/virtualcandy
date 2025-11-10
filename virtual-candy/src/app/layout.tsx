import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VirtualCandy - Interactive Candy Universe",
  description: "Explore the Candyverse - Your guide to the sweetest treats organized by flavor planets and constellations",
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
