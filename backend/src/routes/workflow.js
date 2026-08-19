import { Router } from 'express';
import { runLangGraphWorkflow } from '../services/langgraphWorkflow.js';

const router = Router();

// POST /api/workflow/run
// Body: { projectData: { form, market, competitors } } OR { form, market, competitors }
router.post('/run', async (req, res) => {
  try {
    const payload = req.body.projectData || req.body;

    if (!payload || !payload.form) {
      return res.status(400).json({ error: 'Invalid payload: project form data is required' });
    }

    const result = await runLangGraphWorkflow(payload);
    res.json(result);
  } catch (err) {
    console.error('[WorkflowRoute] Error running LangGraph workflow:', err);
    res.status(500).json({ error: 'LangGraph workflow execution failed', details: err.message });
  }
});

export default router;
