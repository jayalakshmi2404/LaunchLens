-- Seed data for ProjectIntake
-- 8 competitor companies per industry sector

-- =============================================
-- MARKET DATA (TAM / SAM / SOM)
-- =============================================
INSERT INTO market_data (industry, tam_cr, sam_cr, som_cr, tam_growth_pct, sam_growth_pct, som_growth_pct, source, as_of_date) VALUES
('Technology',             18500, 6200, 92,  8.2,  5.5, -2.1, 'Illustrative estimate (NASSCOM-Zinnov / Statista)', '2025-01-01'),
('Healthcare',             24500, 8100, 140, 10.4, 7.1,  3.4, 'Illustrative estimate (IBEF Healthcare / Statista)',  '2025-01-01'),
('Fintech',                31200, 9800, 210, 14.1, 9.6,  4.8, 'Illustrative estimate (RBI Digital Payments / Statista)', '2025-01-01'),
('E-commerce',             27800, 7400, 165, 11.3, 6.8, -1.2, 'Illustrative estimate (IBEF E-commerce / Statista)', '2025-01-01'),
('Education',              15200, 4600, 78,  9.7,  6.2,  2.6, 'Illustrative estimate (IBEF EdTech / RedSeer)', '2025-01-01'),
('Manufacturing',          19700, 5300, 88,  6.5,  4.1,  1.5, 'Illustrative estimate (IBEF Manufacturing / MOSPI)', '2025-01-01'),
('Real Estate & PropTech', 16800, 4900, 82,  7.8,  5.1,  1.8, 'Illustrative estimate (PropTech industry report)', '2025-01-01'),
('Agritech & FoodTech',    14100, 4200, 74, 11.2,  7.5,  3.8, 'Illustrative estimate (Agritech report)', '2025-01-01'),
('CleanTech & Energy',     22400, 7100, 115,15.6, 10.2,  5.4, 'Illustrative estimate (Renewable Energy report)', '2025-01-01'),
('Media & Entertainment',  18900, 5800, 96, 12.1,  8.4,  2.9, 'Illustrative estimate (FICCI-EY Media report)', '2025-01-01'),
('Automotive & Mobility',  29500, 8900, 175,13.8,  9.1,  4.2, 'Illustrative estimate (SIAM Automotive report)', '2025-01-01'),
('Travel & Hospitality',   16300, 4700, 79,  8.9,  5.8,  1.9, 'Illustrative estimate (Tourism report)', '2025-01-01'),
('Retail & D2C',           26100, 7800, 155,12.5,  7.9,  2.4, 'Illustrative estimate (D2C Retail report)', '2025-01-01'),
('Cybersecurity & Cloud',  21500, 6900, 125,16.4, 11.2,  6.1, 'Illustrative estimate (Cloud Infra report)', '2025-01-01'),
('Other',                  12000, 3500, 60,  7.0,  4.5,  0.5, 'Illustrative estimate (sector report)', '2025-01-01')
ON CONFLICT (industry) DO UPDATE SET
  tam_cr = EXCLUDED.tam_cr, sam_cr = EXCLUDED.sam_cr, som_cr = EXCLUDED.som_cr,
  tam_growth_pct = EXCLUDED.tam_growth_pct, sam_growth_pct = EXCLUDED.sam_growth_pct, som_growth_pct = EXCLUDED.som_growth_pct,
  source = EXCLUDED.source, as_of_date = EXCLUDED.as_of_date, updated_at = now();

-- =============================================
-- COMPETITORS — 8 per industry
-- =============================================

