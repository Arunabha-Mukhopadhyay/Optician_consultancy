// src/pages/Admin/CaseStudies.jsx — Live from GET /api/case-studies + delete
import { useState, useEffect } from 'react';
import api from '../../utils/axios';
import toast from 'react-hot-toast';

export default function AdminCaseStudies() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '', industry: '', service: '', metric: '', summary: '', solution: '', results: ''
  });

  const fetchData = async () => {
    try {
      const { data } = await api.get('/case-studies');
      setCases(data.caseStudies || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/case-studies', formData);
      toast.success('Case study created successfully!');
      setShowForm(false);
      setFormData({ title: '', industry: '', service: '', metric: '', summary: '', solution: '', results: '' });
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create case study');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this case study?')) return;
    try {
      await api.delete(`/case-studies/${id}`);
      toast.success('Case study deleted');
      fetchData();
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-white mb-1">Case Studies</h1>
          <p className="text-gray-400">{cases.length} case stud{cases.length !== 1 ? 'ies' : 'y'} in the database.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
          {showForm ? 'Cancel' : '+ New Case Study'}
        </button>
      </div>

      {showForm && (
        <div className="card mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="label">Title *</label>
                <input type="text" className="input" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
              </div>
              <div>
                <label className="label">Industry *</label>
                <input type="text" className="input" required value={formData.industry} onChange={(e) => setFormData({ ...formData, industry: e.target.value })} />
              </div>
              <div>
                <label className="label">Service *</label>
                <input type="text" className="input" required value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })} />
              </div>
              <div className="md:col-span-2">
                <label className="label">Key Metric Highlight (e.g. "Saved $2M") *</label>
                <input type="text" className="input" required value={formData.metric} onChange={(e) => setFormData({ ...formData, metric: e.target.value })} />
              </div>
              <div className="md:col-span-2">
                <label className="label">Summary / Problem *</label>
                <textarea className="input" rows="2" required value={formData.summary} onChange={(e) => setFormData({ ...formData, summary: e.target.value })} />
              </div>
              <div className="md:col-span-2">
                <label className="label">Solution *</label>
                <textarea className="input" rows="3" required value={formData.solution} onChange={(e) => setFormData({ ...formData, solution: e.target.value })} />
              </div>
              <div className="md:col-span-2">
                <label className="label">Results *</label>
                <textarea className="input" rows="3" required value={formData.results} onChange={(e) => setFormData({ ...formData, results: e.target.value })} />
              </div>
            </div>
            <button type="submit" className="bg-emerald-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-emerald-600">Publish Case Study</button>
          </form>
        </div>
      )}

      {cases.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
          <p className="text-4xl mb-3">📁</p>
          <p className="text-gray-400">No case studies yet.</p>
          <p className="text-gray-500 text-sm mt-1">Create them via the API or seed script.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {cases.map((c) => (
            <div key={c._id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-6">
              <div>
                <h2 className="text-white font-semibold">{c.title}</h2>
                <p className="text-gray-500 text-sm mt-1">
                  {c.industry} · {c.service} ·{' '}
                  {new Date(c.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
                {c.metric && <p className="text-orange-400 text-sm font-semibold mt-1">{c.metric}</p>}
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleDelete(c._id)}
                  className="text-red-400 hover:text-red-300 text-sm transition-colors"
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
