import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionWrapper from "@/components/origin/SectionWrapper";

/**
 * Reusable related-resources / tips grid with internal links.
 */
export default function RelatedResources({ title = "Property Management Tips", resources = [] }) {
  return (
    <SectionWrapper bg="bg-parchment">
      <h2 className="font-heading text-2xl md:text-3xl text-midnight mb-8 text-center">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {resources.map((r, i) => (
          <Link key={i} to={r.link} className="group block bg-white rounded-xl p-6 shadow-sm border border-stone/60 hover:shadow-md transition">
            <h3 className="font-heading text-base text-midnight mb-2 group-hover:text-accent-navy transition-colors">{r.title}</h3>
            <p className="text-sm text-midnight/50 leading-relaxed mb-4">{r.text}</p>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-golden">
              {r.label}
              <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </Link>
        ))}
      </div>
    </SectionWrapper>
  );
}