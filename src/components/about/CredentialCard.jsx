import React from "react";

/**
 * Reusable credential card for the About page.
 * icon: lucide-react component
 * title, description: string
 * action: optional { label, href } — renders a text link button
 */
export default function CredentialCard({ icon: Icon, title, description, action }) {
  return (
    <div className="bg-white rounded-2xl border border-stone/60 p-6 md:p-7 shadow-sm flex flex-col">
      <div className="w-10 h-10 rounded-full bg-parchment flex items-center justify-center mb-4">
        <Icon className="w-5 h-5 text-golden" strokeWidth={1.5} />
      </div>
      <h3 className="font-heading text-lg font-light text-midnight leading-snug mb-2">{title}</h3>
      <p className="text-sm text-midnight/55 leading-relaxed font-body flex-1">{description}</p>
      {action && (
        <a
          href={action.href}
          target={action.href?.startsWith("http") ? "_blank" : undefined}
          rel={action.href?.startsWith("http") ? "noopener noreferrer" : undefined}
          className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-golden hover:text-golden/80 transition-colors"
        >
          {action.label}
          <span aria-hidden="true">&rarr;</span>
        </a>
      )}
    </div>
  );
}