import type { Metadata } from "next";
import AnimatedText from "@/components/ui/AnimatedText";
import MultiStepForm from "@/components/form/MultiStepForm";

export const metadata: Metadata = {
  title: "Start a Project | Sombra Lab",
  description:
    "Tell us about your brand, and we will handle the rest.",
};

export default function StartPage() {
  return (
    <div className="pt-28 md:pt-36 pb-20 md:pb-32 px-6">
      <div className="max-w-xl mx-auto">
        <div className="mb-12 md:mb-16">
          <AnimatedText
            text="Let's build something striking."
            as="h1"
            className="font-sans font-medium text-3xl md:text-4xl lg:text-5xl"
          />
          <p className="font-mono text-foreground/60 mt-4 text-sm">
            Tell us about your brand, and we will handle the rest.
          </p>
          <p className="font-mono text-sm text-foreground/40 mt-6">
            Prefer email? Reach us directly at{" "}
            <a
              href="mailto:patricia@sombralab.com"
              className="text-success hover:text-success/80 transition-colors"
            >
              patricia@sombralab.com
            </a>
          </p>
        </div>
        <div className="flex items-center gap-4 mb-10">
          <div className="flex-1 h-px bg-border" />
          <span className="font-mono text-xs text-foreground/30 uppercase tracking-widest">
            or fill in the form
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>
        <MultiStepForm />
      </div>
    </div>
  );
}
