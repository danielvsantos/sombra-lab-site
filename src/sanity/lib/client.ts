import { createClient } from "@sanity/client";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
export const apiVersion = "2024-10-01";

/**
 * Read-only client for fetching content in pages.
 * Uses CDN for speed + caching. No auth needed — the Sanity dataset is
 * configured as public so anonymous reads are allowed.
 */
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});
