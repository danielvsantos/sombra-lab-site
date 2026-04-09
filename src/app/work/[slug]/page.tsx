import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import AnimatedText from "@/components/ui/AnimatedText";
import MediaGallery from "@/components/ui/MediaGallery";
import { projects } from "@/data/projects";
import { enrichGallery } from "@/data/enrichGallery";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const project = projects.find((p) => p.slug === slug);
    if (!project) return { title: "Not Found" };
    return {
      title: `${project.title} | Sombra Lab`,
      description: project.brief,
    };
  });
}

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  const enrichedGallery = enrichGallery(project);

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
        {project.heroMedia.type === "video" ? (
          <video
            src={project.heroMedia.src}
            poster={project.heroMedia.poster}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <Image
            src={project.heroMedia.src}
            alt={project.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
      </section>

      {/* Info bar */}
      <section className="px-6 max-w-5xl mx-auto mb-12 md:mb-16">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="font-mono text-xs uppercase tracking-widest text-success bg-success/10 px-3 py-1 rounded-full">
            {project.category}
          </span>
          {project.services.map((service) => (
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
        </div>
      </section>

      {/* Gallery */}
      {enrichedGallery.length > 0 && (
        <section className="px-4 md:px-6 max-w-7xl mx-auto mb-16 md:mb-24">
          <MediaGallery items={enrichedGallery} />
        </section>
      )}

      {/* Prev/Next navigation */}
      <section className="px-6 max-w-5xl mx-auto border-t border-border pt-12">
        <div className="flex justify-between items-center">
          {prevProject ? (
            <Link
              href={`/work/${prevProject.slug}`}
              className="group"
            >
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
