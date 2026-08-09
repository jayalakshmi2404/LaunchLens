import { createContext, useContext, useState } from 'react'

const ProjectContext = createContext(null)

export function ProjectProvider({ children }) {
  // null until the user has submitted + analyzed a project on Project Input.
  const [projectData, setProjectData] = useState(null)

  return (
    <ProjectContext.Provider value={{ projectData, setProjectData }}>
      {children}
    </ProjectContext.Provider>
  )
}

// Usage: const { projectData, setProjectData } = useProject()
// projectData is null until a project has been analyzed, then looks like:
//   { form: {...}, market: {...}, competitors: [...] }
export function useProject() {
  const ctx = useContext(ProjectContext)
  if (!ctx) {
    throw new Error('useProject must be used inside a <ProjectProvider>')
  }
  return ctx
}
