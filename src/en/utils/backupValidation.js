/**
 * Backup validation and normalisation.
 * Validates structure, enforces size limits, sanitises all fields,
 * and safely clears broken cross-references.
 * Does not partially restore invalid files.
 */
import {
  normalisePreferences, sanitiseProperty, sanitiseImportantDate,
  sanitiseRisk, sanitiseContact, generateId
} from "@/en/utils/buyerJourneyValidation";
import homeBuyerChecklist from "@/en/data/homeBuyerChecklist";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB
const VALID_PROPERTY_TYPES = ["apartment", "house", "townhouse", "other"];
const VALID_TASK_STATUSES = ["Not Started", "In Progress", "Waiting", "Completed", "Not Applicable"];
const VALID_RISK_LEVELS = ["Low", "Medium", "High", "Deal Breaker"];
const MAX_COLLECTION_SIZE = 500;
const MAX_STRING_LENGTH = 2000;

const BACKUP_TYPE = "origin-home-buyer-journey";
const MAX_BACKUP_VERSION = 1;

// Build sets of valid IDs from the checklist data
const validTaskIds = new Set();
const validStageIds = new Set();
homeBuyerChecklist.forEach(stage => {
  validStageIds.add(stage.id);
  stage.categories.forEach(cat => {
    cat.tasks.forEach(task => validTaskIds.add(task.id));
  });
});

function safeString(val, maxLen = MAX_STRING_LENGTH) {
  if (typeof val !== "string") return "";
  return val.slice(0, maxLen);
}

function isPlainObject(val) {
  return val !== null && typeof val === "object" && !Array.isArray(val);
}

/**
 * Pre-validates a file object before reading.
 * Returns an error string if invalid, or null if OK.
 */
export function validateBackupFile(file) {
  if (!file) return "No file selected.";
  if (file.size > MAX_FILE_SIZE) return "The backup file is too large.";
  return null;
}

/**
 * Validates and normalises a parsed backup JSON string.
 * Returns { valid: true, data: normalisedData } or { valid: false, error: message }.
 */
export function validateBackup(rawJson) {
  let parsed;
  try {
    parsed = JSON.parse(rawJson);
  } catch {
    return { valid: false, error: "This file is not a valid Origin Home Buyer Journey backup." };
  }

  if (!isPlainObject(parsed)) {
    return { valid: false, error: "This file is not a valid Origin Home Buyer Journey backup." };
  }
  if (parsed.backupType !== BACKUP_TYPE) {
    return { valid: false, error: "This file is not a valid Origin Home Buyer Journey backup." };
  }
  if (typeof parsed.backupVersion !== "number" || parsed.backupVersion > MAX_BACKUP_VERSION) {
    return { valid: false, error: "This file is not a valid Origin Home Buyer Journey backup." };
  }
  if (!isPlainObject(parsed.data)) {
    return { valid: false, error: "This file is not a valid Origin Home Buyer Journey backup." };
  }

  const data = parsed.data;

  // Property type
  const propertyType = VALID_PROPERTY_TYPES.includes(data.propertyType) ? data.propertyType : "house";

  // Task states — only keep valid task IDs
  const taskStates = {};
  if (isPlainObject(data.taskStates)) {
    Object.entries(data.taskStates).forEach(([taskId, state]) => {
      if (!validTaskIds.has(taskId)) return;
      if (!isPlainObject(state)) return;
      const status = VALID_TASK_STATUSES.includes(state.status) ? state.status : "Not Started";
      const responsible = safeString(state.responsible, 100);
      const dueDate = safeString(state.dueDate, 10);
      const riskLevel = VALID_RISK_LEVELS.includes(state.riskLevel) ? state.riskLevel : "Medium";
      const notes = safeString(state.notes, 2000);
      const cleaned = { status, responsible, dueDate, riskLevel, notes };
      const propId = safeString(state.propertyId, 100);
      const contactId = safeString(state.contactId, 100);
      if (propId) cleaned.propertyId = propId;
      if (contactId) cleaned.contactId = contactId;
      taskStates[taskId] = cleaned;
    });
  }

  // Properties — sanitise and ensure unique IDs
  let properties = [];
  if (Array.isArray(data.properties) && data.properties.length <= MAX_COLLECTION_SIZE) {
    const seenIds = new Set();
    properties = data.properties
      .filter(p => isPlainObject(p))
      .map(p => {
        const sanitised = sanitiseProperty(p);
        let id = safeString(p.id, 100) || generateId();
        while (seenIds.has(id)) id = generateId();
        seenIds.add(id);
        return { ...sanitised, id };
      });
  }

  const validPropertyIds = new Set(properties.map(p => p.id));

  // Clean task state property references
  Object.values(taskStates).forEach(state => {
    if (state.propertyId && !validPropertyIds.has(state.propertyId)) {
      delete state.propertyId;
    }
  });

  // Selected property IDs for comparison — validate, dedupe, cap at 3
  let selectedPropertyIds = [];
  if (Array.isArray(data.selectedPropertyIds)) {
    selectedPropertyIds = [...new Set(data.selectedPropertyIds)]
      .filter(id => validPropertyIds.has(id))
      .slice(0, 3);
  }

  // Important dates
  let importantDates = [];
  if (Array.isArray(data.importantDates) && data.importantDates.length <= MAX_COLLECTION_SIZE) {
    const seenIds = new Set();
    importantDates = data.importantDates
      .filter(d => isPlainObject(d))
      .map(d => {
        const sanitised = sanitiseImportantDate(d);
        let id = safeString(d.id, 100) || generateId();
        while (seenIds.has(id)) id = generateId();
        seenIds.add(id);
        if (sanitised.propertyId && !validPropertyIds.has(sanitised.propertyId)) {
          sanitised.propertyId = "";
        }
        return { ...sanitised, id };
      });
  }

  // Risks
  let risks = [];
  if (Array.isArray(data.risks) && data.risks.length <= MAX_COLLECTION_SIZE) {
    const seenIds = new Set();
    risks = data.risks
      .filter(r => isPlainObject(r))
      .map(r => {
        const sanitised = sanitiseRisk(r);
        let id = safeString(r.id, 100) || generateId();
        while (seenIds.has(id)) id = generateId();
        seenIds.add(id);
        if (sanitised.propertyId && !validPropertyIds.has(sanitised.propertyId)) {
          sanitised.propertyId = "";
        }
        if (sanitised.relatedStageId && !validStageIds.has(sanitised.relatedStageId)) {
          sanitised.relatedStageId = "";
        }
        return { ...sanitised, id };
      });
  }

  // Contacts
  let contacts = [];
  if (Array.isArray(data.contacts) && data.contacts.length <= MAX_COLLECTION_SIZE) {
    const seenIds = new Set();
    contacts = data.contacts
      .filter(c => isPlainObject(c))
      .map(c => {
        const sanitised = sanitiseContact(c);
        let id = safeString(c.id, 100) || generateId();
        while (seenIds.has(id)) id = generateId();
        seenIds.add(id);
        if (sanitised.propertyId && !validPropertyIds.has(sanitised.propertyId)) {
          sanitised.propertyId = "";
        }
        return { ...sanitised, id };
      });
  }

  // Preferences
  const buyerPreferences = normalisePreferences(data.buyerPreferences);

  return {
    valid: true,
    data: {
      propertyType,
      taskStates,
      buyerPreferences,
      properties,
      selectedPropertyIds,
      importantDates,
      risks,
      contacts
    }
  };
}