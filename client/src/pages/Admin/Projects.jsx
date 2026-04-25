import { useState, useEffect } from 'react';
import api from '../../utils/axios';
import toast from 'react-hot-toast';

const ReportForm = ({ project, onAdd }) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  
  const submit = (e) => {
    e.preventDefault();
    if(!name || !url) return;
    onAdd(project, name, url);
    setName('');
    setUrl('');
  }
  return (
    <form onSubmit={submit} className="mt-4 border-t border-white/10 pt-4 flex flex-col md:flex-row gap-2">
      <input type="text" placeholder="Report Name (e.g. Q1 Audit)" className="input py-1 text-sm flex-1" value={name} onChange={e=>setName(e.target.value)} required/>
      <input type="url" placeholder="Report Link (https://...)" className="input py-1 text-sm flex-1" value={url} onChange={e=>setUrl(e.target.value)} required/>
      <button className="bg-blue-500 text-white px-4 py-1 rounded-lg text-sm font-semibold hover:bg-blue-600">Add Report</button>
    </form>
  )
}

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    clientId: '',
    title: '',
    description: '',
    service: '',
    status: 'planning',
    progress: 0,
  });

  const fetchProjectsAndClients = async () => {
    try {
      const [projRes, clientsRes] = await Promise.all([
        api.get('/projects'),
        api.get('/auth/users'),
      ]);
      setProjects(projRes.data.projects || []);
      setClients(clientsRes.data.users || []);
    } catch (err) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectsAndClients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.clientId) return toast.error('Please select a client');
    try {
      await api.post('/projects', formData);
      toast.success('Project created successfully!');
      setShowForm(false);
      fetchProjectsAndClients();
      setFormData({ clientId: '', title: '', description: '', service: '', status: 'planning', progress: 0 });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create project');
    }
  };

  const updateStatus = async (id, status, progress) => {
    try {
      await api.put(`/projects/${id}`, { status, progress });
      toast.success('Project updated!');
      fetchProjectsAndClients();
    } catch (err) {
      toast.error('Failed to update project');
    }
  };

  const handleAddReport = async (project, name, fileUrl) => {
    try {
      const updatedReports = [...(project.reports || []), { name, fileUrl }];
      await api.put(`/projects/${project._id}`, { reports: updatedReports });
      toast.success('Report attached successfully!');
      fetchProjectsAndClients();
    } catch (err) {
      toast.error('Failed to add report');
    }
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Manage Projects</h1>
          <p className="text-gray-400">Create and assign projects to clients.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
          {showForm ? 'Cancel' : '+ New Project'}
        </button>
      </div>

      {showForm && (
        <div className="card mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">Select Client *</label>
                <select className="input" required value={formData.clientId} onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}>
                  <option value="">-- Choose Client --</option>
                  {clients.map(c => (
                    <option key={c._id} value={c._id}>{c.name} {c.company ? `(${c.company})` : ''} - {c.email}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">Project Title *</label>
                <input type="text" className="input" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
              </div>
              <div>
                <label className="label">Service</label>
                <input type="text" className="input" value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })} />
              </div>
              <div>
                <label className="label">Status</label>
                <select className="input" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                  <option value="planning">Planning</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="review">Review</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="label">Description</label>
                <textarea className="input" rows="2" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
              </div>
            </div>
            <button type="submit" className="bg-emerald-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-emerald-600">Save Project</button>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {projects.map((p) => (
          <div key={p._id} className="rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col">
            <div className="flex flex-col md:flex-row gap-6 justify-between">
              <div>
              <h2 className="text-xl font-bold text-white mb-1">{p.title}</h2>
              <p className="text-gray-400 text-sm mb-2">{p.description}</p>
              <div className="flex gap-4 text-xs text-gray-500">
                <span>Client Email: <span className="text-orange-400">{p.clientId?.email || 'N/A'}</span></span>
                <span>Service: {p.service}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 min-w-[200px]">
              <select
                className="input text-sm py-1"
                value={p.status}
                onChange={(e) => updateStatus(p._id, e.target.value, p.progress)}
              >
                <option value="planning">Planning</option>
                <option value="ongoing">Ongoing</option>
                <option value="review">Review</option>
                <option value="completed">Completed</option>
              </select>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  className="input text-sm py-1 flex-1"
                  min="0" max="100"
                  value={p.progress}
                  onChange={(e) => updateStatus(p._id, p.status, e.target.value)}
                />
                <span className="text-gray-400 text-sm">%</span>
              </div>
            </div>
          </div>
          
          {/* Reports Section inside Project Card */}
          <div className="mt-4 pt-4 border-t border-white/5">
            <p className="text-gray-400 text-sm font-semibold mb-2">Attached Reports ({p.reports?.length || 0})</p>
            {p.reports?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {p.reports.map((r, i) => (
                  <a key={i} href={r.fileUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-blue-400 hover:border-blue-400 transition-colors">
                    {r.name}
                  </a>
                ))}
              </div>
            )}
            <ReportForm project={p} onAdd={handleAddReport} />
          </div>
        </div>
        ))}
      </div>
    </div>
  );
}
