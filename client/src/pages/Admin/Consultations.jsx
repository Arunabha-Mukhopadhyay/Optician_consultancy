// src/pages/Admin/Consultations.jsx — Live from GET /api/consultations
import { useState, useEffect } from 'react';
import api from '../../utils/axios';
import toast from 'react-hot-toast';

const statusColors = {
  pending: 'bg-amber-500/20 text-amber-400',
  confirmed: 'bg-blue-500/20 text-blue-400',
  completed: 'bg-emerald-500/20 text-emerald-400',
  cancelled: 'bg-red-500/20 text-red-400',
};

export default function AdminConsultations() {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const { data } = await api.get('/consultations');
      setConsultations(data.consultations || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/consultations/${id}`, { status });
      toast.success(`Status updated to ${status}`);
      fetchData();
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this consultation?')) return;
    try {
      await api.delete(`/consultations/${id}`);
      toast.success('Consultation deleted');
      fetchData();
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-extrabold text-white mb-2">Consultations</h1>
      <p className="text-gray-400 mb-10">
        {consultations.length} total consultation{consultations.length !== 1 ? 's' : ''} from clients.
      </p>

      {consultations.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
          <p className="text-4xl mb-3">📅</p>
          <p className="text-gray-400">No consultations yet.</p>
          <p className="text-gray-500 text-sm mt-1">They'll appear here when clients book from the Contact page.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {consultations.map((c) => (
            <div key={c._id} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="text-white font-semibold text-lg">{c.service}</h2>
                  <p className="text-gray-400 text-sm mt-1">
                    <span className="text-orange-400">{c.name}</span> · {c.company}
                  </p>
                  <p className="text-gray-500 text-sm">{c.email} · {c.phone}</p>
                  <p className="text-gray-500 text-xs mt-1">
                    Preferred: {c.preferredDate} at {c.preferredTime} · Ref: #{c.bookingRef}
                  </p>
                  {c.message && <p className="text-gray-400 text-sm mt-2 italic">"{c.message}"</p>}
                </div>
                <span className={`px-4 py-1 rounded-full text-sm font-semibold capitalize ${statusColors[c.status] || statusColors.pending}`}>
                  {c.status}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
                {['pending', 'confirmed', 'completed', 'cancelled'].map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(c._id, s)}
                    disabled={c.status === s}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-colors ${
                      c.status === s
                        ? 'bg-white/10 text-white cursor-default'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {s}
                  </button>
                ))}
                <button
                  onClick={() => handleDelete(c._id)}
                  className="ml-auto px-3 py-1 rounded-lg text-xs font-semibold text-red-400 bg-red-500/10 hover:bg-red-500/20 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
