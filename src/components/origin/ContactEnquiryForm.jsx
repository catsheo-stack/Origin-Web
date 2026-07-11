import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import LegalConsent, {
  LEGAL_CONSENT_VERSION,
  MARKETING_CONSENT_VERSION,
} from "@/components/origin/LegalConsent";

const serviceOptions = [
  "Buyer Agent / Buyer Advisory",
  "Mortgage Broker / Home Loan Support",
  "Conveyancing",
  "Property Management",
  "Not sure yet",
];

const stageOptions = [
  "Just researching",
  "Actively looking to buy",
  "Found a property",
  "Contract / Section 32 review needed",
  "Need finance guidance",
  "Need rental appraisal / property manager",
  "Already own the property",
  "Other",
];

const timelineOptions = ["ASAP", "Within 1 month", "1–3 months", "3–6 months", "Just planning ahead"];
const contactMethods = ["Phone", "SMS", "Email", "WhatsApp"];

const addressPlaceholders = {
  "Buyer Agent / Buyer Advisory": "Target suburb or property address if available",
  "Mortgage Broker / Home Loan Support": "Property address or target suburb if known",
  "Conveyancing": "Property address or contract address",
  "Property Management": "Property address for rental appraisal",
  "Not sure yet": "Enter property address or suburb if available",
};

export default function ContactEnquiryForm({ intent = {} }) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [legalConsent, setLegalConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    property_address: "",
    service_required: intent.service_required || "",
    property_stage: "",
    timeline: "",
    additional_notes: "",
    preferred_contact: "Phone",
  });

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));
  const addressPlaceholder = addressPlaceholders[form.service_required] || "Enter property address or suburb if available";

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
      await base44.entities.Lead.create({
        ...form,
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

        source_page: "contact",
        service_type: intent.service_type,
        lead_source: intent.lead_source,
      });
      base44.analytics.track({ eventName: "form_submitted", properties: { source: "contact" } });
      toast({ title: "Enquiry sent", description: "We'll review your enquiry and guide you to the most suitable next step." });
      navigate("/thank-you");
    } catch {
      toast({ title: "Something went wrong", description: "Please try again or contact us directly.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
      <h2 className="font-heading text-2xl md:text-3xl font-light text-midnight mb-2">
        Tell us what you need help with
      </h2>
      <p className="text-sm text-midnight/50 mb-8">
        One enquiry — we'll route you to the right specialist.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        <SelectField label="Service required" value={form.service_required} onChange={(v) => update("service_required", v)} options={serviceOptions} required />
        <SelectField label="Property stage" value={form.property_stage} onChange={(v) => update("property_stage", v)} options={stageOptions} />
        <InputField label="Property address or suburb" value={form.property_address} onChange={(v) => update("property_address", v)} placeholder={addressPlaceholder} />
        <SelectField label="Timeline" value={form.timeline} onChange={(v) => update("timeline", v)} options={timelineOptions} />
      </div>

      <div className="mt-5">
        <label className="block text-sm font-medium text-midnight mb-1.5">Message</label>
        <textarea
          value={form.additional_notes}
          onChange={(e) => update("additional_notes", e.target.value)}
          className="w-full border border-stone rounded-lg px-4 py-3 text-sm font-body text-midnight bg-parchment/50 focus:outline-none focus:border-accent-navy resize-y min-h-[110px]"
          placeholder="Tell us briefly what you need help with..."
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
        id="contact-legal-consent"
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
        {submitting ? "Sending..." : "Send My Enquiry"}
      </button>
      <p className="mt-3 text-center text-xs text-midnight/40">
        We'll review your enquiry and guide you to the most suitable next step.
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