import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getDashboard } from '../api/client'

export default function Home() {
  const [data, setData] = useState(null)

  useEffect(() => {
    getDashboard().then(setData).catch(console.error)
  }, [])

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950/60 via-dark-950/80 to-dark-950" />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="inline-block px-4 py-1.5 bg-primary-600/20 border border-primary-600/30 rounded-full text-primary-400 text-sm font-medium mb-6">
            LIVE CLIMATE INTELLIGENCE
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Understand our changing planet.
          </h1>
          <p className="text-lg md:text-xl text-dark-300 mb-8 max-w-2xl mx-auto">
            ClimateVision AI analyzes global temperature, pollution and disaster data to surface insights
            that matter — from megacity air quality to decadal warming trends.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard" className="btn-primary text-lg px-8 py-4">
              Open Analytics Dashboard →
            </Link>
            <Link to="/assistant" className="btn-secondary text-lg px-8 py-4">
              Ask the AI Assistant
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="page-container -mt-16 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '+1.28°C', label: 'Global Temp Anomaly', sub: 'vs 1951–1980 (2024)' },
            { value: '424.6 ppm', label: 'Atmospheric CO₂', sub: 'Mauna Loa 2024' },
            { value: '+101 mm', label: 'Sea Level Rise', sub: 'since 1993' },
            { value: '410+', label: 'Wildfire Events', sub: 'global 2020s decade' },
          ].map((stat, i) => (
            <div key={i} className="card-hover text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary-400 mb-1">{stat.value}</div>
              <div className="text-sm font-medium text-white mb-1">{stat.label}</div>
              <div className="text-xs text-dark-400">{stat.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Overview */}
      <section className="page-container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Global Warming Overview</h2>
          <p className="text-dark-300 text-lg">
            The last ten years are the warmest ever recorded. ClimateVision aggregates authoritative data
            from NASA, NOAA and WMO so analysts, journalists and policymakers can act on facts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: '🌡️', title: 'Temperature Trends', desc: 'Decadal warming charted from NASA GISS records — see anomalies accelerate post-2000.', link: '/dashboard' },
            { icon: '🌬️', title: 'Air Quality Live', desc: 'Real-time PM2.5, PM10, O₃ and NO₂ data streamed from Open-Meteo across global megacities.', link: '/global' },
            { icon: '🌊', title: 'Floods & Droughts', desc: 'Disaster frequency analytics by decade, sourced from EM-DAT international archives.', link: '/insights' },
          ].map((card, i) => (
            <Link key={i} to={card.link} className="card-hover group">
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-400 transition-colors">{card.title}</h3>
              <p className="text-dark-400">{card.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
