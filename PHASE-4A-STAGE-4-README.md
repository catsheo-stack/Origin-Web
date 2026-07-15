# Phase 4A — Stage 4: Chinese Questionnaires & Forms

This package extends the verified Stage 3 bilingual build.

## Added
- Full Traditional Chinese buyer advisory questionnaire
- Full Traditional Chinese mortgage and finance questionnaire
- Full Traditional Chinese conveyancing questionnaire
- Full Traditional Chinese property-owner / landlord questionnaire
- Chinese labels, option text, placeholders, validation, consent and success/error messages
- Chinese thank-you routing after successful submission
- Existing English form payload values preserved where downstream workflows depend on them
- Existing English pages, Base44 entities, Hermes routes and formulas left unchanged

## Test routes
- `/zh/buyer-advisory` then select the main CTA
- `/zh/mortgage-finance` then select the main CTA
- `/zh/conveyancing` then select the main CTA
- `/zh/property-management` then select the main CTA
- `/zh/contact`

## Important
The buyer questionnaire uses `VITE_WEB3FORMS_ACCESS_KEY`, matching the existing English form. The other three questionnaires use the existing Base44 Lead entity.
