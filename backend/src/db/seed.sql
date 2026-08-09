-- Seed data for ProjectIntake
--
-- IMPORTANT: TAM/SAM/SOM figures below are ILLUSTRATIVE placeholders for this
-- demo, not licensed market research. Before using this for real decisions,
-- replace market_data rows with figures from a licensed source such as
-- Statista, IMARC Group, Mordor Intelligence, or a NASSCOM-Zinnov report.
--
-- Competitor rows are more reliable where is_public_company = true, since
-- those can be cross-checked against real BSE/NSE filings and (via the
-- /api/competitors/:industry?live=true route) enriched with a real live
-- stock quote. Private-company rows (is_public_company = false) are estimates
-- only - there is no free/live public data source for private-company
-- revenue or market share; real numbers require a paid provider such as
-- Tracxn, Inc42 Datalabs, or Crunchbase.

INSERT INTO market_data (industry, tam_cr, sam_cr, som_cr, tam_growth_pct, sam_growth_pct, som_growth_pct, source, as_of_date) VALUES
('Technology',     18500, 6200, 92,  8.2,  5.5, -2.1, 'Illustrative estimate for demo - replace with a licensed report (e.g. NASSCOM-Zinnov, Statista)', '2025-01-01'),
('Healthcare',     24500, 8100, 140, 10.4, 7.1,  3.4, 'Illustrative estimate for demo - replace with a licensed report (e.g. IBEF Healthcare, Statista)',  '2025-01-01'),
('Fintech',        31200, 9800, 210, 14.1, 9.6,  4.8, 'Illustrative estimate for demo - replace with a licensed report (e.g. RBI Digital Payments data, Statista)', '2025-01-01'),
('E-commerce',     27800, 7400, 165, 11.3, 6.8, -1.2, 'Illustrative estimate for demo - replace with a licensed report (e.g. IBEF E-commerce, Statista)', '2025-01-01'),
('Education',      15200, 4600, 78,  9.7,  6.2,  2.6, 'Illustrative estimate for demo - replace with a licensed report (e.g. IBEF EdTech, RedSeer)', '2025-01-01'),
('Manufacturing',  19700, 5300, 88,  6.5,  4.1,  1.5, 'Illustrative estimate for demo - replace with a licensed report (e.g. IBEF Manufacturing, MOSPI)', '2025-01-01'),
('Other',          12000, 3500, 60,  7.0,  4.5,  0.5, 'Illustrative estimate for demo - replace with a licensed report matching the specific sector', '2025-01-01')
ON CONFLICT (industry) DO UPDATE SET
  tam_cr = EXCLUDED.tam_cr, sam_cr = EXCLUDED.sam_cr, som_cr = EXCLUDED.som_cr,
  tam_growth_pct = EXCLUDED.tam_growth_pct, sam_growth_pct = EXCLUDED.sam_growth_pct, som_growth_pct = EXCLUDED.som_growth_pct,
  source = EXCLUDED.source, as_of_date = EXCLUDED.as_of_date, updated_at = now();

-- Technology
INSERT INTO competitors (industry, name, type, market_share_pct, revenue_cr, growth_pct, is_public_company, stock_symbol, source, as_of_date) VALUES
('Technology', 'Zoho Corporation', 'leader', 28, 8200, 18, false, NULL, 'Private company - Tracxn/Inc42 estimate (not independently verified)', '2025-01-01'),
('Technology', 'Freshworks Inc.', 'direct', 21, 5100, 14, false, NULL, 'Listed on NASDAQ (FRSH), not NSE/BSE - figures are estimates for the Indian market segment only', '2025-01-01'),
('Technology', 'Tata Consultancy Services', 'indirect', 16, 4300, 9, true, 'TCS', 'Public company - BSE/NSE annual report (illustrative rounding; verify against latest filing)', '2025-01-01'),
('Technology', 'Infosys Limited', 'indirect', 12, 3600, 7, true, 'INFY', 'Public company - BSE/NSE annual report (illustrative rounding; verify against latest filing)', '2025-01-01'),
('Technology', 'Wingify', 'direct', 8, 380, 21, false, NULL, 'Private company - Tracxn/Inc42 estimate (not independently verified)', '2025-01-01');

-- Healthcare
INSERT INTO competitors (industry, name, type, market_share_pct, revenue_cr, growth_pct, is_public_company, stock_symbol, source, as_of_date) VALUES
('Healthcare', 'Practo', 'leader', 26, 1850, 16, false, NULL, 'Private company - Tracxn/Inc42 estimate (not independently verified)', '2025-01-01'),
('Healthcare', 'API Holdings (PharmEasy)', 'direct', 23, 2600, 11, false, NULL, 'Private company - Tracxn/Inc42 estimate (not independently verified)', '2025-01-01'),
('Healthcare', 'Apollo Hospitals Enterprise', 'indirect', 18, 3100, 13, true, 'APOLLOHOSP', 'Public company - BSE/NSE annual report (illustrative rounding; verify against latest filing)', '2025-01-01'),
('Healthcare', 'Tata 1mg', 'direct', 14, 1400, 10, false, NULL, 'Private company (Tata Digital subsidiary) - estimate', '2025-01-01'),
('Healthcare', 'Portea Medical', 'indirect', 9, 520, 8, false, NULL, 'Private company - Tracxn/Inc42 estimate (not independently verified)', '2025-01-01');

