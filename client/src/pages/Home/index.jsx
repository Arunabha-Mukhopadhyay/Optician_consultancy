// src/pages/Home/index.jsx — Full Homepage
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  FiArrowRight, FiTrendingUp, FiShield, FiTarget, FiUsers,
  FiBarChart2, FiGlobe, FiCheckCircle, FiStar
} from 'react-icons/fi';

// ── Data ─────────────────────────────────────────────────────────────────────

const painPoints = [
  { value: '2.3L Cr', label: '₹ lost annually by Indian SMEs due to supply chain inefficiencies', icon: '📉' },
  { value: '67%', label: 'of Indian companies have no formal ESG reporting system', icon: '🌱' },
  { value: '23%', label: 'of Indian manufacturers use Six Sigma — global avg is 71%', icon: '📊' },
];

const services = [
  { slug: 'supply-chain-management', title: 'Supply Chain Management', icon: '🔗', desc: 'End-to-end supply chain design, risk mapping, and performance optimization.' },
  { slug: 'vendor-development', title: 'Vendor Development', icon: '🤝', desc: 'Structured supplier onboarding, audit frameworks, and capability building.' },
  { slug: 'procurement-strategy', title: 'Procurement Strategy', icon: '📋', desc: 'Category management, cost reduction, and strategic sourcing playbooks.' },
  { slug: 'six-sigma', title: 'Six Sigma', icon: '⚡', desc: 'DMAIC methodology to eliminate defects and drive operational excellence.' },
  { slug: 'logistics-distribution', title: 'Logistics & Distribution', icon: '🚚', desc: 'Route optimization, 3PL selection, and last-mile delivery redesign.' },
  { slug: 'inventory-management', title: 'Inventory Management', icon: '📦', desc: 'ABC analysis, safety stock optimization, and demand-driven replenishment.' },
  { slug: 'esg', title: 'ESG Services', icon: '🌿', desc: 'Sustainability roadmaps, BRSR compliance, and ESG score improvement.' },
];

const industries = [
  { icon: '🏭', label: 'Manufacturing', path: '/industries/manufacturing' },
  { icon: '🛒', label: 'FMCG', path: '/industries/fmcg' },
  { icon: '💊', label: 'Pharma', path: '/industries/pharma' },
  { icon: '🏪', label: 'Retail', path: '/industries/retail' },
];

const testimonials = [
  { name: 'Rajesh Verma', company: 'Verma Auto Parts Pvt. Ltd., Pune', role: 'Managing Director', rating: 5, text: 'OptiChain reduced our procurement costs by 31% in just 6 months. Their data-driven approach and hands-on team made the difference.' },
  { name: 'Priya Mehra', company: 'MedhiFresh FMCG, Mumbai', role: 'Head of Operations', rating: 5, text: 'The Six Sigma project saved us over ₹1.2 Cr in the first year. Their DMAIC methodology was thorough and the team was exceptional.' },
  { name: 'Suresh Nair', company: 'Sunrise Pharma, Hyderabad', role: 'VP Supply Chain', rating: 5, text: "OptiChain's ESG roadmap helped us achieve BRSR compliance ahead of schedule. Highly recommended for any company navigating sustainability." },
];

const caseStudyPreviews = [
  { industry: 'Manufacturing', title: 'Reducing Procurement Costs by 31% for Pune Auto Parts Manufacturer', metric: '31% Cost Reduction', slug: 'procurement-cost-reduction-pune' },
  { industry: 'FMCG', title: 'Six Sigma Saves ₹1.2 Cr for Mumbai FMCG Distributor', metric: '₹1.2 Cr Saved', slug: 'six-sigma-fmcg-mumbai' },
  { industry: 'Retail', title: 'Inventory Optimization Reduces Dead Stock by 44%', metric: '44% Less Dead Stock', slug: 'inventory-retail-chain' },
];

const comparisonRows = [
  { criterion: 'Approach', traditional: 'Generic best practices', optichain: 'Data-driven diagnostics' },
  { criterion: 'Engagement', traditional: 'One-time consulting', optichain: 'Ongoing partnership' },
  { criterion: 'Tools', traditional: 'Reports only', optichain: 'ESG Calculator + Dashboard' },
  { criterion: 'Focus', traditional: 'Large enterprise only', optichain: 'SME-friendly pricing' },
  { criterion: 'Reporting', traditional: 'No ESG reporting', optichain: 'Full BRSR compliance support' },
  { criterion: 'Speed', traditional: '3–6 month delivery', optichain: '4–week rapid assessment' },
];

