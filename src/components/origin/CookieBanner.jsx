import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CONSENT_KEY = "origin_cookie_consent";
const CONSENT_VERSION = "2026.07";

function readStoredConsent() {
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);

    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);

    if (parsed?.version !== CONSENT_VERSION) {
      return null;
    }

    if (!["accepted", "rejected"].includes(parsed?.status)) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

function saveConsent(status) {
  const consent = {
    version: CONSENT_VERSION,
    status,
    date: new Date().toISOString(),
  };

  window.localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  window.dispatchEvent(
    new CustomEvent("origin-cookie-consent", { detail: consent })
  );

  return consent;
}

function loadGoogleAnalytics() {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

  if (!measurementId || document.getElementById("origin-google-analytics")) {
    return;
  }

  const script = document.createElement("script");
  script.id = "origin-google-analytics";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    anonymize_ip: true,
  });
}

export default function CookieBanner() {
  const [consent, setConsent] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const storedConsent = readStoredConsent();

    setConsent(storedConsent);
    setReady(true);

    if (storedConsent?.status === "accepted") {
      loadGoogleAnalytics();
    }
  }, []);

  const handleChoice = (status) => {
    const savedConsent = saveConsent(status);
    setConsent(savedConsent);

    if (status === "accepted") {
      loadGoogleAnalytics();
    }
  };

  if (!ready || consent) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      aria-live="polite"
      className="fixed inset-x-0 bottom-0 z-[70] border-t border-stone/70 bg-parchment/95 px-4 py-3 shadow-[0_-8px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-midnight/65 sm:text-[13px]">
          We use cookies to improve your experience and analyse usage.{" "}
          <Link
            to="/privacy-policy#analytics"
            className="font-medium text-accent-navy underline decoration-stone underline-offset-2 transition-colors hover:text-golden"
          >
            Privacy Policy
          </Link>
        </p>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => handleChoice("rejected")}
            className="rounded-full border border-stone bg-white/70 px-4 py-1.5 text-xs font-medium text-midnight/65 transition-colors hover:border-midnight/30 hover:text-midnight"
          >
            Reject
          </button>

          <button
            type="button"
            onClick={() => handleChoice("accepted")}
            className="rounded-full bg-midnight px-4 py-1.5 text-xs font-medium text-parchment transition-colors hover:bg-accent-navy"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
