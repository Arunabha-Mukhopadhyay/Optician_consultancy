// src/pages/Blog/BlogPost.jsx — Individual blog post with full content
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiClock, FiUser, FiCalendar } from 'react-icons/fi';

const BLOG_CONTENT = {
  'why-indian-smes-losing-money-inventory': {
    title: 'Why Indian SMEs Are Losing Money on Inventory — And How to Fix It',
    category: 'Inventory', author: 'Kavitha Nair', authorTitle: 'COO & Six Sigma Black Belt', readTime: 6, publishedAt: 'March 15, 2025',
    content: `Most Indian SMEs treat inventory as a storage problem. It isn't — it's a strategic asset that's silently bleeding cash through dead stock, stockouts, and poor forecasting. Here's what we see in almost every SME we engage with.

**The Three Inventory Sins**

**1. The Dead Stock Problem**
Walk into any SME warehouse and you'll find SKUs that haven't moved in 6–18 months. Industry benchmarks suggest dead stock represents 12–28% of inventory value for Indian SMEs. At a ₹10 Cr inventory holding, that's ₹1.2–2.8 Cr locked in non-moving goods — capital that could fund growth, reduce debt, or improve working capital.

Why does this happen? Usually because buying decisions are made by gut feel, historical purchase quantities, and supplier push — not by actual demand data. Without an ABC-XYZ classification system, every SKU is treated identically regardless of its value and movement velocity.

**2. The Stockout Paradox**
Here's the paradox: companies with excess inventory regularly run out of their fastest-moving items. This is because inventory investment is not allocated based on demand — it's based on purchase opportunity, supplier minimum order quantities, and buying habits.

The fix is demand-driven inventory: calculate safety stock statistically for each SKU class, set reorder points, and differentiate replenishment frequency. A-items need daily monitoring; C-items can be reviewed monthly.

**3. The Holding Cost Blindspot**
Most SMEs calculate inventory cost as "purchase price." The real cost of holding inventory — capital cost, warehousing, insurance, obsolescence risk, handling — is 18–35% of inventory value per year. This "holding cost" is rarely captured, making excess inventory decisions look costless when they're actually extremely expensive.

**The Fix: 4-Step Inventory Transformation**

Step 1 — Full inventory audit and ABC-XYZ classification
Step 2 — Demand analysis: 24 months of sales data, seasonality, and trend
Step 3 — Statistical safety stock and reorder point calculation per SKU
Step 4 — ERP/system configuration and team training on new replenishment logic

Companies that implement this systematically typically release 20–40% of inventory as cash within the first 90 days, while simultaneously improving product availability to 97%+.

**Our ESG Connection**
Excess inventory also has an ESG dimension: dead stock that gets written off contributes to waste. Efficient inventory management is not just a financial win — it's a sustainability win too.

**Conclusion**
If your inventory turnover ratio is below 6x (for a product company), you have a problem worth solving. The data, tools, and frameworks exist — the barrier is usually knowing where to start. That's exactly what OptiChain's Inventory Management assessment addresses.`,
  },
  'beginners-guide-six-sigma-dmaic': {
    title: 'A Beginner\'s Guide to Six Sigma DMAIC for Manufacturing',
    category: 'Six Sigma', author: 'OptiChain Team', readTime: 8, publishedAt: 'February 20, 2025',
    content: `Six Sigma is a data-driven methodology that has saved Indian and global manufacturers billions of dollars in defect and waste costs. But many SMEs see it as "complicated" or "only for large companies." That's a misconception we want to address.

**What is Six Sigma?**

Six Sigma targets a defect rate of 3.4 per million opportunities — essentially near-perfect quality. In practice, most Indian manufacturing SMEs operate at 3–4 Sigma (66,807–6,210 DPMO), meaning they have a significant improvement runway.

**The DMAIC Framework Explained**

DMAIC stands for Define → Measure → Analyze → Improve → Control. It's the operational backbone of every Six Sigma project.

**D — Define**
The Define phase answers: "What problem are we solving and why does it matter?" You create a Project Charter that documents: the problem statement, the scope (what's included/excluded), the financial impact, the timeline, and team roles.

A bad Define phase is the #1 cause of Six Sigma project failure. If you can't quantify the financial impact, leadership won't commit.

**M — Measure**
The Measure phase answers: "How bad is the problem, and can we trust our data?" You establish a baseline defect rate using a Measurement System Analysis (MSA) to verify that your measurement system is accurate and consistent.

Key tools: Control charts, process capability analysis (Cp, Cpk), and data collection plans.

**A — Analyze**
The Analyze phase finds the root causes of the problem. Common tools: Fishbone (Ishikawa) diagram, FMEA (Failure Mode and Effects Analysis), correlation analysis, hypothesis testing (t-test, ANOVA).

This is where data replaces gut feel. Most teams discover that the real root cause is completely different from what they assumed.

**I — Improve**
The Improve phase implements solutions. Use design of experiments (DOE) to test solutions before full deployment. Implement pilot runs. Validate that the improvement actually changes the defect rate.

**C — Control**
The Control phase sustains the gains. Without a control plan, improvements revert within 6 months. Tools: Updated SOPs, statistical process control (SPC) charts, control dashboards, and training records.

**Getting Started at Your Company**

You don't need a Black Belt to start. Begin with one high-impact problem, clearly defined, with measurable financial impact. Train 2–3 team members in basic DMAIC tools. Run a 3–4 month project. The results will justify the next one.

OptiChain's Six Sigma team provides Black Belt-led project delivery with internal capability transfer — so you build your own Six Sigma muscle over time.`,
  },
  'esg-reporting-2025-india': {
    title: 'ESG Reporting in 2025: What Indian Companies Need to Know',
    category: 'ESG', author: 'Rohan Desai', authorTitle: 'Head of ESG Practice', readTime: 7, publishedAt: 'January 10, 2025',
    content: `SEBI's BRSR (Business Responsibility and Sustainability Report) mandate is now fully in effect for India's top 1,000 listed companies. But here's the reality: ESG requirements don't stop at your company boundary — they cascade down through your entire supply chain, including the SME suppliers who serve listed companies.

**What is BRSR?**

The Business Responsibility and Sustainability Report is SEBI's ESG disclosure framework for listed Indian companies, mandated from FY2022-23 for top 1,000 companies by market cap. It covers nine principles across Environment, Social, and Governance dimensions.

Key BRSR disclosures include:
- GHG emissions (Scope 1 and Scope 2, with Scope 3 voluntary)
- Energy and water consumption
- Waste generation and management
- Supplier sustainability assessments
- Employee safety and diversity metrics
- Business ethics and governance disclosures

**Why SME Suppliers Need to Pay Attention**

Here's the supply chain cascade effect: when a listed company must disclose Scope 3 emissions (i.e., emissions from their supply chain), they need data from their suppliers. This means procurement teams at large companies are increasingly asking their SME suppliers: "What is your ESG score? Can you provide your sustainability data?"

By 2026, we expect ESG performance to become a supplier qualification criterion — meaning SMEs without ESG data risk losing large customers.

**The OptiChain ESG Score Tool**

We built our proprietary ESG & Supply Chain Health Score Tool specifically to help Indian SMEs establish their ESG baseline quickly and accurately. In 15 minutes, you get:
- ESG Score (0–100)
- Supply Chain Health Score (0–100)
- 3 personalized recommendations

**What Should You Do Now?**

1. Run our free ESG Calculator to establish your baseline
2. Identify your top 3 ESG gaps
3. Build a 12-18 month roadmap to address them
4. Begin collecting data now — because retrospective data collection is expensive

The companies that act early will have a competitive advantage when ESG becomes a procurement qualification criterion. The companies that wait will be scrambling.`,
  },
  'hidden-costs-poor-vendor-development': {
    title: 'The Hidden Costs of Poor Vendor Development',
    category: 'Supply Chain', author: 'Arjun Sharma', authorTitle: 'CEO', readTime: 5, publishedAt: 'December 5, 2024',
    content: `Most Indian SMEs think vendor development means "finding cheaper suppliers." It doesn't. Real vendor development is about building a strategic supplier ecosystem that reduces risk, improves quality, and creates competitive advantage. And poor vendor development has costs that most companies never measure.

**The 5 Hidden Costs of Poor Vendor Management**

**1. Emergency Procurement Premiums**
When a critical vendor fails to deliver, you scramble. Emergency procurement — buying from spot markets, expediting freight, using non-approved vendors — typically costs 20–40% more than planned procurement. We've seen companies spend ₹15-20L per year on emergency procurement they didn't even know was preventable.

**2. Quality Failure Costs**
When vendor quality is poor, your incoming inspection catches some — but not all. The defects that escape inspection become production rework, customer complaints, warranty claims, and in severe cases, product recalls. Quality failure costs are typically 4–8x the cost of prevention.

**3. Single-Source Risk Premiums**
If you have single sources for critical components, you're paying a risk premium whether you know it or not. Vendors know you can't switch easily — and they price accordingly. More importantly, any disruption at a single-source vendor stops your production completely.

**4. Supplier Development Neglect**
Small vendors stay small — and eventually can't supply you at scale. When you grow, your suppliers need to grow with you. Without a formal vendor development program, you'll face capacity crises at the worst possible times.

**5. Audit Non-Compliance**
As your customers (especially large corporations and export markets) demand supplier audits, your inability to audit your own vendors creates a cascade failure. You can't certify your supply chain's quality or ESG performance because you've never measured it.

**The Right Approach**

A structured vendor development program classifies vendors by criticality and spend, conducts formal audits, creates individual improvement plans, and runs quarterly performance reviews. The investment — typically ₹2-5L for a structured program — pays back 8–12x in the first year through reduced emergency procurement, quality failures, and supply disruptions.

OptiChain's Vendor Development engagements have consistently reduced supply chain risk by 50–65% while improving on-time delivery from vendors by 25–35%.`,
  },
  'supply-chain-resilience-post-covid-india': {
    title: 'Supply Chain Resilience: Lessons from Post-COVID Indian Industry',
    category: 'Industry Trends', author: 'OptiChain Team', readTime: 9, publishedAt: 'November 18, 2024',
    content: `COVID-19 exposed every fragility in global and Indian supply chains with brutal efficiency. Port closures, component shortages, freight cost explosions, and demand volatility forced every company to improvise. Five years later, the lessons are clear — but most Indian SMEs still haven't built resilience into their operations.

**What the Crisis Revealed**

The pandemic stress-tested four dimensions of supply chain resilience:

**1. Visibility** — Most companies had zero real-time visibility into their supply chains. They discovered problems when they hit operations, not before. The lesson: without visibility, resilience is impossible.

**2. Diversification** — Over-reliance on single-source suppliers — often from concentrated geographies — created catastrophic supply failures. Companies that had dual or multiple sources recovered 3–6x faster.

**3. Agility** — The ability to switch suppliers, redesign products, or shift to different logistics channels was the defining capability of supply chain survivors. Agility requires pre-qualified alternatives, flexible contracts, and decision-making speed.

**4. Financial Buffers** — Companies with leaner balance sheets couldn't absorb the working capital impact of supply chain disruption. Strategic inventory buffers for critical components are not a cost — they're insurance.

**The China+1 Strategy and Indian SMEs**

India has emerged as a significant beneficiary of the global China+1 diversification strategy. Global companies are actively qualifying Indian suppliers as alternatives. But qualification requires:
- Quality management systems (ISO, IATF)
- ESG compliance documentation
- Digital supply chain capabilities
- Audit-ready processes

Indian SMEs that built these capabilities post-COVID are winning new business. Those that didn't are watching the opportunity pass by.

**Building Resilience: The OptiChain Framework**

We help clients build supply chain resilience across 5 dimensions:

1. **Visibility** — Real-time supply chain dashboards, supplier risk monitoring
2. **Diversification** — Dual-sourcing strategy, geographic diversification
3. **Agility** — Flexible supplier agreements, pre-qualified alternatives
4. **Demand Management** — Scenario planning, demand sensing, S&OP processes
5. **ESG Resilience** — Supply chain sustainability that protects against regulatory disruption

**Conclusion**

The question for Indian SMEs is not whether the next disruption will come — it's whether you'll be ready. The supply chains that survived COVID were those that had built resilience before the crisis hit. Start building yours now.`,
  },
};

