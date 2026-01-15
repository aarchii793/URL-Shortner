import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance.js';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await axiosInstance.post('/api/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      alert('Registration successful');
      navigate('/auth/login');
    } catch (err) {
      console.error(err);
      setError('Registration failed');
    }
  };

  return (
    // 🌙 FULL PAGE DARK BACKGROUND
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      
      {/* 💎 REGISTER CARD */}
      <div className="
        w-full max-w-sm
        bg-white/90 backdrop-blur-md
        border border-white/20
        rounded-2xl
        shadow-2xl
        px-10 py-8
      ">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-2">
          Create Account ✨
        </h2>
        <p className="text-center text-sm text-slate-500 mb-8">
          Join us and start shortening URLs smarter
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* NAME */}
          <div className="relative">
            <span className="absolute left-4 top-3 text-slate-400">👤</span>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
              value={formData.name}
              onChange={handleChange}
              className="
                w-full pl-11 pr-4 py-2.5
                border border-slate-300 rounded-xl
                text-slate-800
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              "
            />
          </div>

          {/* EMAIL */}
          <div className="relative">
            <span className="absolute left-4 top-3 text-slate-400">📧</span>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={handleChange}
              className="
                w-full pl-11 pr-4 py-2.5
                border border-slate-300 rounded-xl
                text-slate-800
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              "
            />
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <span className="absolute left-4 top-3 text-slate-400">🔒</span>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              required
              value={formData.password}
              onChange={handleChange}
              className="
                w-full pl-11 pr-4 py-2.5
                border border-slate-300 rounded-xl
                text-slate-800
                focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
              "
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="relative">
            <span className="absolute left-4 top-3 text-slate-400">🔒</span>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="
                w-full pl-11 pr-4 py-2.5
                border border-slate-300 rounded-xl
                text-slate-800
                focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
              "
            />
          </div>

          {/* TERMS */}
          <label className="flex items-center text-sm text-slate-600 gap-2">
            <input type="checkbox" className="accent-emerald-500" required />
            I accept all terms & conditions
          </label>

          {error && (
            <p className="text-red-500 text-sm font-medium">{error}</p>
          )}

          {/* REGISTER BUTTON */}
          <button
            type="submit"
            className="
              w-full py-2.5 rounded-xl
              font-semibold text-white
              bg-gradient-to-r from-blue-600 to-emerald-500
              hover:from-blue-700 hover:to-emerald-600
              transition-all duration-300
              shadow-md hover:shadow-lg
            "
          >
            🚀 Register
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-sm text-center mt-6 text-slate-600">
          Already have an account?{' '}
          <Link
            to="/auth/login"
            className="text-blue-600 font-medium hover:text-emerald-500 transition-colors"
          >
            Login now
          </Link>
        </p>
      </div>
    </div>
  );
}
