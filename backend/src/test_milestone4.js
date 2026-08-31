import { generateComprehensiveReport } from './services/reportGenerator.js';
import { generateAiRecommendations } from './services/aiService.js';
import { generateMitigations } from './services/mitigationEngine.js';
import { runLangGraphWorkflow } from './services/langgraphWorkflow.js';

const testProjectData = {
  form: {
    projectName: 'Milestone4 Analytics Engine Pro',
    industry: 'Fintech',
    businessModel: 'SaaS',
    targetMarket: 'B2B Enterprise Merchants',
    budget: '₹85 Lakh',
    description: 'AI-driven automated compliance & risk analytics platform for high-volume transactions.'
  },
  market: {
    tam: 31200,
    sam: 9800,
    som: 210,
    tamGrowth: 14.1,
    samGrowth: 9.6,
    somGrowth: 4.8,
    source: 'RBI Digital Payments Report 2025'
  },
  competitors: [
    { name: 'Paytm', type: 'leader', share: 27, revenue: '₹9,900 Cr', growth: '+15%' },
    { name: 'PhonePe', type: 'direct', share: 25, revenue: '₹8,600 Cr', growth: '+19%' },
    { name: 'Razorpay', type: 'indirect', share: 14, revenue: '₹2,400 Cr', growth: '+22%' }
  ]
};

async function testMilestone4() {
  console.log('=== STARTING MILESTONE 4 INTEGRATION & REPORT TEST SUITE ===');

  // 1. Test Report Generator Service
  console.log('\n--- 1. Testing Comprehensive Report Generator Service ---');
  const report = await generateComprehensiveReport(testProjectData);
  console.log('Report ID:', report.reportId);
  console.log('Project Name:', report.summary.projectName);
  console.log('Overall Risk Score:', report.summary.overallRiskScore, `(${report.summary.riskLevel})`);
  console.log('Market Fit Percentage:', report.summary.marketFitPercentage, '%');
  console.log('Quality Audit Score:', report.summary.qualityAuditScore, '/100');

  if (!report.reportId || !report.summary || report.milestone2.riskCategories.length !== 5) {
    throw new Error('Comprehensive Report Generator validation failed');
  }

  // 2. Test Risk Category Breakdown
  console.log('\n--- 2. Testing 5 Risk Categories Output ---');
  report.milestone2.riskCategories.forEach(rc => {
    console.log(`- ${rc.name}: ${rc.score}/100 (${rc.severity}) | Trigger: ${rc.trigger}`);
  });

  // 3. Test Milestone 3 Integrations in Report
  console.log('\n--- 3. Testing Milestone 3 AI & LangGraph Integration in Report ---');
  console.log('AI Recommendations Count:', report.milestone3.aiRecommendations.length);
  console.log('Mitigations Count:', report.milestone3.mitigations.length);
  console.log('Workflow Executed Success:', report.milestone3.workflowStatus.success);

  if (report.milestone3.aiRecommendations.length !== 4 || report.milestone3.mitigations.length !== 4) {
    throw new Error('Milestone 3 sections in Comprehensive Report must return 4 items each');
  }

  console.log('\n=== ALL MILESTONE 4 INTEGRATION CHECKS PASSED SUCCESSFULLY! ===');
}

testMilestone4().catch(err => {
  console.error('MILESTONE 4 TEST FAILURE:', err);
  process.exit(1);
});
