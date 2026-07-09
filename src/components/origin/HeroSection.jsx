import React from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";

export default function HeroSection({ label, title, titleAccent, subtitle, ctaText, ctaLink, imageUrl }) {
  return (
    <section className="bg-parchment pt-24 md:pt-28 pb-16 md:pb-24 lg:pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            {label && (
              <p className="text-xs font-medium tracking-widest uppercase text-golden mb-5">
                {label}
              </p>
            )}
            <h1 className="font-heading text-4xl md:text-5xl lg:text-[3.5rem] font-light text-midnight leading-[1.1] tracking-tight">
              {title}
              {titleAccent && (
                <>
                  <br />
                  <span className="text-golden">{titleAccent}</span>
                </>
              )}
            </h1>
            {subtitle && (
              <p className="mt-6 text-base md:text-lg text-midnight/60 leading-relaxed max-w-md font-body">
                {subtitle}
              </p>
            )}
            {ctaText && ctaLink && (
              (ctaLink.startsWith("#") || ctaLink.startsWith("http")) ? (
                <a
                  href={ctaLink}
                  {...(ctaLink.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="inline-block mt-8 bg-golden text-midnight text-sm font-medium px-7 py-3.5 rounded-full hover:bg-golden/90 transition-colors"
                  onClick={() => { base44.analytics.track({ eventName: "cta_clicked", properties: { cta: "hero_cta", page: window.location.pathname } }); }}
                >
                  {ctaText}
                </a>
              ) : (
                <Link
                  to={ctaLink}
                  className="inline-block mt-8 bg-golden text-midnight text-sm font-medium px-7 py-3.5 rounded-full hover:bg-golden/90 transition-colors"
                  onClick={() => { base44.analytics.track({ eventName: "cta_clicked", properties: { cta: "hero_cta", page: window.location.pathname } }); }}
                >
                  {ctaText}
                </Link>
              )
            )}
          </div>
          <div className="order-1 lg:order-2">
            <div className="rounded-xl overflow-hidden">
              <img
                src={imageUrl}
                alt="Premium property interior with natural light and modern design"
                className="w-full h-auto object-cover aspect-[4/3] hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}