# Mobile Navigation Hotfix

Date: 2026-07-15
Release: Origin Web v1.0.0 Production Hotfix 1

## Issue

The English mobile navigation omitted the Knowledge Centre section because its links were conditionally rendered only for Traditional Chinese routes.

## Fix

- Added a collapsible `Knowledge Centre` section to the English mobile menu.
- Retained the existing English links: Articles, Guides, FAQ and Tools.
- Preserved the existing Traditional Chinese mobile navigation and routes.
- No service pages, formulas, storage, SEO routes, Hermes or Base44 integrations were changed.

## Verification

- ESLint: PASS
- Production validation: PASS (25/25)
- Production Vite build: PASS
