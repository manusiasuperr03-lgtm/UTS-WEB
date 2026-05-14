export function startRealtimeClock({
  clockId = 'realtimeClock',
  dateId = 'realtimeDate',
  clockFormat = 'HH:mm:ss',
  locale = 'id-ID',
} = {}) {
  const clockEl = document.getElementById(clockId);
  const dateEl = document.getElementById(dateId);
  if (!clockEl || !dateEl) return;

  const pad2 = (n) => String(n).padStart(2, '0');
  const formatTime = (d) => `${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`;

  const formatDate = (d) => {
    // contoh: Senin, 9 Mei 2026
    try {
      return d.toLocaleDateString(locale, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return d.toDateString();
    }
  };

  const update = () => {
    const now = new Date();
    clockEl.textContent = formatTime(now);
    dateEl.textContent = formatDate(now);
  };

  update();
  return setInterval(update, 1000);
}

