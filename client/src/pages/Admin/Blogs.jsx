// src/pages/Admin/Blogs.jsx — Live from GET /api/blogs + CRUD
import { useState, useEffect } from 'react';
import api from '../../utils/axios';
import toast from 'react-hot-toast';

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const { data } = await api.get('/blogs');
      setBlogs(data.blogs || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this blog post?')) return;
    try {
      await api.delete(`/blogs/${id}`);
      toast.success('Blog deleted');
      fetchData();
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  const togglePublish = async (blog) => {
    try {
      await api.put(`/blogs/${blog._id}`, { isPublished: !blog.isPublished });
      toast.success(blog.isPublished ? 'Unpublished' : 'Published');
      fetchData();
    } catch (err) {
      toast.error('Failed to update');
    }
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-white mb-1">Blog Posts</h1>
          <p className="text-gray-400">{blogs.length} post{blogs.length !== 1 ? 's' : ''} in the database.</p>
        </div>
      </div>

      {blogs.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
          <p className="text-4xl mb-3">✍️</p>
          <p className="text-gray-400">No blog posts yet.</p>
          <p className="text-gray-500 text-sm mt-1">Create your first post via the API or seed script.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {blogs.map((b) => (
            <div key={b._id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-6">
              <div>
                <h2 className="text-white font-semibold">{b.title}</h2>
                <p className="text-gray-500 text-sm mt-1">
                  by {b.author} · {b.category} · {b.views || 0} views ·{' '}
                  {new Date(b.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-4 py-1 rounded-full text-sm font-semibold ${
                  b.isPublished ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-500/20 text-gray-400'
                }`}>
                  {b.isPublished ? 'Published' : 'Draft'}
                </span>
                <button
                  onClick={() => togglePublish(b)}
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  {b.isPublished ? 'Unpublish' : 'Publish'}
                </button>
                <button
                  onClick={() => handleDelete(b._id)}
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
