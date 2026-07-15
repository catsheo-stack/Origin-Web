/**
 * Simple rule-based preference matching (Stage 4).
 * No AI, no API calls. Transparent and simple rules.
 * Only compares fields where sufficient information exists.
 */

/**
 * Calculates how well a property matches buyer preferences.
 * Returns null if there isn't enough information to compare.
 */
export function calculatePropertyMatch(property, preferences) {
  if (!property || !preferences) return null;

  const checks = [];

  // Bedrooms
  if (preferences.minBedrooms && property.bedrooms !== "" && property.bedrooms != null) {
    const min = Number(preferences.minBedrooms);
    const actual = Number(property.bedrooms);
    if (!isNaN(min) && !isNaN(actual)) {
      checks.push(actual >= min);
    }
  }

  // Bathrooms
  if (preferences.minBathrooms && property.bathrooms !== "" && property.bathrooms != null) {
    const min = Number(preferences.minBathrooms);
    const actual = Number(property.bathrooms);
    if (!isNaN(min) && !isNaN(actual)) {
      checks.push(actual >= min);
    }
  }

  // Car spaces
  if (preferences.minCarSpaces && property.carSpaces !== "" && property.carSpaces != null) {
    const min = Number(preferences.minCarSpaces);
    const actual = Number(property.carSpaces);
    if (!isNaN(min) && !isNaN(actual)) {
      checks.push(actual >= min);
    }
  }

  // Budget (extract numeric from price strings)
  if (preferences.maxBudget && property.advertisedPrice) {
    const max = Number(String(preferences.maxBudget).replace(/[^0-9.]/g, ""));
    const price = Number(String(property.advertisedPrice).replace(/[^0-9.]/g, ""));
    if (!isNaN(max) && !isNaN(price) && max > 0 && price > 0) {
      checks.push(price <= max);
    }
  }

  // Suburb match
  if (preferences.targetSuburbs && property.suburb) {
    const targets = String(preferences.targetSuburbs)
      .toLowerCase()
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);
    if (targets.length > 0) {
      checks.push(targets.some(t => property.suburb.toLowerCase().includes(t)));
    }
  }

  // Must-have keywords in advantages
  if (preferences.priorityLists?.mustHave?.length > 0 && property.keyAdvantages) {
    const advantages = property.keyAdvantages.toLowerCase();
    const matchedCount = preferences.priorityLists.mustHave.filter(item =>
      advantages.includes(String(item).toLowerCase())
    ).length;
    checks.push(matchedCount / preferences.priorityLists.mustHave.length >= 0.5);
  }

  // Not enough information to compare
  if (checks.length < 2) return null;

  const matched = checks.filter(Boolean).length;
  const total = checks.length;
  const ratio = matched / total;

  const label = ratio >= 0.7 ? "Strong Match" : "Partial Match";

  return { matched, total, label };
}