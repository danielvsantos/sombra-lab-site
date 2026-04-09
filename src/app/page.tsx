import Link from "next/link";
import AnimatedText from "@/components/ui/AnimatedText";
import MixedMediaBento from "@/components/ui/MixedMediaBento";
import ClientTicker from "@/components/ui/ClientTicker";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/data/projects";
import { MediaItem } from "@/types";

// Placeholder bento items — replace with real video paths from public/assets/homepage/
const bentoItems: MediaItem[] = [
  { src: "/assets/homepage/reel-1.mp4", poster: "/assets/homepage/reel-1-poster.jpg", aspectRatio: "9:16" },
  { src: "/assets/homepage/reel-2.mp4", poster: "/assets/homepage/reel-2-poster.jpg", aspectRatio: "9:16" },
  { src: "/assets/homepage/reel-3.mp4", poster: "/assets/homepage/reel-3-poster.jpg", aspectRatio: "9:16" },
];

// Manually order featured projects to interleave video covers and image covers
// for visual balance (avoid clustering all photos on one side)
const featuredOrder = [
  "abac",          // video (vertical)
  "angle",         // image (vertical)
  "atempo",        // video (vertical)
  "pov-beauty",    // image (vertical)
  "brava-sushi",   // video (vertical)
  "nooda-organics",// video (vertical)
];
const featuredProjects = featuredOrder
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter((p): p is NonNullable<typeof p> => p !== undefined);

export default function Home() {
  return (
    <>
      {/* Hero: Bento Grid with Sticky Overlay */}
      <section className="relative">
        {/* Mobile: static hero text */}
        <div className="px-6 pt-28 pb-6 md:hidden">
          <h1 className="font-sans font-medium text-3xl leading-tight">
            We bring striking visions out of the shadows.
          </h1>
          <p className="font-mono text-foreground/60 mt-4 text-sm">
            Concept, production, and growth for upscale brands.
          </p>
          <Link
            href="/work"
            className="inline-block mt-6 font-mono text-sm px-6 py-3 bg-accent text-foreground rounded-full hover:bg-hover hover:text-accent transition-all"
          >
            Enter the Lab
          </Link>
        </div>

        {/* Desktop: compact hero with bento peeking up from below */}
        <div className="relative hidden md:block">
          <div className="text-center px-6 pt-32 pb-12 lg:pt-36 lg:pb-16">
            <h1
              className="font-sans font-medium md:text-4xl lg:text-5xl xl:text-6xl leading-tight"
            >
              We bring striking visions
              <br />
              out of the shadows.
            </h1>
            <p className="font-mono text-foreground/70 mt-5 text-sm lg:text-base">
              Concept, production, and growth for upscale brands.
            </p>
            <Link
              href="/work"
              className="inline-block mt-7 font-mono text-sm px-8 py-3 bg-accent text-foreground rounded-full hover:bg-hover hover:text-accent transition-all"
            >
              Enter the Lab
            </Link>
          </div>

          <MixedMediaBento items={bentoItems} />
        </div>

        {/* Mobile bento grid (no sticky overlay) */}
        <div className="md:hidden">
          <MixedMediaBento items={bentoItems} />
        </div>
      </section>

      {/* Client Ticker */}
      <ClientTicker />

      {/* Manifesto */}
      <section className="px-6 py-20 md:py-32 max-w-5xl mx-auto">
        <AnimatedText
          text="Sombra is a creative and production lab in Barcelona dedicated to crafting impactful visual identities. We specialize in creating and producing high-quality videos and photography that fuses Beauty, innovation and purpose-driven storytelling."
          as="p"
          className="font-mono text-lg md:text-xl lg:text-2xl leading-relaxed text-foreground/80"
        />
      </section>

      {/* Featured Work */}
      <section className="px-6 pb-20 md:pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-sans font-medium text-2xl md:text-3xl">
              Featured Work
            </h2>
            <Link
              href="/work"
              className="font-mono text-sm text-foreground/60 hover:text-foreground transition-colors"
            >
              View All Work &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 py-20 md:py-32 text-center border-t border-border">
        <AnimatedText
          text="Ready to create something striking?"
          as="h2"
          className="font-sans font-medium text-2xl md:text-4xl lg:text-5xl justify-center mb-8"
        />
        <Link
          href="/start"
          className="inline-block font-mono text-sm px-8 py-3 bg-accent text-foreground rounded-full hover:bg-hover hover:text-accent transition-all"
        >
          Start a Project
        </Link>
      </section>
    </>
  );
}
