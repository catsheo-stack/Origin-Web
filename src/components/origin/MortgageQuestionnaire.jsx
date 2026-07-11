import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import LegalConsent, {
  LEGAL_CONSENT_VERSION,
  MARKETING_CONSENT_VERSION,
} from "@/components/origin/LegalConsent";
import { ArrowLeft } from "lucide-react";

const helpWithOptions = [
  "Home loan guidance",
  "Pre-approval preparation",
  "Borrowing power estimate",
  "Refinance review",
  "Investment loan guidance",
  "First home buyer finance",
  "Not sure yet",
  "Other",
];
const planningOptions = [
  "Buy my first home",
  "Buy my next home",
  "Buy an investment property",
  "Refinance existing loan",
  "Review my current loan",
  "Not sure yet",
  "Other",
];
const stageOptions = [
  "Just planning ahead",
  "Actively looking",
  "Found a property",
  "Offer accepted",
  "Pre-approval needed",
  "Loan already in progress",
  "Not sure yet",
];
const timelineOptions = ["Urgent / today", "This week", "Within 1 month", "1–3 months", "Just planning ahead"];
const contactMethods = ["Email", "Phone", "Text"];

export default function MortgageQuestionnaire({ onBack }) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [legalConsent, setLegalConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [form, setForm] = useState({
    help_with: "",
    other_help_with: "",
    planning: "",
    other_planning: "",
    stage: "",
    price_or_loan: "",
    suburb_or_address: "",
    timeline: "",
    additional_notes: "",
    full_name: "",
    email: "",
    phone: "",
    preferred_contact: "Email",
  });

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!legalConsent) {
      toast({
        title: "Consent required",
        description: "Please acknowledge the Privacy Policy, Terms of Use and Professional Services & Referral Disclaimer before submitting.",
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    try {
      const resolvedHelp = form.help_with === "Other" && form.other_help_with.trim()
        ? form.other_help_with.trim() : form.help_with;
      const resolvedPlanning = form.planning === "Other" && form.other_planning.trim()
        ? form.other_planning.trim() : form.planning;

      const notesParts = [];
      if (resolvedHelp) notesParts.push(`Help needed: ${resolvedHelp}`);
      if (resolvedPlanning) notesParts.push(`Planning to: ${resolvedPlanning}`);
      if (form.stage) notesParts.push(`Stage: ${form.stage}`);
      if (form.price_or_loan.trim()) notesParts.push(`Est. price / loan: ${form.price_or_loan.trim()}`);
      if (form.timeline) notesParts.push(`When needed: ${form.timeline}`);
      if (form.additional_notes.trim()) notesParts.push(form.additional_notes.trim());

      await base44.entities.Lead.create({
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        property_address: form.suburb_or_address || undefined,
        preferred_contact: form.preferred_contact,
        additional_notes: notesParts.length ? notesParts.join("\n\n") : undefined,
        service_required: "Mortgage Broker / Home Loan Support",
        service_type: "mortgage-finance",
        lead_source: "mortgage-finance-page",
        form_type: "mortgage-finance-questionnaire",
        legal_consent: true,
        legal_consent_version: LEGAL_CONSENT_VERSION,
        legal_consent_at: new Date().toISOString(),
        marketing_consent: marketingConsent,
        marketing_consent_version: marketingConsent
          ? MARKETING_CONSENT_VERSION
          : null,
        marketing_consent_at: marketingConsent
          ? new Date().toISOString()
          : null,

        source_page: "mortgage-finance-page",
      });

      base44.analytics.track({ eventName: "form_submitted", properties: { source: "mortgage-finance-page", form_type: "mortgage-finance-questionnaire" } });
      toast({ title: "Enquiry received", description: "We'll review your finance enquiry and guide you to the most suitable next step." });
      navigate("/thank-you");
    } catch {
      toast({ title: "Something went wrong", description: "Please try again or contact us directly.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
      {onBack && (
        <button type="button" onClick={onBack} className="inline-flex items-center gap-2 text-sm font-medium text-midnight border border-stone bg-white px-5 py-2.5 rounded-full hover:bg-stone/40 transition-colors mb-6 shadow-sm">
          <ArrowLeft size={16} /> Back
        </button>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        <SelectField label="What do you need help with?" value={form.help_with} onChange={(v) => update("help_with", v)} options={helpWithOptions} required />
        <SelectField label="What are you planning to do?" value={form.planning} onChange={(v) => update("planning", v)} options={planningOptions} required />
      </div>

      {form.help_with === "Other" && (
        <div className="mt-5">
          <InputField label="Please tell us what you need help with" value={form.other_help_with} onChange={(v) => update("other_help_with", v)} placeholder="Tell us what you need help with" />
        </div>
      )}
      {form.planning === "Other" && (
        <div className="mt-5">
          <InputField label="Please tell us more" value={form.other_planning} onChange={(v) => update("other_planning", v)} placeholder="Tell us more about your plans" />
        </div>
      )}

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        <SelectField label="What stage are you at?" value={form.stage} onChange={(v) => update("stage", v)} options={stageOptions} />
        <InputField label="Estimated purchase price or loan amount" value={form.price_or_loan} onChange={(v) => update("price_or_loan", v)} placeholder="Example: $750,000 purchase price or $500,000 loan amount" />
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        <InputField label="Preferred suburb or property address" value={form.suburb_or_address} onChange={(v) => update("suburb_or_address", v)} placeholder="Suburb, postcode or property address if available" />
        <SelectField label="When do you need help?" value={form.timeline} onChange={(v) => update("timeline", v)} options={timelineOptions} />
      </div>

      <div className="mt-5">
        <label className="block text-sm font-medium text-midnight mb-1.5">Anything else you'd like us to know?</label>
        <textarea
          value={form.additional_notes}
          onChange={(e) => update("additional_notes", e.target.value)}
          className="w-full border border-stone rounded-lg px-4 py-3 text-sm font-body text-midnight bg-parchment/50 focus:outline-none focus:border-accent-navy resize-y min-h-[110px]"
          placeholder="Tell us about your income situation, deposit, existing loan, goals, concerns, timeline or anything you'd like guidance on."
          rows={4}
        />
      </div>

      <div className="mt-8 pt-6 border-t border-stone/50 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        <InputField label="Full name" value={form.full_name} onChange={(v) => update("full_name", v)} placeholder="Jane Smith" required />
        <InputField label="Email address" value={form.email} onChange={(v) => update("email", v)} placeholder="jane@example.com" type="email" required />
        <InputField label="Phone number" value={form.phone} onChange={(v) => update("phone", v)} placeholder="04xx xxx xxx" />
        <SelectField label="Preferred contact method" value={form.preferred_contact} onChange={(v) => update("preferred_contact", v)} options={contactMethods} />
      </div>

      <LegalConsent
        id="mortgage-legal-consent"
        checked={legalConsent}
        onChange={setLegalConsent}
        marketingChecked={marketingConsent}
        onMarketingChange={setMarketingConsent}
      />

      <button
        type="submit"
        disabled={submitting || !legalConsent}
        className="mt-8 w-full bg-golden text-midnight font-medium text-sm py-4 rounded-full hover:bg-golden/90 transition-colors disabled:opacity-50"
      >
        {submitting ? "Sending..." : "Get My Finance Guidance"}
      </button>
      <p className="mt-3 text-center text-xs text-midnight/40">
        We'll review your finance enquiry and guide you to the most suitable next step.
      </p>
    </form>
  );
}

function InputField({ label, value, onChange, placeholder, type = "text", required }) {
  return (
    <div>
      <label className="block text-sm font-medium text-midnight mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full border border-stone rounded-lg px-4 py-3 text-sm font-body text-midnight bg-parchment/50 focus:outline-none focus:border-accent-navy"
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options, required }) {
  return (
    <div>
      <label className="block text-sm font-medium text-midnight mb-1.5">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full border border-stone rounded-lg px-4 py-3 text-sm font-body text-midnight bg-parchment/50 focus:outline-none focus:border-accent-navy appearance-none"
      >
        <option value="">Select an option</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}