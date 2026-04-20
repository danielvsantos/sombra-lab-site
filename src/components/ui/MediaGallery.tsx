"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Play } from "lucide-react";
import VideoLightbox from "./VideoLightbox";
import MuxBackgroundVideo, {
  type MuxBackgroundVideoRef,
} from "./MuxBackgroundVideo";
import { muxPosterUrl } from "@/sanity/lib/resolve";
import clsx from "clsx";

type Aspect = "vertical" | "horizontal" | "square";

export interface GalleryItem {
  kind: "image" | "video";
  // Image fields
  src?: string;
  alt?: string;
  lqip?: string;
  // Video fields
  playbackId?: string;
  poster?: string;
}

function GalleryVideo({
  playbackId,
  onExpand,
}: {
  playbackId: string;
  onExpand: () => void;
}) {
  const ref = useRef<MuxBackgroundVideoRef>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "-15% 0px" });

  useEffect(() => {
    if (isInView) ref.current?.play();
    else ref.current?.pause();
  }, [isInView]);

  return (
    <div ref={containerRef} className="relative w-full h-full group">
      <MuxBackgroundVideo
        ref={ref}
        playbackId={playbackId}
        className="w-full h-full"
      />
      {/* Poster stays visible until video plays (covers the Mux player's brief black frame) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={muxPosterUrl(playbackId)}
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-0 transition-opacity"
        aria-hidden
      />
      <button
        onClick={onExpand}
        className="absolute inset-0 flex items-center justify-center bg-background/0 hover:bg-background/30 transition-colors"
        aria-label="Open video with audio"
      >
        <span className="w-14 h-14 rounded-full bg-background/60 backdrop-blur-sm border border-foreground/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Play
            className="w-5 h-5 ml-0.5"
            strokeWidth={1.5}
            fill="currentColor"
          />
        </span>
      </button>
    </div>
  );
}

function GalleryImage({
  src,
  alt,
  lqip,
}: {
  src: string;
  alt?: string;
  lqip?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt ?? ""}
      fill
      placeholder={lqip ? "blur" : "empty"}
      blurDataURL={lqip}
      className="object-cover rounded-sm"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
}

function getGridSpanClass(aspect: Aspect): string {
  switch (aspect) {
    case "vertical":
      return "md:row-span-2 md:col-span-1";
    case "horizontal":
      return "md:col-span-2 md:row-span-1";
    case "square":
      return "md:col-span-1 md:row-span-1";
  }
}

function getAspectClass(aspect: Aspect): string {
  switch (aspect) {
    case "vertical":
      return "aspect-[3/4]";
    case "horizontal":
      return "aspect-video";
    case "square":
      return "aspect-square";
  }
}

/**
 * Guess an aspect ratio for a Mux video using its playback_id.
 * Mux stores aspect_ratio in asset.data — we didn't thread it all the way
 * here. For now default every video to "vertical" since almost all the raw
 * footage is 9:16 or 2:3. If needed we can enrich later.
 */
function inferAspect(_item: GalleryItem): Aspect {
  return "vertical";
}

export default function MediaGallery({ items }: { items: GalleryItem[] }) {
  const [lightboxId, setLightboxId] = useState<string | null>(null);

  if (items.length === 0) return null;

  return (
    <>
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
        style={{ gridAutoFlow: "dense" }}
      >
        {items.map((item, i) => {
          const aspect = inferAspect(item);
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: (i % 6) * 0.05 }}
              className={clsx(
                "relative overflow-hidden rounded-sm",
                getGridSpanClass(aspect),
                getAspectClass(aspect),
              )}
            >
              {item.kind === "video" && item.playbackId ? (
                <GalleryVideo
                  playbackId={item.playbackId}
                  onExpand={() => setLightboxId(item.playbackId!)}
                />
              ) : item.kind === "image" && item.src ? (
                <GalleryImage src={item.src} alt={item.alt} lqip={item.lqip} />
              ) : null}
            </motion.div>
          );
        })}
      </div>

      <VideoLightbox
        playbackId={lightboxId}
        onClose={() => setLightboxId(null)}
      />
    </>
  );
}
