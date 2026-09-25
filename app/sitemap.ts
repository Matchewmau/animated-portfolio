import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-09-25");
  const routes = [
    "",
    "/projects/hairmixer-ai",
    "/projects/pconnect",
    "/projects/tj-fitness",
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route === "" ? "/" : route}`,
    lastModified,
  }));
}
