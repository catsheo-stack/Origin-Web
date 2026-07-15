import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Printer, X } from "lucide-react";
import { isTaskVisibleForPropertyType } from "@/en/utils/checklistProgress";
import { getPropertyTypeLabel } from "@/en/utils/printSummary";

export default function BlankChecklistPrintView({ checklistData, propertyType, autoPrint, onClose }) {
  useEffect(() => {
    if (autoPrint) {
      const timer = setTimeout(() => window.print(), 400);
      return () => clearTimeout(timer);
    }
  }, [autoPrint]);

  return (
    <div className="fixed inset-0 z-[100] bg-white overflow-y-auto">
      <div className="no-print sticky top-0 bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between z-10">
        <h2 className="text-sm font-medium text-gray-700">Blank Checklist Preview</h2>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => window.print()} className="min-h-[40px]">
            <Printer className="w-4 h-4 mr-1" /> Print
          </Button>
          <Button size="sm" variant="outline" onClick={onClose} className="min-h-[40px]">
            <X className="w-4 h-4 mr-1" /> Close
          </Button>
        </div>
      </div>

      <div className="print-view p-8 max-w-[800px] mx-auto text-black">
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold">Home Buyer Journey — Blank Checklist</h1>
          <p className="text-xs text-gray-600 mt-1">Property Type: {getPropertyTypeLabel(propertyType)}</p>
        </div>

        {checklistData.map(stage => {
          const visibleTasks = [];
          stage.categories.forEach(cat => {
            cat.tasks.forEach(task => {
              if (isTaskVisibleForPropertyType(task, propertyType)) {
                visibleTasks.push({ task, categoryName: cat.name });
              }
            });
          });

          if (visibleTasks.length === 0) return null;

          return (
            <div key={stage.id} className="mb-5 break-inside-avoid">
              <h2 className="text-sm font-bold border-b border-gray-400 pb-0.5 mb-1">
                {stage.number}. {stage.name}
              </h2>
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="text-left py-0.5 pr-1" style={{ width: "24px" }}>&#9744;</th>
                    <th className="text-left py-0.5 pr-2">Task</th>
                    <th className="text-left py-0.5 px-2" style={{ width: "90px" }}>Responsible</th>
                    <th className="text-left py-0.5 px-2" style={{ width: "75px" }}>Due Date</th>
                    <th className="text-left py-0.5 pl-2" style={{ width: "120px" }}>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleTasks.map(({ task, categoryName }) => (
                    <tr key={task.id} className="border-b border-gray-100">
                      <td className="py-1 pr-1">&#9744;</td>
                      <td className="py-1 pr-2">
                        {task.title}
                        <span className="block text-[10px] text-gray-400">{categoryName}</span>
                      </td>
                      <td className="py-1 px-2"></td>
                      <td className="py-1 px-2"></td>
                      <td className="py-1 pl-2"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}

        <div className="mt-6 pt-4 border-t border-gray-300">
          <p className="text-[10px] text-gray-500 leading-relaxed">
            This checklist is a general planning tool. It does not replace legal, financial, taxation, lending, building or other professional advice. Professional review recommended before proceeding.
          </p>
        </div>
      </div>
    </div>
  );
}