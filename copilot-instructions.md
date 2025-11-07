# Copilot Instructions — VirtualCandy

## Project purpose
VirtualCandy.com is a hybrid content + affiliate shop with an interactive "Candyverse" modal (planets → constellations → products). The site is static-first, progressively enhanced; affiliate links open on partner sites.

## Tech & style
- Framework: Next.js (App Router) + TypeScript + Tailwind
- Style: clean, accessible, minimal motion; modern cards, rounded-2xl, subtle shadows
- Formatting: Prettier; ESLint for JS/TS; Tailwind class order is flexible but keep readable groupings
- Node: 18+; package manager: pnpm

## Non-goals
- No backend monolith; avoid server-heavy SSR unless needed
- No complex state libs (Redux, MobX); prefer React state + helpers
- No secret keys or affiliate IDs hardcoded in code or data files

## File boundaries & invariants
- **Single source of truth for product data**: `CANDYVERSE_DATA` (later, migrate to `/data/candyverse.json`)
- Helpers must be **pure** and defined **once**:
  - `getFeaturedFrom(data)` → `Product[]` (≤ 8)
  - `getFeaturedProducts()` → `Product[]` (pulls from `CANDYVERSE_DATA`)
  - `aggregatePlanetProducts(planetId)` → flattened `Product[]`
- **Do NOT re-declare**: `CANDYVERSE_DATA`, `getFeaturedProducts`, `Product` type
- Keep types co-located with helpers or in a shared `types.ts` only if useful

## URL & UX contracts
- Deep links use hash only:  
  `#candyverse?planet=<id>&view=all` or `&constellation=<id>`
- Dev panel is opt-in: `?dev=1`
- Hotkeys are opt-in: `?keys=1`  
  - `G` → Gummies (View All)  
  - `C` → Chocolate (last tab)  
  - `R` → Retro (last tab)  
  - `S` → Sour (last tab)
- Modal keeps URL hash in sync and resets to `#candyverse` on close
- "Copy link" must preserve query params (`?dev=1`, `?keys=1`, etc.)

## Accessibility & performance
- Keyboard: never hijack keys in inputs/contentEditable; ignore with `alt/meta/ctrl`
- Buttons/links have visible focus and aria labels where relevant
- Lazy-load heavy assets; keep images/CDN outside repo (use LFS if needed)
- Avoid re-render loops; use `useMemo/useEffect` dependency arrays correctly

## Testing & DevTests
- Keep the in-browser **DevTests** panel active under `?dev=1`:
  - no duplicate planet IDs
  - constellations expose `products[]`
  - products contain `id/name/url` minimally
  - `getFeaturedProducts()` returns ≤ 8
  - aggregate "View All" equals per-constellation sum
  - deep-link parser basics pass
- If adding helpers, add a new DevTest item instead of changing existing ones

## Data model rules
- Planets have unique `id`, ≥1 constellation
- Constellations have unique `id` (per planet) and `products[]`
- `Product`: `{ id, name, vendor, price, url, image, note? }`
- Never mutate `CANDYVERSE_DATA` in helpers

## Allowed libraries & patterns
- React + Next.js only; Tailwind for styles; no CSS-in-JS
- Optional: Framer Motion (light), Three.js later for Candyverse scene
- Prefer small, local utilities over adding deps

## Security & affiliate policy
- No secrets in code. Affiliate tags via env vars (e.g., `AFFIL_AMAZON_TAG`)
- Disclose affiliate relationships in UI copy (already present)

## Commit/PR conventions
- Branches: `feat/*`, `fix/*`, `refactor/*`, `chore/*`, `docs/*`
- PRs should explain the "why," screenshots for UI, and list any changed invariants
- Don't merge if DevTests regress

## Things to avoid (important)
- Duplicating constants/helpers/types
- Introducing SSR for pages that can be static
- Global key listeners without opt-in guards
- Heavy dependencies for trivial tasks
- Writing to global/window state except URL hash sync

## Examples Copilot should follow
- When adding a tab, compute badge counts from data, don't hardcode
- When adding a helper, write it pure + add DevTest
- When changing modal behavior, keep deep-link + copy-link contracts
