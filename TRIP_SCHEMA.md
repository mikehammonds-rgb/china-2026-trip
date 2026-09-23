# Travel Command Center trip schema

The app renders multiple upcoming trips from one registry. Source modules are listed in `site.config.json` and assembled into the generated `data/trips.js`. The earliest trip is shown by default; `?trip=<id>` opens a specific trip. Completed trips can be preserved under `archived-trips/` and listed in `data/archive-index.js`.

## Intake

1. Use the named app and source repository in `README.md`; do not route a cruise automatically to Club Royale.
2. Read private source material only as needed. Reuse facts already verified in the task.
3. Normalize share-safe details to the example in `trip-template/trip.js`. Do not include confirmation numbers, ticket numbers, passport data, payment information, legal names, loyalty numbers, or private document links.
4. Make uncertainty explicit. If the source lacks port-day times, flight details, transfer bookings, or check-in windows, do not guess.
5. Validate all trips and check the live result after publishing.

## Required fields per trip

- `id`: stable lowercase slug, unique across the registry
- `title`
- `start` and `end`: real ISO `YYYY-MM-DD` dates, in order
- `cities`: at least one stop with a unique `id` and a `name`

## Optional fields

- `days`: ISO-dated summaries within the trip range
- `cities[].days`: detailed plans for a stop
- `cities[].hotel`: share-safe hotel details and amenities
- `cities[].highlights`, `nightlife`, and `photoSpots`
- `transport`: flights, trains, transfers, cruises, and stays
- `timeline`: ordered trip events
- `phases` and `readiness`: chapters and planning checklist
- `support`: public or share-safe contacts
- `sharedPhotosUrl` and `destinationLanguage`

Missing optional sections are hidden by the renderer. Keep a trip's date, route, and status consistent across its card, day plans, transport, and timeline.

## Release and archive

After editing a source module, update `site.config.json` if the module list changed, bump its version, run `node scripts/prepare-release.mjs`, and run `node scripts/check-release.mjs`. The bundle, page query versions, app build ID, and offline cache version must agree.

When a trip is complete, preserve its final share-safe package under `archived-trips/<location>-<start>-to-<end>/`, update `data/archive-index.js`, and remove the trip from the upcoming registry in the same release. Do not archive or delete trip data solely because its end date passed without reviewing its final state.
