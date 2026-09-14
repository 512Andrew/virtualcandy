import type { Metadata } from "next";
import "./globals.css";
import { siteUrl, isPublicLaunch } from "@/lib/site";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Virtual Candy Studio | Websites, Content & Automation",
    template: "%s | Virtual Candy Studio",
  },
  description:
    "Websites, content and practical automation for independent professionals and growing businesses. Explore services and build your project estimate.",
  robots: { index: isPublicLaunch, follow: isPublicLaunch },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/studio-icon.svg" },
  openGraph: {
    title: "Virtual Candy Studio",
    description: "Distinctive websites. Clearer stories. Systems that save you time.",
    type: "website",
    siteName: "Virtual Candy Studio",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Virtual Candy Studio — Good ideas. Made useful.",
      },
    ],
  },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t="auto";try{var s=localStorage.getItem("vc-theme");if(["auto","light","dark"].includes(s))t=s;}catch(e){}var r=document.documentElement;r.dataset.theme=t;r.dataset.resolvedTheme=t==="auto"?(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):t;})();`,
          }}
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": `${siteUrl}/#studio`,
              name: "Virtual Candy Studio",
              url: siteUrl,
              email: "info@virtualcandy.com",
              logo: `${siteUrl}/studio-icon.svg`,
              description:
                "An independent digital studio creating websites, content and practical automation for independent professionals and growing businesses.",
            }).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
