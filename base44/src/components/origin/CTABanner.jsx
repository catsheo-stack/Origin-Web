import React from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";

export default function CTABanner({ title, subtitle, ctaText, ctaLink }) {
  return (
    <section className="bg-accent-navy py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <h2 className="font-heading text-lg md:text-xl font-light text-parchment leading-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1 text-xs md:text-sm text-parchment/60 max-w-lg mx-auto md:mx-0 leading-relaxed font-body">
              {subtitle}
            </p>
          )}
        </div>
        <Link
          to={ctaLink}
          className="inline-block bg-golden text-midnight text-sm font-medium px-6 py-2.5 rounded-full hover:bg-golden/90 transition-colors whitespace-nowrap"
          onClick={() => { base44.analytics.track({ eventName: "cta_clicked", properties: { cta: "banner_cta", page: window.location.pathname } }); }}
        >
          {ctaText}
        </Link>
      </div>
    </section>
  );
}