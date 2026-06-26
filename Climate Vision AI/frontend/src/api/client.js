const API_BASE = '/api'

async function fetchJSON(url, options = {}) {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}

export async function getDashboard() {
  return fetchJSON('/dashboard')
}

export async function getClimateData(params = {}) {
  const qs = new URLSearchParams(params).toString()
  return fetchJSON(`/climate-data?${qs}`)
}

export async function uploadCSV(file) {
  const formData = new FormData()
  formData.append('file', file)
  const res = await fetch(`${API_BASE}/upload-csv`, { method: 'POST', body: formData })
  return res.json()
}

export async function resetData() {
  return fetchJSON('/reset-data', { method: 'POST' })
}

export async function getGlobalStats() {
  return fetchJSON('/global')
}

export async function getPredictions() {
  return fetchJSON('/predictions')
}

export async function getInsights() {
  return fetchJSON('/insights')
}

export async function sendChat(message, sessionId = null) {
  return fetchJSON('/chat', {
    method: 'POST',
    body: JSON.stringify({ message, session_id: sessionId }),
  })
}

export async function generateReport(region) {
  return fetchJSON('/reports', {
    method: 'POST',
    body: JSON.stringify({ region }),
  })
}

export async function getWeather(city) {
  return fetchJSON(`/weather/${encodeURIComponent(city)}`)
}
