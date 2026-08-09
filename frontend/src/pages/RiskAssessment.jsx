import { Link } from 'react-router-dom'
import { useProject } from '../context/ProjectContext.jsx'
import { computeRisks } from '../utils/riskEngine.js'
import './RiskAssessment.css'

const sevColor = { high: '#fb7185', medium: '#fbbf24', low: '#34d399' }
const overallColor = { High: '#fb7185', Moderate: '#fbbf24', Low: '#34d399' }

export default function RiskAssessment() {
  const { projectData } = useProject()

  if (!projectData) {
    return (
      <div className="page-wide">
        <div className="page-header">
          <h1>Risk Assessment</h1>
          <p>Automated risk flags based on your project inputs and the current Indian market data.</p>
        </div>
        <div className="card empty-state">
          <p className="waiting-note">
            No project has been analyzed yet. Submit a project on Project Input and click
            "Analyze Project" to see a risk assessment personalized to your industry, business
            model, and budget.
          </p>
          <Link to="/" className="btn-primary empty-state-link">
            Go to Project Input
          </Link>
        </div>
      </div>
    )
  }

  const { form, market, competitors } = projectData
  const { items, overallLabel, criticalFlags, marketFit } = computeRisks({ form, market, competitors })

  return (
    <div className="page-wide">
      <div className="page-header">
        <h1>Risk Assessment</h1>
        <p>
          Personalized to <b>{form.projectName || 'your project'}</b> - {form.industry},{' '}
          {form.businessModel}
          {form.budget ? `, budget ${form.budget}` : ''}.
        </p>
      </div>

      <div className="risk-summary">
        <div className="card risk-score-card">
          <div className="stat-label">OVERALL RISK SCORE</div>
          <div className="risk-score-big" style={{ color: overallColor[overallLabel] }}>{overallLabel}</div>
        </div>
        <div className="card risk-score-card">
          <div className="stat-label">CRITICAL FLAGS</div>
          <div className="risk-score-big" style={{ color: '#fb7185' }}>{criticalFlags}</div>
        </div>
        <div className="card risk-score-card">
          <div className="stat-label">MARKET FIT</div>
          <div className="risk-score-big" style={{ color: '#34d399' }}>{marketFit}%</div>
        </div>
      </div>

      <div className="risk-list">
        {items.map((r) => (
          <div className="card risk-item" key={r.cat}>
            <div className="risk-cat">
              <div className="risk-cat-name">{r.cat}</div>
              <div className={'sev-pill ' + r.sev}>{r.sev}</div>
            </div>
            <div className="risk-desc">{r.reason}</div>
            <div className="risk-meter">
              <div className="bar-track">
                <div className="bar-fill" style={{ width: r.pct + '%', background: sevColor[r.sev] }} />
              </div>
              <div className="risk-score-num">{r.pct}/100</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
