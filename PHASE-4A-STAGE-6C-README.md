# Phase 4A — Stage 6C: Sitemap and Robots

## Added

- `public/sitemap.xml`
  - English and Traditional Chinese public routes
  - `en-AU`, `zh-Hant-AU`, and `x-default` alternate links for paired pages
  - Published knowledge-centre article routes
  - Seeded property-guide routes
  - Public calculators, checklists, trackers, legal pages, and service pages
- `public/robots.txt`
  - Allows public website crawling
  - Blocks authentication, admin, Hermes, and thank-you routes
  - Points search engines to the production sitemap

## Intentionally excluded from the sitemap

- Login, registration, password reset, admin, and Hermes routes
- Thank-you pages
- The duplicate `/finance-referral` alias
- Catch-all/404 routes
- Unpublished or remote CMS-only records that are not present in this release

## Local checks

```powershell
npm install
npm run dev
```

Open:

- `http://localhost:5173/sitemap.xml`
- `http://localhost:5173/robots.txt`

Then run:

```powershell
npm run build
```

After building, verify:

- `dist/sitemap.xml`
- `dist/robots.txt`
