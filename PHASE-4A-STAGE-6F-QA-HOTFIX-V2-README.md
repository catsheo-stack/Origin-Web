# Stage 6F QA Hotfix V2

## Changes

1. Cookie consent banner version updated so the current release asks for consent once again. The banner remains visible until Reject or Accept is selected, then disappears and stores the choice.
2. The Traditional Chinese Property Management Readiness Checklist now uses dedicated Chinese checklist and progress components, with Chinese progress labels and fully translated summary field labels.
3. Added an independent Investment Yield Calculator formula regression test.

## Verification

```bash
npm run test:yield
npm run release:check
```

Target browser routes:

- `/zh/tools/property-management-readiness-checklist`
- `/tools/investment-yield-calculator`
- `/zh/tools/investment-yield-calculator`
