// src/utils/esgScoring.js — ESG + Supply Chain Health Score Algorithm
/**
 * Calculates ESG Score, SC Health Score, and Overall OptiChain Index
 * All scores are normalized to 0-100 range
 */

export const calculateESGScore = (data) => {
  const {
    // Step 2 - Operations
    renewable_energy_pct = 0,  // 0–100%
    waste_tons = 0,             // tons/month
    energy_kwh = 0,             // kWh/month
    water_kl = 0,               // kL/month
    // Step 3 - Supply Chain
    supplier_audit_score = 5,   // 1–10
    inventory_turnover = 4,     // ratio
    rejection_rate = 10,        // percentage
    training_hours = 20,        // hours/year
    local_suppliers_pct = 30,   // %
    num_suppliers = 10,
  } = data;

  // ---- ESG SCORE (out of 100) ----
  // Renewable energy component (weight 35%)
  const renewableScore = Math.min(renewable_energy_pct, 100) * 0.35;

  // Waste management component (weight 30%) — lower is better
  // Normalize: 0 tons = 100, 50+ tons = 0
  const wasteScore = Math.max(0, (1 - waste_tons / 50)) * 100 * 0.30;

  // Energy efficiency component (weight 20%) — lower kWh = better
  // Normalize: 0 = 100, 10000+ = 0
  const energyScore = Math.max(0, (1 - energy_kwh / 10000)) * 100 * 0.20;

  // Water usage (weight 15%) — lower is better
  // Normalize: 0 = 100, 1000+ = 0
  const waterScore = Math.max(0, (1 - water_kl / 1000)) * 100 * 0.15;

  const esgScore = Math.min(100, Math.round(renewableScore + wasteScore + energyScore + waterScore));

  // ---- SC HEALTH SCORE (out of 100) ----
  // Supplier audit score (weight 30%) — 1-10 → 0-100
  const auditScore = ((supplier_audit_score - 1) / 9) * 100 * 0.30;

  // Inventory turnover (weight 25%) — higher is better, normalize 0-20 → 0-100
  const invScore = Math.min(inventory_turnover / 20, 1) * 100 * 0.25;

  // Rejection/return rate (weight 25%) — lower is better, 0%=100, 50%+=0
  const rejectionScore = Math.max(0, (1 - rejection_rate / 50)) * 100 * 0.25;

  // Training hours (weight 20%) — normalize 0-100hrs → 0-100
  const trainingScore = Math.min(training_hours / 100, 1) * 100 * 0.20;

  const scHealthScore = Math.min(100, Math.round(auditScore + invScore + rejectionScore + trainingScore));

  // ---- OVERALL OPTICHAIN INDEX ----
  const overallIndex = Math.round((esgScore + scHealthScore) / 2);

  // ---- RECOMMENDATIONS ----
  const recommendations = generateRecommendations({
    esgScore, scHealthScore, overallIndex,
    renewable_energy_pct, waste_tons, supplier_audit_score,
    inventory_turnover, rejection_rate, training_hours, local_suppliers_pct,
  });

  return {
    esgScore,
    scHealthScore,
    overallIndex,
    recommendations,
    breakdown: {
      renewable: Math.round(renewableScore / 0.35),
      waste: Math.round(wasteScore / 0.30),
      energy: Math.round(energyScore / 0.20),
      water: Math.round(waterScore / 0.15),
      audit: Math.round(auditScore / 0.30),
      inventory: Math.round(invScore / 0.25),
      rejection: Math.round(rejectionScore / 0.25),
      training: Math.round(trainingScore / 0.20),
    },
  };
};

const generateRecommendations = (scores) => {
  const recs = [];

  if (scores.renewable_energy_pct < 30) {
    recs.push({
      category: 'ESG',
      priority: 'High',
      title: 'Transition to Renewable Energy Sources',
      description: `Your renewable energy usage is ${scores.renewable_energy_pct}%. SEBI's BRSR framework mandates ESG disclosure. Transitioning to solar or wind energy can reduce your carbon footprint by 40–60% and improve ESG rating significantly.`,
      impact: '+15 to ESG Score',
    });
  }

  if (scores.waste_tons > 20) {
    recs.push({
      category: 'ESG',
      priority: 'High',
      title: 'Implement Waste Reduction Protocol',
      description: `Generating ${scores.waste_tons} tons/month of waste is above the industry benchmark of 10 tons. Implement lean waste management, circular economy practices, and vendor take-back programs.`,
      impact: '+12 to ESG Score',
    });
  }

  if (scores.supplier_audit_score < 6) {
    recs.push({
      category: 'Supply Chain',
      priority: 'High',
      title: 'Strengthen Supplier Audit & Development Program',
      description: `Your supplier audit score of ${scores.supplier_audit_score}/10 indicates significant vendor risk. Implement structured vendor development with quarterly audits, scorecards, and capacity building workshops.`,
      impact: '+18 to SC Health Score',
    });
  }

  if (scores.inventory_turnover < 6) {
    recs.push({
      category: 'Supply Chain',
      priority: 'Medium',
      title: 'Optimize Inventory Turnover Ratio',
      description: `An inventory turnover of ${scores.inventory_turnover} indicates potential dead stock accumulation. Implement demand-driven replenishment, ABC analysis, and safety stock optimization to target 8–12x turnover.`,
      impact: '+10 to SC Health Score',
    });
  }

  if (scores.rejection_rate > 5) {
    recs.push({
      category: 'Quality',
      priority: 'High',
      title: 'Deploy Six Sigma DMAIC to Reduce Rejection Rate',
      description: `A rejection rate of ${scores.rejection_rate}% is significantly above the 2% industry benchmark. Our Six Sigma team can apply DMAIC methodology to identify root causes and reduce defects by 60–80%.`,
      impact: '+14 to SC Health Score',
    });
  }

  if (scores.training_hours < 40) {
    recs.push({
      category: 'Capability',
      priority: 'Medium',
      title: 'Increase Employee Training Investment',
      description: `Only ${scores.training_hours} training hours/year is below the recommended 80 hours. Supply chain capability building reduces errors by 35% and improves overall operational resilience.`,
      impact: '+8 to SC Health Score',
    });
  }

  if (recs.length === 0) {
    recs.push({
      category: 'Optimization',
      priority: 'Low',
      title: 'Maintain & Benchmark Against Industry Leaders',
      description: 'Your scores are strong. Focus on continuous improvement, ESG reporting automation, and benchmarking against global supply chain leaders to maintain your competitive edge.',
      impact: 'Maintain current scores',
    });
  }

  return recs.slice(0, 3); // Return top 3 recommendations
};

export const getScoreLabel = (score) => {
  if (score >= 81) return { label: 'Excellent', color: '#22c55e' };
  if (score >= 61) return { label: 'Good', color: '#3b82f6' };
  if (score >= 41) return { label: 'Needs Improvement', color: '#f59e0b' };
  return { label: 'Critical', color: '#ef4444' };
};
