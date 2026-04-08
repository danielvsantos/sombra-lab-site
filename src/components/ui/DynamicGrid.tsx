"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Project, FilterCategory } from "@/types";
import FilterPill from "./FilterPill";
import ProjectCard from "./ProjectCard";
import clsx from "clsx";

interface DynamicGridProps {
  projects: Project[];
}

const filters: { label: string; value: FilterCategory }[] = [
  { label: "All", value: "all" },
  { label: "Gastronomy", value: "gastronomy" },
  { label: "Beauty", value: "beauty" },
  { label: "Fashion", value: "fashion" },
];

export default function DynamicGrid({ projects }: DynamicGridProps) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <>
      {/* Filter pills — horizontal scroll on mobile */}
      <div className="flex gap-3 overflow-x-auto pb-2 mb-10 md:mb-12 scrollbar-hide snap-x snap-mandatory md:snap-none md:overflow-visible">
        {filters.map((filter) => (
          <div key={filter.value} className="snap-start">
            <FilterPill
              label={filter.label}
              active={activeFilter === filter.value}
              onClick={() => setActiveFilter(filter.value)}
            />
          </div>
        ))}
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                duration: 0.35,
                layout: { duration: 0.4 },
              }}
              className={clsx(
                "w-full",
                project.coverAspect === "vertical" && "lg:row-span-2",
                project.coverAspect === "horizontal" && "lg:col-span-2"
              )}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <p className="font-mono text-sm text-foreground/40 text-center py-20">
          No projects in this category yet.
        </p>
      )}
    </>
  );
}
