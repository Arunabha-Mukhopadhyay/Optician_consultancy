// src/pages/Dashboard/Consultations.jsx — Live from GET /api/consultations/my
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/axios';

const statusColors = {
  pending: 'bg-amber-500/20 text-amber-400',
  confirmed: 'bg-blue-500/20 text-blue-400',
  completed: 'bg-emerald-500/20 text-emerald-400',
  cancelled: 'bg-red-500/20 text-red-400',
};

export default function DashboardConsultations() {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get('/consultations/my');
        setConsultations(data.consultations || []);
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
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-white mb-2">My Consultations</h1>
          <p className="text-gray-400">
            {consultations.length} consultation{consultations.length !== 1 ? 's' : ''} booked.
          </p>
        </div>
        <Link
          to="/contact"
          className="bg-gradient-to-r from-orange-500 to-amber-400 hover:from-orange-600 hover:to-amber-500 text-white font-bold px-6 py-2.5 rounded-full text-sm transition-all"
        >
          Book New →
        </Link>
      </div>

      {consultations.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
          <p className="text-4xl mb-3">📅</p>
          <p className="text-gray-400">No consultations booked yet.</p>
          <p className="text-gray-500 text-sm mt-1">
            <Link to="/contact" className="text-orange-400 hover:underline">Book your first free consultation →</Link>
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {consultations.map((c) => (
            <div key={c._id} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-white font-semibold text-lg">{c.service}</h2>
                  <p className="text-gray-500 text-sm mt-1">
                    📆 {c.preferredDate} at {c.preferredTime}
                  </p>
                  {c.message && <p className="text-gray-400 text-sm mt-2 italic">"{c.message}"</p>}
                  <p className="text-gray-600 text-xs mt-2">Booking Ref: #{c.bookingRef}</p>
                </div>
                <span className={`px-4 py-1 rounded-full text-sm font-semibold capitalize ${statusColors[c.status] || statusColors.pending}`}>
                  {c.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
