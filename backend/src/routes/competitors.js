import { Router } from 'express';
import { query } from '../db/pool.js';

const router = Router();

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

// GET /api/competitors/:industry            -> stored data only
// GET /api/competitors/:industry?live=true  -> stored data + live stock quote
router.get('/:industry', async (req, res) => {
  const { industry } = req.params;
  const wantLive = req.query.live === 'true';

  try {
    const result = await query(
      'SELECT * FROM competitors WHERE industry = $1 ORDER BY market_share_pct DESC',
      [industry]
    );

    // Deduplicate competitor entries by name, retaining the record with the highest market share
    const uniqueMap = new Map();
    for (const row of result.rows) {
      const existing = uniqueMap.get(row.name);
      if (!existing || Number(row.market_share_pct) > Number(existing.market_share_pct)) {
        uniqueMap.set(row.name, row);
      }
    }
    const rows = Array.from(uniqueMap.values()).sort((a, b) => Number(b.market_share_pct) - Number(a.market_share_pct));

    if (!wantLive) {
      return res.json(rows);
    }

    const enriched = await Promise.all(
      rows.map(async (row) => {
        if (!row.is_public_company || !row.stock_symbol) return row;
        const live = await fetchLiveQuote(row.stock_symbol);
        if (live) {
          return { ...row, live };
        }
        return { ...row, live: null, liveError: 'Live quote unavailable' };
      })
    );

    res.json(enriched);
  } catch (err) {
    console.error('Error fetching competitors:', err);
    res.status(500).json({ error: 'Failed to fetch competitors' });
  }
});

export default router;
