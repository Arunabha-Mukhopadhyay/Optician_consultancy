// src/components/Navbar.jsx — Sticky navbar with dark/light toggle
import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import {
  FiMenu, FiX, FiSun, FiMoon, FiChevronDown,
  FiUser, FiLogOut, FiSettings
} from 'react-icons/fi';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  {
    label: 'Services', path: '/services',
    children: [
      { label: 'Supply Chain Management', path: '/services/supply-chain-management' },
      { label: 'Vendor Development', path: '/services/vendor-development' },
      { label: 'Procurement Strategy', path: '/services/procurement-strategy' },
      { label: 'Six Sigma', path: '/services/six-sigma' },
      { label: 'Logistics & Distribution', path: '/services/logistics-distribution' },
      { label: 'Inventory Management', path: '/services/inventory-management' },
      { label: 'ESG Services', path: '/services/esg' },
    ],
  },
  { label: 'Industries', path: '/industries' },
  { label: 'Case Studies', path: '/case-studies' },
  { label: 'Blog', path: '/blog' },
  { label: 'ESG Tool', path: '/esg-calculator' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const savedDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDark);
    if (savedDark) document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDark = () => {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem('darkMode', next);
    document.documentElement.classList.toggle('dark', next);
  };

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    navigate('/');
    setUserMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled
        ? 'bg-white dark:bg-gray-950 shadow-md'
        : 'bg-transparent'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-1 text-xl md:text-2xl font-bold">
            <span className={`transition-colors ${isScrolled ? 'text-navy-700' : 'text-white'} dark:text-white`}>
              Opti
            </span>
            <span className="text-orange-500">Chain</span>
            <span className={`text-xs font-normal ml-1 hidden sm:block transition-colors ${isScrolled ? 'text-gray-500' : 'text-white/70'}`}>
              Consulting
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label} className="relative group">
                  <button
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isScrolled ? 'text-gray-700 hover:text-navy-700' : 'text-white/90 hover:text-white'
                    } dark:text-gray-200`}
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    {link.label}
                    <FiChevronDown className="w-3 h-3" />
                  </button>
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 w-64 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 py-2 mt-1"
                        onMouseEnter={() => setServicesOpen(true)}
                        onMouseLeave={() => setServicesOpen(false)}
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-gray-800 transition-colors"
                            onClick={() => setServicesOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-orange-500 font-semibold'
                        : isScrolled
                          ? 'text-gray-700 hover:text-navy-700'
                          : 'text-white/90 hover:text-white'
                    } dark:text-gray-200`
                  }
                >
                  {link.label}
                </NavLink>
              )
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDark}
              className={`p-2 rounded-lg transition-colors ${
                isScrolled
                  ? 'text-gray-600 hover:bg-gray-100'
                  : 'text-white/80 hover:bg-white/10'
              } dark:text-gray-300`}
              aria-label="Toggle dark mode"
              id="dark-mode-toggle"
            >
              {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </button>

            {/* Auth */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                  }`}
                  id="user-menu-btn"
                >
                  <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold">
                    {user?.name?.[0]?.toUpperCase()}
                  </div>
                  <span className="hidden sm:block">{user?.name?.split(' ')[0]}</span>
                  <FiChevronDown className="w-3 h-3" />
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 py-2"
                    >
                      <Link to={isAdmin ? '/admin/dashboard' : '/dashboard'} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-gray-800" onClick={() => setUserMenuOpen(false)}>
                        <FiUser className="w-4 h-4" /> Dashboard
                      </Link>
                      <button onClick={handleLogout} className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-gray-800">
                        <FiLogOut className="w-4 h-4" /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/login" className={`hidden sm:block px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isScrolled ? 'text-gray-700 hover:text-navy-700' : 'text-white/90 hover:text-white'
              }`}>
                Login
              </Link>
            )}

            {/* Book CTA */}
            <Link
              to="/contact"
              className="hidden sm:block btn-primary text-sm py-2 px-4"
              id="book-consultation-cta"
            >
              Book Free Consultation
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 shadow-lg overflow-hidden"
          >
            <div className="container-custom py-4 space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path || link.label}
                  to={link.path}
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-lg text-sm font-medium ${
                      isActive ? 'bg-orange-50 text-orange-600' : 'text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800'
                    }`
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-2">
                {isAuthenticated ? (
                  <button onClick={handleLogout} className="text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg">
                    Logout
                  </button>
                ) : (
                  <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg" onClick={() => setMobileOpen(false)}>
                    Login / Register
                  </Link>
                )}
                <Link to="/contact" className="btn-primary text-sm text-center" onClick={() => setMobileOpen(false)}>
                  Book Free Consultation
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
