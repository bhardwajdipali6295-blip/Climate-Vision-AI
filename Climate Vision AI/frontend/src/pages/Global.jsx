import { useEffect, useState } from 'react'
import { getGlobalStats, getWeather } from '../api/client'

export default function Global() {
  const [data, setData] = useState(null)
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [weatherLoading, setWeatherLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    getGlobalStats().then(setData).catch(console.error)
  }, [])

  async function handleWeather(e) {
    e.preventDefault()
    if (!city.trim()) return
    setWeatherLoading(true)
    setError('')
    try {
      const result = await getWeather(city)
      setWeather(result)
    } catch {
      setError('City not found. Try another name.')
      setWeather(null)
    } finally {
      setWeatherLoading(false)
    }
  }

  if (!data) return <div className="page-container text-center py-20 text-dark-400">Loading...</div>

  return (
    <div className="page-container">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Global Statistics</h1>
        <p className="text-dark-400">
          Aggregated indicators across {data.summary.countries} countries (2015–2024) plus live weather lookup powered by Open-Meteo.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="card text-center">
          <div className="text-3xl font-bold text-primary-400">{data.summary.countries}</div>
          <div className="text-sm text-white">Countries analyzed</div>
          <div className="text-xs text-dark-500">2015 – 2024</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-primary-400">+{data.summary.avg_temp}°C</div>
          <div className="text-sm text-white">Avg temperature Δ</div>
          <div className="text-xs text-dark-500">vs 2015 baseline</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-primary-400">{data.summary.avg_aqi}</div>
          <div className="text-sm text-white">Average AQI</div>
          <div className="text-xs text-dark-500">global mean</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-primary-400">{data.summary.avg_flood_risk}</div>
          <div className="text-sm text-white">Disaster risk score</div>
          <div className="text-xs text-dark-500">composite 0-100</div>
        </div>
      </div>

      {/* Weather lookup */}
      <div className="card mb-8">
        <h2 className="text-xl font-semibold mb-4">Live Weather Worldwide</h2>
        <p className="text-dark-400 text-sm mb-4">Type a city name and hit Check to fetch live conditions.</p>
        <form onSubmit={handleWeather} className="flex gap-3">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g. Delhi, Tokyo, London"
            className="input-field flex-1"
          />
          <button type="submit" disabled={weatherLoading} className="btn-primary">
            {weatherLoading ? 'Checking...' : 'Check'}
          </button>
        </form>
        {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
        {weather && (
          <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-dark-800 rounded-lg p-4 text-center">
              <div className="text-xs text-dark-400 mb-1">City</div>
              <div className="font-semibold">{weather.city}, {weather.country}</div>
            </div>
            <div className="bg-dark-800 rounded-lg p-4 text-center">
              <div className="text-xs text-dark-400 mb-1">Temperature</div>
              <div className="text-xl font-bold text-primary-400">{weather.temperature}°C</div>
            </div>
            <div className="bg-dark-800 rounded-lg p-4 text-center">
              <div className="text-xs text-dark-400 mb-1">Humidity</div>
              <div className="text-xl font-bold text-primary-400">{weather.humidity}%</div>
            </div>
            <div className="bg-dark-800 rounded-lg p-4 text-center">
              <div className="text-xs text-dark-400 mb-1">Wind</div>
              <div className="text-xl font-bold text-primary-400">{weather.wind_speed} km/h</div>
            </div>
            <div className="bg-dark-800 rounded-lg p-4 text-center">
              <div className="text-xs text-dark-400 mb-1">Conditions</div>
              <div className="font-semibold">{weather.description}</div>
            </div>
          </div>
        )}
      </div>

      {/* Indicators */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Climate indicators</h2>
        <p className="text-dark-400 text-sm mb-6">
          Aggregated from the in-app sample dataset of 20 countries over 10 years.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Mean surface temperature', value: `${data.summary.avg_temp}°C` },
            { label: 'Average air quality index', value: data.summary.avg_aqi },
            { label: 'Average flood risk', value: `${data.summary.avg_flood_risk} / 100` },
            { label: 'Average drought risk', value: `${data.summary.avg_drought_risk} / 100` },
          ].map((item, i) => (
            <div key={i} className="bg-dark-800 rounded-lg p-4">
              <div className="text-xs text-dark-400 mb-1">{item.label}</div>
              <div className="text-lg font-semibold">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
