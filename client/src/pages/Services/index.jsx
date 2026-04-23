// src/pages/Services/index.jsx — Services overview page
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const services = [
  { slug: 'supply-chain-management', title: 'Supply Chain Management', icon: '🔗', desc: 'End-to-end supply chain design, risk mapping, network optimization, and performance dashboards.' },
  { slug: 'vendor-development', title: 'Vendor Development', icon: '🤝', desc: 'Structured supplier onboarding, audit frameworks, scorecards, and vendor capacity building.' },
  { slug: 'procurement-strategy', title: 'Procurement Strategy', icon: '📋', desc: 'Category management, spend analysis, cost reduction initiatives, and strategic sourcing.' },
  { slug: 'six-sigma', title: 'Six Sigma & Lean', icon: '⚡', desc: 'DMAIC projects, process mapping, waste elimination, and Black Belt led improvements.' },
  { slug: 'logistics-distribution', title: 'Logistics & Distribution', icon: '🚚', desc: 'Route optimization, 3PL evaluation, warehouse design, and last-mile delivery.' },
  { slug: 'inventory-management', title: 'Inventory Management', icon: '📦', desc: 'ABC analysis, safety stock, demand forecasting, and ERP-aligned inventory models.' },
  { slug: 'esg', title: 'ESG Services', icon: '🌿', desc: 'BRSR compliance, ESG score improvement, sustainability roadmap, and carbon footprint reduction.' },
];

export default function Services() {
  return (
    <>
      <section className="bg-hero-gradient pt-32 pb-20">
        <div className="container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Consulting Services</h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">Seven specialized service areas built for Indian SMEs ready to compete at scale.</p>
          </motion.div>
        </div>
      </section>
      <section className="section bg-gray-50 dark:bg-gray-950">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc, i) => (
              <motion.div key={svc.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                <Link to={`/services/${svc.slug}`} id={`services-card-${svc.slug}`} className="card flex flex-col gap-4 group h-full">
                  <div className="text-4xl">{svc.icon}</div>
                  <h2 className="text-xl font-bold text-navy-700 dark:text-white group-hover:text-orange-500 transition-colors">{svc.title}</h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed flex-1">{svc.desc}</p>
                  <div className="flex items-center gap-1 text-orange-500 font-semibold text-sm">View Details <FiArrowRight className="w-4 h-4" /></div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-navy-700 text-center">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-white mb-4">Not sure which service fits your need?</h2>
          <p className="text-blue-100 mb-6">Book a free diagnostic call and we'll map the right solution.</p>
          <Link to="/contact" className="btn-primary" id="services-book-cta">Book Free Consultation</Link>
        </div>
      </section>
    </>
  );
}
