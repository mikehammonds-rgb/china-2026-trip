# Reusable Trip Dashboard Architecture

The dashboard is being migrated from a China-specific static page into a reusable travel dashboard engine.

## Core rule

**UI code is reusable. Trip facts are data.**

A new trip should not require redesigning the dashboard. The normal workflow will be:

1. Collect current trip documents.
2. Convert them into the `TRIP_CONFIG` structure.
3. Validate required fields and dates.
4. Replace/update `trip-config.js`.
5. Deploy.
6. Verify mobile rendering and live integrations.

## Data domains

`trip-config.js` is the source of truth for trip-specific data.

### `app`
Reusable feature flags and visual defaults.

### `trip`
Trip identity, dates, destination, traveler count, currency, time zone and shared-photo link.

### `route`
Ordered destination/city sequence. Each stop gets a stable `id` used by all other modules.

### `days`
Date-indexed day-at-a-glance records. Dates use ISO `YYYY-MM-DD` keys.

### `hotels`
Hotel details keyed by city ID. Reservation IDs must remain private and should never be placed in the public config.

### `support`
Tour operator / local support contacts and links to share-safe documents.

## Planned modules

The reusable renderer will support these optional domains as migration continues:

- `cities`: overview, hero image, daytime plans and nearby must-see items
- `restaurants`: curated destination dining recommendations
- `nightlife`: rooftop bars, lounges and dancing options
- `instagram`: photo spots, directions and photo references
- `flights`: expandable flight segments
- `trains`: expandable rail segments
- `transfers`: drivers, pickups and intercity transfers
- `hotels`: amenities, location and nearby suggestions
- `support`: tour company and emergency/local contacts
- `documents`: share-safe links to contracts and useful trip documents
- `sharedPhotos`: provider-agnostic photo-sharing link

## Live services

Live services remain reusable and independent of destination data:

- **Hungry**: device GPS → Vercel serverless API → Google Places (New)
- Maps links: generated from coordinates or destination names
- Device geolocation: browser permission only; no location is persisted by the dashboard

Secrets such as Google API keys belong only in Vercel environment variables.

## Public vs private data

The dashboard is shareable. Do not publish:

- airline/hotel confirmation numbers
- passport details
- traveler legal names unless explicitly intended
- ticket numbers
- payment information
- private API keys

Those may exist in source travel documents but should be stripped during ingestion.

## New-trip migration checklist

When creating a new trip:

- Set trip title, dates, country/countries, currency and traveler count.
- Replace the route array.
- Build day records from the latest itinerary only.
- Add locked hotels and amenities.
- Add flights, trains and transfers.
- Add curated restaurants and nightlife.
- Generate Instagram/photo spots.
- Set the photo-sharing provider URL if used.
- Add tour-company/support contacts.
- Run schema validation.
- Test Hungry from a mobile device.
- Verify every external link.
- Deploy and smoke-test production.

## Migration status

Phase 1: reusable data layer introduced without replacing the working China UI.

Phase 2: renderer reads identity, dates, route, hotels, day-at-a-glance and support from `TRIP_CONFIG`.

Phase 3: move city content, nightlife, restaurants and Instagram spots out of HTML into data.

Phase 4: reduce `index.html` to a reusable application shell and make new trips data-only deployments.
