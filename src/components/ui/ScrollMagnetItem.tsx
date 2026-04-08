"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface ScrollMagnetItemProps {
  src: string;
  poster?: string;
  className?: string;
}

export default function ScrollMagnetItem({
  src,
  poster,
  className,
}: ScrollMagnetItemProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const isInView = useInView(containerRef, {
    margin: "-40% 0px -40% 0px",
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isInView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isInView]);

  return (
    <motion.div
      ref={containerRef}
      className={`relative overflow-hidden rounded-sm ${className ?? ""}`}
      animate={
        prefersReducedMotion
          ? {}
          : isInView
            ? { opacity: 1, scale: 1.02 }
            : { opacity: 0.4, scale: 0.95 }
      }
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
}
