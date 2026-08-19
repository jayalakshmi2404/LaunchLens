import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useProject } from '../context/ProjectContext.jsx'
import { fetchAiRecommendations } from '../services/api.js'
import LangGraphWorkflowViewer from '../components/LangGraphWorkflowViewer.jsx'
import './Recommendations.css'

export default function Recommendations() {
  const { projectData } = useProject()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  async function loadRecommendations() {
    if (!projectData) return
    setLoading(true)
    setError(null)

    try {
      const res = await fetchAiRecommendations(projectData)
      setData(res)
    } catch (err) {
      console.error('Failed to load AI recommendations:', err)
      setError(err.message || 'Failed to connect to recommendation service')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRecommendations()
  }, [projectData])

  if (!projectData) {
    return (
      <div className="page-wide">
        <div className="page-header">
          <h1>AI Strategic Recommendations</h1>
          <p>Data-driven next actions generated from your project parameters, market figures, and competitor intelligence.</p>
        </div>
        <div className="card empty-state">
          <p className="waiting-note">
            No project has been analyzed yet. Submit a project on Project Input and click
            "Analyze Project" to generate personalized AI strategic recommendations.
          </p>
          <Link to="/" className="btn-primary empty-state-link">
            Go to Project Input
          </Link>
        </div>
      </div>
    )
  }

  const { form } = projectData

  return (
    <div className="page-wide">
      <div className="page-header header-with-badge">
        <div>
          <h1>AI Strategic Recommendations</h1>
          <p>
            Tailored strategic insights for <b>{form?.projectName || 'your project'}</b> ({form?.industry}, {form?.businessModel}).
          </p>
        </div>
        {data && (
          <div className="ai-provider-badge">
            <span className="pulse-dot-mini" />
            Provider: <b>{data.provider === 'gemini' ? 'Gemini AI' : data.provider === 'openai' ? 'OpenAI' : 'Rule Engine Fallback'}</b>
          </div>
        )}
      </div>

      {data?.warning && (
        <div className="rec-warning-banner">
          ⚠️ {data.warning}
        </div>
      )}

      {loading && (
        <div className="card rec-loading-state">
          <div className="rec-spinner" />
          <p className="loading-text">Generating AI strategic recommendations from live project & competitor data...</p>
        </div>
      )}

      {error && (
        <div className="card rec-error-state">
          <p className="error-text">❌ {error}</p>
          <button type="button" className="btn-primary" onClick={loadRecommendations}>
            Retry Recommendation Analysis
          </button>
        </div>
      )}

      {!loading && !error && data && data.recommendations && (
        <div className="rec-grid">
          {data.recommendations.map((r, i) => (
            <div className="card rec-card" key={r.title + '-' + i}>
              <div className="rec-top">
                <div className="rec-category-tag">{r.category || 'Strategic Action'}</div>
                <span className={'priority-tag ' + (r.priority || 'high')}>{r.priority}</span>
              </div>
              <div className="rec-title">{r.title}</div>
              <div className="rec-body">{r.body}</div>
              {r.rationale && (
                <div className="rec-rationale">
                  <b>Data Rationale:</b> {r.rationale}
                </div>
              )}
              <div className="rec-meta">
                <span><b>Impact:</b> {r.impact || 'High'}</span>
                <span><b>Effort:</b> {r.effort || 'Medium'}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Task 3: LangGraph Agent Strategic Workflow Visualizer */}
      <LangGraphWorkflowViewer projectData={projectData} />
    </div>
  )
}
