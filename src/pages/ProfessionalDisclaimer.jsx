import React from "react";
import LegalPage, { LegalList, LegalSection } from "@/components/origin/LegalPage";

const sections = [
  { id: "our-role", title: "Our role" },
  { id: "no-regulated-advice", title: "No regulated professional advice" },
  { id: "independent-providers", title: "Independent providers" },
  { id: "referral-relationships", title: "Referral relationships" },
  { id: "educational-content", title: "Educational content and tools" },
  { id: "hermes", title: "Hermes and AI-assisted processing" },
  { id: "no-guarantee", title: "No guarantee" },
  { id: "client-responsibility", title: "Client responsibility" },
  { id: "liability", title: "Liability and non-excludable rights" },
  { id: "contact", title: "Contact" },
];

export default function ProfessionalDisclaimer() {
  return (
    <LegalPage
      title="Professional Services & Referral Disclaimer"
      description="A clear explanation of Origin's coordination role, independent professional referrals and the limits of general website information and automated tools."
      sections={sections}
    >
      <LegalSection id="our-role" title="Our role">
        <p>
          Origin Property Concierge is an independent property concierge and coordination platform. We help clients organise information, understand process steps and connect with appropriately licensed or qualified independent professionals where specialist expertise is required.
        </p>
        <p>
          Origin is not a substitute for independent professional advice and does not become your agent, lawyer, conveyancer, mortgage broker, financial adviser or property manager merely because you use this website or submit an enquiry.
        </p>
      </LegalSection>

      <LegalSection id="no-regulated-advice" title="No regulated professional advice">
        <p>Unless expressly stated in a separate written agreement and provided under all required licences or authorisations, Origin does not provide:</p>
        <LegalList>
          <li>legal advice or conveyancing services;</li>
          <li>financial product, investment, taxation or accounting advice;</li>
          <li>credit assistance, credit advice or mortgage broking services;</li>
          <li>property valuation, building inspection or pest inspection services;</li>
          <li>property management services; or</li>
          <li>another regulated professional service.</li>
        </LegalList>
      </LegalSection>

      <LegalSection id="independent-providers" title="Independent providers">
        <p>
          Professionals introduced by Origin operate independently and are responsible for their own licensing, qualifications, advice, fees, contracts, conduct and services. Any professional engagement is entered into directly between you and the relevant provider.
        </p>
        <p>
          Origin does not control how an independent provider performs its services. You should review the provider's engagement documents and make your own assessment before proceeding.
        </p>
      </LegalSection>

      <LegalSection id="referral-relationships" title="Referral relationships">
        <p>
          Origin Property Concierge may, from time to time, receive referral fees, commissions or other commercial benefits from certain independent service providers where permitted by law.
        </p>
        <p>
          Where such arrangements exist, we seek to ensure recommendations are made in good faith based on your requirements, objectives and circumstances, and not solely because of a commercial relationship. You are under no obligation to use an introduced provider and remain free to choose any provider.
        </p>
      </LegalSection>

      <LegalSection id="educational-content" title="Educational content and tools">
        <p>
          Articles, guides, FAQs, calculators, planners, trackers, checklists, comparisons, reports and other website resources are general educational information only. They do not take into account all aspects of your objectives, financial position, legal circumstances or property transaction.
        </p>
        <p>
          Outputs may rely on assumptions, user-entered data and third-party information. They should be independently checked and must not be relied upon as professional advice or a guarantee of an outcome.
        </p>
      </LegalSection>

      <LegalSection id="hermes" title="Hermes and AI-assisted processing">
        <p>
          Origin uses an internal workflow, knowledge and operations platform known as Hermes. Hermes may assist with administrative coordination, document organisation, research, comparison, classification, summarisation, pattern identification and draft communications.
        </p>
        <p>
          AI-assisted or automated outputs can be incomplete, outdated or inaccurate. Significant communications remain subject to appropriate human review. Hermes does not independently provide regulated advice, make binding decisions for you or replace an appropriately licensed or qualified professional.
        </p>
      </LegalSection>

      <LegalSection id="no-guarantee" title="No guarantee">
        <p>Origin does not guarantee:</p>
        <LegalList>
          <li>the availability, suitability, pricing or response time of any provider;</li>
          <li>finance approval, loan terms or borrowing capacity;</li>
          <li>legal, conveyancing, settlement or dispute outcomes;</li>
          <li>property condition, value, rental return or investment performance;</li>
          <li>the accuracy or completeness of third-party data; or</li>
          <li>that a particular property or service will meet your needs.</li>
        </LegalList>
      </LegalSection>

      <LegalSection id="client-responsibility" title="Client responsibility">
        <p>You remain responsible for:</p>
        <LegalList>
          <li>checking material information and reviewing documents before signing or acting;</li>
          <li>obtaining legal, financial, credit, taxation, technical or other professional advice appropriate to your circumstances;</li>
          <li>assessing the suitability and terms of an independent provider; and</li>
          <li>making your own property, finance and investment decisions.</li>
        </LegalList>
      </LegalSection>

      <LegalSection id="liability" title="Liability and non-excludable rights">
        <p>
          To the maximum extent permitted by law, Origin excludes liability for loss arising solely from reliance on general information, indicative tools, automated outputs, third-party information or services provided by independent professionals.
        </p>
        <p>
          Nothing in this disclaimer excludes, restricts or modifies any right, consumer guarantee or remedy under the Australian Consumer Law or another law that cannot lawfully be excluded, restricted or modified.
        </p>
      </LegalSection>

      <LegalSection id="contact" title="Contact">
        <p><strong>Origin Property Concierge</strong></p>
        <p>
          Email: <a className="text-accent-navy underline decoration-stone underline-offset-4" href="mailto:hello@originpropertyconcierge.com.au">hello@originpropertyconcierge.com.au</a>
        </p>
        <p>
          This disclaimer may be updated as Origin's operations, referral relationships or technology change. The latest version will be published on this website.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
