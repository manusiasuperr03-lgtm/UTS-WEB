export async function renderEarthquakeMap({ containerId, earthquakes }) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const Lmod = await import('leaflet');
  const L = Lmod.default || Lmod;

  // Bersihkan jika rerender
  if (container._mapInstance) {
    container._mapInstance.remove();
    container._mapInstance = null;
  }

  // Pastikan map punya ukuran yang valid (sering penyebab tampil "blok"/tidak fill)
  // Jika container dipengaruhi layout/scroll, invalidateSize membantu Leaflet dihitung ulang.
  const map = L.map(containerId, { zoomControl: true }).setView([-6.2, 106.8166667], 7);
  container._mapInstance = map;

  // Leaflet butuh ukuran container yang benar
  setTimeout(() => {
    try {
      map.invalidateSize();
    } catch {
      // ignore
    }
  }, 0);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {

    attribution: '&copy; OpenStreetMap contributors',

    maxZoom: 19,
  }).addTo(map);

  const colorByMag = (m) => {
    const mag = Number(m);
    if (mag >= 6) return '#dc2626';
    if (mag >= 5) return '#f97316';
    return '#2563eb';
  };

  const defaultLatLng = { lat: -6.2, lng: 106.8166667 };

  (earthquakes || []).forEach((q) => {
    const lat = q.lat ?? defaultLatLng.lat;
    const lng = q.lng ?? defaultLatLng.lng;

    const mag = Number(q.magnitude);

    const marker = L.circleMarker([lat, lng], {
      radius: 8 + Math.min(mag, 10) * 2,
      color: colorByMag(mag),
      fillColor: colorByMag(mag),
      fillOpacity: 0.65,
      weight: 2,
    }).addTo(map);

    marker.bindPopup(
      `
        <div style="min-width:160px">
          <div style="font-weight:700; color:${colorByMag(mag)};">${q.magnitude} M</div>
          <div><b>Lokasi:</b> ${q.location}</div>
          <div><b>Kedalaman:</b> ${q.depth}</div>
          <div><b>Waktu:</b> ${q.time}</div>
        </div>
      `.trim()
    );
  });
}

