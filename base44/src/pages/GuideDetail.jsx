import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { base44 } from "@/api/base44Client";
import SectionWrapper from "@/components/origin/SectionWrapper";
import CTABanner from "@/components/origin/CTABanner";

const guideContent = {
  "landlord-checklist": {
    title: "Landlord Checklist Before Leasing",
    category: "Getting Started",
    body: `Before you lease your investment property, it's important to make sure everything is in order. This checklist will guide you through the essential steps.\n\n## Property Preparation\n\n- Ensure the property meets minimum rental standards under Victorian legislation\n- Complete any outstanding repairs or maintenance\n- Arrange a professional clean including carpets and windows\n- Check all smoke alarms are compliant and have current batteries\n- Ensure all locks and security features are functional\n- Test all appliances included with the property\n\n## Documentation\n\n- Obtain a current building and landlord insurance policy\n- Prepare a detailed inventory of included fixtures and fittings\n- Gather any warranties or manuals for appliances\n- Have your property's certificate of occupancy available\n\n## Financial Planning\n\n- Understand the tax implications of rental income\n- Set aside funds for ongoing maintenance and unexpected repairs\n- Research comparable rental prices in your suburb\n- Consider your preferred property management fee structure\n\n## Choosing a Property Manager\n\n- Interview at least three property managers\n- Ask about their vacancy rates and average days on market\n- Understand their communication style and reporting frequency\n- Review their management agreement carefully before signing\n\nGetting these foundations right from the start will help ensure a smooth leasing experience and protect your investment long-term.`,
  },
  "what-does-pm-do": {
    title: "What Does a Property Manager Actually Do?",
    category: "Getting Started",
    body: `A good property manager does far more than collect rent. They serve as the professional intermediary between you and your tenant, handling everything from marketing through to maintenance.\n\n## Core Responsibilities\n\n- **Marketing your property** across major portals and networks\n- **Screening tenants** through employment, reference, and identification checks\n- **Managing lease agreements** and ensuring legal compliance\n- **Conducting routine inspections** with detailed photographic reports\n- **Coordinating maintenance** through vetted, licensed trades\n- **Handling rent collection** and arrears management\n- **Providing financial reporting** including monthly statements and annual summaries\n\n## The Value They Bring\n\nA quality property manager protects your time, your asset, and your rental income. They stay across legislative changes so you don't have to, and they act as a professional buffer in tenant relationships.\n\nThe best property managers are proactive — they identify potential issues before they become problems and keep you informed without overwhelming you.\n\n## What to Expect\n\nYou should expect regular communication, transparent reporting, and a genuine interest in the performance of your investment. If you're not getting that from your current manager, it might be time to explore your options.`,
  },
  "rental-appraisal-explained": {
    title: "Rental Appraisal Explained",
    category: "Rental Appraisal",
    body: `A rental appraisal helps you understand what your property is likely to achieve in the current market. Here's how the process works and what factors influence your rental return.\n\n## How Appraisals Work\n\nA property manager will assess your property based on its features, condition, location, and recent comparable rentals in the area. This isn't a formal valuation — it's an informed estimate based on market experience and data.\n\n## Key Factors\n\n- **Location** — proximity to transport, schools, shops, and employment\n- **Property condition** — well-maintained properties attract higher rents\n- **Features** — parking, outdoor space, storage, and modern fittings\n- **Market conditions** — supply and demand, seasonal trends, and vacancy rates\n- **Comparable properties** — what similar properties have recently leased for\n\n## Getting the Price Right\n\nPricing too high leads to extended vacancy. Pricing too low leaves money on the table. A good property manager will help you find the right balance — maximising your return while minimising vacancy days.\n\n## When to Get an Appraisal\n\n- Before leasing for the first time\n- At lease renewal to ensure you're at market rate\n- When considering a property purchase as an investment\n- If you're thinking about switching property managers`,
  },
  "how-to-choose-property-manager": {
    title: "How to Choose a Property Manager in Melbourne",
    category: "Choosing a Manager",
    body: `Choosing the right property manager is one of the most important decisions you'll make as a landlord. Here's what to look for.\n\n## Questions to Ask\n\n- How many properties does each manager in your team look after?\n- What's your average vacancy rate and days on market?\n- How do you handle maintenance requests?\n- What's your communication style — how often will I hear from you?\n- Can I see a sample owner statement?\n\n## Red Flags\n\n- Unusually low fees with no explanation of what's included\n- High staff turnover or difficulty reaching your property manager\n- No clear process for routine inspections or maintenance\n- Pressure to sign a long-term management agreement immediately\n- Poor online reviews or a lack of transparency about fees\n\n## What Good Looks Like\n\nA quality property manager is responsive, transparent, and genuinely invested in the performance of your property. They should make you feel informed without overwhelming you, and they should proactively identify opportunities to improve your rental return.\n\nLook for someone who treats your property as if it were their own investment.`,
  },
  "property-management-cost": {
    title: "How Much Does Property Management Cost?",
    category: "Choosing a Manager",
    body: `Understanding property management fees helps you make an informed decision. Here's a typical breakdown of what you can expect to pay.\n\n## Common Fees\n\n- **Management fee**: 5%–8% of collected rent (ongoing)\n- **Letting fee**: 1–2 weeks' rent (when a new tenant is placed)\n- **Lease renewal fee**: $150–$350 (at lease renewal)\n- **Advertising costs**: $200–$800 (varies by package)\n- **VCAT representation**: $300–$500 (if tribunal attendance is needed)\n\n## What's Usually Included\n\n- Rent collection and disbursement\n- Routine inspections (typically twice per year)\n- Monthly owner statements\n- Maintenance coordination\n- Tenant communication\n- Annual financial summaries\n\n## What to Watch For\n\n- Hidden fees not disclosed upfront\n- Charges for services you'd expect to be included\n- Unclear fee structures that make comparison difficult\n\nThe cheapest option isn't always the best. Consider the overall value — a manager who reduces vacancy, maintains your property well, and keeps quality tenants will more than justify a reasonable fee.`,
  },
  "leasing-process-steps": {
    title: "The Leasing Process Step by Step",
    category: "Leasing Process",
    body: `Leasing your property involves several key stages. Here's what to expect from listing through to lease signing.\n\n## Step 1: Property Preparation\n\nEnsure your property is clean, well-maintained, and meets minimum rental standards. This includes working smoke alarms, secure locks, and functioning appliances.\n\n## Step 2: Rental Appraisal\n\nYour property manager will assess the property and recommend a rental price based on comparable properties and current market conditions.\n\n## Step 3: Marketing\n\nProfessional photography, online listings across major portals, and targeted advertising to attract qualified tenants.\n\n## Step 4: Open Inspections\n\nScheduled viewings allow prospective tenants to inspect the property. Your manager handles all enquiries and bookings.\n\n## Step 5: Applications\n\nApplications are collected and assessed against employment verification, rental references, and identification checks.\n\n## Step 6: Tenant Selection\n\nYour manager presents the top applicants with their recommendation. The final decision is always yours.\n\n## Step 7: Lease Signing\n\nOnce a tenant is selected, the lease agreement is prepared and signed. Bond is collected and lodged with the RTBA.\n\n## Step 8: Condition Report\n\nA detailed condition report with photographs is completed before the tenant moves in, documenting the property's state at the start of the tenancy.`,
  },
  "late-rent-process": {
    title: "What Happens When Rent Is Late?",
    category: "Tenant Selection",
    body: `Late rent payments are one of the most common concerns for landlords. Here's how the process works in Victoria.\n\n## The Timeline\n\n- **Day 1**: Rent is due. If not received, an automated reminder is sent.\n- **Day 7**: If still unpaid, your property manager contacts the tenant directly.\n- **Day 14**: A formal Notice to Vacate for non-payment of rent can be issued.\n- **Beyond 14 days**: If the tenant doesn't pay or vacate, an application can be made to VCAT.\n\n## Our Approach\n\nWe take a firm but fair approach to arrears management. Early intervention is key — most late payments are resolved with a simple phone call within the first few days.\n\n## Prevention\n\nThorough tenant screening is the best prevention. We verify employment, check rental references, and search tenancy databases before recommending any applicant.\n\n## Your Rights\n\nAs a landlord, you have clear legal rights when rent is unpaid. We guide you through each step and handle all formal notices and tribunal applications if needed.`,
  },
  "smoke-alarm-compliance": {
    title: "Smoke Alarm Compliance in Victoria",
    category: "Maintenance & Compliance",
    body: `Victorian landlords have specific obligations around smoke alarms. Here's what you need to know to stay compliant.\n\n## Current Requirements\n\n- Smoke alarms must be installed on every level of the property\n- They must be hardwired or have a 10-year lithium battery\n- Smoke alarms must be tested and maintained at each routine inspection\n- Alarms must comply with Australian Standard AS 3786\n\n## Landlord Responsibilities\n\n- Ensure alarms are installed and working at the start of each tenancy\n- Replace alarms that are older than 10 years\n- Arrange for testing during routine inspections\n- Replace batteries or faulty units promptly\n\n## Tenant Responsibilities\n\n- Test alarms monthly\n- Report any faults to the property manager\n- Do not remove or interfere with smoke alarms\n\n## Consequences of Non-Compliance\n\nFailure to comply with smoke alarm regulations can result in significant fines and potential liability if a fire-related incident occurs. We schedule all compliance checks automatically so nothing is missed.`,
  },
  "routine-inspection-guide": {
    title: "Routine Inspection Guide",
    category: "Maintenance & Compliance",
    body: `Routine inspections are an important part of protecting your investment. Here's what they involve and why they matter.\n\n## How Often\n\nIn Victoria, routine inspections can be conducted twice per year (every six months). The first inspection can occur three months after the tenancy begins.\n\n## What We Check\n\n- General cleanliness and condition of the property\n- Any damage beyond normal wear and tear\n- Smoke alarm functionality\n- Garden and external area maintenance\n- Any unauthorised modifications or occupants\n- Maintenance issues that need attention\n\n## The Report\n\nAfter each inspection, you'll receive a detailed written report with photographs documenting the property's condition. We'll highlight any concerns and recommend maintenance actions.\n\n## Preparing Your Property\n\nTenants are given appropriate notice before each inspection. We approach inspections professionally and respectfully, understanding that it's the tenant's home.\n\n## Why It Matters\n\nRegular inspections help identify small issues before they become expensive problems. They also provide documentation of the property's condition throughout the tenancy, which is important if any disputes arise at the end of the lease.`,
  },
  "end-of-lease-checklist": {
    title: "End of Lease Checklist",
    category: "End of Lease",
    body: `Managing the end of a tenancy smoothly protects both your property and your relationship with outgoing tenants.\n\n## Before Move-Out\n\n- Confirm the lease end date and any notice requirements\n- Discuss the tenant's intentions well before expiry\n- If the tenant is vacating, begin marketing for a new tenant\n- Arrange a pre-vacate inspection to discuss expectations\n\n## At Move-Out\n\n- Conduct a thorough final inspection comparing against the original condition report\n- Document any damage beyond fair wear and tear with photographs\n- Check all keys, remotes, and access devices have been returned\n- Ensure the property has been professionally cleaned\n\n## After Move-Out\n\n- Process the bond claim through the RTBA\n- Arrange any necessary repairs or maintenance\n- Prepare the property for the next tenancy\n- Complete the final financial statement for the tenancy\n\n## Bond Claims\n\nIf there's damage beyond fair wear and tear, we'll lodge a bond claim with supporting documentation. If the tenant disputes the claim, we can guide you through the VCAT process.`,
  },
  "should-i-change-pm": {
    title: "Should I Change Property Manager?",
    category: "FAQs",
    body: `If you're questioning whether your current property manager is the right fit, here are some signs it might be time to explore your options.\n\n## Signs It's Time to Switch\n\n- You struggle to reach your property manager or get timely responses\n- Inspection reports are late, incomplete, or lacking detail\n- You feel out of the loop about what's happening with your property\n- Maintenance issues take too long to resolve\n- Your rental income seems below market rate\n- You're being charged fees you weren't told about upfront\n\n## How Easy Is It?\n\nSwitching property managers is straightforward. Your new manager handles the entire transition, including contacting your current agent, arranging the handover of keys and documents, and transferring the bond.\n\n## What You Need to Know\n\n- Check your current management agreement for any notice period (typically 30 days)\n- Your tenant's lease continues unaffected — only the management changes\n- There's no cost to the tenant and minimal disruption\n\n## Making the Change\n\nIf you're considering a switch, start by having a conversation with a property manager you trust. They can explain the process and help you understand what better service looks like.`,
  },
};

