import { Router } from 'express';
import { generateAiRecommendations } from '../services/aiService.js';

const router = Router();

// POST /api/recommendations/generate
// Body: { projectData: { form, market, competitors } } OR { form, market, competitors }
router.post('/generate', async (req, res) => {
  try {
    const payload = req.body.projectData || req.body;

    if (!payload || !payload.form) {
      return res.status(400).json({ error: 'Invalid payload: project form data is required' });
    }

    const result = await generateAiRecommendations(payload);
    res.json(result);
  } catch (err) {
    console.error('[RecommendationsRoute] Error generating recommendations:', err);
    res.status(500).json({ error: 'Failed to generate strategic recommendations', details: err.message });
  }
});

export default router;
