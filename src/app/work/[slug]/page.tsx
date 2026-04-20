import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import AnimatedText from "@/components/ui/AnimatedText";
import MediaGallery, {
  type GalleryItem,
} from "@/components/ui/MediaGallery";
import MuxBackgroundVideo from "@/components/ui/MuxBackgroundVideo";
import { sanityClient } from "@/sanity/lib/client";
import {
  allSlugsQuery,
  allProjectsQuery,
  projectBySlugQuery,
} from "@/sanity/lib/queries";
import type { SanityProject } from "@/sanity/lib/types";
import {
  resolveGalleryItems,
  resolveProjectHero,
  muxPosterUrl,
} from "@/sanity/lib/resolve";
import { heroImageUrl } from "@/sanity/lib/image";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await sanityClient.fetch<{ slug: string }[]>(allSlugsQuery);
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await sanityClient.fetch<SanityProject | null>(
    projectBySlugQuery,
    { slug },
  );
  if (!project) return { title: "Not Found" };
  return {
    title: `${project.title} | Sombra Lab`,
    description: project.brief,
  };
}

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [project, allProjects] = await Promise.all([
    sanityClient.fetch<SanityProject | null>(projectBySlugQuery, { slug }),
    sanityClient.fetch<SanityProject[]>(allProjectsQuery),
  ]);
  if (!project) notFound();

  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : null;

  const hero = resolveProjectHero(project);
  const galleryItems: GalleryItem[] = resolveGalleryItems(project);

  return (
    <div className="pt-28 md:pt-36 pb-20 md:pb-32">
      {/* Back to Work */}
      <div className="px-6 max-w-7xl mx-auto mb-8">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 font-mono text-sm text-foreground/60 hover:text-success transition-colors group"
        >
          <ArrowLeft
            className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
            strokeWidth={1.5}
          />
          Back to Work
        </Link>
      </div>

      {/* Hero */}
      <section className="relative aspect-video md:aspect-[21/9] mx-4 md:mx-6 overflow-hidden rounded-sm mb-12 md:mb-16">
        {hero.kind === "video" ? (
          <MuxBackgroundVideo
            playbackId={hero.src}
            className="w-full h-full"
          />
        ) : hero.src ? (
          <Image
            src={hero.src}
            alt={project.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent pointer-events-none" />
      </section>

      {/* Info bar */}
      <section className="px-6 max-w-5xl mx-auto mb-12 md:mb-16">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="font-mono text-xs uppercase tracking-widest text-success bg-success/10 px-3 py-1 rounded-full">
            {project.category}
          </span>
          {project.services?.map((service) => (
            <span
              key={service}
              className="font-mono text-xs text-foreground/50 border border-border px-3 py-1 rounded-full"
            >
              {service}
            </span>
          ))}
        </div>

        <AnimatedText
          text={project.title}
          as="h1"
          className="font-sans font-medium text-4xl md:text-6xl lg:text-7xl mb-8"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <div>
            <h2 className="font-sans font-medium text-sm uppercase tracking-wider text-foreground/40 mb-3">
              The Brief
            </h2>
            <p className="font-mono text-foreground/80 leading-relaxed">
              {project.brief}
            </p>
          </div>
          {project.instagram && (
            <div>
              <h2 className="font-sans font-medium text-sm uppercase tracking-wider text-foreground/40 mb-3">
                Follow
              </h2>
              <a
                href={`https://instagram.com/${project.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-success hover:text-success/80 transition-colors"
              >
                {project.instagram}
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Gallery */}
      {galleryItems.length > 0 && (
        <section className="px-4 md:px-6 max-w-7xl mx-auto mb-16 md:mb-24">
          <MediaGallery items={galleryItems} />
        </section>
      )}

      {/* Prev/Next navigation */}
      <section className="px-6 max-w-5xl mx-auto border-t border-border pt-12">
        <div className="flex justify-between items-center">
          {prevProject ? (
            <Link href={`/work/${prevProject.slug}`} className="group">
              <p className="font-mono text-xs text-foreground/40 mb-1">
                &larr; Previous
              </p>
              <p className="font-sans font-medium text-lg group-hover:text-success transition-colors">
                {prevProject.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
          {nextProject ? (
            <Link
              href={`/work/${nextProject.slug}`}
              className="group text-right"
            >
              <p className="font-mono text-xs text-foreground/40 mb-1">
                Next &rarr;
              </p>
              <p className="font-sans font-medium text-lg group-hover:text-success transition-colors">
                {nextProject.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>
    </div>
  );
}
