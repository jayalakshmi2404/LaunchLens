-- ProjectIntake schema (PostgreSQL)
-- Every market/competitor figure carries a `source` and `as_of_date` so the
-- data is auditable rather than presented as unattributed "live" numbers.

CREATE TABLE IF NOT EXISTS projects (
  id              SERIAL PRIMARY KEY,
  project_name    TEXT NOT NULL,
  industry        TEXT NOT NULL,
  business_model  TEXT NOT NULL,
  target_market   TEXT,
  budget          TEXT,
  description     TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS market_data (
  id              SERIAL PRIMARY KEY,
  industry        TEXT NOT NULL UNIQUE,
  tam_cr          NUMERIC NOT NULL,       -- Total Addressable Market, INR Crore
  sam_cr          NUMERIC NOT NULL,       -- Serviceable Addressable Market, INR Crore
  som_cr          NUMERIC NOT NULL,       -- Serviceable Obtainable Market, INR Crore
  tam_growth_pct  NUMERIC NOT NULL,
  sam_growth_pct  NUMERIC NOT NULL,
  som_growth_pct  NUMERIC NOT NULL,
  source          TEXT NOT NULL,          -- e.g. "NASSCOM-Zinnov Tech Report 2025 (estimate)"
  as_of_date      DATE NOT NULL,
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS competitors (
  id                  SERIAL PRIMARY KEY,
  industry            TEXT NOT NULL,
  name                TEXT NOT NULL,
  type                TEXT NOT NULL CHECK (type IN ('leader', 'direct', 'indirect')),
  market_share_pct    NUMERIC NOT NULL,
  revenue_cr          NUMERIC,            -- INR Crore, null if unknown/private and undisclosed
  growth_pct          NUMERIC,
  is_public_company   BOOLEAN NOT NULL DEFAULT false,
  stock_symbol        TEXT,               -- NSE symbol, only set when is_public_company = true
  source              TEXT NOT NULL,      -- e.g. "BSE/NSE Annual Report FY24" or "Tracxn estimate"
  as_of_date          DATE NOT NULL,
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_competitors_industry ON competitors (industry);
CREATE INDEX IF NOT EXISTS idx_projects_industry ON projects (industry);