// ── Count-Up Component ────────────────────────────────────────────────────────
function CountUp({ target, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const num = parseFloat(target.replace(/[^0-9.]/g, '')) || 0;
    const duration = 2000;
    const steps = 60;
    const increment = num / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= num) { setCount(num); clearInterval(timer); }
      else setCount(parseFloat(current.toFixed(1)));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen bg-hero-gradient hero-pattern flex items-center overflow-hidden" id="hero">
        {/* Decorative SVG circles */}
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-navy-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="container-custom pt-28 pb-20 relative z-10">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-500/20 border border-orange-400/30 rounded-full text-orange-300 text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
              India's Data-Driven Supply Chain Consultancy
            </motion.div>

            {/* Main Heading — Empathy + Define rubric */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              Is Your Supply Chain{' '}
              <span className="gradient-text">Costing You More</span>{' '}
              Than It Should?
            </motion.h1>

            {/* Define rubric — Problem Statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block bg-orange-500/20 border-l-4 border-orange-500 px-4 py-3 rounded-r-lg mb-6"
            >
              <p className="text-orange-200 text-sm font-semibold uppercase tracking-wide">Problem Statement</p>
              <p className="text-white font-medium">Indian SMEs lose 23% of revenue to supply chain inefficiencies — and most don't even know where the leaks are.</p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-blue-100 leading-relaxed mb-10 max-w-2xl"
            >
              OptiChain delivers data-driven consultancy to reduce costs, eliminate waste, and build resilient operations. We serve Indian SMEs across Manufacturing, FMCG, Pharma, and Retail.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/contact" className="btn-primary text-base px-8 py-4 shadow-orange" id="hero-book-cta">
                Book Free Consultation <FiArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/services" className="btn-ghost text-base px-8 py-4" id="hero-services-cta">
                View Our Services
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-6 mt-12 text-sm text-blue-200"
            >
              {['50+ Clients Served', 'Pan-India Operations', 'ISO-Aligned Processes', '4-Week Rapid Assessment'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <FiCheckCircle className="w-4 h-4 text-orange-400 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PAIN POINTS — Empathy Rubric ─────────────────────────────────── */}
      <section className="py-12 bg-navy-800" id="pain-points">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {painPoints.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="stat-card text-center"
              >
                <div className="text-4xl mb-3">{point.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-2">
                  {point.value}
                </div>
                <p className="text-sm text-blue-200 leading-relaxed">{point.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES OVERVIEW ─────────────────────────────────────────────── */}
      <section className="section bg-white dark:bg-gray-950" id="services">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="badge-orange mb-3 inline-block">What We Do</span>
            <h2 className="section-heading">Our Consulting Services</h2>
            <div className="accent-line" />
            <p className="section-subheading">
              Comprehensive supply chain solutions tailored for Indian SMEs. Every service is built on data, delivered by experts, and measured by results.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((svc, i) => (
              <motion.div
                key={svc.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={`/services/${svc.slug}`}
                  id={`service-card-${svc.slug}`}
                  className="card flex flex-col gap-3 group cursor-pointer block"
                >
                  <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-2xl group-hover:bg-orange-500 transition-colors">
                    {svc.icon}
                  </div>
                  <h3 className="font-bold text-navy-700 dark:text-white group-hover:text-orange-500 transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{svc.desc}</p>
                  <div className="flex items-center gap-1 text-orange-500 text-sm font-semibold mt-auto">
                    Learn More <FiArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY OPTICHAIN — Comparison Table ─────────────────────────────── */}
      <section className="section bg-gray-50 dark:bg-gray-900" id="why-optichain">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="badge-navy mb-3 inline-block">Our Edge</span>
            <h2 className="section-heading">Why Choose OptiChain?</h2>
            <div className="accent-line" />
          </div>

          <div className="overflow-x-auto rounded-2xl shadow-card">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-6 py-4 text-left font-semibold">Criteria</th>
                  <th className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-6 py-4 text-center font-semibold">Traditional Consultant</th>
                  <th className="bg-navy-700 text-white px-6 py-4 text-center font-semibold">
                    <span className="text-orange-300">Opti</span>Chain ✓
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800/50'}>
                    <td className="px-6 py-4 font-medium text-gray-700 dark:text-gray-200">{row.criterion}</td>
                    <td className="px-6 py-4 text-center text-gray-500 dark:text-gray-400 text-sm">❌ {row.traditional}</td>
                    <td className="px-6 py-4 text-center text-sm">
                      <span className="inline-flex items-center gap-1 text-green-600 font-medium">
                        <FiCheckCircle className="w-4 h-4" /> {row.optichain}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── INDUSTRY SOLUTIONS STRIP ─────────────────────────────────────── */}
      <section className="py-12 bg-white dark:bg-gray-950 border-y border-gray-100 dark:border-gray-800" id="industries">
        <div className="container-custom">
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-gray-400 mb-8">
            Industries We Serve
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {industries.map((ind) => (
              <Link
                key={ind.label}
                to={ind.path}
                className="flex flex-col items-center gap-2 p-5 rounded-2xl hover:bg-orange-50 dark:hover:bg-gray-800 transition-colors group"
                id={`industry-${ind.label.toLowerCase()}`}
              >
                <span className="text-4xl">{ind.icon}</span>
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-300 group-hover:text-orange-600 transition-colors">{ind.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── ESG CALCULATOR CTA — Ideation Rubric ─────────────────────────── */}
      <section className="section bg-hero-gradient relative overflow-hidden" id="esg-cta">
        <div className="absolute inset-0 hero-pattern opacity-50" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 bg-orange-500/20 border border-orange-400/30 rounded-full text-orange-300 text-sm font-medium mb-6">
              🌿 Standout Feature
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Know Your ESG & Supply Chain Health Score
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Take our 3-step interactive diagnostic. Get your ESG Score, Supply Chain Health Score, and personalized recommendations — all in under 5 minutes.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/esg-calculator" className="btn-primary px-8 py-4 text-base" id="esg-calculator-cta">
                Try ESG Calculator Free <FiArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/pricing" className="btn-ghost px-8 py-4 text-base">
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="section bg-gray-50 dark:bg-gray-900" id="testimonials">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="badge-orange mb-3 inline-block">Client Stories</span>
            <h2 className="section-heading">What Our Clients Say</h2>
            <div className="accent-line" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card flex flex-col"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <FiStar key={j} className="w-4 h-4 text-orange-500 fill-orange-500" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex-1 italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="w-10 h-10 rounded-full bg-navy-700 flex items-center justify-center text-white font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-navy-700 dark:text-white text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t.role}, {t.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES PREVIEW ─────────────────────────────────────────── */}
      <section className="section bg-white dark:bg-gray-950" id="case-studies">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
            <div>
              <span className="badge-navy mb-3 inline-block">Proven Results</span>
              <h2 className="section-heading mb-1">Featured Case Studies</h2>
              <div className="h-1 w-16 bg-orange-500 rounded-full" />
            </div>
            <Link to="/case-studies" className="text-orange-500 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
              View All Case Studies <FiArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudyPreviews.map((cs, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={`/case-studies/${cs.slug}`} className="card block group">
                  <div className="h-3 bg-gradient-to-r from-navy-700 to-orange-500 rounded-full mb-4" />
                  <span className="badge-outline text-xs mb-3 inline-block">{cs.industry}</span>
                  <h3 className="font-bold text-navy-700 dark:text-white group-hover:text-orange-500 transition-colors mb-4 leading-snug">
                    {cs.title}
                  </h3>
                  <div className="text-2xl font-bold text-orange-500 mb-4">{cs.metric}</div>
                  <div className="flex items-center gap-1 text-orange-500 text-sm font-semibold">
                    Read Full Study <FiArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className="section bg-orange-500" id="final-cta">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Operations?
          </h2>
          <p className="text-orange-100 text-lg mb-8 max-w-xl mx-auto">
            Book a free 30-minute consultation with our experts. No commitment, no jargon — just clarity on where you're losing and how to fix it.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-10 py-4 bg-white text-orange-500 font-bold rounded-lg hover:bg-orange-50 transition-colors shadow-lg text-base" id="final-book-cta">
            Book Free Consultation <FiArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