-- Technology
INSERT INTO competitors (industry, name, type, market_share_pct, revenue_cr, growth_pct, is_public_company, stock_symbol, source, as_of_date) VALUES
('Technology', 'Zoho Corporation',            'leader',   28, 8200, 18, false, NULL,   'Private company estimate', '2025-01-01'),
('Technology', 'Freshworks Inc.',             'direct',   21, 5100, 14, false, NULL,   'NASDAQ listed estimate',   '2025-01-01'),
('Technology', 'Tata Consultancy Services',   'indirect', 16, 4300,  9, true,  'TCS',  'BSE/NSE public report',    '2025-01-01'),
('Technology', 'Infosys Limited',             'indirect', 12, 3600,  7, true,  'INFY', 'BSE/NSE public report',    '2025-01-01'),
('Technology', 'Wingify',                     'direct',    8,  380, 21, false, NULL,   'Private company estimate', '2025-01-01'),
('Technology', 'MoEngage',                    'direct',    6,  320, 25, false, NULL,   'Private company estimate', '2025-01-01'),
('Technology', 'Postman',                     'indirect',  5,  290, 19, false, NULL,   'Private company estimate', '2025-01-01'),
('Technology', 'BrowserStack',                'direct',    4,  240, 17, false, NULL,   'Private company estimate', '2025-01-01')
ON CONFLICT (industry, name) DO UPDATE SET
  type = EXCLUDED.type, market_share_pct = EXCLUDED.market_share_pct, revenue_cr = EXCLUDED.revenue_cr,
  growth_pct = EXCLUDED.growth_pct, source = EXCLUDED.source, updated_at = now();

-- Healthcare
INSERT INTO competitors (industry, name, type, market_share_pct, revenue_cr, growth_pct, is_public_company, stock_symbol, source, as_of_date) VALUES
('Healthcare', 'Practo',                    'leader',   26, 1850, 16, false, NULL,          'Private company estimate', '2025-01-01'),
('Healthcare', 'PharmEasy (API Holdings)',  'direct',   23, 2600, 11, false, NULL,          'Private company estimate', '2025-01-01'),
('Healthcare', 'Apollo Hospitals',          'indirect', 18, 3100, 13, true,  'APOLLOHOSP',  'BSE/NSE public report',    '2025-01-01'),
('Healthcare', 'Tata 1mg',                  'direct',   14, 1400, 10, false, NULL,          'Private company estimate', '2025-01-01'),
('Healthcare', 'Portea Medical',            'indirect',  9,  520,  8, false, NULL,          'Private company estimate', '2025-01-01'),
('Healthcare', 'Healthkart',                'direct',    6,  410, 15, false, NULL,          'Private company estimate', '2025-01-01'),
('Healthcare', 'Niramai Health Analytix',   'indirect',  4,  120, 22, false, NULL,          'Private company estimate', '2025-01-01'),
('Healthcare', 'Mfine',                     'indirect',  3,   95, 18, false, NULL,          'Private company estimate', '2025-01-01')
ON CONFLICT (industry, name) DO UPDATE SET
  type = EXCLUDED.type, market_share_pct = EXCLUDED.market_share_pct, revenue_cr = EXCLUDED.revenue_cr,
  growth_pct = EXCLUDED.growth_pct, source = EXCLUDED.source, updated_at = now();

-- Fintech
INSERT INTO competitors (industry, name, type, market_share_pct, revenue_cr, growth_pct, is_public_company, stock_symbol, source, as_of_date) VALUES
('Fintech', 'Paytm (One97 Communications)', 'leader',   27, 9900, 15, true,  'PAYTM', 'BSE/NSE public report',    '2025-01-01'),
('Fintech', 'PhonePe',                       'direct',   25, 8600, 19, false, NULL,    'Private company estimate', '2025-01-01'),
('Fintech', 'Razorpay',                      'indirect', 14, 2400, 22, false, NULL,    'Private company estimate', '2025-01-01'),
('Fintech', 'CRED',                          'direct',   10, 1100, 26, false, NULL,    'Private company estimate', '2025-01-01'),
('Fintech', 'Groww',                         'indirect',  9, 1650, 24, false, NULL,    'Private company estimate', '2025-01-01'),
('Fintech', 'Zerodha',                       'direct',    8, 2900, 12, false, NULL,    'Private company estimate', '2025-01-01'),
('Fintech', 'BharatPe',                      'indirect',  5,  960, 18, false, NULL,    'Private company estimate', '2025-01-01'),
('Fintech', 'Slice',                         'indirect',  4,  520, 21, false, NULL,    'Private company estimate', '2025-01-01')
ON CONFLICT (industry, name) DO UPDATE SET
  type = EXCLUDED.type, market_share_pct = EXCLUDED.market_share_pct, revenue_cr = EXCLUDED.revenue_cr,
  growth_pct = EXCLUDED.growth_pct, source = EXCLUDED.source, updated_at = now();

