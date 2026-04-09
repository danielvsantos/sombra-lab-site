"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface VideoLightboxProps {
  src: string | null;
  poster?: string;
  onClose: () => void;
}

export default function VideoLightbox({
  src,
  poster,
  onClose,
}: VideoLightboxProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (src) {
      document.body.style.overflow = "hidden";
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleEscape);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleEscape);
      };
    }
  }, [src, onClose]);

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center rounded-full border border-border hover:border-hover transition-colors"
            aria-label="Close video"
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>

          {/* Video */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-w-6xl w-full max-h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={src}
              poster={poster}
              autoPlay
              controls
              playsInline
              className="max-w-full max-h-[85vh] rounded-sm"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
