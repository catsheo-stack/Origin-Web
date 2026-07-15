# Phase 4A - Stage 6B: Hreflang & Language Pairing

This release extends the Stage 6A SEO foundation with bilingual language pairing for English and Traditional Chinese public pages.

## Added

- `hreflang="en-AU"` alternate links
- `hreflang="zh-Hant-AU"` alternate links
- `hreflang="x-default"` pointing to the English default page
- English/Chinese pairing for service, resource, legal and tool routes
- Dynamic pairing for article and property-guide detail URLs using the same slug
- `og:locale:alternate` metadata
- Automatic removal and refresh of alternate links during client-side navigation

## Preserved

- All Stage 6A metadata and canonical URLs
- Existing English and Chinese routes
- Page content and translations
- Calculators, trackers and forms
- Authentication, Base44 integration and Hermes routes
- Cookie consent behavior

## Intentionally not paired

Pages without a confirmed Chinese equivalent, such as `/about`, are not given a fabricated Chinese alternate. This avoids sending search engines to unrelated or nonexistent pages.

## Local testing

```bash
npm install
npm run dev
```

Open an English/Chinese route pair and inspect the page `<head>` in Developer Tools. Each paired public page should contain three alternate links: `en-AU`, `zh-Hant-AU`, and `x-default`.

## Build verification

```bash
npm run build
```
