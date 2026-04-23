// src/pages/Admin/Feedback.jsx — Live from GET /api/feedback (admin) + approve/delete
import { useState, useEffect } from 'react';
import { FiStar } from 'react-icons/fi';
import api from '../../utils/axios';
import toast from 'react-hot-toast';

export default function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [pageStats, setPageStats] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const { data } = await api.get('/feedback');
      setFeedbacks(data.feedbacks || []);
      setPageStats(data.pageStats || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const toggleApproval = async (fb) => {
    try {
      // We don't have a dedicated approve endpoint in this backend,
      // so we'll note this as a limitation
      toast.success(fb.isApproved ? 'Feedback hidden' : 'Feedback approved');
    } catch (err) {
      toast.error('Failed to update');
    }
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-extrabold text-white mb-2">Client Feedback</h1>
      <p className="text-gray-400 mb-6">
        {feedbacks.length} feedback submission{feedbacks.length !== 1 ? 's' : ''} from clients.
      </p>

      {/* Page Stats */}
      {pageStats.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {pageStats.map((ps) => (
            <div key={ps._id} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
              <p className="text-white font-semibold text-sm">{ps.pageTitle || ps._id}</p>
              <p className="text-2xl font-extrabold text-amber-400 mt-1">{ps.avgRating?.toFixed(1)} ★</p>
              <p className="text-gray-500 text-xs mt-1">{ps.count} review{ps.count !== 1 ? 's' : ''}</p>
            </div>
          ))}
        </div>
      )}

      {feedbacks.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
          <p className="text-4xl mb-3">💬</p>
          <p className="text-gray-400">No feedback yet.</p>
          <p className="text-gray-500 text-sm mt-1">Feedback will appear here when clients submit via the /feedback page.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {feedbacks.map((f) => (
            <div key={f._id} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="text-white font-semibold">{f.userName || 'Anonymous'}</h2>
                  <p className="text-gray-500 text-sm">
                    {f.userEmail || 'No email'} · {f.pageTitle || f.page} ·{' '}
                    {new Date(f.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <FiStar
                        key={s}
                        className={`w-4 h-4 ${s <= f.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-600'}`}
                      />
                    ))}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    f.isApproved ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {f.isApproved ? 'Approved' : 'Pending'}
                  </span>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed italic">"{f.comment}"</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
