import React from "react";
import { Link } from "react-router-dom";
import { Gift, Shield, PiggyBank, TrendingUp, ArrowUpRight } from "lucide-react";
import { calculateStampDuty, calculateInvestorMetrics, fmtCurrency, fmtPct, num } from "@/data/tools/homeBuyingPlanner";

function ModeCard({ icon: Icon, title, children }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-stone/60 p-5">
      <div className="flex items-center gap-2 mb-2">
        <Icon size={16} className="text-golden" />
        <h3 className="font-heading text-sm text-midnight">{title}</h3>
      </div>
      {children}
    </div>
  );
}

/**
 * Buyer Mode Panel — dynamically renders First Home Buyer or Investor
 * content based on the selected buyer type, showing relevant incentives,
 * estimates and links.
 */
export default function BuyerModePanel({ inputs, results }) {
  const isFHB = inputs.buyerType === "First Home Buyer";
  const isInvestor = inputs.buyerType === "Investor";

  if (isFHB) {
    const price = num(inputs.purchasePrice);
    const generalDuty = calculateStampDuty(price, inputs.state, false);
    const fhbDuty = calculateStampDuty(price, inputs.state, true);
    const savings = Math.max(0, generalDuty - fhbDuty);

    return (
      <div>
        <h2 className="font-heading text-2xl md:text-3xl text-midnight mb-2">首次置業者指南</h2>
        <p className="text-sm text-midnight/50 mb-6">可能適用於您購屋計畫的政府補助及優惠。</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ModeCard icon={Gift} title="預估印花稅節省">
            <p className="font-heading text-2xl text-emerald-600 mb-1">{fmtCurrency(savings)}</p>
            <p className="text-xs text-midnight/50">根據首次置業者優惠估算，地區： {inputs.state}. 實際節省金額視資格及房價門檻而定。</p>
          </ModeCard>
          <ModeCard icon={Shield} title="首次置業補助">
            <p className="text-sm text-midnight/70 leading-relaxed">You may be eligible for the 首次置業補助 (FHOG) when purchasing a new home. In Victoria, the grant is $10,000 for new homes valued up to $750,000.</p>
          </ModeCard>
          <ModeCard icon={Shield} title="首次置業擔保計畫">
            <p className="text-sm text-midnight/70 leading-relaxed">The 首次置業擔保計畫 may allow you to buy with a 5% deposit without paying 貸款機構按揭保險, subject to eligibility criteria and availability.</p>
          </ModeCard>
          <ModeCard icon={PiggyBank} title="首次置業退休金儲蓄計畫">
            <p className="text-sm text-midnight/70 leading-relaxed">If you've made voluntary super contributions, you may be able to withdraw them under the 首次置業退休金儲蓄計畫 (FHSS) scheme toward your deposit.</p>
          </ModeCard>
          <div className="bg-parchment rounded-xl border border-stone/60 p-5 sm:col-span-2 lg:col-span-2">
            <p className="text-xs text-midnight/50 leading-relaxed">
              Eligibility for all first home buyer incentives depends on government criteria including income thresholds, property value limits, prior property ownership and residency status. Check current criteria with your state revenue office or the Australian Taxation Office before relying on these estimates.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isInvestor) {
    const m = calculateInvestorMetrics(inputs, results);
    return (
      <div>
        <h2 className="font-heading text-2xl md:text-3xl text-midnight mb-2">投資物業規劃</h2>
        <p className="text-sm text-midnight/50 mb-6">根據物業資料及預估每週租金計算的主要投資指標。</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ModeCard icon={TrendingUp} title="預估毛租金回報率">
            <p className="font-heading text-2xl text-midnight mb-1">{fmtPct(m.grossRentalYield)}</p>
            <p className="text-xs text-midnight/50">年度租金除以物業價值，未扣除支出。</p>
          </ModeCard>
          <ModeCard icon={TrendingUp} title="預估年度租金">
            <p className="font-heading text-2xl text-midnight mb-1">{fmtCurrency(m.annualRent)}</p>
            <p className="text-xs text-midnight/50">每週租金乘以 52 週。</p>
          </ModeCard>
          <ModeCard icon={TrendingUp} title="預估持有成本">
            <p className="font-heading text-2xl text-midnight mb-1">{fmtCurrency(m.estimatedHoldingCosts)}</p>
            <p className="text-xs text-midnight/50">包括貸款利息、市政費、保險及維修估算。</p>
          </ModeCard>
          <ModeCard icon={TrendingUp} title="預估稅前現金流">
            <p className={`font-heading text-2xl mb-1 ${m.preTaxCashflow > 0 ? "text-emerald-600" : "text-red-500"}`}>{fmtCurrency(m.preTaxCashflow)}</p>
            <p className="text-xs text-midnight/50">{m.cashflowStatus} 的稅前現金流狀況。</p>
          </ModeCard>
        </div>
        <div className="mt-4 bg-parchment rounded-xl border border-stone/60 p-5">
          <p className="text-sm text-midnight/60 leading-relaxed">
            For a detailed breakdown of rental yield, holding costs and cashflow — including vacancy allowances, property management fees and individual expense items — use the Investment Yield Calculator.
          </p>
          <Link to="/tools/investment-yield-calculator" className="inline-flex items-center gap-1 text-sm font-medium text-golden mt-3 hover:text-golden/80 transition">
            開啟投資物業租金回報計算器 <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  return null;
}