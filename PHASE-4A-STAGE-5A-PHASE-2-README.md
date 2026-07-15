# Phase 4A — Stage 5A — Phase 2

## Included

- Full Traditional Chinese Investment Yield Calculator at `/zh/tools/investment-yield-calculator`
- Chinese labels, placeholders, buttons, result descriptions, help text, FAQ, related resources and consultation CTA
- Chinese printable / PDF summary
- Chinese page metadata and analytics language marker
- Shared PageLayout and CookieBanner remain active for `/zh/tools` and `/zh/tools/*`
- Cookie consent is re-checked when navigating between routes
- English calculator remains unchanged
- All formulas remain in `src/data/tools/yieldCalculator.js` and were not changed

## Local test

```powershell
npm install
npm run dev
```

Open:

- `http://localhost:5173/zh/tools`
- `http://localhost:5173/zh/tools/investment-yield-calculator`

The cookie banner only appears when no valid consent has been stored. To test it again in the browser console:

```javascript
localStorage.removeItem("origin_cookie_consent");
location.reload();
```
