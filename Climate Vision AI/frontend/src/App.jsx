import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Global from './pages/Global'
import Datasets from './pages/Datasets'
import Insights from './pages/Insights'
import Predictions from './pages/Predictions'
import Assistant from './pages/Assistant'
import Reports from './pages/Reports'
import About from './pages/About'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/global" element={<Global />} />
            <Route path="/datasets" element={<Datasets />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/predictions" element={<Predictions />} />
            <Route path="/assistant" element={<Assistant />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
