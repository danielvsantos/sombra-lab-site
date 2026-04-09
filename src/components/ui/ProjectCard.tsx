"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(containerRef, { margin: "-20% 0px" });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isInView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isInView]);

  const aspectClass =
    project.coverAspect === "horizontal"
      ? "aspect-video"
      : "aspect-[3/4]";

  return (
    <Link href={`/work/${project.slug}`} className="block w-full">
      <motion.div
        ref={containerRef}
        className={`group relative w-full ${aspectClass} overflow-hidden rounded-sm bg-foreground/5`}
        whileHover={{ scale: 0.98 }}
        transition={{ duration: 0.3 }}
      >
        {project.coverVideo ? (
          <video
            ref={videoRef}
            src={project.coverVideo}
            poster={project.thumbnail}
            muted
            loop
            playsInline
            preload="none"
            className="w-full h-full object-cover"
          />
        ) : (
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}

        {/* Always-visible label gradient */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-background/90 via-background/40 to-transparent pointer-events-none">
          <p className="font-mono text-xs uppercase tracking-widest text-success mb-1 md:mb-2">
            {project.category}
          </p>
          <h3 className="font-sans text-lg md:text-2xl">{project.title}</h3>
        </div>
      </motion.div>
    </Link>
  );
}