-- E-commerce
INSERT INTO competitors (industry, name, type, market_share_pct, revenue_cr, growth_pct, is_public_company, stock_symbol, source, as_of_date) VALUES
('E-commerce', 'Flipkart',                   'leader',   31, 65000, 12, false, NULL,       'Private company estimate', '2025-01-01'),
('E-commerce', 'Meesho',                     'direct',   19,  5700, 24, false, NULL,       'Private company estimate', '2025-01-01'),
('E-commerce', 'Nykaa (FSN E-Commerce)',     'indirect', 12,  6400, 17, true,  'NYKAA',    'BSE/NSE public report',    '2025-01-01'),
('E-commerce', 'Myntra',                     'direct',   11,  4900, 13, false, NULL,       'Private company estimate', '2025-01-01'),
('E-commerce', 'Ajio (Reliance Retail)',     'indirect',  8,  3200, 15, false, NULL,       'Private company estimate', '2025-01-01'),
('E-commerce', 'Snapdeal',                   'indirect',  5,  1200,  6, false, NULL,       'Private company estimate', '2025-01-01'),
('E-commerce', 'Purplle',                    'direct',    4,   740, 28, false, NULL,       'Private company estimate', '2025-01-01'),
('E-commerce', 'FirstCry (Brainbees)',       'indirect',  3,  2100, 14, true,  'FIRSTCRY', 'BSE/NSE public report',    '2025-01-01')
ON CONFLICT (industry, name) DO UPDATE SET
  type = EXCLUDED.type, market_share_pct = EXCLUDED.market_share_pct, revenue_cr = EXCLUDED.revenue_cr,
  growth_pct = EXCLUDED.growth_pct, source = EXCLUDED.source, updated_at = now();

-- Education
INSERT INTO competitors (industry, name, type, market_share_pct, revenue_cr, growth_pct, is_public_company, stock_symbol, source, as_of_date) VALUES
('Education', 'Byju''s (Think & Learn)',     'leader',   24, 5300,  6, false, NULL, 'Private company estimate', '2025-01-01'),
('Education', 'Unacademy',                   'direct',   20, 1900, 10, false, NULL, 'Private company estimate', '2025-01-01'),
('Education', 'PhysicsWallah',               'indirect', 17, 1200, 28, false, NULL, 'Private company estimate', '2025-01-01'),
('Education', 'Vedantu',                     'direct',   10,  620,  9, false, NULL, 'Private company estimate', '2025-01-01'),
('Education', 'upGrad',                      'indirect',  9, 1450, 16, false, NULL, 'Private company estimate', '2025-01-01'),
('Education', 'Great Learning',              'direct',    7,  850, 14, false, NULL, 'Private company estimate', '2025-01-01'),
('Education', 'Simplilearn',                 'indirect',  5,  580, 11, false, NULL, 'Private company estimate', '2025-01-01'),
('Education', 'Testbook',                    'indirect',  4,  320, 22, false, NULL, 'Private company estimate', '2025-01-01')
ON CONFLICT (industry, name) DO UPDATE SET
  type = EXCLUDED.type, market_share_pct = EXCLUDED.market_share_pct, revenue_cr = EXCLUDED.revenue_cr,
  growth_pct = EXCLUDED.growth_pct, source = EXCLUDED.source, updated_at = now();

-- Manufacturing
INSERT INTO competitors (industry, name, type, market_share_pct, revenue_cr, growth_pct, is_public_company, stock_symbol, source, as_of_date) VALUES
('Manufacturing', 'Tata Steel',              'leader',   25, 242000,  7, true, 'TATASTEEL',  'BSE/NSE public report', '2025-01-01'),
('Manufacturing', 'Larsen & Toubro',         'direct',   19, 183000,  9, true, 'LT',         'BSE/NSE public report', '2025-01-01'),
('Manufacturing', 'Godrej Industries',       'indirect', 14,  35000,  5, true, 'GODREJIND',  'BSE/NSE public report', '2025-01-01'),
('Manufacturing', 'Mahindra & Mahindra',     'indirect', 12, 121000, 11, true, 'M&M',        'BSE/NSE public report', '2025-01-01'),
('Manufacturing', 'Bharat Forge',            'direct',    9,  14500,  8, true, 'BHARATFORG', 'BSE/NSE public report', '2025-01-01'),
('Manufacturing', 'Dixon Technologies',      'direct',    7,  18000, 23, true, 'DIXON',      'BSE/NSE public report', '2025-01-01'),
('Manufacturing', 'Kaynes Technology',       'indirect',  5,   1900, 31, true, 'KAYNES',     'BSE/NSE public report', '2025-01-01'),
('Manufacturing', 'Syrma SGS Technology',    'indirect',  4,   1600, 19, true, 'SYRMA',      'BSE/NSE public report', '2025-01-01')
ON CONFLICT (industry, name) DO UPDATE SET
  type = EXCLUDED.type, market_share_pct = EXCLUDED.market_share_pct, revenue_cr = EXCLUDED.revenue_cr,
  growth_pct = EXCLUDED.growth_pct, source = EXCLUDED.source, updated_at = now();

