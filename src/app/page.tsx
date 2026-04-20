import Link from "next/link";
import AnimatedText from "@/components/ui/AnimatedText";
import MixedMediaBento, {
  type BentoItem,
} from "@/components/ui/MixedMediaBento";
import ClientTicker from "@/components/ui/ClientTicker";
import ProjectCard from "@/components/ui/ProjectCard";
import { sanityClient } from "@/sanity/lib/client";
import {
  allProjectsQuery,
  homepageMediaQuery,
} from "@/sanity/lib/queries";
import type {
  SanityProject,
  SanityHomepageMedia,
} from "@/sanity/lib/types";
import { muxPlaybackId } from "@/sanity/lib/resolve";

export const revalidate = 60;

// Featured work is rendered in the order Patricia sets in Studio (via the
// `order` field), but only items with `featured: true` appear here.
// If she wants a specific visual rhythm (photo/video interleaving), she
// adjusts order values in Studio.

export default async function Home() {
  const [projects, homepageMedia] = await Promise.all([
    sanityClient.fetch<SanityProject[]>(allProjectsQuery),
    sanityClient.fetch<SanityHomepageMedia | null>(homepageMediaQuery),
  ]);

  const featuredProjects = projects.filter((p) => p.featured);

  const bentoItems: BentoItem[] = (homepageMedia?.videos ?? [])
    .map((v) => {
      const playbackId = muxPlaybackId(v.video);
      if (!playbackId) return null;
      return { playbackId, aspectRatio: v.aspectRatio };
    })
    .filter((v): v is BentoItem => v !== null);

  return (
    <>
      {/* Hero: Bento Grid */}
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

        {/* Desktop: two-column hero (logo left, text right) with bento below */}
        <div className="relative hidden md:block">
          <div className="px-6 lg:px-12 pt-32 pb-10 lg:pt-36 lg:pb-14 max-w-7xl mx-auto">
            <div className="grid grid-cols-12 gap-8 items-center">
              <div className="col-span-5 lg:col-span-4 flex items-center justify-start">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.png"
                  alt="Sombra Lab"
                  className="w-full max-w-[260px] lg:max-w-[300px] h-auto"
                />
              </div>
              <div className="col-span-7 lg:col-span-8">
                <h1 className="font-sans font-medium text-3xl lg:text-4xl xl:text-5xl leading-tight">
                  We bring striking visions
                  <br />
                  out of the shadows.
                </h1>
                <p className="font-mono text-foreground/70 mt-4 text-sm lg:text-base">
                  Concept, production, and growth for upscale brands.
                </p>
              </div>
            </div>
            <div className="text-center mt-10">
              <Link
                href="/work"
                className="inline-block font-mono text-sm px-8 py-3 bg-accent text-foreground rounded-full hover:bg-hover hover:text-accent transition-all"
              >
                Enter the Lab
              </Link>
            </div>
          </div>

          {bentoItems.length > 0 && <MixedMediaBento items={bentoItems} />}
        </div>

        {/* Mobile bento grid */}
        <div className="md:hidden">
          {bentoItems.length > 0 && <MixedMediaBento items={bentoItems} />}
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
      {featuredProjects.length > 0 && (
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
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          </div>
        </section>
      )}

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
