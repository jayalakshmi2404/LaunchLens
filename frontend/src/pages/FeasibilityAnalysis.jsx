import { Link } from 'react-router-dom'
import { useProject } from '../context/ProjectContext.jsx'
import { computeFeasibility } from '../utils/feasibilityEngine.js'
import './FeasibilityAnalysis.css'

const toneColor = { high: '#34d399', medium: '#fbbf24', low: '#fb7185' }

export default function FeasibilityAnalysis() {
  const { projectData } = useProject()

  if (!projectData) {
    return (
      <div className="page-wide">
        <div className="page-header">
          <h1>Feasibility Analysis</h1>
          <p>A Technical / Financial / Market / Competitive feasibility breakdown personalized to your project.</p>
        </div>
        <div className="card empty-state">
          <p className="waiting-note">
            No project has been analyzed yet. Submit a project on Project Input and click
            "Analyze Project" to see a feasibility breakdown built from your actual inputs and
            the current market data for your industry.
          </p>
          <Link to="/" className="btn-primary empty-state-link">
            Go to Project Input
          </Link>
        </div>
      </div>
    )
  }

  const { form, market, competitors } = projectData
  const { dimensions, overallScore, verdict } = computeFeasibility({ form, market, competitors })

  return (
    <div className="page-wide">
      <div className="page-header">
        <h1>Feasibility Analysis</h1>
        <p>
          Personalized to <b>{form.projectName || 'your project'}</b> - {form.industry}, {form.businessModel}
          {form.budget ? `, budget ${form.budget}` : ''}.
        </p>
      </div>

      <div className="feas-summary">
        <div className="card feas-verdict-card">
          <div className="stat-label">OVERALL FEASIBILITY SCORE</div>
          <div className="feas-score-big" style={{ color: toneColor[verdict.tone] }}>{overallScore}/100</div>
        </div>
        <div className="card feas-verdict-card">
          <div className="stat-label">VERDICT</div>
          <div className="feas-verdict-label" style={{ color: toneColor[verdict.tone] }}>{verdict.label}</div>
        </div>
      </div>

      <div className="feas-list">
        {dimensions.map((d) => (
          <div className="card feas-item" key={d.key}>
            <div className="feas-cat">
              <div className="feas-cat-name">{d.label}</div>
              <div className="feas-score-num">{d.score}/100</div>
            </div>
            <div className="feas-desc">{d.reason}</div>
            <div className="bar-track">
              <div
                className="bar-fill"
                style={{ width: d.score + '%', background: d.score >= 70 ? '#34d399' : d.score >= 45 ? '#fbbf24' : '#fb7185' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}