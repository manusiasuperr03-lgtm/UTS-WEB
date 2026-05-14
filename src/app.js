export default function WeatherEarthquakeApp() {
  const weatherData = [
    { day: 'Senin', temp: '28°C', status: 'Cerah Berawan' },
    { day: 'Selasa', temp: '26°C', status: 'Hujan Ringan' },
    { day: 'Rabu', temp: '30°C', status: 'Panas' },
  ];

  const earthquakeData = [
    {
      location: 'Sukabumi',
      magnitude: '5.2',
      depth: '10 Km',
      time: '09 Mei 2026 - 08:45 WIB',
    },
    {
      location: 'Bandung',
      magnitude: '4.8',
      depth: '15 Km',
      time: '09 Mei 2026 - 11:20 WIB',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-slate-200 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6 flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-blue-700">
              Prediksi Cuaca & Gempa
            </h1>
            <p className="text-gray-600 mt-2">
              Sistem Informasi Monitoring Cuaca dan Gempa Berbasis Web
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl shadow-lg transition">
              Refresh Data
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Prediksi Cuaca Hari Ini
            </h2>

            <div className="bg-blue-100 rounded-2xl p-6 flex items-center justify-between">
              <div>
                <h3 className="text-5xl font-bold text-blue-700">29°C</h3>
                <p className="text-lg text-gray-700 mt-2">Cerah Berawan</p>
              </div>

              <div className="text-7xl">☀️</div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
              <div className="bg-slate-100 p-4 rounded-2xl">
                <p className="text-gray-500">Kelembapan</p>
                <h4 className="text-xl font-bold">75%</h4>
              </div>

              <div className="bg-slate-100 p-4 rounded-2xl">
                <p className="text-gray-500">Angin</p>
                <h4 className="text-xl font-bold">12 Km/j</h4>
              </div>

              <div className="bg-slate-100 p-4 rounded-2xl">
                <p className="text-gray-500">Tekanan</p>
                <h4 className="text-xl font-bold">1008 hPa</h4>
              </div>
            </div>
          </div>

          {/* Gempa Card */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Informasi Gempa Terkini
            </h2>

            <div className="bg-red-100 rounded-2xl p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-4xl font-bold text-red-600">5.2 M</h3>
                  <p className="text-gray-700 mt-2">Sukabumi, Jawa Barat</p>
                </div>

                <div className="text-6xl">🌍</div>
              </div>

              <div className="mt-4 text-gray-700 space-y-2">
                <p>📍 Kedalaman: 10 Km</p>
                <p>🕒 09 Mei 2026 - 08:45 WIB</p>
                <p>⚠️ Tidak Berpotensi Tsunami</p>
              </div>
            </div>
          </div>
        </div>

        {/* Forecast Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Prediksi Cuaca 3 Hari
            </h2>

            <div className="space-y-4">
              {weatherData.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-slate-100 rounded-2xl p-4"
                >
                  <div>
                    <h3 className="font-bold text-lg">{item.day}</h3>
                    <p className="text-gray-600">{item.status}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-700">
                      {item.temp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Earthquake List */}
          <div className="bg-white rounded-3xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Riwayat Gempa
            </h2>

            <div className="space-y-4">
              {earthquakeData.map((item, index) => (
                <div
                  key={index}
                  className="bg-red-50 border border-red-200 rounded-2xl p-4"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg text-red-700">
                      {item.location}
                    </h3>

                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                      {item.magnitude} M
                    </span>
                  </div>

                  <div className="mt-3 text-gray-700 space-y-1">
                    <p>📍 Kedalaman: {item.depth}</p>
                    <p>🕒 {item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-10 text-gray-600">
          © 2026 Sistem Prediksi Cuaca dan Gempa | Universitas Mandiri
        </div>
      </div>
    </div>
  );
}
