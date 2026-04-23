// src/pages/Industries/IndustryDetail.jsx
import { useParams, Link } from 'react-router-dom';

const industryData = {
  retail: {
    title: 'Retail & E-Commerce',
    icon: '🛒',
    tagline: 'Smarter shelves. Faster fulfilment. Loyal customers.',
    description:
      'From fast-fashion to grocery, retail supply chains demand speed, accuracy, and adaptability. OptiChain helps retailers reduce overstock, improve demand forecasting, and build resilient omnichannel logistics.',
    challenges: ['Stockouts & overstock', 'Seasonal demand spikes', 'Returns management', 'Last-mile cost pressure'],
    solutions: ['AI demand forecasting', 'Omnichannel inventory sync', 'Returns optimisation', 'Supplier risk scoring'],
    color: 'from-orange-500 to-amber-400',
  },
  manufacturing: {
    title: 'Manufacturing',
    icon: '🏭',
    tagline: 'Lean production. Resilient supply networks.',
    description:
      'Modern manufacturing requires tightly integrated supplier networks and data-driven production planning. We help manufacturers reduce lead times, improve OEE, and build multi-tier supplier visibility.',
    challenges: ['Supplier delays', 'Production downtime', 'Inventory buffers', 'Quality compliance'],
    solutions: ['Supplier risk dashboards', 'Predictive maintenance signals', 'JIT inventory planning', 'ESG compliance tracking'],
    color: 'from-blue-600 to-cyan-400',
  },
  healthcare: {
    title: 'Healthcare & Pharma',
    icon: '🏥',
    tagline: 'Reliable supply chains that save lives.',
    description:
      'Healthcare supply chains operate under zero-tolerance conditions. OptiChain ensures compliant, traceable, and resilient logistics for medical devices, pharmaceuticals, and hospital procurement.',
    challenges: ['Cold-chain compliance', 'Drug shortages', 'Regulatory traceability', 'Expiry management'],
    solutions: ['Cold-chain IoT monitoring', 'Shortage early-warning', 'Audit-ready traceability', 'Expiry-based reorder logic'],
    color: 'from-emerald-500 to-teal-400',
  },
  logistics: {
    title: 'Logistics & Transportation',
    icon: '🚚',
    tagline: 'Every mile optimised. Every delivery on time.',
    description:
      'Logistics companies face mounting pressure from e-commerce growth and rising fuel costs. OptiChain delivers route optimisation, warehouse efficiency gains, and carrier performance analytics.',
    challenges: ['Route inefficiency', 'Carrier cost volatility', 'Warehouse throughput', 'SLA breaches'],
    solutions: ['Dynamic route optimisation', 'Carrier benchmarking', 'WMS integration', 'SLA alerting & analytics'],
    color: 'from-violet-600 to-purple-400',
  },
  'food-beverage': {
    title: 'Food & Beverage',
    icon: '🍽️',
    tagline: 'From farm to fork — with zero waste.',
    description:
      'Perishable goods require precision planning and cold-chain discipline. We help F&B companies reduce waste, improve forecast accuracy, and maintain compliance across complex supplier networks.',
    challenges: ['Spoilage & waste', 'Seasonal supply volatility', 'Food safety compliance', 'Short shelf-life SKUs'],
    solutions: ['Freshness-aware reordering', 'Seasonal demand models', 'FSMA compliance tooling', 'Expiry & rotation analytics'],
    color: 'from-rose-500 to-pink-400',
  },
  technology: {
    title: 'Technology & Electronics',
    icon: '💻',
    tagline: 'Complex components. Global scale. Zero disruption.',
    description:
      'Tech supply chains are among the most complex — spanning hundreds of components across multiple continents. OptiChain helps manage component risk, reduce time-to-market, and improve BOM visibility.',
    challenges: ['Component shortages', 'Long lead times', 'Product lifecycle pressure', 'Multi-tier BOM complexity'],
    solutions: ['Component risk scoring', 'Alternate sourcing suggestions', 'PLM-integrated planning', 'Multi-tier BOM visibility'],
    color: 'from-indigo-500 to-blue-400',
  },
};

export default function IndustryDetail() {
  const { slug } = useParams();
  const industry = industryData[slug];

  if (!industry) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Industry Not Found</h1>
          <Link to="/industries" className="text-orange-400 hover:underline">← Back to Industries</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero */}
      <section className="relative py-28 px-6 text-center overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${industry.color} opacity-10 pointer-events-none`} />
        <Link to="/industries" className="inline-flex items-center gap-2 text-gray-400 hover:text-orange-400 text-sm mb-8 transition-colors">
          ← Back to Industries
        </Link>
        <div className="text-6xl mb-4">{industry.icon}</div>
        <h1 className="text-5xl font-extrabold mb-4">{industry.title}</h1>
        <p className="text-orange-400 text-lg font-medium mb-6">{industry.tagline}</p>
        <p className="text-gray-400 max-w-2xl mx-auto text-base leading-relaxed">{industry.description}</p>
      </section>

      {/* Challenges & Solutions */}
      <section className="max-w-6xl mx-auto px-6 pb-24 grid md:grid-cols-2 gap-10">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-xl font-bold text-white mb-6">Key Challenges</h2>
          <ul className="space-y-3">
            {industry.challenges.map((c) => (
              <li key={c} className="flex items-center gap-3 text-gray-300">
                <span className="text-red-400 text-lg">✗</span> {c}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-orange-500/30 bg-orange-500/5 p-8">
          <h2 className="text-xl font-bold text-white mb-6">OptiChain Solutions</h2>
          <ul className="space-y-3">
            {industry.solutions.map((s) => (
              <li key={s} className="flex items-center gap-3 text-gray-300">
                <span className="text-orange-400 text-lg">✓</span> {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center pb-24 px-6">
        <Link
          to="/contact"
          className="inline-block bg-gradient-to-r from-orange-500 to-amber-400 text-white font-bold px-10 py-4 rounded-full hover:scale-105 transition-transform"
        >
          Book a Free Consultation →
        </Link>
      </section>
    </div>
  );
}
