const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

async function handle(res) {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }
  return res.json();
}

export async function fetchMarketData(industry) {
  const res = await fetch(`${API_BASE}/api/market-data/${encodeURIComponent(industry)}`);
  return handle(res);
}

export async function fetchCompetitors(industry, { live = false } = {}) {
  const url = `${API_BASE}/api/competitors/${encodeURIComponent(industry)}${live ? '?live=true' : ''}`;
  const res = await fetch(url);
  return handle(res);
}

export async function submitProject(project) {
  const res = await fetch(`${API_BASE}/api/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(project),
  });
  return handle(res);
}

export async function fetchAiRecommendations(projectData) {
  const res = await fetch(`${API_BASE}/api/recommendations/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ projectData }),
  });
  return handle(res);
}

export async function fetchMitigations(projectData) {
  const res = await fetch(`${API_BASE}/api/mitigations/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ projectData }),
  });
  return handle(res);
}

export async function runWorkflow(projectData) {
  const res = await fetch(`${API_BASE}/api/workflow/run`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ projectData }),
  });
  return handle(res);
}

export async function generateAssessmentReport(projectData) {
  const res = await fetch(`${API_BASE}/api/reports/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(projectData),
  });
  return handle(res);
}

export async function downloadAssessmentReportPdf(projectData) {
  const res = await fetch(`${API_BASE}/api/reports/download-pdf`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(projectData),
  });

  if (!res.ok) {
    throw new Error('Failed to download PDF report');
  }

  const blob = await res.blob();
  const projectName = projectData?.form?.projectName || 'Startup';
  const fileName = `${projectName.replace(/[^a-zA-Z0-9_-]/g, '_')}_Assessment_Report.pdf`;

  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}



