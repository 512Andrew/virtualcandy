# Virtual Candy Studio preview

Built September 13, 2026 on studio/launch-draft. Existing Candyverse source/components and archive tags remain available. This draft replaces the homepage only on this branch.

## Included
- Responsive studio homepage, service descriptions, about section and FAQs.
- Two foundation packages, eight optional additions and four care choices.
- Live project/monthly/first-year estimates with starting-price disclosure.
- Email draft preparation to info@virtualcandy.com and downloadable plain-text brief.
- Labeled illustrative work studies and original Candyverse deploy link.
- Preview metadata marked noindex/nofollow.

## Deployment
Uses the existing Next.js package and npm lockfile. Static export is in out/. Run npm ci, npm run build, then deploy out/ as a draft. The existing Netlify project has stale remote base/plugin settings, so this draft uses a local build followed by a no-build upload. Production settings were not changed.

## Before public announcement
- Replace illustrative studies with owner-approved client work and verified live links.
- For a production launch, remove preview noindex and set final canonical metadata.
- The contact form opens the visitor's email app; it is NOT server-side form delivery. Visitors press Send themselves. Download fallback is provided. Mailbox deliverability has not been tested.
- Payment collection and automatic subscriptions are intentionally deferred pending provider selection.
- Confirm final customer agreement, maintenance terms and privacy wording before checkout activation.

## Verification
- Next.js build and TypeScript completed successfully before static export; final static build separately checked during deployment.
- Targeted ESLint passed for homepage and layout.
- Browser: Business + booking + Care produced $1,650 starting project, $129/month, $3,198 first-year studio fees.
- Reset restored Launch, no add-ons and no care ($750 total).
- Mobile navigation worked; no horizontal page overflow observed at 390px or 1440px viewport.
- Download action reported a prepared local brief, with no automatic send.
- FAQ care answer expanded correctly.

## September 14 update
- Replaced abstract hero geometry with original generated pink-glass brain/Tesla-coil artwork, preserving the tagline and wildcard accents elsewhere.
- Added pixel-style green-on-green vc* favicon.
- Added Auto/Light/Dark appearance selection, system-change subscription, pre-render theme initialization and saved visitor override.
- Replaced illustrative work studies with all seven owner-requested client links. Names checked against destination page titles; no unverified project scope or outcome claims added.
- Build and targeted lint passed. Hosted browser checks: image loads, seven client links, dark override persists after reload, Auto matches system dark setting, mobile width has no horizontal overflow.

## Palette and interaction refinement
- Deepened lime accents and green client backgrounds; preserved the periodic-table layout.
- Matched hero caption to the lower artwork index, with transparent background.
- Added a single 650ms electric-green card highlight on hover/keyboard focus, disabled with reduced motion.
- Static build and diff checks passed. Hosted checks confirmed transparent caption, matching 11px typography, single animation iteration, and no overflow at 797px/390px. Light and dark themes visually checked.
- Draft: https://6aa78ba3dace99b073262387--melodious-squirrel-f66679.netlify.app
