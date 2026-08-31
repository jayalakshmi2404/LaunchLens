import { Router } from 'express';
import { query } from '../db/pool.js';

const router = Router();

const fallbackCompetitors = {
  Technology: [
    { id: 1, industry: 'Technology', name: 'Zoho Corporation', type: 'leader', market_share_pct: 28, revenue_cr: 8200, growth_pct: 18, is_public_company: false, stock_symbol: null },
    { id: 2, industry: 'Technology', name: 'Freshworks Inc.', type: 'direct', market_share_pct: 21, revenue_cr: 5100, growth_pct: 14, is_public_company: false, stock_symbol: null },
    { id: 3, industry: 'Technology', name: 'Tata Consultancy Services', type: 'indirect', market_share_pct: 16, revenue_cr: 4300, growth_pct: 9, is_public_company: true, stock_symbol: 'TCS' }
  ],
  Healthcare: [
    { id: 4, industry: 'Healthcare', name: 'Practo', type: 'leader', market_share_pct: 26, revenue_cr: 1850, growth_pct: 16, is_public_company: false, stock_symbol: null },
    { id: 5, industry: 'Healthcare', name: 'PharmEasy', type: 'direct', market_share_pct: 23, revenue_cr: 2600, growth_pct: 11, is_public_company: false, stock_symbol: null }
  ],
  Fintech: [
    { id: 6, industry: 'Fintech', name: 'Paytm', type: 'leader', market_share_pct: 27, revenue_cr: 9900, growth_pct: 15, is_public_company: true, stock_symbol: 'PAYTM' },
    { id: 7, industry: 'Fintech', name: 'PhonePe', type: 'direct', market_share_pct: 25, revenue_cr: 8600, growth_pct: 19, is_public_company: false, stock_symbol: null }
  ],
  'E-commerce': [
    { id: 8, industry: 'E-commerce', name: 'Flipkart', type: 'leader', market_share_pct: 31, revenue_cr: 65000, growth_pct: 12, is_public_company: false, stock_symbol: null },
    { id: 9, industry: 'E-commerce', name: 'Nykaa', type: 'indirect', market_share_pct: 12, revenue_cr: 6400, growth_pct: 17, is_public_company: true, stock_symbol: 'NYKAA' }
  ],
  Other: [
    { id: 10, industry: 'Other', name: 'Reliance Industries', type: 'leader', market_share_pct: 22, revenue_cr: 900000, growth_pct: 8, is_public_company: true, stock_symbol: 'RELIANCE' }
  ]
};

// Fetch a live quote for an NSE-listed stock symbol.
async function fetchLiveQuote(symbol) {
  try {
    const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbol}.NS`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*'
      }
    });
    if (!res.ok) return null;
    const data = await res.json();
    const quote = data?.quoteResponse?.result?.[0];
    if (!quote) return null;
    return {
      price: quote.regularMarketPrice ?? null,
      changePercent: quote.regularMarketChangePercent ?? null,
      marketCapCr: quote.marketCap ? +(quote.marketCap / 1e7).toFixed(0) : null,
      currency: quote.currency ?? 'INR',
      asOf: quote.regularMarketTime ? new Date(quote.regularMarketTime * 1000).toISOString() : null,
    };
  } catch (err) {
    return null;
  }
}

// GET /api/competitors/:industry
router.get('/:industry', async (req, res) => {
  const { industry } = req.params;
  const wantLive = req.query.live === 'true';

  let rows = [];
  try {
    const result = await query(
      'SELECT * FROM competitors WHERE industry = $1 ORDER BY market_share_pct DESC',
      [industry]
    );

    const uniqueMap = new Map();
    for (const row of result.rows) {
      const existing = uniqueMap.get(row.name);
      if (!existing || Number(row.market_share_pct) > Number(existing.market_share_pct)) {
        uniqueMap.set(row.name, row);
      }
    }
    rows = Array.from(uniqueMap.values()).sort((a, b) => Number(b.market_share_pct) - Number(a.market_share_pct));
    if (rows.length === 0) {
      rows = fallbackCompetitors[industry] || fallbackCompetitors.Other;
    }
  } catch (err) {
    console.warn(`[Competitors DB Warning] Database offline (${err.message}). Using offline fallback.`);
    rows = fallbackCompetitors[industry] || fallbackCompetitors.Other;
  }

  if (!wantLive) {
    return res.json(rows);
  }

  const enriched = await Promise.all(
    rows.map(async (row) => {
      if (!row.is_public_company || !row.stock_symbol) return row;
      const liveData = await fetchLiveQuote(row.stock_symbol);
      return { ...row, live: liveData };
    })
  );

  res.json(enriched);
});

export default router;
