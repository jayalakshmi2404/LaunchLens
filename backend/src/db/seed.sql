-- Seed data for ProjectIntake
--
-- IMPORTANT: TAM/SAM/SOM figures below are ILLUSTRATIVE placeholders for this
-- demo, not licensed market research. Before using this for real decisions,
-- replace market_data rows with figures from a licensed source such as
-- Statista, IMARC Group, Mordor Intelligence, or a NASSCOM-Zinnov report.

INSERT INTO market_data (industry, tam_cr, sam_cr, som_cr, tam_growth_pct, sam_growth_pct, som_growth_pct, source, as_of_date) VALUES
('Technology',             18500, 6200, 92,  8.2,  5.5, -2.1, 'Illustrative estimate for demo - replace with a licensed report (e.g. NASSCOM-Zinnov, Statista)', '2025-01-01'),
('Healthcare',             24500, 8100, 140, 10.4, 7.1,  3.4, 'Illustrative estimate for demo - replace with a licensed report (e.g. IBEF Healthcare, Statista)',  '2025-01-01'),
('Fintech',                31200, 9800, 210, 14.1, 9.6,  4.8, 'Illustrative estimate for demo - replace with a licensed report (e.g. RBI Digital Payments data, Statista)', '2025-01-01'),
('E-commerce',             27800, 7400, 165, 11.3, 6.8, -1.2, 'Illustrative estimate for demo - replace with a licensed report (e.g. IBEF E-commerce, Statista)', '2025-01-01'),
('Education',              15200, 4600, 78,  9.7,  6.2,  2.6, 'Illustrative estimate for demo - replace with a licensed report (e.g. IBEF EdTech, RedSeer)', '2025-01-01'),
('Manufacturing',          19700, 5300, 88,  6.5,  4.1,  1.5, 'Illustrative estimate for demo - replace with a licensed report (e.g. IBEF Manufacturing, MOSPI)', '2025-01-01'),
('Real Estate & PropTech', 16800, 4900, 82,  7.8,  5.1,  1.8, 'Illustrative estimate for demo - replace with PropTech industry report', '2025-01-01'),
('Agritech & FoodTech',    14100, 4200, 74,  11.2, 7.5,  3.8, 'Illustrative estimate for demo - replace with Agritech report', '2025-01-01'),
('CleanTech & Energy',     22400, 7100, 115, 15.6, 10.2, 5.4, 'Illustrative estimate for demo - replace with Renewable Energy report', '2025-01-01'),
('Media & Entertainment',  18900, 5800, 96,  12.1, 8.4,  2.9, 'Illustrative estimate for demo - replace with FICCI-EY Media report', '2025-01-01'),
('Automotive & Mobility',  29500, 8900, 175, 13.8, 9.1,  4.2, 'Illustrative estimate for demo - replace with SIAM Automotive report', '2025-01-01'),
('Travel & Hospitality',   16300, 4700, 79,  8.9,  5.8,  1.9, 'Illustrative estimate for demo - replace with Tourism report', '2025-01-01'),
('Retail & D2C',           26100, 7800, 155, 12.5, 7.9,  2.4, 'Illustrative estimate for demo - replace with D2C Retail report', '2025-01-01'),
('Cybersecurity & Cloud',  21500, 6900, 125, 16.4, 11.2, 6.1, 'Illustrative estimate for demo - replace with Cloud Infra report', '2025-01-01'),
('Other',                  12000, 3500, 60,  7.0,  4.5,  0.5, 'Illustrative estimate for demo - replace with sector report', '2025-01-01')
ON CONFLICT (industry) DO UPDATE SET
  tam_cr = EXCLUDED.tam_cr, sam_cr = EXCLUDED.sam_cr, som_cr = EXCLUDED.som_cr,
  tam_growth_pct = EXCLUDED.tam_growth_pct, sam_growth_pct = EXCLUDED.sam_growth_pct, som_growth_pct = EXCLUDED.som_growth_pct,
  source = EXCLUDED.source, as_of_date = EXCLUDED.as_of_date, updated_at = now();

