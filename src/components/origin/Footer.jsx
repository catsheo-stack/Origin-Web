import React from "react";
import { Link } from "react-router-dom";

const serviceLinks = [
  { label: "Property Management", path: "/property-management" },
];

const resourceLinks = [
  { label: "Knowledge Centre", path: "/property-guides" },
  { label: "Landlord Guides", path: "/property-guides/landlord-checklist" },
  { label: "FAQs", path: "/property-guides/should-i-change-pm" },
];

export default function Footer() {
  return (
    <footer className="bg-midnight text-parchment/80">
      {/* Knowledge Centre CTA */}
      <div className="bg-stone/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-sm max-w-lg leading-relaxed text-parchment/70">
            Need more information before deciding? Explore our Property Management
            Knowledge Centre for landlord guides, checklists, FAQs and rental resources.
          </p>
          <Link
            to="/property-guides"
            className="bg-golden text-midnight text-sm font-medium px-6 py-2.5 rounded-full hover:bg-golden/90 transition-colors whitespace-nowrap"
          >
            Browse Knowledge Centre →
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="font-heading text-base font-light text-parchment mb-2">
              Origin Property{" "}
              <span className="text-golden font-normal">Concierge</span>
            </p>
            <p className="text-xs leading-relaxed text-parchment/50 mb-3">
              Elevated property management and leasing for serious Melbourne investors.
            </p>
            <a href="mailto:hello@originpropertyconcierge.com.au" className="text-xs text-parchment/50 hover:text-golden transition-colors">
              hello@originpropertyconcierge.com.au
            </a>
          </div>

          <div>
            <h4 className="text-xs font-medium text-parchment mb-3 tracking-wide uppercase">
              Services
            </h4>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-xs text-parchment/50 hover:text-golden transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-medium text-parchment mb-3 tracking-wide uppercase">
              Resources
            </h4>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.path + link.label}>
                  <Link
                    to={link.path}
                    className="text-xs text-parchment/50 hover:text-golden transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-3">
          <p className="text-xs text-parchment/40 text-center">
            © {new Date().getFullYear()} Origin Property Concierge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}