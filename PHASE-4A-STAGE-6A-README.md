# Phase 4A — Stage 6A: Bilingual SEO Foundation

This release adds a central, route-aware SEO foundation for the existing English and Traditional Chinese website.

## Added

- Shared `SeoManager` component
- English and Traditional Chinese page titles
- English and Traditional Chinese meta descriptions
- Canonical URL management
- Open Graph title, description, URL, locale, site name and image tags
- Twitter Card metadata
- Language-aware `<html lang>` values
- Safe `noindex, nofollow` treatment for login, registration, admin and Hermes routes
- Dynamic fallback metadata for article and guide detail routes

## Preserved

- Existing page routes
- Existing translations
- All calculators and formulas
- Buyer and seller settlement tracker logic
- Forms and Base44 integration
- Authentication
- Cookie banner
- Hermes pages

## Not included yet

The following are intentionally reserved for later Stage 6 releases:

- `hreflang` language pairing
- XML sitemap
- `robots.txt`
- Structured data expansion
- Production link and accessibility audit

## Test

```bash
npm install
npm run build
npm run dev
```

Check several English and Chinese routes in browser DevTools under **Elements > head** and confirm the title, description, canonical, Open Graph and Twitter tags change when navigating between pages.
