/**
 * Origin Tools — Origin Home Buying Planner
 * All client-side calculations. No AI, no backend, no external APIs.
 * Estimates only — stamp duty, LMI, borrowing capacity and repayments
 * are indicative and vary by state, lender and individual circumstances.
 */

export const DEFAULT_INPUTS = {
  buyerType: "",
  timeframe: "",
  state: "VIC",
  suburb: "",
  annualIncome: "",
  partnerIncome: "",
  rentalIncome: "",
  otherIncome: "",
  savings: "",
  familyGift: "",
  fhssAmount: "",
  equityFromProperty: "",
  otherFunds: "",
  livingExpenses: "",
  carLoan: "",
  creditCardRepayments: "",
  hecs: "",
  childcare: "",
  schoolFees: "",
  otherLoans: "",
  propertyType: "",
  purchasePrice: "",
  depositPercentage: "20",
  interestRate: "6.5",
  loanTerm: "30",
  weeklyRent: "",
};

export const BUYER_TYPES = [
  { value: "First Home Buyer", desc: "Buying your first property" },
  { value: "Owner Occupier", desc: "Buying a home to live in" },
  { value: "Investor", desc: "Buying as an investment" },
  { value: "Upgrader", desc: "Selling to buy a larger home" },
  { value: "Downsizer", desc: "Selling to buy a smaller home" },
];

export const PROPERTY_TYPES = ["House", "Apartment", "Townhouse", "Land", "Investment Property"];

export const STATES = [
  { value: "VIC", label: "Victoria" },
  { value: "NSW", label: "New South Wales" },
  { value: "QLD", label: "Queensland" },
  { value: "SA", label: "South Australia" },
  { value: "WA", label: "Western Australia" },
  { value: "ACT", label: "Australian Capital Territory" },
  { value: "TAS", label: "Tasmania" },
  { value: "NT", label: "Northern Territory" },
];

export const TIMELINES = ["Just researching", "Within 3 months", "3–6 months", "6–12 months", "Over 12 months"];

export const STEPS = [
  { title: "Buyer Profile", subtitle: "Your buying situation, income, deposit and commitments" },
  { title: "Property Preference", subtitle: "The property you're considering" },
];

export const num = (v) => parseFloat(v) || 0;

