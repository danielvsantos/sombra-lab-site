"use client";

import { motion } from "framer-motion";
import { Lightbulb, Camera, Shirt, TrendingUp } from "lucide-react";
import { Service } from "@/types";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: Service["icon"];
  index: number;
}

const iconMap = {
  lightbulb: Lightbulb,
  camera: Camera,
  shirt: Shirt,
  "trending-up": TrendingUp,
};

export default function ServiceCard({
  title,
  description,
  icon,
  index,
}: ServiceCardProps) {
  const Icon = iconMap[icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="border border-border rounded-sm p-8 md:p-10 hover:border-accent transition-colors duration-300 group"
    >
      <Icon
        className="w-7 h-7 mb-6 text-foreground/50 group-hover:text-success transition-colors"
        strokeWidth={1.5}
      />
      <h3 className="font-sans font-medium text-xl md:text-2xl mb-4 group-hover:text-success transition-colors">
        {title}
      </h3>
      <p className="font-mono text-sm text-foreground/60 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
