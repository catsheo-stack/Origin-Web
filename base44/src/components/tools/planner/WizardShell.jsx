import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProgressBar from "@/components/tools/ProgressBar";

/**
 * Wizard container for the Home Buying Planner.
 * Renders step header, progress bar, step content card, and navigation.
 * Mobile: fixed bottom nav bar. Desktop: inline buttons.
 */
export default function WizardShell({ step, totalSteps, stepTitle, stepSubtitle, onBack, onNext, canProceed, isLastStep, onSeeResults, children }) {
  const pct = (step / totalSteps) * 100;

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs tracking-widest uppercase text-golden font-medium">Step {step} of {totalSteps}</p>
          <p className="text-xs text-midnight/40">{Math.round(pct)}% Complete</p>
        </div>
        <ProgressBar value={pct} />
      </div>

      <div className="mb-6">
        <h2 className="font-heading text-2xl md:text-3xl text-midnight mb-1">{stepTitle}</h2>
        {stepSubtitle && <p className="text-sm text-midnight/50">{stepSubtitle}</p>}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-stone/60 p-6 md:p-8 mb-24 md:mb-8">
        {children}
      </div>

      {/* Desktop navigation */}
      <div className="hidden md:flex items-center justify-between print:hidden">
        <button
          onClick={onBack}
          disabled={step === 1}
          className="inline-flex items-center gap-2 border border-midnight/20 text-midnight text-sm font-medium px-7 py-3 rounded-full hover:bg-midnight/5 transition disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ArrowLeft size={15} /> Back
        </button>
        {isLastStep ? (
          <button
            onClick={onSeeResults}
            className="inline-flex items-center gap-2 bg-golden text-midnight text-sm font-medium px-7 py-3 rounded-full hover:bg-golden/90 transition"
          >
            See My Results <ArrowRight size={15} />
          </button>
        ) : (
          <button
            onClick={onNext}
            disabled={!canProceed}
            className="inline-flex items-center gap-2 bg-golden text-midnight text-sm font-medium px-7 py-3 rounded-full hover:bg-golden/90 transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Next <ArrowRight size={15} />
          </button>
        )}
      </div>

      {/* Mobile sticky navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-stone px-4 py-3 print:hidden">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            disabled={step === 1}
            className="flex-1 inline-flex items-center justify-center gap-2 border border-midnight/20 text-midnight text-sm font-medium py-3 rounded-full transition disabled:opacity-30"
          >
            <ArrowLeft size={15} /> Back
          </button>
          {isLastStep ? (
            <button
              onClick={onSeeResults}
              className="flex-[2] inline-flex items-center justify-center gap-2 bg-golden text-midnight text-sm font-medium py-3 rounded-full"
            >
              See Results <ArrowRight size={15} />
            </button>
          ) : (
            <button
              onClick={onNext}
              disabled={!canProceed}
              className="flex-[2] inline-flex items-center justify-center gap-2 bg-golden text-midnight text-sm font-medium py-3 rounded-full transition disabled:opacity-30"
            >
              Next <ArrowRight size={15} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}