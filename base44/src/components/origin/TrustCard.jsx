import React from "react";

export default function TrustCard({ icon: Icon, title, description }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      {Icon && (
        <div className="w-10 h-10 rounded-full bg-parchment flex items-center justify-center mb-4">
          <Icon size={18} className="text-golden" />
        </div>
      )}
      <h3 className="font-heading text-sm font-semibold text-midnight mb-2">
        {title}
      </h3>
      <p className="text-sm text-midnight/55 leading-relaxed font-body">
        {description}
      </p>
    </div>
  );
}