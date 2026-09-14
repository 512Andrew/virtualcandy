import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/privacy", "/terms", "/accessibility"].map((path) => ({ url: `${siteUrl}${path}` }));
}
