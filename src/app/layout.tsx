import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Virtual Candy Studio — Good ideas. Made useful.",
  description:
    "Websites, content and practical automation for independent professionals and growing businesses. Explore services and build your project estimate.",
  robots: { index: false, follow: false },
  icons: { icon: "/studio-icon.svg" },
  openGraph: {
    title: "Virtual Candy Studio",
    description: "Distinctive websites. Clearer stories. Systems that save you time.",
    type: "website",
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
      <body>{children}</body>
    </html>
  );
}
