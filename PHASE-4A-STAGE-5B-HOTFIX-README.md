# Phase 4A Stage 5B Hotfix

This hotfix resolves the blank Traditional Chinese Home Buying Planner page.

## Fixes
- Restored the original component and prop identifiers that were accidentally translated.
- Restored the original calculator input field keys used by the shared formula engine.
- Corrected the Chinese wizard navigation callback names.
- Corrected the results NextSteps import.
- Corrected Chinese internal tool links and breadcrumb URL.
- Kept all formulas in `src/data/tools/homeBuyingPlanner.js` unchanged.

## Verification
- `npm run build` passed.
- `npm run lint -- --fix` passed.

## Test route
- `/zh/tools/origin-home-buying-planner`
