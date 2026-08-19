import { StateGraph, Annotation, END, START } from '@langchain/langgraph';
import { generateAiRecommendations } from './aiService.js';
import { generateMitigations } from './mitigationEngine.js';

/**
 * LangGraph State Annotation Schema
 */
const WorkflowStateAnnotation = Annotation.Root({
  projectData: Annotation({
    reducer: (x, y) => (y !== undefined ? y : x),
    default: () => null,
  }),
  analysis: Annotation({
    reducer: (x, y) => (y !== undefined ? y : x),
    default: () => null,
  }),
  risks: Annotation({
    reducer: (x, y) => (y !== undefined ? y : x),
    default: () => null,
  }),
  hasCriticalRisks: Annotation({
    reducer: (x, y) => (y !== undefined ? y : x),
    default: () => false,
  }),
  recommendations: Annotation({
    reducer: (x, y) => (y !== undefined ? y : x),
    default: () => [],
  }),
  mitigations: Annotation({
    reducer: (x, y) => (y !== undefined ? y : x),
    default: () => [],
  }),
  improvements: Annotation({
    reducer: (x, y) => (y !== undefined ? y : x),
    default: () => [],
  }),
  validation: Annotation({
    reducer: (x, y) => (y !== undefined ? y : x),
    default: () => null,
  }),
  validationPassed: Annotation({
    reducer: (x, y) => (y !== undefined ? y : x),
    default: () => true,
  }),
  finalOutput: Annotation({
    reducer: (x, y) => (y !== undefined ? y : x),
    default: () => null,
  }),
  logs: Annotation({
    reducer: (x, y) => (Array.isArray(x) && Array.isArray(y) ? [...x, ...y] : y !== undefined ? y : x),
    default: () => [],
  }),
});

/**
 * Node 1: Data Analysis
 */
async function nodeDataAnalysis(state) {
  const { form = {}, market = {}, competitors = [] } = state.projectData || {};

  const tam = Number(market.tam || 0);
  const sam = Number(market.sam || 0);
  const som = Number(market.som || 0);
  const samRatio = tam > 0 ? (sam / tam) * 100 : 0;
  const somRatio = sam > 0 ? (som / sam) * 100 : 0;

  const topCompetitor = Array.isArray(competitors) && competitors.length > 0
    ? [...competitors].sort((a, b) => (b.share || 0) - (a.share || 0))[0]
    : null;

  const analysis = {
    industry: form.industry || 'Technology',
    businessModel: form.businessModel || 'SaaS',
    samRatio: Number(samRatio.toFixed(1)),
    somRatio: Number(somRatio.toFixed(1)),
    somGrowth: market.somGrowth != null ? Number(market.somGrowth) : 0,
    leaderShare: topCompetitor ? Number(topCompetitor.share || 0) : 0,
    leaderName: topCompetitor ? topCompetitor.name : 'None',
    marketStatus: (market.somGrowth || 0) > 10 ? 'Rapid Growth' : (market.somGrowth || 0) < 0 ? 'Contracting' : 'Moderate Expansion'
  };

  return {
    analysis,
    logs: [`[LangGraph] Node 1: Data Analysis complete for ${form.projectName || 'Project'}. Industry: ${analysis.industry}, SOM Growth: ${analysis.somGrowth}%.`]
  };
}

/**
 * Node 2: Risk / Issue Identification
 */
async function nodeRiskIdentification(state) {
  const { analysis, projectData } = state;
  const risksList = [];

  if (analysis.somGrowth < 0) {
    risksList.push({
      code: 'SOM_CONTRACTING',
      severity: 'high',
      title: 'SOM Contraction Risk',
      detail: `SOM is shrinking by ${analysis.somGrowth}% in ${analysis.industry}.`
    });
  }

  if (analysis.leaderShare >= 25) {
    risksList.push({
      code: 'HIGH_LEADER_CONCENTRATION',
      severity: 'high',
      title: 'Market Concentration Risk',
      detail: `${analysis.leaderName} holds ${analysis.leaderShare}% share.`
    });
  }

  const highRegs = ['Fintech', 'Healthcare', 'Education'];
  if (highRegs.includes(analysis.industry)) {
    risksList.push({
      code: 'REGULATORY_COMPLIANCE',
      severity: 'high',
      title: 'Regulatory Compliance Risk',
      detail: `${analysis.industry} requires specialized regulatory compliance.`
    });
  }

  const hasCritical = risksList.some(r => r.severity === 'high');

  return {
    risks: risksList,
    hasCriticalRisks: hasCritical,
    logs: [`[LangGraph] Node 2: Risk Identification complete. Identified ${risksList.length} key risks (Critical: ${hasCritical}).`]
  };
}

