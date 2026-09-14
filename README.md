# Travel Command Center

A mobile-first, offline-ready dashboard that displays one upcoming or active trip and preserves completed journeys in a browsable archive.

## Repository structure

- `index.html`, `app.js`, `app.css`: reusable dashboard engine
- `data/active-trip.js`: the one trip currently displayed by default
- `data/archive-index.js`: share-safe index of completed trips
- `trip-template/trip.js`: normalized plug-and-play trip template
- `archived-trips/<location>-<dates>/`: immutable final trip packages
- `api/`: destination-independent weather, restaurant, and spa services

## Loading a new trip

Send Dex the newest spreadsheet and any supporting files. Dex will normalize the itinerary, identify gaps, strip private booking information from the public build, update `data/active-trip.js`, validate the complete timeline, and deploy it.

## Privacy

The repository and deployed dashboard contain only share-safe information. Original spreadsheets and any confirmation, ticket, passport, payment, traveler, or loyalty details are private inputs and must not be committed.

## Current state

There is no active trip. China 2026 is preserved as the first archived journey.
