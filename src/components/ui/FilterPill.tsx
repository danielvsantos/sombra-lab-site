"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

interface FilterPillProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export default function FilterPill({ label, active, onClick }: FilterPillProps) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      className={clsx(
        "font-mono text-sm px-5 py-2.5 rounded-full border transition-all duration-300 whitespace-nowrap min-h-[48px]",
        active
          ? "bg-accent text-foreground border-accent"
          : "bg-transparent text-foreground/60 border-border hover:border-hover hover:text-foreground"
      )}
    >
      {label}
    </motion.button>
  );
}
