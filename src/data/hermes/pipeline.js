// Hermes Lab — Content pipeline columns and cards
export const pipelineColumns = [
  {
    id: 'ideas',
    title: 'Ideas',
    cards: [
      { id: 'c1', title: 'Landlord Insurance Explained', tag: 'Compliance', priority: 'medium' },
      { id: 'c2', title: 'Bond Return Guide', tag: 'End of Lease', priority: 'low' },
    ],
  },
  {
    id: 'research',
    title: 'Research',
    cards: [
      { id: 'c3', title: 'Pet Bond Regulations VIC', tag: 'Leasing', priority: 'high' },
    ],
  },
  {
    id: 'blueprint',
    title: 'Blueprint',
    cards: [
      { id: 'c4', title: 'Rental Market Outlook 2026', tag: 'Market', priority: 'medium' },
    ],
  },
  {
    id: 'writing',
    title: 'Writing',
    cards: [
      { id: 'c5', title: 'First-Time Landlord Checklist', tag: 'Getting Started', priority: 'high' },
    ],
  },
  {
    id: 'seo',
    title: 'SEO Review',
    cards: [
      { id: 'c6', title: 'Routine Inspection Frequency', tag: 'Maintenance', priority: 'medium' },
    ],
  },
  {
    id: 'human',
    title: 'Human Review',
    cards: [
      { id: 'c7', title: 'Tenant Selection Criteria', tag: 'Leasing', priority: 'high' },
    ],
  },
  {
    id: 'ready',
    title: 'Ready for CMS',
    cards: [
      { id: 'c8', title: 'Smoke Alarm Compliance Victoria', tag: 'Compliance', priority: 'high' },
    ],
  },
  {
    id: 'published',
    title: 'Published',
    cards: [
      { id: 'c9', title: 'Rental Appraisal Melbourne', tag: 'Appraisal', priority: 'medium' },
    ],
  },
];

export const priorityDot = {
  high: 'bg-rose-400',
  medium: 'bg-amber-400',
  low: 'bg-gray-300',
};