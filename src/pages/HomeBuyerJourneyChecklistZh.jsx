import React, { useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import useBuyerChecklist from "@/hooks/useBuyerChecklist";
import {
  getOverallProgress,
  getCurrentStage,
  getNextAction,
  getDashboardCounts
} from "@/utils/checklistProgress";
import StageAccordion from "@/components/buyer-checklist/StageAccordion";
import PropertyTypeSelector from "@/components/buyer-checklist/PropertyTypeSelector";
import ProgressSummary from "@/components/buyer-checklist/ProgressSummary";
import JourneyProgress from "@/components/buyer-checklist/JourneyProgress";
import DashboardSummaryCards from "@/components/buyer-checklist/DashboardSummaryCards";
import PlanningNavigation from "@/components/buyer-checklist/planning/PlanningNavigation";
import BuyerPreferencesPanel from "@/components/buyer-checklist/planning/BuyerPreferencesPanel";
import PropertyShortlistPanel from "@/components/buyer-checklist/planning/PropertyShortlistPanel";
import PropertyComparison from "@/components/buyer-checklist/planning/PropertyComparison";
import PropertyComparisonPrintSummary from "@/components/buyer-checklist/planning/PropertyComparisonPrintSummary";
import ImportantDatesPanel from "@/components/buyer-checklist/planning/ImportantDatesPanel";
import RisksPanel from "@/components/buyer-checklist/planning/RisksPanel";
import ContactsPanel from "@/components/buyer-checklist/planning/ContactsPanel";
import DownloadMenu from "@/components/buyer-checklist/export/DownloadMenu";
import ProgressSummaryPrintView from "@/components/buyer-checklist/export/ProgressSummaryPrintView";
import BlankChecklistPrintView from "@/components/buyer-checklist/export/BlankChecklistPrintView";
import RestoreBackupDialog from "@/components/buyer-checklist/export/RestoreBackupDialog";
import { buildTaskExportRecords, checklistCsvHeaders, recordsToCsvRows } from "@/utils/checklistExport";
import { downloadCsv, dateStamp } from "@/utils/csvExport";
import { downloadBackup } from "@/utils/backupExport";
import { buildPrintSummary } from "@/utils/printSummary";

export default function HomeBuyerJourneyChecklist() {
  const {
    checklistData,
    taskStates,
    updateTask,
    propertyType,
    updatePropertyType,
    buyerPreferences,
    updateBuyerPreferences,
    properties,
    addProperty,
    updateProperty,
    deleteProperty,
    selectedPropertyIds,
    togglePropertyComparison,
    togglePropertyPriority,
    importantDates, addImportantDate, updateImportantDate, deleteImportantDate, completeImportantDate,
    risks, addRisk, updateRisk, deleteRisk, resolveRisk,
    contacts, addContact, updateContact, deleteContact,
    resetChecklist,
    deleteLocalData,
    restoreAllData,
    lastSaved
  } = useBuyerChecklist();

  const [openStages, setOpenStages] = useState({});
  const [activeSection, setActiveSection] = useState("checklist");
  const [printView, setPrintView] = useState(null);
  const [autoPrint, setAutoPrint] = useState(false);
  const [restoreOpen, setRestoreOpen] = useState(false);
  const [comparisonPrintOpen, setComparisonPrintOpen] = useState(false);
  const [includeNotApplicable, setIncludeNotApplicable] = useState(false);

  const today = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }, []);

  const overall = useMemo(
    () => getOverallProgress(checklistData, taskStates, propertyType),
    [checklistData, taskStates, propertyType]
  );

  const currentStage = useMemo(
    () => getCurrentStage(checklistData, taskStates, propertyType),
    [checklistData, taskStates, propertyType]
  );

  const nextAction = useMemo(
    () => getNextAction(checklistData, taskStates, propertyType, today),
    [checklistData, taskStates, propertyType, today]
  );

  const counts = useMemo(
    () => getDashboardCounts(checklistData, taskStates, propertyType, today, importantDates, risks),
    [checklistData, taskStates, propertyType, today, importantDates, risks]
  );

  const comparisonProperties = useMemo(
    () => properties.filter(p => selectedPropertyIds.includes(p.id)),
    [properties, selectedPropertyIds]
  );

  const printSummary = useMemo(
    () => printView === "summary"
      ? buildPrintSummary(checklistData, taskStates, propertyType, buyerPreferences, properties, importantDates, risks, contacts, today, includeNotApplicable)
      : null,
    [printView, checklistData, taskStates, propertyType, buyerPreferences, properties, importantDates, risks, contacts, today, includeNotApplicable]
  );

  const toggleStage = useCallback((stageId, scrollTo = false) => {
    setOpenStages(prev => {
      const willOpen = !prev[stageId];
      const newState = { ...prev, [stageId]: willOpen };
      if (willOpen && scrollTo) {
        setTimeout(() => {
          document.getElementById(`stage-${stageId}`)?.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }, 100);
      }
      return newState;
    });
  }, []);

  const handleJourneyStageClick = useCallback((stageId) => {
    setActiveSection("checklist");
    setOpenStages(prev => ({ ...prev, [stageId]: true }));

    setTimeout(() => {
      document.getElementById(`stage-${stageId}`)?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 100);
  }, []);

  const handleToggleReject = useCallback((id) => {
    const prop = properties.find(p => p.id === id);
    if (prop) {
      updateProperty(id, { status: prop.status === "已淘汰" ? "已儲存" : "已淘汰" });
    }
  }, [properties, updateProperty]);

  const handleSummary = useCallback(() => {
    setAutoPrint(false);
    setPrintView("summary");
  }, []);

  const handlePdf = useCallback(() => {
    setAutoPrint(true);
    setPrintView("summary");
  }, []);

  const handleCsv = useCallback(() => {
    const records = buildTaskExportRecords(checklistData, taskStates, propertyType, properties, includeNotApplicable);
    const rows = [checklistCsvHeaders(), ...recordsToCsvRows(records)];
    downloadCsv(`origin-home-buyer-checklist-${dateStamp()}.csv`, rows);
  }, [checklistData, taskStates, propertyType, properties, includeNotApplicable]);

  const handleBackup = useCallback(() => {
    downloadBackup({ propertyType, taskStates, buyerPreferences, properties, selectedPropertyIds, importantDates, risks, contacts });
  }, [propertyType, taskStates, buyerPreferences, properties, selectedPropertyIds, importantDates, risks, contacts]);

  const handleRestoreClick = useCallback(() => {
    setRestoreOpen(true);
  }, []);

  const handleRestoreData = useCallback((validatedData) => {
    restoreAllData(validatedData);
  }, [restoreAllData]);

  const handleBlank = useCallback(() => {
    setAutoPrint(false);
    setPrintView("blank");
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-6 sm:py-10">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            規劃並追蹤您的置業旅程
          </h1>
          <p className="text-sm text-gray-600 mt-1.5">
            使用此清單管理自行購置物業的每一個階段。
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            從物業搜尋到鑰匙交收，全面追蹤任務、期限、風險及專業查核。
          </p>
          <div className="flex flex-col sm:flex-row gap-1.5 mt-2.5 text-xs">
            <span className="inline-flex items-center gap-1 text-gray-500">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              您的進度只會儲存在此瀏覽器中。
            </span>
            <span className="inline-flex items-center gap-1 text-amber-600 sm:ml-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              請勿輸入機密財務、身分或法律資料。
            </span>
          </div>
          <div className="mt-3">
            <DownloadMenu
              onSummary={handleSummary}
              onPdf={handlePdf}
              onCsv={handleCsv}
              onBackup={handleBackup}
              onRestore={handleRestoreClick}
              onBlank={handleBlank}
              includeNotApplicable={includeNotApplicable}
              onToggleNotApplicable={setIncludeNotApplicable}
            />
          </div>
        </div>

        {/* Property Type Selector */}
        <div className="mb-6">
          <PropertyTypeSelector value={propertyType} onChange={updatePropertyType} />
        </div>

        {/* Progress Summary */}
        <ProgressSummary
          overall={overall}
          currentStage={currentStage}
          nextAction={nextAction}
          lastSaved={lastSaved}
        />

        {/* Eight-Stage Visual Journey */}
        <JourneyProgress
          checklistData={checklistData}
          taskStates={taskStates}
          propertyType={propertyType}
          today={today}
          currentStageId={currentStage?.id}
          openStages={openStages}
          onToggleStage={handleJourneyStageClick}
        />

        {/* Dashboard Summary Cards */}
        <DashboardSummaryCards counts={counts} />

        {/* Planning Navigation */}
        <PlanningNavigation activeSection={activeSection} onChange={setActiveSection} comparisonCount={comparisonProperties.length} />

        {/* Section Content */}
        {activeSection === "checklist" && (
          <div className="space-y-3 mb-8">
            {checklistData.map(stage => (
              <StageAccordion
                key={stage.id}
                stage={stage}
                taskStates={taskStates}
                onUpdateTask={updateTask}
                propertyType={propertyType}
                isOpen={!!openStages[stage.id]}
                onToggle={(id) => toggleStage(id)}
                properties={properties}
                contacts={contacts}
              />
            ))}
          </div>
        )}

        {activeSection === "preferences" && (
          <div className="mb-8 space-y-4">
            {!Object.values(buyerPreferences).some(v =>
              typeof v === "string" ? v : Array.isArray(v) ? v.length : false
            ) && (
              <div className="bg-white rounded-lg border p-4 text-center">
                <p className="text-sm text-gray-400">加入偏好，讓物業搜尋更聚焦。</p>
              </div>
            )}
            <BuyerPreferencesPanel
              preferences={buyerPreferences}
              onUpdate={updateBuyerPreferences}
              propertyType={propertyType}
              onUpdatePropertyType={updatePropertyType}
            />
          </div>
        )}

        {activeSection === "properties" && (
          <div className="mb-8">
            <PropertyShortlistPanel
              properties={properties}
              preferences={buyerPreferences}
              selectedPropertyIds={selectedPropertyIds}
              onAdd={addProperty}
              onEdit={(id, data) => updateProperty(id, data)}
              onDelete={deleteProperty}
              onTogglePriority={togglePropertyPriority}
              onToggleComparison={togglePropertyComparison}
              onToggleReject={handleToggleReject}
            />
          </div>
        )}

        {activeSection === "compare" && (
          <div className="mb-8">
            <PropertyComparison
              properties={comparisonProperties}
              preferences={buyerPreferences}
              onRemoveComparison={togglePropertyComparison}
              onDownloadComparison={() => setComparisonPrintOpen(true)}
            />
          </div>
        )}

        {activeSection === "dates" && (
          <div className="mb-8">
            <ImportantDatesPanel
              importantDates={importantDates}
              properties={properties}
              today={today}
              onAdd={addImportantDate}
              onEdit={updateImportantDate}
              onDelete={deleteImportantDate}
              onComplete={completeImportantDate}
              onCancel={(id) => updateImportantDate(id, { status: "Cancelled" })}
            />
          </div>
        )}

        {activeSection === "risks" && (
          <div className="mb-8">
            <RisksPanel
              risks={risks}
              properties={properties}
              checklistData={checklistData}
              onAdd={addRisk}
              onEdit={updateRisk}
              onDelete={deleteRisk}
              onResolve={resolveRisk}
              onReopen={(id) => updateRisk(id, { status: "Open" })}
            />
          </div>
        )}

        {activeSection === "contacts" && (
          <div className="mb-8">
            <ContactsPanel
              contacts={contacts}
              properties={properties}
              onAdd={addContact}
              onEdit={updateContact}
              onDelete={deleteContact}
            />
          </div>
        )}

        {/* Footer disclaimer */}
        <div className="mb-6 p-3 bg-gray-100 rounded-lg">
          <p className="text-xs text-gray-500 leading-relaxed">
            本清單僅供一般規劃用途，不能取代法律、財務、稅務、貸款、建築或其他專業意見。建議在作出決定前諮詢合資格專業人士。
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 pb-10">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" className="text-xs">
                <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                重設清單
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>重設清單進度？</AlertDialogTitle>
                <AlertDialogDescription>
                  此操作只會重設清單進度，已儲存的規劃資料將會保留。
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>取消</AlertDialogCancel>
                <AlertDialogAction onClick={resetChecklist}>重設</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" className="text-xs text-red-600 border-red-200 hover:bg-red-50">
                <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                刪除所有本機資料
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>刪除所有本機資料？</AlertDialogTitle>
                <AlertDialogDescription>
                  此操作會永久刪除此瀏覽器內的所有清單進度、物業類型、買家偏好、已儲存物業、重要日期、風險及聯絡人資料，且無法復原。
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>取消</AlertDialogCancel>
                <AlertDialogAction onClick={deleteLocalData} className="bg-red-600 hover:bg-red-700">刪除</AlertDialogAction>
                </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialog>
                </div>

                {printView === "summary" && (
                <ProgressSummaryPrintView
                summary={printSummary}
                autoPrint={autoPrint}
                onClose={() => setPrintView(null)}
                />
                )}

                {printView === "blank" && (
                <BlankChecklistPrintView
                checklistData={checklistData}
                propertyType={propertyType}
                autoPrint={autoPrint}
                onClose={() => setPrintView(null)}
                />
                )}

                {comparisonPrintOpen && (
          <PropertyComparisonPrintSummary
            properties={comparisonProperties}
            preferences={buyerPreferences}
            risks={risks}
            importantDates={importantDates}
            propertyType={propertyType}
            onClose={() => setComparisonPrintOpen(false)}
          />
        )}

        <RestoreBackupDialog
                open={restoreOpen}
                onClose={() => setRestoreOpen(false)}
                onRestore={handleRestoreData}
                />
                </div>
                </div>
                );
                }