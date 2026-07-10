import React from "react";
import JourneyDropdown from "./JourneyDropdown";

const HERO_IMG =
  "https://media.base44.com/images/public/6a4b6a4d876af717f7025909/b83fb0775_generated_500ee129.png";

export default function PremiumHero() {
  return (
    <section className="relative w-full min-h-screen flex items-center overflow-visible md:overflow-hidden bg-parchment">
      {/* Background Image */}
      <img
        src={HERO_IMG}
        alt="Premium Melbourne property interior with warm natural light, modern kitchen and living area with large windows"
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pt-28 md:pt-32 pb-40 md:pb-28">
        <div className="max-w-xl">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-golden">
            Origin Property Concierge
          </p>

          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] tracking-tight text-midnight">
            Your Goal,
            <br />
            Our Priority.
          </h1>

          <p className="mt-6 max-w-lg text-base md:text-lg leading-relaxed text-midnight/70">
            Connecting you with trusted professionals for every stage of your
            property journey.
          </p>

          <p className="mt-3 max-w-lg text-sm leading-relaxed text-midnight/50">
            Whether you're buying, selling, investing, leasing or settling,
            Origin Concierge helps you move forward with confidence through one
            connected property ecosystem.
          </p>

          {/* Journey Button */}
          <JourneyDropdown />
        </div>
      </div>
    </section>
  );
}