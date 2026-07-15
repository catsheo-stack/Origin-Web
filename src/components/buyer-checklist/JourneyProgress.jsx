import React, { useMemo } from "react";
import { getStageProgress, getStageStatus } from "@/utils/checklistProgress";
import StageProgressCard from "@/components/buyer-checklist/StageProgressCard";

export default function JourneyProgress({ checklistData, taskStates, propertyType, today, currentStageId, openStages, onToggleStage }) {
  const stages = useMemo(() =>
    checklistData.map(stage => {
      const progress = getStageProgress(stage, taskStates, propertyType);
      const status = getStageStatus(stage, taskStates, propertyType, today);
      return { stage, progress, status };
    }),
    [checklistData, taskStates, propertyType, today]
  );

  return (
    <div className="mb-6">
      <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2.5">您的置業旅程</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {stages.map(({ stage, progress, status }) => (
          <StageProgressCard
            key={stage.id}
            number={stage.number}
            name={stage.name}
            percentage={progress.percentage}
            completed={progress.completed}
            total={progress.total}
            status={status}
            isCurrent={currentStageId === stage.id}
            isOpen={!!openStages[stage.id]}
            onClick={() => onToggleStage(stage.id)}
          />
        ))}
      </div>
    </div>
  );
}