import { defineType, defineField, defineArrayMember } from "sanity";

/**
 * Singleton controlling the 3 hero bento videos on the homepage.
 */
export const homepageMedia = defineType({
  name: "homepageMedia",
  title: "Homepage Hero Videos",
  type: "document",
  fields: [
    defineField({
      name: "videos",
      title: "Bento grid videos (3 items recommended)",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "bentoVideo",
          fields: [
            { name: "video", type: "mux.video", title: "Video" },
            {
              name: "aspectRatio",
              title: "Aspect ratio",
              type: "string",
              options: {
                list: [
                  { title: "Vertical (9:16)", value: "9:16" },
                  { title: "Horizontal (16:9)", value: "16:9" },
                  { title: "Square (1:1)", value: "1:1" },
                ],
                layout: "radio",
              },
              initialValue: "9:16",
            },
          ],
          preview: {
            select: { aspectRatio: "aspectRatio" },
            prepare: ({ aspectRatio }) => ({
              title: `Video (${aspectRatio || "?"})`,
            }),
          },
        }),
      ],
      validation: (r) => r.min(1).max(6),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Homepage Hero Videos" }),
  },
});
