import { defineCliConfig } from "sanity/cli";

/**
 * Note: projectId and dataset are public identifiers (they appear in every
 * Sanity-hosted image URL), so hardcoding them here is safe and avoids the
 * .env.development vs .env.production juggle the CLI does across commands.
 */
export default defineCliConfig({
  api: {
    projectId: "5jy0w4kq",
    dataset: "production",
  },
  deployment: {
    appId: "bvxfumpjs7ctecg1vmkp18k8",
  },
});