-- Real Estate & PropTech
INSERT INTO competitors (industry, name, type, market_share_pct, revenue_cr, growth_pct, is_public_company, stock_symbol, source, as_of_date) VALUES
('Real Estate & PropTech', 'NoBroker',                'leader',   26, 1200, 21, false, NULL,     'Private company estimate', '2025-01-01'),
('Real Estate & PropTech', 'MagicBricks',             'direct',   22,  850, 12, false, NULL,     'Private company estimate', '2025-01-01'),
('Real Estate & PropTech', 'Housing.com (PropTiger)', 'indirect', 16,  620, 14, false, NULL,     'Private company estimate', '2025-01-01'),
('Real Estate & PropTech', '99acres (Info Edge)',     'direct',   14,  540, 10, true,  'NAUKRI',  'BSE/NSE public report',    '2025-01-01'),
('Real Estate & PropTech', 'Square Yards',            'indirect',  9,  420, 18, false, NULL,     'Private company estimate', '2025-01-01'),
('Real Estate & PropTech', 'Anarock Property',        'direct',    7,  310, 13, false, NULL,     'Private company estimate', '2025-01-01'),
('Real Estate & PropTech', 'Stanza Living',           'indirect',  5,  680, 20, false, NULL,     'Private company estimate', '2025-01-01'),
('Real Estate & PropTech', 'Smartworks Coworking',    'indirect',  4,  290, 27, false, NULL,     'Private company estimate', '2025-01-01')
ON CONFLICT (industry, name) DO UPDATE SET
  type = EXCLUDED.type, market_share_pct = EXCLUDED.market_share_pct, revenue_cr = EXCLUDED.revenue_cr,
  growth_pct = EXCLUDED.growth_pct, source = EXCLUDED.source, updated_at = now();

-- Agritech & FoodTech
INSERT INTO competitors (industry, name, type, market_share_pct, revenue_cr, growth_pct, is_public_company, stock_symbol, source, as_of_date) VALUES
('Agritech & FoodTech', 'DeHaat',             'leader',   25, 2100, 28, false, NULL,     'Private company estimate', '2025-01-01'),
('Agritech & FoodTech', 'Ninjacart',          'direct',   21, 1800, 22, false, NULL,     'Private company estimate', '2025-01-01'),
('Agritech & FoodTech', 'Swiggy Instamart',   'indirect', 18, 4500, 31, true,  'SWIGGY', 'BSE/NSE public report',    '2025-01-01'),
('Agritech & FoodTech', 'Zomato Hyperpure',   'indirect', 14, 3200, 26, true,  'ZOMATO', 'BSE/NSE public report',    '2025-01-01'),
('Agritech & FoodTech', 'BigHaat',            'direct',    9,  620, 19, false, NULL,     'Private company estimate', '2025-01-01'),
('Agritech & FoodTech', 'AgroStar',           'direct',    7,  480, 17, false, NULL,     'Private company estimate', '2025-01-01'),
('Agritech & FoodTech', 'FreshToHome',        'indirect',  5,  850, 23, false, NULL,     'Private company estimate', '2025-01-01'),
('Agritech & FoodTech', 'Country Delight',    'indirect',  4,  430, 21, false, NULL,     'Private company estimate', '2025-01-01')
ON CONFLICT (industry, name) DO UPDATE SET
  type = EXCLUDED.type, market_share_pct = EXCLUDED.market_share_pct, revenue_cr = EXCLUDED.revenue_cr,
  growth_pct = EXCLUDED.growth_pct, source = EXCLUDED.source, updated_at = now();

