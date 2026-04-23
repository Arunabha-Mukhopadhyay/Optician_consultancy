// src/pages/Dashboard/index.jsx — Live stats from backend
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/axios';

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ projects: 0, consultations: 0, reports: 0, esgScore: '—' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projRes, consRes, esgRes] = await Promise.allSettled([
          api.get('/projects/my'),
          api.get('/consultations/my'),
          api.get('/esg/my-results'),
        ]);

        const projects = projRes.status === 'fulfilled' ? (projRes.value.data?.projects || []) : [];
        const consultations = consRes.status === 'fulfilled' ? (consRes.value.data?.consultations || []) : [];
        const esgResults = esgRes.status === 'fulfilled' ? (esgRes.value.data?.results || []) : [];

        // Count total reports across all projects
        const totalReports = projects.reduce((acc, p) => acc + (p.reports?.length || 0), 0);

        // Latest ESG score
        const latestEsg = esgResults.length > 0 ? Math.round(esgResults[0].overallIndex || esgResults[0].esgScore || 0) : '—';

        setStats({
          projects: projects.length,
          consultations: consultations.length,
          reports: totalReports,
          esgScore: latestEsg,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { label: 'Active Projects', value: stats.projects, icon: '📁', color: 'text-blue-400' },
    { label: 'Consultations', value: stats.consultations, icon: '📅', color: 'text-orange-400' },
    { label: 'Reports', value: stats.reports, icon: '📊', color: 'text-emerald-400' },
    { label: 'ESG Score', value: stats.esgScore, icon: '🌱', color: 'text-teal-400' },
  ];

  const quickLinks = [
    { to: '/dashboard/projects', label: 'My Projects', icon: '📁', desc: 'Track active and past projects' },
    { to: '/dashboard/consultations', label: 'Consultations', icon: '📅', desc: 'View your booked sessions' },
    { to: '/dashboard/reports', label: 'Reports', icon: '📊', desc: 'Download generated reports' },
    { to: '/dashboard/esg', label: 'ESG History', icon: '🌱', desc: 'Review your ESG assessments' },
    { to: '/feedback', label: 'Give Feedback', icon: '💬', desc: 'Share your experience' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-extrabold text-white mb-2">
        Welcome back, {user?.name?.split(' ')[0] || 'there'} 👋
      </h1>
      <p className="text-gray-400 mb-10">Here's an overview of your OptiChain activity.</p>

      {/* Stats */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {cards.map((s) => (
            <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className={`text-3xl font-extrabold ${s.color}`}>{s.value}</div>
              <div className="text-gray-400 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Links */}
      <h2 className="text-xl font-bold text-white mb-6">Quick Access</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {quickLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-orange-500/50 hover:bg-white/10 transition-all"
          >
            <span className="text-2xl">{link.icon}</span>
            <div>
              <span className="text-white font-semibold block">{link.label}</span>
              <span className="text-gray-500 text-xs">{link.desc}</span>
            </div>
            <span className="ml-auto text-gray-500">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
