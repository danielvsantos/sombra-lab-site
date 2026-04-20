"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import clsx from "clsx";
import MuxBackgroundVideo, {
  type MuxBackgroundVideoRef,
} from "./MuxBackgroundVideo";

export interface BentoItem {
  playbackId: string;
  aspectRatio: "9:16" | "16:9" | "1:1";
}

interface MixedMediaBentoProps {
  items: BentoItem[];
}

function getSpanClasses(aspectRatio: BentoItem["aspectRatio"]): string {
  switch (aspectRatio) {
    case "9:16":
      return "lg:col-span-1 lg:row-span-2";
    case "16:9":
      return "lg:col-span-2 lg:row-span-1";
    case "1:1":
      return "lg:col-span-1 lg:row-span-1";
  }
}

function getAspectClass(aspectRatio: BentoItem["aspectRatio"]): string {
  switch (aspectRatio) {
    case "9:16":
      return "aspect-[9/16]";
    case "16:9":
      return "aspect-video";
    case "1:1":
      return "aspect-square";
  }
}

/**
 * Scroll-magnet item: plays when the center band of the viewport intersects
 * it; pauses otherwise. Dims + scales down when inactive.
 */
function BentoItemCard({
  item,
  isMiddle,
  isSide,
}: {
  item: BentoItem;
  isMiddle: boolean;
  isSide: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<MuxBackgroundVideoRef>(null);
  const prefersReducedMotion = useReducedMotion();
  // Center band of viewport: videos within this band are "active" (full
  // opacity + playing). Looser margin than a pure center-lock so that items
  // in the initial above-the-fold viewport read as active immediately.
  const isActive = useInView(containerRef, {
    margin: "-15% 0px -15% 0px",
  });

  useEffect(() => {
    if (isActive) videoRef.current?.play();
    else videoRef.current?.pause();
  }, [isActive]);

  return (
    <motion.div
      ref={containerRef}
      className={clsx(
        "relative overflow-hidden rounded-sm",
        getSpanClasses(item.aspectRatio),
        getAspectClass(item.aspectRatio),
        isMiddle && "lg:translate-y-16",
        isSide && "lg:-translate-y-8",
      )}
      animate={
        prefersReducedMotion
          ? {}
          : isActive
            ? { opacity: 1, scale: 1.02 }
            : { opacity: 0.4, scale: 0.95 }
      }
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <MuxBackgroundVideo
        ref={videoRef}
        playbackId={item.playbackId}
        className="w-full h-full"
      />
    </motion.div>
  );
}

export default function MixedMediaBento({ items }: MixedMediaBentoProps) {
  const middleIndex = Math.floor(items.length / 2);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 md:px-6 lg:items-start">
      {items.map((item, i) => {
        const isMiddle = i === middleIndex && items.length === 3;
        const isSide = !isMiddle && items.length === 3;
        return (
          <BentoItemCard
            key={i}
            item={item}
            isMiddle={isMiddle}
            isSide={isSide}
          />
        );
      })}
    </div>
  );
}
