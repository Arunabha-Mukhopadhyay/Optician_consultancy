// src/pages/Feedback/index.jsx — Public feedback submission page
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiSend, FiCheckCircle, FiMessageCircle } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/axios';

export default function Feedback() {
  const { user, isAuthenticated } = useAuth();

  // Form state
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [page, setPage] = useState('general');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Approved feedbacks display
  const [feedbacks, setFeedbacks] = useState([]);
  const [loadingFeedbacks, setLoadingFeedbacks] = useState(true);

  const serviceOptions = [
    { value: 'general', label: 'General Experience' },
    { value: 'supply-chain-management', label: 'Supply Chain Management' },
    { value: 'vendor-development', label: 'Vendor Development' },
    { value: 'procurement-strategy', label: 'Procurement Strategy' },
    { value: 'six-sigma', label: 'Six Sigma' },
    { value: 'logistics-distribution', label: 'Logistics & Distribution' },
    { value: 'inventory-management', label: 'Inventory Management' },
    { value: 'esg', label: 'ESG Services' },
  ];

  const ratingLabels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

  // Fetch approved feedbacks for public display
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        // Use direct axios call since GET /api/feedback requires admin auth
        // We'll create a public endpoint for approved ones
        const res = await api.post('/feedback/public', {});
        setFeedbacks(res.data?.feedbacks || []);
      } catch {
        // If public endpoint doesn't exist yet, just show empty
        setFeedbacks([]);
      } finally {
        setLoadingFeedbacks(false);
      }
    };
    fetchFeedbacks();
  }, [submitted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (rating === 0) {
      setError('Please select a star rating.');
      return;
    }
    if (!comment.trim()) {
      setError('Please write a feedback message.');
      return;
    }

    setLoading(true);
    try {
      const selectedService = serviceOptions.find((s) => s.value === page);
      await api.post('/feedback', {
        page,
        pageTitle: selectedService?.label || 'General',
        rating,
        comment,
        userName: user?.name || '',
        userEmail: user?.email || '',
      });
      setSubmitted(true);
      setRating(0);
      setComment('');
      setPage('general');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-24 pb-20">
      {/* Hero Header */}
      <section className="relative text-center px-6 mb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/15 via-transparent to-blue-600/15 pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-500/20 border border-orange-400/30 rounded-full text-orange-300 text-sm font-medium mb-6">
            <FiMessageCircle className="w-4 h-4" />
            We Value Your Feedback
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Share Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
              Experience
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Your feedback helps us improve our services and deliver better results for every client.
          </p>
        </motion.div>
      </section>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Feedback Form — Left 3 cols */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-3"
        >
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8">
            <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
              <FiSend className="w-5 h-5 text-orange-400" />
              Submit Feedback
            </h2>
            <p className="text-gray-400 text-sm mb-8">
              {isAuthenticated
                ? `Submitting as ${user?.name}`
                : 'You can submit feedback without logging in.'}
            </p>

            {/* Success Alert */}
            {submitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-5 flex items-start gap-4"
              >
                <FiCheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-emerald-300 font-semibold">Thank you for your feedback!</p>
                  <p className="text-emerald-400/70 text-sm mt-1">
                    Your response has been recorded. It will appear publicly once approved.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-3 text-sm text-orange-400 hover:text-orange-300 font-semibold transition-colors"
                  >
                    Submit Another →
                  </button>
                </div>
              </motion.div>
            )}

            {/* Error Alert */}
            {error && (
              <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                <p className="text-red-400 text-sm font-medium">⚠️ {error}</p>
              </div>
            )}

            {!submitted && (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Service Selector */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    What are you reviewing?
                  </label>
                  <select
                    value={page}
                    onChange={(e) => setPage(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 outline-none transition-all appearance-none cursor-pointer"
                  >
                    {serviceOptions.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-gray-900">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Star Rating */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    Your Rating
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="transition-transform hover:scale-125 focus:outline-none"
                        >
                          <FiStar
                            className={`w-8 h-8 transition-colors ${
                              star <= (hoverRating || rating)
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-gray-600'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    {(hoverRating || rating) > 0 && (
                      <span className="text-amber-400 text-sm font-semibold">
                        {ratingLabels[hoverRating || rating]}
                      </span>
                    )}
                  </div>
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Your Feedback
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell us what you liked or what we can improve..."
                    rows={5}
                    maxLength={1000}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 outline-none resize-none transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1 text-right">
                    {comment.length}/1000
                  </p>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-400 hover:from-orange-600 hover:to-amber-500 disabled:opacity-50 text-white font-bold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <FiSend className="w-4 h-4" />
                      Submit Feedback
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>

        {/* Recent Feedbacks — Right 2 cols */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
            <FiStar className="w-5 h-5 text-amber-400" />
            Client Reviews
          </h2>
          <p className="text-gray-400 text-sm mb-6">What our clients are saying</p>

          {loadingFeedbacks ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-3 border-orange-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : feedbacks.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
              <p className="text-4xl mb-3">💬</p>
              <p className="text-gray-400">No reviews yet</p>
              <p className="text-gray-500 text-sm mt-1">Be the first to share your experience!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {feedbacks.map((fb) => (
                <div
                  key={fb._id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-orange-500/30 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold text-sm">
                        {fb.userName?.[0]?.toUpperCase() || 'U'}
                      </div>
                      <div>
                        <p className="font-semibold text-white text-sm">
                          {fb.userName || 'Anonymous'}
                        </p>
                        <p className="text-xs text-gray-500">{fb.pageTitle || fb.page}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <FiStar
                          key={s}
                          className={`w-3.5 h-3.5 ${
                            s <= fb.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed italic">
                    "{fb.comment}"
                  </p>
                  <p className="text-xs text-gray-600 mt-2">
                    {new Date(fb.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
