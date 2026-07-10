import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
} from "lucide-react";

import { base44 } from "@/api/base44Client";
import SectionWrapper from "@/components/origin/SectionWrapper";
import ToolHero from "@/components/tools/ToolHero";
import YieldInputForm from "@/components/tools/YieldInputForm";
import YieldResultsDashboard from "@/components/tools/YieldResultsDashboard";
import YieldStickyBar from "@/components/tools/YieldStickyBar";
import YieldPrintableSummary from "@/components/tools/YieldPrintableSummary";

import {
  DEFAULT_INPUTS,
  calculateYield,
  getInvestorSummary,
  DISCLAIMER,
} from "@/data/tools/yieldCalculator";

export default function InvestmentYieldCalculator() {
  const [inputs, setInputs] = useState({
    ...DEFAULT_INPUTS,
  });

  const [expanded, setExpanded] =
    useState("property");

  const [calculated, setCalculated] =
    useState(false);

  const resultsRef = useRef(null);

  useEffect(() => {
    document.title =
      "Investment Yield Calculator | Rental Yield & Cashflow Estimator";

    const setMeta = (
      selector,
      attribute,
      content
    ) => {
      let element =
        document.head.querySelector(selector);

      if (!element) {
        element =
          document.createElement("meta");

        document.head.appendChild(element);
      }

      element.setAttribute(
        attribute,
        content
      );
    };

    setMeta(
      'meta[name="description"]',
      "content",
      "Estimate rental yield, annual holding costs, and pre-tax investment property cashflow with the Origin Concierge Investment Yield Calculator."
    );

    try {
      base44.analytics.track({
        eventName: "page_viewed",
        properties: {
          page:
            "tool_investment_yield_calculator",
        },
      });
    } catch {
      // Analytics must never prevent the tool from working.
    }
  }, []);

  const results = useMemo(
    () => calculateYield(inputs),
    [inputs]
  );

  const summary = useMemo(
    () =>
      getInvestorSummary(
        results.annualCashflow
      ),
    [results.annualCashflow]
  );

  const hasInputs =
    (Number.parseFloat(inputs.propertyValue) ||
      0) > 0 &&
    (Number.parseFloat(inputs.weeklyRent) ||
      0) > 0;

  const handleCalculate = () => {
    setCalculated(true);

    try {
      base44.analytics.track({
        eventName: "yield_calculated",
        properties: {
          gross_yield: Number(
            results.grossYield
          ).toFixed(2),
        },
      });
    } catch {
      // Analytics must never interrupt calculation.
    }

    window.setTimeout(() => {
      resultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const handleReset = () => {
    setInputs({
      ...DEFAULT_INPUTS,
    });

    setExpanded("property");
    setCalculated(false);

    window.setTimeout(() => {
      document
        .getElementById("calculator")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 50);
  };

  return (
    <>
      <ToolHero
        eyebrow="Origin Tools"
        title="Investment Yield Calculator"
        subtitle="Estimate rental yield, holding costs, and pre-tax cashflow before making a property decision."
        intro="Use this calculator to understand the estimated income, expenses, and cashflow position of an investment property before you buy, lease, or review your portfolio."
        primaryCta={{
          label: "Start Calculation",
          href: "#calculator",
          analyticsKey: "yield_start",
        }}
        secondaryCta={{
          label:
            "Request an Investment Property Review",
          href:
            "/book-consultation?service=property-management",
          analyticsKey:
            "yield_hero_review",
        }}
      />

      <SectionWrapper
        id="calculator"
        className="!pb-8 !pt-8 scroll-mt-24"
      >
        <Link
          to="/tools"
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-midnight/15 bg-white px-4 py-2 text-sm font-medium text-midnight transition-colors hover:border-golden/60 hover:text-golden"
        >
          <ArrowLeft size={15} />
          Back to Tools
        </Link>

        <div className="mb-6">
          <h2 className="font-heading mb-1 text-2xl text-midnight">
            Rental Yield Calculator
          </h2>

          <p className="text-sm text-midnight/50">
            Enter your property, loan and
            holding-cost details to estimate
            yield and cashflow.
          </p>

          <p className="mt-2 text-xs leading-relaxed text-midnight/40">
            The figures shown in some fields are
            editable starting assumptions. Change
            them to reflect your own expected
            vacancy, interest rate and management
            fee.
          </p>
        </div>

        <YieldInputForm
          inputs={inputs}
          onChange={setInputs}
          expanded={expanded}
          onExpand={setExpanded}
        />

        <div className="mt-8 hidden justify-center gap-3 md:flex">
          <button
            type="button"
            onClick={handleCalculate}
            disabled={!hasInputs}
            className="inline-flex items-center gap-2 rounded-full bg-golden px-7 py-3 text-sm font-medium text-midnight transition hover:bg-golden/90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Calculate Yield
            <ArrowRight size={15} />
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 rounded-full border border-midnight/20 px-7 py-3 text-sm font-medium text-midnight transition hover:bg-midnight/5"
          >
            <RotateCcw size={15} />
            Reset
          </button>
        </div>

        {hasInputs && (
          <YieldStickyBar
            grossYield={results.grossYield}
            weeklyCashflow={
              results.weeklyCashflow
            }
            onCalculate={handleCalculate}
          />
        )}
      </SectionWrapper>

      {calculated && (
        <SectionWrapper className="!pb-16 !pt-0">
          <div
            ref={resultsRef}
            className="scroll-mt-24"
          >
            <h2 className="font-heading mb-6 text-2xl text-midnight">
              Pre-Tax Cashflow Estimate
            </h2>

            <YieldResultsDashboard
              results={results}
              summary={summary}
            />

            <p className="mt-6 max-w-3xl text-xs leading-relaxed text-midnight/40">
              {DISCLAIMER}
            </p>

            <div className="mt-8">
              <YieldPrintableSummary
                inputs={inputs}
                results={results}
                summary={summary}
              />
            </div>
          </div>
        </SectionWrapper>
      )}
    </>
  );
}