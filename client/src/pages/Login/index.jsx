// src/pages/Login/index.jsx — JWT Login Page
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await login(data.email, data.password);
      if (res.success) {
        toast.success(`Welcome back, ${res.user.name}!`);
        navigate(res.user.role === 'admin' ? '/admin/dashboard' : '/dashboard');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-hero-gradient flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-bold">
            <span className="text-white">Opti</span><span className="text-orange-400">Chain</span>
          </Link>
          <p className="text-blue-200 text-sm mt-1">Transforming Operations. Delivering Excellence.</p>
        </div>

        <div className="card">
          <h1 className="text-2xl font-bold text-navy-700 dark:text-white mb-1">Welcome Back</h1>
          <p className="text-gray-500 text-sm mb-6">Sign in to your client dashboard</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" id="login-form">
            <div>
              <label className="label">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  id="login-email"
                  type="email"
                  {...register('email', { required: 'Email is required' })}
                  className="input pl-10"
                  placeholder="rajesh@company.com"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="label">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  id="login-password"
                  type={showPass ? 'text' : 'password'}
                  {...register('password', { required: 'Password is required' })}
                  className="input pl-10 pr-10"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPass ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              id="login-submit-btn"
              className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In to Dashboard'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-orange-500 font-semibold hover:underline">Create Account</Link>
          </p>
          <p className="text-center text-sm text-gray-500 mt-2">
            <Link to="/" className="text-navy-700 dark:text-gray-300 hover:text-orange-500">← Back to Website</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
