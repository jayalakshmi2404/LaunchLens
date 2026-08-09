import BarChart from '../components/BarChart.jsx'
import GaugeChart from '../components/GaugeChart.jsx'
import './Dashboard.css'

const kpis = [
  { label: 'TAM', value: '₹18,500 Cr', color: '#fb7185' },
  { label: 'SAM', value: '₹6,200 Cr', color: '#fbbf24' },
  { label: 'SOM', value: '₹92 Cr', color: '#34d399' },
  { label: 'Top Competitor Share', value: '28%', color: '#7c3aed' },
]

const somByYear = [22, 34, 45, 58, 71, 84, 92]
const years = ['2020', '2021', '2022', '2023', '2024', '2025', '2026']

const readiness = [
  { label: 'Market Validation', val: 78 },
  { label: 'Competitive Position', val: 52 },
  { label: 'Financial Model', val: 64 },
  { label: 'Technical Readiness', val: 71 },
]

export default function Dashboard() {
  return (
    <div className="page-wide">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>A summary view of market size, trajectory, and launch readiness — all figures in INR.</p>
      </div>

      <div className="kpi-row">
        {kpis.map((k) => (
          <div className="card kpi-card" key={k.label}>
            <div className="kpi-top">
              <div className="stat-label">{k.label}</div>
              <span className="kpi-dot" style={{ background: k.color }} />
            </div>
            <div className="kpi-value">{k.value}</div>
          </div>
        ))}
      </div>

      <div className="dash-grid">
        <div className="card">
          <div className="card-head">
            <h2>SOM Capture Trajectory</h2>
          </div>
          <BarChart data={somByYear} labels={years} />
        </div>

        <div className="card">
          <div className="card-head">
            <h2>Launch Readiness</h2>
          </div>
          <div className="readiness-wrap">
            <GaugeChart value={66} />
            <div className="readiness-list">
              {readiness.map((r) => (
                <div className="readiness-row" key={r.label}>
                  <div className="label">{r.label}</div>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: r.val + '%', background: '#7c3aed' }} />
                  </div>
                  <div className="val">{r.val}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
