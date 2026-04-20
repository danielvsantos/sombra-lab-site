import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { muxInput } from "sanity-plugin-mux-input";
import { schemaTypes } from "./src/sanity/schemas";

// projectId and dataset are public identifiers (they appear in every
// Sanity-hosted image URL), so hardcoding them keeps the built Studio bundle
// self-contained. `sanity deploy` doesn't read .env.development, so env-var
// lookups would resolve to empty strings in the production bundle.
export default defineConfig({
  name: "sombra-lab",
  title: "Sombra Lab",
  projectId: "5jy0w4kq",
  dataset: "production",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Sombra Lab")
          .items([
            S.listItem()
              .title("Homepage Hero Videos")
              .id("homepageMedia")
              .child(
                S.document()
                  .schemaType("homepageMedia")
                  .documentId("homepageMedia")
              ),
            S.divider(),
            S.listItem()
              .title("Client Projects")
              .schemaType("project")
              .child(
                S.documentTypeList("project")
                  .title("Client Projects")
                  .defaultOrdering([{ field: "order", direction: "asc" }])
              ),
            S.listItem()
              .title("Services")
              .schemaType("service")
              .child(
                S.documentTypeList("service")
                  .title("Services")
                  .defaultOrdering([{ field: "order", direction: "asc" }])
              ),
            S.divider(),
            S.listItem()
              .title("Founders")
              .schemaType("founder")
              .child(
                S.documentTypeList("founder")
                  .title("Founders")
                  .defaultOrdering([{ field: "order", direction: "asc" }])
              ),
            S.listItem()
              .title("Collaborators")
              .schemaType("collaborator")
              .child(
                S.documentTypeList("collaborator")
                  .title("Collaborators")
                  .defaultOrdering([{ field: "order", direction: "asc" }])
              ),
          ]),
    }),
    visionTool(),
    muxInput({
      // "basic" keeps costs minimal (~$0.003/min stored, $0.00096/min streamed).
      // Streaming to the Mux player works; only MP4 download is disabled.
      encoding_tier: "baseline",
    }),
  ],
  schema: {
    types: schemaTypes,
  },
  // Sanity Studio is built with Vite. Vite auto-copies /public into the
  // build output. Our /public contains 500MB of client assets that have
  // nothing to do with Studio and would make deploys time out.
  vite: (prev: Record<string, unknown>) => ({
    ...prev,
    publicDir: false,
  }),
});
