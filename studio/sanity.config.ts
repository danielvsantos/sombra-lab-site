import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { muxInput } from "sanity-plugin-mux-input";
import { schemaTypes } from "./schemas";

// projectId and dataset are public identifiers (they appear in every
// Sanity-hosted image URL), so hardcoding them keeps the built Studio bundle
// self-contained.
//
// The Studio is deployed as its own Vercel project at studio.sombralab.com
// (see README.md). List-item IDs below are stable on purpose: Sombra Hub
// links to /structure/projects, /structure/services, /structure/founders and
// /structure/collaborators, and to documents through /intent/edit/... URLs.
export default defineConfig({
  name: "sombra-lab",
  title: "Sombra Lab",
  projectId: "5jy0w4kq",
  dataset: "production",
  // Editors sign in with Google only (all of them have Sanity accounts on
  // Google). With a single provider the login screen goes straight to it.
  auth: {
    redirectOnSingle: true,
    providers: (prev) => prev.filter((provider) => provider.name === "google"),
  },
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
              .id("projects")
              .schemaType("project")
              .child(
                S.list()
                  .title("Client Projects")
                  .items([
                    S.listItem()
                      .title("All projects")
                      .id("all")
                      .schemaType("project")
                      .child(
                        S.documentTypeList("project")
                          .title("All projects")
                          .defaultOrdering([{ field: "order", direction: "asc" }])
                      ),
                    // Projects whose client name and Instagram are managed in
                    // Sombra Hub (hubClientId set by the Hub).
                    S.listItem()
                      .title("Linked to Sombra Hub")
                      .id("linked")
                      .schemaType("project")
                      .child(
                        S.documentTypeList("project")
                          .title("Linked to Sombra Hub")
                          .filter('_type == "project" && defined(hubClientId)')
                          .defaultOrdering([{ field: "order", direction: "asc" }])
                      ),
                    S.listItem()
                      .title("Not linked")
                      .id("not-linked")
                      .schemaType("project")
                      .child(
                        S.documentTypeList("project")
                          .title("Not linked")
                          .filter('_type == "project" && !defined(hubClientId)')
                          .defaultOrdering([{ field: "order", direction: "asc" }])
                      ),
                  ])
              ),
            S.listItem()
              .title("Services")
              .id("services")
              .schemaType("service")
              .child(
                S.documentTypeList("service")
                  .title("Services")
                  .defaultOrdering([{ field: "order", direction: "asc" }])
              ),
            S.divider(),
            S.listItem()
              .title("Founders")
              .id("founders")
              .schemaType("founder")
              .child(
                S.documentTypeList("founder")
                  .title("Founders")
                  .defaultOrdering([{ field: "order", direction: "asc" }])
              ),
            S.listItem()
              .title("Collaborators")
              .id("collaborators")
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
});
