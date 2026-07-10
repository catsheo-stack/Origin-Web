import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, CalendarDays, Clock3 } from "lucide-react";

const formatDate = (value) => {
  if (!value) return "";
  try {
    return new Date(value).toLocaleDateString("en-AU", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
};

export default function GuideCard({
  title,
  category,
  summary,
  slug,
  imageUrl,
  publishDate,
  readingTime,
}) {
  return (
    <Link
      to={`/article/${slug}`}
      className="group block overflow-hidden rounded-xl border border-stone/60 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
    >
      {imageUrl && (
        <div className="aspect-[3/2] overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      )}

      <div className="p-5">
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-golden">
          {category}
        </p>
        <h3 className="font-heading mb-1.5 text-base font-medium leading-snug text-midnight transition-colors group-hover:text-accent-navy">
          {title}
        </h3>

        {summary && (
          <p className="line-clamp-2 text-sm leading-relaxed text-midnight/50">
            {summary}
          </p>
        )}

        {(publishDate || readingTime) && (
          <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] text-midnight/35">
            {publishDate && (
              <span className="inline-flex items-center gap-1">
                <CalendarDays size={12} />
                {formatDate(publishDate)}
              </span>
            )}
            {Number(readingTime) > 0 && (
              <span className="inline-flex items-center gap-1">
                <Clock3 size={12} />
                {readingTime} min read
              </span>
            )}
          </div>
        )}

        <div className="mt-4 flex items-center gap-1 text-xs font-medium text-golden">
          Read guide
          <ArrowUpRight
            size={12}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </div>
      </div>
    </Link>
  );
}
