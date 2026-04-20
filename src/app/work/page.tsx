import type { Metadata } from "next";
import AnimatedText from "@/components/ui/AnimatedText";
import DynamicGrid from "@/components/ui/DynamicGrid";
import { sanityClient } from "@/sanity/lib/client";
import { allProjectsQuery } from "@/sanity/lib/queries";
import type { SanityProject } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "Work | Sombra Lab",
  description: "A curated selection of our recent productions.",
};

// Revalidate at most every 60s (so Patricia's Studio edits appear fast)
export const revalidate = 60;

export default async function WorkPage() {
  const projects = await sanityClient.fetch<SanityProject[]>(allProjectsQuery);

  return (
    <div className="pt-28 md:pt-36 pb-20 md:pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 md:mb-16">
          <AnimatedText
            text="Our visual footprint."
            as="h1"
            className="font-sans font-medium text-3xl md:text-5xl lg:text-6xl"
          />
          <p className="font-mono text-foreground/60 mt-4 text-sm md:text-base">
            A curated selection of our recent productions.
          </p>
        </div>
        <DynamicGrid projects={projects} />
      </div>
    </div>
  );
}
