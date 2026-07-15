# Phase 4A — Stage 2: Chinese Knowledge Centre & Resource Hubs

This package builds on the verified Stage 1 FAQ/Q&A package.

## Added Chinese routes

- `/zh/knowledge-centre`
- `/zh/buyer-advisory/resources`
- `/zh/property-management/resources`
- `/zh/conveyancing/resources`
- `/zh/mortgage-finance/resources`
- `/zh/article/:slug`

## Completed in this stage

- Chinese Knowledge Centre landing page
- Four service-specific Chinese resource hubs
- Traditional Chinese category names, article titles, summaries and search terms
- 25 published resource cards localised for Melbourne/Australian Chinese readers
- Chinese search, empty states, resource counts, card labels and calls to action
- Chinese desktop/mobile navigation and footer links
- Existing English resource hubs and routes preserved
- Shared ResourceHub and GuideCard components remain backward compatible

## Article body scope

Stage 2 localises the resource discovery layer (hub pages, categories, titles, summaries and navigation). Full long-form Chinese article bodies and article FAQs are intentionally reserved for **Phase 4A Stage 3** so professional, legal and finance terminology can be reviewed guide by guide rather than machine translated.

Until Stage 3, each Chinese article overview provides a link to the existing full English guide.

## Local test

```powershell
npm install
npm run dev
```

Open:

```text
http://localhost:5173/zh/knowledge-centre
```

## Build verification

```powershell
npm run build
```
