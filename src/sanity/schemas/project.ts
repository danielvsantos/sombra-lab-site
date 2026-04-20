import { defineType, defineField, defineArrayMember } from "sanity";

export const project = defineType({
  name: "project",
  title: "Client Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Client name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Gastronomy", value: "gastronomy" },
          { title: "Beauty", value: "beauty" },
          { title: "Fashion", value: "fashion" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "services",
      title: "Services provided",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          "Creative Direction",
          "Audiovisual Production",
          "Styling",
          "Social Media Management",
          "Social Media Strategy",
        ],
      },
    }),
    defineField({
      name: "brief",
      title: "Brief (main description)",
      type: "text",
      rows: 5,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "instagram",
      title: "Instagram handle",
      type: "string",
      description: "e.g. @bravasushi",
    }),
    defineField({
      name: "featured",
      title: "Featured on homepage?",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      description: "Lower numbers appear first. Leave blank for end of list.",
    }),
    defineField({
      name: "coverAspect",
      title: "Cover aspect ratio",
      type: "string",
      description: "How this client's cover displays on the Work page bento grid",
      options: {
        list: [
          { title: "Vertical (tall)", value: "vertical" },
          { title: "Horizontal (wide)", value: "horizontal" },
        ],
        layout: "radio",
      },
      initialValue: "vertical",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image (used when no cover video)",
      type: "image",
      options: { hotspot: true },
      description: "Shown on /work page bento grid and featured work. Ignored if cover video is set.",
    }),
    defineField({
      name: "coverVideo",
      title: "Cover video (optional)",
      type: "mux.video",
      description: "If set, this autoplays muted on the cover card. Falls back to cover image.",
    }),
    defineField({
      name: "heroMedia",
      title: "Hero banner (on client page)",
      type: "object",
      fields: [
        defineField({
          name: "type",
          title: "Media type",
          type: "string",
          options: {
            list: [
              { title: "Image", value: "image" },
              { title: "Video", value: "video" },
            ],
            layout: "radio",
          },
          initialValue: "image",
          validation: (r) => r.required(),
        }),
        defineField({
          name: "image",
          title: "Hero image",
          type: "image",
          options: { hotspot: true },
          hidden: ({ parent }) => parent?.type !== "image",
        }),
        defineField({
          name: "video",
          title: "Hero video",
          type: "mux.video",
          hidden: ({ parent }) => parent?.type !== "video",
        }),
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "gallery",
      title: "Gallery (client page)",
      type: "array",
      of: [
        defineArrayMember({
          name: "galleryImage",
          title: "Image",
          type: "object",
          fields: [
            { name: "image", type: "image", options: { hotspot: true } },
            { name: "alt", type: "string", title: "Alt text" },
          ],
          preview: {
            select: { image: "image", alt: "alt" },
            prepare: ({ image, alt }) => ({
              title: alt || "Image",
              media: image,
            }),
          },
        }),
        defineArrayMember({
          name: "galleryVideo",
          title: "Video",
          type: "object",
          fields: [
            { name: "video", type: "mux.video" },
            { name: "alt", type: "string", title: "Description" },
          ],
          preview: {
            select: { alt: "alt" },
            prepare: ({ alt }) => ({ title: alt || "Video" }),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "coverImage",
    },
  },
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Title A-Z",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
});
