import { Link } from 'react-router-dom'
import { useProject } from '../context/ProjectContext.jsx'
import { computeSWOT } from '../utils/swotEngine.js'
import './SwotAnalysis.css'

const QUADRANTS = [
  { key: 'strengths', title: 'Strengths', sub: 'Internal - based on your inputs', cls: 'swot-strengths' },
  { key: 'weaknesses', title: 'Weaknesses', sub: 'Internal - based on your inputs', cls: 'swot-weaknesses' },
  { key: 'opportunities', title: 'Opportunities', sub: 'External - based on market & competitor data', cls: 'swot-opportunities' },
  { key: 'threats', title: 'Threats', sub: 'External - based on market & competitor data', cls: 'swot-threats' },
]

export default function SwotAnalysis() {
  const { projectData } = useProject()

  if (!projectData) {
    return (
      <div className="page-wide">
        <div className="page-header">
          <h1>SWOT Analysis</h1>
          <p>A strengths/weaknesses/opportunities/threats breakdown personalized to your project.</p>
        </div>
        <div className="card empty-state">
          <p className="waiting-note">
            No project has been analyzed yet. Submit a project on Project Input and click
            "Analyze Project" to see a SWOT analysis built from your actual inputs and the
            current market data for your industry.
          </p>
          <Link to="/" className="btn-primary empty-state-link">
            Go to Project Input
          </Link>
        </div>
      </div>
    )
  }

  const { form, market, competitors } = projectData
  const swot = computeSWOT({ form, market, competitors })

  return (
    <div className="page-wide">
      <div className="page-header">
        <h1>SWOT Analysis</h1>
        <p>
          Personalized to <b>{form.projectName || 'your project'}</b> - {form.industry}, {form.businessModel}.
        </p>
      </div>

      <div className="swot-grid">
        {QUADRANTS.map((q) => (
          <div className={'card swot-quadrant ' + q.cls} key={q.key}>
            <div className="swot-quadrant-head">
              <h2>{q.title}</h2>
              <span className="swot-quadrant-sub">{q.sub}</span>
            </div>
            <ul className="swot-list">
              {swot[q.key].map((item, i) => (
                <li key={i}>
                  <span className="swot-item-text">{item.text}</span>
                  <span className="swot-item-basis">Based on: {item.basis}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}