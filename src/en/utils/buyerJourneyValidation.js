/**
 * Validation utilities for buyer preferences and property records (Stage 4).
 * All content rendered as plain text — no dangerouslySetInnerHTML, eval, or new Function.
 */

export const PROPERTY_STATUSES = [
  "Saved", "Reviewing", "Inspection Booked", "Inspected",
  "Due Diligence", "Offer Considered", "Offer Submitted",
  "Negotiating", "Under Contract", "Rejected", "Purchased"
];

export const MAX_LENGTHS = {
  address: 200,
  suburb: 100,
  state: 50,
  postcode: 10,
  advertisedPrice: 50,
  sellingAgentName: 100,
  sellingAgentPhone: 40,
  sellingAgentEmail: 150,
  listingUrl: 500,
  keyAdvantages: 500,
  keyConcerns: 500,
  notes: 1000
};

export const PRIORITY_LIST_KEYS = ["mustHave", "niceToHave", "nonNegotiable", "dealBreaker", "flexible"];

export const PRIORITY_LIST_LABELS = {
  mustHave: "Must Have",
  niceToHave: "Nice to Have",
  nonNegotiable: "Non-Negotiable",
  dealBreaker: "Deal Breaker",
  flexible: "Flexible"
};

export function generateId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "id-" + Date.now() + "-" + Math.random().toString(36).slice(2, 11);
}

export function createDefaultPreferences() {
  return {
    purchasePurpose: "",
    targetSuburbs: "",
    searchRadius: "",
    preferredLocations: "",
    schoolZoneRequirement: "",
    publicTransportRequirement: "",
    commuteRequirement: "",
    minBedrooms: "",
    minBathrooms: "",
    minCarSpaces: "",
    preferredLandSize: "",
    singleLevelPreference: "",
    outdoorSpacePreference: "",
    renovationTolerance: "",
    minBudget: "",
    maxBudget: "",
    maxPurchaseLimit: "",
    estimatedDeposit: "",
    preferredSettlementPeriod: "",
    purchaseTimeframe: "",
    priorityLists: {
      mustHave: [],
      niceToHave: [],
      nonNegotiable: [],
      dealBreaker: [],
      flexible: []
    }
  };
}

export function normalisePreferences(prefs) {
  const defaults = createDefaultPreferences();
  if (!prefs || typeof prefs !== "object") return defaults;
  const normalised = { ...defaults, ...prefs };
  normalised.priorityLists = { ...defaults.priorityLists };
  if (prefs.priorityLists && typeof prefs.priorityLists === "object") {
    PRIORITY_LIST_KEYS.forEach(key => {
      if (Array.isArray(prefs.priorityLists[key])) {
        normalised.priorityLists[key] = prefs.priorityLists[key].slice(0, 20);
      }
    });
  }
  return normalised;
}

/**
 * Validates a listing URL — only http: and https: allowed.
 * Rejects javascript:, data:, and invalid protocols.
 */
export function validateListingUrl(url) {
  if (!url) return { valid: true, sanitized: "" };
  const trimmed = String(url).trim();
  if (!trimmed) return { valid: true, sanitized: "" };
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return { valid: true, sanitized: trimmed };
    }
    return { valid: false, sanitized: "" };
  } catch {
    return { valid: false, sanitized: "" };
  }
}

/**
 * Validates a property record.
 * Returns { valid, errors } where errors is a field-keyed object.
 */
