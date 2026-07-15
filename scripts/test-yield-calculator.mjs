import assert from "node:assert/strict";
import { calculateYield } from "../src/data/tools/yieldCalculator.js";

const near = (actual, expected, tolerance = 1e-9) => {
  assert.ok(Math.abs(actual - expected) <= tolerance, `Expected ${expected}, received ${actual}`);
};

const cases = [
  {
    name: "Gross yield only",
    inputs: { propertyValue: 800000, weeklyRent: 700, vacancyPct: 0, mgmtFeePct: 0 },
    expected: { annualRent: 36400, grossYield: 4.55, annualCashflow: 36400 },
  },
  {
    name: "Typical leveraged property",
    inputs: {
      propertyValue: 800000,
      weeklyRent: 700,
      vacancyPct: 5,
      loanAmount: 640000,
      interestRate: 6,
      councilRates: 1800,
      waterRates: 900,
      strataFees: 2500,
      insurance: 1200,
      maintenance: 1500,
      landTax: 1000,
      otherCosts: 600,
      mgmtFeePct: 7,
    },
    expected: {
      annualRent: 36400,
      vacancyCost: 1820,
      mgmtFee: 2548,
      totalExpenses: 13868,
      annualInterest: 38400,
      netIncomeBeforeLoan: 22532,
      netYield: 2.8165,
      annualCashflow: -15868,
      monthlyCashflow: -1322.3333333333333,
      weeklyCashflow: -305.15384615384613,
    },
  },
  {
    name: "Zero property value is handled without division error",
    inputs: { propertyValue: 0, weeklyRent: 500, vacancyPct: 5, mgmtFeePct: 7 },
    expected: { grossYield: 0, netYield: 0 },
  },
  {
    name: "Blank inputs resolve to zero",
    inputs: {},
    expected: { annualRent: 0, grossYield: 0, totalExpenses: 0, annualCashflow: 0 },
  },
];

for (const testCase of cases) {
  const result = calculateYield(testCase.inputs);
  for (const [key, expected] of Object.entries(testCase.expected)) near(result[key], expected, 1e-8);
  console.log(`PASS: ${testCase.name}`);
}

console.log(`Investment Yield Calculator formula tests passed: ${cases.length}/${cases.length}`);
