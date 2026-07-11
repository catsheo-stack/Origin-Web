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
    <div className="mt-8 space-y-3">
      <div className="rounded-xl border border-stone/70 bg-parchment/45 p-4 md:p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-midnight/70">
            Privacy, terms &amp; professional disclaimer
          </p>
          <span className="rounded-full bg-midnight px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-parchment">
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

          <span className="text-xs leading-5 text-midnight/65 md:text-[13px]">
            I acknowledge the{" "}
            <Link
              to="/privacy-policy"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-accent-navy underline decoration-stone underline-offset-2 hover:text-golden"
            >
              Privacy Policy
            </Link>
            ,{" "}
            <Link
              to="/terms-of-use"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-accent-navy underline decoration-stone underline-offset-2 hover:text-golden"
            >
              Terms of Use
            </Link>{" "}
            and{" "}
            <Link
              to="/professional-disclaimer"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-accent-navy underline decoration-stone underline-offset-2 hover:text-golden"
            >
              Professional Services &amp; Referral Disclaimer
            </Link>
            . I understand that Origin Property Concierge coordinates services
            and referrals and does not itself provide regulated professional
            advice. I consent to Origin using my information to respond to this
            enquiry and, where appropriate, sharing relevant information with
            appropriately licensed or qualified independent professionals to
            assist with my request.
          </span>
        </label>
      </div>

      <div className="rounded-xl border border-stone/70 bg-white/70 p-4 md:p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-midnight/70">
            Stay connected
          </p>
          <span className="rounded-full border border-stone bg-white px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-midnight/50">
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

          <span className="text-xs leading-5 text-midnight/65 md:text-[13px]">
            Keep me updated with Origin property insights, educational guides,
            service and platform updates, and occasional marketing
            communications. I understand this is optional and I can unsubscribe
            at any time.
          </span>
        </label>
      </div>
    </div>
  );
}
