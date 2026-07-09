import React from "react";

export default function SectionWrapper({ children, className = "", id, bg = "bg-parchment" }) {
  return (
    <section id={id} className={`${bg} py-16 md:py-24 lg:py-32 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {children}
      </div>
    </section>
  );
}