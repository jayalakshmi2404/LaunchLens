import { GoogleGenAI } from '@google/genai';

/**
 * Deterministic fallback Mitigation & Improvement Suggestion Engine
 * derived directly from actual project context signals.
 */
export function generateFallbackMitigations(projectData) {
  const { form = {}, market = {}, competitors = [] } = projectData || {};
  const { projectName = 'Project', industry = 'Technology', businessModel = 'SaaS', budget = '' } = form;

  const topCompetitor = Array.isArray(competitors) && competitors.length > 0
    ? [...competitors].sort((a, b) => (b.share || 0) - (a.share || 0))[0]
    : null;

  const mitigations = [];

  // 1. Market Growth / SOM Dynamics
  const somGrowth = market.somGrowth != null ? Number(market.somGrowth) : null;
  if (somGrowth !== null && somGrowth < 3) {
    mitigations.push({
      riskProblem: `Contracting or Slow SOM Growth (${somGrowth}% growth in ${industry})`,
      possibleCauses: `High market saturation, lengthened buyer procurement cycles, or shifting customer budgets in the ${industry} sector.`,
      severity: somGrowth < 0 ? 'high' : 'medium',
      mitigationStrategy: `Implement account-based marketing (ABM) targeted at high-intent beachhead segments rather than broad-market acquisition.`,
      improvementSuggestion: `Introduce flexible outcome-based pricing or pay-as-you-go tiers to lower customer conversion friction.`,
      priority: somGrowth < 0 ? 'critical' : 'high',
      recommendedAction: `Conduct 15 customer validation interviews with target ${industry} buyers within 30 days to test willingness to pay.`,
      expectedOutcome: `30% higher trial-to-paid conversion rate and reduced customer acquisition cost (CAC).`
    });
  } else {
    mitigations.push({
      riskProblem: `Accelerating Market Competition in Growing Sector (+${somGrowth ?? 0}% SOM growth)`,
      possibleCauses: `Expanding market size attracting aggressive new entrants and fast-follower venture funded startups in ${industry}.`,
      severity: 'medium',
      mitigationStrategy: `Lock in early adopter accounts with long-term retention contracts before competitor proliferation.`,
      improvementSuggestion: `Accelerate key feature development cycles to establish defensible market positioning.`,
      priority: 'high',
      recommendedAction: `Launch a targeted customer referral program to capture positive market growth momentum.`,
      expectedOutcome: `Secured early market share leadership with improved customer retention rates.`
    });
  }

  // 2. Competitive Concentration Risk
  if (topCompetitor && Number(topCompetitor.share || 0) >= 20) {
    const share = Number(topCompetitor.share);
    mitigations.push({
      riskProblem: `High Category Leader Market Share (${topCompetitor.name} holds ${share}% share)`,
      possibleCauses: `Strong incumbent brand loyalty, network effects, and aggressive enterprise sales coverage by ${topCompetitor.name}.`,
      severity: share >= 30 ? 'high' : 'medium',
      mitigationStrategy: `Focus on underserved micro-niche workflows and superior localized customer support that ${topCompetitor.name} neglects.`,
      improvementSuggestion: `Build seamless migration tools and 1-click data importers from ${topCompetitor.name}'s platform to switch customers easily.`,
      priority: 'critical',
      recommendedAction: `Publish a direct head-to-head comparison landing page highlighting ${projectName}'s unique value propositions.`,
      expectedOutcome: `Shortened sales cycle for prospects seeking alternatives to legacy market leaders.`
    });
  } else {
    mitigations.push({
      riskProblem: `Fragmented Competitive Landscape Inefficiency`,
      possibleCauses: `Multiple small-scale players creating customer confusion and price erosion across ${industry}.`,
      severity: 'low',
      mitigationStrategy: `Consolidate key software capabilities into a single unified platform interface.`,
      improvementSuggestion: `Provide transparent all-in-one pricing to displace fragmented single-feature tools.`,
      priority: 'moderate',
      recommendedAction: `Promote case studies demonstrating total cost of ownership (TCO) savings.`,
      expectedOutcome: `Higher win rates against fragmented standalone point solutions.`
    });
  }

  // 3. Financial & Budget Runway Risk
  mitigations.push({
    riskProblem: `Capital & Runway Constraint (${budget ? `Budget: ${budget}` : 'Unspecified Budget'} for ${businessModel} model)`,
    possibleCauses: `Underestimating customer acquisition cost (CAC) payback periods and early engineering iteration overhead.`,
    severity: 'medium',
    mitigationStrategy: `Maintain a lean operation focused strictly on Core Value Features; defer complex custom enterprise builds until revenue milestone is reached.`,
    improvementSuggestion: `Structure early customer deals as annual prepaid contracts to generate non-dilutive working capital.`,
    priority: 'high',
    recommendedAction: `Establish a strict 6-month runway buffer and monitor monthly burn rate against initial customer signups.`,
    expectedOutcome: `Extended operational runway by 4–6 months without immediate venture dilutive financing.`
  });

  // 4. Regulatory & Compliance / Technical Risk
  const highRegIndustries = ['Fintech', 'Healthcare', 'Education'];
  if (highRegIndustries.includes(industry)) {
    mitigations.push({
      riskProblem: `Sector Regulatory Overhead (${industry} Compliance)`,
      possibleCauses: `Evolving statutory guidelines (RBI/DPDP/Data Localization/HIPAA) requiring rigorous data security and audit trails.`,
      severity: 'high',
      mitigationStrategy: `Adopt standardized compliant cloud infrastructure (e.g. ISO/SOC2 compliant hosting) out of the box.`,
      improvementSuggestion: `Embed privacy-by-design principles and automated audit logging directly into the product core.`,
      priority: 'high',
      recommendedAction: `Perform a third-party compliance assessment prior to commercial enterprise deployment.`,
      expectedOutcome: `Zero compliance audit friction during enterprise security reviews.`
    });
  } else {
    mitigations.push({
      riskProblem: `Technical Architecture Scalability (${businessModel} Delivery)`,
      possibleCauses: `Potential performance bottlenecks or integration friction with legacy customer environments.`,
      severity: 'low',
      mitigationStrategy: `Build modular REST APIs and webhooks to simplify customer integration.`,
      improvementSuggestion: `Provide clear SDKs and developer documentation to accelerate third-party implementation.`,
      priority: 'moderate',
      recommendedAction: `Automate end-to-end integration testing for high-volume data workflows.`,
      expectedOutcome: `Reduced technical onboarding support requests by 50%.`
    });
  }

  return mitigations;
}

