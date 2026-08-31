import React from 'react';
import './RiskBenchmarkChart.css';

export default function RiskBenchmarkChart({ projectRisk, industryName }) {
  const defaultBenchmarks = {
    Technology: { Market: 35, Competitive: 45, Financial: 40, Technical: 25, Regulatory: 20 },
    Healthcare: { Market: 30, Competitive: 35, Financial: 50, Technical: 45, Regulatory: 70 },
    Fintech: { Market: 25, Competitive: 60, Financial: 45, Technical: 35, Regulatory: 75 },
    'E-commerce': { Market: 55, Competitive: 65, Financial: 50, Technical: 30, Regulatory: 35 },
    Education: { Market: 35, Competitive: 50, Financial: 40, Technical: 25, Regulatory: 45 },
    Manufacturing: { Market: 40, Competitive: 40, Financial: 60, Technical: 50, Regulatory: 45 },
    Other: { Market: 40, Competitive: 45, Financial: 45, Technical: 35, Regulatory: 35 }
  };

  const benchmark = defaultBenchmarks[industryName] || defaultBenchmarks.Technology;
  const categories = ['Market', 'Competitive', 'Financial', 'Technical', 'Regulatory'];

  const getScore = (catName) => {
    if (!projectRisk || !Array.isArray(projectRisk)) return 40;
    const found = projectRisk.find(r => r.name.toLowerCase().includes(catName.toLowerCase()));
    return found ? found.score : 40;
  };

  return (
    <div className="risk-benchmark-card">
      <div className="benchmark-header">
        <h3 className="benchmark-title">Comparative Sector Benchmark ({industryName || 'Industry'})</h3>
        <span className="benchmark-subtitle">Project risk score vs industry benchmark baseline</span>
      </div>

      <div className="benchmark-rows">
        {categories.map((cat, idx) => {
          const projScore = getScore(cat);
          const benchScore = benchmark[cat] || 40;
          const diff = projScore - benchScore;

          return (
            <div key={idx} className="benchmark-row">
              <div className="row-info">
                <span className="cat-label">{cat} Risk</span>
                <div className="score-badges">
                  <span className="badge-project">Project: {projScore}</span>
                  <span className="badge-benchmark">Industry Avg: {benchScore}</span>
                  <span className={`badge-diff ${diff > 0 ? 'higher' : 'lower'}`}>
                    {diff > 0 ? `+${diff} (Higher Risk)` : `${diff} (Lower Risk)`}
                  </span>
                </div>
              </div>

              <div className="dual-bar-container">
                <div className="bar-wrapper">
                  <div className="bar-label">Project</div>
                  <div className="bar-bg">
                    <div className="bar-fill project-fill" style={{ width: `${projScore}%` }}></div>
                  </div>
                </div>
                <div className="bar-wrapper">
                  <div className="bar-label">Industry</div>
                  <div className="bar-bg">
                    <div className="bar-fill bench-fill" style={{ width: `${benchScore}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
