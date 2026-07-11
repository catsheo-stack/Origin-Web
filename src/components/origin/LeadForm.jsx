import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import LegalConsent, {
  LEGAL_CONSENT_VERSION,
  MARKETING_CONSENT_VERSION,
} from "@/components/origin/LegalConsent";
import AddressAutocomplete from "@/components/origin/AddressAutocomplete";

const propertyGoalOptions = [
  "Sell my property",
  "Lease and manage my property",
  "I'm deciding between selling and leasing",
  "Request a rental appraisal",
  "Request a sales appraisal",
  "General property advice",
];

const outcomeOptions = [
  "Maximise the sale price",
  "Achieve the highest rental return",
  "Sell within my preferred timeframe",
  "Find a reliable tenant",
  "Reduce property management stress",
  "Understand whether selling or leasing is better",
  "Understand the property's current market value",
  "Not sure yet",
];

const propertyTypes = [
  "House",
  "Apartment",
  "Townhouse",
  "Unit",
  "Land",
  "Other",
];

const propertyStatusOptions = [
  "Currently owner occupied",
  "Currently rented",
  "Currently vacant",
  "Settlement coming soon",
  "Investment property",
  "Under renovation",
  "Not sure",
];

const urgencyOptions = [
  "Immediately",
  "Within 1 month",
  "Within 3 months",
  "Within 6 months",
  "Just researching",
  "Not sure yet",
];

const contactMethods = ["Phone", "Email", "SMS"];

const INITIAL_FORM = {
  full_name: "",
  email: "",
  phone: "",

  property_goal: "",
  desired_outcome: "",
  property_type: "",
  other_property_type: "",
  property_status: "",
  urgency: "",

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

  additional_notes: "",
  preferred_contact: "Phone",
};

