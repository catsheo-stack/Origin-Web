import React from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

/**
 * Compact footer dropdown.
 * - Mobile: full-width accordion row with large tap target.
 * - Desktop: inline column — heading only when collapsed, links expand below.
 * One open at a time is enforced by the parent Footer.
 */
export default function FooterDropdown({ title, links, isOpen, onToggle }) {
  return (
    <div className="border-t border-white/10 md:border-t-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-3 py-3 md:py-0 text-left"
      >
        <span className="text-[11px] font-medium text-golden tracking-[0.18em] uppercase whitespace-nowrap">
          {title}
        </span>
        <ChevronDown
          size={14}
          className={`text-golden/70 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <div className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden min-h-0">
          <ul className="space-y-1.5 pb-3 md:pb-0 md:pt-2.5">
            {links.map((link) => (
              <li key={link.path || link.label}>
                {link.path ? (
                  <Link to={link.path} className="block text-xs text-parchment/60 hover:text-golden transition-colors py-0.5">
                    {link.label}
                  </Link>
                ) : (
                  <span className="flex items-center gap-2 text-xs text-parchment/30 py-0.5">
                    {link.label}
                    <span className="text-[9px] uppercase tracking-wider text-golden/60 border border-golden/25 rounded-full px-1.5 py-px leading-none">
                      Soon
                    </span>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}