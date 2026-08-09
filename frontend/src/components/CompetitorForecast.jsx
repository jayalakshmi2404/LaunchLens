import { useEffect, useRef, useState } from 'react'
import Chart from 'chart.js/auto'
import useCountUp from '../hooks/useCountUp.js'
import { buildShareTrend, projectValue, parseGrowthPct, parseRevenueCr } from '../utils/forecast.js'
import './CompetitorForecast.css'

const LINE_COLORS = [
  { line: '#7C3AED', glow: 'rgba(124,58,237,0.35)' }, // violet
  { line: '#06B6D4', glow: 'rgba(6,182,212,0.35)' },   // cyan
  { line: '#F472B6', glow: 'rgba(244,114,182,0.35)' }, // pink
  { line: '#34D399', glow: 'rgba(52,211,153,0.35)' },  // emerald
  { line: '#FBBF24', glow: 'rgba(251,191,36,0.35)' },  // amber
]

function PredictionCard({ competitor, months, color }) {
  const growthPct = parseGrowthPct(competitor.growth)
  const revenueCr = parseRevenueCr(competitor.revenue)

  const projectedShare = projectValue(competitor.share, growthPct, months)
  const projectedRevenue = revenueCr != null ? projectValue(revenueCr, growthPct, months) : null

  const animatedShare = useCountUp(projectedShare ?? 0)
  const animatedRevenue = useCountUp(projectedRevenue ?? 0)

  return (
    <div className="forecast-card">
      <div className="forecast-card-top">
        <span className="forecast-dot" style={{ background: color.line, boxShadow: `0 0 10px ${color.glow}` }} />
        <span className="forecast-name">{competitor.name}</span>
      </div>

      <div className="forecast-metric">
        <span className="forecast-metric-label">Market Share</span>
        <div className="forecast-metric-row">
          <span className="forecast-current">{competitor.share}%</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8b93a7" strokeWidth="2.4">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
          <span className="forecast-projected">{animatedShare.toFixed(1)}%</span>
        </div>
      </div>

      {projectedRevenue != null && (
        <div className="forecast-metric">
          <span className="forecast-metric-label">Revenue</span>
          <div className="forecast-metric-row">
            <span className="forecast-current">₹{revenueCr.toLocaleString('en-IN')} Cr</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8b93a7" strokeWidth="2.4">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
            <span className="forecast-projected">₹{animatedRevenue.toLocaleString('en-IN', { maximumFractionDigits: 0 })} Cr</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default function CompetitorForecast({ competitors }) {
  const [months, setMonths] = useState(3)
  const canvasRef = useRef(null)
  const chartRef = useRef(null)

  const topCompetitors = [...competitors].sort((a, b) => b.share - a.share).slice(0, 5)

  useEffect(() => {
    if (!canvasRef.current) return
    if (chartRef.current) chartRef.current.destroy()

    const labels = Array.from({ length: months + 1 }, (_, i) => (i === 0 ? 'Now' : `+${i}mo`))

    const datasets = topCompetitors.map((c, i) => {
      const color = LINE_COLORS[i % LINE_COLORS.length]
      const growthPct = parseGrowthPct(c.growth)
      return {
        label: c.name,
        data: buildShareTrend(c.share, growthPct, months),
        borderColor: color.line,
        backgroundColor: 'transparent',
        borderWidth: 2.5,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: color.line,
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
      }
    })

    chartRef.current = new Chart(canvasRef.current, {
      type: 'line',
      data: { labels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 900, easing: 'easeOutQuart' },
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            align: 'start',
            labels: {
              usePointStyle: true,
              pointStyle: 'circle',
              font: { size: 11, family: 'Inter' },
              color: '#C7D0F5',
              padding: 14,
              boxWidth: 7,
            },
          },
          tooltip: {
            backgroundColor: 'rgba(15,17,35,0.95)',
            titleFont: { family: 'Inter', size: 12, weight: '600' },
            bodyFont: { family: 'IBM Plex Mono', size: 11.5 },
            padding: 10,
            cornerRadius: 8,
            callbacks: { label: (c) => ' ' + c.dataset.label + ': ' + c.parsed.y + '%' },
          },
        },
        scales: {
          y: {
            grid: { color: 'rgba(255,255,255,0.08)' },
            border: { display: false },
            ticks: { callback: (v) => v + '%', font: { size: 10, family: 'Inter' }, color: '#8891C7' },
          },
          x: {
            grid: { display: false },
            border: { color: 'rgba(255,255,255,0.12)' },
            ticks: { font: { size: 10, family: 'Inter' }, color: '#8891C7' },
          },
        },
      },
    })

    return () => {
      if (chartRef.current) chartRef.current.destroy()
    }
  }, [months, competitors])

  return (
    <div className="forecast-panel">
      <div className="forecast-glow" />
      <div className="forecast-content">
        <div className="forecast-header">
          <div>
            <h2>Competitor Forecast</h2>
            <p>Projected market share and revenue trend, extrapolated from each company's current growth rate.</p>
          </div>

          <div className="horizon-toggle">
            <div className={'horizon-slider ' + (months === 6 ? 'right' : 'left')} />
            <button className={months === 3 ? 'active' : ''} onClick={() => setMonths(3)}>3 Months</button>
            <button className={months === 6 ? 'active' : ''} onClick={() => setMonths(6)}>6 Months</button>
          </div>
        </div>

        <div className="forecast-chart-wrap">
          <canvas ref={canvasRef} />
        </div>

        <div className="forecast-cards-grid">
          {topCompetitors.map((c, i) => (
            <PredictionCard key={c.name} competitor={c} months={months} color={LINE_COLORS[i % LINE_COLORS.length]} />
          ))}
        </div>

        <p className="forecast-disclaimer">
          Projection method: current value × (1 + annual growth rate × horizon ÷ 12). This is a transparent
          extrapolation of the stored growth figures, not an external live prediction feed — no such
          free/public feed exists for private-company market share.
        </p>
      </div>
    </div>
  )
}
