import { useRef } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import CustomScrollbar from './components/CustomScrollbar.jsx'
import { ProjectProvider } from './context/ProjectContext.jsx'
import ProjectInput from './pages/ProjectInput.jsx'
import RiskAssessment from './pages/RiskAssessment.jsx'
import SwotAnalysis from './pages/SwotAnalysis.jsx'   // ← add near the other page imports
import FeasibilityAnalysis from './pages/FeasibilityAnalysis.jsx'   // ← add near the other page imports
import Recommendations from './pages/Recommendations.jsx'
import Dashboard from './pages/Dashboard.jsx'

export default function App() {
  const mainRef = useRef(null)

  return (
    <ProjectProvider>
      <div className="app">
        <div className="app-bg-glow">
          <span className="blob-1" />
          <span className="blob-2" />
          <span className="blob-3" />
        </div>
        <Navbar />
        <div className="app-main-wrapper scroll-region">
          <main className="app-main" ref={mainRef}>
            <Routes>
              <Route path="/" element={<ProjectInput />} />
              <Route path="/risk-assessment" element={<RiskAssessment />} />
              <Route path="/recommendations" element={<Recommendations />} />
              <Route path="/swot-analysis" element={<SwotAnalysis />} />   {/* ← add after the Risk Assessment route */}
              <Route path="/feasibility" element={<FeasibilityAnalysis />} />   {/* ← add right after the SWOT Analysis route */}
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
          <CustomScrollbar targetRef={mainRef} />
        </div>
      </div>
    </ProjectProvider>
  )
}
