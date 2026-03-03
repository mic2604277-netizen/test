# JSON Places Live Map

A simple web app that lets you upload a JSON file of places and shows each valid place on a live OpenStreetMap map.

## Features
- Upload a `.json` file from your computer.
- Supports either:
  - a top-level array of place objects, or
  - `{ "places": [ ... ] }` or `{ "Table": [ ... ] }` format.
- Accepts multiple coordinate key styles:
  - `latitude` + `longitude`
  - `lat` + `lng`
  - `lat` + `lon`
  - `Lat` + `Lng`
- Renders map markers in batches to keep the UI responsive for large files.
- Caps rendering to the first 10,000 markers and 500 list rows (full file is still scanned for valid coordinates).
- Shows all available details in marker popups and in the left panel list.

## Run locally
Because this app loads local files and external map tiles, run it via a local server:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## JSON example
See `sample-places.json` for a working example.


## Large file behavior
- Large files are parsed in a background Web Worker when possible, with automatic fallback to main-thread parsing if needed.
- Status text reports total valid records found and whether rendering limits were applied.
