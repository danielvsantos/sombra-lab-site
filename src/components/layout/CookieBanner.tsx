"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "sombra-cookie-consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      // Show after a short delay to avoid layout flicker on initial paint
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  }

  function handleDecline() {
    localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border"
        >
          <div className="mx-auto max-w-7xl px-6 py-5 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
            <p className="font-mono text-xs md:text-sm text-foreground/70 flex-1">
              We use cookies to enhance your experience on this site. By
              continuing to browse, you agree to our use of cookies.
            </p>
            <div className="flex gap-3 w-full md:w-auto">
              <button
                onClick={handleDecline}
                className="font-mono text-xs md:text-sm px-5 py-2.5 rounded-full border border-border text-foreground/60 hover:text-foreground hover:border-hover transition-all flex-1 md:flex-initial min-h-[44px]"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="font-mono text-xs md:text-sm px-5 py-2.5 rounded-full bg-accent text-foreground hover:bg-hover hover:text-accent transition-all flex-1 md:flex-initial min-h-[44px]"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
