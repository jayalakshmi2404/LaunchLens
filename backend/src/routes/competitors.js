import { Router } from 'express';
import { query } from '../db/pool.js';

const router = Router();

// Fetch a live quote for an NSE-listed stock symbol.
// Uses Yahoo Finance's public (unofficial, undocumented) quote endpoint - no
// API key required, but it can change or rate-limit without notice. For a
// production system, swap this for a proper provider (NSE's official data
// feed, Alpha Vantage, or a broker API such as Zerodha Kite / Upstox).
async function fetchLiveQuote(symbol) {
  const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbol}.NS`;
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (!res.ok) throw new Error(`Quote fetch failed: ${res.status}`);
  const data = await res.json();
  const quote = data?.quoteResponse?.result?.[0];
  if (!quote) return null;
  return {
    price: quote.regularMarketPrice ?? null,
    changePercent: quote.regularMarketChangePercent ?? null,
    marketCapCr: quote.marketCap ? +(quote.marketCap / 1e7).toFixed(0) : null, // paise-free INR -> Crore
    currency: quote.currency ?? 'INR',
    asOf: quote.regularMarketTime ? new Date(quote.regularMarketTime * 1000).toISOString() : null,
  };
}

// GET /api/competitors/:industry            -> stored data only
// GET /api/competitors/:industry?live=true  -> stored data + live stock quote
//                                               merged in for public companies
router.get('/:industry', async (req, res) => {
  const { industry } = req.params;
  const wantLive = req.query.live === 'true';

  try {
    const result = await query(
      'SELECT * FROM competitors WHERE industry = $1 ORDER BY market_share_pct DESC',
      [industry]
    );

    if (!wantLive) {
      return res.json(result.rows);
    }

    const enriched = await Promise.all(
      result.rows.map(async (row) => {
        if (!row.is_public_company || !row.stock_symbol) return row;
        try {
          const live = await fetchLiveQuote(row.stock_symbol);
          return { ...row, live };
        } catch (err) {
          console.error(`Live quote failed for ${row.stock_symbol}:`, err.message);
          return { ...row, live: null, liveError: 'Live quote unavailable' };
        }
      })
    );

    res.json(enriched);
  } catch (err) {
    console.error('Error fetching competitors:', err);
    res.status(500).json({ error: 'Failed to fetch competitors' });
  }
});

export default router;
