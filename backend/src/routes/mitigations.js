import { Router } from 'express';
import { generateMitigations } from '../services/mitigationEngine.js';

const router = Router();

// POST /api/mitigations/generate
// Body: { projectData: { form, market, competitors } } OR { form, market, competitors }
router.post('/generate', async (req, res) => {
  try {
    const payload = req.body.projectData || req.body;

    if (!payload || !payload.form) {
      return res.status(400).json({ error: 'Invalid payload: project form data is required' });
    }

    const result = await generateMitigations(payload);
    res.json(result);
  } catch (err) {
    console.error('[MitigationsRoute] Error generating mitigations:', err);
    res.status(500).json({ error: 'Failed to generate mitigation engine results', details: err.message });
  }
});

export default router;
