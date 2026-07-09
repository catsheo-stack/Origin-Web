import { jsPDF } from "jspdf";

const MIDNIGHT = [26, 28, 30];
const GOLDEN = [196, 152, 90];
const PARCHMENT = [249, 247, 242];
const STONE = [226, 223, 216];
const MUTED = [120, 116, 110];

export function generateSettlementPdf({ property, milestones, currentStage, nextAction, generatedDate }) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 44;
  const contentW = pageW - margin * 2;
  let y = 0;

  const ensure = (h) => {
    if (y + h > pageH - 56) {
      doc.addPage();
      y = margin;
    }
  };

  const heading = (label) => {
    ensure(30);
    doc.setFillColor(...GOLDEN);
    doc.rect(margin, y - 9, 3, 12, "F");
    doc.setFontSize(11);
    doc.setTextColor(...MIDNIGHT);
    doc.setFont("helvetica", "bold");
    doc.text(label.toUpperCase(), margin + 10, y);
    y += 16;
  };

  const row = (label, value) => {
    ensure(24);
    doc.setFontSize(9);
    doc.setTextColor(...MUTED);
    doc.setFont("helvetica", "normal");
    doc.text(label, margin, y);
    doc.setFontSize(10);
    doc.setTextColor(...MIDNIGHT);
    const lines = doc.splitTextToSize(value || "—", contentW - 140);
    doc.text(lines, margin + 140, y);
    y += 18 * lines.length + 6;
  };

  // Header band
  doc.setFillColor(...MIDNIGHT);
  doc.rect(0, 0, pageW, 76, "F");
  doc.setFontSize(9);
  doc.setTextColor(...GOLDEN);
  doc.setFont("helvetica", "normal");
  doc.text("ORIGIN CONCIERGE", margin, 30);
  doc.setFontSize(20);
  doc.setTextColor(...PARCHMENT);
  doc.text("Buyer Settlement Tracker", margin, 54);
  doc.setFontSize(9);
  doc.setTextColor(...PARCHMENT);
  doc.text(`Generated ${generatedDate}`, pageW - margin, 54, { align: "right" });

  y = 104;

  heading("Property Details");
  row("Property Address", property.address);
  row("Buyer Type", property.buyerType);
  row("Contract Date", property.contractDate);
  row("Settlement Date", property.settlementDate);

  y += 6;
  heading("Settlement Summary");
  row("Current Stage", currentStage);
  row("Next Recommended Action", nextAction ? `${nextAction.title} — ${nextAction.aiExplanation}` : "All milestones complete");

  y += 6;
  heading("Settlement Timeline");
  milestones.forEach((m, idx) => {
    ensure(26);
    doc.setFontSize(10);
    doc.setTextColor(...GOLDEN);
    doc.setFont("helvetica", "bold");
    doc.text(`${String(idx + 1).padStart(2, "0")}`, margin, y);
    doc.setTextColor(...MIDNIGHT);
    doc.setFont("helvetica", "normal");
    doc.text(m.title, margin + 24, y);
    doc.setFontSize(8);
    doc.setTextColor(...MUTED);
    const statusLabel = m.status === "completed" ? "Completed" : m.status === "in_progress" ? "In Progress" : "Not Started";
    doc.text(statusLabel, pageW - margin, y, { align: "right" });
    y += 18;
    if (m.date) {
      ensure(14);
      doc.setFontSize(8);
      doc.setTextColor(...MUTED);
      doc.text(`Date: ${m.date}`, margin + 24, y);
      y += 14;
    }
  });

  const completed = milestones.filter((m) => m.status === "completed");
  const outstanding = milestones.filter((m) => m.status !== "completed");

  y += 6;
  heading(`Completed Tasks (${completed.length})`);
  if (completed.length) {
    completed.forEach((m) => {
      ensure(16);
      doc.setFontSize(9);
      doc.setTextColor(...MIDNIGHT);
      doc.setFont("helvetica", "normal");
      doc.text(`•  ${m.title}`, margin, y);
      y += 16;
    });
  } else {
    ensure(16);
    doc.setFontSize(9);
    doc.setTextColor(...MUTED);
    doc.text("None yet", margin, y);
    y += 16;
  }

  y += 6;
  heading(`Outstanding Tasks (${outstanding.length})`);
  if (outstanding.length) {
    outstanding.forEach((m) => {
      ensure(16);
      doc.setFontSize(9);
      doc.setTextColor(...MIDNIGHT);
      doc.text(`•  ${m.title}`, margin, y);
      y += 16;
    });
  } else {
    ensure(16);
    doc.setFontSize(9);
    doc.setTextColor(...MUTED);
    doc.text("All milestones complete", margin, y);
    y += 16;
  }

  y += 6;
  heading("Notes");
  for (let i = 0; i < 4; i++) {
    ensure(22);
    doc.setDrawColor(...STONE);
    doc.line(margin, y, pageW - margin, y);
    y += 22;
  }

  // Footer on every page
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(...MUTED);
    doc.setFont("helvetica", "normal");
    doc.text("Origin Property Concierge  |  Buyer Settlement Tracker", margin, pageH - 26);
    doc.text(`Page ${i} of ${pageCount}`, pageW - margin, pageH - 26, { align: "right" });
  }

  doc.save("Buyer-Settlement-Tracker.pdf");
}