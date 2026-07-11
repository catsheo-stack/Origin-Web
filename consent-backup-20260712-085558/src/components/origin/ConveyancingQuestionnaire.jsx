import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft } from "lucide-react";

const transactionTypeOptions = ["Buying", "Selling", "Transferring property", "Not sure yet", "Other"];
const helpNeededOptions = ["Contract review", "Preparing for Sale / Purchase", "Reviewing special conditions", "General conveyancing guidance", "Not sure yet", "Other"];
const stageOptions = ["Just planning ahead", "Found a property", "Contract received", "Not sure yet"];
const timelineOptions = ["Urgent / today", "This week", "Within 1 month", "Just planning ahead"];
const documentOptions = ["Yes, I have the documents", "Not yet", "I am waiting for the agent/vendor", "Not sure"];
const contactMethods = ["Email", "Phone", "Text"];

export default function ConveyancingQuestionnaire({ onBack }) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    transaction_type: "",
    other_transaction_type: "",
    help_needed: "",
    other_help_needed: "",
    stage: "",
    property_location: "",
    timeline: "",
    documents_available: "",
    additional_notes: "",
    full_name: "",
    email: "",
    phone: "",
    preferred_contact: "Email",
  });

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const resolvedTransaction = form.transaction_type === "Other" && form.other_transaction_type.trim()
        ? form.other_transaction_type.trim() : form.transaction_type;
      const resolvedHelp = form.help_needed === "Other" && form.other_help_needed.trim()
        ? form.other_help_needed.trim() : form.help_needed;

      const notesParts = [];
      if (resolvedTransaction) notesParts.push(`Transaction: ${resolvedTransaction}`);
      if (resolvedHelp) notesParts.push(`Help needed: ${resolvedHelp}`);
      if (form.stage) notesParts.push(`Stage: ${form.stage}`);
      if (form.timeline) notesParts.push(`When needed: ${form.timeline}`);
      if (form.documents_available) notesParts.push(`Contract/Section 32: ${form.documents_available}`);
      if (form.additional_notes.trim()) notesParts.push(form.additional_notes.trim());

      await base44.entities.Lead.create({
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        property_address: form.property_location || undefined,
        preferred_contact: form.preferred_contact,
        additional_notes: notesParts.length ? notesParts.join("\n\n") : undefined,
        service_required: "Conveyancing",
        service_type: "conveyancing",
        lead_source: "conveyancing-page",
        form_type: "conveyancing-questionnaire",
        source_page: "conveyancing-page",
      });

      base44.analytics.track({ eventName: "form_submitted", properties: { source: "conveyancing-page", form_type: "conveyancing-questionnaire" } });
      toast({ title: "Enquiry received", description: "We'll review your conveyancing enquiry and guide you to the most suitable next step." });
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
        <SelectField label="Are you buying or selling?" value={form.transaction_type} onChange={(v) => update("transaction_type", v)} options={transactionTypeOptions} required />
        <SelectField label="What do you need help with?" value={form.help_needed} onChange={(v) => update("help_needed", v)} options={helpNeededOptions} required />
      </div>

      {form.transaction_type === "Other" && (
        <div className="mt-5">
          <InputField label="Please tell us more" value={form.other_transaction_type} onChange={(v) => update("other_transaction_type", v)} placeholder="Describe your transaction" />
        </div>
      )}
      {form.help_needed === "Other" && (
        <div className="mt-5">
          <InputField label="Please tell us what you need help with" value={form.other_help_needed} onChange={(v) => update("other_help_needed", v)} placeholder="Tell us what you need help with" />
        </div>
      )}

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        <SelectField label="What stage are you at?" value={form.stage} onChange={(v) => update("stage", v)} options={stageOptions} />
        <InputField label="Property address or suburb" value={form.property_location} onChange={(v) => update("property_location", v)} placeholder="Enter property address, suburb or postcode if available" />
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        <SelectField label="When do you need help?" value={form.timeline} onChange={(v) => update("timeline", v)} options={timelineOptions} />
        <SelectField label="Contract or Section 32 available?" value={form.documents_available} onChange={(v) => update("documents_available", v)} options={documentOptions} />
      </div>

      <div className="mt-5">
        <label className="block text-sm font-medium text-midnight mb-1.5">Anything else you'd like us to know?</label>
        <textarea
          value={form.additional_notes}
          onChange={(e) => update("additional_notes", e.target.value)}
          className="w-full border border-stone rounded-lg px-4 py-3 text-sm font-body text-midnight bg-parchment/50 focus:outline-none focus:border-accent-navy resize-y min-h-[110px]"
          placeholder="Tell us about your concerns, deadlines, auction date, settlement date, contract questions or anything unusual about the property."
          rows={4}
        />
      </div>

      <div className="mt-8 pt-6 border-t border-stone/50 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        <InputField label="Full name" value={form.full_name} onChange={(v) => update("full_name", v)} placeholder="Jane Smith" required />
        <InputField label="Email address" value={form.email} onChange={(v) => update("email", v)} placeholder="jane@example.com" type="email" required />
        <InputField label="Phone number" value={form.phone} onChange={(v) => update("phone", v)} placeholder="04xx xxx xxx" />
        <SelectField label="Preferred contact method" value={form.preferred_contact} onChange={(v) => update("preferred_contact", v)} options={contactMethods} />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-8 w-full bg-golden text-midnight font-medium text-sm py-4 rounded-full hover:bg-golden/90 transition-colors disabled:opacity-50"
      >
        {submitting ? "Sending..." : "Get My Conveyancing Guidance"}
      </button>
      <p className="mt-3 text-center text-xs text-midnight/40">
        We'll review your conveyancing enquiry and guide you to the most suitable next step.
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