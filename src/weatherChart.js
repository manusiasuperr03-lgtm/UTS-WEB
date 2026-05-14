export function renderWeatherChart({ canvasId, labels, temperatures }) {
  // Lazy-load Chart.js supaya tidak error saat bundle awal
  return import('chart.js/auto').then(({ default: ChartAuto }) => {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return null;

    const ctx = canvas.getContext('2d');
    if (canvas._chartInstance) canvas._chartInstance.destroy();

    const chart = new ChartAuto(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Suhu (°C)',
            data: temperatures,
            borderColor: '#2563eb',
            backgroundColor: 'rgba(37, 99, 235, 0.15)',
            tension: 0.35,
            fill: true,
            pointRadius: 5,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true },
          tooltip: { enabled: true },
        },
        scales: {
          y: {
            beginAtZero: false,
            ticks: { callback: (v) => `${v}°C` },
          },
        },
      },
    });

    canvas._chartInstance = chart;
    return chart;
  });
}

