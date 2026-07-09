// Hermes Lab — Project registry
export const projects = [
  {
    id: 'pm',
    name: 'Property Management',
    description: 'Core landlord guides, leasing and compliance content for Origin Property Concierge.',
    initials: 'PM',
    color: 'emerald',
    status: 'Active',
    articles: 42,
    published: 31,
    avgSeo: 84,
  },
  {
    id: 'ba',
    name: 'Buyer Advocacy',
    description: 'Buyer agent content and Melbourne suburb investment insights.',
    initials: 'BA',
    color: 'blue',
    status: 'Active',
    articles: 18,
    published: 12,
    avgSeo: 79,
  },
  {
    id: 'con',
    name: 'Conveyancing',
    description: 'Property transfer process and legal obligation guides.',
    initials: 'CO',
    color: 'purple',
    status: 'Planning',
    articles: 0,
    published: 0,
    avgSeo: 0,
  },
  {
    id: 'mort',
    name: 'Mortgage',
    description: 'Finance, lending and refinancing education content.',
    initials: 'MO',
    color: 'amber',
    status: 'Planning',
    articles: 0,
    published: 0,
    avgSeo: 0,
  },
];

export const projectColors = {
  emerald: 'bg-emerald-500',
  blue: 'bg-blue-500',
  purple: 'bg-purple-500',
  amber: 'bg-amber-500',
};