import React from "react";
import { useLocation, Link } from "react-router-dom";
import SectionWrapper from "@/components/origin/SectionWrapper";

const serviceNames = {
  "/buyers-agent": "Buyers Agent",
  "/finance-referral": "Finance Referral",
  "/conveyancing": "Conveyancing",
};

export default function ComingSoon() {
  const location = useLocation();
  const serviceName = serviceNames[location.pathname] || "This Service";

  return (
    <SectionWrapper className="min-h-[60vh] flex items-center">
      <div className="text-center max-w-lg mx-auto">
        <p className="text-xs font-medium tracking-widest uppercase text-golden mb-4">Coming Soon</p>
        <h1 className="font-heading text-3xl md:text-4xl font-light text-midnight leading-tight mb-4">
          {serviceName}
        </h1>
        <p className="text-base text-midnight/55 leading-relaxed mb-8">
          We're currently developing our {serviceName.toLowerCase()} service. Register your interest and we'll be in touch when it launches.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/contact"
            className="bg-golden text-midnight text-sm font-medium px-7 py-3 rounded-full hover:bg-golden/90 transition-colors"
          >
            Register Interest
          </Link>
          <Link
            to="/"
            className="text-sm text-midnight/60 px-7 py-3 rounded-full border border-stone hover:border-midnight/20 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}