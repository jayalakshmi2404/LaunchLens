import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext.jsx';
import BarChart from '../components/BarChart.jsx';
import GaugeChart from '../components/GaugeChart.jsx';
import RiskHeatmap from '../components/RiskHeatmap.jsx';
import RiskBenchmarkChart from '../components/RiskBenchmarkChart.jsx';
import AssessmentReportModal from '../components/AssessmentReportModal.jsx';
import { generateAssessmentReport } from '../services/api.js';
import { computeRisks } from '../utils/riskEngine.js';
import './Dashboard.css';

const years = ['2020', '2021', '2022', '2023', '2024', '2025', '2026'];

export default function Dashboard() {
  const { projectData } = useProject();
  const { form = {}, market = {}, competitors = [] } = projectData || {};

  const [loadingReport, setLoadingReport] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [reportError, setReportError] = useState(null);

  // Compute live risk profile for heatmap and benchmark charts
  const riskEngineOutput = projectData?.form?.industry ? computeRisks(projectData) : null;
  const riskCategories = riskEngineOutput?.items?.map(r => ({
    name: r.cat,
    score: r.pct,
    severity: r.sev,
    trigger: r.reason
  })) || [
    { name: 'Market Risk', score: market.somGrowth < 0 ? 72 : 45, trigger: `SOM Growth ${market.somGrowth || 0}%` },
    { name: 'Competitive Risk', score: competitors[0]?.share >= 25 ? 72 : 45, trigger: competitors[0] ? `${competitors[0].name} (${competitors[0].share}%)` : 'Baseline' },
    { name: 'Financial Risk', score: form.budget ? 45 : 72, trigger: `Budget: ${form.budget || 'N/A'}` },
    { name: 'Technical Risk', score: form.businessModel === 'Hardware' ? 72 : 20, trigger: `Model: ${form.businessModel || 'SaaS'}` },
    { name: 'Regulatory Risk', score: ['Fintech', 'Healthcare'].includes(form.industry) ? 72 : 20, trigger: `Sector: ${form.industry || 'Technology'}` }
  ];

  const tamVal = market.tam ? `₹${market.tam.toLocaleString()} Cr` : '₹18,500 Cr';
  const samVal = market.sam ? `₹${market.sam.toLocaleString()} Cr` : '₹6,200 Cr';
  const somVal = market.som ? `₹${market.som.toLocaleString()} Cr` : '₹92 Cr';
  const leaderShare = competitors[0]?.share ? `${competitors[0].share}%` : '28%';

  const kpis = [
    { label: 'TAM', value: tamVal, color: '#fb7185' },
    { label: 'SAM', value: samVal, color: '#fbbf24' },
    { label: 'SOM', value: somVal, color: '#34d399' },
    { label: 'Top Competitor Share', value: leaderShare, color: '#7c3aed' },
  ];

  const somByYear = market.som ? [
    Math.round(market.som * 0.25),
    Math.round(market.som * 0.38),
    Math.round(market.som * 0.50),
    Math.round(market.som * 0.65),
    Math.round(market.som * 0.78),
    Math.round(market.som * 0.90),
    market.som
  ] : [22, 34, 45, 58, 71, 84, 92];

  const overallRiskScore = riskEngineOutput?.overallScore || 45;
  const marketFit = 100 - overallRiskScore;

  const handleGenerateReport = async () => {
    setLoadingReport(true);
    setReportError(null);
    try {
      const data = await generateAssessmentReport(projectData);
      setReportData(data);
    } catch (err) {
      console.error('Error generating report:', err);
      setReportError(err.message || 'Failed to generate assessment report.');
    } finally {
      setLoadingReport(false);
    }
  };

  return (
    <div className="page-wide">
      <div className="page-header dashboard-header">
        <div>
          <h1>Executive Dashboard & Risk Analytics</h1>
          <p>A summary view of market size, risk distribution, sector benchmarks, and launch readiness.</p>
        </div>
        <div className="header-actions">
          <button 
            className="btn-primary report-btn" 
            onClick={handleGenerateReport}
            disabled={loadingReport}
          >
            {loadingReport ? '🔄 Generating Report...' : '📄 Generate Full Assessment Report'}
          </button>
        </div>
      </div>

      {reportError && (
        <div className="report-error-banner">
          ⚠️ {reportError}
        </div>
      )}

      {/* KPI Cards */}
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

      {/* Analytics Charts Grid */}
      <div className="dash-grid">
        <div className="card">
          <div className="card-head">
            <h2>SOM Capture Trajectory</h2>
          </div>
          <BarChart data={somByYear} labels={years} />
        </div>

        <div className="card">
          <div className="card-head">
            <h2>Market Fit & Readiness Score</h2>
          </div>
          <div className="readiness-wrap">
            <GaugeChart value={marketFit} />
            <div className="readiness-list">
              <div className="readiness-row">
                <div className="label">Overall Risk Score</div>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: overallRiskScore + '%', background: overallRiskScore >= 60 ? '#ef4444' : '#f59e0b' }} />
                </div>
                <div className="val">{overallRiskScore}/100</div>
              </div>
              <div className="readiness-row">
                <div className="label">Market Fit Rating</div>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: marketFit + '%', background: '#10b981' }} />
                </div>
                <div className="val">{marketFit}%</div>
              </div>
              <div className="readiness-row">
                <div className="label">Technical Readiness</div>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: '75%', background: '#7c3aed' }} />
                </div>
                <div className="val">75%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Milestone 4 Risk Analytics Dashboard Heatmaps & Benchmarks */}
      <RiskHeatmap riskData={riskCategories} />

      <RiskBenchmarkChart projectRisk={riskCategories} industryName={form.industry || 'Technology'} />

      {/* Comprehensive Assessment Report Modal */}
      {reportData && (
        <AssessmentReportModal 
          reportData={reportData} 
          projectData={projectData}
          onClose={() => setReportData(null)} 
        />
      )}
    </div>
  );
}
