/**
 * Origin Tools — Origin Home Buying Planner
 *
 * All calculations are completed locally in the browser.
 * No AI, backend or external calculation API is required.
 *
 * Important:
 * - Deposit percentage uses the percentage entered by the user.
 * - Interest rate uses the rate entered by the user.
 * - Loan term uses the term entered by the user.
 * - Results are estimates only.
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

  // Editable starting assumptions.
  depositPercentage: "20",
  interestRate: "6.5",
  loanTerm: "30",

  weeklyRent: "",
};

export const BUYER_TYPES = [
  {
    value: "First Home Buyer",
    desc: "Buying your first property",
  },
  {
    value: "Owner Occupier",
    desc: "Buying a home to live in",
  },
  {
    value: "Investor",
    desc: "Buying as an investment",
  },
  {
    value: "Upgrader",
    desc: "Selling to buy a larger home",
  },
  {
    value: "Downsizer",
    desc: "Selling to buy a smaller home",
  },
];

export const PROPERTY_TYPES = [
  "House",
  "Apartment",
  "Townhouse",
  "Land",
  "Investment Property",
];

export const STATES = [
  {
    value: "VIC",
    label: "Victoria",
  },
  {
    value: "NSW",
    label: "New South Wales",
  },
  {
    value: "QLD",
    label: "Queensland",
  },
  {
    value: "SA",
    label: "South Australia",
  },
  {
    value: "WA",
    label: "Western Australia",
  },
  {
    value: "ACT",
    label: "Australian Capital Territory",
  },
  {
    value: "TAS",
    label: "Tasmania",
  },
  {
    value: "NT",
    label: "Northern Territory",
  },
];

export const TIMELINES = [
  "Just researching",
  "Within 3 months",
  "3–6 months",
  "6–12 months",
  "Over 12 months",
];

export const STEPS = [
  {
    title: "Buyer Profile",
    subtitle:
      "Your buying situation, income, deposit and commitments",
  },
  {
    title: "Property Preference",
    subtitle: "The property you're considering",
  },
];

/**
 * Safely converts form values to numbers.
 */
export const num = (value) => {
  const parsed = Number.parseFloat(value);

  return Number.isFinite(parsed) ? parsed : 0;
};

