import { useEffect, useState } from 'react'
import { getClimateData, uploadCSV, resetData } from '../api/client'

export default function Datasets() {
  const [data, setData] = useState(null)
  const [page, setPage] = useState(1)
  const [country, setCountry] = useState('All')
  const [year, setYear] = useState('')
  const [countries, setCountries] = useState([])
  const [uploadMsg, setUploadMsg] = useState('')

  useEffect(() => {
    loadData()
  }, [page, country, year])

  async function loadData() {
    const params = { page, page_size: 20 }
    if (country !== 'All') params.country = country
    if (year) params.year = year
    const result = await getClimateData(params)
    setData(result)
    if (result.countries) setCountries(result.countries)
  }

  async function handleUpload(e) {
    const file = e.target.files[0]
    if (!file) return
    try {
      const result = await uploadCSV(file)
      setUploadMsg(result.message)
      setPage(1)
      loadData()
    } catch {
      setUploadMsg('Upload failed.')
    }
  }

  async function handleReset() {
    await resetData()
    setUploadMsg('Data reset to sample dataset.')
    setPage(1)
    loadData()
  }

  if (!data) return <div className="page-container text-center py-20 text-dark-400">Loading...</div>

  return (
    <div className="page-container">
      <h1 className="text-3xl font-bold mb-2">Dataset Management</h1>
      <p className="text-dark-400 mb-8">Upload your own CSV or explore the built-in sample dataset of 20 countries across 10 years.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="card">
          <h2 className="text-lg font-semibold mb-3">Upload CSV</h2>
          <label className="block w-full border-2 border-dashed border-dark-700 rounded-lg p-8 text-center cursor-pointer hover:border-primary-600 transition-colors">
            <span className="text-dark-400">Click to upload .csv</span>
            <input type="file" accept=".csv" onChange={handleUpload} className="hidden" />
          </label>
          <p className="text-xs text-dark-500 mt-2">Columns: country, year, temperature, aqi, floodRisk, droughtRisk</p>
          <button onClick={handleReset} className="btn-secondary text-sm mt-4">Reset to sample data</button>
          {uploadMsg && <p className="text-primary-400 text-sm mt-3">{uploadMsg}</p>}
        </div>
        <div className="card flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-400">{data.total}</div>
            <div className="text-dark-400">total rows in dataset</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <select
          value={country}
          onChange={(e) => { setCountry(e.target.value); setPage(1) }}
          className="input-field"
        >
          <option value="All">All Countries</option>
          {countries.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          value={year}
          onChange={(e) => { setYear(e.target.value); setPage(1) }}
          className="input-field"
        >
          <option value="">All Years</option>
          {Array.from({ length: 10 }, (_, i) => 2015 + i).map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="card overflow-x-auto">
        <p className="text-xs text-dark-500 mb-3">
          · {data.total} of {data.total} rows · Built-in sample dataset
        </p>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-dark-700">
              <th className="text-left py-3 px-2 text-dark-400 font-medium">Country</th>
              <th className="text-left py-3 px-2 text-dark-400 font-medium">Year</th>
              <th className="text-left py-3 px-2 text-dark-400 font-medium">Temp °C</th>
              <th className="text-left py-3 px-2 text-dark-400 font-medium">AQI</th>
              <th className="text-left py-3 px-2 text-dark-400 font-medium">Flood</th>
              <th className="text-left py-3 px-2 text-dark-400 font-medium">Drought</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((row) => (
              <tr key={row.id} className="border-b border-dark-800 hover:bg-dark-800/50">
                <td className="py-3 px-2">{row.country}</td>
                <td className="py-3 px-2">{row.year}</td>
                <td className="py-3 px-2">{row.temperature}</td>
                <td className="py-3 px-2">{row.aqi}</td>
                <td className="py-3 px-2">{row.flood_risk}</td>
                <td className="py-3 px-2">{row.drought_risk}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <span className="text-sm text-dark-400">
          Page {data.page} of {data.total_pages}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="btn-secondary text-sm disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setPage(Math.min(data.total_pages, page + 1))}
            disabled={page === data.total_pages}
            className="btn-secondary text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
