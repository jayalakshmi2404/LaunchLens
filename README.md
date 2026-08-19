# LAUNCHLENS — FULL-STACK STARTUP INTAKE & AI MARKET INTELLIGENCE PLATFORM

LaunchLens is a complete full-stack startup project-intake, market-intelligence, risk assessment, and AI-powered strategic reasoning dashboard.

---

## PROJECT OVERVIEW

LaunchLens allows users to submit a startup project idea (industry, business model, target market, budget, description) and receive comprehensive market intelligence, competitor forecasting, risk assessment, feasibility breakdowns, AI strategic recommendations, mitigation strategies, and an autonomous multi-agent LangGraph workflow execution dossier.

---

## TECHNOLOGY STACK

### Frontend
* **Framework**: React 19 (`react` ^19.2.7, `react-dom` ^19.2.7)
* **Build Tool**: Vite 8 (`vite` ^8.1.1)
* **Routing**: React Router DOM v7 (`react-router-dom` ^7.18.1)
* **Data Visualization**: Chart.js (`chart.js` ^4.5.1), custom SVG components (`GaugeChart`, `BarChart`, `TrendChart`)
* **Styling**: Modular Vanilla CSS with glassmorphism cyber dark theme
* **State Management**: React Context (`ProjectContext.jsx`)

### Backend
* **Framework**: Express.js (`express` ^4.19.2)
* **Runtime**: Node.js ES Modules (`"type": "module"`)
* **Database**: PostgreSQL (via `pg` ^8.12.0)
* **AI Provider**: Google Gemini API (`@google/genai` `gemini-2.5-flash`), OpenAI API (`gpt-4o-mini`), and deterministic project data rule engine fallback
* **Agent Workflow**: LangGraph (`@langchain/langgraph` ^1.4.10, `@langchain/core` ^1.2.8)

---

## PROJECT STRUCTURE

```
projectintake-fullstack/
├── backend/
│   ├── .env.example              # Sample environment variables
│   ├── package.json              # Backend dependencies
│   └── src/
│       ├── server.js             # Express API entry point
│       ├── db/                   # PostgreSQL schema, migrations & seed scripts
│       ├── routes/               # Express API routes (projects, market-data, competitors, recommendations, mitigations, workflow)
│       └── services/             # Core services (aiService.js, mitigationEngine.js, langgraphWorkflow.js)
└── frontend/
    ├── index.html
    ├── vite.config.js            # Vite configuration
    ├── package.json              # Frontend dependencies
    └── src/
        ├── App.jsx               # Main React router application
        ├── components/           # UI & Graph visualization components
        ├── context/              # ProjectContext state manager
        ├── pages/                # Page views (ProjectInput, RiskAssessment, Recommendations, SWOT, Feasibility, Dashboard)
        ├── services/             # api.js API client
        └── utils/                # Calculation engines (riskEngine, feasibilityEngine, forecast)
```

---

## MILESTONE FEATURE BREAKDOWN

### Milestone 1 — Market Analysis & Intake
* **Project Intake Form**: Persists project submission to PostgreSQL (`POST /api/projects`).
* **Market Sizing (TAM/SAM/SOM)**: Sector metrics and trend charts (2020–2026).
* **Competitor Landscape**: Stored competitor metrics + live NSE stock quotes via Yahoo Finance API (`GET /api/competitors/:industry?live=true`).
* **Competitor Forecast**: 3-year revenue and market share forecast model.

### Milestone 2 — Strategic Risk & Feasibility
* **Personalized Risk Assessment**: Evaluates 5 risk categories (Market, Competitive, Financial, Technical, Regulatory).
* **SWOT Analysis Matrix**: Automated 4-quadrant SWOT generation.
* **Feasibility Breakdown**: 4-dimension scoring (Technical, Financial, Market, Competitive).
* **Executive Dashboard**: Aggregate industry visualization and gauge meters.

### Milestone 3 — AI & LangGraph Agent Intelligence
* **Task 1: AI Strategic Recommendations**:
  * Powered by Gemini 2.5 Flash / OpenAI / Rule Fallback Engine (`POST /api/recommendations/generate`).
  * Generates 4 data-grounded recommendations with rationale cards and provider status badges.
* **Task 2: Mitigation & Improvement Suggestion Engine**:
  * Synthesizes root causes, tactical mitigations, product improvements, execution actions, and expected outcomes (`POST /api/mitigations/generate`).
  * Integrated as `MitigationEnginePanel` on the Risk Assessment page.
* **Task 3: LangGraph Agent Workflow**:
  * 8-Node StateGraph workflow execution (`POST /api/workflow/run`).
  * Implements priority routing for critical risks and quality audit refinement routing.
  * Visualized in `LangGraphWorkflowViewer` on the Recommendations page.

---

## ENVIRONMENT VARIABLES

Copy `.env.example` to `.env` inside the `backend/` directory:

```env
PORT=4000
DATABASE_URL=postgres://postgres:postgres@localhost:5432/projectintake
DB_SSL=false

# Milestone 3 AI Strategic Engine Keys (Keep secret ONLY on backend)
GEMINI_API_KEY=your_gemini_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
AI_PROVIDER=auto
```

---

## INSTALLATION & SETUP

### 1. Database Setup (PostgreSQL)
```bash
createdb projectintake
cd backend
npm run migrate
npm run seed
```

### 2. Backend Server
```bash
cd backend
npm install
npm run dev
```
* Backend starts at `http://localhost:4000`.

### 3. Frontend Application
```bash
cd frontend
npm install
npm run dev
```
* Frontend starts at `http://localhost:5173`.

---

## TESTING

To verify frontend production build:
```bash
cd frontend
npm run build
```

To test backend syntax and API handlers:
```bash
cd backend
node --check src/server.js
```

---

## LICENSE / CREDITS

Company names referenced (e.g. Apollo HealthTech, Razorpay, Zoho) are for illustrative industry positioning comparisons. LaunchLens is built for startup market analysis and strategic decision support.
