import { useEffect, useState } from 'react'
import Select from '../components/Select.jsx'
import TrendChart from '../components/TrendChart.jsx'
import CompetitorList from '../components/CompetitorList.jsx'
import CompetitorForecast from '../components/CompetitorForecast.jsx'
import AgentPipeline from '../components/AgentPipeline.jsx'
import useCountUp from '../hooks/useCountUp.js'
import { useProject } from '../context/ProjectContext.jsx'
import { marketSizing, competitorsByIndustry, formatINR } from '../data/marketData.js'
import { fetchMarketData, fetchCompetitors, submitProject } from '../services/api.js'
import './ProjectInput.css'

const industryOptions = [
  'Technology',
  'Healthcare',
  'Fintech',
  'E-commerce',
  'Education',
  'Manufacturing',
  'Real Estate & PropTech',
  'Agritech & FoodTech',
  'CleanTech & Energy',
  'Media & Entertainment',
  'Automotive & Mobility',
  'Travel & Hospitality',
  'Retail & D2C',
  'Cybersecurity & Cloud',
  'Other'
]

const businessModelOptions = [
  'SaaS',
  'Marketplace',
  'Subscription',
  'Hardware',
  'Services',
  'Freemium',
  'Transactional & Commission',
  'D2C (Direct-to-Consumer)',
  'B2B2C',
  'Outcome & Performance Based',
  'Ad-Supported',
  'Licensing',
  'Other'
]

function normalizeMarket(row) {
  return {
    tam: Number(row.tam_cr),
    sam: Number(row.sam_cr),
    som: Number(row.som_cr),
    tamGrowth: Number(row.tam_growth_pct),
    samGrowth: Number(row.sam_growth_pct),
    somGrowth: Number(row.som_growth_pct),
    source: row.source,
    asOf: new Date(row.as_of_date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }),
  }
}

function normalizeCompetitor(row) {
  return {
    name: row.name,
    type: row.type,
    share: Number(row.market_share_pct),
    revenue: row.revenue_cr ? formatINR(Number(row.revenue_cr)) : 'Undisclosed',
    growth: (row.growth_pct >= 0 ? '+' : '') + row.growth_pct + '%',
    isPublic: row.is_public_company,
    stockSymbol: row.stock_symbol,
    live: row.live,
    liveError: row.liveError,
    source: row.source,
    asOf: new Date(row.as_of_date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }),
  }
}

function fallbackMarket(industry) {
  const m = marketSizing[industry] || marketSizing.Other
  return { ...m, source: 'Bundled offline sample data (backend unreachable)', asOf: '—' }
}
function fallbackCompetitors(industry) {
  const list = competitorsByIndustry[industry] || competitorsByIndustry.Other
  return list.map((c) => ({
    ...c,
    isPublic: false,
    stockSymbol: null,
    source: 'Bundled offline sample data (backend unreachable)',
    asOf: '—',
  }))
}

function StatBox({ label, value, growth }) {
  const animated = useCountUp(value)
  return (
    <div className="stat-box">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{formatINR(animated)}</div>
      <div className={'stat-delta ' + (growth >= 0 ? 'up' : 'down')}>
        {growth >= 0 ? '↑' : '↓'} {Math.abs(growth)}%
      </div>
    </div>
  )
}

