/**
 * localStorage wrapper for buyer checklist data (Version 4).
 * Handles save, load, reset, delete, and safe migration from V1/V2/V3.
 */

import { normalisePreferences } from "@/en/utils/buyerJourneyValidation";

const STORAGE_KEY = "origin-home-buyer-checklist";
const VALID_PROPERTY_TYPES = ["apartment", "house", "townhouse", "other"];

function isLocalStorageAvailable() {
  try {
    const test = "__storage_test__";
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

/**
 * Loads and validates saved data.
 * Migrates V1/V2 data safely to V3.
 */
export function loadChecklistData() {
  if (!isLocalStorageAvailable()) return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);

    const propertyType = VALID_PROPERTY_TYPES.includes(parsed.propertyType)
      ? parsed.propertyType
      : "house";

    // Migrate forComparison booleans to selectedPropertyIds array if needed
    const loadedProps = Array.isArray(parsed.properties) ? parsed.properties : [];
    let selectedPropertyIds = Array.isArray(parsed.selectedPropertyIds) ? parsed.selectedPropertyIds : [];
    if (selectedPropertyIds.length === 0) {
      selectedPropertyIds = loadedProps.filter(p => p.forComparison === true).slice(0, 3).map(p => p.id);
    }
    // Validate: remove duplicates and IDs for deleted properties, cap at 3
    const validIds = new Set(loadedProps.map(p => p.id));
    selectedPropertyIds = [...new Set(selectedPropertyIds)].filter(id => validIds.has(id)).slice(0, 3);

    return {
      version: 4,
      propertyType,
      taskStates: parsed.taskStates || {},
      buyerPreferences: normalisePreferences(parsed.buyerPreferences),
      properties: loadedProps,
      selectedPropertyIds,
      importantDates: Array.isArray(parsed.importantDates) ? parsed.importantDates : [],
      risks: Array.isArray(parsed.risks) ? parsed.risks : [],
      contacts: Array.isArray(parsed.contacts) ? parsed.contacts : [],
      lastSaved: parsed.lastSaved || null
    };
  } catch {
    return null;
  }
}

export function saveChecklistData(data) {
  if (!isLocalStorageAvailable()) return false;
  try {
    const propertyType = VALID_PROPERTY_TYPES.includes(data.propertyType)
      ? data.propertyType
      : "house";

    const payload = {
      version: 4,
      propertyType,
      taskStates: data.taskStates || {},
      buyerPreferences: normalisePreferences(data.buyerPreferences),
      properties: Array.isArray(data.properties) ? data.properties : [],
      selectedPropertyIds: Array.isArray(data.selectedPropertyIds) ? data.selectedPropertyIds : [],
      importantDates: Array.isArray(data.importantDates) ? data.importantDates : [],
      risks: Array.isArray(data.risks) ? data.risks : [],
      contacts: Array.isArray(data.contacts) ? data.contacts : [],
      lastSaved: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    return true;
  } catch {
    return false;
  }
}

export function deleteChecklistData() {
  if (!isLocalStorageAvailable()) return false;
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
}