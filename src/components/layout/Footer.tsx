import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative border-t border-border overflow-hidden">
      {/* Backdrop texture */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: "url(/assets/backdrop.jpg)",
          backgroundSize: "400px",
          backgroundRepeat: "repeat",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <Image
              src="/logo.png"
              alt="Sombra Lab"
              width={576}
              height={156}
              className="h-8 w-auto mb-4"
            />
            <p className="font-mono text-sm text-foreground/60 max-w-xs">
              Creative and production lab in Barcelona dedicated to crafting
              impactful visual identities.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-sans font-medium text-sm uppercase tracking-wider mb-4 text-foreground/40">
              Navigation
            </h4>
            <nav className="flex flex-col gap-3">
              <Link
                href="/work"
                className="font-mono text-sm text-foreground/60 hover:text-foreground transition-colors"
              >
                Work
              </Link>
              <Link
                href="/services"
                className="font-mono text-sm text-foreground/60 hover:text-foreground transition-colors"
              >
                Services
              </Link>
              <Link
                href="/start"
                className="font-mono text-sm text-foreground/60 hover:text-foreground transition-colors"
              >
                Start a Project
              </Link>
              <a
                href="https://hub.sombralab.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-foreground/60 hover:text-foreground transition-colors"
              >
                Sombra Hub Login
              </a>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans font-medium text-sm uppercase tracking-wider mb-4 text-foreground/40">
              Contact
            </h4>
            <div className="flex flex-col gap-3">
              <p className="font-mono text-sm text-foreground/60">
                Barcelona, Spain
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="font-mono text-sm text-foreground/60 hover:text-foreground transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="#"
                  className="font-mono text-sm text-foreground/60 hover:text-foreground transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-foreground/40">
            &copy; 2026 Sombra Lab. Out of the shadows.
          </p>
        </div>
      </div>
    </footer>
  );
}
