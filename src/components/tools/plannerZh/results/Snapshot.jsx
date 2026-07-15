import React from "react";
import { fmtCurrency } from "@/data/tools/homeBuyingPlanner";

export default function Snapshot({ results }) {
  const cards = [
    {
      label: "預估購屋預算",
      value: fmtCurrency(results.estimatedPurchaseBudget),
      sub: "Indicative maximum based on income & deposit.",
    },

    {
      label: "Estimated Deposit",
      value: fmtCurrency(results.depositUsed),
      sub: `${Number(results.depositPct || 0)}% of purchase price.`,
    },

    {
      label: "Estimated Funds Required",
      value: fmtCurrency(results.estimatedDepositRequired),
      sub: "Selected deposit plus estimated buying costs.",
    },

    {
      label: "預估購屋成本",
      value: fmtCurrency(results.buyingCosts.totalBuyingCosts),
      sub: "Stamp duty, legal fees, government charges and LMI (if applicable).",
    },

    {
      label: "預估每月還款",
      value: fmtCurrency(results.monthlyRepayment),
      sub: `Principal & interest over ${results.loanTerm} years at ${results.interestRate}% p.a.`,
    },

    {
      label: "預估貸款金額",
      value: fmtCurrency(results.loanAmount),
      sub: "Purchase price less selected deposit.",
    },

    {
      label: "交割後剩餘現金",
      value: fmtCurrency(results.cashRemaining),
      sub: "After deposit and buying costs.",
      positive: results.cashRemaining >= 0,
    },
  ];

  return (
    <div>
      <h2 className="font-heading text-2xl md:text-3xl text-midnight mb-2">
        Your Home Buying Snapshot
      </h2>

      <p className="text-sm text-midnight/50 mb-6 max-w-2xl leading-relaxed">
        A concise overview of your estimated purchase budget, deposit,
        buying costs, loan and cash position based on the details you entered.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-2xl border border-stone/60 p-6"
          >
            <p className="text-xs font-medium tracking-wide uppercase text-midnight/40 mb-2">
              {card.label}
            </p>

            <p
              className={`font-heading text-2xl ${
                card.positive ? "text-emerald-600" : "text-midnight"
              }`}
            >
              {card.value}
            </p>

            <p className="text-xs text-midnight/40 mt-1.5 leading-relaxed">
              {card.sub}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}