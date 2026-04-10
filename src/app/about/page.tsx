import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AnimatedText from "@/components/ui/AnimatedText";
import { founders, collaborators } from "@/data/about";

export const metadata: Metadata = {
  title: "About | Sombra Lab",
  description:
    "Meet the founders behind Sombra Lab \u2014 a creative and production lab in Barcelona crafting impactful visual identities for upscale brands.",
};

export default function AboutPage() {
  return (
    <div className="pt-28 md:pt-36 pb-20 md:pb-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-20 md:mb-32">
          <p className="font-mono text-xs uppercase tracking-widest text-foreground/40 mb-4">
            About
          </p>
          <AnimatedText
            text="The people behind the lens."
            as="h1"
            className="font-sans font-medium text-3xl md:text-5xl lg:text-6xl"
          />
        </div>

        {/* Founders — alternating editorial layout */}
        <section className="mb-24 md:mb-40">
          <h2 className="font-mono text-xs uppercase tracking-widest text-foreground/40 mb-16">
            Founders
          </h2>
          <div className="flex flex-col gap-24 md:gap-32">
            {founders.map((founder, index) => {
              const isReversed = index % 2 === 1;
              return (
                <div
                  key={founder.name}
                  className={`grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center ${
                    isReversed ? "md:[direction:rtl]" : ""
                  }`}
                >
                  {/* Photo */}
                  {founder.photo && (
                    <div className="md:col-span-4 md:[direction:ltr]">
                      <div className="relative aspect-[3/4] max-w-[320px] overflow-hidden rounded-sm bg-foreground/5">
                        <Image
                          src={founder.photo}
                          alt={founder.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 40vw"
                        />
                      </div>
                    </div>
                  )}

                  {/* Bio */}
                  <div className="md:col-span-8 md:[direction:ltr] md:px-4 lg:px-8">
                    <p className="font-mono text-xs uppercase tracking-widest text-success mb-3">
                      {founder.role}
                    </p>
                    <h3 className="font-sans font-medium text-3xl md:text-4xl lg:text-5xl mb-6">
                      {founder.name}
                    </h3>
                    <p className="font-mono text-sm md:text-base text-foreground/70 leading-relaxed">
                      {founder.bio}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Collaborators */}
        {collaborators.length > 0 && (
          <section className="mb-24 md:mb-32 border-t-2 border-accent/30 pt-20 md:pt-28">
            <p className="font-mono text-xs uppercase tracking-widest text-foreground/40 mb-2">
              Our extended team
            </p>
            <h2 className="font-sans font-medium text-2xl md:text-3xl mb-14">
              Collaborators
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {collaborators.map((collab) => (
                <div key={collab.name} className="group">
                  {collab.photo && (
                    <div className="relative aspect-[3/4] mb-5 overflow-hidden rounded-sm bg-foreground/5">
                      <Image
                        src={collab.photo}
                        alt={collab.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <h3 className="font-sans font-medium text-xl mb-1">
                    {collab.name}
                  </h3>
                  {collab.role && (
                    <p className="font-mono text-xs text-foreground/50 uppercase tracking-wider">
                      {collab.role}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="text-center border-t border-border pt-16 md:pt-24">
          <AnimatedText
            text="Let's work together."
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
