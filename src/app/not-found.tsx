import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="font-sans font-medium text-6xl md:text-8xl mb-4">404</h1>
        <p className="font-mono text-foreground/60 mb-8">
          Lost in the shadows.
        </p>
        <Link
          href="/"
          className="font-mono text-sm px-6 py-3 bg-accent text-foreground rounded-full hover:bg-hover hover:text-accent transition-all"
        >
          Back to Light
        </Link>
      </div>
    </div>
  );
}
