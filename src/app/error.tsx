"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="font-sans font-medium text-4xl md:text-5xl mb-4">
          Something went wrong
        </h1>
        <p className="font-mono text-foreground/60 mb-8">
          An unexpected error occurred.
        </p>
        <button
          onClick={reset}
          className="font-mono text-sm px-6 py-3 bg-accent text-foreground rounded-full hover:bg-hover hover:text-accent transition-all"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
