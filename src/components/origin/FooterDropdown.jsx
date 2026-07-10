import React from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

export default function FooterDropdown({
  title,
  links,
  isOpen,
  onToggle,
}) {
  return (
    <div className="border-t border-white/10 md:min-w-[150px] md:border-t-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-3 py-3 text-left md:py-0"
      >
        <span className="whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.18em] text-golden">
          {title}
        </span>

        <ChevronDown
          size={14}
          className={`text-golden/70 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`grid transition-all duration-300 ease-out ${
          isOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <ul className="space-y-1.5 pb-3 md:pt-2.5">
            {links.map((link) => (
              <li key={link.path || link.label}>
                <Link
                  to={link.path}
                  onClick={onToggle}
                  className="block py-0.5 text-xs text-parchment/60 transition-colors hover:text-golden"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
