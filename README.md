# Leader Computers Website Redesign — Concept

CLICK HERE TO VIEW: https://marshallleader.github.io/Leader-Online/



> A redesign concept for [leader-online.com.au](https://leader-online.com.au), built with a channel-first, reseller-only UX model.


---

## What Is This Project?

This is a front-end concept and planning repository for a redesign of the **Leader Computers** website.

Leader is a **channel-exclusive B2B business**:

- No direct consumer sales
- All purchases flow through **1,000+ authorised resellers**

This constraint shapes everything — the UX, UI, copy, and architecture:

| What you'll **never** see | What you'll **always** see |
|---|---|
| "Buy Now" | "Find a Dealer →" CTA |
| "Add to Cart" | "Available via authorised resellers" |
| Cart or checkout flows | Reseller availability messaging |

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
| Framework | Next.js (v14+, App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v3 |
| Components | shadcn/ui + custom components |
| CMS | Sanity or Contentful |
| Maps | Google Maps JavaScript API |
| Forms | React Hook Form + Zod |
| Search | Algolia or Fuse.js |
| Hosting | Vercel |

---

## Running the Project

### Current — MCP Server Stub

```bash
cd mcp-server
node server.js
```

Starts an Express server on `http://localhost:3000`.

> No tests are configured yet — `npm test` intentionally fails.

---

### Future — Next.js App

Once the frontend is scaffolded:

```bash
npm install
npm run dev        # Start development server
npm run build      # Production build
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
  where-to-buy/
  search/
  api/

components/
  ui/
  layout/
  products/
  dealer/
  forms/
  shared/

lib/
  products.ts
  dealers.ts
  sanity.ts
  utils.ts

types/
  product.ts
  dealer.ts
  cms.ts
```

---

## Key Features

### Product Pages
- Static product pages with SKU-based routing
- Reseller-focused messaging throughout

### Dealer Locator
- ISR-enabled with 24h revalidation
- Powered by Google Maps JavaScript API

### Search
- Categorised results
- Optional Algolia integration

### Forms & API
- Contact, support, and reseller inquiry forms
- Backend routes for form submissions

---

## Architecture Principles

| Principle | Detail |
|---|---|
| **Static-first** | Product, About, and Warranty pages are pre-rendered |
| **ISR** | Dealer locator updates periodically (Incremental Static Regeneration) |
| **No eCommerce** | No cart, checkout, or direct purchasing — ever |
| **Channel-first UX** | Users are always routed to authorised dealers |

---

## Naming Conventions

| Type | Convention | Example |
|---|---|---|
| Components | PascalCase | `ProductCard.tsx` |
| Hooks | camelCase prefix | `useSomething.ts` |
| Pages | Next.js convention | `page.tsx` |
| Unit tests | Co-located | `*.test.tsx` |
| E2E tests | Dedicated folder | `tests/e2e/` |

---

## Reference Material

- `site-content.md` — full site scrape
- Previous design specs — recoverable via git history
- `docs/` — architecture, decisions, product, UX/UI, roadmap