export default function BlogPost() {
  const { slug } = useParams();
  const post = BLOG_CONTENT[slug];

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 text-center">
        <div>
          <h2 className="text-xl font-bold text-navy-700 mb-3">Blog Post Not Found</h2>
          <Link to="/blog" className="btn-primary">Back to Blog</Link>
        </div>
      </div>
    );
  }

  const renderContent = (text) => {
    return text.split('\n\n').map((block, i) => {
      if (block.startsWith('**') && block.endsWith('**')) {
        return <h3 key={i} className="text-xl font-bold text-navy-700 dark:text-white mt-8 mb-3">{block.replace(/\*\*/g, '')}</h3>;
      }
      const formatted = block.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      return <p key={i} className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: formatted }} />;
    });
  };

  return (
    <>
      <section className="bg-hero-gradient pt-32 pb-20">
        <div className="container-custom max-w-3xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-6 text-sm">
            <FiArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="badge-orange mb-4 inline-block">{post.category}</span>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{post.title}</h1>
            <div className="flex flex-wrap gap-4 text-blue-200 text-sm">
              <span className="flex items-center gap-1"><FiUser className="w-4 h-4" /> {post.author}{post.authorTitle ? `, ${post.authorTitle}` : ''}</span>
              <span className="flex items-center gap-1"><FiCalendar className="w-4 h-4" /> {post.publishedAt}</span>
              <span className="flex items-center gap-1"><FiClock className="w-4 h-4" /> {post.readTime} min read</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section bg-white dark:bg-gray-950">
        <div className="container-custom max-w-3xl">
          <div className="prose-content">
            {renderContent(post.content)}
          </div>

          <div className="mt-12 p-6 bg-navy-700 rounded-2xl text-center">
            <h3 className="text-xl font-bold text-white mb-2">Ready to implement these insights?</h3>
            <p className="text-blue-100 text-sm mb-4">Book a free consultation with our experts and get a personalized action plan.</p>
            <Link to="/contact" className="btn-primary" id="blog-post-cta">Book Free Consultation</Link>
          </div>
        </div>
      </section>
    </>
  );
}
