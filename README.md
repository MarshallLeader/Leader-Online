# Leader Computers Website Redesign — Concept

CLICK HERE TO VIEW: https://marshallleader.github.io/Leader-Online/



> A redesign concept for leader-online.com.au, built around a reseller-driven commerce model where users browse products, add to a cart for comparison and intent-building, and are then routed to authorised resellers to complete the purchase.


---

## What Is This Project?

This is a front-end concept and planning repository for a redesign of the **Leader Computers** website.

Leader is a **channel-exclusive B2B business**:

- No direct consumer sales
- All purchases flow through **1,000+ authorised resellers**
- The website acts as a product discovery and purchase-intent platform

This redesign introduces a structured shopping experience that supports reseller conversion without violating the channel model.
It shapes everything — the UX, UI, copy, and architecture:

Cart behaviour is intent-based, not transactional.

Prices are formatted as: `RRP $X,XXX`

External portals (support, reseller) are **linked**, not embedded.

---

## Current Status

> **Early-stage concept / planning**

- No production frontend yet
- Architecture and design system defined
- Ready for Next.js scaffolding

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend/API | Next.js API Routes (App Router) | 
| Framework | Next.js (v14+, App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v3 |
| Components | shadcn/ui + custom components |
| Database | Postgres |
| ORM | Prisma |
| CMS (Headless) | Sanity
| Maps | Google Maps JavaScript API |
| Forms | React Hook Form + Zod |
| Search | Algolia |
| Hosting | Vercel |

---

### Future — Next.js App

Once the frontend is scaffolded:

```bash
npm install
npm run dev        # Start development server
npm run build      # Producmsction build
npm run lint       # Run ESLint
npm run test       # Run unit + component tests (Vitest)
```

**End-to-End Testing (Playwright)**

```bash
npx playwright test
npx playwright test tests/e2e/dealer-locator.spec.ts
```

---

## Directory Structure

```
app/
  products/{category}/{sku}/
  cart/                     # intent-based basket (no checkout)
  search/
  api/

components/
  ui/
  layout/
  products/
  cart/
  dealer/
  forms/
  shared/

lib/
  products.ts
  dealers.ts
  cart.ts
  sanity.ts
  utils.ts

types/
  product.ts
  dealer.ts
  cart.ts
  cms.ts
```

---

## Key Features

### Product Pages
- Full product browsing experience
- SKU-based dynamic routing
- RRP display with reseller messaging
- “Add to Cart” builds intent bundle (not purchase)

### Cart (Intent Basket)
Multi-product comparison and selection
Generates a reseller-ready summary
No payments, no checkout
CTA: “Proceed to Reseller”

### Reseller Handoff Flow
Redirect to nearest reseller based off customer location
Supports lead generation and conversion tracking

### Dealer Locator
ISR-enabled with 24h revalidation
Powered by Google Maps JavaScript API

### Search
Categorised product search
Optional Algolia integration

### Forms & API
Support/contact submission endpoints

---

## Architecture Principles
| Principle                  | Detail                                             |
| -------------------------- | -------------------------------------------------- |
| **Static-first**           | Product and informational pages are pre-rendered   |
| **Intent-based commerce**  | Cart captures interest, not payment                |
| **Reseller-first routing** | All conversion paths lead to authorised dealers    |
| **No direct checkout**     | Zero payment processing in frontend                |
| **Channel integrity**      | Maintains manufacturer → reseller → customer model |

---

## Naming Conventions

| Type       | Convention         | Example           |
| ---------- | ------------------ | ----------------- |
| Components | PascalCase         | `ProductCard.tsx` |
| Hooks      | camelCase prefix   | `useCart.ts`      |
| Pages      | Next.js App Router | `page.tsx`        |
| Unit tests | Co-located         | `*.test.tsx`      |
| E2E tests  | Dedicated folder   | `tests/e2e/`      |

---

## Reference Material

- `site-content.md` — full site scrape
- Previous design specs — recoverable via git history
- `docs/` — architecture, decisions, product, UX/UI, roadmap