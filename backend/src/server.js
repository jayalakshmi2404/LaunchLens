import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import projectsRouter from './routes/projects.js';
import marketDataRouter from './routes/marketData.js';
import competitorsRouter from './routes/competitors.js';
import recommendationsRouter from './routes/recommendations.js';
import mitigationsRouter from './routes/mitigations.js';
import workflowRouter from './routes/workflow.js';
import reportsRouter from './routes/reports.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

app.use('/api/projects', projectsRouter);
app.use('/api/market-data', marketDataRouter);
app.use('/api/competitors', competitorsRouter);
app.use('/api/recommendations', recommendationsRouter);
app.use('/api/mitigations', mitigationsRouter);
app.use('/api/workflow', workflowRouter);
app.use('/api/reports', reportsRouter);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`ProjectIntake API listening on http://localhost:${PORT}`);
});
