/**
 * Seeded Property Guides — default published content for /property-guides.
 * Used as fallback when no CMS articles exist, and merged with CMS articles
 * when they do. Ensures the Knowledge Centre is never empty (SEO-critical).
 */

const images = [
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
  'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
  'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
  'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800',
];

export const categoryOrder = [
  'Getting Started as a Landlord',
  'Rental Appraisal',
  'Choosing a Property Manager',
  'Leasing Process',
  'Compliance',
  'Maintenance & Inspections',
  'End of Lease',
];

export const seededGuides = [
  {
    title: 'Landlord Checklist Before Leasing',
    slug: 'landlord-checklist-before-leasing',
    category: 'Getting Started as a Landlord',
    summary: 'Everything you need to prepare before leasing your investment property — from compliance to presentation.',
    hero_image_url: images[0],
    body: `## Why a Checklist Matters

Leasing your investment property involves several moving parts. A structured checklist ensures you meet your legal obligations, present the property at its best, and attract quality tenants.

## Before You List

- **Order a rental appraisal** to understand the current market rent for your suburb.
- **Complete outstanding repairs** — leaky taps, broken blinds, faulty locks.
- **Check smoke alarms** are compliant with Victorian law.
- **Verify minimum rental standards** are met, including heating and window coverings.
- **Deep clean the property** — a clean home sets the tone for how tenants maintain it.

## Compliance Essentials

- Prepare the rental agreement (lease) correctly.
- Complete a condition report documenting the property's state.
- Lodge the bond with the RTBA.
- Provide tenants with all required statements and disclosures.

## Presentation Tips

Declutter, tidy gardens, and consider minor cosmetic touches like fresh paint. A well-prepared property leases faster and commands stronger rent.`,
    faq_items: [
      { question: 'Do I need a condition report before leasing?', answer: 'Yes. A condition report documents the property condition at the start of the tenancy and protects both parties at the end of the lease.' },
      { question: 'How long does it take to prepare a property for lease?', answer: 'Typically 1–2 weeks, depending on repairs, cleaning, and compliance work required.' },
    ],
  },
  {
    title: 'What Does a Property Manager Actually Do?',
    slug: 'what-does-a-property-manager-do',
    category: 'Getting Started as a Landlord',
    summary: 'Understanding the full scope of a property manager\u2019s role \u2014 beyond just collecting rent.',
    hero_image_url: images[1],
    body: `## More Than Rent Collection

A professional property manager oversees the entire lifecycle of your tenancy — from marketing and tenant selection through to compliance, inspections, and end-of-lease processes.

## Core Responsibilities

- **Rental appraisals** — advising on market rent to maximise your return.
- **Marketing and leasing** — listing the property and conducting inspections.
- **Tenant screening** — checking references, employment, and rental history.
- **Lease preparation** — drafting compliant tenancy agreements.
- **Rent collection and arrears management** — chasing late payments promptly.
- **Routine inspections** — scheduled property checks every 6 months.
- **Maintenance coordination** — arranging repairs with trusted tradespeople.
- **Compliance management** — smoke alarms, gas, electrical, and safety checks.
- **Dispute resolution** — mediating between landlords and tenants.
- **End-of-lease processes** — bond inspections and final condition reports.

## The Value of Expertise

A skilled property manager protects your investment, minimises vacancy periods, and ensures compliance with Victoria's residential tenancy laws. For most investors, the fee is offset by higher rent achieved and fewer vacancies.`,
    faq_items: [
      { question: 'How much does a property manager cost?', answer: 'Fees typically range from 5\u20139% of the weekly rent plus GST, depending on the services included.' },
      { question: 'Can I manage my own rental property?', answer: 'Yes, but you take on all legal, compliance, and administrative responsibilities under Victorian tenancy law.' },
    ],
  },
  {
    title: 'Rental Appraisal Explained',
    slug: 'rental-appraisal-explained',
    category: 'Rental Appraisal',
    summary: 'Understanding how your property is valued and what a professional appraisal involves.',
    hero_image_url: images[2],
    body: `## What Is a Rental Appraisal?

A rental appraisal is a professional assessment of how much your property can realistically achieve in the current rental market. It considers your property's features, location, condition, and comparable leases nearby.

## How It Works

An experienced property manager inspects your property and analyses recent rental data for your suburb. They compare your property to similar homes — same bedroom count, condition, and proximity to amenities — to determine a fair market rent.

## Why It Matters

- **Avoid underpricing** — leaving money on the table each week.
- **Avoid overpricing** — extended vacancies cost more than a slightly lower rent.
- **Inform investment decisions** — appraisals help you assess whether to renovate, hold, or adjust.
- **Support finance applications** — lenders often require a rental estimate.

## When to Get One

- Before leasing a new property.
- At lease renewal time.
- After renovations.
- When market conditions shift.

A free rental appraisal takes minutes to request and can make a significant difference to your annual return.`,
    faq_items: [
      { question: 'How accurate is a rental appraisal?', answer: 'A professional appraisal based on current comparable data is highly accurate, typically within $10\u201320 of the achievable rent.' },
      { question: 'Is a rental appraisal free?', answer: 'Most property management agencies offer free rental appraisals as part of their service.' },
    ],
  },
  {
    title: 'What Affects Rental Value?',
    slug: 'what-affects-rental-value',
    category: 'Rental Appraisal',
    summary: 'The key factors that influence how much rent your investment property can achieve.',
    hero_image_url: images[3],
    body: `## Key Factors That Drive Rent

Several factors determine your property's rental value. Understanding them helps you make improvements that directly impact your return.

## Location

Proximity to transport, schools, shops, and employment hubs is the single biggest factor. A property 500m from a train station will typically command more than one 2km away.

## Property Features

- **Bedrooms and bathrooms** — more bedrooms generally means higher rent.
- **Parking** — off-street parking or a garage adds value, especially in inner suburbs.
- **Outdoor space** — a courtyard or balcony is appealing to tenants.
- **Storage** — built-in robes and extra storage are highly valued.

## Condition and Presentation

- **Renovated kitchens and bathrooms** deliver the strongest rent uplift.
- **Heating and cooling** — reverse-cycle air conditioning is expected in Victoria.
- **Flooring** — hard flooring or quality carpets matter.
- **Fresh paint** — the cheapest way to lift perceived value.

## Market Conditions

Supply and demand in your suburb fluctuate seasonally. More listings mean more competition; fewer listings favour landlords. Timing your lease can affect the rent achieved.`,
    faq_items: [
      { question: 'Which renovation adds the most rental value?', answer: 'Kitchen and bathroom renovations consistently deliver the strongest rent uplift, followed by adding heating and cooling.' },
      { question: 'Does time of year affect rent?', answer: 'Yes. The Melbourne rental market peaks in January\u2013February. Leasing during quieter periods may achieve slightly less.' },
    ],
  },
  {
    title: 'How to Choose a Property Manager in Melbourne',
    slug: 'how-to-choose-property-manager-melbourne',
    category: 'Choosing a Property Manager',
    summary: 'What to look for, questions to ask, and red flags to avoid when selecting a property manager.',
    hero_image_url: images[4],
    body: `## Why Your Choice Matters

Your property manager is the custodian of a significant investment. The right manager protects your asset, maximises your return, and gives you peace of mind. The wrong one can cost you thousands through poor tenant selection, missed inspections, or compliance failures.

## What to Look For

- **Local expertise** — a manager who knows your suburb and its rental market.
- **Transparent fees** — clear, itemised pricing with no hidden charges.
- **Communication** — responsive, proactive updates on inspections and maintenance.
- **Tenant screening process** — rigorous reference and background checks.
- **Technology** — online portals for rent payments, inspection reports, and maintenance requests.
- **Inspection schedule** — routine inspections every 6 months, with photos.

## Questions to Ask

- How many properties does each manager handle?
- What is your arrears process?
- How do you handle after-hours emergencies?
- Can I see a sample inspection report?
- What tradespeople do you use, and are they licensed?

## Red Flags

- Fees significantly below market rate (you get what you pay for).
- Slow to respond during the pitch phase.
- No clear inspection schedule.
- Reluctance to provide references.`,
    faq_items: [
      { question: 'Should I choose a large agency or a boutique manager?', answer: 'Both can work well. Focus on the individual manager assigned to your property, their workload, and communication style rather than the agency size.' },
      { question: 'Can I change property managers mid-lease?', answer: 'Yes. You can transfer management at any time, though it is simplest to do so at lease renewal.' },
    ],
  },
  {
    title: 'Should I Change Property Manager?',
    slug: 'should-i-change-property-manager',
    category: 'Choosing a Property Manager',
    summary: 'Signs it might be time to switch, and how to make the transition smoothly.',
    hero_image_url: images[5],
    body: `## Signs It\u2019s Time to Switch

Changing property managers is a straightforward process, but it's worth evaluating whether your current manager is meeting your expectations first.

## Warning Signs

- **Poor communication** — days to return calls or emails.
- **Missed inspections** — no routine inspections conducted in the last 12 months.
- **Persistent arrears** — tenants repeatedly behind on rent with no clear action.
- **Deferred maintenance** — minor issues escalating into costly repairs.
- **High tenant turnover** — frequent vacancies may signal poor tenant management.
- **Lack of transparency** — unclear fee structures or unexpected charges.

## How to Switch

1. **Review your management agreement** — check the notice period (usually 30\u201390 days).
2. **Notify your current manager in writing** — state your intention and final date.
3. **Choose a new manager** — have them ready to take over on the handover date.
4. **Transfer documents** — lease, condition report, bond details, and tenant contact information.
5. **Inform your tenant** — the new manager will typically handle this, but a brief note from you helps.

## Making the Transition Smooth

The best time to switch is at lease renewal or when a property is vacant. This minimises disruption for tenants and simplifies the handover.`,
    faq_items: [
      { question: 'How much notice do I need to give my property manager?', answer: 'Most management agreements require 30\u201390 days written notice. Check your agreement for the exact term.' },
      { question: 'Will switching managers upset my tenant?', answer: 'A professional handover minimises disruption. Tenants are usually unaffected as long as communication is clear.' },
    ],
  },
  {
    title: 'The Leasing Process Step by Step',
    slug: 'leasing-process-step-by-step',
    category: 'Leasing Process',
    summary: 'A clear walkthrough of how a property goes from listed to leased.',
    hero_image_url: images[6],
    body: `## From Appraisal to Keys

Understanding the leasing process helps you set realistic expectations for how long it takes to get a tenant in place.

## Step 1: Rental Appraisal

Your property manager assesses the market and recommends a weekly rent.

## Step 2: Preparation

Repairs, cleaning, and compliance checks (smoke alarms, minimum standards) are completed.

## Step 3: Marketing

The property is listed on Domain, realestate.com.au, and the agency's channels. Professional photos and a floor plan are arranged.

## Step 4: Open for Inspections

Prospective tenants inspect the property, typically at scheduled open times. Private viewings can also be arranged.

## Step 5: Applications

Interested tenants submit applications with references, employment details, and rental history. Your manager screens and shortlists.

## Step 6: Tenant Selection

You approve the preferred applicant based on your manager's recommendation.

## Step 7: Lease Preparation

The tenancy agreement is drafted, the bond is collected, and a condition report is completed.

## Step 8: Handover

Keys are exchanged, the bond is lodged with the RTBA, and the tenancy begins.

The entire process typically takes 1\u20132 weeks from listing to handover, depending on market demand.`,
    faq_items: [
      { question: 'How long does it take to lease a property?', answer: 'In a normal Melbourne market, 7\u201314 days from listing to lease commencement. High-demand periods can be faster.' },
      { question: 'Who chooses the tenant?', answer: 'Your property manager recommends a tenant based on screening, but you make the final decision.' },
    ],
  },
  {
    title: 'Preparing Your Property for Rent',
    slug: 'preparing-your-property-for-rent',
    category: 'Leasing Process',
    summary: 'Practical steps to present your property at its best and attract quality tenants.',
    hero_image_url: images[0],
    body: `## First Impressions Count

The way your property presents directly impacts the quality of tenants you attract and the rent you achieve. A well-presented property signals to tenants that you value the home — and encourages them to do the same.

## Exterior

- Tidy gardens, mow lawns, and trim hedges.
- Clean gutters and exterior windows.
- Repair fences, gates, and paths.
- Ensure house numbers are visible.

## Interior

- **Deep clean** every room, including carpets, windows, and blinds.
- **Declutter** — remove personal items and excess furniture.
- **Fresh paint** if walls are marked or dated (neutral colours).
- **Check all fixtures** — light fittings, tapware, door handles.
- **Ensure heating and cooling** are working and serviced.

## Compliance Before Leasing

- Smoke alarms installed and tested.
- Gas and electrical safety checks completed.
- Minimum rental standards met (heating, deadlocks, window coverings).

## Small Investments, Big Returns

Spending $500\u20131,000 on cleaning, minor repairs, and presentation can add $10\u201330 per week to your rent and reduce time on the market.`,
    faq_items: [
      { question: 'Should I furnish my rental property?', answer: 'Furnished properties can achieve higher rent but appeal to a narrower tenant pool and involve more wear and tear. Unfurnished is the Melbourne standard for long-term rentals.' },
      { question: 'Do I need professional photos?', answer: 'Professional photos significantly increase listing views and enquiry. Most agencies include them in their leasing package.' },
    ],
  },
  {
    title: 'Smoke Alarm Compliance in Victoria',
    slug: 'smoke-alarm-compliance-victoria',
    category: 'Compliance',
    summary: 'Your legal obligations for smoke alarms under Victorian residential tenancy law.',
    hero_image_url: images[1],
    body: `## Legal Requirements

In Victoria, landlords are legally required to ensure smoke alarms are installed and functioning in all rental properties. Non-compliance is a serious offence under the Residential Tenancies Act.

## What the Law Requires

- Smoke alarms must be installed on every storey.
- Alarms must be interconnected (if hardwired) or powered by a 10-year lithium battery.
- Alarms must be tested within 30 days before a tenancy begins or is renewed.
- Landlords must provide a certificate of compliance.

## Types of Alarms

- **Hardwired, interconnected** — the preferred standard for most properties.
- **10-year lithium battery** — acceptable for properties where hardwiring is impractical.

## When to Test and Replace

- Test alarms at the start of each tenancy.
- Replace alarms every 10 years (or per manufacturer's date).
- Respond immediately to tenant reports of faulty alarms.

## Professional Compliance Checks

Many landlords use professional compliance services that test, certify, and maintain alarms for a small annual fee. This removes the burden and ensures documented compliance.`,
    faq_items: [
      { question: 'Who is responsible for smoke alarm maintenance?', answer: 'The landlord is responsible for installation, testing, and replacement. Tenants must not disable alarms and should report faults.' },
      { question: 'What happens if I don\u2019t comply?', answer: 'Non-compliance can result in fines and, more seriously, liability if a fire occurs and alarms were not functional.' },
    ],
  },
  {
    title: 'Minimum Rental Standards for Landlords',
    slug: 'minimum-rental-standards',
    category: 'Compliance',
    summary: 'The baseline standards every Victorian rental property must meet.',
    hero_image_url: images[2],
    body: `## Victoria\u2019s Minimum Standards

Since 2021, Victorian law sets minimum standards that all rental properties must meet. These standards ensure rentals are safe, secure, and reasonably comfortable. Properties that do not meet these standards cannot be legally leased.

## Key Standards

- **Heating** — a fixed heater in the main living area (energy-efficient where possible).
- **Bathroom** — a functioning bathroom with hot and cold water.
- **Kitchen** — a dedicated cooking area with a sink and cooking appliance.
- **Laundry** — access to a laundry, or reasonable space for a washing machine.
- **Lighting** — adequate natural and artificial lighting in all rooms.
- **Ventilation** — adequate ventilation in bathrooms, kitchens, and laundries.
- **Window coverings** — block-out coverings in bedrooms and living areas.
- **Security** — deadlocks on external doors and window locks.
- **Mould and dampness** — the property must be free from mould and damp caused by the building structure.

## Electrical and Gas Safety

- Electrical safety checks every 2 years.
- Gas safety checks every 2 years.
- Compliance certificates provided to tenants.

## Before Leasing

Ensure your property meets all minimum standards before listing. Non-compliance can void your lease and expose you to penalties.`,
    faq_items: [
      { question: 'Do I need to provide window coverings?', answer: 'Yes. Block-out coverings are required in bedrooms and living areas under Victorian minimum standards.' },
      { question: 'How often do gas and electrical safety checks need to be done?', answer: 'Every 2 years, with compliance certificates provided to the tenant.' },
    ],
  },
  {
    title: 'Routine Inspection Guide',
    slug: 'routine-inspection-guide',
    category: 'Maintenance & Inspections',
    summary: 'What happens during a routine inspection and how to prepare.',
    hero_image_url: images[3],
    body: `## Purpose of Routine Inspections

Routine inspections protect your investment by ensuring the property is being maintained, identifying maintenance issues early, and documenting the property's condition over time.

## Frequency

In Victoria, the first inspection can be conducted 3 months after the tenancy begins, and then every 6 months thereafter.

## What\u2019s Checked

- **Cleanliness** — general tidiness and condition.
- **Maintenance issues** — leaks, damage, wear and tear.
- **Smoke alarms** — visually checked for presence.
- **Gardens and exterior** — condition of yards and outdoor areas.
- **Unauthorised occupants or pets** — if not approved on the lease.

## The Inspection Report

Your property manager documents the inspection with written notes and photos. This report is shared with you and forms part of the property's records.

## Tenant Rights

- The landlord/manager must give at least 7 days written notice.
- Inspections should take no longer than necessary.
- Tenants are not required to be present but may attend.

## Acting on Findings

Address maintenance issues promptly — it shows tenants you care about the property and prevents minor issues from becoming costly repairs.`,
    faq_items: [
      { question: 'How often can I inspect my rental property?', answer: 'The first inspection after 3 months, then every 6 months. A minimum of 7 days written notice is required.' },
      { question: 'Can the tenant refuse an inspection?', answer: 'Tenants cannot refuse a properly noticed inspection, but they may request a different time if the proposed time is unreasonable.' },
    ],
  },
  {
    title: 'Repairs and Maintenance Responsibilities',
    slug: 'repairs-and-maintenance-responsibilities',
    category: 'Maintenance & Inspections',
    summary: 'Who pays for what — understanding landlord and tenant maintenance obligations.',
    hero_image_url: images[4],
    body: `## Landlord vs Tenant Responsibilities

Clear understanding of maintenance responsibilities prevents disputes and ensures the property is well cared for.

## Landlord Responsibilities

The landlord is responsible for maintaining the property in good repair, including:

- **Structural repairs** — roof, walls, foundations.
- **Plumbing and electrical** — fixed fixtures, wiring, pipes.
- **Appliances** — if provided by the landlord (oven, dishwasher).
- **Heating and cooling** — servicing and repair of fixed systems.
- **Compliance** — smoke alarms, gas and electrical safety checks.

## Tenant Responsibilities

Tenants are responsible for:

- **Day-to-day cleanliness** — keeping the property tidy.
- **Minor maintenance** — changing light bulbs, replacing tap washers (in some cases).
- **Reporting issues promptly** — notifying the landlord of needed repairs.
- **Garden maintenance** — if specified in the lease.
- **Damage caused by the tenant** — repairs for damage beyond fair wear and tear.

## Urgent Repairs

Urgent repairs (burst pipes, blocked toilet, gas leak, electrical fault, storm damage) must be addressed immediately. Tenants can arrange urgent repairs up to $2,500 if the landlord is unreachable.

## Best Practice

Establish a clear maintenance request process. Respond to tenant requests within 24\u201348 hours. Use licensed, insured tradespeople. Document all repairs.`,
    faq_items: [
      { question: 'What counts as an urgent repair?', answer: 'Burst pipes, blocked or broken toilets, gas leaks, dangerous electrical faults, serious storm damage, and any fault making the property unsafe or insecure.' },
      { question: 'Who pays for damage caused by the tenant?', answer: 'The tenant is responsible for repairs beyond fair wear and tear. Costs can be recovered from the bond at the end of the tenancy.' },
    ],
  },
  {
    title: 'End of Lease Checklist',
    slug: 'end-of-lease-checklist',
    category: 'End of Lease',
    summary: 'A step-by-step guide to closing out a tenancy cleanly and recovering your bond.',
    hero_image_url: images[5],
    body: `## A Smooth Exit

The end of a tenancy involves several steps to ensure the property is returned in good condition, the bond is handled fairly, and the transition to the next tenant is smooth.

## Step 1: Notice

The tenant provides notice (usually 28 days) of their intention to vacate. Your manager confirms the vacate date and arranges the final inspection.

## Step 2: Pre-Vacate Inspection (Optional)

Some managers offer a pre-vacate walkthrough to identify any cleaning or repair items the tenant should address before leaving.

## Step 3: Final Inspection

Conducted on or after the vacate date, comparing the property's condition to the original condition report. Photos are taken for documentation.

## Step 4: Bond Assessment

- If the property is in good condition, the bond is returned in full.
- If there are issues (damage, cleaning, unpaid rent), the landlord can claim against the bond.
- Both parties must agree, or the matter goes to VCAT for resolution.

## Step 5: Re-Leasing or Sale

- **Re-leasing** — schedule repairs, cleaning, and re-marketing promptly to minimise vacancy.
- **Selling** — coordinate with your sales agent for a smooth transition.

## Minimising Vacancy

The key to minimising vacancy is acting fast. Have cleaners and tradespeople lined up before the tenant leaves, and list the property as soon as the final inspection is complete.`,
    faq_items: [
      { question: 'How long does bond refund take?', answer: 'If both parties agree, the RTBA processes bond refunds within a few business days. Disputes resolved at VCAT take longer.' },
      { question: 'Can I keep the bond for cleaning?', answer: 'You can claim for cleaning if the property is not returned in the same condition as the start of the tenancy (fair wear and tear excepted).' },
    ],
  },
  {
    title: 'Bond and Final Inspection Guide',
    slug: 'bond-and-final-inspection-guide',
    category: 'End of Lease',
    summary: 'Everything landlords need to know about bonds, condition reports, and final inspections.',
    hero_image_url: images[6],
    body: `## Understanding the Bond

The rental bond is a security deposit held by the Residential Tenancies Bond Authority (RTBA) for the duration of the tenancy. It protects the landlord against damage, unpaid rent, or cleaning costs.

## Bond Amount

In Victoria, the bond is equal to one month's rent (for properties renting up to $900 per week). Higher rents may have a different calculation.

## The Condition Report

The condition report is the single most important document at the end of a tenancy. It records the property's condition at the start and is compared against the final inspection.

- **At lease start** — the report is completed and both parties sign.
- **At lease end** — the final inspection compares the property to this report.
- **Disputes** — the condition report is the primary evidence at VCAT.

## Final Inspection Process

1. The tenant vacates and returns keys.
2. Your manager inspects the property against the condition report.
3. Photos document the condition.
4. Any discrepancies (damage, cleaning) are noted.
5. Bond claims are agreed or disputed.

## Fair Wear and Tear

Landlords cannot claim for fair wear and tear — the natural deterioration that occurs over normal use. Claims must be for damage beyond this standard.

## Bond Claims

- Both parties sign a bond claim form.
- If agreed, the RTBA refunds the bond.
- If disputed, either party can apply to VCAT for a ruling.

Good documentation — condition reports, inspection photos, and communication records — is your best protection.`,
    faq_items: [
      { question: 'What is fair wear and tear?', answer: 'The natural deterioration of a property through ordinary use — for example, faded paint or worn carpets. Landlords cannot claim for this.' },
      { question: 'How do I dispute a bond claim?', answer: 'If the tenant disagrees with your claim, you can apply to VCAT for a ruling. The condition report and inspection photos are key evidence.' },
    ],
  },
];