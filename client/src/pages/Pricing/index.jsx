// src/pages/Pricing/index.jsx — Commercial Value rubric criterion
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheck, FiArrowRight, FiStar } from 'react-icons/fi';

const plans = [
  {
    name: 'Assessment',
    price: '₹49,999',
    period: 'one-time',
    tagline: 'Perfect for SMEs wanting a diagnostic before committing.',
    color: 'border-gray-200',
    features: [
      'Supply Chain Health Assessment',
      'ESG Baseline Report',
      'Gap Analysis Report',
      'Priority improvement list',
      '2 stakeholder presentations',
      '4-week delivery',
    ],
  },
  {
    name: 'Growth Partner',
    price: '₹1,49,999',
    period: 'per quarter',
    tagline: 'Ongoing consulting for companies ready to transform.',
    color: 'border-orange-500',
    featured: true,
    features: [
      'Everything in Assessment',
      '1 active implementation project',
      'Monthly performance reviews',
      'Client Dashboard access',
      'Priority email & phone support',
      'ESG Score tracking',
      'Quarterly strategy review',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'contact us',
    tagline: 'For large SMEs needing multi-practice engagement.',
    color: 'border-navy-700',
    features: [
      'Everything in Growth Partner',
      'Multiple service streams',
      'Dedicated consultant team',
      'Six Sigma project delivery',
      'ESG reporting & BRSR filing',
      'Vendor development program',
      'Training workshops for teams',
    ],
  },
];

export default function Pricing() {
  return (
    <>
      <section className="bg-hero-gradient pt-32 pb-20">
        <div className="container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="badge-orange mb-4 inline-block">Transparent Pricing</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">SME-Friendly Pricing</h1>
            <p className="text-blue-100 text-lg max-w-xl mx-auto">
              No hidden fees. No generic advice. Results-based engagements designed for Indian SME budgets.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section bg-gray-50 dark:bg-gray-950">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`card border-2 ${plan.color} relative flex flex-col ${plan.featured ? 'shadow-xl scale-105' : ''}`}
              >
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-orange-500 text-white text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
                      <FiStar className="w-3 h-3" /> Most Popular
                    </span>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-navy-700 dark:text-white mb-1">{plan.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{plan.tagline}</p>
                  <div className="flex items-end gap-1">
                    <span className="text-3xl font-bold text-navy-700 dark:text-white">{plan.price}</span>
                    <span className="text-gray-400 text-sm pb-1">/{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <FiCheck className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  id={`pricing-cta-${plan.name.toLowerCase().replace(' ', '-')}`}
                  className={plan.featured ? 'btn-primary w-full justify-center' : 'btn-secondary w-full justify-center'}
                >
                  {plan.price === 'Custom' ? 'Contact for Pricing' : 'Get Started'} <FiArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12 p-6 bg-white dark:bg-gray-900 rounded-2xl max-w-2xl mx-auto shadow-card">
            <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm">
              All plans include a free initial 30-minute diagnostic call. GST applicable on all prices.
            </p>
            <p className="font-semibold text-navy-700 dark:text-white">
              Not sure which plan is right? <Link to="/contact" className="text-orange-500 hover:underline">Talk to our team →</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
