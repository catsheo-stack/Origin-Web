/**
 * Origin Tools — Buyer Settlement Tracker data.
 * Client-side only. Each milestone drives the guided journey, progress and PDF.
 * aiExplanation is concise plain-language text (max 2 sentences) kept in the DOM
 * (sr-only) on every milestone for SEO and AI visibility.
 */
export const SETTLEMENT_MILESTONES = [
  {
    id: "contract_signed",
    title: "Contract Signed",
    taskDescription: "Sign and exchange the contract of sale with the seller. Once exchanged, both parties are committed to the purchase.",
    tip: "Keep a copy of the signed contract and share it with your conveyancer.",
    aiExplanation: "The contract of sale is signed and exchanged between buyer and seller, making the property purchase legally binding.",
  },
  {
    id: "deposit_paid",
    title: "Deposit Paid",
    taskDescription: "Pay the agreed deposit into the selling agent's trust account. Keep a copy of the payment confirmation.",
    tip: "Always verify the trust account details with your conveyancer or agent before transferring funds.",
    aiExplanation: "The buyer pays the deposit into the selling agent's trust account, securing the contract of sale.",
  },
  {
    id: "finance_approval",
    title: "Finance Approval",
    taskDescription: "Obtain formal loan approval from your lender so funds are confirmed and ready for settlement.",
    tip: "Provide all requested documents promptly to avoid delays in formal approval.",
    aiExplanation: "Your lender confirms your loan and prepares the documents required before settlement.",
  },
  {
    id: "building_inspection",
    title: "Building Inspection",
    taskDescription: "Arrange an independent building inspection to identify any significant defects before settlement.",
    tip: "Use a qualified, independent inspector and read the full report carefully.",
    aiExplanation: "Arrange an inspection to identify significant property defects before settlement.",
  },
  {
    id: "loan_documents",
    title: "Loan Documents",
    taskDescription: "Sign and return the mortgage documents from your lender so your loan can be finalised for settlement.",
    tip: "Check all names, amounts and account details before signing.",
    aiExplanation: "The lender issues mortgage documents for the buyer to sign, finalising the loan facility ahead of settlement.",
  },
  {
    id: "insurance",
    title: "Insurance",
    taskDescription: "Arrange building insurance and provide the certificate of currency to your lender before settlement.",
    tip: "Confirm your cover starts from the settlement date.",
    aiExplanation: "Building insurance is arranged before settlement and the certificate of currency is provided to the lender.",
  },
  {
    id: "final_inspection",
    title: "Final Inspection",
    taskDescription: "Complete a final inspection to confirm the property is in the agreed condition with all inclusions present.",
    tip: "Check appliances, fittings, keys and that all agreed items are present.",
    aiExplanation: "The buyer completes a final inspection of the property to confirm condition and inclusions before settlement.",
  },
  {
    id: "settlement",
    title: "Settlement",
    taskDescription: "Confirm your conveyancer and lender are ready, then attend settlement to formally transfer ownership.",
    tip: "Ensure all funds are in place a few days before settlement.",
    aiExplanation: "Settlement occurs — the balance of the purchase price is paid and ownership of the property transfers from seller to buyer.",
  },
  {
    id: "keys_collected",
    title: "Keys Collected",
    taskDescription: "Collect all keys, remotes and access devices from the selling agent after settlement is confirmed.",
    tip: "Check that every key and remote works before leaving the agency.",
    aiExplanation: "The buyer collects the keys from the selling agent, taking possession of the property after settlement.",
  },
];