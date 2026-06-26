import { useState } from 'react'
import { generateReport } from '../api/client'

const regions = ['Global', 'North America', 'Europe', 'South Asia', 'Sub-Saharan Africa', 'Latin America', 'Oceania', 'Middle East']

export default function Reports() {
  const [region, setRegion] = useState('Global')
  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleGenerate() {
    setLoading(true)
    try {
      const result = await generateReport(region)
      setReport(result)
    } catch {
      setReport({ body: 'Failed to generate report.', region })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Climate Reports</h1>
        <p className="text-dark-400">
          Generate a professional, board-ready climate impact assessment for any region —
          synthesized from IPCC, NASA and NOAA data.
        </p>
      </div>

      <div className="card mb-8">
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm text-dark-400 mb-2">Region</label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="input-field w-full"
            >
              {regions.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          <button onClick={handleGenerate} disabled={loading} className="btn-primary whitespace-nowrap">
            {loading ? 'Generating...' : 'Generate AI Report'}
          </button>
        </div>
      </div>

      {report && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">{report.region} Climate Report</h2>
            <span className="text-xs text-dark-500">
              Generated {new Date(report.generated_at).toLocaleString()}
            </span>
          </div>
          <div className="prose prose-invert max-w-none">
            {report.body.split('\n').map((line, i) => {
              if (line.startsWith('# ')) return <h1 key={i} className="text-2xl font-bold mt-6 mb-3">{line.replace('# ', '')}</h1>
              if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-semibold mt-5 mb-2 text-primary-400">{line.replace('## ', '')}</h2>
              if (line.startsWith('| ')) {
                const cells = line.split('|').filter(Boolean).map((c) => c.trim())
                if (cells.every((c) => c.match(/^-+$/))) return null
                return (
                  <div key={i} className="grid grid-cols-3 gap-2 text-sm py-1.5 border-b border-dark-800">
                    {cells.map((cell, j) => (
                      <span key={j} className={j === 0 ? 'font-medium' : 'text-dark-300'}>{cell}</span>
                    ))}
                  </div>
                )
              }
              if (line.match(/^\d+\./)) return <p key={i} className="text-dark-300 ml-4 mb-1">{line}</p>
              if (line.startsWith('- ')) return <li key={i} className="text-dark-300 ml-4 list-disc">{line.replace('- ', '')}</li>
              if (line.trim() === '') return <br key={i} />
              return <p key={i} className="text-dark-300 mb-2">{line}</p>
            })}
          </div>
        </div>
      )}
    </div>
  )
}
