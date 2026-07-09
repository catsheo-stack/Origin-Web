import React from "react";
import CalculatorField from "@/components/tools/CalculatorField";
import CalculatorAccordion from "@/components/tools/CalculatorAccordion";

const selectClass =
  "w-full rounded-lg border border-stone bg-white px-4 py-3 text-sm text-midnight focus:outline-none focus:ring-2 focus:ring-golden/40 focus:border-golden/50 transition";

/**
 * Three-section input form for the Investment Yield Calculator.
 */
export default function YieldInputForm({ inputs, onChange, expanded, onExpand }) {
  const set = (key) => (val) => onChange({ ...inputs, [key]: val });

  return (
    <div className="space-y-4">
      <CalculatorAccordion title="Property & Rent" step="Step 1" expanded={expanded === "property"} onExpand={() => onExpand(expanded === "property" ? "" : "property")} note="Vacancy allowance helps estimate lost rent when the property is empty between tenancies.">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CalculatorField label="Property Value / Purchase Price" value={inputs.propertyValue} onChange={set("propertyValue")} prefix="$" placeholder="800000" />
          <CalculatorField label="Weekly Rent" value={inputs.weeklyRent} onChange={set("weeklyRent")} prefix="$" placeholder="650" />
          <CalculatorField label="Vacancy Allowance" value={inputs.vacancyPct} onChange={set("vacancyPct")} suffix="%" placeholder="5" />
        </div>
      </CalculatorAccordion>

      <CalculatorAccordion title="Loan Details" step="Step 2" expanded={expanded === "loan"} onExpand={() => onExpand(expanded === "loan" ? "" : "loan")}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CalculatorField label="Loan Amount" value={inputs.loanAmount} onChange={set("loanAmount")} prefix="$" placeholder="500000" />
          <CalculatorField label="Interest Rate" value={inputs.interestRate} onChange={set("interestRate")} suffix="%" placeholder="6" />
          <label className="block">
            <span className="block text-xs font-medium tracking-wide uppercase text-midnight/50 mb-1.5">Repayment Type</span>
            <select className={selectClass} value={inputs.repaymentType} onChange={(e) => set("repaymentType")(e.target.value)}>
              <option value="interest-only">Interest only</option>
              <option value="principal-interest">Principal and interest</option>
            </select>
            {inputs.repaymentType === "principal-interest" && (
              <span className="block text-xs text-midnight/40 mt-1 leading-relaxed">This calculator uses an interest-only estimate for cashflow simplicity. Principal repayments are not included.</span>
            )}
          </label>
        </div>
      </CalculatorAccordion>

      <CalculatorAccordion title="Investment Property Holding Costs" step="Step 3" expanded={expanded === "costs"} onExpand={() => onExpand(expanded === "costs" ? "" : "costs")} note="Property management fee is calculated as a percentage of annual rent.">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <CalculatorField label="Council Rates" value={inputs.councilRates} onChange={set("councilRates")} prefix="$" placeholder="1200" />
          <CalculatorField label="Water Rates" value={inputs.waterRates} onChange={set("waterRates")} prefix="$" placeholder="800" />
          <CalculatorField label="Owners Corp / Strata Fees" value={inputs.strataFees} onChange={set("strataFees")} prefix="$" placeholder="2500" />
          <CalculatorField label="Landlord Insurance" value={inputs.insurance} onChange={set("insurance")} prefix="$" placeholder="900" />
          <CalculatorField label="Maintenance Allowance" value={inputs.maintenance} onChange={set("maintenance")} prefix="$" placeholder="1500" />
          <CalculatorField label="Land Tax Estimate" value={inputs.landTax} onChange={set("landTax")} prefix="$" placeholder="0" />
          <CalculatorField label="Other Annual Costs" value={inputs.otherCosts} onChange={set("otherCosts")} prefix="$" placeholder="0" />
          <CalculatorField label="Property Management Fee" value={inputs.mgmtFeePct} onChange={set("mgmtFeePct")} suffix="%" placeholder="7" />
        </div>
      </CalculatorAccordion>
    </div>
  );
}