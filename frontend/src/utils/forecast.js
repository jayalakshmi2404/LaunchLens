// All projections here are simple, transparent extrapolations of each
// competitor's stored ANNUAL growth rate, prorated to the chosen horizon.
// This is NOT pulled from any external "prediction" feed - there isn't one
// for private-company market share. It's an honest, explainable calculation:
//
//   projected = current * (1 + (annualGrowthPct / 100) * (months / 12))
//
// Recomputed fresh every time it renders, so it always reflects whatever
// data is currently loaded.

export function projectValue(current, annualGrowthPct, months) {
  if (current == null || annualGrowthPct == null) return null
  return current * (1 + (annualGrowthPct / 100) * (months / 12))
}

// Builds a month-by-month trend series (0..months inclusive) for a
// competitor's market share, for charting.
export function buildShareTrend(currentShare, annualGrowthPct, months) {
  const points = []
  for (let m = 0; m <= months; m++) {
    points.push(+projectValue(currentShare, annualGrowthPct, m).toFixed(2))
  }
  return points
}

export function parseGrowthPct(growthStr) {
  if (typeof growthStr === 'number') return growthStr
  return parseFloat(String(growthStr).replace('%', '').replace('+', ''))
}

export function parseRevenueCr(revenueStr) {
  if (typeof revenueStr === 'number') return revenueStr
  const match = String(revenueStr).replace(/,/g, '').match(/[\d.]+/)
  return match ? parseFloat(match[0]) : null
}
