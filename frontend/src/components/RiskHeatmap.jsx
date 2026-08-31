import React from 'react';
import './RiskHeatmap.css';

export default function RiskHeatmap({ riskData }) {
  if (!riskData || !Array.isArray(riskData)) {
    return (
      <div className="risk-heatmap-card empty">
        <p>No risk data available for heatmap rendering. Analyze a project on Project Input first.</p>
      </div>
    );
  }

  const getSeverityClass = (score) => {
    if (score >= 60) return 'severity-high';
    if (score >= 40) return 'severity-medium';
    return 'severity-low';
  };

  const getSeverityLabel = (score) => {
    if (score >= 60) return 'HIGH (CRITICAL)';
    if (score >= 40) return 'MEDIUM (MODERATE)';
    return 'LOW (OPTIMAL)';
  };

  return (
    <div className="risk-heatmap-card">
      <div className="heatmap-header">
        <h3 className="heatmap-title">5-Category Risk Matrix & Sector Heatmap</h3>
        <span className="heatmap-subtitle">Real-time risk distribution across project parameters</span>
      </div>

      <div className="heatmap-grid">
        {riskData.map((cat, idx) => {
          const score = cat.score || 20;
          const sevClass = getSeverityClass(score);
          const sevLabel = getSeverityLabel(score);

          return (
            <div key={idx} className={`heatmap-cell ${sevClass}`}>
              <div className="cell-top">
                <span className="cat-name">{cat.name || `Category ${idx + 1}`}</span>
                <span className="cat-score">{score}/100</span>
              </div>
              
              <div className="progress-bar-bg">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${score}%` }}
                ></div>
              </div>

              <div className="cell-bottom">
                <span className="sev-tag">{sevLabel}</span>
                <span className="trigger-text">{cat.trigger || 'Baseline'}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
