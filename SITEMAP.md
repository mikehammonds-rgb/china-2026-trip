# Travel Command Center site map

Read this with `README.md` before changing trip content. The current root app is a reusable, multi-trip dashboard. The older China-specific implementation is preserved only in `archived-trips/` and should not be treated as the root app's runtime architecture.

## Runtime

| Source | Purpose |
| --- | --- |
| `site.config.json` | Exact app identity, release version, and ordered trip source modules |
| `data/archive-index.js` | Share-safe archived-trip cards |
| `data/active-trip.js` | Holiday cruise and Tahoe trip |
| `data/november-cruise.js` | November Wonder birthday cruise |
| `data/upcoming-cruises.js` | January and February 2027 cruises |
| `data/trips.js` | Generated runtime bundle; do not edit directly |
| `index.html` | Loads the bundle and app |
| `app.js` | Renders upcoming cards, chapters, day plans, transport, timeline, and tools |
| `sw.js` | Caches the bundle and core app for offline use |
| `scripts/prepare-release.mjs` | Rebuilds the bundle and synchronizes build versions |
| `scripts/validate-trip.mjs` | Validates every upcoming trip and flags privacy concerns |
| `privacy-baseline.json` | Fingerprints unchanged older price/payment text; new occurrences fail validation |
| `scripts/check-release.mjs` | Runs consistency, validation, syntax, and whitespace checks |
| `.github/workflows/validate.yml` | Repeats the release check on pull requests and `main` pushes |

## Impact checklist

- A trip fact may appear in `days`, `cities[].days`, `phases`, `readiness`, `transport`, and `timeline`. Search the source module and keep all presentations consistent.
- A new trip module belongs in the ordered `tripModules` list in `site.config.json`; never add a separate script tag or offline cache entry for each trip. Rebuild `data/trips.js` instead.
- A content release increments only `site.config.json`'s version by hand. The preparation script updates `index.html`, `app.js`, and `sw.js` together.
- `scripts/check-release.mjs` must pass before publication. Unchanged legacy privacy warnings still require review; new price/payment wording fails validation.
- Verify the exact GitHub commit appears in Vercel's `travel-command-center` production deployment. Then inspect each changed trip card, expanded chapter, day plan, transport/timeline, and offline refresh.
- The Vercel site may be sign-in protected, but the GitHub source is public. Keep private booking information out of both.

## Publication boundary

Publishing this app means the `mikehammonds-rgb/travel-command-center` repository's `main` branch and the Vercel project `travel-command-center`. Club Royale Offer Compass is a separate app and repository. A Git push is not itself proof of deployment: check Vercel's deployment state and the live site.