export const fmtCurrency = (v) =>
  (Number(v) || 0).toLocaleString("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 });

export const fmtPct = (v) => `${(Number(v) || 0).toFixed(1)}%`;

/* ---------- Stamp Duty ---------- */

function vicGeneralDuty(value) {
  if (value <= 0) return 0;
  if (value <= 25000) return value * 0.014;
  if (value <= 130000) return 350 + (value - 25000) * 0.024;
  if (value <= 960000) return 2870 + (value - 130000) * 0.06;
  return value * 0.055;
}

const STATE_DUTY_RATES = {
  NSW: 0.0409, QLD: 0.035, SA: 0.051, WA: 0.038, ACT: 0.045, TAS: 0.042, NT: 0.049,
};

export function calculateStampDuty(price, state, isFirstHomeBuyer) {
  if (price <= 0) return 0;
  if (state === "VIC") {
    if (isFirstHomeBuyer && price <= 600000) return 0;
    if (isFirstHomeBuyer && price <= 750000)
      return vicGeneralDuty(price) * (price - 600000) / 150000;
    return vicGeneralDuty(price);
  }
  return price * (STATE_DUTY_RATES[state] || 0.045);
}

/* ---------- Buying Costs ---------- */

export function calculateBuyingCosts(inputs) {
  const price = num(inputs.purchasePrice);
  const state = inputs.state || "VIC";
  const isFirstHomeBuyer = inputs.buyerType === "First Home Buyer";
  const hasPrice = price > 0;

  const stampDuty = calculateStampDuty(price, state, isFirstHomeBuyer);
  const conveyancingFee = hasPrice ? 1500 : 0;
  const buildingInspection = hasPrice ? 500 : 0;
  const pestInspection = hasPrice ? 350 : 0;
  const governmentRegistrationFees = hasPrice ? 200 : 0;
  const transferFees = hasPrice ? 150 : 0;
  const mortgageRegistration = hasPrice ? 150 : 0;
  const loanEstablishmentCosts = hasPrice ? 600 : 0;

  const depositPct = num(inputs.depositPercentage);
  const lvr = 100 - depositPct;
  const loanAmount = price * (1 - depositPct / 100);
  let lmi = 0;
  if (lvr > 80 && loanAmount > 0) {
    const lmiRate = lvr <= 85 ? 0.015 : lvr <= 90 ? 0.022 : 0.032;
    lmi = loanAmount * lmiRate;
  }

  const totalBuyingCosts =
    stampDuty + conveyancingFee + buildingInspection + pestInspection +
    governmentRegistrationFees + transferFees + mortgageRegistration +
    loanEstablishmentCosts + lmi;

  return {
    stampDuty, conveyancingFee, buildingInspection, pestInspection,
    governmentRegistrationFees, transferFees, mortgageRegistration,
    loanEstablishmentCosts, lmi, totalBuyingCosts,
  };
}

/* ---------- Full Results ---------- */

export function calculateResults(inputs) {
  const price = num(inputs.purchasePrice);
  const depositPct = num(inputs.depositPercentage);
  const interestRate = num(inputs.interestRate);
  const loanTerm = num(inputs.loanTerm) || 30;

  const totalIncome = num(inputs.annualIncome) + num(inputs.partnerIncome) +
    num(inputs.rentalIncome) + num(inputs.otherIncome);
  const monthlyIncome = totalIncome / 12;

  const totalDeposit = num(inputs.savings) + num(inputs.familyGift) +
    num(inputs.fhssAmount) + num(inputs.equityFromProperty) + num(inputs.otherFunds);

  const monthlyCommitments = num(inputs.livingExpenses) + num(inputs.carLoan) +
    num(inputs.creditCardRepayments) + num(inputs.hecs) + num(inputs.childcare) +
    num(inputs.schoolFees) + num(inputs.otherLoans);

  const loanAmount = price * (1 - depositPct / 100);
  const lvr = price > 0 ? (loanAmount / price) * 100 : 0;

  const monthlyRate = interestRate / 100 / 12;
  const numMonths = loanTerm * 12;
  let monthlyRepayment = 0;
  if (monthlyRate > 0 && loanAmount > 0) {
    monthlyRepayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numMonths)) /
      (Math.pow(1 + monthlyRate, numMonths) - 1);
  }
  const weeklyRepayment = monthlyRepayment / 4.33;

  const buyingCosts = calculateBuyingCosts(inputs);
  const depositUsed = price * (depositPct / 100);
  const cashRemaining = totalDeposit - depositUsed - buyingCosts.totalBuyingCosts;
  const emergencyBuffer = monthlyCommitments > 0 ? Math.round(cashRemaining / monthlyCommitments) : 0;

  const repaymentToIncomeRatio = monthlyIncome > 0 ? (monthlyRepayment / monthlyIncome) * 100 : 0;
  const debtToIncomeRatio = monthlyIncome > 0 ? (monthlyCommitments / monthlyIncome) * 100 : 0;

  const availableForMortgage = Math.max(0, monthlyIncome - monthlyCommitments) * 0.30;
  let maxLoan = 0;
  if (monthlyRate > 0 && availableForMortgage > 0) {
    maxLoan = availableForMortgage * (Math.pow(1 + monthlyRate, numMonths) - 1) /
      (monthlyRate * Math.pow(1 + monthlyRate, numMonths));
  }
  const estimatedPurchaseBudget = maxLoan + totalDeposit;
  const estimatedDepositRequired = price > 0 ? price * 0.20 + buyingCosts.totalBuyingCosts : 0;

  return {
    totalIncome, monthlyIncome, totalDeposit, monthlyCommitments,
    loanAmount, lvr, monthlyRepayment, weeklyRepayment, buyingCosts,
    cashRemaining, emergencyBuffer, repaymentToIncomeRatio, debtToIncomeRatio,
    estimatedPurchaseBudget, estimatedDepositRequired, depositUsed,
  };
}

/* ---------- Budget Health Score ---------- */

