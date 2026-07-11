import React from "react";
import { Link } from "react-router-dom";

export const LEGAL_CONSENT_VERSION = "12 July 2026";
export const MARKETING_CONSENT_VERSION = "12 July 2026";

export default function LegalConsent({
  checked,
  onChange,
  marketingChecked = false,
  onMarketingChange,
  id = "legal-consent",
  marketingId = `${id}-marketing`,
}) {
  return (
    <div className="mt-6 space-y-3">
      <div className="rounded-xl border border-stone/70 bg-parchment/35 p-4">
        <div className="mb-2.5 flex items-center justify-between gap-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-midnight/65">
            Required Consent
          </p>

          <span className="rounded-full border border-golden/40 bg-golden/5 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-golden">
            Required
          </span>
        </div>

        <label htmlFor={id} className="flex cursor-pointer items-start gap-3">
          <input
            id={id}
            name="legal_consent"
            type="checkbox"
            checked={checked}
            onChange={(event) => onChange(event.target.checked)}
            required
            className="mt-1 h-4 w-4 shrink-0 rounded border-stone text-golden accent-golden focus:ring-golden/30"
          />

          <span className="text-[12px] leading-5 text-midnight/65 md:text-[12.5px]">
            I accept the{" "}
            <Link
              to="/privacy-policy"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-accent-navy underline decoration-stone underline-offset-2 transition-colors hover:text-golden"
            >
              Privacy Policy
            </Link>
            {" • "}
            <Link
              to="/terms-of-use"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-accent-navy underline decoration-stone underline-offset-2 transition-colors hover:text-golden"
            >
              Terms of Use
            </Link>
            {" • "}
            <Link
              to="/professional-disclaimer"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-accent-navy underline decoration-stone underline-offset-2 transition-colors hover:text-golden"
            >
              Professional Disclaimer
            </Link>
            , and consent to Origin Property Concierge using my information to
            respond to my request.
          </span>
        </label>
      </div>

      <div className="rounded-xl border border-stone/70 bg-white/65 p-4">
        <div className="mb-2.5 flex items-center justify-between gap-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-midnight/65">
            Stay Updated
          </p>

          <span className="rounded-full border border-stone bg-white px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-midnight/40">
            Optional
          </span>
        </div>

        <label
          htmlFor={marketingId}
          className="flex cursor-pointer items-start gap-3"
        >
          <input
            id={marketingId}
            name="marketing_consent"
            type="checkbox"
            checked={marketingChecked}
            onChange={(event) => onMarketingChange?.(event.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 rounded border-stone text-golden accent-golden focus:ring-golden/30"
          />

          <span className="text-[12px] leading-5 text-midnight/60 md:text-[12.5px]">
            Send me property insights, guides and occasional updates. I can
            unsubscribe at any time.
          </span>
        </label>
      </div>
    </div>
  );
}
