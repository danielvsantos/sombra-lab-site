import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Sanity's image CDN (all project images)
      { protocol: "https", hostname: "cdn.sanity.io" },
      // Mux's auto-generated thumbnails (poster frames, etc)
      { protocol: "https", hostname: "image.mux.com" },
    ],
  },
  // Pin the workspace root to THIS project directory.
  // Without this, Next.js detects ~/yarn.lock and treats the entire home
  // directory as the workspace — which made Turbopack try to scan every
  // file under ~/ and eat all available memory.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
