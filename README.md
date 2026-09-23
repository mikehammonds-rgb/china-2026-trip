# Travel Command Center

A mobile-first, offline-ready dashboard for **any kind of trip**. Upcoming trips appear together; completed journeys can be preserved in the archive. This is not the Club Royale Offer Compass, which is a separate cruise-offers app.

## Confirm the destination before editing

- App: **Travel Command Center**
- Source: `mikehammonds-rgb/travel-command-center`
- Vercel project: `travel-command-center`
- Production: https://mike-travel-command-center.vercel.app

These identifiers are also recorded in `site.config.json`. If a request names another app, stop and locate that app first. Do not infer the target merely because the trip is a cruise. A follow-up such as “deploy” applies only to the app named and edited in the current task.

## Current trips and files

- November 2026 Wonder birthday cruise: `data/november-cruise.js`
- December 2026 holiday cruise + Tahoe: `data/active-trip.js`
- January and February 2027 cruises: `data/upcoming-cruises.js`
- China 2026: `archived-trips/china-2026-08-30-to-2026-09-13/`

`site.config.json` lists the ordered source modules and one release version. `scripts/prepare-release.mjs` assembles them into `data/trips.js` and synchronizes the page and service-worker versions. Edit the source modules, not the generated bundle. `app.js` renders the trips; `sw.js` caches the bundle for offline use.

## Add or update a trip

1. Confirm the app identity above and read `SITEMAP.md` and `TRIP_SCHEMA.md`.
2. Reuse already-verified source details when available. Treat receipts, email, spreadsheets, and booking records as private inputs.
3. Edit an existing source module, or add a new module and list it in `site.config.json`. Preserve other trips and use a stable, unique trip ID.
4. Include only share-safe itinerary and planning details. The owner's explicit exception permits verified cruise traveler names and reservation numbers in `publicTravelParty`; do not commit other booking identifiers, loyalty IDs, private links, or payment details. Mark unknown plans as unknown instead of inventing them.
5. Increment `version` in `site.config.json`, then run `node scripts/prepare-release.mjs` and `node scripts/check-release.mjs`. GitHub Actions repeats the release check on pull requests and `main` pushes.
6. Compare the source tree with the current GitHub `main` before publishing. Publish one atomic commit; never force-push over newer work. The connected GitHub account can be used if terminal Git credentials lack write access.
7. Confirm Vercel deployed that exact commit to the **travel-command-center** project, then check the live trip cards, expanded details, timeline, and offline refresh.

## Privacy note

The repository is public even when a deployment requires Vercel sign-in. The validator blocks obvious private field names and identifier-shaped text, except the owner's explicit `publicTravelParty` cruise-name and reservation-number disclosure. Existing price/payment wording is fingerprinted in `privacy-baseline.json` and reported as warnings; new or changed wording of that kind fails validation. The baseline is not an endorsement of those older details. It cannot prove that every free-text value is share-safe, so review warnings before publishing and do not add more without an explicit privacy decision.
