import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { useToast } from "@/components/ui/use-toast";
import LegalConsent, {
  LEGAL_CONSENT_VERSION,
  MARKETING_CONSENT_VERSION,
} from "@/components/origin/LegalConsent";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

const propertyTypeOptions = [
  "House",
  "Townhouse",
  "Apartment",
  "Unit",
  "Not sure yet",
  "Other",
];

const buyerProfileOptions = [
  "Owner occupier",
  "Investor",
  "First home buyer",
  "Not sure yet",
  "Other",
];

const priorityOptions = [
  "School zone",
  "Access to public transport",
  "Shopping and lifestyle",
  "Capital growth / rental yield",
  "Not sure yet",
  "Other",
];

const timelineOptions = [
  "ASAP",
  "Within 1 month",
  "1–3 months",
  "3–6 months",
  "Just planning ahead",
];

const budgetOptions = [
  "AUD $500k – AUD $700k",
  "AUD $750k – AUD $950k",
  "AUD $1m – AUD $1.5m",
  "More than AUD $2m",
  "Not sure yet",
];

const contactMethods = ["Email", "Phone", "Text"];

const INITIAL_FORM = {
  property_type: "",
  other_property_type: "",
  buyer_profile: "",
  other_buyer_profile: "",
  buyer_priorities: "",
  other_priorities: "",
  preferred_area: "",
  timeline: "",
  budget_range: "",
  additional_notes: "",
  full_name: "",
  email: "",
  phone: "",
  preferred_contact: "Email",

  // Honeypot field. Real users never see or complete this.
  botcheck: "",
};

export default function BuyerQuestionnaire({ onBack }) {
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

    const accessKey =
      import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      toast({
        title: "Form setup required",
        description:
          "The enquiry form access key has not been added to the website environment settings.",
        variant: "destructive",
      });

      return;
    }

    if (
      !form.full_name.trim() ||
      !form.email.trim() ||
      !form.property_type ||
      !form.buyer_profile
    ) {
      toast({
        title: "Please complete the required fields",
        description:
          "Property type, buyer profile, full name and email address are required.",
        variant: "destructive",
      });

      return;
    }

    setSubmitting(true);

    try {
      const resolvedPropertyType =
        form.property_type === "Other" &&
        form.other_property_type.trim()
          ? form.other_property_type.trim()
          : form.property_type;

      const resolvedBuyerProfile =
        form.buyer_profile === "Other" &&
        form.other_buyer_profile.trim()
          ? form.other_buyer_profile.trim()
          : form.buyer_profile;

      const resolvedPriorities =
        form.buyer_priorities === "Other" &&
        form.other_priorities.trim()
          ? form.other_priorities.trim()
          : form.buyer_priorities;

      const submission = {
        access_key: accessKey,

        subject: `New Buyer Advisory Enquiry — ${form.full_name.trim()}`,
        from_name: "Origin Property Concierge Website",

        form_name: "Buyer Advisory Questionnaire",
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

        service_required: "Buyer Advisory",
        lead_source: "Origin Buyer Advisory Page",

        full_name: form.full_name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || "Not provided",
        preferred_contact:
          form.preferred_contact || "Email",

        property_type:
          resolvedPropertyType || "Not provided",

        buyer_profile:
          resolvedBuyerProfile || "Not provided",

        buyer_priorities:
          resolvedPriorities || "Not provided",

        preferred_area:
          form.preferred_area.trim() ||
          "Not provided",

        timeline:
          form.timeline || "Not provided",

        budget_range:
          form.budget_range || "Not provided",

        additional_notes:
          form.additional_notes.trim() ||
          "No additional notes provided",

        page_url: window.location.href,

        botcheck: form.botcheck,
      };

      const response = await fetch(
        WEB3FORMS_ENDPOINT,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(submission),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "The form service rejected the submission."
        );
      }

      setForm(INITIAL_FORM);
      setLegalConsent(false);
      setMarketingConsent(false);

      toast({
        title: "Details received",
        description:
          "We’ll review your buying goals and guide you to the most suitable next step.",
      });

      navigate("/thank-you");
    } catch (error) {
      console.error(
        "Buyer questionnaire submission failed:",
        error
      );

      toast({
        title: "Something went wrong",
        description:
          "Your enquiry could not be sent. Please try again or email hello@originpropertyconcierge.com.au.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-6 shadow-sm sm:p-8 md:p-12"
    >
      {/* Spam protection honeypot */}
      <input
        type="checkbox"
        name="botcheck"
        value={form.botcheck}
        onChange={(event) =>
          update("botcheck", event.target.value)
        }
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

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

      <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
        <SelectField
          label="What are you looking to buy?"
          value={form.property_type}
          onChange={(value) =>
            update("property_type", value)
          }
          options={propertyTypeOptions}
          required
        />

        <SelectField
          label="Are you buying as:"
          value={form.buyer_profile}
          onChange={(value) =>
            update("buyer_profile", value)
          }
          options={buyerProfileOptions}
          required
        />
      </div>

      {form.property_type === "Other" && (
        <div className="mt-5">
          <InputField
            label="Please tell us what you are looking for"
            value={form.other_property_type}
            onChange={(value) =>
              update("other_property_type", value)
            }
            placeholder="Describe the property type"
            required
          />
        </div>
      )}

      {form.buyer_profile === "Other" && (
        <div className="mt-5">
          <InputField
            label="Please tell us more"
            value={form.other_buyer_profile}
            onChange={(value) =>
              update("other_buyer_profile", value)
            }
            placeholder="Tell us about your buyer situation"
            required
          />
        </div>
      )}

      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
        <SelectField
          label="What matters to you most?"
          value={form.buyer_priorities}
          onChange={(value) =>
            update("buyer_priorities", value)
          }
          options={priorityOptions}
        />

        <InputField
          label="Preferred suburb or area"
          value={form.preferred_area}
          onChange={(value) =>
            update("preferred_area", value)
          }
          placeholder="Suburb, postcode or preferred area"
        />
      </div>

      {form.buyer_priorities === "Other" && (
        <div className="mt-5">
          <InputField
            label="Please tell us what matters most"
            value={form.other_priorities}
            onChange={(value) =>
              update("other_priorities", value)
            }
            placeholder="Tell us what matters most to you"
          />
        </div>
      )}

      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
        <SelectField
          label="When are you looking to buy?"
          value={form.timeline}
          onChange={(value) =>
            update("timeline", value)
          }
          options={timelineOptions}
        />

        <SelectField
          label="Budget range"
          value={form.budget_range}
          onChange={(value) =>
            update("budget_range", value)
          }
          options={budgetOptions}
        />
      </div>

      <div className="mt-5">
        <label className="mb-1.5 block text-sm font-medium text-midnight">
          Anything else you'd like us to know?
        </label>

        <textarea
          value={form.additional_notes}
          onChange={(event) =>
            update(
              "additional_notes",
              event.target.value
            )
          }
          className="min-h-[110px] w-full resize-y rounded-lg border border-stone bg-parchment/50 px-4 py-3 text-sm text-midnight focus:border-accent-navy focus:outline-none"
          placeholder="Tell us about your concerns, preferred property style, nice-to-haves, commute, or investment goals."
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
        />
      </div>

      <LegalConsent
        id="buyer-legal-consent"
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
          : "Get My Buyer Advisory Recommendation"}
      </button>

      <p className="mt-3 text-center text-xs leading-relaxed text-midnight/40">
        We’ll review your buying goals and guide
        you to the most suitable next step.
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
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}