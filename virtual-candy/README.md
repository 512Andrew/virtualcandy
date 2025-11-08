# VirtualCandy

VirtualCandy.com is a hybrid content + affiliate shop with an interactive "Candyverse" modal that maps flavors like planets → constellations → products. The site is static-first and progressively enhanced; affiliate links open on partner sites.

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

## Tech Stack

- **Framework**: Next.js (App Router) + TypeScript + Tailwind CSS 4.x
- **Style**: Clean, accessible, minimal motion; modern cards, rounded-2xl, subtle shadows
- **Node**: 18+
- **Package Manager**: pnpm

## Key Features

### 🌟 Interactive Candyverse

- Planet-based navigation for candy categories (Chocolate, Gummies, Retro, Sour)
- Constellation drill-down for product subcategories
- Hash-based deep linking: `#candyverse?planet=gummies&view=all`

### 🔧 Development Tools

- **Dev Panel**: Add `?dev=1` to enable development tests and data integrity checks
- **Keyboard Shortcuts**: Add `?keys=1` to enable hotkeys (G=Gummies, C=Chocolate, R=Retro, S=Sour)
- **Link Sharing**: Copy links preserve query parameters

### ♿ Accessibility

- Keyboard navigation support
- ARIA labels on interactive elements
- Focus management for modals
- Never hijacks keys when user is typing in inputs

## Project Structure

```text
src/
├── app/
│   ├── page.tsx              # Main homepage
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── data/
│   └── candyverse.ts         # Single source of truth for product data
├── lib/
│   ├── helpers.ts            # Pure helper functions
│   ├── dev-tests.ts          # Development testing utilities
│   └── routing.ts            # Hash-based routing utilities
└── types/
    └── index.ts              # TypeScript type definitions
```

## Data Model

### Core Types

- **Product**: `{ id, name, vendor, price, url, image, note? }`
- **Constellation**: Collection of products within a planet
- **Planet**: Main category with multiple constellations

### Helper Functions (Pure)

- `getFeaturedProducts()` - Returns ≤ 8 featured products
- `aggregatePlanetProducts(planetId)` - Flattened products from all constellations
- `parseCandyverseHash(hash)` - Parse deep-link URLs

## URL Conventions

### Deep Links (Hash-based)

- `#candyverse` - Open Candyverse modal
- `#candyverse?planet=gummies` - Navigate to Gummies planet
- `#candyverse?planet=chocolate&constellation=dark` - Navigate to specific constellation
- `#candyverse?planet=gummies&view=all` - View all products in planet

### Query Parameters

- `?dev=1` - Enable development testing panel
- `?keys=1` - Enable keyboard shortcuts
- These are preserved in "Copy Link" functionality

## Development Guidelines

### Data Integrity

- Single source of truth: `CANDYVERSE_DATA` in `/data/candyverse.ts`
- Never duplicate helper functions or constants
- All helpers must be pure (non-mutating)
- Run dev tests with `?dev=1` to catch issues

### Component Patterns

- Keep components small and focused
- Use semantic HTML and proper ARIA labels
- Prefer React state over global state
- Lazy-load heavy assets

### Testing

- Dev tests run in-browser (no test runner required)
- Tests validate: no duplicate IDs, data integrity, helper purity
- Add new DevTest items instead of modifying existing ones

## Affiliate Policy

- No secrets in code
- Affiliate tags via environment variables
- Clear disclosure in UI copy
- All affiliate links open on partner sites

## Deployment

The site is static-first:

- Most pages can be pre-rendered
- Progressive enhancement for interactive features
- Optimized for performance and SEO

---

Built with ❤️ for candy lovers and tech geeks alike.
