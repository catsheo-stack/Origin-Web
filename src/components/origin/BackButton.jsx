import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/**
 * Slim "← Back" bar rendered above page content on every public page.
 * Hidden on the home route. Uses browser history to return one step.
 */
export default function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === "/" || location.pathname === "/zh" || location.pathname.startsWith("/zh/")) return null;

  return (
    <div className="bg-parchment border-b border-stone/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-3">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs text-midnight/60 hover:text-midnight transition-colors"
        >
          <ArrowLeft size={14} /> Back
        </button>
      </div>
    </div>
  );
}