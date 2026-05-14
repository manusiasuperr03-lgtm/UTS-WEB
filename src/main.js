import './style.css';



import { renderEarthquakeMap } from './earthquakeMap.js';
import { renderWeatherChart } from './weatherChart.js';
import { buildAppHtml } from './ui.js';
import { startRealtimeClock } from './realtime.js';
import { filterEarthquakesByQuery } from './geoFilter.js';
import { demoLocationHints } from './locations.js';





function getWeatherFromBMKG(dataCuaca) {
  try {
    // Current implementation already uses this path in old code
    return dataCuaca.data[0].cuaca[0][0];
  } catch {
    return null;
  }
}

function getLatestEarthquakeFromBMKG(dataGempa) {
  try {
    const gempa = dataGempa?.Infogempa?.gempa;
    return gempa || null;
  } catch {
    return null;
  }
}

async function loadBMKGDemoData() {
  // GEMPA
  const responseGempa = await fetch('https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json');
  const dataGempa = await responseGempa.json();
  const gempa = getLatestEarthquakeFromBMKG(dataGempa);

  // CUACA
  const responseCuaca = await fetch(
    'https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=31.71.03.1001'
  );
  const dataCuaca = await responseCuaca.json();
  const cuaca = getWeatherFromBMKG(dataCuaca);

  return { gempa, cuaca };
}



function buildChartFromCuaca(cuaca) {
  // Since API response shape is large, we build a simple demo chart from current values.
  // If you later want full forecast, we can expand parsing.
  const base = cuaca?.t != null ? Number(String(cuaca.t).replace(',', '.')) : 29;
  const labels = ['Senin', 'Selasa', 'Rabu'];
  const temperatures = [base - 1, base - 3, base + 1].map((n) => Math.round(n));
  return { labels, temperatures };
}

function buildEarthquakePointsFromGempa(gempa) {
  // BMKG TEWS autogempa provides latest earthquake but not lat/lng in the old UI.
  // For now we create 3 demo points near Indonesia for visualization.
  // If you have coordinates, we can map them.
  const mag = gempa?.Magnitude ?? 5.2;
  const depth = gempa?.Kedalaman ?? '10 Km';
  const time = `${gempa?.Tanggal ?? '09 Mei 2026'} - ${gempa?.Jam ?? '08:45 WIB'}`;

  return [
    {
      location: gempa?.Wilayah ?? 'Sukabumi, Jawa Barat',
      magnitude: String(mag),
      depth: String(depth),
      time,
      lat: -6.922,
      lng: 106.929,
    },
    {
      location: 'Bandung, Jawa Barat',
      magnitude: '4.8',
      depth: '15 Km',
      time,
      lat: -6.917,
      lng: 107.619,
    },
    {
      location: 'Garut, Jawa Barat',
      magnitude: '5.6',
      depth: '20 Km',
      time,
      lat: -7.208,
      lng: 107.922,
    },
  ];
}

async function init() {
  const appEl = document.querySelector('#app');
  appEl.innerHTML = buildAppHtml();


  // Load BMKG data and render chart/map
  const { gempa, cuaca } = await loadBMKGDemoData();

  // Realtime clock
  startRealtimeClock({
    clockId: 'realtimeClock',
    dateId: 'realtimeDate',
  });


  const { labels: weatherLabels, temperatures: weatherTemps } = buildChartFromCuaca(cuaca);
  const earthquakes = buildEarthquakePointsFromGempa(gempa);

  await renderEarthquakeMap({ containerId: 'earthquake-map', earthquakes });
  await renderWeatherChart({ canvasId: 'weather-chart', labels: weatherLabels, temperatures: weatherTemps });

  // Filter Kota/Provinsi (demo)
  const citySearch = document.getElementById('citySearch');
  const btnApplyFilter = document.getElementById('btnApplyFilter');
  const btnClearFilter = document.getElementById('btnClearFilter');

  const applyFilterAndRerender = async (query) => {
    const filtered = filterEarthquakesByQuery(earthquakes, query);
    await renderEarthquakeMap({ containerId: 'earthquake-map', earthquakes: filtered });

    // Chart tetap (demo), tapi bisa dibuat sesuai lokasi bila kamu punya data per kota
  };

  if (btnApplyFilter && citySearch) {
    btnApplyFilter.addEventListener('click', async () => {
      await applyFilterAndRerender(citySearch.value);
    });
  }

  if (btnClearFilter && citySearch) {
    btnClearFilter.addEventListener('click', async () => {
      citySearch.value = '';
      await applyFilterAndRerender('');
    });
  }

  // enter key
  if (citySearch) {
    citySearch.addEventListener('keydown', async (e) => {
      if (e.key === 'Enter') {
        await applyFilterAndRerender(citySearch.value);
      }
    });
  }




}

init();


