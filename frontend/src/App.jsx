import { useRef } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import CustomScrollbar from './components/CustomScrollbar.jsx'
import { ProjectProvider } from './context/ProjectContext.jsx'
import ProjectInput from './pages/ProjectInput.jsx'
import RiskAssessment from './pages/RiskAssessment.jsx'
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
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
          <CustomScrollbar targetRef={mainRef} />
        </div>
      </div>
    </ProjectProvider>
  )
}
