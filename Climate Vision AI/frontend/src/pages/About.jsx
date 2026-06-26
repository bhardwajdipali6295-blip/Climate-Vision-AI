import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="page-container max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">About the project</h1>
        <p className="text-dark-400 text-lg">
          A data analytics + AI portfolio project that analyses global climate change, air pollution,
          flood and drought risk. Built for students, researchers, environmental organisations and policy makers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="card">
          <h3 className="text-lg font-semibold mb-2 text-primary-400">Frontend</h3>
          <p className="text-dark-400 text-sm">React 19, Vite, Tailwind CSS, Recharts</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-2 text-primary-400">Backend</h3>
          <p className="text-dark-400 text-sm">Python FastAPI, SQLite, Open-Meteo, NASA, NOAA</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-2 text-primary-400">AI Layer</h3>
          <p className="text-dark-400 text-sm">Scikit-learn linear regression, knowledge-based chat</p>
        </div>
      </div>

      <div className="card mb-12">
        <h2 className="text-xl font-semibold mb-4">SQL Schema Reference</h2>
        <pre className="bg-dark-800 rounded-lg p-4 text-sm text-dark-300 overflow-x-auto">
{`-- CLIMATE_DATA
CREATE TABLE climate_data (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  country TEXT NOT NULL,
  year INTEGER NOT NULL,
  temperature REAL,
  aqi INTEGER,
  flood_risk INTEGER,
  drought_risk INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- DISASTER_DATA
CREATE TABLE disaster_data (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT,
  country TEXT,
  occurred_on DATE,
  deaths INTEGER,
  damage_usd REAL,
  source TEXT DEFAULT 'EM-DAT'
);

-- USER_QUERIES
CREATE TABLE user_queries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT,
  role TEXT,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- REPORTS
CREATE TABLE reports (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  region TEXT,
  body TEXT,
  generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`}
        </pre>
      </div>

      <div className="card" id="contact">
        <h2 className="text-xl font-semibold mb-4">Contact</h2>
        <p className="text-dark-400 mb-4">
          Built as a final-year data analytics and AI portfolio project. Get in touch for collaboration,
          internships or feedback.
        </p>
        <div className="flex gap-4">
          <a href="mailto:hello@climatevision.ai" className="btn-primary text-sm">
            hello@climatevision.ai
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm">
            GitHub
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm">
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  )
}
