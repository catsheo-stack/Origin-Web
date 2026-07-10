import React, { useState } from "react";
import FooterDropdown from "./FooterDropdown";

const serviceLinks = [
  { label: "Buyer Advisory", path: "/buyer-advisory" },
  { label: "Property Owners", path: "/property-management" },
  { label: "Conveyancing", path: "/conveyancing" },
  { label: "Mortgage & Finance", path: "/mortgage-finance" },
];

const knowledgeLinks = [
  { label: "All Articles", path: "/articles" },
  { label: "All Guides", path: "/guides" },
  { label: "Buyer Advisory Centre", path: "/buyer-advisory/resources" },
  { label: "Property Owner Centre", path: "/property-management/resources" },
  { label: "Conveyancing Centre", path: "/conveyancing/resources" },
  { label: "Mortgage & Finance Centre", path: "/mortgage-finance/resources" },
  { label: "FAQ", path: "/faq" },
];

const toolLinks = [
  {
    label: "Home Buying Planner",
    path: "/tools/origin-home-buying-planner",
  },
  {
    label: "Property Readiness Checklist",
    path: "/tools/property-management-readiness-checklist",
  },
  {
    label: "Investment Yield Calculator",
    path: "/tools/investment-yield-calculator",
  },
  {
    label: "Buyer Settlement Tracker",
    path: "/tools/buyer-settlement-tracker",
  },
  {
    label: "Seller Settlement Tracker",
    path: "/tools/seller-settlement-tracker",
  },
];

const companyLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const FOOTER_GROUPS = [
  { key: "services", title: "Services", links: serviceLinks },
  { key: "knowledge", title: "Knowledge Centre", links: knowledgeLinks },
  { key: "tools", title: "Tools", links: toolLinks },
  { key: "company", title: "Company", links: companyLinks },
];

export default function Footer() {
  const [openSection, setOpenSection] = useState(null);

  const toggle = (key) => {
    setOpenSection((current) => (current === key ? null : key));
  };

  return (
    <footer className="bg-midnight text-parchment/80">
      <div className="mx-auto max-w-7xl px-6 py-5 lg:px-10">
        <div className="flex flex-col gap-1 md:flex-row md:items-start md:gap-10">
          <div className="pb-2 md:mr-auto">
            <p className="font-heading mb-1.5 text-sm font-light text-parchment">
              Origin Property{" "}
              <span className="font-normal text-golden">Concierge</span>
            </p>

            <a
              href="mailto:hello@originpropertyconcierge.com.au"
              className="text-xs text-parchment/50 transition-colors hover:text-golden"
            >
              hello@originpropertyconcierge.com.au
            </a>
          </div>

          {FOOTER_GROUPS.map((group) => (
            <FooterDropdown
              key={group.key}
              title={group.title}
              links={group.links}
              isOpen={openSection === group.key}
              onToggle={() => toggle(group.key)}
            />
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-2.5 lg:px-10">
          <p className="text-center text-[11px] text-parchment/40">
            © {new Date().getFullYear()} Origin Property Concierge. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
