# Origin Chinese Phase 4A — Stage 1: FAQ and Q&A

This package is based on the working Phase 3 bilingual project and preserves the existing English site, layouts, styling, forms, tools, Base44 integration, Hermes routes and legal pages.

## Added in this stage

- Full Traditional Chinese FAQ page at `/zh/faq`
- 31 professionally localised questions and answers covering:
  - Buying property
  - Mortgage and finance
  - Conveyancing and settlement
  - Property management
  - Selling property
  - Tools and calculators
- Chinese search field and no-results state
- Chinese FAQ structured data (`FAQPage` JSON-LD)
- Chinese page title, meta description and Open Graph metadata
- FAQ link added to Chinese desktop navigation, mobile navigation and footer
- General-information disclaimer added beneath the FAQ content

## Local testing

```powershell
npm install
npm run dev
```

Open:

```text
http://localhost:5173/zh/faq
```

## Production build

```powershell
npm run build
```

## Scope boundary

This is Stage 1 only. Knowledge Centre hubs, guides, questionnaires and tool content are scheduled for later Phase 4A stages. Existing formulas and application logic were not changed in this stage.
