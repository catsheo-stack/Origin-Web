# Phase 4A — Stage 6D: Structured Data

## Purpose

Stage 6D adds route-aware JSON-LD structured data without changing page layout, translations, forms, tools, authentication or Base44 integration.

## Added

- `Organization` and `WebSite` structured data across public pages.
- `WebPage`, `ContactPage` or `FAQPage` page-level data as appropriate.
- `BreadcrumbList` data for public pages.
- `Service` data for Buyer Advisory, Property Management, Mortgage Finance and Conveyancing pages in English and Traditional Chinese.
- `WebApplication` data for the five free interactive property tools, including free-offer details.
- `Article` data for English and Traditional Chinese knowledge-centre detail pages.
- Article-level `FAQPage` data where published article FAQ content exists.
- Automatic structured-data refresh during React route navigation.
- Automatic removal on login, registration, admin, Hermes and thank-you routes.

## Accuracy safeguards

The schema intentionally does not publish an unverified street address, telephone number, professional licence, customer rating or review count. Conveyancing and finance wording remains framed as guidance and coordination rather than an unsupported licence claim.

## Local testing

Run:

```powershell
npm install
npm run dev
```

Open a service page, tool page and article page. In Chrome DevTools Console, run:

```javascript
JSON.parse(document.querySelector('#origin-structured-data').textContent)
```

The result should contain an `@graph` array. Check these examples:

- `/buyer-advisory` contains `Service`.
- `/zh/property-management` contains Chinese `Service` data.
- `/tools/investment-yield-calculator` contains `WebApplication`.
- `/article/what-does-a-buyer-agent-actually-do` contains `Article` and article FAQ data.
- `/login` contains no `#origin-structured-data` script.

Then run:

```powershell
npm run build
```
