import { groq } from "next-sanity";

/** Fragment: asset metadata used across queries */
export const imageFragment = `{
  ...,
  asset->{
    _id,
    url,
    metadata { lqip, dimensions }
  }
}`;

const muxVideoFragment = `{
  asset->{
    _id,
    playbackId,
    assetId,
    status,
    thumbTime,
    data
  }
}`;

export const allProjectsQuery = groq`
  *[_type == "project"] | order(order asc, title asc) {
    _id,
    title,
    "slug": slug.current,
    category,
    services,
    brief,
    instagram,
    featured,
    order,
    coverAspect,
    coverImage ${imageFragment},
    coverVideo ${muxVideoFragment},
    heroMedia {
      type,
      image ${imageFragment},
      video ${muxVideoFragment}
    },
    gallery[] {
      _type,
      _type == "galleryImage" => {
        alt,
        image ${imageFragment}
      },
      _type == "galleryVideo" => {
        alt,
        video ${muxVideoFragment}
      }
    }
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    category,
    services,
    brief,
    instagram,
    featured,
    order,
    coverAspect,
    coverImage ${imageFragment},
    coverVideo ${muxVideoFragment},
    heroMedia {
      type,
      image ${imageFragment},
      video ${muxVideoFragment}
    },
    gallery[] {
      _type,
      _type == "galleryImage" => {
        alt,
        image ${imageFragment}
      },
      _type == "galleryVideo" => {
        alt,
        video ${muxVideoFragment}
      }
    }
  }
`;

export const allSlugsQuery = groq`
  *[_type == "project"]{ "slug": slug.current }
`;

export const servicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    description,
    icon,
    order
  }
`;

export const foundersQuery = groq`
  *[_type == "founder"] | order(order asc) {
    _id,
    name,
    role,
    bio,
    photo ${imageFragment},
    order
  }
`;

export const collaboratorsQuery = groq`
  *[_type == "collaborator"] | order(order asc) {
    _id,
    name,
    role,
    photo ${imageFragment},
    order
  }
`;

export const homepageMediaQuery = groq`
  *[_type == "homepageMedia"][0] {
    videos[] {
      aspectRatio,
      video ${muxVideoFragment}
    }
  }
`;