/**
 * Validates and normalizes mitigation response format.
 */
function validateAndNormalizeMitigations(parsedData) {
  let list = parsedData;
  if (!Array.isArray(list)) {
    if (list && Array.isArray(list.mitigations)) {
      list = list.mitigations;
    } else {
      throw new Error('AI response is not an array of mitigations');
    }
  }

  if (list.length === 0) {
    throw new Error('AI response yielded an empty mitigations array');
  }

  return list.map((item, idx) => {
    const priorityOptions = ['critical', 'high', 'moderate', 'low'];
    const severityOptions = ['high', 'medium', 'low'];

    const priority = priorityOptions.includes(String(item.priority || '').toLowerCase())
      ? String(item.priority).toLowerCase()
      : 'high';

    const severity = severityOptions.includes(String(item.severity || '').toLowerCase())
      ? String(item.severity).toLowerCase()
      : 'medium';

    return {
      riskProblem: String(item.riskProblem || item.problem || `Identified Risk ${idx + 1}`).trim(),
      possibleCauses: String(item.possibleCauses || item.causes || 'Data trends indicate potential friction points.').trim(),
      severity,
      mitigationStrategy: String(item.mitigationStrategy || item.mitigation || '').trim(),
      improvementSuggestion: String(item.improvementSuggestion || item.improvement || '').trim(),
      priority,
      recommendedAction: String(item.recommendedAction || item.action || '').trim(),
      expectedOutcome: String(item.expectedOutcome || item.outcome || '').trim()
    };
  });
}

/**
 * Resilient multi-model Gemini API caller with SDK & REST fallback.
 */
async function callGeminiApi(apiKey, prompt) {
  const models = ['gemini-3.6-flash', 'gemini-3.5-flash', 'gemini-2.5-flash', 'gemini-1.5-flash'];

  // Path A: Try GoogleGenAI SDK with candidate models
  for (const model of models) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.2
        }
      });
      if (response && response.text) {
        return response.text;
      }
    } catch (err) {
      // Continue to next model candidate
    }
  }

  // Path B: Try Direct REST API endpoint with candidate models
  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.2
          }
        })
      });
      if (res.ok) {
        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text;
      }
    } catch (err) {
      // Continue to next model candidate
    }
  }

  throw new Error('Could not connect to Gemini API models');
}

