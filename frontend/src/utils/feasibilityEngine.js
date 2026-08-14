// Feasibility Analysis answers a different question than Risk Assessment:
// not "what could go wrong" but "how viable is this, on balance, across four
// dimensions" - Technical, Financial, Market, and Competitive. Each
// dimension produces a 0-100 feasibility score (higher = more feasible) and
// a plain-English reason, using the same inputs already used by
// riskEngine.js and swotEngine.js. This is deliberately rule-based, not a
// model - every number here is traceable and reproducible by hand.

import { parseBudgetToCr } from './riskEngine.js'

const LOW_COMPLEXITY_MODELS = ['SaaS', 'Subscription', 'Services']
const HIGH_COMPLEXITY_MODELS = ['Hardware']

function technicalFeasibility(businessModel) {
  if (LOW_COMPLEXITY_MODELS.includes(businessModel)) {
    return {
      score: 85,
      reason: `${businessModel} is a mature, well-understood delivery model with established tooling and hosting patterns in India.`,
    }
  }
  if (businessModel === 'Marketplace') {
    return {
      score: 60,
      reason: 'Marketplace models are provably buildable, but require solving two-sided supply/demand and trust/payment infrastructure.',
    }
  }
  if (HIGH_COMPLEXITY_MODELS.includes(businessModel)) {
    return {
      score: 35,
      reason: 'Hardware adds manufacturing, logistics, and inventory execution risk on top of software - the most technically demanding option available.',
    }
  }
  return {
    score: 55,
    reason: 'This business model does not map to a standard feasibility profile, so a moderate default score is shown.',
  }
}

function financialFeasibility(budgetStr) {
  const budgetCr = parseBudgetToCr(budgetStr)
  if (budgetCr == null) {
    return { score: 50, reason: 'No budget was specified, so financial feasibility cannot be precisely assessed - a neutral default is shown.' }
  }
  const budgetLakh = budgetCr * 100
  if (budgetLakh < 20) {
    return {
      score: 40,
      reason: `A budget of ${budgetStr} may be insufficient to reach meaningful traction before funds run out.`,
    }
  }
  if (budgetLakh < 100) {
    return {
      score: 65,
      reason: `A budget of ${budgetStr} is workable for early-stage validation, though it leaves limited room for missteps.`,
    }
  }
  return {
    score: 85,
    reason: `A budget of ${budgetStr} is comfortable for sustained execution through early-stage validation.`,
  }
}

function marketFeasibility(market, industry) {
  const g = market?.somGrowth
  if (g == null) {
    return { score: 50, reason: 'No market growth data was available for this industry, so a neutral default is shown.' }
  }
  if (g < 0) {
    return {
      score: 30,
      reason: `${industry || 'This industry'}'s obtainable market (SOM) is shrinking (${g}%) - a genuine headwind to feasibility.`,
    }
  }
  if (g < 3) {
    return {
      score: 60,
      reason: `SOM growth is positive but modest (+${g}%) - feasible, but expect gradual rather than fast traction.`,
    }
  }
  return {
    score: 85,
    reason: `SOM growth is healthy (+${g}%) - the obtainable market is genuinely expanding, supporting feasibility.`,
  }
}

function competitiveFeasibility(competitors) {
  if (!competitors || competitors.length === 0) {
    return { score: 50, reason: 'No competitor data was available for this industry, so a neutral default is shown.' }
  }
  const top = [...competitors].sort((a, b) => b.share - a.share)[0]
  if (top.share >= 25) {
    return {
      score: 30,
      reason: `${top.name} holds a dominant ${top.share}% share - entering against an entrenched leader lowers feasibility without clear differentiation.`,
    }
  }
  if (top.share >= 15) {
    return {
      score: 55,
      reason: `${top.name} leads with a meaningful but not overwhelming ${top.share}% share - feasible, but expect real competitive resistance.`,
    }
  }
  return {
    score: 80,
    reason: `The largest player, ${top.name}, holds only ${top.share}% share - a fragmented market is generally easier to enter.`,
  }
}

function verdictFor(score) {
  if (score >= 70) return { label: 'Highly Feasible', tone: 'high' }
  if (score >= 45) return { label: 'Feasible with Caution', tone: 'medium' }
  return { label: 'Low Feasibility - Reconsider Approach', tone: 'low' }
}

// Builds the full four-dimension feasibility breakdown plus an overall
// score and verdict, from the submitted project's form data and the
// market/competitor data already fetched for that industry.
export function computeFeasibility({ form, market, competitors }) {
  const dimensions = [
    { key: 'technical', label: 'Technical Feasibility', ...technicalFeasibility(form?.businessModel) },
    { key: 'financial', label: 'Financial Feasibility', ...financialFeasibility(form?.budget) },
    { key: 'market', label: 'Market Feasibility', ...marketFeasibility(market, form?.industry) },
    { key: 'competitive', label: 'Competitive Feasibility', ...competitiveFeasibility(competitors) },
  ]

  const overallScore = Math.round(dimensions.reduce((sum, d) => sum + d.score, 0) / dimensions.length)
  const verdict = verdictFor(overallScore)

  return { dimensions, overallScore, verdict }
}