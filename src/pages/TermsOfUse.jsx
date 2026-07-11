import React from "react";
import LegalPage, { LegalList, LegalSection } from "@/components/origin/LegalPage";

const sections = [
  { id: "acceptance", title: "Acceptance" },
  { id: "website-purpose", title: "Website purpose" },
  { id: "no-advice", title: "No professional advice" },
  { id: "tools", title: "Tools and automated content" },
  { id: "referrals", title: "Referrals and third parties" },
  { id: "acceptable-use", title: "Acceptable use" },
  { id: "intellectual-property", title: "Intellectual property" },
  { id: "accuracy", title: "Accuracy and availability" },
  { id: "liability", title: "Liability and consumer rights" },
  { id: "privacy", title: "Privacy" },
  { id: "changes-law", title: "Changes and governing law" },
  { id: "contact", title: "Contact" },
];

export default function TermsOfUse() {
  return (
    <LegalPage
      title="Terms of Use"
      description="The terms applying when you access the Origin Property Concierge website, use our educational resources or submit an enquiry."
      sections={sections}
    >
      <LegalSection id="acceptance" title="Acceptance">
        <p>
          These Terms of Use apply to your access to and use of this website and its content, tools and enquiry functions. By using the website, you agree to these terms. If you do not agree, please stop using the website.
        </p>
      </LegalSection>

      <LegalSection id="website-purpose" title="Website purpose">
        <p>
          Origin Property Concierge is an independent property concierge and coordination platform. The website provides general information, educational resources, interactive tools and ways to request coordination or referrals to independent professionals.
        </p>
        <p>
          Website access does not itself create an adviser-client, solicitor-client, broker-client, agency, fiduciary or property management relationship with Origin.
        </p>
      </LegalSection>

      <LegalSection id="no-advice" title="No professional advice">
        <p className="font-medium text-midnight">
          Origin does not itself provide legal, financial, lending, conveyancing, taxation or property management advice unless expressly stated in a separate written agreement and provided under all required licences or authorisations.
        </p>
        <p>
          Website content is general information only. Before acting, obtain advice appropriate to your circumstances from an appropriately licensed or qualified professional.
        </p>
      </LegalSection>

      <LegalSection id="tools" title="Tools and automated content">
        <p>
          Calculators, planners, checklists, trackers, comparisons, summaries and AI-assisted outputs are indicative tools. Results depend on the information entered, assumptions used and data available at the time.
        </p>
        <LegalList>
          <li>Results may be incomplete, approximate, delayed or inaccurate.</li>
          <li>They do not predict finance approval, legal outcomes, property value, investment performance or settlement success.</li>
          <li>You are responsible for checking important information and obtaining professional advice before making decisions.</li>
        </LegalList>
      </LegalSection>

      <LegalSection id="referrals" title="Referrals and third parties">
        <p>
          Origin may introduce you to independent service providers. Any engagement, scope, fee, advice, representation or service agreement is between you and that provider. You should make your own enquiries about suitability, qualifications, licensing, insurance, fees and terms before engagement.
        </p>
        <p>
          Origin may receive referral fees, commissions or other commercial benefits from certain providers where permitted by law. This does not oblige you to engage any introduced provider.
        </p>
        <p>
          Links to third-party websites are provided for convenience. Origin does not control and is not responsible for their content, security, availability or privacy practices.
        </p>
      </LegalSection>

      <LegalSection id="acceptable-use" title="Acceptable use">
        <p>You must not:</p>
        <LegalList>
          <li>use the website unlawfully, fraudulently or to infringe another person's rights;</li>
          <li>upload malicious code or attempt to bypass security or access controls;</li>
          <li>scrape, copy, probe, reverse engineer or overload the website except as permitted by law;</li>
          <li>submit information you are not authorised to provide; or</li>
          <li>misrepresent your identity, authority or relationship with another person.</li>
        </LegalList>
      </LegalSection>

      <LegalSection id="intellectual-property" title="Intellectual property">
        <p>
          Unless otherwise stated, the website design, branding, text, original tools, templates, graphics and other content are owned by or licensed to Origin and protected by intellectual property laws.
        </p>
        <p>
          You may view, download or print reasonable extracts for personal, non-commercial use. You must not reproduce, publish, commercialise, modify or distribute substantial content without prior written permission, except where permitted by law.
        </p>
      </LegalSection>

      <LegalSection id="accuracy" title="Accuracy and availability">
        <p>
          We take reasonable care when preparing the website but do not promise that all content is complete, current or error-free. Property markets, laws, lending policies, service availability and third-party information can change without notice.
        </p>
        <p>
          We may change, suspend or withdraw any website feature. We do not guarantee uninterrupted or secure availability.
        </p>
      </LegalSection>

      <LegalSection id="liability" title="Liability and consumer rights">
        <p>
          To the maximum extent permitted by law, Origin is not liable for loss arising solely from reliance on general website content, indicative tools, third-party information, or the acts or omissions of an independent provider.
        </p>
        <p>
          Nothing in these terms excludes, restricts or modifies any consumer guarantee, right or remedy under the Australian Consumer Law or another law that cannot lawfully be excluded, restricted or modified. Where liability can lawfully be limited, it is limited only to the extent permitted by law.
        </p>
      </LegalSection>

      <LegalSection id="privacy" title="Privacy">
        <p>
          Our <a href="/privacy-policy" className="text-accent-navy underline decoration-stone underline-offset-4">Privacy Policy</a> explains how we handle personal information submitted through the website or processed during an enquiry or referral.
        </p>
      </LegalSection>

      <LegalSection id="changes-law" title="Changes and governing law">
        <p>
          We may update these terms by publishing a revised version on this website. Continued use after publication means the revised terms apply from that time.
        </p>
        <p>
          These terms are governed by the laws of Victoria, Australia. Subject to any non-excludable rights, the courts of Victoria and courts entitled to hear appeals from them have jurisdiction.
        </p>
      </LegalSection>

      <LegalSection id="contact" title="Contact">
        <p><strong>Origin Property Concierge</strong></p>
        <p>
          Email: <a className="text-accent-navy underline decoration-stone underline-offset-4" href="mailto:hello@originpropertyconcierge.com.au">hello@originpropertyconcierge.com.au</a>
        </p>
      </LegalSection>
    </LegalPage>
  );
}
