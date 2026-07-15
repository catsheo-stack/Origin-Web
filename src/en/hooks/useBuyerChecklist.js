import { useState, useEffect, useCallback, useRef } from "react";
import homeBuyerChecklist from "@/en/data/homeBuyerChecklist";
import { loadChecklistData, saveChecklistData, deleteChecklistData } from "@/en/utils/checklistStorage";
import {
  createDefaultPreferences, generateId, sanitiseProperty,
  sanitiseImportantDate, sanitiseRisk, sanitiseContact, normalisePreferences
} from "@/en/utils/buyerJourneyValidation";

const MAX_COMPARISON = 3;

function buildDefaultTaskStates() {
  const states = {};
  homeBuyerChecklist.forEach(stage => {
    stage.categories.forEach(cat => {
      cat.tasks.forEach(task => {
        states[task.id] = {
          status: "Not Started",
          responsible: task.defaultResponsible,
          dueDate: "",
          riskLevel: task.defaultRisk,
          notes: ""
        };
      });
    });
  });
  return states;
}

export default function useBuyerChecklist() {
  const [saved] = useState(() => loadChecklistData());

  const [taskStates, setTaskStates] = useState(() => {
    const defaults = buildDefaultTaskStates();
    return { ...defaults, ...(saved?.taskStates || {}) };
  });

  const [propertyType, setPropertyType] = useState(() => saved?.propertyType || "house");

  const [buyerPreferences, setBuyerPreferences] = useState(() => saved?.buyerPreferences || createDefaultPreferences());

  const [properties, setProperties] = useState(() => saved?.properties || []);

  const [selectedPropertyIds, setSelectedPropertyIds] = useState(() => {
    const loaded = saved?.selectedPropertyIds || [];
    const propIds = new Set((saved?.properties || []).map(p => p.id));
    return [...new Set(loaded)].filter(id => propIds.has(id)).slice(0, MAX_COMPARISON);
  });

  const [importantDates, setImportantDates] = useState(() => saved?.importantDates || []);

  const [risks, setRisks] = useState(() => saved?.risks || []);

  const [contacts, setContacts] = useState(() => saved?.contacts || []);

  const [lastSaved, setLastSaved] = useState(() => saved?.lastSaved || null);

  const saveTimeout = useRef(null);

  useEffect(() => {
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      const success = saveChecklistData({
        propertyType, taskStates, buyerPreferences, properties,
        selectedPropertyIds, importantDates, risks, contacts
      });
      if (success) setLastSaved(new Date().toISOString());
    }, 500);
    return () => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
    };
  }, [taskStates, propertyType, buyerPreferences, properties, selectedPropertyIds, importantDates, risks, contacts]);

  const updateTask = useCallback((taskId, field, value) => {
    setTaskStates(prev => ({
      ...prev,
      [taskId]: {
        ...prev[taskId],
        [field]: value
      }
    }));
  }, []);

  const updatePropertyType = useCallback((type) => {
    setPropertyType(type);
  }, []);

  const updateBuyerPreferences = useCallback((updates) => {
    setBuyerPreferences(prev => ({ ...prev, ...updates }));
  }, []);

  const addProperty = useCallback((propData) => {
    const newProperty = {
      ...sanitiseProperty(propData),
      id: generateId(),
      isPriority: false
    };
    setProperties(prev => [...prev, newProperty]);
    return newProperty;
  }, []);

  const updateProperty = useCallback((id, updates) => {
    setProperties(prev => prev.map(p =>
      p.id === id ? { ...p, ...sanitiseProperty({ ...p, ...updates }) } : p
    ));
  }, []);

  const deleteProperty = useCallback((id) => {
    setProperties(prev => prev.filter(p => p.id !== id));
    setSelectedPropertyIds(prev => prev.filter(pid => pid !== id));
    setTaskStates(prev => {
      const updated = {};
      Object.entries(prev).forEach(([taskId, state]) => {
        updated[taskId] = state.propertyId === id
          ? { ...state, propertyId: undefined }
          : state;
      });
      return updated;
    });
    setImportantDates(prev => prev.map(d => d.propertyId === id ? { ...d, propertyId: "" } : d));
    setRisks(prev => prev.map(r => r.propertyId === id ? { ...r, propertyId: "" } : r));
    setContacts(prev => prev.map(c => c.propertyId === id ? { ...c, propertyId: "" } : c));
  }, []);

  const togglePropertyPriority = useCallback((id) => {
    setProperties(prev => prev.map(p =>
      p.id === id ? { ...p, isPriority: !p.isPriority } : p
    ));
  }, []);

  const togglePropertyComparison = useCallback((propertyId) => {
    setSelectedPropertyIds(prev => {
      if (prev.includes(propertyId)) {
        return prev.filter(id => id !== propertyId);
      }
      if (prev.length >= MAX_COMPARISON) {
        return prev;
      }
      return [...prev, propertyId];
    });
  }, []);

  /* Important Dates */
  const addImportantDate = useCallback((data) => {
    const newDate = { ...sanitiseImportantDate(data), id: generateId() };
    setImportantDates(prev => [...prev, newDate]);
    return newDate;
  }, []);

  const updateImportantDate = useCallback((id, updates) => {
    setImportantDates(prev => prev.map(d =>
      d.id === id ? { ...d, ...sanitiseImportantDate({ ...d, ...updates }) } : d
    ));
  }, []);

  const deleteImportantDate = useCallback((id) => {
    setImportantDates(prev => prev.filter(d => d.id !== id));
  }, []);

  const completeImportantDate = useCallback((id) => {
    setImportantDates(prev => prev.map(d =>
      d.id === id ? { ...d, status: "Completed" } : d
    ));
  }, []);

  /* Risks */
  const addRisk = useCallback((data) => {
    const newRisk = { ...sanitiseRisk(data), id: generateId() };
    setRisks(prev => [...prev, newRisk]);
    return newRisk;
  }, []);

  const updateRisk = useCallback((id, updates) => {
    setRisks(prev => prev.map(r =>
      r.id === id ? { ...r, ...sanitiseRisk({ ...r, ...updates }) } : r
    ));
  }, []);

  const deleteRisk = useCallback((id) => {
    setRisks(prev => prev.filter(r => r.id !== id));
  }, []);

  const resolveRisk = useCallback((id) => {
    setRisks(prev => prev.map(r =>
      r.id === id ? { ...r, status: "Resolved" } : r
    ));
  }, []);

  /* Contacts */
  const addContact = useCallback((data) => {
    const newContact = { ...sanitiseContact(data), id: generateId() };
    setContacts(prev => [...prev, newContact]);
    return newContact;
  }, []);

  const updateContact = useCallback((id, updates) => {
    setContacts(prev => prev.map(c =>
      c.id === id ? { ...c, ...sanitiseContact({ ...c, ...updates }) } : c
    ));
  }, []);

  const deleteContact = useCallback((id) => {
    setContacts(prev => prev.filter(c => c.id !== id));
    setTaskStates(prev => {
      const updated = {};
      Object.entries(prev).forEach(([taskId, state]) => {
        updated[taskId] = state.contactId === id
          ? { ...state, contactId: "" }
          : state;
      });
      return updated;
    });
  }, []);

  const restoreAllData = useCallback((validatedData) => {
    const defaults = buildDefaultTaskStates();
    setTaskStates({ ...defaults, ...(validatedData.taskStates || {}) });
    setPropertyType(validatedData.propertyType || "house");
    setBuyerPreferences(normalisePreferences(validatedData.buyerPreferences));
    setProperties(Array.isArray(validatedData.properties) ? validatedData.properties : []);
    setSelectedPropertyIds(Array.isArray(validatedData.selectedPropertyIds) ? validatedData.selectedPropertyIds : []);
    setImportantDates(Array.isArray(validatedData.importantDates) ? validatedData.importantDates : []);
    setRisks(Array.isArray(validatedData.risks) ? validatedData.risks : []);
    setContacts(Array.isArray(validatedData.contacts) ? validatedData.contacts : []);
  }, []);

  const resetChecklist = useCallback(() => {
    setTaskStates(buildDefaultTaskStates());
  }, []);

  const deleteLocalData = useCallback(() => {
    deleteChecklistData();
    setTaskStates(buildDefaultTaskStates());
    setPropertyType("house");
    setBuyerPreferences(createDefaultPreferences());
    setProperties([]);
    setSelectedPropertyIds([]);
    setImportantDates([]);
    setRisks([]);
    setContacts([]);
    setLastSaved(null);
  }, []);

  return {
    checklistData: homeBuyerChecklist,
    taskStates, updateTask,
    propertyType, updatePropertyType,
    buyerPreferences, updateBuyerPreferences,
    properties, addProperty, updateProperty, deleteProperty,
    selectedPropertyIds, togglePropertyComparison,
    togglePropertyPriority,
    importantDates, addImportantDate, updateImportantDate, deleteImportantDate, completeImportantDate,
    risks, addRisk, updateRisk, deleteRisk, resolveRisk,
    contacts, addContact, updateContact, deleteContact,
    resetChecklist, deleteLocalData, restoreAllData, lastSaved
  };
}