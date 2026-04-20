/**
 * TypeScript shapes matching the Sanity queries in queries.ts.
 * These are what pages consume after fetching from Sanity.
 */

export interface SanityImage {
  _type?: "image";
  asset: {
    _id: string;
    url: string;
    metadata?: {
      lqip?: string;
      dimensions?: { width: number; height: number; aspectRatio: number };
    };
  };
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}

export interface MuxVideo {
  asset: {
    _id: string;
    playbackId: string;
    assetId: string;
    status: string;
    thumbTime?: number;
    data?: {
      aspect_ratio?: string;
      duration?: number;
    };
  };
}

export type FilterCategory = "all" | "gastronomy" | "beauty" | "fashion";

export interface SanityProject {
  _id: string;
  title: string;
  slug: string;
  category: Exclude<FilterCategory, "all">;
  services: string[];
  brief: string;
  instagram?: string;
  featured: boolean;
  order?: number;
  coverAspect: "vertical" | "horizontal";
  coverImage?: SanityImage;
  coverVideo?: MuxVideo;
  heroMedia: {
    type: "image" | "video";
    image?: SanityImage;
    video?: MuxVideo;
  };
  gallery?: Array<
    | { _type: "galleryImage"; alt?: string; image: SanityImage }
    | { _type: "galleryVideo"; alt?: string; video: MuxVideo }
  >;
}

export interface SanityService {
  _id: string;
  title: string;
  description: string;
  icon: "lightbulb" | "camera" | "shirt" | "trending-up";
  order?: number;
}

export interface SanityFounder {
  _id: string;
  name: string;
  role: string;
  bio: string;
  photo: SanityImage;
  order?: number;
}

export interface SanityCollaborator {
  _id: string;
  name: string;
  role?: string;
  photo?: SanityImage;
  order?: number;
}

export interface SanityHomepageMedia {
  videos: Array<{
    aspectRatio: "9:16" | "16:9" | "1:1";
    video: MuxVideo;
  }>;
}