/**
 * Core Mitigation Engine function. Reuses Gemini/OpenAI APIs or falls back to rule-based synthesis.
 */
export async function generateMitigations(projectData) {
  const geminiKey = process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.trim() : '';
  const openaiKey = process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.trim() : '';

  if (!geminiKey && !openaiKey) {
    return {
      mitigations: generateFallbackMitigations(projectData),
      isAiGenerated: false,
      provider: 'rule_engine'
    };
  }

  const prompt = `You are an expert risk mitigation and business optimization strategist.
Analyze the following actual project and market data:

PROJECT DETAILS:
- Name: ${projectData?.form?.projectName || 'N/A'}
- Industry: ${projectData?.form?.industry || 'N/A'}
- Business Model: ${projectData?.form?.businessModel || 'N/A'}
- Target Market: ${projectData?.form?.targetMarket || 'N/A'}
- Budget: ${projectData?.form?.budget || 'N/A'}

MARKET & COMPETITOR SIGNALS:
- TAM: ₹${projectData?.market?.tam || 'N/A'} Cr | SAM: ₹${projectData?.market?.sam || 'N/A'} Cr | SOM: ₹${projectData?.market?.som || 'N/A'} Cr
- SOM Growth Rate: ${projectData?.market?.somGrowth ?? 'N/A'}%
- Top Competitor: ${projectData?.competitors?.[0]?.name || 'N/A'} (${projectData?.competitors?.[0]?.share || 'N/A'}% share)

TASK:
Identify 4 key strategic risk/problem areas for this project based on the actual metrics above.
For EACH risk area, provide complete, actionable mitigation and improvement strategies.

FORMAT:
Respond ONLY with a valid JSON array containing exactly 4 objects. No markdown outside JSON.
Keys required for each object:
- "riskProblem": (string, specific risk/problem identified)
- "possibleCauses": (string, root causes based on data)
- "severity": (string, "high" | "medium" | "low")
- "mitigationStrategy": (string, strategic mitigation plan)
- "improvementSuggestion": (string, actionable improvement for product or model)
- "priority": (string, "critical" | "high" | "moderate" | "low")
- "recommendedAction": (string, step-by-step recommended execution item)
- "expectedOutcome": (string, target expected outcome)
`;

  if (geminiKey) {
    try {
      console.log('[MitigationEngine] Calling Gemini API for mitigations...');
      const rawText = await callGeminiApi(geminiKey, prompt);
      const parsed = JSON.parse(rawText);
      const validated = validateAndNormalizeMitigations(parsed);

      return {
        mitigations: validated,
        isAiGenerated: true,
        provider: 'gemini'
      };
    } catch (err) {
      console.error('[MitigationEngine] Gemini call failed:', err.message);
      if (!openaiKey) {
        return {
          mitigations: generateFallbackMitigations(projectData),
          isAiGenerated: false,
          provider: 'rule_engine',
          warning: `Gemini call failed (${err.message}). Derived mitigations from project data engine.`
        };
      }
    }
  }

  if (openaiKey) {
    try {
      console.log('[MitigationEngine] Calling OpenAI API for mitigations...');
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: prompt }],
          response_format: { type: 'json_object' },
          temperature: 0.2
        })
      });

      if (!res.ok) throw new Error(`OpenAI HTTP error ${res.status}`);
      const data = await res.json();
      const rawText = data?.choices?.[0]?.message?.content;
      if (!rawText) throw new Error('Empty response from OpenAI');

      const parsed = JSON.parse(rawText);
      const validated = validateAndNormalizeMitigations(parsed);

      return {
        mitigations: validated,
        isAiGenerated: true,
        provider: 'openai'
      };
    } catch (err) {
      console.error('[MitigationEngine] OpenAI call failed:', err.message);
      return {
        mitigations: generateFallbackMitigations(projectData),
        isAiGenerated: false,
        provider: 'rule_engine',
        warning: `AI call failed (${err.message}). Derived mitigations from project data engine.`
      };
    }
  }

  return {
    mitigations: generateFallbackMitigations(projectData),
    isAiGenerated: false,
    provider: 'rule_engine'
  };
}
