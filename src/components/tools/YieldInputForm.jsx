import React from "react";
import CalculatorField from "@/components/tools/CalculatorField";
import CalculatorAccordion from "@/components/tools/CalculatorAccordion";

const selectClass =
  "w-full rounded-lg border border-stone bg-white px-4 py-3 text-sm text-midnight focus:outline-none focus:ring-2 focus:ring-golden/40 focus:border-golden/50 transition";

/**
 * Three-section input form for the Investment Yield Calculator.
 */
export default function YieldInputForm({ inputs, onChange, expanded, onExpand, zh = false }) {
  const set = (key) => (val) => onChange({ ...inputs, [key]: val });

  const t = zh ? {
    propertyTitle: "物業與租金", step1: "第 1 步", vacancyNote: "空置預留可估算物業在兩段租約之間未能收取租金的損失。",
    propertyValue: "物業價值／購入價格", weeklyRent: "每週租金", vacancy: "空置預留",
    loanTitle: "貸款資料", step2: "第 2 步", loanAmount: "貸款金額", interestRate: "利率", repaymentType: "還款方式",
    interestOnly: "只付利息", principalInterest: "本金及利息", principalNote: "為簡化現金流估算，本工具仍以只付利息方式計算；結果不包括本金還款。",
    costsTitle: "投資物業持有成本", step3: "第 3 步", costsNote: "物業管理費按全年租金的百分比估算。",
    council: "市政費", water: "水費", strata: "業主立案法團／分層管理費", insurance: "業主保險", maintenance: "維修預留", landTax: "土地稅估算", other: "其他全年成本", management: "物業管理費",
  } : {
    propertyTitle: "Property & Rent", step1: "Step 1", vacancyNote: "Vacancy allowance helps estimate lost rent when the property is empty between tenancies.",
    propertyValue: "Property Value / Purchase Price", weeklyRent: "Weekly Rent", vacancy: "Vacancy Allowance",
    loanTitle: "Loan Details", step2: "Step 2", loanAmount: "Loan Amount", interestRate: "Interest Rate", repaymentType: "Repayment Type",
    interestOnly: "Interest only", principalInterest: "Principal and interest", principalNote: "This calculator uses an interest-only estimate for cashflow simplicity. Principal repayments are not included.",
    costsTitle: "Investment Property Holding Costs", step3: "Step 3", costsNote: "Property management fee is calculated as a percentage of annual rent.",
    council: "Council Rates", water: "Water Rates", strata: "Owners Corp / Strata Fees", insurance: "Landlord Insurance", maintenance: "Maintenance Allowance", landTax: "Land Tax Estimate", other: "Other Annual Costs", management: "Property Management Fee",
  };

  return (
    <div className="space-y-4">
      <CalculatorAccordion title={t.propertyTitle} step={t.step1} expanded={expanded === "property"} onExpand={() => onExpand(expanded === "property" ? "" : "property")} note={t.vacancyNote}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CalculatorField label={t.propertyValue} value={inputs.propertyValue} onChange={set("propertyValue")} prefix="$" placeholder="800000" />
          <CalculatorField label={t.weeklyRent} value={inputs.weeklyRent} onChange={set("weeklyRent")} prefix="$" placeholder="650" />
          <CalculatorField label={t.vacancy} value={inputs.vacancyPct} onChange={set("vacancyPct")} suffix="%" placeholder="5" />
        </div>
      </CalculatorAccordion>

      <CalculatorAccordion title={t.loanTitle} step={t.step2} expanded={expanded === "loan"} onExpand={() => onExpand(expanded === "loan" ? "" : "loan")}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CalculatorField label={t.loanAmount} value={inputs.loanAmount} onChange={set("loanAmount")} prefix="$" placeholder="500000" />
          <CalculatorField label={t.interestRate} value={inputs.interestRate} onChange={set("interestRate")} suffix="%" placeholder="6" />
          <label className="block">
            <span className="block text-xs font-medium tracking-wide uppercase text-midnight/50 mb-1.5">{t.repaymentType}</span>
            <select className={selectClass} value={inputs.repaymentType} onChange={(e) => set("repaymentType")(e.target.value)}>
              <option value="interest-only">{t.interestOnly}</option>
              <option value="principal-interest">{t.principalInterest}</option>
            </select>
            {inputs.repaymentType === "principal-interest" && (
              <span className="block text-xs text-midnight/40 mt-1 leading-relaxed">{t.principalNote}</span>
            )}
          </label>
        </div>
      </CalculatorAccordion>

      <CalculatorAccordion title={t.costsTitle} step={t.step3} expanded={expanded === "costs"} onExpand={() => onExpand(expanded === "costs" ? "" : "costs")} note={t.costsNote}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <CalculatorField label={t.council} value={inputs.councilRates} onChange={set("councilRates")} prefix="$" placeholder="1200" />
          <CalculatorField label={t.water} value={inputs.waterRates} onChange={set("waterRates")} prefix="$" placeholder="800" />
          <CalculatorField label={t.strata} value={inputs.strataFees} onChange={set("strataFees")} prefix="$" placeholder="2500" />
          <CalculatorField label={t.insurance} value={inputs.insurance} onChange={set("insurance")} prefix="$" placeholder="900" />
          <CalculatorField label={t.maintenance} value={inputs.maintenance} onChange={set("maintenance")} prefix="$" placeholder="1500" />
          <CalculatorField label={t.landTax} value={inputs.landTax} onChange={set("landTax")} prefix="$" placeholder="0" />
          <CalculatorField label={t.other} value={inputs.otherCosts} onChange={set("otherCosts")} prefix="$" placeholder="0" />
          <CalculatorField label={t.management} value={inputs.mgmtFeePct} onChange={set("mgmtFeePct")} suffix="%" placeholder="7" />
        </div>
      </CalculatorAccordion>
    </div>
  );
}