import { createContext, useContext, useState } from 'react'

const ProjectContext = createContext(null)

export const initialFormState = {
  projectName: '',
  industry: 'Technology',
  businessModel: 'SaaS',
  targetMarket: '',
  budget: '',
  description: '',
}

export function ProjectProvider({ children }) {
  // Project Submission form fields. Lives here (above the router) instead of
  // inside the ProjectInput page component, so navigating to Risk Assessment,
  // Recommendations, Feasibility, etc. and back does NOT unmount/reset it.
  // It only clears on an explicit Reset (resetProject) or a full page refresh.
  const [form, setForm] = useState(initialFormState)

  // Submission + analysis outcome, persisted the same way as the form so the
  // results reappear as-is if the user navigates away and back.
  const [submitted, setSubmitted] = useState(null)
  const [submitError, setSubmitError] = useState(null)
  const [hasAnalyzed, setHasAnalyzed] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [market, setMarket] = useState(null)
  const [competitors, setCompetitors] = useState([])
  const [backendOnline, setBackendOnline] = useState(true)
  const [liveMode, setLiveMode] = useState(false)
  const [analyzedIndustry, setAnalyzedIndustry] = useState(null)

  // null until the user has submitted + analyzed a project on Project Input.
  // Shape once set: { form: {...}, market: {...}, competitors: [...] }
  const [projectData, setProjectData] = useState(null)

  // Clears everything back to a blank form — used by the Reset button.
  // A page refresh achieves the same result naturally, since all of this
  // state lives in memory only (not localStorage/sessionStorage).
  function resetProject() {
    setForm(initialFormState)
    setSubmitted(null)
    setSubmitError(null)
    setHasAnalyzed(false)
    setShowResults(false)
    setMarket(null)
    setCompetitors([])
    setBackendOnline(true)
    setLiveMode(false)
    setAnalyzedIndustry(null)
    setProjectData(null)
  }

  return (
    <ProjectContext.Provider
      value={{
        form, setForm,
        submitted, setSubmitted,
        submitError, setSubmitError,
        hasAnalyzed, setHasAnalyzed,
        showResults, setShowResults,
        market, setMarket,
        competitors, setCompetitors,
        backendOnline, setBackendOnline,
        liveMode, setLiveMode,
        analyzedIndustry, setAnalyzedIndustry,
        projectData, setProjectData,
        resetProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}

// Usage: const { projectData, setProjectData, form, setForm, ... } = useProject()
export function useProject() {
  const ctx = useContext(ProjectContext)
  if (!ctx) {
    throw new Error('useProject must be used inside a <ProjectProvider>')
  }
  return ctx
}