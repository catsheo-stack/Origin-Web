import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft } from "lucide-react";
import AddressAutocomplete from "@/components/origin/AddressAutocomplete";

const propertyTypes = ["House", "Apartment", "Townhouse", "Unit", "Other"];
const tenantedOptions = ["Yes", "No", "Not sure"];
const helpOptions = ["New property management", "Switching property managers", "Rental appraisal", "Leasing only", "General enquiry"];
const urgencyOptions = ["As soon as possible", "Within a month", "Just exploring", "Not sure yet"];
const contactMethods = ["Phone", "Email", "SMS"];

export default function LeadForm({ sourcePage = "unknown", onBack }) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    property_address: "",
    street_number: "",
    street_name: "",
    suburb: "",
    postcode: "",
    state: "",
    country: "Australia",
    latitude: null,
    longitude: null,
    address_place_id: "",
    manual_address_entry: false,
    property_type: "",
    currently_tenanted: "",
    help_needed: "",
    urgency: "",
    additional_notes: "",
    preferred_contact: "Phone",
  });

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    base44.analytics.track({ eventName: "form_submitted", properties: { source: sourcePage } });
    setSubmitting(true);
    try {
      await base44.entities.Lead.create({ ...form, source_page: sourcePage });
      toast({ title: "Thank you", description: "We'll be in touch shortly with your property management recommendation." });
      navigate("/thank-you");
    } catch {
      toast({ title: "Something went wrong", description: "Please try again or contact us directly.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 md:p-10 shadow-sm">
      {onBack && (
        <button type="button" onClick={onBack} className="inline-flex items-center gap-2 text-sm font-medium text-midnight border border-stone bg-white px-5 py-2.5 rounded-full hover:bg-stone/40 transition-colors mb-6 shadow-sm">
          <ArrowLeft size={16} /> Back
        </button>
      )}
      <h3 className="font-heading text-2xl md:text-3xl font-light text-midnight mb-2">
        Tell us about your property
      </h3>
      <p className="text-sm text-midnight/50 mb-8">
        Five quick questions — a tailored recommendation in return.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        <SelectField label="What type of property do you own?" value={form.property_type} onChange={(v) => update("property_type", v)} options={propertyTypes} />
        <SelectField label="Is the property currently tenanted?" value={form.currently_tenanted} onChange={(v) => update("currently_tenanted", v)} options={tenantedOptions} />
        <SelectField label="What do you need help with?" value={form.help_needed} onChange={(v) => update("help_needed", v)} options={helpOptions} />
        <AddressAutocomplete
          label="Your property address for Rental Appraisal"
          value={form.property_address}
          onChange={(addressData) => {
            if (addressData) {
              setForm((f) => ({ ...f, ...addressData }));
            }
          }}
        />
        <SelectField label="When do you need help?" value={form.urgency} onChange={(v) => update("urgency", v)} options={urgencyOptions} />
      </div>

      <div className="mt-5">
        <label className="block text-sm font-medium text-midnight mb-1.5">Anything else you'd like us to know?</label>
        <textarea
          value={form.additional_notes}
          onChange={(e) => update("additional_notes", e.target.value)}
          className="w-full border border-stone rounded-lg px-4 py-3 text-sm font-body text-midnight bg-parchment/50 focus:outline-none focus:border-accent-navy resize-y min-h-[80px]"
          placeholder="Optional notes"
          rows={3}
        />
      </div>

      <div className="mt-8 pt-6 border-t border-stone/50 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        <InputField label="Full name" value={form.full_name} onChange={(v) => update("full_name", v)} placeholder="Jane Smith" required />
        <InputField label="Email address" value={form.email} onChange={(v) => update("email", v)} placeholder="jane@example.com" type="email" required />
        <InputField label="Phone number" value={form.phone} onChange={(v) => update("phone", v)} placeholder="04xx xxx xxx" />
        <SelectField label="Preferred contact method" value={form.preferred_contact} onChange={(v) => update("preferred_contact", v)} options={contactMethods} />
      </div>

      <p className="mt-3 text-xs text-midnight/40">
        Preferred communication — let us know whether you'd like us to reach you by phone, SMS or email so we can get in touch the way that suits you best.
      </p>

      <button
        type="submit"
        disabled={submitting}
        className="mt-8 w-full bg-golden text-midnight font-medium text-sm py-4 rounded-full hover:bg-golden/90 transition-colors disabled:opacity-50"
        onClick={() => { base44.analytics.track({ eventName: "form_started", properties: { source: sourcePage } }); }}
      >
        {submitting ? "Sending..." : "Get My Property Management Recommendation"}
      </button>
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

function SelectField({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm font-medium text-midnight mb-1.5">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
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