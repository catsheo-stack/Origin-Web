/**
 * CSV export utilities with formula-injection protection.
 * All user-controlled values are sanitised before CSV output.
 */

/**
 * Protects a value against spreadsheet formula injection.
 * Prefixes dangerous leading characters (=, +, -, @) with a single apostrophe.
 */
export function protectCsvValue(value) {
  let s = String(value ?? "");
  if (/^[=+\-@]/.test(s)) {
    s = "'" + s;
  }
  return s;
}

/**
 * Escapes a value for safe CSV inclusion.
 * Wraps in quotes if the value contains commas, quotes, or line breaks.
 */
export function escapeCsvField(value) {
  let s = protectCsvValue(value);
  if (/[",\n\r]/.test(s)) {
    s = '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

/**
 * Builds a single CSV row from an array of values.
 */
export function buildCsvRow(values) {
  return values.map(escapeCsvField).join(",");
}

/**
 * Returns a YYYY-MM-DD date string for filenames.
 */
export function dateStamp() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * Triggers a browser download of a Blob with a sanitised filename.
 */
export function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 200);
}

/**
 * Downloads content as a Blob with the given MIME type.
 */
export function downloadBlob(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  triggerDownload(blob, filename);
}

/**
 * Downloads an array of rows as a UTF-8 CSV file with BOM for Excel compatibility.
 * @param {string} filename - Application-generated filename.
 * @param {Array<Array>} rows - Array of row arrays; first row is headers.
 */
export function downloadCsv(filename, rows) {
  const BOM = "\uFEFF";
  const csv = BOM + rows.map(buildCsvRow).join("\r\n");
  downloadBlob(csv, filename, "text/csv;charset=utf-8;");
}