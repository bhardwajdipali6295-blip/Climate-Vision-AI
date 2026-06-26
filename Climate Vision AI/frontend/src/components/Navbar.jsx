import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/global', label: 'Global' },
  { to: '/datasets', label: 'Datasets' },
  { to: '/insights', label: 'Insights' },
  { to: '/predictions', label: 'Predict' },
  { to: '/assistant', label: 'Assistant' },
  { to: '/reports', label: 'Reports' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const location = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-dark-900/80 backdrop-blur-md border-b border-dark-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-lg font-bold text-white">
            <span className="text-2xl">🌍</span>
            ClimateVision AI
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? 'bg-primary-600 text-white'
                    : 'text-dark-300 hover:text-white hover:bg-dark-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-md text-dark-300 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-dark-800 bg-dark-900">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={`block px-4 py-3 text-sm font-medium ${
                location.pathname === link.to
                  ? 'bg-primary-600 text-white'
                  : 'text-dark-300 hover:text-white hover:bg-dark-800'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
