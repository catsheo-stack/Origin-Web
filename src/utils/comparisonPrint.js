/**
 * Print utility for the property comparison summary.
 * Temporarily sets the document title to encourage a useful PDF filename,
 * triggers the browser print dialog, then restores the original title.
 */
export function printPropertyComparison() {
  const originalTitle = document.title;
  const dateStamp = new Date().toISOString().slice(0, 10);
  document.title = `Origin Property Comparison Summary - ${dateStamp}`;

  let restored = false;
  const restoreTitle = () => {
    if (restored) return;
    restored = true;
    document.title = originalTitle;
    window.removeEventListener("afterprint", restoreTitle);
  };
  window.addEventListener("afterprint", restoreTitle);

  window.print();

  // Fallback restore in case afterprint does not fire
  setTimeout(restoreTitle, 500);
}