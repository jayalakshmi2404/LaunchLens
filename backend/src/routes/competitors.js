import { Router } from 'express';
import { query } from '../db/pool.js';

const router = Router();

const fallbackCompetitors = {
  Technology: [
    { id: 101, industry: 'Technology', name: 'Zoho Corporation', type: 'leader', market_share_pct: 28, revenue_cr: 8200, growth_pct: 18, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 102, industry: 'Technology', name: 'Freshworks Inc.', type: 'direct', market_share_pct: 21, revenue_cr: 5100, growth_pct: 14, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 103, industry: 'Technology', name: 'Tata Consultancy Services', type: 'indirect', market_share_pct: 16, revenue_cr: 4300, growth_pct: 9, is_public_company: true, stock_symbol: 'TCS', source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 104, industry: 'Technology', name: 'Infosys Limited', type: 'indirect', market_share_pct: 12, revenue_cr: 3600, growth_pct: 7, is_public_company: true, stock_symbol: 'INFY', source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 105, industry: 'Technology', name: 'Wingify', type: 'direct', market_share_pct: 8, revenue_cr: 380, growth_pct: 21, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 106, industry: 'Technology', name: 'MoEngage', type: 'direct', market_share_pct: 6, revenue_cr: 320, growth_pct: 25, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 107, industry: 'Technology', name: 'Postman', type: 'indirect', market_share_pct: 5, revenue_cr: 290, growth_pct: 19, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 108, industry: 'Technology', name: 'BrowserStack', type: 'direct', market_share_pct: 4, revenue_cr: 240, growth_pct: 17, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
  ],
  Healthcare: [
    { id: 201, industry: 'Healthcare', name: 'Practo', type: 'leader', market_share_pct: 26, revenue_cr: 1850, growth_pct: 16, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 202, industry: 'Healthcare', name: 'PharmEasy (API Holdings)', type: 'direct', market_share_pct: 23, revenue_cr: 2600, growth_pct: 11, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 203, industry: 'Healthcare', name: 'Apollo Hospitals', type: 'indirect', market_share_pct: 18, revenue_cr: 3100, growth_pct: 13, is_public_company: true, stock_symbol: 'APOLLOHOSP', source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 204, industry: 'Healthcare', name: 'Tata 1mg', type: 'direct', market_share_pct: 14, revenue_cr: 1400, growth_pct: 10, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 205, industry: 'Healthcare', name: 'Portea Medical', type: 'indirect', market_share_pct: 9, revenue_cr: 520, growth_pct: 8, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 206, industry: 'Healthcare', name: 'Healthkart', type: 'direct', market_share_pct: 6, revenue_cr: 410, growth_pct: 15, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 207, industry: 'Healthcare', name: 'Niramai Health Analytix', type: 'indirect', market_share_pct: 4, revenue_cr: 120, growth_pct: 22, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 208, industry: 'Healthcare', name: 'Mfine', type: 'indirect', market_share_pct: 3, revenue_cr: 95, growth_pct: 18, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
  ],
  Fintech: [
    { id: 301, industry: 'Fintech', name: 'Paytm (One97 Communications)', type: 'leader', market_share_pct: 27, revenue_cr: 9900, growth_pct: 15, is_public_company: true, stock_symbol: 'PAYTM', source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 302, industry: 'Fintech', name: 'PhonePe', type: 'direct', market_share_pct: 25, revenue_cr: 8600, growth_pct: 19, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 303, industry: 'Fintech', name: 'Razorpay', type: 'indirect', market_share_pct: 14, revenue_cr: 2400, growth_pct: 22, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 304, industry: 'Fintech', name: 'CRED', type: 'direct', market_share_pct: 10, revenue_cr: 1100, growth_pct: 26, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 305, industry: 'Fintech', name: 'Groww', type: 'indirect', market_share_pct: 9, revenue_cr: 1650, growth_pct: 24, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 306, industry: 'Fintech', name: 'Zerodha', type: 'direct', market_share_pct: 8, revenue_cr: 2900, growth_pct: 12, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 307, industry: 'Fintech', name: 'BharatPe', type: 'indirect', market_share_pct: 5, revenue_cr: 960, growth_pct: 18, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 308, industry: 'Fintech', name: 'Slice (North East Small Finance Bank)', type: 'indirect', market_share_pct: 4, revenue_cr: 520, growth_pct: 21, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
  ],
  'E-commerce': [
    { id: 401, industry: 'E-commerce', name: 'Flipkart', type: 'leader', market_share_pct: 31, revenue_cr: 65000, growth_pct: 12, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 402, industry: 'E-commerce', name: 'Meesho', type: 'direct', market_share_pct: 19, revenue_cr: 5700, growth_pct: 24, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 403, industry: 'E-commerce', name: 'Nykaa (FSN E-Commerce)', type: 'indirect', market_share_pct: 12, revenue_cr: 6400, growth_pct: 17, is_public_company: true, stock_symbol: 'NYKAA', source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 404, industry: 'E-commerce', name: 'Myntra', type: 'direct', market_share_pct: 11, revenue_cr: 4900, growth_pct: 13, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 405, industry: 'E-commerce', name: 'Ajio (Reliance Retail)', type: 'indirect', market_share_pct: 8, revenue_cr: 3200, growth_pct: 15, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 406, industry: 'E-commerce', name: 'Snapdeal', type: 'indirect', market_share_pct: 5, revenue_cr: 1200, growth_pct: 6, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 407, industry: 'E-commerce', name: 'Purplle', type: 'direct', market_share_pct: 4, revenue_cr: 740, growth_pct: 28, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 408, industry: 'E-commerce', name: 'FirstCry (Brainbees Solutions)', type: 'indirect', market_share_pct: 3, revenue_cr: 2100, growth_pct: 14, is_public_company: true, stock_symbol: 'FIRSTCRY', source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
  ],
  Education: [
    { id: 501, industry: 'Education', name: "Byju's (Think & Learn)", type: 'leader', market_share_pct: 24, revenue_cr: 5300, growth_pct: 6, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 502, industry: 'Education', name: 'Unacademy', type: 'direct', market_share_pct: 20, revenue_cr: 1900, growth_pct: 10, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 503, industry: 'Education', name: 'PhysicsWallah', type: 'indirect', market_share_pct: 17, revenue_cr: 1200, growth_pct: 28, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 504, industry: 'Education', name: 'Vedantu', type: 'direct', market_share_pct: 10, revenue_cr: 620, growth_pct: 9, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 505, industry: 'Education', name: 'upGrad', type: 'indirect', market_share_pct: 9, revenue_cr: 1450, growth_pct: 16, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 506, industry: 'Education', name: 'Great Learning', type: 'direct', market_share_pct: 7, revenue_cr: 850, growth_pct: 14, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 507, industry: 'Education', name: 'Simplilearn', type: 'indirect', market_share_pct: 5, revenue_cr: 580, growth_pct: 11, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 508, industry: 'Education', name: 'Testbook', type: 'indirect', market_share_pct: 4, revenue_cr: 320, growth_pct: 22, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
  ],
  Manufacturing: [
    { id: 601, industry: 'Manufacturing', name: 'Tata Steel', type: 'leader', market_share_pct: 25, revenue_cr: 242000, growth_pct: 7, is_public_company: true, stock_symbol: 'TATASTEEL', source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 602, industry: 'Manufacturing', name: 'Larsen & Toubro', type: 'direct', market_share_pct: 19, revenue_cr: 183000, growth_pct: 9, is_public_company: true, stock_symbol: 'LT', source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 603, industry: 'Manufacturing', name: 'Godrej Industries', type: 'indirect', market_share_pct: 14, revenue_cr: 35000, growth_pct: 5, is_public_company: true, stock_symbol: 'GODREJIND', source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 604, industry: 'Manufacturing', name: 'Mahindra & Mahindra', type: 'indirect', market_share_pct: 12, revenue_cr: 121000, growth_pct: 11, is_public_company: true, stock_symbol: 'M&M', source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 605, industry: 'Manufacturing', name: 'Bharat Forge', type: 'direct', market_share_pct: 9, revenue_cr: 14500, growth_pct: 8, is_public_company: true, stock_symbol: 'BHARATFORG', source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 606, industry: 'Manufacturing', name: 'Dixon Technologies', type: 'direct', market_share_pct: 7, revenue_cr: 18000, growth_pct: 23, is_public_company: true, stock_symbol: 'DIXON', source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 607, industry: 'Manufacturing', name: 'Kaynes Technology', type: 'indirect', market_share_pct: 5, revenue_cr: 1900, growth_pct: 31, is_public_company: true, stock_symbol: 'KAYNES', source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 608, industry: 'Manufacturing', name: 'Syrma SGS Technology', type: 'indirect', market_share_pct: 4, revenue_cr: 1600, growth_pct: 19, is_public_company: true, stock_symbol: 'SYRMA', source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
  ],
  'Real Estate & PropTech': [
    { id: 701, industry: 'Real Estate & PropTech', name: 'NoBroker', type: 'leader', market_share_pct: 26, revenue_cr: 1200, growth_pct: 21, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 702, industry: 'Real Estate & PropTech', name: 'MagicBricks', type: 'direct', market_share_pct: 22, revenue_cr: 850, growth_pct: 12, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 703, industry: 'Real Estate & PropTech', name: 'Housing.com (PropTiger)', type: 'indirect', market_share_pct: 16, revenue_cr: 620, growth_pct: 14, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 704, industry: 'Real Estate & PropTech', name: '99acres (Info Edge)', type: 'direct', market_share_pct: 14, revenue_cr: 540, growth_pct: 10, is_public_company: true, stock_symbol: 'NAUKRI', source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 705, industry: 'Real Estate & PropTech', name: 'Square Yards', type: 'indirect', market_share_pct: 9, revenue_cr: 420, growth_pct: 18, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 706, industry: 'Real Estate & PropTech', name: 'Anarock Property Consultants', type: 'direct', market_share_pct: 7, revenue_cr: 310, growth_pct: 13, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 707, industry: 'Real Estate & PropTech', name: 'Stanza Living', type: 'indirect', market_share_pct: 5, revenue_cr: 680, growth_pct: 20, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 708, industry: 'Real Estate & PropTech', name: 'Smartworks Coworking', type: 'indirect', market_share_pct: 4, revenue_cr: 290, growth_pct: 27, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
  ],
  'Agritech & FoodTech': [
    { id: 801, industry: 'Agritech & FoodTech', name: 'DeHaat', type: 'leader', market_share_pct: 25, revenue_cr: 2100, growth_pct: 28, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 802, industry: 'Agritech & FoodTech', name: 'Ninjacart', type: 'direct', market_share_pct: 21, revenue_cr: 1800, growth_pct: 22, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 803, industry: 'Agritech & FoodTech', name: 'Swiggy Instamart', type: 'indirect', market_share_pct: 18, revenue_cr: 4500, growth_pct: 31, is_public_company: true, stock_symbol: 'SWIGGY', source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 804, industry: 'Agritech & FoodTech', name: 'Zomato (Hyperpure)', type: 'indirect', market_share_pct: 14, revenue_cr: 3200, growth_pct: 26, is_public_company: true, stock_symbol: 'ZOMATO', source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 805, industry: 'Agritech & FoodTech', name: 'BigHaat', type: 'direct', market_share_pct: 9, revenue_cr: 620, growth_pct: 19, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 806, industry: 'Agritech & FoodTech', name: 'AgroStar', type: 'direct', market_share_pct: 7, revenue_cr: 480, growth_pct: 17, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 807, industry: 'Agritech & FoodTech', name: 'FreshToHome', type: 'indirect', market_share_pct: 5, revenue_cr: 850, growth_pct: 23, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 808, industry: 'Agritech & FoodTech', name: 'Country Delight', type: 'indirect', market_share_pct: 4, revenue_cr: 430, growth_pct: 21, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
  ],
  'CleanTech & Energy': [
    { id: 901, industry: 'CleanTech & Energy', name: 'Tata Power Solar', type: 'leader', market_share_pct: 28, revenue_cr: 8900, growth_pct: 26, is_public_company: true, stock_symbol: 'TATAPOWER', source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 902, industry: 'CleanTech & Energy', name: 'Ather Energy', type: 'direct', market_share_pct: 20, revenue_cr: 1750, growth_pct: 34, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 903, industry: 'CleanTech & Energy', name: 'ReNew Power', type: 'indirect', market_share_pct: 16, revenue_cr: 6200, growth_pct: 18, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 904, industry: 'CleanTech & Energy', name: 'Adani Green Energy', type: 'indirect', market_share_pct: 14, revenue_cr: 7400, growth_pct: 22, is_public_company: true, stock_symbol: 'ADANIGREEN', source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 905, industry: 'CleanTech & Energy', name: 'Greenko Energy', type: 'direct', market_share_pct: 10, revenue_cr: 5100, growth_pct: 15, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 906, industry: 'CleanTech & Energy', name: 'Ola Electric', type: 'direct', market_share_pct: 8, revenue_cr: 2900, growth_pct: 41, is_public_company: true, stock_symbol: 'OLAELEC', source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 907, industry: 'CleanTech & Energy', name: 'Waaree Energies', type: 'indirect', market_share_pct: 6, revenue_cr: 3800, growth_pct: 29, is_public_company: true, stock_symbol: 'WAAREEENER', source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 908, industry: 'CleanTech & Energy', name: 'Fourth Partner Energy', type: 'indirect', market_share_pct: 4, revenue_cr: 920, growth_pct: 20, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
  ],
  'Media & Entertainment': [
    { id: 1001, industry: 'Media & Entertainment', name: 'Dream11', type: 'leader', market_share_pct: 29, revenue_cr: 6300, growth_pct: 24, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 1002, industry: 'Media & Entertainment', name: 'Nazara Technologies', type: 'direct', market_share_pct: 19, revenue_cr: 1100, growth_pct: 17, is_public_company: true, stock_symbol: 'NAZARA', source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 1003, industry: 'Media & Entertainment', name: 'Pocket FM', type: 'indirect', market_share_pct: 14, revenue_cr: 540, growth_pct: 35, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 1004, industry: 'Media & Entertainment', name: 'Zee Entertainment', type: 'indirect', market_share_pct: 13, revenue_cr: 8900, growth_pct: 5, is_public_company: true, stock_symbol: 'ZEEL', source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 1005, industry: 'Media & Entertainment', name: 'JioCinema (Viacom18)', type: 'direct', market_share_pct: 11, revenue_cr: 4200, growth_pct: 42, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 1006, industry: 'Media & Entertainment', name: 'Stage (Regional OTT)', type: 'indirect', market_share_pct: 6, revenue_cr: 210, growth_pct: 48, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 1007, industry: 'Media & Entertainment', name: 'MPL (Mobile Premier League)', type: 'direct', market_share_pct: 5, revenue_cr: 1600, growth_pct: 20, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 1008, industry: 'Media & Entertainment', name: 'Josh (ShareChat)', type: 'indirect', market_share_pct: 4, revenue_cr: 890, growth_pct: 31, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
  ],
  'Automotive & Mobility': [
    { id: 1101, industry: 'Automotive & Mobility', name: 'Ola Cabs', type: 'leader', market_share_pct: 30, revenue_cr: 2800, growth_pct: 16, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 1102, industry: 'Automotive & Mobility', name: 'Rapido', type: 'direct', market_share_pct: 22, revenue_cr: 920, growth_pct: 27, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 1103, industry: 'Automotive & Mobility', name: 'BluSmart', type: 'indirect', market_share_pct: 15, revenue_cr: 480, growth_pct: 42, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 1104, industry: 'Automotive & Mobility', name: 'Ola Electric', type: 'direct', market_share_pct: 12, revenue_cr: 2900, growth_pct: 41, is_public_company: true, stock_symbol: 'OLAELEC', source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 1105, industry: 'Automotive & Mobility', name: 'Spinny', type: 'indirect', market_share_pct: 9, revenue_cr: 1200, growth_pct: 33, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 1106, industry: 'Automotive & Mobility', name: 'Cars24', type: 'direct', market_share_pct: 8, revenue_cr: 3600, growth_pct: 24, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 1107, industry: 'Automotive & Mobility', name: 'Yulu Bikes', type: 'indirect', market_share_pct: 5, revenue_cr: 180, growth_pct: 38, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 1108, industry: 'Automotive & Mobility', name: 'Drivezy', type: 'indirect', market_share_pct: 4, revenue_cr: 140, growth_pct: 19, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
  ],
  'Travel & Hospitality': [
    { id: 1201, industry: 'Travel & Hospitality', name: 'MakeMyTrip', type: 'leader', market_share_pct: 32, revenue_cr: 5900, growth_pct: 19, is_public_company: true, stock_symbol: 'MMYT', source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 1202, industry: 'Travel & Hospitality', name: 'OYO Rooms (Oravel Stays)', type: 'direct', market_share_pct: 21, revenue_cr: 5400, growth_pct: 14, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 1203, industry: 'Travel & Hospitality', name: 'Yatra Online', type: 'indirect', market_share_pct: 12, revenue_cr: 980, growth_pct: 10, is_public_company: true, stock_symbol: 'YATRA', source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 1204, industry: 'Travel & Hospitality', name: 'ixigo (Le Travenues)', type: 'direct', market_share_pct: 11, revenue_cr: 740, growth_pct: 25, is_public_company: true, stock_symbol: 'IXIGO', source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 1205, industry: 'Travel & Hospitality', name: 'Zostel', type: 'indirect', market_share_pct: 8, revenue_cr: 290, growth_pct: 22, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 1206, industry: 'Travel & Hospitality', name: 'RailYatri', type: 'indirect', market_share_pct: 6, revenue_cr: 210, growth_pct: 16, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 1207, industry: 'Travel & Hospitality', name: 'TripFactory', type: 'direct', market_share_pct: 5, revenue_cr: 180, growth_pct: 18, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 1208, industry: 'Travel & Hospitality', name: 'Treebo Hotels', type: 'indirect', market_share_pct: 4, revenue_cr: 320, growth_pct: 13, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
  ],
  'Retail & D2C': [
    { id: 1301, industry: 'Retail & D2C', name: 'Lenskart', type: 'leader', market_share_pct: 27, revenue_cr: 3700, growth_pct: 25, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 1302, industry: 'Retail & D2C', name: 'Mamaearth (Honasa Consumer)', type: 'direct', market_share_pct: 20, revenue_cr: 1600, growth_pct: 21, is_public_company: true, stock_symbol: 'HONASA', source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 1303, industry: 'Retail & D2C', name: 'BOAT Lifestyle (Imagine Marketing)', type: 'indirect', market_share_pct: 17, revenue_cr: 3400, growth_pct: 18, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 1304, industry: 'Retail & D2C', name: 'Sugar Cosmetics', type: 'direct', market_share_pct: 11, revenue_cr: 560, growth_pct: 29, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 1305, industry: 'Retail & D2C', name: 'WOW Skin Science', type: 'indirect', market_share_pct: 9, revenue_cr: 480, growth_pct: 23, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 1306, industry: 'Retail & D2C', name: 'The Man Company', type: 'direct', market_share_pct: 7, revenue_cr: 310, growth_pct: 20, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 1307, industry: 'Retail & D2C', name: "Wakefit", type: 'indirect', market_share_pct: 6, revenue_cr: 870, growth_pct: 16, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 1308, industry: 'Retail & D2C', name: 'Noise (Go Noise)', type: 'indirect', market_share_pct: 5, revenue_cr: 1100, growth_pct: 27, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
  ],
  'Cybersecurity & Cloud': [
    { id: 1401, industry: 'Cybersecurity & Cloud', name: 'Quick Heal Technologies', type: 'leader', market_share_pct: 26, revenue_cr: 380, growth_pct: 12, is_public_company: true, stock_symbol: 'QUICKHEAL', source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 1402, industry: 'Cybersecurity & Cloud', name: 'Seqrite (Quick Heal B2B)', type: 'direct', market_share_pct: 21, revenue_cr: 290, growth_pct: 15, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 1403, industry: 'Cybersecurity & Cloud', name: 'Lucideus (Safe Security)', type: 'indirect', market_share_pct: 16, revenue_cr: 210, growth_pct: 24, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 1404, industry: 'Cybersecurity & Cloud', name: 'Tata Communications', type: 'indirect', market_share_pct: 14, revenue_cr: 18200, growth_pct: 9, is_public_company: true, stock_symbol: 'TATACOMM', source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 1405, industry: 'Cybersecurity & Cloud', name: 'Netmagic (NTT)', type: 'direct', market_share_pct: 11, revenue_cr: 2100, growth_pct: 14, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 1406, industry: 'Cybersecurity & Cloud', name: 'CloudSEK', type: 'direct', market_share_pct: 7, revenue_cr: 95, growth_pct: 38, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 1407, industry: 'Cybersecurity & Cloud', name: 'Seclore Technology', type: 'indirect', market_share_pct: 5, revenue_cr: 130, growth_pct: 19, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 1408, industry: 'Cybersecurity & Cloud', name: 'InstaSafe Technologies', type: 'indirect', market_share_pct: 4, revenue_cr: 80, growth_pct: 27, is_public_company: false, stock_symbol: null, source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
  ],
  Other: [
    { id: 1501, industry: 'Other', name: 'Reliance Industries', type: 'leader', market_share_pct: 22, revenue_cr: 900000, growth_pct: 8, is_public_company: true, stock_symbol: 'RELIANCE', source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 1502, industry: 'Other', name: 'Adani Enterprises', type: 'direct', market_share_pct: 16, revenue_cr: 110000, growth_pct: 11, is_public_company: true, stock_symbol: 'ADANIENT', source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 1503, industry: 'Other', name: 'ITC Limited', type: 'indirect', market_share_pct: 13, revenue_cr: 70000, growth_pct: 6, is_public_company: true, stock_symbol: 'ITC', source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 1504, industry: 'Other', name: 'Mahindra & Mahindra', type: 'indirect', market_share_pct: 10, revenue_cr: 121000, growth_pct: 11, is_public_company: true, stock_symbol: 'M&M', source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 1505, industry: 'Other', name: 'Bajaj Finserv', type: 'direct', market_share_pct: 9, revenue_cr: 95000, growth_pct: 13, is_public_company: true, stock_symbol: 'BAJAJFINSV', source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 1506, industry: 'Other', name: 'Tata Motors', type: 'indirect', market_share_pct: 8, revenue_cr: 437000, growth_pct: 9, is_public_company: true, stock_symbol: 'TATAMOTORS', source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 1507, industry: 'Other', name: 'Sun Pharmaceutical', type: 'direct', market_share_pct: 6, revenue_cr: 47000, growth_pct: 7, is_public_company: true, stock_symbol: 'SUNPHARMA', source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
    { id: 1508, industry: 'Other', name: 'HCL Technologies', type: 'indirect', market_share_pct: 5, revenue_cr: 109000, growth_pct: 8, is_public_company: true, stock_symbol: 'HCLTECH', source: 'Offline fallback estimate', as_of_date: '2025-01-01' },
  ],
};

// Fetch a live quote for an NSE-listed stock symbol.
async function fetchLiveQuote(symbol) {
  try {
    const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbol}.NS`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*'
      }
    });
    if (!res.ok) return null;
    const data = await res.json();
    const quote = data?.quoteResponse?.result?.[0];
    if (!quote) return null;
    return {
      price: quote.regularMarketPrice ?? null,
      changePercent: quote.regularMarketChangePercent ?? null,
      marketCapCr: quote.marketCap ? +(quote.marketCap / 1e7).toFixed(0) : null,
      currency: quote.currency ?? 'INR',
      asOf: quote.regularMarketTime ? new Date(quote.regularMarketTime * 1000).toISOString() : null,
    };
  } catch (err) {
    return null;
  }
}

const router = Router();

// GET /api/competitors/:industry
router.get('/:industry', async (req, res) => {
  const { industry } = req.params;
  const wantLive = req.query.live === 'true';

  let rows = [];
  try {
    const result = await query(
      'SELECT * FROM competitors WHERE industry = $1 ORDER BY market_share_pct DESC',
      [industry]
    );

    const uniqueMap = new Map();
    for (const row of result.rows) {
      const existing = uniqueMap.get(row.name);
      if (!existing || Number(row.market_share_pct) > Number(existing.market_share_pct)) {
        uniqueMap.set(row.name, row);
      }
    }
    rows = Array.from(uniqueMap.values()).sort((a, b) => Number(b.market_share_pct) - Number(a.market_share_pct));

    // If DB returned nothing, use fallback
    if (rows.length === 0) {
      rows = fallbackCompetitors[industry] || fallbackCompetitors.Other;
    }
  } catch (err) {
    console.warn(`[Competitors DB Warning] Database offline (${err.message}). Using offline fallback.`);
    rows = fallbackCompetitors[industry] || fallbackCompetitors.Other;
  }

  if (!wantLive) {
    return res.json(rows);
  }

  const enriched = await Promise.all(
    rows.map(async (row) => {
      if (!row.is_public_company || !row.stock_symbol) return row;
      const liveData = await fetchLiveQuote(row.stock_symbol);
      return { ...row, live: liveData };
    })
  );

  res.json(enriched);
});

export default router;
