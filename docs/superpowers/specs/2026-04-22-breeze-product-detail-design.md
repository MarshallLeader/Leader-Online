# Design Spec: Breeze Landing Page in Product Detail Tab

**Date:** 2026-04-22  
**Status:** Approved

---

## Summary

Embed the Breeze landing page (`Breeze/src/App.tsx`) into the "Product details" tab of the SCE4-B1-C4P product page. No other products or pages are affected.

---

## Scope

- **In scope:** The "Product details" tab content for SKU `SCE4-B1-C4P` only
- **Out of scope:** All other products, the specs tab, the header/breadcrumb/price panel, navigation, footer, and every other page

---

## Implementation

### Component: `BreezeProductDetail`

A new component added directly in `App.tsx`, extracted from `Breeze/src/App.tsx`. Contains all 5 sections:

1. **Hero** — "SPEED IN MOTION." headline, 1.2kg / 14hrs / 14" stats, animated laptop mockup
2. **Ring Light Demo** — Bezel light array schematic with rotating dashed ring, LED labels
3. **Architecture Schematic** — "Pure Power" section with floating CPU chip board visual
4. **Spec Grid ("DNA")** — 6-card grid: Processor, Display, Build, Battery, Ports, I/O
5. **Use Cases ("Breeze in Life")** — 4 persona cards: Nomad, Library Titan, Zoom Master, Daily Driver

### Adaptations from source

| Source behaviour | Embedded behaviour | Reason |
|---|---|---|
| `useScroll` / `useSpring` parallax on `containerRef` | Removed; hero renders statically | Scroll offsets are wrong mid-page |
| `heroScale`, `heroOpacity`, `laptopRotate`, `backgroundY` transforms | Removed | Depend on removed scroll hooks |
| `position: fixed` background orbs & particles | Kept | Work correctly in any context |
| `whileInView` animations on all sections | Kept | Fire on element visibility, not scroll |
| Font imports via inline `<style>` tag | Kept | Self-contained, no conflicts |
| Outer `ref={containerRef}` wrapper div | Removed | No longer needed without scroll tracking |

### Conditional render (App.tsx ~line 3363)

```tsx
// Before
<ProductJourney product={displayProduct} />

// After
{displayProduct.sku === 'SCE4-B1-C4P'
  ? <BreezeProductDetail />
  : <ProductJourney product={displayProduct} />
}
```

### Theming

The `BreezeProductDetail` component retains its dark theme (`bg-[#020617]`, sky-blue accents). It renders as a visually distinct dark block below the white product header/price panel. This contrast is intentional — it gives the Breeze its own identity on the page.

---

## Constraints

- No new files created — component added inline in `App.tsx`
- No imports added — `motion`, `lucide-react` are already installed
- No changes to any other component, route, or product
