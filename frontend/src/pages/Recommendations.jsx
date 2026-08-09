import './Recommendations.css'

const recommendations = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1" />
      </svg>
    ),
    priority: 'critical',
    title: 'Re-anchor SOM assumptions',
    body: 'SOM can dip even against a growing TAM/SAM — validate the acquisition funnel before committing further spend, not just the headline market size.',
    impact: 'High',
    effort: 'Low',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 3l8 4v5c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V7l8-4z" />
      </svg>
    ),
    priority: 'critical',
    title: 'Differentiate from the category leader',
    body: 'India\'s market leaders in most sectors already hold 25-30% share. Compete on a specific underserved workflow rather than head-to-head feature parity.',
    impact: 'High',
    effort: 'Medium',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 17l6-6 4 4 8-8M21 7v6M21 7h-6" />
      </svg>
    ),
    priority: 'high',
    title: 'Lock in early SAM capture',
    body: 'Serviceable market growth compounds quickly. Moving fast on beachhead accounts secures an advantage that narrows as competitors respond.',
    impact: 'Medium',
    effort: 'Medium',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    priority: 'moderate',
    title: 'Simplify regional integrations',
    body: 'Indian SMB and enterprise buyers often run older or fragmented tech stacks. A lightweight integration layer removes the single biggest sales-cycle friction point.',
    impact: 'Medium',
    effort: 'Low',
  },
]

export default function Recommendations() {
  return (
    <div className="page-wide">
      <div className="page-header">
        <h1>Recommendations</h1>
        <p>Suggested next actions based on the risk assessment and current market data.</p>
      </div>

      <div className="rec-grid">
        {recommendations.map((r) => (
          <div className="card rec-card" key={r.title}>
            <div className="rec-top">
              <div className="rec-icon">{r.icon}</div>
              <span className={'priority-tag ' + r.priority}>{r.priority}</span>
            </div>
            <div className="rec-title">{r.title}</div>
            <div className="rec-body">{r.body}</div>
            <div className="rec-meta">
              <span><b>Impact:</b> {r.impact}</span>
              <span><b>Effort:</b> {r.effort}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
