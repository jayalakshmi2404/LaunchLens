import { Router } from 'express';
import { query } from '../db/pool.js';

const router = Router();

// GET /api/market-data/:industry
router.get('/:industry', async (req, res) => {
  try {
    const result = await query('SELECT * FROM market_data WHERE industry = $1', [req.params.industry]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: `No market data for industry "${req.params.industry}"` });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching market data:', err);
    res.status(500).json({ error: 'Failed to fetch market data' });
  }
});

// GET /api/market-data - all industries (used for the trend chart / dashboard)
router.get('/', async (_req, res) => {
  try {
    const result = await query('SELECT * FROM market_data ORDER BY industry');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching market data:', err);
    res.status(500).json({ error: 'Failed to fetch market data' });
  }
});

export default router;
