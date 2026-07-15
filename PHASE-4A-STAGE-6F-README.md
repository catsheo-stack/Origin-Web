# Phase 4A — Stage 6F
## Bilingual SEO Release Candidate

This release candidate consolidates the completed Stage 6 work:

- Stage 6A — bilingual SEO metadata foundation
- Stage 6B — hreflang and English/Traditional Chinese pairing
- Stage 6C — sitemap.xml and robots.txt
- Stage 6D — structured data
- Stage 6E — production-readiness headers and automated validation

## Release candidate status

The application source and production configuration are unchanged from the Stage 6E build that passed the production validation suite. Stage 6F packages that validated state as the candidate for GitHub, Vercel and production-domain deployment.

## Required local checks

```powershell
npm install
npm run dev
npm run release:check
```

Expected result:

```text
Production validation passed: 25 checks
Production build passed
```

The existing Vite bundle-size message is a warning and does not fail the release.

## Final browser checks

Confirm the following before committing to the production branch:

- English and Traditional Chinese home and service pages load
- language switching opens the equivalent route
- calculators, checklists and settlement trackers load
- forms and consultation pages load
- cookie banner accepts and rejects correctly
- canonical and hreflang tags update after client-side navigation
- structured-data JSON-LD appears in the document head
- `/sitemap.xml` and `/robots.txt` load
- direct refresh on nested routes works
- no fatal React errors or blank pages

## Deployment recommendation

Commit this release candidate only after the local browser checks pass. Because the current GitHub production branch deploys automatically through Vercel to the live domain, treat that commit as the Stage 6 production release.
