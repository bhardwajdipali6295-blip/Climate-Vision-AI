import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { getPredictions } from '../api/client'

export default function Predictions() {
  const [data, setData] = useState(null)

  useEffect(() => {
    getPredictions().then(setData).catch(console.error)
  }, [])

  if (!data) return <div className="page-container text-center py-20 text-dark-400">Loading...</div>

  function buildChartData(metric, label) {
    return data[metric].labels.map((year, i) => ({
      year,
      observed: data[metric].observed[i],
      forecast: data[metric].forecast[i],
    }))
  }

  const charts = [
    { key: 'temperature', title: 'Projected temperature', subtitle: 'Avg surface temperature °C', color: '#3b82f6' },
    { key: 'aqi', title: 'Projected AQI', subtitle: 'Global mean air quality index', color: '#ef4444' },
    { key: 'flood_risk', title: 'Projected flood risk', subtitle: 'Composite 0-100', color: '#06b6d4' },
    { key: 'drought_risk', title: 'Projected drought risk', subtitle: 'Composite 0-100', color: '#f59e0b' },
  ]

  return (
    <div className="page-container">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Forecasts to 2030</h1>
        <p className="text-dark-400">
          Linear-regression forecasts derived from the 20-country dataset. Solid lines are observed; dashed are projected.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {charts.map((chart) => {
          const chartData = buildChartData(chart.key, chart.title)
          return (
            <div key={chart.key} className="card">
              <h3 className="text-lg font-semibold mb-1">{chart.title}</h3>
              <p className="text-xs text-dark-500 mb-4">{chart.subtitle}</p>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="year" tick={{ fontSize: 11, fill: '#888' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#888' }} />
                  <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #333' }} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="observed"
                    stroke={chart.color}
                    strokeWidth={2}
                    dot={false}
                    name="Observed"
                  />
                  <Line
                    type="monotone"
                    dataKey="forecast"
                    stroke={chart.color}
                    strokeWidth={2}
                    strokeDasharray="8 4"
                    dot={false}
                    name="Forecast"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )
        })}
      </div>
    </div>
  )
}
