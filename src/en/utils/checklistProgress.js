/**
 * Progress calculation utilities (Stage 3).
 * Tasks marked "Not Applicable" are excluded from totals.
 * Tasks hidden by property type are excluded from totals.
 * All dashboard calculations derive from existing state — no fake numbers.
 */

const APPLICABLE_STATUSES = ["Not Started", "In Progress", "Waiting", "Completed"];

const PROFESSIONAL_ROLES = [
  "Conveyancer", "Solicitor", "Mortgage Broker", "Lender",
  "Building Inspector", "Pest Inspector", "Accountant",
  "Owners Corporation Manager", "Building Manager"
];

/* ── Date helpers (local, no timezone drift) ── */

function getTodayStart() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function parseLocalDate(dateStr) {
  if (!dateStr) return null;
  const parts = String(dateStr).split("-").map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) return null;
  return new Date(parts[0], parts[1] - 1, parts[2]);
}

/**
 * Returns "overdue", "due_today", "due_soon", or "none".
 */
export function getDueStatus(taskState, today) {
  if (!taskState?.dueDate) return "none";
  const due = parseLocalDate(taskState.dueDate);
  if (!due) return "none";
  const t = today || getTodayStart();
  const diffDays = Math.round((due - t) / 86400000);
  if (diffDays < 0) return "overdue";
  if (diffDays === 0) return "due_today";
  if (diffDays <= 7) return "due_soon";
  return "none";
}

/* ── Visibility (single source of truth) ── */

export function isTaskVisibleForPropertyType(task, propertyType) {
  return !task.propertyTypes || task.propertyTypes.includes(propertyType);
}

/* ── Basic task progress ── */

export function getTaskProgress(tasks) {
  const applicable = tasks.filter(t => APPLICABLE_STATUSES.includes(t.status));
  const completed = applicable.filter(t => t.status === "Completed");
  return {
    total: applicable.length,
    completed: completed.length,
    remaining: applicable.length - completed.length,
    percentage: applicable.length === 0 ? 100 : Math.round((completed.length / applicable.length) * 100)
  };
}

/* ── Flat list of visible tasks with their states and stage info ── */

export function getVisibleTasks(checklistData, taskStates, propertyType) {
  const result = [];
  checklistData.forEach(stage => {
    stage.categories.forEach(cat => {
      cat.tasks.forEach(task => {
        if (isTaskVisibleForPropertyType(task, propertyType)) {
          result.push({
            task,
            state: taskStates[task.id] || { status: "Not Started", responsible: task.defaultResponsible, dueDate: "", riskLevel: task.defaultRisk, notes: "" },
            stageId: stage.id,
            stageName: stage.name,
            stageNumber: stage.number
          });
        }
      });
    });
  });
  return result;
}

/* ── Stage-level progress ── */

function getVisibleStageTasks(stageData, taskStates, propertyType) {
  const tasks = [];
  stageData.categories.forEach(cat => {
    cat.tasks.forEach(task => {
      if (isTaskVisibleForPropertyType(task, propertyType)) {
        tasks.push({ status: taskStates[task.id]?.status || "Not Started" });
      }
    });
  });
  return tasks;
}

export function getStageProgress(stageData, taskStates, propertyType) {
  const tasks = getVisibleStageTasks(stageData, taskStates, propertyType);
  return getTaskProgress(tasks);
}

export function getOverallProgress(checklistData, taskStates, propertyType) {
  const allTasks = [];
  checklistData.forEach(stage => {
    stage.categories.forEach(cat => {
      cat.tasks.forEach(task => {
        if (isTaskVisibleForPropertyType(task, propertyType)) {
          allTasks.push({ status: taskStates[task.id]?.status || "Not Started" });
        }
      });
    });
  });
  return getTaskProgress(allTasks);
}

/* ── Stage status (deterministic) ── */

