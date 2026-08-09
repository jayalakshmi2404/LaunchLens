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
