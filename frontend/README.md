# ProjectIntake — MERN Frontend (React + Vite)

A multi-page React dashboard for startup/project intake and Indian market
intelligence. No backend yet — everything runs client-side.

## Pages / Navigation
- **Project Input** (`/`) — Project Submission form + live Market Analysis
  (TAM/SAM/SOM in ₹ Cr) + Competitor Landscape (real Indian companies,
  updates automatically based on the Industry/Sector you pick).
- **Risk Assessment** (`/risk-assessment`) — risk categories with severity
  meters.
- **Recommendations** (`/recommendations`) — prioritized action cards.
- **Dashboard** (`/dashboard`) — KPI summary, SOM trajectory chart, launch
  readiness gauge.

## What changed from the previous version
- Native `<select>` dropdowns (which rendered broken/overlapping) replaced
  with a custom `Select` component (`src/components/Select.jsx`) that is
  fully contained, scrollable, and can't bleed over other fields.
- Full navigation restored across all four sections using React Router —
  not just a single Project Input tab.
- Page now scrolls naturally (no clipped/fixed-height containers).
- Competitor Landscape now uses real, well-known Indian companies
  (e.g., Zoho, Freshworks, Paytm, Flipkart, Byju's, Tata Steel — mapped per
  industry in `src/data/marketData.js`), instead of generic "Competitor A/B/C".
- All currency switched from USD to INR, shown in Crore (Cr) notation, the
  standard for Indian market-sizing figures.

## Run it
```bash
npm install
npm run dev
```
Open the printed local URL (usually http://localhost:5173).

## Next step (to make it full MERN)
1. Create an Express server with a `POST /api/projects` route.
2. Add a Mongoose model/schema matching the six form fields.
3. Uncomment the fetch call in `src/pages/ProjectInput.jsx` and point it at
   your API.
