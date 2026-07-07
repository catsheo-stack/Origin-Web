import React from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";

export default function CTABanner({ title, subtitle, ctaText, ctaLink }) {
  return (
    <section className="bg-accent-navy py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
        <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-light text-parchment leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-4 text-sm md:text-base text-parchment/60 max-w-lg mx-auto leading-relaxed font-body">
            {subtitle}
          </p>
        )}
        <Link
          to={ctaLink}
          className="inline-block mt-8 bg-golden text-midnight text-sm font-medium px-8 py-3.5 rounded-full hover:bg-golden/90 transition-colors"
          onClick={() => { base44.analytics.track({ eventName: "cta_clicked", properties: { cta: "banner_cta", page: window.location.pathname } }); }}
        >
          {ctaText}
        </Link>
      </div>
    </section>
  );
}