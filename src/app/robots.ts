import type { MetadataRoute } from "next";

// Preview build: blocked from search until it replaces the WordPress site.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" } };
}
