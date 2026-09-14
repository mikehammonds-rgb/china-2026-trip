# Travel Command Center trip schema

The application has one reusable renderer and one active trip at a time. Trip facts live in `data/active-trip.js`; completed trips live in dated folders under `archived-trips/`.

## Intake workflow

1. Receive the newest spreadsheet plus any supporting notes or documents.
2. Treat every source file as private input.
3. Normalize share-safe fields into the structure shown in `trip-template/trip.js`.
4. Exclude confirmation numbers, ticket numbers, passport data, payment information, traveler legal names, loyalty numbers, and private document links.
5. Validate dates, stop order, hotel nights, and transportation continuity.
6. Replace `data/active-trip.js`, increment the service-worker build, test mobile/offline behavior, and deploy.

The source spreadsheet can use any reasonable organization. Dex maps its fields into the normalized schema; the dashboard does not ingest private spreadsheets in the browser.

## Required active-trip fields

- `id`: stable lowercase slug such as `italy-2027`
- `title`
- `start` and `end`: ISO `YYYY-MM-DD`
- `cities`: at least one city with a stable `id`, name, and dates

## Optional domains

- `days`: date-indexed daily summaries
- `cities[].days`: detailed plans for each stop
- `cities[].hotel`: share-safe hotel details and amenities
- `cities[].highlights`, `nightlife`, and `photoSpots`
- `transport`: flights, trains, transfers, rental cars, cruises, and stays
- `timeline`: end-to-end ordered events
- `support`: emergency, guide, tour operator, or local contacts
- `sharedPhotosUrl`
- `destinationLanguage`

Missing optional domains are hidden automatically.

## Archive workflow

When a trip ends:

1. Create `archived-trips/<location>-<start>-to-<end>/`.
2. Preserve the final deployed trip package in that folder.
3. Add its share-safe metadata to `data/archive-index.js`.
4. Create an immutable Git tag named `trip/<trip-id>-final`.
5. Set `data/active-trip.js` back to `null` until the next trip is ready.

Archive folders are public and share-safe. Private source spreadsheets and booking identifiers never enter Git or the deployed site.
