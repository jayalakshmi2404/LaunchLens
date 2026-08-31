// Currency helper — Indian Rupee, crore/lakh notation
export function formatINR(crores) {
  if (crores >= 100) {
    return '₹' + (crores / 100).toFixed(1).replace(/\.0$/, '') + ',000 Cr'
  }
  return '₹' + crores.toLocaleString('en-IN') + ' Cr'
}

export function formatINRShort(crores) {
  return '₹' + crores.toLocaleString('en-IN') + ' Cr'
}

// Market sizing per industry, in ₹ Crore
export const marketSizing = {
  Technology: { tam: 18500, sam: 6200, som: 92, tamGrowth: 8.2, samGrowth: 5.5, somGrowth: -2.1 },
  Healthcare: { tam: 24500, sam: 8100, som: 140, tamGrowth: 10.4, samGrowth: 7.1, somGrowth: 3.4 },
  Fintech: { tam: 31200, sam: 9800, som: 210, tamGrowth: 14.1, samGrowth: 9.6, somGrowth: 4.8 },
  'E-commerce': { tam: 27800, sam: 7400, som: 165, tamGrowth: 11.3, samGrowth: 6.8, somGrowth: -1.2 },
  Education: { tam: 15200, sam: 4600, som: 78, tamGrowth: 9.7, samGrowth: 6.2, somGrowth: 2.6 },
  Manufacturing: { tam: 19700, sam: 5300, som: 88, tamGrowth: 6.5, samGrowth: 4.1, somGrowth: 1.5 },
  'Real Estate & PropTech': { tam: 16800, sam: 4900, som: 82, tamGrowth: 7.8, samGrowth: 5.1, somGrowth: 1.8 },
  'Agritech & FoodTech': { tam: 14100, sam: 4200, som: 74, tamGrowth: 11.2, samGrowth: 7.5, somGrowth: 3.8 },
  'CleanTech & Energy': { tam: 22400, sam: 7100, som: 115, tamGrowth: 15.6, samGrowth: 10.2, somGrowth: 5.4 },
  'Media & Entertainment': { tam: 18900, sam: 5800, som: 96, tamGrowth: 12.1, samGrowth: 8.4, somGrowth: 2.9 },
  'Automotive & Mobility': { tam: 29500, sam: 8900, som: 175, tamGrowth: 13.8, samGrowth: 9.1, somGrowth: 4.2 },
  'Travel & Hospitality': { tam: 16300, sam: 4700, som: 79, tamGrowth: 8.9, samGrowth: 5.8, somGrowth: 1.9 },
  'Retail & D2C': { tam: 26100, sam: 7800, som: 155, tamGrowth: 12.5, samGrowth: 7.9, somGrowth: 2.4 },
  'Cybersecurity & Cloud': { tam: 21500, sam: 6900, som: 125, tamGrowth: 16.4, samGrowth: 11.2, somGrowth: 6.1 },
  Other: { tam: 12000, sam: 3500, som: 60, tamGrowth: 7.0, samGrowth: 4.5, somGrowth: 0.5 },
}

