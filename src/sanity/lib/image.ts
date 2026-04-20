import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";
import { projectId, dataset } from "./client";

const builder = createImageUrlBuilder({ projectId, dataset });

/**
 * Build a Sanity image URL with transformations.
 * Always returns auto-format (WebP/AVIF per browser) for best performance.
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source).auto("format");
}

/**
 * Preset for hero banner images — large, high-quality.
 */
export function heroImageUrl(source: SanityImageSource, width = 2400) {
  return urlFor(source).width(width).quality(92).url();
}

/**
 * Preset for gallery images — medium, still sharp.
 */
export function galleryImageUrl(source: SanityImageSource, width = 1600) {
  return urlFor(source).width(width).quality(88).url();
}

/**
 * Preset for cover thumbnails (work page / featured grid) — smaller.
 */
export function coverImageUrl(source: SanityImageSource, width = 1200) {
  return urlFor(source).width(width).quality(85).url();
}

/**
 * Preset for founder/collaborator portraits — fits vertical 3:4 frame.
 */
export function portraitImageUrl(source: SanityImageSource, width = 800) {
  return urlFor(source).width(width).quality(88).url();
}
