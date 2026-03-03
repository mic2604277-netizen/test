# JSON Places Live Map

A simple web app that lets you upload a JSON file of places and shows each valid place on a live OpenStreetMap map.

## Features
- Upload a `.json` file from your computer.
- Supports either:
  - a top-level array of place objects, or
  - `{ "places": [ ... ] }` format.
- Accepts multiple coordinate key styles:
  - `latitude` + `longitude`
  - `lat` + `lng`
  - `lat` + `lon`
- Renders a marker for each valid place.
- Shows all available details in marker popups and in the left panel list.

## Run locally
Because this app loads local files and external map tiles, run it via a local server:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## JSON example
See `sample-places.json` for a working example.
