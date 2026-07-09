import React from "react";
import { User } from "lucide-react";
import catPhoto from "@/assets/cat.PNG";

/**
 * Reusable portrait block for the About page.
 * Uses cat.jpg by default, but can still accept a custom src if needed.
 */
export default function PortraitPlaceholder({
  src = catPhoto,
  alt = "Catherine Sheo",
  label = "Catherine Portrait",
  className = "",
}) {
  return (
    <div
      className={`relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-stone/40 border border-stone/60 ${className}`}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-midnight/30">
          <User className="w-12 h-12" strokeWidth={1} />
          <span className="text-xs tracking-[0.18em] uppercase">
            {label}
          </span>
        </div>
      )}
    </div>
  );
}