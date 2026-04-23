// src/pages/Dashboard/Reports.jsx — Aggregated reports from all projects
import { useState, useEffect } from 'react';
import api from '../../utils/axios';

export default function DashboardReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get('/projects/my');
        const projects = data.projects || [];

        // Flatten reports from all projects
        const allReports = [];
        projects.forEach((p) => {
          (p.reports || []).forEach((r) => {
            allReports.push({
              ...r,
              projectTitle: p.title,
              projectService: p.service,
            });
          });
        });

        // Sort by newest first
        allReports.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
        setReports(allReports);
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
      <h1 className="text-3xl font-extrabold text-white mb-2">Reports</h1>
      <p className="text-gray-400 mb-10">
        {reports.length} report{reports.length !== 1 ? 's' : ''} available from your projects.
      </p>

      {reports.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
          <p className="text-4xl mb-3">📊</p>
          <p className="text-gray-400">No reports yet.</p>
          <p className="text-gray-500 text-sm mt-1">Reports will be uploaded by the OptiChain team as your projects progress.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reports.map((r, i) => (
            <div key={r._id || i} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-4">
                <span className="text-3xl">📊</span>
                <div>
                  <h2 className="text-white font-semibold">{r.name || `Report ${i + 1}`}</h2>
                  <p className="text-gray-500 text-sm mt-0.5">
                    {r.projectTitle && <span className="text-orange-400">{r.projectTitle}</span>}
                    {r.projectService && <> · {r.projectService}</>}
                    {r.uploadedAt && <> · {new Date(r.uploadedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</>}
                  </p>
                </div>
              </div>
              {r.fileUrl ? (
                <a
                  href={r.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 rounded-full bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold transition-colors"
                >
                  Download
                </a>
              ) : (
                <span className="text-gray-500 text-sm px-4">No file</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
