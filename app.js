const map = L.map("map").setView([20.5937, 78.9629], 4);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const fileInput = document.getElementById("jsonFile");
const statusBox = document.getElementById("status");
const placesList = document.getElementById("placesList");

let markerLayer = L.layerGroup().addTo(map);

fileInput.addEventListener("change", async (event) => {
  const [file] = event.target.files;

  if (!file) {
    setStatus("Waiting for a file…");
    return;
  }

  try {
    const text = await file.text();
    const data = JSON.parse(text);
    const places = Array.isArray(data) ? data : (data.places ?? data.table ?? data.Table);

    if (!Array.isArray(places)) {
      throw new Error("JSON must be an array or contain a top-level 'places' or 'Table' array.");
    }

    renderPlaces(places);
  } catch (error) {
    markerLayer.clearLayers();
    placesList.innerHTML = "";
    setStatus(`Could not load file: ${error.message}`, true);
  }
});

function renderPlaces(places) {
  markerLayer.clearLayers();
  placesList.innerHTML = "";

  const bounds = [];
  let validCount = 0;

  places.forEach((place, index) => {
    const lat = toNumber(place.latitude ?? place.lat ?? place.Lat);
    const lng = toNumber(place.longitude ?? place.lng ?? place.lon ?? place.long ?? place.Lng ?? place.Lon ?? place.Long);

    if (Number.isNaN(lat) || Number.isNaN(lng)) {
      return;
    }

    validCount += 1;
    bounds.push([lat, lng]);

    const marker = L.marker([lat, lng]).addTo(markerLayer);
    marker.bindPopup(buildPopup(place, lat, lng));

    const item = document.createElement("li");
    item.innerHTML = buildListItem(place, lat, lng, index + 1);
    placesList.appendChild(item);
  });

  if (!validCount) {
    setStatus("No valid places found. Add latitude/longitude, lat/lng, or Lat/Lng to each item.", true);
    return;
  }

  if (bounds.length === 1) {
    map.setView(bounds[0], 11);
  } else {
    map.fitBounds(bounds, { padding: [30, 30] });
  }

  setStatus(`Loaded ${validCount} place${validCount > 1 ? "s" : ""} on the live map.`);
}

function buildPopup(place, lat, lng) {
  const name = place.name ?? place.placeName ?? "Unnamed place";
  const detailPairs = Object.entries(place)
    .filter(([key]) => !["latitude", "lat", "Lat", "longitude", "lng", "Lng", "lon", "Lon", "long", "Long"].includes(key))
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
  const name = place.name ?? place.placeName ?? `Place ${defaultNameIndex}`;
  const details = Object.entries(place)
    .filter(([key]) => !["name", "placeName", "latitude", "lat", "Lat", "longitude", "lng", "Lng", "lon", "Lon", "long", "Long"].includes(key))
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
