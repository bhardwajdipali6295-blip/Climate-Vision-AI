import { useEffect, useState } from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { getDashboard } from '../api/client'

export default function Dashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDashboard().then(setData).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="page-container text-center py-20 text-dark-400">Loading dashboard...</div>
  if (!data) return <div className="page-container text-center py-20 text-dark-400">Failed to load data</div>

  const { summary, temperature_chart, co2_chart, air_quality_chart } = data

  const tempData = temperature_chart.labels.map((year, i) => ({
    year,
    temperature: temperature_chart.values[i],
  }))

  const co2Data = co2_chart.labels.map((year, i) => ({
    year,
    co2: co2_chart.values[i],
  }))

  const aqiData = air_quality_chart.countries.map((country, i) => ({
    country,
    aqi: air_quality_chart.aqi_values[i],
  }))

  const disasterData = data.disaster_chart.decades.map((decade, i) => ({
    decade,
    floods: data.disaster_chart.floods[i],
    droughts: data.disaster_chart.droughts[i],
    storms: data.disaster_chart.storms[i],
    wildfires: data.disaster_chart.wildfires[i],
  }))

  return (
    <div className="page-container">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Climate Dashboard</h1>
        <p className="text-dark-400">Live and historical indicators across temperature, atmosphere, air quality and disaster events.</p>
        <p className="text-xs text-dark-500 mt-1">Live data · Open-Meteo / NASA / NOAA</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary-400">{summary.temp_anomaly}</div>
          <div className="text-sm text-white">Latest Anomaly</div>
          <div className="text-xs text-dark-500">2024</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary-400">{summary.co2_ppm}</div>
          <div className="text-sm text-white">Atmospheric CO₂</div>
          <div className="text-xs text-dark-500">2024 avg</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-red-400">{summary.worst_city}</div>
          <div className="text-sm text-white">Worst PM2.5 City</div>
          <div className="text-xs text-dark-500">99 µg/m³</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary-400">{summary.disasters_tracked.toLocaleString()}</div>
          <div className="text-sm text-white">Disasters Tracked</div>
          <div className="text-xs text-dark-500">1980–today</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-1">Global Temperature Anomaly</h3>
          <p className="text-xs text-dark-500 mb-4">NASA GISS · °C vs 1951–1980 baseline</p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={tempData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#888' }} />
              <YAxis tick={{ fontSize: 12, fill: '#888' }} />
              <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #333' }} />
              <Line type="monotone" dataKey="temperature" stroke="#3b82f6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-1">CO₂ Concentration</h3>
          <p className="text-xs text-dark-500 mb-4">NOAA Mauna Loa · parts per million</p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={co2Data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#888' }} />
              <YAxis tick={{ fontSize: 12, fill: '#888' }} />
              <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #333' }} />
              <Line type="monotone" dataKey="co2" stroke="#22c55e" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-1">Air Pollution by Megacity</h3>
          <p className="text-xs text-dark-500 mb-4">Open-Meteo Air Quality · live µg/m³</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={aqiData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="country" tick={{ fontSize: 10, fill: '#888' }} />
              <YAxis tick={{ fontSize: 12, fill: '#888' }} />
              <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #333' }} />
              <Bar dataKey="aqi" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-1">Floods, Droughts & Disasters</h3>
          <p className="text-xs text-dark-500 mb-4">EM-DAT · global events per decade</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={disasterData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="decade" tick={{ fontSize: 12, fill: '#888' }} />
              <YAxis tick={{ fontSize: 12, fill: '#888' }} />
              <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #333' }} />
              <Legend />
              <Bar dataKey="floods" fill="#3b82f6" />
              <Bar dataKey="droughts" fill="#f59e0b" />
              <Bar dataKey="storms" fill="#8b5cf6" />
              <Bar dataKey="wildfires" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
