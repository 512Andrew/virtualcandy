# Virtual Candy Studio launch candidate

Virtual Candy Studio was published September 16, 2026. The original Candyverse remains available through its archived deployment and repository archives.

## Included

- Per-page titles, descriptions and canonical URLs on https://www.virtualcandy.com.
- Organization, website, services and FAQ structured data; FAQ answers share the same source as the visible page.
- Sitemap, robots rules, PNG social image and matching SVG/ICO favicon.
- Privacy notice, service terms and accessibility statement linked in the footer.
- Dark-mode focus/skip-link contrast, required-field labels, reduced motion, semantic headings and no-JavaScript inquiry fallback. Form controls stay disabled until the local handler is ready, preventing accidental GET submission of personal information.
- Static security headers; no advertising or analytics scripts introduced. CSP permits inline scripts/styles because the Next static export uses them, while limiting external resources and denying framing.
- Dependency security updates, including Next 16.3.5. npm audit reported zero known vulnerabilities after the update.

## Release procedure

1. Confirm receipt at info@virtualcandy.com using the intended mailbox. MX routing exists (smtp.google.com); no email has been sent or mailbox receipt tested in this task.
2. Build the indexable release locally: `SITE_INDEXABLE=true npm run build`.
3. Run `node scripts/verify-export.mjs --production` and check the full change before publishing.
4. When publishing is authorized, run `npx netlify-cli deploy --no-build --dir out --prod` from this checkout. Do not promote a noindex preview artifact to production.
5. Confirm the custom domain, HTTPS, four page routes, robots.txt, sitemap.xml, social image Content-Type and inquiry flow. Register the domain with Google Search Console and Bing Webmaster Tools, then submit https://www.virtualcandy.com/sitemap.xml. Ownership verification needs the relevant accounts; it is not completed here.
6. Existing remote Netlify build settings still contain the old frontend base/plugins. This release deliberately uses a verified local static export. Before enabling continuous deployment, reconcile those remote settings and use the root build directory, out publish directory and SITE_INDEXABLE=true only for production context.

For a draft: `npm run build`, `node scripts/verify-export.mjs`, then `npx netlify-cli deploy --no-build --dir out`. Builds default to noindex/disallow.

## Product and policy boundaries

The form now submits directly through Netlify Forms and retains a downloadable brief fallback. Payments and subscription enrollment remain deferred. The policy text reflects this implementation and uses the Studio name without inventing a legal entity, address or registration. A written project agreement must identify the contracting party and cover refunds, cancellations, ownership and any recurring billing before those transactions begin. No claim of legal certification or complete WCAG conformance is made.

## Guidance consulted

- [Google guidance for generative AI search](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide): ordinary search fundamentals still apply; no special AEO schema or guaranteed inclusion.
- [Google structured-data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies): markup describes visible content; it does not guarantee rich results.
- [MDN reduced-motion guidance](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Using_for_accessibility).
- [Texas Attorney General privacy overview](https://alt-dev.texasattorneygeneral.gov/consumer-protection/file-consumer-complaint/consumer-privacy-rights/texas-data-privacy-and-security-act) and [Netlify privacy policy](https://www.netlify.com/privacy/). These inform the notice; they do not establish which laws apply to this business.

## Verification completed

- Production-mode build: index/follow, Allow / and all four canonical pages verified. Default draft build: noindex/nofollow and Disallow / verified.
- Next build/TypeScript, targeted ESLint and export verification script passed.
- Hosted routes, PNG share image MIME type and security headers verified.
- Browser: mobile menu at 390px, no horizontal overflow, policy navigation, dark skip-link contrast, form enablement after hydration, and estimate regression ($1,650 project + $129/month = $3,198 first year) checked. No complete assistive-technology certification is implied.
- Final launch-candidate preview: https://6aa79015f0b721deea316af9--melodious-squirrel-f66679.netlify.app

## September 16, 2026 production release

- Owner confirmed info@virtualcandy.com receives email.
- Published commit eaab94d as production deploy 6aab1c300777c96a91702bfa.
- Live: https://www.virtualcandy.com
- Found GoDaddy-authoritative DNS still parked. Updated only A @ from Parked to 75.2.60.5 and CNAME www from virtualcandy.com to melodious-squirrel-f66679.netlify.app. Nameservers and Google Workspace MX/SPF/DKIM records preserved.
- Added virtualcandy.com as a Netlify domain alias. Renewed the expired managed TLS certificate for apex and www; issued certificate expires December 15, 2026.
- Verified public www HTTPS, all four page routes, index/follow metadata, robots allow rule, sitemap, PNG share image and enabled inquiry form. Apex routing at Netlify redirects to www; recursive caches may temporarily retain the previous parking records.
- Search-console registration/submission and payment collection remain pending.

## September 20, 2026 — direct inquiry delivery

- Enabled Netlify HTML form detection (processing_settings.ignore_html_forms=false).
- Registered studio-inquiry, form ID 6ab047828849770008a5c9bd, with a hidden honeypot and all contact/estimate fields. Static detection file: public/__forms.html.
- Email submission notification ID 6ab047886013221640830aae targets info@virtualcandy.com; subject: New Virtual Candy Studio inquiry.
- Browser test VC-NF-20260920 returned success and was verified in Netlify's accepted submissions, including Business + booking + Care totals of $1,650, $129/month and $3,198 first year. Submission ID 6ab047a4d180bf1acda73b50 retained as a clearly labeled test. Inbox receipt has not been independently confirmed.
- Updated public privacy/accessibility wording, preserved local-download fallback and added pending/error handling. Production deploy: 6ab047c2b83e9e68d69c7c01.
- Build, TypeScript, targeted ESLint, export verification and live form appearance passed.
