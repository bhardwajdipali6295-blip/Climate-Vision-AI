import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-dark-900 border-t border-dark-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 text-lg font-bold mb-3">
              <span className="text-2xl">🌍</span>
              ClimateVision AI
            </div>
            <p className="text-dark-400 text-sm">
              Professional climate analytics platform built for students, researchers and policy makers.
              Data sourced from NASA GISS, NOAA, Open-Meteo and EM-DAT.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Platform</h3>
            <ul className="space-y-2">
              <li><Link to="/dashboard" className="text-dark-400 hover:text-white text-sm">Dashboard</Link></li>
              <li><Link to="/global" className="text-dark-400 hover:text-white text-sm">Global statistics</Link></li>
              <li><Link to="/predictions" className="text-dark-400 hover:text-white text-sm">Predictions</Link></li>
              <li><Link to="/reports" className="text-dark-400 hover:text-white text-sm">AI Reports</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Project</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-dark-400 hover:text-white text-sm">About</Link></li>
              <li><Link to="/about#contact" className="text-dark-400 hover:text-white text-sm">Contact</Link></li>
              <li><Link to="/datasets" className="text-dark-400 hover:text-white text-sm">Datasets</Link></li>
              <li><Link to="/assistant" className="text-dark-400 hover:text-white text-sm">AI Assistant</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-800 mt-8 pt-8 text-center text-dark-500 text-sm">
          © 2026 ClimateVision AI — Data: NASA · NOAA · Open-Meteo · EM-DAT
        </div>
      </div>
    </footer>
  )
}
