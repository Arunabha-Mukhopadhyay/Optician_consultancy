// src/pages/Industries/index.jsx
import { Link } from 'react-router-dom';

const industries = [
  {
    slug: 'retail',
    title: 'Retail & E-Commerce',
    icon: '🛒',
    description: 'Optimise inventory, reduce shrinkage, and elevate customer experience across omnichannel retail environments.',
    color: 'from-orange-500 to-amber-400',
  },
  {
    slug: 'manufacturing',
    title: 'Manufacturing',
    icon: '🏭',
    description: 'Streamline production planning, supplier networks, and lean operations for maximum throughput.',
    color: 'from-blue-600 to-cyan-400',
  },
  {
    slug: 'healthcare',
    title: 'Healthcare & Pharma',
    icon: '🏥',
    description: 'Ensure compliant, resilient supply chains for critical medical goods and pharmaceutical logistics.',
    color: 'from-emerald-500 to-teal-400',
  },
  {
    slug: 'logistics',
    title: 'Logistics & Transportation',
    icon: '🚚',
    description: 'Optimise last-mile delivery, route planning, and warehouse operations at scale.',
    color: 'from-violet-600 to-purple-400',
  },
  {
    slug: 'food-beverage',
    title: 'Food & Beverage',
    icon: '🍽️',
    description: 'Manage perishable supply chains with precision demand forecasting and cold-chain compliance.',
    color: 'from-rose-500 to-pink-400',
  },
  {
    slug: 'technology',
    title: 'Technology & Electronics',
    icon: '💻',
    description: 'Navigate complex component sourcing, rapid product lifecycles, and global distribution challenges.',
    color: 'from-indigo-500 to-blue-400',
  },
];

export default function Industries() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero */}
      <section className="relative py-28 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 via-transparent to-blue-600/20 pointer-events-none" />
        <p className="text-orange-400 font-semibold uppercase tracking-widest text-sm mb-4">Industries We Serve</p>
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
          Deep Expertise Across <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
            Every Sector
          </span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          OptiChain brings specialised supply chain intelligence to the industries that matter most — with proven frameworks tailored to each sector's unique challenges.
        </p>
      </section>

      {/* Industry Cards */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              to={`/industries/${industry.slug}`}
              className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:border-orange-500/50 hover:bg-white/10 transition-all duration-300 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${industry.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              <div className="text-5xl mb-4">{industry.icon}</div>
              <h2 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">
                {industry.title}
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">{industry.description}</p>
              <div className="mt-6 flex items-center text-orange-400 text-sm font-semibold gap-2 group-hover:gap-3 transition-all">
                Explore <span>→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
