import { defineCliConfig } from "sanity/cli";

/**
 * Note: projectId and dataset are public identifiers (they appear in every
 * Sanity-hosted image URL), so hardcoding them here is safe.
 *
 * The Studio is hosted on Vercel at studio.sombralab.com (`npm run build`
 * → dist/), not on *.sanity.studio, so there is no `deployment.appId`.
 */
export default defineCliConfig({
  api: {
    projectId: "5jy0w4kq",
    dataset: "production",
  },
});
