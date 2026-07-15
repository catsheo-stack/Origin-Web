/**
 * JSON backup creation and download utilities.
 * Backups contain only user-entered data — no secrets, tokens, or source code.
 */
import { downloadBlob, dateStamp } from "./csvExport";

const BACKUP_TYPE = "origin-home-buyer-journey";
const BACKUP_VERSION = 1;
const DATA_VERSION = 4;

/**
 * Creates a structured backup payload from current app state.
 */
export function createBackupPayload(data) {
  return {
    backupType: BACKUP_TYPE,
    backupVersion: BACKUP_VERSION,
    dataVersion: DATA_VERSION,
    exportedAt: new Date().toISOString(),
    data: {
      propertyType: data.propertyType || "house",
      taskStates: data.taskStates || {},
      buyerPreferences: data.buyerPreferences || {},
      properties: Array.isArray(data.properties) ? data.properties : [],
      selectedPropertyIds: Array.isArray(data.selectedPropertyIds) ? data.selectedPropertyIds : [],
      importantDates: Array.isArray(data.importantDates) ? data.importantDates : [],
      risks: Array.isArray(data.risks) ? data.risks : [],
      contacts: Array.isArray(data.contacts) ? data.contacts : []
    }
  };
}

/**
 * Downloads all locally stored tool data as a JSON backup file.
 */
export function downloadBackup(data) {
  const payload = createBackupPayload(data);
  const json = JSON.stringify(payload, null, 2);
  downloadBlob(json, `origin-home-buyer-journey-backup-${dateStamp()}.json`, "application/json");
}

export { BACKUP_TYPE, BACKUP_VERSION, DATA_VERSION };