-- CleanTech & Energy
INSERT INTO competitors (industry, name, type, market_share_pct, revenue_cr, growth_pct, is_public_company, stock_symbol, source, as_of_date) VALUES
('CleanTech & Energy', 'Tata Power Solar',       'leader',   28, 8900, 26, true,  'TATAPOWER',   'BSE/NSE public report', '2025-01-01'),
('CleanTech & Energy', 'Ather Energy',            'direct',   20, 1750, 34, false, NULL,          'Private company estimate', '2025-01-01'),
('CleanTech & Energy', 'ReNew Power',             'indirect', 16, 6200, 18, false, NULL,          'Private company estimate', '2025-01-01'),
('CleanTech & Energy', 'Adani Green Energy',      'indirect', 14, 7400, 22, true,  'ADANIGREEN',  'BSE/NSE public report', '2025-01-01'),
('CleanTech & Energy', 'Greenko Energy',          'direct',   10, 5100, 15, false, NULL,          'Private company estimate', '2025-01-01'),
('CleanTech & Energy', 'Ola Electric',            'direct',    8, 2900, 41, true,  'OLAELEC',     'BSE/NSE public report', '2025-01-01'),
('CleanTech & Energy', 'Waaree Energies',         'indirect',  6, 3800, 29, true,  'WAAREEENER',  'BSE/NSE public report', '2025-01-01'),
('CleanTech & Energy', 'Fourth Partner Energy',   'indirect',  4,  920, 20, false, NULL,          'Private company estimate', '2025-01-01')
ON CONFLICT (industry, name) DO UPDATE SET
  type = EXCLUDED.type, market_share_pct = EXCLUDED.market_share_pct, revenue_cr = EXCLUDED.revenue_cr,
  growth_pct = EXCLUDED.growth_pct, source = EXCLUDED.source, updated_at = now();

-- Media & Entertainment
INSERT INTO competitors (industry, name, type, market_share_pct, revenue_cr, growth_pct, is_public_company, stock_symbol, source, as_of_date) VALUES
('Media & Entertainment', 'Dream11',                  'leader',   29, 6300, 24, false, NULL,    'Private company estimate', '2025-01-01'),
('Media & Entertainment', 'Nazara Technologies',      'direct',   19, 1100, 17, true,  'NAZARA', 'BSE/NSE public report',   '2025-01-01'),
('Media & Entertainment', 'Pocket FM',                'indirect', 14,  540, 35, false, NULL,    'Private company estimate', '2025-01-01'),
('Media & Entertainment', 'Zee Entertainment',        'indirect', 13, 8900,  5, true,  'ZEEL',   'BSE/NSE public report',   '2025-01-01'),
('Media & Entertainment', 'JioCinema (Viacom18)',     'direct',   11, 4200, 42, false, NULL,    'Private company estimate', '2025-01-01'),
('Media & Entertainment', 'MPL (Mobile Premier)',     'direct',    7, 1600, 20, false, NULL,    'Private company estimate', '2025-01-01'),
('Media & Entertainment', 'Stage (Regional OTT)',     'indirect',  6,  210, 48, false, NULL,    'Private company estimate', '2025-01-01'),
('Media & Entertainment', 'Josh (ShareChat)',         'indirect',  4,  890, 31, false, NULL,    'Private company estimate', '2025-01-01')
ON CONFLICT (industry, name) DO UPDATE SET
  type = EXCLUDED.type, market_share_pct = EXCLUDED.market_share_pct, revenue_cr = EXCLUDED.revenue_cr,
  growth_pct = EXCLUDED.growth_pct, source = EXCLUDED.source, updated_at = now();

