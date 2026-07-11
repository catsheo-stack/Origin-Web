import React from "react";
import LegalPage, { LegalList, LegalSection } from "@/components/origin/LegalPage";

const sections = [
  { id: "who-we-are", title: "Who we are" },
  { id: "information-we-collect", title: "Information we collect" },
  { id: "how-we-collect", title: "How we collect information" },
  { id: "how-we-use", title: "How we use information" },
  { id: "referrals", title: "Referrals and consent" },
  { id: "hermes", title: "CRM and Hermes processing" },
  { id: "analytics", title: "Cookies and analytics" },
  { id: "disclosure", title: "Disclosure and overseas processing" },
  { id: "security", title: "Security and retention" },
  { id: "access", title: "Access, correction and complaints" },
  { id: "contact", title: "Contact" },
];

export default function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="How Origin Property Concierge collects, uses, stores and discloses personal information when coordinating enquiries, referrals and website services."
      sections={sections}
    >
      <LegalSection id="who-we-are" title="Who we are">
        <p>
          Origin Property Concierge ("Origin", "we", "our" or "us") is an independent property concierge and coordination platform. We help clients organise information, navigate property-related processes and connect with appropriately licensed or qualified independent professionals where specialist expertise is required.
        </p>
        <p className="font-medium text-midnight">
          Origin Property Concierge does not itself provide legal, financial, lending, conveyancing or property management advice. Where specialist advice is required, we facilitate introductions to appropriately licensed or qualified independent professionals.
        </p>
        <p>
          We handle personal information in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles where they apply to us, and otherwise use those principles as the standard for our privacy practices.
        </p>
      </LegalSection>

      <LegalSection id="information-we-collect" title="Information we collect">
        <p>We seek to collect only information reasonably necessary to coordinate the service or referral you request. This may include:</p>
        <LegalList>
          <li>your name, email address, telephone number and preferred contact method;</li>
          <li>property addresses, ownership or tenancy details, preferred locations and property requirements;</li>
          <li>purchase budget, borrowing objectives, timeframes and general financial circumstances that you choose to provide;</li>
          <li>messages, enquiry details, appointment preferences and correspondence history;</li>
          <li>documents voluntarily uploaded or supplied for a requested workflow;</li>
          <li>information entered into our calculators, planners, checklists, trackers and other interactive tools; and</li>
          <li>technical information such as browser, device, IP address, pages viewed, referral source and approximate location.</li>
        </LegalList>
        <p>
          Please avoid sending identification documents, detailed financial records or other sensitive information unless we or an introduced professional specifically request them through an appropriate channel.
        </p>
      </LegalSection>

      <LegalSection id="how-we-collect" title="How we collect information">
        <p>We may collect personal information:</p>
        <LegalList>
          <li>directly from you through forms, email, telephone calls, consultations or website tools;</li>
          <li>from a person authorised by you;</li>
          <li>from an independent professional or service provider involved in your enquiry; and</li>
          <li>automatically through website cookies, logs and analytics technologies.</li>
        </LegalList>
        <p>
          Where practicable, you may enquire anonymously or using a pseudonym. However, we may need identifying and contact information to arrange a consultation, coordinate a referral or respond meaningfully to a property-specific request.
        </p>
      </LegalSection>

      <LegalSection id="how-we-use" title="How we use information">
        <p>We may use your information to:</p>
        <LegalList>
          <li>respond to enquiries and communicate with you;</li>
          <li>coordinate services and facilitate referrals;</li>
          <li>arrange appointments, consultations and follow-up actions;</li>
          <li>organise property information and prepare administrative or research summaries;</li>
          <li>operate and improve our website, tools and internal workflows;</li>
          <li>maintain business, security and compliance records;</li>
          <li>send marketing communications where permitted, with an option to unsubscribe; and</li>
          <li>comply with legal obligations and address misuse, fraud or security concerns.</li>
        </LegalList>
      </LegalSection>

      <LegalSection id="referrals" title="Referrals and consent">
        <p>
          When you ask us to connect you with a buyer's advocate, mortgage or finance professional, conveyancer, property manager or another specialist, we may disclose information reasonably necessary for that professional to understand and respond to your request.
        </p>
        <p>
          We will seek your consent before making a referral or otherwise ensure the proposed disclosure is reasonably expected from the nature of your request. You remain free to choose whether to engage any introduced professional.
        </p>
        <p>
          Origin Property Concierge may, from time to time, receive referral fees, commissions or other commercial benefits from certain independent service providers where permitted by law. Where such arrangements exist, we seek to ensure recommendations are made in good faith based on your requirements, objectives and circumstances, and not solely because of a commercial relationship.
        </p>
      </LegalSection>

      <LegalSection id="hermes" title="CRM and Hermes processing">
        <p>
          Origin uses customer relationship management systems and an internal workflow, knowledge and operations platform known as Hermes. These systems may organise enquiries, coordinate tasks and appointments, manage documents, assist research, maintain internal knowledge and prepare draft communications.
        </p>
        <p>
          Certain functions may use artificial intelligence to classify, summarise, compare or draft information. Significant client communications and decisions remain subject to appropriate human review. Hermes does not independently provide legal, financial, lending, conveyancing, taxation or other regulated professional advice.
        </p>
        <p>
          Information generated by automated tools may be incomplete or inaccurate and should not be relied upon as a substitute for advice from an appropriately licensed or qualified professional.
        </p>
      </LegalSection>

      <LegalSection id="analytics" title="Cookies and analytics">
        <p>
          Our website may use cookies, local storage, session technologies and analytics services to operate features, remember preferences, measure website use, improve performance and understand which resources are useful.
        </p>
        <p>
          Current website functions include platform analytics. We may also enable services such as Google Analytics in the future. These providers may process device, usage and approximate location information under their own privacy terms. You can restrict cookies through your browser, although some functions may not work as intended.
        </p>
      </LegalSection>

      <LegalSection id="disclosure" title="Disclosure and overseas processing">
        <p>Where reasonably necessary, we may disclose personal information to:</p>
        <LegalList>
          <li>independent buyer's advocates, mortgage and finance professionals, licensed conveyancers, solicitors, property managers, real estate agencies, inspectors, valuers and other requested specialists;</li>
          <li>technology, analytics, communications, document storage and cloud hosting providers;</li>
          <li>professional advisers, insurers or contractors supporting our operations; and</li>
          <li>regulators, courts, law enforcement or other parties where required or authorised by law.</li>
        </LegalList>
        <p>
          Some technology providers may store or process information outside Australia. The countries involved can change as providers update their infrastructure. Where Australian privacy law applies, we take reasonable steps appropriate to the circumstances before making cross-border disclosures.
        </p>
      </LegalSection>

      <LegalSection id="security" title="Security and retention">
        <p>
          We use reasonable administrative, technical and access controls designed to protect personal information against misuse, interference, loss and unauthorised access, modification or disclosure. No internet or storage system is completely secure.
        </p>
        <p>
          We retain information for as long as reasonably necessary for the purpose collected, to maintain appropriate business records, resolve disputes and meet legal obligations. When information is no longer required, we take reasonable steps to delete it or de-identify it, subject to backup and legal retention requirements.
        </p>
      </LegalSection>

      <LegalSection id="access" title="Access, correction and complaints">
        <p>
          You may request access to personal information we hold about you or ask us to correct information that is inaccurate, out of date, incomplete, irrelevant or misleading. We may need to verify your identity and permitted exceptions may apply.
        </p>
        <p>
          Privacy complaints should first be sent to us using the contact details below. We will review the concern and respond within a reasonable period. If the Privacy Act applies and you are dissatisfied with our response, you may contact the Office of the Australian Information Commissioner.
        </p>
      </LegalSection>

      <LegalSection id="contact" title="Contact">
        <p><strong>Origin Property Concierge</strong></p>
        <p>
          Email: <a className="text-accent-navy underline decoration-stone underline-offset-4" href="mailto:hello@originpropertyconcierge.com.au">hello@originpropertyconcierge.com.au</a>
        </p>
        <p>
          We may update this policy as our operations, technology or legal obligations change. The current version will be published on this website with its latest update date.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
