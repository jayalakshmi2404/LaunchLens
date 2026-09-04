/**
 * Builds a fully self-contained HTML document for printing the assessment report.
 * Rendered in its own print window so the app's own CSS (modals, overlays,
 * backdrop-filters, fixed positioning, etc.) can never interfere with printing.
 */
export function buildPrintableReportHtml(report) {
  const { summary, milestone1, milestone2, milestone3 } = report;

  const esc = (val) => String(val ?? '').replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>${esc(summary.projectName)} Assessment Report</title>
<style>
  @page { size: A4 portrait; margin: 12mm; }
  * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #000; background: #fff; margin: 0; padding: 24px; font-size: 11pt; line-height: 1.45; }
  .page-box { border: 1.5px solid #000; padding: 24px; margin-bottom: 20px; }
  .title-section { text-align: center; border-bottom: 2px solid #000; padding-bottom: 12px; margin-bottom: 20px; }
  .brand { font-size: 14pt; font-weight: bold; letter-spacing: 3px; }
  .main-title { font-size: 18pt; font-weight: bold; margin: 6px 0; }
  .subtitle { font-size: 10pt; font-style: italic; color: #333; }
  .section-title { font-size: 14pt; font-weight: bold; border-bottom: 1.5px solid #000; padding-bottom: 4px; margin-top: 15px; margin-bottom: 12px; }
  .grid-2 { display: table; width: 100%; margin-bottom: 14px; }
  .grid-cell { display: table-cell; width: 50%; padding: 6px 8px; vertical-align: top; }
  .card-box { border: 1px solid #000; padding: 10px 12px; margin-bottom: 8px; font-size: 10.5pt; }
  table.data-table { width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 10pt; }
  table.data-table th, table.data-table td { border: 1px solid #000; padding: 6px 8px; text-align: left; }
  table.data-table th { background: #f2f2f2; font-weight: bold; }
  .badge { padding: 2px 6px; border: 1px solid #000; font-size: 8.5pt; font-weight: bold; text-transform: uppercase; }
  @media print { body { padding: 0; } }
</style>
</head>
<body>

<div class="page-box">
  <div class="title-section">
    <div class="brand">LAUNCHLENS</div>
    <div class="main-title">COMPREHENSIVE STARTUP ASSESSMENT REPORT</div>
    <div class="subtitle">Report ID: ${esc(report.reportId)} | Generated: ${esc(new Date(report.generatedAt).toLocaleString())}</div>
  </div>

  <div class="section-title">1. Executive Summary &amp; Project Profile</div>
  <div class="grid-2">
    <div class="grid-cell">
      <div class="card-box"><strong>Project Name:</strong> ${esc(summary.projectName)}</div>
      <div class="card-box"><strong>Industry:</strong> ${esc(summary.industry)}</div>
      <div class="card-box"><strong>Business Model:</strong> ${esc(summary.businessModel)}</div>
      <div class="card-box"><strong>Budget:</strong> ${esc(summary.budget)}</div>
    </div>
    <div class="grid-cell">
      <div class="card-box"><strong>Target Market:</strong> ${esc(summary.targetMarket)}</div>
      <div class="card-box"><strong>Overall Risk Level:</strong> ${esc(summary.riskLevel)} (${esc(summary.overallRiskScore)}/100)</div>
      <div class="card-box"><strong>Market Fit Rating:</strong> ${esc(summary.marketFitPercentage)}%</div>
      <div class="card-box"><strong>Quality Audit Score:</strong> ${esc(summary.qualityAuditScore)}/100</div>
    </div>
  </div>
  <div class="card-box"><strong>Project Description:</strong> ${esc(summary.description)}</div>

  <div class="section-title">2. Market Intelligence &amp; Competitors (Milestone 1)</div>
  <table class="data-table">
    <thead>
      <tr><th>Metric</th><th>INR Value</th><th>Annual Growth</th><th>Source</th></tr>
    </thead>
    <tbody>
      <tr><td>TAM</td><td>₹${esc(milestone1.marketSizing.tamCr)} Cr</td><td>+${esc(milestone1.marketSizing.tamGrowthPct)}%</td><td rowspan="3">${esc(milestone1.marketSizing.source)}</td></tr>
      <tr><td>SAM</td><td>₹${esc(milestone1.marketSizing.samCr)} Cr</td><td>+${esc(milestone1.marketSizing.samGrowthPct)}%</td></tr>
      <tr><td>SOM</td><td>₹${esc(milestone1.marketSizing.somCr)} Cr</td><td>${esc(milestone1.marketSizing.somGrowthPct)}%</td></tr>
    </tbody>
  </table>

  <table class="data-table">
    <thead>
      <tr><th>Competitor Name</th><th>Type</th><th>Market Share</th><th>Revenue</th></tr>
    </thead>
    <tbody>
      ${milestone1.competitors.map(c => `<tr><td><strong>${esc(c.name)}</strong></td><td>${esc(c.type)}</td><td>${esc(c.marketSharePct)}%</td><td>${c.revenueCr ? '₹' + esc(c.revenueCr) + ' Cr' : 'N/A'}</td></tr>`).join('')}
    </tbody>
  </table>
</div>

<div class="page-box">
  <div class="section-title">3. Risk Assessment &amp; Feasibility (Milestone 2)</div>
  <table class="data-table">
    <thead>
      <tr><th>Risk Category</th><th>Score</th><th>Severity</th><th>Trigger Condition</th></tr>
    </thead>
    <tbody>
      ${milestone2.riskCategories.map(r => `<tr><td><strong>${esc(r.name)}</strong></td><td>${esc(r.score)}/100</td><td><span class="badge">${esc(r.severity)}</span></td><td>${esc(r.trigger)}</td></tr>`).join('')}
    </tbody>
  </table>
  <div class="card-box"><strong>Feasibility Analysis Verdict:</strong> ${esc(milestone2.feasibilityVerdict)}</div>

  <div class="section-title">4. AI Strategic Recommendations (Milestone 3 Task 1)</div>
  ${milestone3.aiRecommendations.map((rec, i) => `
    <div class="card-box">
      <strong>${i + 1}. ${esc(rec.title)}</strong> <span class="badge">${esc(rec.priority)}</span><br>
      <p style="margin:4px 0">${esc(rec.body)}</p>
      <small><em>Data Rationale: ${esc(rec.rationale)}</em></small>
    </div>
  `).join('')}
</div>

<div class="page-box">
  <div class="section-title">5. Risk Mitigations &amp; Action Items (Milestone 3 Task 2)</div>
  ${milestone3.mitigations.map((mit, i) => `
    <div class="card-box">
      <strong>Risk #${i + 1}: ${esc(mit.riskProblem)}</strong> <span class="badge">${esc(mit.severity)}</span><br>
      <strong>Strategy:</strong> ${esc(mit.mitigationStrategy)}<br>
      <strong>30-Day Action:</strong> ${esc(mit.recommendedAction)}<br>
      <strong>Expected Outcome:</strong> ${esc(mit.expectedOutcome)}
    </div>
  `).join('')}

  <div class="section-title">6. LangGraph Workflow &amp; Quality Audit (Milestone 3 Task 3)</div>
  <div class="card-box">
    <strong>Workflow Execution Status:</strong> ${milestone3.workflowStatus.success ? 'SUCCESS (COMPLETED)' : 'PROCESSING'}<br>
    <strong>Nodes Executed:</strong> ${esc(milestone3.workflowStatus.nodesExecuted)} Nodes (8-Node Graph)<br>
    <strong>Quality Audit Score:</strong> ${esc(milestone3.workflowStatus.qualityScore)} / 100
  </div>
</div>

</body>
</html>
  `;
}