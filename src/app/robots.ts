import type { MetadataRoute } from "next";
import { siteUrl, isPublicLaunch } from "@/lib/site";
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", ...(isPublicLaunch ? { allow: "/" } : { disallow: "/" }) },
    ...(isPublicLaunch ? { sitemap: `${siteUrl}/sitemap.xml` } : {}),
  };
}
