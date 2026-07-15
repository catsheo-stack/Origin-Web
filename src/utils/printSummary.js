/**
 * Print summary preparation.
 * Builds a structured object for the ProgressSummaryPrintView component.
 * Excludes empty sections and hidden property-type tasks.
 */
import {
  getOverallProgress, getStageProgress, getStageStatus,
  getCurrentStage, getNextAction, isTaskVisibleForPropertyType,
  getImportantDateStatus
} from "@/utils/checklistProgress";
import { PRIORITY_LIST_LABELS, PRIORITY_LIST_KEYS } from "@/utils/buyerJourneyValidation";

const PROPERTY_TYPE_LABELS = {
  house: "獨立屋",
  apartment: "公寓",
  townhouse: "聯排別墅",
  other: "Other"
};

export function getPropertyTypeLabel(type) {
  return PROPERTY_TYPE_LABELS[type] || "Other";
}

/**
 * Builds a complete print summary object from current app state.
 */
export function buildPrintSummary(checklistData, taskStates, propertyType, buyerPreferences, properties, importantDates, risks, contacts, today, includeNotApplicable = false) {
  const overall = getOverallProgress(checklistData, taskStates, propertyType);
  const currentStage = getCurrentStage(checklistData, taskStates, propertyType);
  const nextAction = getNextAction(checklistData, taskStates, propertyType, today);

  // Stage progress
  const stages = checklistData.map(stage => {
    const progress = getStageProgress(stage, taskStates, propertyType);
    const status = getStageStatus(stage, taskStates, propertyType, today);
    return {
      number: stage.number,
      name: stage.name,
      percentage: progress.percentage,
      completed: progress.completed,
      total: progress.total,
      status
    };
  });

  // Preferences — only non-empty fields
  const prefs = [];
  if (buyerPreferences.purchasePurpose) prefs.push({ label: "Purchase Purpose", value: buyerPreferences.purchasePurpose });
  if (buyerPreferences.targetSuburbs) prefs.push({ label: "Target Suburbs", value: buyerPreferences.targetSuburbs });
  if (buyerPreferences.preferredLocations) prefs.push({ label: "Preferred Locations", value: buyerPreferences.preferredLocations });
  if (buyerPreferences.minBudget || buyerPreferences.maxBudget) {
    prefs.push({ label: "Budget", value: [buyerPreferences.minBudget, buyerPreferences.maxBudget].filter(Boolean).join(" – ") });
  }
  if (buyerPreferences.minBedrooms) prefs.push({ label: "Min Bedrooms", value: String(buyerPreferences.minBedrooms) });
  if (buyerPreferences.minBathrooms) prefs.push({ label: "Min Bathrooms", value: String(buyerPreferences.minBathrooms) });
  if (buyerPreferences.minCarSpaces) prefs.push({ label: "Min Car Spaces", value: String(buyerPreferences.minCarSpaces) });
  if (buyerPreferences.preferredLandSize) prefs.push({ label: "Preferred Land Size", value: buyerPreferences.preferredLandSize });
  if (buyerPreferences.purchaseTimeframe) prefs.push({ label: "Purchase Timeframe", value: buyerPreferences.purchaseTimeframe });
  if (buyerPreferences.preferredSettlementPeriod) prefs.push({ label: "Preferred Settlement", value: buyerPreferences.preferredSettlementPeriod });

  PRIORITY_LIST_KEYS.forEach(key => {
    const items = buyerPreferences.priorityLists?.[key];
    if (Array.isArray(items) && items.length > 0) {
      prefs.push({ label: PRIORITY_LIST_LABELS[key], value: items.join(", ") });
    }
  });

  // Property map for resolving references
  const propertyMap = {};
  (properties || []).forEach(p => { propertyMap[p.id] = p; });

  function getPropertyName(id) {
    if (!id || !propertyMap[id]) return "";
    return propertyMap[id].address || propertyMap[id].suburb || "Unnamed property";
  }

  // Properties
  const propRecords = (properties || []).map(p => ({
    address: p.address || p.suburb || "Unnamed",
    advertisedPrice: p.advertisedPrice || "",
    propertyType: p.propertyType || "",
    bedrooms: p.bedrooms != null ? String(p.bedrooms) : "",
    bathrooms: p.bathrooms != null ? String(p.bathrooms) : "",
    carSpaces: p.carSpaces != null ? String(p.carSpaces) : "",
    status: p.status || "",
    buyerRating: p.buyerRating != null ? String(p.buyerRating) : "",
    isPriority: p.isPriority ? "Yes" : "",
    keyAdvantages: p.keyAdvantages || "",
    keyConcerns: p.keyConcerns || ""
  }));

  // Important dates grouped by status
  const dateGroups = { Overdue: [], "Due Today": [], Upcoming: [], Completed: [] };
  (importantDates || []).forEach(d => {
    const status = getImportantDateStatus(d, today);
    const groupName = status === "Cancelled" ? "已完成" :
                      status === "Overdue" ? "Overdue" :
                      status === "Due Today" ? "Due Today" : "Upcoming";
    dateGroups[groupName].push({
      date: d.date || "",
      dateType: d.dateType || "",
      propertyName: getPropertyName(d.propertyId),
      status: d.status || "",
      note: d.note || ""
    });
  });

  // Risks
  const riskRecords = (risks || []).map(r => ({
    title: r.title || "",
    riskLevel: r.riskLevel || "",
    status: r.status || "",
    propertyName: getPropertyName(r.propertyId),
    responsible: r.responsible || "",
    question: r.question || "",
    nextAction: r.nextAction || "",
    dueDate: r.dueDate || ""
  }));

  // Contacts (non-empty only)
  const contactRecords = (contacts || []).filter(c =>
    c.name || c.company || c.phone || c.email
  ).map(c => ({
    name: c.name || "",
    role: c.role || "",
    company: c.company || "",
    phone: c.phone || "",
    email: c.email || ""
  }));

  // Tasks grouped by status
  const taskGroups = {
    Completed: [],
    "In Progress": [],
    Waiting: [],
    Outstanding: [],
    "High Risk": []
  };

  checklistData.forEach(stage => {
    stage.categories.forEach(cat => {
      cat.tasks.forEach(task => {
        if (!isTaskVisibleForPropertyType(task, propertyType)) return;
        const state = taskStates[task.id] || {};
        const status = state.status || "Not Started";
        if (!includeNotApplicable && status === "不適用") return;

        const record = {
          stage: `${stage.number}. ${stage.name}`,
          category: cat.name,
          task: task.title,
          status,
          responsible: state.responsible || "",
          dueDate: state.dueDate || "",
          risk: state.riskLevel || "",
          linkedProperty: getPropertyName(state.propertyId),
          notes: state.notes || ""
        };

        if (status === "已完成") taskGroups.Completed.push(record);
        else if (status === "In Progress") taskGroups["In Progress"].push(record);
        else if (status === "Waiting") taskGroups.Waiting.push(record);
        else if (status === "不適用") return;
        else taskGroups.Outstanding.push(record);

        if (state.riskLevel === "High" && status !== "已完成" && status !== "不適用") {
          taskGroups["High Risk"].push(record);
        }
      });
    });
  });

  return {
    generatedAt: new Date().toLocaleString(),
    propertyTypeLabel: getPropertyTypeLabel(propertyType),
    overall,
    currentStage: currentStage ? { number: currentStage.number, name: currentStage.name } : null,
    nextAction,
    stages,
    preferences: prefs,
    properties: propRecords,
    dateGroups,
    risks: riskRecords,
    contacts: contactRecords,
    taskGroups
  };
}