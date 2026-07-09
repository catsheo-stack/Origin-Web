import React from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";

/**
 * Reusable hero for Origin Tools.
 * primaryCta.href starting with "#" renders an in-page anchor; otherwise a route Link.
 */
export default function ToolHero({ eyebrow = "Origin Tools", title, subtitle, intro, primaryCta, secondaryCta }) {
  const track = (key) => () => key && base44.analytics.track({ eventName: "cta_clicked", properties: { cta: key } });
  const primaryIsAnchor = primaryCta && primaryCta.href.startsWith("#");
  const PrimaryEl = primaryIsAnchor ? "a" : Link;
  const primaryProps = primaryIsAnchor ? { href: primaryCta.href } : { to: primaryCta.href };

  return (
    <section className="bg-parchment pt-28 md:pt-36 pb-12 md:pb-16">
      <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-golden mb-3">{eyebrow}</p>
        <h1 className="font-heading text-3xl md:text-5xl font-light text-midnight leading-tight mb-4">{title}</h1>
        <p className="text-base md:text-lg text-midnight/70 mb-3 leading-relaxed">{subtitle}</p>
        {intro && <p className="text-sm text-midnight/50 leading-relaxed max-w-xl mx-auto mb-8">{intro}</p>}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {primaryCta && (
            <PrimaryEl {...primaryProps} className="inline-block bg-golden text-midnight text-sm font-medium px-7 py-3 rounded-full hover:bg-golden/90 transition-colors" onClick={track(primaryCta.analyticsKey)}>
              {primaryCta.label}
            </PrimaryEl>
          )}
          {secondaryCta && (
            <Link to={secondaryCta.href} className="inline-block border border-midnight/20 text-midnight text-sm font-medium px-7 py-3 rounded-full hover:bg-midnight/5 transition-colors" onClick={track(secondaryCta.analyticsKey)}>
              {secondaryCta.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}