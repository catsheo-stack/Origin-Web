# Phase 4A — Stage 6F QA Hotfix

This hotfix preserves the Stage 6F release candidate and corrects three audited defects:

1. Restores valid React `className` attributes and English data identifiers in `ReadinessSummaryZh.jsx`.
2. Restores the expected `onRestart` prop contract in `SellerSettlementTrackerZh.jsx`.
3. Removes duplicate `<url>` entries from `public/sitemap.xml`.

Validation commands:

```powershell
npm install
npm run release:check
```

Targeted browser checks:

- `/zh/tools/property-management-readiness-checklist` — complete the checklist and open the summary.
- `/zh/tools/seller-settlement-tracker` — start the tracker and test both restart controls.
- `/sitemap.xml` — confirm each `<loc>` appears once.
