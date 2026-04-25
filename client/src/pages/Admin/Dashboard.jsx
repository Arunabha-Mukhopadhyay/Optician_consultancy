// src/pages/Admin/Dashboard.jsx — Live stats from backend
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/axios';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    consultations: 0,
    blogs: 0,
    caseStudies: 0,
    esgResults: 0,
    feedbacks: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projRes, consRes, blogRes, csRes, esgRes, fbRes] = await Promise.allSettled([
          api.get('/projects'),
          api.get('/consultations'),
          api.get('/blogs'),
          api.get('/case-studies'),
          api.get('/esg/results'),
          api.get('/feedback'),
        ]);

        setStats({
          projects: projRes.status === 'fulfilled' ? (projRes.value.data?.projects?.length || 0) : 0,
          consultations: consRes.status === 'fulfilled' ? (consRes.value.data?.total || consRes.value.data?.consultations?.length || 0) : 0,
          blogs: blogRes.status === 'fulfilled' ? (blogRes.value.data?.total || blogRes.value.data?.blogs?.length || 0) : 0,
          caseStudies: csRes.status === 'fulfilled' ? (csRes.value.data?.caseStudies?.length || 0) : 0,
          esgResults: esgRes.status === 'fulfilled' ? (esgRes.value.data?.results?.length || 0) : 0,
          feedbacks: fbRes.status === 'fulfilled' ? (fbRes.value.data?.feedbacks?.length || 0) : 0,
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { label: 'Projects', value: stats.projects, icon: '📋', color: 'text-blue-400', to: '/admin/projects' },
    { label: 'Consultations', value: stats.consultations, icon: '📅', color: 'text-orange-400', to: '/admin/consultations' },
    { label: 'Blog Posts', value: stats.blogs, icon: '✍️', color: 'text-violet-400', to: '/admin/blogs' },
    { label: 'Case Studies', value: stats.caseStudies, icon: '📁', color: 'text-emerald-400', to: '/admin/case-studies' },
    { label: 'ESG Assessments', value: stats.esgResults, icon: '🌱', color: 'text-teal-400', to: '/admin/esg-results' },
    { label: 'Feedback', value: stats.feedbacks, icon: '💬', color: 'text-rose-400', to: '/admin/feedback' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-extrabold text-white mb-2">Admin Dashboard</h1>
      <p className="text-gray-400 mb-10">Platform-wide overview — live data from MongoDB.</p>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mb-12">
            {cards.map((s) => (
              <Link
                key={s.label}
                to={s.to}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center hover:border-orange-500/40 hover:bg-white/10 transition-all"
              >
                <div className="text-3xl mb-2">{s.icon}</div>
                <div className={`text-3xl font-extrabold ${s.color}`}>{s.value}</div>
                <div className="text-gray-400 text-xs mt-1">{s.label}</div>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Link to="/admin/projects" className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-orange-500/40 transition-all flex items-center gap-4">
              <span className="text-3xl">📋</span>
              <div>
                <p className="text-white font-semibold">Manage Projects</p>
                <p className="text-gray-400 text-sm">Create and update client projects</p>
              </div>
              <span className="ml-auto text-gray-500">→</span>
            </Link>
            <Link to="/admin/consultations" className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-orange-500/40 transition-all flex items-center gap-4">
              <span className="text-3xl">📅</span>
              <div>
                <p className="text-white font-semibold">Manage Consultations</p>
                <p className="text-gray-400 text-sm">View, approve, and manage client bookings</p>
              </div>
              <span className="ml-auto text-gray-500">→</span>
            </Link>
            <Link to="/admin/blogs" className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-orange-500/40 transition-all flex items-center gap-4">
              <span className="text-3xl">✍️</span>
              <div>
                <p className="text-white font-semibold">Manage Blogs</p>
                <p className="text-gray-400 text-sm">Publish and edit blog posts</p>
              </div>
              <span className="ml-auto text-gray-500">→</span>
            </Link>
            <Link to="/admin/case-studies" className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-orange-500/40 transition-all flex items-center gap-4">
              <span className="text-3xl">📁</span>
              <div>
                <p className="text-white font-semibold">Manage Case Studies</p>
                <p className="text-gray-400 text-sm">Create and update success stories</p>
              </div>
              <span className="ml-auto text-gray-500">→</span>
            </Link>
            <Link to="/admin/feedback" className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-orange-500/40 transition-all flex items-center gap-4">
              <span className="text-3xl">💬</span>
              <div>
                <p className="text-white font-semibold">Review Feedback</p>
                <p className="text-gray-400 text-sm">Approve or delete client feedback</p>
              </div>
              <span className="ml-auto text-gray-500">→</span>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
