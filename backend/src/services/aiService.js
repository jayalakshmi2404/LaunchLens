import { GoogleGenAI } from '@google/genai';

/**
 * Generates deterministic rule-based recommendations from actual project data
 * when AI keys are missing, invalid, or API calls fail.
 */
export function generateFallbackRecommendations(projectData) {
  const { form = {}, market = {}, competitors = [] } = projectData || {};
  const { projectName = 'Project', industry = 'Technology', businessModel = 'SaaS', budget = '' } = form;
  const topCompetitor = Array.isArray(competitors) && competitors.length > 0
    ? [...competitors].sort((a, b) => (b.share || 0) - (a.share || 0))[0]
    : null;

  const recs = [];

  // 1. Market Growth & SOM Signal
  if (market.somGrowth != null) {
    if (Number(market.somGrowth) < 0) {
      recs.push({
        title: `Re-evaluate SOM acquisition model in ${industry}`,
        priority: 'critical',
        body: `${industry} sector SOM is contracting by ${market.somGrowth}% despite market scale (TAM ₹${market.tam || 0} Cr). Validate customer acquisition funnels before committing high capital.`,
        impact: 'High',
        effort: 'High',
        category: 'Market Position',
        rationale: `SOM contraction indicates market saturation or shifting customer priorities.`
      });
    } else {
      recs.push({
        title: `Capitalize on ${industry} growth momentum`,
        priority: 'high',
        body: `${industry} SOM is expanding at +${market.somGrowth}%. Focus early sales efforts on high-conversion customer segments to secure initial market share.`,
        impact: 'High',
        effort: 'Medium',
        category: 'Market Position',
        rationale: `Favorable market growth rewards early customer acquisition.`
      });
    }
  }

  // 2. Competitor Defense / Attack
  if (topCompetitor) {
    const share = Number(topCompetitor.share || 0);
    if (share >= 25) {
      recs.push({
        title: `Differentiate against category leader ${topCompetitor.name}`,
        priority: 'critical',
        body: `${topCompetitor.name} holds ${share}% market share in ${industry}. Avoid head-to-head feature competition; position ${projectName} around specialized niche workflows or superior customer support.`,
        impact: 'High',
        effort: 'Medium',
        category: 'Competitive Strategy',
        rationale: `Strong market leaders require asymmetric positioning strategy.`
      });
    } else {
      recs.push({
        title: `Target fragmented market segments`,
        priority: 'high',
        body: `The largest player (${topCompetitor.name}) holds ${share}% share, signaling a fragmented market. Rapid product iteration can capture share from legacy vendors.`,
        impact: 'Medium',
        effort: 'Medium',
        category: 'Competitive Strategy',
        rationale: `Fragmented dynamics present low entry barriers for agile solutions.`
      });
    }
  }

  // 3. Business Model & Budget Optimization
  recs.push({
    title: `Optimize ${businessModel} unit economics`,
    priority: 'high',
    body: `For a ${businessModel} model in ${industry}${budget ? ` with budget ${budget}` : ''}, prioritize getting to positive cash flow per account before scaling customer acquisition spend.`,
    impact: 'High',
    effort: 'Low',
    category: 'Resource Allocation',
    rationale: `Disciplined unit economics ensure runway sustainability.`
  });

  // 4. Execution Roadmap
  recs.push({
    title: `Streamline customer onboarding for ${industry} buyers`,
    priority: 'moderate',
    body: `Target market buyers in ${industry} prioritize quick value realization. Minimize integration friction to accelerate trial-to-paid conversion.`,
    impact: 'Medium',
    effort: 'Low',
    category: 'Execution',
    rationale: `Low friction onboarding directly boosts conversion rate.`
  });

  return recs;
}

/**
 * Validates and normalizes AI-generated recommendation JSON structures.
 */
function validateAndNormalizeRecommendations(parsedData) {
  let list = parsedData;
  if (!Array.isArray(list)) {
    if (list && Array.isArray(list.recommendations)) {
      list = list.recommendations;
    } else {
      throw new Error('AI response is not an array of recommendations');
    }
  }

  if (list.length === 0) {
    throw new Error('AI response yielded an empty recommendation array');
  }

  return list.map((item, idx) => {
    const priorityOptions = ['critical', 'high', 'moderate', 'low'];
    const impactEffortOptions = ['High', 'Medium', 'Low'];

    const priority = priorityOptions.includes(String(item.priority).toLowerCase())
      ? String(item.priority).toLowerCase()
      : 'high';

    const impact = impactEffortOptions.find(o => o.toLowerCase() === String(item.impact || '').toLowerCase()) || 'High';
    const effort = impactEffortOptions.find(o => o.toLowerCase() === String(item.effort || '').toLowerCase()) || 'Medium';

    return {
      title: String(item.title || `Recommendation ${idx + 1}`).trim(),
      priority,
      body: String(item.body || item.description || item.recommendation || '').trim(),
      impact,
      effort,
      category: String(item.category || 'Strategic Action').trim(),
      rationale: String(item.rationale || item.reason || '').trim()
    };
  });
}

