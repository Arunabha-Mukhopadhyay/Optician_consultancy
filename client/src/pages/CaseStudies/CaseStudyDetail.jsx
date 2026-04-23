// src/pages/CaseStudies/CaseStudyDetail.jsx — Individual case study page
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';

const CASE_STUDIES = {
  'procurement-cost-reduction-pune': {
    title: 'Reducing Procurement Costs by 31% for a Pune Auto Parts Manufacturer',
    industry: 'Manufacturing', service: 'Procurement Strategy',
    clientBackground: 'A mid-size auto parts manufacturer in Pune with annual revenue of ₹48 Cr, supplying to Tier-1 OEMs. Family-managed business with 180 employees and no formal procurement team.',
    problem: 'The client was managing procurement across 120+ vendors with no spend visibility, no category management, and reactive buying behavior. Price volatility was causing margin compression of 8–12% annually. Single-source dependencies for 3 critical components created severe supply risk.',
    approach: `Phase 1 — Spend Diagnostic (Weeks 1–3): Conducted full spend analysis across all categories. Identified top 20 vendors driving 78% of total spend. Benchmarked current prices against market rates — identified 18–25% price premium across key categories.\n\nPhase 2 — Sourcing Strategy (Weeks 4–8): Developed category-specific sourcing strategies. Consolidated 120 vendors to 67 strategic partners. Introduced dual-sourcing for all critical components. Ran competitive RFQs with structured evaluation criteria.\n\nPhase 3 — Negotiation & Implementation (Weeks 9–16): Led negotiations with top 20 vendors. Achieved 22–35% price reductions on 8 major categories. Implemented annual contracts with SLA clauses. Trained 3-person procurement team on category management.`,
    metrics: [
      { label: 'Cost Reduction', value: '31%' },
      { label: 'Timeline', value: '6 months' },
      { label: 'Annual Savings', value: '₹68L' },
      { label: 'Vendors Consolidated', value: '120 → 67' },
      { label: 'Contract Coverage', value: '85% spend' },
      { label: 'ROI', value: '8.5x' },
    ],
    keyLearnings: [
      'Spend visibility is the first step — without it, no procurement transformation is possible.',
      'Family businesses often have legacy vendor relationships that need to be professionally restructured.',
      'Dual-sourcing critical components is non-negotiable for SME supply chain resilience.',
      'Building an internal procurement team while consulting ensures sustainability of gains.',
    ],
    clientQuote: 'OptiChain identified savings we didn\'t even know existed. The procurement transformation paid for itself in the first 3 months. — Managing Director',
  },
  'six-sigma-fmcg-mumbai': {
    title: 'Six Sigma Implementation Saves ₹1.2 Cr for FMCG Distributor in Mumbai',
    industry: 'FMCG', service: 'Six Sigma',
    clientBackground: 'A regional FMCG distributor in Mumbai handling 3,200+ SKUs across 14 product categories, serving 800+ retail outlets across Mumbai and Thane. Annual distribution revenue of ₹72 Cr.',
    problem: 'A rejection rate of 8.4% in distribution operations was causing ₹1.8 Cr annual loss through returns, reprocessing, and customer penalties. Root causes were unknown — the team was firefighting rather than solving systemically.',
    approach: `Phase D — Define (Week 1–2): Defined project scope — reduce distribution rejection rate from 8.4% to below 3%. Estimated financial impact: ₹1.2–1.5 Cr annually. Built project charter with sign-off from MD.\n\nPhase M — Measure (Weeks 3–5): Implemented data collection at 6 rejection categories: damaged packaging, wrong item, expired stock, quantity mismatch, temperature issue, customer refusal. Baseline: 8.4% DPMO = 84,000.\n\nPhase A — Analyze (Weeks 6–9): Root cause analysis via fishbone diagram. Key findings: 61% of rejections from damaged packaging (warehouse stacking), 23% from picking errors (no barcode verification), 16% from temperature chain breaks.\n\nPhase I+C — Improve & Control (Weeks 10–20): Redesigned warehouse stacking SOP, implemented barcode-scan picking, installed temperature loggers on 8 routes. Rejection rate fell to 1.8% within 12 weeks.`,
    metrics: [
      { label: 'Savings', value: '₹1.2 Cr' },
      { label: 'Rejection Rate', value: '8.4% → 1.8%' },
      { label: 'Duration', value: '5 months' },
      { label: 'Defect Reduction', value: '78.6%' },
      { label: 'DPMO', value: '84K → 18K' },
      { label: 'ROI', value: '12x' },
    ],
    keyLearnings: [
      'Data-driven root cause analysis always surprises — the biggest issue (stacking) was hiding in plain sight.',
      'Simple process changes (barcode scan at picking) can eliminate 23% of defects at zero cost.',
      'Control plans are critical — sustaining gains requires measurement systems, not just process changes.',
    ],
    clientQuote: 'The Six Sigma project was a game-changer. We were losing ₹1.8 Cr to rejections that we thought were unavoidable. OptiChain proved us wrong. — Head of Operations',
  },
  'esg-pharma-compliance': {
    title: 'ESG Compliance Roadmap for a Mid-Size Pharma Company in Hyderabad',
    industry: 'Pharma', service: 'ESG Services',
    clientBackground: 'A SEBI-listed pharmaceutical company in Hyderabad with annual revenue of ₹320 Cr, manufacturing APIs and formulations. Facing BRSR disclosure mandate from FY2024-25.',
    problem: 'Zero ESG baseline, no reporting framework, and supply chain sustainability gaps. The company had 18 months to BRSR compliance and no internal capability to build it. ESG score via our tool: 28/100.',
    approach: `Phase 1 — ESG Baseline (Month 1): Used OptiChain ESG Calculator to establish baseline across 45 metrics. ESG Score: 28/100, SC Health Score: 41/100. Identified critical gaps: renewable energy (4%), waste disposal, supplier ESG clauses.\n\nPhase 2 — Roadmap Design (Month 2): Built prioritized 18-month roadmap. Quick wins in Month 1–3: LED lighting, waste segregation, supplier ESG questionnaire. Medium-term: Solar installation, supplier development on ESG. Long-term: GHG accounting, BRSR report preparation.\n\nPhase 3 — Implementation (Months 3–16): Implemented 22 initiatives across E, S, G pillars. Installed 180 kW solar on factory roof. Launched supplier ESG development program for top 30 vendors.\n\nPhase 4 — Reporting (Month 17–18): Prepared full BRSR report per SEBI format. Conducted third-party data verification. Submitted ESG report to board and stock exchange.`,
    metrics: [
      { label: 'ESG Score', value: '28 → 66' },
      { label: 'BRSR Compliant', value: 'Yes' },
      { label: 'Renewable Energy', value: '4% → 34%' },
      { label: 'Waste Reduction', value: '41%' },
      { label: 'Duration', value: '18 months' },
      { label: 'Suppliers ESG-rated', value: '30' },
    ],
    keyLearnings: [
      'Solar installation is the single highest-impact ESG action for Indian manufacturers — ROI in 5–7 years.',
      'Supplier ESG clauses need to be introduced gradually — sudden requirements without support cause vendor attrition.',
      'BRSR is not just a compliance exercise — it improves investor confidence and unlocks green financing.',
    ],
    clientQuote: 'OptiChain guided us from ESG zero to full BRSR compliance in 18 months. The structured roadmap made a daunting task completely manageable. — VP Supply Chain',
  },
  'inventory-retail-chain': {
    title: 'Inventory Optimization Reduces Dead Stock by 44% for Retail Chain',
    industry: 'Retail', service: 'Inventory Management',
    clientBackground: 'A 12-store ethnic wear retail chain in Maharashtra with ₹38 Cr annual revenue. Managing 4,200 SKUs across stores with no centralized inventory management system.',
    problem: 'Dead stock of ₹95L across stores, stockouts of fast-moving SKUs causing ₹22L monthly lost sales, and inventory holding cost at 32% — nearly double the industry benchmark of 18%.',
    approach: `Phase 1 — Inventory Audit (Weeks 1–2): Full physical stock count across all 12 stores. ABC-XYZ classification of 4,200 SKUs. Identified ₹95L in dead/slow-moving stock.\n\nPhase 2 — Demand Analysis (Weeks 3–5): 24-month sales analysis per SKU. Identified seasonality patterns, price elasticity, and store-specific demand profiles. Built demand forecasting model.\n\nPhase 3 — Policy Design (Weeks 6–8): Differentiated replenishment policy: A-items daily, B-items weekly, C-items monthly. Safety stock calculated per SKU using statistical formula. Reorder points set in POS system.\n\nPhase 4 — Implementation (Weeks 9–16): Trained store managers on new replenishment logic. Implemented weekly performance review dashboard. Dead stock clearance program — ₹42L cleared in 6 weeks at 15% margin.`,
    metrics: [
      { label: 'Dead Stock Reduction', value: '44%' },
      { label: 'Cash Released', value: '₹42L' },
      { label: 'Service Level', value: '→ 97.3%' },
      { label: 'Holding Cost', value: '32% → 20%' },
      { label: 'Turnover Ratio', value: '3.2 → 6.8' },
      { label: 'SKUs Rationalized', value: '4200 → 3400' },
    ],
    keyLearnings: [
      'Retail inventory is all about differentiated policies — treating all SKUs the same is the root of dead stock.',
      'Statistical safety stock calculation is simple but transformative — eliminates both excess and stockouts simultaneously.',
      'Dead stock clearance requires a structured program, not random discounting, to maximize cash recovery.',
    ],
    clientQuote: 'We released ₹42L in cash from dead stock in just 6 weeks. The new inventory model has completely changed how we think about buying. — Business Owner',
  },
  'vendor-development-auto-oem': {
    title: 'End-to-End Vendor Development for a Tier-2 Auto OEM in Pune',
    industry: 'Manufacturing', service: 'Vendor Development',
    clientBackground: 'A Tier-2 automotive OEM in Pune supplying pressed metal components to 3 Tier-1 suppliers. Annual revenue of ₹56 Cr with 45 active vendors and frequent delivery failures causing production stoppages.',
    problem: 'No formal vendor qualification, zero audit framework, single-source dependency for 12 critical parts, and OTD (On-Time Delivery) from vendors at 61% — causing 15+ production stoppages per month.',
    approach: `Phase 1 — Vendor Profiling (Weeks 1–3): ABC classification of 45 vendors by spend, criticality, and delivery performance. Identified 12 critical vendors and 8 dual-sourcing gaps.\n\nPhase 2 — Audit Program (Weeks 4–10): On-site audits of top 25 vendors using 85-point checklist covering quality, capacity, financial health, and compliance. Average audit score: 4.8/10.\n\nPhase 3 — Development Planning (Weeks 11–16): Individual improvement plans for 18 underperforming vendors. 3 workshops on quality systems, documentation, and on-time delivery. Identified and onboarded 8 alternative vendors for single-source items.\n\nPhase 4 — Scorecard Implementation (Weeks 17–24): Monthly vendor scorecard with 5 KPIs: OTD, Quality, Cost, Responsiveness, Compliance. Escalation framework for non-performers. Preferred vendor list with pricing benefits.`,
    metrics: [
      { label: 'OTD Improvement', value: '61% → 89%' },
      { label: 'Vendor Risk', value: '-60%' },
      { label: 'Vendors Audited', value: '45' },
      { label: 'Single-Source Risk', value: 'Eliminated' },
      { label: 'Production Stoppages', value: '15 → 2/month' },
      { label: 'Audit Score', value: '4.8 → 7.2' },
    ],
    keyLearnings: [
      'Vendor audits always reveal surprises — financial health of key vendors is a hidden risk most OEMs ignore.',
      'Single-source dependencies are the highest supply chain risk — dual-sourcing is not a cost, it\'s insurance.',
      'Vendor scorecards only work if they\'re shared with vendors — transparency drives improvement.',
    ],
    clientQuote: 'Production stoppages went from 15 a month to just 2. Our Tier-1 customers noticed the reliability improvement immediately. — VP Manufacturing',
  },
};

