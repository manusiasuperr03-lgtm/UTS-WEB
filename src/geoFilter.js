export function normalizeText(s) {
  return String(s ?? '')
    .toLowerCase()
    .replace(/[\u2019'’]/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

export function filterEarthquakesByQuery(earthquakes, query) {
  const q = normalizeText(query);
  if (!q) return earthquakes;

  return (earthquakes || []).filter((e) => {
    const haystack = normalizeText([
      e.location,
      e.kota,
      e.provinsi,
      e.depth,
      e.magnitude,
      e.time,
    ].join(' '));

    return haystack.includes(q);
  });
}

