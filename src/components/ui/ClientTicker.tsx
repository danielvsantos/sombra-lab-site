import { sanityClient } from "@/sanity/lib/client";
import { groq } from "next-sanity";

// Fetch just the titles in display order — lightweight
const tickerTitlesQuery = groq`
  *[_type == "project"] | order(order asc, title asc) {
    "title": upper(title)
  }
`;

export const revalidate = 60;

export default async function ClientTicker() {
  const rows = await sanityClient.fetch<{ title: string }[]>(tickerTitlesQuery);
  const clients = rows.map((r) => r.title).filter(Boolean);

  if (clients.length === 0) return null;

  const tickerContent = clients.map((c) => `${c} \u2022`).join(" ");

  return (
    <section className="py-8 md:py-12 border-y border-border overflow-hidden">
      <p className="font-mono text-xs text-foreground/40 text-center mb-6 tracking-widest uppercase">
        Trusted by
      </p>
      <div className="relative">
        <div className="flex whitespace-nowrap animate-marquee will-change-transform">
          <span className="font-sans font-medium text-lg md:text-2xl lg:text-3xl tracking-wide text-foreground/60 px-4">
            {tickerContent}
          </span>
          <span className="font-sans font-medium text-lg md:text-2xl lg:text-3xl tracking-wide text-foreground/60 px-4">
            {tickerContent}
          </span>
        </div>
      </div>
    </section>
  );
}