export function calculateBudgetHealthScore(inputs, r) {
  const price = num(inputs.purchasePrice);
  const depositPct = num(inputs.depositPercentage);
  const c = [];

  // 1. Deposit Strength (25%)
  const ds = depositPct >= 20 ? 100 : depositPct >= 15 ? 75 : depositPct >= 10 ? 50 : depositPct >= 5 ? 25 : price > 0 ? 10 : 0;
  c.push({ name: "Deposit Strength", weight: 25, score: ds,
    explanation: depositPct >= 20 ? "Your deposit is 20% or more of the purchase price, which typically avoids Lenders Mortgage Insurance and may improve your borrowing position."
      : depositPct >= 10 ? `Your deposit is ${depositPct}% of the purchase price. A deposit below 20% may require Lenders Mortgage Insurance.`
      : "A deposit below 10% significantly increases borrowing costs and lender risk." });

  // 2. Buying Cost Buffer (15%)
  const bufferRatio = price > 0 ? r.totalDeposit / (price * (depositPct / 100) + r.buyingCosts.totalBuyingCosts) : 0;
  const bs = price > 0 ? Math.min(100, Math.round(bufferRatio * 100)) : 0;
  c.push({ name: "Buying Cost Buffer", weight: 15, score: bs,
    explanation: bufferRatio >= 1 ? "Your available funds fully cover your deposit and estimated buying costs."
      : "Your available funds may not fully cover your deposit and buying costs. Consider increasing your deposit or reducing your target purchase price." });

  // 3. Emergency Savings After Settlement (20%)
  const es = r.emergencyBuffer >= 3 ? 100 : r.emergencyBuffer >= 2 ? 70 : r.emergencyBuffer >= 1 ? 40 : r.cashRemaining > 0 ? 20 : 0;
  c.push({ name: "Emergency Savings After Settlement", weight: 20, score: es,
    explanation: r.emergencyBuffer >= 3 ? `You have approximately ${r.emergencyBuffer} months of expense coverage remaining after settlement, providing a healthy safety buffer.`
      : r.cashRemaining > 0 ? `Your cash remaining after settlement covers approximately ${r.emergencyBuffer} month(s) of expenses. Consider building a larger emergency fund.`
      : "You have little to no cash remaining after settlement. Building an emergency buffer before purchasing is strongly recommended." });

  // 4. Repayment-to-Income Ratio (20%)
  const rti = r.repaymentToIncomeRatio;
  const rs = rti <= 30 ? 100 : rti <= 35 ? 75 : rti <= 40 ? 50 : rti <= 45 ? 25 : 0;
  c.push({ name: "Repayment-to-Income Ratio", weight: 20, score: rs,
    explanation: rti <= 30 ? `Your mortgage repayments are approximately ${rti.toFixed(1)}% of household income, within a comfortable range.`
      : rti <= 40 ? `Your mortgage repayments are approximately ${rti.toFixed(1)}% of household income, approaching the upper limit of what lenders typically consider manageable.`
      : `Your mortgage repayments are approximately ${rti.toFixed(1)}% of household income, which may create financial stress.` });

  // 5. Existing Debt Commitments (10%)
  const dti = r.debtToIncomeRatio;
  const ds2 = dti <= 10 ? 100 : dti <= 15 ? 75 : dti <= 20 ? 50 : dti <= 25 ? 25 : 0;
  c.push({ name: "Existing Debt Commitments", weight: 10, score: ds2,
    explanation: dti <= 10 ? "Your existing monthly commitments are low relative to income, supporting a stronger borrowing position."
      : dti <= 20 ? "Your existing commitments are moderate. Lenders will factor these into your borrowing capacity."
      : "Your existing commitments are high relative to income, which may reduce your borrowing capacity." });

  // 6. Loan-to-Value Ratio (10%)
  const lvr = r.lvr;
  const ls = lvr <= 70 ? 100 : lvr <= 80 ? 80 : lvr <= 85 ? 50 : lvr <= 90 ? 25 : lvr > 0 ? 10 : 0;
  c.push({ name: "Loan-to-Value Ratio", weight: 10, score: ls,
    explanation: lvr <= 80 && lvr > 0 ? `Your LVR is ${lvr.toFixed(1)}%, at or below 80%, typically avoiding Lenders Mortgage Insurance.`
      : lvr > 80 ? `Your LVR is ${lvr.toFixed(1)}%, exceeding 80% and likely requiring Lenders Mortgage Insurance.`
      : "Enter a purchase price and deposit to assess your loan-to-value ratio." });

  const totalScore = Math.round(c.reduce((s, x) => s + (x.score * x.weight / 100), 0));
  const grade = totalScore >= 80 ? "Excellent" : totalScore >= 60 ? "Good" : totalScore >= 40 ? "Fair" : "Needs Attention";
  const gradeColor = totalScore >= 60 ? "green" : totalScore >= 40 ? "amber" : "red";

  return { totalScore, grade, gradeColor, components: c };
}

