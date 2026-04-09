import galleryMeta from "./gallery-meta.json";
import { Project } from "@/types";

type GalleryMeta = Record<string, Record<string, "vertical" | "horizontal" | "square">>;

const meta = galleryMeta as GalleryMeta;

/**
 * Enriches a project's gallery items with aspect ratio metadata
 * detected from the actual files at build time.
 */
export function enrichGallery(project: Project): Project["gallery"] {
  const clientMeta = meta[project.slug];
  if (!clientMeta) return project.gallery;

  return project.gallery.map((item) => {
    // Extract filename from src path
    const filename = item.src.split("/").pop();
    if (!filename) return item;

    const aspectRatio = clientMeta[filename];
    if (!aspectRatio) return item;

    return { ...item, aspectRatio };
  });
}
