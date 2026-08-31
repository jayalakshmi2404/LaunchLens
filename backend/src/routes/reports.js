import { Router } from 'express';
import { generateComprehensiveReport, generateReportPdfBuffer } from '../services/reportGenerator.js';

const router = Router();

// POST /api/reports/generate (Returns structured JSON)
router.post('/generate', async (req, res) => {
  try {
    const { form, market, competitors } = req.body || {};
    if (!form || !form.industry) {
      return res.status(400).json({ error: 'Missing required project context for report generation' });
    }

    const report = await generateComprehensiveReport({ form, market, competitors });
    res.json(report);
  } catch (err) {
    console.error('[ReportsRoute] Error generating comprehensive report:', err);
    res.status(500).json({ error: 'Failed to generate comprehensive assessment report', message: err.message });
  }
});

// POST /api/reports/download-pdf (Generates & Streams .pdf File Attachment Directly!)
router.post('/download-pdf', async (req, res) => {
  try {
    const { form, market, competitors } = req.body || {};
    if (!form || !form.industry) {
      return res.status(400).json({ error: 'Missing required project context for PDF download' });
    }

    const report = await generateComprehensiveReport({ form, market, competitors });
    const pdfBuffer = await generateReportPdfBuffer(report);

    const safeFileName = `${(report.summary.projectName || 'Startup').replace(/[^a-zA-Z0-9_-]/g, '_')}_Assessment_Report.pdf`;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${safeFileName}"`);
    res.setHeader('Content-Length', pdfBuffer.length);
    res.send(pdfBuffer);
  } catch (err) {
    console.error('[ReportsRoute] Error downloading PDF report:', err);
    res.status(500).json({ error: 'Failed to generate and download PDF report file', message: err.message });
  }
});

export default router;
