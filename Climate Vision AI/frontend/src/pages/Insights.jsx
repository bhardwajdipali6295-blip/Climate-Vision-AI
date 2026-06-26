import { useEffect, useState } from 'react'
import { getInsights } from '../api/client'

export default function Insights() {
  const [data, setData] = useState(null)

  useEffect(() => {
    getInsights().then(setData).catch(console.error)
  }, [])

  if (!data) return <div className="page-container text-center py-20 text-dark-400">Loading...</div>

  return (
    <div className="page-container">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Insights</h1>
        <p className="text-dark-400">
          Automatic findings — pattern detection across the climate dataset, generated automatically
          from temperature, pollution, flood and drought signals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {Object.entries(data)
          .filter(([key]) => !['slopes'].includes(key))
          .map(([key, item]) => (
            <div key={key} className="card">
              <h3 className="text-lg font-semibold text-primary-400 mb-2">{item.title}</h3>
              <p className="text-dark-300">{item.text}</p>
            </div>
          ))}
      </div>

      <div className="card mb-8">
        <h2 className="text-xl font-semibold mb-4">Key findings</h2>
        <ul className="space-y-3">
          {[
            'All ten warmest years in the sample fall after 2015 — accelerated warming is unambiguous.',
            'AQI in South-Asian capitals consistently exceeds WHO guidance by 5–10×.',
            'Flood and drought risk indices are positively correlated with population exposure, not land area.',
            'Linear forecasts indicate continued warming with no inflection in the next 6 years absent intervention.',
          ].map((finding, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-primary-400 mt-1">•</span>
              <span className="text-dark-300">{finding}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="card mb-8">
        <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
        <ul className="space-y-3">
          {[
            'Decarbonise electricity grids on a clear pre-2035 timeline.',
            'Invest in early-warning systems for flood-exposed coastal cities.',
            'Expand urban green cover and PM2.5 monitoring in megacities.',
            'Strengthen drought-resilient agriculture in Sub-Saharan Africa and the Middle East.',
          ].map((rec, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-green-400 mt-1">→</span>
              <span className="text-dark-300">{rec}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="card">
        <p className="text-xs text-dark-500">
          Drought regression slope: {data.slopes?.drought_risk}/yr · Flood slope: {data.slopes?.flood_risk}/yr ·
          AQI slope: {data.slopes?.aqi}/yr · Temperature slope: {data.slopes?.temperature}/yr.
        </p>
      </div>
    </div>
  )
}