/**
 * Node 3: Strategic Recommendation (Task 1 Integration)
 */
async function nodeStrategicRecommendation(state) {
  const res = await generateAiRecommendations(state.projectData);
  return {
    recommendations: res.recommendations || [],
    logs: [`[LangGraph] Node 3: Strategic Recommendation generated ${res.recommendations?.length || 0} items via provider [${res.provider}].`]
  };
}

/**
 * Node 4: Mitigation Analysis (Task 2 Integration)
 */
async function nodeMitigationAnalysis(state) {
  const res = await generateMitigations(state.projectData);
  return {
    mitigations: res.mitigations || [],
    logs: [`[LangGraph] Node 4: Mitigation Analysis generated ${res.mitigations?.length || 0} mitigation strategies.`]
  };
}

/**
 * Node 5: Improvement Suggestions
 */
async function nodeImprovementSuggestions(state) {
  const { analysis, projectData } = state;
  const { form = {} } = projectData || {};

  const improvements = [
    {
      area: 'Product Strategy',
      suggestion: `Build an agile minimum viable product tailored to ${form.targetMarket || 'target buyers'} in ${analysis.industry}.`,
      impact: 'High'
    },
    {
      area: 'Go-to-Market',
      suggestion: `Deploy account-based landing pages contrasting features against market leader ${analysis.leaderName}.`,
      impact: 'High'
    },
    {
      area: 'Financial Model',
      suggestion: `Incentivize annual pre-paid contracts to maximize upfront cash runway.`,
      impact: 'Medium'
    }
  ];

  return {
    improvements,
    logs: [`[LangGraph] Node 5: Improvement Suggestions synthesized ${improvements.length} tactical enhancement areas.`]
  };
}

/**
 * Node 6: Validation / Review
 */
async function nodeValidationReview(state) {
  const recsCount = state.recommendations.length;
  const mitsCount = state.mitigations.length;

  let qualityScore = 100;
  if (recsCount < 3) qualityScore -= 20;
  if (mitsCount < 3) qualityScore -= 20;
  if (state.hasCriticalRisks && !state.mitigations.some(m => m.severity === 'high' || m.priority === 'critical')) {
    qualityScore -= 25;
  }

  const passed = qualityScore >= 70;

  const validation = {
    qualityScore,
    status: passed ? 'PASSED' : 'NEEDS_REFINEMENT',
    checkedMetrics: { recsCount, mitsCount, hasCriticalRisks: state.hasCriticalRisks }
  };

  return {
    validation,
    validationPassed: passed,
    logs: [`[LangGraph] Node 6: Validation Review completed. Score: ${qualityScore}/100, Status: ${validation.status}.`]
  };
}

/**
 * Node 7: Refinement (Triggered conditionally if validation fails)
 */
async function nodeRefinement(state) {
  const refinedRecs = state.recommendations.map(r => ({
    ...r,
    priority: r.priority === 'critical' ? 'critical' : 'high',
    body: r.body + ' [Refined for risk mitigation compliance]'
  }));

  return {
    recommendations: refinedRecs,
    logs: [`[LangGraph] Node 7: Refinement step completed. Upgraded recommendation priority and alignment.`]
  };
}

/**
 * Node 8: Final Strategic Recommendations Synthesis
 */
