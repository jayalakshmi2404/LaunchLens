// All risk scores here are computed from real signals already present in
// the app - the submitted project's industry/business model/budget, and the
// market/competitor data already fetched for that industry. Nothing here is
// a machine-learning model; every score traces back to a rule you can read
// below, matching the same "explainable, not a black box" approach used in
// utils/forecast.js.

const SEV_PCT = { high: 72, medium: 45, low: 20 }

// Budget strings look like "₹80 Lakh", "₹1.2 Cr", "80L", "1,00,000", etc.
// Returns the value in ₹ Crore, or null if it can't be parsed.
export function parseBudgetToCr(budgetStr) {
  if (!budgetStr) return null
  const s = String(budgetStr).toLowerCase().replace(/,/g, '').trim()
  const num = parseFloat(s.match(/[\d.]+/)?.[0])
  if (isNaN(num)) return null

  if (s.includes('cr')) return num
  if (s.includes('lakh') || s.includes('lac') || /\bl\b/.test(s) || s.endsWith('l')) return num / 100
  if (s.includes('k')) return num / 100000 // thousands -> crore
  // Plain number with no unit: assume raw rupees
  return num / 1e7
}

function marketRisk(market) {
  const g = market?.somGrowth
  if (g == null) {
    return { sev: 'medium', pct: SEV_PCT.medium, reason: 'SOM growth data was unavailable for this industry, so a moderate default is shown.' }
  }
  if (g < 0) {
    return {
      sev: 'high', pct: SEV_PCT.high,
      reason: `Your selected industry's SOM growth is currently ${g}% - a shrinking obtainable market even while the total market (TAM) may still be expanding.`,
    }
  }
  if (g < 3) {
    return {
      sev: 'medium', pct: SEV_PCT.medium,
      reason: `SOM growth for your selected industry is +${g}%, positive but modest - customer acquisition is likely to be gradual, not fast.`,
    }
  }
  return {
    sev: 'low', pct: SEV_PCT.low,
    reason: `SOM growth for your selected industry is a healthy +${g}%, indicating an expanding obtainable market.`,
  }
}

function competitiveRisk(competitors) {
  if (!competitors || competitors.length === 0) {
    return { sev: 'medium', pct: SEV_PCT.medium, reason: 'No competitor data was available for this industry, so a moderate default is shown.' }
  }
  const top = [...competitors].sort((a, b) => b.share - a.share)[0]
  const share = top.share
  if (share >= 25) {
    return {
      sev: 'high', pct: SEV_PCT.high,
      reason: `${top.name} leads this industry with ${share}% market share - a direct feature-for-feature entry will face steep headwinds without clear differentiation.`,
    }
  }
  if (share >= 15) {
    return {
      sev: 'medium', pct: SEV_PCT.medium,
      reason: `${top.name} leads with ${share}% share - a meaningful but not overwhelming position, leaving room for a differentiated entrant.`,
    }
  }
  return {
    sev: 'low', pct: SEV_PCT.low,
    reason: `The largest player, ${top.name}, holds only ${share}% share - this industry looks relatively fragmented.`,
  }
}

function financialRisk(budgetStr, market) {
  const budgetCr = parseBudgetToCr(budgetStr)
  if (budgetCr == null) {
    return { sev: 'medium', pct: SEV_PCT.medium, reason: 'No budget was entered, so a moderate default is shown. Enter a budget on Project Input for a personalized score.' }
  }
  const budgetLakh = budgetCr * 100
  if (budgetLakh < 20) {
    return {
      sev: 'high', pct: SEV_PCT.high,
      reason: `Your stated budget (₹${budgetLakh.toFixed(0)} Lakh) is thin for early validation costs - runway risk is elevated if customer acquisition takes longer than expected.`,
    }
  }
  if (budgetLakh < 100) {
    return {
      sev: 'medium', pct: SEV_PCT.medium,
      reason: `Your stated budget (₹${budgetLakh.toFixed(0)} Lakh) is in a moderate range for early-stage validation - workable, but leaves limited room for missteps.`,
    }
  }
  return {
    sev: 'low', pct: SEV_PCT.low,
    reason: `Your stated budget (₹${(budgetCr).toFixed(2)} Cr) is comfortable for early-stage validation in this sector.`,
  }
}

