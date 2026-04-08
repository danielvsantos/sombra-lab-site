"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

interface GalleryItem {
  type: "image" | "video";
  src: string;
  poster?: string;
  alt?: string;
}

function GalleryVideo({ src, poster }: { src: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "-20% 0px" });

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
    <div ref={containerRef} className="relative aspect-video">
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
    </div>
  );
}

function GalleryImage({ src, alt }: { src: string; alt?: string }) {
  return (
    <div className="relative aspect-video">
      <Image
        src={src}
        alt={alt ?? ""}
        fill
        className="object-cover rounded-sm"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 66vw"
      />
    </div>
  );
}

export default function MediaGallery({ items }: { items: GalleryItem[] }) {
  if (items.length === 0) return null;

  return (
    <div className="space-y-4">
      {items.map((item, i) => {
        // Alternating layout: first full-width, next two side-by-side, repeat
        const groupIndex = Math.floor(i / 3);
        const posInGroup = i % 3;
        const isFullWidth = posInGroup === 0;

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: posInGroup * 0.1 }}
            className={isFullWidth ? "w-full" : "md:inline-block md:w-[calc(50%-0.5rem)]"}
            style={
              !isFullWidth
                ? { marginRight: posInGroup === 1 ? "1rem" : 0 }
                : undefined
            }
          >
            {item.type === "video" ? (
              <GalleryVideo src={item.src} poster={item.poster} />
            ) : (
              <GalleryImage src={item.src} alt={item.alt} />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
