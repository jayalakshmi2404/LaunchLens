import { useEffect, useState } from 'react';
import { fetchMitigations } from '../services/api.js';
import './MitigationEnginePanel.css';

export default function MitigationEnginePanel({ projectData }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  async function loadMitigations() {
    if (!projectData) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetchMitigations(projectData);
      setData(res);
    } catch (err) {
      console.error('Failed to load mitigations:', err);
      setError(err.message || 'Could not fetch mitigation suggestions');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMitigations();
  }, [projectData]);

  if (!projectData) return null;

  return (
    <div className="mitigation-panel-wrap">
      <div className="mitigation-panel-header">
        <div>
          <h2>Mitigation & Improvement Suggestion Engine</h2>
          <p className="subtitle">
            Actionable strategies, root-cause analysis, and priority actions derived from actual project data.
          </p>
        </div>
        {data && (
          <div className="engine-provider-badge">
            <span className="pulse-dot-mini" />
            Engine: <b>{data.provider === 'gemini' ? 'Gemini AI' : data.provider === 'openai' ? 'OpenAI' : 'Rule Engine Fallback'}</b>
          </div>
        )}
      </div>

      {data?.warning && (
        <div className="mitigation-warning-banner">
          ⚠️ {data.warning}
        </div>
      )}

      {loading && (
        <div className="card mitigation-loading-card">
          <div className="rec-spinner" />
          <p className="loading-text">Synthesizing risk mitigations & strategic improvements from project metrics...</p>
        </div>
      )}

      {error && (
        <div className="card mitigation-error-card">
          <p className="error-text">❌ {error}</p>
          <button type="button" className="btn-primary" onClick={loadMitigations}>
            Retry Mitigation Analysis
          </button>
        </div>
      )}

      {!loading && !error && data && data.mitigations && (
        <div className="mitigation-grid">
          {data.mitigations.map((m, idx) => (
            <div className="card mitigation-card" key={idx}>
              <div className="mitigation-top">
                <div className="mitigation-tags">
                  <span className={'severity-pill ' + (m.severity || 'medium')}>Severity: {m.severity}</span>
                  <span className={'priority-tag ' + (m.priority || 'high')}>{m.priority}</span>
                </div>
              </div>

              <div className="mitigation-problem">{m.riskProblem}</div>

              <div className="mitigation-section">
                <span className="section-label">Root Causes:</span>
                <p className="section-text">{m.possibleCauses}</p>
              </div>

              <div className="mitigation-section highlight-box">
                <span className="section-label text-purple">Mitigation Strategy:</span>
                <p className="section-text">{m.mitigationStrategy}</p>
              </div>

              <div className="mitigation-section highlight-box green">
                <span className="section-label text-green">Improvement Suggestion:</span>
                <p className="section-text">{m.improvementSuggestion}</p>
              </div>

              <div className="mitigation-footer">
                <div className="action-row">
                  <b>Recommended Action:</b> {m.recommendedAction}
                </div>
                <div className="outcome-row">
                  <b>Expected Outcome:</b> {m.expectedOutcome}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