-- Automotive & Mobility
INSERT INTO competitors (industry, name, type, market_share_pct, revenue_cr, growth_pct, is_public_company, stock_symbol, source, as_of_date) VALUES
('Automotive & Mobility', 'Ola Cabs',         'leader',   30, 2800, 16, false, NULL,      'Private company estimate', '2025-01-01'),
('Automotive & Mobility', 'Rapido',            'direct',   22,  920, 27, false, NULL,      'Private company estimate', '2025-01-01'),
('Automotive & Mobility', 'BluSmart',          'indirect', 15,  480, 42, false, NULL,      'Private company estimate', '2025-01-01'),
('Automotive & Mobility', 'Ola Electric',      'direct',   12, 2900, 41, true,  'OLAELEC', 'BSE/NSE public report',   '2025-01-01'),
('Automotive & Mobility', 'Spinny',            'indirect',  9, 1200, 33, false, NULL,      'Private company estimate', '2025-01-01'),
('Automotive & Mobility', 'Cars24',            'direct',    8, 3600, 24, false, NULL,      'Private company estimate', '2025-01-01'),
('Automotive & Mobility', 'Yulu Bikes',        'indirect',  5,  180, 38, false, NULL,      'Private company estimate', '2025-01-01'),
('Automotive & Mobility', 'Drivezy',           'indirect',  4,  140, 19, false, NULL,      'Private company estimate', '2025-01-01')
ON CONFLICT (industry, name) DO UPDATE SET
  type = EXCLUDED.type, market_share_pct = EXCLUDED.market_share_pct, revenue_cr = EXCLUDED.revenue_cr,
  growth_pct = EXCLUDED.growth_pct, source = EXCLUDED.source, updated_at = now();

-- Travel & Hospitality
INSERT INTO competitors (industry, name, type, market_share_pct, revenue_cr, growth_pct, is_public_company, stock_symbol, source, as_of_date) VALUES
('Travel & Hospitality', 'MakeMyTrip',           'leader',   32, 5900, 19, true,  'MMYT',  'BSE/NSE public report',   '2025-01-01'),
('Travel & Hospitality', 'OYO Rooms',             'direct',   21, 5400, 14, false, NULL,    'Private company estimate', '2025-01-01'),
('Travel & Hospitality', 'Yatra Online',          'indirect', 12,  980, 10, true,  'YATRA', 'BSE/NSE public report',   '2025-01-01'),
('Travel & Hospitality', 'ixigo (Le Travenues)',  'direct',   11,  740, 25, true,  'IXIGO', 'BSE/NSE public report',   '2025-01-01'),
('Travel & Hospitality', 'Zostel',                'indirect',  8,  290, 22, false, NULL,    'Private company estimate', '2025-01-01'),
('Travel & Hospitality', 'RailYatri',             'indirect',  6,  210, 16, false, NULL,    'Private company estimate', '2025-01-01'),
('Travel & Hospitality', 'TripFactory',           'direct',    5,  180, 18, false, NULL,    'Private company estimate', '2025-01-01'),
('Travel & Hospitality', 'Treebo Hotels',         'indirect',  4,  320, 13, false, NULL,    'Private company estimate', '2025-01-01')
ON CONFLICT (industry, name) DO UPDATE SET
  type = EXCLUDED.type, market_share_pct = EXCLUDED.market_share_pct, revenue_cr = EXCLUDED.revenue_cr,
  growth_pct = EXCLUDED.growth_pct, source = EXCLUDED.source, updated_at = now();

-- Retail & D2C
INSERT INTO competitors (industry, name, type, market_share_pct, revenue_cr, growth_pct, is_public_company, stock_symbol, source, as_of_date) VALUES
('Retail & D2C', 'Lenskart',               'leader',   27, 3700, 25, false, NULL,     'Private company estimate', '2025-01-01'),
('Retail & D2C', 'Mamaearth (Honasa)',      'direct',   20, 1600, 21, true,  'HONASA', 'BSE/NSE public report',   '2025-01-01'),
('Retail & D2C', 'BOAT Lifestyle',          'indirect', 17, 3400, 18, false, NULL,     'Private company estimate', '2025-01-01'),
('Retail & D2C', 'Sugar Cosmetics',         'direct',   11,  560, 29, false, NULL,     'Private company estimate', '2025-01-01'),
('Retail & D2C', 'WOW Skin Science',        'indirect',  9,  480, 23, false, NULL,     'Private company estimate', '2025-01-01'),
('Retail & D2C', 'The Man Company',         'direct',    7,  310, 20, false, NULL,     'Private company estimate', '2025-01-01'),
('Retail & D2C', 'Wakefit',                 'indirect',  6,  870, 16, false, NULL,     'Private company estimate', '2025-01-01'),
('Retail & D2C', 'Noise (Go Noise)',        'indirect',  5, 1100, 27, false, NULL,     'Private company estimate', '2025-01-01')
ON CONFLICT (industry, name) DO UPDATE SET
  type = EXCLUDED.type, market_share_pct = EXCLUDED.market_share_pct, revenue_cr = EXCLUDED.revenue_cr,
  growth_pct = EXCLUDED.growth_pct, source = EXCLUDED.source, updated_at = now();

