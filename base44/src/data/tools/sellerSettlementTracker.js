/**
 * Origin Tools — Seller Settlement Tracker data.
 * Client-side only. Each milestone drives the guided journey, progress and PDF.
 * aiExplanation is concise plain-language text (max 2 sentences) kept in the DOM
 * (sr-only) on every milestone for SEO and AI visibility.
 */
export const SELLER_SETTLEMENT_MILESTONES = [
  {
    id: "contract_signed",
    title: "Contract Signed",
    taskDescription: "Sign and exchange the Contract of Sale with the buyer. Once exchanged, both parties are committed to the sale.",
    tip: "Keep a copy of the signed contract and stay in contact with your conveyancer.",
    aiExplanation: "The seller signs and exchanges the Contract of Sale with the buyer, making the property sale legally binding.",
  },
  {
    id: "section_32",
    title: "Section 32 & Legal Documents",
    taskDescription: "Ensure all legal documentation has been prepared and any outstanding requests have been addressed.",
    tip: "Respond promptly to document requests to avoid delays.",
    aiExplanation: "All legal documentation required for the sale is prepared and any outstanding buyer requests are addressed.",
  },
  {
    id: "discharge_authority",
    title: "Discharge Authority",
    taskDescription: "Provide your lender with a signed discharge authority if your property has an existing mortgage.",
    tip: "Submit this as early as possible.",
    aiExplanation: "If the property has a mortgage, the seller authorises their lender to discharge it at settlement.",
  },
  {
    id: "settlement_adjustments",
    title: "Settlement Adjustments",
    taskDescription: "Your conveyancer prepares adjustments for council rates, water rates and other applicable outgoings.",
    tip: "Notify your conveyancer if you receive new rates notices.",
    aiExplanation: "The conveyancer calculates adjustments for council rates, water rates and other outgoings between buyer and seller.",
  },
  {
    id: "prepare_property",
    title: "Prepare Property",
    taskDescription: "Remove personal belongings and ensure agreed inclusions remain with the property.",
    tip: "Complete any agreed repairs before settlement.",
    aiExplanation: "The seller removes personal belongings and ensures all agreed inclusions remain with the property.",
  },
  {
    id: "final_inspection",
    title: "Final Inspection",
    taskDescription: "The buyer may inspect the property shortly before settlement.",
    tip: "Ensure the property is presented in substantially the same condition as when sold.",
    aiExplanation: "The buyer inspects the property shortly before settlement to confirm it is in the agreed condition.",
  },
  {
    id: "settlement",
    title: "Settlement",
    taskDescription: "Legal ownership transfers and settlement funds are exchanged.",
    tip: "Remain available should your conveyancer need urgent instructions.",
    aiExplanation: "Legal ownership transfers to the buyer and settlement funds are exchanged between the parties.",
  },
  {
    id: "keys_handover",
    title: "Keys Handover",
    taskDescription: "Provide all keys, remotes and access devices to the buyer.",
    tip: "Double-check garages, mailboxes and security devices.",
    aiExplanation: "The seller provides all keys, remotes and access devices to the buyer or their agent.",
  },
  {
    id: "sale_proceeds",
    title: "Sale Proceeds Received",
    taskDescription: "Settlement has completed and remaining sale proceeds are distributed.",
    tip: "Confirm your nominated bank account details with your conveyancer.",
    aiExplanation: "Settlement is complete and the remaining sale proceeds are distributed to the seller's nominated account.",
  },
];