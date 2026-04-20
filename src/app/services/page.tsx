import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AnimatedText from "@/components/ui/AnimatedText";
import ServiceCard from "@/components/ui/ServiceCard";
import { sanityClient } from "@/sanity/lib/client";
import { servicesQuery } from "@/sanity/lib/queries";
import type { SanityService } from "@/sanity/lib/types";
import { sombraHub } from "@/data/services";

export const metadata: Metadata = {
  title: "Services | Sombra Lab",
  description:
    "Comprehensive creative and operational support for the modern brand.",
};

export const revalidate = 60;

export default async function ServicesPage() {
  const services = await sanityClient.fetch<SanityService[]>(servicesQuery);

  return (
    <div className="pt-28 md:pt-36 pb-20 md:pb-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16 md:mb-24">
          <AnimatedText
            text="What we do"
            as="h1"
            className="font-sans font-medium text-3xl md:text-5xl lg:text-6xl"
          />
          <p className="font-mono text-foreground/60 mt-4 text-sm md:text-base">
            Comprehensive creative and operational support for the modern brand.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24 md:mb-32">
          {services.map((service, i) => (
            <ServiceCard
              key={service._id}
              title={service.title}
              description={service.description}
              icon={service.icon}
              index={i}
            />
          ))}
        </div>

        {/* Sombra Hub — stays hardcoded; it's a product marketing section, not client content */}
        <section className="border border-accent/30 bg-accent/5 rounded-sm p-8 md:p-12 lg:p-16 mb-24 md:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-success mb-4">
                Client Portal
              </p>
              <h2 className="font-sans font-medium text-3xl md:text-4xl mb-6">
                {sombraHub.title}
              </h2>
              <p className="font-mono text-sm text-foreground/70 leading-relaxed">
                {sombraHub.description}
              </p>
            </div>
            <div className="space-y-4">
              <div className="relative aspect-video rounded-sm overflow-hidden">
                <Image
                  src="/assets/services/sombrahubdashboard.png"
                  alt="Sombra Hub Dashboard"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="relative aspect-video rounded-sm overflow-hidden">
                <Image
                  src="/assets/services/sombrahubcalendar.png"
                  alt="Sombra Hub Calendar"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="text-center">
          <AnimatedText
            text="Ready to start?"
            as="h2"
            className="font-sans font-medium text-2xl md:text-4xl justify-center mb-8"
          />
          <Link
            href="/start"
            className="inline-block font-mono text-sm px-8 py-3 bg-accent text-foreground rounded-full hover:bg-hover hover:text-accent transition-all"
          >
            Start a Project
          </Link>
        </section>
      </div>
    </div>
  );
}
