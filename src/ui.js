export function buildAppHtml() {
  const authArea = '';


  return `
    <div class="app-bg">
      <header class="navbar">
        <div class="navbar-inner">
          <div class="brand">Prediksi Cuaca & Gempa</div>
          <div class="nav-realtime">
            <div class="rt-line"><span class="rt-label">Jam:</span> <span id="realtimeClockNavbar">--:--:--</span></div>
            <div class="rt-line"><span class="rt-label">Tanggal:</span> <span id="realtimeDateNavbar">--</span></div>
          </div>

          <nav class="nav-links">
            <a href="#beranda" class="nav-link">Beranda</a>
            <a href="#peta-gempa" class="nav-link">Peta Gempa</a>
            <a href="#grafik-cuaca" class="nav-link">Grafik Cuaca</a>

          </nav>
          <div class="nav-auth">
            ${authArea}
          </div>
        </div>
      </header>

      <main class="container">
        <section id="beranda" class="section">
          <div class="header">
            <div class="realtime">
              <div class="rt-line"><span class="rt-label">Jam:</span> <span id="realtimeClock">--:--:--</span></div>
              <div class="rt-line"><span class="rt-label">Tanggal:</span> <span id="realtimeDate">--</span></div>
            </div>
            <h1>Prediksi Cuaca & Gempa</h1>
            <p>Sistem Informasi Monitoring Cuaca dan Gempa Berbasis Web</p>
          </div>


          <div class="grid">
            <div class="card cuaca">
              <h2>Cuaca Hari Ini</h2>
              <div class="big">☀️ 29°C</div>
              <p>Cerah Berawan</p>
              <div class="info">
                <div>Kelembapan: 75%</div>
                <div>Angin: 12 Km/j</div>
                <div>Tekanan: 1008 hPa</div>
              </div>
            </div>

            <div class="card gempa">
              <h2>Gempa Terkini</h2>
              <div class="big">🌋 5.2 M</div>
              <p>Sukabumi, Jawa Barat</p>
              <div class="info">
                <div>Kedalaman: 10 Km</div>
                <div>09 Mei 2026</div>
                <div>⚠️ Tidak Berpotensi Tsunami</div>
              </div>
            </div>
          </div>

          <div class="card">
            <h2>Prediksi 3 Hari</h2>
            <table>
              <tr><th>Hari</th><th>Suhu</th><th>Status</th></tr>
              <tr><td>Senin</td><td>28°C</td><td>Cerah</td></tr>
              <tr><td>Selasa</td><td>26°C</td><td>Hujan</td></tr>
              <tr><td>Rabu</td><td>30°C</td><td>Panas</td></tr>
            </table>
          </div>
        </section>

        <section id="peta-gempa" class="section">
          <div class="section-title">
            <h2>Peta Gempa</h2>
            <p>Visualisasi titik gempa pada peta (demo data).</p>
          </div>

          <div class="filter-bar">
            <label class="filter-label">
              Cari Kota/Provinsi:
              <input id="citySearch" class="input" type="text" placeholder="contoh: Bandung, Jawa Barat" />
            </label>
            <button id="btnApplyFilter" class="btn btn-primary">Cari</button>
            <button id="btnClearFilter" class="btn btn-ghost">Reset</button>
          </div>

          <div class="map-wrap">
            <div id="earthquake-map" class="map"></div>
          </div>
        </section>


        <section id="grafik-cuaca" class="section">
          <div class="section-title">
            <h2>Grafik Cuaca</h2>
            <p>Grafik suhu 3 hari (demo data).</p>
          </div>

          <div class="chart-wrap">
            <canvas id="weather-chart"></canvas>
          </div>
        </section>



        <footer class="footer">
          © 2026 Sistem Prediksi Cuaca dan Gempa | Universitas Mandiri
        </footer>
      </main>
    </div>
  `;
}

