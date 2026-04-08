"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import clsx from "clsx";

interface AnimatedTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  once?: boolean;
}

export default function AnimatedText({
  text,
  as: Tag = "p",
  className,
  style,
  delay = 0,
  once = true,
}: AnimatedTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-100px 0px" });
  const prefersReducedMotion = useReducedMotion();

  const words = text.split(" ");

  if (prefersReducedMotion) {
    return <Tag className={className} style={style}>{text}</Tag>;
  }

  return (
    <Tag className={clsx("flex flex-wrap", className)} style={style} ref={ref as never}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block mr-[0.3em]">
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            animate={isInView ? { y: 0 } : { y: "100%" }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + i * 0.04,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