export default function LeadForm({
  sourcePage = "property-management-page",
  onBack,
}) {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);
  const [legalConsent, setLegalConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);

  const update = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const isSellingLead = useMemo(() => {
    return (
      form.property_goal === "Sell my property" ||
      form.property_goal === "Request a sales appraisal"
    );
  }, [form.property_goal]);

  const isLeasingLead = useMemo(() => {
    return (
      form.property_goal === "Lease and manage my property" ||
      form.property_goal === "Request a rental appraisal"
    );
  }, [form.property_goal]);

  const isUndecidedLead = useMemo(() => {
    return (
      form.property_goal ===
      "I'm deciding between selling and leasing"
    );
  }, [form.property_goal]);

  const formIntro = useMemo(() => {
    if (isSellingLead) {
      return "Tell us about your property and selling goals so we can recommend the most suitable next step.";
    }

    if (isLeasingLead) {
      return "Tell us about your property and leasing goals so we can recommend the most suitable management or appraisal option.";
    }

    if (isUndecidedLead) {
      return "Tell us about your property so we can help you compare selling and leasing options.";
    }

    return "Answer a few quick questions so we can recommend the most suitable next step for your property.";
  }, [isSellingLead, isLeasingLead, isUndecidedLead]);

  const submitButtonLabel = useMemo(() => {
    if (isSellingLead) {
      return "Request My Selling Recommendation";
    }

    if (isLeasingLead) {
      return "Request My Leasing Recommendation";
    }

    if (isUndecidedLead) {
      return "Compare My Property Options";
    }

    return "Get My Property Strategy Recommendation";
  }, [isSellingLead, isLeasingLead, isUndecidedLead]);

  const successMessage = useMemo(() => {
    if (isSellingLead) {
      return "We'll review your property and selling goals and be in touch with the most suitable next step.";
    }

    if (isLeasingLead) {
      return "We'll review your property and leasing goals and be in touch with the most suitable next step.";
    }

    if (isUndecidedLead) {
      return "We'll review your property details and help you compare selling and leasing options.";
    }

    return "We'll review your property goals and be in touch with the most suitable next step.";
  }, [isSellingLead, isLeasingLead, isUndecidedLead]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!legalConsent) {
      toast({
        title: "Consent required",
        description: "Please acknowledge the Privacy Policy, Terms of Use and Professional Services & Referral Disclaimer before submitting.",
        variant: "destructive",
      });
      return;
    }

    if (submitting) return;

    setSubmitting(true);

    try {
      const resolvedPropertyType =
        form.property_type === "Other" &&
        form.other_property_type.trim()
          ? form.other_property_type.trim()
          : form.property_type;

      const leadIntent = isSellingLead
        ? "seller"
        : isLeasingLead
          ? "property-management"
          : isUndecidedLead
            ? "property-strategy"
            : "property-owner-enquiry";

      const leadPayload = {
        full_name: form.full_name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),

        property_goal: form.property_goal,
        desired_outcome: form.desired_outcome,
        property_type: resolvedPropertyType,
        property_status: form.property_status,
        urgency: form.urgency,

        property_address: form.property_address || undefined,
        street_number: form.street_number || undefined,
        street_name: form.street_name || undefined,
        suburb: form.suburb || undefined,
        postcode: form.postcode || undefined,
        state: form.state || undefined,
        country: form.country || "Australia",
        latitude: form.latitude,
        longitude: form.longitude,
        address_place_id: form.address_place_id || undefined,
        manual_address_entry: Boolean(
          form.manual_address_entry
        ),

        additional_notes:
          form.additional_notes.trim() || undefined,

        preferred_contact: form.preferred_contact,

        lead_intent: leadIntent,
        service_required: form.property_goal,
        service_type: leadIntent,
        lead_source: sourcePage,
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

        source_page: sourcePage,
        form_type: "property-owner-consultation",
      };

      await base44.entities.Lead.create(leadPayload);

      try {
        base44.analytics.track({
          eventName: "form_submitted",
          properties: {
            source: sourcePage,
            form_type: "property-owner-consultation",
            property_goal: form.property_goal,
            lead_intent: leadIntent,
          },
        });
      } catch {
        // Analytics must not interrupt the form submission.
      }

      toast({
        title: "Thank you",
        description: successMessage,
      });

      navigate("/thank-you");
    } catch (error) {
      console.error(
        "Property owner questionnaire submission failed:",
        error
      );

      toast({
        title: "Something went wrong",
        description:
          "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleFormStarted = () => {
    try {
      base44.analytics.track({
        eventName: "form_started",
        properties: {
          source: sourcePage,
          form_type: "property-owner-consultation",
        },
      });
    } catch {
      // Analytics must not interfere with the form.
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      onFocus={handleFormStarted}
      className="rounded-xl bg-white p-8 shadow-sm md:p-10"
    >
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-stone bg-white px-5 py-2.5 text-sm font-medium text-midnight shadow-sm transition-colors hover:bg-stone/40"
        >
          <ArrowLeft size={16} />
          Back
        </button>
      )}

      <h3 className="font-heading mb-2 text-2xl font-light text-midnight md:text-3xl">
        Let&apos;s understand your property goals
      </h3>

      <p className="mb-8 text-sm leading-relaxed text-midnight/50">
        {formIntro}
      </p>

      <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
        <SelectField
          label="What would you like help with?"
          value={form.property_goal}
          onChange={(value) =>
            update("property_goal", value)
          }
          options={propertyGoalOptions}
          required
        />

        <SelectField
          label="What outcome are you hoping to achieve?"
          value={form.desired_outcome}
          onChange={(value) =>
            update("desired_outcome", value)
          }
          options={outcomeOptions}
          required
        />

        <SelectField
          label="What type of property do you own?"
          value={form.property_type}
          onChange={(value) =>
            update("property_type", value)
          }
          options={propertyTypes}
          required
        />

        <SelectField
          label="What best describes the property?"
          value={form.property_status}
          onChange={(value) =>
            update("property_status", value)
          }
          options={propertyStatusOptions}
          required
        />
      </div>

      {form.property_type === "Other" && (
        <div className="mt-5">
          <InputField
            label="Please describe the property type"
            value={form.other_property_type}
            onChange={(value) =>
              update("other_property_type", value)
            }
            placeholder="Describe the property"
            required
          />
        </div>
      )}

      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
        <div>
          <AddressAutocomplete
            label="Property address"
            value={form.property_address}
            onChange={(addressData) => {
              if (addressData) {
                setForm((previous) => ({
                  ...previous,
                  ...addressData,
                }));
              }
            }}
          />

          <p className="mt-1 text-xs leading-relaxed text-midnight/40">
            Optional but recommended. This helps us
            prepare a more relevant appraisal or
            recommendation.
          </p>
        </div>

        <SelectField
          label="When are you looking to take action?"
          value={form.urgency}
          onChange={(value) =>
            update("urgency", value)
          }
          options={urgencyOptions}
          required
        />
      </div>

      <div className="mt-5">
        <label className="mb-1.5 block text-sm font-medium text-midnight">
          What else would you like us to know?
        </label>

        <textarea
          value={form.additional_notes}
          onChange={(event) =>
            update(
              "additional_notes",
              event.target.value
            )
          }
          className="min-h-[100px] w-full resize-y rounded-lg border border-stone bg-parchment/50 px-4 py-3 text-sm text-midnight focus:border-accent-navy focus:outline-none"
          placeholder="Tell us about your goals, concerns, renovations, current tenants, expected sale price or rental return, or anything else that may help us assist you."
          rows={4}
        />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-5 border-t border-stone/50 pt-6 md:grid-cols-2">
        <InputField
          label="Full name"
          value={form.full_name}
          onChange={(value) =>
            update("full_name", value)
          }
          placeholder="Jane Smith"
          autoComplete="name"
          required
        />

        <InputField
          label="Email address"
          value={form.email}
          onChange={(value) =>
            update("email", value)
          }
          placeholder="jane@example.com"
          type="email"
          autoComplete="email"
          required
        />

        <InputField
          label="Phone number"
          value={form.phone}
          onChange={(value) =>
            update("phone", value)
          }
          placeholder="04xx xxx xxx"
          type="tel"
          autoComplete="tel"
        />

        <SelectField
          label="Preferred contact method"
          value={form.preferred_contact}
          onChange={(value) =>
            update("preferred_contact", value)
          }
          options={contactMethods}
          required
        />
      </div>

      <p className="mt-3 text-xs leading-relaxed text-midnight/40">
        Let us know whether you&apos;d prefer to be
        contacted by phone, SMS or email so we can
        respond in the way that suits you best.
      </p>

      <LegalConsent
        id="lead-legal-consent"
        checked={legalConsent}
        onChange={setLegalConsent}
        marketingChecked={marketingConsent}
        onMarketingChange={setMarketingConsent}
      />

      <button
        type="submit"
        disabled={submitting || !legalConsent}
        className="mt-8 w-full rounded-full bg-golden py-4 text-sm font-medium text-midnight transition-colors hover:bg-golden/90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting
          ? "Sending..."
          : submitButtonLabel}
      </button>

      <p className="mt-3 text-center text-xs leading-relaxed text-midnight/40">
        We&apos;ll review your property goals and
        recommend the most suitable next step.
      </p>
    </form>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  autoComplete,
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-midnight">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        className="w-full rounded-lg border border-stone bg-parchment/50 px-4 py-3 text-sm text-midnight focus:border-accent-navy focus:outline-none"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  required = false,
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-midnight">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        required={required}
        className="w-full appearance-none rounded-lg border border-stone bg-parchment/50 px-4 py-3 text-sm text-midnight focus:border-accent-navy focus:outline-none"
      >
        <option value="">Select an option</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}