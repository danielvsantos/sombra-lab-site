"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "https://hub.sombralab.com", label: "Portal", external: true },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-background/80 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Sombra Lab"
              className="h-[25px] md:h-[30px] w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "font-mono text-sm tracking-wide transition-colors",
                  pathname === link.href
                    ? "text-success"
                    : "text-foreground/60 hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/start"
              className={clsx(
                "font-mono text-sm px-5 py-2.5 rounded-full transition-all",
                pathname === "/start"
                  ? "bg-success text-background"
                  : "bg-accent text-foreground hover:bg-hover hover:text-accent"
              )}
            >
              Start a Project
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex flex-col justify-center items-center w-12 h-12 gap-1.5"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-foreground origin-center"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-0.5 bg-foreground"
            />
            <motion.span
              animate={
                menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }
              }
              className="block w-6 h-0.5 bg-foreground origin-center"
            />
          </button>
        </div>
      </nav>

      {/* Mobile overlay - editorial style */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background flex flex-col"
          >
            {/* Spacer for navbar */}
            <div className="h-16 md:h-20" />

            {/* Menu items */}
            <div className="flex-1 flex flex-col justify-center px-8 pb-12">
              <p className="font-mono text-xs text-foreground/40 uppercase tracking-widest mb-8">
                Menu
              </p>
              <nav className="flex flex-col gap-5">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="flex items-baseline gap-5"
                  >
                    <span className="font-mono text-xs text-foreground/30 tabular-nums">
                      0{i + 1}
                    </span>
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={clsx(
                        "font-mono text-2xl tracking-tight transition-colors",
                        pathname === link.href
                          ? "text-success"
                          : "text-foreground hover:text-success"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.08, duration: 0.4 }}
                  className="flex items-baseline gap-5"
                >
                  <span className="font-mono text-xs text-foreground/30 tabular-nums">
                    0{navLinks.length + 1}
                  </span>
                  <Link
                    href="/start"
                    onClick={() => setMenuOpen(false)}
                    className={clsx(
                      "font-mono text-2xl tracking-tight transition-colors",
                      pathname === "/start"
                        ? "text-success"
                        : "text-foreground hover:text-success"
                    )}
                  >
                    Start a Project
                  </Link>
                </motion.div>
              </nav>
            </div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="px-8 pb-10 pt-6 border-t border-border"
            >
              <p className="font-mono text-xs text-foreground/40 uppercase tracking-widest mb-3">
                Get in touch
              </p>
              <a
                href="mailto:patricia@sombralab.com"
                className="font-mono text-sm text-foreground hover:text-success transition-colors block mb-2"
              >
                patricia@sombralab.com
              </a>
              <a
                href="https://www.instagram.com/sombra_lab"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-foreground/60 hover:text-foreground transition-colors"
              >
                Instagram &rarr;
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