const BUSINESS_MODEL_RISK = {
  SaaS: { sev: 'low', pct: SEV_PCT.low },
  Services: { sev: 'low', pct: SEV_PCT.low },
  Subscription: { sev: 'low', pct: SEV_PCT.low },
  Marketplace: { sev: 'medium', pct: SEV_PCT.medium },
  Hardware: { sev: 'high', pct: SEV_PCT.high },
  Other: { sev: 'medium', pct: SEV_PCT.medium },
}

function technicalRisk(businessModel) {
  const r = BUSINESS_MODEL_RISK[businessModel] || BUSINESS_MODEL_RISK.Other
  const reasons = {
    SaaS: 'SaaS is a well-understood delivery model in the Indian market with mature tooling and hosting options.',
    Services: 'Services-based delivery has low technical complexity, though it can be harder to scale than product-led models.',
    Subscription: 'Subscription billing and delivery infrastructure is mature and well-documented.',
    Marketplace: 'Marketplace models require solving two-sided supply/demand and trust/payment infrastructure - meaningfully more complex than a single-sided product.',
    Hardware: 'Hardware involves manufacturing, logistics, and inventory risk on top of software - the highest technical complexity of the available options.',
    Other: 'This business model does not map to a standard risk profile, so a moderate default is shown.',
  }
  return { ...r, reason: reasons[businessModel] || reasons.Other }
}

const INDUSTRY_REGULATORY_RISK = {
  Fintech: { sev: 'high', pct: SEV_PCT.high },
  Healthcare: { sev: 'high', pct: SEV_PCT.high },
  Education: { sev: 'medium', pct: SEV_PCT.medium },
  Manufacturing: { sev: 'medium', pct: SEV_PCT.medium },
  'E-commerce': { sev: 'medium', pct: SEV_PCT.medium },
  Technology: { sev: 'low', pct: SEV_PCT.low },
  Other: { sev: 'medium', pct: SEV_PCT.medium },
}

function regulatoryRisk(industry) {
  const r = INDUSTRY_REGULATORY_RISK[industry] || INDUSTRY_REGULATORY_RISK.Other
  const reasons = {
    Fintech: 'Fintech in India carries significant RBI/regulatory compliance overhead (KYC, payment licensing, data localization).',
    Healthcare: 'Healthcare involves regulatory oversight around data privacy, clinical claims, and in some cases licensing.',
    Education: 'EdTech has moderate compliance considerations, particularly around data handling for minors.',
    Manufacturing: 'Manufacturing involves standard industrial compliance (safety, environmental) but no sector-specific blockers identified.',
    'E-commerce': 'E-commerce has moderate compliance overhead (consumer protection, GST, FDI rules for marketplaces).',
    Technology: 'No material sector-specific compliance blockers identified for a general technology/SaaS business model.',
    Other: 'No specific regulatory profile is defined for this industry, so a moderate default is shown.',
  }
  return { ...r, reason: reasons[industry] || reasons.Other }
}

// Builds the full five-category risk list plus summary stats, from the
// submitted project's form data and the market/competitor data already
// fetched for that industry.
export function computeRisks({ form, market, competitors }) {
  const items = [
    { cat: 'Market Risk', ...marketRisk(market) },
    { cat: 'Competitive Risk', ...competitiveRisk(competitors) },
    { cat: 'Financial Risk', ...financialRisk(form?.budget, market) },
    { cat: 'Technical Risk', ...technicalRisk(form?.businessModel) },
    { cat: 'Regulatory Risk', ...regulatoryRisk(form?.industry) },
  ]

  const avgPct = items.reduce((sum, r) => sum + r.pct, 0) / items.length
  const criticalFlags = items.filter((r) => r.sev === 'high').length
  const marketFit = Math.max(0, Math.min(100, Math.round(100 - avgPct)))
  const overallLabel = avgPct >= 60 ? 'High' : avgPct >= 40 ? 'Moderate' : 'Low'

  return { items, overallLabel, criticalFlags, marketFit }
}