export default function GuideDetail() {
  const { slug } = useParams();
  const guide = guideContent[slug];

  useEffect(() => {
    if (guide) {
      base44.analytics.track({ eventName: "guide_opened", properties: { guide: slug } });
    }
  }, [slug, guide]);

  if (!guide) {
    return (
      <SectionWrapper>
        <div className="text-center py-20">
          <h1 className="font-heading text-2xl text-midnight mb-4">Guide not found</h1>
          <Link to="/property-guides" className="text-golden hover:text-golden/80 text-sm">
            ← Back to Knowledge Centre
          </Link>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <>
      <section className="bg-parchment pt-28 pb-10 md:pt-32 md:pb-14">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <Link to="/property-guides" className="inline-flex items-center gap-2 text-sm text-midnight/50 hover:text-accent-navy transition-colors mb-8">
            <ArrowLeft size={14} />
            Knowledge Centre
          </Link>
          <p className="text-xs font-medium tracking-widest uppercase text-golden mb-4">{guide.category}</p>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-light text-midnight leading-tight">
            {guide.title}
          </h1>
        </div>
      </section>

      <section className="bg-parchment pb-16 md:pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="prose prose-sm max-w-none">
            {guide.body.split("\n\n").map((block, i) => {
              if (block.startsWith("## ")) {
                return <h2 key={i} className="font-heading text-xl font-medium text-midnight mt-10 mb-4">{block.replace("## ", "")}</h2>;
              }
              if (block.startsWith("- ")) {
                const items = block.split("\n").filter(l => l.startsWith("- "));
                return (
                  <ul key={i} className="space-y-2 my-4">
                    {items.map((item, j) => {
                      const text = item.replace("- ", "");
                      const boldMatch = text.match(/^\*\*(.+?)\*\*(.*)$/);
                      return (
                        <li key={j} className="flex items-start gap-3 text-sm text-midnight/65 leading-relaxed">
                          <span className="w-1 h-1 rounded-full bg-golden mt-2 flex-shrink-0" />
                          {boldMatch ? (
                            <span><strong className="text-midnight font-medium">{boldMatch[1]}</strong>{boldMatch[2]}</span>
                          ) : (
                            <span>{text}</span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                );
              }
              return <p key={i} className="text-base text-midnight/60 leading-relaxed mb-4">{block}</p>;
            })}
          </div>
        </div>
      </section>

      <CTABanner
        title="Want to discuss your property?"
        subtitle="Book a conversation with our property management team."
        ctaText="Book a Consultation"
        ctaLink="/book-consultation"
      />
    </>
  );
}