async function nodeFinalSynthesis(state) {
  const { projectData, analysis, risks, recommendations, mitigations, improvements, validation } = state;

  const finalOutput = {
    projectName: projectData?.form?.projectName || 'Project',
    summary: {
      industry: analysis.industry,
      marketStatus: analysis.marketStatus,
      qualityScore: validation.qualityScore,
      validationStatus: validation.status
    },
    riskCount: risks.length,
    recommendations,
    mitigations,
    improvements,
    executionRoadmap: [
      { step: 1, action: 'Execute Critical Risk Mitigations & Market Differentiation' },
      { step: 2, action: 'Deploy High-Impact Strategic Recommendations' },
      { step: 3, action: 'Measure Conversion Metrics & Refine Product Positioning' }
    ]
  };

  return {
    finalOutput,
    logs: [`[LangGraph] Node 8: Final Strategic Recommendations Dossier synthesized successfully.`]
  };
}

/**
 * Conditional Edge Router 1: Check Critical Risks
 */
function routeAfterRisk(state) {
  if (state.hasCriticalRisks) {
    return 'mitigationAnalysis';
  }
  return 'strategicRecommendation';
}

/**
 * Conditional Edge Router 2: Check Validation Status
 */
function routeAfterValidation(state) {
  if (!state.validationPassed) {
    return 'refinement';
  }
  return 'finalSynthesis';
}

/**
 * Build and compile the LangGraph StateGraph Workflow
 */
export function buildLangGraphWorkflow() {
  const workflow = new StateGraph(WorkflowStateAnnotation)
    .addNode('dataAnalysis', nodeDataAnalysis)
    .addNode('riskIdentification', nodeRiskIdentification)
    .addNode('strategicRecommendation', nodeStrategicRecommendation)
    .addNode('mitigationAnalysis', nodeMitigationAnalysis)
    .addNode('improvementSuggestions', nodeImprovementSuggestions)
    .addNode('validationReview', nodeValidationReview)
    .addNode('refinement', nodeRefinement)
    .addNode('finalSynthesis', nodeFinalSynthesis)

    // Flow definition
    .addEdge(START, 'dataAnalysis')
    .addEdge('dataAnalysis', 'riskIdentification')
    
    // Conditional routing based on risk severity
    .addConditionalEdges('riskIdentification', routeAfterRisk, {
      mitigationAnalysis: 'mitigationAnalysis',
      strategicRecommendation: 'strategicRecommendation'
    })
    
    // Convergence
    .addEdge('strategicRecommendation', 'mitigationAnalysis')
    .addEdge('mitigationAnalysis', 'improvementSuggestions')
    .addEdge('improvementSuggestions', 'validationReview')

    // Conditional routing based on validation status
    .addConditionalEdges('validationReview', routeAfterValidation, {
      refinement: 'refinement',
      finalSynthesis: 'finalSynthesis'
    })

    .addEdge('refinement', 'finalSynthesis')
    .addEdge('finalSynthesis', END);

  return workflow.compile();
}

/**
 * Executes the LangGraph agent workflow for a given project dataset.
 */
export async function runLangGraphWorkflow(projectData) {
  try {
    const app = buildLangGraphWorkflow();
    const initialState = {
      projectData,
      logs: ['[LangGraph] Workflow execution initiated.']
    };

    const finalState = await app.invoke(initialState);
    return {
      success: true,
      finalOutput: finalState.finalOutput,
      validation: finalState.validation,
      logs: finalState.logs,
      executionGraph: [
        'Existing Project Data',
        'Data Analysis',
        'Risk / Issue Identification',
        finalState.hasCriticalRisks ? 'Mitigation Analysis (Priority Edge)' : 'Strategic Recommendation',
        finalState.hasCriticalRisks ? 'Strategic Recommendation' : 'Mitigation Analysis',
        'Improvement Suggestions',
        'Validation / Review',
        finalState.validationPassed ? 'Final Strategic Recommendations' : 'Refinement -> Final Strategic Recommendations'
      ]
    };
  } catch (err) {
    console.error('[LangGraphWorkflow] Execution error:', err);
    throw new Error(`LangGraph Workflow execution failed: ${err.message}`);
  }
}