export const fmtCurrency = (value) =>
  (Number(value) || 0).toLocaleString("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  });

export const fmtPct = (value) =>
  `${(Number(value) || 0).toFixed(1)}%`;

/* =========================================================
   Stamp duty
========================================================= */

function vicGeneralDuty(value) {
  if (value <= 0) {
    return 0;
  }

  if (value <= 25000) {
    return value * 0.014;
  }

  if (value <= 130000) {
    return 350 + (value - 25000) * 0.024;
  }

  if (value <= 960000) {
    return 2870 + (value - 130000) * 0.06;
  }

  return value * 0.055;
}

const STATE_DUTY_RATES = {
  NSW: 0.0409,
  QLD: 0.035,
  SA: 0.051,
  WA: 0.038,
  ACT: 0.045,
  TAS: 0.042,
  NT: 0.049,
};

export function calculateStampDuty(
  price,
  state,
  isFirstHomeBuyer
) {
  if (price <= 0) {
    return 0;
  }

  if (state === "VIC") {
    if (isFirstHomeBuyer && price <= 600000) {
      return 0;
    }

    if (isFirstHomeBuyer && price <= 750000) {
      return (
        vicGeneralDuty(price) *
        ((price - 600000) / 150000)
      );
    }

    return vicGeneralDuty(price);
  }

  return price * (STATE_DUTY_RATES[state] || 0.045);
}

/* =========================================================
   Buying costs
========================================================= */

export function calculateBuyingCosts(inputs) {
  const price = num(inputs.purchasePrice);
  const state = inputs.state || "VIC";
  const isFirstHomeBuyer =
    inputs.buyerType === "First Home Buyer";

  const hasPrice = price > 0;

  const stampDuty = calculateStampDuty(
    price,
    state,
    isFirstHomeBuyer
  );

  const conveyancingFee = hasPrice ? 1500 : 0;
  const buildingInspection = hasPrice ? 500 : 0;
  const pestInspection = hasPrice ? 350 : 0;
  const governmentRegistrationFees = hasPrice ? 200 : 0;
  const transferFees = hasPrice ? 150 : 0;
  const mortgageRegistration = hasPrice ? 150 : 0;
  const loanEstablishmentCosts = hasPrice ? 600 : 0;

  /*
   * Deposit and LVR are based on the percentage entered
   * by the user.
   */
  const depositPct = Math.min(
    Math.max(num(inputs.depositPercentage), 0),
    100
  );

  const loanAmount =
    price * (1 - depositPct / 100);

  const lvr =
    price > 0 ? (loanAmount / price) * 100 : 0;

  /*
   * Indicative LMI estimate.
   * Only applies when LVR exceeds 80%.
   */
  let lmi = 0;

  if (lvr > 80 && loanAmount > 0) {
    const lmiRate =
      lvr <= 85
        ? 0.015
        : lvr <= 90
          ? 0.022
          : 0.032;

    lmi = loanAmount * lmiRate;
  }

  const totalBuyingCosts =
    stampDuty +
    conveyancingFee +
    buildingInspection +
    pestInspection +
    governmentRegistrationFees +
    transferFees +
    mortgageRegistration +
    loanEstablishmentCosts +
    lmi;

  return {
    stampDuty,
    conveyancingFee,
    buildingInspection,
    pestInspection,
    governmentRegistrationFees,
    transferFees,
    mortgageRegistration,
    loanEstablishmentCosts,
    lmi,
    totalBuyingCosts,
  };
}

/* =========================================================
   Main results
========================================================= */

export function calculateResults(inputs) {
  const price = num(inputs.purchasePrice);

  const depositPct = Math.min(
    Math.max(num(inputs.depositPercentage), 0),
    100
  );

  const interestRate = Math.max(
    num(inputs.interestRate),
    0
  );

  /*
   * Loan term uses the user's value.
   * It falls back to 30 only when the field is empty or zero.
   */
  const enteredLoanTerm = num(inputs.loanTerm);
  const loanTerm =
    enteredLoanTerm > 0 ? enteredLoanTerm : 30;

  const totalIncome =
    num(inputs.annualIncome) +
    num(inputs.partnerIncome) +
    num(inputs.rentalIncome) +
    num(inputs.otherIncome);

  const monthlyIncome = totalIncome / 12;

  const totalDeposit =
    num(inputs.savings) +
    num(inputs.familyGift) +
    num(inputs.fhssAmount) +
    num(inputs.equityFromProperty) +
    num(inputs.otherFunds);

  const monthlyCommitments =
    num(inputs.livingExpenses) +
    num(inputs.carLoan) +
    num(inputs.creditCardRepayments) +
    num(inputs.hecs) +
    num(inputs.childcare) +
    num(inputs.schoolFees) +
    num(inputs.otherLoans);

  /*
   * Loan amount uses the user's selected deposit percentage.
   *
   * Example:
   * $650,000 purchase price
   * 5% deposit
   * Loan = $617,500
   */
  const depositUsed =
    price * (depositPct / 100);

  const loanAmount =
    Math.max(price - depositUsed, 0);

  const lvr =
    price > 0 ? (loanAmount / price) * 100 : 0;

  /*
   * Principal-and-interest repayment formula.
   */
  const monthlyRate =
    interestRate / 100 / 12;

  const numMonths =
    loanTerm * 12;

  let monthlyRepayment = 0;

  if (
    loanAmount > 0 &&
    monthlyRate > 0 &&
    numMonths > 0
  ) {
    const growthFactor =
      Math.pow(1 + monthlyRate, numMonths);

    monthlyRepayment =
      loanAmount *
      ((monthlyRate * growthFactor) /
        (growthFactor - 1));
  } else if (
    loanAmount > 0 &&
    monthlyRate === 0 &&
    numMonths > 0
  ) {
    monthlyRepayment =
      loanAmount / numMonths;
  }

  const weeklyRepayment =
    monthlyRepayment / 4.33;

  const buyingCosts =
    calculateBuyingCosts(inputs);

  /*
   * FIXED:
   * This previously used a hard-coded 20% deposit.
   *
   * It now uses the deposit percentage entered by the user.
   */
  const estimatedDepositRequired =
    price > 0
      ? depositUsed + buyingCosts.totalBuyingCosts
      : 0;

  const cashRemaining =
    totalDeposit -
    depositUsed -
    buyingCosts.totalBuyingCosts;

  /*
   * Avoid presenting negative values as negative months.
   */
  const emergencyBuffer =
    monthlyCommitments > 0 && cashRemaining > 0
      ? Math.floor(
          cashRemaining / monthlyCommitments
        )
      : 0;

  const repaymentToIncomeRatio =
    monthlyIncome > 0
      ? (monthlyRepayment / monthlyIncome) * 100
      : 0;

  const debtToIncomeRatio =
    monthlyIncome > 0
      ? (monthlyCommitments / monthlyIncome) * 100
      : 0;

  /*
   * General affordability estimate.
   * Assumes up to 30% of income remaining after commitments
   * may be available for mortgage repayments.
   */
  const availableForMortgage =
    Math.max(
      monthlyIncome - monthlyCommitments,
      0
    ) * 0.3;

  let maxLoan = 0;

  if (
    monthlyRate > 0 &&
    availableForMortgage > 0 &&
    numMonths > 0
  ) {
    const growthFactor =
      Math.pow(1 + monthlyRate, numMonths);

    maxLoan =
      availableForMortgage *
      ((growthFactor - 1) /
        (monthlyRate * growthFactor));
  } else if (
    monthlyRate === 0 &&
    availableForMortgage > 0 &&
    numMonths > 0
  ) {
    maxLoan =
      availableForMortgage * numMonths;
  }

  const estimatedPurchaseBudget =
    maxLoan + totalDeposit;

  return {
    totalIncome,
    monthlyIncome,
    totalDeposit,
    monthlyCommitments,

    depositPct,
    depositUsed,

    loanAmount,
    loanTerm,
    interestRate,
    lvr,

    monthlyRepayment,
    weeklyRepayment,

    buyingCosts,
    estimatedDepositRequired,

    cashRemaining,
    emergencyBuffer,

    repaymentToIncomeRatio,
    debtToIncomeRatio,

    estimatedPurchaseBudget,
  };
}

/* =========================================================
   Budget health score
========================================================= */

export function calculateBudgetHealthScore(
  inputs,
  results
) {
  const price = num(inputs.purchasePrice);

  const depositPct = Math.min(
    Math.max(num(inputs.depositPercentage), 0),
    100
  );

  const components = [];

  /* Deposit strength — 25% */

  const depositStrength =
    depositPct >= 20
      ? 100
      : depositPct >= 15
        ? 75
        : depositPct >= 10
          ? 50
          : depositPct >= 5
            ? 25
            : price > 0
              ? 10
              : 0;

  components.push({
    name: "Deposit Strength",
    weight: 25,
    score: depositStrength,
    explanation:
      depositPct >= 20
        ? "Your deposit is 20% or more of the purchase price, which typically avoids Lenders Mortgage Insurance and may improve your borrowing position."
        : depositPct >= 10
          ? `Your deposit is ${depositPct}% of the purchase price. A deposit below 20% may require Lenders Mortgage Insurance.`
          : "A deposit below 10% significantly increases borrowing costs and lender risk.",
  });

  /* Buying-cost buffer — 15% */

  const requiredFunds =
    results.depositUsed +
    results.buyingCosts.totalBuyingCosts;

  const bufferRatio =
    requiredFunds > 0
      ? results.totalDeposit / requiredFunds
      : 0;

  const buyingCostBufferScore =
    price > 0
      ? Math.min(
          100,
          Math.max(
            0,
            Math.round(bufferRatio * 100)
          )
        )
      : 0;

  components.push({
    name: "Buying Cost Buffer",
    weight: 15,
    score: buyingCostBufferScore,
    explanation:
      bufferRatio >= 1
        ? "Your available funds fully cover your selected deposit and estimated buying costs."
        : "Your available funds may not fully cover your selected deposit and buying costs. Consider increasing your available funds or reducing your target purchase price.",
  });

  /* Emergency savings — 20% */

  const emergencyScore =
    results.emergencyBuffer >= 3
      ? 100
      : results.emergencyBuffer >= 2
        ? 70
        : results.emergencyBuffer >= 1
          ? 40
          : results.cashRemaining > 0
            ? 20
            : 0;

  components.push({
    name: "Emergency Savings After Settlement",
    weight: 20,
    score: emergencyScore,
    explanation:
      results.emergencyBuffer >= 3
        ? `You have approximately ${results.emergencyBuffer} months of expense coverage remaining after settlement, providing a healthy safety buffer.`
        : results.cashRemaining > 0
          ? `Your cash remaining after settlement covers approximately ${results.emergencyBuffer} month(s) of expenses. Consider building a larger emergency fund.`
          : "You have little to no cash remaining after settlement. Building an emergency buffer before purchasing is strongly recommended.",
  });

  /* Repayment-to-income ratio — 20% */

  const repaymentRatio =
    results.repaymentToIncomeRatio;

  const repaymentScore =
    repaymentRatio <= 30
      ? 100
      : repaymentRatio <= 35
        ? 75
        : repaymentRatio <= 40
          ? 50
          : repaymentRatio <= 45
            ? 25
            : 0;

  components.push({
    name: "Repayment-to-Income Ratio",
    weight: 20,
    score: repaymentScore,
    explanation:
      repaymentRatio <= 30
        ? `Your mortgage repayments are approximately ${repaymentRatio.toFixed(1)}% of household income, within a comfortable range.`
        : repaymentRatio <= 40
          ? `Your mortgage repayments are approximately ${repaymentRatio.toFixed(1)}% of household income, approaching the upper range of what may be manageable.`
          : `Your mortgage repayments are approximately ${repaymentRatio.toFixed(1)}% of household income, which may create financial stress.`,
  });

  /* Existing commitments — 10% */

  const commitmentRatio =
    results.debtToIncomeRatio;

  const commitmentScore =
    commitmentRatio <= 10
      ? 100
      : commitmentRatio <= 15
        ? 75
        : commitmentRatio <= 20
          ? 50
          : commitmentRatio <= 25
            ? 25
            : 0;

  components.push({
    name: "Existing Debt Commitments",
    weight: 10,
    score: commitmentScore,
    explanation:
      commitmentRatio <= 10
        ? "Your existing monthly commitments are low relative to income, supporting a stronger borrowing position."
        : commitmentRatio <= 20
          ? "Your existing commitments are moderate. Lenders will factor these into your borrowing capacity."
          : "Your existing commitments are high relative to income, which may reduce your borrowing capacity.",
  });

  /* LVR — 10% */

  const lvr = results.lvr;

  const lvrScore =
    lvr <= 70 && lvr > 0
      ? 100
      : lvr <= 80 && lvr > 0
        ? 80
        : lvr <= 85
          ? 50
          : lvr <= 90
            ? 25
            : lvr > 0
              ? 10
              : 0;

  components.push({
    name: "Loan-to-Value Ratio",
    weight: 10,
    score: lvrScore,
    explanation:
      lvr <= 80 && lvr > 0
        ? `Your LVR is ${lvr.toFixed(1)}%, at or below 80%, typically avoiding Lenders Mortgage Insurance.`
        : lvr > 80
          ? `Your LVR is ${lvr.toFixed(1)}%, exceeding 80% and likely requiring Lenders Mortgage Insurance.`
          : "Enter a purchase price and deposit to assess your loan-to-value ratio.",
  });

  const totalScore = Math.round(
    components.reduce(
      (total, component) =>
        total +
        (component.score *
          component.weight) /
          100,
      0
    )
  );

  const grade =
    totalScore >= 80
      ? "Excellent"
      : totalScore >= 60
        ? "Good"
        : totalScore >= 40
          ? "Fair"
          : "Needs Attention";

  const gradeColor =
    totalScore >= 60
      ? "green"
      : totalScore >= 40
        ? "amber"
        : "red";

  return {
    totalScore,
    grade,
    gradeColor,
    components,
  };
}

/* =========================================================
   Reality check
========================================================= */

export function generateRealityCheck(
  inputs,
  results,
  score
) {
  const checks = [];

  const depositPct = Math.min(
    Math.max(num(inputs.depositPercentage), 0),
    100
  );

  if (depositPct >= 20) {
    checks.push({
      type: "positive",
      text: "Deposit appears healthy — you're at or above 20% of the purchase price.",
    });
  } else if (depositPct >= 10) {
    checks.push({
      type: "warning",
      text: `Your deposit is ${depositPct}% of the purchase price. Lenders Mortgage Insurance may apply below 20%.`,
    });
  } else {
    checks.push({
      type: "warning",
      text: "Your deposit is below 10%, which significantly increases borrowing costs and lender risk.",
    });
  }

  if (results.cashRemaining >= 0) {
    checks.push({
      type: "positive",
      text: "Your selected deposit and estimated buying costs are covered by your available funds.",
    });
  } else {
    checks.push({
      type: "warning",
      text: "Your available funds may not fully cover your selected deposit and estimated buying costs.",
    });
  }

  if (results.repaymentToIncomeRatio <= 30) {
    checks.push({
      type: "positive",
      text: `Monthly repayments are approximately ${results.repaymentToIncomeRatio.toFixed(0)}% of household income — within a comfortable range.`,
    });
  } else {
    checks.push({
      type: "warning",
      text: `Monthly repayments may consume approximately ${results.repaymentToIncomeRatio.toFixed(0)}% of household income.`,
    });
  }

  if (results.emergencyBuffer >= 3) {
    checks.push({
      type: "positive",
      text: `Emergency savings after settlement cover approximately ${results.emergencyBuffer} months of expenses.`,
    });
  } else if (results.cashRemaining > 0) {
    checks.push({
      type: "warning",
      text: "Emergency savings after settlement are limited.",
    });
  } else {
    checks.push({
      type: "warning",
      text: "Little to no cash remains after settlement — consider building an emergency buffer first.",
    });
  }

  let recommendation;

  if (score.totalScore < 60) {
    recommendation =
      "Reducing the purchase budget, increasing your available funds, or reducing existing commitments may improve long-term financial flexibility and borrowing strength.";
  } else if (score.totalScore < 80) {
    recommendation =
      "Your position is reasonable. Consider building a larger emergency buffer or increasing your deposit to improve financial flexibility.";
  } else {
    recommendation =
      "Your financial position appears strong. Continue to maintain your emergency buffer and review your plans with a professional before committing.";
  }

  return {
    checks,
    recommendation,
  };
}

/* =========================================================
   Investor metrics
========================================================= */

export function calculateInvestorMetrics(
  inputs,
  results
) {
  const price = num(inputs.purchasePrice);
  const weeklyRent = num(inputs.weeklyRent);

  const annualRent =
    weeklyRent * 52;

  const grossRentalYield =
    price > 0
      ? (annualRent / price) * 100
      : 0;

  const annualInterest =
    results.loanAmount *
    (num(inputs.interestRate) / 100);

  const estimatedHoldingCosts =
    annualInterest + 3500;

  const preTaxCashflow =
    annualRent - estimatedHoldingCosts;

  const cashflowStatus =
    preTaxCashflow > 0
      ? "Positive"
      : preTaxCashflow < 0
        ? "Negative"
        : "Neutral";

  return {
    annualRent,
    grossRentalYield,
    estimatedHoldingCosts,
    preTaxCashflow,
    cashflowStatus,
  };
}

/* =========================================================
   Resources
========================================================= */

export const RESOURCES = [
  {
    title: "Buyer Advisory",
    text: "Professional buyer representation and due diligence for property buyers.",
    link: "/buyer-advisory",
    label: "Explore service",
  },
  {
    title: "Mortgage & Finance",
    text: "Finance guidance and home loan support for property purchases.",
    link: "/mortgage-finance",
    label: "Explore service",
  },
  {
    title: "Conveyancing",
    text: "Contract review, Section 32 checks and settlement support.",
    link: "/conveyancing",
    label: "Explore service",
  },
  {
    title: "Property Management",
    text: "Full-service leasing, tenant management and compliance for investors.",
    link: "/property-management",
    label: "Explore service",
  },
  {
    title: "Investment Yield Calculator",
    text: "Estimate rental yield, holding costs and pre-tax cashflow for investment properties.",
    link: "/tools/investment-yield-calculator",
    label: "Open tool",
  },
  {
    title: "Readiness Checklist",
    text: "Prepare your rental property before leasing with this interactive checklist.",
    link: "/tools/property-management-readiness-checklist",
    label: "Open tool",
  },
];

export const DISCLAIMER =
  "This planner provides general estimates only based on the information you enter. It does not constitute financial, legal or lending advice. Calculations such as stamp duty, Lenders Mortgage Insurance, borrowing capacity and repayments are indicative and may vary depending on your state, lender, loan product, property type and individual circumstances. Government incentive eligibility depends on current criteria. Please seek professional advice before making property or finance decisions.";