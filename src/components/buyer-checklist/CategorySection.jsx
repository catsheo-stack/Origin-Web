import React, { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { isTaskVisibleForPropertyType, getTaskProgress } from "@/utils/checklistProgress";
import TaskRow from "@/components/buyer-checklist/TaskRow";

export default function CategorySection({ category, taskStates, onUpdateTask, propertyType, properties, contacts }) {
  const [isOpen, setIsOpen] = useState(true);

  // Filter tasks by property type visibility
  const visibleTasks = category.tasks.filter(task =>
    isTaskVisibleForPropertyType(task, propertyType)
  );

  // Don't render if no tasks are visible for this property type
  if (visibleTasks.length === 0) return null;

  const tasks = visibleTasks.map(t => ({
    status: taskStates[t.id]?.status || "Not Started"
  }));
  const progress = getTaskProgress(tasks);

  return (
    <div className="border rounded-lg overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-3 sm:px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2 min-w-0">
          {isOpen
            ? <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
            : <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />}
          <span className="text-sm font-medium text-gray-800 truncate">{category.name}</span>
        </div>
        <span className="text-xs text-gray-500 flex-shrink-0">
          {progress.completed}/{progress.total}
        </span>
      </button>

      {isOpen && (
        <div className="p-2 sm:p-3 space-y-2">
          {visibleTasks.map(task => (
            <TaskRow
              key={task.id}
              task={task}
              state={taskStates[task.id] || { status: "Not Started", responsible: task.defaultResponsible, dueDate: "", riskLevel: task.defaultRisk, notes: "" }}
              onUpdate={onUpdateTask}
              properties={properties}
              contacts={contacts}
            />
          ))}
        </div>
      )}
    </div>
  );
}