/**
 * Core AI Service function: generates recommendations using Gemini API (or OpenAI fallback).
 */
export async function generateAiRecommendations(projectData) {
  const geminiKey = process.env.GEMINI_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  if (!geminiKey && !openaiKey) {
    console.warn('[AIService] Neither GEMINI_API_KEY nor OPENAI_API_KEY is set. Using rule-based fallback.');
    return {
      recommendations: generateFallbackRecommendations(projectData),
      isAiGenerated: false,
      provider: 'rule_engine',
      warning: 'AI API keys not configured on server (GEMINI_API_KEY / OPENAI_API_KEY missing). Generated recommendations using deterministic project data analysis.'
    };
  }

  const prompt = `You are a strategic startup and market intelligence advisor.
Analyze the following actual project data:

PROJECT DETAILS:
- Name: ${projectData?.form?.projectName || 'N/A'}
- Industry: ${projectData?.form?.industry || 'N/A'}
- Business Model: ${projectData?.form?.businessModel || 'N/A'}
- Target Market: ${projectData?.form?.targetMarket || 'N/A'}
- Budget: ${projectData?.form?.budget || 'N/A'}
- Description: ${projectData?.form?.description || 'N/A'}

MARKET METRICS:
- TAM: ₹${projectData?.market?.tam || 'N/A'} Cr (Growth: ${projectData?.market?.tamGrowth ?? 'N/A'}%)
- SAM: ₹${projectData?.market?.sam || 'N/A'} Cr (Growth: ${projectData?.market?.samGrowth ?? 'N/A'}%)
- SOM: ₹${projectData?.market?.som || 'N/A'} Cr (Growth: ${projectData?.market?.somGrowth ?? 'N/A'}%)
- Data Source: ${projectData?.market?.source || 'N/A'}

COMPETITOR LANDSCAPE:
${(projectData?.competitors || []).map(c => `- ${c.name} (${c.type}): Market Share ${c.share}%, Revenue ${c.revenue}, Growth ${c.growth}`).join('\n') || 'No direct competitor records'}

TASK:
Generate 4 highly actionable, specific, data-grounded strategic recommendations for this project based on the data above.
DO NOT return generic statements. Connect your advice directly to their budget, industry growth, business model, and competitor position.

FORMAT:
Respond ONLY with a valid JSON array containing exactly 4 objects. No markdown formatting outside JSON.
Each object must have these exact keys:
- "title": (string, short punchy title)
- "priority": (string, one of: "critical", "high", "moderate", "low")
- "body": (string, 2-3 sentences explaining the strategy)
- "impact": (string, one of: "High", "Medium", "Low")
- "effort": (string, one of: "High", "Medium", "Low")
- "category": (string, e.g. "Market Position", "Competitive Strategy", "Resource Allocation", "Execution")
- "rationale": (string, 1 sentence explaining why this recommendation fits the project data)
`;

  // Attempt Gemini API first if key exists
  if (geminiKey) {
    try {
      console.log('[AIService] Calling Gemini API for strategic recommendations...');
      const ai = new GoogleGenAI({ apiKey: geminiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.2
        }
      });

      const rawText = response.text;
      if (!rawText) throw new Error('Empty response received from Gemini API');

      const parsed = JSON.parse(rawText);
      const validated = validateAndNormalizeRecommendations(parsed);

      return {
        recommendations: validated,
        isAiGenerated: true,
        provider: 'gemini'
      };
    } catch (err) {
      console.error('[AIService] Gemini API call failed:', err.message);
      if (!openaiKey) {
        return {
          recommendations: generateFallbackRecommendations(projectData),
          isAiGenerated: false,
          provider: 'rule_engine',
          warning: `Gemini API call failed (${err.message}). Showing deterministic recommendations computed from project data.`
        };
      }
    }
  }

  // OpenAI fallback if configured
  if (openaiKey) {
    try {
      console.log('[AIService] Calling OpenAI API for strategic recommendations...');
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
      const validated = validateAndNormalizeRecommendations(parsed);

      return {
        recommendations: validated,
        isAiGenerated: true,
        provider: 'openai'
      };
    } catch (err) {
      console.error('[AIService] OpenAI API call failed:', err.message);
      return {
        recommendations: generateFallbackRecommendations(projectData),
        isAiGenerated: false,
        provider: 'rule_engine',
        warning: `AI API calls failed (${err.message}). Showing deterministic recommendations computed from project data.`
      };
    }
  }

  return {
    recommendations: generateFallbackRecommendations(projectData),
    isAiGenerated: false,
    provider: 'rule_engine'
  };
}
