/**
 * Checklist task export utilities.
 * Builds export records, filters hidden property-type tasks,
 * and resolves linked property names.
 */
import { isTaskVisibleForPropertyType } from "@/utils/checklistProgress";

/**
 * Returns the CSV column headers for checklist export.
 */
export function checklistCsvHeaders() {
  return [
    "Stage Number", "階段", "分類", "任務", "狀態",
    "Responsible Party", "到期日", "Risk Level",
    "相關物業", "備註", "Last Updated"
  ];
}

/**
 * Builds an array of task export records for the currently selected property type.
 * Hidden property-type tasks are excluded.
 * Not Applicable tasks are excluded unless includeNotApplicable is true.
 */
export function buildTaskExportRecords(checklistData, taskStates, propertyType, properties, includeNotApplicable = false) {
  const propertyMap = {};
  (properties || []).forEach(p => {
    propertyMap[p.id] = p.address || p.suburb || "Unnamed property";
  });

  const records = [];
  checklistData.forEach(stage => {
    stage.categories.forEach(cat => {
      cat.tasks.forEach(task => {
        if (!isTaskVisibleForPropertyType(task, propertyType)) return;
        const state = taskStates[task.id] || {};
        const status = state.status || "Not Started";
        if (!includeNotApplicable && status === "不適用") return;

        records.push({
          stageNumber: stage.number,
          stage: stage.name,
          category: cat.name,
          task: task.title,
          status,
          responsible: state.responsible || task.defaultResponsible || "",
          dueDate: state.dueDate || "",
          riskLevel: state.riskLevel || task.defaultRisk || "",
          linkedProperty: state.propertyId ? (propertyMap[state.propertyId] || "") : "",
          notes: state.notes || "",
          lastUpdated: ""
        });
      });
    });
  });
  return records;
}

/**
 * Converts task export records to CSV row arrays (matching header order).
 */
export function recordsToCsvRows(records) {
  return records.map(r => [
    r.stageNumber, r.stage, r.category, r.task, r.status,
    r.responsible, r.dueDate, r.riskLevel,
    r.linkedProperty, r.notes, r.lastUpdated
  ]);
}