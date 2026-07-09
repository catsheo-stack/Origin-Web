/**
 * Origin Tools — Property Management Readiness Checklist data.
 * Client-side only. Each section drives an accordion + progress bar.
 */
export const CHECKLIST_SECTIONS = [
  {
    id: "preparation",
    title: "Property Preparation",
    items: [
      { id: "prep_clean", label: "Property is clean and presentable" },
      { id: "prep_repairs", label: "Repairs reviewed" },
      { id: "prep_garden", label: "Garden maintained" },
      { id: "prep_keys", label: "Keys available" },
    ],
  },
  {
    id: "compliance",
    title: "Compliance & Safety",
    items: [
      { id: "comp_smoke", label: "Smoke alarm reviewed" },
      { id: "comp_electrical", label: "Electrical safety considered" },
      { id: "comp_gas", label: "Gas safety considered (if applicable)" },
      { id: "comp_insurance", label: "Insurance reviewed" },
      { id: "comp_oc", label: "Owners Corporation requirements checked" },
    ],
  },
  {
    id: "leasing",
    title: "Leasing Readiness",
    items: [
      { id: "lease_rent", label: "Expected rent researched" },
      { id: "lease_term", label: "Lease term considered" },
      { id: "lease_date", label: "Available date confirmed" },
      { id: "lease_pets", label: "Pet preference decided" },
      { id: "lease_appliances", label: "Included appliances confirmed" },
    ],
  },
  {
    id: "documents",
    title: "Documents & Information",
    items: [
      { id: "doc_lease", label: "Current lease available" },
      { id: "doc_history", label: "Rental history available" },
      { id: "doc_outgoings", label: "Council / Water / Owners Corporation information available" },
      { id: "doc_manuals", label: "Appliance manuals available" },
      { id: "doc_emergency", label: "Emergency repair contacts prepared" },
    ],
  },
];

export const TOTAL_ITEMS = CHECKLIST_SECTIONS.reduce((n, s) => n + s.items.length, 0);