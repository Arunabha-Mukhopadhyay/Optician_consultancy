// src/pages/Blog/index.jsx — Blog listing with search + category filter
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiArrowRight, FiClock } from 'react-icons/fi';
import { BlogCardSkeleton } from '../../components/LoadingSkeleton';
import api from '../../utils/axios';

const CATEGORIES = ['All', 'Supply Chain', 'Six Sigma', 'ESG', 'Procurement', 'Industry Trends', 'Logistics', 'Inventory'];

const STATIC_BLOGS = [
  { _id: 'why-indian-smes-losing-money-inventory', slug: 'why-indian-smes-losing-money-inventory', title: 'Why Indian SMEs Are Losing Money on Inventory — And How to Fix It', category: 'Inventory', author: 'Kavitha Nair', readTime: 6, publishedAt: '2025-03-15', excerpt: 'Most Indian SMEs treat inventory as a storage problem. It isn\'t — it\'s a strategic asset that\'s silently bleeding cash through dead stock, stockouts, and poor forecasting.' },
  { _id: 'beginners-guide-six-sigma-dmaic', slug: 'beginners-guide-six-sigma-dmaic', title: 'A Beginner\'s Guide to Six Sigma DMAIC for Manufacturing', category: 'Six Sigma', author: 'OptiChain Team', readTime: 8, publishedAt: '2025-02-20', excerpt: 'Six Sigma sounds intimidating, but the DMAIC framework is one of the most practical problem-solving tools available to Indian manufacturers. Here\'s how to get started.' },
  { _id: 'esg-reporting-2025-india', slug: 'esg-reporting-2025-india', title: 'ESG Reporting in 2025: What Indian Companies Need to Know', category: 'ESG', author: 'Rohan Desai', readTime: 7, publishedAt: '2025-01-10', excerpt: 'SEBI\'s BRSR mandate is here. Whether you\'re a listed company or a supplier, ESG reporting will define your access to capital, customers, and markets in 2025 and beyond.' },
  { _id: 'hidden-costs-poor-vendor-development', slug: 'hidden-costs-poor-vendor-development', title: 'The Hidden Costs of Poor Vendor Development', category: 'Supply Chain', author: 'Arjun Sharma', readTime: 5, publishedAt: '2024-12-05', excerpt: 'Your vendors are your extended factory floor. When they underperform, you pay the price — in delays, quality failures, emergency procurement costs, and customer penalties.' },
  { _id: 'supply-chain-resilience-post-covid-india', slug: 'supply-chain-resilience-post-covid-india', title: 'Supply Chain Resilience: Lessons from Post-COVID Indian Industry', category: 'Industry Trends', author: 'OptiChain Team', readTime: 9, publishedAt: '2024-11-18', excerpt: 'COVID exposed every fragility in global and Indian supply chains. Five years later, the lessons are clear — but most Indian SMEs still haven\'t built them into their operations.' },
];

export default function Blog() {
  const [posts, setPosts] = useState(STATIC_BLOGS);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const params = {};
        if (category !== 'All') params.category = category;
        if (search) params.search = search;
        const { data } = await api.get('/blogs', { params });
        if (data.blogs?.length > 0) setPosts(data.blogs);
      } catch {
        // fallback to static
      } finally {
        setLoading(false);
      }
    };
    const debounce = setTimeout(fetchPosts, 300);
    return () => clearTimeout(debounce);
  }, [category, search]);

  const filtered = posts.filter((p) => {
    const matchCat = category === 'All' || p.category === category;
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      <section className="bg-hero-gradient pt-32 pb-20">
        <div className="container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="badge-orange mb-4 inline-block">Knowledge Hub</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Blog & Insights</h1>
            <p className="text-blue-100 text-lg max-w-xl mx-auto">Practical supply chain knowledge for Indian business leaders — written by practitioners, not theorists.</p>
          </motion.div>
        </div>
      </section>

      <section className="section bg-gray-50 dark:bg-gray-950">
        <div className="container-custom">
          {/* Search + Filter */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="blog-search"
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  id={`blog-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    category === cat ? 'bg-navy-700 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-orange-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3].map(i => <BlogCardSkeleton key={i} />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post, i) => (
                <motion.div key={post._id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                  <Link to={`/blog/${post.slug}`} className="card group flex flex-col h-full">
                    <div className="h-40 bg-gradient-to-br from-navy-700 to-navy-900 rounded-xl mb-4 flex items-center justify-center">
                      <span className="text-4xl">{
                        { 'Supply Chain': '🔗', 'Six Sigma': '⚡', 'ESG': '🌿', 'Procurement': '📋', 'Industry Trends': '📈', 'Logistics': '🚚', 'Inventory': '📦' }[post.category] || '📝'
                      }</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="badge-orange text-xs">{post.category}</span>
                      <div className="flex items-center gap-1 text-gray-400 text-xs">
                        <FiClock className="w-3 h-3" /> {post.readTime} min read
                      </div>
                    </div>
                    <h3 className="font-bold text-navy-700 dark:text-white group-hover:text-orange-500 transition-colors leading-snug mb-3 flex-1">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-3">
                      <span className="text-xs text-gray-400">{post.author}</span>
                      <span className="flex items-center gap-1 text-orange-500 text-xs font-semibold">
                        Read More <FiArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
