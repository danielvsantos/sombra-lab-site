"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import MuxPlayer from "@mux/mux-player-react/lazy";

interface VideoLightboxProps {
  playbackId: string | null;
  onClose: () => void;
}

export default function VideoLightbox({
  playbackId,
  onClose,
}: VideoLightboxProps) {
  const stableOnClose = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    if (playbackId) {
      document.body.style.overflow = "hidden";
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") stableOnClose();
      };
      window.addEventListener("keydown", handleEscape);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleEscape);
      };
    }
  }, [playbackId, stableOnClose]);

  return (
    <AnimatePresence>
      {playbackId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          onClick={stableOnClose}
        >
          {/* Close button */}
          <button
            onClick={stableOnClose}
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
            <MuxPlayer
              key={playbackId}
              playbackId={playbackId}
              streamType="on-demand"
              autoPlay
              muted={false}
              playsInline
              style={{
                maxWidth: "100%",
                maxHeight: "85vh",
                aspectRatio: "16 / 9",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
