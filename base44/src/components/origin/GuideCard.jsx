import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function GuideCard({ title, category, summary, slug, imageUrl }) {
  return (
    <Link
      to={`/article/${slug}`}
      className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
      onClick={() => { base44.analytics.track({ eventName: "guide_opened", properties: { guide: slug } }); }}
    >
      {imageUrl && (
        <div className="overflow-hidden aspect-[3/2]">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-5">
        <p className="text-xs font-medium tracking-widest uppercase text-golden mb-2">
          {category}
        </p>
        <h3 className="font-heading text-base font-medium text-midnight leading-snug mb-1.5 group-hover:text-accent-navy transition-colors">
          {title}
        </h3>
        {summary && (
          <p className="text-sm text-midnight/50 leading-relaxed line-clamp-2">
            {summary}
          </p>
        )}
        <div className="mt-3 flex items-center gap-1 text-xs text-golden font-medium">
          Read guide
          <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  );
}