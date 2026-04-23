// src/pages/Admin/EsgResults.jsx — Live from GET /api/esg/results
import { useState, useEffect } from 'react';
import api from '../../utils/axios';

const gradeFromScore = (score) => {
  if (score >= 85) return { grade: 'A', color: 'text-emerald-400' };
  if (score >= 70) return { grade: 'B', color: 'text-blue-400' };
  if (score >= 55) return { grade: 'C', color: 'text-amber-400' };
  return { grade: 'D', color: 'text-red-400' };
};

export default function AdminEsgResults() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get('/esg/results');
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
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-extrabold text-white mb-2">ESG Assessment Results</h1>
      <p className="text-gray-400 mb-10">
        {results.length} ESG assessment{results.length !== 1 ? 's' : ''} submitted by clients.
      </p>

      {results.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
          <p className="text-4xl mb-3">🌱</p>
          <p className="text-gray-400">No ESG results yet.</p>
          <p className="text-gray-500 text-sm mt-1">Results appear here when clients use the ESG Calculator.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {results.map((r) => {
            const overall = r.overallIndex || r.esgScore || 0;
            const { grade, color } = gradeFromScore(overall);

            return (
              <div key={r._id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-center gap-5">
                  <span className="text-3xl">🌱</span>
                  <div>
                    <h2 className="text-white font-semibold">{r.companyName || 'Unknown Company'}</h2>
                    <p className="text-gray-500 text-sm mt-0.5">
                      {r.industry && <span className="text-orange-400">{r.industry}</span>}
                      {r.userEmail && <> · {r.userEmail}</>}
                      {' · '}
                      {new Date(r.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                    <div className="flex gap-4 mt-2 text-xs text-gray-400">
                      {r.esgScore != null && <span>ESG: <span className="text-white font-semibold">{Math.round(r.esgScore)}</span></span>}
                      {r.scHealthScore != null && <span>SC Health: <span className="text-white font-semibold">{Math.round(r.scHealthScore)}</span></span>}
                      {r.employeeCount && <span>Employees: {r.employeeCount}</span>}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-3xl font-extrabold ${color}`}>{grade}</div>
                  <div className="text-gray-400 text-sm">Score: {Math.round(overall)}/100</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
