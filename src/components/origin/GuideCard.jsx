import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Clock } from "lucide-react";

export default function GuideCard({
  title,
  category,
  summary,
  slug,
  imageUrl,
  readingTime,
  publishDate,
}) {
  return (
    <Link
      to={`/article/${slug}`}
      className="group block overflow-hidden rounded-xl border border-stone/60 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-golden/60"
    >
      {imageUrl ? (
        <div className="aspect-[3/2] overflow-hidden bg-stone/20">
          <img
            src={imageUrl}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      ) : (
        <div className="flex aspect-[3/2] items-center justify-center bg-gradient-to-br from-parchment to-stone/40">
          <span className="px-6 text-center font-heading text-xl text-midnight/45">
            {category || "Origin Knowledge Centre"}
          </span>
        </div>
      )}

      <div className="p-5">
        {category && (
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-golden">
            {category}
          </p>
        )}

        <h3 className="font-heading mb-2 text-lg font-medium leading-snug text-midnight transition-colors group-hover:text-accent-navy">
          {title}
        </h3>

        {summary && (
          <p className="line-clamp-2 text-sm leading-relaxed text-midnight/55">
            {summary}
          </p>
        )}

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1 text-xs text-midnight/40">
            {readingTime ? (
              <>
                <Clock size={12} />
                {readingTime} min read
              </>
            ) : null}
            {readingTime && publishDate ? <span>•</span> : null}
            {publishDate || null}
          </span>

          <span className="inline-flex items-center gap-1 text-xs font-medium text-golden">
            Read guide
            <ArrowUpRight
              size={12}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
