// src/components/Footer.jsx — Full footer with links, contact, social
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiLinkedin, FiTwitter, FiYoutube } from 'react-icons/fi';

const services = [
  { label: 'Supply Chain Management', path: '/services/supply-chain-management' },
  { label: 'Vendor Development', path: '/services/vendor-development' },
  { label: 'Procurement Strategy', path: '/services/procurement-strategy' },
  { label: 'Six Sigma', path: '/services/six-sigma' },
  { label: 'Logistics & Distribution', path: '/services/logistics-distribution' },
  { label: 'Inventory Management', path: '/services/inventory-management' },
  { label: 'ESG Services', path: '/services/esg' },
];

const quickLinks = [
  { label: 'About Us', path: '/about' },
  { label: 'Case Studies', path: '/case-studies' },
  { label: 'Blog & Insights', path: '/blog' },
  { label: 'ESG Calculator', path: '/esg-calculator' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Book Consultation', path: '/contact' },
];

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-gray-300">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-1 text-2xl font-bold mb-4">
              <span className="text-white">Opti</span>
              <span className="text-orange-500">Chain</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              "Transforming Operations. Delivering Excellence."
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              India's data-driven supply chain consultancy helping SMEs eliminate waste,
              reduce costs, and build resilient operations.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3 mt-6">
              <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-orange-500 transition-colors">
                <FiLinkedin className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Twitter" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-orange-500 transition-colors">
                <FiTwitter className="w-4 h-4" />
              </a>
              <a href="#" aria-label="YouTube" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-orange-500 transition-colors">
                <FiYoutube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Our Services</h3>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s.path}>
                  <Link to={s.path} className="text-sm text-gray-400 hover:text-orange-400 transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="text-sm text-gray-400 hover:text-orange-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <FiMapPin className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                <span>Baner Road, Pune, Maharashtra 411045, India</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <FiPhone className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <a href="tel:+912012345678" className="hover:text-orange-400 transition-colors">+91 20 1234 5678</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <FiMail className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <a href="mailto:info@optichain.in" className="hover:text-orange-400 transition-colors">info@optichain.in</a>
              </li>
            </ul>
            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-sm text-white font-medium mb-2">Get Supply Chain Insights</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-white/10 text-white placeholder-gray-500 text-sm px-3 py-2 rounded-lg border border-white/20 focus:outline-none focus:border-orange-500"
                />
                <button className="px-3 py-2 bg-orange-500 text-white text-sm rounded-lg hover:bg-orange-600 transition-colors">
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} OptiChain Consulting. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
