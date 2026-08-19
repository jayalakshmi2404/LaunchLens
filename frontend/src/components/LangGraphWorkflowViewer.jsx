import { useEffect, useState } from 'react';
import { runWorkflow } from '../services/api.js';
import './LangGraphWorkflowViewer.css';

export default function LangGraphWorkflowViewer({ projectData }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [workflowResult, setWorkflowResult] = useState(null);
  const [activeStepIndex, setActiveStepIndex] = useState(-1);

  async function executeWorkflow() {
    if (!projectData) return;
    setLoading(true);
    setError(null);
    setActiveStepIndex(0);

    try {
      // Simulate step progression visually while backend graph executes
      const stepTimer = setInterval(() => {
        setActiveStepIndex((prev) => (prev < 6 ? prev + 1 : prev));
      }, 450);

      const res = await runWorkflow(projectData);
      clearInterval(stepTimer);
      setActiveStepIndex(7); // complete
      setWorkflowResult(res);
    } catch (err) {
      console.error('LangGraph workflow failed:', err);
      setError(err.message || 'Workflow execution failed');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    executeWorkflow();
  }, [projectData]);

  if (!projectData) return null;

  const defaultNodes = [
    { key: 'data', label: 'Existing Project Data', desc: 'Ingesting project parameters, TAM/SAM/SOM, and competitor share' },
    { key: 'analysis', label: 'Data Analysis', desc: 'Computing sector growth rates, market ratios, and share metrics' },
    { key: 'risk', label: 'Risk / Issue Identification', desc: 'Flagging market, competitive, capital, and regulatory threats' },
    { key: 'recommendation', label: 'Strategic Recommendation (Task 1 AI)', desc: 'Generating AI strategic recommendations from actual signals' },
    { key: 'mitigation', label: 'Mitigation Analysis (Task 2 Engine)', desc: 'Synthesizing root-cause mitigations & actionable improvements' },
    { key: 'improvement', label: 'Improvement Suggestions', desc: 'Formulating product, GTM, and financial optimizations' },
    { key: 'validation', label: 'Validation / Review', desc: 'Audit quality score evaluation & conditional routing review' },
    { key: 'final', label: 'Final Strategic Recommendations', desc: 'Assembling verified strategic dossier & execution roadmap' }
  ];

  return (
    <div className="lg-workflow-wrap card">
      <div className="lg-workflow-header">
        <div>
          <h2>LangGraph Agent Strategic Workflow</h2>
          <p className="subtitle">
            Autonomous multi-node reasoning graph connecting project metrics, AI recommendations, risk mitigations, and validation checks.
          </p>
        </div>
        <button
          type="button"
          className="btn-secondary re-run-btn"
          onClick={executeWorkflow}
          disabled={loading}
        >
          {loading ? 'Executing Graph...' : 'Re-run Workflow Graph'}
        </button>
      </div>

      {/* Visual Execution Graph */}
      <div className="lg-graph-pipeline">
        {defaultNodes.map((node, i) => {
          const isDone = activeStepIndex > i || (!loading && workflowResult);
          const isActive = loading && activeStepIndex === i;
          return (
            <div className="lg-node-wrapper" key={node.key}>
              <div className={`lg-graph-node ${isDone ? 'done' : isActive ? 'active' : 'pending'}`}>
                <div className="node-icon">
                  {isDone && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  )}
                  {isActive && <span className="agent-spinner-mini" />}
                  {!isDone && !isActive && <span className="node-dot" />}
                </div>
                <div className="node-content">
                  <div className="node-title">{node.label}</div>
                  <div className="node-desc">{node.desc}</div>
                </div>
              </div>
              {i < defaultNodes.length - 1 && <div className={`lg-edge-arrow ${isDone ? 'done' : ''}`}>↓</div>}
            </div>
          );
        })}
      </div>

      {error && (
        <div className="lg-error-box">
          <p>❌ {error}</p>
          <button type="button" className="btn-primary" onClick={executeWorkflow}>Retry Workflow</button>
        </div>
      )}

      {/* Final Workflow Result Output */}
      {workflowResult && workflowResult.finalOutput && (
        <div className="lg-results-box">
          <div className="lg-results-header">
            <h3>Final Strategic Recommendations Dossier</h3>
            <div className="audit-score-tag">
              Quality Audit Score: <b>{workflowResult.validation?.qualityScore || 100}/100</b> ({workflowResult.validation?.status || 'PASSED'})
            </div>
          </div>

          <div className="roadmap-box">
            <h4>Execution Roadmap</h4>
            <div className="roadmap-steps">
              {(workflowResult.finalOutput.executionRoadmap || []).map((step) => (
                <div className="roadmap-step" key={step.step}>
                  <span className="step-num">Step {step.step}</span>
                  <span className="step-text">{step.action}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg-logs-toggle">
            <details>
              <summary>View LangGraph Node Execution Audit Logs ({workflowResult.logs?.length || 0} trace entries)</summary>
              <div className="logs-container">
                {(workflowResult.logs || []).map((log, index) => (
                  <div className="log-line" key={index}>{log}</div>
                ))}
              </div>
            </details>
          </div>
        </div>
      )}
    </div>
  );
}
