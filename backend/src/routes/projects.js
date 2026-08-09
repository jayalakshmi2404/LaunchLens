import { Router } from 'express';
import { query } from '../db/pool.js';

const router = Router();

// POST /api/projects - save a submitted project
router.post('/', async (req, res) => {
  const { projectName, industry, businessModel, targetMarket, budget, description } = req.body;

  if (!projectName || !industry || !businessModel) {
    return res.status(400).json({ error: 'projectName, industry, and businessModel are required' });
  }

  try {
    const result = await query(
      `INSERT INTO projects (project_name, industry, business_model, target_market, budget, description)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [projectName, industry, businessModel, targetMarket || null, budget || null, description || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating project:', err);
    res.status(500).json({ error: 'Failed to save project' });
  }
});

// GET /api/projects - list all submitted projects, most recent first
router.get('/', async (_req, res) => {
  try {
    const result = await query('SELECT * FROM projects ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error listing projects:', err);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

export default router;