export function getStageStatus(stage, taskStates, propertyType, today) {
  const t = today || getTodayStart();

  const visible = [];
  stage.categories.forEach(cat => {
    cat.tasks.forEach(task => {
      if (isTaskVisibleForPropertyType(task, propertyType)) {
        visible.push({
          task,
          state: taskStates[task.id] || { status: "Not Started", riskLevel: task.defaultRisk, dueDate: "" }
        });
      }
    });
  });

  const applicable = visible.filter(item => APPLICABLE_STATUSES.includes(item.state.status));
  if (applicable.length === 0) return "Completed";

  const allCompleted = applicable.every(item => item.state.status === "Completed");
  if (allCompleted) return "Completed";

  // Attention Needed: incomplete task overdue (Waiting+overdues already covered by overdue check)
  const needsAttention = visible.some(item => {
    if (item.state.status === "Not Applicable" || item.state.status === "Completed") return false;
    return getDueStatus(item.state, t) === "overdue";
  });
  if (needsAttention) return "Attention Needed";

  // Waiting: at least one task Waiting
  const hasWaiting = visible.some(item => item.state.status === "Waiting");
  if (hasWaiting) return "Waiting";

  // Not Started: no task changed from Not Started
  const hasChanged = visible.some(item => item.state.status !== "Not Started");
  if (!hasChanged) return "Not Started";

  return "In Progress";
}

/* ── Current stage ── */

export function getCurrentStage(checklistData, taskStates, propertyType) {
  for (const stage of checklistData) {
    const status = getStageStatus(stage, taskStates, propertyType);
    if (status === "Completed") continue;

    const visible = getVisibleStageTasks(stage, taskStates, propertyType);
    const applicable = visible.filter(t => APPLICABLE_STATUSES.includes(t.status));
    if (applicable.length > 0) return stage;
  }
  return null;
}

/* ── Next recommended action (rule-based, no AI) ── */

export function getNextAction(checklistData, taskStates, propertyType, today) {
  const t = today || getTodayStart();
  const visible = getVisibleTasks(checklistData, taskStates, propertyType);
  const incomplete = visible.filter(v =>
    v.state.status !== "Completed" && v.state.status !== "Not Applicable"
  );

  if (incomplete.length === 0) return null;

  const format = (item) => ({ title: item.task.title, responsible: item.state.responsible });

  // 1. Overdue high-risk
  let found = incomplete.find(v => getDueStatus(v.state, t) === "overdue" && v.state.riskLevel === "High");
  if (found) return format(found);

  // 2. Overdue
  found = incomplete.find(v => getDueStatus(v.state, t) === "overdue");
  if (found) return format(found);

  // 3. Waiting high-risk
  found = incomplete.find(v => v.state.status === "Waiting" && v.state.riskLevel === "High");
  if (found) return format(found);

  // 4. In-progress high-risk
  found = incomplete.find(v => v.state.status === "In Progress" && v.state.riskLevel === "High");
  if (found) return format(found);

  // 5. Earliest due incomplete task
  const withDue = incomplete
    .filter(v => v.state.dueDate)
    .sort((a, b) => parseLocalDate(a.state.dueDate) - parseLocalDate(b.state.dueDate));
  if (withDue.length > 0) return format(withDue[0]);

  // 6. First incomplete task in current stage
  const currentStage = getCurrentStage(checklistData, taskStates, propertyType);
  if (currentStage) {
    for (const cat of currentStage.categories) {
      for (const task of cat.tasks) {
        if (!isTaskVisibleForPropertyType(task, propertyType)) continue;
        const state = taskStates[task.id];
        if (state && state.status !== "Completed" && state.status !== "Not Applicable") {
          return { title: task.title, responsible: state.responsible };
        }
      }
    }
  }

  // 7. First incomplete in next stage (first remaining incomplete overall)
  return format(incomplete[0]);
}

/* ── Important date status (derived from date + saved status) ── */

