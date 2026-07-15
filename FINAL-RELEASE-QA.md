# Origin Web v1.0.0 — Final Release QA

Date: 2026-07-15
Source: `Origin-Web-ChiEng (OK 150726).zip`
Decision: APPROVED FOR GITHUB AND VERCEL DEPLOYMENT, subject to live-domain smoke testing after deployment.

## Automated checks

- `npm ci`: PASS
- `npm run lint`: PASS
- `npm run test:yield`: PASS (4/4)
- `npm run validate:production`: PASS (25/25)
- `npm run release:check`: PASS
- Vite production build: PASS

## Production preview route checks

All required English and Traditional Chinese routes returned HTTP 200, including:

- `/about` and `/zh/about`
- `/tools` and `/zh/tools`
- `/tools/buyer-agent-checklist`
- `/zh/tools/buyer-agent-checklist`
- all five other public tool routes in both languages
- `/sitemap.xml`
- `/robots.txt`

The valid sitemap is `/sitemap.xml`. There is no separate Chinese sitemap file. In the local Vite SPA preview, `/zh/sitemap.xml` falls through to `index.html` with `text/html` rather than returning a literal 404. This is a fallback-routing behaviour, not a duplicate sitemap.

## Static integration checks

- English and Chinese About routes: PASS
- Buyer Agent Checklist routes: PASS
- Buyer Agent Checklist links on both Tools pages: PASS
- SEO metadata entries: PASS
- hreflang pairing entries: PASS
- structured-data entries: PASS
- sitemap entries: PASS
- production security/header configuration: PASS
- nested-route SPA fallback: PASS

## Non-blocking findings

- The production bundle remains larger than 500 KB after minification.
- The Origin logo asset is approximately 1.75 MB.
- Base44 proxy is disabled locally because `VITE_BASE44_APP_BASE_URL` is not set.
- `npm run typecheck` reports pre-existing JavaScript/JSX typing diagnostics. The production build, lint, production validator and release gate all pass. Full TypeScript cleanup remains deferred according to the handover.

## Deployment gate

The source package is ready to commit to GitHub and deploy through Vercel. After deployment, complete the required live-domain smoke test, consent/analytics check, form destination audit, and Search Console/Bing submission.
