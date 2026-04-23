// src/pages/About/index.jsx — Full About page
import { motion } from 'framer-motion';
import { FiLinkedin } from 'react-icons/fi';

const values = [
  { icon: '🛡️', title: 'Integrity', desc: 'We tell you what you need to hear, not what you want to hear. Honest diagnostics, zero sugarcoating.' },
  { icon: '📊', title: 'Data-Driven', desc: 'Every recommendation is backed by data. No gut-feel consulting, only evidence-based insights.' },
  { icon: '🤝', title: 'Client-First', desc: 'Your operational outcomes are our success metrics. We measure ourselves by your results.' },
  { icon: '🌿', title: 'Sustainability', desc: 'We build ESG into every engagement — because long-term business health requires sustainable operations.' },
  { icon: '💡', title: 'Innovation', desc: 'We bring new tools, frameworks, and thinking to old problems — including our ESG Calculator and dashboards.' },
  { icon: '⭐', title: 'Excellence', desc: 'We hold ourselves to Black Belt standards across every project deliverable we produce.' },
];

const team = [
  { name: 'Arjun Sharma', title: 'CEO & Supply Chain Expert', bio: 'Former McKinsey supply chain consultant with 18 years across FMCG, Auto, and Pharma sectors in India and Southeast Asia. APICS CSCP certified.', initials: 'AS' },
  { name: 'Kavitha Nair', title: 'COO & Six Sigma Black Belt', bio: 'Six Sigma Master Black Belt with 12 years in manufacturing operations. Led 25+ DMAIC projects delivering combined savings of ₹18 Cr across clients.', initials: 'KN' },
  { name: 'Rohan Desai', title: 'Head of ESG Practice', bio: 'ESG and sustainability expert with deep expertise in BRSR compliance, GRI standards, and supply chain decarbonization for listed Indian companies.', initials: 'RD' },
];

const timeline = [
  { year: '2021', event: 'Founded', desc: 'OptiChain Consulting founded in Pune with a mission to solve SME operational inefficiencies.' },
  { year: '2022', event: 'First 10 Clients', desc: 'Rapid growth — 10 SME clients across Manufacturing and FMCG. First Six Sigma project delivers ₹80L savings.' },
  { year: '2023', event: 'ESG Division', desc: 'Launched dedicated ESG practice ahead of SEBI BRSR mandate. ESG Calculator tool built and deployed.' },
  { year: '2024', event: '50+ Clients', desc: 'Crossed 50 active client engagements. Expanded to Hyderabad and Mumbai delivery centers.' },
  { year: '2025', event: 'Pan-India', desc: 'Pan-India operations across 12 cities. Launched Client Dashboard and digital delivery platform.' },
];

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="bg-hero-gradient pt-32 pb-20">
        <div className="container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Who We Are</h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              A team of operational experts, data scientists, and sustainability champions — united by one mission: making Indian SMEs world-class.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section bg-white dark:bg-gray-950" id="our-story">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="badge-orange mb-3 inline-block">Our Story</span>
              <h2 className="section-heading text-left">Built to Solve a Real Problem</h2>
              <div className="h-1 w-16 bg-orange-500 rounded-full mb-6" />
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                OptiChain Consulting was founded in 2021 by a team of supply chain professionals who had spent years watching Indian SMEs struggle with the same preventable problems: excess inventory, unreliable vendors, opaque procurement, and zero ESG strategy. These weren't capability gaps — they were systems gaps. The right frameworks, applied well, could transform any operation.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                We built OptiChain to be the consultancy we wished existed: data-driven, hands-on, affordable for SMEs, and committed to long-term operational improvement — not one-time reports that gather dust. Today, we serve 50+ clients across India with a track record of measurable, auditable results.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[['50+', 'Clients Served'], ['₹18 Cr+', 'Savings Delivered'], ['25+', 'Six Sigma Projects'], ['4 Wks', 'Avg. Time-to-Insight']].map(([val, label]) => (
                <div key={label} className="card text-center">
                  <div className="text-3xl font-bold text-orange-500 mb-1">{val}</div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section bg-gray-50 dark:bg-gray-900" id="vision-mission">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card border-t-4 border-navy-700">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-navy-700 dark:text-white mb-3">Our Vision</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                To be India's most trusted supply chain consultancy for SMEs — driving operational excellence, sustainability, and global competitiveness across Indian industry by 2030.
              </p>
            </div>
            <div className="card border-t-4 border-orange-500">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-navy-700 dark:text-white mb-3">Our Mission</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                To deliver data-driven, measurable supply chain improvements that reduce costs, eliminate waste, ensure ESG compliance, and build resilient operations — making every Indian SME a benchmark for operational excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section bg-white dark:bg-gray-950" id="core-values">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="badge-navy mb-3 inline-block">What We Stand For</span>
            <h2 className="section-heading">Our Core Values</h2>
            <div className="accent-line" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="card">
                <div className="text-3xl mb-3">{v.icon}</div>
                <h3 className="font-bold text-navy-700 dark:text-white mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="section bg-gray-50 dark:bg-gray-900" id="leadership">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="badge-orange mb-3 inline-block">The Team</span>
            <h2 className="section-heading">Leadership Team</h2>
            <div className="accent-line" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="card text-center">
                <div className="w-20 h-20 rounded-full bg-navy-700 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                  {member.initials}
                </div>
                <h3 className="font-bold text-navy-700 dark:text-white mb-1">{member.name}</h3>
                <p className="text-orange-500 text-sm font-medium mb-3">{member.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">{member.bio}</p>
                <button className="flex items-center gap-2 text-navy-700 dark:text-gray-300 text-sm hover:text-orange-500 transition-colors mx-auto">
                  <FiLinkedin className="w-4 h-4" /> LinkedIn Profile
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section bg-white dark:bg-gray-950" id="timeline">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="badge-navy mb-3 inline-block">Our Journey</span>
            <h2 className="section-heading">Company Timeline</h2>
            <div className="accent-line" />
          </div>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-orange-200 dark:bg-gray-700 hidden md:block" />
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className={`flex-1 ${i % 2 !== 0 ? 'md:text-right' : ''}`}>
                    <div className="card inline-block">
                      <p className="text-xs font-bold text-orange-500 mb-1">{item.year}</p>
                      <h3 className="font-bold text-navy-700 dark:text-white mb-1">{item.event}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-navy-700 text-white font-bold text-sm flex items-center justify-center flex-shrink-0 z-10">
                    {item.year.slice(2)}
                  </div>
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
