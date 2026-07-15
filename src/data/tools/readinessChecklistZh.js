export const CHECKLIST_SECTIONS_ZH = [
  { id: "preparation", title: "物業準備", items: [
    { id: "prep_clean", label: "物業已清潔並整理妥當" },
    { id: "prep_repairs", label: "已檢查所需維修項目" },
    { id: "prep_garden", label: "花園及戶外空間已整理" },
    { id: "prep_keys", label: "所有鑰匙均已備妥" },
  ]},
  { id: "compliance", title: "合規與安全", items: [
    { id: "comp_smoke", label: "已檢查煙霧警報器" },
    { id: "comp_electrical", label: "已考慮電氣安全檢查" },
    { id: "comp_gas", label: "如適用，已考慮燃氣安全檢查" },
    { id: "comp_insurance", label: "已檢視保險保障" },
    { id: "comp_oc", label: "已確認業主立案法團要求" },
  ]},
  { id: "leasing", title: "出租準備", items: [
    { id: "lease_rent", label: "已研究預期租金" },
    { id: "lease_term", label: "已考慮租約期限" },
    { id: "lease_date", label: "已確認可出租日期" },
    { id: "lease_pets", label: "已決定寵物安排偏好" },
    { id: "lease_appliances", label: "已確認隨屋提供的電器" },
  ]},
  { id: "documents", title: "文件與資料", items: [
    { id: "doc_lease", label: "現有租約已備妥" },
    { id: "doc_history", label: "租賃紀錄已備妥" },
    { id: "doc_outgoings", label: "市政、水費及業主立案法團資料已備妥" },
    { id: "doc_manuals", label: "電器說明書已備妥" },
    { id: "doc_emergency", label: "緊急維修聯絡資料已備妥" },
  ]},
];
export const TOTAL_ITEMS_ZH = CHECKLIST_SECTIONS_ZH.reduce((n, s) => n + s.items.length, 0);