// Famous companies used as the "competitor landscape" comparison
export const competitorsByIndustry = {
  Technology: [
    { name: 'Zoho Corporation', type: 'leader', share: 28, revenue: '₹8,200 Cr', growth: '+18%' },
    { name: 'Freshworks', type: 'direct', share: 21, revenue: '₹5,100 Cr', growth: '+14%' },
    { name: 'TCS Digital', type: 'indirect', share: 16, revenue: '₹4,300 Cr', growth: '+9%' },
    { name: 'Infosys BPM', type: 'indirect', share: 12, revenue: '₹3,600 Cr', growth: '+7%' },
    { name: 'Wingify', type: 'direct', share: 8, revenue: '₹380 Cr', growth: '+21%' },
  ],
  Healthcare: [
    { name: 'Practo', type: 'leader', share: 26, revenue: '₹1,850 Cr', growth: '+16%' },
    { name: 'PharmEasy', type: 'direct', share: 23, revenue: '₹2,600 Cr', growth: '+11%' },
    { name: 'Apollo 24|7', type: 'indirect', share: 18, revenue: '₹3,100 Cr', growth: '+13%' },
    { name: '1mg', type: 'direct', share: 14, revenue: '₹1,400 Cr', growth: '+10%' },
    { name: 'Portea Medical', type: 'indirect', share: 9, revenue: '₹520 Cr', growth: '+8%' },
  ],
  Fintech: [
    { name: 'Paytm', type: 'leader', share: 27, revenue: '₹9,900 Cr', growth: '+15%' },
    { name: 'PhonePe', type: 'direct', share: 25, revenue: '₹8,600 Cr', growth: '+19%' },
    { name: 'Razorpay', type: 'indirect', share: 14, revenue: '₹2,400 Cr', growth: '+22%' },
    { name: 'CRED', type: 'direct', share: 10, revenue: '₹1,100 Cr', growth: '+26%' },
    { name: 'Groww', type: 'indirect', share: 9, revenue: '₹1,650 Cr', growth: '+24%' },
  ],
  'E-commerce': [
    { name: 'Flipkart', type: 'leader', share: 31, revenue: '₹65,000 Cr', growth: '+12%' },
    { name: 'Meesho', type: 'direct', share: 19, revenue: '₹5,700 Cr', growth: '+24%' },
    { name: 'Nykaa', type: 'indirect', share: 12, revenue: '₹6,400 Cr', growth: '+17%' },
    { name: 'Myntra', type: 'direct', share: 11, revenue: '₹4,900 Cr', growth: '+13%' },
    { name: 'Ajio', type: 'indirect', share: 8, revenue: '₹3,200 Cr', growth: '+15%' },
  ],
  Education: [
    { name: "Byju's", type: 'leader', share: 24, revenue: '₹5,300 Cr', growth: '+6%' },
    { name: 'Unacademy', type: 'direct', share: 20, revenue: '₹1,900 Cr', growth: '+10%' },
    { name: 'PhysicsWallah', type: 'indirect', share: 17, revenue: '₹1,200 Cr', growth: '+28%' },
    { name: 'Vedantu', type: 'direct', share: 10, revenue: '₹620 Cr', growth: '+9%' },
    { name: 'upGrad', type: 'indirect', share: 9, revenue: '₹1,450 Cr', growth: '+16%' },
  ],
  Manufacturing: [
    { name: 'Tata Steel', type: 'leader', share: 25, revenue: '₹2,42,000 Cr', growth: '+7%' },
    { name: 'Larsen & Toubro', type: 'direct', share: 19, revenue: '₹1,83,000 Cr', growth: '+9%' },
    { name: 'Godrej Industries', type: 'indirect', share: 14, revenue: '₹35,000 Cr', growth: '+5%' },
  ],
  'Real Estate & PropTech': [
    { name: 'NoBroker', type: 'leader', share: 26, revenue: '₹1,200 Cr', growth: '+21%' },
    { name: 'MagicBricks', type: 'direct', share: 22, revenue: '₹850 Cr', growth: '+12%' },
    { name: 'Housing.com', type: 'indirect', share: 16, revenue: '₹620 Cr', growth: '+14%' },
  ],
  'Agritech & FoodTech': [
    { name: 'DeHaat', type: 'leader', share: 25, revenue: '₹2,100 Cr', growth: '+28%' },
    { name: 'Ninjacart', type: 'direct', share: 21, revenue: '₹1,800 Cr', growth: '+22%' },
    { name: 'Swiggy Instamart', type: 'indirect', share: 18, revenue: '₹4,500 Cr', growth: '+31%' },
  ],
  'CleanTech & Energy': [
    { name: 'Tata Power Solar', type: 'leader', share: 28, revenue: '₹8,900 Cr', growth: '+26%' },
    { name: 'Ather Energy', type: 'direct', share: 20, revenue: '₹1,750 Cr', growth: '+34%' },
    { name: 'ReNew Power', type: 'indirect', share: 16, revenue: '₹6,200 Cr', growth: '+18%' },
  ],
  'Media & Entertainment': [
    { name: 'Dream11', type: 'leader', share: 29, revenue: '₹6,300 Cr', growth: '+24%' },
    { name: 'Nazara Technologies', type: 'direct', share: 19, revenue: '₹1,100 Cr', growth: '+17%' },
    { name: 'Pocket FM', type: 'indirect', share: 14, revenue: '₹540 Cr', growth: '+35%' },
  ],
  'Automotive & Mobility': [
    { name: 'Ola Cabs', type: 'leader', share: 30, revenue: '₹2,800 Cr', growth: '+16%' },
    { name: 'Rapido', type: 'direct', share: 22, revenue: '₹920 Cr', growth: '+27%' },
    { name: 'BluSmart', type: 'indirect', share: 15, revenue: '₹480 Cr', growth: '+42%' },
  ],
  'Travel & Hospitality': [
    { name: 'MakeMyTrip', type: 'leader', share: 32, revenue: '₹5,900 Cr', growth: '+19%' },
    { name: 'OYO Rooms', type: 'direct', share: 21, revenue: '₹5,400 Cr', growth: '+14%' },
    { name: 'Yatra', type: 'indirect', share: 12, revenue: '₹980 Cr', growth: '+10%' },
  ],
  'Retail & D2C': [
    { name: 'Lenskart', type: 'leader', share: 27, revenue: '₹3,700 Cr', growth: '+25%' },
    { name: 'Mamaearth', type: 'direct', share: 20, revenue: '₹1,600 Cr', growth: '+21%' },
    { name: 'BOAT Lifestyle', type: 'indirect', share: 17, revenue: '₹3,400 Cr', growth: '+18%' },
  ],
  'Cybersecurity & Cloud': [
    { name: 'Quick Heal Technologies', type: 'leader', share: 26, revenue: '₹380 Cr', growth: '+12%' },
    { name: 'Seqrite', type: 'direct', share: 21, revenue: '₹290 Cr', growth: '+15%' },
    { name: 'Webengager', type: 'indirect', share: 15, revenue: '₹210 Cr', growth: '+24%' },
  ],
  Other: [
    { name: 'Reliance Industries', type: 'leader', share: 22, revenue: '₹9,00,000 Cr', growth: '+8%' },
    { name: 'Adani Enterprises', type: 'direct', share: 16, revenue: '₹1,10,000 Cr', growth: '+11%' },
    { name: 'ITC Limited', type: 'indirect', share: 13, revenue: '₹70,000 Cr', growth: '+6%' },
  ],
}
