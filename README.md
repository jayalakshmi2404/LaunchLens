
LAUNCHLENS
A startup project-intake and Indian market-intelligence dashboard

WHAT IT DOES
--------------------------------------------------------------------------------
Enter a startup idea (industry, business model, target market, budget) and
get: Market Analysis (TAM/SAM/SOM + trend chart), Competitor Landscape (real
Indian companies), a 3/6-month Competitor Forecast, Risk Assessment,
Recommendations, and a summary Dashboard. Full-stack: React frontend,
Express + PostgreSQL backend.


HARDWARE REQUIREMENTS
--------------------------------------------------------------------------------
  RAM             4 GB minimum (8 GB recommended)
  Disk space       500 MB free
  Processor        Any modern CPU (last ~8 years)
  Internet          Required only for live stock quotes; app otherwise runs
                    fully offline/local


SOFTWARE REQUIREMENTS
--------------------------------------------------------------------------------
  OS                 Windows, macOS, or Linux
  Node.js            v18 or higher
  PostgreSQL          v13 or higher
  Browser              Any modern browser (Chrome, Edge, Firefox, Safari)
  npm packages         See requirements.txt


HOW THE FORECAST WORKS
--------------------------------------------------------------------------------
  projected value = current value x (1 + annual growth rate x months/12)

A transparent extrapolation of stored growth data - not a machine-learning
model - so every number on screen is explainable.


TECH STACK
--------------------------------------------------------------------------------
  Frontend    React 19 (Vite), React Router, Chart.js, plain CSS
  Backend     Node.js, Express, PostgreSQL (via pg)


PROJECT STRUCTURE
--------------------------------------------------------------------------------
  frontend/src/components/   UI components (Navbar, charts, forecast, etc.)
  frontend/src/pages/        Project Input, Risk Assessment, Recommendations,
                              Dashboard
  frontend/src/services/      api.js - all backend calls
  backend/src/routes/          projects, market-data, competitors endpoints
  backend/src/db/                schema.sql, seed.sql, migrate/seed scripts


SETUP
--------------------------------------------------------------------------------
  1. createdb projectintake

  2. Backend:
       cd backend
       cp .env.example .env      (edit with your PostgreSQL details)
       npm install
       npm run migrate
       npm run seed
       npm run dev                -> http://localhost:4000

  3. Frontend (new terminal):
       cd frontend
       npm install
       npm run dev                -> http://localhost:5173

  If the backend isn't running, the frontend still works using bundled
  sample data.


FEATURES
--------------------------------------------------------------------------------
  - Click-to-analyze flow with animated analysis sequence
  - Industry-based Market Analysis and Competitor Landscape
  - Optional live stock quotes for publicly-listed competitors
  - Adjustable-horizon Competitor Forecast
  - PostgreSQL persistence for submitted projects
  - Automatic offline fallback if backend is unreachable


LICENSE / CREDITS
--------------------------------------------------------------------------------
Company names referenced (Zoho, Flipkart, Tata Steel, etc.) are used for
illustrative comparison only and are trademarks of their respective owners.
