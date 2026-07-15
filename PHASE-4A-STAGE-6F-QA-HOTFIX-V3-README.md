# Stage 6F QA Hotfix v3

## Scope
- Completed visible Traditional Chinese localisation for Buyer Settlement Tracker.
- Applied the same shared-component localisation support to Seller Settlement Tracker to prevent the same regression.
- Preserved English component defaults and stored data values.
- Corrected the Buyer Tracker restart prop/handler wiring.

## Components changed
- `PropertyDetailsForm.jsx`
- `SellerPropertyDetailsForm.jsx`
- `SettlementProgress.jsx`
- `JourneyStep.jsx`
- `StickyStageNav.jsx`
- Chinese buyer and seller tracker pages now opt in with `zh`.

## Regression boundary
English tracker routes continue to use the original English labels because `zh` defaults to `false`. Business logic, milestones, storage keys, calculations, analytics event names and routes were not changed.
