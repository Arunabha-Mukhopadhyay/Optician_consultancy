// src/pages/CaseStudies/index.jsx — Filterable case studies listing
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiFilter } from 'react-icons/fi';
import api from '../../utils/axios';
import { CardSkeleton } from '../../components/LoadingSkeleton';

// Static fallback data if API not connected
const STATIC_CASE_STUDIES = [
  { _id: 'procurement-cost-reduction-pune', slug: 'procurement-cost-reduction-pune', title: 'Reducing Procurement Costs by 31% for a Pune Auto Parts Manufacturer', industry: 'Manufacturing', service: 'Procurement Strategy', metrics: [{ label: 'Cost Reduction', value: '31%' }, { label: 'Timeline', value: '6 months' }, { label: 'Savings', value: '₹68L' }], problem: 'Uncontrolled procurement spend across 120+ vendors with no category management, leading to price volatility and supply disruptions.' },
  { _id: 'six-sigma-fmcg-mumbai', slug: 'six-sigma-fmcg-mumbai', title: 'Six Sigma Implementation Saves ₹1.2 Cr for FMCG Distributor in Mumbai', industry: 'FMCG', service: 'Six Sigma', metrics: [{ label: 'Savings', value: '₹1.2 Cr' }, { label: 'Defect Reduction', value: '78%' }, { label: 'Duration', value: '5 months' }], problem: 'High rejection rates (8.4%) in distribution operations causing significant returns, customer complaints, and revenue loss.' },
  { _id: 'esg-pharma-compliance', slug: 'esg-pharma-compliance', title: 'ESG Compliance Roadmap for a Mid-Size Pharma Company in Hyderabad', industry: 'Pharma', service: 'ESG Services', metrics: [{ label: 'ESG Score', value: '+38 pts' }, { label: 'BRSR Ready', value: 'Yes' }, { label: 'Duration', value: '4 months' }], problem: 'Upcoming SEBI BRSR mandate with zero ESG baseline, no reporting framework, and supply chain sustainability gaps.' },
  { _id: 'inventory-retail-chain', slug: 'inventory-retail-chain', title: 'Inventory Optimization Reduces Dead Stock by 44% for Retail Chain', industry: 'Retail', service: 'Inventory Management', metrics: [{ label: 'Dead Stock', value: '-44%' }, { label: 'Cash Released', value: '₹42L' }, { label: 'Service Level', value: '97.3%' }], problem: 'Dead stock amounting to ₹95L locked in warehouses, stockouts of fast-moving SKUs, and poor demand forecasting.' },
  { _id: 'vendor-development-auto-oem', slug: 'vendor-development-auto-oem', title: 'End-to-End Vendor Development for a Tier-2 Auto OEM in Pune', industry: 'Manufacturing', service: 'Vendor Development', metrics: [{ label: 'Vendor Risk', value: '-60%' }, { label: 'OTD Improvement', value: '+28%' }, { label: 'Vendors Audited', value: '45' }], problem: 'No formal vendor qualification process, single-source dependencies, and frequent delivery failures impacting production schedules.' },
];

const INDUSTRIES = ['All', 'Manufacturing', 'FMCG', 'Pharma', 'Retail'];
const SERVICES = ['All', 'Supply Chain Management', 'Vendor Development', 'Procurement Strategy', 'Six Sigma', 'Logistics & Distribution', 'Inventory Management', 'ESG Services'];

export default function CaseStudies() {
  const [data, setData] = useState(STATIC_CASE_STUDIES);
  const [loading, setLoading] = useState(false);
  const [industryFilter, setIndustryFilter] = useState('All');
  const [serviceFilter, setServiceFilter] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const params = {};
        if (industryFilter !== 'All') params.industry = industryFilter;
        if (serviceFilter !== 'All') params.service = serviceFilter;
        const { data: res } = await api.get('/case-studies', { params });
        if (res.caseStudies?.length > 0) setData(res.caseStudies);
      } catch {
        // fallback to static data
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [industryFilter, serviceFilter]);

  const filtered = data.filter((cs) => {
    return (industryFilter === 'All' || cs.industry === industryFilter) &&
           (serviceFilter === 'All' || cs.service === serviceFilter);
  });

  return (
    <>
      <section className="bg-hero-gradient pt-32 pb-20">
        <div className="container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="badge-orange mb-4 inline-block">Original Work</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Case Studies</h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">Real problems. Data-driven approaches. Measurable results. Every case study is an original simulation based on common Indian SME challenges.</p>
          </motion.div>
        </div>
      </section>

      <section className="section bg-gray-50 dark:bg-gray-950">
        <div className="container-custom">
          {/* Filters */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 mb-8 shadow-card" id="case-study-filters">
            <div className="flex flex-wrap gap-4 items-start">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400">
                <FiFilter className="w-4 h-4" /> Filter by:
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Industry</p>
                <div className="flex flex-wrap gap-2">
                  {INDUSTRIES.map((ind) => (
                    <button key={ind} onClick={() => setIndustryFilter(ind)} id={`filter-industry-${ind.toLowerCase()}`}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${industryFilter === ind ? 'bg-navy-700 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-orange-100'}`}>
                      {ind}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Service</p>
                <div className="flex flex-wrap gap-2">
                  {SERVICES.map((svc) => (
                    <button key={svc} onClick={() => setServiceFilter(svc)} id={`filter-service-${svc.toLowerCase().replace(/\s+/g, '-')}`}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${serviceFilter === svc ? 'bg-orange-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-orange-100'}`}>
                      {svc}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3].map(i => <CardSkeleton key={i} />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((cs, i) => (
                <motion.div key={cs._id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                  <Link to={`/case-studies/${cs.slug || cs._id}`} className="card group flex flex-col h-full">
                    <div className="h-2 bg-gradient-to-r from-navy-700 to-orange-500 rounded-full mb-4" />
                    <div className="flex gap-2 flex-wrap mb-3">
                      <span className="badge-navy text-xs">{cs.industry}</span>
                      <span className="badge-outline text-xs">{cs.service}</span>
                    </div>
                    <h3 className="font-bold text-navy-700 dark:text-white group-hover:text-orange-500 transition-colors leading-snug mb-4 flex-1">
                      {cs.title}
                    </h3>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {cs.metrics?.slice(0, 3).map((m, j) => (
                        <div key={j} className="text-center p-2 bg-orange-50 dark:bg-gray-800 rounded-lg">
                          <p className="text-xs font-bold text-orange-500">{m.value}</p>
                          <p className="text-xs text-gray-400 leading-tight">{m.label}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-orange-500 text-sm font-semibold">
                      Read Case Study <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {filtered.length === 0 && !loading && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">No case studies match your filters.</p>
              <button onClick={() => { setIndustryFilter('All'); setServiceFilter('All'); }} className="btn-secondary mt-4">Clear Filters</button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
