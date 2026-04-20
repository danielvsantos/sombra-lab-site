import { MetadataRoute } from "next";
import { sanityClient } from "@/sanity/lib/client";
import { allSlugsQuery } from "@/sanity/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sombralab.com";

  const slugs = await sanityClient.fetch<{ slug: string }[]>(allSlugsQuery);
  const projectPages = slugs
    .filter((s) => s.slug)
    .map((s) => ({
      url: `${baseUrl}/work/${s.slug}`,
      lastModified: new Date(),
    }));

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/work`, lastModified: new Date() },
    { url: `${baseUrl}/services`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/start`, lastModified: new Date() },
    ...projectPages,
  ];
}
