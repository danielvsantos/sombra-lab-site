"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { submitLeadForm } from "@/app/start/actions";

interface FormData {
  brandName: string;
  contactName: string;
  email: string;
  phone: string;
  industry: string;
  services: string[];
  budget: string;
  brief: string;
}

const initialData: FormData = {
  brandName: "",
  contactName: "",
  email: "",
  phone: "",
  industry: "",
  services: [],
  budget: "",
  brief: "",
};

const serviceOptions = [
  "Creative Direction",
  "Audiovisual Production",
  "Styling",
  "Social Media Management",
  "Full Agency Services",
];

const industryOptions = ["Gastronomy", "Beauty", "Fashion", "Other"];
const budgetOptions = ["\u20AC1k - \u20AC3k", "\u20AC3k - \u20AC6k", "\u20AC6k+"];

const inputClasses =
  "w-full bg-transparent border-b border-border focus:border-accent outline-none py-3 font-mono text-foreground placeholder:text-foreground/30 text-base transition-colors";

const selectClasses =
  "w-full bg-background border-b border-border focus:border-accent outline-none py-3 font-mono text-foreground text-base transition-colors appearance-none cursor-pointer";

const totalSteps = 3;

export default function MultiStepForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function updateField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  function toggleService(service: string) {
    setData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  }

  function canAdvance(): boolean {
    switch (step) {
      case 0:
        // Step 1: brand name, contact name, email required; phone optional
        return (
          data.brandName.trim().length > 0 &&
          data.contactName.trim().length > 0 &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
        );
      case 1:
        // Step 2: industry, services, budget all required
        return (
          data.industry.length > 0 &&
          data.services.length > 0 &&
          data.budget.length > 0
        );
      case 2:
        // Step 3: brief required
        return data.brief.trim().length > 0;
      default:
        return false;
    }
  }

  async function handleSubmit() {
    setIsSubmitting(true);
    setError(null);
    const result = await submitLeadForm(data);
    setIsSubmitting(false);
    if (result.success) {
      setIsComplete(true);
    } else {
      setError(result.error ?? "Something went wrong");
    }
  }

  function handleNext() {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  }

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-8"
        >
          <svg
            className="w-8 h-8 text-success"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </motion.div>
        <h2 className="font-sans font-medium text-3xl md:text-4xl mb-4">
          Received.
        </h2>
        <p className="font-mono text-foreground/60 max-w-md mx-auto">
          Your project details have been successfully routed to our internal
          system. We will be in touch shortly to bring your vision out of the
          shadows.
        </p>
      </motion.div>
    );
  }

  // Step content components
  const stepLabels = ["About you", "About the project", "The brief"];

  function renderStep() {
    if (step === 0) {
      return (
        <div className="space-y-8">
          <div>
            <label className="font-mono text-xs text-foreground/40 uppercase tracking-widest mb-2 block">
              Brand name
            </label>
            <input
              type="text"
              value={data.brandName}
              onChange={(e) => updateField("brandName", e.target.value)}
              placeholder="Your brand"
              className={inputClasses}
              autoFocus
            />
          </div>
          <div>
            <label className="font-mono text-xs text-foreground/40 uppercase tracking-widest mb-2 block">
              Your name
            </label>
            <input
              type="text"
              value={data.contactName}
              onChange={(e) => updateField("contactName", e.target.value)}
              placeholder="Contact name or role"
              className={inputClasses}
            />
          </div>
          <div>
            <label className="font-mono text-xs text-foreground/40 uppercase tracking-widest mb-2 block">
              Email
            </label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="email@example.com"
              className={inputClasses}
            />
          </div>
          <div>
            <label className="font-mono text-xs text-foreground/40 uppercase tracking-widest mb-2 block">
              Phone <span className="text-foreground/30 normal-case">(optional)</span>
            </label>
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="+34 600 000 000"
              className={inputClasses}
            />
          </div>
        </div>
      );
    }

    if (step === 1) {
      return (
        <div className="space-y-10">
          <div>
            <label className="font-mono text-xs text-foreground/40 uppercase tracking-widest mb-2 block">
              Industry
            </label>
            <select
              value={data.industry}
              onChange={(e) => updateField("industry", e.target.value)}
              className={selectClasses}
            >
              <option value="" disabled>
                Select industry
              </option>
              {industryOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-mono text-xs text-foreground/40 uppercase tracking-widest mb-3 block">
              Services needed
            </label>
            <div className="flex flex-wrap gap-3">
              {serviceOptions.map((service) => (
                <button
                  key={service}
                  type="button"
                  onClick={() => toggleService(service)}
                  className={`font-mono text-sm px-5 py-2.5 rounded-full border transition-all min-h-[48px] ${
                    data.services.includes(service)
                      ? "bg-accent text-foreground border-accent"
                      : "bg-transparent text-foreground/60 border-border hover:border-hover"
                  }`}
                >
                  {service}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="font-mono text-xs text-foreground/40 uppercase tracking-widest mb-2 block">
              Budget
            </label>
            <select
              value={data.budget}
              onChange={(e) => updateField("budget", e.target.value)}
              className={selectClasses}
            >
              <option value="" disabled>
                Select budget range
              </option>
              {budgetOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>
      );
    }

    // Step 2: brief
    return (
      <div>
        <label className="font-mono text-xs text-foreground/40 uppercase tracking-widest mb-2 block">
          Tell us about your project
        </label>
        <textarea
          value={data.brief}
          onChange={(e) => updateField("brief", e.target.value)}
          placeholder="What are we building? Goals, timeline, references, anything that helps us understand your vision..."
          rows={8}
          className={`${inputClasses} border rounded-sm p-4 resize-none`}
          autoFocus
        />
      </div>
    );
  }

  return (
    <div>
      {/* Progress bar */}
      <div className="flex gap-2 mb-12">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div key={i} className="flex-1">
            <div className="h-1 rounded-full overflow-hidden bg-border">
              <motion.div
                className="h-full bg-accent"
                initial={{ width: "0%" }}
                animate={{ width: i <= step ? "100%" : "0%" }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p
              className={`font-mono text-xs mt-2 transition-colors ${
                i === step
                  ? "text-foreground"
                  : i < step
                    ? "text-foreground/40"
                    : "text-foreground/20"
              }`}
            >
              0{i + 1} / {stepLabels[i]}
            </p>
          </div>
        ))}
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-12">
        <button
          type="button"
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="font-mono text-sm text-foreground/40 hover:text-foreground disabled:opacity-0 transition-all min-h-[48px] px-4"
        >
          &larr; Back
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={!canAdvance() || isSubmitting}
          className="font-mono text-sm px-8 py-3 bg-accent text-foreground rounded-full hover:bg-hover hover:text-accent transition-all disabled:opacity-30 disabled:cursor-not-allowed min-h-[48px]"
        >
          {isSubmitting
            ? "Sending..."
            : step === totalSteps - 1
              ? "Send to the Lab"
              : "Continue"}
        </button>
      </div>

      {error && (
        <p className="font-mono text-sm text-error mt-4 text-center">
          {error}
        </p>
      )}
    </div>
  );
}