export default function ProjectInput() {
  const {
    setProjectData,
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
    resetProject,
  } = useProject()

  // Purely transient UI/animation state — fine to reset on remount since it
  // only matters while an analysis run is actively in progress. Once
  // hasAnalyzed + showResults are true (from context), this is never
  // consulted again until the next "Analyze Project" click.
  const [liveLoading, setLiveLoading] = useState(false)
  const [dataReady, setDataReady] = useState(false)
  const [stepsReady, setStepsReady] = useState(false)
  const [pipelineKey, setPipelineKey] = useState(0)

  const agentSteps = [
    'Connecting to market intelligence database…',
    `Analyzing ${form.industry} sector trends…`,
    'Scanning competitor landscape…',
    'Generating forecast & recommendations…',
  ]

  async function loadAnalysis(industry) {
    setDataReady(false)
    setStepsReady(false)
    setShowResults(false)
    setPipelineKey((k) => k + 1)
    setAnalyzedIndustry(industry)

    try {
      const [marketRow, competitorRows] = await Promise.all([
        fetchMarketData(industry),
        fetchCompetitors(industry, { live: liveMode }),
      ])
      const normalizedMarket = normalizeMarket(marketRow)
      const rawNormalized = competitorRows.map(normalizeCompetitor)
      const seenNames = new Set()
      const normalizedCompetitors = rawNormalized.filter((c) => {
        if (seenNames.has(c.name)) return false
        seenNames.add(c.name)
        return true
      })
      setMarket(normalizedMarket)
      setCompetitors(normalizedCompetitors)
      setBackendOnline(true)
      setProjectData({ form: { ...form, industry }, market: normalizedMarket, competitors: normalizedCompetitors })
    } catch (err) {
      console.warn('Backend unreachable, using bundled sample data:', err.message)
      const fbMarket = fallbackMarket(industry)
      const fbCompetitors = fallbackCompetitors(industry)
      setMarket(fbMarket)
      setCompetitors(fbCompetitors)
      setBackendOnline(false)
      setProjectData({ form: { ...form, industry }, market: fbMarket, competitors: fbCompetitors })
    } finally {
      setDataReady(true)
    }
  }

  // Reveal results once both the data and the step animation are ready.
  useEffect(() => {
    if (dataReady && stepsReady) {
      setShowResults(true)
    }
  }, [dataReady, stepsReady])

  // If "Show live stock data" is toggled AFTER analysis has already run,
  // just refresh the competitor data - no need to replay the whole
  // agent-pipeline animation again for that.
  useEffect(() => {
    if (!hasAnalyzed) return
    let cancelled = false
    async function refreshCompetitorsOnly() {
      setLiveLoading(true)
      try {
        const rows = await fetchCompetitors(analyzedIndustry, { live: liveMode })
        const normalized = rows.map(normalizeCompetitor)
        if (!cancelled) {
          setCompetitors(normalized)
          setProjectData((prev) => (prev ? { ...prev, competitors: normalized } : prev))
        }
      } catch (err) {
        console.warn('Could not refresh live competitor data:', err.message)
      } finally {
        if (!cancelled) setLiveLoading(false)
      }
    }
    refreshCompetitorsOnly()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [liveMode])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError(null)

    try {
      const saved = await submitProject(form)
      setSubmitted({ ...form, id: saved.id, persisted: true })
    } catch (err) {
      console.warn('Could not save to backend, keeping locally only:', err.message)
      setSubmitted({ ...form, persisted: false })
      setSubmitError('Backend unreachable — this project was not saved to the database.')
    }

    setHasAnalyzed(true)
    loadAnalysis(form.industry)
  }

  const handleReset = () => {
    resetProject()
    setDataReady(false)
    setStepsReady(false)
  }

  return (
    <div className="page-wide">
      <div className="page-header">
        <h1>Project Input</h1>
        <p>Enter your project details, then click Analyze Project to run the market analysis and competitor forecast.</p>
        {hasAnalyzed && !backendOnline && (
          <div className="backend-banner">
            Backend API not reachable at the configured URL — showing bundled sample data.
            Start the backend (see README) to connect to PostgreSQL.
          </div>
        )}
      </div>

      <div className="grid3">
        {/* Left: form */}
        <div className="card">
          <div className="card-head">
            <h2>Project Submission</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="projectName">Startup / Project Name</label>
              <input
                type="text"
                id="projectName"
                name="projectName"
                placeholder="e.g., TechVenture AI"
                value={form.projectName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <Select
                label="Industry / Sector"
                value={form.industry}
                options={industryOptions}
                onChange={(val) => setForm((p) => ({ ...p, industry: val }))}
              />
            </div>

            <div className="field">
              <Select
                label="Business Model"
                value={form.businessModel}
                options={businessModelOptions}
                onChange={(val) => setForm((p) => ({ ...p, businessModel: val }))}
              />
            </div>

            <div className="field">
              <label htmlFor="targetMarket">Target Market</label>
              <input
                type="text"
                id="targetMarket"
                name="targetMarket"
                placeholder="e.g., SMBs"
                value={form.targetMarket}
                onChange={handleChange}
              />
            </div>

            <div className="field">
              <label htmlFor="budget">Budget (INR)</label>
              <input
                type="text"
                id="budget"
                name="budget"
                placeholder="e.g., ₹80 Lakh"
                value={form.budget}
                onChange={handleChange}
              />
            </div>

            <div className="field">
              <label htmlFor="description">Project Description</label>
              <textarea
                id="description"
                name="description"
                placeholder="Brief description of your project idea…"
                value={form.description}
                onChange={handleChange}
              />
            </div>

            <div className="actions">
              <button type="button" className="btn-secondary" onClick={handleReset}>
                Reset
              </button>
              <button type="submit" className="btn-primary">
                Analyze Project
              </button>
            </div>
          </form>

          {submitted && submitted.persisted && (
            <div className="submitted-note">
              Saved to PostgreSQL as <b>{submitted.projectName || 'Untitled Project'}</b> (id #{submitted.id})
            </div>
          )}
          {submitted && !submitted.persisted && (
            <div className="submitted-note error">{submitError}</div>
          )}
        </div>

        {/* Center: market analysis */}
        <div className="card">
          <div className="card-head">
            <h2>Market Analysis</h2>
          </div>

          {!hasAnalyzed && (
            <p className="waiting-note">Fill in your project details and click "Analyze Project" to run the market analysis.</p>
          )}

          {hasAnalyzed && !showResults && (
            <AgentPipeline
              key={pipelineKey}
              steps={agentSteps}
              active={!showResults}
              onComplete={() => setStepsReady(true)}
            />
          )}

          {hasAnalyzed && showResults && market && (
            <div className="results-reveal">
              <div className="stat-row">
                <StatBox label="TAM" value={market.tam} growth={market.tamGrowth} />
                <StatBox label="SAM" value={market.sam} growth={market.samGrowth} />
                <StatBox label="SOM" value={market.som} growth={market.somGrowth} />
              </div>

              <div className="chart-wrap">
                <p className="chart-title">Market Trends (2020–2026) · {analyzedIndustry}</p>
                <TrendChart tamGrowth={market.tamGrowth} samGrowth={market.samGrowth} />
              </div>

              <div className="market-source-note">
                Source: {market.source} · as of {market.asOf}
              </div>
            </div>
          )}
        </div>

        {/* Right: competitor landscape (current snapshot) */}
        {!hasAnalyzed && (
          <div className="card">
            <div className="card-head">
              <h2>Competitor Landscape</h2>
            </div>
            <p className="waiting-note">Waiting for analysis…</p>
          </div>
        )}

        {hasAnalyzed && !showResults && (
          <div className="card">
            <div className="card-head">
              <h2>Competitor Landscape</h2>
            </div>
            <p className="waiting-note">Analysis in progress…</p>
          </div>
        )}

        {hasAnalyzed && showResults && (
          <div className="results-reveal">
            <CompetitorList
              competitors={competitors}
              liveMode={liveMode}
              liveLoading={liveLoading}
              onToggleLive={() => setLiveMode((v) => !v)}
            />
          </div>
        )}
      </div>

      {/* Full-width: competitor forecast panel, only after analysis completes */}
      {hasAnalyzed && showResults && competitors.length > 0 && (
        <CompetitorForecast competitors={competitors} />
      )}
    </div>
  )
}