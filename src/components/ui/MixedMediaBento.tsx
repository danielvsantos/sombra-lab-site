"use client";

import { MediaItem } from "@/types";
import ScrollMagnetItem from "./ScrollMagnetItem";
import clsx from "clsx";

interface MixedMediaBentoProps {
  items: MediaItem[];
}

function getSpanClasses(aspectRatio: MediaItem["aspectRatio"]): string {
  switch (aspectRatio) {
    case "9:16":
      return "lg:col-span-1 lg:row-span-2";
    case "16:9":
      return "lg:col-span-2 lg:row-span-1";
    case "1:1":
      return "lg:col-span-1 lg:row-span-1";
  }
}

function getAspectClass(aspectRatio: MediaItem["aspectRatio"]): string {
  switch (aspectRatio) {
    case "9:16":
      return "aspect-[9/16]";
    case "16:9":
      return "aspect-video";
    case "1:1":
      return "aspect-square";
  }
}

export default function MixedMediaBento({ items }: MixedMediaBentoProps) {
  // Identify the middle item index (when there are 3 items in a row, this is index 1)
  const middleIndex = Math.floor(items.length / 2);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 md:px-6 lg:items-start">
      {items.map((item, i) => {
        const isMiddle = i === middleIndex && items.length === 3;
        const isSide = !isMiddle && items.length === 3;
        return (
          <div
            key={i}
            className={clsx(
              getSpanClasses(item.aspectRatio),
              getAspectClass(item.aspectRatio),
              isMiddle && "lg:translate-y-16",
              isSide && "lg:-translate-y-8"
            )}
          >
            <ScrollMagnetItem
              src={item.src}
              poster={item.poster}
              className="w-full h-full"
            />
          </div>
        );
      })}
    </div>
  );
}
