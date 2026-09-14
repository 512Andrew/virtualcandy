import type { Metadata } from "next";
import StudioHome from "./StudioHome";
import { faqs } from "@/lib/faqs";
import { siteUrl } from "@/lib/site";
export const metadata: Metadata = { alternates: { canonical: "/" } };
export default function Home() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Virtual Candy Studio",
        publisher: { "@id": `${siteUrl}/#studio` },
        inLanguage: "en-US",
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/#faq`,
        mainEntity: faqs.map(([q, a]) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
      ...[
        [
          "Website design",
          "Mobile-friendly landing pages and business websites. Launch starts at $750; Business starts at $1,500. Scope confirmed in a written proposal.",
        ],
        ["Content and messaging", "Website copy, focused research and business messaging."],
        [
          "Practical automation",
          "Appointment booking, forms and CRM lead routing, scoped to your business.",
        ],
      ].map(([name, description]) => ({
        "@type": "Service",
        name,
        description,
        provider: { "@id": `${siteUrl}/#studio` },
        url: `${siteUrl}/#services`,
      })),
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
      />
      <StudioHome />
    </>
  );
}
