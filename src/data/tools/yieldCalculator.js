/**
 * Origin Tools — Investment Yield Calculator data & calculations.
 * All client-side. No AI, no backend, no external APIs.
 */

export const DEFAULT_INPUTS = {
  propertyValue: "",
  weeklyRent: "",
  vacancyPct: "5",
  loanAmount: "",
  interestRate: "6",
  repaymentType: "interest-only",
  councilRates: "",
  waterRates: "",
  strataFees: "",
  insurance: "",
  maintenance: "",
  landTax: "",
  otherCosts: "",
  mgmtFeePct: "7",
};

const num = (v) => parseFloat(v) || 0;

export function calculateYield(inputs) {
  const propertyValue = num(inputs.propertyValue);
  const weeklyRent = num(inputs.weeklyRent);
  const vacancyPct = num(inputs.vacancyPct);
  const loanAmount = num(inputs.loanAmount);
  const interestRate = num(inputs.interestRate);
  const councilRates = num(inputs.councilRates);
  const waterRates = num(inputs.waterRates);
  const strataFees = num(inputs.strataFees);
  const insurance = num(inputs.insurance);
  const maintenance = num(inputs.maintenance);
  const landTax = num(inputs.landTax);
  const otherCosts = num(inputs.otherCosts);
  const mgmtFeePct = num(inputs.mgmtFeePct);

  const annualRent = weeklyRent * 52;
  const vacancyCost = annualRent * (vacancyPct / 100);
  const mgmtFee = annualRent * (mgmtFeePct / 100);
  const grossYield = propertyValue > 0 ? (annualRent / propertyValue) * 100 : 0;
  const totalExpenses =
    vacancyCost + mgmtFee + councilRates + waterRates + strataFees + insurance + maintenance + landTax + otherCosts;
  const annualInterest = loanAmount * (interestRate / 100);
  const netIncomeBeforeLoan = annualRent - totalExpenses;
  const netYield = propertyValue > 0 ? (netIncomeBeforeLoan / propertyValue) * 100 : 0;
  const annualCashflow = annualRent - totalExpenses - annualInterest;
  const monthlyCashflow = annualCashflow / 12;
  const weeklyCashflow = annualCashflow / 52;

  return {
    annualRent,
    vacancyCost,
    mgmtFee,
    grossYield,
    totalExpenses,
    annualInterest,
    netIncomeBeforeLoan,
    netYield,
    annualCashflow,
    monthlyCashflow,
    weeklyCashflow,
  };
}

export function getInvestorSummary(annualCashflow) {
  if (annualCashflow > 1000)
    return "Based on your inputs, this property appears to have positive pre-tax cashflow.";
  if (annualCashflow < -1000)
    return "Based on your inputs, this property appears to have negative pre-tax cashflow. Consider reviewing the rent, purchase price, loan amount, interest rate, or holding costs.";
  return "Based on your inputs, this property appears close to neutral pre-tax cashflow.";
}

export const cashflowTone = (v) => (v > 0 ? "positive" : v < 0 ? "negative" : "neutral");

export const fmtCurrency = (v) =>
  (Number(v) || 0).toLocaleString("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 });

export const fmtCurrency2 = (v) =>
  (Number(v) || 0).toLocaleString("en-AU", { style: "currency", currency: "AUD", minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const fmtPct = (v) => `${(Number(v) || 0).toFixed(2)}%`;

export const DISCLAIMER =
  "This calculator provides general estimates only. It does not include tax depreciation, personal tax treatment, stamp duty, loan fees, principal repayments, capital growth, vacancy risk, legal advice, financial advice or lending advice. Please seek professional advice before making property or finance decisions.";

export const FAQS = [
  {
    question: "What is gross rental yield?",
    answer:
      "Gross rental yield is the annual rental income expressed as a percentage of the property's value, before expenses. It helps investors quickly compare the income return of different properties. It is calculated as annual rent divided by property value, multiplied by 100.",
  },
  {
    question: "What is net rental yield?",
    answer:
      "Net rental yield factors in operating expenses such as council rates, water rates, insurance, maintenance, owners corporation fees, property management costs and vacancy allowance. It gives a more realistic picture of the income return after holding costs, before loan interest.",
  },
  {
    question: "What costs should property investors consider?",
    answer:
      "Key holding costs include council rates, water rates, owners corporation or strata fees, landlord insurance, a maintenance allowance, land tax, property management fees, and a vacancy allowance. Loan interest is a separate financing cost that affects your pre-tax cashflow.",
  },
  {
    question: "Does this calculator include tax?",
    answer:
      "No. This calculator provides pre-tax estimates only. It does not include income tax, negative gearing benefits, depreciation, capital gains tax, or stamp duty. Speak to a registered tax professional for after-tax analysis specific to your circumstances.",
  },
  {
    question: "Should I use rental yield alone to assess a property?",
    answer:
      "No. Rental yield is one factor. Also consider capital growth potential, location, property condition, tenant demand, your finance structure, and your overall investment strategy. A professional investment property review can help you weigh these factors together.",
  },
];

export const RESOURCES = [
  { title: "Property Management", text: "Full-service leasing, tenant management and compliance for Melbourne investment properties.", link: "/property-management", label: "Explore service" },
  { title: "Buyer Advisory", text: "Professional buyer representation and due diligence for property investors.", link: "/buyer-advisory", label: "Learn more" },
  { title: "Mortgage & Finance", text: "Finance guidance and home loan support for investment property purchases.", link: "/mortgage-finance", label: "Explore service" },
  { title: "Readiness Checklist", text: "Prepare your rental property before leasing with this interactive landlord checklist.", link: "/tools/property-management-readiness-checklist", label: "Open tool" },
];