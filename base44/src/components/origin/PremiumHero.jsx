import React from "react";
import JourneyDropdown from "./JourneyDropdown";

const HERO_IMG = "https://media.base44.com/images/public/6a4b6a4d876af717f7025909/b83fb0775_generated_500ee129.png";

export default function PremiumHero() {
  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden bg-parchment">
      <img
        src={HERO_IMG}
        alt="Premium Melbourne property interior with warm natural light, modern kitchen and living area with large windows"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pt-28 md:pt-32 pb-32 md:pb-28">
        <div className="max-w-xl">
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-golden mb-5">
            Origin Property Concierge
          </p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-midnight leading-[1.05] tracking-tight">
            Your Goal,<br />Our Priority.
          </h1>
          <p className="mt-6 text-base md:text-lg text-midnight/70 leading-relaxed font-body max-w-lg">
            Connecting you with trusted professionals for every stage of your property journey.
          </p>
          <p className="mt-3 text-sm text-midnight/50 leading-relaxed font-body max-w-lg">
            Whether you're buying, selling, investing, leasing or settling, Origin Concierge helps you move forward with confidence through one connected property ecosystem.
          </p>
          <JourneyDropdown />
        </div>
      </div>

    </section>
  );
}