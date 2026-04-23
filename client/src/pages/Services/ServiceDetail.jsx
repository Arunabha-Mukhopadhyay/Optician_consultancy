// src/pages/Services/ServiceDetail.jsx — Dynamic service detail with FeedbackWidget
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import FeedbackWidget from '../../components/FeedbackWidget';

const servicesData = {
  'supply-chain-management': {
    title: 'Supply Chain Management',
    icon: '🔗',
    tagline: 'Design resilient, cost-efficient supply chains from source to shelf.',
    what: `Supply chain management encompasses the full lifecycle of goods — from raw material sourcing through manufacturing, distribution, and final delivery. For Indian SMEs, inefficiencies at any stage can silently erode 15–25% of revenue through excess inventory, supplier delays, and unoptimized logistics networks.\n\nAt OptiChain, we conduct a comprehensive diagnostic of your existing supply chain using data analytics and process mapping tools. We then design a resilient, lean, and cost-optimized network tailored to your industry, geography, and scale — giving you visibility, control, and a competitive edge.`,
    approach: [
      { step: '01', title: 'Diagnostic & Mapping', desc: 'Current state analysis — process maps, cost breakdown, risk identification, KPI benchmarking.' },
      { step: '02', title: 'Design & Modeling', desc: 'Network redesign, supplier rationalization, demand modeling, scenario simulations.' },
      { step: '03', title: 'Implementation', desc: 'Phased rollout, change management, team training, and SOP documentation.' },
      { step: '04', title: 'Performance Monitoring', desc: 'Dashboard setup, monthly reviews, continuous improvement cycles, KPI tracking.' },
    ],
    benefits: ['15–30% reduction in total supply chain cost', 'Improved on-time delivery by 25%+', 'Real-time supply chain visibility', 'Reduced inventory holding costs', 'Supplier risk mitigation framework', 'SCOR-aligned performance metrics'],
    deliverables: ['Current State Assessment Report', 'Optimized Network Design Blueprint', 'KPI Dashboard (Excel/Power BI)', 'SOP Manual for supply chain operations', 'Risk Register & Mitigation Plan', '3-month post-implementation support'],
    industries: ['Manufacturing', 'FMCG', 'Pharma', 'Retail', 'Logistics'],
    relatedCase: { title: 'Reducing Procurement Costs by 31% for Pune Auto Parts Manufacturer', slug: 'procurement-cost-reduction-pune' },
  },
  'vendor-development': {
    title: 'Vendor Development',
    icon: '🤝',
    tagline: 'Build a high-performing, audit-ready supplier ecosystem.',
    what: `Vendor development is the structured process of onboarding, evaluating, and growing your supplier base into a strategic asset. Most Indian SMEs operate with informal vendor relationships, no audit framework, and zero supplier scorecards — creating hidden quality risks, delivery failures, and compliance vulnerabilities.\n\nOptiChain's vendor development program transforms your supplier ecosystem using structured audits, capacity building workshops, performance scorecards, and a vendor classification matrix. We help you move from reactive vendor firefighting to proactive supplier partnership.`,
    approach: [
      { step: '01', title: 'Vendor Profiling', desc: 'Classify existing vendors by criticality, spend, and performance using ABC matrix.' },
      { step: '02', title: 'Audit & Assessment', desc: 'On-site vendor audits using standardized checklists covering quality, capacity, compliance.' },
      { step: '03', title: 'Development Planning', desc: 'Individual vendor improvement plans, training workshops, and certification support.' },
      { step: '04', title: 'Scorecard & Review', desc: 'Quarterly vendor scorecards, performance reviews, and strategic vendor meetings.' },
    ],
    benefits: ['Reduce supplier-related defects by 60%+', 'Structured vendor onboarding in 2 weeks', 'Audit-ready documentation', 'Strategic vs. tactical vendor segmentation', 'Improved on-time delivery from suppliers', 'Reduced single-source dependency risk'],
    deliverables: ['Vendor Classification Matrix', 'Standard Audit Checklist', 'Vendor Scorecard Template', 'Development Action Plans per vendor', 'SOP for Vendor Onboarding', 'Quarterly review framework'],
    industries: ['Manufacturing', 'Auto OEM', 'FMCG', 'Pharma'],
    relatedCase: { title: 'End-to-End Vendor Development for Tier-2 Auto OEM', slug: 'vendor-development-auto-oem' },
  },
  'procurement-strategy': {
    title: 'Procurement Strategy',
    icon: '📋',
    tagline: 'Turn procurement from a cost center into a strategic advantage.',
    what: `Procurement strategy defines how an organization sources goods and services — and when done poorly, it is one of the largest sources of preventable cost. Most Indian SMEs procure reactively: multiple vendors for the same category, no spend visibility, and zero leverage in negotiations.\n\nOptiChain's procurement consulting begins with a full spend analysis across all categories, followed by market benchmarking, supplier consolidation, and strategic sourcing programs. We implement category management frameworks that give you negotiating power and long-term cost predictability.`,
    approach: [
      { step: '01', title: 'Spend Analysis', desc: 'Classify all procurement spend by category, supplier, and business unit. Identify top 20% driving 80% of costs.' },
      { step: '02', title: 'Market Benchmarking', desc: 'Benchmark current prices against market rates. Identify gap and savings potential.' },
      { step: '03', title: 'Sourcing Strategy', desc: 'Develop category-specific sourcing strategies — consolidation, dual-source, strategic partners.' },
      { step: '04', title: 'Negotiation & Contracting', desc: 'Support negotiations, draft service-level agreements, and implement contract management.' },
    ],
    benefits: ['Procurement cost reduction of 15–31%', 'Spend visibility across all categories', 'Reduced number of active suppliers by 30%', 'Long-term pricing contracts', 'Compliance with procurement policies', 'Negotiation playbooks for your team'],
    deliverables: ['Spend Analysis Dashboard', 'Category Strategy Documents', 'Supplier Negotiation Playbook', 'Procurement Policy Manual', 'Contract Templates', 'Savings Tracker Report'],
    industries: ['Manufacturing', 'FMCG', 'Retail', 'Pharma'],
    relatedCase: { title: 'Reducing Procurement Costs by 31% for Pune Auto Parts Manufacturer', slug: 'procurement-cost-reduction-pune' },
  },
  'six-sigma': {
    title: 'Six Sigma & Lean',
    icon: '⚡',
    tagline: 'Eliminate defects, reduce waste, and drive measurable operational excellence.',
    what: `Six Sigma is a data-driven methodology that reduces process variation and eliminates defects to fewer than 3.4 per million opportunities. Combined with Lean principles, it provides a powerful toolkit to eliminate the 8 wastes that drain profitability from manufacturing and service operations.\n\nOptiChain's Six Sigma team — led by certified Black Belts — applies the DMAIC (Define, Measure, Analyze, Improve, Control) framework to your most critical operational problems. We select high-impact projects, build internal capability, and deliver measurable financial results within 90–180 days.`,
    approach: [
      { step: 'D', title: 'Define', desc: 'Define the problem, project scope, customer requirements, and financial impact using a project charter.' },
      { step: 'M', title: 'Measure', desc: 'Baseline the current process performance using SPC charts, process capability analysis, and data collection.' },
      { step: 'A', title: 'Analyze', desc: 'Identify root causes using fishbone, FMEA, regression analysis, and hypothesis testing.' },
      { step: 'I+C', title: 'Improve & Control', desc: 'Implement solutions, validate improvements, and sustain gains with control charts and SOPs.' },
    ],
    benefits: ['Defect reduction of 60–85%', 'Process cycle time improvement of 30%+', 'Financial savings of ₹25L–₹2Cr per project', 'Internal Green Belt/Black Belt training', 'Lean waste elimination across 8 waste types', 'Sustained improvement with control plans'],
    deliverables: ['Project Charter', 'Measurement System Analysis Report', 'Root Cause Analysis Report', 'Improved Process Map & SOPs', 'Control Plan', 'Financial Benefits Report'],
    industries: ['Manufacturing', 'FMCG', 'Pharma', 'Auto OEM'],
    relatedCase: { title: 'Six Sigma Saves ₹1.2 Cr for Mumbai FMCG Distributor', slug: 'six-sigma-fmcg-mumbai' },
  },
  'logistics-distribution': {
    title: 'Logistics & Distribution',
    icon: '🚚',
    tagline: 'Optimize your distribution network for speed, cost, and reliability.',
    what: `Logistics and distribution is where supply chain costs are most visible — and most misunderstood. Indian SMEs often overpay for freight due to poor route planning, suboptimal 3PL selection, and inefficient warehouse placement. Last-mile delivery failures destroy customer satisfaction and brand reputation.\n\nOptiChain's logistics consulting covers the full distribution chain: network design, 3PL/4PL evaluation, warehouse optimization, route planning, and last-mile delivery restructuring. We use data analytics and simulation tools to design the most cost-effective distribution model for your geography and volume.`,
    approach: [
      { step: '01', title: 'Network Assessment', desc: 'Map current distribution network: warehouse locations, fleet utilization, route efficiency, and cost per delivery.' },
      { step: '02', title: '3PL Evaluation', desc: 'Benchmark 3PL options, evaluate on cost, coverage, technology, and SLA compliance.' },
      { step: '03', title: 'Route Optimization', desc: 'Data-driven route redesign to minimize distance, fuel, and time. Implement dynamic routing.' },
      { step: '04', title: 'Last-Mile Design', desc: 'Hub-and-spoke vs. direct delivery analysis. Optimize last-mile for urban and Tier-2/3 markets.' },
    ],
    benefits: ['Freight cost reduction of 20–35%', 'On-time delivery improvement of 30%+', 'Optimal 3PL selection with SLA contracts', 'Warehouse footprint optimization', 'Real-time fleet visibility', 'Last-mile efficiency for Tier-2/3 cities'],
    deliverables: ['Distribution Network Map', '3PL Evaluation Matrix', 'Route Optimization Report', 'Warehouse Layout Redesign', 'Last-Mile Delivery Strategy', 'Logistics KPI Dashboard'],
    industries: ['FMCG', 'Retail', 'Pharma', 'Manufacturing'],
    relatedCase: { title: 'Inventory Optimization Reduces Dead Stock by 44% for Retail Chain', slug: 'inventory-retail-chain' },
  },
  'inventory-management': {
    title: 'Inventory Management',
    icon: '📦',
    tagline: 'Eliminate dead stock, reduce holding costs, and never stock out.',
    what: `Inventory is the largest balance sheet asset for most product companies — and the most mismanaged. Indian SMEs typically face either excess inventory (cash locked in slow-moving stock) or stockouts (lost sales and customer churn). Both are symptoms of poor inventory planning systems.\n\nOptiChain implements demand-driven inventory models using ABC-XYZ classification, safety stock optimization, reorder point calculation, and ERP-aligned replenishment logic. Our approach typically reduces dead stock by 35–50% while improving availability levels to 98%+.`,
    approach: [
      { step: '01', title: 'Inventory Audit', desc: 'Full stock audit — classify by value, movement, and age. Identify dead stock, slow movers, and fast movers.' },
      { step: '02', title: 'Demand Analysis', desc: 'Historical demand analysis, seasonality identification, and forecasting model selection.' },
      { step: '03', title: 'Model Design', desc: 'Safety stock formula, reorder point, EOQ calculation, and ABC policy differentiation.' },
      { step: '04', title: 'ERP Configuration', desc: 'Configure inventory parameters in your ERP/system. Train team. Implement review cycles.' },
    ],
    benefits: ['Reduce dead stock by 35–50%', 'Improve service level to 97%+', 'Reduce inventory holding cost by 25%', 'Cash release from excess stock', 'Scientific safety stock calculation', 'ERP-aligned replenishment automation'],
    deliverables: ['Inventory Classification Report (ABC-XYZ)', 'Demand Forecasting Model', 'Safety Stock & Reorder Point Calculator', 'ERP Configuration Guide', 'Inventory Policy Manual', 'Monthly Review Dashboard'],
    industries: ['Retail', 'FMCG', 'Manufacturing', 'Pharma'],
    relatedCase: { title: 'Inventory Optimization Reduces Dead Stock by 44% for Retail Chain', slug: 'inventory-retail-chain' },
  },
  'esg': {
    title: 'ESG Services',
    icon: '🌿',
    tagline: 'Build a sustainable supply chain that meets SEBI BRSR standards.',
    what: `Environmental, Social, and Governance (ESG) is no longer optional for Indian businesses. SEBI's Business Responsibility and Sustainability Report (BRSR) mandate requires listed companies to disclose ESG performance — and this is cascading down to their supply chains, including SME suppliers.\n\nOptiChain's ESG consulting helps you assess your current sustainability baseline, build a credible ESG roadmap, and achieve compliance with BRSR and GRI standards. Our signature ESG & Supply Chain Health Score Tool gives you a quantified starting point and personalized improvement recommendations.`,
    approach: [
      { step: '01', title: 'ESG Baseline Assessment', desc: 'Measure current environmental, social, and governance performance using our proprietary scoring framework.' },
      { step: '02', title: 'Gap Analysis & Roadmap', desc: 'Identify gaps vs. BRSR/GRI standards. Build a prioritized 12–24 month improvement roadmap.' },
      { step: '03', title: 'Implementation Support', desc: 'Implement quick wins: renewable energy, waste reduction, supplier ESG clauses, training programs.' },
      { step: '04', title: 'Reporting & Disclosure', desc: 'Prepare BRSR report, ESG disclosures, and stakeholder communication materials.' },
    ],
    benefits: ['BRSR compliance ahead of deadline', 'ESG score improvement of 20–40 points', 'Access to green financing and ESG-linked loans', 'Supply chain ESG due diligence capability', 'Carbon footprint baseline and reduction plan', 'Investor-grade ESG disclosure reports'],
    deliverables: ['ESG Baseline Report', '12-month ESG Roadmap', 'BRSR Compliance Report', 'Supplier ESG Clause Templates', 'Carbon Footprint Calculator', 'Stakeholder ESG Presentation'],
    industries: ['Manufacturing', 'Pharma', 'FMCG', 'Retail'],
    relatedCase: { title: 'ESG Compliance Roadmap for Mid-Size Pharma Company', slug: 'esg-pharma-compliance' },
  },
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const svc = servicesData[slug];

  if (!svc) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <p className="text-6xl mb-4">🔍</p>
          <h2 className="text-2xl font-bold text-navy-700 mb-2">Service Not Found</h2>
          <Link to="/services" className="btn-primary mt-4">View All Services</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Banner */}
      <section className="bg-hero-gradient pt-32 pb-20">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-5xl">{svc.icon}</span>
              <span className="badge-orange">Service Detail</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{svc.title}</h1>
            <p className="text-xl text-blue-100">{svc.tagline}</p>
          </motion.div>
        </div>
      </section>

      {/* What Is It */}
      <section className="section bg-white dark:bg-gray-950" id="what-is-it">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="badge-navy mb-3 inline-block">Overview</span>
            <h2 className="section-heading text-left">What Is {svc.title}?</h2>
            <div className="h-1 w-16 bg-orange-500 rounded-full mb-6" />
            {svc.what.split('\n\n').map((para, i) => (
              <p key={i} className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="section bg-gray-50 dark:bg-gray-900" id="approach">
        <div className="container-custom">
          <span className="badge-orange mb-3 inline-block">Our Process</span>
          <h2 className="section-heading">Our Approach</h2>
          <div className="h-1 w-16 bg-orange-500 rounded-full mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {svc.approach.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card"
              >
                <div className="w-12 h-12 rounded-xl bg-navy-700 text-white font-bold text-lg flex items-center justify-center mb-4">
                  {step.step}
                </div>
                <h3 className="font-bold text-navy-700 dark:text-white mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits + Deliverables */}
      <section className="section bg-white dark:bg-gray-950" id="benefits-deliverables">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Benefits */}
            <div>
              <span className="badge-orange mb-3 inline-block">What You Gain</span>
              <h2 className="text-2xl font-bold text-navy-700 dark:text-white mb-6">Key Benefits</h2>
              <ul className="space-y-3">
                {svc.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <FiCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Deliverables */}
            <div>
              <span className="badge-navy mb-3 inline-block">What You Receive</span>
              <h2 className="text-2xl font-bold text-navy-700 dark:text-white mb-6">Deliverables</h2>
              <ul className="space-y-3">
                {svc.deliverables.map((d, i) => (
                  <li key={i} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span className="text-orange-500 font-bold">📄</span>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-10 bg-gray-50 dark:bg-gray-900" id="industries-served">
        <div className="container-custom">
          <span className="badge-navy mb-3 inline-block">Industries</span>
          <h3 className="text-xl font-bold text-navy-700 dark:text-white mb-4">Industries We Serve</h3>
          <div className="flex flex-wrap gap-2">
            {svc.industries.map((ind) => (
              <span key={ind} className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300">
                {ind}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Related Case Study */}
      {svc.relatedCase && (
        <section className="py-10 bg-white dark:bg-gray-950" id="related-case-study">
          <div className="container-custom">
            <span className="badge-orange mb-3 inline-block">Related Case Study</span>
            <Link
              to={`/case-studies/${svc.relatedCase.slug}`}
              className="group flex items-center justify-between p-6 rounded-2xl border-2 border-orange-100 hover:border-orange-500 transition-colors bg-orange-50/50 dark:bg-gray-800 dark:border-gray-700"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-orange-500 mb-1">Read the Case Study</p>
                <h3 className="text-lg font-bold text-navy-700 dark:text-white group-hover:text-orange-500 transition-colors">
                  {svc.relatedCase.title}
                </h3>
              </div>
              <FiArrowRight className="w-6 h-6 text-orange-500 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-12 bg-navy-700 text-center">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to get started with {svc.title}?</h2>
          <p className="text-blue-100 mb-6">Book a free consultation — we'll scope the project and share a no-obligation proposal.</p>
          <Link
            to={`/contact?service=${encodeURIComponent(svc.title)}`}
            className="btn-primary"
            id={`service-book-cta-${slug}`}
          >
            Book a Consultation for {svc.title} <FiArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* FEEDBACK WIDGET — Testing Rubric (Critical) */}
      <FeedbackWidget page={slug} pageTitle={svc.title} />
    </>
  );
}
