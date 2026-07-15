# Phase 4A - Stage 5A - Phase 1

This release adds the Traditional Chinese tools landing page only.

## Included

- New route: `/zh/tools`
- Chinese tools hub using the same layout, branding, images and card structure as `/tools`
- Localised names and descriptions for all five public tools
- Chinese CTA and metadata
- Chinese navigation and footer link to the tools hub
- English tools hub and all calculator logic remain unchanged

## Not included yet

The individual Chinese calculator interfaces are intentionally deferred to the next Stage 5A phases. To avoid broken links, the new `/zh/tools/...` routes temporarily render the existing English tools. Each interface will be replaced with its fully localised Chinese version one at a time, without changing its formulas or saved-data logic.

## Test

```powershell
npm install
npm run dev
```

Open:

```text
http://localhost:5173/zh/tools
```
