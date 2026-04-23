// src/pages/NotFound/index.jsx — 404 page
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiHome } from 'react-icons/fi';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center pt-20 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-lg px-4"
      >
        <div className="text-8xl font-bold text-navy-700 dark:text-white mb-2">
          4<span className="text-orange-500">0</span>4
        </div>
        <div className="text-6xl mb-6">🔍</div>
        <h1 className="text-2xl font-bold text-navy-700 dark:text-white mb-3">Page Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          This page seems to have gone missing from our supply chain. Let's get you back on track.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/" className="btn-primary" id="notfound-home-btn">
            <FiHome className="w-5 h-5" /> Go Back Home
          </Link>
          <Link to="/contact" className="btn-secondary" id="notfound-contact-btn">
            Contact Support
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 max-w-xs mx-auto">
          {[['Services', '/services'], ['Case Studies', '/case-studies'], ['Blog', '/blog'], ['ESG Tool', '/esg-calculator']].map(([label, path]) => (
            <Link key={path} to={path} className="py-2 px-3 bg-white dark:bg-gray-800 rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:text-orange-500 transition-colors border border-gray-100 dark:border-gray-700">
              {label}
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
