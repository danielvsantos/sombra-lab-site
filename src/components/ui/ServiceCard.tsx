"use client";

import { motion } from "framer-motion";

interface ServiceCardProps {
  title: string;
  description: string;
  index: number;
}

export default function ServiceCard({
  title,
  description,
  index,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="border border-border rounded-sm p-8 md:p-10 hover:border-accent transition-colors duration-300 group"
    >
      <h3 className="font-sans font-medium text-xl md:text-2xl mb-4 group-hover:text-success transition-colors">
        {title}
      </h3>
      <p className="font-mono text-sm text-foreground/60 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
