/**
 * Small helpers that extract renderable props from Sanity query results —
 * keeps components free of Sanity-shape boilerplate.
 */
import type {
  SanityImage,
  MuxVideo,
  SanityProject,
} from "./types";
import { urlFor, heroImageUrl, galleryImageUrl, coverImageUrl } from "./image";

export function muxPlaybackId(v?: MuxVideo | null): string | null {
  return v?.asset?.playbackId ?? null;
}

export function imageUrl(i?: SanityImage | null, width = 1600): string | null {
  if (!i?.asset?._id) return null;
  return urlFor(i).width(width).quality(88).url();
}

/**
 * Cover for a project card (work grid / featured work on home).
 * Returns a video playback ID if available, otherwise falls back to the image.
 */
export function resolveProjectCover(project: SanityProject): {
  video?: string;
  image?: string;
  lqip?: string;
} {
  const video = muxPlaybackId(project.coverVideo);
  if (video) {
    // Still expose a poster from Mux thumbnail for the play fallback
    return { video };
  }
  const image = project.coverImage ? coverImageUrl(project.coverImage) : null;
  const lqip = project.coverImage?.asset?.metadata?.lqip;
  return { image: image ?? undefined, lqip };
}

/**
 * Mux auto-generates poster thumbnails at:
 *   https://image.mux.com/{playbackId}/thumbnail.jpg?time=0
 * We default to `time=0` (first frame) so the poster matches what the video
 * shows when playback starts — no jarring flash when the video mounts.
 */
export function muxPosterUrl(
  playbackId: string,
  opts?: { time?: number },
): string {
  const time = opts?.time ?? 0;
  return `https://image.mux.com/${playbackId}/thumbnail.jpg?time=${time}`;
}

export function resolveProjectHero(project: SanityProject): {
  kind: "image" | "video";
  src: string;
  poster?: string;
} {
  if (project.heroMedia.type === "video" && project.heroMedia.video) {
    const id = muxPlaybackId(project.heroMedia.video);
    if (id) {
      return { kind: "video", src: id, poster: muxPosterUrl(id) };
    }
  }
  if (project.heroMedia.type === "image" && project.heroMedia.image) {
    return {
      kind: "image",
      src: heroImageUrl(project.heroMedia.image),
    };
  }
  // Fallback to cover if hero isn't set properly
  const cover = resolveProjectCover(project);
  if (cover.video) return { kind: "video", src: cover.video };
  return { kind: "image", src: cover.image ?? "" };
}

export function resolveGalleryItems(project: SanityProject) {
  return (project.gallery ?? [])
    .map((item) => {
      if (item._type === "galleryImage" && item.image) {
        return {
          kind: "image" as const,
          src: galleryImageUrl(item.image),
          alt: item.alt,
          lqip: item.image.asset.metadata?.lqip,
        };
      }
      if (item._type === "galleryVideo" && item.video) {
        const id = muxPlaybackId(item.video);
        if (id) {
          return {
            kind: "video" as const,
            playbackId: id,
            poster: muxPosterUrl(id),
            alt: item.alt,
          };
        }
      }
      return null;
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);
}