export function validateProperty(prop) {
  const errors = {};

  Object.entries(MAX_LENGTHS).forEach(([field, max]) => {
    if (prop[field] && String(prop[field]).length > max) {
      errors[field] = `Maximum ${max} characters`;
    }
  });

  if (prop.listingUrl) {
    const urlCheck = validateListingUrl(prop.listingUrl);
    if (!urlCheck.valid) {
      errors.listingUrl = "Only http and https URLs are allowed";
    }
  }

  if (prop.buyerRating !== "" && prop.buyerRating !== undefined && prop.buyerRating !== null) {
    const rating = Number(prop.buyerRating);
    if (isNaN(rating) || rating < 0 || rating > 5) {
      errors.buyerRating = "Rating must be between 0 and 5";
    }
  }

  if (prop.status && !PROPERTY_STATUSES.includes(prop.status)) {
    errors.status = "Invalid status";
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

/**
 * Creates a clean property object from raw form input.
 */
export function sanitiseProperty(input) {
  const cleaned = { ...input };

  Object.entries(MAX_LENGTHS).forEach(([field, max]) => {
    if (cleaned[field]) {
      cleaned[field] = String(cleaned[field]).slice(0, max);
    }
  });

  const urlCheck = validateListingUrl(cleaned.listingUrl);
  cleaned.listingUrl = urlCheck.sanitized;

  const rating = Number(cleaned.buyerRating);
  cleaned.buyerRating = isNaN(rating) ? 0 : Math.max(0, Math.min(5, rating));

  if (!PROPERTY_STATUSES.includes(cleaned.status)) {
    cleaned.status = "Saved";
  }

  return cleaned;
}

/* ── Important Dates (Stage 5) ── */

export const DATE_TYPES = [
  "Inspection", "Auction", "Offer Expiry", "Cooling-Off Expiry",
  "Finance Deadline", "Building and Pest Deadline", "Deposit Due",
  "Settlement", "Final Inspection", "Key Collection", "Other"
];

export const DATE_STATUSES = ["Upcoming", "Completed", "Cancelled"];

export const DATE_NOTE_MAX_LENGTH = 300;

export function validateImportantDate(date) {
  const errors = {};
  if (!DATE_TYPES.includes(date.dateType)) errors.dateType = "Invalid date type";
  if (!date.date) errors.date = "Date is required";
  if (date.status && !DATE_STATUSES.includes(date.status)) errors.status = "Invalid status";
  if (date.note && String(date.note).length > DATE_NOTE_MAX_LENGTH)
    errors.note = `Maximum ${DATE_NOTE_MAX_LENGTH} characters`;
  return { valid: Object.keys(errors).length === 0, errors };
}

export function sanitiseImportantDate(input) {
  const cleaned = { ...input };
  cleaned.dateType = DATE_TYPES.includes(cleaned.dateType) ? cleaned.dateType : "Other";
  cleaned.status = DATE_STATUSES.includes(cleaned.status) ? cleaned.status : "Upcoming";
  cleaned.note = cleaned.note ? String(cleaned.note).slice(0, DATE_NOTE_MAX_LENGTH) : "";
  cleaned.time = cleaned.time ? String(cleaned.time).slice(0, 10) : "";
  cleaned.propertyId = cleaned.propertyId || "";
  return cleaned;
}

/* ── Risks (Stage 5) ── */

export const RISK_LEVELS = ["Low", "Medium", "High", "Deal Breaker"];

export const RISK_STATUSES = ["Open", "Waiting", "Under Review", "Resolved", "Accepted"];

export const RISK_RESPONSIBLE_PARTIES = [
  "Me", "Conveyancer", "Solicitor", "Mortgage Broker", "Lender",
  "Selling Agent", "Building Inspector", "Pest Inspector",
  "Owners Corporation Manager", "Building Manager", "Accountant", "Other Professional"
];

export const RISK_MAX_LENGTHS = {
  title: 120,
  description: 750,
  question: 500,
  nextAction: 300
};

export function validateRisk(risk) {
  const errors = {};
  if (!risk.title || !String(risk.title).trim()) errors.title = "Title is required";
  if (risk.title && String(risk.title).length > RISK_MAX_LENGTHS.title)
    errors.title = `Maximum ${RISK_MAX_LENGTHS.title} characters`;
  if (!RISK_LEVELS.includes(risk.riskLevel)) errors.riskLevel = "Invalid risk level";
  if (risk.status && !RISK_STATUSES.includes(risk.status)) errors.status = "Invalid status";
  if (risk.description && String(risk.description).length > RISK_MAX_LENGTHS.description)
    errors.description = `Maximum ${RISK_MAX_LENGTHS.description} characters`;
  if (risk.question && String(risk.question).length > RISK_MAX_LENGTHS.question)
    errors.question = `Maximum ${RISK_MAX_LENGTHS.question} characters`;
  if (risk.nextAction && String(risk.nextAction).length > RISK_MAX_LENGTHS.nextAction)
    errors.nextAction = `Maximum ${RISK_MAX_LENGTHS.nextAction} characters`;
  return { valid: Object.keys(errors).length === 0, errors };
}

export function sanitiseRisk(input) {
  const cleaned = { ...input };
  cleaned.title = cleaned.title ? String(cleaned.title).slice(0, RISK_MAX_LENGTHS.title) : "";
  cleaned.riskLevel = RISK_LEVELS.includes(cleaned.riskLevel) ? cleaned.riskLevel : "Medium";
  cleaned.status = RISK_STATUSES.includes(cleaned.status) ? cleaned.status : "Open";
  if (cleaned.responsible === "Other") cleaned.responsible = "Other Professional";
  cleaned.responsible = RISK_RESPONSIBLE_PARTIES.includes(cleaned.responsible) ? cleaned.responsible : "Me";
  cleaned.description = cleaned.description ? String(cleaned.description).slice(0, RISK_MAX_LENGTHS.description) : "";
  cleaned.question = cleaned.question ? String(cleaned.question).slice(0, RISK_MAX_LENGTHS.question) : "";
  cleaned.nextAction = cleaned.nextAction ? String(cleaned.nextAction).slice(0, RISK_MAX_LENGTHS.nextAction) : "";
  cleaned.propertyId = cleaned.propertyId || "";
  cleaned.relatedStageId = cleaned.relatedStageId || "";
  cleaned.dueDate = cleaned.dueDate || "";
  return cleaned;
}

/* ── Contacts (Stage 5) ── */

export const CONTACT_ROLES = [
  "Conveyancer", "Solicitor", "Mortgage Broker", "Lender",
  "Selling Agent", "Building Inspector", "Pest Inspector",
  "Owners Corporation Manager", "Building Manager", "Accountant",
  "Property Manager", "Other"
];

export const CONTACT_MAX_LENGTHS = {
  name: 100,
  company: 150,
  phone: 40,
  email: 150,
  notes: 500
};

export function validateContact(contact) {
  const errors = {};
  if (!contact.name || !String(contact.name).trim()) errors.name = "Name is required";
  if (contact.name && String(contact.name).length > CONTACT_MAX_LENGTHS.name)
    errors.name = `Maximum ${CONTACT_MAX_LENGTHS.name} characters`;
  if (!CONTACT_ROLES.includes(contact.role)) errors.role = "Invalid role";
  if (contact.company && String(contact.company).length > CONTACT_MAX_LENGTHS.company)
    errors.company = `Maximum ${CONTACT_MAX_LENGTHS.company} characters`;
  if (contact.phone && String(contact.phone).length > CONTACT_MAX_LENGTHS.phone)
    errors.phone = `Maximum ${CONTACT_MAX_LENGTHS.phone} characters`;
  if (contact.email && String(contact.email).length > CONTACT_MAX_LENGTHS.email)
    errors.email = `Maximum ${CONTACT_MAX_LENGTHS.email} characters`;
  if (contact.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(contact.email).trim()))
    errors.email = "Invalid email format";
  if (contact.notes && String(contact.notes).length > CONTACT_MAX_LENGTHS.notes)
    errors.notes = `Maximum ${CONTACT_MAX_LENGTHS.notes} characters`;
  return { valid: Object.keys(errors).length === 0, errors };
}

export function sanitiseContact(input) {
  const cleaned = { ...input };
  cleaned.name = cleaned.name ? String(cleaned.name).slice(0, CONTACT_MAX_LENGTHS.name) : "";
  cleaned.role = CONTACT_ROLES.includes(cleaned.role) ? cleaned.role : "Other";
  cleaned.company = cleaned.company ? String(cleaned.company).slice(0, CONTACT_MAX_LENGTHS.company) : "";
  cleaned.phone = cleaned.phone ? String(cleaned.phone).slice(0, CONTACT_MAX_LENGTHS.phone) : "";
  cleaned.email = cleaned.email ? String(cleaned.email).slice(0, CONTACT_MAX_LENGTHS.email) : "";
  cleaned.notes = cleaned.notes ? String(cleaned.notes).slice(0, CONTACT_MAX_LENGTHS.notes) : "";
  cleaned.propertyId = cleaned.propertyId || "";
  return cleaned;
}