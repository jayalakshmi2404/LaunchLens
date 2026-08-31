import React, { useState } from 'react';
import { downloadAssessmentReportPdf } from '../services/api.js';
import './AssessmentReportModal.css';

export default function AssessmentReportModal({ reportData, projectData, onClose }) {
  const [copied, setCopied] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  if (!reportData) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    setDownloadingPdf(true);
    try {
      const payload = projectData || {
        form: {
          projectName: reportData.summary.projectName,
          industry: reportData.summary.industry,
          businessModel: reportData.summary.businessModel,
          budget: reportData.summary.budget,
          targetMarket: reportData.summary.targetMarket,
          description: reportData.summary.description
        },
        market: {
          tam: reportData.milestone1.marketSizing.tamCr,
          sam: reportData.milestone1.marketSizing.samCr,
          som: reportData.milestone1.marketSizing.somCr,
          tamGrowth: reportData.milestone1.marketSizing.tamGrowthPct,
          samGrowth: reportData.milestone1.marketSizing.samGrowthPct,
          somGrowth: reportData.milestone1.marketSizing.somGrowthPct,
          source: reportData.milestone1.marketSizing.source
        },
        competitors: reportData.milestone1.competitors.map(c => ({
          name: c.name, type: c.type, share: c.marketSharePct, revenue: c.revenueCr, growth: c.growthPct
        }))
      };

      await downloadAssessmentReportPdf(payload);
    } catch (err) {
      console.error('Error downloading PDF file:', err);
      // Fallback to window.print() if API call fails
      window.print();
    } finally {
      setDownloadingPdf(false);
    }
  };

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(reportData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${reportData.summary.projectName.replace(/\s+/g, '_')}_Assessment_Report.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(reportData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const { summary, milestone1, milestone2, milestone3 } = reportData;

  return (
    <div className="report-modal-overlay">
      <div className="report-modal-container printable-area">
        {/* Modal Actions Header - Always Visible & Responsive */}
        <div className="modal-header-actions no-print">
          <div className="actions-left">
            <span className="report-id-badge">{reportData.reportId}</span>
            <span className="report-date">{new Date(reportData.generatedAt).toLocaleString()}</span>
          </div>
          <div className="actions-right">
            <button className="btn-action download-pdf" onClick={handleDownloadPdf} disabled={downloadingPdf}>
              {downloadingPdf ? '⏳ Generating PDF...' : '📥 Download PDF File'}
            </button>
            <button className="btn-action print" onClick={handlePrint}>🖨️ Print Report</button>
            <button className="btn-action json" onClick={handleExportJson}>📥 Export JSON</button>
            <button className="btn-action copy" onClick={handleCopy}>
              {copied ? '✓ Copied' : '📋 Copy JSON'}
            </button>
            <button className="btn-close" onClick={onClose}>✕ Close</button>
          </div>
        </div>

        {/* Report Content Body */}
        <div className="report-body">
          <div className="report-title-section">
            <div className="brand-logo">LAUNCHLENS</div>
            <h1 className="report-title">COMPREHENSIVE STARTUP ASSESSMENT REPORT</h1>
            <p className="report-subtitle">Full-Stack Market Intelligence, Strategic Risk & AI Reasoning Evaluation</p>
          </div>

          {/* Section 1: Executive Summary */}
          <div className="report-section block-summary">
            <h2 className="section-heading">1. Executive Summary & Project Profile</h2>
            <div className="grid-summary">
              <div className="summary-item">
                <span className="label">Project Name:</span>
                <span className="val bold">{summary.projectName}</span>
              </div>
              <div className="summary-item">
                <span className="label">Industry:</span>
                <span className="val">{summary.industry}</span>
              </div>
              <div className="summary-item">
                <span className="label">Business Model:</span>
                <span className="val">{summary.businessModel}</span>
              </div>
              <div className="summary-item">
                <span className="label">Budget:</span>
                <span className="val">{summary.budget}</span>
              </div>
              <div className="summary-item">
                <span className="label">Target Market:</span>
                <span className="val">{summary.targetMarket}</span>
              </div>
              <div className="summary-item">
                <span className="label">Overall Risk Level:</span>
                <span className={`val badge-risk ${summary.riskLevel.toLowerCase()}`}>
                  {summary.riskLevel} ({summary.overallRiskScore}/100)
                </span>
              </div>
              <div className="summary-item">
                <span className="label">Market Fit Rating:</span>
                <span className="val bold highlight">{summary.marketFitPercentage}%</span>
              </div>
              <div className="summary-item">
                <span className="label">Quality Audit Score:</span>
                <span className="val bold highlight">{summary.qualityAuditScore}/100</span>
              </div>
            </div>
            <p className="description-text"><strong>Project Description:</strong> {summary.description}</p>
          </div>

          {/* Section 2: Milestone 1 Data */}
          <div className="report-section">
            <h2 className="section-heading">2. Market Intelligence & Competitor Landscape (Milestone 1)</h2>
            <div className="sizing-table-wrapper">
              <table className="report-table">
                <thead>
                  <tr>
                    <th>Market Sizing Metric</th>
                    <th>INR Value (Crore)</th>
                    <th>Annual Growth Rate (%)</th>
                    <th>Data Source</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>TAM (Total Addressable Market)</td>
                    <td>₹{milestone1.marketSizing.tamCr} Cr</td>
                    <td>+{milestone1.marketSizing.tamGrowthPct}%</td>
                    <td rowSpan="3" className="source-cell">{milestone1.marketSizing.source}</td>
                  </tr>
                  <tr>
                    <td>SAM (Serviceable Addressable Market)</td>
                    <td>₹{milestone1.marketSizing.samCr} Cr</td>
                    <td>+{milestone1.marketSizing.samGrowthPct}%</td>
                  </tr>
                  <tr>
                    <td>SOM (Serviceable Obtainable Market)</td>
                    <td>₹{milestone1.marketSizing.somCr} Cr</td>
                    <td>{milestone1.marketSizing.somGrowthPct}%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="sub-heading">Competitor Landscape</h3>
            <table className="report-table">
              <thead>
                <tr>
                  <th>Competitor Name</th>
                  <th>Type</th>
                  <th>Market Share (%)</th>
                  <th>Revenue (Cr)</th>
                  <th>Growth Rate (%)</th>
                </tr>
              </thead>
              <tbody>
                {milestone1.competitors.map((comp, idx) => (
                  <tr key={idx}>
                    <td className="bold">{comp.name}</td>
                    <td><span className="badge-type">{comp.type}</span></td>
                    <td>{comp.marketSharePct}%</td>
                    <td>{comp.revenueCr ? `₹${comp.revenueCr} Cr` : 'N/A'}</td>
                    <td>+{comp.growthPct}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Section 3: Milestone 2 Data */}
          <div className="report-section">
            <h2 className="section-heading">3. Strategic Risk Assessment & Feasibility (Milestone 2)</h2>
            <div className="risk-grid-report">
              {milestone2.riskCategories.map((rc, idx) => (
                <div key={idx} className={`risk-card-mini ${rc.severity.toLowerCase()}`}>
                  <span className="rc-name">{rc.name}</span>
                  <span className="rc-score">{rc.score}/100</span>
                  <span className="rc-trigger">{rc.trigger}</span>
                </div>
              ))}
            </div>

            <div className="feasibility-box">
              <span className="f-label">Feasibility Analysis Verdict:</span>
              <span className="f-verdict">{milestone2.feasibilityVerdict}</span>
            </div>
          </div>

          {/* Section 4: Milestone 3 Task 1 AI Recs */}
          <div className="report-section">
            <h2 className="section-heading">4. AI-Powered Strategic Recommendations (Milestone 3 Task 1)</h2>
            <div className="recs-list-report">
              {milestone3.aiRecommendations.map((rec, idx) => (
                <div key={idx} className="rec-card-report">
                  <div className="rec-header">
                    <span className="rec-title">{idx + 1}. {rec.title}</span>
                    <span className={`badge-prio ${rec.priority}`}>{rec.priority}</span>
                  </div>
                  <p className="rec-body">{rec.body}</p>
                  <p className="rec-rationale"><strong>Data Rationale:</strong> {rec.rationale}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Milestone 3 Task 2 Mitigations */}
          <div className="report-section">
            <h2 className="section-heading">5. Mitigation & Improvement Suggestion Engine (Milestone 3 Task 2)</h2>
            <div className="mitigations-list-report">
              {milestone3.mitigations.map((mit, idx) => (
                <div key={idx} className="mit-card-report">
                  <div className="mit-header">
                    <span className="mit-problem">Risk #{idx + 1}: {mit.riskProblem}</span>
                    <span className={`badge-sev ${mit.severity}`}>{mit.severity}</span>
                  </div>
                  <p className="mit-causes"><strong>Root Causes:</strong> {mit.possibleCauses}</p>
                  <p className="mit-strat"><strong>Mitigation Strategy:</strong> {mit.mitigationStrategy}</p>
                  <p className="mit-action"><strong>Recommended Action:</strong> {mit.recommendedAction}</p>
                  <p className="mit-outcome"><strong>Expected Outcome:</strong> {mit.expectedOutcome}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 6: Milestone 3 Task 3 LangGraph Workflow & Quality Audit */}
          <div className="report-section">
            <h2 className="section-heading">6. LangGraph Multi-Agent Workflow Execution (Milestone 3 Task 3)</h2>
            <div className="grid-summary">
              <div className="summary-item">
                <span className="label">Workflow Execution Status:</span>
                <span className="val bold highlight">{milestone3.workflowStatus.success ? '✓ SUCCESS (COMPLETED)' : 'PROCESSING'}</span>
              </div>
              <div className="summary-item">
                <span className="label">Nodes Executed:</span>
                <span className="val bold">{milestone3.workflowStatus.nodesExecuted} Nodes (8-Node Graph)</span>
              </div>
              <div className="summary-item">
                <span className="label">Quality Audit Score:</span>
                <span className="val bold highlight">{milestone3.workflowStatus.qualityScore} / 100</span>
              </div>
              <div className="summary-item">
                <span className="label">Audit Status:</span>
                <span className="val bold">{milestone3.workflowStatus.qualityScore >= 70 ? 'APPROVED (HIGH GROUNDING)' : 'REFINED'}</span>
              </div>
            </div>
          </div>

          {/* Footer Sign-off */}
          <div className="report-footer-print">
            <p>LaunchLens Full-Stack Assessment Platform — Confidential Executive Dossier</p>
          </div>
        </div>
      </div>
    </div>
  );
}
