// src/pages/Dashboard/ESGHistory.jsx — Live from GET /api/esg/my-results
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/axios';

const gradeFromScore = (score) => {
  if (score >= 85) return { grade: 'A', color: 'text-emerald-400' };
  if (score >= 70) return { grade: 'B', color: 'text-blue-400' };
  if (score >= 55) return { grade: 'C', color: 'text-amber-400' };
  return { grade: 'D', color: 'text-red-400' };
};

export default function DashboardESG() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get('/esg/my-results');
        setResults(data.results || []);
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
      <h1 className="text-3xl font-extrabold text-white mb-2">ESG Score History</h1>
      <p className="text-gray-400 mb-10">
        {results.length} assessment{results.length !== 1 ? 's' : ''} submitted.
        {results.length > 1 && ' Track how your ESG performance has evolved over time.'}
      </p>

      {results.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
          <p className="text-4xl mb-3">🌱</p>
          <p className="text-gray-400">No ESG assessments yet.</p>
          <p className="text-gray-500 text-sm mt-2">
            <Link to="/esg-calculator" className="text-orange-400 hover:underline">Take your first ESG assessment →</Link>
          </p>
        </div>
      ) : (
        <>
          {/* Score trend summary */}
          {results.length >= 2 && (() => {
            const latest = Math.round(results[0].overallIndex || results[0].esgScore || 0);
            const prev = Math.round(results[1].overallIndex || results[1].esgScore || 0);
            const diff = latest - prev;
            return (
              <div className={`rounded-2xl border p-5 mb-8 flex items-center gap-4 ${
                diff >= 0 ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-red-500/30 bg-red-500/5'
              }`}>
                <span className="text-3xl">{diff >= 0 ? '📈' : '📉'}</span>
                <div>
                  <p className={`font-semibold ${diff >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {diff >= 0 ? '+' : ''}{diff} points since last assessment
                  </p>
                  <p className="text-gray-400 text-sm">Latest: {latest}/100 · Previous: {prev}/100</p>
                </div>
              </div>
            );
          })()}

          <div className="space-y-4">
            {results.map((r) => {
              const overall = Math.round(r.overallIndex || r.esgScore || 0);
              const { grade, color } = gradeFromScore(overall);

              return (
                <div key={r._id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-6">
                  <div className="flex items-center gap-5">
                    <span className="text-3xl">🌱</span>
                    <div>
                      <h2 className="text-white font-semibold">{r.companyName || 'My Company'}</h2>
                      <p className="text-gray-500 text-sm mt-0.5">
                        {r.industry && <span className="text-orange-400">{r.industry} · </span>}
                        {new Date(r.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                      <div className="flex gap-4 mt-2 text-xs text-gray-400">
                        {r.esgScore != null && <span>ESG: <span className="text-white font-semibold">{Math.round(r.esgScore)}</span></span>}
                        {r.scHealthScore != null && <span>SC Health: <span className="text-white font-semibold">{Math.round(r.scHealthScore)}</span></span>}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-3xl font-extrabold ${color}`}>{grade}</div>
                    <div className="text-gray-400 text-sm">Score: {overall}/100</div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      <div className="mt-8 text-center">
        <Link
          to="/esg-calculator"
          className="inline-block bg-gradient-to-r from-teal-500 to-emerald-400 text-white font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform"
        >
          Take New ESG Assessment →
        </Link>
      </div>
    </div>
  );
}
