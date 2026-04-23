// src/pages/Dashboard/Projects.jsx — Live from GET /api/projects/my
import { useState, useEffect } from 'react';
import api from '../../utils/axios';

const statusColors = {
  planning: 'bg-violet-500/20 text-violet-400',
  ongoing: 'bg-blue-500/20 text-blue-400',
  review: 'bg-amber-500/20 text-amber-400',
  completed: 'bg-emerald-500/20 text-emerald-400',
};

export default function DashboardProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get('/projects/my');
        setProjects(data.projects || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-extrabold text-white mb-2">My Projects</h1>
      <p className="text-gray-400 mb-10">
        {projects.length} project{projects.length !== 1 ? 's' : ''} assigned to your account.
      </p>

      {projects.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
          <p className="text-4xl mb-3">📁</p>
          <p className="text-gray-400">No projects yet.</p>
          <p className="text-gray-500 text-sm mt-1">Your projects will appear here once the OptiChain team assigns them.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((p) => (
            <div key={p._id} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-white font-semibold text-lg">{p.title}</h2>
                  {p.service && <p className="text-orange-400 text-sm mt-0.5">{p.service}</p>}
                  {p.description && <p className="text-gray-400 text-sm mt-1">{p.description}</p>}
                  <div className="flex gap-4 text-xs text-gray-500 mt-2">
                    {p.consultantName && <span>Consultant: <span className="text-gray-300">{p.consultantName}</span></span>}
                    {p.startDate && <span>Started: {new Date(p.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>}
                    {p.nextMeeting && <span>Next Meeting: {new Date(p.nextMeeting).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>}
                  </div>
                </div>
                <span className={`px-4 py-1 rounded-full text-sm font-semibold capitalize ${statusColors[p.status] || statusColors.planning}`}>
                  {p.status}
                </span>
              </div>

              {/* Progress bar */}
              {p.progress != null && (
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Progress</span>
                    <span>{p.progress}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-orange-500 to-amber-400 h-2 rounded-full transition-all"
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Reports */}
              {p.reports?.length > 0 && (
                <div className="border-t border-white/5 pt-3 mt-3">
                  <p className="text-gray-400 text-xs font-semibold mb-2">📊 Reports ({p.reports.length})</p>
                  <div className="flex flex-wrap gap-2">
                    {p.reports.map((r, i) => (
                      <a
                        key={i}
                        href={r.fileUrl || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 text-xs hover:border-orange-500/40 hover:text-white transition-colors"
                      >
                        {r.name || `Report ${i + 1}`}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