export function getImportantDateStatus(dateRec, today) {
  const t = today || getTodayStart();
  if (dateRec.status === "Completed") return "Completed";
  if (dateRec.status === "Cancelled") return "Cancelled";

  const due = parseLocalDate(dateRec.date);
  if (!due) return "Later";

  const diffDays = Math.round((due - t) / 86400000);
  if (diffDays < 0) return "Overdue";
  if (diffDays === 0) return "Due Today";
  if (diffDays <= 7) return "Next 7 Days";
  return "Later";
}

/* ── Dashboard counts (checklist tasks + important dates + risks) ── */

export function getDashboardCounts(checklistData, taskStates, propertyType, today, importantDates = [], risks = []) {
  const t = today || getTodayStart();
  const visible = getVisibleTasks(checklistData, taskStates, propertyType);
  const incomplete = visible.filter(v =>
    v.state.status !== "Completed" && v.state.status !== "Not Applicable"
  );

  const dueSoonTasks = incomplete.filter(v => {
    const ds = getDueStatus(v.state, t);
    return ds === "due_soon" || ds === "due_today";
  });

  const overdueTasks = incomplete.filter(v => getDueStatus(v.state, t) === "overdue");

  const waitingTasks = visible.filter(v => v.state.status === "Waiting");

  const highRiskTasks = incomplete.filter(v =>
    v.state.riskLevel === "High" && (
      v.state.status === "In Progress" ||
      v.state.status === "Waiting" ||
      getDueStatus(v.state, t) === "overdue"
    )
  );

  const proReviewTasks = incomplete.filter(v => {
    if (!PROFESSIONAL_ROLES.some(role =>
      String(v.state.responsible || "").toLowerCase().includes(role.toLowerCase())
    )) return false;
    const ds = getDueStatus(v.state, t);
    return v.state.status === "In Progress" ||
           v.state.status === "Waiting" ||
           ds === "due_soon" ||
           ds === "due_today" ||
           ds === "overdue";
  });

  /* Important dates */
  const dateItems = (Array.isArray(importantDates) ? importantDates : []).map(d => ({ date: d }));
  const dueSoonDates = dateItems.filter(item => {
    const ds = getImportantDateStatus(item.date, t);
    return ds === "Due Today" || ds === "Next 7 Days";
  });
  const overdueDates = dateItems.filter(item => getImportantDateStatus(item.date, t) === "Overdue");

  /* Risks: all High/Deal Breaker except Resolved/Accepted */
  const activeRisks = (Array.isArray(risks) ? risks : []).filter(r =>
    r.status !== "Resolved" && r.status !== "Accepted" &&
    (r.riskLevel === "High" || r.riskLevel === "Deal Breaker")
  );
  const dealBreakerCount = (Array.isArray(risks) ? risks : []).filter(r =>
    r.riskLevel === "Deal Breaker" && r.status !== "Resolved" && r.status !== "Accepted"
  ).length;
  const hasDealBreaker = dealBreakerCount > 0;

  /* Professional review risks: assigned to professional roles, not Resolved/Accepted */
  const PROFESSIONAL_RISK_ROLES = [
    "Conveyancer", "Solicitor", "Mortgage Broker", "Lender",
    "Building Inspector", "Pest Inspector", "Owners Corporation Manager",
    "Building Manager", "Accountant", "Other Professional"
  ];
  const proReviewRisks = activeRisks.filter(r =>
    PROFESSIONAL_RISK_ROLES.includes(r.responsible)
  );

  return {
    dueSoon: { count: dueSoonTasks.length + dueSoonDates.length, tasks: dueSoonTasks, dates: dueSoonDates },
    overdue: { count: overdueTasks.length + overdueDates.length, tasks: overdueTasks, dates: overdueDates },
    waiting: { count: waitingTasks.length, tasks: waitingTasks },
    highRisk: { count: highRiskTasks.length + activeRisks.length, tasks: highRiskTasks, risks: activeRisks, hasDealBreaker, dealBreakerCount },
    professionalReview: { count: proReviewTasks.length + proReviewRisks.length, tasks: proReviewTasks, risks: proReviewRisks }
  };
}