/* ---------- Reality Check ---------- */

export function generateRealityCheck(inputs, r, score) {
  const checks = [];
  const dp = num(inputs.depositPercentage);

  if (dp >= 20) checks.push({ type: "positive", text: "Deposit appears healthy — you're at or above 20% of the purchase price." });
  else if (dp >= 10) checks.push({ type: "warning", text: `Your deposit is ${dp}% of the purchase price. Lenders Mortgage Insurance may apply below 20%.` });
  else checks.push({ type: "warning", text: "Your deposit is below 10%, which significantly increases borrowing costs and lender risk." });

  if (r.cashRemaining > 0) checks.push({ type: "positive", text: "Buying costs are adequately covered by your available funds." });
  else checks.push({ type: "warning", text: "Your available funds may not fully cover your deposit and buying costs." });

  if (r.repaymentToIncomeRatio <= 30) checks.push({ type: "positive", text: `Monthly repayments are approximately ${r.repaymentToIncomeRatio.toFixed(0)}% of household income — within a comfortable range.` });
  else checks.push({ type: "warning", text: `Monthly repayments may consume approximately ${r.repaymentToIncomeRatio.toFixed(0)}% of household income.` });

  if (r.emergencyBuffer >= 3) checks.push({ type: "positive", text: `Emergency savings after settlement cover approximately ${r.emergencyBuffer} months of expenses.` });
  else if (r.cashRemaining > 0) checks.push({ type: "warning", text: "Emergency savings after settlement are limited." });
  else checks.push({ type: "warning", text: "Little to no cash remains after settlement — consider building an emergency buffer first." });

  let recommendation;
  if (score.totalScore < 60)
    recommendation = "Reducing the purchase budget, increasing your deposit, or reducing existing commitments may improve long-term financial flexibility and borrowing strength.";
  else if (score.totalScore < 80)
    recommendation = "Your position is reasonable. Consider building a larger emergency buffer or increasing your deposit to improve financial flexibility.";
  else
    recommendation = "Your financial position appears strong. Continue to maintain your emergency buffer and review your plans with a professional before committing.";

  return { checks, recommendation };
}

/* ---------- Investor Metrics ---------- */

export function calculateInvestorMetrics(inputs, r) {
  const price = num(inputs.purchasePrice);
  const weeklyRent = num(inputs.weeklyRent);
  const annualRent = weeklyRent * 52;
  const grossRentalYield = price > 0 ? (annualRent / price) * 100 : 0;
  const annualInterest = r.loanAmount * (num(inputs.interestRate) / 100);
  const estimatedHoldingCosts = annualInterest + 3500;
  const preTaxCashflow = annualRent - estimatedHoldingCosts;
  const cashflowStatus = preTaxCashflow > 0 ? "Positive" : "Negative";
  return { annualRent, grossRentalYield, estimatedHoldingCosts, preTaxCashflow, cashflowStatus };
}

/* ---------- Resources ---------- */

export const RESOURCES = [
  { title: "Buyer Advisory", text: "Professional buyer representation and due diligence for property buyers.", link: "/buyer-advisory", label: "Explore service" },
  { title: "Mortgage & Finance", text: "Finance guidance and home loan support for property purchases.", link: "/mortgage-finance", label: "Explore service" },
  { title: "Conveyancing", text: "Contract review, Section 32 checks and settlement support.", link: "/conveyancing", label: "Explore service" },
  { title: "Property Management", text: "Full-service leasing, tenant management and compliance for investors.", link: "/property-management", label: "Explore service" },
  { title: "Investment Yield Calculator", text: "Estimate rental yield, holding costs and pre-tax cashflow for investment properties.", link: "/tools/investment-yield-calculator", label: "Open tool" },
  { title: "Readiness Checklist", text: "Prepare your rental property before leasing with this interactive checklist.", link: "/tools/property-management-readiness-checklist", label: "Open tool" },
];

export const DISCLAIMER = "This planner provides general estimates only based on the information you enter. It does not constitute financial, legal, or lending advice. Calculations such as stamp duty, Lenders Mortgage Insurance, borrowing capacity and repayments are indicative and may vary depending on your state, lender, loan product, property type and individual circumstances. Government incentive eligibility depends on current criteria. Please seek professional advice before making property or finance decisions.";