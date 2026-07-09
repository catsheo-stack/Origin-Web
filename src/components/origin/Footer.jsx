import React, { useState } from "react";
import FooterDropdown from "./FooterDropdown";

const serviceLinks = [
  { label: "Buyer Advisory", path: "/buyer-advisory" },
  { label: "Property Management", path: "/property-management" },
  { label: "Conveyancing", path: "/conveyancing" },
  { label: "Mortgage & Finance", path: "/mortgage-finance" },
];

const knowledgeLinks = [
  { label: "Articles", path: "/articles" },
  { label: "Guides", path: "/guides" },
  { label: "FAQ", path: "/faq" },
  { label: "Tools", path: "/tools" },
];

const toolLinks = [
  { label: "Origin Home Buying Planner", path: "/tools/origin-home-buying-planner" },
  { label: "Property Management Readiness Checklist", path: "/tools/property-management-readiness-checklist" },
  { label: "Investment Yield Calculator", path: "/tools/investment-yield-calculator" },
  { label: "Buyer Settlement Tracker", path: "/tools/buyer-settlement-tracker" },
  { label: "Seller Settlement Tracker", path: "/tools/seller-settlement-tracker" },
];

const companyLinks = [
  { label: "About", path: "/about" },
];

const FOOTER_GROUPS = [
  { key: "services", title: "Services", links: serviceLinks },
  { key: "knowledge", title: "Knowledge Centre", links: knowledgeLinks },
  { key: "tools", title: "Tools", links: toolLinks },
  { key: "company", title: "Company", links: companyLinks },
];

export default function Footer() {
  const [openSection, setOpenSection] = useState(null);
  const toggle = (key) => setOpenSection((cur) => (cur === key ? null : key));

  return (
    <footer className="bg-midnight text-parchment/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5">
        <div className="flex flex-col md:flex-row md:items-start gap-1 md:gap-10">
          {/* Brand */}
          <div className="md:mr-auto pb-2">
            <p className="font-heading text-sm font-light text-parchment mb-1.5">
              Origin Property <span className="text-golden font-normal">Concierge</span>
            </p>
            <a
              href="mailto:hello@originpropertyconcierge.com.au"
              className="text-xs text-parchment/50 hover:text-golden transition-colors"
            >
              hello@originpropertyconcierge.com.au
            </a>
          </div>

          {FOOTER_GROUPS.map((g) => (
            <FooterDropdown
              key={g.key}
              title={g.title}
              links={g.links}
              isOpen={openSection === g.key}
              onToggle={() => toggle(g.key)}
            />
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-2.5">
          <p className="text-[11px] text-parchment/40 text-center">
            © {new Date().getFullYear()} Origin Property Concierge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}