/**
 * Buyer Advisory Knowledge Centre — buyer-facing articles for /buyer-advisory/resources.
 * Standalone data, independent from Property Management (seededGuides.js).
 * Exported as sections (for the hub page) and a flat array (for ArticleDetail lookup).
 */

const images = {
  keys: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
  house: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
  path: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800',
  interior: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
  modern: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
  building: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
  documents: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800',
};

export const buyerSections = [
  {
    section: 'Getting Started as a Buyer',
    articles: [
      {
        title: 'What Does a Buyer Agent Actually Do?',
        slug: 'what-does-a-buyer-agent-actually-do',
        category: 'Getting Started as a Buyer',
        summary: 'Understand how a buyer agent supports your search, due diligence, negotiation and purchase journey — beyond just finding listings.',
        hero_image_url: images.keys,
        body: `## More Than Finding Listings

A buyer agent (or buyer's advocate) represents you — the purchaser — throughout the entire property buying process. Unlike a selling agent, who works for the vendor, a buyer agent's role is to protect your interests, save you time, and help you make confident, informed decisions.

## The Full Scope of Support

- **Brief and search strategy** — defining your criteria, budget, and target suburbs.
- **Property sourcing** — accessing on-market, off-market, and pre-market opportunities.
- **Due diligence** — reviewing comparable sales, contract documents, and Section 32 statements.
- **Inspections** — attending open homes and private viewings on your behalf.
- **Negotiation** — engaging with selling agents to secure the best price and terms.
- **Auction representation** — bidding on your behalf with a clear strategy and limit.
- **Settlement coordination** — liaising with conveyancers, brokers, and agents through to handover.

## When It Adds the Most Value

A buyer agent is particularly valuable when you're time-poor, purchasing from interstate or overseas, entering an unfamiliar market, or competing in high-demand suburbs where off-market access and negotiation expertise make a real difference.`,
        faq_items: [
          { question: 'How is a buyer agent different from a selling agent?', answer: 'A selling agent represents the vendor and aims to achieve the highest price. A buyer agent represents you, the purchaser, and focuses on securing the right property at the best possible terms.' },
          { question: 'When should I engage a buyer agent?', answer: 'Ideally before you start inspecting properties. Early engagement allows them to understand your goals, refine your search, and identify opportunities — including off-market listings you may not otherwise see.' },
        ],
      },
      {
        title: 'Buyer Checklist Before You Start Looking',
        slug: 'buyer-checklist-before-you-start-looking',
        category: 'Getting Started as a Buyer',
        summary: 'Before you inspect properties, get clear on your budget, brief, location priorities, finance position and must-have criteria.',
        hero_image_url: images.path,
        body: `## Prepare Before You Inspect

The most successful buyers do their groundwork before stepping foot inside a property. A clear checklist keeps you focused, prevents emotional decisions, and positions you to act quickly when the right home appears.

## Your Pre-Search Checklist

- **Finance pre-approval** — speak to a broker or lender and obtain conditional or formal pre-approval so you know your true budget.
- **Define your budget** — separate your maximum borrowing capacity from the price you're comfortable paying.
- **Clarify your purpose** — owner-occupier, investor, or first home buyer? Each changes your criteria.
- **Suburb shortlist** — identify 3–5 suburbs that match your lifestyle, commute, school, and growth priorities.
- **Must-haves vs nice-to-haves** — list non-negotiables (bedrooms, parking, outdoor space) versus features you'd like but can compromise on.
- **Property type** — house, townhouse, apartment, or unit? Each has different costs, compliance, and resale considerations.
- **Conveyancer or lawyer** — engage one early so they're ready to review contracts quickly.
- **Build and pest contacts** — have trusted inspectors lined up for when you find the right property.

## Why This Matters

Buyers who start with a clear brief move faster, avoid overpaying, and are less likely to be swept up in the emotion of an open home or auction. Preparation is the single biggest advantage you can give yourself.`,
        faq_items: [
          { question: 'Do I need pre-approval before looking at properties?', answer: 'Strongly recommended. Pre-approval confirms your borrowing capacity, shows agents you are a serious buyer, and allows you to act quickly when you find the right property.' },
          { question: 'How many suburbs should I shortlist?', answer: 'Three to five is ideal. It is enough to give you options without spreading your focus too thin. Prioritise suburbs that align with your lifestyle and budget.' },
        ],
      },
    ],
  },
  {
    section: 'Due Diligence & Risk',
    articles: [
      {
        title: 'What to Check Before Making an Offer',
        slug: 'what-to-check-before-making-an-offer',
        category: 'Due Diligence',
        summary: 'A practical guide to reviewing price, location, building condition, contract risks, owners corporation issues and future resale appeal.',
        hero_image_url: images.interior,
        body: `## Don't Let Emotion Override Evidence

Falling in love with a property is easy. Making a sound purchasing decision requires stepping back and assessing it objectively across several dimensions before you commit.

## The Key Checks

- **Comparable sales** — review recent sold prices for similar properties within 1km over the last 3–6 months.
- **Building condition** — look for signs of structural movement, dampness, roof issues, and outdated wiring or plumbing.
- **Contract of sale** — have your conveyancer review the contract for special conditions, titles, and restrictions.
- **Section 32 (vendor statement)** — check zoning, easements, owners corporation details, outgoings, and any building works.
- **Owners corporation** — for apartments and townhouses, review fees, rules, financial health, and any pending repairs.
- **Future resale appeal** — consider street appeal, orientation, natural light, and proximity to amenities that drive long-term demand.
- **Title type** — Torrens, strata, or company title each carry different rights and obligations.

## Red Flags

Cracking walls, fresh paint over damp patches, unusually low owners corporation fees (possible deferred maintenance), and contract clauses that limit your finance or inspection conditions all warrant further investigation before making an offer.`,
        faq_items: [
          { question: 'Should I get a building inspection before making an offer?', answer: 'Whenever possible, yes. If the property is going to auction, arrange an inspection beforehand. For private sales, make a building inspection a condition of your offer.' },
          { question: 'What is the most important document to review?', answer: 'The Section 32 (vendor statement) and the contract of sale. These reveal legal restrictions, outgoings, easements, and risks that may not be visible during a physical inspection.' },
        ],
      },
      {
        title: 'Why Section 32 Review Matters Before You Buy',
        slug: 'why-section-32-review-matters-before-you-buy',
        category: 'Section 32 Review',
        summary: 'Learn what the vendor statement can reveal about zoning, owners corporation, easements, outgoings and hidden property risks.',
        hero_image_url: images.documents,
        body: `## The Vendor's Legal Disclosure

A Section 32 statement (officially a Vendor's Statement) is a legal document the seller must provide to prospective buyers. It discloses key information about the property that isn't visible during an inspection. Reviewing it carefully — ideally with a conveyancer — is one of the most important steps before you buy.

## What It Reveals

- **Title details** — the type of title, any caveats, covenants, or restrictions on use.
- **Zoning** — how the land can be used and what development may be permitted.
- **Easements and rights of way** — whether others have a legal right to access or use part of your land.
- **Owners corporation information** — for strata-titled properties, including fees, rules, and financial statements.
- **Outgoings** — council rates, water rates, and any land tax liabilities.
- **Building permits** — whether works were completed with proper permits and certifications.
- **Services connected** — gas, electricity, water, and sewerage availability.

## Why Professional Review Matters

A Section 32 can be dense and legalistic. A conveyancer or lawyer can identify hidden risks — such as restrictions that prevent future renovations, unresolved building works, or owners corporation issues that could affect your enjoyment and resale value. Never sign a contract without reviewing the Section 32 first.`,
        faq_items: [
          { question: 'Can I make an offer before receiving the Section 32?', answer: 'You can, but it is risky. The Section 32 contains critical legal and financial information. Always request it early and have it reviewed before signing anything.' },
          { question: 'What is an easement and why does it matter?', answer: 'An easement gives another party the right to use part of your land for a specific purpose, such as drainage or access. It may restrict where you can build or landscape in the future.' },
        ],
      },
    ],
  },
  {
    section: 'Negotiation & Auction',
    articles: [
      {
        title: 'How to Prepare for Property Negotiation',
        slug: 'how-to-prepare-for-property-negotiation',
        category: 'Negotiation',
        summary: 'Understand price evidence, agent conversations, competing buyer behaviour and how to avoid emotional overpaying.',
        hero_image_url: images.building,
        body: `## Negotiation Is Preparation

Successful property negotiation isn't about bluffing or aggression — it's about evidence, patience, and knowing your walk-away point. The work you do before the conversation determines the outcome.

## Before You Negotiate

- **Gather comparable sales** — recent sold prices for similar homes nearby are your strongest evidence for a fair offer.
- **Understand the vendor's motivation** — is the sale urgent? A motivated vendor may accept a lower offer with favourable terms.
- **Know your limit** — set a maximum price before negotiations begin and commit to walking away above it.
- **Consider terms, not just price** — a longer or shorter settlement, unconditional offer, or flexible deposit can be as valuable as price to the right vendor.
- **Build rapport with the selling agent** — they are your channel to the vendor. A respectful, professional relationship helps you gather information.

## During Negotiation

- Start below your target but within a credible range supported by evidence.
- Let the agent work for movement — don't negotiate against yourself by raising your offer unprompted.
- Keep emotions in check — if you feel pressure to go beyond your limit, step back.
- Be prepared to walk away — the willingness to do so is your strongest negotiating position.

## Avoiding Emotional Overpaying

Buyers who fall in love with a property often pay more than it's worth. Evidence-based offers, a firm limit, and a clear understanding of comparable sales are your best protection against overpaying.`,
        faq_items: [
          { question: 'How do I know what a property is really worth?', answer: 'Comparable sales are the best indicator. Look at recent sold prices for similar properties within 1km over the last 3–6 months. Your conveyancer or buyer agent can also provide a property appraisal.' },
          { question: 'Is it better to make a low opening offer?', answer: 'An opening offer should be credible and supported by evidence. Going too low can offend the vendor and end negotiations. A reasonable but slightly conservative offer keeps the conversation open.' },
        ],
      },
      {
        title: 'Auction Bidding Tips for Buyers',
        slug: 'auction-bidding-tips-for-buyers',
        category: 'Auction Strategy',
        summary: 'Learn how to set your limit, read auction momentum and bid with confidence while protecting your budget.',
        hero_image_url: images.modern,
        body: `## Auctions Reward the Prepared

An auction is a high-pressure environment where preparation and discipline matter more than tactics. Buyers who arrive with a clear strategy and a firm limit are far more likely to succeed without overpaying.

## Before the Auction

- **Set your absolute limit** — the maximum price you are willing to pay, determined before the day and written down.
- **Inspect the contract and Section 32** — auctions are unconditional. If you win, you buy. Do all due diligence beforehand.
- **Arrange finance** — have pre-approval and understand your deposit requirements (usually 10% on the day).
- **Organise building and pest inspections** — complete these before the auction.
- **Register to bid** — arrive early, provide identification, and register with the auctioneer.

## Bidding Strategies

- **Bid confidently** — clear, decisive bids signal strength to competing buyers.
- **Start when ready** — you don't have to open, but don't leave it so late that momentum builds without you.
- **Use odd increments** — bids like $501,500 instead of $500,000 can slow competitors and signal you have a plan.
- **Watch the crowd** — observe who is bidding actively and who hesitates. Body language reveals a lot about competing buyers' limits.
- **Know the vendor's reserve** — the auctioneer will announce when the property is "on the market," meaning the reserve has been met.

## Protecting Your Budget

The biggest risk at auction is getting caught up in the moment and exceeding your limit. If the bidding passes your maximum, stop. There will always be other properties. Discipline is your most valuable tool.`,
        faq_items: [
          { question: 'What happens if the property doesn\'t reach the reserve?', answer: 'The property is "passed in." The highest bidder typically has the first right to negotiate with the vendor afterward, often at their highest bid as a starting point.' },
          { question: 'Can someone bid on my behalf?', answer: 'Yes. A buyer agent or a trusted friend can bid for you, provided they are registered. Many buyers use a professional bidder to remove emotion from the process.' },
        ],
      },
    ],
  },
  {
    section: 'Suburb & Investment Strategy',
    articles: [
      {
        title: 'How to Choose the Right Suburb',
        slug: 'how-to-choose-the-right-suburb',
        category: 'Suburb Strategy',
        summary: 'Balance lifestyle, schools, transport, growth potential, rental demand and future resale appeal before committing to a location.',
        hero_image_url: images.house,
        body: `## The Suburb Matters as Much as the Property

You can renovate a house, but you can't change its location. Choosing the right suburb is one of the most consequential decisions in the buying process — affecting your lifestyle, your investment returns, and your future resale value.

## Key Factors to Weigh

- **Lifestyle fit** — does the area match your daily routines, social needs, and preferred pace of life?
- **School zones** — even if you don't have children, school zones significantly affect demand and resale value.
- **Public transport** — proximity to train stations, trams, and bus routes drives both livability and capital growth.
- **Amenities** — shops, cafes, parks, healthcare, and recreation facilities within easy reach.
- **Employment access** — commute times to major employment hubs affect your quality of life and the suburb's appeal to future buyers.
- **Growth potential** — look for infrastructure investment, rezoning, and population trends that may drive future demand.
- **Rental demand** — if you may rent the property in future, ensure there is strong tenant demand and yield.
- **Future resale appeal** — broad appeal (quiet streets, good light, near transport) ensures a wider buyer pool when you sell.

## Practical Steps

Visit the suburb at different times — weekday mornings, evenings, and weekends. Talk to locals. Review recent sales and rental data. Drive the streets to understand the character and any potential drawbacks (noise, traffic, flood risk). The more time you spend in an area before buying, the more confident your decision will be.`,
        faq_items: [
          { question: 'How important is a school zone if I don\'t have children?', answer: 'Very. Properties in sought-after school zones consistently command higher prices and stronger resale demand. Even if you don\'t use the school, it affects your property\'s value.' },
          { question: 'Should I prioritise lifestyle or growth potential?', answer: 'It depends on your goals. Owner-occupiers should weight lifestyle more heavily, while investors should prioritise growth and rental demand. Many great suburbs offer a balance of both.' },
        ],
      },
      {
        title: 'Owner Occupier vs Investor Buying Strategy',
        slug: 'owner-occupier-vs-investor-buying-strategy',
        category: 'Investor Guide',
        summary: 'The right property depends on your purpose. Learn how the buying strategy changes between lifestyle goals and investment returns.',
        hero_image_url: images.building,
        body: `## Different Goals, Different Strategies

The property that makes a perfect home may not make a strong investment, and vice versa. Understanding the difference — and being honest about which you're buying for — shapes every decision from suburb selection to negotiation.

## Owner-Occupier Priorities

- **Lifestyle and livability** — the home should suit your daily life, family needs, and personal preferences.
- **Emotional connection** — it's okay to love the property, as long as the numbers still make sense.
- **Long-term comfort** — you'll live there, so layout, light, outdoor space, and noise matter more than rental yield.
- **Future flexibility** — consider whether the home can adapt to life changes (working from home, growing family).
- **Personal taste** — you can renovate to your preferences, which is part of the enjoyment of owning.

## Investor Priorities

- **Rental yield and cash flow** — does the rent cover or接近 the holding costs?
- **Capital growth potential** — is the suburb positioned for long-term value appreciation?
- **Tenant demand** — will the property attract and retain quality tenants?
- **Low maintenance** — properties that require less upkeep reduce holding costs and vacancy risk.
- **Depreciation benefits** — newer properties may offer tax advantages through depreciation.
- **Emotional detachment** — the property is a financial asset. Personal taste should not override return potential.

## The Overlap

Some buyers purchase a home that also serves as an investment — living in it now, with the option to rent it later. In that case, balance both sets of priorities: a property in a high-demand rental suburb with solid lifestyle appeal offers flexibility for both paths.`,
        faq_items: [
          { question: 'Can a property be both a good home and a good investment?', answer: 'Yes, but compromises are usually involved. A property that excels as a home (personalised, location-specific) may not optimise returns, and a pure investment may lack the livability you want. Clarify your primary goal first.' },
          { question: 'Should first home buyers think like investors?', answer: 'To an extent, yes. Even if you plan to live in the property, considering its investment potential — growth, resale demand, and rentability — protects you if circumstances change and you need to sell or rent it.' },
        ],
      },
    ],
  },
];

// Flat array for ArticleDetail lookup and search
export const buyerArticles = buyerSections.flatMap((s) => s.articles);