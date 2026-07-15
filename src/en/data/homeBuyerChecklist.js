/**
 * Origin Home Buyer Journey Checklist — Complete Data (Stage 2)
 * 8 stages, each with categories and tasks.
 * Tasks may include `propertyTypes` to show only for specific property types.
 * A task without `propertyTypes` applies to all property types.
 * Stage 8 focused strictly on settlement and key handover.
 */

const homeBuyerChecklist = [
  {
    id: "stage-1",
    number: 1,
    name: "Property Search",
    description: "Define your requirements and find suitable properties.",
    categories: [
      {
        id: "s1-c1",
        name: "Preparation",
        tasks: [
          {
            id: "s1-c1-t1",
            title: "Define your budget and borrowing capacity",
            defaultResponsible: "Me",
            defaultRisk: "High",
            what: "Work out how much you can afford including stamp duty, legal fees, inspections and moving costs.",
            why: "Prevents you from overcommitting financially.",
            whoHelps: "Mortgage broker, financial adviser.",
            risks: "Searching outside your budget wastes time and creates pressure."
          },
          {
            id: "s1-c1-t2",
            title: "Get mortgage pre-approval",
            defaultResponsible: "Mortgage Broker",
            defaultRisk: "High",
            what: "Apply for conditional loan approval before making offers.",
            why: "Shows sellers you are a serious buyer and confirms your budget.",
            whoHelps: "Mortgage broker, bank.",
            risks: "Without pre-approval, sellers may not take your offer seriously."
          },
          {
            id: "s1-c1-t3",
            title: "Create your property wish list",
            defaultResponsible: "Me",
            defaultRisk: "Low",
            what: "List must-haves, nice-to-haves, non-negotiables and deal breakers.",
            why: "Keeps your search focused and efficient.",
            whoHelps: "Online guides and checklists.",
            risks: "Without clear criteria, you may waste time on unsuitable properties."
          },
          {
            id: "s1-c1-t4",
            title: "Research target suburbs and locations",
            defaultResponsible: "Me",
            defaultRisk: "Medium",
            what: "Check transport, schools, amenities, flood maps, planned developments and crime stats.",
            why: "Location affects lifestyle and long-term property value.",
            whoHelps: "Local council, online data platforms.",
            risks: "Poor location research may lead to regret or financial loss."
          }
        ]
      },
      {
        id: "s1-c2",
        name: "Property Inspections",
        tasks: [
          {
            id: "s1-c2-t1",
            title: "Attend open homes and inspections",
            defaultResponsible: "Me",
            defaultRisk: "Low",
            what: "Visit properties that match your criteria. Take notes and photos.",
            why: "First-hand experience reveals issues that photos hide.",
            whoHelps: "Selling agent provides access.",
            risks: "Relying only on online listings may miss key problems."
          },
          {
            id: "s1-c2-t2",
            title: "Compare properties against your criteria",
            defaultResponsible: "Me",
            defaultRisk: "Low",
            what: "Score each property against your wish list.",
            why: "Objective comparison helps avoid emotional decisions.",
            whoHelps: "Online comparison tools.",
            risks: "Emotional buying can lead to overpaying or buyer's remorse."
          },
          {
            id: "s1-c2-t3",
            title: "Request property documents from selling agent",
            defaultResponsible: "Me",
            defaultRisk: "Medium",
            what: "Ask for the contract of sale, Section 32, strata reports, building plans.",
            why: "Early document review prevents surprises later.",
            whoHelps: "Conveyancer, solicitor.",
            risks: "Missing documents may hide serious legal or structural issues."
          }
        ]
      }
    ]
  },
  {
    id: "stage-2",
    number: 2,
    name: "Due Diligence",
    description: "Investigate the property thoroughly before committing.",
    categories: [
      {
        id: "s2-c1",
        name: "Legal Checks",
        tasks: [
          {
            id: "s2-c1-t1",
            title: "Engage a conveyancer or solicitor",
            defaultResponsible: "Me",
            defaultRisk: "High",
            what: "Appoint a qualified legal professional to review the contract and handle settlement.",
            why: "Legal representation protects your interests throughout the purchase.",
            whoHelps: "Conveyancer, solicitor.",
            risks: "Without legal advice, you may miss unfavourable contract terms."
          },
          {
            id: "s2-c1-t2",
            title: "Review the contract of sale",
            defaultResponsible: "Conveyancer",
            defaultRisk: "High",
            what: "Have your conveyancer review all contract terms, special conditions and inclusions.",
            why: "Identifies risks, unusual clauses or missing protections.",
            whoHelps: "Conveyancer, solicitor.",
            risks: "Signing without review may lock you into unfavourable terms."
          },
          {
            id: "s2-c1-t3",
            title: "Review Section 32 or vendor disclosure",
            defaultResponsible: "Conveyancer",
            defaultRisk: "High",
            what: "Check title details, encumbrances, zoning, easements and planning overlays.",
            why: "Reveals restrictions or liabilities affecting the property.",
            whoHelps: "Conveyancer, solicitor.",
            risks: "Undisclosed encumbrances can restrict how you use the property."
          },
          {
            id: "s2-c1-t4",
            title: "Check strata or body corporate records",
            defaultResponsible: "Conveyancer",
            defaultRisk: "Medium",
            what: "Review meeting minutes, financial statements, levies, by-laws and planned works.",
            why: "Identifies upcoming special levies, disputes or financial problems.",
            whoHelps: "Conveyancer, strata search company.",
            risks: "Hidden levies or building defects can be very costly.",
            propertyTypes: ["apartment", "townhouse"]
          },
          {
            id: "s2-c1-t5",
            title: "Confirm title and ownership details",
            defaultResponsible: "Conveyancer",
            defaultRisk: "High",
            what: "Verify the seller legally owns the property and the title is clear.",
            why: "Prevents fraud and ensures clean title transfer.",
            whoHelps: "Conveyancer, solicitor.",
            risks: "Title defects can delay or prevent settlement."
          }
        ]
      },
      {
        id: "s2-c2",
        name: "Physical Inspections",
        tasks: [
          {
            id: "s2-c2-t1",
            title: "Arrange a building and pest inspection",
            defaultResponsible: "Building Inspector",
            defaultRisk: "High",
            what: "Hire a licensed inspector to check structural integrity, pests, moisture, and safety.",
            why: "Uncovers hidden defects that could cost thousands to repair.",
            whoHelps: "Licensed building and pest inspector.",
            risks: "Skipping this inspection is one of the most common and costly buyer mistakes."
          },
          {
            id: "s2-c2-t2",
            title: "Review building and pest report",
            defaultResponsible: "Me",
            defaultRisk: "High",
            what: "Read the full report. Ask the inspector to explain any findings you don't understand.",
            why: "Understanding severity helps you negotiate or walk away.",
            whoHelps: "Building inspector.",
            risks: "Ignoring report findings can lead to expensive surprise repairs."
          },
          {
            id: "s2-c2-t3",
            title: "Check for asbestos, lead paint or hazardous materials",
            defaultResponsible: "Building Inspector",
            defaultRisk: "High",
            what: "For older properties, confirm whether hazardous materials are present.",
            why: "Removal is expensive and a health risk.",
            whoHelps: "Licensed building inspector, asbestos specialist.",
            risks: "Exposure to hazardous materials is a serious health and safety concern."
          },
          {
            id: "s2-c2-t4",
            title: "Check flood, bushfire and environmental risk zones",
            defaultResponsible: "Me",
            defaultRisk: "High",
            what: "Check local council maps and state planning tools for risk overlays.",
            why: "Affects insurance cost, building rules and resale value.",
            whoHelps: "Local council, insurance broker.",
            risks: "Properties in high-risk zones may be uninsurable or have restrictions."
          }
        ]
      },
      {
        id: "s2-c3",
        name: "Financial Checks",
        tasks: [
          {
            id: "s2-c3-t1",
            title: "Obtain a property valuation",
            defaultResponsible: "Me",
            defaultRisk: "Medium",
            what: "Get an independent valuation to confirm the property is worth the asking price.",
            why: "Protects against overpaying and supports your loan application.",
            whoHelps: "Licensed valuer, mortgage broker.",
            risks: "If the bank valuation is lower than the price, you may need a larger deposit."
          },
          {
            id: "s2-c3-t2",
            title: "Research comparable sales in the area",
            defaultResponsible: "Me",
            defaultRisk: "Medium",
            what: "Check recent sale prices for similar properties in the same suburb.",
            why: "Helps you make an informed offer.",
            whoHelps: "Real estate data platforms.",
            risks: "Without market data, you may overpay or lose out on a fair deal."
          },
          {
            id: "s2-c3-t3",
            title: "Estimate ongoing costs",
            defaultResponsible: "Me",
            defaultRisk: "Medium",
            what: "Calculate council rates, water rates, strata levies, insurance and maintenance.",
            why: "Ensures you can afford the property long-term, not just the purchase price.",
            whoHelps: "Financial adviser, accountant.",
            risks: "Underestimating ongoing costs can cause financial stress."
          }
        ]
      },
      {
        id: "s2-c4",
        name: "Apartment and Strata Checks",
        tasks: [
          {
            id: "s2-c4-t1",
            title: "Review owners corporation certificate",
            defaultResponsible: "Conveyancer",
            defaultRisk: "High",
            what: "Check the formal owners corporation certificate for fees, levies and disputes.",
            why: "Reveals financial health and obligations of the strata scheme.",
            whoHelps: "Conveyancer, owners corporation manager.",
            risks: "Hidden financial problems can lead to unexpected costs.",
            propertyTypes: ["apartment"]
          },
          {
            id: "s2-c4-t2",
            title: "Review administration fund",
            defaultResponsible: "Conveyancer",
            defaultRisk: "Medium",
            what: "Check the administration fund balance and contributions.",
            why: "An underfunded admin fund signals poor financial management.",
            whoHelps: "Conveyancer, owners corporation manager.",
            risks: "Underfunded schemes may raise levies unexpectedly.",
            propertyTypes: ["apartment"]
          },
          {
            id: "s2-c4-t3",
            title: "Review maintenance fund",
            defaultResponsible: "Conveyancer",
            defaultRisk: "Medium",
            what: "Check the maintenance fund for adequate reserves.",
            why: "A healthy fund covers future repairs without special levies.",
            whoHelps: "Conveyancer, owners corporation manager.",
            risks: "Insufficient funds may result in special levies.",
            propertyTypes: ["apartment"]
          },
          {
            id: "s2-c4-t4",
            title: "Review special levies",
            defaultResponsible: "Conveyancer",
            defaultRisk: "High",
            what: "Check for any current or proposed special levies.",
            why: "Special levies are additional costs you must pay.",
            whoHelps: "Conveyancer, owners corporation manager.",
            risks: "Large special levies can add thousands to your costs.",
            propertyTypes: ["apartment"]
          },
          {
            id: "s2-c4-t5",
            title: "Review owners corporation minutes",
            defaultResponsible: "Conveyancer",
            defaultRisk: "Medium",
            what: "Read recent AGM and committee meeting minutes.",
            why: "Reveals disputes, defects and planned works.",
            whoHelps: "Conveyancer, strata search company.",
            risks: "Unresolved disputes or defects may escalate.",
            propertyTypes: ["apartment"]
          },
          {
            id: "s2-c4-t6",
            title: "Review building defects",
            defaultResponsible: "Building Inspector",
            defaultRisk: "High",
            what: "Check for known building defects in strata records.",
            why: "Major defects may require expensive remediation.",
            whoHelps: "Building inspector, strata search company.",
            risks: "Serious defects can significantly reduce property value.",
            propertyTypes: ["apartment"]
          },
          {
            id: "s2-c4-t7",
            title: "Review cladding risks",
            defaultResponsible: "Conveyancer",
            defaultRisk: "High",
            what: "Check for combustible cladding reports or notices.",
            why: "Cladding issues affect safety, insurance and resale.",
            whoHelps: "Conveyancer, building inspector.",
            risks: "Rectification costs can be extremely high.",
            propertyTypes: ["apartment"]
          },
          {
            id: "s2-c4-t8",
            title: "Review lift maintenance",
            defaultResponsible: "Building Inspector",
            defaultRisk: "Medium",
            what: "Check lift service contracts and condition reports.",
            why: "Lift replacement is a major capital expense.",
            whoHelps: "Building inspector, owners corporation manager.",
            risks: "Aging lifts may trigger special levies for replacement.",
            propertyTypes: ["apartment"]
          },
          {
            id: "s2-c4-t9",
            title: "Review fire compliance",
            defaultResponsible: "Building Inspector",
            defaultRisk: "High",
            what: "Check fire safety orders and compliance certificates.",
            why: "Non-compliance may require urgent and costly upgrades.",
            whoHelps: "Building inspector, fire safety consultant.",
            risks: "Fire safety orders can require major expenditure.",
            propertyTypes: ["apartment"]
          },
          {
            id: "s2-c4-t10",
            title: "Review embedded networks",
            defaultResponsible: "Conveyancer",
            defaultRisk: "Medium",
            what: "Check for embedded electricity, gas or water networks.",
            why: "Embedded networks may result in higher utility costs.",
            whoHelps: "Conveyancer, owners corporation manager.",
            risks: "You may pay more for utilities than expected.",
            propertyTypes: ["apartment"]
          },
          {
            id: "s2-c4-t11",
            title: "Review pet rules",
            defaultResponsible: "Conveyancer",
            defaultRisk: "Low",
            what: "Check owners corporation by-laws regarding pets.",
            why: "Pet restrictions may affect your lifestyle.",
            whoHelps: "Conveyancer, owners corporation manager.",
            risks: "Strict pet rules may limit your ability to keep pets.",
            propertyTypes: ["apartment"]
          },
          {
            id: "s2-c4-t12",
            title: "Review short-stay restrictions",
            defaultResponsible: "Conveyancer",
            defaultRisk: "Medium",
            what: "Check by-laws for short-stay or Airbnb restrictions.",
            why: "Short-stay activity can affect noise and building amenity.",
            whoHelps: "Conveyancer, owners corporation manager.",
            risks: "High short-stay turnover may reduce liveability.",
            propertyTypes: ["apartment"]
          },
          {
            id: "s2-c4-t13",
            title: "Review parking allocation",
            defaultResponsible: "Conveyancer",
            defaultRisk: "Medium",
            what: "Confirm your parking space is on title or properly allocated.",
            why: "Parking rights must be legally confirmed.",
            whoHelps: "Conveyancer.",
            risks: "Disputed parking may limit your use of the space.",
            propertyTypes: ["apartment"]
          },
          {
            id: "s2-c4-t14",
            title: "Review storage cage allocation",
            defaultResponsible: "Conveyancer",
            defaultRisk: "Low",
            what: "Confirm any storage cage is included and legally allocated.",
            why: "Storage rights should be documented on title.",
            whoHelps: "Conveyancer.",
            risks: "Undocumented storage may be disputed later.",
            propertyTypes: ["apartment"]
          },
          {
            id: "s2-c4-t15",
            title: "Contact building manager",
            defaultResponsible: "Me",
            defaultRisk: "Low",
            what: "Speak with the building manager about day-to-day operations and issues.",
            why: "Provides first-hand insight into building management quality.",
            whoHelps: "Building manager, owners corporation manager.",
            risks: "Poor building management affects liveability and value.",
            propertyTypes: ["apartment"]
          },
          {
            id: "s2-c4-t16",
            title: "Check building access and security",
            defaultResponsible: "Me",
            defaultRisk: "Low",
            what: "Inspect entry, intercom, swipe access and CCTV systems.",
            why: "Security quality affects safety and insurance.",
            whoHelps: "Building manager.",
            risks: "Poor security may affect safety and resale value.",
            propertyTypes: ["apartment"]
          }
        ]
      },
      {
        id: "s2-c5",
        name: "Townhouse Checks",
        tasks: [
          {
            id: "s2-c5-t1",
            title: "Confirm whether an owners corporation applies",
            defaultResponsible: "Conveyancer",
            defaultRisk: "Medium",
            what: "Check whether the townhouse is part of an owners corporation.",
            why: "Determines whether you pay fees and follow by-laws.",
            whoHelps: "Conveyancer.",
            risks: "Unexpected owners corporation obligations may add costs.",
            propertyTypes: ["townhouse"]
          },
          {
            id: "s2-c5-t2",
            title: "Review shared driveway arrangements",
            defaultResponsible: "Conveyancer",
            defaultRisk: "Medium",
            what: "Check rights and responsibilities for shared driveways.",
            why: "Shared access must be clearly documented.",
            whoHelps: "Conveyancer.",
            risks: "Disputes over shared access can be costly.",
            propertyTypes: ["townhouse"]
          },
          {
            id: "s2-c5-t3",
            title: "Review common property obligations",
            defaultResponsible: "Conveyancer",
            defaultRisk: "Medium",
            what: "Understand what areas you must maintain versus common property.",
            why: "Clarifies maintenance responsibilities and costs.",
            whoHelps: "Conveyancer, owners corporation manager.",
            risks: "Unclear boundaries may lead to disputes.",
            propertyTypes: ["townhouse"]
          },
          {
            id: "s2-c5-t4",
            title: "Review owners corporation fees",
            defaultResponsible: "Conveyancer",
            defaultRisk: "Medium",
            what: "Check recurring owners corporation fees and levies.",
            why: "Ongoing fees affect your total cost of ownership.",
            whoHelps: "Conveyancer, owners corporation manager.",
            risks: "High or rising fees may strain your budget.",
            propertyTypes: ["townhouse"]
          },
          {
            id: "s2-c5-t5",
            title: "Review shared insurance",
            defaultResponsible: "Conveyancer",
            defaultRisk: "Medium",
            what: "Check what the owners corporation insurance covers.",
            why: "Ensures you understand what is and isn't covered.",
            whoHelps: "Conveyancer, insurance broker.",
            risks: "Gaps in shared insurance may leave you exposed.",
            propertyTypes: ["townhouse"]
          },
          {
            id: "s2-c5-t6",
            title: "Review boundary and fencing responsibilities",
            defaultResponsible: "Conveyancer",
            defaultRisk: "Medium",
            what: "Confirm property boundaries and fencing obligations.",
            why: "Boundary disputes can be expensive and stressful.",
            whoHelps: "Conveyancer, surveyor.",
            risks: "Unclear boundaries may cause disputes with neighbours.",
            propertyTypes: ["townhouse"]
          },
          {
            id: "s2-c5-t7",
            title: "Review parking title or allocation",
            defaultResponsible: "Conveyancer",
            defaultRisk: "Low",
            what: "Confirm parking is on title or properly allocated.",
            why: "Parking rights must be legally documented.",
            whoHelps: "Conveyancer.",
            risks: "Disputed parking may limit your use.",
            propertyTypes: ["townhouse"]
          },
          {
            id: "s2-c5-t8",
            title: "Check maintenance responsibilities",
            defaultResponsible: "Me",
            defaultRisk: "Medium",
            what: "Understand which maintenance tasks are yours versus shared.",
            why: "Clarifies ongoing costs and obligations.",
            whoHelps: "Owners corporation manager.",
            risks: "Unexpected maintenance costs may strain your budget.",
            propertyTypes: ["townhouse"]
          }
        ]
      },
      {
        id: "s2-c6",
        name: "House and Land Checks",
        tasks: [
          {
            id: "s2-c6-t1",
            title: "Confirm land boundaries",
            defaultResponsible: "Conveyancer",
            defaultRisk: "Medium",
            what: "Verify property boundaries against the title plan.",
            why: "Ensures you know exactly what land you are buying.",
            whoHelps: "Conveyancer, licensed surveyor.",
            risks: "Boundary errors can cause disputes and costs.",
            propertyTypes: ["house"]
          },
          {
            id: "s2-c6-t2",
            title: "Review fencing condition",
            defaultResponsible: "Building Inspector",
            defaultRisk: "Low",
            what: "Inspect all boundary and internal fencing for condition.",
            why: "Fencing repairs can be a shared cost with neighbours.",
            whoHelps: "Building inspector.",
            risks: "Damaged fencing may require immediate repair.",
            propertyTypes: ["house"]
          },
          {
            id: "s2-c6-t3",
            title: "Review drainage",
            defaultResponsible: "Building Inspector",
            defaultRisk: "High",
            what: "Check stormwater and sewer drainage for blockages or damage.",
            why: "Poor drainage can cause flooding and structural damage.",
            whoHelps: "Building inspector, plumber.",
            risks: "Drainage problems can be very expensive to fix.",
            propertyTypes: ["house"]
          },
          {
            id: "s2-c6-t4",
            title: "Review roof condition",
            defaultResponsible: "Building Inspector",
            defaultRisk: "High",
            what: "Inspect the roof for missing tiles, rust, sagging or leaks.",
            why: "Roof replacement is a major expense.",
            whoHelps: "Building inspector, roofer.",
            risks: "Undetected roof damage can lead to water damage.",
            propertyTypes: ["house"]
          },
          {
            id: "s2-c6-t5",
            title: "Review gutters and downpipes",
            defaultResponsible: "Building Inspector",
            defaultRisk: "Medium",
            what: "Check gutters and downpipes for blockage, rust and alignment.",
            why: "Faulty gutters cause water damage to walls and foundations.",
            whoHelps: "Building inspector.",
            risks: "Neglected gutters can lead to structural water damage.",
            propertyTypes: ["house"]
          },
          {
            id: "s2-c6-t6",
            title: "Review external structures",
            defaultResponsible: "Building Inspector",
            defaultRisk: "Medium",
            what: "Inspect sheds, pergolas, decks and carports for condition and permits.",
            why: "Unpermitted structures may need removal or rectification.",
            whoHelps: "Building inspector, local council.",
            risks: "Illegal structures may require costly removal.",
            propertyTypes: ["house"]
          },
          {
            id: "s2-c6-t7",
            title: "Check permits for extensions",
            defaultResponsible: "Conveyancer",
            defaultRisk: "High",
            what: "Verify that any extensions have council approval and certificates.",
            why: "Unapproved building work may need rectification.",
            whoHelps: "Conveyancer, local council.",
            risks: "Illegal extensions can be expensive to rectify.",
            propertyTypes: ["house"]
          },
          {
            id: "s2-c6-t8",
            title: "Check permits for sheds, decks or pools",
            defaultResponsible: "Conveyancer",
            defaultRisk: "High",
            what: "Confirm all sheds, decks and pools have required permits.",
            why: "Unpermitted structures may need removal or certification.",
            whoHelps: "Conveyancer, local council.",
            risks: "Non-compliant structures may require costly rectification.",
            propertyTypes: ["house"]
          },
          {
            id: "s2-c6-t9",
            title: "Review easements across the land",
            defaultResponsible: "Conveyancer",
            defaultRisk: "Medium",
            what: "Check title for easements, rights of way and covenants.",
            why: "Easements may restrict where you can build or landscape.",
            whoHelps: "Conveyancer.",
            risks: "Unknown easements may block future plans.",
            propertyTypes: ["house"]
          },
          {
            id: "s2-c6-t10",
            title: "Check bushfire or flood overlays",
            defaultResponsible: "Me",
            defaultRisk: "High",
            what: "Check council maps for bushfire or flood-prone overlays.",
            why: "Overlays affect insurance, building rules and safety.",
            whoHelps: "Local council, insurance broker.",
            risks: "High-risk overlays may increase insurance or building costs.",
            propertyTypes: ["house"]
          },
          {
            id: "s2-c6-t11",
            title: "Check pool compliance where applicable",
            defaultResponsible: "Building Inspector",
            defaultRisk: "High",
            what: "Verify pool fencing and barriers meet safety standards.",
            why: "Non-compliant pool barriers are illegal and dangerous.",
            whoHelps: "Building inspector, pool safety inspector.",
            risks: "Non-compliance may result in fines and mandatory upgrades.",
            propertyTypes: ["house"]
          }
        ]
      }
    ]
  },
  {
    id: "stage-3",
    number: 3,
    name: "Negotiation",
    description: "Make offers and negotiate terms with the seller.",
    categories: [
      {
        id: "s3-c1",
        name: "Offer Preparation",
        tasks: [
          {
            id: "s3-c1-t1",
            title: "Decide your maximum purchase price",
            defaultResponsible: "Me",
            defaultRisk: "High",
            what: "Set a firm ceiling based on your valuation, budget and comparable sales.",
            why: "Prevents emotional overbidding.",
            whoHelps: "Mortgage broker.",
            risks: "Exceeding your limit can cause financial hardship."
          },
          {
            id: "s3-c1-t2",
            title: "Prepare your offer with conditions",
            defaultResponsible: "Me",
            defaultRisk: "Medium",
            what: "Include conditions such as subject to finance, building inspection and due diligence.",
            why: "Conditions protect you if problems are discovered.",
            whoHelps: "Conveyancer.",
            risks: "An unconditional offer removes your safety net."
          },
          {
            id: "s3-c1-t3",
            title: "Understand auction rules if applicable",
            defaultResponsible: "Me",
            defaultRisk: "High",
            what: "Know that auction bids are usually unconditional. Complete all due diligence beforehand.",
            why: "You cannot add conditions after winning at auction.",
            whoHelps: "Conveyancer.",
            risks: "Winning at auction without preparation can be very costly."
          }
        ]
      },
      {
        id: "s3-c2",
        name: "Negotiation Process",
        tasks: [
          {
            id: "s3-c2-t1",
            title: "Submit your offer",
            defaultResponsible: "Me",
            defaultRisk: "Medium",
            what: "Present your offer in writing through the selling agent.",
            why: "Written offers create a clear record of terms.",
            whoHelps: "Selling agent.",
            risks: "Verbal offers are not binding and can be misunderstood."
          },
          {
            id: "s3-c2-t2",
            title: "Negotiate price and terms",
            defaultResponsible: "Me",
            defaultRisk: "Medium",
            what: "Respond to counter-offers. Negotiate settlement date, inclusions and conditions.",
            why: "Negotiation can save you money and improve contract terms.",
            whoHelps: "Conveyancer.",
            risks: "Poor negotiation may cost you thousands or lose the property."
          },
          {
            id: "s3-c2-t3",
            title: "Negotiate repairs or price reduction from inspection findings",
            defaultResponsible: "Me",
            defaultRisk: "Medium",
            what: "Use building and pest findings to request repairs or a lower price.",
            why: "You should not pay full price for a property with known defects.",
            whoHelps: "Conveyancer.",
            risks: "Accepting defects without negotiation can be costly."
          }
        ]
      }
    ]
  },
  {
    id: "stage-4",
    number: 4,
    name: "Contract",
    description: "Sign the contract and manage cooling-off conditions.",
    categories: [
      {
        id: "s4-c1",
        name: "Contract Execution",
        tasks: [
          {
            id: "s4-c1-t1",
            title: "Review final contract before signing",
            defaultResponsible: "Conveyancer",
            defaultRisk: "High",
            what: "Have your conveyancer confirm all agreed terms, special conditions and inclusions are correct.",
            why: "Once signed, the contract is legally binding.",
            whoHelps: "Conveyancer, solicitor.",
            risks: "Errors in the final contract can be very difficult to fix."
          },
          {
            id: "s4-c1-t2",
            title: "Sign the contract of sale",
            defaultResponsible: "Me",
            defaultRisk: "High",
            what: "Sign all required documents. Your conveyancer will exchange contracts with the seller.",
            why: "Contract exchange creates a binding agreement.",
            whoHelps: "Conveyancer, solicitor.",
            risks: "Not understanding what you are signing is a significant risk."
          },
          {
            id: "s4-c1-t3",
            title: "Pay the initial deposit",
            defaultResponsible: "Me",
            defaultRisk: "High",
            what: "Transfer the deposit as specified in the contract, usually to the selling agent's trust account.",
            why: "The deposit secures the contract.",
            whoHelps: "Conveyancer, selling agent.",
            risks: "Late deposit payment may breach the contract."
          },
          {
            id: "s4-c1-t4",
            title: "Note cooling-off period dates",
            defaultResponsible: "Me",
            defaultRisk: "High",
            what: "Record the cooling-off start and end dates. Note that auction purchases usually have no cooling-off.",
            why: "Cooling-off gives you a limited window to withdraw.",
            whoHelps: "Conveyancer.",
            risks: "Missing the cooling-off deadline removes your right to withdraw."
          }
        ]
      },
      {
        id: "s4-c2",
        name: "Post-Signing Tasks",
        tasks: [
          {
            id: "s4-c2-t1",
            title: "Confirm all contract conditions are documented",
            defaultResponsible: "Conveyancer",
            defaultRisk: "Medium",
            what: "Verify that finance, inspection and other conditions have clear deadlines.",
            why: "Missing or vague conditions may not protect you.",
            whoHelps: "Conveyancer, solicitor.",
            risks: "Unenforceable conditions leave you exposed."
          },
          {
            id: "s4-c2-t2",
            title: "Notify your mortgage broker or bank",
            defaultResponsible: "Me",
            defaultRisk: "High",
            what: "Inform your lender that contracts have been exchanged and provide the contract details.",
            why: "Starts the formal loan approval process.",
            whoHelps: "Mortgage broker, bank.",
            risks: "Delays in notifying your lender can jeopardise finance approval."
          },
          {
            id: "s4-c2-t3",
            title: "Arrange building insurance from contract date",
            defaultResponsible: "Me",
            defaultRisk: "High",
            what: "In some states, risk passes to the buyer at contract exchange. Arrange insurance immediately.",
            why: "Protects you against damage between exchange and settlement.",
            whoHelps: "Insurance broker.",
            risks: "If the property is damaged and uninsured, the loss may be yours."
          }
        ]
      }
    ]
  },
  {
    id: "stage-5",
    number: 5,
    name: "Finance",
    description: "Secure formal loan approval and manage finance conditions.",
    categories: [
      {
        id: "s5-c1",
        name: "Loan Approval",
        tasks: [
          {
            id: "s5-c1-t1",
            title: "Submit formal loan application",
            defaultResponsible: "Mortgage Broker",
            defaultRisk: "High",
            what: "Provide all required documents: ID, income evidence, bank statements, contract of sale.",
            why: "Formal approval confirms the bank will lend you the money.",
            whoHelps: "Mortgage broker, bank.",
            risks: "Incomplete documents delay approval and risk breaching the finance deadline."
          },
          {
            id: "s5-c1-t2",
            title: "Bank orders property valuation",
            defaultResponsible: "Mortgage Broker",
            defaultRisk: "Medium",
            what: "The bank arranges its own valuation to confirm the property's value.",
            why: "The bank needs to confirm the property is adequate security for the loan.",
            whoHelps: "Mortgage broker, bank valuer.",
            risks: "A low valuation may require a larger deposit or renegotiation."
          },
          {
            id: "s5-c1-t3",
            title: "Receive formal loan approval",
            defaultResponsible: "Mortgage Broker",
            defaultRisk: "High",
            what: "Receive unconditional approval in writing from the lender.",
            why: "Without formal approval, you cannot proceed to settlement.",
            whoHelps: "Mortgage broker, bank.",
            risks: "Conditional approval is not the same as formal approval."
          },
          {
            id: "s5-c1-t4",
            title: "Review and sign loan documents",
            defaultResponsible: "Me",
            defaultRisk: "High",
            what: "Read all loan terms including interest rate, fees, repayment schedule and conditions.",
            why: "You are committing to a long-term financial obligation.",
            whoHelps: "Mortgage broker, solicitor.",
            risks: "Not reading loan terms can lead to unexpected costs."
          }
        ]
      },
      {
        id: "s5-c2",
        name: "Finance Conditions",
        tasks: [
          {
            id: "s5-c2-t1",
            title: "Satisfy the finance condition by the deadline",
            defaultResponsible: "Me",
            defaultRisk: "High",
            what: "Confirm formal approval and notify your conveyancer before the finance condition date.",
            why: "Missing this deadline may void the contract or forfeit your deposit.",
            whoHelps: "Mortgage broker, conveyancer.",
            risks: "This is one of the most critical deadlines in the buying process."
          },
          {
            id: "s5-c2-t2",
            title: "Confirm deposit and stamp duty funds are ready",
            defaultResponsible: "Me",
            defaultRisk: "High",
            what: "Ensure the balance of deposit and stamp duty are accessible before settlement.",
            why: "Insufficient funds can delay or prevent settlement.",
            whoHelps: "Mortgage broker, accountant.",
            risks: "Unexpected shortfalls are stressful and can breach the contract."
          },
          {
            id: "s5-c2-t3",
            title: "Check for first home buyer grants or concessions",
            defaultResponsible: "Me",
            defaultRisk: "Low",
            what: "Check eligibility for state grants, stamp duty concessions or other assistance.",
            why: "Can save you thousands of dollars.",
            whoHelps: "Mortgage broker, conveyancer, state revenue office.",
            risks: "Missing application deadlines may forfeit your entitlement."
          }
        ]
      }
    ]
  },
  {
    id: "stage-6",
    number: 6,
    name: "Settlement Preparation",
    description: "Prepare everything needed for a smooth settlement.",
    categories: [
      {
        id: "s6-c1",
        name: "Pre-Settlement Tasks",
        tasks: [
          {
            id: "s6-c1-t1",
            title: "Confirm settlement date with all parties",
            defaultResponsible: "Conveyancer",
            defaultRisk: "High",
            what: "Confirm the date with your conveyancer, lender and the seller's side.",
            why: "All parties must be prepared for the same date.",
            whoHelps: "Conveyancer, mortgage broker.",
            risks: "Miscommunication can delay settlement."
          },
          {
            id: "s6-c1-t2",
            title: "Arrange final inspection before settlement",
            defaultResponsible: "Me",
            defaultRisk: "High",
            what: "Inspect the property one last time to check it matches contract condition.",
            why: "Confirms no damage, all inclusions are present and agreed repairs completed.",
            whoHelps: "Selling agent provides access.",
            risks: "Skipping the final inspection removes your last chance to identify problems."
          },
          {
            id: "s6-c1-t3",
            title: "Confirm utility connections and transfers",
            defaultResponsible: "Me",
            defaultRisk: "Low",
            what: "Arrange electricity, gas, water, internet and council transfers for settlement day.",
            why: "Ensures services are connected when you move in.",
            whoHelps: "Utility providers.",
            risks: "Delays in connection can leave you without essential services."
          },
          {
            id: "s6-c1-t4",
            title: "Set up mail redirection",
            defaultResponsible: "Me",
            defaultRisk: "Low",
            what: "Redirect mail from your current address to your new address.",
            why: "Prevents missing important correspondence.",
            whoHelps: "Australia Post.",
            risks: "Missing bills or official letters can cause problems."
          }
        ]
      },
      {
        id: "s6-c2",
        name: "Financial Preparation",
        tasks: [
          {
            id: "s6-c2-t1",
            title: "Confirm settlement funds with your lender",
            defaultResponsible: "Mortgage Broker",
            defaultRisk: "High",
            what: "Verify the lender is ready to release funds on settlement day.",
            why: "Settlement cannot proceed without the funds.",
            whoHelps: "Mortgage broker, bank.",
            risks: "Last-minute funding issues can delay settlement."
          },
          {
            id: "s6-c2-t2",
            title: "Pay remaining stamp duty if not included in loan",
            defaultResponsible: "Me",
            defaultRisk: "High",
            what: "Pay stamp duty to the state revenue office by the due date.",
            why: "Required by law and must be paid before or at settlement.",
            whoHelps: "Conveyancer, state revenue office.",
            risks: "Late payment attracts penalties and interest."
          },
          {
            id: "s6-c2-t3",
            title: "Confirm settlement adjustments",
            defaultResponsible: "Conveyancer",
            defaultRisk: "Medium",
            what: "Check the settlement statement for council rates, water rates and strata adjustments.",
            why: "Ensures you only pay your share from settlement day forward.",
            whoHelps: "Conveyancer.",
            risks: "Errors in adjustments can cost you money."
          }
        ]
      }
    ]
  },
  {
    id: "stage-7",
    number: 7,
    name: "Settlement Readiness",
    description: "Final checks before settlement day.",
    categories: [
      {
        id: "s7-c1",
        name: "Final Checks",
        tasks: [
          {
            id: "s7-c1-t1",
            title: "Complete final property inspection",
            defaultResponsible: "Me",
            defaultRisk: "High",
            what: "Walk through the property. Check all rooms, fixtures, inclusions and agreed repairs.",
            why: "This is your last opportunity to identify issues before settlement.",
            whoHelps: "Selling agent provides access.",
            risks: "Post-settlement claims are difficult and expensive to pursue."
          },
          {
            id: "s7-c1-t2",
            title: "Document any issues found during final inspection",
            defaultResponsible: "Me",
            defaultRisk: "Medium",
            what: "Photograph and record any damage or missing items. Report to your conveyancer immediately.",
            why: "Evidence is needed to pursue claims or negotiate holdbacks.",
            whoHelps: "Conveyancer.",
            risks: "Without evidence, post-settlement claims may fail."
          },
          {
            id: "s7-c1-t3",
            title: "Confirm all contract conditions have been satisfied",
            defaultResponsible: "Conveyancer",
            defaultRisk: "High",
            what: "Verify finance, inspection and all special conditions have been met.",
            why: "Unsatisfied conditions can delay or prevent settlement.",
            whoHelps: "Conveyancer.",
            risks: "Proceeding with unsatisfied conditions creates legal risk."
          },
          {
            id: "s7-c1-t4",
            title: "Confirm settlement is proceeding on schedule",
            defaultResponsible: "Conveyancer",
            defaultRisk: "High",
            what: "Get final confirmation from your conveyancer that everything is in order.",
            why: "Last chance to resolve any outstanding issues.",
            whoHelps: "Conveyancer, mortgage broker.",
            risks: "Unexpected delays on settlement day are extremely stressful."
          }
        ]
      },
      {
        id: "s7-c2",
        name: "Move Planning",
        tasks: [
          {
            id: "s7-c2-t1",
            title: "Book removalists or arrange moving help",
            defaultResponsible: "Me",
            defaultRisk: "Low",
            what: "Book professional movers or organise help. Confirm dates and access arrangements.",
            why: "Moving day logistics need advance planning.",
            whoHelps: "Removalist company.",
            risks: "Last-minute bookings are expensive and may not be available."
          },
          {
            id: "s7-c2-t2",
            title: "Update your address with banks, insurers and government",
            defaultResponsible: "Me",
            defaultRisk: "Low",
            what: "Notify banks, insurance companies, ATO, Medicare, electoral roll and subscriptions.",
            why: "Ensures important communications reach you.",
            whoHelps: "No one — this is a personal task.",
            risks: "Missing official communications can cause penalties or service disruptions."
          },
          {
            id: "s7-c2-t3",
            title: "Arrange contents insurance for your new home",
            defaultResponsible: "Me",
            defaultRisk: "Medium",
            what: "Set up contents insurance to start from your move-in date.",
            why: "Protects your belongings from theft, damage or disaster.",
            whoHelps: "Insurance broker.",
            risks: "Uninsured contents are an avoidable financial risk."
          }
        ]
      }
    ]
  },
  {
    id: "stage-8",
    number: 8,
    name: "Key Handover",
    description: "Settlement completes and you receive the keys.",
    categories: [
      {
        id: "s8-c1",
        name: "Settlement Day",
        tasks: [
          {
            id: "s8-c1-t1",
            title: "Settlement is completed",
            defaultResponsible: "Conveyancer",
            defaultRisk: "High",
            what: "Your conveyancer confirms funds have been transferred and title has been registered.",
            why: "Settlement completion means you legally own the property.",
            whoHelps: "Conveyancer, mortgage broker.",
            risks: "Failed settlement can require renegotiation and additional costs."
          },
          {
            id: "s8-c1-t2",
            title: "Key release authorised",
            defaultResponsible: "Conveyancer",
            defaultRisk: "Medium",
            what: "Confirm the seller's conveyancer has authorised the selling agent to release keys.",
            why: "Keys cannot be released without formal authorisation.",
            whoHelps: "Conveyancer, selling agent.",
            risks: "Without authorisation, key collection will be delayed."
          }
        ]
      },
      {
        id: "s8-c2",
        name: "Key Handover",
        tasks: [
          {
            id: "s8-c2-t1",
            title: "Collect keys from selling agent",
            defaultResponsible: "Me",
            defaultRisk: "Low",
            what: "Collect all keys, remotes, security codes and access cards from the selling agent.",
            why: "You need access to your new property.",
            whoHelps: "Selling agent.",
            risks: "Ensure you receive all access items on settlement day."
          },
          {
            id: "s8-c2-t2",
            title: "Confirm keys, remotes and access devices",
            defaultResponsible: "Me",
            defaultRisk: "Low",
            what: "Check that all keys, garage remotes and access fobs are present and working.",
            why: "Missing or faulty access devices need immediate follow-up.",
            whoHelps: "Selling agent.",
            risks: "Missing items may be difficult to recover later."
          },
          {
            id: "s8-c2-t3",
            title: "Confirm alarm codes",
            defaultResponsible: "Me",
            defaultRisk: "Medium",
            what: "Obtain and test all alarm and security codes.",
            why: "You need to control the security system immediately.",
            whoHelps: "Selling agent, previous owner.",
            risks: "Unknown alarm codes may trigger false alarms or lockouts."
          },
          {
            id: "s8-c2-t4",
            title: "Confirm building access where applicable",
            defaultResponsible: "Me",
            defaultRisk: "Low",
            what: "Test intercom, swipe cards, fobs and building entry systems.",
            why: "Ensures you can access all common areas and your property.",
            whoHelps: "Building manager.",
            risks: "Faulty access may prevent entry to your home.",
            propertyTypes: ["apartment", "townhouse"]
          },
          {
            id: "s8-c2-t5",
            title: "Record key handover completion",
            defaultResponsible: "Me",
            defaultRisk: "Low",
            what: "Record that all keys and access devices have been received and tested.",
            why: "Creates a record confirming handover is complete.",
            whoHelps: "No one — this is a personal task.",
            risks: "No record may make disputes difficult to resolve."
          }
        ]
      }
    ]
  }
];

export default homeBuyerChecklist;