"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Play } from "lucide-react";
import VideoLightbox from "./VideoLightbox";
import clsx from "clsx";

type Aspect = "vertical" | "horizontal" | "square";

interface GalleryItem {
  type: "image" | "video";
  src: string;
  poster?: string;
  alt?: string;
  aspectRatio?: Aspect;
}

function GalleryVideo({
  src,
  poster,
  onExpand,
}: {
  src: string;
  poster?: string;
  onExpand: () => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "-15% 0px" });

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (isInView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isInView]);

  return (
    <div ref={containerRef} className="relative w-full h-full group">
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        className="w-full h-full object-cover rounded-sm"
      />
      {/* Click-to-expand button */}
      <button
        onClick={onExpand}
        className="absolute inset-0 flex items-center justify-center bg-background/0 hover:bg-background/30 transition-colors"
        aria-label="Open video with audio"
      >
        <span className="w-14 h-14 rounded-full bg-background/60 backdrop-blur-sm border border-foreground/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Play className="w-5 h-5 ml-0.5" strokeWidth={1.5} fill="currentColor" />
        </span>
      </button>
    </div>
  );
}

function GalleryImage({ src, alt }: { src: string; alt?: string }) {
  return (
    <Image
      src={src}
      alt={alt ?? ""}
      fill
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

export default function MediaGallery({ items }: { items: GalleryItem[] }) {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxPoster, setLightboxPoster] = useState<string | undefined>();

  if (items.length === 0) return null;

  function openLightbox(src: string, poster?: string) {
    setLightboxSrc(src);
    setLightboxPoster(poster);
  }

  function closeLightbox() {
    setLightboxSrc(null);
    setLightboxPoster(undefined);
  }

  return (
    <>
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
        style={{ gridAutoFlow: "dense" }}
      >
        {items.map((item, i) => {
          const aspect = item.aspectRatio ?? "vertical";
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
                getAspectClass(aspect)
              )}
            >
              {item.type === "video" ? (
                <GalleryVideo
                  src={item.src}
                  poster={item.poster}
                  onExpand={() => openLightbox(item.src, item.poster)}
                />
              ) : (
                <GalleryImage src={item.src} alt={item.alt} />
              )}
            </motion.div>
          );
        })}
      </div>

      <VideoLightbox
        src={lightboxSrc}
        poster={lightboxPoster}
        onClose={closeLightbox}
      />
    </>
  );
}
