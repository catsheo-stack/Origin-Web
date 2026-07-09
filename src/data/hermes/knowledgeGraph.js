// Hermes Lab — Knowledge graph entity chain (visual only)
export const knowledgeChain = [
  { id: 'pm', label: 'Property Management', type: 'Domain', relations: 4 },
  { id: 'ra', label: 'Rental Appraisal', type: 'Topic', relations: 3 },
  { id: 'ri', label: 'Routine Inspection', type: 'Topic', relations: 2 },
  { id: 'rs', label: 'Rental Standards', type: 'Standard', relations: 3 },
  { id: 'sa', label: 'Smoke Alarm', type: 'Compliance', relations: 2 },
  { id: 'vc', label: 'VCAT', type: 'Authority', relations: 2 },
  { id: 'cav', label: 'Consumer Affairs Victoria', type: 'Authority', relations: 1 },
  { id: 'li', label: 'Landlord Insurance', type: 'Product', relations: 1 },
  { id: 'mt', label: 'Maintenance', type: 'Topic', relations: 2 },
  { id: 'ry', label: 'Rental Yield', type: 'Metric', relations: 1 },
];

export const nodeTone = {
  Domain: 'bg-gray-900 text-white',
  Topic: 'bg-blue-50 text-blue-700 border border-blue-100',
  Standard: 'bg-purple-50 text-purple-700 border border-purple-100',
  Compliance: 'bg-rose-50 text-rose-700 border border-rose-100',
  Authority: 'bg-amber-50 text-amber-700 border border-amber-100',
  Product: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
  Metric: 'bg-gray-100 text-gray-600 border border-gray-200',
};