-- Technology
INSERT INTO competitors (industry, name, type, market_share_pct, revenue_cr, growth_pct, is_public_company, stock_symbol, source, as_of_date) VALUES
('Technology', 'Zoho Corporation', 'leader', 28, 8200, 18, false, NULL, 'Private company estimate', '2025-01-01'),
('Technology', 'Freshworks Inc.', 'direct', 21, 5100, 14, false, NULL, 'NASDAQ listed estimate', '2025-01-01'),
('Technology', 'Tata Consultancy Services', 'indirect', 16, 4300, 9, true, 'TCS', 'BSE/NSE public report', '2025-01-01');

-- Healthcare
INSERT INTO competitors (industry, name, type, market_share_pct, revenue_cr, growth_pct, is_public_company, stock_symbol, source, as_of_date) VALUES
('Healthcare', 'Practo', 'leader', 26, 1850, 16, false, NULL, 'Private company estimate', '2025-01-01'),
('Healthcare', 'PharmEasy', 'direct', 23, 2600, 11, false, NULL, 'Private company estimate', '2025-01-01');

-- Fintech
INSERT INTO competitors (industry, name, type, market_share_pct, revenue_cr, growth_pct, is_public_company, stock_symbol, source, as_of_date) VALUES
('Fintech', 'Paytm', 'leader', 27, 9900, 15, true, 'PAYTM', 'BSE/NSE public report', '2025-01-01'),
('Fintech', 'PhonePe', 'direct', 25, 8600, 19, false, NULL, 'Private company estimate', '2025-01-01');

-- E-commerce
INSERT INTO competitors (industry, name, type, market_share_pct, revenue_cr, growth_pct, is_public_company, stock_symbol, source, as_of_date) VALUES
('E-commerce', 'Flipkart', 'leader', 31, 65000, 12, false, NULL, 'Private company estimate', '2025-01-01'),
('E-commerce', 'Nykaa', 'indirect', 12, 6400, 17, true, 'NYKAA', 'BSE/NSE public report', '2025-01-01');

-- Real Estate & PropTech
INSERT INTO competitors (industry, name, type, market_share_pct, revenue_cr, growth_pct, is_public_company, stock_symbol, source, as_of_date) VALUES
('Real Estate & PropTech', 'NoBroker', 'leader', 26, 1200, 21, false, NULL, 'Private company estimate', '2025-01-01'),
('Real Estate & PropTech', 'MagicBricks', 'direct', 22, 850, 12, false, NULL, 'Private company estimate', '2025-01-01');

-- Agritech & FoodTech
INSERT INTO competitors (industry, name, type, market_share_pct, revenue_cr, growth_pct, is_public_company, stock_symbol, source, as_of_date) VALUES
('Agritech & FoodTech', 'DeHaat', 'leader', 25, 2100, 28, false, NULL, 'Private company estimate', '2025-01-01'),
('Agritech & FoodTech', 'Swiggy Instamart', 'indirect', 18, 4500, 31, false, NULL, 'Private company estimate', '2025-01-01');

-- CleanTech & Energy
INSERT INTO competitors (industry, name, type, market_share_pct, revenue_cr, growth_pct, is_public_company, stock_symbol, source, as_of_date) VALUES
('CleanTech & Energy', 'Tata Power Solar', 'leader', 28, 8900, 26, true, 'TATAPOWER', 'BSE/NSE public report', '2025-01-01'),
('CleanTech & Energy', 'Ather Energy', 'direct', 20, 1750, 34, false, NULL, 'Private company estimate', '2025-01-01');

-- Other
INSERT INTO competitors (industry, name, type, market_share_pct, revenue_cr, growth_pct, is_public_company, stock_symbol, source, as_of_date) VALUES
('Other', 'Reliance Industries', 'leader', 22, 900000, 8, true, 'RELIANCE', 'BSE/NSE public report', '2025-01-01');