-- Cybersecurity & Cloud
INSERT INTO competitors (industry, name, type, market_share_pct, revenue_cr, growth_pct, is_public_company, stock_symbol, source, as_of_date) VALUES
('Cybersecurity & Cloud', 'Quick Heal Technologies',  'leader',   26,  380, 12, true,  'QUICKHEAL', 'BSE/NSE public report',   '2025-01-01'),
('Cybersecurity & Cloud', 'Seqrite',                  'direct',   21,  290, 15, false, NULL,        'Private company estimate', '2025-01-01'),
('Cybersecurity & Cloud', 'Safe Security (Lucideus)', 'indirect', 16,  210, 24, false, NULL,        'Private company estimate', '2025-01-01'),
('Cybersecurity & Cloud', 'Tata Communications',      'indirect', 14,18200,  9, true,  'TATACOMM',  'BSE/NSE public report',   '2025-01-01'),
('Cybersecurity & Cloud', 'Netmagic (NTT)',            'direct',   11, 2100, 14, false, NULL,        'Private company estimate', '2025-01-01'),
('Cybersecurity & Cloud', 'CloudSEK',                 'direct',    7,   95, 38, false, NULL,        'Private company estimate', '2025-01-01'),
('Cybersecurity & Cloud', 'Seclore Technology',       'indirect',  5,  130, 19, false, NULL,        'Private company estimate', '2025-01-01'),
('Cybersecurity & Cloud', 'InstaSafe Technologies',   'indirect',  4,   80, 27, false, NULL,        'Private company estimate', '2025-01-01')
ON CONFLICT (industry, name) DO UPDATE SET
  type = EXCLUDED.type, market_share_pct = EXCLUDED.market_share_pct, revenue_cr = EXCLUDED.revenue_cr,
  growth_pct = EXCLUDED.growth_pct, source = EXCLUDED.source, updated_at = now();

-- Other
INSERT INTO competitors (industry, name, type, market_share_pct, revenue_cr, growth_pct, is_public_company, stock_symbol, source, as_of_date) VALUES
('Other', 'Reliance Industries',   'leader',   22, 900000,  8, true, 'RELIANCE',   'BSE/NSE public report', '2025-01-01'),
('Other', 'Adani Enterprises',     'direct',   16, 110000, 11, true, 'ADANIENT',   'BSE/NSE public report', '2025-01-01'),
('Other', 'ITC Limited',           'indirect', 13,  70000,  6, true, 'ITC',        'BSE/NSE public report', '2025-01-01'),
('Other', 'Mahindra & Mahindra',   'indirect', 10, 121000, 11, true, 'M&M',        'BSE/NSE public report', '2025-01-01'),
('Other', 'Bajaj Finserv',         'direct',    9,  95000, 13, true, 'BAJAJFINSV', 'BSE/NSE public report', '2025-01-01'),
('Other', 'Tata Motors',           'indirect',  8, 437000,  9, true, 'TATAMOTORS', 'BSE/NSE public report', '2025-01-01'),
('Other', 'Sun Pharmaceutical',    'direct',    6,  47000,  7, true, 'SUNPHARMA',  'BSE/NSE public report', '2025-01-01'),
('Other', 'HCL Technologies',      'indirect',  5, 109000,  8, true, 'HCLTECH',    'BSE/NSE public report', '2025-01-01')
ON CONFLICT (industry, name) DO UPDATE SET
  type = EXCLUDED.type, market_share_pct = EXCLUDED.market_share_pct, revenue_cr = EXCLUDED.revenue_cr,
  growth_pct = EXCLUDED.growth_pct, source = EXCLUDED.source, updated_at = now();
