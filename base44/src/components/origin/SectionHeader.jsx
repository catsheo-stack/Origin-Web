import React from "react";

export default function SectionHeader({ label, title, subtitle, align = "left" }) {
  const alignClass = align === "center" ? "text-center mx-auto" : "";
  return (
    <div className={`max-w-2xl mb-12 md:mb-16 ${alignClass}`}>
      {label && (
        <p className="text-xs font-medium tracking-widest uppercase text-golden mb-4">
          {label}
        </p>
      )}
      <h2 className="font-heading text-3xl md:text-4xl lg:text-[2.5rem] font-light text-midnight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base md:text-lg text-midnight/60 leading-relaxed font-body">
          {subtitle}
        </p>
      )}
      <div className="mt-6 w-12 h-px bg-stone" />
    </div>
  );
}