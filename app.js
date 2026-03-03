const map = L.map("map").setView([20.5937, 78.9629], 4);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const fileInput = document.getElementById("jsonFile");
const statusBox = document.getElementById("status");
const placesList = document.getElementById("placesList");

const MAX_MARKERS = 10000;
const MAX_LIST_ITEMS = 500;
const RENDER_CHUNK_SIZE = 250;
const COORDINATE_KEYS = ["latitude", "lat", "Lat", "longitude", "lng", "Lng", "lon", "Lon", "long", "Long"];

let markerLayer = L.layerGroup().addTo(map);

fileInput.addEventListener("change", async (event) => {
  const [file] = event.target.files;

  if (!file) {
    setStatus("Waiting for a file…");
    return;
  }

  markerLayer.clearLayers();
  placesList.innerHTML = "";
  setStatus("Reading file…");

  try {
    const places = await loadPlacesFromFile(file);

    if (!Array.isArray(places)) {
      throw new Error("JSON must be an array or contain a top-level 'places' or 'Table' array.");
    }

    await renderPlaces(places);
  } catch (error) {
    markerLayer.clearLayers();
    placesList.innerHTML = "";
    setStatus(`Could not load file: ${error.message}`, true);
  }
});

async function loadPlacesFromFile(file) {
  const text = await file.text();

  if (window.Worker) {
    return parseJsonInWorker(text);
  }

  const data = JSON.parse(text);
  return normalizePlacesPayload(data);
}

function parseJsonInWorker(text) {
  return new Promise((resolve, reject) => {
    const workerScript = `
      self.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          const places = Array.isArray(data) ? data : (data.places ?? data.table ?? data.Table);
          self.postMessage({ ok: true, places });
        } catch (error) {
          self.postMessage({ ok: false, message: error.message });
        }
      };
    `;

    const blob = new Blob([workerScript], { type: "application/javascript" });
    const workerUrl = URL.createObjectURL(blob);
    const worker = new Worker(workerUrl);

    worker.onmessage = (event) => {
      URL.revokeObjectURL(workerUrl);
      worker.terminate();

      if (event.data.ok) {
        resolve(event.data.places);
      } else {
        reject(new Error(event.data.message));
      }
    };

    worker.onerror = () => {
      URL.revokeObjectURL(workerUrl);
      worker.terminate();
      reject(new Error("Failed to parse JSON in worker."));
    };

    worker.postMessage(text);
  });
}

function normalizePlacesPayload(data) {
  return Array.isArray(data) ? data : (data.places ?? data.table ?? data.Table);
}

async function renderPlaces(places) {
  markerLayer.clearLayers();
  placesList.innerHTML = "";

  const bounds = [];
  let validCount = 0;
  let renderedMarkers = 0;
  let renderedListItems = 0;

  for (let start = 0; start < places.length; start += RENDER_CHUNK_SIZE) {
    const chunk = places.slice(start, start + RENDER_CHUNK_SIZE);

    chunk.forEach((place, offset) => {
      const lat = toNumber(place.latitude ?? place.lat ?? place.Lat);
      const lng = toNumber(place.longitude ?? place.lng ?? place.lon ?? place.long ?? place.Lng ?? place.Lon ?? place.Long);

      if (Number.isNaN(lat) || Number.isNaN(lng)) {
        return;
      }

      validCount += 1;

      if (renderedMarkers < MAX_MARKERS) {
        bounds.push([lat, lng]);
        const marker = L.circleMarker([lat, lng], {
          radius: 5,
          weight: 1,
          fillOpacity: 0.8,
        }).addTo(markerLayer);
        marker.bindPopup(buildPopup(place, lat, lng));
        renderedMarkers += 1;
      }

      if (renderedListItems < MAX_LIST_ITEMS) {
        const item = document.createElement("li");
        item.innerHTML = buildListItem(place, lat, lng, start + offset + 1);
        placesList.appendChild(item);
        renderedListItems += 1;
      }
    });

    setStatus(`Processing records… ${Math.min(start + RENDER_CHUNK_SIZE, places.length)} / ${places.length}`);
    await nextFrame();
  }

  if (!validCount) {
    setStatus("No valid places found. Add latitude/longitude, lat/lng, or Lat/Lng to each item.", true);
    return;
  }

  if (bounds.length === 1) {
    map.setView(bounds[0], 11);
  } else if (bounds.length > 1) {
    map.fitBounds(bounds, { padding: [30, 30] });
  }

  const markerLimitNote = validCount > MAX_MARKERS
    ? ` Showing first ${MAX_MARKERS.toLocaleString()} markers.`
    : "";
  const listLimitNote = validCount > MAX_LIST_ITEMS
    ? ` List is capped at ${MAX_LIST_ITEMS.toLocaleString()} rows.`
    : "";

  setStatus(
    `Loaded ${validCount.toLocaleString()} valid place${validCount > 1 ? "s" : ""}.${markerLimitNote}${listLimitNote}`
  );
}

function nextFrame() {
  return new Promise((resolve) => window.requestAnimationFrame(resolve));
}

function buildPopup(place, lat, lng) {
  const name = place.name ?? place.placeName ?? place.UHouseId ?? "Unnamed place";
  const detailPairs = Object.entries(place)
    .filter(([key]) => !COORDINATE_KEYS.includes(key))
    .map(([key, value]) => `<div><strong>${escapeHtml(key)}:</strong> ${escapeHtml(String(value))}</div>`)
    .join("");

  return `
    <div>
      <h3 style="margin:0 0 4px;">${escapeHtml(String(name))}</h3>
      <div><strong>Latitude:</strong> ${lat}</div>
      <div><strong>Longitude:</strong> ${lng}</div>
      ${detailPairs}
    </div>
  `;
}

function buildListItem(place, lat, lng, defaultNameIndex) {
  const name = place.name ?? place.placeName ?? place.UHouseId ?? `Place ${defaultNameIndex}`;
  const details = Object.entries(place)
    .filter(([key]) => !["name", "placeName", ...COORDINATE_KEYS].includes(key))
    .map(([key, value]) => `<div><strong>${escapeHtml(key)}:</strong> ${escapeHtml(String(value))}</div>`)
    .join("");

  return `
    <div><strong>${escapeHtml(String(name))}</strong></div>
    <div>Lat: ${lat}, Lng: ${lng}</div>
    ${details}
  `;
}

function toNumber(value) {
  return typeof value === "number" ? value : Number.parseFloat(value);
}

function setStatus(message, isError = false) {
  statusBox.textContent = message;
  statusBox.classList.toggle("error", isError);
}

function escapeHtml(input) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
