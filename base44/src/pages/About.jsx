import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Award, Star, GraduationCap, Briefcase, Sparkles } from "lucide-react";
import SectionWrapper from "@/components/origin/SectionWrapper";
import PortraitPlaceholder from "@/components/about/PortraitPlaceholder";
import CredentialCard from "@/components/about/CredentialCard";

const CREDENTIALS = [
  {
    icon: Award,
    title: "Westpac Platinum Broker",
    description: "Recognised for outstanding performance, customer outcomes and professional excellence.",
  },
  {
    icon: Star,
    title: "RateMyAgent Reviews",
    description: "Trusted by verified clients with consistently positive reviews across residential property transactions.",
    action: { label: "View Reviews", href: "#" },
  },
  {
    icon: GraduationCap,
    title: "Advanced Diploma of Conveyancing",
    description: "Formal conveyancing education providing a strong understanding of Victorian property transactions and legal processes.",
  },
  {
    icon: Briefcase,
    title: "10+ Years Property Experience",
    description: "Experience across mortgage finance, residential real estate, buyer advisory and property transactions.",
  },
];

export default function About() {
  useEffect(() => {
    document.title = "About Catherine | Origin Property Concierge";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Meet Catherine, founder of Origin Property Concierge. Learn about her experience across mortgage finance, real estate, buyer advisory and conveyancing, and the vision behind Origin Concierge.");
    }
  }, []);

  return (
    <>
      {/* Hero + Story */}
      <SectionWrapper bg="bg-parchment" className="pt-28 md:pt-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-golden mb-5">
              The Story Behind Origin
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-midnight leading-[1.05] tracking-tight mb-6">
              Meet Catherine
            </h1>
            <div className="space-y-4 text-base md:text-lg text-midnight/65 leading-relaxed font-body max-w-xl">
              <p>
                After more than a decade in the property industry, Catherine founded Origin Property Concierge with a simple vision — to make property decisions clearer, more informed and less overwhelming.
              </p>
              <p>
                With experience spanning mortgage finance, residential real estate, buyer advisory and conveyancing, she understands that every property decision involves far more than simply buying or selling.
              </p>
              <p>
                Origin Concierge was created to bring these disciplines together into one connected experience, helping clients navigate every stage of their property journey with confidence.
              </p>
            </div>
          </div>
          <div className="order-first lg:order-last">
            <PortraitPlaceholder label="Catherine Portrait" />
          </div>
        </div>
      </SectionWrapper>

      {/* Hermes Lab */}
      <SectionWrapper bg="bg-white">
        <div className="max-w-3xl">
          <div className="w-10 h-10 rounded-full bg-parchment flex items-center justify-center mb-5">
            <Sparkles className="w-5 h-5 text-golden" strokeWidth={1.5} />
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-light text-midnight leading-tight mb-5">
            Powered by Experience. Enhanced by Technology.
          </h2>
          <div className="space-y-4 text-base md:text-lg text-midnight/65 leading-relaxed font-body">
            <p>
              Origin Concierge combines practical industry experience with Hermes Lab — an AI-assisted knowledge platform designed to provide educational resources, smarter tools and structured property guidance.
            </p>
            <p>
              Technology does not replace professional advice. Instead, it helps clients better understand their options before making important property decisions.
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* Credentials */}
      <SectionWrapper bg="bg-parchment">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-golden mb-4">
              Credentials
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-light text-midnight leading-tight mb-5">
              Experience &amp; Recognition
            </h2>
            <p className="text-base md:text-lg text-midnight/60 leading-relaxed font-body mb-8 max-w-md">
              A decade of recognised achievement across mortgage finance, real estate and conveyancing — backed by formal qualifications and verified client trust.
            </p>
            <div className="rounded-2xl overflow-hidden shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80"
                alt="Modern architecture reflecting property expertise and professional authority"
                className="w-full h-auto object-cover aspect-[4/3]"
                loading="lazy"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {CREDENTIALS.map((c) => (
              <CredentialCard key={c.title} {...c} />
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper bg="bg-parchment" className="text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl font-light text-midnight leading-tight mb-4">
            Need guidance with your next property decision?
          </h2>
          <p className="text-base text-midnight/60 leading-relaxed font-body mb-8">
            Whether you're buying, selling, investing or leasing, we're here to help.
          </p>
          <Link
            to="/"
            className="inline-block bg-golden text-midnight text-sm font-medium px-8 py-3.5 rounded-full hover:bg-golden/90 transition-colors"
          >
            Start Your Property Journey
          </Link>
        </div>
      </SectionWrapper>
    </>
  );
}