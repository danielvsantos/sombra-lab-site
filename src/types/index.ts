export interface Project {
  slug: string;
  title: string;
  category: FilterCategory;
  services: string[];
  brief: string;
  instagram: string;
  thumbnail: string;
  coverVideo?: string;
  coverAspect: "vertical" | "horizontal";
  heroMedia: { type: "image" | "video"; src: string; poster?: string };
  gallery: { type: "image" | "video"; src: string; poster?: string; alt?: string }[];
  featured: boolean;
}

export interface MediaItem {
  src: string;
  poster?: string;
  aspectRatio: "9:16" | "16:9" | "1:1";
}

export interface Service {
  title: string;
  description: string;
}

export type FilterCategory = "all" | "gastronomy" | "beauty" | "fashion";
