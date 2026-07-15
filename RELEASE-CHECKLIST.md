# Origin Bilingual Website — Stage 6F Release Checklist

## Automated

- [ ] `npm install` completes
- [ ] `npm run release:check` passes
- [ ] production build completes

## English routes

- [ ] `/`
- [ ] `/buyer-advisory`
- [ ] `/property-management`
- [ ] `/mortgage-finance`
- [ ] `/conveyancing`
- [ ] `/tools`
- [ ] `/book-consultation`

## Traditional Chinese routes

- [ ] `/zh`
- [ ] `/zh/buyer-advisory`
- [ ] `/zh/property-management`
- [ ] `/zh/mortgage-finance`
- [ ] `/zh/conveyancing`
- [ ] `/zh/tools`
- [ ] `/zh/book-consultation`

## SEO

- [ ] title and description are correct
- [ ] canonical matches current language URL
- [ ] `en-AU`, `zh-Hant-AU` and `x-default` alternates appear
- [ ] Open Graph and Twitter metadata appear
- [ ] JSON-LD structured data appears
- [ ] `/sitemap.xml` loads
- [ ] `/robots.txt` loads

## Functional regression

- [ ] Home Buying Planner
- [ ] Property Management Readiness Checklist
- [ ] Investment Yield Calculator
- [ ] Buyer Settlement Tracker
- [ ] Seller Settlement Tracker
- [ ] cookie consent
- [ ] contact and consultation actions
- [ ] mobile navigation
- [ ] direct refresh on nested URLs

## Release

- [ ] commit message recorded
- [ ] GitHub push completed
- [ ] Vercel production deployment succeeded
- [ ] live-domain smoke test passed
