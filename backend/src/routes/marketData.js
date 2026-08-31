import { Router } from 'express';
import { query } from '../db/pool.js';

const router = Router();

const fallbackMarketData = {
  Technology: { id: 1, industry: 'Technology', tam_cr: 18500, sam_cr: 6200, som_cr: 92, tam_growth_pct: 8.2, sam_growth_pct: 5.5, som_growth_pct: -2.1, source: 'Illustrative estimate (Offline fallback)' },
  Healthcare: { id: 2, industry: 'Healthcare', tam_cr: 24500, sam_cr: 8100, som_cr: 140, tam_growth_pct: 10.4, sam_growth_pct: 7.1, som_growth_pct: 3.4, source: 'Illustrative estimate (Offline fallback)' },
  Fintech: { id: 3, industry: 'Fintech', tam_cr: 31200, sam_cr: 9800, som_cr: 210, tam_growth_pct: 14.1, sam_growth_pct: 9.6, som_growth_pct: 4.8, source: 'Illustrative estimate (Offline fallback)' },
  'E-commerce': { id: 4, industry: 'E-commerce', tam_cr: 27800, sam_cr: 7400, som_cr: 165, tam_growth_pct: 11.3, sam_growth_pct: 6.8, som_growth_pct: -1.2, source: 'Illustrative estimate (Offline fallback)' },
  Education: { id: 5, industry: 'Education', tam_cr: 15200, sam_cr: 4600, som_cr: 78, tam_growth_pct: 9.7, sam_growth_pct: 6.2, som_growth_pct: 2.6, source: 'Illustrative estimate (Offline fallback)' },
  Manufacturing: { id: 6, industry: 'Manufacturing', tam_cr: 19700, sam_cr: 5300, som_cr: 88, tam_growth_pct: 6.5, sam_growth_pct: 4.1, som_growth_pct: 1.5, source: 'Illustrative estimate (Offline fallback)' },
  Other: { id: 7, industry: 'Other', tam_cr: 12000, sam_cr: 3500, som_cr: 60, tam_growth_pct: 7.0, sam_growth_pct: 4.5, som_growth_pct: 0.5, source: 'Illustrative estimate (Offline fallback)' }
};

// GET /api/market-data/:industry
router.get('/:industry', async (req, res) => {
  const { industry } = req.params;
  try {
    const result = await query('SELECT * FROM market_data WHERE industry = $1', [industry]);
    if (result.rows.length === 0) {
      const fallback = fallbackMarketData[industry] || fallbackMarketData.Other;
      return res.json(fallback);
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.warn(`[MarketData DB Warning] Database offline (${err.message}). Using offline fallback.`);
    const fallback = fallbackMarketData[industry] || fallbackMarketData.Other;
    res.json(fallback);
  }
});

// GET /api/market-data - all industries
router.get('/', async (_req, res) => {
  try {
    const result = await query('SELECT * FROM market_data ORDER BY industry');
    res.json(result.rows);
  } catch (err) {
    console.warn(`[MarketData DB Warning] Database offline (${err.message}). Returning fallback list.`);
    res.json(Object.values(fallbackMarketData));
  }
});

export default router;