export default function CaseStudyDetail() {
  const { id } = useParams();
  const cs = CASE_STUDIES[id];

  if (!cs) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 text-center">
        <div>
          <p className="text-4xl mb-4">📋</p>
          <h2 className="text-xl font-bold text-navy-700 mb-3">Case Study Not Found</h2>
          <Link to="/case-studies" className="btn-primary">View All Case Studies</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="bg-hero-gradient pt-32 pb-20">
        <div className="container-custom">
          <Link to="/case-studies" className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-6 text-sm">
            <FiArrowLeft className="w-4 h-4" /> Back to Case Studies
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div className="flex gap-2 flex-wrap mb-4">
              <span className="badge-orange">{cs.industry}</span>
              <span className="px-3 py-1 bg-white/20 text-white text-xs rounded-full">{cs.service}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">{cs.title}</h1>
          </motion.div>
        </div>
      </section>

      <section className="section bg-white dark:bg-gray-950">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-10">
              {/* Client Background */}
              <div id="client-background">
                <span className="badge-navy mb-3 inline-block">Client Background</span>
                <h2 className="text-xl font-bold text-navy-700 dark:text-white mb-3">About the Client</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{cs.clientBackground}</p>
              </div>

              {/* Problem */}
              <div id="problem-statement">
                <span className="badge-orange mb-3 inline-block">The Challenge</span>
                <h2 className="text-xl font-bold text-navy-700 dark:text-white mb-3">Problem Statement</h2>
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r-lg">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{cs.problem}</p>
                </div>
              </div>

              {/* Approach */}
              <div id="our-approach">
                <span className="badge-navy mb-3 inline-block">Our Approach</span>
                <h2 className="text-xl font-bold text-navy-700 dark:text-white mb-4">3-Phase Approach</h2>
                {cs.approach.split('\n\n').map((para, i) => (
                  <div key={i} className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border-l-4 border-navy-700">
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{para}</p>
                  </div>
                ))}
              </div>

              {/* Key Learnings */}
              <div id="key-learnings">
                <span className="badge-orange mb-3 inline-block">Insights</span>
                <h2 className="text-xl font-bold text-navy-700 dark:text-white mb-4">Key Learnings</h2>
                <ul className="space-y-3">
                  {cs.keyLearnings.map((l, i) => (
                    <li key={i} className="flex gap-3 items-start text-gray-600 dark:text-gray-300">
                      <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 font-bold mt-0.5">{i + 1}</span>
                      {l}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Client Quote */}
              <blockquote className="p-6 bg-navy-700 rounded-2xl">
                <p className="text-white text-lg italic mb-3">"{cs.clientQuote}"</p>
              </blockquote>
            </div>

            {/* Sidebar — Metrics */}
            <div>
              <div className="card sticky top-24">
                <span className="badge-orange mb-3 inline-block">Results</span>
                <h3 className="font-bold text-navy-700 dark:text-white mb-4">Key Outcomes</h3>
                <div className="space-y-3">
                  {cs.metrics?.map((m, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span className="text-xs text-gray-500 dark:text-gray-400">{m.label}</span>
                      <span className="font-bold text-orange-500">{m.value}</span>
                    </div>
                  ))}
                </div>
                <Link to="/contact" className="btn-primary w-full justify-center mt-6" id="case-study-book-cta">
                  Get Similar Results <FiArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