-- Fintech
INSERT INTO competitors (industry, name, type, market_share_pct, revenue_cr, growth_pct, is_public_company, stock_symbol, source, as_of_date) VALUES
('Fintech', 'One97 Communications (Paytm)', 'leader', 27, 9900, 15, true, 'PAYTM', 'Public company - BSE/NSE annual report (illustrative rounding; verify against latest filing)', '2025-01-01'),
('Fintech', 'PhonePe', 'direct', 25, 8600, 19, false, NULL, 'Private company (Walmart-owned) - Tracxn/Inc42 estimate', '2025-01-01'),
('Fintech', 'Razorpay', 'indirect', 14, 2400, 22, false, NULL, 'Private company - Tracxn/Inc42 estimate (not independently verified)', '2025-01-01'),
('Fintech', 'CRED', 'direct', 10, 1100, 26, false, NULL, 'Private company - Tracxn/Inc42 estimate (not independently verified)', '2025-01-01'),
('Fintech', 'Groww', 'indirect', 9, 1650, 24, false, NULL, 'Private company - Tracxn/Inc42 estimate (not independently verified)', '2025-01-01');

-- E-commerce
INSERT INTO competitors (industry, name, type, market_share_pct, revenue_cr, growth_pct, is_public_company, stock_symbol, source, as_of_date) VALUES
('E-commerce', 'Flipkart', 'leader', 31, 65000, 12, false, NULL, 'Private company (Walmart-owned) - Tracxn/Inc42 estimate', '2025-01-01'),
('E-commerce', 'Meesho', 'direct', 19, 5700, 24, false, NULL, 'Private company - Tracxn/Inc42 estimate (not independently verified)', '2025-01-01'),
('E-commerce', 'FSN E-Commerce Ventures (Nykaa)', 'indirect', 12, 6400, 17, true, 'NYKAA', 'Public company - BSE/NSE annual report (illustrative rounding; verify against latest filing)', '2025-01-01'),
('E-commerce', 'Myntra', 'direct', 11, 4900, 13, false, NULL, 'Private company (Flipkart-owned) - estimate', '2025-01-01'),
('E-commerce', 'Ajio', 'indirect', 8, 3200, 15, false, NULL, 'Private company (Reliance Retail-owned, not separately listed) - estimate', '2025-01-01');

-- Education
INSERT INTO competitors (industry, name, type, market_share_pct, revenue_cr, growth_pct, is_public_company, stock_symbol, source, as_of_date) VALUES
('Education', 'Think & Learn (BYJU''S)', 'leader', 24, 5300, 6, false, NULL, 'Private company - Tracxn/Inc42 estimate (not independently verified)', '2025-01-01'),
('Education', 'Unacademy', 'direct', 20, 1900, 10, false, NULL, 'Private company - Tracxn/Inc42 estimate (not independently verified)', '2025-01-01'),
('Education', 'PhysicsWallah', 'indirect', 17, 1200, 28, false, NULL, 'Private company - Tracxn/Inc42 estimate (not independently verified)', '2025-01-01'),
('Education', 'Vedantu', 'direct', 10, 620, 9, false, NULL, 'Private company - Tracxn/Inc42 estimate (not independently verified)', '2025-01-01'),
('Education', 'upGrad', 'indirect', 9, 1450, 16, false, NULL, 'Private company - Tracxn/Inc42 estimate (not independently verified)', '2025-01-01');

-- Manufacturing
INSERT INTO competitors (industry, name, type, market_share_pct, revenue_cr, growth_pct, is_public_company, stock_symbol, source, as_of_date) VALUES
('Manufacturing', 'Tata Steel', 'leader', 25, 242000, 7, true, 'TATASTEEL', 'Public company - BSE/NSE annual report (illustrative rounding; verify against latest filing)', '2025-01-01'),
('Manufacturing', 'Larsen & Toubro', 'direct', 19, 183000, 9, true, 'LT', 'Public company - BSE/NSE annual report (illustrative rounding; verify against latest filing)', '2025-01-01'),
('Manufacturing', 'Godrej Industries', 'indirect', 14, 35000, 5, true, 'GODREJIND', 'Public company - BSE/NSE annual report (illustrative rounding; verify against latest filing)', '2025-01-01');

-- Other
INSERT INTO competitors (industry, name, type, market_share_pct, revenue_cr, growth_pct, is_public_company, stock_symbol, source, as_of_date) VALUES
('Other', 'Reliance Industries', 'leader', 22, 900000, 8, true, 'RELIANCE', 'Public company - BSE/NSE annual report (illustrative rounding; verify against latest filing)', '2025-01-01'),
('Other', 'Adani Enterprises', 'direct', 16, 110000, 11, true, 'ADANIENT', 'Public company - BSE/NSE annual report (illustrative rounding; verify against latest filing)', '2025-01-01'),
('Other', 'ITC Limited', 'indirect', 13, 70000, 6, true, 'ITC', 'Public company - BSE/NSE annual report (illustrative rounding; verify against latest filing)', '2025-01-01');
